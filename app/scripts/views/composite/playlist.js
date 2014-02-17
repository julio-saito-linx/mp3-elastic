define([
  'backbone',
  'libs/elastic_searcher',
  'models/song',
  'views/item/playlist-item',
  'hbs!tmpl/composite/playlist_tmpl'
],
function(
  Backbone,
  ElasticSearcher,
  Song,
  PlaylistItem,
  PlaylistTmpl
){
  'use strict';

/* Return a CompositeView class definition */
  return Backbone.Marionette.CompositeView.extend({

    initialize: function() {
      this.elasticSearcher = new ElasticSearcher('http://192.168.15.103:9200/music_library/song/');
    },
    
    itemView: PlaylistItem,
    
    template: PlaylistTmpl,
    

    /* ui selector cache */
    ui: {},

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

    /* on render callback */
    onRender: function() {}
  });
});
