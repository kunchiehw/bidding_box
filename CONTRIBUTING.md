## Table of Contents

- [Front End UI](#front-end-ui)
  - [Folders and Files Naming](#folders-and-files-naming)
  - [React](#react)
  - [HTML Elements](#html-elements)

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

* For each HTML elements, assign it a class name `className` (in lisp-case), which briefly describes the purpose of the element. The `className` attribute should be in the front of all other attributes of the elements. 
