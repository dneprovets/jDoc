jDoc.Engine.prototype.readFilesFromZip = {
    value: function () {
        return new Promise(function (resolve, reject) {
            zipEngine.read({
                file: this.file
            }).then(
                function (entries) {
                    var queue = [],
                        entriesCount = entries.length,
                        i;

                    for (i = 0; i < entriesCount; i++) {
                        queue.push(
                            zipEngine.readEntry({
                                entry: entries[i],
                                type: "Blob"
                            })
                        );
                    }

                    Promise.all(queue).then(function (list) {
                        resolve(list);
                    }, reject);
                },
                reject
            );
        }.bind(this));
    }
};