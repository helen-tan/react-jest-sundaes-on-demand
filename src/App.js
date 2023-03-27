import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetailsContext";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page & Entry page need provider */}
        <OrderEntry/>
      </OrderDetailsProvider>
      {/* Confirmation page does not need Provider */}

    </Container>
  );
}

export default App;
