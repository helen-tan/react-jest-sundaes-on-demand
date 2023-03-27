import { Col, Row } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext"

export default function ScoopOption({ name, imagePath }) {
    const { updateItemCount } = useOrderDetailsContext()

    const handleChange = (e) => {
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
                controlled={`${name}-count`}
                as={Row}
                style={{ marginTop: "10px" }}
            >
                <Form.label columm xs='6' style={{ textAlign: "right" }}>
                    {name}
                </Form.label>
                <Col xs="5" style={{ textAlign: "left" }}>
                    <Form.Control
                        type="number"
                        defaultValue={0}
                        onChange={handleChange} /
                    >
                </Col>
            </Form.Group>
        </Col>
    )
} 