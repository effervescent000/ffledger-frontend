import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { UserContext } from "../user-context";

const LoggedInContent = (props) => {
    const userContext = useContext(UserContext);
    const handleClick = (event) => {
        event.preventDefault();
        if (userContext.loggedIn) {
            logoutUser();
        }
    };

    const logoutUser = () => {
        axios
            .post(
                `${process.env.REACT_APP_DOMAIN}/auth/logout`,
                {},
                {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                }
            )
            .then((response) => {
                userContext.setUser({});
                userContext.setProfile({});
                userContext.toggleLogIn();
            })
            .catch((error) => {
                if (error.response) {
                    console.log("error response", error.response);
                } else {
                    console.log("some other error logging out", error.response);
                }
            });
    };

    return (
        <div id="logged-in-content">
            <div className="link-wrapper">
                <Link to="/account/edit">Edit account</Link>
            </div>
            <div className="link-wrapper">
                <Link to="/profiles/manage">Manage profiles</Link>
            </div>
            <div id="logout">
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
};

export default LoggedInContent;
