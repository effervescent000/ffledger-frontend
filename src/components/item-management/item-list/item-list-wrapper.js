import React, { useState } from "react";
import axios from "axios";

import ItemListItem from "./item-list-item";

const ItemListWrapper = (props) => {
    const [itemArray, setItemArray] = useState([]);

    const populateItems = () => {
        return itemArray.map((item) => {
            return <ItemListItem key={item.id} item={item} />;
        });
    };

    const handleClick = (event) => {
        if (event.target.name === "get-items-btn") {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/item/get/all`)
                .then((response) => {
                    setItemArray(response.data);
                })
                .catch((error) => console.log(error.response));
        }
    };

    const itemListHeader = () => {
        if (itemArray.length > 0) {
            return (
                <div className="item-list-header item-list-grid">
                    <div className="name">Item name</div>
                    <div />
                </div>
            );
        }
    };

    return (
        <div id="item-list-wrapper">
            <button name="get-items-btn" onClick={handleClick}>
                Get items
            </button>
            {itemListHeader()}
            {populateItems()}
        </div>
    );
};

export default ItemListWrapper;
