define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function(options) {
      if(options){
        this.set('page', options.page);
        this.set('size', options.size);
        this.set('sort', options.sort);
      }
      else{
        this.set('page', 1);
        this.set('size', 12);
        this.set('sort', 'album:asc');
        //this.set('totalPages', this.totalPages.bind(this));
      }
		},

    getSearchUrl: function() {
      var url = "search/";
      url += this.get('page');
      url += "/";
      url += this.get('query');
      return url;
    },

		defaults: {},

    });
});
