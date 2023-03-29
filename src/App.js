import { useState } from "react";
import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetailsContext";

function App() {
  // orderPhases: 'inProgress', 'review', 'completed'
  const [orderPhase, setOrderPhase] = useState("inProgress")

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page & Entry page need provider */}
        {orderPhase === 'inProgress' && <OrderEntry setOrderPhase={setOrderPhase} />}
        {orderPhase === 'review' && <OrderSummary setOrderPhase={setOrderPhase}/>}
        {orderPhase === 'completed' && <OrderConfirmation setOrderPhase={setOrderPhase}/>}
      </OrderDetailsProvider>

      {/* Confirmation page does not need Provider */}
    </Container>
  );
}

export default App;
