define([
	'backbone',
  'libs/pretty_size',
  'libs/pretty_minutes'
],
function( Backbone, prettySize, prettyMinutes ) {
  'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
      //////
      /// sizeFormated
      //////
      this.set('sizeFormated', function() {
        var size = this.get('size');
        return prettySize(size);
      }.bind(this));

      //////
      /// durationFormated
      //////
      this.set('durationFormated', function() {
        var seconds = this.get('duration');
        return prettyMinutes(seconds);
      }.bind(this));

      //////
      /// bitRateFormated
      //////
      this.set('bitRateFormated', function() {
        var bitRate = this.get('bit_rate');
        bitRate = Math.round(bitRate / 1000);
        return bitRate;
      }.bind(this));

      

      var fileName = this.get('filename');
      var fileNameParts = fileName.split('/');
      var name = fileNameParts[fileNameParts.length-1];
      var lastDir = fileNameParts[fileNameParts.length-2];

      var artist = this.get('artist');
      var album = this.get('album');
      var title = this.get('title');
      
      if(!artist || artist.length === 0){
        this.set('artist', '# '+ lastDir);
      }
      if(!album || album.length === 0){
        this.set('album', '# '+ lastDir);
      }
      if(!title || title.length === 0){
        this.set('title', '# '+ name);
      }


		},

		defaults: {},

  });
});
