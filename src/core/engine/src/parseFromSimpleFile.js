export default {
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

                    this.createFileData(result).then(resolve, function (rejection) {
                        reject(rejection || new Error(this.errors.invalidReadFile.message));
                    }.bind(this));
                }.bind(this) ,
                function () {
                    reject(new Error(this.errors.invalidFileType.message));
                }.bind(this)
            );
        }.bind(this));
    }
};