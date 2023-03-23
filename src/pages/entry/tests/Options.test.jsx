import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("Displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops"/>)

    // Find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2) // Expecting 2 results

    // Confirm alt text of images
    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']) // Arrays, Objects -> use .toEqual() matcher. Numbers, Strings -> .toBe() 
})