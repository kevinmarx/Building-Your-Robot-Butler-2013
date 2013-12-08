/* 
    WARNING THERE BE DRAGONS
    This is proto-code written in 5 minutes to illustrate an approach
	DO NOT TRY AND USE THIS CODE 
*/
(function($) {

    $.fn.dragon = function(options) {
        var $this = this,
            startX = 0,
            startY = 0,
            offsetX = 0,
            offsetY = 0,
            settings = $.extend({
                'showMetrics': false
            }, options);
            

        var mousedownHandler = function(e) {
            startX = e.clientX;
            startY = e.clientY;
            offsetX = $this.css('marginLeft');
            offsetY = $this.css('marginTop');

            $this.css({
                'cursor': 'move'
            });

            document.onmousemove = mousemoveHandler;
            document.onmouseup = mouseupHandler;
            document.body.focus();
            document.onselectstart = function() {
                return false;
            };

            $this.ondragstart = function() {
                return false;
            };

        };

        var mousemoveHandler = function(e) {
            var newMarginLeft = parseInt(offsetX, 10) + e.clientX - startX;
            var newMarginTop = parseInt(offsetY, 10) + e.clientY - startY;

            if (newMarginLeft < 0) {
                newMarginLeft = 0;
            }

            if (newMarginTop < 0) {
                newMarginTop = 0;
            }

            $this.css({
                'marginLeft': newMarginLeft,
                'marginTop': newMarginTop
            });

            if (settings.showMetrics) {

                $this.children('.metrics').show();
                $this.children('p').html("Margin:<br/>top: " + newMarginTop + "<br/>Left: " + newMarginLeft);
                $this.children('.margintop').css({
                    'height': $this.css('margin-top'),
                    'width': $this.innerWidth(),
                    'top': $this.position().top
                });
                $this.children('.marginright').css({
                    'width': $this.css('margin-right'),
                    'height': $this.innerHeight(),
                    'right': $this.innerWidth()
                });
                $this.children('.marginleft').css({
                    'width': $this.css('margin-left'),
                    'height': $this.innerHeight(),
                    'left': $this.position().left
                });
                $this.children('.marginbottom').css({
                    'width': $this.innerWidth(),
                    'height': $this.css('margin-bottom')
                });
            }
        };

        var mouseupHandler = function(e) {
            $this.children('.metrics').hide();
            $this.css({
                'cursor': 'auto'
            });
            document.onmousemove = null;
            document.onmouseup = null;
            document.onselectstart = null;
            document.ondragstart = null;
        };

        this.bind('mousedown', mousedownHandler);

        return this;
    };

})(window.jQuery);
