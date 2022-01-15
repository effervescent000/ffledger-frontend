import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import UserManagementDetail from "./user-management-detail";

const UserManagement = () => {
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/auth/get/all`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                setUsers(response.data);
            });
    };

    const populateUsers = () => {
        if (users.length > 0) {
            return users.map((user) => {
                return <UserManagementDetail key={user.id} user={user} />;
            });
        }
    };

    return <div id="user-management-wrapper">{populateUsers()}</div>;
};

export default UserManagement;
