(function (window, navigator) {
    "use strict";

    var _browserInfo = (navigator.userAgent || "").toLowerCase(),

        /**
         * версии браузеров
         */
        _versions = {
            "msie": ((/(?:msie\s([0-9a-z,.]+);)/).exec(_browserInfo) || [])[1] || '',
            "opera": ((/(?:version\/([0-9a-z,.]+))$/).exec(_browserInfo) || [])[1] || '',
            "chrome": ((/(?:chrome\/([0-9a-z,.]+)\s)/).exec(_browserInfo) || [])[1] || '',
            "firefox": ((/(?:firefox\/([0-9a-z,.]+))$/).exec(_browserInfo) || [])[1] || '',
            "safari": ((/(?:version\/([0-9a-z,.]+)\s)/).exec(_browserInfo) || [])[1] || ''
        },

        /**
         * преобразуем в float
         * может прити и с текстом (14.0b.1)
         */
        browser,
        versionArr;

    for (browser in _versions) {
        if (_versions.hasOwnProperty(browser)) {
            versionArr = _versions[browser].replace(/[^0-9\.,]/, '').split(/[\.,]/);
            _versions[browser] = +(versionArr.shift() + '.' + versionArr.join('')) || 0;
        }
    }

    window.browser = {
        language: (navigator.systemLanguage || navigator.language.split('-')[0]).toLowerCase(),
        localStorage:      window.localStorage || window.mozLocalStorage || window.webkitLocalStorage,
        requestFileSystem: window.requestFileSystem || window.webkitRequestFileSystem || window.mozRequestFileSystem,
        URL:               window.URL || window.webkitURL || window.mozURL,
        Blob:              window.Blob,

        isSupportHistoryAPI: function () {
            return !!(window.history.pushState && window.history.replaceState);
        },

        /**
         *
         * @param container
         * @returns {*}
         */
        setFieldsType: function (container) {
            container = container || document;

            var type,
                elements = container.getElementsByTagName('input'),
                i,
                len = elements ? elements.length : 0;

            for (i = len - 1; i >= 0; i--) {
                type = elements[i].attributes['data-type'];

                if (type && type.value) {
                    /**
                     * в Safari возвращается не строка, а число, например, 01 -> 1, 09 -> 9  и т.д.
                     */
                    if (type.value == "number" && this.isIOSDevice()) {
                        elements[i].pattern = '[0-9]*';
                    } else {
                        elements[i].type = type.value;
                    }
                }
            }

            return container;
        },

        isIPhone: function () {
            return (_browserInfo.indexOf("iphone") > -1);
        },

        isIPad: function () {
            return (_browserInfo.indexOf("ipad") > -1);
        },

        isIPod: function () {
            return (_browserInfo.indexOf("ipod") > -1);
        },

        isIPadWebView: function () {
            return (_browserInfo.indexOf("applewebkit") > -1 && _browserInfo.indexOf("mobile") > -1);
        },

        isIOSDevice: function () {
            return this.isIPad() || this.isIPod() || this.isIPhone() || this.isIPadWebView();
        },

        isAndroidDevice: function () {
            return (_browserInfo.indexOf("android") > -1);
        },

        isWindowsMobileDevice: function () {
            return (_browserInfo.indexOf("windows phone") > -1);
        },

        isMobileDevice: function () {
            return this.isIOSDevice() || this.isAndroidDevice() || this.isWindowsMobileDevice();
        },

        isOpera: function () {
            return (_browserInfo.indexOf('opera') > -1);
        },

        isChrome: function () {
            return (_browserInfo.indexOf('chrome') > -1);
        },

        isFireFox: function () {
            return (_browserInfo.indexOf('firefox') > -1);
        },

        isMSIE: function () {
            return (_browserInfo.indexOf('msie') > -1);
        },

        isSafari: function () {
            return (_browserInfo.indexOf('safari') > -1);
        }
    };
}(window, window.navigator));