(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/search-header'
		],
		function( SearchHeader ) {

			describe('SearchHeader Itemview', function () {

				it('should be an instance of SearchHeader Itemview', function () {
					var search-header = new SearchHeader();
					expect( search-header ).to.be.an.instanceof( SearchHeader );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );