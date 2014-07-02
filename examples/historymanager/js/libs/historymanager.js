var Adobe = {};

Adobe.HistoryManager = (function($) {
	'use strict';
	var self = {};

	var CareTaker = (function() {
		var self = {},
			undoStack = [],
			redoStack = [];

		self.addMemento = function(memento) {
			undoStack.push(memento);
		};

		self.undo = function() {
			if (undoStack.length) {
				var memento = undoStack.pop(),
					originator = memento.originator;

				if (originator && originator.setMemento && originator.createMemento) {
					redoStack.push(originator.createMemento());
					originator.setMemento(memento);
				}
			}
		};

		self.redo = function() {
			if (redoStack.length) {
				var memento = redoStack.pop(),
					originator = memento.originator;

				if (originator && originator.setMemento && originator.createMemento) {
					undoStack.push(originator.createMemento());
					originator.setMemento(memento);
				}
			}
		};

		return self;
	});

	self.CareTaker = CareTaker;

	var Originator = (function() {
		var self = {};

		self.createMemento = function() {
			var memento = {};
			memento.originator = this;
			memento.state = this.toJSON();
			return memento;
		};

		self.setMemento = function(memento) {
			var state = memento.state;

			if (this.set) {
				this.set(state);
			} else if (this.reset) {
				this.reset(state);
			} else {

			}

		};

		self.store = function() {
			this.trigger('store', this.createMemento());
		};

		return self;
	});

	self.Originator = Originator;

	var Memento = (function(options) {
		var self = {},
			originator = this,
			state = {};

		$.extend(self, options);

		self.getOriginator = function() {
			return this.originator;
		};

		self.setOriginator = function(originator) {
			if (originator) {
				this.originator = originator;
			}
		};

		self.getState = function() {
			return this.state;
		};

		self.setState = function(state) {
			if (state) {
				this.state = state;
			}
		};

		return self;
	});

	self.Memento = Memento;

	return self;

})(window.jQuery);
