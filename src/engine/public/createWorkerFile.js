jDoc.Engine.prototype.createWorkerFile = {
    value: function (workerFunction) {
        var functionBody = workerFunction.toString().replace(/\s*function[^\{]+\{\s*/, '').replace(/\s*\}\s*$/, '');

        return URL.createObjectURL(new Blob([functionBody], {
            type: 'text/javascript'
        }));
    }
};