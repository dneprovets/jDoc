/**
 *
 * @param n
 * @param elem
 * @returns {Array}
 */
$.siblings = function (n, elem) {
    var arr = [];

    for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
            arr.push(n);
        }
    }

    return arr;
};