import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddBySearch = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClick = async (event) => {
        event.preventDefault();
        setButtonClicked(true);
        // ping XIVAPI for the search term
        let processedItems = await axios
            .get(`https://xivapi.com/search?indexes=Item&string=${searchTerm}`)
            .then((response) => {
                // console.log("search results", response.data)
                return processResults(response.data.Results);
            })
            .catch((error) => console.log("Error fetching search results from XIVAPI", error));
        // once all the matching results have been processed, change buttonClicked back to false
        // pass the array to setResults
        setButtonClicked(false);
        console.log(processedItems);
        setResults(processedItems);
    };

    const processResults = async (results) => {
        const processedItemsArray = [];
        for (let i = 0; i < results.length; i++) {
            if (results[i].Name.startsWith(searchTerm)) {
                await axios
                    .post(
                        `${process.env.REACT_APP_DOMAIN}/item/add`,
                        { ID: results[i].ID },
                        {
                            withCredentials: true,
                            headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                        }
                    )
                    .then((response) => {
                        processedItemsArray.push(response.data);
                        return response.data;
                    })
                    .catch((error) => console.log("Error in processResults", error));
            }
        }
        return processedItemsArray;
    };

    const renderResult = () => {
        if (buttonClicked && results.length === 0) {
            return <div>It's out in the universe now</div>;
        } else if (results.length > 0) {
            return results.map((result) => {
                return <div key={result.id}>{result.name}</div>;
            });
        }
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleChange} />
            <button onClick={handleClick}>Add</button>
            {renderResult()}
        </div>
    );
};

export default AddBySearch;
