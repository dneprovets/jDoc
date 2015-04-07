import props from './src/props';

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
    var Child = function () {
        Engine.apply(this, arguments);
    };

    Child.prototype = Object.create(this.prototype, props);
    Child.prototype.constructor = Child;

    return Child;
};

export default Engine;