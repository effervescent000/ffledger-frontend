import React from "react";

const ItemInfoPanel = (props) => {
    return (
        <div id="info-panel-wrapper">
            <div className="attribute">
                <div className="label">Current price</div>
                <div className="value">{props.item.price} gil</div>
            </div>
            <div className="attribute">
                <div className="label">Crafting cost</div>
                <div className="value">{props.item.craft_cost} gil</div>
            </div>
        </div>
    );
};

export default ItemInfoPanel;
