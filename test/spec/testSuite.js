define(function() {
	'use strict';

	/* return an array of specs to be run */
	return {
		specs: ['spec/collections/songs.js',
		'spec/controllers/searcher.js',
		'spec/exampleTest.js',
		'spec/models/search.js',
		'spec/models/song.js',
		'spec/regions/body.js',
		'spec/regions/header.js',
		'spec/regions/player.js',
		'spec/routers/search-router.js',
		'spec/views/composite/songs.js',
		'spec/views/item/player.js',
		'spec/views/item/search-header.js',
		'spec/views/item/song.js'
		]
	};
});
