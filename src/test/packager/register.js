'use strict';


describe(`Registers package [name] and its [dependencies] using
        Packager.prototype.register(name:String
                                    [, dependencies:Array(String)]) method`,
    () => {
        var Packager = global.everything;
        var packager;

        beforeEach(() => {
            packager = new Packager();
        });

        it(`1. Should accept non-empty String [name] parameter then
            returns the packager instance when [name] was successfully
            registered.`,
            () => {
                expect(() => packager.register('r1')).not.toThrow();
                expect(() => packager.register('r2')).not.toThrow();
                expect(() => packager.register('r3')).not.toThrow();

            });

        it(`2. Should accept non-empty String [name] and optional String
            [dependencies] parameter then returns the packager instance
            when [name] was successfully registered.`,
            () => {
                expect(() => packager.register('r1', 'r5')).not.toThrow();
                expect(() => packager.register('r2', 'r5')).not.toThrow();
                expect(() => packager.register('r3', 'r5')).not.toThrow();
            });

        it(`3. Should accept non-empty String [name] and optional Array
            [dependencies] containing string items parameter then
            returns the packager instance when [name] was
            successfully registered.`,
            () => {
                expect(() => packager.register('r1', 'r5')).not.toThrow();
                expect(() => packager.register('r2', 'r5')).not.toThrow();
                expect(() => packager.register('r3', 'r5')).not.toThrow();
            });

        it(`4. Should not accept [name] parameter that is already registered
            and throws an exception.`,
            () => {
                expect(() => packager.register('r1', 'r5')).not.toThrow();
                expect(() => packager.register('r1', 'r8')).toThrow();
                expect(() => packager.register('r2', 'r5')).not.toThrow();
                expect(() => packager.register('r2', 'r10')).toThrow();
            });

        it(`5. Should not accept empty String or non-String [name] parameter
            and throws an exception.`,
            () => {
                expect(() => packager.register('', 'r5')).toThrow();
                expect(() => packager.register(null, 'r5')).toThrow();
                expect(() => packager.register(1, 'r5')).toThrow();
                expect(() => packager.register(/test/, 'r5')).toThrow();
                expect(() => packager.register(new Date(), 'r5')).toThrow();
            });

        it(`6. Should not accept empty String, non-String or non-Array
            [dependencies] parameter and throws an exception.`,
            () => {
                expect(() => packager.register('r5', '')).toThrow();
                expect(() => packager.register('r5', null)).toThrow();
                expect(() => packager.register('r5', 1)).toThrow();
                expect(() => packager.register('r5', /test/)).toThrow();
                expect(() => packager.register('r5', new Date())).toThrow();
            });

    });