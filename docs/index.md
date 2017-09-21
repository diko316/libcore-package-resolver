# API Documentation

## Table of Contents


* [Packager](#packager)

  - [Packager.prototype.constructor()](#packagerprototype-constructor)
  - [Packager.prototype.exists()](#packagerprototype-exists-names)
  - [Packager.prototype.register()](#packagerprototype-register-name-dependencies)
  - [Packager.prototype.flatten()](#packagerprototype-flatten-names)


## Packager

The `default` and `Packager` in entry module contains `Packager` Class that
needs to be instantiated before it can be used like the code below:

```javascript
import { Packager } from "libcore-package-resolver";

const componentIndex = new Packager();

// registration doesn't resolve dependency until flatten() is called.
componentIndex.register('MyComponent',
                        ['BaseComponent']);

// register the dependency before flatten() to avoid
// non-existent dependency error.
componentIndex.register('BaseComponent');

// it should return ['BaseComponent', 'MyComponent']
console.log("require order of `MyComponent`:",
             componentIndex.flatten('MyComponent'));

```

### `Packager.prototype.constructor()`

* Initializes `this` object in Packager Class. Please use `new` keyword
    to instantiate the class which automatically runs this method before
    instance is returned.

Parameter *none*

Returns

Value | Type  | Description
--    |--     |--
packager  | Packager | the Packager instance.

### `Packager.prototype.exists(names)`

* Inspect if package-like `names` or one of the item in
    `names` parameter exists.

Parameter

Name    | Type  | Description
--        |--     |--
names      | String or Array(String) | package name or collection of names to inspect.

Returns

Value   | Type  | Description
--      |--     |--
true    | Boolean | True if `names` String or all items in `names` Array exists and registered.

### `Packager.prototype.register(name[, dependencies])`

* Registers a package-like `name` with optional `dependencies` Array.

Parameter

Name    | Type  | Description
--      |--     |--
name    | String | the package name
[dependencies]  | Array(String) | (optional) Array of package names that `name` is depending on.

Returns

Value | Type  | Description
--    |--     |--
packager | Packager | The Packager instance.

### `Packager.prototype.flatten(names)`

* Flattens the dependency tree of the given package `names` or collection of
    package `names` which is sorted by load sequence of package `names` and
    dependencies.

> **Note:**
> Cyclic dependencies are resolved and do not produces fatal errors on the
> returned package names. This method only cares about load order of the
> packages.

Parameter

Name    | Type  | Description
--      |--     |--
names   | String or Array(String) | package name or collection of names to inspect.

Returns

Value | Type  | Description
--    |--     |--
[package name,...] | Array(String) | `names` parameter packages and dependencies sorted in load or require order.
