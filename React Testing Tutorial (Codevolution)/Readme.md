# React Testing Tutorial (Codevolution)

- [React Testing Tutorial (Codevolution)](#react-testing-tutorial-codevolution)
- [Jest](#jest)
  - [Filename Conventions](#filename-conventions)
  - [Code Coverage](#code-coverage)
    - [Code Coverage Threshold](#code-coverage-threshold)
  - [Assertions](#assertions)
    - [Expect](#expect)
      - [Common Matchers](#common-matchers)
- [React Testing Library](#react-testing-library)
  - [What to test in a React Application?](#what-to-test-in-a-react-application)
  - [Basic test workflow](#basic-test-workflow)
- [RTL Queries](#rtl-queries)
  - [getBy... queries](#getby-queries)
    - [getByRole](#getbyrole)
      - [getByRole options](#getbyrole-options)
      - [Other getByRole options](#other-getbyrole-options)
    - [getByLabelText](#getbylabeltext)
    - [getPlaceholderText](#getplaceholdertext)
    - [getByText](#getbytext)
    - [getByDisplayValue](#getbydisplayvalue)
    - [getByAltText](#getbyalttext)
    - [getByTitle](#getbytitle)
    - [getByTestId](#getbytestid)
  - [Priority Order for Queries](#priority-order-for-queries)
  - [getAllBy queries](#getallby-queries)
  - [TextMatch](#textmatch)
    - [TextMatch - string](#textmatch---string)
    - [Text Match - regex](#text-match---regex)
    - [Text Match - custom function](#text-match---custom-function)
  - [queryBy and queryAllBy](#queryby-and-queryallby)
    - [queryBy](#queryby)
    - [queryAllBy](#queryallby)
  - [findBy and findAllBy](#findby-and-findallby)
    - [findBy](#findby)
    - [findAllBy](#findallby)
  - [Manual Queries](#manual-queries)
- [Debugging](#debugging)
- [User Interactions](#user-interactions)
  - [user-event](#user-event)
    - [fireEvent vs user-event](#fireevent-vs-user-event)
  - [Using user-event](#using-user-event)
  - [Pointer Interactions](#pointer-interactions)
    - [Convenience APIs](#convenience-apis)
    - [Pointer APIs](#pointer-apis)
  - [Keyboard Interactions](#keyboard-interactions)
    - [Convenience APIs](#convenience-apis-1)
    - [Utility APIs](#utility-apis)
    - [Clipboard APIs](#clipboard-apis)
    - [Keyboard API](#keyboard-api)
- [Providers](#providers)
  - [Custom Render](#custom-render)
- [Custom Hooks](#custom-hooks)
  - [Act](#act)
- [Mock Functions](#mock-functions)
- [Static Analysis Testing](#static-analysis-testing)
  - [Static analysis testing tools](#static-analysis-testing-tools)
  - [ESlint](#eslint)

# Jest

## Filename Conventions

With `create-react-app`, Jest will look for tests with the following popular filename conventions:

- .test.js / .test.tsx
- .specs.js / .spec.tsx
- .js / .tsx in `__tests__` folders

It's recommended to always put your tests next to the code they are testing to shorten relative imports.

## Code Coverage

It's a metric that helps you understand how much of your code is being tested.

- **Statement Coverage:** How many of the statements have been executed
- **Branches Coverage:** How many of the branches of the control structures (if, switch, etc.) have been executed
- **Function Coverage:** How many of the functions have been called
- **Line Coverage:** How many lines of source code have been tested

You can indicate Jest where all the components that need testing are located by adding `--collectCoverageFrom='src/components/**/*.{ts,tsx}` to the coverage script in your `package.json`.

Not all files need to be tested though, use `!` to exclude a location or file type, for example: `--collectCoverageFrom='!src/components/**/*.{types,stories,constants,test,spec}.{ts,tsx}'`.

### Code Coverage Threshold

You can specify a Code coverage threshold to Jest by adding the following object to your `package.json`.

```JS
"jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": -10
      }
    }
  }
```

## Assertions

When writing tests, we often need to check that values meet certain conditions. Assertions decide if a test passes or fails.

### Expect

`expect(value)`

The argument should be the value that your code produces, it should be used along with a "matcher" function to assert something about a value. Matchers usually accept an argument which is the correct expected value.

#### Common Matchers

A list of common Matchers can be found here: [Using Matchers - Jest](https://jestjs.io/docs/using-matchers)

For matchers specific to React Testing Library, check: [jest-dom: Custom jest matchers to test the state of the DOM](https://github.com/testing-library/jest-dom)

# React Testing Library

## What to test in a React Application?

Test that your components:

- Render
- Render with props
- Render in different states
- React to events

Do not test your components':

- Implementation details
- Third party code
- Code that's not important from a user point of view

## Basic test workflow

Every test we write generally involves the following basic steps

1. Render the component
2. Find an element rendered by the component
3. Assert against the element found in step 2, which will pass or fail the test

To render the component, we use the method `render` from RTL. For assertion, we use `expect` passing in a value and combine it with a matcher function from _jest_ or _jest-dom_.

# RTL Queries

Queries are methods that _Testing Library_ provides to find elements on the page.

To find a single element on the page:

- getBy...
- queryBy...
- findBy...

To find multiple elements on the page:

- getAllBy...
- queryAllBy...
- findAllBy...

These need a suffix which can be Role, LabelText, PlaceHolderText, Text, DisplayValue, AltText, Title and TestId.

## getBy... queries

getBy... returns the matching node for a query and throws a descriptive error if no elements or more than one element were found.

### getByRole

getByRole queries for elements with the given role, which refers to the _Accessible Rich Internet Applications_ (ARIA) role, which is used for accessibility purposes.

Many HTML elements have a role by default.

| HTML Element  |   Role   |
| :-----------: | :------: |
|    button     |  button  |
|    anchor     |   link   |
| h1, h2..., h6 | heading  |
|   checkbox    | checkbox |
| radio button  |  radio   |

To specify a role, you can use the `role` attribute.

```HTML
<button role='button'>
```

Here's a table of [HTML elements with their default and desired roles](https://www.w3.org/TR/html-aria/#docconformance).

#### getByRole options

_name_

Can refer to:

- The label of a form element
- The text content of a button
- The value of the aria-label attribute

#### Other getByRole options

- name
- level
- hidden
- selected
- checked
- pressed

### getByLabelText

getByRole queries for elements with the given label. This is the text surrounded by tags opening and closing. It even works with labels from tags inside other tags.

```HTML
<label>
  <input type="checkbox" id="terms" />I agree to the terms and conditions
</label>
```

```JS
const termsElement = screen.getByLabelText(
    "I agree to the terms and conditions"
  );
```

### getPlaceholderText

getPlaceholderText will search for all elements with a placeholder attribute and find one that matches the given text.

### getByText

getByText will search for all elements that have a text node with textContent matching the given text. Typically useful to find paragraph, div or span elements.

### getByDisplayValue

getByDisplayValue returns the input, textarea, or select element that has the matching display value.

### getByAltText

getByAltText will return the element that has the given alt text. Not all elements support the alt attribute. Examples of elements that do are img, input, and area.

### getByTitle

getByTitle returns the element that has the matching title attribute.

### getByTestId

getByTestId returns the element that has the matching data-testid attribute.

## Priority Order for Queries

Your test should resemble how users interact with your code as much as possible, therefore, elements should be discovered the same way a user would. getByTestId should be your last resort, as users cannot interact with test ids.

1. getByRole
2. getByLabelText
3. getByPlaceholderText
4. getByText
5. getByDisplayValue
6. getByAltText
7. getByTitle
8. getByTestId

There are exceptions though, applications with dynamic text for example don't follow this rule strictly.

## getAllBy queries

Helps you find multiple elements in the DOM. getByAll returns an array of all matching nodes for a query, and throws an error if no elements match. Every getBy query has an equivalent getByAll query.

## TextMatch

TextMatch represents a type which can be either a string, regex or a function.

### TextMatch - string

To find the div `<div/>Hello World</>` we could use any of the following:

```JS
screen.getByText("Hello World") // full string match
screen.getByText("llo Worl", {exact: false}) // substring match
screen.getByText("hello world", {exact: false}) // ignore case
```

### Text Match - regex

```JS
screen.getByText(/World/) // substring match
screen.getByText(/world/i) // substring match, ignore case
screen.getByText(/^hello world$/i) // full string match, ignore case
```

### Text Match - custom function

`(content?: string, element?: Element | null) => boolean`

```JS
screen.getByText((content) => content.startsWith('Hello'))
```

## queryBy and queryAllBy

### queryBy

- Returns the matching node for a query, and return null if no elements match.
- Useful for asserting that an element is not present.
- Throws an error if more than one match is found.

### queryAllBy

- Returns an array of all matching nodes for a query, and return an empty array if no elements match.

Every getBy query has a queryBy equivalent.

## findBy and findAllBy

### findBy

- Returns a promise which resolves when an element is found which matches the given query.
- The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms.

### findAllBy

- Returns a promise which resolves to an array of elements.
- The promise is rejected if no element is found after a default timeout of 1000ms.

Every getBy query has a findBy equivalent.

## Manual Queries

You can use the regular querySelector DOM API to find elements.

`const foo = container.querySelector('[data-foo="bar"]')`

# Debugging

Use `screen.debug();` to get a formatted view of the DOM at a given moment.

Use `logRoles()` to get a list of items present in the DOM along with their roles and their names.

```JS
const view = render(<Skills skills={skills} />);
logRoles(view.container);
```

Use the Chrome extension [Testing Playground](https://chromewebstore.google.com/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano) to receive suggestions on how to query elements by selecting them in your rendered webpage.

# User Interactions

If our software handles user interactions, our tests should too.

## user-event

It's a companion library for Testing Library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.

### fireEvent vs user-event

fireEvent is a method from RTL which is used to dispatch DOM events. _user-event_ is recommended over fireEvent as it simulates full interactions and does additional checks along the way.

For example, when an user types into a text box, the element has to be focused, the keyboard and input events have to be fired and the value on the element gets manipulated as they type.

Dispatching interactions this way prevents unexpected behavior like the user clicking on a hidden element or typing in a disabled text box.

## Using user-event

First you need to include `user.setup();`, then, you need to change your test into an async function, as all user functions return promises.

```JS
test("Renders a count of 1 after clicking the increment button", async () => {
    user.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    await user.click(incrementButton);
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("1");
  });
```

## Pointer Interactions

### Convenience APIs

In the last example, we were using what are called _convenience APIs_, you'd normally want to use these instead of their internal Pointer APIs.

- click()
- dblClick()
- tripleClick()
- hover()
- unhover()

### Pointer APIs

These are called internally by the convenience APIs.

```JS
pointer({keys: '[MouseLeft]'}) // A single left click event.
pointer({keys: '[MouseLeft][MouseRight]'}) // A left click followed by a right click.
pointer({'[MouseLeft][MouseRight]'}) // We can send just a string if 'keys' is our only argument.
pointer('[MouseLeft>]') // A left click hold.
pointer('[/MouseLeft]') // A left click release.
```

## Keyboard Interactions

### Convenience APIs

There's only one convenience API for keyboard interactions.

- tab()

### Utility APIs

```JS
clear() // Empties an input element.
selectOptions() // Selects options from dropdown menus or checkbox lists.
deselectOptions()
upload() // Simulates the user selecting a file from a file explorer.
```

### Clipboard APIs

- copy()
- cut()
- paste()

### Keyboard API

If the previous APIs are not sufficient, you can use the internal keyboard API.

```JS
keyboard("foo") // Translates to: f, o, o
keyboard("{Shift>}A{/Shift}"); // Shift (Down), A, Shift (Up)
```

# Providers

We can pass a context provider to `render` as an argument in case we want to use a provider without importing the entire component tree.

```JS
import { AppProviders } from "../../Providers/AppProviders";

// [...]

render(<MuiMode />, {
  wrapper: AppProviders,
});
```

## Custom Render

If you want to be able to use context providers without having to specify them for each test, you can create a Custom Render following these instructions: [React Testing Library - Setup Custom Render](https://testing-library.com/docs/react-testing-library/setup#custom-render).

# Custom Hooks

To test Custom Hooks, we use the `renderHook` function. `screen` is not needed, as hooks don't return any HTML code.

```JS
import { renderHook } from "@testing-library/react";

// [...]

const { result } = renderHook(useCounter);
expect(result.current.count).toBe(0);
```

We can destructure `result` from this function. `result.current` will contain all the elements returned by our custom hook.

To send props to a custom hook, send an object containing an `initialProps` object.

```JS
const { result } = renderHook(useCounter, {
  initialProps: {
    initialCount: 10,
  },
});
```

## Act

`Act()` is a test helper that makes sure that all pending React updates are processed and sent to the DOM before you make any assertions.

Calling a function inside a custom hook is an example of a use case where we need to manually wrap component updates inside an `act()`.

```JS
const { result } = renderHook(useCounter);
act(() => result.current.increment());
```

# Mock Functions

As we mentioned before, implementation details do not need to be tested, here's an example of a test for a component that receives functions as props:

```JS
user.setup();
const incrementHandler = jest.fn();
const decrementHandler = jest.fn();
render(
  <CounterTwo
    count={0}
    handleIncrement={incrementHandler}
    handleDecrement={decrementHandler}
  />
);

// [...]

expect(incrementHandler).toHaveBeenCalledTimes(1);
expect(decrementHandler).toHaveBeenCalledTimes(1);
```

We can use `jest.fn()` to create jest mock functions and the matcher `toHaveBeenCalledTimes()` to check if these functions were called once.

# Static Analysis Testing

Unlike the previous types of testing, which focused on the code producing an expected output, Static testing analyses aspects of the code such as readability, consistency, error handling type checking, and alignment with best practices.

Testing checks if your code works or note, whereas static analysis checks if it's written well or not.

## Static analysis testing tools

- TypeScript
- ESlint
- Prettier
- Husky
- lint-staged

## ESlint

It's a tool for identifying and reporting on patterns found in JavaScript code, with the goal of making code more consistent and avoiding bugs.