Events.trigger = function(name) {
    var args;

    if (!this._events) {
        return this;
    }

    args = ArrayPrototype.slice.call(arguments, 1);

    if (!eventsAPI(this, 'trigger', name, args)) {
        return this;
    }

    if (this._events[name]) {
        triggerEvents(this._events[name], args);
    }
    if (this._events.all) {
        triggerEvents(this._events.all, arguments);
    }
    return this;
};