define([
	'backbone',
	'hbs!tmpl/item/song_tmpl'
],
function( Backbone, SongTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Song ItemView");
		},
		
    	template: SongTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
