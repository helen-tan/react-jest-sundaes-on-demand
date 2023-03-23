import { useState, useEffect } from "react"
import Axios from "axios"
import ScoopOption from "./ScoopOption"
import { Row } from "react-bootstrap"

export default function Options({ optionType }) {
    const [items, setITems] = useState([])

    // optionType is 'scoops' or 'toppings'
    useEffect(() => {
        Axios.get(`http://localhost:3030/${optionType}`)
            .then(response => setITems(response.data))
            .catch(err => {
                console.log(err)
            })
    }, [optionType])

    // TODO: replace 'null' with ToppingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

    const optionItems = items.map(item => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ))

    return <Row>{optionItems}</Row>
} 