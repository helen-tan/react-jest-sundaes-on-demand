import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("Displays image for each scoop option from server", () => {
    render(<Options optionType="scoops"/>)

    // Find images
    const scoopImages = screen.getAllByRole('img', { name: /scoop$/i })
    // Expecting 2 results
    expect(scoopImages).toHaveLength(2)
    // Confirm alt text of images
    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})