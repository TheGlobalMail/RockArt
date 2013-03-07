(function(RockArt) {
  'use strict';

  RockArt.LoadingOverlay = function(el) {
    _.bindAll(this);
    this.$el = el;
  };

  RockArt.LoadingOverlay.prototype = {

    show: function() {
      this.$el.show();
      return this;
    },

    listen: function(delay) {
      var $el = this.$el;
      $(window).on('load', function() {
        setTimeout(function() {
          $el.hide().remove();
        }, delay || 200);
      });
    }

  };

  var lo = new RockArt.LoadingOverlay($('.loading-overlay:first'));
  lo.listen();
}(RockArt));