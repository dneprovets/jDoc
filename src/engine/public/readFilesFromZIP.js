jDoc.Engine.prototype.readFilesFromZip = {
    value () {
        return new Promise(function (resolve, reject) {
            zipEngine.read({
                file: this.file
            }).then(
                function (entries) {
                    var queue = entries.map(entry => {
                        return zipEngine.readEntry({
                            entry,
                            type: "Blob"
                        });
                    });

                    Promise.all(queue).then(resolve, reject);
                },
                reject
            );
        }.bind(this));
    }
};