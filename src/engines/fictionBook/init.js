/**
 * @namespace FictionBook
 * @type {Object}
 */
var FictionBook = jDoc.Engine.extend(
    /** @lends FictionBook.prototype */
    {
        //@define prototypeProperties
    }
);

jDoc.defineEngine('FictionBook', ['text/xml'], FictionBook);