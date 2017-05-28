// Create your own Event Tracker system:
//
// 1. create an `EventTracker` object
//    • it should accept a name when constructed
// 2. extend the `EventTracker` prototype with:
//    • an `on` method
//    • a `notify` method
//    • a `trigger` method
//
// EXAMPLE:
// function purchase(item) { console.log( 'purchasing ' + item); }
// function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }
//
// var nephewParties = new EventTracker( 'nephews ');
// var richard = new EventTracker( 'Richard' );
//
// nephewParties.on( 'mainEvent', purchase );
// richard.on( 'mainEvent', celebrate );
// nephewParties.notify( richard, 'mainEvent' );
//
// nephewParties.trigger( 'mainEvent', 'ice cream' );
//


// this object tracks the events for an object. 
// it accepts a name of the EventTrackers 
var EventTracker = function(name){
    this._events = [];
    this._notify = [];
};

// on accepts an event name and a handler function
EventTracker.prototype.on = function(eventName, handler) {
    if(!this._events[eventName]) {
        this._events[eventName] = []; 
    }
    this._events[eventName].push(handler); 
};

// track a list of eventTracker objects to notify if a event has been triggered. 
// accepts a eventTracker object, and an eventname to be triggered in that eventTracker
EventTracker.prototype.notify = function(eventTracker, eventName) {
    if(!this._notify[eventName]) {
        this._notify[eventName] = [];
    }   
    this._notify[eventName].push(eventTracker);
};

// trigger accepts an eventname (string) and a parameter to be passed to the handler function
EventTracker.prototype.trigger = function(eventName, parameters) {
    // loop through the events object and execute all handlers that are associated with the event key
    var handlers = this._events[eventName] || [];
    for(var i = 0, len = handlers.length; i < len; i++) {
        // execute the handler with the arguments
        handlers[i].call(this, parameters);
    }
    var notifees = this._notify[eventName] || [];
    for(var i = 0, len = notifees.length; i < len; i++) {
        // trigger the event for the notifee
        notifees[i].trigger(eventName, parameters);
    }
};
