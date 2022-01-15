import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { UserContext } from "../user-context";

const Login = () => {
    const { loggedIn, toggleLogIn, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = (event) => {
        event.preventDefault();
        const user = {
            username: username,
            password: password,
        };
        axios
            .post(`${process.env.REACT_APP_DOMAIN}/auth/login`, user, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (!loggedIn) {
                    toggleLogIn();
                    setUser(response.data);
                }
            })
            .catch((error) => {
                setErrorMessage(error.response.data);
            });
    };

    const handleChange = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
        setErrorMessage("");
    };

    return (
        <div id="login-wrapper">
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
                <button onClick={handleClick}>Login</button>
            </form>
            {errorMessage}
        </div>
    );
};

export default Login;
