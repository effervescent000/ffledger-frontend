import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import ProfileForm from "../forms/profile-form";

const ProfileEdit = (props) => {
    const { permalink } = useParams();
    const [formData, setFormData] = useState({});
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        if (permalink !== "new" && Object.keys(profileData).length === 0) {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/profile/get/${permalink}`, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then((response) => {
                    setProfileData(response.data);
                })
                .catch((error) => console.log(error.response));
        } else if (Object.keys(formData).length > 0) {
            if (permalink === "new") {
                axios
                    .post(`${process.env.REACT_APP_DOMAIN}/profile/add`, formData, {
                        withCredentials: true,
                        headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => console.log(error.response));
            } else {
                axios
                    .put(
                        `${process.env.REACT_APP_DOMAIN}/profile/update`,
                        { id: permalink, ...formData },
                        {
                            withCredentials: true,
                            headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                        }
                    )
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => console.log(error.response));
            }
        }
    });

    const renderForm = () => {
        if (permalink === "new") {
            return <ProfileForm setFormData={setFormData} />;
        } else if (Object.keys(profileData).length > 0) {
            return <ProfileForm setFormData={setFormData} profileData={profileData} />;
        }
    };

    return <div id="profile-form-wrapper">{renderForm()}</div>;
    // const [alcLevel, setAlcLevel] = useState(props.profile.alc_level);
    // const [armLevel, setArmLevel] = useState(props.profile.arm_level);
    // const [bsmLevel, setBsmLevel] = useState(props.profile.bsm_level);
    // const [crpLevel, setCrpLevel] = useState(props.profile.crp_level);
    // const [culLevel, setCulLevel] = useState(props.profile.cul_level);
    // const [gsmLevel, setGsmLevel] = useState(props.profile.gsm_level);
    // const [ltwLevel, setLtwLevel] = useState(props.profile.ltw_level);
    // const [wvrLevel, setWvrLevel] = useState(props.profile.wvr_level);
    // const [retainers, setRetainers] = useState(props.profile.retainers);

    // const handleClick = (event) => {
    //     event.preventDefault();
    //     if (event.target.name === "add-retainer-btn") {
    //         setRetainers([...retainers, { id: 0, profile_id: 0, name: "" }]);
    //     } else if (event.target.name === "save-btn") {
    //         const newProfile = { id: props.profile.id, world: props.profile.world };

    //         if (alcLevel !== 0) {
    //             newProfile.alc_level = alcLevel;
    //         }
    //         if (armLevel !== 0) {
    //             newProfile.arm_level = armLevel;
    //         }
    //         if (bsmLevel !== 0) {
    //             newProfile.bsm_level = bsmLevel;
    //         }
    //         if (crpLevel !== 0) {
    //             newProfile.crp_level = crpLevel;
    //         }
    //         if (culLevel !== 0) {
    //             newProfile.cul_level = culLevel;
    //         }
    //         if (gsmLevel != 0) {
    //             newProfile.gsm_level = gsmLevel;
    //         }
    //         if (ltwLevel != 0) {
    //             newProfile.ltw_level = ltwLevel;
    //         }
    //         if (wvrLevel != 0) {
    //             newProfile.wvr_level = wvrLevel;
    //         }
    //         if (retainers.length > 0) {
    //             newProfile.retainers = retainers;
    //         }

    //         axios
    //             .put(`${process.env.REACT_APP_DOMAIN}/profile/update`, newProfile, {
    //                 withCredentials: true,
    //                 headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
    //             })
    //             .then((response) => {
    //                 props.setProfile(response.data);
    //             });
    //     }
    // };

    // const handleChange = async (event, i) => {
    //     event.persist();
    //     if (event.target.name === "alcLevel") {
    //         setAlcLevel(event.target.value);
    //     } else if (event.target.name === "armLevel") {
    //         setArmLevel(event.target.value);
    //     } else if (event.target.name === "bsmLevel") {
    //         setBsmLevel(event.target.value);
    //     } else if (event.target.name === "crpLevel") {
    //         setCrpLevel(event.target.value);
    //     } else if (event.target.name === "culLevel") {
    //         setCulLevel(event.target.value);
    //     } else if (event.target.name === "gsmLevel") {
    //         setGsmLevel(event.target.value);
    //     } else if (event.target.name === "ltwLevel") {
    //         setLtwLevel(event.target.value);
    //     } else if (event.target.name === "wvrLevel") {
    //         setWvrLevel(event.target.value);
    //     } else if (event.target.name == "retainer-name") {
    //         setRetainers((retainers) => {
    //             // console.log(retainers);
    //             const newRetainers = [...retainers];
    //             // console.log(i, newRetainers);
    //             newRetainers[i].name = event.target.value;
    //             return newRetainers;
    //         });
    //     }
    // };

    // const retainerInputs = () => {
    //     const inputs = [];
    //     for (let i = 0; i < retainers.length; i++) {
    //         inputs.push(
    //             <div key={`retainer-${i + 1}`} className="input-wrapper">
    //                 Retainer {i + 1}{" "}
    //                 <input
    //                     type="text"
    //                     name="retainer-name"
    //                     id={retainers[i] ? retainers[i].id : ""}
    //                     value={retainers[i] ? retainers[i].name : ""}
    //                     onChange={(event) => handleChange(event, i)}
    //                 />
    //             </div>
    //         );
    //     }
    //     return inputs;
    // };

    // return (
    //     <div className="content-wrapper">
    //         Profile for World {props.profile.world.name}
    //         <div id="jobs-wrapper">
    //             <div className="input-wrapper">
    //                 <span>ALC level</span>
    //                 <input
    //                     type="number"
    //                     name="alcLevel"
    //                     id="alc-level-input"
    //                     value={alcLevel}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="input-wrapper">
    //                 ARM level{" "}
    //                 <input
    //                     type="number"
    //                     name="armLevel"
    //                     id="arm-level-input"
    //                     value={armLevel}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="input-wrapper">
    //                 BSM level{" "}
    //                 <input
    //                     type="number"
    //                     name="bsmLevel"
    //                     id="bsm-level-input"
    //                     value={bsmLevel}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="input-wrapper">
    //                 CRP level{" "}
    //                 <input
    //                     type="number"
    //                     name="crpLevel"
    //                     id="crp-level-input"
    //                     value={crpLevel}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="input-wrapper">
    //                 CUL level{" "}
    //                 <input
    //                     type="number"
    //                     name="culLevel"
    //                     id="cul-level-input"
    //                     value={culLevel}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="input-wrapper">
    //                 GSM level{" "}
    //                 <input
    //                     type="number"
    //                     name="gsmLevel"
    //                     id="gsm-level-input"
    //                     value={gsmLevel}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="input-wrapper">
    //                 LTW level{" "}
    //                 <input
    //                     type="number"
    //                     name="ltwLevel"
    //                     id="ltw-level-input"
    //                     value={ltwLevel}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="input-wrapper">
    //                 WVR level{" "}
    //                 <input
    //                     type="number"
    //                     name="wvrLevel"
    //                     id="wvr-level-input"
    //                     value={wvrLevel}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //         </div>
    //         <div id="retainers-wrapper">
    //             {retainerInputs()}
    //             <button name="add-retainer-btn" onClick={handleClick}>
    //                 Add retainer
    //             </button>
    //         </div>
    //         <button name="save-btn" id="save-btn" onClick={handleClick}>
    //             Save
    //         </button>
    //     </div>
    // );
};

export default ProfileEdit;
