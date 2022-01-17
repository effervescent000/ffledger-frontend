import React from "react";

const UnderCutItem = (props) => {
    return (
        <div className="undercut-item-wrapper">
            <div className="item-name">{props.item.name}</div>
            <div className="retainer-name">{props.item.retainer}</div>
            <div className="undercut-price">{props.item.price} gil</div>
        </div>
    );
};

export default UnderCutItem;
