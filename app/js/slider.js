(function(RockArt) {
  'use strict';

  RockArt.Views.Slider = Backbone.View.extend({

    events: {
      'mousedown .slider-handle': 'onMouseDown',
      'mouseup': 'onMouseUp'
    },

    initialize: function() {
      _.bindAll(this);

      this.$left   = this.$('.slider-side.left');
      this.$right  = this.$('.slider-side.right');
      this.$handle = this.$('.slider-handle');
      this.$inners = this.$('.slider-side-inner');

      $(window).on('resize', this.refresh);

      this.refresh();
    },

    updateHandlePosition: function() {
      this.$handle.css('left', this.$left.css('width'));
    },

    updateSliderInnerWidths: function() {
      var width = $(document).width();
      this.$inners.width(width);
    },

    onMouseDown: function() {
      this._disableSelection();
      this.$el.on('mousemove.slider-move', this.onMouseMove);
    },

    onMouseMove: function(e) {
      this.setDividerPosition(e.pageX);
    },

    onMouseUp: function() {
      this.$el.off('mousemove.slider-move');
      this._enableSelection();
    },

    _disableSelection: function() {
      this.$el.addClass('unselectable')
    },

    _enableSelection: function() {
      this.$el.removeClass('unselectable');
    },

    setDividerPosition: function(x) {
      this.$left.width(x);
      this.refresh();
    },

    refresh: function() {
      this.updateHandlePosition();
      this.updateSliderInnerWidths();
    }

  });

}(RockArt));