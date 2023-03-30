import { useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext"

export default function ScoopOption({ name, imagePath }) {
    const [isValid, setIsValid] = useState(true)

    const { updateItemCount } = useOrderDetailsContext()

    const handleChange = (e) => {
        // Validate
        const currentValue= e.target.value
        const currentValueFloat = parseFloat(currentValue)
        const valueIsValid = 
        0 <= currentValueFloat &&                             // more than 0
        currentValueFloat <= 10 &&                            // less than 10
        Math.floor(currentValueFloat) === currentValueFloat   // Is it an integer?

        setIsValid(valueIsValid)

        updateItemCount(name, parseInt(e.target.value), "scoops")
    }
    
    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
            <img
                style={{ width: '75%' }}
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
            />

            <Form.Group
                controlId={`${name}-count`}
                as={Row}
                style={{ marginTop: "10px" }}
            >
                <Form.Label columm xs='6' style={{ textAlign: "right" }}>
                    {name}
                </Form.Label>

                <Col xs="5" style={{ textAlign: "left" }}>
                    <Form.Control
                        type="number"
                        defaultValue={0}
                        onChange={handleChange}
                        isInvalid={!isValid}
                    />
                </Col>
                
            </Form.Group>
        </Col>
    )
} 