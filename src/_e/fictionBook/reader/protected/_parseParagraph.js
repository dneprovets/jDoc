/**
 *
 * @param params
 * @returns {*}
 * @private
 */
FictionBook.prototype._parseParagraph = function (params) {
    var node = params.node,
        children = $.children(node),
        len = children.length,
        i,
        element,
        result = {
            params: {
                isParagraph: true
            },
            css: {},
            dimensionCssRules: {
                margin: {
                    value: 0,
                    unit: "px"
                },
                padding: {
                    value: 0,
                    unit: "px"
                }
            },
            children: []
        };

    for (i = 0; i < len; i++) {
        if (children[i].localName === "a") {
            result.children.push(this._parseLinkElement(children[i]));
        } else {
            element = {
                params: {},
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

            result.children.push(element);
        }
    }
    
    if (!len && node.textContent) {
        result.children.push({
            params: {},
            css: {},
            attributes: {},
            properties: {
                textContent: node.textContent
            }
        });
    }

    return result;
};