import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserManagement() {
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        getUserList();
    }, []);

    function getUserList() {
        axios.get(`${process.env.REACT_APP_DOMAIN}/auth/get/all`).then((response) => {
            setUsers(response.data);
        });
    }

    function handleClick(id) {
        // todo lol
    }

    function populateUsers() {
        return users.map((user) => {
            return (
                <div key={user.id} className="user-wrapper">
                    <div key={`user-id-${user.id}`} className="user-id">{user.id}</div>
                    <div key={`username-${user.username}`} className="username">{user.username}</div>
                    <button key={`button-user-${user.id}`} value={user.id} onClick={() => handleClick(user.id)}>Edit</button>
                </div>
            );
        });
    }

    return (<div className="content-wrapper">{populateUsers()}</div>);
}
