/**
 *
 * @returns {boolean}
 */
export default {
    get () {
        return !!(this.fileType && this.fileType.isTemplate);
    }
};