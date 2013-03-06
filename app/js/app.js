(function() {
  'use strict';

  window.RockArt = {

    Views: {},

    run: function() {
      new RockArt.Views.Slider({ el: $('#slider-container') });
      new RockArt.Views.SliderContent({
        el: $('#slider-container'),
        bannerHeight: function() {
          return $('.navbar.special-feature').outerHeight();
        }
      });
    }

  };
}());