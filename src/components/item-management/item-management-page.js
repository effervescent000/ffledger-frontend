import React from "react";

import ItemListWrapper from "./item-list/item-list-wrapper";
import PruneItemsWrapper from "./prune-items-wrapper";
import AddBySearch from "./add-by-search";

const ItemManagement = (props) => {
    // a database health check that picks some items at random and checks them against XIVAPI to make sure the data is correct

    return (
        <div id="item-management-wrapper">
            <ItemListWrapper />
            <PruneItemsWrapper />
            <AddBySearch />
        </div>
    );
};

export default ItemManagement;
