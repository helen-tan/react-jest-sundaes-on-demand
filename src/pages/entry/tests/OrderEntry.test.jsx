import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("Handles error for scoops and toppings routes", async () => {
    // Override handlers/ reset handlers that have the specified endpoints
    server.resetHandlers(
        // looks like what we write in handlers.js
        // Endpoint that we want to reset - so as to make it return an error
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )

    render(<OrderEntry />)
    // Alerts will appear asynchronously as they will only appear after axios .catch() is hit
    const alerts = await screen.findAllByRole('alert', { name: 'An unexpected error occured. Please try again later!' })
    
    expect(alerts).toHaveLength(2)
})