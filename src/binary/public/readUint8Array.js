/**
 *
 * @param options
 */
Binary.prototype.readUint8Array = {
    value (options = {}) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();

            reader.onload = (e) => {
                resolve(new Uint8Array(e.target.result));
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(this._blobSlice(this.blob, options.index, options.length));
        });
    }
};