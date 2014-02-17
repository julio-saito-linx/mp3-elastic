define([
  'backbone',
  'hbs!tmpl/item/playlist-item_tmpl',
  'communicator'
],
function( Backbone, PlaylistItemTmpl, Communicator  ) {
  'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    initialize: function() {},
    
    template: PlaylistItemTmpl,
        
    tagName: 'tr',

    /* ui selector cache */
    ui: {},

    /* Ui events hash */
    events: {
      'click .btnPlay': 'play',
      'click .btnRemove': 'removeItem'
    },

    play: function() {
      Communicator.mediator.trigger('player:play:playlist', this.model.collection, this.model);
    },

    removeItem: function(e) {
      var btn = $(e.target);
      Communicator.mediator.trigger('playlist:remove:id', btn.data('id'));
    },

    /* on render callback */
    onRender: function() {}
  });

});
