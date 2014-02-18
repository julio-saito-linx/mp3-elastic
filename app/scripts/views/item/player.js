define([
	'backbone',
	'hbs!tmpl/item/player_tmpl',
  'communicator'
],
function( Backbone, PlayerTmpl, Communicator ) {
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

    updateProgessBar: function( percentage ) {
      this.ui.progress_bar.css('width', percentage*100 + '%');
    },

    volumeChanged: function( percentage ) {
      this.ui.volume.text( percentage );
    },

    renderSong: function( songModel ) {
      this.model = songModel;
      this.render();
      this.ui.progress_bar.css('width', '0%');
    },
		
    className: 'bs-example row',

    template: PlayerTmpl,

  	/* ui selector cache */
  	ui: {
      progress_bar: '.progress-bar',
      volume: '.volume',
      btnPlay: '.btnPlay',
      btnPause: '.btnPause',
      btnPrev: '.btnPrev',
      btnNext: '.btnNext',
      btnVolDown: '.btnVolDown',
      btnVolUp: '.btnVolUp',
      btnShowPlaylist: '.btnShowPlaylist',
      btnShowSearch: '.btnShowSearch',
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
    }
	});

});
