/**
 * @namespace DSV
 * @description Delimiter-separated values. Delimiters: comma, tab
 * @type {Object}
 */
var DSV = jDoc.Engine.extend(
    /** @lends DSV.prototype */
    {
        //@define prototypeProperties
    }
);

jDoc.defineEngine('DSV', [
    'text/csv',
    'text/tab-separated-values'
], DSV);