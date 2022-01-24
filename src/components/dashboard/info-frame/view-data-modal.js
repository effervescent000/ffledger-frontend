import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ReactModal from "react-modal";

ReactModal.setAppElement("#app-wrapper");

const ViewDataModal = (props) => {
    const [transactionArray, setTransactionArray] = useState([]);

    const getTransactions = () => {
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
                <div className="transaction-wrapper">
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
            onAfterOpen={getTransactions}
        >
            {populateTransactions()}
        </ReactModal>
    );
};

export default ViewDataModal;
