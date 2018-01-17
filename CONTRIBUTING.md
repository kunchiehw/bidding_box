## Table of Contents

- [Front End UI](#front-end-ui)
  - [Folders and Files Naming](#folders-and-files-naming)
  - [React](#react)
  - [HTML Elements](#html-elements)
  - [Unit Test](#unit-test)

## Front End UI

This section describes the rule of all front-end UI files. That is, all the files in the folder `src`.

### Folders and Files Naming

* For the folders, use lisp-case (connected-with-hyphen).
* For the JavaScript file that uses React, use PascalCase with .jsx file extension.
* For the JavaScript file that doesn't use React, use lisp-case with .js file extension.
* For the helper file, name it as `helper-NameOfMainFile.js`.

### React

* Follow [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react).

### HTML Elements

* For each HTML elements, assign it a class name `className` (in lisp-case), which briefly describes the purpose of the element. The `className` attribute should be in the front of all other attributes (except `key`) of the elements.

### Unit Test

Every folder in `src` should contain a unit test file, named as `NameOfMainFile.test.js`. The file should check both components and all helper functions. For the helper functions, use description `helper nameOfFunction`, for example, `helper happyFunction`. And for the functions in the component, use description `NameOfComponent nameOfFunction`, like `HappyComponent render`.
