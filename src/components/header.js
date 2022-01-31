import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import LoggedInHeader from "./auth/logged-in-header";
import LoggedOutHeader from "./auth/logged-out-header";
import { UserContext } from "./user-context";

const Header = () => {
    const { user, loggedIn } = useContext(UserContext);

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
                    {loggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
                </div>
            </div>
        </div>
    );
};

export default Header;
