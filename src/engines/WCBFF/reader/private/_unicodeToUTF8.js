/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._unicodeToUTF8 = function (options) {
    var cd;

    options.result = options.result || "";
    options.i = options.i || 0;
    options.len = options.len || options.data.length;

    if (options.i < options.len) {
        cd = options.fileBinaryReadData.binaryData.excludeUintArray({
            data: options.data,
            index: options.i,
            length: 2
        });

        // Если верхний байт нулевой, то перед нами ANSI
        if (cd[1] == 0) {
            // В случае, если ASCII-значение нижнего байта выше 32, то пишем как есть.
            if (cd[0] >= 32) {
                options.result += String.fromCharCode(cd[0]);
            }

            // В противном случае проверяем символы на внедрћнные команды (список можно
            // дополнить и пополнить).
            if (cd[0] == 0x0D || cd[0] == 0x07) {
                options.result += "\n";
            } else if (cd[0] == 0x08 || cd[0] == 0x01) {
                options.result += "";
            } else if (cd[0] == 0x13) {
                options.result += "HYPER13";
            } else if (cd[0] == 0x14) {
                options.result += "HYPER14";
            } else if (cd[0] == 0x15) {
                options.result += "HYPER15";
            }
            options.i += 2;
            this._unicodeToUTF8(options);
        } else {
            var self = this;
            this._getShort({
                fileBinaryReadData: options.fileBinaryReadData,
                data: cd,
                from: 0,
                success: function (res) {
                    console.log(res);
                    // Иначе преобразовываем в HTML entity
                    //options.result += html_entity_decode("&#x".sprintf("%04x", res).";");
                    options.i += 2;
                    self._unicodeToUTF8(options);
                }
            });
        }
    } else {
        if (typeof options.success === 'function') {
            options.success(options.result);
        }
    }
};