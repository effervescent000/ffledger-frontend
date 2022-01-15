import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserManagementDetail = (props) => {
    const { id, username } = props.user;
    const [role, setRole] = useState(props.user.roles ? props.user.roles : "");

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleClick = (event) => {
        if (event.target.name === "save-btn") {
            const userData = {
                id,
                username,
                role,
            };
            axios
                .put(`${process.env.REACT_APP_DOMAIN}/auth/update`, userData, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .catch((error) => console.log("Error updating user", error.response));
        } else if (event.target.name === "delete-btn") {
            axios
                .delete(`${process.env.REACT_APP_DOMAIN}/auth/delete/${id}`, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => console.log(error.response));
        }
    };

    return (
        <div key={id} className="user-wrapper">
            <div className="user-id">{id}</div>
            <div className="username">{username}</div>
            <div className="user-role">
                <select name="user-role-select" value={role} onChange={handleChange}>
                    <option value="">User</option>
                    <option value="super_user">Super-user</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="btn-wrapper">
                <div className="btn">
                    <button name="save-btn" value={id} onClick={handleClick}>
                        Save
                    </button>
                </div>
                <div className="btn">
                    <button name="delete-btn" value={id} onClick={handleClick}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagementDetail;
