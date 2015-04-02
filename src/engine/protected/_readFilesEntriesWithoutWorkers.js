jDoc.Engine.prototype._readFilesEntriesWithoutWorkers = {
    value: function (options) {
        options = options || {};

        var entries = options.entries,
            len = entries.length,
            counter = 0,
            results = [],
            readerMethod = options.method || "readAsText",
            i;

        for (i = len - 1; i >= 0; i--) {
            (function (entry, method, read, success) {
                var reader = new FileReader(),
                    filename = entries[i].entry.filename,
                    file = entries[i].file;

                reader.addEventListener('load', function (e) {
                    var data = e.target.result;
                    results.push(data);

                    if (read && typeof read === "function") {
                        read(data, entry);
                    }
                    counter++;

                    if (counter === len && success && typeof success === "function") {
                        success(results, entries, len);
                    }
                }, false);
                reader.addEventListener('error', options.error, false);

                if (filename.indexOf('media/') >= 0 || filename.indexOf('Pictures') >= 0) {
                    method = "readAsDataURL";
                }

                reader[method](file);
            }(entries[i], readerMethod, options.read, options.success));
        }
    }
};