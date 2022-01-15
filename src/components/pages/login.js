import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { UserContext } from "../user-context";

const Login = () => {
    const { loggedIn, toggleLogIn, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const handleClick = (event) => {
        event.preventDefault();
        const user = {
            username: username,
            password: password,
        };
        axios
            .post(`${process.env.REACT_APP_DOMAIN}/auth/login`, user, { withCredentials: true })
            .then((response) => {
                if (!loggedIn) {
                    toggleLogIn();
                    setUser(response.data);
                }
                history.push("/");
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
