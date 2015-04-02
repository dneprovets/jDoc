ImageEngine.prototype.createFileData = function (data, callback) {
    if (typeof callback === 'function') {
        callback(
            new jDoc.FileData({
                name: this.fileName,
                pages: [{
                    options: {},
                    css: {},
                    children: [{
                        options: {
                            isImage: true
                        },
                        css: {},
                        properties: {
                            src: data
                        }
                    }]
                }]
            })
        );
    }
};