jDoc.Engine.prototype._createWorkerFile = function (workerFunction) {
    var functionBody = workerFunction.toString().replace(/\s*function[^\{]+\{\s*/, '').replace(/\s*\}\s*$/, '');

    return URL.createObjectURL(new Blob([functionBody], {
        type: 'text/javascript'
    }));
};