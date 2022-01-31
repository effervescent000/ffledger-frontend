import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import LoggedInHeader from "./auth/logged-in-header";
import LoggedOutHeader from "./auth/logged-out-header";
import { UserContext } from "./user-context";
import LoggedInContent from "./auth/logged-in-content";

const Header = () => {
    const { user, loggedIn } = useContext(UserContext);
    const [menuDisplay, setMenuDisplay] = useState("none");

    const toggleMenuDisplay = () => {
        setMenuDisplay(menuDisplay === "none" ? "block" : "none");
    };

    const adminLinks = () => {
        return (
            <div id="admin-wrapper">
                <NavLink to="/user-management">User Management</NavLink>
                <NavLink to="/item-management">Item Management</NavLink>
            </div>
        );
    };

    return (
        <div id="header-wrapper">
            <div id="top-header">
                <div id="left-side-header">
                    <div className="logo">
                        <NavLink exact to="/">
                            <span>FFXIV Ledger</span>
                        </NavLink>
                    </div>
                    <div className="nav-bar">
                        <NavLink exact to="/">
                            Dashboard
                        </NavLink>
                        <NavLink to="/ledger" className="NYI">
                            Ledger
                        </NavLink>
                    </div>
                </div>
                <div id="right-side-header">
                    {user.roles === "admin" ? adminLinks() : null}
                    <div id="account-wrapper">
                        {loggedIn ? (
                            <LoggedInHeader toggleMenuDisplay={toggleMenuDisplay} />
                        ) : (
                            <LoggedOutHeader />
                        )}
                    </div>
                </div>
            </div>

            <div id="bottom-header" style={{ display: `${menuDisplay}` }}>
                <LoggedInContent />
            </div>
        </div>
    );
};

export default Header;
