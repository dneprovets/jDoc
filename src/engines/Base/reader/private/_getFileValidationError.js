/**
 * @description Return the error of file validation
 * @param file
 * @return {null|Object}
 */
jDoc.Engine.prototype._getFileValidationError = function (file) {
    return this._getFileType(file) ? null : this._errors.invalidFileType;
};