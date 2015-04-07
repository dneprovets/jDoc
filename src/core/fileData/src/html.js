import Html from './../../html/index';

/**
 *
 * @param options
 * @returns {DocumentFragment}
 */
export default {
    value (options = {}) {
        var html = new Html(options);

        return html.buildDocument(this._data.pages);
    }
};