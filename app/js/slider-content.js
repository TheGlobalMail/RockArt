(function(RockArt) {
  'use strict';

  RockArt.Views.SliderContent = Backbone.View.extend({

    mapRatio: 1.184306569,

    initialize: function(options) {
      _.bindAll(this);

      this.bannerHeight = options.bannerHeight;

      this.$inners  = this.$('.slider-side-inner');
      this.$content = this.$('.slider-content');
      this.$maps    = this.$('.map');
      this.$titleOverlay = this.$('.rock-art-regions-title');

      $(window).on('load resize', this.onResize);
      this.onResize();
    },

    onResize: function() {
      if (!this.$maps.height()) {
        return;
      }

      var width  = $(window).width();
      var height = $(window).height() - this.bannerHeight();
      height = Math.max(height, 600);

      this.$inners.width(width);
      this.$el.width(width);
      this.$el.height(height);

      var expectedWidth = height * this.mapRatio - 5;
      if (this.$content.width() + 5 > expectedWidth) {
        this.$content.width(expectedWidth);
      } else {
        this.$content.width('');
      }

      this.$titleOverlay.css('top', (this.$content.height() - 170) + 'px');
    }

  });
}(RockArt));