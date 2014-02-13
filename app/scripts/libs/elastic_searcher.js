/*global RSVP */
define([
  'rsvp'
],
function( RSVP ) {
  'use strict';

  var ElasticSearcher = function(localuri){
    this.localuri = localuri;
  };

  _.extend(ElasticSearcher.prototype, {

    searchElasticSearch: function(searchModel) {
      var promise = new RSVP.Promise(function(resolve, reject) {
        var query = searchModel.get('query');
        var sort = searchModel.get('sort');
        var page = searchModel.get('page');
        var size = searchModel.get('size');

        var offset = ((page-1) * size);

        var data = {
            from: offset,
            size: size,
            sort: sort,
            default_operator: 'AND',
            q: query
          };

        $.ajax({
          url: this.localuri + '_search',
          data: data,
          
          success: function(data) {
            searchModel.set('total', data.hits.total);

            var results = [];
            for (var i = 0; i < data.hits.hits.length; i++) {
              var hit = data.hits.hits[i];
              //var movieSimplified = this.simplify(hit._source);
              results.push(hit._source);
            }

            // RESOLVE ///////////////
            resolve(results);

          }.bind(this),
          
          error: function(xhr, ajaxOptions, thrownError) {

            // REJECT ///////////////
            reject(xhr, ajaxOptions, thrownError);

          }.bind(this),
          
          dataType: 'json'
        });
      }.bind(this));

      return promise;
    },

    getIdElasticSearch: function(id) {
      var def = $.Deferred();

      $.ajax({
        url: this.localuri + id,
        success: function(data) {
          def.resolve(data._source);
        },
        dataType: 'json'
      });
      return def.promise();
    },

    simplify: function(movieObject) {
      var movieDto = {};
      movieDto.id = movieObject.id;
      movieDto.year = movieObject.year;
      movieDto.title = movieObject.title;
      movieDto.originaltitle = movieObject.originaltitle;

      // titleAndOriginal
      var sameTitle = true;
      if(movieDto.title && movieDto.originaltitle){
        sameTitle = movieDto.title[0] === movieDto.originaltitle[0];
      }
      if(sameTitle){
        movieDto.titleAndOriginal = movieObject.title;
      }
      else{
        movieDto.titleAndOriginal = movieObject.title + ' ('+ movieDto.originaltitle +')';
      }

      // firstThumb
      if(movieObject.thumb.length > 0){
        movieDto.firstThumb = movieObject.thumb[0].prevThumb;
      }

      movieDto.director = movieObject.director;
      movieDto.idImdb = movieObject.idImdb;
      
      movieDto.imdbInfo = movieObject.imdbInfo;

      return movieDto;
    }

  });

  return ElasticSearcher;

});
