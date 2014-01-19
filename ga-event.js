/**
 * @preserve jquery.gaevent.js
 * Author: Andy Merhaut
 * Free to modify and use under the MIT license
 * //github.com/tagr/
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "gaEvent",
    defaults = {
        category : 'Links',
        action : 'Click',
        label : 'gaEvent',
        value : '0',
        opt_noninteraction : 1
    };

    // The actual plugin constructor
    function gaEvent ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    gaEvent.prototype = {
        init: function () {

            //Get settings
            var config = this.settings;
            var el = this.element;

            //The actual event tracking function
            var gaEvent_Event = function() {

                if (typeof ga == 'function') { //Universal tracking
                    ga('send', 'event', config.category, config.action, config.label, config.value, {'nonInteraction': config.opt_noninteraction});
                    console.log('event sent');
                } else if (typeof _gaq == 'function') { //Older ga.js
                    _gaq.push(['_trackEvent', config.category, config.action, config.label, config.value, config.opt_noninteraction]);
                }
            };

            if ('ontouchstart' in document.documentElement) {
                el.addEventListener('touchstart',gaTrackEvent_Event,false);
            } else {

                if (!el.addEventListener) {
                    el.attachEvent("onclick", gaEvent_Event);
                } else {
                    el.addEventListener('mousedown',gaEvent_Event,false);
                }
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new gaEvent( this, options ) );
            }
        });
    };

})( jQuery, window, document );
