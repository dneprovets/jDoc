/**
 * @namespace ODF
 * @type {Object}
 */
var ODF = jDoc.Engine.extend(
    /** @lends ODF.prototype */
    {
        //@define prototypeProperties
    }
);

jDoc.defineEngine('ODF', [
    '.odt', '.ott',
    '.odg', '.otg',
    '.odp', '.otp',
    '.ods', '.ots',
    '.odc', '.otc',
    '.odi', '.oti',
    '.odf', '.otf',
    '.odm',
    '.oth'
], ODF);