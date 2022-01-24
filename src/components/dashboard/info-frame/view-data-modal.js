import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ReactModal from "react-modal";

ReactModal.setAppElement("#app-wrapper");

const ViewDataModal = (props) => {
    const [transactionArray, setTransactionArray] = useState([]);
    const [itemName, setItemName] = useState("");

    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/get/${props.itemSelectValue}`)
            .then((response) => {
                setItemName(response.data.name);
            })
            .catch((error) => console.log(error.response));

        axios
            .get(`${process.env.REACT_APP_DOMAIN}/transaction/get/item/${props.itemSelectValue}`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                setTransactionArray(response.data);
            })
            .catch((error) => console.log(error.response));
    };

    const populateTransactions = () => {
        return transactionArray.map((transaction) => {
            return (
                <div key={transaction.id} className="transaction-wrapper">
                    <div>{transaction.time}</div>
                    <div>{transaction.amount}</div>
                    <div>{transaction.gil_value}</div>
                </div>
            );
        });
    };

    return (
        <ReactModal
            isOpen={props.modalIsOpen}
            className="view-data-modal"
            onRequestClose={() => {
                props.setModalIsOpen(false);
            }}
            onAfterOpen={getData}
        >
            <div className="transaction-array-header">
                {itemName ? `Transactions for ${itemName}` : null}
            </div>
            <div id="transaction-array-wrapper">
                <div className="transaction-wrapper sub-header">
                    <div>Time</div>
                    <div>Amount</div>
                    <div>Gil</div>
                </div>
                {populateTransactions()}
            </div>
        </ReactModal>
    );
};

export default ViewDataModal;
