/**
 *
 * @param attrs
 */
jDoc.ParsedFile = function (attrs) {
    attrs = attrs || {};

    this._data.pages = attrs.pages || this._data.pages;
    this._clonedData = jDoc.clone(this._data);
};

jDoc.ParsedFile.prototype =
    /** @lends jDoc.ParsedFile.prototype */
    {

        _data: {
            pages: []
        },

        options: {
            language: "",
            isTextDocument: false,
            wordsCount: 0,
            name: "",
            zoom: 100
        },

        /**
         *
         * @return {Boolean}
         */
        isTextDocument: function () {
            return !!this.options.isTextDocument;
        },

        /**
         *
         * @return {String}
         */
        getLanguage: function () {
            return this.options.language || "";
        },

        /**
         *
         * @return {Number}
         */
        getWordsCount: function () {
            return this.options.wordsCount;
        },

        /**
         *
         * @return {String}
         */
        getName: function () {
            return this.options.name || "";
        },

        /**
         *
         * @return {Number}
         */
        getZoom: function () {
            return this.options.zoom || 100;
        },

        _htmlOptions: {},

        _setHTMLOptions: function (options) {
            this._htmlOptions = jDoc.deepMerge({}, options, {
                units: {
                    font: "px",
                    border: "px",
                    margin: "px",
                    padding: "px",
                    base: "px"
                }
            });
        },

        /**
         *
         * @param node
         * @param data
         * @param options
         * @private
         */
        _applyCSS: function (node, data, options) {
            var prop,
                resultUnits;

            options = options || {};

            for (prop in data.css) {
                node.style[prop] = data.css[prop];
            }

            for (prop in data.dimensionCSSRules) {
                resultUnits = this._htmlOptions.units.base;

                if (prop == "lineHeight" || prop.indexOf('font') >= 0) {
                    resultUnits = this._htmlOptions.units.font;
                } else if (prop.indexOf('border') >= 0) {
                    resultUnits = this._htmlOptions.units.border;
                } else if (prop.indexOf('margin') >= 0) {
                    resultUnits = this._htmlOptions.units.margin;
                } else if (prop.indexOf('padding') >= 0) {
                    resultUnits = this._htmlOptions.units.padding;
                }

                node.style[prop] = jDoc._unitSizeConverter({
                    from: data.dimensionCSSRules[prop].units,
                    to: resultUnits,
                    value: data.dimensionCSSRules[prop].value
                }) + resultUnits;
            }
        },

        /**
         *
         * @param node
         * @param data
         * @param options
         * @private
         */
        _addAttributes: function (node, data, options) {
            var prop;

            options = options || {};

            for (prop in data.attributes) {
                node.setAttribute(prop, data.attributes[prop]);
            }
        },

        /**
         *
         * @param node
         * @param data
         * @param options
         * @private
         */
        _addProperties: function (node, data, options) {
            var prop;

            options = options || {};

            for (prop in data.properties) {
                node[prop] = data.properties[prop];
            }
        },

        /**
         *
         * @param data
         * @param options
         * @returns {HTMLElement}
         * @private
         */
        _buildTablePart: function (data, options) {
            var len = data.rows.length,
                el,
                i,
                j,
                c,
                cLen,
                eLen,
                chEl,
                elem,
                partTagName = "tbody",
                rowTagName = "tr",
                cellTagName = "td";

            options = options || {};

            if (options.isHeader) {
                partTagName = "thead";
                cellTagName = "th";
            } else if (options.isFooter) {
                partTagName = "tfoot";
            }

            el = document.createElement(partTagName);

            this._applyCSS(el, data);
            this._addAttributes(el, data);
            this._addProperties(el, data);

            for (i = 0; i < len; i++) {
                chEl = document.createElement(rowTagName);

                this._applyCSS(chEl, data.rows[i]);
                this._addAttributes(chEl, data.rows[i]);
                this._addProperties(chEl, data.rows[i]);

                eLen = data.rows[i].cells.length;

                for (j = 0; j < eLen; j++) {
                    elem = document.createElement(cellTagName);

                    this._applyCSS(elem, data.rows[i].cells[j]);
                    this._addAttributes(elem, data.rows[i].cells[j]);
                    this._addProperties(elem, data.rows[i].cells[j]);

                    cLen = data.rows[i].cells[j].elements.length;

                    for (c = 0; c < cLen; c++) {
                        elem.appendChild(this._buildElement(data.rows[i].cells[j].elements[c]));
                    }

                    chEl.appendChild(elem);
                }

                el.appendChild(chEl);
            }

            return el;
        },

        /**
         *
         * @param data
         * @returns {HTMLElement}
         * @private
         */
        _buildTable: function (data) {
            var table = document.createElement('table');

            this._applyCSS(table, data);
            this._addAttributes(table, data);
            this._addProperties(table, data);

            if (data.header) {
                table.appendChild(this._buildTablePart(data.header, {isHeader: true}));
            }

            if (data.footer) {
                table.appendChild(this._buildTablePart(data.footer, {isFooter: true}));
            }

            if (data.body) {
                table.appendChild(this._buildTablePart(data.body));
            }

            return table;
        },

        /**
         *
         * @param data
         * @returns {HTMLElement}
         * @private
         */
        _buildParagraph: function (data) {
            var el = document.createElement('p'),
                len = data.elements.length,
                l;

            this._applyCSS(el, data);
            this._addAttributes(el, data);
            this._addProperties(el, data);

            for (l = 0; l < len; l++) {
                el.appendChild(this._buildElement(data.elements[l]));
            }

            return el;
        },

        /**
         *
         * @param data
         * @returns {HTMLElement}
         * @private
         */
        _buildImage: function (data) {
            var el = document.createElement('img');

            this._applyCSS(el, data);
            this._addAttributes(el, data);
            this._addProperties(el, data);

            return el;
        },

        /**
         *
         * @param data
         * @returns {HTMLElement}
         * @private
         */
        _buildEmptyLine: function (data) {
            var el = document.createElement('br');

            this._applyCSS(el, data);
            this._addAttributes(el, data);
            this._addProperties(el, data);

            return el;
        },

        /**
         *
         * @param data
         * @returns {HTMLElement}
         * @private
         */
        _buildList: function (data) {
            var el = document.createElement('ul'),
                len = data.items.length,
                item,
                i,
                j,
                llen;

            this._applyCSS(el, data);
            this._addAttributes(el, data);
            this._addProperties(el, data);

            for (i = 0; i < len; i++) {
                item = document.createElement('li');

                this._applyCSS(item, data.items[i]);
                this._addAttributes(item, data.items[i]);
                this._addProperties(item, data.items[i]);

                llen = data.items[i].elements.length;

                for (j = 0; j < llen; j++) {
                    item.appendChild(this._buildElement(data.items[i].elements[j]));
                }

                el.appendChild(item);
            }

            return el;
        },

        /**
         *
         * @param data
         * @returns {HTMLElement}
         * @private
         */
        _buildLink: function (data) {
            var el = document.createElement('a'),
                len = data.elements ? data.elements.length : 0,
                i;

            this._applyCSS(el, data);
            this._addAttributes(el, data);
            this._addProperties(el, data);

            for (i = 0; i < len; i++) {
                el.appendChild(this._buildElement(data.elements[i]));
            }

            return el;
        },

        /**
         *
         * @param data
         * @returns {HTMLElement}
         * @private
         */
        _buildSchema: function (data) {
            var el = document.createElement('div'),
                len = data.parts.length,
                llen,
                i,
                j,
                part;

            this._applyCSS(el, data);
            this._addAttributes(el, data);
            this._addProperties(el, data);

            for (i = 0; i < len; i++) {
                part = document.createElement('div');

                this._applyCSS(part, data.parts[i]);
                this._addAttributes(part, data.parts[i]);
                this._addProperties(part, data.parts[i]);

                llen = data.parts[i].elements.length;

                for (j = 0; j < llen; j++) {
                    part.appendChild(this._buildElement(data.parts[i].elements[j]));
                }

                el.appendChild(part);
            }

            return el;
        },

        /**
         *
         * @param data
         * @private
         */
        _buildElement: function (data) {
            var el,
                i,
                len;

            if (data.options.isParagraph) {
                return this._buildParagraph(data);
            }

            if (data.options.isTable) {
                return this._buildTable(data);
            }

            if (data.options.isList) {
                return this._buildList(data);
            }

            if (data.options.isImage) {
                return this._buildImage(data);
            }

            if (data.options.isEmptyLine) {
                return this._buildEmptyLine(data);
            }

            if (data.options.isSchema) {
                return this._buildSchema(data);
            }

            if (data.options.isLink) {
                return this._buildLink(data);
            }

            if (data.elements) {
                el = document.createElement('div');
                len = data.elements.length;

                for (i = 0; i < len; i++) {
                    el.appendChild(this._buildElement(data.elements[i]));
                }
            } else {
                el = document.createElement('span');
            }

            this._applyCSS(el, data);
            this._addAttributes(el, data);
            this._addProperties(el, data);

            return el;
        },


        _buildPageNumber: function (el, data) {
            var numberBlock = document.createElement('div');

            el.style.position = "relative";
            numberBlock.style.position = "absolute";
            numberBlock.style.top = data.options.header.dimensionCSSRules.height ?
                jDoc._unitSizeConverter({
                    from: data.options.header.dimensionCSSRules.height.units,
                    to: this._htmlOptions.units.base,
                    value: data.options.header.dimensionCSSRules.height.value
                }) + this._htmlOptions.units.base : 0;
            numberBlock.style.right = el.style.paddingRight || 0;

            numberBlock.appendChild(document.createTextNode(data.options.pageNumber.value));
            el.appendChild(numberBlock);

            return el;
        },

        /**
         *
         * @param options
         * @returns {DocumentFragment}
         */
        html: function (options) {
            var canvas = document.createDocumentFragment(),
                pages = this._data.pages,
                pagesCount = pages.length,
                elementsCount,
                i,
                p,
                pageEl;

            this._setHTMLOptions(options);

            for (i = 0; i < pagesCount; i++) {
                pageEl = document.createElement('div');

                if (i < pagesCount - 1 && !pages[i].dimensionCSSRules.marginBottom) {
                    pages[i].dimensionCSSRules.marginBottom = {
                        units: "px",
                        value: 10
                    };
                }

                this._applyCSS(pageEl, pages[i]);
                this._addAttributes(pageEl, pages[i]);
                this._addProperties(pageEl, pages[i]);
                jDoc.DOM.css(pageEl, "box-sizing", "border-box");

                if (pages[i].options.pageNumber) {
                    this._buildPageNumber(pageEl, pages[i]);
                }

                elementsCount = pages[i].elements.length;

                for (p = 0; p < elementsCount; p++) {
                    pageEl.appendChild(this._buildElement(pages[i].elements[p]));
                }

                canvas.appendChild(pageEl);
            }

            return canvas;
        },

        /**
         *
         * @returns {*}
         */
        data: function () {
            return this._clonedData;
        },

        /**
         *
         * @param index
         * @returns {*}
         */
        getPage: function (index) {
            return this._clonedData.pages[index];
        }
    };