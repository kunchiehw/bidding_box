## Table of Contents

- [Front End UI](#front-end-ui)
  - [Folder Structure](#folder-structure)
  - [Folders and Files Naming](#folders-and-files-naming)
  - [React](#react)
  - [HTML Elements](#html-elements)
  - [Unit Test](#unit-test)

## Front End UI

This section describes the rule of all front-end UI files. All the files that related to the folder `frontend`, except those constants and functions that shared by both frontend side and backend side.

### Folder Structure

The folder structure in `frontend` should like the following:

```
frontend/
  README.md
  components/
    FirstComponent.jsx
    __test__/
      FirstComponent.test.jsx
  interfaces/
    FirstInterfaces.jsx
    __test__/
      FirstInterface.test.jsx
  i18n/
    messages.js
  utils/
    helpers.js
    validator.js
    __test__/
      helpers.test.jsx
      validator.test.jsx
```

* All the folder should have a `__test__` folder which stores all the unit test of the elements in this folder.
* Any stateless React component should be stored in the folder `component`, and any React component that using state should be stored in `interfaces`.
* The `i18n` folder controls all the messages presented in the interface. Any messages that show in the interface should be called via `getMessages` function in `messages.js`.
* All helper functions should be stored in the file `utils/helper.js`, and all the custom PropTypes validator should be stored in `utils/validator`.

### Folders and Files Naming

* For the folders, use lisp-case (connected-with-hyphen).
* For the JavaScript file that uses React, use PascalCase with .jsx file extension.
* For the JavaScript file that doesn't use React, use lisp-case with .js file extension.
* For the helper file, name it like `helper-${NAME}Interface.jsx`.

### React

* Follow [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react).

### HTML Elements

* For each HTML elements, assign it a class name `className` (in lisp-case), which briefly describes the purpose of the element. The `className` attribute should be in the front of all other attributes (except `key`) of the elements.

### Unit Test

Every folder in `src` should contain a unit test file, named as `NameOfMainFile.test.js`. The file should check both components and all helper functions. For the helper functions, use description `helper nameOfFunction`, for example, `helper happyFunction`. And for the functions in the component, use description `NameOfComponent nameOfFunction`, like `HappyComponent render`.
