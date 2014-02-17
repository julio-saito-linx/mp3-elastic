(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/playlist'
		],
		function( Playlist ) {

			describe('Playlist Compositeview', function () {

				it('should be an instance of Playlist Compositeview', function () {
					var playlist = new Playlist();
					expect( playlist ).to.be.an.instanceof( Playlist );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );