import React, { useState, useContext } from "react";
import { UserContext } from "../user-context";
import axios from "axios";
import Cookies from "js-cookie";

const AccountEditPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [usernameInput, setUsernameInput] = useState(user.username);
    const [emailInput, setEmailInput] = useState("");

    const handleChange = (event) => {
        if (event.target.name === "username-input") {
            setUsernameInput(event.target.value);
        } else if (event.target.name === "email-input") {
            setEmailInput(event.target.value);
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
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
    };

    return (
        <div id="account-edit-wrapper">
            <input
                type="text"
                name="username-input"
                value={usernameInput}
                onChange={handleChange}
            />
            <input type="email" name="email-input" value={emailInput} onChange={handleChange} />
            <button onClick={handleClick}>Save</button>
        </div>
    );
};

export default AccountEditPage;
