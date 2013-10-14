/**
 *
 * @param params
 * @returns {*}
 * @private
 */
jDoc.engines.OXML.prototype._getRelation = function (params) {
    var relation;

    if (
        params.documentData.documentRelations &&
            params.documentData.documentRelations[params.relationId]
        ) {
        relation = params.documentData.documentRelations[params.relationId];
    } else if (
        params.documentData.mainRelations && params.documentData.mainRelations[params.relationId]
    ) {
        relation = params.documentData.mainRelations[params.relationId];
    }

    return relation;
};