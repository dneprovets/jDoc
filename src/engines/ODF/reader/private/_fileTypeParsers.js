/**
 * @type {Array}
 * @private
 */
jDoc.engines.ODF.prototype._fileTypeParsers = [
    {
        extension : 'odt',
        mime : 'vnd.oasis.opendocument.text',
        isTextDocument : true
    },
    {
        extension : 'ott',
        mime : 'vnd.oasis.opendocument.text-template',
        isTextDocument : true,
        isTemplate : true
    },
    {
        extension : 'odg',
        mime : 'vnd.oasis.opendocument.graphics',
        isGraphicDocument : true
    },
    {
        extension : 'otg',
        mime : 'vnd.oasis.opendocument.graphics-template',
        isGraphicDocument : true,
        isTemplate : true
    },
    {
        extension : 'odp',
        mime : 'vnd.oasis.opendocument.presentation',
        isPresentation : true,
        isTemplate : true
    },
    {
        extension : 'otp',
        mime : 'vnd.oasis.opendocument.presentation-template',
        isPresentationDocument : true,
        isTemplate : true
    },
    {
        extension : 'ods',
        mime : 'vnd.oasis.opendocument.spreadsheet',
        isSpreadsheetDocument : true
    },
    {
        extension : 'ots',
        mime : 'vnd.oasis.opendocument.spreadsheet-template',
        isSpreadsheetDocument : true,
        isTemplate : true
    },
    {
        extension : 'odc',
        mime : 'vnd.oasis.opendocument.chart',
        isChartDocument : true
    },
    {
        extension : 'otc',
        mime : 'vnd.oasis.opendocument.chart-template',
        isChartDocument : true,
        isTemplate : true
    },
    {
        extension : 'odi',
        mime : 'vnd.oasis.opendocument.image',
        isImageDocument : true
    },
    {
        extension : 'oti',
        mime : 'vnd.oasis.opendocument.image-template',
        isImageDocument : true,
        isTemplate : true
    },
    {
        extension : 'odf',
        mime : 'vnd.oasis.opendocument.formula',
        isFormulaDocument : true
    },
    {
        extension : 'otf',
        mime : 'vnd.oasis.opendocument.formula-template',
        isFormulaDocument : true,
        isTemplate : true
    },
    {
        extension : 'odm',
        mime : 'vnd.oasis.opendocument.text-master',
        isTextDocumentMaster : true
    },
    {
        extension : 'oth',
        mime : 'vnd.oasis.opendocument.text-web',
        isTextDocumentMasterWeb : true
    }
];