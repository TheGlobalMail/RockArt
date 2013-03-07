(function(RockArt) {
  'use strict';

  RockArt.Views.Slider = Backbone.View.extend({

    sizes: {
      min: { height: 300,  width: 400  },
      max: { height: 1200, width: 1600 }
    },

    events: {
      'mousedown .slider-handle': 'onMouseDown',
      'mouseup': 'onMouseUp',
      'touchstart .slider-handle': 'onTouchStart',
      'touchend': 'onTouchEnd'
    },

    initialize: function() {
      _.bindAll(this);

      this.$left   = this.$('.slider-side.left');
      this.$handle = this.$('.slider-handle');
      this.$inners = this.$('.slider-side-inner');
      this.$maps   = this.$('.map');

      this.refresh();
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

    updateHandlePosition: function() {
      if (Modernizr.csstransforms3d) {
        this.$handle.css('transform',  'translateX(' + this.$left.width() + 'px)');
      } else {
        this.$handle.css('left', this.$left.width() + 'px');
      }
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
    }

  });

}(RockArt));