import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import sortArray from "sort-array";
import Cookies from "js-cookie";

import CraftCardsWrapper from "./craft-cards-wrapper";
import { UserContext } from "../../user-context";

const CraftingWrapper = (props) => {
    const [numCrafts, setNumCrafts] = useState(1);
    const [crafts, setCrafts] = useState([]);
    const [getCraftsButtonClicked, setGetCraftsButtonClicked] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [classicalDisplay, setClassicalDisplay] = useState("SHOWN");
    const { profile } = useContext(UserContext);

    useEffect(() => {
        props.getStock();
    }, [crafts]);

    const handleClick = (event) => {
        event.preventDefault();
        if (event.target.name === "get-crafts-btn") {
            setGetCraftsButtonClicked(true);
            getCrafts();
        } else if (event.target.name === "toggle-classical-btn") {
            setClassicalDisplay(classicalDisplay === "SHOWN" ? "HIDDEN" : "SHOWN");
        }
    };

    const getCrafts = async () => {
        setCrafts([]);
        setUpdating(true);
        await axios
            .put(`${process.env.REACT_APP_DOMAIN}/craft/stats/update`, {
                id: profile.world.id,
            })
            .catch((error) => console.log("error updating item stats", error));
        setUpdating(false);
        const craftsStart = Date.now();
        await axios
            .get(`${process.env.REACT_APP_DOMAIN}/craft/get`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                // console.log("craft response", response.data);
                sortArray(response.data, {
                    by: "gph",
                    order: "desc",
                    computed: {
                        gph: (item) =>
                            Math.round(((item.price - item.craft_cost) * item.sales_velocity) / 24),
                    },
                });
                setCrafts(response.data.filter((item) => item.craft_cost !== null));
                console.log(`Crafting queue processed in ${(Date.now() - craftsStart) / 1000}s`);
            })
            .catch((error) => console.log("Error getting crafts", error));

        setGetCraftsButtonClicked(false);
    };

    const removeCraft = (id) => {
        setCrafts(crafts.filter((craft) => craft.item_id != id));
    };

    const renderCrafts = () => {
        if (updating && getCraftsButtonClicked) {
            return <div>Updating price data...</div>;
        } else if (crafts.length === 0 && getCraftsButtonClicked) {
            return <div>Getting queue...</div>;
        } else if (crafts.length > 0) {
            return (
                <CraftCardsWrapper
                    crafts={crafts}
                    numCrafts={numCrafts}
                    removeCraft={removeCraft}
                    classicalDisplay={classicalDisplay}
                    postTransaction={props.postTransaction}
                    getStock={props.getStock}
                />
            );
        }
        return null;
    };

    const handleChange = (event) => {
        if (event.target.name === "number-select") {
            setNumCrafts(event.target.value);
        }
    };

    return (
        <div id="queue-wrapper">
            <div className="interaction-wrapper">
                <select
                    name="number-select"
                    id="number-select"
                    onChange={handleChange}
                    value={numCrafts}
                >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <button
                    name="get-crafts-btn"
                    disabled={getCraftsButtonClicked}
                    onClick={handleClick}
                >
                    Generate queue
                </button>
                <button name="toggle-classical-btn" onClick={handleClick}>
                    Toggle Classical items
                </button>
            </div>
            {renderCrafts()}
        </div>
    );
};

export default CraftingWrapper;
