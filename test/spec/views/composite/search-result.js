(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/search-result'
		],
		function( SearchResult ) {

			describe('SearchResult Compositeview', function () {

				it('should be an instance of SearchResult Compositeview', function () {
					var search-result = new SearchResult();
					expect( search-result ).to.be.an.instanceof( SearchResult );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );