import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext } from "../user-context";

const ProfileCreate = () => {
    const [worlds, setWorlds] = useState([]);
    const {setProfile} = useContext(UserContext)

    useEffect(() => {
        getWorlds();
    }, []);

    const handleClick = () => {
        const newProfile = { world: document.getElementById("world-select").value };

        const alcLevel = document.getElementById("alc-level-input").value;
        const armLevel = document.getElementById("arm-level-input").value;
        const bsmLevel = document.getElementById("bsm-level-input").value;
        const crpLevel = document.getElementById("crp-level-input").value;
        const culLevel = document.getElementById("cul-level-input").value;
        const gsmLevel = document.getElementById("gsm-level-input").value;
        const ltwLevel = document.getElementById("ltw-level-input").value;
        const wvrLevel = document.getElementById("wvr-level-input").value;

        if (alcLevel !== "") {
            newProfile.alc_level = alcLevel;
        }
        if (armLevel !== "") {
            newProfile.arm_level = armLevel;
        }
        if (bsmLevel !== "") {
            newProfile.bsm_level = bsmLevel;
        }
        if (crpLevel !== "") {
            newProfile.crp_level = crpLevel;
        }
        if (culLevel !== "") {
            newProfile.cul_level = culLevel;
        }
        if (gsmLevel !== "") {
            newProfile.gsm_level = gsmLevel;
        }
        if (ltwLevel !== "") {
            newProfile.ltw_level = ltwLevel;
        }
        if (wvrLevel !== "") {
            newProfile.wvr_level = wvrLevel;
        }

        axios
            .post(`${process.env.REACT_APP_DOMAIN}/profile/add`, newProfile, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                if (response.data.is_active) {
                    setProfile(response.data)
                }
            })
            .catch((error) => console.log(error.response));
    };

    return (
        <div className="content-wrapper">
            <select id="world-select">{populateWorldSelect()}</select>
            <div className="input-wrapper">
                ALC level <input type="number" id="alc-level-input" />
            </div>
            <div className="input-wrapper">
                ARM level <input type="number" id="arm-level-input" />
            </div>
            <div className="input-wrapper">
                BSM level <input type="number" id="bsm-level-input" />
            </div>
            <div className="input-wrapper">
                CRP level <input type="number" id="crp-level-input" />
            </div>
            <div className="input-wrapper">
                CUL level <input type="number" id="cul-level-input" />
            </div>
            <div className="input-wrapper">
                GSM level <input type="number" id="gsm-level-input" />
            </div>
            <div className="input-wrapper">
                LTW level <input type="number" id="ltw-level-input" />
            </div>
            <div className="input-wrapper">
                WVR level <input type="number" id="wvr-level-input" />
            </div>
            <button id="save-btn" onClick={handleClick}>
                Save
            </button>
        </div>
    );

    function populateWorldSelect() {
        return worlds.map((world) => {
            return (
                <option key={world.id} value={world.id}>
                    {world.name}
                </option>
            );
        });
    }

    function getWorlds() {
        axios.get(`${process.env.REACT_APP_DOMAIN}/world/get/all`).then((response) => {
            setWorlds(response.data);
        });
    }
}

export default ProfileCreate