function once(func) {
    var ran,
        result;

    if (!isFunction(func)) {
        throw new TypeError;
    }
    return function() {
        if (ran) {
            return result;
        }
        ran = true;
        result = func.apply(this, arguments);

        // clear the `func` variable so the function may be garbage collected
        func = null;
        return result;
    };
}