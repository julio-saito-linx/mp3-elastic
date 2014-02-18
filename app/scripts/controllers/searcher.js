define([
	'backbone',
  'libs/elastic_searcher',
  'models/search',
  'models/song',
  'communicator',
],
function(
  Backbone,
  ElasticSearcher,
  SearchModel,
  Song,
  Communicator
){
  'use strict';
	return Backbone.Marionette.Controller.extend({

		initialize: function ( options ) {
      this.elasticSearcher = new ElasticSearcher('http://192.168.15.103:9200/music_library/song/');
      this.searchModel = new SearchModel();
      this.songs = options.songs;

      Communicator.mediator.on('page:prev', this.prevPage, this);
      Communicator.mediator.on('page:next', this.nextPage, this);
    },

    setQuery: function( query ) {
      this.searchModel.set('query', query);
      this.searchModel.set('page', 1);
      Communicator.mediator.trigger('app:navigate', this.searchModel.getSearchUrl());
    },

    search: function( page, query ) {

      this.searchModel.set('query', query);
      this.searchModel.set('page', page);
      
      this.elasticSearcher.searchElasticSearch(this.searchModel).then(function(data){

        Communicator.mediator.trigger('layout:show:search');
        //resets Collection
        this.songs.reset(data);

      }.bind(this), function() {
        console.log('ERROR, see network for more details...', arguments);
      });

    },

    addAllToPlaylist: function() {
      this.searchModel.set('page', 1);
      this.searchModel.set('size', 600);
      
      this.elasticSearcher.searchElasticSearch(this.searchModel).then(function(data){

        data.forEach(function( songData ) {
          var song = new Song( songData );
          Communicator.mediator.trigger('playlist:add:song', song);
        });

      this.searchModel.set('size', 8);

      }.bind(this), function() {
        console.log('ERROR, see network for more details...', arguments);
      });
    },

    prevPage: function() {
      this.searchModel.previousPage();
      Communicator.mediator.trigger('app:navigate', this.searchModel.getSearchUrl());
    },
    nextPage: function() {
      this.searchModel.nextPage();
      Communicator.mediator.trigger('app:navigate', this.searchModel.getSearchUrl());
    },



	});

});
