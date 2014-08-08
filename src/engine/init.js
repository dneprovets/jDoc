// @namespace jDoc.Engine
jDoc.Engine = function (file) {
    var fileType = this.getFileType(file);

    if (fileType) {
        this.file = file;
        this.options.isValid = true;
        this.options.fileType = fileType;
    } else {
        this.options.isValid = false;
    }

    if (typeof this.initialize === 'function') {
        this.initialize.apply(this, arguments);
    }
};

jDoc.Engine.prototype = {
    options: {
        isValid: false,
        fileType: ""
    },

    errors: clone(errors),

    colorList: clone(colorList),

    fileTypeParsers: []

    // @define prototypeProperties
};

copy(jDoc.Engine.prototype, Events);

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

    /**
     * Set properties
     */
    for (prop in props) {
        if (props.hasOwnProperty(prop)) {
            if (prop === "options") {
                Child.prototype[prop] = copy({}, Child.prototype[prop], props[prop]);
            } else if (Array.isArray(props[prop])) {
                Child.prototype[prop] = props[prop].slice(0);
            } else {
                Child.prototype[prop] = props[prop];
            }
        }
    }
    return Child;
};