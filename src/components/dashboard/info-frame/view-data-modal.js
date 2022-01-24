import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#app-wrapper");

const ViewDataModal = (props) => {
    return (
        <ReactModal
            isOpen={props.modalIsOpen}
            className="view-data-modal"
            onRequestClose={() => {
                props.setModalIsOpen(false);
            }}
        >
            Testing the modal
        </ReactModal>
    );
};

export default ViewDataModal;
