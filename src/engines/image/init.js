/**
 * @namespace ImageEngine
 * @type {Object}
 */
var ImageEngine = jDoc.Engine.extend(
    /** @lends ImageEngine.prototype */
    {
        //@define prototypeProperties
    }
);

jDoc.defineEngine('Image', [
    "image/gif",
    "image/jpg",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/vnd.microsoft.icon",
    "image/vnd.wap.wbmp"
], ImageEngine);