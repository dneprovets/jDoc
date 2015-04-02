var zipEngine = {
    /**
     *
     * @param options
     */
    read (options = {}) {
        return new Promise((resolve, reject) => {
            libsRoot.zip.createReader(new libsRoot.zip.BlobReader(options.file), (zipReader) => {
                zipReader.getEntries(resolve);
            }, reject);
        });
    },
    /**
     *
     * @param options
     */
    readEntry (options = {}) {
        return new Promise((resolve) => {
            var entry = options.entry;

            entry.getData(new libsRoot.zip.BlobWriter(), (blob, blobURL) => {
                resolve({
                    entry,
                    file: blob,
                    blobURL
                });
            });
        });
    }
};