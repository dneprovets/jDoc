import errors from '../helpers/errors';
import selectEngine from '../helpers/selectEngine';

/**
 * @description Read the file
 * @param file
 * @param options
 * @returns {Promise}
 */
export default {
    value (file, options = {}) {
        return new Promise((resolve, reject) => {
            var parse,
                currentEngine;

            if (!jDoc.supported) {
                reject(new Error(errors.requiredTechnologies.message));
                return;
            }

            if (!(file instanceof File || file instanceof Blob)) {
                reject(new Error(errors.invalidReadFirstArgument.message));
                return;
            } else {
                currentEngine = selectEngine.call(this, file, options);
            }

            if (!currentEngine) {
                reject(new Error(errors.invalidFileType.message));
                return;
            }

            if (currentEngine.options && currentEngine.options.parseMethod) {
                parse = currentEngine[currentEngine.options.parseMethod];
            } else {
                parse = currentEngine.parse;
            }

            if (typeof parse === "function") {
                parse.call(currentEngine).then(resolve, reject);
            } else {
                reject(new Error(errors.invalidParseMethods));
            }
        });
    }
};