import React, { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext } from "../../user-context";
import UnderCutItem from "./undercut-item";

const UndercutFrame = () => {
    const [buttonPressed, setButtonPressed] = useState(false);
    const [undercuts, setUndercuts] = useState([]);
    const { profile } = useContext(UserContext);
    const [status, setStatus] = useState("");

    const getItemName = async (id) => {
        let response = await axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/get/${id}`)
            .then((response) => response.data)
            .then((data) => {
                return data.name;
            })
            .catch((error) => console.log(error));
        return response;
    };

    const getStockIds = async () => {
        const stockIdArray = [];
        await axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/stock`, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
            })
            .then((response) => {
                // console.log(response.data)
                response.data.forEach((item) => {
                    stockIdArray.push(item.item.id);
                });
            })
            .catch((error) => console.log(error));
        return stockIdArray;
    };

    const getUndercuts = async () => {
        if (profile.retainers.length > 0) {
            const stockIds = (await getStockIds()).join(",");
            const retainerNameArray = [];
            profile.retainers.forEach((retainer) => {
                retainerNameArray.push(retainer.name);
            });
            const data = await axios
                .get(`https://universalis.app/api/${profile.world.id}/${stockIds}`)
                .then((response) => response.data);

            for (const item of data.items) {
                const isRetainerFound = findMyRetainer(retainerNameArray, item.listings);
                // first make sure one of my retainers is there, if not then don't bother
                if (isRetainerFound) {
                    // now find the index of the first HQ listing
                    let row = -1;
                    let hqFound = false;
                    while (row < item.listings.length && !hqFound) {
                        row++;
                        if (item.listings[row].hq) {
                            hqFound = true;
                        }
                    }
                    // check if the first HQ listing found belongs to one of my retainers:
                    if (!retainerNameArray.includes(item.listings[row].retainerName)) {
                        item.name = await getItemName(item.itemID);
                        // create an object with the relevant information and add it to undercuts
                        const undercutObj = {
                            name: item.name,
                            retainer: isRetainerFound,
                            price: Math.round(item.listings[row].pricePerUnit / 1.05),
                        };
                        setUndercuts((undercuts) => [...undercuts, undercutObj]);
                    }
                }
            }
        } else {
            setStatus("Please set up retainers for this profile to use this feature");
        }

        setButtonPressed(false);
    };

    const findMyRetainer = (retainerNameArray, listings) => {
        for (let listing of listings) {
            if (retainerNameArray.includes(listing.retainerName)) {
                return listing.retainerName;
            }
        }
    };

    const renderUndercuts = () => {
        if (buttonPressed) {
            return <span>Thinking...</span>;
        } else if (undercuts.length > 0) {
            return undercuts.map((undercut) => {
                return <UnderCutItem item={undercut} />;
            });
        } else {
            return <span>{status}</span>;
        }
    };

    const handleClick = (event) => {
        if (event.target.name === "undercut-btn") {
            setButtonPressed(true);
            setUndercuts([]);
            setStatus("");
            getUndercuts();
        }
    };

    return (
        <div id="undercut-frame-wrapper">
            <button name="undercut-btn" onClick={handleClick} disabled={buttonPressed}>
                Check for undercuts
            </button>
            {undercuts.length > 0 ? (
                <div id="undercuts-header">
                    <div className="item-name">Item</div>
                    <div className="retainer-name">Retainer</div>
                    <div className="undercut-price">Lowest price</div>
                </div>
            ) : null}

            <div id="undercut-wrapper">{renderUndercuts()}</div>
        </div>
    );
};

export default UndercutFrame;
