/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, maxerr: 50 */
/*global define: false, $: false, _: false, Backbone: false, require: false, console: false, Adobe: false */

define(function(require, exports, module) {
	'use strict';

	var BoxModel = Backbone.Model.extend({
		defaults: {
			'top': 0,
			'left': 0,
			'selected': false
		},
		initialize: function() {
			_.extend(this, new Adobe.HistoryManager.Originator());
		}
	});

	return BoxModel;

});