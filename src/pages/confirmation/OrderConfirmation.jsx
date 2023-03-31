import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import AlertBanner from '../common/AlertBanner'
import { useOrderDetailsContext } from '../../contexts/OrderDetailsContext'

export default function OrderConfirmation({ setOrderPhase }) {
    const { resetOrder } = useOrderDetailsContext()
    const [orderNumber, setOrderNumber] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        Axios.post("http://localhost:3030/order")
        .then((response) => {
            setOrderNumber(response.data.orderNumber)
        })
        .catch(err => {
            console.log(err)
            setError(true)
        })

    }, [])

    const handleClick = () => {
        // clear out the order details
        resetOrder()
        // set new order phase, which will send us back to the order page once changed
        setOrderPhase("inProgress")
    }
    
    const newOrderButton = (
        <Button onClick={handleClick}>Create new order</Button>
    )

    if (error) {
        return (
            <>
                <AlertBanner message={null} variant={null} />
                {newOrderButton}
            </>
        )
    }

    if (!orderNumber) {
        return <div>Loading</div>
    } else {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>Thank You!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{ fontSize: "256" }}>
                    as per our terms and conditions, nothing will happen now
                </p>
                {newOrderButton}
            </div>
        )
    }
}