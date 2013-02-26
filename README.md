google-analytics-event-tracking
===============================

Name:ga-event.js, ga-event.min.js (minified)
Purpose: Capture link events in Google Analytics Event Tracking
Dependencies: jQuery (event binding), GA (_gaq object)
Author: Andy Merhaut https://github.com/tagr

I had to append event tracking to anchor elements unobtrusively, and customize attributes specified in the Google Analytics ET Guide. Unfortunately, the CMS at my work strips HTML5 data-* 

attributes, so I could only rely on CSS classnames. This solution uses classnames with appended data to customize reportable elements in Event Tracking.

CSS class attribute does allow for n+1 declarations, and is not parsed out of SM, so with minimal pattern matching we can extend its purpose for storing custom values for event tracking.

This version appends a mousedown (or touchstart) callback handler to anchor elements matching class 'ga-event'. This class is required to enable tracking on links. Mousedown was selected as it is 

slightly faster than 'click' and is cross-browser compatible to not require a separate library to handle touch events on a clickable element like a link. Use the patterns below to add custom 

parameters to each trackable link's CSS class attributes.

NOTE the classname prefixes are not case-sensitive, but the data portion will be sent to GA as it is written. CamelCase is preferred. Also, do not include the square brackets [].

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
