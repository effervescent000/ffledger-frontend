import React from "react";

import StockFrame from "../dashboard/stock-frame";
import CraftingQueue from "../dashboard/crafting/crafting-wrapper";
import UndercutFrame from "../dashboard/undercut-frame";
import InfoFrame from "../dashboard/info-frame";

export default function (props) {
    return (
        <div id="page-wrapper">
            <div id="content-wrapper">
                <div id="left-content-wrapper">
                    <StockFrame />
                </div>
                <div id="center-content-wrapper">
                    <CraftingQueue />
                    <UndercutFrame profile={props.profile} />
                </div>
                <div id="right-content-wrapper">
                    <InfoFrame />
                </div>
            </div>
        </div>
    );
}
