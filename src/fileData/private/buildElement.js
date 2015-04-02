/**
 *
 * @param data
 * @private
 */
function buildElement (data) {
    var el,
        i,
        options = data.options || {},
        len;

    if (options.isParagraph) {
        return buildParagraph.call(this, data);
    }

    if (options.isTable) {
        return buildTable.call(this, data);
    }

    if (options.isList) {
        return buildList.call(this, data);
    }

    if (options.isImage) {
        return buildImage.call(this, data);
    }

    if (options.isEmptyLine) {
        return buildEmptyLine.call(this, data);
    }

    if (options.isSchema) {
        return buildSchema.call(this, data);
    }

    if (options.isLink) {
        return buildLink.call(this, data);
    }

    if (data.children) {
        el = document.createElement('div');
        len = data.children.length;

        for (i = 0; i < len; i++) {
            el.appendChild(buildElement.call(this, data.children[i]));
        }
    } else {
        el = document.createElement('span');
    }

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    return el;
}