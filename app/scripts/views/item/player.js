define([
  'backbone',
  'hbs!tmpl/item/player_tmpl',
  'communicator',
  'dragdealer',
  'libs/pretty_minutes'
],
function( Backbone, PlayerTmpl, Communicator, Dragdealer, prettyMinutes ) {
  'use strict';

  /* Return a ItemView class definition */
  return Backbone.Marionette.ItemView.extend({

    initialize: function() {
      Communicator.mediator.on('player:song', this.renderSong, this);
      Communicator.mediator.on('player:currentTimeChanged', this.updateProgessBar, this);
      Communicator.mediator.on('player:volumeChanged', this.volumeChanged, this);

      Communicator.mediator.on('layout:show:search', this.showSearch, this);
      Communicator.mediator.on('layout:show:playlist', this.showPlaylist, this);
    },

    renderSong: function( songModel ) {
      this.model = songModel;
      this.render();
      this.initializeSliders();
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
      durationSlider: '#duration-slider',
      volumeSlider: '#volume-slider',
      durationHandle: '#duration-handle',
      volumeHandle: '#volume-handle',
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



    initializeSliders: function() {
      this.durationSlider = new Dragdealer(this.ui.durationSlider[0], {
        loose: true,
        callback: this.durationSliderHandleCallback.bind(this),
        animationCallback: this.updateCurrentTimeAnimation.bind(this)
      });

      this.volumeSlider = new Dragdealer(this.ui.volumeSlider[0], {
        steps: 21,
        snap: true,
        callback: this.volumeSliderHandleCallback.bind(this),
        animationCallback: this.updateVolumeAnimation.bind(this)
      });
      this.volumeSlider.setValue(0.5, 0, true, false);
    },

    updateCurrentTimeAnimation: function(x) {
      if(this.totalLength){
        var currentTime = this.totalLength * x;
        var timeFormated = prettyMinutes(currentTime);
        this.ui.durationHandle.text(timeFormated);
      }
    },

    updateVolumeAnimation: function(x) {
      this.ui.volumeHandle.text(x*100 + '%');
    },

    /*******************************************************************
    * audioInfo: currentTimeChanged, currentTime, totalLength, currentTimeFormated
    ********************************************************************/
    updateProgessBar: function( audioInfo ) {
      this.totalLength = audioInfo.totalLength;

      this.durationSlider.setValue(audioInfo.currentTimeChanged, 0, true, false);
      this.ui.durationHandle.text(audioInfo.currentTimeFormated);
    },

    volumeChanged: function( percentage ) {
      this.volumeSlider.setValue(percentage/100, 0, true, false);
      this.ui.volumeHandle.text(percentage + '%');
    },

    durationSliderHandleCallback: function(x) {
      Communicator.mediator.trigger('player:changeCurrentPosition', x);
    },

    volumeSliderHandleCallback: function(x) {
      this.volumeChanged(Math.floor(x*100));
      Communicator.mediator.trigger('player:volume', x);
    },
  });

});
