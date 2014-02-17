define([
	'backbone',
  'libs/elastic_searcher',
  'models/song',
  'communicator'
],
function( Backbone, ElasticSearcher, Song, Communicator ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
      this.audio = new Audio();
      this.volume = 50;
      this.audio.volume = this.volume / 100;

      // audio events
      this.audio.addEventListener('canplay', this.canplay.bind(this), false);
      this.audio.addEventListener('ontimeupdate', this.ontimeupdate.bind(this), false);
      this.audio.addEventListener('ended', this.ended.bind(this), false);
      
      this.elasticSearcher = new ElasticSearcher('http://192.168.15.103:9200/music_library/song/');

      Communicator.mediator.on('player:play', this.play, this);
      Communicator.mediator.on('player:pause', this.pause, this);
      Communicator.mediator.on('player:voldown', this.voldown, this);
      Communicator.mediator.on('player:volup', this.volup, this);

		},

    play:function() {
      this.audio.play();
    },

    pause:function() {
      this.audio.pause();
    },

    voldown:function() {
      if(this.volume > 0){
        this.volume -= 5;
        this.audio.volume = this.volume / 100;
        Communicator.mediator.trigger('player:volumeChanged', this.volume);
      }
    },

    volup:function() {
      if(this.volume < 100){
        this.volume += 5;
        this.audio.volume = this.volume / 100;
        Communicator.mediator.trigger('player:volumeChanged', this.volume);
      }
    },


    canplay: function () {
      console.log('duration:', this.audio.duration);
      this.totalLength = this.audio.duration;

      this.updateProgressBar();
    },

    updateProgressBar: function() {
      var percentagePlayed = this.audio.currentTime / this.totalLength;
      Communicator.mediator.trigger('player:percentagePlayed', percentagePlayed);
      this.tId = setTimeout(this.updateProgressBar.bind(this), 1000);
    },

    ontimeupdate: function () {
      console.log(arguments);
    },

    ended: function () {
      console.log('end of song');
    },

		defaults: {},

    playId: function( id ) {
      //get path
      this.elasticSearcher.getIdElasticSearch( id ).then(function( songData ) {
        this.song = new Song( songData );

        this.audio.src = this._convertUrl( songData.file.fullPath );
        this.audio.play();

        this.song.set('audio', this.audio);

        Communicator.mediator.trigger('player:song', this.song, this.audio);

      }.bind(this))
    },



    /*
      from /server/app.js
     */
    _convertUrl: function( oldPath ) {
      if(oldPath.indexOf('/media/julio/4 H-MP3 (1,36 TB)/') >= 0){
        return oldPath.replace('/media/julio/4 H-MP3 (1,36 TB)/', '/MP3-01/');
      }
      if(oldPath.indexOf('/media/julio/B21AB1E71AB1A92D/') >= 0){
        return oldPath.replace('/media/julio/B21AB1E71AB1A92D/', '/MP3-02/');
      }
      if(oldPath.indexOf('/media/julio/2GB, new/') >= 0){
        return oldPath.replace('/media/julio/2GB, new/', '/MP3-03/');
      }
      if(oldPath.indexOf('/media/julio/Files/') >= 0){
        return oldPath.replace('/media/julio/Files/', '/MP3-04/');
      }
      if(oldPath.indexOf('/home/julio/Música/') >= 0){
        return oldPath.replace('/home/julio/Música/', '/MP3-05/');
      }
    }

    });
});
