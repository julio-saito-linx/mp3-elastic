(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/songs'
		],
		function( Songs ) {

			describe('Songs Collection', function () {

				it('should be an instance of Songs Collection', function () {
					var songs = new Songs();
					expect( songs ).to.be.an.instanceof( Songs );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );