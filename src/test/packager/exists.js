'use strict';


describe(`Inspects if Package [names] exists using
        Packager.prototype.exists(names:String|Array(String)) method.`,
    () => {
        var Packager = global.everything;
        var packager;

        beforeEach(() => {
            packager = new Packager();

            packager.register('main', ['r2', 'r5']);

            packager.register('r2', ['r3', 'r4']);

            packager.register('r3');

            packager.register('r4');

            packager.register('r5', ['main']);

        });

        it(`1. Should accept non-empty String [names] and returns true
            if it is a registered Package.`,
            () => {

                expect(() => packager.exists('main')).not.toThrow();

                expect(packager.exists('main')).toBe(true);
                expect(packager.exists('r5')).toBe(true);

            });

        it(`2. Should accept non-empty String [names] and returns false
            if it is not a registered Package.`,
            () => {

                expect(() => packager.exists('test')).not.toThrow();

                expect(packager.exists('name')).toBe(false);
                expect(packager.exists('test')).toBe(false);
                expect(packager.exists('wtf')).toBe(false);

            });

        it(`3. Should accept Array of non-empty String [names] and returns true
            all items in [names] Array are registered Packages.`,
            () => {

                expect(() => packager.exists(['main'])).not.toThrow();

                expect(packager.exists(['main'])).toBe(true);
                expect(packager.exists(['r4', 'r5'])).toBe(true);

            });

        it(`4. Should accept Array of non-empty String [names] and returns false
            if one of the items in [names] Array is not a registered Package.`,
            () => {

                expect(() => packager.exists(['node'])).not.toThrow();
                
                expect(packager.exists(['node'])).toBe(false);
                expect(packager.exists(['test', 'r5'])).toBe(false);
                expect(packager.exists(['r4', 'r5', 'animal'])).toBe(false);
                expect(packager.exists(['r4', 'wtf', 'r5'])).toBe(false);

            });

        it(`5. Should not accept empty String, or non-Array [names] parameter
            and throws an exception.`,
            () => {

                expect(() => packager.exists('')).toThrow();
                expect(() => packager.exists(/test/)).toThrow();
                expect(() => packager.exists({})).toThrow();
                expect(() => packager.exists(1)).toThrow();
                expect(() => packager.exists(new Date())).toThrow();

            });

        it(`6. Should not accept Array [names] parameter containing
            empty String or non-String items and throws an exception.`,
            () => {

                expect(() => packager.exists([''])).toThrow();
                expect(() => packager.exists([/test/, 1])).toThrow();
                expect(() => packager.exists(['yes', {}])).toThrow();
                expect(() => packager.exists(['diko', 1])).toThrow();
                expect(() => packager.exists([new Date(), {}])).toThrow();

            });

    });