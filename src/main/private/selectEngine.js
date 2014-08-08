/**
 *
 * @param file
 * @param options
 * @private
 */
function selectEngine (file, options) {
    options = options || {};

    var engines = jDoc._engines,
        k,
        engineObj;

    // Select engine for file
    this._currentEngine = null;

    for (k in engines) {
        if (engines.hasOwnProperty(k) && typeof engines[k] === 'function') {
            engineObj = new engines[k](file);

            if (engineObj.validate()) {
                this._currentEngine = engineObj;
                break;
            }
        }
    }

    return this;
}