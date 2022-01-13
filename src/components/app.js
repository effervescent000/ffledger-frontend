import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Header from "./header";
import Dashboard from "./pages/dashboard";
import Ledger from "./pages/ledger";
import UserManagement from "./pages/user-management";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ManageProfiles from "./pages/manage-profiles";
import ProfileEdit from "./pages/profile-edit";
import ProfileCreate from "./pages/profile-create";
import ItemManagement from "./pages/item-management";
import { UserContext } from "./user-context";

export default function App(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState({});
    // const {profile, setProfile} = useContext(UserContext);

    useEffect(() => {
        if (!loggedIn) {
            // pass cookies to a get-user-from-cookies endpoint
            // this endpoint should return a user object if the jwt is valid, or (an empty object?) if not
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/auth/check`, { withCredentials: true })
                .then((response) => {
                    console.log(response);
                    if (Object.keys(response.data).length > 0) {
                        toggleLogIn();
                        setUser(response.data);
                    }
                })
                .catch((error) => console.log("Error loading user", error));
        } else {
            if (Object.keys(user).length > 0 && Object.keys(profile).length === 0) {
                for (let each_profile of user.profiles) {
                    if (each_profile.is_active) {
                        setProfile(each_profile);
                        break;
                    }
                }
            }
        }
    });

    const getActiveProfile = async () => {
        if (loggedIn) {
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
                        if (Object.keys(response.data).length === 0) {
                            setProfile(null);
                        } else {
                            setProfile(response.data);
                        }
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    const toggleLogIn = async () => {
        if (loggedIn) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    };

    const dashboardRoute = () => {
        if (profile && Object.keys(profile).length > 0) {
            return <Dashboard profile={profile} />;
        }
    };

    const profileEditRoute = () => {
        if (profile && Object.keys(profile).length > 0) {
            return <ProfileEdit profile={profile} setProfile={setProfile} />;
        }
    };

    return (
        <Router>
            <UserContext.Provider
                value={{ loggedIn, toggleLogIn, profile, setProfile, user, setUser }}
            >
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
                    <Route path="/item-management">
                        <ItemManagement />
                    </Route>
                    <Route path="/profile/:id">{profileEditRoute()}</Route>
                    {/* TODO add a catch-all route */}
                </Switch>
            </UserContext.Provider>
        </Router>
    );
}
