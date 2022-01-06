import React, { useState, useEffect } from "react";
import UserManagementDetail from "../auth/user-management-detail";
import axios from "axios";

const UserManagement = () => {
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = () => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/auth/get/all`).then((response) => {
            setUsers(response.data);
        });
    };

    function populateUsers() {
        if (users.length > 0) {
            return users.map((user) => {
                return <UserManagementDetail key={user.id} user={user} />
            });
        }
    }

    return <div id="user-management-wrapper">{populateUsers()}</div>;
};

export default UserManagement;
