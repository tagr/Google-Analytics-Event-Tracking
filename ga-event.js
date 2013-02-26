/*
    ga-event.js Google Analytics Event Tracking (jQuery)
    Author: Andy Merhaut
    Use, change, and distribution under MIT License.
*/
$(function() {

    var el, $sel, i, init, t;
    
    $sel = $('.ga-event'); //Selector returns element with ga-event class. <a> tags preferred.
    i = $sel.length;

    while(i--) { //Decrement loop for performance

        el = $sel.eq(i);

        init = gaEvent_Init(el.attr('class'));

        //Stores the event label, either classname attr or a>title.
        t = init.label.length > 0 ? init.label : (typeof el.attr('title') !== 'undefined' ? el.attr('title') : (typeof el.attr('href') !== 'undefined' ? el.attr('href') : 'Unknown anchor'));       
        
        (function(init, t) {

            if (el.touchstart) { //If device has touchstart event, bind to it,
                el.touchstart(function() {
                    return gaEvent_TrackEvent(init, t);
                }); 
            } else {
                el.mousedown(function() { //but if not, all devices have mousedown.
                    return gaEvent_TrackEvent(init, t);
                }); 
            }         
        }(init, t)); //Bind anonymous function to copy local scope to its respective element.
        
    }
});

/* 
    Function:  gaEvent_TrackEvent 
    Params:    Parsed class object, label string.
    Locals:    none
*/
function gaEvent_TrackEvent(evt, label) {
    
    //Debug. Uncomment during troubleshooting.
    console.log('Category: ' + evt.category);
    console.log('Action: ' + evt.action);
    console.log('Label: ' + label);
    console.log('Value: ' + evt.value);
    console.log('Non-Interaction: ' + evt.opt_noninteraction);
                
    //_gaq is the global used by GA
    if (typeof _gaq != "undefined") {
        _gaq.push(['_trackEvent', evt.category, evt.action, label, evt.value, evt.opt_noninteraction]);
        return true;
    }
}

/* 
    Function:  gaEvent_Init 
    Params:    value from DOM element's class attribute
    Locals:    Init: object containing params used for trackEvent.
*/
function gaEvent_Init(cls) {

    var Init = {
        'category' : gaEvent_Parse('ga-eventcat-', cls, 'Links'),
        'action' : gaEvent_Parse('ga-eventaction-', cls, 'Click'),
        'label' : gaEvent_Parse('ga-eventlabel-', cls, ''),
        'value' : gaEvent_Parse('ga-eventvalue-', cls, 0),
        'opt_noninteraction' : gaEvent_Parse('ga-eventnoninteraction-', cls, false)
    };

    return Init;
}

/* 
    Function:  gaEvent_Parse 
    Params:    [n]eedle, [h]aystack, [d]efault value
    Locals:    idx: index of needle in haystack
               sidx:index of next space delimiter
               returnVal:value returned to caller
*/
function gaEvent_Parse(n, h, d) {

    var idx, sidx, returnVal; //Local declarations
    n = n.toLowerCase(); 
    idx = h.toLowerCase().lastIndexOf(n); //Read last instance of matching pattern.
    
    if (idx < 0) { //Needle not found
        returnVal = d;
    } else {
        sidx = h.indexOf(' ', idx);

        if (sidx  > -1) { //Next delimiter exists
            returnVal = h.substring(idx + n.length, sidx);
        } else { //End of string
            returnVal = h.substring(idx + n.length);
        }
    }

    if (returnVal.length == 0) { returnVal = d; } //Handle malformed classnames
    return returnVal;
}
