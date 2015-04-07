import buildElement from './src/buildElement';
import buildEmptyLine from './src/buildEmptyLine';
import buildImage from './src/buildImage';
import buildLink from './src/buildLink';
import buildList from './src/buildList';
import buildPageNumber from './src/buildPageNumber';
import buildParagraph from './src/buildParagraph';
import buildSchema from './src/buildSchema';
import buildTable from './src/buildTable';
import applyCss from './src/applyCss';
import addAttributes from './src/addAttributes';
import addProperties from './src/addProperties';
import $ from './../dom/index';

var Html = function (options) {
    this.options = copy({}, options, {
        unit: {
            font: "px",
            border: "px",
            margin: "px",
            padding: "px",
            base: "px"
        }
    });
};

Object.defineProperties(Html.prototype, {
    applyCss,

    addProperties,

    addAttributes,

    buildElement,

    buildEmptyLine,

    buildImage,

    buildLink,

    buildList,

    buildPageNumber,

    buildParagraph,

    buildTable,

    buildSchema,

    fileDataClasses: {
        value: {
            page: "jdoc-page"
        }
    },

    buildDocument: {
        value: function (pages) {
            var doc = document.createDocumentFragment(),
                pagesCount;

            if (!Array.isArray(pages)) {
                return doc;
            }

            pagesCount = pages.length;

            pages.forEach(function (page, i) {
                var pageEl = document.createElement('div');
                pageEl.setAttribute('class', this.fileDataClasses.page);

                if (page.dimensionCssRules && i < pagesCount - 1 && !page.dimensionCssRules.marginBottom) {
                    page.dimensionCssRules.marginBottom = {
                        unit: "px",
                        value: 10
                    };
                }

                this.applyCss(pageEl, page);
                this.addAttributes(pageEl, page);
                this.addProperties(pageEl, page);
                $.css(pageEl, "box-sizing", "border-box");

                if (page.options && page.options.pageNumber) {
                    this.buildPageNumber(pageEl, page);
                }

                page.children.forEach(function (el) {
                    pageEl.appendChild(this.buildElement(el));
                }.bind(this));

                doc.appendChild(pageEl);
            }.bind(this));

            return doc;
        }
    }
});

export default Html;