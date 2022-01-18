import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { isEqual } from "lodash";
import sortArray from "sort-array";

import StockFrame from "./stock-frame";
import CraftingWrapper from "./crafting/crafting-wrapper";
import UndercutFrame from "./undercuts/undercut-frame";
import InfoFrame from "./info-frame";
import { UserContext } from "../user-context";

const Dashboard = (props) => {
    const { loggedIn, profile } = useContext(UserContext);
    const [stock, setStock] = useState([]);

    const populateContent = () => {
        if (!loggedIn) {
            return loggedOutContent();
        } else if (Object.keys(profile).length === 0) {
            return noProfileContent();
        } else {
            if (stock.length === 0) {
                getStock();
            }
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
                    <StockFrame postTransaction={postTransaction} stock={stock} />
                </div>
                <div id="center-content-wrapper">
                    <CraftingWrapper postTransaction={postTransaction} getStock={getStock} />
                    <UndercutFrame />
                </div>
                <div id="right-content-wrapper">
                    <InfoFrame postTransaction={postTransaction} />
                </div>
            </div>
        );
    };

    const postTransaction = (selectedItem, amount, gilValue) => {
        if (selectedItem !== undefined && amount !== undefined && gilValue !== undefined) {
            const transaction = {
                item_id: selectedItem,
                amount: amount,
                gil_value: gilValue,
            };
            axios
                .post(`${process.env.REACT_APP_DOMAIN}/transaction/add`, transaction, {
                    withCredentials: true,
                    headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                })
                .then(() => {
                    getStock();
                });
        }
    };

    const getStock = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/stock`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                const sortedData = sortArray(response.data, {
                    by: "name",
                    computed: {
                        name: (item) => item.item.name,
                    },
                });
                if (!isEqual(stock, sortedData)) {
                    setStock(sortedData);
                }
            })
            .catch((error) => console.log(error));
    };

    return <div id="dashboard-wrapper">{populateContent()}</div>;
};

export default Dashboard;
