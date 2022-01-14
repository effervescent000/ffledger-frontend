import React, { useState, useEffect } from "react";
import axios from "axios";
import sortArray from "sort-array";

const InfoFrame = () => {
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        getItemList();
    }, []);

    function populateItemListOptions() {
        return itemList.map((item) => {
            return (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            );
        });
    }

    function getItemList() {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/get/all`)
            .then((response) => {
                setItemList(sortArray(response.data, { by: "name" }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleAddStock() {
        const selectedItem = document.getElementById("item-select").value
        const amount = document.getElementById("amount-input").value
        const gilValue = 0

        postTransaction(selectedItem, amount, gilValue)
    }

    function handleRemoveStock() {
        const selectedItem = document.getElementById("item-select").value
        const amount = document.getElementById("amount-input").value * -1
        const gilValue = 0

        postTransaction(selectedItem, amount, gilValue)
    }

    function postTransaction(selectedItem, amount, gilValue) {
        if (selectedItem != undefined && amount != undefined && gilValue != undefined) {
            const transaction = {
                item_id: selectedItem,
                amount: amount,
                gil_value: gilValue,
            };
            axios.post(`${process.env.REACT_APP_DOMAIN}/transaction/add`, transaction, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).access_token}`,
                },
            });
        }
    }

    return (
        <div id="info-frame-wrapper">
            <div id="entry-wrapper">
                <select id="item-select">{populateItemListOptions()}</select>
                <input type="number" id="amount-input" />
                <input type="number" id="gil-input" />
            </div>
            <div className="buttons-wrapper">
                <button id="sale-btn">Add sale</button>
                <button id="purchase-btn">Add purchase</button>
                <button id="view-btn">View data</button>
                <button id="remove-stock-btn" onClick={handleRemoveStock}>Remove stock</button>
                <button id="add-stock-btn" onClick={handleAddStock}>Add stock</button>
            </div>
        </div>
    );
}

export default InfoFrame;