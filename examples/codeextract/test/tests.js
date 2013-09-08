module('Model', {
  setup: function() {
    // setup for Model
    this.styleModel = new StyleModel();
  },
  teardown: function() {
    //teardown for Model
    this.styleModel = null;
  }
});

test('StyleModel should instantiate', 1, function() {
    ok(this.styleModel);
});

module('View', {
    setup: function() {
        // setup for View
        this.dummyData = {
            "regions": [{
                "label": "default",
                "data": {
                    "text-align": "center",
                    "position": "absolute",
                    "top": "0",
                    "left": "100px",
                    "min-width": "240px",
                    "background": [{
                        "background-color": "#dfe2e2"
                    }],
                    "box-shadow": [{
                        "h-shadow": 0,
                        "v-shadow": "9px",
                        "blur": "18px",
                        "spread": 0,
                        "color": "rgba(0,0,0,0.48)"
                    }, {
                        "h-shadow": 0,
                        "v-shadow": 0,
                        "blur": "3px",
                        "spread": "1px",
                        "color": "#fff",
                        "inset": "inset"
                    }],
                    "border": [{
                        "border-width": "1px",
                        "border-style": "solid",
                        "border-color": "#b7b7b7"
                    }],
                    "border-radius": "5px",
                    "z-index": "100"
                }
            }, {
                "label": "320",
                "data": {
                    "text-align": "center",
                    "position": "absolute",
                    "top": "0",
                    "left": "100px",
                    "min-width": "240px",
                    "background": [{
                        "background-color": "#dfe2e2"
                    }],
                    "box-shadow": [{
                        "h-shadow": 0,
                        "v-shadow": "9px",
                        "blur": "18px",
                        "spread": 0,
                        "color": "rgba(0,0,0,0.48)"
                    }, {
                        "h-shadow": 0,
                        "v-shadow": 0,
                        "blur": "3px",
                        "spread": "1px",
                        "color": "#fff",
                        "inset": "inset"
                    }],
                    "border": [{
                        "border-width": "1px",
                        "border-style": "solid",
                        "border-color": "#b7b7b7"
                    }],
                    "border-radius": "5px",
                    "z-index": "100"
                }
            }]
        };
    },
    teardown: function() {
        //teardown for View
        this.dummyData = null;
    }
});

test('Should parse dummy data correctly', 1, function() {
    equal(this.dummyData.regions[0].label, "default", "First region label should be default");
});

test('Should parse color properties correctly', 2, function() {
     var backgroundColor = "background-color",
         borderColor     = "border-color";
     ok(backgroundColor.indexOf("color") != -1);
     ok(borderColor.indexOf("color") != -1);
});





