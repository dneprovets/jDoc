export default {
    get () {
        return !!(this.fileType && this.fileType.isImageDocument);
    }
};