/*global Backbone*/
(function ($) {
	'use strict';
    
    var StyleModel = Backbone.Model.extend();

    var PopperView = Backbone.View.extend({
        className: 'popper hidden',
        template: _.template($('.poppertemplate').html()),
        events: {
            'click .headerToggle': 'toggleCodeView'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        toggleCodeView: function (e) {
            var target = e.target;
            $(target).toggleClass('rotated');
            this.$el.find('.code').animate({
                'height': 'toggle'
            }, {
                duration: 200
            });
        }
    });

    var popperView = new PopperView({
        'model': new StyleModel({
            "regions": [{
                "label": "default",
                "color": "region-color-grey",
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
                "color": "region-color-purple",
                "data": {
                    "color": "#ff0000",
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
        })
    });

    $('body').append(popperView.render().el);

    var popper = $('.popper'),
		target, 
        position;

    $('.extractButton').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        target = $(e.target);
        attachPopup(target);
    });

    var attachPopup = function(target) {
            position = target.position();
            togglePopup();
            positionPopup();
        };

    var togglePopup = function() {
            var position = target.position();
            popper.toggleClass('hidden');
            popper.toggleClass('show');
        };

    var positionPopup = function() {
            var position = target.position(),
                //Have to figure out where to derive the right fudge from
                //  This the arrow tip in respect of the target middle
                fudge = 32,
                parentHeight = popper.parent().height(),
                popperBottom = position.top - popper.height() + fudge,
                popperHeight = popper.height(),
                newBooty = parentHeight - popperBottom - popperHeight;

            popper.css({
                'top': 'auto',
                'bottom': newBooty,
                'left': (position.left + target.outerWidth())
            });

        };

    $(window).resize(function() {
        positionPopup();
    });

})(jQuery);