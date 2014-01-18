jDoc.Engine.prototype.readFilesEntries = function (options) {
    options = options || {};

    /**
     * @description 1. IE does not support creating files for worker "on the fly".
     * @description 2. Memory leak when using WebWorkers
     * @description https://code.google.com/p/chromium/issues/detail?id=39653
     * @description https://code.google.com/p/chromium/issues/detail?id=263289
     */
    if (Worker && URL && !jDoc.browser.isMSIE() && options.entries.length <= this.getMaxEntriesCountForWebWorker()) {
        return this._readFilesEntriesWithWorkers(options);
    }

    return this._readFilesEntriesWithoutWorkers(options);
};