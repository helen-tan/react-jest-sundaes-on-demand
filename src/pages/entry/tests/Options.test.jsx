import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("Displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />)

    // Find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2) // Expecting 2 results (to be returned from Mock Service Worker's handler)

    // Confirm acttual alt text of images
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