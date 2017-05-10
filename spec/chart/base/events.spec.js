define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MouseEvents = (function () {
        function MouseEvents() {
        }
        MouseEvents.prototype.clickEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('click', true, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.mousedownEvent = function (element, sx, sy, cx, cy) {
            var mousedown = document.createEvent('MouseEvent');
            mousedown.initMouseEvent('mousedown', false, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(mousedown);
        };
        MouseEvents.prototype.mousemoveEvent = function (element, sx, sy, cx, cy) {
            var mousemove = document.createEvent('MouseEvent');
            mousemove.initMouseEvent('mousemove', true, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(mousemove);
        };
        MouseEvents.prototype.mouseupEvent = function (element, sx, sy, cx, cy) {
            var mouseup = document.createEvent('MouseEvent');
            mouseup.initMouseEvent('mouseup', true, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(mouseup);
        };
        MouseEvents.prototype.draganddropEvent = function (element, startX, startY, endX, endY) {
            this.mousedownEvent(element, 0, 0, startX, startY);
            this.mousemoveEvent(element, 0, 0, endX, endY);
            this.mouseupEvent(element, 0, 0, endX, endY);
        };
        MouseEvents.prototype.dragEvent = function (element, startX, startY, endX, endY) {
            this.mousedownEvent(element, 0, 0, startX, startY);
            this.mousemoveEvent(element, 0, 0, endX, endY);
        };
        MouseEvents.prototype.mouseLeaveEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('mouseleave', false, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.mouseoverEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('mouseover', false, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.mouseoutEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('mouseout', false, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.touchdraganddropEvent = function (chart, element, startX, startY, endX, endY) {
            chart.chartOnMouseDown(this.onTouchStart(element, 0, 0, startX, startY, startX, startY));
            chart.mouseMove(this.onTouchMove(element, 0, 0, startX, startY, endX, endY));
            chart.mouseEnd(this.onTouchEnd(element, 0, 0, startX, startY, endX, endY));
        };
        MouseEvents.prototype.onTouchStart = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchstart',
                touches: touches,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ]
            };
        };
        MouseEvents.prototype.onTouchEnd = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchend',
                touches: touches,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ]
            };
        };
        MouseEvents.prototype.doDoubleTab = function (elem, x1, y1, x2, y2, x3, y3, chart) {
            chart.chartOnMouseDown(this.onTouchStart(elem, x1, y1, null, null, x3, y3));
            chart.mouseEnd(this.onTouchEnd(elem, x1, y1, null, null, x3, y3));
            chart.chartOnMouseDown(this.onTouchStart(elem, x1, y1, null, null, x3, y3));
            chart.mouseEnd(this.onTouchEnd(elem, x1, y1, null, null, x3, y3));
        };
        MouseEvents.prototype.onTouchMove = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchmove',
                touches: touches,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ]
            };
        };
        MouseEvents.prototype.onTouchLeave = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchleave',
                touches: touches,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ]
            };
        };
        MouseEvents.prototype.onPointerStart = function (elem, x1, y1, pointerId) {
            return {
                target: elem,
                pageX: x1,
                pageY: y1, clientX: x1, clientY: y1,
                pointerId: pointerId,
                pointerType: 'touch'
            };
        };
        MouseEvents.prototype.onPointerMove = function (elem, x1, y1, pointerId) {
            return {
                target: elem,
                pageX: x1,
                pageY: y1, clientX: x1, clientY: y1,
                pointerId: pointerId,
                pointerType: 'touch'
            };
        };
        MouseEvents.prototype.onPointerEnd = function (elem, x1, y1, pointerId) {
            return {
                target: elem,
                pageX: x1,
                pageY: y1, clientX: x1, clientY: y1,
                pointerId: pointerId,
                pointerType: 'touch'
            };
        };
        MouseEvents.prototype.onPointerLeave = function (elem, x1, y1, pointerId) {
            return {
                target: elem,
                pageX: x1,
                pageY: y1, clientX: x1, clientY: y1,
                pointerId: pointerId,
                pointerType: 'touch'
            };
        };
        return MouseEvents;
    }());
    exports.MouseEvents = MouseEvents;
});
