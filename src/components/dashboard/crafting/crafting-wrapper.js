import React, { useState } from "react";
import axios from "axios";

import CraftingItems from "./crafting-items";

export default function() {
    const [crafts, setCrafts] = useState([]);

    function handleQueueButtonClick() {
        setCrafts([]);
        const num_crafts = document.getElementById("number-select").value;
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/craft/get_queue/${num_crafts}`, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).access_token
                    }`,
                },
            })
            .then((response) => {
                setCrafts(response.data);
            })
            .catch((error) => console.log(error));
    }

    const renderCrafts = () => {
        if (crafts.length !== 0) {
            console.log("Rendering crafts...")
            return <CraftingItems crafts={crafts} />
        }
        return ""
    }

    return (
        <div id="queue-wrapper">
            <div className="interaction-wrapper">
                <select id="number-select">
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <button onClick={handleQueueButtonClick}>Generate queue</button>
            </div>
            {renderCrafts()}
        </div>
    );
}
