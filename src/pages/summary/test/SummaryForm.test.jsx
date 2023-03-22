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

    await user.click(checkbox)              // 1st click
    expect(confirmButton).toBeEnabled()
    await user.click(checkbox)              // 2nd click
    expect(confirmButton).toBeDisabled()
})