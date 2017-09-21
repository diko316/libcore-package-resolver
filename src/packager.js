'use strict';

import {
            string,
            array
        } from "libcore";

const INVALID_NAME = "Invalid Package [name] parameter.",  
    INVALID_NAMES = "Invalid [names] Package collection parameter.",
    INVALID_DEPENDENCIES = "Invalid Package [dependencies] parameter.";


class Package {
    constructor(name) {
        this.id = ':' + name;
        this.name = name;
        
        this.registered = false;
        this.requires = [];

    }
}


class Packager {

    constructor() {
        this.names = [];
        this.packages = {};
    }

    exists(names) {
        var isString = string,
            list = this.packages,
            invalidNames = INVALID_NAMES;
        var len, name, id;

        // string based parameter
        if (isString(names)) {
            id = ':' + names;
            return id in list && list[id].registered;
        }

        if (!array(names)) {
            throw new Error(invalidNames);
        }
        
        len = names.length;
        if (len) {
            for (; len--;) {
                name = names[len];
                
                if (!isString(name)) {
                    throw new Error(invalidNames);
                }
                
                id = ':' + name;
                if (!(id in list) || !list[id].registered) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }

    register(name, dependencies) {

        var isString = string,
            names = this.names,
            list = this.packages,
            PackageClass = Package;
        var c, l, dependency, items, il, id, packageObject;
        
        if (!isString(name)) {
            throw new Error(INVALID_NAME);
        }

        id = ':' + name;

        // try reuse only if not yet registered
        if (id in list) {

            // overwrite of package should not be possible if finalized
            if (list[id].registered) {
                throw new Error(`Package ${name} already exists.`);
            }
            packageObject = list[id];
        }
        // create new
        else {
            names[names.length] = name;
            list[id] = packageObject = new PackageClass(name);
        }
        
        packageObject.registered = true;
        

        if (isString(dependencies)) {
            dependencies = [dependencies];
        }

        if (array(dependencies)) {
            items = packageObject.requires;
            il = 0;

            for (c = -1, l = dependencies.length; l--;) {
                dependency = dependencies[++c];
                if (isString(dependency)) {
                    items[il++] = dependency;
                }

            }

        }
        else if (arguments.length > 1) {
            throw new Error(INVALID_DEPENDENCIES);
        }

        return this;

    }

    flatten(names) {
        var list = this.packages,
            invalidNames = INVALID_NAMES,
            isString = string;
        var position, len, name, id, inserted, stack, total,
            pack, requires, resolved, rl, recursed;

        if (isString(names)) {
            names = [names];
        }

        if (!array(names)) {
            throw new Error(invalidNames);
        }

        total = names.length;
        recursed = {};
        inserted = {};
        stack = null;
        position = -1;
        len = total;
        resolved = [];
        rl = 0;


        for (; len--;) {
            name = names[++position];

            // validate
            if (!isString(name)) {
                throw new Error(invalidNames);
            }

            id = ':' + name;
            if (!(id in list)) {
                throw new Error(`Package ${name} do not exist.`);
            }

            pack = list[id];
            if (!pack.registered) {
                throw new Error(`Package ${name} is not registered.`);
            }

            requires = pack.requires;
            total = requires.length;

            if (!(id in recursed)) {
                if (total) {
                    recursed[id] = true;
                    stack = {
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

        return resolved;

    }
}


export default Packager;

export { Packager };
