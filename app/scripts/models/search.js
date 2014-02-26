define([
	'backbone'
],
function( Backbone ) {
  'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({

    defaults: {},

		initialize: function(options) {
      if(options){
        this.set('page', options.page);
        this.set('size', options.size);
        this.set('sort', options.sort);
      }
      else{
        this.set('page', 1);
        this.set('size', 8);
        this.set('sort', 'artist:asc,album:asc,filename:asc');
        this.set('totalPages', this.totalPages.bind(this));
      }
		},

    getSearchUrl: function() {
      var url = 'search/';
      url += this.get('page');
      url += '/';
      url += this.get('query');
      return url;
    },

    previousPage: function() {
      var currentPage = this.get('page');
      if(currentPage > 1){
        this.set('page', --currentPage);
      }
    },
    nextPage: function() {
      var total = this.get('total');
      var pageSize = this.get('size');
      var currentPage = this.get('page');

      var totalpages = Math.ceil(total/pageSize);
      if(currentPage < totalpages){
        this.set('page', ++currentPage);
      }
    },

    totalPages: function() {
      var total = this.get('total');
      var pageSize = this.get('size');
      var totalpages = Math.ceil(total/pageSize);

      return totalpages;
    },


  });
});
