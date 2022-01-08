import React, { useState } from "react";
import axios from "axios";
import sortArray from "sort-array";

import CraftingItems from "./crafting-items";

const CraftingWrapper = (props) => {
    const [numCrafts, setNumCrafts] = useState(1);
    const [crafts, setCrafts] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [updating, setUpdating] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        setButtonClicked(true);

        getCrafts();
    };

    const getCrafts = async () => {
        setCrafts([]);
        setUpdating(true);
        await axios
            .put(`${process.env.REACT_APP_DOMAIN}/craft/stats/update`, {
                id: props.profile.world.id,
            })
            .catch((error) => console.log("error updating item stats", error));
        setUpdating(false);
        await axios
            .get(`${process.env.REACT_APP_DOMAIN}/craft/get`, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).access_token
                    }`,
                },
            })
            .then((response) => {
                sortArray(response.data, {
                    by: "gph",
                    order: "desc",
                    computed: {
                        gph: (item) =>
                            Math.round(((item.price - item.craft_cost) * item.sales_velocity) / 24),
                    },
                });
                console.log("response from get_crafts", response.data);
                setCrafts(response.data);
            })
            .catch((error) => console.log("Error getting crafts", error));

        setButtonClicked(false);
    };

    const removeCraft = (id) => {
        setCrafts(crafts.filter((craft) => craft.item_id != id));
    };

    const renderCrafts = () => {
        if (updating && buttonClicked) {
            return <div>Updating price data...</div>;
        } else if (crafts.length === 0 && buttonClicked) {
            return <div>Getting queue...</div>;
        } else if (crafts.length > 0) {
            return <CraftingItems crafts={crafts.slice(0, numCrafts)} removeCraft={removeCraft} />;
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
                <button disabled={buttonClicked} onClick={handleClick}>
                    Generate queue
                </button>
            </div>
            {renderCrafts()}
        </div>
    );
};

export default CraftingWrapper;
