/**
 * @description Memory leak when using WebWorkers (https://code.google.com/p/chromium/issues/detail?id=39653, https://code.google.com/p/chromium/issues/detail?id=263289)
 * @returns {number}
 */
jDoc.Engine.prototype.maxEntriesCountForWebWorker = {
    value: 40
};