import Options from "./Options"
import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext"
import { formatCurrency } from "../../utilities"
import { Button } from "react-bootstrap"

export default function OrderEntry({ setOrderPhase }) {
    const { totals } = useOrderDetailsContext()

    // Disable order button if there aren't any scoops in order
    const orderDisabled = totals.scoops === 0

    return (
        <div>
            <h1>Design Your Sundae!</h1>
            <Options optionType='scoops' />
            <Options optionType='toppings' />
            <h2>Grand total: { formatCurrency(totals.scoops + totals.toppings) }</h2>

            {/* Oder button */}
            <Button
                disabled={orderDisabled} 
                onClick={() => setOrderPhase("review")} >
                Order Sundae!
            </Button>
        </div>
    )
}