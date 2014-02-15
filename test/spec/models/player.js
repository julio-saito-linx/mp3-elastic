(function() {
	'use strict';

	var root = this;

	root.define([
		'models/player'
		],
		function( Player ) {

			describe('Player Model', function () {

				it('should be an instance of Player Model', function () {
					var player = new Player();
					expect( player ).to.be.an.instanceof( Player );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );