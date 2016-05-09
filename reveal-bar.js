/*!
 * reveal-bar
 * v0.1.0
 *
 * Inspiration, various code, and credit goes to:
 * scroll-up-bar - https://github.com/eduardomb/scroll-up-bar
 */

(function($) {
  'use strict';

  var destroyRevealBar;

  $.revealbar = function($bar, options) {
    options = $.extend({
      onAttach: $.noop,
      onDetach: $.noop,
      onShow: $.noop,
      onHide: $.noop,
      bottomOffset: 0,
      completeDelay: 300,
      completeTiming: 200,
    }, options);

    var $window = $(window),
        $document = $(document),
        lastPosition = $window.scrollTop(),
        initialBarPosition = $bar.offset().top,
        autoCompleteTimer;

    $window.on('scroll.revealbar', function() {
      var currentPosition = $window.scrollTop(),
          barFullHeight = $bar.outerHeight(),
          barOffsetHeight = barFullHeight - options.bottomOffset,
          barTopPosition = $bar.offset().top;

      // Ignore elastic scrolling
      if (currentPosition < 0 || currentPosition > ($document.height() - $window.height())) return;

      // Cancel auto-completion timer
      if (autoCompleteTimer) clearTimeout(autoCompleteTimer);

      // Scrolling up
      if (currentPosition < lastPosition) {
        if (currentPosition === 0) {
          options.onAttach();
        } else {
          if ($bar.css('position') === 'fixed' && currentPosition > barTopPosition) {
            $bar.css({
              'position': 'absolute',
              'top': barTopPosition + 1
            });
          } else if ($bar.css('position') === 'absolute' && currentPosition <= barTopPosition) {
            options.onShow();
            $bar.css({
              'position': 'fixed',
              'top': 0
            });
          };
        };

        autoCompleteTimer = setTimeout(function() {
          if (currentPosition > barTopPosition) {
            $bar.animate({ 'top': lastPosition }, options.completeTiming, function() {
              options.onShow();
            });
          };
        }, options.completeDelay);

      // Scrolling down
      // or, Page Load not at top
      } else if (currentPosition > lastPosition || (currentPosition === lastPosition && currentPosition !== 0)) {
        if (currentPosition > barTopPosition + barOffsetHeight) {
          options.onDetach();
          options.onHide();
          $bar.css({
            'position': 'fixed',
            'top': -barOffsetHeight
          });
        } else if (currentPosition !== barTopPosition + barOffsetHeight) {
          $bar.css({
            'position': 'absolute',
            'top': barTopPosition
          });
        };

        autoCompleteTimer = setTimeout(function() {
          if (currentPosition > barOffsetHeight &&
              currentPosition > barTopPosition &&
              currentPosition !== barTopPosition + barOffsetHeight) {
            $bar.css('position', 'absolute');
            $bar.animate({ 'top': lastPosition - barOffsetHeight }, options.completeTiming, function() {
              options.onHide();
            });
          };
        }, options.completeDelay);
      };

      // Remember current position as last position
      lastPosition = currentPosition;
    });

    // Trigger
    $window.trigger('scroll.revealbar');

    // Destroy/reset bar to initial state
    destroyRevealBar = function() {
      $window.off('.revealbar');

      options.onAttach();

      $bar.css({
        'position': 'absolute',
        'top': initialBarPosition
      });
    };

    return $bar;
  };

  $.revealbar.destroy = function() {
    if (destroyRevealBar) return destroyRevealBar();
  };

  $.fn.revealbar = function(options) {
    return $.revealbar(this, options);
  };
})(jQuery);
