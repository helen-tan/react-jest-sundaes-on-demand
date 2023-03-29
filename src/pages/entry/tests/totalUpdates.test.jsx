import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event" 
import Options from "../Options";
import { logRoles } from "@testing-library/react";
import OrderEntry from "../OrderEntry";

test("Updates scoop subtotal when scoops change", async () => {
    const user = userEvent.setup()

    // const { container } = render(<Options optionType="scoops" />)
    render(<Options optionType="scoops" />)
    
    // Total to start at $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopsSubtotal).toHaveTextContent('0.00')
    
    // Update vanilla scoops to 1 (via input), and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })  // Need to use findByxxx (for async stuff) as it is not going to populate until it gets options from the server
    
    await user.clear(vanillaInput)      // Clear the input first (await to make sure it finishes before moving on)
    await user.type(vanillaInput, '1')  // Type into the element (Even if is number input, we need to provide a string)
    
    expect(scoopsSubtotal).toHaveTextContent("2.00") // Each scoop is $2
    
    // Update chocolate scoops to 2 (via input), and check the subtotal
    const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" })
    //logRoles(container)

    await user.clear(chocolateInput)
    await user.type(chocolateInput, '2')     

    expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test("Updates toppings subtotal when toppings change", async () => {
    const user = userEvent.setup()

    render(<Options optionType="toppings" />)

    // total to start at $0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false })
    expect(toppingsSubtotal).toHaveTextContent("0.00")

    // Add Cherries topping (check checkbox), and check subtotal
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })

    await user.click(cherriesCheckbox)
    expect(cherriesCheckbox).toBeChecked()
    expect(toppingsSubtotal).toHaveTextContent("1.50")

    // Add another M&Ms topping this time, and check subtotal
    const mandMsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" })

    await user.click(mandMsCheckbox)
    expect(mandMsCheckbox).toBeChecked()
    expect(toppingsSubtotal).toHaveTextContent("$3.00")

    // Uncheck M&Ms toppings, check subtotal
    await user.click(mandMsCheckbox)
    expect(mandMsCheckbox).not.toBeChecked()
    expect(toppingsSubtotal).toHaveTextContent("1.50")
})

describe("Grand total tests", () => {
    test("Grand total starts at $0.00", () => {
        const { unmount } = render(<OrderEntry />)

        const grandTotal = screen.getByRole("heading", { name: /grand total: \$/i })
        expect(grandTotal).toHaveTextContent("0.00")

        unmount()
    })

    test("Grand total updates properly if scoop is added first", async () => { // async bcos 1. we are awaiting data from axios and 2. we are using userEvent
        const user = userEvent.setup()

        render(<OrderEntry />)

        const grandTotal = screen.getByRole("heading", { name: /grand total: \$/i })
        const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })

        // Update vanilla scoops to 1 (via input)
        await user.clear(vanillaInput)             // Clear input
        await user.type(vanillaInput, "2")         // Type 1 into the input

        expect(grandTotal).toHaveTextContent("4.00")

        // Add Cherries and check grand total again
        const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })

        await user.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent("5.50")
    })

    test("Grand total updates properly if topping is added first", async () => {
        const user = userEvent.setup()

        render(<OrderEntry />)
        
        const grandTotal = screen.getByRole("heading", { name: /grand total: \$/i })
        const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })

        // Add Cherries and check grand total
        await user.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent("1.50")

        // Update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })

        await user.clear(vanillaInput)
        await user.type(vanillaInput, "2")

        expect(grandTotal).toHaveTextContent("5.50")
    })

    test("Grand total updates properly if an item is removed", async () => {
        const user = userEvent.setup()

        render(<OrderEntry />)

        const grandTotal = screen.getByRole("heading", { name: /grand total: \$/i })
        const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })
        const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })

        // Add cherries
        await user.click(cherriesCheckbox) // No need to assert after bcos the previous test would have done that

        // Update Vanilla scoops to 2
        await user.clear(vanillaInput)
        await user.type(vanillaInput, "2") // No need to assert after bcos the previous test would have done that

        // Remove 1 scoop of vanilla
        await user.clear(vanillaInput)
        await user.type(vanillaInput, "1")

        expect(grandTotal).toHaveTextContent("3.50")

        // Remove cherries and check grand total
        await user.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent("2.00")
    })
})