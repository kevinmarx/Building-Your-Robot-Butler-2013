(function (global) {
    'use strict';
    
    var d = global.document,
        ResizeFrame = global.ResizeFrame = global.ResizeFrame || {},
        shimStyles = {
            'position': 'absolute',
            'top': 0,
            'right': 0,
            'bottom': 0,
            'left': 0,
            'background': 'transparent'
        },
        containerStyles = {
            'position': 'relative',
            'padding': '0',
            'margin': '0 auto',
            'width': '90%',
            'height': '100%',
            'user-select': 'none',
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none'
        },
        handleStyles = {
            'position': 'absolute',
            'right': '-25px',
            'top': '0',
            'background': 'transparent',
            'width': '25px',
            'height': '100%',
            'cursor': 'pointer'
        },

        setStyles = function setStyles(el, obj) {
            var prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    el.style[prop] = obj[prop];
                }
            }
        },

		createContainer = function createContainer(target) {
            var container = d.createElement('div');
            setStyles(container, containerStyles);
            if (target) {
	            target.appendChild(container);
            }
            return container;
        },

		createFrame = function createFrame(container, src) {
            var frame = d.createElement('iframe');
            frame.setAttribute('src', src);
            container.appendChild(frame);
            return frame;
        },

		createHandle = function createHandle(container) {
            var handle = d.createElement('div');
            setStyles(handle, handleStyles);
            container.appendChild(handle);
            return handle;
        },

        createShim = function createShim(container) {
            var shim = d.createElement('div');
            setStyles(shim, shimStyles);
            container.appendChild(shim);
            return shim;
        };

    ResizeFrame.createResizeFrame = function createResizeFrame(iframeSrc, targetSelector) {
        var target = targetSelector ? d.querySelector(targetSelector) : d.body,
            container = createContainer(target),
            frame = createFrame(container, iframeSrc),
            handle = createHandle(container),
            shim = createShim(container),
            offsetX = 0,

            mouseMoveHandler = function mouseMoveHandler(e) {
                var left = e.pageX - offsetX;
                handle.style['left'] = left + 'px';
                container.style['width'] = left + 'px';
            },
            
            mouseDownHandler = function mouseDownHandler(e) {
                global.addEventListener('mousemove', mouseMoveHandler);
                shim.style['display'] = 'block';
                offsetX = e.offsetX || e.layerX;
            },

			mouseUpHandler = function mouseUpHandler(e) {
                global.removeEventListener('mousemove', mouseMoveHandler);
                shim.style['display'] = 'none';
            };

        handle.addEventListener('mousedown', mouseDownHandler);
        global.addEventListener('mouseup', mouseUpHandler);
    };

}(this));
