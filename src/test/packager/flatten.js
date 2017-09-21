'use strict';


describe(`Resolves all dependencies and returns the flattened dependency tree
        using Packager.prototype.flatten(names:String|Array(String)) method.`,
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

        it(`1. It should accept String [names] parameter and returns all
            dependencies.`,
            () => {

                expect(() => packager.flatten('main')).not.toThrow();

                expect(packager.flatten('main')).
                    toEqual(['r3', 'r4', 'r2', 'r5', 'main']);

                expect(packager.flatten(['r5'])).
                    toEqual(['r3', 'r4', 'r2', 'main', 'r5']);
                
                expect(packager.flatten(['r3'])).
                    toEqual(['r3']);

            });

        it(`2. It should accept Array [names] of String parameter and
            returns all dependencies.`,
            () => {
                var usualResult = ['r3',
                                    'r4',
                                    'r2',
                                    'r5',
                                    'main'];

                expect(() => packager.flatten(['main'])).
                    not.toThrow();

                expect(packager.flatten(['main'])).
                    toEqual(usualResult);

                expect(packager.flatten(['main', 'r4', 'r5'])).
                    toEqual(usualResult);


                expect(packager.flatten(['r5'])).
                    toEqual(['r3', 'r4', 'r2', 'main', 'r5']);

            });

        it(`3. It should not accept non-String, empty String, or
            non-Array [names] of String parameter and throws an exception.`,
            () => {

                expect(() => packager.flatten({})).toThrow();
                expect(() => packager.flatten('')).toThrow();
                expect(() => packager.flatten(null)).toThrow();
                expect(() => packager.flatten(/test/)).toThrow();

            });

        it(`4. It should not accept non-existent String Package [names] or
            Array containing non-existent String Package and
            throws an exception.`,
            () => {

                expect(() => packager.flatten('buang')).toThrow();
                expect(() => packager.flatten(['buang'])).toThrow();
                expect(() => packager.flatten(['test', 'buangbuang'])).
                    toThrow();
            });

    });