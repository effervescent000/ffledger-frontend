import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import sortArray from "sort-array";

import ItemInfoPanel from "./item-info-panel";
import { UserContext } from "../../user-context";

const InfoFrame = (props) => {
    const { profile } = useContext(UserContext);
    const [itemList, setItemList] = useState([]);
    const [itemSelectValue, setItemSelectValue] = useState("");
    const [amountInput, setAmountInput] = useState(0);
    const [gilInput, setGilInput] = useState(0);
    const [selectedItemStats, setSelectedItemStats] = useState({});

    useEffect(() => {
        getItemList();
    }, []);

    const populateItemListOptions = () => {
        return itemList.map((item) => {
            return (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            );
        });
    };

    const getItemList = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/get/all`)
            .then((response) => {
                setItemList(sortArray(response.data, { by: "name" }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (event) => {
        if (event.target.name === "item-select") {
            setItemSelectValue(event.target.value);

            axios
                .get(`${process.env.REACT_APP_DOMAIN}/item/stats/${event.target.value}`, {
                    params: {
                        world: profile.world.id,
                    },
                })
                .then((response) => {
                    setSelectedItemStats(response.data);
                })
                .catch((error) => console.log(error.response));
        } else if (event.target.name === "amount-input") {
            setAmountInput(event.target.value);
        } else if (event.target.name === "gil-input") {
            setGilInput(event.target.value);
        }
    };

    const handleClick = (event) => {
        if (event.target.name === "add-stock-btn") {
            props.postTransaction(itemSelectValue, amountInput, 0);
        } else if (event.target.name === "remove-stock-btn") {
            props.postTransaction(itemSelectValue, amountInput * -1, 0);
        }
    };

    return (
        <div id="info-frame-wrapper">
            <div id="info-inputs-wrapper">
                <div id="entry-wrapper">
                    <select name="item-select" value={itemSelectValue} onChange={handleChange}>
                        {populateItemListOptions()}
                    </select>
                    <input
                        type="number"
                        name="amount-input"
                        value={amountInput}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="gil-input"
                        value={gilInput}
                        onChange={handleChange}
                    />
                </div>
                <div className="buttons-wrapper">
                    <button>Add sale</button>
                    <button>Add purchase</button>
                    <button>View data</button>
                    <button name="remove-stock-btn" onClick={handleClick}>
                        Remove stock
                    </button>
                    <button name="add-stock-btn" onClick={handleClick}>
                        Add stock
                    </button>
                </div>
            </div>
            {Object.keys(selectedItemStats).length > 0 ? (
                <ItemInfoPanel item={selectedItemStats} />
            ) : null}
        </div>
    );
};

export default InfoFrame;
