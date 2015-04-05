/**
 * @description Read the file
 * @returns {Promise}
 */
export default {
    value () {
        return new Promise(function (resolve, reject) {
            if (!this.isValid) {
                reject(new Error(this.errors.invalidFileType.message));
                return;
            }

            this.readFilesFromZip().then(
                function (result) {
                    this.createFileData(result).then(resolve, function (rejection) {
                        reject(rejection || new Error(this.errors.invalidReadFile.message));
                    }.bind(this));
                }.bind(this),
                function () {
                    reject(new Error(this.errors.invalidReadZipFile.message));
                }.bind(this)
            );
        }.bind(this));
    }
};