import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import ProfileListing from "./profile-listing";

const ManageProfiles = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        getProfiles();
    }, []);

    const populateProfiles = () => {
        return profiles.map((profile) => {
            return <ProfileListing key={profile.id} profile={profile} getProfiles={getProfiles} />;
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
