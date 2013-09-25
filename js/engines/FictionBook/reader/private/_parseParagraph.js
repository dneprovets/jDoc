/**
 *
 * @param options
 * @returns {{options: {isParagraph: boolean}, css: {}, dimensionCSSRules: {}, elements: Array}}
 * @private
 */
jDoc.Engines.FictionBook.prototype._parseParagraph = function (options) {
    var children = jDoc.DOM.children(options.node),
        len = children.length,
        i,
        element,
        result = {
            options: {
                isParagraph: true
            },
            css: {},
            dimensionCSSRules: {
                margin: {
                    value: 0,
                    units: "px"
                },
                padding: {
                    value: 0,
                    units: "px"
                }
            },
            elements: []
        };

    for (i = 0; i < len; i++) {
        if (children[i].localName === "a") {
            result.elements.push(this._parseLinkElement(children[i]));
        } else {
            element = {
                options: {},
                css: {},
                attributes: {},
                properties: {
                    textContent: children[i].textContent
                }
            };

            if (children[i].localName === "strong") {
                element.css.fontWeight = "bold";
            } else if (children[i].localName === "emphasis") {
                element.css.fontStyle = "italic";
            }

            result.elements.push(element);
        }
    }

    return result;
};