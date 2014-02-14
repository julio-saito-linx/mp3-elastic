define([
	'backbone',
  'libs/elastic_searcher',
  'models/search',
],
function(
  Backbone,
  ElasticSearcher,
  SearchModel
){
  'use strict';
	return Backbone.Marionette.Controller.extend({

		initialize: function ( options ) {
      console.log('initialize a Searcher Controller', options);
      this.elasticSearcher = new ElasticSearcher('http://localhost:9200/music_library/song/');
      this.songs = options.songs;
		},

    search: function( query ) {
      console.log('search:', query);

      //ElasticSearcher and SearchModel
      var searchModel = new SearchModel();
      searchModel.set('query', query);
      
      this.elasticSearcher.searchElasticSearch(searchModel).then(function(data){

        //resets Collection
        this.songs.reset(data);

      }.bind(this), function() {
        console.log('ERROR, see network for more details...', arguments);
      });

    },

	});

});
