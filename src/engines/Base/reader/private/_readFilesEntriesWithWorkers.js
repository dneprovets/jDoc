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

        };

    if (!this._workerFileForReading) {
        this._workerFileForReading = this._createWorkerFile(function () {
            self.addEventListener('message', function (e) {
                var data = e.data,
                    filename = data.filename,
                    method = "readAsText",
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

        (function (entry, read, success) {
            worker.addEventListener('message', function (e) {
                var data = e.data;

                results.push(data);

                if (read && typeof read === "function") {
                    read(data, entry);
                }
                counter++;

                if (counter === len && success && typeof success === "function") {
                    success(results, entries, len);
                }
            }, false);

            worker.addEventListener('error', onError, false);

            worker.postMessage({
                filename: entry.entry.filename,
                file: entry.file
            });
        }(entries[i], options.read, options.success));
    }
};