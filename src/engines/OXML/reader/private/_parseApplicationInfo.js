/**
 *
 * Parsing information about application
 * @param xml
 * @private
 * @return {Object}
 */
jDoc.Engines.OXML.prototype._parseApplicationInfo = function (xml) {
    var i,
        result = {
            template: "",
            totalTime: 0,
            pagesCount: 0,
            wordsCount: 0,
            characters: 0,
            charactersWithSpaces: 0,
            application: '',
            security: 0,
            linesCount: 0,
            scaleCrop: false,
            linksUpToDateCrop: false,
            hyperlinksChanged: false,
            company: '',
            version: '',
            isShared: false
        },
        children = jDoc.DOM.children(xml);

    for (i = children.length - 1; i >= 0; i--) {
        switch (children[i].localName) {
        case "Template":
            result.template = children[i].textContent || '';
            break;
        case "TotalTime":
            result.totalTime = +(children[i].textContent || 0);
            break;
        case "Pages":
            result.pagesCount = +(children[i].textContent || 0);
            break;
        case "Words":
            result.wordsCount = +(children[i].textContent || 0);
            break;
        case "Characters":
            result.characters = +(children[i].textContent || 0);
            break;
        case "CharactersWithSpaces":
            result.charactersWithSpaces = +(children[i].textContent || 0);
            break;
        case "DocSecurity":
            result.security = +(children[i].textContent || 0);
            break;
        case "Lines":
            result.linesCount = +(children[i].textContent || 0);
            break;
        case "Application":
            result.application = children[i].textContent || "";
            break;
        case "Company":
            result.company = children[i].textContent || "";
            break;
        case "AppVersion":
            result.version = children[i].textContent || "";
            break;
        case "ScaleCrop":
            result.scaleCrop = children[i].textContent || "";
            break;
        case "LinksUpToDate":
            result.linksUpToDateCrop = children[i].textContent == 'true';
            break;
        case "HyperlinksChanged":
            result.hyperlinksChanged = children[i].textContent == 'true';
            break;
        case "SharedDoc":
            result.isShared = children[i].textContent == 'true';
            break;
        }
    }

    return result;
};