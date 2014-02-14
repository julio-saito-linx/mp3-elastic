(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/searcher'
		],
		function( Searcher ) {

			describe('Searcher Controller', function () {

				it('should be an instance of Searcher Controller', function () {
					var searcher = new Searcher();
					expect( searcher ).to.be.an.instanceof( Searcher );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );