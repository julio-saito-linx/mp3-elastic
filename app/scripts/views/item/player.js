define([
	'backbone',
	'hbs!tmpl/item/player_tmpl',
  'communicator',
  'dragdealer'
],
function( Backbone, PlayerTmpl, Communicator, Dragdealer ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
      Communicator.mediator.on('player:song', this.renderSong, this);
      Communicator.mediator.on('player:percentagePlayed', this.updateProgessBar, this);
      Communicator.mediator.on('player:volumeChanged', this.volumeChanged, this);

      Communicator.mediator.on('layout:show:search', this.showSearch, this);
      Communicator.mediator.on('layout:show:playlist', this.showPlaylist, this);
		},

    updateProgessBar: function( audioInfo ) {
      this.dragdealer.setValue(audioInfo.percentagePlayed, 0, true, false);
      this.ui.handle.text(audioInfo.currentTimeFormated);

        // {
        //   percentagePlayed: percentagePlayed,
        //   currentTime: this.audio.currentTime,
        //   totalLength: this.totalLength,
        //   currentTimeFormated: pretty_minutes(this.audio.currentTime),
        //   totalLengthFormated: pretty_minutes(this.totalLength),
        // });

    },

    volumeChanged: function( percentage ) {
      this.ui.volume.text( percentage );
    },

    dragdealerHandleCallback: function(x) {
      console.log('dragdealerHandleCallback', x)
      Communicator.mediator.trigger('player:changeCurrentPosition', x);
    },

    renderSong: function( songModel ) {
      this.model = songModel;
      this.render();
      
      this.dragdealer = new Dragdealer(this.ui.slider[0], {
        loose: true,
        callback: this.dragdealerHandleCallback.bind(this)
      });

      window.d = this.dragdealer;
    },
		
    className: 'bs-example row',

    template: PlayerTmpl,

  	/* ui selector cache */
  	ui: {
      volume: '.volume',
      btnPlay: '.btnPlay',
      btnPause: '.btnPause',
      btnPrev: '.btnPrev',
      btnNext: '.btnNext',
      btnVolDown: '.btnVolDown',
      btnVolUp: '.btnVolUp',
      btnShowPlaylist: '.btnShowPlaylist',
      btnShowSearch: '.btnShowSearch',
      slider: '#demo-simple-slider',
      handle: '.handle',
    },

		/* Ui events hash */
		events: {
      'click .btnPlay' : 'btnPlayClicked',
      'click .btnPause' : 'btnPauseClicked',
      'click .btnPrev' : 'btnPrevClicked',
      'click .btnNext' : 'btnNextClicked',
      'click .btnVolDown' : 'btnVolDownClicked',
      'click .btnVolUp' : 'btnVolUpClicked',
      'click .btnShowPlaylist' : 'btnShowPlaylist',
      'click .btnShowSearch' : 'btnShowSearch',
    },

    btnPlayClicked: function() {
      Communicator.mediator.trigger('player:play');
    },

    btnPauseClicked: function() {
      Communicator.mediator.trigger('player:pause');
    },

    btnPrevClicked: function() {
      Communicator.mediator.trigger('player:prev');
    },

    btnNextClicked: function() {
      Communicator.mediator.trigger('player:next');
    },

    btnVolDownClicked: function() {
      Communicator.mediator.trigger('player:voldown');
    },

    btnVolUpClicked: function() {
      Communicator.mediator.trigger('player:volup');
    },

    btnShowSearch: function() {
      Communicator.mediator.trigger('layout:show:search');
    },

    btnShowPlaylist: function() {
      Communicator.mediator.trigger('layout:show:playlist');
    },

    showSearch: function() {
      this.ui.btnShowSearch.addClass('active');
      this.ui.btnShowPlaylist.removeClass('active');
    },
    showPlaylist: function() {
      this.ui.btnShowSearch.removeClass('active');
      this.ui.btnShowPlaylist.addClass('active');
    },

    updatePlayerInfo: function() {
      this.render();
    },

		/* on render callback */
    onRender: function() {
    },
	});

});
