import React, { useState, useEffect } from "react";
import axios from "axios";
import sortArray from "sort-array";

const InfoFrame = (props) => {
    const [itemList, setItemList] = useState([]);

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

    const handleClick = (event) => {
        if (event.target.name === "add-stock-btn") {
            const selectedItem = document.getElementById("item-select").value;
            const amount = document.getElementById("amount-input").value;
            const gilValue = 0;

            props.postTransaction(selectedItem, amount, gilValue);
        } else if (event.target.name === "remove-stock-btn") {
            const selectedItem = document.getElementById("item-select").value;
            const amount = document.getElementById("amount-input").value * -1;
            const gilValue = 0;

            props.postTransaction(selectedItem, amount, gilValue);
        }
    };

    return (
        <div id="info-frame-wrapper">
            <div id="entry-wrapper">
                <select id="item-select">{populateItemListOptions()}</select>
                <input type="number" id="amount-input" />
                <input type="number" id="gil-input" />
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
    );
};

export default InfoFrame;
