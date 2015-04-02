function createWorker (workerFunction) {
    var path,
        worker,
        functionBody = workerFunction.toString()
            .replace(/\s*function[^\{]+\{\s*/, '')
            .replace(/\s*\}\s*$/, '');

    path = URL.createObjectURL(new Blob([functionBody], {
        type: 'text/javascript'
    }));

    worker = new Worker(path);

    URL.revokeObjectURL(path);

    return worker;
}