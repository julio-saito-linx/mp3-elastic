/*global __MELD_LOG*/
define([
  'backbone',
  'communicator',
  'rsvp',

  'regions/body',
  'regions/header',
  'regions/player',

  'collections/songs',
  
  'views/composite/search-result',
  'views/composite/playlist',
  
  'views/item/search-header',
  'views/item/player',
  'models/player',
  'models/song',
  'models/search',
  'controllers/searcher',
  'routers/search-router',
],

function(
  Backbone,
  Communicator,
  RSVP,

  BodyRegion,
  HeaderRegion,
  PlayerRegion,

  SongsCollection,
  
  SearchResultView,
  PlaylistView,
  
  HeaderView,
  PlayerView,
  Player,
  Song,
  SearchModel,
  SeacherController,
  SearchRouter )
{
  'use strict';

  var App = new Backbone.Marionette.Application();

  /* *********
     Regions
  *  *********/
  App.addRegions({
    player_region: new PlayerRegion(),
    header_region: new HeaderRegion(),
    body_region: new BodyRegion()
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
    //__MELD_LOG('mediator', Communicator.mediator, 12);
    //__MELD_LOG('Player', Player.prototype, 20);
    //__MELD_LOG('Song', Song.prototype, 21);
  });



  /* *********
     Initialize
  *  *********/
  App.addInitializer( function () {
    Communicator.mediator.trigger('APP:START');

    //Collection
    this.songsSearched = new SongsCollection();
    this.playlistSongs = new SongsCollection();

    //Searcher Controller
    this.searcher = new SeacherController({
      songs: this.songsSearched
    });

    //Searcher Router
    App.router = new SearchRouter({
      controller: this.searcher
    });

    //PLAYER region
    this.player = new Player();
    var playerView = new PlayerView({
      model: this.player
    });
    this.player_region.show(playerView);

    //HEADER region
    var searchHeader = new HeaderView({
      model: this.searcher.searchModel
    });
    this.header_region.show(searchHeader);

    //BODY region
    this.playlist = new PlaylistView({
      collection: this.playlistSongs
    });
    this.body_region.show(this.playlist);

    this.searchResultView = new SearchResultView({
      collection: this.songsSearched
    });
    this.body_region.show(this.searchResultView);
    

    //EVENTS
    Communicator.mediator.on('query:created', App.queryReceived, this);
    Communicator.mediator.on('app:navigate', App.navigate, this);
    Communicator.mediator.on('player:play:id', this.player.playId, this.player);
    Communicator.mediator.on('player:play:playlist', this.player.playPlaylist, this.player);
    Communicator.mediator.on('playlist:add:id', this.playlist.addId, this.playlist);
    Communicator.mediator.on('layout:show:search', App.showSearch, this);
    Communicator.mediator.on('layout:show:playlist', App.showPlaylist, this);
  });

  App.showPlaylist = function() {
    this.body_region.show(this.playlist);
  };

  App.showSearch = function() {
    this.body_region.show(this.searchResultView);
  };

  App.queryReceived = function( query ) {
    this.searcher.setQuery( query );
  };

  App.navigate = function( url, trigger ) {
    App.router.navigate(url, { trigger: trigger || true });
  };

  App.on('initialize:after', function () {
    Backbone.history.start();
  });

  window.App = App;
  return App;
});
