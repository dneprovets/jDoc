import tabAsSpaces from './tabAsSpaces';
import getNonbreakingSpace from './getNonbreakingSpace';
import readFilesFromZip from './readFilesFromZip';
import spotElementHeight from './spotElementHeight';
import normalizeDataURI from './normalizeDataUri';
import getFileType from './getFileType';
import replaceAttributeNamespace from './replaceAttributeNamespace';
import getWordsCountInText from './getWordsCountInText';
import cropUnit from './cropUnit';
import readFileEntry from './readFileEntry';
import parseFromSimpleFile from './parseFromSimpleFile';
import normalizeColorValue from './normalizeColorValue';
import normalizeDate from './normalizeDate';
import getCharFromHex from './getCharFromHex';
import normalizeEncodingValue from './normalizeEncodingValue';
import calculateElementHeight from './calculateElementHeight';
import replaceSpaces from './replaceSpaces';
import attributeToBoolean from './attributeToBoolean';
import parseFromArchive from './parseFromArchive';
import normalizeVerticalAlign from './normalizeVerticalAlign';
import getMaxFontSize from './getMaxFontSize';
import colorList from './../../jdoc/helpers/colorList';
import errors from './../../jdoc/helpers/errors';

export default {
    fileType: {
        writable: true
    },

    errors: {
        value: clone(errors)
    },

    colorList: {
        value: clone(colorList)
    },

    fileName: {
        get () {
            return (this.file && this.file.name) || "";
        }
    },

    fileTypeParsers: {
        writable: true,
        value: []
    },

    emDash: {
        value: "—"
    },

    enDash: {
        value: "–"
    },

    isValid: {
        enumerable: false,
        get () {
            return !!(this.file && this.fileType);
        }
    },

    halfTabAsSpaces: {
        value: "\u2000\u2000"
    },

    tabAsSpaces,
    getNonbreakingSpace,
    readFilesFromZip,
    spotElementHeight,
    normalizeDataURI,
    getFileType,
    replaceAttributeNamespace,
    getWordsCountInText,
    cropUnit,
    readFileEntry,
    parseFromSimpleFile,
    normalizeColorValue,
    normalizeDate,
    getCharFromHex,
    normalizeEncodingValue,
    calculateElementHeight,
    replaceSpaces,
    attributeToBoolean,
    parseFromArchive,
    normalizeVerticalAlign,
    getMaxFontSize
};