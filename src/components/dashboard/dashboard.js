import React, { useContext } from "react";
import { Link } from "react-router-dom";

import StockFrame from "./stock-frame";
import CraftingWrapper from "./crafting/crafting-wrapper";
import UndercutFrame from "./undercuts/undercut-frame";
import InfoFrame from "./info-frame";
import { UserContext } from "../user-context";

const Dashboard = (props) => {
    const { loggedIn, profile } = useContext(UserContext);

    const populateContent = () => {
        if (!loggedIn) {
            return loggedOutContent();
        } else if (Object.keys(profile).length === 0) {
            return noProfileContent();
        } else {
            return accountReadyContent();
        }
    };

    const loggedOutContent = () => {
        return (
            <div>
                {/* Some junk */}
                Please log in/make an account to use the site!
            </div>
        );
    };

    const noProfileContent = () => {
        return (
            <div>
                Please <Link to="/profile/new">create a profile</Link> to use the site.
            </div>
        );
    };

    const accountReadyContent = () => {
        return (
            <div id="content-wrapper">
                <div id="left-content-wrapper">
                    <StockFrame />
                </div>
                <div id="center-content-wrapper">
                    <CraftingWrapper />
                    <UndercutFrame />
                </div>
                <div id="right-content-wrapper">
                    <InfoFrame />
                </div>
            </div>
        );
    };

    return <div id="dashboard-wrapper">{populateContent()}</div>;
};

export default Dashboard;
