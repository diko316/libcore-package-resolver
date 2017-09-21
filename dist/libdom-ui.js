(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('libcore')) :
	typeof define === 'function' && define.amd ? define(['exports', 'libcore'], factory) :
	(factory((global['libdom-ui'] = {}),global.libcore));
}(this, (function (exports,libcore) { 'use strict';

var INVALID_NAME = "Invalid Package [name] parameter.";
var INVALID_NAMES = "Invalid [names] Package collection parameter.";


var Package = function Package(name) {
    this.id = ':' + name;
    this.name = name;
        
    this.registered = false;
    this.requires = [];

};


var Packager = function Packager() {
        this.names = [];
        this.packages = {};
    };

    Packager.prototype.register = function register (name, dependencies) {

        var isString = libcore.string,
            names = this.names,
            list = this.packages,
            PackageClass = Package;
        var c, l, dependency, items, il, id, packageObject;
            
        if (!isString(name)) {
            throw new Error(INVALID_NAME);
        }

        id = ':' + name;

        if (id in list && list[id].registered) {
            throw new Error(("Package " + name + " already exists."));
        }

        names[names.length] = name;

        packageObject = new PackageClass(name);
            
        list[id] = packageObject;
        packageObject.registered = true;
            

        if (isString(dependencies)) {
            dependencies = [dependencies];
        }

        if (libcore.array(dependencies)) {
            items = packageObject.requires;
            il = 0;

            for (c = -1, l = dependencies.length; l--;) {
                dependency = dependencies[++c];
                if (isString(dependency)) {
                    items[il++] = dependency;
                }

            }

        }

        return this;

    };

    Packager.prototype.flatten = function flatten (names) {
        var list = this.packages,
            isString = libcore.string;
        var position, len, name, id, inserted, stack, total,
            pack, requires, resolved, rl, recursed;
        var maxcall = 50;

        var rid = 0;

        if (isString(names)) {
            names = [names];
        }

        if (libcore.array(names)) {
            total = names.length;

            // validate names
            for (len = total; len--;) {
                name = names[len];

                if (!isString(name)) {
                    throw new Error(INVALID_NAMES);
                }

                id = ':' + name;
                if (!(id in list)) {
                    throw new Error(("Package " + name + " do not exist."));
                }
                else if (!list[id].registered) {
                    throw new Error(("Package " + name + " is not registered."));
                }

            }
                
            recursed = {};
            inserted = {};
            stack = null;
            position = -1;
            len = total;
            resolved = [];
            rl = 0;


            for (; len--;) {
                if (!--maxcall) {
                    break;
                }
                name = names[++position];
                id = ':' + name;
                pack = list[id];

                requires = pack.requires;
                total = requires.length;
                    
                if (!(id in recursed)) {
                    if (total) {
                        recursed[id] = true;
                        stack = {
                            rid: ++rid,
                            parent: stack,
                            ender: name,
                            c: position,
                            l: len,
                            items: names,
                            rs: resolved
                        };
    
                        names = requires;
                        len = total;
                        position = -1;
                        resolved = [];
                        rl = 0;
                            
                        continue;
                    }
                    // add leaf
                    else if (!(id in inserted)) {
                        resolved[rl++] =
                            inserted[id] = name;
                    }
                }

                // end?
                if (!len) {
                    // pop
                    for (; stack; ) {
                        // pop!
                        len = stack.l;
                        name = stack.ender;
                        position = stack.c;
                        names = stack.rs;
                        names.push.apply(names, resolved);
                        resolved = names;
                        names = stack.items;
                        rl = resolved.length;

                        stack = stack.parent;
                            

                        // included ender
                        id = ':' + name;
                        if (!(id in inserted)) {
                            resolved[rl++] = 
                                inserted[id] = name;
                        }

                        if (len) {
                            break;
                        }

                    }

                }

            }

        }

        return resolved;

    };



var API$1 = Object.freeze({
	Packager: Packager
});

exports['default'] = API$1;
exports.Packager = Packager;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=libdom-ui.js.map
