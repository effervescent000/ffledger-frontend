import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const ManageProfiles = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        getProfiles();
    }, []);

    const populateProfiles = () => {
        return profiles.map((profile) => {
            return (
                <div key={profile.id} className="profile-wrapper">
                    <div className="radio-btn">
                        <input type="radio" name="is-active-radio" value={profile.id} />
                    </div>
                    <div className="text-wrapper">
                        <Link to={`/profile/${profile.id}`}>Profile for {profile.world.name}</Link>
                    </div>
                </div>
            );
        });
    };

    const getProfiles = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/profile/get`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                setProfiles(response.data);
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div className="content-wrapper">
            <div className="profiles">
                <Link to="/profile/new">Add new profile</Link>
                {populateProfiles()}
            </div>
        </div>
    );
};

export default ManageProfiles;
