import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import SummaryForm from "../SummaryForm";

test('Initial Conditions: Checkbox is unchecked & Confirm Button to be disabled by default', () => {
    render(<SummaryForm/>)

    const checkbox = screen.getByRole("checkbox", { name: /i agree to terms and conditions/i })
    const confirmButton = screen.getByRole('button', { name: /confirm order/i })

    expect(checkbox).not.toBeChecked()
    expect(confirmButton).toBeDisabled()
})

test('Checkbox enables button on first click & disables button on second click', async () => {
    // Create user instance with userEvent setup method
    const user = userEvent.setup()

    render (<SummaryForm/>)

    const checkbox = screen.getByRole("checkbox", { name: /i agree to terms and conditions/i })
    const confirmButton = screen.getByRole('button', { name: /confirm order/i })

    // userEvent APIs ALWAYS returns a Promise
    await user.click(checkbox)              // 1st click
    expect(confirmButton).toBeEnabled()
    await user.click(checkbox)              // 2nd click
    expect(confirmButton).toBeDisabled()
})

test("Popover responds to hover", async () => {
    const user = userEvent.setup()
    render (<SummaryForm/>)

    // Popover starts out hidden - Use queryBy Text instead of getByText as we are expecting the element to not be in the DOM
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument()

    // Popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    await user.hover(termsAndConditions)  // simulates mouse hover over checkbox label

    const popover = screen.getByText(/no ice cream will actually be delivered/i)

    expect(popover).toBeInTheDocument()

    // Popover disappears when we mouse out
    await user.unhover(termsAndConditions)
    expect(popover).not.toBeInTheDocument()
})