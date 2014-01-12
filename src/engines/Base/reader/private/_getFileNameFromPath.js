/**
 *
 * @param path
 * @return {String}
 * @private
 */
jDoc.Engine.prototype._getFileNameFromPath = function (path) {
    return (path || "").replace(/^.+\//, '') || path;
};