import React, {useContext} from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../user-context";

const LoggedInHeader = () => {
    const userContext = useContext(UserContext);

    const handleClick = event => {
        event.preventDefault();
        if (userContext.loggedIn) {
            userContext.toggleLogIn()
            userContext.setProfile({})
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

export default LoggedInHeader;