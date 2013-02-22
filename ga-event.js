/*  -----------------------------------------------------------------------------------------
    Name:            ga-event.js, ga-event.min.js (minified)
    Purpose:         Capture link events in Google Analytics Event Tracking
    Dependencies:    jQuery (event binding, async loading), GA (_gaq object)
    Author:          Andy Merhaut
    -----------------------------------------------------------------------------------------
    Description:     We needed to append event tracking to anchor elements unobtrusively, and 
    customize attributes specified in the Google Analytics ET Guide. Although HTML5 specifies
    data-* attributes on DOM elements, our current CMS does not support them (in fact, SM's 
    WYSIWYG editor will nuke any non-XHTML attributes before save). 

    CSS class attribute does allow for n+1 declarations, and is not parsed out of SM, so with 
    minimal pattern matching we can extend its purpose for storing custom values for event
    tracking.

    This version appends a mousedown callback handler to anchor elements matching class 
    'ga-event'. This class is required to enable tracking on links. Mousedown was selected as
    it is slightly faster than 'click' and is cross-browser compatible to not require a 
    separate library to handle touch events on a clickable element like a link. Use the
    patterns below to add custom parameters to each trackable link's CSS class attributes.

    NOTE the classname prefixes are not case-sensitive, but the data portion will be sent to 
    GA as it is written. CamelCase is preferred. Also, do not include the square brackets [].

    Example:
    <a href="#" class="ga-event ga-eventcat-MyCategory ga-eventaction-MyClick" title="This is the label">Track Me</a>

    CSS CLASS NAME PATTERNS
    ga-event = track this element (required)
    ga-eventcat-[CategoryName] = default:Links
    ga-eventaction-[ActionName] = default:Click
    ga-eventlabel-[LabelName] = default:a>title [if using classname, then CamelCaseOnly]
    ga-eventvalue-[n] = n(int) > -1 default:0
    ga-eventnoninteraction-[true||false] = default:false (GA: opt_noninteraction)

    Resources:
    Safari Web Content Guide: Handling Events
    //developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html

    Event Tracking - Web Tracking (ga.js)
    //developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
    -----------------------------------------------------------------------------------------
    HISTORY
    Seq    Date        Initials    Notes
    -----------------------------------------------------------------------------------------
    001    02/21/2013    AM        Initial Development
    002
    -----------------------------------------------------------------------------------------
*/
$(function() {

    $('a.ga-event').each(function() {

        var init = gaEvent_Init($(this).attr('class'));

        //Stores the event label, either classname attr or a>title.
        var t = init.label.length > 0 ? init.label : (typeof $(this).attr('title') != 'undefined' ? $(this).attr('title') : (typeof $(this).attr('href') != 'undefined' ? $(this).attr('href') : 'Unknown anchor'));
        //Append to element's onclick event.
        $(this).mousedown(function(){

                
                //Debug
                console.log('Category: ' + init.category);
                console.log('Action: ' + init.action);
                console.log('Label: ' + t);
                console.log('Value: ' + init.value);
                console.log('Non-Interaction: ' + init.opt_noninteraction);
                

            //_gaq is the global used by GA
            if (typeof _gaq != "undefined") {
                _gaq.push(['_trackEvent', init.category, init.action, t, init.value, init.opt_noninteraction]);
                return true;
            }
        });      
    });
});

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
