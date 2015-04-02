jDoc.Engine.prototype.parseFromSimpleFile = {
    value: function () {
        return new Promise(function (resolve, reject) {
            if (!this.isValid) {
                reject(new Error(this.errors.invalidFileType.message));
                return;
            }

            this.readFilesEntries({
                entries: [{
                    file: this.file,
                    entry: {}
                }]
            }).then(
                function (result) {
                    if (typeof this.createFileData !== 'function') {
                        reject(new Error(this.errors.notFoundMethodCreateFileData.message));
                        return;
                    }

                    this.createFileData(result, function (fileData) {
                        resolve(fileData);
                    });
                }.bind(this) ,
                function () {
                    reject(new Error(this.errors.invalidFileType.message));
                }.bind(this)
            );
        }.bind(this));
    }
};