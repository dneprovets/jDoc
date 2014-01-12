jDoc.Engine.prototype.readFilesEntries = function (options) {
    options = options || {};

    /**
     * 1. IE does not support creating files for worker "on the fly".
     * 2. Memory leak when using WebWorkers
     *  https://code.google.com/p/chromium/issues/detail?id=39653
     *  https://code.google.com/p/chromium/issues/detail?id=263289
     */
    if (Worker && URL && !browser.isMSIE() && options.entries.length <= this.getMaxEntriesCountForWebWorker()) {
        return this._readFilesEntriesWithWorkers(options);
    }

    return this._readFilesEntriesWithoutWorkers(options);
};