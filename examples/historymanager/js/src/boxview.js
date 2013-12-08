/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, require: false, console: false*/

define(function(require, exports, module) {
	'use strict';

	var BoxView = Backbone.View.extend({
		className: 'box',
		events: {
			'mousedown': 'select'
		},
		initialize: function() {
			_.bindAll(this, 'render', 'dragStopHandler');
			this.model.on('change', this.render);
			this.$el.draggable({
				stop: this.dragStopHandler
			});
		},
		render: function() {

			if (this.model.get('selected')) {
				this.$el.addClass('selected');
			} else {
				this.$el.removeClass('selected');
			}

			this.$el.css({
				'top': this.model.get('top'),
				'left': this.model.get('left')
			});

			return this;
		},
		select: function(e) {
			this.smash(e);
			this.model.set({
				'selected': true
			});
		},
		dragStopHandler: function(e, ui) {
			this.model.store();
			this.model.set({
				'top': ui.position.top,
				'left': ui.position.left
			});
		},
		smash: function(e) {
			e.preventDefault();
		}
	});

	return BoxView;

});