import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Options from "../Options";

test("Updates scoop subtotal when scoops change", async () => {
    const user = userEvent.setup()

    render(<Options optionType="scoops"/>)

    // Total to start at $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopsSubtotal).toHaveTextContent('0.00')

    // Update vanilla scoops to 1 (via input), and check the subtotal
    const vanillaInput = await screen.findByRole('spinButton', { name: 'Vanilla' })  // Need to use findByxxx (for async stuff) as it is not going to populate until it gets options from the server

    await user.clear(vanillaInput)      // Clear the input first (await to make sure it finishes before moving on)
    await user.type(vanillaInput, '1')  // Type into the element (Even if is number input, we need to provide a string)

    expect(scoopsSubtotal).toHaveTextContent("2.00") // Each scoop is $2

    // Update chocolate scoops to 2 (via input), and check the subtotal
    const chocolateInput = await screen.findByRole("spinButton", { name: "Chocolate" })

    await user.clear(chocolateInput)
    await user.type(chocolateInput, '2')     

    expect(scoopsSubtotal).toHaveTextContent('6.00')
})