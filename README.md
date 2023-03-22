# Sundaes on Demand
An app built for learning how to test code with **Jest** and practice Test-Driven Development (TDD) with React.  

## Concepts used
### React Testing Library:
1. ```userEvent``` library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
    1. All methods from the userEvent library return **Promises** and must be **awaited**
    2. ```user.hover(<element>)```, ```user.unhover(<element>)``` (remember to add await infront)
3. For elements not starting out on the page, the screen object method for query elements start with **'query'** and not **'get'**
    1. ```queryByText```
    2. ```expect(<element>).not.toBeInTheDocument()```
