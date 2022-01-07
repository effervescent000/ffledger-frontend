import React, { useState, useEffect } from "react";
import axios from "axios";

import CraftDisplay from "./craft-display";

const CraftingItems = (props) => {
    // const [crafts, setCrafts] = useState(props.crafts);

    const populateItems = () => {
        return props.crafts.map((item) => {
            return (
                <div key={item.item_id} className="craft-queue-item-wrapper">
                    <div className="craft-heading-wrapper">
                        <div className="item-name">{item.item.name}</div>
                        <div className="gph">
                            {Math.round(
                                ((item.price - item.craft_cost) * item.sales_velocity) / 24
                            )}{" "}
                            gil/hour
                        </div>
                        <div className="craft-cost">{item.craft_cost} to craft</div>
                    </div>
                    <div className="buttons-wrapper">
                        <button name="craft-btn" value={item.item_id} onClick={handleClick}>
                            Craft 1
                        </button>
                        <button name="skip-btn" value={item.item_id} onClick={handleClick}>
                            Skip
                        </button>
                    </div>
                    <CraftDisplay itemId={item.item_id} />
                </div>
            );
        });
    };

    const handleClick = (event) => {
        if (event.target.name === "craft-btn") {
            const selectedItem = event.target.value;
            const amount = 1;
            const gilValue = 0;

            postTransaction(selectedItem, amount, gilValue);

            props.removeCraft(event.target.value);
        } else if (event.target.name === "skip-btn") {
            const item = {
                id: event.target.value,
            };

            axios
                .post(`${process.env.REACT_APP_DOMAIN}/item/skip`, item, {
                    headers: {
                        Authorization: `Bearer ${
                            JSON.parse(localStorage.getItem("user")).access_token
                        }`,
                    },
                })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));

            props.removeCraft(event.target.value);
        }
    };

    // const removeItemFromCrafts = (itemId) => {
    //     setCrafts((crafts) => {
    //         const newCrafts = [];
    //         crafts.forEach((item) => {
    //             console.log(item);
    //             if (item.id != itemId) {
    //                 newCrafts.push(item);
    //             }
    //         });
    //         return newCrafts;
    //     });
    // };

    const postTransaction = (selectedItem, amount, gilValue) => {
        if (selectedItem != undefined && amount != undefined && gilValue != undefined) {
            const transaction = {
                item_id: selectedItem,
                amount: amount,
                gil_value: gilValue,
            };
            axios.post(`${process.env.REACT_APP_DOMAIN}/transaction/add`, transaction, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).access_token
                    }`,
                },
            });
        }
    };

    return <div id="crafting-output-wrapper">{populateItems()}</div>;
};

export default CraftingItems;
