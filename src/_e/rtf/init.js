/**
 * @namespace RTF
 * @type {Object}
 */
var RTF = jDoc.Engine.extend(
    /** @lends RTF.prototype */
    {
        //@define prototypeProperties
    }
);

jDoc.defineEngine('RTF', [
    "text/rtf",
    "application/rtf"
], RTF);