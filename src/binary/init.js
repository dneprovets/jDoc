/**
 * @namespace Binary
 * @param blob
 */
function Binary (blob) {
    this.blob = blob;
    this.size = blob.size || 0;
}

Object.defineProperties(Binary.prototype, {
    // @define prototypeProperties
});