import Options from "./Options"
import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext"
import { formatCurrency } from "../../utilities"

export default function OrderEntry() {
    const { totals } = useOrderDetailsContext()

    return (
        <div>
            <h1>Design Your Sundae!</h1>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2>Grand total: { formatCurrency(totals.scoops + totals.toppings) }</h2>
        </div>
    )
}