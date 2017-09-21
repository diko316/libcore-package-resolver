# libcore-package-resolver

Light-weight multi purpose package dependency resolver.

## Motivation

There were a lot of times I have encountered modelling a package-like data store
that supports indexing of package name and dependencies. Most of my
implementation in resolving package dependencies and loading sequences were
brute forced.

I created this helper in order to unify the code base and reuse it to my other
projects. At least the build will support AMD, CommonJS, and ES6 environments.

## Installation

This library is packaged by npm, so it can be installed by running code below.

```shell
npm install libdom --save
```

### Webpack and other CommonJS setup

**libcore-package-resolver** can be required directly in webpack or browserify
environment.

```javascript

var Packager = require("libcore-package-resolver"),
    packStore = new Packager();

packStore.register('angular', ['jQuery', 'lodash']);

```

### ES-2015 import with Babel, Buble and RollupJS

With es6 module system enabled using babel, buble or RollupJS,
you can import **libcore-package-resolver** module using the code below.

```javascript

// using 'default'
import Packager from "libcore-package-resolver";

// destructuring
import { Packager as BasePackager } from "libcore-package-resolver";

```

## Module API

Please refer to [API Documentation](https://diko316.github.io/libcore-package-resolver) for more information on Package resolver.


## License

This Project is fully Open Source [MIT](https://opensource.org/licenses/MIT) licensed.