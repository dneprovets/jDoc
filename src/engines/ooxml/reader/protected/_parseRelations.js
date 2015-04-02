/**
 *
 * @description Parse info about relations between files
 * @param xml
 * @return {*}
 * @private
 */
OOXML.prototype._parseRelations = function (xml) {
    var relationsNodes = xml.childNodes[0] ? $.children(xml.childNodes[0]) : [],
        result = {},
        i = relationsNodes.length,
        idAttribute,
        typeAttribute,
        targetAttribute;

    while (i--) {
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