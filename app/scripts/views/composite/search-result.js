define([
	'backbone',
	'views/item/search-result-item',
	'hbs!tmpl/composite/search-result_tmpl'
],
function( Backbone, SearchResultItem, SearchResultTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
		},
		
  	itemView: SearchResultItem,
  	
  	template: SearchResultTmpl,
  	

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
