import React, { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../user-context";

const Signup = () => {
    const { loggedIn, toggleLogIn } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            const user = {
                username: username,
                password: password,
            };
            axios
                .post(`${process.env.REACT_APP_DOMAIN}/auth/signup`, user, {
                    withCredentials: true,
                })
                .then((response) => {
                    if (!loggedIn) {
                        toggleLogIn();
                    }
                })
                .catch((error) => console.log(error));
        } else {
            setErrorMessage("Passwords don't match");
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
        setErrorMessage("");
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
                <button onClick={handleClick}>Sign up</button>
            </form>
            {errorMessage}
        </div>
    );
};

export default Signup;
