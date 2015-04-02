$.children = {
    /**
     *
     * @param element
     * @returns {Array}
     */
    value (element) {
        return element ? this.siblings(element.firstChild) : [];
    }
};