import React from "react";

export const UserContext = React.createContext({
    loggedIn: false,
    toggleLogIn: () => {},
    profile: {},
    setProfile: () => {},
    user: {},
    setUser: () => {},
});
