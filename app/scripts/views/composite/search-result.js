define([
	'backbone',
  'libs/elastic_searcher',
  'models/search',
  'models/song',
	'views/item/search-result-item',
	'hbs!tmpl/composite/search-result_tmpl',
  'communicator'
],
function(
  Backbone,
  ElasticSearcher,
  SearchModel,
  Song,
  SearchResultItem,
  SearchResultTmpl,
  Communicator  ) {
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
    events: {
      'click .btnAddThisPage': 'btnAddThisPageClicked',
    },

    btnAddThisPageClicked: function() {
      this.collection.each(function( song ) {
        Communicator.mediator.trigger('playlist:add:song', song);
      })
    },

		/* on render callback */
		onRender: function() {}
	});

});
