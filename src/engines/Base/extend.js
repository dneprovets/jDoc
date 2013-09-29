/**
 * Extend function
 * @param props
 * @return {Object}
 */
jDoc.Engine.extend = function (props) {
    var child = function () {},
        F = function () {},
        prop,
        self = this;

    if (this && this.hasOwnProperty('constructor')) {
        child = this.constructor;
    } else {
        child = function () {
            self.apply(this, arguments);
        };
    }

    F.prototype = this.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;

    /**
     * Set properties
     */
    for (prop in props) {
        if (props.hasOwnProperty(prop)) {
            child.prototype[prop] = props[prop];
        }
    }
    return child;
};