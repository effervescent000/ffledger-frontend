import React, { useContext } from "react";

import { UserContext } from "../user-context";

const StockFrame = (props) => {
    const userContext = useContext(UserContext);

    const handleClick = (event) => {
        event.preventDefault();
        const selectedItem = event.target.value;
        const amount = -1;
        const gilValue = 0;

        props.postTransaction(selectedItem, amount, gilValue);
    };

    const populateStock = () => {
        return props.stock.map((stockItem) => {
            return (
                <div key={stockItem.id} className="stock-item">
                    <div className="item-name">{stockItem.item.name}</div>
                    <div className="item-amount-wrapper">
                        <div className="item-amount">{stockItem.amount}</div>
                        <button value={stockItem.item.id} onClick={handleClick}>
                            Remove 1
                        </button>
                    </div>
                </div>
            );
        });
    };

    if (!userContext.loggedIn) {
        return <div id="stock-frame-wrapper">Please log in to view stock</div>;
    }

    return (
        <div id="stock-frame-wrapper">
            <span id="stock-label">Current stock</span>
            <div id="stock-frame">{populateStock()}</div>
        </div>
    );
};

export default StockFrame;
