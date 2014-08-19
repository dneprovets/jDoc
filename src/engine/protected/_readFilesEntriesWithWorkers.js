jDoc.Engine.prototype._readFilesEntriesWithWorkers = function (options) {
    options = options || {};

    var entries = options.entries,
        len = entries.length,
        worker,
        results = [],
        path,
        counter = 0,
        i,
        onError = function () {
            this.trigger('error', this.errors.invalidReadFile);
        }.bind(this);

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

    for (i = len - 1; i >= 0; i--) {
        worker = new Worker(path);

        (function (entry, options) {
            worker.addEventListener('message', function (e) {
                var data = e.data;

                results.push(data);

                if (options.read && typeof options.read === "function") {
                    options.read(data, entry);
                }
                counter++;

                if (counter === len && options.success && typeof options.success === "function") {
                    options.success(results, entries, len);
                }
            }, false);

            worker.addEventListener('error', onError, false);

            worker.postMessage({
                method: options.method,
                filename: entry.entry.filename,
                file: entry.file
            });
        }(entries[i], options));
    }
};