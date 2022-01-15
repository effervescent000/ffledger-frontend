import React, { useState, useContext } from "react";
import { UserContext } from "../user-context";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const AccountEditPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [usernameInput, setUsernameInput] = useState(user.username);
    const [emailInput, setEmailInput] = useState("");
    const [confirmDeleteStyle, setConfirmDeleteStyle] = useState("none");
    const history = useHistory();

    const handleChange = (event) => {
        if (event.target.name === "username-input") {
            setUsernameInput(event.target.value);
        } else if (event.target.name === "email-input") {
            setEmailInput(event.target.value);
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        if (event.target.name === "save-btn") {
            axios
                .put(
                    `${process.env.REACT_APP_DOMAIN}/auth/update`,
                    {
                        id: user.id,
                        username: usernameInput,
                        email: emailInput,
                    },
                    {
                        withCredentials: true,
                        headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                    }
                )
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => console.log(error.response));
        } else if (event.target.naem === "delete-btn") {
            setConfirmDeleteStyle("block");
        } else if (event.target.name === "confirm-delete-btn") {
            axios
                .delete(`${process.env.REACT_APP_DOMAIN}`, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then((response) => {
                    history.push("/");
                })
                .catch((error) => console.log(error.response));
        }
    };

    return (
        <div id="account-edit-wrapper">
            <div className="input-wrapper">
                <input
                    type="text"
                    name="username-input"
                    value={usernameInput}
                    onChange={handleChange}
                />
                <input type="email" name="email-input" value={emailInput} onChange={handleChange} />
                <button name="save-btn" onClick={handleClick}>
                    Save
                </button>
            </div>
            <div className="delete-wrapper">
                <div className="delete-btn">
                    Delete your account?{" "}
                    <span className="warning">WARNING: THIS CANNOT BE UNDONE!</span>
                    <button name="delete-btn" onClick={handleClick}>
                        Delete account
                    </button>
                </div>
                <div className="secret-delete-btn" style={{ display: confirmDeleteStyle }}>
                    <button name="confirm-delete-btn" onClick={handleClick}>
                        Confirm account deletion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountEditPage;
