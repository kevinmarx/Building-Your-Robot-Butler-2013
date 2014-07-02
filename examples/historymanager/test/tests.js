module('CareTaker', {
	setup: function() {
		this.careTaker = new Adobe.HistoryManager.CareTaker();
	},
	teardown: function() {
		this.careTaker = null;
	}
});

test('Undo manager should instantiate', 1, function() {
	ok(this.careTaker);
});

test('Undo manager should have undo function', 1, function() {
	ok(this.careTaker.undo);
});

test('Undo manager should have redo function', 1, function() {
	ok(this.careTaker.redo);
});

test('Undo manager should have addMemento function', 1, function() {
	ok(this.careTaker.addMemento);
});

test('Undo manager should call originator setMemento function on undo', 1, function() {
	var originator = {},
		memento = {};

	originator.createMemento = function() {};

	originator.setMemento = function(memento) {
		equal(memento.state.name, 'oompa');
	};

	memento.originator = originator;
	memento.state = {
		'name': 'oompa'
	};

	this.careTaker.addMemento(memento);
	this.careTaker.undo();

});

test('Undo manager should call originator setMemento function with the right state on undo', 1, function() {
	var originator = {},
		memento1 = {},
		memento2 = {};

	originator.createMemento = function() {};

	originator.setMemento = function(memento) {
		equal(memento.state.name, 'loompa');
	};

	memento1.originator = originator;
	memento1.state = {
		'name': 'oompa'
	};

	this.careTaker.addMemento(memento1);

	memento2.originator = originator;
	memento2.state = {
		'name': 'loompa'
	};

	this.careTaker.addMemento(memento2);
	this.careTaker.undo();

});

test('History manager should work with Backbone model', 2, function() {
	var originator = new Adobe.HistoryManager.Originator(),
		Model = Backbone.Model.extend({
			defaults: {
				'dude': 'fred'
			},
			initialize: function() {
				_.extend(this, originator);
			}
		}),
		model = new Model();

	this.careTaker.addMemento(model.createMemento());
	model.set({
		'dude': 'Bob'
	});
	this.careTaker.addMemento(model.createMemento());
	model.set({
		'dude': 'Jimmy'
	});
	this.careTaker.undo();
	equal(model.get('dude'), 'Bob', "Undo should restore previous state on model");
	this.careTaker.redo();
	equal(model.get('dude'), 'Jimmy', "Redo should restore previous undone state on model");
});

test('History manager should work with Backbone collection', 2, function() {
	var originator = new Adobe.HistoryManager.Originator(),
		Collection = Backbone.Collection.extend({
			initialize: function() {
				_.extend(this, originator);
			}
		}),
		collection = new Collection([{
			'dude': 'jimmy'
		}, {
			'dude': 'joe'
		}, {
			'dude': 'bob'
		}]);

	this.careTaker.addMemento(collection.createMemento());
	collection.reset([{
			'dude': 'tara'
		}, {
			'dude': 'jane'
		}, {
			'dude': 'ming'
		}]);
	this.careTaker.addMemento(collection.createMemento());
	collection.reset([{
			'dude': 'buck'
		}, {
			'dude': 'sumit'
		}, {
			'dude': 'dave'
		}]);
	this.careTaker.undo();
	equal(collection.at(2).get('dude'), 'ming', "Undo should restore previous state on model");
	this.careTaker.redo();
	equal(collection.at(2).get('dude'), 'dave', "Redo should restore previous undone state on model");
});

module('Originator', {
	setup: function() {
		this.originator = new Adobe.HistoryManager.Originator();
	},
	teardown: function() {
		this.originator = null;
	}
});

test('Originator should be instantiated', 1, function() {
	ok(this.originator);
});

test('Originator should have createMemento method', 1, function() {
	ok(this.originator.createMemento);
});

test('Originator should have setMemento method', 1, function() {
	ok(this.originator.setMemento);
});

test('Originator should mixin createMemento to object', 1, function() {
	var mixme = {};
	_.extend(mixme, this.originator);
	ok(mixme.createMemento);
});

test('Originator should mixin setMemento to object', 1, function() {
	var mixme = {};
	_.extend(mixme, this.originator);
	ok(mixme.setMemento);
});

module('Memento', {
	setup: function() {
		this.memento = new Adobe.HistoryManager.Memento({
			'originator': {
				'id': 1234
			},
			'state': {
				'name': 'fred'
			}
		});
	},
	teardown: function() {
		this.memento = null;
	}
});

test('Memento should be instantiated', 1, function() {
	ok(this.memento);
});

test('Memento should have getState method', 1, function() {
	ok(this.memento.getState);
});

test('Memento should have setState method', 1, function() {
	ok(this.memento.setState);
});

test('Memento should have getOriginator method', 1, function() {
	ok(this.memento.getOriginator);
});

test('Memento should have setOriginator method', 1, function() {
	ok(this.memento.setOriginator);
});

test('Memento should accept originator option at instantiation', 1, function() {
	deepEqual(this.memento.getOriginator(), {
		'id': 1234
	}, "Originator should match what was passed in to options at instantiation");
});

test('Memento should accept state option at instantiation', 1, function() {
	deepEqual(this.memento.getState(), {
		'name': 'fred'
	}, "State should match what was passed in to options at instantiation");
});

test('Memento should set id as expected', 1, function() {
	this.memento.setOriginator({
		'id': 4567
	});
	deepEqual(this.memento.getOriginator(), {
		'id': 4567
	}, "Originator should be set correctly");
});


test('Memento should set state as expected', 1, function() {
	this.memento.setState({
		'name': 'bob'
	});
	deepEqual(this.memento.getState(), {
		'name': 'bob'
	}, "State should be set correctly");
});