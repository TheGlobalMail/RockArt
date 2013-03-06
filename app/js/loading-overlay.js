(function(RockArt) {
  'use strict';

  RockArt.LoadingOverlay = function(body) {
    _.bindAll(this);
    this.$body = $(body);
    this.$el = $('<div class="loading-overlay"/>').hide();

    this.$body.prepend(this.$el);
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

  var lo = new RockArt.LoadingOverlay(document.body);
  lo.show().listen();
}(RockArt));