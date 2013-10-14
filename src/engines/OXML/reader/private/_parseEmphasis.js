/** @lends jDoc.engines.OXML.prototype */
jDoc.engines.OXML.prototype._parseEmphasis = function (attribute) {
    var result = "";

    if (attribute) {
        switch (attribute.value) {
            case "dot":
                result = "dotted";
                break;
            case "comma":
                result = "comma";
                break;
            case "circle":
                result = "circle";
                break;
            case "underDot":
                result = "underDotted";
                break;
        }
    }
    return result;
};