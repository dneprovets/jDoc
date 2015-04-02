/**
 *
 * @param file
 * @returns {null|jDoc.Engine}
 */
function selectEngine (file) {
    var engines = documentEngines,
        engineObj;

    for (let k in engines) {
        if (engines.hasOwnProperty(k) && typeof engines[k] === 'function') {
            engineObj = new engines[k](file);

            if (engineObj.isValid) {
                return engineObj;
            }
        }
    }

    return null;
}