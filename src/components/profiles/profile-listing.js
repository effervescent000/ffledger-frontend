import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext } from "../user-context";

const ProfileListing = (props) => {
    const { profile, getProfiles } = props;
    const { setProfile } = useContext(UserContext);

    const handleChange = (event) => {
        if (event.target.name === "is-active-radio") {
            axios
                .put(
                    `${process.env.REACT_APP_DOMAIN}/profile/activate`,
                    { id: event.target.value },
                    {
                        withCredentials: true,
                        headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                    }
                )
                .then((response) => {
                    getProfiles();
                    setProfile(response.data);
                })
                .catch((error) => console.log(error.response));
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="radio-btn">
                <input
                    type="radio"
                    name="is-active-radio"
                    value={profile.id}
                    checked={profile.is_active}
                    onChange={handleChange}
                />
            </div>
            <div className="text-wrapper">
                <Link to={`/profile/${profile.id}`}>Profile for {profile.world.name}</Link>
            </div>
        </div>
    );
};

export default ProfileListing;
