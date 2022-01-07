import React from "react";
import { NavLink } from "react-router-dom";

import AccountStatus from "./auth/account-status"

export default function () {
    return (
        <div id="header-wrapper">
            <div id="left-side-header">
                <div className="logo">
                    <span>FFXIV Ledger</span>
                </div>
                <div className="nav-bar">
                    <NavLink exact to="/">Dashboard</NavLink>
                    <NavLink to="/ledger" className="NYI">Ledger</NavLink>
                </div>
            </div>
            <div id="right-side-header">
                <div id="admin-wrapper">
                    <NavLink to="/user-management">User Management</NavLink>
                    <NavLink to="/item-management">Item Management</NavLink>
                </div>
                <div id="account-wrapper">
                    <AccountStatus />
                </div>
            </div>
        </div>
    );
}
