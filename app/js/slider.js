(function(RockArt) {
  'use strict';

  RockArt.Views.Slider = Backbone.View.extend({

    events: {
      'mousedown .slider-handle': 'onMouseDown',
      'mouseup': 'onMouseUp',
      'touchstart .slider-handle': 'onTouchStart',
      'touchend': 'onTouchEnd'
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
      var offsetPercentage = (this.$left.width() / this.$el.width()) * 100;
      this.$handle.css('left', offsetPercentage + '%');
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

    onTouchStart: function(e) {
      if (e.originalEvent.touches.length !== 1) {
        return true;
      }

      e.preventDefault();
      this.$el.on('touchmove.slider-move', this.onTouchMove)
      return false;
    },

    onTouchMove: function(e) {
      if (e.originalEvent.changedTouches.length !== 1) {
        return true;
      }

      e.preventDefault();
      var touch = e.originalEvent.changedTouches[0];
      this.setDividerPosition(touch.pageX);
    },

    onTouchEnd: function() {
      this.$el.off('touchmove.slider-move');
    },

    _disableSelection: function() {
      this.$el.addClass('unselectable')
    },

    _enableSelection: function() {
      this.$el.removeClass('unselectable');
    },

    setDividerPosition: function(x) {
      var offsetPercentage = (x / this.$el.width()) * 100;
      this.$left.width(offsetPercentage + '%');
      this.refresh();
    },

    refresh: function() {
      this.updateHandlePosition();
      this.updateSliderInnerWidths();
    }

  });

}(RockArt));