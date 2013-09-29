jDoc.DOM = {
    /**
     *
     * @param element
     * @param tagName
     * @returns {*}
     */
    find: function (element, tagName) {
        var i,
            childrenCount;

        if (!element || !element.childNodes || !tagName) {
            return null;
        }

        childrenCount = element.childNodes.length;

        if (!childrenCount) {
            return null;
        }

        for (i = 0; i < childrenCount; i++) {
            if (element.childNodes[i].localName == tagName || element.childNodes[i].nodeName == tagName) {
                return element.childNodes[i];
            }
        }

        return null;
    },

    /**
     *
     * @param element
     * @param tagName
     * @returns {*}
     */
    findAll: function (element, tagName) {
        var i,
            childrenCount,
            result = [];

        if (!element || !element.childNodes || !tagName) {
            return null;
        }

        childrenCount = element.childNodes.length;

        if (!childrenCount) {
            return null;
        }

        for (i = 0; i < childrenCount; i++) {
            if (element.childNodes[i].localName == tagName || element.childNodes[i].nodeName == tagName) {
                result.push(element.childNodes[i]);
            }
        }
        return result;
    },

    /**
     *
     * @param element
     * @returns {Array}
     */
    children: function (element) {
        return element ? this.sibling(element.firstChild) : [];
    },

    /**
     *
     * @param n
     * @param elem
     * @returns {Array}
     */
    sibling: function (n, elem) {
        var arr = [];

        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                arr.push(n);
            }
        }

        return arr;
    },

    _vendorPrefix: {
        "boxSizing": ["moz", "o", "ms", "webkit"]
    },

    /**
     *
     * @param el {HTMLElement}
     * @param prop
     * @param val
     * @returns {HTMLElement}
     * @private
     */
    _addVendorPrefix: function (el, prop, val) {
        var i;

        for (i = this._vendorPrefix[prop].length - 1; i >= 0; i--) {
            el.style[this._vendorPrefix[prop][i]] = val;
        }

        el.style[prop] = val;

        return el;
    },

    /**
     *
     * @param prop {string}
     * @returns {string}
     * @private
     */
    _prepareCSSProperty: function (prop) {
        var mask = (/-(\w)/g),
            result = prop,
            data = mask.exec(result);

        while (data) {
            result = result.replace("-" + data[1], data[1].toUpperCase());
            data = mask.exec(result);
        }

        return result;
    },

    /**
     *
     * @param el {HTMLElement}
     * @param key
     * @param val
     * @returns {HTMLElement}
     */
    css: function (el, key, val) {
        var prop;

        if (!el) {
            return el;
        }

        if (typeof key === "object") {
            for (prop in key) {
                prop = this._prepareCSSProperty(prop);

                if (this._vendorPrefix[prop]) {
                    this._addVendorPrefix(el, prop, key[prop]);
                }

                el.style[prop] = key[prop];
            }
        } else {
            key = this._prepareCSSProperty(key);

            if (this._vendorPrefix[key]) {
                this._addVendorPrefix(el, key, val);
            }

            el.style[key] = val;
        }

        return el;
    }
};