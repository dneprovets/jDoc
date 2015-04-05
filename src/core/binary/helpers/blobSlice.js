/**
 *
 * @param blob
 * @param index
 * @param length
 * @returns {*}
 * @private
 */
export default function (blob, index, length) {
    return blob.slice(index, index + length);
}