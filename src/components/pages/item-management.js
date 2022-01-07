import React, {useState} from "react";

import AddBySearch from "../item-management/add-by-search";

const ItemManagement = props => {
    // const [items, setItems] = useState([])

    // a component for pruning items (auto-find junk like coffers and prompt for removal)
    
    // a database health check that picks some items at random and checks them against XIVAPI to make sure the data is correct

    // a way of adding items via search (to avoid heroku just timing out when Im using postman) <--- this is the most important

    return (
        <div id="item-management-wrapper">
            <AddBySearch />
        </div>
    )

}

export default ItemManagement