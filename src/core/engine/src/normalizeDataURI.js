/**
 *
 * @param dataURI
 * @param filename
 * @return {String}
 * @private
 */
export default {
    value (dataURI, filename) {
        return dataURI.replace(/data:[^;]*;/, 'data:' + getMimeTypeByName(filename) + ';');
    }
};