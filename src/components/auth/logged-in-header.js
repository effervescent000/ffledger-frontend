import React, {useContext} from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../user-context";

export default function () {
    const userContext = useContext(UserContext);

    const handleClick = event => {
        event.preventDefault();
        if (userContext.loggedIn === true) {
            userContext.toggleLogIn()
            localStorage.clear()
        }
    }

    return (
        <div id="logged-in">
            <div id="greeting">Hi uhhh username!</div>
            <div id="manage-profiles-wrapper">
                <Link to="/profiles/manage">Manage profiles</Link>
            </div>
            <div id="logout">
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
}
