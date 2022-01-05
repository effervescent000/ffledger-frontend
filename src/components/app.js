import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./header";
import Dashboard from "./pages/dashboard";
import Ledger from "./pages/ledger";
import UserManagement from "./pages/user-management";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ManageProfiles from "./pages/manage-profiles";
import ProfileEdit from "./pages/profile-edit";
import ProfileCreate from "./pages/profile-create";
import { UserContext } from "./user-context";

export default function App(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        if (!loggedIn) {
            let loggedInUser = JSON.parse(localStorage.getItem("user"));
            if (loggedInUser) {
                loggedInUser = loggedInUser.access_token;
                toggleLogIn();
                // assume that the token needs to be refreshed
                // axios
                //     .post(`${process.env.REACT_APP_DOMAIN}/auth/refresh`, { loggedInUser })
                //     .then((response) => {
                //         // console.log(response);
                //         if (response.data) {
                //             localStorage.setItem("user", JSON.stringify(response.data));
                //         }
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //     });
                axios
                    .get(`${process.env.REACT_APP_DOMAIN}/profile/get/active`, {
                        headers: {
                            Authorization: `Bearer ${
                                JSON.parse(localStorage.getItem("user")).access_token
                            }`,
                        },
                    })
                    .then((response) => {
                        if (response.data) {
                            setProfile(response.data);
                        }
                    })
                    .catch((error) => console.log(error));
            }
        }
    });

    const getActiveProfile = async () => {
        if (loggedIn) {
            let activeProfile = {};
            let response = await axios
                .get(`${process.env.REACT_APP_DOMAIN}/profile/get/active`, {
                    headers: {
                        Authorization: `Bearer ${
                            JSON.parse(localStorage.getItem("user")).access_token
                        }`,
                    },
                })
                .then((response) => {
                    if (response.data) {
                        // activeProfile = response.data
                        return response.data;
                    }
                })
                .catch((error) => console.log(error));
            console.log(response.resolve());
        }
    };

    const toggleLogIn = () => {
        if (loggedIn) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    };

    const dashboardRoute = () => {
        if (Object.keys(profile).length > 0) {
            return <Dashboard profile={profile} />;
        }
    };

    const profileEditRoute = () => {
        if (Object.keys(profile).length > 0) {
            return <ProfileEdit profile={profile} setProfile={setProfile} />;
        }
    };

    return (
        <Router>
            <UserContext.Provider value={{ loggedIn: loggedIn, toggleLogIn: toggleLogIn }}>
                <div className="app">
                    <Header />
                </div>
                <Switch>
                    <Route exact path="/">
                        {dashboardRoute()}
                    </Route>
                    <Route path="/ledger">
                        <Ledger />
                    </Route>
                    <Route path="/user-management">
                        <UserManagement />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/profiles/manage">
                        <ManageProfiles />
                    </Route>
                    <Route path="/profile/new">
                        <ProfileCreate />
                    </Route>
                    <Route path="/profile/:id">{profileEditRoute()}</Route>
                    {/* TODO add a catch-all route */}
                </Switch>
            </UserContext.Provider>
        </Router>
    );
}
