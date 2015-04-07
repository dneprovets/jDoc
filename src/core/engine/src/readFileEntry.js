import createWorker from './../helpers/createWorker';

export default {
    value (fileEntry = {}) {
        return new Promise(function (resolve, reject) {
            var {file, entry = {}, method} = fileEntry,
                invalidFileErrorMessage = this.errors.invalidReadFile.message,
                worker;

            if (!file) {
                reject(new Error(invalidFileErrorMessage));
                return;
            }

            worker = createWorker(function () {
                self.addEventListener('message', function (e) {
                    var data = e.data,
                        method = data.method || "readAsText",
                        filename = data.filename,
                        file = data.file,
                        reader = new FileReaderSync();

                    if (filename && (filename.indexOf('media/') >= 0 || filename.indexOf('Pictures') >= 0)) {
                        method = "readAsDataURL";
                    }

                    self.postMessage(reader[method](file));
                }, false);
            });

            worker.addEventListener('message', function (e) {
                var data = e.data;

                resolve(data);

                this.terminate();
            }, false);

            worker.addEventListener('error', function () {
                reject(new Error(invalidFileErrorMessage));
                this.terminate();
            }, false);

            worker.postMessage({
                method: method,
                filename: entry.filename,
                file: file
            });
        }.bind(this));
    }
};