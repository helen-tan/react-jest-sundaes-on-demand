import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App"

test("Order phases for happy path", async () => {
    const user = userEvent.setup()

    // render the app + destructure 'unmount' from return value to use at the end of the test
    const { unmount } = render(<App />)

    // ORDER PAGE
    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })
    const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" })
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")
    await user.clear(chocolateInput)
    await user.type(chocolateInput, "2")
    await user.click(cherriesCheckbox)

    // find and click order button
    const orderButton = screen.getByRole("button", { name: /order sundae/i })
    await user.click(orderButton)

    // SUMMARY PAGE
    // check summary subtotals based on order
    const summaryHeading = screen.getByRole("heading", { name: "Order Summary" })
    expect(summaryHeading).toBeInTheDocument()

    const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" })
    const toppingsHeading = screen.getByRole("heading", { name: "Toppings: $1.50" })

    expect(scoopsHeading).toBeInTheDocument()
    expect(toppingsHeading).toBeInTheDocument()

    // check summary option items
    expect(screen.getByText("1 Vanilla")).toBeInTheDocument()
    expect(screen.getByText("2 Chocolate")).toBeInTheDocument()
    expect(screen.getByText("Cherries")).toBeInTheDocument()

    // accept terms and conditions and click button to confirm order
    const termsAndConditionsCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i })
    const confirmOrderButton = screen.getByRole("button", { name: /confirm order/i })

    await user.click(termsAndConditionsCheckbox)
    await user.click(confirmOrderButton)

    // CONFIRMATION PAGE:
    // Expect "loading" to show
    const loading = screen.getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    // check confirmation page text (async bcos there is a POST req to server in between summary & confirmation pages)
    // Must confirm that 'thank you' header has appeared b4 asserting that loading has disappeared
    const thankYouHeader = await screen.findByRole("heading", { name: /thank you/i })
    expect(thankYouHeader).toBeInTheDocument()

    // expect that loading has disappeared. queryByxxx as element not expected to be in DOM)
    const notLoading = screen.queryByText(/loading/i)
    expect(notLoading).not.toBeInTheDocument()

    // find and click "new order" on confirmation page
    const newOrderButton = screen.getByRole("button", { name: /new order/i })
    await user.click(newOrderButton)

    // BACK TO ORDER PAGE:
    // check that scoops and toppings have been reset
    const scoopsTotal = await screen.findByText("Scoops total: $0.00")
    expect(scoopsTotal).toBeInTheDocument()
    const toppingsTotal = screen.getByText("Toppings total: $0.00")
    expect(toppingsTotal).toBeInTheDocument()

    // unmount the component, as it triggers cleanup fn in Options.jsx (which aborts network calls) and avoid
    // "not wrapped in act() error"
    unmount()
})

test("Toppings header is not on summary page if no toppings ordered", async () => {
    const user = userEvent.setup()       // Setup userEvent
    render(<App />)                      // Render App

    // ORDER PAGE
    // Add 1 vanilla, 2 chocolate scoops
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })
    const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" })

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")
    await user.clear(chocolateInput)
    await user.type(chocolateInput, "2")

    // find and click order button
    const orderButton = screen.getByRole("button", { name: /order sundae/i })
    await user.click(orderButton)

    // SUMMARY PAGE
    // Check that scoops heading is there
    const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" })
    expect(scoopsHeading).toBeInTheDocument()

    // Check that toppings header is not there
    const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i })
    expect(toppingsHeading).not.toBeInTheDocument()
})

test("Toppings header is not on summary page if toppings ordered, then removed", async () => {
    const user = userEvent.setup()       // Setup userEvent
    render(<App />)                      // Render App

    // ORDER PAGE
    // Add 1 vanilla, 2 chocolate scoops
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })
    const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" })

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")
    await user.clear(chocolateInput)
    await user.type(chocolateInput, "2")

    // Add a topping - cherries
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })
    await user.click(cherriesCheckbox)
    expect(cherriesCheckbox).toBeChecked()

    const toppingsTotal = screen.getByText("Toppings total: $", { exact: false })
    expect(toppingsTotal).toHaveTextContent("1.50")

    // Remove the topping
    await user.click(cherriesCheckbox)
    expect(cherriesCheckbox).not.toBeChecked()
    expect(toppingsTotal).toHaveTextContent("0.00")

    // find and click order button
    const orderButton = screen.getByRole("button", { name: /order sundae/i })
    await user.click(orderButton)

    // SUMMARY PAGE
    // Check that scoops heading is there
    const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" })
    expect(scoopsHeading).toBeInTheDocument()

    // Check that toppings header is not there
    const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i })
    expect(toppingsHeading).not.toBeInTheDocument()
})