/**
 *
 * @param stylesNode
 * @param callback
 * @private
 */
jDoc.engines.ODF.prototype._parseTextDocumentStylesNode = function (stylesNode, callback) {
    var result = {
            named: {},
            paragraph: {},
            paragraphContent: {},
            table: {},
            list: {}
        },
        self = this,
        data = {},
        loopCallbacksCount = 0,
        loopIteration,
        completedLazyMethods = 0,
        lazyLoopOptions = {
            chunk: 20,
            time: 10,
            index: 0
        },
        lazyMethods = 0,
        namedStyle,
        localName,
        node,
        styleLocalName = "style",
        listStyleLocalName = "list-style",
        defaultStyleLocalName = "default-style";

    if (stylesNode) {
        lazyMethods++;

        lazyLoopOptions.data = jDoc.DOM.children(stylesNode);
        lazyLoopOptions.len = lazyLoopOptions.data.length;
        lazyLoopOptions.all = lazyLoopOptions.len;

        loopIteration = function (options) {
            options.end = options.index + (options.all > options.chunk ? options.chunk : options.all);
            setTimeout(function () {
                for (options.index; options.index < options.end; options.index++) {
                    node = options.data[options.index];
                    localName = node.localName;

                    if (localName === styleLocalName || defaultStyleLocalName === localName) {

                        if (
                            localName !== "default-style" && node.attributes['style:name'] &&
                                node.attributes['style:name'].value
                        ) {
                            result.named[node.attributes['style:name'].value] =
                                result.named[node.attributes['style:name'].value] || {};
                            namedStyle = result.named[node.attributes['style:name'].value];
                        } else {
                            namedStyle = null;
                        }

                        switch (node.attributes['style:family'] && node.attributes['style:family'].value) {
                        case "table":
                            if (namedStyle) {
                                namedStyle.table = self._parseTextDocumentTableStyles(node);
                            } else {
                                result.table = self._parseTextDocumentTableStyles(node);
                            }
                            break;
                        case "table-column":
                            if (namedStyle) {
                                namedStyle.tableColumn = self._parseTextDocumentTableColumnStyles(node);
                            }
                            break;
                        case "table-cell":
                            if (namedStyle) {
                                namedStyle.tableCell = self._parseTextDocumentTableCellStyles(node);
                            }
                            break;
                        case "paragraph":
                            if (namedStyle) {
                                data = self._parseTextDocumentParagraphStyles(node);
                                namedStyle.paragraph = jDoc.deepMerge(data.paragraph, {
                                    css: {
                                        wordWrap: "break-word",
                                        wordBreak: "break-all",
                                        width: "100%"
                                    }
                                });
                                namedStyle.paragraphContent = data.paragraphContent;
                            } else {
                                data = self._parseTextDocumentParagraphStyles(node);
                                result.paragraph = data.paragraph;
                                result.paragraphContent = data.paragraphContent;
                            }
                            break;
                        case "text":
                            if (namedStyle) {
                                data = self._parseTextDocumentParagraphStyles(node);
                                namedStyle.paragraph = data.paragraph;
                                namedStyle.paragraphContent = data.paragraphContent;
                            } else {
                                data = self._parseTextDocumentParagraphStyles(node);
                                result.paragraph = data.paragraph;
                                result.paragraphContent = data.paragraphContent;
                            }
                            break;
                        }
                    } else if (
                        localName === listStyleLocalName && node.attributes['style:name'] &&
                            node.attributes['style:name'].value
                    ) {
                        result.named[node.attributes['style:name'].value] =
                            result.named[node.attributes['style:name'].value] || {};

                        jDoc.deepMerge(
                            result.named[node.attributes['style:name'].value],
                            self._parseTextDocumentListStyles(node)
                        );
                    }

                    loopCallbacksCount++;
                    if (loopCallbacksCount >= options.len) {
                        completedLazyMethods++;
                        if (completedLazyMethods >= lazyMethods) {
                            if (typeof callback === "function") {
                                callback(result);
                            }
                        }
                    }
                }
                options.all = options.len - options.end;
                if (options.index < options.len) {
                    loopIteration.call(self, options);
                }
                return true;
            }, options.time);
        };
        loopIteration.call(self, lazyLoopOptions);
    } else {
        callback(result);
    }
};