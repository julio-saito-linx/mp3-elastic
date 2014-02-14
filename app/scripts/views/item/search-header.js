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
			console.log('initialize a SearchHeader ItemView');
		},
		
    template: SearchHeaderTmpl,

    className: 'bs-example row',
        

    /* ui selector cache */
    ui: {
      inputQ: "#q"
    },

		/* Ui events hash */
		events: {
      'submit form': 'submit'
    },

		/* on render callback */
		onRender: function() {},

    submit: function(e) {
      e.preventDefault();

      var query = this.ui.inputQ.val();
      this.ui.inputQ.val('');

      Communicator.mediator.trigger('query:created', query);
    }
	});

});
