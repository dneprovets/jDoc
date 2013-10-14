/**
 *
 * @description Parse info about relations between files
 * @param xml
 * @return {*}
 * @private
 */
jDoc.engines.OXML.prototype._parseRelations = function (xml) {
    var relationsNodes = xml.childNodes[0] ? jDoc.DOM.children(xml.childNodes[0]) : [],
        result = {},
        i,
        idAttribute,
        typeAttribute,
        targetAttribute;

    for (i = relationsNodes.length - 1; i >= 0; i--) {
        if (relationsNodes[i].attributes) {
            idAttribute = relationsNodes[i].attributes.Id;
            typeAttribute = relationsNodes[i].attributes.Type;
            targetAttribute = relationsNodes[i].attributes.Target;

            if (idAttribute && typeAttribute && targetAttribute) {
                result[idAttribute.value] = {
                    id: idAttribute.value || '',
                    type: typeAttribute.value || '',
                    target: targetAttribute.value || ''
                };
            }
        }
    }

    return result;
};