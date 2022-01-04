import React, { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../user-context";

export default function Signup() {
    const userContext = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClick = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            const user = {
                username: username,
                password: password,
            };
            axios
                .post(`${process.env.REACT_APP_DOMAIN}/auth/signup`, { user })
                .then((response) => {
                    localStorage.setItem("user", JSON.stringify(response.data[0]));
                    if (!userContext.loggedIn) {
                        userContext.toggleLogIn();
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    const handleChange = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        } else if (event.target.name === "confirm-password") {
            setConfirmPassword(event.target.value);
        }
    };

    return (
        <div id="signup-wrapper">
            <form>
                <input
                    type="text"
                    name="username"
                    id="username-input"
                    value={username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    id="password-input"
                    value={password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password-input"
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit" onClick={handleClick}>
                    Sign up
                </button>
            </form>
        </div>
    );
}