import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../user-context";
import LoggedInContent from "./logged-in-content";

const LoggedInHeader = (props) => {
    const userContext = useContext(UserContext);

    return (
        <div id="logged-in">
            <div className="full-menu">
                <div id="greeting">Hi {userContext.user.username}</div>
                <LoggedInContent />
            </div>
            <div className="hamburger-menu">
                <FontAwesomeIcon icon={faBars} onClick={props.toggleMenuDisplay} />
            </div>
        </div>
    );
};

export default LoggedInHeader;
