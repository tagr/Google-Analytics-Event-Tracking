Google Analytics Event Tracking Plugin for jQuery
=========

GAEvent is a small plugin (<600B minified &amp; compressed) that enables event tracking in Google Analytics (by [ga.js] or the newer [Universal Analytics])

GAEvent uses jQuery, so the syntax to start tracking is very simple:

```javascript
$('.yourElements').gaEvent();
```

If you want to customize the data sent to Google, just add the options like so:

```javascript
$('.yourElements').gaEvent({
  action: 'tap',
  category: 'Google Analytics Event Tracking Category',
  label: 'Custom Label',
  value: 1.25
});
```
### Author
[Andy Merhaut]: Twitter- [@foobarjs] Site-[fishees.com]
>I am a web developer and photographer in Clearwater, Florida, USA

### References
----
* [Reference - Complete Web Upgrade: ga.js to analytics.js] 




[Reference - Complete Web Upgrade: ga.js to analytics.js]:https://developers.google.com/analytics/devguides/collection/upgrade/reference/gajs-analyticsjs#events
[ga.js]:https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
[Universal Analytics]:https://developers.google.com/analytics/devguides/collection/analyticsjs/
[Andy Merhaut]:https://github.com/tagr
[@foobarjs]:http://twitter.com/foobarjs
[fishees.com]:http://fishees.com
