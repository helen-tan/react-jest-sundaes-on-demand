import { Alert } from "react-bootstrap";

export default function AlertBanner({ message, variant }) {
    // Set default message is no message
    const alertMessage = message || "An unexpected error occurred. Please try again later!"
    // Set default variant if no variant
    const alertVariant = variant || 'danger'

    return (
        <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
            {alertMessage}
        </Alert>
    )
}