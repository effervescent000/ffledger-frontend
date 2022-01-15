import React, { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext } from "../user-context";

const UndercutFrame = () => {
    const [buttonPressed, setButtonPressed] = useState("NOT_PRESSED");
    const [undercuts, setUndercuts] = useState([]);
    const { profile } = useContext(UserContext);

    const getItemName = async (id) => {
        let response = await axios
            .get(`${process.env.REACT_APP_DOMAIN}/item/get/${id}`)
            .then((response) => response.data)
            .then((data) => {
                return data.name;
            })
            .catch((error) => console.log(error));
        // console.log(response);
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
        // first reset undercuts
        setUndercuts([]);
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
                    const undercutObj = { name: item.name, retainer: isRetainerFound };
                    setUndercuts((undercuts) => [...undercuts, undercutObj]);
                }
            }
        }

        // iterate over the returned listings
        // find ones where the lowest price HQ listing is not one of the profile's retainers
        // ignore listings where none of the retainers' names are present
    };

    const findMyRetainer = (retainerNameArray, listings) => {
        let returnValue = false;
        listings.forEach((listing) => {
            if (retainerNameArray.includes(listing.retainerName)) {
                returnValue = listing.retainerName;
            }
        });
        return returnValue;
    };

    const renderUndercuts = () => {
        if (undercuts.length > 0) {
            return undercuts.map((item) => {
                return (
                    <div className="undercut-listing">
                        {item.name} on {item.retainer} may have been undercut
                    </div>
                );
            });
        }
    };

    return (
        <div id="undercut-frame-wrapper">
            <button onClick={getUndercuts}>Check for undercuts</button>
            <div id="undercut-wrapper">{renderUndercuts()}</div>
        </div>
    );
};

export default UndercutFrame;
