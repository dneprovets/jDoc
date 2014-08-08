/**
 *
 * @param options
 * @private
 */
jDoc.Engine.prototype.readFilesFromZIP = function (options) {
    var fileEntries = [];

    options = options || {};

    zipEngine.read({
        file: this.file,
        success: function (entries) {
            var counter = 0,
                entriesCount = entries.length,
                i;

            for (i = 0; i < entriesCount; i++) {
                zipEngine.readEntry({
                    entry: entries[i],
                    type: "Blob",
                    success: function (entryObject, file, blobURL) {
                        if (file) {
                            fileEntries.push({
                                entry: entryObject,
                                file: file,
                                blobURL: blobURL
                            });
                        }

                        counter++;

                        // If all files was processed - run parser
                        if (counter == entriesCount) {
                            if (typeof options.success === 'function') {
                                options.success(fileEntries);
                            }
                            return null;
                        }

                        return null;
                    }
                });
            }
        },
        error: function () {
            if (typeof options.error === 'function') {
                options.error();
            }
        }
    });
};