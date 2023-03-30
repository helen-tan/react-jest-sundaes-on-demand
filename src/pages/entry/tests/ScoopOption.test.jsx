import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event"
import ScoopOption from "../ScoopOption";

test("Show red input box if input is non-int or out of range (0-10)", async () => {
    const user = userEvent.setup()
    render(<ScoopOption />)

    // Enter a negative number into a scoops input - expect red box (invalid)
    const vanillaInput = await screen.findByRole("spinbutton")
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "-1")
    expect(vanillaInput).toHaveClass("is-invalid") // class name is from react-bootstrap

    // Replace with decimal input
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1.5")
    expect(vanillaInput).toHaveClass("is-invalid")

    // Replace with a number > 10
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "11")
    expect(vanillaInput).toHaveClass("is-invalid")

    // Replace with a valid input
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")
    expect(vanillaInput).not.toHaveClass("is-invalid")

})