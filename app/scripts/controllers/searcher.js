define([
	'backbone',
  'libs/elastic_searcher',
  'models/search',
  'communicator',
],
function(
  Backbone,
  ElasticSearcher,
  SearchModel,
  Communicator
){
  'use strict';
	return Backbone.Marionette.Controller.extend({

		initialize: function ( options ) {
      this.elasticSearcher = new ElasticSearcher('http://localhost:9200/music_library/song/');
      this.searchModel = new SearchModel();
      this.songs = options.songs;
    },

    setQuery: function( query ) {
      this.searchModel.set('query', query);
      this.searchModel.set('page', 1);
      var newUrl = this.searchModel.getSearchUrl();
      Communicator.mediator.trigger('app:navigate', newUrl);
    },

    search: function( page, query ) {
      this.searchModel.set('query', query);
      this.searchModel.set('page', page);
      
      this.elasticSearcher.searchElasticSearch(this.searchModel).then(function(data){

        //resets Collection
        this.songs.reset(data);

      }.bind(this), function() {
        console.log('ERROR, see network for more details...', arguments);
      });

    },

	});

});
