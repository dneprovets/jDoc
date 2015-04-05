import findPosition from './src/findPosition.js';
import getDataHelper from './src/getDataHelper';
import getUint8Array from './src/getUint8Array';
import getUint16Array from './src/getUint16Array';
import getUint32Array from './src/getUint32Array';
import ord from './src/ord';
import readUint8Array from './src/readUint8Array';
import reverseUintArray from './src/reverseUintArray';
import uintArraySplit from './src/uintArraySplit';
import uintArrayToHex from './src/uintArrayToHex';

/**
 * @param blob
 */
function Binary (blob) {
    this.blob = blob;
    this.size = blob.size || 0;
}

Object.defineProperties(Binary.prototype, {
    uintArrayToHex,
    findPosition,
    getDataHelper,
    getUint8Array,
    getUint16Array,
    getUint32Array,
    ord,
    readUint8Array,
    reverseUintArray,
    uintArraySplit
});

export default Binary;