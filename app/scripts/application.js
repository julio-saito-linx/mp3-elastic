/*global __MELD_LOG*/
define([
  'backbone',
  'communicator',
  'rsvp',

  'regions/body',
  'regions/header',

  'collections/songs',
  'views/composite/songs',
  'views/item/search-header',
  'models/search',
  'controllers/searcher',
],

function( Backbone,
          Communicator,
          RSVP,

          Body,
          Header,

          SongsCollection,
          SongsView,
          HeaderView,
          SearchModel,
          SeacherController ) {
  'use strict';

  var App = new Backbone.Marionette.Application();

  /* Add application regions here */
  App.addRegions({
    header: new Header(),
    body: new Body()
  });


  /* *********
     LOGS 
  *  *********/
  App.addInitializer( function () {
    // ensures that no errors will be omitted
    RSVP.on('error', function(reason) {
      console.error(reason);
    });

    __MELD_LOG('App', Backbone.Marionette.Application.prototype, 10);
    //__MELD_LOG('songs', Backbone.Collection.prototype, 11);
    __MELD_LOG('mediator', Communicator.mediator, 12);
  });



  /* *********
     Initialize
  *  *********/
  App.addInitializer( function () {
    Communicator.mediator.trigger('APP:START');

    //Collection
    this.songs = new SongsCollection();

    this.searcher = new SeacherController({
      songs: this.songs
    });

    //HEADER region
    var searchHeader = new HeaderView();
    this.header.show(searchHeader);

    //BODY region
    var songsView = new SongsView({
      collection: this.songs
    });

    this.body.show(songsView);

    //EVENTS
    Communicator.mediator.on('query:created', this.searcher.search, this.searcher);
  });

  return App;
});
