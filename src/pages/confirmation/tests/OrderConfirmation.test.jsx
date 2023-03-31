import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderConfirmation from "../OrderConfirmation";
import { server } from "../../../mocks/server";
import { rest } from "msw";

test("Error response from server for submitting order", async () => {
    const user = userEvent.setup()
    // Override /order handler to invoke error
    server.resetHandlers(
        rest.post('http://localhost:3030/order', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )

    render(<OrderConfirmation setOrderPhase={jest.fn()}/>)

    const alert = await screen.findByRole("alert")
    expect(alert).toHaveTextContent("An unexpected error occurred. Please try again later!")

})