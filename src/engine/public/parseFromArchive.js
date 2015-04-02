/**
 * @description Read the file
 * @returns {Promise}
 */
jDoc.Engine.prototype.parseFromArchive = {
    value: function () {
        return new Promise(function (resolve, reject) {
            if (!this.isValid) {
                reject(new Error(this.errors.invalidFileType.message));
                return;
            }

            this.readFilesFromZip().then(
                function (fileEntries) {
                    this.createFileData(fileEntries).then(resolve);
                }.bind(this),
                function () {
                    reject(new Error(this.errors.invalidReadZipFile.message));
                }.bind(this)
            );
        }.bind(this));
    }
};