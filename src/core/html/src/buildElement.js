import addAttributes from './addAttributes';
import addProperties from './addProperties';
import applyCss from './applyCss';

/**
 *
 * @param data
 * @private
 */
export default {
    value: function (data) {
        var el,
            options = data.options || {};

        if (options.isParagraph) {
            return this.buildParagraph(data);
        }

        if (options.isTable) {
            return this.buildTable(data);
        }

        if (options.isList) {
            return this.buildList(data);
        }

        if (options.isImage) {
            return this.buildImage(data);
        }

        if (options.isEmptyLine) {
            return this.buildEmptyLine(data);
        }

        if (options.isSchema) {
            return this.buildSchema(data);
        }

        if (options.isLink) {
            return this.buildLink(data);
        }

        if (data.children) {
            el = document.createElement('div');

            data.children.forEach(function (child) {
                el.appendChild(this.buildElement(child));
            }.bind(this));
        } else {
            el = document.createElement('span');
        }

        this.applyCss(el, data);
        this.addAttributes(el, data);
        this.addProperties(el, data);

        return el;
    }
}