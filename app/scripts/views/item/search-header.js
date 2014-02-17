/* global $*/
define([
	'backbone',
	'hbs!tmpl/item/search-header_tmpl',
  'communicator'
],
function( Backbone, SearchHeaderTmpl, Communicator ) {
  'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
		},
		
    onShow: function () {
      $(document).on('keydown', this.processShortcut.bind(this));
    },

    onClose: function () {
      $(document).off('keydown');
    },

    processShortcut: function(e) {
      //LEFT
      if(e.which === 37){
        this.prevPage();
        $('.btnPrevPage').stop().fadeOut(30).fadeIn(20);
      }
      //RIGHT
      else if(e.which === 39){
        this.nextPage();
        $('.btnNextPage').stop().fadeOut(30).fadeIn(20);
      }
    },

    template: SearchHeaderTmpl,

    className: 'bs-example row',
        

    /* ui selector cache */
    ui: {
      inputQ: '#q',
      pageNumber: '#pageNumber',
      totalPageNumber: '#totalPageNumber',
      totalMovies: '#totalMovies',
    },

    modelEvents: {
      'change': 'updateStats',
    },

    updateStats: function() {
      this.ui.pageNumber.text(this.model.get('page'));
      this.ui.totalPageNumber.text(this.model.get('totalPages'));
      this.ui.totalMovies.text(this.model.get('total'));
      this.ui.inputQ.val(this.model.get('query'));
    },

		/* Ui events hash */
		events: {
      'click #btnSubmit': 'search',
      'click .btnPrevPage': 'prevPage',
      'click .btnNextPage': 'nextPage',
      'keydown #q': 'stopPropagation'
    },

		/* on render callback */
		onRender: function() {},

    search: function() {
      var query = this.ui.inputQ.val();
      //this.ui.inputQ.val('');

      Communicator.mediator.trigger('query:created', query);
    },

    prevPage: function() {
      Communicator.mediator.trigger('page:prev');
    },
    nextPage: function() {
      Communicator.mediator.trigger('page:next');
    },
    stopPropagation: function(e) {
      e.stopPropagation();
      if(e.which === 13){
        this.search();
      }
    }

	});

});
