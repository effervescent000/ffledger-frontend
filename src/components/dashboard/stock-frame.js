import React, { useState, useEffect, useContext } from "react";
import { isEqual } from "lodash";
import axios from "axios";
import Cookies from "js-cookie";
import sortArray from "sort-array";

import { UserContext } from "../user-context";

export default function StockFrame() {
    const [stock, setStock] = useState([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.loggedIn) {
            getStock();
            const stockInterval = setInterval(getStock, 30000);
            return () => {
                clearInterval(stockInterval);
            };
        }
    });

    const getStock = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/stock`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                const sortedData = sortArray(response.data, {
                    by: "name",
                    computed: {
                        name: (item) => item.item.name,
                    },
                });
                if (!isEqual(stock, sortedData)) {
                    setStock(sortedData);
                }
            })
            .catch((error) => console.log(error));
    };

    const handleClick = (event) => {
        event.preventDefault();
        const selectedItem = event.target.value;
        const amount = -1;
        const gilValue = 0;

        postTransaction(selectedItem, amount, gilValue);
    };

    const postTransaction = (selectedItem, amount, gilValue) => {
        if (selectedItem != undefined && amount != undefined && gilValue != undefined) {
            const transaction = {
                item_id: selectedItem,
                amount: amount,
                gil_value: gilValue,
            };
            axios
                .post(`${process.env.REACT_APP_DOMAIN}/transaction/add`, transaction, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then(() => {
                    getStock();
                });
        }
    };

    const populateStock = () => {
        return stock.map((stockItem) => {
            return (
                <div key={stockItem.id} className="stock-item">
                    <div className="item-name">{stockItem.item.name}</div>
                    <div className="item-amount-wrapper">
                        <div className="item-amount">{stockItem.amount}</div>
                        <button value={stockItem.item.id} onClick={handleClick}>
                            Remove 1
                        </button>
                    </div>
                </div>
            );
        });
    };

    if (!userContext.loggedIn) {
        return <div id="stock-frame-wrapper">Please log in to view stock</div>;
    }

    return (
        <div id="stock-frame-wrapper">
            <span id="stock-label">Current stock</span>
            <div id="stock-frame">{populateStock()}</div>
        </div>
    );
}
