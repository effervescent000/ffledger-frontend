import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManageProfiles() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        getProfiles();
    }, []);

    function populateProfiles() {
        return profiles.map((profile) => {
            return (
                <div key={profile.id} className="profile-wrapper">
                    <Link to={`/profile/${profile.id}`}>
                        Profile {profile.id} on {profile.world.name}
                    </Link>
                </div>
            );
        });
    }

    function getProfiles() {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/profile/get/all`, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).access_token
                    }`,
                },
            })
            .then((response) => {
                setProfiles(response.data);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="content-wrapper">
            <div className="profiles">
                <Link to="/profile/new">Add new profile</Link>
                {populateProfiles()}
            </div>
        </div>
    );
}
