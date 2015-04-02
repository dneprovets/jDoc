var browser = (() => {
    var _browserInfo = (navigator.userAgent || "").toLowerCase(),
        browser = Object.defineProperties({}, {
            msie: {
                value: _browserInfo.indexOf('msie') >= 0
            }
        });

    return browser;
})();