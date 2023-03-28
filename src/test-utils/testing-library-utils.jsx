import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetailsContext";

const renderWithContext = (ui, options) => 
    render(ui, { wrapper: OrderDetailsProvider, ...options })

// re-export everything
export * from '@testing-library/react'

// overrider render method
export { renderWithContext as render }