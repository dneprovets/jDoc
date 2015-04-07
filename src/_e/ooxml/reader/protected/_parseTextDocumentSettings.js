/**
 * @description Parse document settings
 * @param xml
 * @return {Object}
 * @private
 */
OOXML.prototype._parseTextDocumentSettings = function (xml) {
    var result = {
        zoom: 100,
        compat: {},
        rsids: {
            rsidRoot: '',
            values: []
        },
        mathProperties: {},
        shapeDefaults: {
            defaults: {},
            layout: {}
        },
        colorSchemeMapping: {}
    },
        nodes,
        compatSettingNodes,
        cachedArrayLength = 0,
        self = this,
        idMapNode,
        children = $.children(xml),
        i = children.length,
        nameAttr,
        uriAttr,
        spidMaxAttr,
        styleAttr,
        dataAttr,
        rsidRootNode,
        rsidNodes,
        defaultsNode,
        valueAttr,
        layoutNode,
        extAttr = null;

    while (i--) {
        switch (children[i].localName) {
        case "zoom":
            result.zoom = (
                !children[i].attributes['w:percent'] || isNaN(children[i].attributes['w:percent'].value)
            ) ? 100 : +children[i].attributes['w:percent'].value;
            break;
        case "proofState":
            result.checkSpelling = (children[i].attributes['w:spelling'] && children[i].attributes['w:spelling'].value == 'clean');
            result.checkGrammar = (children[i].attributes['w:grammar'] && children[i].attributes['w:grammar'].value == 'clean');
            break;
        case "defaultTabStop":
            result.defaultTabStop = (
                children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)
                ) ? +children[i].attributes['w:val'].value : 1;
            break;
        case "characterSpacingControl":
            result.controlCharacterSpacing = !!(
                children[i].attributes['w:val'] && children[i].children[i].attributes['w:val'].value != 'doNotCompress'
                );
            break;
        case "compat":
            compatSettingNodes = children[i].querySelectorAll('compatSetting');
            cachedArrayLength = compatSettingNodes.length;
            for (i = 0; i < cachedArrayLength; i++) {
                nameAttr = compatSettingNodes[i].attributes['w:name'];
                uriAttr = compatSettingNodes[i].attributes['w:uri'];
                valueAttr = compatSettingNodes[i].attributes['w:val'];

                if (nameAttr && nameAttr.value) {
                    result.compat[nameAttr.value] = {
                        uri: uriAttr ? uriAttr.value || '' : '',
                        value: (!valueAttr || isNaN(valueAttr.value)) ? 0 : +valueAttr.value
                    };
                }
            }
            break;
        case "shapeDefaults":
            defaultsNode = children[i].querySelector('shapedefaults');
            layoutNode = children[i].querySelector('shapelayout');

            if (defaultsNode) {
                extAttr = defaultsNode.attributes['v:ext'];
                spidMaxAttr = defaultsNode.attributes.spidmax;
                styleAttr = defaultsNode.attributes.style;
                result.shapeDefaults.defaults.ext = extAttr ? extAttr.value || '' : '';
                result.shapeDefaults.defaults.style =
                    styleAttr ? styleAttr.value || '' : '';
                result.shapeDefaults.defaults.spidMax =
                    (!spidMaxAttr || isNaN(spidMaxAttr.value)) ? 0 : +spidMaxAttr.value;
            }
            if (layoutNode) {
                extAttr = layoutNode.attributes['v:ext'];
                idMapNode = layoutNode.querySelector('idmap');
                result.shapeDefaults.layout.ext =
                    extAttr ? extAttr.value || '' : '';
                result.shapeDefaults.layout.idMap = {};
                if (idMapNode) {
                    extAttr = idMapNode.attributes['v:ext'];
                    dataAttr = idMapNode.attributes.data;
                    result.shapeDefaults.layout.idMap.ext =
                        extAttr ? extAttr.value || '' : '';
                    result.shapeDefaults.layout.idMap.data =
                        (!dataAttr || isNaN(dataAttr.value)) ? 0 : +dataAttr.value;
                }
            }
            break;
        case "themeFontLang":
            result.themeFontLanguage = this._parseLanguageNode(children[i]);
            break;
        case "decimalSymbol":
            result.decimalSymbol = children[i].attributes['w:val'] ? children[i].attributes['w:val'].value || '' : '';
            break;
        case "listSeparator":
            result.listSeparator = children[i].attributes['w:val'] ? children[i].attributes['w:val'].value || '' : '';
            break;
        case "clrSchemeMapping":
            cachedArrayLength = children[i].attributes.length;
            for (i = 0; i < cachedArrayLength; i++) {
                if (children[i].attributes[i] && children[i].attributes[i].value) {
                    result.colorSchemeMapping[self.replaceAttributeNamespace(children[i].attributes[i].name)] =
                        children[i].attributes[i].value;
                }
            }
            break;
        case "rsids":
            rsidRootNode = children[i].querySelector('rsidRoot');
            rsidNodes = children[i].querySelectorAll('rsid');
            result.rsids.rsidRoot = rsidRootNode.attributes['w:val'] ? rsidRootNode.attributes['w:val'].value || '' : '';

            cachedArrayLength = rsidNodes.length;
            for (i = 0; i < cachedArrayLength; i++) {
                valueAttr = rsidNodes[i].attributes['w:val'];

                if (valueAttr && valueAttr.value) {
                    result.rsids.values.push(valueAttr.value);
                }
            }
            break;
        case "mathPr":
            nodes = $.children(children[i]);
            cachedArrayLength = nodes.length;

            result.mathProperties.intLimit = '';

            for (i = cachedArrayLength - 1; i >= 0; i--) {
                switch (nodes[i].localName) {
                case "mathFont":
                    result.mathProperties.mathFont = (
                        nodes[i].attributes['m:val']
                    ) ? nodes[i].attributes['m:val'].value || '' : '';
                    break;
                case "brkBin":
                    /**
                     * @description Values : after, before, repeat
                     * @type {String}
                     */
                    result.mathProperties.breakOnBinary = (
                        nodes[i].attributes['m:val']
                    ) ? nodes[i].attributes['m:val'].value || '' : '';
                    break;
                case "brkBinSub":
                    /**
                     * @description Values : after, before, repeat
                     * @type {String}
                     */
                    /**
                     * @description Values : --, +-, -+
                     * @type {String}
                     */
                    result.mathProperties.breakOnBinarySubtraction = (
                        nodes[i].attributes['m:val']
                    ) ? nodes[i].attributes['m:val'].value || '' : '';
                    break;
                case "smallFrac":
                    result.mathProperties.onSmallFraction = (
                        !!nodes[i].attributes['m:val'] && (nodes[i].attributes['m:val'].value != '0')
                    );
                    break;
                case "dispDef":
                    result.mathProperties.displayDefault = (
                        !!nodes[i].attributes['m:val'] && (nodes[i].attributes['m:val'].value != '0')
                    );
                    break;
                case "lMargin":
                    result.mathProperties.leftMargin = (
                        nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                    ) ? +nodes[i].attributes['m:val'].value : 0;
                    break;
                case "rMargin":
                    result.mathProperties.rightMargin = (
                        nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                    ) ? +nodes[i].attributes['m:val'].value : 0;
                    break;
                case "defJc":
                    result.mathProperties.align = nodes[i].attributes['m:val'] ? nodes[i].attributes['m:val'].value : 'left';
                    if (result.mathProperties.align == 'centerGroup') {
                        result.mathProperties.align = 'center';
                    }
                    break;
                case "preSp":
                    result.mathProperties.preSpacing = (
                        nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                        ) ? +nodes[i].attributes['m:val'].value : 0;
                    break;
                case "postSp":
                    result.mathProperties.postSpacing = (
                        nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                    ) ? 0 : +nodes[i].attributes['m:val'].value;
                    break;
                case "interSp":
                    result.mathProperties.interSpacing = (
                        nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                        ) ? 0 : +nodes[i].attributes['m:val'].value;
                    break;
                case "intraSp":
                    result.mathProperties.intraSpacing = (
                        nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                    ) ? 0 : +nodes[i].attributes['m:val'].value;
                    break;
                case "wrapIndent":
                    result.mathProperties.wrapIndent = (
                        nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                    ) ? 0 : +nodes[i].attributes['m:val'].value;
                    break;
                case "wrapRight":
                    result.mathProperties.wrapRight = (
                        nodes[i].attributes['m:val'] && !isNaN(nodes[i].attributes['m:val'].value)
                        ) ? 0 : +nodes[i].attributes['m:val'].value;
                    break;
                case "intLim":
                    if (nodes[i].attributes['m:val'] && nodes[i].attributes['m:val'].value == 'undOvr') {
                        result.mathProperties.intLimit = 'UnderOverLocation';
                    } else if (nodes[i].attributes['m:val'] && nodes[i].attributes['m:val'].value == 'subSup') {
                        result.mathProperties.intLimit = 'SubscriptSuperscriptLocation';
                    } else {
                        result.mathProperties.intLimit = '';
                    }
                    break;
                case "naryLim":
                    if (nodes[i].attributes['m:val'] && nodes[i].attributes['m:val'].value == 'undOvr') {
                        result.mathProperties.naryLimit = 'UnderOverLocation';
                    } else if (nodes[i].attributes['m:val'] && nodes[i].attributes['m:val'].value == 'subSup') {
                        result.mathProperties.naryLimit = 'SubscriptSuperscriptLocation';
                    } else {
                        result.mathProperties.naryLimit = '';
                    }
                    break;
                }
            }
            break;
        }
    }

    return result;
};