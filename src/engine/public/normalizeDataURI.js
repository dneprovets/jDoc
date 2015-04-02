/**
 *
 * @param dataURI
 * @param filename
 * @return {String}
 * @private
 */
jDoc.Engine.prototype.normalizeDataURI = {
    value: function (dataURI, filename) {
        return dataURI.replace(/data:[^;]*;/, 'data:' + getMimeTypeByName(filename) + ';');
    }
};