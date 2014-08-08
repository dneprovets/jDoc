Events.off = function(name, callback, context) {
    var retain,
        ev,
        events,
        names,
        i,
        l,
        j,
        k;

    if (!this._events || !eventsAPI(this, 'off', name, [callback, context])) {
        return this;
    }

    if (!name && !callback && !context) {
        this._events = void 0;
        return this;
    }
    names = name ? [name] : Object.keys(this._events);
    l = names.length;

    for (i = 0; i < l; i++) {
        name = names[i];
        events = this._events[name];

        if (events) {
            this._events[name] = retain = [];

            if (callback || context) {
                k = events.length;

                for (j = 0; j < k; j++) {
                    ev = events[j];

                    if (
                        (
                            callback &&
                            callback !== ev.callback &&
                                callback !== ev.callback._callback
                        ) || (
                            context && context !== ev.context
                        )
                    ) {
                        retain.push(ev);
                    }
                }
            }
            if (!retain.length) {
                delete this._events[name];
            }
        }
    }

    return this;
};