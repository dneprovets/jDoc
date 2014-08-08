var zipEngine = {
    /**
     *
     * @param entry
     * @param creationMethod
     * @param onend
     * @param onprogress
     * @private
     */
    _getEntryFile: function (entry, creationMethod, onend, onprogress) {
        entry.getData(new libsRoot.zip.BlobWriter(), function (blob) {
            onend(entry, blob);
        }, onprogress);
    },
    /**
     *
     * @param options
     */
    read: function (options) {
        libsRoot.zip.createReader(new libsRoot.zip.BlobReader(options.file), function (zipReader) {
            zipReader.getEntries(function (entries) {
                if (typeof options.success === 'function') {
                    options.success(entries);
                }
            });
        }, function () {
            if (typeof options.error === 'function') {
                options.error();
            }
        });
    },
    /**
     *
     * @param options
     */
    readEntry: function (options) {
        var self = this;
        this._getEntryFile(options.entry, options.type, function (entryObject, file) {
            if (typeof options.success === 'function') {
                options.success.apply(self, arguments);
            }
        });
    }
};