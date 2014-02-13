/*global __MELD_LOG*/
define([
	'backbone',
	'communicator',
	'rsvp',
	'libs/elastic_searcher',

	'regions/body',
	'regions/header',

	'collections/songs',
	'views/composite/songs',
	'models/search',
],

function( Backbone,
				  Communicator,
				  RSVP,
				  ElasticSearcher,

				  Body,
				  Header,

				  SongsCollection,
				  SongsView,
				  SearchModel ) {
  'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		header: new Header(),
		body: new Body()
	});


	/* LOGS */
	App.addInitializer( function () {
	  // ensures that no errors will be omitted
	  RSVP.on('error', function(reason) {
	    console.error(reason);
	  });

	  __MELD_LOG('App', Backbone.Marionette.Application.prototype, 10);
	  //__MELD_LOG('songs', Backbone.Collection.prototype, 11);
		__MELD_LOG('mediator', Communicator.mediator, 12);
  });



	/* Add initializers here */
	App.addInitializer( function () {
		Communicator.mediator.trigger('APP:START');

		//Collection
		this.songs = new SongsCollection();

    //BODY region
    var songsView = new SongsView({
    	collection: this.songs
    });
    this.body.show(songsView);

		App.fetchSearch();
  });

  App.fetchSearch = function() {
		//ElasticSearcher and SearchModel
		var elasticSearcher = window.elasticSearcher = new ElasticSearcher('http://localhost:9200/music_library/song/');
		var searchModel = new SearchModel();
		searchModel.set('query', '"João Gilberto"');
		
		elasticSearcher.searchElasticSearch(searchModel).then(function(data){

			//resets Collection
			this.songs.reset(data);

		}.bind(this), function() {
			console.log('ERROR, see network for more details...', arguments);
		});
  };


	return App;
});
