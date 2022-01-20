import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../user-context";

const CraftComponentsWrapper = (props) => {
    const [display, setDisplay] = useState("none");
    const [cardData, setCardData] = useState([]);
    const { profile } = useContext(UserContext);

    useEffect(() => {
        setDisplay("block");
        getCardData(props.itemId);
    }, []);

    const getCardData = (id) => {
        const worldId = profile.world.id;

        axios
            .get(`${process.env.REACT_APP_DOMAIN}/craft/card/${worldId}-${id}`)
            .then((response) => {
                setCardData(response.data);
            })
            .catch((error) => console.log(error));
    };

    function populateCardItems() {
        return cardData.map((itemData) => {
            return (
                <div key={`${props.itemId}-${itemData.name}`} className="craft-data">
                    <div className="item-name">{itemData.name}</div>
                    <div
                        className={`craft-cost${
                            itemData.crafting_cost < itemData.price ? " cheaper" : ""
                        }`}
                    >
                        {itemData.crafting_cost}
                    </div>
                    <div
                        className={`item-price${
                            itemData.crafting_cost >= itemData.price ? " cheaper" : ""
                        }`}
                    >
                        {itemData.price}
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="craft-block-display" style={{ display: display }}>
            <div className="card-data-wrapper">
                {cardData.length > 0 ? (
                    <div className="craft-data-header">
                        <div className="item-name">Item</div>
                        <div className="craft-cost">Crafting cost</div>
                        <div className="item-price">Price</div>
                    </div>
                ) : null}
                {populateCardItems()}
            </div>
        </div>
    );
};

export default CraftComponentsWrapper;
