/**
 *
 * @param obj
 * @returns {*}
 */
jDoc.deepMerge = function (obj) {
    var prop,
        i,
        dataObj,
        data = ArrayPrototype.slice.call(arguments, 1),
        len = data.length;

    obj = obj || {};

    for (i = 0; i < len; i++) {
        for (prop in data[i]) {
            if (data[i].hasOwnProperty(prop)) {
                dataObj = data[i][prop];

                if (dataObj instanceof Array) {
                    obj[prop] = dataObj.slice(0);
                } else if (dataObj != null && typeof dataObj === 'object') {
                    obj[prop] = this.deepMerge({}, obj[prop], dataObj);
                } else {
                    obj[prop] = dataObj;
                }
            }
        }
    }

    return obj;
};