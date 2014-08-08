Events.on = function(name, callback, context) {
    if (!eventsAPI(this, 'on', name, [callback, context]) || !callback) {
        return this;
    }
    this._events = this._events || {};
    this._events[name] = this._events[name] || [];

    this._events[name].push({
        callback: callback,
        context: context,
        ctx: context || this
    });

    return this;
};