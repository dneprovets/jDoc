jDoc.Engine.prototype._readFilesEntriesWithWorkers = {
    value: function (options) {
        options = options || {};

        return new Promise(function (resolve, reject) {
            var entries = options.entries,
                len = entries.length,
                invalidFileErrorMessage = this.errors.invalidReadFile.message,
                worker,
                results = [],
                path,
                counter = 0;

            if (!this._workerFileForReading) {
                this._workerFileForReading = this.createWorkerFile(function () {
                    self.addEventListener('message', function (e) {
                        var data = e.data,
                            method = data.method || "readAsText",
                            filename = data.filename,
                            file = data.file;

                        var reader = new FileReaderSync();

                        if (filename && (filename.indexOf('media/') >= 0 || filename.indexOf('Pictures') >= 0)) {
                            method = "readAsDataURL";
                        }

                        self.postMessage(reader[method](file));
                    }, false);
                });
            }

            path = this._workerFileForReading;

            entries.forEach(function (entry, options) {
                worker = new Worker(path);

                worker.addEventListener('message', function (e) {
                    var data = e.data;

                    results.push(data);

                    if (options.read && typeof options.read === "function") {
                        options.read(data, entry);
                    }
                    counter++;

                    if (counter === len) {
                        resolve(results, entries, len);
                    }

                    this.terminate();
                }, false);

                worker.addEventListener('error', function () {
                    reject(new Error(invalidFileErrorMessage));
                    this.terminate();
                }, false);

                worker.postMessage({
                    method: options.method,
                    filename: entry.entry.filename,
                    file: entry.file
                });
            });
        }.bind(this));
    }
};