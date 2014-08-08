Events.once = function(name, callback, context) {
    var self = this,
        onceFn;

    if (!eventsAPI(this, 'once', name, [callback, context]) || !callback) {
        return this;
    }

    onceFn = once(function() {
        self.off(name, onceFn);
        callback.apply(this, arguments);
    });

    onceFn._callback = callback;

    return this.on(name, onceFn, context);
};