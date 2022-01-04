import React, { useState, useEffect } from "react";
import axios from "axios";

export default function (props) {
    const [display, setDisplay] = useState("none");
    const [warnings, setWarnings] = useState([]);

    useEffect(() => {
        setDisplay("block");
        getWarnings(props.itemId);
    }, []);

    // useEffect()

    async function getWarnings(id) {
        const worldId = await getActiveProfileWorld();

        axios
            .get(`${process.env.REACT_APP_DOMAIN}/craft/alerts/${worldId}-${id}`)
            .then((response) => {
                setWarnings(response.data);
            })
            .catch((error) => console.log(error));
    }

    async function getActiveProfileWorld() {
        let response = await axios.get(`${process.env.REACT_APP_DOMAIN}/profile/get/active`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).access_token}`,
            },
        });
        return response.data.world.id;
    }

    function populateWarnings() {
        let mappedWarnings = warnings.map((warning, index) => {
            // console.log(warning)
            return (
                <div key={`${warning.name}-${index}`} className="warning">
                    <div className="item-name">{warning.name}</div>
                    <div className="craft-cost">{warning.crafting_cost}</div>
                    <div className="item-price">{warning.price}</div>
                </div>
            );
        });
        let counter = -1
        mappedWarnings = [
            <div key={() => {
                counter++;
                return `header-${counter}`
            }} className="warning">
                <div className="item-name">Item</div>
                <div className="craft-cost">Crafting cost</div>
                <div className="item-price">Price</div>
            </div>,
            ...mappedWarnings,
        ];
        return mappedWarnings
    }

    return (
        <div className="craft-block-display" style={{ display: display }}>
            <div className="warnings-wrapper">{populateWarnings()}</div>
        </div>
    );
}
