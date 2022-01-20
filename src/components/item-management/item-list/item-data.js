import React from "react";

const ItemData = (props) => {
    const item = props.item;
    return (
        <div className="item-data-wrapper">
            <div>Item ID {item.id}</div>
            <div>Recipes {item.recipes ? item.recipes.length : 0}</div>
            <div>Used in {item.components ? item.components.length : 0} recipes</div>
        </div>
    );
};

export default ItemData;
