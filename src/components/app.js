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
import NoMatch from "./pages/no-match";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        if (!loggedIn) {
            axios
                .get(`${process.env.REACT_APP_DOMAIN}/auth/check`, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then((response) => {
                    console.log("auth/check response", response);
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

    const toggleLogIn = () => {
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

    const adminRoutes = () => {
        return [
            <Route key="user-management" path="/user-management">
                <UserManagement />
            </Route>,
            <Route key="item-management" path="/item-management">
                <ItemManagement />
            </Route>,
        ];
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
                    {loggedIn && Object.keys(user).length > 0 && user.roles === "admin"
                        ? adminRoutes()
                        : null}
                    <Route path="/profile/:id">{profileEditRoute()}</Route>
                    <Route>
                        <NoMatch />
                    </Route>
                </Switch>
            </UserContext.Provider>
        </Router>
    );
};

export default App;
