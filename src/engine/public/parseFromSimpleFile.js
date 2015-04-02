jDoc.Engine.prototype.parseFromSimpleFile = {
    value () {
        return new Promise(function (resolve, reject) {
            if (!this.isValid) {
                reject(new Error(this.errors.invalidFileType.message));
                return;
            }

            this.readFileEntry({
                file: this.file
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