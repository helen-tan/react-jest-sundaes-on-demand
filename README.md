# Sundaes on Demand
An app built for learning how to test code with **Jest** and practice Test-Driven Development (TDD) with React. Done as part of the Udemy course - Testing React with Jest and React Testing Library (RTL)

## Concepts used
### React Testing Library:
1. ```userEvent``` library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
    1. A user instance is first created with ```userEvent.setup()```
    2. All methods from the userEvent library return **Promises** and must be **awaited**
    3. ```user.hover(<element>)```, ```user.unhover(<element>)``` (remember to add await infront)
    4. ```user.clear(<element>)``` to clear existing text
    5. ```user.type(<element>, "string to be typed")``` to enter input
2. For elements not starting out on the page, the screen object method for query elements start with **'query'** and not **'get'**
    1. ```queryByText```
    2. ```expect(<element>).not.toBeInTheDocument()```
3. **```waitFor()```** method
    * For tests where await and findBy isn't enough
    * Prevents **race conditions** when used on the assertion, as it pauses the test to wait for the server to return the responses before running the assertion.
    * Musted be **awaited** 
4. ```screen.getByText("some text")``` - Outside of forms, text content is the main way users find elements. This method can be used to find non-interactive elements (like divs, spans, and paragraphs)   
    * "exact" option to control match precision. Defaults to true - matches full strings, case-sensitive. When false, matches substrings and is not case-sensitive
    
5. Apply a context provider to a test by using the render() method's option - wrapper. ```render(<element/>, { wrapper: OrderDetailsProvider })```
6. Creating a [custom render](https://testing-library.com/docs/react-testing-library/setup/) to provide access to the context universally


### Jest:
1. Running tests only on a single file
    1. Isolate testing file by typing 'p' in Jest watch mode, which allows us to type a regex pattern that can match the name of the file to test and filter out that file for testing
2. Run only a single test within a file 
    1. ```test.only()``` to run only that one test
    2. ```test.skip()``` to run all tests except that one test
3. Jest-DOM's ```.toHaveClass()``` matcher for assertions. Checks whether all of the matched elements have the expected class name. E.g. ```expect(<element/>).toHaveClass("a-class-name")```

### Mock Service Worker
1. Overriding Mock Service Worker's response handlers for individual tests with ```sever.resetHandlers()```.  This function accepts an optional list of request handlers to override the initial handlers to re-declare the mock definition completely on runtime.
2. MSW doesn't run when we are running the actual app, and we will need a backend server for handle the axois requests. The repo for the server can found in the [course instructor's repo](https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/main/sundae-server)
