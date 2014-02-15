define([
  'backbone',
  'hbs!tmpl/item/song_tmpl',
  'communicator'
],
function( Backbone, SongTmpl, Communicator  ) {
  'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    initialize: function() {
      console.log('initialize a Song ItemView');
    },
    
    template: SongTmpl,

    tagName: 'tr',
        

    /* ui selector cache */
    ui: {
      button: '.btnPlay'
    },

    /* Ui events hash */
    events: {
      'click .btnPlay': 'play'
    },

    /* on render callback */
    onRender: function() {},

    play: function(e) {
      var btn = $(e.target);
      Communicator.mediator.trigger('player:play:id', btn.data('id'));
    }

  });

});
