define([
  'backbone',
  'libs/elastic_searcher',
  'models/song',
  'views/item/playlist-item',
  'hbs!tmpl/composite/playlist_tmpl',
  'communicator'
],
function(
  Backbone,
  ElasticSearcher,
  Song,
  PlaylistItem,
  PlaylistTmpl,
  Communicator
){
  'use strict';

/* Return a CompositeView class definition */
  return Backbone.Marionette.CompositeView.extend({

    initialize: function(options) {
      this.elasticSearcher = new ElasticSearcher('http://192.168.15.103:9200/music_library/song/');
      this.currentSong = options.currentSong;

      Communicator.mediator.on('player:song', this.setSongSelected, this);
      Communicator.mediator.on('playlist:remove:id', this.removeId, this);
      Communicator.mediator.on('playlist:add:id', this.addId, this);
    },
    
    itemView: PlaylistItem,
    
    template: PlaylistTmpl,
    

    /* ui selector cache */
    ui: {
      allButtonsPlay: '.btnPlay'
    },

    /* where are we appending the items views */
    itemViewContainer: 'tbody',

    /* Ui events hash */
    events: {},

    addId: function( id ) {
      //get path
      this.elasticSearcher.getIdElasticSearch( id ).then(function( songData ) {
        this.song = new Song( songData );
        this.collection.add(this.song);
      }.bind(this));
    },

    removeId: function( id ) {
      this.collection.remove(id);
      this.render();
    },

    /* on render callback */
    onRender: function() {},

    onShow: function() {
      this.setSongSelected();
    },

    setSongSelected: function( song ) {
      //new song comming
      if(song){
        this.currentSong = song;
      }

      //there is no current song
      if(!this.currentSong){
        return;
      }

      //remove class from all
      var jAllTr = $(this.el).find('tr');
      jAllTr.removeClass('success');

      //add class at the song that is playing
      var jCurrentButtonSong = $(this.el).find('.btnPlay[data-id="'+ this.currentSong.id +'"]');
      jCurrentButtonSong.parent().parent().addClass('success');
    }
  });
});
