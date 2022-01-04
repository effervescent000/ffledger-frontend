import React from "react";

import { UserContext } from "../user-context";
import LoggedInHeader from "./logged-in-header";
import LoggedOutHeader from "./logged-out-header";

export default function AccountStatus() {
    return (
        <UserContext.Consumer>
            {({ loggedIn, toggleLogIn }) => (
                <div>{loggedIn === false ? <LoggedOutHeader /> : <LoggedInHeader />}</div>
            )}
        </UserContext.Consumer>
    );
}
