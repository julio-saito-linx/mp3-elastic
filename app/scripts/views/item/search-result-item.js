define([
	'backbone',
	'hbs!tmpl/item/search-result-item_tmpl',
  'communicator'
],
function( Backbone, SearchResultItemTmpl, Communicator  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
		},
		
  	template: SearchResultItemTmpl,
      
    tagName: 'tr',

    /* ui selector cache */
    ui: {
      button: '.btnPlay'
    },

    /* Ui events hash */
    events: {
      'click .btnPlay': 'play',
      'click .btnAddToPlaylist': 'addPlaylist'
    },

    /* on render callback */
    onRender: function() {},

    play: function(e) {
      var btn = $(e.target);
      Communicator.mediator.trigger('player:play:id', btn.data('id'));
    },
    
    addPlaylist: function(e) {
      var btn = $(e.target);
      Communicator.mediator.trigger('playlist:add:id', btn.data('id'));
    }
	});

});
