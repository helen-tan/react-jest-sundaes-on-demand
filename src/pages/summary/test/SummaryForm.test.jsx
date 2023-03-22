import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test('Initial Conditions: Checkbox is unchecked & Confirm Button to be disabled by default', () => {
    render(<SummaryForm/>)

    const checkbox = screen.getByRole("checkbox", { name: /i agree to terms and conditions/i })
    const confirmButton = screen.getByRole('button', { name: /confirm order/i })

    expect(checkbox).not.toBeChecked()
    expect(confirmButton).toBeDisabled()
})

test('Checkbox enables button on first click & disables button on second click', () => {
    render (<SummaryForm/>)

    const checkbox = screen.getByRole("checkbox", { name: /i agree to terms and conditions/i })
    const confirmButton = screen.getByRole('button', { name: /confirm order/i })

    fireEvent.click(checkbox)              // 1st click
    expect(confirmButton).toBeEnabled()
    fireEvent.click(checkbox)              // 2nd click
    expect(confirmButton).toBeDisabled()
})