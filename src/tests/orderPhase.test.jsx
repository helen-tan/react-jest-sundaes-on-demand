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
    const loading = screen.getByText(/loading/)
    expect(loading).toBeInTheDocument()

    // check confirmation page text (async bcos there is a POST req to server in between summary & confirmation pages)
    const thankYouHeader = await screen.findByRole("heading", { name: /thank you/i })
    expect(thankYouHeader).toBeInTheDocument()

    // expect that loading has disappeared. queryByxxx as element not expected to be in DOM)
    const notLoading = screen.queryByText("loading")
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