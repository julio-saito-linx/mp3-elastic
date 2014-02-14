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
  'routers/search-router',
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
          SeacherController,
          SearchRouter ) {
  'use strict';

  var App = new Backbone.Marionette.Application();

  /* *********
     Regions
  *  *********/
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

    App.router = new SearchRouter({
      controller: this.searcher
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
    Communicator.mediator.on('query:created', App.queryReceived, this);
    Communicator.mediator.on('app:navigate', App.navigate, this);
  });

  App.queryReceived = function( query ) {
    this.searcher.setQuery( query );
  };

  App.navigate = function( url, trigger ) {
    App.router.navigate(url, { trigger: trigger || true });
  };

  App.on('initialize:after', function () {
    Backbone.history.start();
  });

  return App;
});
