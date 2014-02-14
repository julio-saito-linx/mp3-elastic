(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/player'
		],
		function( Player ) {

			describe('Player Itemview', function () {

				it('should be an instance of Player Itemview', function () {
					var player = new Player();
					expect( player ).to.be.an.instanceof( Player );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );