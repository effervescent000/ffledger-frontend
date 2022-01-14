import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

import CraftCardDataWrapper from "./craft-card-data-wrapper";

const CraftCardsWrapper = (props) => {
    const populateItems = () => {
        const renderedCrafts = [];
        let i = 0;
        while (renderedCrafts.length < props.numCrafts && i < props.crafts.length) {
            const item = props.crafts[i];
            if (
                props.classicalDisplay === "SHOWN" ||
                (props.classicalDisplay === "HIDDEN" && !item.item.name.startsWith("Classical"))
            ) {
                renderedCrafts.push(
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
                        <CraftCardDataWrapper itemId={item.item_id} />
                    </div>
                );
            }

            i++;
        }
        return renderedCrafts;
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
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));

            props.removeCraft(event.target.value);
        }
    };

    const postTransaction = (selectedItem, amount, gilValue) => {
        if (selectedItem != undefined && amount != undefined && gilValue != undefined) {
            const transaction = {
                item_id: selectedItem,
                amount: amount,
                gil_value: gilValue,
            };
            axios.post(`${process.env.REACT_APP_DOMAIN}/transaction/add`, transaction, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            });
        }
    };

    return <div id="crafting-output-wrapper">{populateItems()}</div>;
};

export default CraftCardsWrapper;
