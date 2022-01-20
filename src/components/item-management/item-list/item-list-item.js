import React from "react";
import Collapsible from "react-collapsible";

import ItemHeader from "./item-header";
import ItemData from "./item-data";

const ItemListItem = (props) => {
    return (
        <Collapsible
            trigger={<ItemHeader item={props.item} />}
            openedClassName="Collapsible-is-open"
        >
            <ItemData item={props.item} />
        </Collapsible>
    );
};

export default ItemListItem;
