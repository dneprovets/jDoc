jDoc.Engine.prototype.readFilesEntries = {
    value: function (options) {
        options = options || {};

        /**
         * @description 1. IE does not support creating files for worker "on the fly".
         * @description 2. Memory leak when using WebWorkers
         * @description https://code.google.com/p/chromium/issues/detail?id=39653
         * @description https://code.google.com/p/chromium/issues/detail?id=263289
         */
        if (typeof Worker !== 'undefined' && typeof URL !== 'undefined' && !browser.msie && options.entries && options.entries.length <= this.maxEntriesCountForWebWorker) {
            return this._readFilesEntriesWithWorkers(options);
        }

        return this._readFilesEntriesWithoutWorkers(options);
    }
};