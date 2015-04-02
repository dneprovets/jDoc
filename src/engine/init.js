// @namespace jDoc.Engine
jDoc.Engine = function (file) {
    var fileType = this.getFileType(file);

    if (fileType) {
        this.file = file;
        this.fileType = fileType;
    }

    if (typeof this.initialize === 'function') {
        this.initialize.apply(this, arguments);
    }
};

Object.defineProperties(jDoc.Engine.prototype, {
    fileType: {
        writable: true
    },

    errors: {
        value: clone(errors)
    },

    colorList: {
        value: clone(colorList)
    },

    fileName: {
        get: function () {
            return (this.file && this.file.name) || "";
        }
    },

    fileTypeParsers: {
        writable: true,
        value: []
    },

    emDash: {
        value: "—"
    },

    enDash: {
        value: "–"
    },

    isValid: {
        enumerable: false,
        configurable: false,
        get: function () {
            return !!(this.file && this.fileType);
        }
    },

    halfTabAsSpaces: {
        value: "\u2000\u2000"
    }

    // @define prototypeProperties
});

/**
 * @description Extend function
 * @param props
 * @return {Object}
 */
jDoc.Engine.extend = function (props) {
    var Child = function () {},
        F = function () {},
        prop,
        self = this;

    if (this && this.hasOwnProperty('constructor')) {
        Child = this.constructor;
    } else {
        Child = function () {
            self.apply(this, arguments);
        };
    }

    F.prototype = this.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superproto = this.prototype;

    /**
     * Set properties
     */
    for (prop in props) {
        if (props.hasOwnProperty(prop)) {
            if (Array.isArray(props[prop])) {
                Child.prototype[prop] = props[prop].slice(0);
            } else {
                Child.prototype[prop] = props[prop];
            }
        }
    }
    return Child;
};