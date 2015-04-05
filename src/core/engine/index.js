import props from 'src/props.js';

function Engine (file) {
    var fileType = this.getFileType(file);

    if (fileType) {
        this.file = file;
        this.fileType = fileType;
    }

    if (typeof this.initialize === 'function') {
        this.initialize.apply(this, arguments);
    }
}

Object.defineProperties(Engine.prototype, props);

/**
 * @description Extend function
 * @param props
 * @return {Object}
 */
Engine.extend = function (props) {
    var Child = () => {},
        F = () => {},
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
    for (let prop in props) {
        if (props.hasOwnProperty(prop)) {
            Object.defineProperty(Child.prototype, prop, props[prop]);
        }
    }
    return Child;
};

export default Engine;