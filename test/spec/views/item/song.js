(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/song'
		],
		function( Song ) {

			describe('Song Itemview', function () {

				it('should be an instance of Song Itemview', function () {
					var song = new Song();
					expect( song ).to.be.an.instanceof( Song );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );