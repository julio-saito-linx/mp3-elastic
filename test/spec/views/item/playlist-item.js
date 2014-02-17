(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/playlist-item'
		],
		function( PlaylistItem ) {

			describe('PlaylistItem Itemview', function () {

				it('should be an instance of PlaylistItem Itemview', function () {
					var playlist-item = new PlaylistItem();
					expect( playlist-item ).to.be.an.instanceof( PlaylistItem );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );