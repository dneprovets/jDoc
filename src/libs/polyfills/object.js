if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value (target, firstSource) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);

            for (let i = 1; i < arguments.length; i++) {
                let nextSource = arguments[i];

                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                let keysArray = Object.keys(Object(nextSource));

                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    let nextKey = keysArray[nextIndex],
                        desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}