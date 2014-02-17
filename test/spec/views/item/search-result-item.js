(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/search-result-item'
		],
		function( SearchResultItem ) {

			describe('SearchResultItem Itemview', function () {

				it('should be an instance of SearchResultItem Itemview', function () {
					var search-result-item = new SearchResultItem();
					expect( search-result-item ).to.be.an.instanceof( SearchResultItem );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );