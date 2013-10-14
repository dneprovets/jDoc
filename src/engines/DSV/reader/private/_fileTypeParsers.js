/**
 * @description File types for parsing
 * @private
 */
jDoc.engines.DSV.prototype._fileTypeParsers = [
    {
        extension: ['csv'],
        mime: ['text/csv'],
        delimiterType: "comma",
        isTextDocument: true
    },
    {
        extension: ['tsv', 'tab'],
        mime: ['text/tab-separated-values'],
        delimiterType: "tab",
        isTextDocument: true
    }
];