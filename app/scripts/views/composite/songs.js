define([
	'backbone',
	'views/item/song',
	'hbs!tmpl/composite/songs_tmpl'
],
function( Backbone, Song, SongsTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Songs CompositeView");
		},
		
    	itemView: Song,
    	
    	template: SongsTmpl,

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "tbody",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
