jDoc.Engine = function () {
    this.initialize.apply(this, arguments);
};
jDoc.Engine.prototype = {
    //[ENGINE]
};

/**
 * @description Extend function
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
            if (prop === "options") {
                child.prototype[prop] = jDoc.deepMerge({}, child.prototype[prop], props[prop]);
            } else {
                child.prototype[prop] = props[prop];
            }
        }
    }
    return child;
};