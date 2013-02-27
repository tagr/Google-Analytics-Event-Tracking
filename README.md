Google Analytics Event Tracking (jQuery)
========================================

<p>
Name:ga-event.js, ga-event.min.js (minified)<br>
Purpose: Capture link events in Google Analytics Event Tracking using CSS classnames<br>
Dependencies: jQuery (event binding), GA (_gaq object)<br>
Author: Andy Merhaut https://github.com/tagr
</p>

<p>I had to append event tracking to anchor elements unobtrusively, and customize attributes specified in the 
Google Analytics ET Guide. Unfortunately, the CMS at my work strips HTML5 data-* attributes, so I could only 
rely on CSS classnames. This solution uses classnames with appended data to customize reportable elements in 
Event Tracking.</p>

<p>CSS class attribute does allow for n+1 declarations, and is not parsed out of SM, so with minimal pattern 
matching we can extend its purpose for storing custom values for event tracking.</p>

<p>This version appends a mousedown (or touchstart) callback handler to anchor elements matching class 
<b>'ga-event'</b>. This class is required to enable tracking on links. Mousedown was selected as it is slightly 
faster than 'click' and is cross-browser compatible to not require a separate library to handle touch 
events on a clickable element like a link. Use the patterns below to add custom parameters to each 
trackable link's CSS class attributes.</p>

<p><b>NOTE</b> the classname prefixes are not case-sensitive, but the data portion will be sent to GA as it is written. 
CamelCase is preferred. Also, do not include the square brackets [].</p>

<b>Example:</b> 
<code>&lt;a href="#" class="ga-event ga-eventcat-MyCategory ga-eventaction-MyClick" title="This is the label"&gt;Track Me&lt;/a&gt;</code>

<h3>CSS CLASS NAME PATTERNS</h3>
<ul>
<li><code>ga-event = track this element (required)</code></li>
<li><code>ga-eventcat-[CategoryName] = default:Links</code></li>
<li><code>ga-eventaction-[ActionName] = default:Click</code></li>
<li><code>ga-eventlabel-[LabelName] = default:a>title [if using classname, then CamelCaseOnly]</code></li>
<li><code>ga-eventvalue-[n] = n(int) > -1 default:0</code></li>
<li><code>ga-eventnoninteraction-[true||false] = default:false (GA: opt_noninteraction)</code></li>
</ul>


<h3>Resources:</h3>
<ul>
<li><a href="//developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html">Safari Web Content Guide: Handling Events</a></li>
<li><a href="//developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide">Event Tracking - Web Tracking (ga.js)</a></li>
</ul>
