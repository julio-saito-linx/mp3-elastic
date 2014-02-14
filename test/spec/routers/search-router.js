(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/search-router'
		],
		function( SearchRouter ) {

			describe('SearchRouter Router', function () {

				it('should be an instance of SearchRouter Router', function () {
					var search-router = new SearchRouter();
					expect( search-router ).to.be.an.instanceof( SearchRouter );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );