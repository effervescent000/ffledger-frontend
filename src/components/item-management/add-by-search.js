import React, { useState } from "react";
import axios from "axios";

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
                return processResults(response.data.Results);
            })
            .catch((error) => console.log("Error fetching search results from XIVAPI", error));
        // once all the matching results have been processed, change buttonClicked back to false
        // pass the array to setResults
        setButtonClicked(false);
        setResults(processedItems);
    };

    const processResults = async (results) => {
        // make a new array for the results of the item processing
        const processedItemsArray = [];
        // iterate through search results
        // for each search result that starts with the given string, send a POST request to the backend to the "add a single item" endpoint
        // (do not do a GET check first b/c the POST endpoint will check to make sure it doesn't add duplicates and that would just be doubling up API calls)
        for (let i = 0; i < results.length; i++) {
            if (results[i].Name.startsWith(searchTerm)) {
                await axios
                    .post(`${process.env.REACT_APP_DOMAIN}/item/add`, { ID: results[i].ID })
                    .then((response) => {
                        processedItemsArray.push(response.data);
                        return response.data;
                    })
                    .catch((error) => console.log("Error in processResults", error));
            }
        }
        return processedItemsArray;

        // add each returned item to the above array
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
