import React from "react";
import { NavLink } from "react-router-dom";

export default function (props) {
    return (
        <div className="login-signup-wrapper">
            <div>
                <NavLink to="/login">Login</NavLink>
            </div>
            <div>
                <NavLink to="/signup">Signup</NavLink>
            </div>
        </div>
    );
}
