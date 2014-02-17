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
      btnPlay : '.btnPlay',
      btnPause : '.btnPause',
      btnVolDown : '.btnVolDown',
      btnVolUp : '.btnVolUp',
    },

		/* Ui events hash */
		events: {
      'click .btnPlay' : 'btnPlayClicked',
      'click .btnPause' : 'btnPauseClicked',
      'click .btnVolDown' : 'btnVolDownClicked',
      'click .btnVolUp' : 'btnVolUpClicked',
    },

    btnPlayClicked: function() {
      Communicator.mediator.trigger('player:play');
    },

    btnPauseClicked: function() {
      Communicator.mediator.trigger('player:pause');
    },

    btnVolDownClicked: function() {
      Communicator.mediator.trigger('player:voldown');
    },

    btnVolUpClicked: function() {
      Communicator.mediator.trigger('player:volup');
    },


    updatePlayerInfo: function() {
      this.render();
    },

		/* on render callback */
		onRender: function() {
    }
	});

});
