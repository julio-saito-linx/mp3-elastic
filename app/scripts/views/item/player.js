define([
	'backbone',
	'hbs!tmpl/item/player_tmpl'
],
function( Backbone, PlayerTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Player ItemView");
		},
		
    className: 'bs-example row',

    template: PlayerTmpl,

  	/* ui selector cache */
  	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
