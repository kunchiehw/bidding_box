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
  i18n/
    messages.js
    (TBA)
  first-ineterface/
    components/
      FirstComponent.jsx
    component-test
      FirstComponent.test.jsx
    FirstInterface.jsx
    FirstInterface.test.jsx
    helper-FirstInterface.js
    helper-FirstInterface.test.jsx
```

* The `i18n` folder controls all the messages presented in the interface. Any messages that show in the interface should be called via `getMessages` function in `messages.js`.
* Every interface should have a unique, independent folder which stores all the compoenents, functions and tests that used.
* Any stateless component should be stored in the folder `components` and its unit test should be stored in the folder `components-test`.
* The main interface file and its unit test should be stored directly under the interface folder.
* All helper functions, used either in the components or in the main interface, should be stored in the file `helper-${NAME}Interface.jsx`, which should be directly under the interface folder. The unit test for the functions should be implemented in `helper-${NAME}Interface.test.jsx`.

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
