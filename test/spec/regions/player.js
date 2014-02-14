(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/player'
		],
		function( Player ) {

			describe('Player Region', function () {

				it('should be an instance of Player Region', function () {
					var player = new Player();
					expect( player ).to.be.an.instanceof( Player );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );