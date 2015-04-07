/**
 * @namespace OOXML
 * @type {Object}
 */
var OOXML = jDoc.Engine.extend(
    /** @lends OOXML.prototype */
    {
        //@define prototypeProperties
    }
);

jDoc.defineEngine('OOXML', [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
], OOXML);