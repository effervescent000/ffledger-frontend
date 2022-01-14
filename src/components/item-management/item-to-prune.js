import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ItemToPrune = (props) => {
    const id = props.item.id;

    const handleClick = (event) => {
        axios
            .delete(`${process.env.REACT_APP_DOMAIN}/item/delete/${id}`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                props.removeItem(id);
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div className="item-wrapper">
            <div className="item-name">{props.item.name}</div>
            <div className="btn">
                <button onClick={handleClick}>Remove item</button>
            </div>
        </div>
    );
};

export default ItemToPrune;
