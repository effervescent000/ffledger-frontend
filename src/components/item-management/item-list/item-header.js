import React from "react";

const ItemHeader = (props) => {
    const { name } = props.item;
    return (
        <div className="item-wrapper item-list-grid">
            <div className="name">{name}</div>
            <div className="btns-wrapper">
                <div>
                    <button>Edit</button>
                </div>
                <div>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ItemHeader;
