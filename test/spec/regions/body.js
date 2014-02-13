(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/body'
		],
		function( Body ) {

			describe('Body Region', function () {

				it('should be an instance of Body Region', function () {
					var body = new Body();
					expect( body ).to.be.an.instanceof( Body );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );