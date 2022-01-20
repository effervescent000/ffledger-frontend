import React from "react";

const ItemData = (props) => {
    const item = props.item;
    return (
        <div>
            <span>Item ID {item.id}</span>
            <span>Recipes {item.recipes ? item.recipes.length : 0}</span>
            <span>Used in {item.components ? item.components.length : 0} recipes</span>
        </div>
    );
};

export default ItemData;
