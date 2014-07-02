/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, require: false, console: false, key: false, Adobe: false */

define(function(require, exports, module) {
	'use strict';

	var BoxCollection = require('src/boxcollection'),
		BoxView = require('src/boxview');

	var MainView = Backbone.View.extend({
		el: '#main',
		historyManager: {},
		events: {
			'click .addBoxButton': 'addBoxModel'
		},
		initialize: function() {
			var self = this;
			_.bindAll(this, 'render', 'addBoxModel', 'addBoxView', 'store', 'undo', 'redo');
			this.historyManager = new Adobe.HistoryManager.CareTaker();
			this.boxCollection = new BoxCollection();
			this.boxCollection.on('add', this.addBoxView);
			this.boxCollection.on('store', this.store);
			key('⌘+z', this.undo);
			key('⌘+shift+z', this.redo);
			
		},
		addBoxModel: function() {
			this.boxCollection.add();
		},
		addBoxView: function(model) {
			var boxView = new BoxView({
				'model': model
			});
			this.$el.append(boxView.render().el);
		},
		store: function(memento) {
			this.historyManager.addMemento(memento);
		},
		undo: function() {
			this.historyManager.undo();
		},
		redo: function() {
			this.historyManager.redo();
		}
	});

	return MainView;

});