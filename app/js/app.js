(function() {
  'use strict';

  window.RockArt = {

    Views: {},

    run: function() {
      new RockArt.Views.Slider({ el: $('#slider-container') });
    }

  };
}());