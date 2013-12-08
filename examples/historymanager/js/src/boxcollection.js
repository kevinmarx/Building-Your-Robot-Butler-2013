/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, require: false, console: false*/

define(function(require, exports, module) {
	'use strict';

	var BoxModel = require('src/boxmodel'),
		BoxCollection = Backbone.Collection.extend({
			model: BoxModel,
			selected: undefined,
			initialize: function() {
				_.bindAll(this, 'selectionChangeHandler');
				this.on('change:selected', this.selectionChangeHandler);
			},
			selectionChangeHandler: function(model) {
				if (this.selected) {
					this.selected.set({
						'selected': false
					});
				}
				this.selected = model;
			}
		});

	return BoxCollection;
});