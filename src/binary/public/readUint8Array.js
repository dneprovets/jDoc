/**
 *
 * @param options
 */
Binary.prototype.readUint8Array = function (options) {
    var reader = new FileReader();

    reader.onload = function (e) {
        options.success(new Uint8Array(e.target.result));
    };
    reader.onerror = options.onerror;
    reader.readAsArrayBuffer(this._blobSlice(this.blob, options.index, options.length));
};