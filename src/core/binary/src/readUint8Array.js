import blobSlice from './../helpers/blobSlice';

/**
 *
 * @param options
 */
export default {
    value (options = {}) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();

            reader.onload = (e) => {
                resolve(new Uint8Array(e.target.result));
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blobSlice(this.blob, options.index, options.length));
        });
    }
};