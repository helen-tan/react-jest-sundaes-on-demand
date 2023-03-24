# Sundaes on Demand
An app built for learning how to test code with **Jest** and practice Test-Driven Development (TDD) with React.  

## Concepts used
### React Testing Library:
1. ```userEvent``` library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
    1. All methods from the userEvent library return **Promises** and must be **awaited**
    2. ```user.hover(<element>)```, ```user.unhover(<element>)``` (remember to add await infront)
2.. For elements not starting out on the page, the screen object method for query elements start with **'query'** and not **'get'**
    1. ```queryByText```
    2. ```expect(<element>).not.toBeInTheDocument()```
3. **```waitFor()```** method
    * For tests where await and findBy isn't enough
    * Prevents **race conditions** when used on the assertion, as it pauses the test to wait for the server to return the responses before running the assertion.
    * Musted be **awaited**
### Jest:
1. Running tests only on a single file
    1. Isolate testing file by typing 'p'in Jest watch mode, which allows us to type a regex pattern that can match the name of the file to test and filter out that file for testing
3. Run only a single test within a file 
    1. ```test.only()``` to run only that one test
    2. ```test.skip()``` to run all tests except that one test

### Mock Service Worker
1. Overriding Mock Service Worker's response handlers for individual tests with ```sever.resetHandlers()```.  This function accepts an optional list of request handlers to override the initial handlers to re-declare the mock definition completely on runtime.
