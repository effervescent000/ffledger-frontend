import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserManagementDetail = (props) => {
    const { id, username } = props.user;
    const [role, setRole] = useState(props.user.roles ? props.user.roles : "");

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleClick = () => {
        const userData = {
            id: id,
            username: username,
            role: role,
        };
        axios
            .put(`${process.env.REACT_APP_DOMAIN}/auth/update`, userData, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => console.log(response))
            .catch((error) => console.log("Error updating user", error));
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
            <button value={id} onClick={handleClick}>
                Save
            </button>
        </div>
    );
};

export default UserManagementDetail;
