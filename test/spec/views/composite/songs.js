(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/songs'
		],
		function( Songs ) {

			describe('Songs Compositeview', function () {

				it('should be an instance of Songs Compositeview', function () {
					var songs = new Songs();
					expect( songs ).to.be.an.instanceof( Songs );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );