import React, { useState } from "react";
import axios from "axios";

import ItemToPrune from "./item-to-prune";

const PruneItemsWrapper = (props) => {
    const [itemArray, setItemArray] = useState([]);

    const handleClick = (event) => {
        event.preventDefault();
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/get_invalid`)
            .then((response) => {
                if (response.data) {
                    setItemArray(response.data);
                }
            })
            .catch((error) => console.log(error.response));
    };

    const populateItems = () => {
        return itemArray.map((item) => {
            return <ItemToPrune key={item.id} item={item} removeItem={removeItem} />;
        });
    };

    const removeItem = (id) => {
        setItemArray(itemArray.filter((item) => item.id !== id));
    };

    return (
        <div id="prune-items-wrapper">
            <div className="btn">
                <button onClick={handleClick}>Get item list</button>
            </div>

            {populateItems()}
        </div>
    );
};

export default PruneItemsWrapper;
