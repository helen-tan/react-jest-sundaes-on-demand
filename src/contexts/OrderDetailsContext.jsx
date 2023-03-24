import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetailsContext = createContext()

// create custom hook to check whether we are in a provider
export function useOrderDetailsContext() {
    const contextValue = useContext(OrderDetailsContext)

    if (!contextValue) {
        throw new Error ("useOrderDetailsContext must be called from within an OrderDetailsProvider")
    }

    return contextValue
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: {},    // e.g. { Chocolate: 1, Vanilla: 2 }
        toppings: {}   // e.g. { "Gummy Bears": 1 }
    })

    function updateItemCount(itemName, newItemCount, optionType) {
        // make a copy of existing state
        const newOptionCounts = { ...optionCounts }

        // update the copy with the new information
        newOptionCounts[optionType][itemName] = newItemCount

        // update the state with the updated copy
        setOptionCounts(newOptionCounts)
    }

    function resetOrder() {
        setOptionCounts({ scoops: {}, toppings: {} })
    }

    // utility function to derive totals from optionCounts state value (not for exporting)
    function calculateTotal(optionType) {
        // get an array of counts for the option type e.g. [1, 2]
        const countsArray = Object.values(optionCounts[optionType])

        // total the values in the array of counts for the number of items
        const totalCount = countsArray.reduce((total, value) => total + value, 0)

        // get the total cost: multiply total no. of items by price for this item type
        return totalCount * pricePerItem(optionType)
    }

    const totals = {
        scoops: calculateTotal("scoops"),
        toppings: calculateTotal("toppings")
    }

    const value = { optionCounts, totals, updateItemCount, resetOrder }
    return <OrderDetailsContext.Provider value={value} {...props}/>
}