import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("Displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />)

    // Find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2) // Expecting 2 results (to be returned from Mock Service Worker's handler)

    // Confirm actual alt text of images
    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']) // Arrays, Objects -> use .toEqual() matcher. Numbers, Strings -> .toBe() 
})

test("Displays topping image for each topping option from the server", async () => {
    render(<Options optionType="toppings" />)

    // Find images
    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
    expect(toppingImages).toHaveLength(3) // Expecting 3 results (to be returned from MSW's handler)

    // Confirm actual alt text of images 
    const altText = toppingImages.map(element => element.alt)
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot Fudge topping'])
})

test("Don't update scoops subtotal if scoop count is invalid", async () => {
    const user = userEvent.setup()
    render(<Options optionType="scoops" />)

    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })
    const scoopsSubtotal = screen.getByText("Scoops total: $0.00")

    // Make an invalid input value - negative numbers
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "-1")

    // Expect the subtotal to remain 0 (not updated)
    expect(scoopsSubtotal).toHaveTextContent("$0.00")

    // Make an invalid input value - not an integer
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2.5")

    // Expect the subtotal to remain 0 (not updated)
    expect(scoopsSubtotal).toHaveTextContent("$0.00")
    
    // Make an invalid input value - out of range, >10
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "100")

    // Expect the subtotal to remain 0 (not updated)
    expect(scoopsSubtotal).toHaveTextContent("$0.00")
})