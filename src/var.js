var copy = Object.assign,
    documentFormats = [],
    ArrayPrototype = Array.prototype,
    documentEngines = {},
    libsRoot = {},
    clone = function (obj) {
        return copy({}, obj);
    };