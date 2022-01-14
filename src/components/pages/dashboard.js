import React, { useContext } from "react";

import StockFrame from "../dashboard/stock-frame";
import CraftingWrapper from "../dashboard/crafting/crafting-wrapper";
import UndercutFrame from "../dashboard/undercut-frame";
import InfoFrame from "../dashboard/info-frame";
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
                Hey you don't have a profile set, please create one to use the site :)
                {/* also some crap here ufck you prettier */}
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
                    <UndercutFrame profile={props.profile} />
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
