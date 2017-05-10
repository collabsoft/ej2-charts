this["ej"] = this["ej"] || {}; this["ej"]["chartModule"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 75);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(5), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, util_1, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function measureText(text, font) {
        var htmlObject = document.getElementById('chartmeasuretext');
        if (htmlObject === null) {
            htmlObject = dom_1.createElement('text', { id: 'chartmeasuretext' });
            document.body.appendChild(htmlObject);
        }
        htmlObject.innerHTML = text;
        htmlObject.style.position = 'absolute';
        htmlObject.style.fontSize = font.size;
        htmlObject.style.fontWeight = font.fontWeight;
        htmlObject.style.fontStyle = font.fontStyle;
        htmlObject.style.fontFamily = font.fontFamily;
        htmlObject.style.visibility = 'hidden';
        htmlObject.style.top = '-100';
        htmlObject.style.left = '0';
        htmlObject.style.whiteSpace = 'nowrap';
        return new Size(htmlObject.clientWidth, htmlObject.clientHeight);
    }
    exports.measureText = measureText;
    function rotateTextSize(font, text, angle, chart) {
        var renderer = new ej2_base_1.SvgRenderer(chart.element.id);
        var box;
        var options;
        var htmlObject;
        options = {
            'font-size': font.size,
            'font-style': font.fontStyle,
            'font-family': font.fontFamily,
            'font-weight': font.fontWeight,
            'transform': 'rotate(' + angle + ', 0, 0)',
            'text-anchor': 'middle'
        };
        htmlObject = renderer.createText(options, text);
        chart.element.appendChild(chart.svgObject);
        chart.svgObject.appendChild(htmlObject);
        box = htmlObject.getBoundingClientRect();
        htmlObject.remove();
        chart.svgObject.remove();
        return new Size((box.right - box.left), (box.bottom - box.top));
    }
    exports.rotateTextSize = rotateTextSize;
    function removeElement(id) {
        var element = getElement(id);
        if (element) {
            dom_1.remove(element);
        }
    }
    exports.removeElement = removeElement;
    function logBase(value, base) {
        return Math.log(value) / Math.log(base);
    }
    exports.logBase = logBase;
    function inside(value, range) {
        return (value < range.max) && (value > range.min);
    }
    exports.inside = inside;
    function withIn(value, range) {
        return (value <= range.max) && (value >= range.min);
    }
    exports.withIn = withIn;
    function withInRange(previousPoint, currentPoint, nextPoint, series) {
        var mX2 = series.logWithIn(currentPoint.xValue, series.xAxis);
        var mX1 = previousPoint ? series.logWithIn(previousPoint.xValue, series.xAxis) : mX2;
        var mX3 = nextPoint ? series.logWithIn(nextPoint.xValue, series.xAxis) : mX2;
        var xStart = Math.floor(series.xAxis.visibleRange.min);
        var xEnd = Math.ceil(series.xAxis.visibleRange.max);
        return ((mX1 >= xStart && mX1 <= xEnd) || (mX2 >= xStart && mX2 <= xEnd) ||
            (mX3 >= xStart && mX3 <= xEnd) || (xStart >= mX1 && xStart <= mX3));
    }
    exports.withInRange = withInRange;
    function sum(values) {
        var sum = 0;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            sum += value;
        }
        return sum;
    }
    exports.sum = sum;
    function subtractThickness(rect, thickness) {
        rect.x += thickness.left;
        rect.y += thickness.top;
        rect.width -= thickness.left + thickness.right;
        rect.height -= thickness.top + thickness.bottom;
        return rect;
    }
    exports.subtractThickness = subtractThickness;
    function subArray(values, index) {
        var subArray = [];
        for (var i = 0; i <= index - 1; i++) {
            subArray.push(values[i]);
        }
        return subArray;
    }
    exports.subArray = subArray;
    function valueToCoefficient(value, axis) {
        var range = axis.visibleRange;
        return (value - range.min) / (range.delta);
    }
    exports.valueToCoefficient = valueToCoefficient;
    function createTooltip(id, text, top, left, fontSize) {
        var tooltip = this.getElement(id);
        var style = 'top:' + top.toString() + 'px;' +
            'left:' + left.toString() + 'px;' +
            'background:' + '#FFFFFF' + ';' +
            'position:absolute;border:1px solid #707070;font-size:' + fontSize + ';border-radius:2px;';
        if (!tooltip) {
            tooltip = dom_1.createElement('div', {
                id: id, innerHTML: '&nbsp;' + text + '&nbsp;', styles: style
            });
            document.body.appendChild(tooltip);
        }
        else {
            tooltip.setAttribute('innerHTML', '&nbsp;' + text + '&nbsp;');
            tooltip.setAttribute('styles', style);
        }
    }
    exports.createTooltip = createTooltip;
    function createZoomingLabels(chart, axis, parent, index, isVertical) {
        var margin = 5;
        var opposedPosition = axis.opposedPosition;
        var anchor = isVertical ? 'start' : 'auto';
        var size;
        var chartRect = chart.availableSize.width;
        var x;
        var y;
        var rx = 3;
        var arrowLocation;
        var rect = axis.rect;
        var direction;
        for (var i = 0; i < 2; i++) {
            size = this.measureText(i ? axis.endLabel : axis.startLabel, axis.labelStyle);
            if (isVertical) {
                arrowLocation = i ? new ChartLocation(rect.x, rect.y + rx) :
                    new ChartLocation(axis.rect.x, (rect.y + rect.height - rx));
                x = (rect.x + (opposedPosition ? (rect.width + margin) : -(size.width + margin + margin)));
                y = (rect.y + (i ? 0 : rect.height - size.height - margin));
                x += (x < 0 || ((chartRect) < (x + size.width + margin))) ? (opposedPosition ? -(size.width / 2) : size.width / 2) : 0;
                direction = this.findDirection(rx, rx, new Rect(x, y, size.width + margin, size.height + margin), arrowLocation, margin, false, false, !opposedPosition, arrowLocation.x, arrowLocation.y + (i ? -rx : rx));
            }
            else {
                arrowLocation = i ? new ChartLocation((rect.x + rect.width - rx), (rect.y + rect.height)) :
                    new ChartLocation(rect.x + rx, (rect.y + rect.height));
                x = (rect.x + (i ? (rect.width - size.width - margin) : 0));
                y = (opposedPosition ? (rect.y - size.height - 10) : (rect.y + rect.height + margin));
                direction = this.findDirection(rx, rx, new Rect(x, y, size.width + margin, size.height + margin), arrowLocation, margin, opposedPosition, !opposedPosition, false, arrowLocation.x + (i ? rx : -rx), arrowLocation.y);
            }
            x = x + (margin / 2);
            y = y + (3 * (size.height / 4)) + (margin / 2);
            parent.appendChild(chart.renderer.drawPath(new PathOption(chart.element.id + '_Zoom_' + index + '_AxisLabel_Shape_' + i, '#414141', 2, '#414141', 1, null, direction)));
            this.textElement(new TextOption(chart.element.id + '_Zoom_' + index + '_AxisLabel_' + i, x, y, anchor, i ? axis.endLabel : axis.startLabel), { color: 'white', fontFamily: 'Segoe UI', fontWeight: 'Regular', size: '11px' }, 'white', parent);
        }
        return parent;
    }
    exports.createZoomingLabels = createZoomingLabels;
    function getPoint(xValue, yValue, series) {
        var xLength = series.xAxis.rect.width;
        var yLength = series.yAxis.rect.height;
        xValue = (series.xAxis.valueType === 'Logarithmic' ? logBase(xValue, series.xAxis.logBase) : xValue);
        yValue = (series.yAxis.valueType === 'Logarithmic' ?
            logBase(yValue === 0 ? 1 : yValue, series.yAxis.logBase) : yValue);
        xValue = this.valueToCoefficient(xValue, series.xAxis);
        yValue = this.valueToCoefficient(yValue, series.yAxis);
        xValue = xValue * xLength;
        yValue = (1 - yValue) * yLength;
        return new ChartLocation(xValue, yValue);
    }
    exports.getPoint = getPoint;
    function withInBounds(x, y, bounds, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        return (x >= bounds.x - width && x <= bounds.x + bounds.width + width && y >= bounds.y - height
            && y <= bounds.y + bounds.height + height);
    }
    exports.withInBounds = withInBounds;
    function getValueXByPoint(value, size, axis) {
        return (value / size) * (axis.visibleRange.delta) + axis.visibleRange.min;
    }
    exports.getValueXByPoint = getValueXByPoint;
    function getValueYByPoint(value, size, axis) {
        return Math.abs(1 - (value / size)) * (axis.visibleRange.delta) + axis.visibleRange.min;
    }
    exports.getValueYByPoint = getValueYByPoint;
    function findClipRect(series) {
        var rect = series.clipRect;
        if (series.chart.requireInvertedAxis) {
            rect.x = series.yAxis.rect.x;
            rect.y = series.xAxis.rect.y;
            rect.width = series.yAxis.rect.width;
            rect.height = series.xAxis.rect.height;
        }
        else {
            rect.x = series.xAxis.rect.x;
            rect.y = series.yAxis.rect.y;
            rect.width = series.xAxis.rect.width;
            rect.height = series.yAxis.rect.height;
        }
    }
    exports.findClipRect = findClipRect;
    function firstToLowerCase(str) {
        return str.substr(0, 1).toLowerCase() + str.substr(1);
    }
    exports.firstToLowerCase = firstToLowerCase;
    function getMinPointsDelta(axis, seriesCollection) {
        var minDelta = Number.MAX_VALUE;
        var xValues;
        var minVal;
        seriesCollection.forEach(function (series, index) {
            xValues = [];
            if (series.visible &&
                (axis.name === series.xAxisName || (axis.name === 'primaryXAxis' && series.xAxisName === null)
                    || (axis.name === series.chart.primaryXAxis.name && !series.xAxisName))) {
                xValues = series.points.map(function (point, index) {
                    return point.xValue;
                });
                xValues.sort(function (first, second) { return first - second; });
                if (xValues.length === 1) {
                    minVal = xValues[0] - ((series.xMin && series.xAxis.valueType !== 'DateTime') ?
                        series.xMin : axis.visibleRange.min);
                    if (minVal !== 0) {
                        minDelta = Math.min(minDelta, minVal);
                    }
                }
                else {
                    xValues.forEach(function (value, index, xValues) {
                        if (index > 0 && value) {
                            minVal = value - xValues[index - 1];
                            if (minVal !== 0) {
                                minDelta = Math.min(minDelta, minVal);
                            }
                        }
                    });
                }
            }
        });
        if (minDelta === Number.MAX_VALUE) {
            minDelta = 1;
        }
        return minDelta;
    }
    exports.getMinPointsDelta = getMinPointsDelta;
    function getAnimationFunction(effect) {
        var functionName;
        switch (effect) {
            case 'Linear':
                functionName = linear;
                break;
        }
        return functionName;
    }
    exports.getAnimationFunction = getAnimationFunction;
    function linear(currentTime, startValue, endValue, duration) {
        return -endValue * Math.cos(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
    }
    exports.linear = linear;
    function markerAnimate(element, delay, duration, series, pointIndex, point, isLabel) {
        var centerX = point.x;
        var centerY = point.y;
        var height = 0;
        element.style.visibility = 'hidden';
        new ej2_base_1.Animation({}).animate(element, {
            duration: duration,
            delay: delay,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    args.element.style.visibility = 'visible';
                    height = ((args.timeStamp - args.delay) / args.duration);
                    element.setAttribute('transform', 'translate(' + centerX
                        + ' ' + centerY + ') scale(' + height + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                }
            },
            end: function (model) {
                element.style.visibility = 'visible';
                element.removeAttribute('transform');
                if ((series.type === 'Scatter') && !isLabel && (pointIndex === series.points.length - 1)) {
                    series.chart.trigger('animationComplete', { series: series });
                }
            }
        });
    }
    exports.markerAnimate = markerAnimate;
    function drawSymbol(location, shape, size, url, options, label) {
        var functionName = 'Path';
        var renderer = new ej2_base_1.SvgRenderer('');
        var temp = this.calculateShapes(location, size, shape, options, url);
        var htmlObject = renderer['draw' + temp.functionName](temp.renderOption);
        htmlObject.setAttribute('aria-label', label);
        return htmlObject;
    }
    exports.drawSymbol = drawSymbol;
    function calculateShapes(location, size, shape, options, url) {
        var path;
        var functionName = 'Path';
        var width = size.width;
        var height = size.height;
        var locX = location.x;
        var locY = location.y;
        var x = location.x + (-width / 2);
        var y = location.y + (-height / 2);
        switch (shape) {
            case 'Circle':
                functionName = 'Ellipse';
                util_1.merge(options, { 'rx': width / 2, 'ry': height / 2, 'cx': locX, 'cy': locY });
                break;
            case 'Cross':
                path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                    'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' +
                    (locY + (-height / 2));
                util_1.merge(options, { 'd': path });
                break;
            case 'HorizontalLine':
                path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY;
                util_1.merge(options, { 'd': path });
                break;
            case 'VerticalLine':
                path = 'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' + (locY + (-height / 2));
                util_1.merge(options, { 'd': path });
                break;
            case 'Diamond':
                path = 'M' + ' ' + x + ' ' + locY + ' ' +
                    'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                    'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + x + ' ' + locY + ' z';
                util_1.merge(options, { 'd': path });
                break;
            case 'Rectangle':
                path = 'M' + ' ' + x + ' ' + (locY + (-height / 2)) + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (-height / 2)) + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + x + ' ' + (locY + (-height / 2)) + ' z';
                util_1.merge(options, { 'd': path });
                break;
            case 'Triangle':
                path = 'M' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' z';
                util_1.merge(options, { 'd': path });
                break;
            case 'InvertedTriangle':
                path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                    'L' + ' ' + (locX - (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' z';
                util_1.merge(options, { 'd': path });
                break;
            case 'Pentagon':
                var eq = 72;
                var xValue = void 0;
                var yValue = void 0;
                for (var i = 0; i <= 5; i++) {
                    xValue = (width / 2) * Math.cos((Math.PI / 180) * (i * eq));
                    yValue = (height / 2) * Math.sin((Math.PI / 180) * (i * eq));
                    if (i === 0) {
                        path = 'M' + ' ' + (locX + xValue) + ' ' + (locY + yValue) + ' ';
                    }
                    else {
                        path = path.concat('L' + ' ' + (locX + xValue) + ' ' + (locY + yValue) + ' ');
                    }
                }
                path = path.concat('Z');
                util_1.merge(options, { 'd': path });
                break;
            case 'Image':
                functionName = 'Image';
                util_1.merge(options, { 'href': url, 'height': height, 'width': width, x: x, y: y });
                break;
        }
        options = this.calculateLegendShapes(location, new Size(width, height), shape, options).renderOption;
        return { renderOption: options, functionName: functionName };
    }
    exports.calculateShapes = calculateShapes;
    function getRectLocation(startLocation, endLocation, outerRect) {
        var x;
        var y;
        x = (endLocation.x < outerRect.x) ? outerRect.x :
            (endLocation.x > (outerRect.x + outerRect.width)) ? outerRect.x + outerRect.width : endLocation.x;
        y = (endLocation.y < outerRect.y) ? outerRect.y :
            (endLocation.y > (outerRect.y + outerRect.height)) ? outerRect.y + outerRect.height : endLocation.y;
        return new Rect((x > startLocation.x ? startLocation.x : x), (y > startLocation.y ? startLocation.y : y), Math.abs(x - startLocation.x), Math.abs(y - startLocation.y));
    }
    exports.getRectLocation = getRectLocation;
    function minMax(value, min, max) {
        return value > max ? max : (value < min ? min : value);
    }
    exports.minMax = minMax;
    function getElement(id) {
        return document.getElementById(id);
    }
    exports.getElement = getElement;
    function getDraggedRectLocation(x1, y1, x2, y2, outerRect) {
        var width = Math.abs(x1 - x2);
        var height = Math.abs(y1 - y2);
        var x = Math.max(this.checkBounds(Math.min(x1, x2), width, outerRect.x, outerRect.width), outerRect.x);
        var y = Math.max(this.checkBounds(Math.min(y1, y2), height, outerRect.y, outerRect.height), outerRect.y);
        return new Rect(x, y, Math.min(width, outerRect.width), Math.min(height, outerRect.height));
    }
    exports.getDraggedRectLocation = getDraggedRectLocation;
    function checkBounds(start, size, min, max) {
        if (start < min) {
            start = min;
        }
        else if ((start + size) > (max + min)) {
            start = (max + min) - size;
        }
        return start;
    }
    exports.checkBounds = checkBounds;
    function getLabelText(currentPoint, labelFormat, chart) {
        var text;
        var customLabelFormat = labelFormat.match('{value}') !== null;
        var skeleton = customLabelFormat ? '' : labelFormat;
        var numberFormat = chart.intl.getNumberFormat({ format: skeleton });
        text = currentPoint.text || currentPoint.yValue.toString();
        if (labelFormat) {
            text = customLabelFormat ? labelFormat.replace('{value}', numberFormat(currentPoint.y)) :
                numberFormat(currentPoint.y);
        }
        return text;
    }
    exports.getLabelText = getLabelText;
    function stopTimer(timer) {
        window.clearInterval(timer);
    }
    exports.stopTimer = stopTimer;
    function isCollide(currentRect, collections) {
        var isCollide;
        isCollide = collections.some(function (rect) {
            return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
                currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
        });
        return isCollide;
    }
    exports.isCollide = isCollide;
    function calculateRect(location, textSize, margin) {
        return new Rect((location.x - (textSize.width / 2) - margin.left), (location.y - (textSize.height / 2) - margin.top), textSize.width + margin.left + margin.right, textSize.height + margin.top + margin.bottom);
    }
    exports.calculateRect = calculateRect;
    function convertToHexCode(value) {
        return '#' + this.componentToHex(value.r) + this.componentToHex(value.g) + this.componentToHex(value.b);
    }
    exports.convertToHexCode = convertToHexCode;
    function componentToHex(value) {
        var hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    exports.componentToHex = componentToHex;
    function convertHexToColor(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
            new ColorValue(255, 255, 255);
    }
    exports.convertHexToColor = convertHexToColor;
    function colorNameToHex(color) {
        var element;
        color = color === 'transparent' ? 'white' : color;
        element = document.getElementById('chartmeasuretext');
        element.style.color = color;
        color = window.getComputedStyle(element).color;
        var exp = /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/;
        var isRGBValue = exp.exec(color);
        return this.convertToHexCode(new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10)));
    }
    exports.colorNameToHex = colorNameToHex;
    function calculateLegendShapes(location, size, shape, options) {
        var padding = 10;
        var path = '';
        var height = size.height;
        var width = size.width;
        var locX = location.x;
        var locY = location.y;
        switch (shape) {
            case 'Line':
                path = 'M' + ' ' + (locX + (-width / 2)) + ' ' + (locY) + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY);
                util_1.merge(options, { 'd': path });
                break;
            case 'StepLine':
                options.fill = 'transparent';
                path = 'M' + ' ' + (locX + (-width / 2) - (padding / 4)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX +
                    (-width / 2) + (width / 10)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX + (-width / 2) + (width / 10))
                    + ' ' + (locY) + ' ' + 'L' + ' ' + (locX + (-width / 10)) + ' ' + (locY) + ' ' + 'L' + ' ' + (locX + (-width / 10))
                    + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX + (width / 5)) + ' ' + (locY + (height / 2)) + ' ' + 'L' +
                    ' ' + (locX + (width / 5)) + ' ' + (locY + (-height / 2)) + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + (locY +
                    (-height / 2)) + 'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + '' + (locX + (width / 2)
                    + (padding / 4)) + ' ' + (locY + (height / 2));
                util_1.merge(options, { 'd': path });
                break;
            case 'RightArrow':
                path = 'M' + ' ' + (locX + (-width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + (width / 2)) + ' ' + (locY) + ' ' + 'L' + ' ' +
                    (locX + (-width / 2)) + ' ' + (locY + (height / 2));
                util_1.merge(options, { 'd': path });
                break;
            case 'LeftArrow':
                path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                    'L' + ' ' + (locX + (-width / 2)) + ' ' + (locY) + ' ' + 'L' + ' ' +
                    (locX + (width / 2)) + ' ' + (locY + (height / 2));
                util_1.merge(options, { 'd': path });
                break;
            case 'Column':
            case 'StackingColumn':
                path = 'M' + ' ' + (locX - 3 * (width / 5)) + ' ' + (locY - (height / 5)) + ' ' + 'L' + ' ' +
                    (locX + 3 * (-width / 10)) + ' ' + (locY - (height / 5)) + ' ' + 'L' + ' ' +
                    (locX + 3 * (-width / 10)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX - 3 *
                    (width / 5)) + ' ' + (locY + (height / 2)) + ' ' + 'Z' + ' ' + 'M' + ' ' +
                    (locX + (-width / 10) - (width / 20)) + ' ' + (locY - (height / 4) - (padding / 2))
                    + ' ' + 'L' + ' ' + (locX + (width / 10) + (width / 20)) + ' ' + (locY - (height / 4) -
                    (padding / 2)) + ' ' + 'L' + ' ' + (locX + (width / 10) + (width / 20)) + ' ' + (locY
                    + (height / 2)) + ' ' + 'L' + ' ' + (locX + (-width / 10) - (width / 20)) + ' ' + (locY +
                    (height / 2)) + ' ' + 'Z' + ' ' + 'M' + ' ' + (locX + 3 * (width / 10)) + ' ' + (locY) + ' ' +
                    'L' + ' ' + (locX + 3 * (width / 5)) + ' ' + (locY) + ' ' + 'L' + ' '
                    + (locX + 3 * (width / 5)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' '
                    + (locX + 3 * (width / 10)) + ' ' + (locY + (height / 2)) + ' ' + 'Z';
                util_1.merge(options, { 'd': path });
                break;
            case 'Bar':
            case 'StackingBar':
                path = 'M' + ' ' + (locX + (-width / 2) + (-padding / 4)) + ' ' + (locY - 3 * (height / 5)) + ' '
                    + 'L' + ' ' + (locX + 3 * (width / 10)) + ' ' + (locY - 3 * (height / 5)) + ' ' + 'L' + ' ' +
                    (locX + 3 * (width / 10)) + ' ' + (locY - 3 * (height / 10)) + ' ' + 'L' + ' ' +
                    (locX - (width / 2) + (-padding / 4)) + ' ' + (locY - 3 * (height / 10)) + ' ' + 'Z' + ' '
                    + 'M' + ' ' + (locX + (-width / 2) + (-padding / 4)) + ' ' + (locY - (height / 5)
                    + (padding / 20)) + ' ' + 'L' + ' ' + (locX + (width / 2) + (padding / 4)) + ' ' + (locY
                    - (height / 5) + (padding / 20)) + ' ' + 'L' + ' ' + (locX + (width / 2) + (padding / 4))
                    + ' ' + (locY + (height / 10) + (padding / 20)) + ' ' + 'L' + ' ' + (locX - (width / 2)
                    + (-padding / 4)) + ' ' + (locY + (height / 10) + (padding / 20)) + ' ' + 'Z' + ' ' + 'M'
                    + ' ' + (locX - (width / 2) + (-padding / 4)) + ' ' + (locY + (height / 5)
                    + (padding / 10)) + ' ' + 'L' + ' ' + (locX + (-width / 4)) + ' ' + (locY + (height / 5)
                    + (padding / 10)) + ' ' + 'L' + ' ' + (locX + (-width / 4)) + ' ' + (locY + (height / 2)
                    + (padding / 10)) + ' ' + 'L' + ' ' + (locX - (width / 2) + (-padding / 4))
                    + ' ' + (locY + (height / 2) + (padding / 10)) + ' ' + 'Z';
                util_1.merge(options, { 'd': path });
                break;
            case 'Spline':
                options.fill = 'transparent';
                path = 'M' + ' ' + (locX - (width / 2)) + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' '
                    + locX + ' ' + (locY - height) + ' ' + locX + ' ' + (locY + (height / 5))
                    + ' ' + 'M' + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + (locX
                    + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' + (locX + (width / 2)) + ' '
                    + (locY - (height / 2));
                util_1.merge(options, { 'd': path });
                break;
            case 'Area':
            case 'StackingArea':
                path = 'M' + ' ' + (locX - (width / 2) - (padding / 4)) + ' ' + (locY + (height / 2))
                    + ' ' + 'L' + ' ' + (locX + (-width / 4) + (-padding / 8)) + ' ' + (locY - (height / 2))
                    + ' ' + 'L' + ' ' + (locX) + ' ' + (locY + (height / 4)) + ' ' + 'L' + ' ' + (locX
                    + (width / 4) + (padding / 8)) + ' ' + (locY + (-height / 2) + (height / 4)) + ' '
                    + 'L' + ' ' + (locX + (height / 2) + (padding / 4)) + ' ' + (locY + (height / 2)) + ' ' + 'Z';
                util_1.merge(options, { 'd': path });
                break;
            case 'SplineArea':
                path = 'M' + ' ' + (locX - (width / 2)) + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + locX
                    + ' ' + (locY - height) + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Z' + ' ' + 'M'
                    + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + (locX + (width / 2)) + ' '
                    + (locY + (height / 2)) + ' ' + (locX + (width / 2)) + ' '
                    + (locY - (height / 2)) + ' ' + ' Z';
                util_1.merge(options, { 'd': path });
                break;
        }
        return { renderOption: options };
    }
    exports.calculateLegendShapes = calculateLegendShapes;
    function textTrim(maxWidth, text, font) {
        var label = text;
        var size = this.measureText(text, font).width;
        if (size > maxWidth) {
            var textLength = text.length;
            for (var i = textLength - 1; i >= 0; --i) {
                label = text.substring(0, i) + '...';
                size = this.measureText(label, font).width;
                if (size <= maxWidth) {
                    return label;
                }
            }
        }
        return label;
    }
    exports.textTrim = textTrim;
    function stringToNumber(value, containerSize) {
        if (value !== null && value !== undefined) {
            return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
        }
        return null;
    }
    exports.stringToNumber = stringToNumber;
    function findDirection(rX, rY, rect, arrowLocation, arrowPadding, top, bottom, left, tipX, tipY) {
        var direction = '';
        var startX = rect.x;
        var startY = rect.y;
        var width = rect.x + rect.width;
        var height = rect.y + rect.height;
        if (top) {
            direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
                + startY + ' ' + (startX + rX) + ' ' + startY + ' ' +
                ' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + width + ' '
                + startY + ' ' + (width) + ' ' + (startY + rY));
            direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' '
                + (height) + ' ' + (width - rX) + ' ' + (height));
            if (arrowPadding !== 0) {
                direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding / 2) + ' ' + (height));
                direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (height + arrowPadding));
            }
            if ((arrowLocation.x - arrowPadding / 2) > startX) {
                direction = direction.concat(' L' + ' ' + (arrowLocation.x - arrowPadding / 2) + ' ' + height +
                    ' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                    + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
            }
            else {
                if (arrowPadding === 0) {
                    direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                        + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
                }
                else {
                    direction = direction.concat(' L' + ' ' + (startX) + ' ' + (height + rY) + ' z');
                }
            }
        }
        else if (bottom) {
            direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
                + (startY) + ' ' + (startX + rX) + ' ' + (startY) + ' L' + ' ' + (arrowLocation.x - arrowPadding / 2) + ' ' + (startY));
            direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (arrowLocation.y));
            direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding / 2) + ' ' + (startY) + ' L' + ' '
                + (width - rX) + ' ' + (startY) + ' Q ' + (width) + ' ' + (startY) + ' ' + (width) + ' ' + (startY + rY));
            direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + (width) + ' '
                + (height) + ' ' + (width - rX) + ' ' + (height) +
                ' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + (startX) + ' '
                + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
        }
        else if (left) {
            direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
                + (startY) + ' ' + (startX + rX) + ' ' + (startY));
            direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + (width) + ' '
                + (startY) + ' ' + (width) + ' ' + (startY + rY) + ' L' + ' ' + (width) + ' ' + (arrowLocation.y - arrowPadding / 2));
            direction = direction.concat(' L' + ' ' + (width + arrowPadding) + ' ' + (tipY));
            direction = direction.concat(' L' + ' ' + (width) + ' ' + (arrowLocation.y + arrowPadding / 2) +
                ' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' ' + (height) + ' ' + (width - rX) + ' ' + (height));
            direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + startX + ' '
                + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
        }
        else {
            direction = direction.concat('M' + ' ' + (startX + rX) + ' ' + (startY) + ' Q ' + (startX) + ' '
                + (startY) + ' ' + (startX) + ' ' + (startY + rY) + ' L' + ' ' + (startX) + ' ' + (arrowLocation.y - arrowPadding / 2));
            direction = direction.concat(' L' + ' ' + (startX - arrowPadding) + ' ' + (tipY));
            direction = direction.concat(' L' + ' ' + (startX) + ' ' + (arrowLocation.y + arrowPadding / 2) +
                ' L' + ' ' + (startX) + ' ' + (height - rY) + ' Q ' + startX + ' '
                + (height) + ' ' + (startX + rX) + ' ' + (height));
            direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (height) + ' Q ' + width + ' '
                + (height) + ' ' + (width) + ' ' + (height - rY) +
                ' L' + ' ' + (width) + ' ' + (startY + rY) + ' Q ' + width + ' '
                + (startY) + ' ' + (width - rX) + ' ' + (startY) + ' z');
        }
        return direction;
    }
    exports.findDirection = findDirection;
    function textElement(options, font, color, parent) {
        var renderOptions = {};
        var htmlObject;
        var renderer = new ej2_base_1.SvgRenderer('');
        renderOptions = {
            'id': options.id,
            'x': options.x,
            'y': options.y,
            'fill': color,
            'font-size': font.size,
            'font-style': font.fontStyle,
            'font-family': font.fontFamily,
            'font-weight': font.fontWeight,
            'text-anchor': options.anchor,
            'transform': options.transform,
            'opacity': font.opacity,
            'dominant-baseline': options.baseLine,
        };
        htmlObject = renderer.createText(renderOptions, options.text);
        parent.appendChild(htmlObject);
        return htmlObject;
    }
    exports.textElement = textElement;
    var CustomizeOption = (function () {
        function CustomizeOption(id) {
            this.id = id;
        }
        return CustomizeOption;
    }());
    exports.CustomizeOption = CustomizeOption;
    var StackValues = (function () {
        function StackValues(startValue, endValue) {
            this.startValues = startValue;
            this.endValues = endValue;
        }
        return StackValues;
    }());
    exports.StackValues = StackValues;
    var TextOption = (function (_super) {
        __extends(TextOption, _super);
        function TextOption(id, x, y, anchor, text, transform, baseLine) {
            if (transform === void 0) { transform = ''; }
            var _this = _super.call(this, id) || this;
            _this.transform = '';
            _this.baseLine = 'auto';
            _this.x = x;
            _this.y = y;
            _this.anchor = anchor;
            _this.text = text;
            _this.transform = transform;
            _this.baseLine = baseLine;
            return _this;
        }
        return TextOption;
    }(CustomizeOption));
    exports.TextOption = TextOption;
    var PathOption = (function (_super) {
        __extends(PathOption, _super);
        function PathOption(id, fill, width, color, opacity, dashArray, d) {
            var _this = _super.call(this, id) || this;
            _this.opacity = opacity;
            _this.fill = fill;
            _this.stroke = color;
            _this['stroke-width'] = width;
            _this['stroke-dasharray'] = dashArray;
            _this.d = d;
            return _this;
        }
        return PathOption;
    }(CustomizeOption));
    exports.PathOption = PathOption;
    var RectOption = (function (_super) {
        __extends(RectOption, _super);
        function RectOption(id, fill, border, opacity, rect, rx, ry, transform, dashArray) {
            var _this = _super.call(this, id, fill, border.width, border.color, opacity, dashArray) || this;
            _this.y = rect.y;
            _this.x = rect.x;
            _this.height = rect.height;
            _this.width = rect.width;
            _this.rx = rx ? rx : 0;
            _this.ry = ry ? ry : 0;
            _this.transform = transform ? transform : '';
            return _this;
        }
        return RectOption;
    }(PathOption));
    exports.RectOption = RectOption;
    var CircleOption = (function (_super) {
        __extends(CircleOption, _super);
        function CircleOption(id, fill, border, opacity, cx, cy, r) {
            var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
            _this.cy = cy;
            _this.cx = cx;
            _this.r = r;
            return _this;
        }
        return CircleOption;
    }(PathOption));
    exports.CircleOption = CircleOption;
    var PolygonOption = (function () {
        function PolygonOption(id, points, fill) {
            this.id = id;
            this.points = points;
            this.fill = fill;
        }
        return PolygonOption;
    }());
    exports.PolygonOption = PolygonOption;
    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    }());
    exports.Size = Size;
    var Rect = (function () {
        function Rect(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        return Rect;
    }());
    exports.Rect = Rect;
    var ChartLocation = (function () {
        function ChartLocation(x, y) {
            this.x = x;
            this.y = y;
        }
        return ChartLocation;
    }());
    exports.ChartLocation = ChartLocation;
    var Thickness = (function () {
        function Thickness(left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
        return Thickness;
    }());
    exports.Thickness = Thickness;
    var ColorValue = (function () {
        function ColorValue(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        return ColorValue;
    }());
    exports.ColorValue = ColorValue;
    var PointData = (function () {
        function PointData(point, series, isRemove) {
            if (isRemove === void 0) { isRemove = true; }
            this.point = point;
            this.series = series;
            this.isRemove = isRemove;
        }
        return PointData;
    }());
    exports.PointData = PointData;
    var TextCollection = (function () {
        function TextCollection(text, width, height) {
            this.text = text;
            this.width = width;
            this.height = height;
        }
        return TextCollection;
    }());
    exports.TextCollection = TextCollection;
    var ControlPoints = (function () {
        function ControlPoints(controlPoint1, controlPoint2) {
            this.controlPoint1 = controlPoint1;
            this.controlPoint2 = controlPoint2;
        }
        return ControlPoints;
    }());
    exports.ControlPoints = ControlPoints;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createInstance;
/* harmony export (immutable) */ __webpack_exports__["l"] = setImmediate;
/* harmony export (immutable) */ __webpack_exports__["f"] = getValue;
/* harmony export (immutable) */ __webpack_exports__["g"] = setValue;
/* harmony export (immutable) */ __webpack_exports__["h"] = deleteObject;
/* unused harmony export isObject */
/* unused harmony export getEnumValue */
/* harmony export (immutable) */ __webpack_exports__["e"] = merge;
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;
/* harmony export (immutable) */ __webpack_exports__["b"] = isNullOrUndefined;
/* harmony export (immutable) */ __webpack_exports__["d"] = isUndefined;
/* harmony export (immutable) */ __webpack_exports__["m"] = getUniqueID;
/* harmony export (immutable) */ __webpack_exports__["j"] = debounce;
/* unused harmony export queryParams */
/* unused harmony export isObjectArray */
/* harmony export (immutable) */ __webpack_exports__["k"] = compareElementParent;
/* harmony export (immutable) */ __webpack_exports__["i"] = throwError;
/* unused harmony export print */
/* unused harmony export formatUnit */
/* unused harmony export getInstance */
/* unused harmony export addInstance */
var instances = 'ej2_instances';
var uid = 0;
function createInstance(classFunction, params) {
    var arrayParam = params;
    arrayParam.unshift(undefined);
    return new (Function.prototype.bind.apply(classFunction, arrayParam));
}
function setImmediate(handler) {
    var unbind;
    var num = new Uint16Array(5);
    var intCrypto = window.msCrypto || window.crypto;
    intCrypto.getRandomValues(num);
    var secret = 'ej2' + combineArray(num);
    var messageHandler = function (event) {
        if (event.source === window && typeof event.data === 'string' && event.data.length <= 32 && event.data === secret) {
            handler();
            unbind();
        }
    };
    window.addEventListener('message', messageHandler, false);
    window.postMessage(secret, '*');
    return unbind = function () {
        window.removeEventListener('message', messageHandler);
    };
}
function getValue(nameSpace, obj) {
    var value = obj;
    var splits = nameSpace.split('.');
    for (var i = 0; i < splits.length && !isUndefined(value); i++) {
        value = value[splits[i]];
    }
    return value;
}
function setValue(nameSpace, value, obj) {
    var keys = nameSpace.split('.');
    var start = obj || {};
    var fromObj = start;
    var i;
    var length = keys.length;
    var key;
    for (i = 0; i < length; i++) {
        key = keys[i];
        if (i + 1 === length) {
            fromObj[key] = value === undefined ? {} : value;
        }
        else if (isNullOrUndefined(fromObj[key])) {
            fromObj[key] = {};
        }
        fromObj = fromObj[key];
    }
    return start;
}
function deleteObject(obj, key) {
    delete obj[key];
}
function isObject(obj) {
    var objCon = {};
    return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
}
function getEnumValue(enumObject, enumValue) {
    return enumObject[enumValue];
}
function merge(source, destination) {
    if (!isNullOrUndefined(destination)) {
        var temrObj = source;
        var tempProp = destination;
        var keys = Object.keys(destination);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            temrObj[key] = tempProp[key];
        }
    }
}
function extend(copied, first, second, deep) {
    var result = copied || {};
    var length = arguments.length;
    if (deep) {
        length = length - 1;
    }
    var _loop_1 = function (i) {
        if (!arguments_1[i]) {
            return "continue";
        }
        var obj1 = arguments_1[i];
        Object.keys(obj1).forEach(function (key) {
            var src = result[key];
            var copy = obj1[key];
            var clone;
            if (deep && isObject(copy)) {
                clone = isObject(src) ? src : {};
                result[key] = extend({}, clone, copy, true);
            }
            else {
                result[key] = copy;
            }
        });
    };
    var arguments_1 = arguments;
    for (var i = 1; i < length; i++) {
        _loop_1(i);
    }
    return result;
}
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
function isUndefined(value) {
    return ('undefined' === typeof value);
}
function getUniqueID(definedName) {
    return definedName + '_' + uid++;
}
function debounce(eventFunction, delay) {
    var _this = this;
    var out;
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var args = arg[0];
        var later = function () {
            out = null;
            return eventFunction.call(_this, args);
        };
        clearTimeout(out);
        out = setTimeout(later, delay);
    };
}
function queryParams(data) {
    var array = [];
    var keys = Object.keys(data);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        array.push(encodeURIComponent(key) + '=' + encodeURIComponent('' + data[key]));
    }
    return array.join('&');
}
function isObjectArray(value) {
    var parser = Object.prototype.toString;
    if (parser.call(value) === '[object Array]') {
        if (parser.call(value[0]) === '[object Object]') {
            return true;
        }
    }
    return false;
}
function compareElementParent(child, parent) {
    var node = child;
    if (node === parent) {
        return true;
    }
    else if (node === document || !node) {
        return false;
    }
    else {
        return compareElementParent(node.parentNode, parent);
    }
}
function throwError(message) {
    try {
        throw new Error(message);
    }
    catch (e) {
        throw e.message + '\n' + e.stack;
    }
}
function print(element, printWindow) {
    var div = document.createElement('div');
    var links = [].slice.call(document.getElementsByTagName('head')[0].querySelectorAll('link, style'));
    var reference = '';
    if (isNullOrUndefined(printWindow)) {
        printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
    }
    div.appendChild(element.cloneNode(true));
    for (var i = 0, len = links.length; i < len; i++) {
        reference += links[i].outerHTML;
    }
    printWindow.document.write('<!DOCTYPE html> <html><head>' + reference + '</head><body>' + div.innerHTML +
        '<script> (function() { window.ready = true; })(); </script>' + '</body></html>');
    printWindow.document.close();
    printWindow.focus();
    var interval = setInterval(function () {
        if (printWindow.ready) {
            printWindow.print();
            printWindow.close();
            clearInterval(interval);
        }
    }, 500);
    return printWindow;
}
function formatUnit(value) {
    var result = value + '';
    if (result === 'auto' || result.indexOf('%') !== -1 || result.indexOf('px') !== -1) {
        return result;
    }
    return result + 'px';
}
function getInstance(element, component) {
    var elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
    if (elem[instances]) {
        for (var _i = 0, _a = elem[instances]; _i < _a.length; _i++) {
            var inst = _a[_i];
            if (inst instanceof component) {
                return inst;
            }
        }
    }
    return null;
}
function addInstance(element, instance) {
    var elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
    if (elem[instances]) {
        elem[instances].push(instance);
    }
    else {
        elem[instances] = [instance];
    }
}
function combineArray(num) {
    var ret = '';
    for (var i = 0; i < 5; i++) {
        ret += (i ? ',' : '') + num[i];
    }
    return ret;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(55);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Ajax", function() { return __WEBPACK_IMPORTED_MODULE_0__ajax__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation__ = __webpack_require__(56);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return __WEBPACK_IMPORTED_MODULE_1__animation__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ripple", function() { return __WEBPACK_IMPORTED_MODULE_1__animation__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return __WEBPACK_IMPORTED_MODULE_2__base__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__browser__ = __webpack_require__(17);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Browser", function() { return __WEBPACK_IMPORTED_MODULE_3__browser__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__canvas_renderer__ = __webpack_require__(57);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CanvasRenderer", function() { return __WEBPACK_IMPORTED_MODULE_4__canvas_renderer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__component__ = __webpack_require__(58);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_5__component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__child_property__ = __webpack_require__(18);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ChildProperty", function() { return __WEBPACK_IMPORTED_MODULE_6__child_property__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__draggable__ = __webpack_require__(59);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return __WEBPACK_IMPORTED_MODULE_7__draggable__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return __WEBPACK_IMPORTED_MODULE_7__draggable__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__droppable__ = __webpack_require__(60);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Droppable", function() { return __WEBPACK_IMPORTED_MODULE_8__droppable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__event_handler__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EventHandler", function() { return __WEBPACK_IMPORTED_MODULE_9__event_handler__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__form_validator__ = __webpack_require__(61);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ErrorOption", function() { return __WEBPACK_IMPORTED_MODULE_10__form_validator__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FormValidator", function() { return __WEBPACK_IMPORTED_MODULE_10__form_validator__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__internationalization__ = __webpack_require__(19);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "onIntlChange", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "rightToLeft", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "cldrData", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "defaultCulture", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "defaultCurrencyCode", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Internationalization", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "setCulture", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "setCurrencyCode", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "loadCldr", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "enableRtl", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getNumericObject", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getDefaultDateObject", function() { return __WEBPACK_IMPORTED_MODULE_11__internationalization__["l"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__keyboard__ = __webpack_require__(62);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "KeyboardEvents", function() { return __WEBPACK_IMPORTED_MODULE_12__keyboard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__l10n__ = __webpack_require__(63);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "L10n", function() { return __WEBPACK_IMPORTED_MODULE_13__l10n__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__module_loader__ = __webpack_require__(30);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModuleLoader", function() { return __WEBPACK_IMPORTED_MODULE_14__module_loader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__notify_property_change__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Property", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Complex", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Collection", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NotifyPropertyChanges", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CreateBuilder", function() { return __WEBPACK_IMPORTED_MODULE_15__notify_property_change__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__svg_renderer__ = __webpack_require__(64);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SvgRenderer", function() { return __WEBPACK_IMPORTED_MODULE_16__svg_renderer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__touch__ = __webpack_require__(66);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SwipeSettings", function() { return __WEBPACK_IMPORTED_MODULE_17__touch__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Touch", function() { return __WEBPACK_IMPORTED_MODULE_17__touch__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__template__ = __webpack_require__(65);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "expression", function() { return __WEBPACK_IMPORTED_MODULE_18__template__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "compile", function() { return __WEBPACK_IMPORTED_MODULE_18__template__["b"]; });





















/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loaded = 'loaded';
    exports.load = 'load';
    exports.animationComplete = 'animationComplete';
    exports.legendRender = 'legendRender';
    exports.textRender = 'textRender';
    exports.pointRender = 'pointRender';
    exports.seriesRender = 'seriesRender';
    exports.axisLabelRender = 'axisLabelRender';
    exports.tooltipRender = 'tooltipRender';
    exports.chartMouseMove = 'chartMouseMove';
    exports.chartMouseClick = 'chartMouseClick';
    exports.chartMouseLeave = 'chartMouseLeave';
    exports.chartMouseDown = 'chartMouseDown';
    exports.chartMouseUp = 'chartMouseUp';
    exports.zoomComplete = 'zoomComplete';
    exports.dragComplete = 'dragComplete';
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observer__ = __webpack_require__(24);



var Base = (function () {
    function Base(options, element) {
        this.isProtectedOnChange = true;
        this.properties = {};
        this.changedProperties = {};
        this.oldProperties = {};
        this.finalUpdate = function () { };
        this.childChangedProperties = {};
        this.modelObserver = new __WEBPACK_IMPORTED_MODULE_2__observer__["a" /* Observer */](this);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(element)) {
            if ('string' === typeof (element)) {
                this.element = document.querySelector(element);
            }
            else {
                this.element = element;
            }
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.element)) {
                this.isProtectedOnChange = false;
                this.addInstance();
            }
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(options)) {
            this.setProperties(options, true);
        }
        this.isDestroyed = false;
    }
    Base.prototype.setProperties = function (prop, muteOnChange) {
        var prevDetection = this.isProtectedOnChange;
        this.isProtectedOnChange = !!muteOnChange;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this, prop);
        if (muteOnChange !== true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this.changedProperties, prop);
            this.dataBind();
        }
        this.finalUpdate();
        this.changedProperties = {};
        this.oldProperties = {};
        this.isProtectedOnChange = prevDetection;
    };
    ;
    Base.callChildDataBind = function (obj, parent) {
        var keys = Object.keys(obj);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (parent[key] instanceof Array) {
                for (var _a = 0, _b = parent[key]; _a < _b.length; _a++) {
                    var obj_1 = _b[_a];
                    if (obj_1.dataBind !== undefined) {
                        obj_1.dataBind();
                    }
                }
            }
            else {
                parent[key].dataBind();
            }
        }
    };
    Base.prototype.clearChanges = function () {
        this.finalUpdate();
        this.changedProperties = {};
        this.oldProperties = {};
        this.childChangedProperties = {};
    };
    Base.prototype.dataBind = function () {
        Base.callChildDataBind(this.childChangedProperties, this);
        if (Object.getOwnPropertyNames(this.changedProperties).length) {
            var prevDetection = this.isProtectedOnChange;
            var newChanges = this.changedProperties;
            var oldChanges = this.oldProperties;
            this.clearChanges();
            this.isProtectedOnChange = true;
            this.onPropertyChanged(newChanges, oldChanges);
            this.isProtectedOnChange = prevDetection;
        }
    };
    ;
    Base.prototype.saveChanges = function (key, newValue, oldValue) {
        if (this.isProtectedOnChange) {
            return;
        }
        this.oldProperties[key] = oldValue;
        this.changedProperties[key] = newValue;
        this.finalUpdate();
        this.finalUpdate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["l" /* setImmediate */])(this.dataBind.bind(this));
    };
    ;
    Base.prototype.addEventListener = function (eventName, handler) {
        this.modelObserver.on(eventName, handler);
    };
    Base.prototype.removeEventListener = function (eventName, handler) {
        this.modelObserver.off(eventName, handler);
    };
    Base.prototype.trigger = function (eventName, eventProp) {
        if (this.isDestroyed !== true) {
            var prevDetection = this.isProtectedOnChange;
            this.isProtectedOnChange = false;
            this.modelObserver.notify(eventName, eventProp);
            this.isProtectedOnChange = prevDetection;
        }
    };
    Base.prototype.addInstance = function () {
        var moduleClass = 'e-' + this.getModuleName().toLowerCase();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dom__["f" /* addClass */])([this.element], ['e-control', moduleClass]);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.element.ej2_instances)) {
            this.element.ej2_instances.push(this);
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])('ej2_instances', [this], this.element);
        }
    };
    Base.prototype.destroy = function () {
        var _this = this;
        this.element.ej2_instances =
            this.element.ej2_instances.filter(function (i) { return i !== _this; });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dom__["i" /* removeClass */])([this.element], ['e-' + this.getModuleName()]);
        if (this.element.ej2_instances.length === 0) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__dom__["i" /* removeClass */])([this.element], ['e-control']);
        }
        this.clearChanges();
        this.modelObserver.destroy();
        this.isDestroyed = true;
    };
    return Base;
}());



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(util_1);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Property;
/* harmony export (immutable) */ __webpack_exports__["b"] = Complex;
/* harmony export (immutable) */ __webpack_exports__["c"] = Collection;
/* harmony export (immutable) */ __webpack_exports__["d"] = Event;
/* harmony export (immutable) */ __webpack_exports__["e"] = NotifyPropertyChanges;
/* harmony export (immutable) */ __webpack_exports__["f"] = CreateBuilder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

function getObject(instance, curKey, defaultValue, type) {
    if (!instance.properties.hasOwnProperty(curKey)) {
        instance.properties[curKey] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* createInstance */])(type, [instance, curKey, defaultValue]);
    }
    return instance.properties[curKey];
}
function getObjectArray(instance, curKey, defaultValue, type, isSetter) {
    var result = [];
    var len = defaultValue.length;
    for (var i = 0; i < len; i++) {
        if (isSetter) {
            var inst = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* createInstance */])(type, [instance, curKey, {}, true]);
            inst.setProperties(defaultValue[i], true);
            result.push(inst);
        }
        else {
            result.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* createInstance */])(type, [instance, curKey, defaultValue[i], true]));
        }
    }
    return result;
}
function propertyGetter(defaultValue, curKey) {
    return function () {
        if (!this.properties.hasOwnProperty(curKey)) {
            this.properties[curKey] = defaultValue;
        }
        return this.properties[curKey];
    };
}
function propertySetter(defaultValue, curKey) {
    return function (newValue) {
        if (this.properties[curKey] !== newValue) {
            var oldVal = this.properties.hasOwnProperty(curKey) ? this.properties[curKey] : defaultValue;
            this.saveChanges(curKey, newValue, oldVal);
            this.properties[curKey] = newValue;
        }
    };
}
function complexGetter(defaultValue, curKey, type) {
    return function () {
        return getObject(this, curKey, defaultValue, type);
    };
}
function complexSetter(defaultValue, curKey, type) {
    return function (newValue) {
        getObject(this, curKey, defaultValue, type).setProperties(newValue);
    };
}
function complexArrayGetter(defaultValue, curKey, type) {
    return function () {
        if (!this.properties.hasOwnProperty(curKey)) {
            var defCollection = getObjectArray(this, curKey, defaultValue, type);
            this.properties[curKey] = defCollection;
        }
        return this.properties[curKey];
    };
}
function complexArraySetter(defaultValue, curKey, type) {
    return function (newValue) {
        var oldValueCollection = getObjectArray(this, curKey, defaultValue, type);
        var newValCollection = getObjectArray(this, curKey, newValue, type, true);
        this.saveChanges(curKey, newValCollection, oldValueCollection);
        this.properties[curKey] = newValCollection;
    };
}
function Property(defaultValue) {
    return function (target, key) {
        var propertyDescriptor = {
            set: propertySetter(defaultValue, key),
            get: propertyGetter(defaultValue, key),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'prop', defaultValue);
    };
}
function Complex(defaultValue, type) {
    return function (target, key) {
        var propertyDescriptor = {
            set: complexSetter(defaultValue, key, type),
            get: complexGetter(defaultValue, key, type),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'complexProp', defaultValue, type);
    };
}
function Collection(defaultValue, type) {
    return function (target, key) {
        var propertyDescriptor = {
            set: complexArraySetter(defaultValue, key, type),
            get: complexArrayGetter(defaultValue, key, type),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'colProp', defaultValue, type);
    };
}
function Event() {
    return function (target, key) {
        var eventDescriptor = {
            set: function (newValue) {
                var oldValue = this.properties[key];
                if (oldValue !== newValue) {
                    var finalContext = getParentContext(this, key);
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(oldValue) === false) {
                        finalContext.context.removeEventListener(finalContext.prefix, oldValue);
                    }
                    finalContext.context.addEventListener(finalContext.prefix, newValue);
                    this.properties[key] = newValue;
                }
            },
            get: propertyGetter(undefined, key),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, eventDescriptor);
        addPropertyCollection(target, key, 'event');
    };
}
function NotifyPropertyChanges(classConstructor) {
}
function addPropertyCollection(target, key, propertyType, defaultValue, type) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(target.propList)) {
        target.propList = {
            props: [],
            complexProps: [],
            colProps: [],
            events: [],
            propNames: [],
            complexPropNames: [],
            colPropNames: [],
            eventNames: []
        };
    }
    target.propList[propertyType + 's'].push({
        propertyName: key,
        defaultValue: defaultValue,
        type: type
    });
    target.propList[propertyType + 'Names'].push(key);
}
function getBuilderProperties(component) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(component.prototype.builderObject)) {
        component.prototype.builderObject = {
            properties: {}, propCollections: [], add: function () {
                this.isPropertyArray = true;
                this.propCollections.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, this.properties, {}));
            }
        };
        var rex = /complex/;
        for (var _i = 0, _a = Object.keys(component.prototype.propList); _i < _a.length; _i++) {
            var key = _a[_i];
            var _loop_1 = function (prop) {
                if (rex.test(key)) {
                    component.prototype.builderObject[prop.propertyName] = function (value) {
                        var childType = {};
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(childType, getBuilderProperties(prop.type));
                        value(childType);
                        var tempValue;
                        if (!childType.isPropertyArray) {
                            tempValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, childType.properties, {});
                        }
                        else {
                            tempValue = childType.propCollections;
                        }
                        this.properties[prop.propertyName] = tempValue;
                        childType.properties = {};
                        childType.propCollections = [];
                        childType.isPropertyArray = false;
                        return this;
                    };
                }
                else {
                    component.prototype.builderObject[prop.propertyName] = function (value) {
                        this.properties[prop.propertyName] = value;
                        return this;
                    };
                }
            };
            for (var _b = 0, _c = component.prototype.propList[key]; _b < _c.length; _b++) {
                var prop = _c[_b];
                _loop_1(prop);
            }
        }
    }
    return component.prototype.builderObject;
}
function CreateBuilder(component) {
    var builderFunction = function (element) {
        this.element = element;
        return this;
    };
    var instanceFunction = function (element) {
        if (!builderFunction.prototype.hasOwnProperty('create')) {
            builderFunction.prototype = getBuilderProperties(component);
            builderFunction.prototype.create = function () {
                var temp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, {}, this.properties);
                this.properties = {};
                return new component(temp, this.element);
            };
        }
        return new builderFunction(element);
    };
    return instanceFunction;
}
function getParentContext(context, prefix) {
    if (context.hasOwnProperty('parentObj') === false) {
        return { context: context, prefix: prefix };
    }
    else {
        var curText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('propName', context);
        if (curText) {
            prefix = curText + '-' + prefix;
        }
        return getParentContext(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('parentObj', context), prefix);
    }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

var EventHandler = (function () {
    function EventHandler() {
    }
    EventHandler.addOrGetEventData = function (element) {
        if ('__eventList' in element) {
            return element.__eventList.events;
        }
        else {
            element.__eventList = {};
            return element.__eventList.events = [];
        }
    };
    EventHandler.add = function (element, eventName, listener, bindTo, intDebounce) {
        var eventData = EventHandler.addOrGetEventData(element);
        var debounceListener;
        if (intDebounce) {
            debounceListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["j" /* debounce */])(listener, intDebounce);
        }
        else {
            debounceListener = listener;
        }
        if (bindTo) {
            debounceListener = debounceListener.bind(bindTo);
        }
        var event = eventName.split(' ');
        for (var i = 0; i < event.length; i++) {
            eventData.push({
                name: event[i],
                listener: listener,
                debounce: debounceListener
            });
            element.addEventListener(event[i], debounceListener);
        }
    };
    EventHandler.remove = function (element, eventName, listener) {
        var eventData = EventHandler.addOrGetEventData(element);
        var event = eventName.split(' ');
        var _loop_1 = function (j) {
            var index = -1;
            var debounceListener;
            if (eventData && eventData.length !== 0) {
                eventData.some(function (x, i) {
                    return x.name === event[j] && x.listener.toString() === listener.toString() ?
                        (index = i, debounceListener = x.debounce, true) : false;
                });
            }
            if (index !== -1) {
                eventData.splice(index, 1);
            }
            element.removeEventListener(event[j], debounceListener);
        };
        for (var j = 0; j < event.length; j++) {
            _loop_1(j);
        }
    };
    EventHandler.clearEvents = function (element) {
        var eventData;
        var copyData;
        eventData = EventHandler.addOrGetEventData(element);
        copyData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])([], copyData, eventData);
        for (var i = 0; i < copyData.length; i++) {
            element.removeEventListener(copyData[i].name, copyData[i].debounce);
            eventData.shift();
        }
    };
    EventHandler.trigger = function (element, eventName, eventProp) {
        var eventData = EventHandler.addOrGetEventData(element);
        var fn = null;
        for (var _i = 0, eventData_1 = eventData; _i < eventData_1.length; _i++) {
            var event_1 = eventData_1[_i];
            if (event_1.name === eventName) {
                event_1.debounce.call(this, eventProp);
            }
        }
    };
    return EventHandler;
}());



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(13), __webpack_require__(0), __webpack_require__(16), __webpack_require__(22), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, base_1, helper_1, double_range_1, double_axis_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var axisPadding = 10;
    var Row = (function (_super) {
        __extends(Row, _super);
        function Row() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.axes = [];
            _this.nearSizes = [];
            _this.farSizes = [];
            return _this;
        }
        Row.prototype.computeSize = function (axis, clipRect) {
            var titleSize = 0;
            var width = 0;
            var innerPadding = 5;
            if (axis.title) {
                titleSize = helper_1.measureText(axis.title, axis.titleStyle).height + innerPadding;
            }
            width += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.width + innerPadding + axisPadding + axis.lineStyle.width / 2);
            if (axis.opposedPosition) {
                this.farSizes.push(width);
            }
            else {
                this.nearSizes.push(width);
            }
        };
        return Row;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('100%')
    ], Row.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], Row.prototype, "border", void 0);
    exports.Row = Row;
    var Column = (function (_super) {
        __extends(Column, _super);
        function Column() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.axes = [];
            _this.nearSizes = [];
            _this.farSizes = [];
            _this.padding = 0;
            return _this;
        }
        Column.prototype.computeSize = function (axis, clipRect) {
            var titleSize = 0;
            var height = 0;
            var innerPadding = 5;
            if (axis.title) {
                titleSize = helper_1.measureText(axis.title, axis.titleStyle).height + innerPadding;
            }
            height += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.height + innerPadding + axisPadding
                + axis.lineStyle.width / 2);
            if (axis.opposedPosition) {
                this.farSizes.push(height);
            }
            else {
                this.nearSizes.push(height);
            }
        };
        return Column;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('100%')
    ], Column.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], Column.prototype, "border", void 0);
    exports.Column = Column;
    var MajorGridLines = (function (_super) {
        __extends(MajorGridLines, _super);
        function MajorGridLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MajorGridLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], MajorGridLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisMajorGridLineColor)
    ], MajorGridLines.prototype, "color", void 0);
    exports.MajorGridLines = MajorGridLines;
    var MinorGridLines = (function (_super) {
        __extends(MinorGridLines, _super);
        function MinorGridLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MinorGridLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0.7)
    ], MinorGridLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisMinorGridLineColor)
    ], MinorGridLines.prototype, "color", void 0);
    exports.MinorGridLines = MinorGridLines;
    var AxisLine = (function (_super) {
        __extends(AxisLine, _super);
        function AxisLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AxisLine;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], AxisLine.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AxisLine.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisLineColor)
    ], AxisLine.prototype, "color", void 0);
    exports.AxisLine = AxisLine;
    var MajorTickLines = (function (_super) {
        __extends(MajorTickLines, _super);
        function MajorTickLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MajorTickLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], MajorTickLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MajorTickLines.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisMajorTickLineColor)
    ], MajorTickLines.prototype, "color", void 0);
    exports.MajorTickLines = MajorTickLines;
    var MinorTickLines = (function (_super) {
        __extends(MinorTickLines, _super);
        function MinorTickLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MinorTickLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0.7)
    ], MinorTickLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MinorTickLines.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisMinorTickLineColor)
    ], MinorTickLines.prototype, "color", void 0);
    exports.MinorTickLines = MinorTickLines;
    var CrosshairTooltip = (function (_super) {
        __extends(CrosshairTooltip, _super);
        function CrosshairTooltip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CrosshairTooltip;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], CrosshairTooltip.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.crossHairLabelColor)
    ], CrosshairTooltip.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.crosshairLabelFont, base_1.Font)
    ], CrosshairTooltip.prototype, "textStyle", void 0);
    exports.CrosshairTooltip = CrosshairTooltip;
    var Axis = (function (_super) {
        __extends(Axis, _super);
        function Axis() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.visibleLabels = [];
            _this.series = [];
            _this.rect = new helper_1.Rect(undefined, undefined, 0, 0);
            _this.axisBottomLine = null;
            _this.intervalDivs = [10, 5, 2, 1];
            _this.angle = _this.labelRotation;
            return _this;
        }
        Axis.prototype.setRange = function () {
            if (this.minimum != null && this.maximum != null) {
                return true;
            }
            return false;
        };
        Axis.prototype.calculateVisibleRange = function (size) {
            if (this.zoomFactor < 1 || this.zoomPosition > 0) {
                var baseRange = this.actualRange;
                var start = this.actualRange.min + this.zoomPosition * this.actualRange.delta;
                var end = start + this.zoomFactor * this.actualRange.delta;
                if (start < baseRange.min) {
                    end = end + (baseRange.min - start);
                    start = baseRange.min;
                }
                if (end > baseRange.max) {
                    start = start - (end - baseRange.max);
                    end = baseRange.max;
                }
                this.doubleRange = new double_range_1.DoubleRange(start, end);
                this.visibleRange.min = this.doubleRange.start;
                this.visibleRange.max = this.doubleRange.end;
                this.visibleRange.delta = this.doubleRange.delta;
            }
        };
        Axis.prototype.getActualDesiredIntervalsCount = function (availableSize) {
            var size = this.orientation === 'Horizontal' ? availableSize.width : availableSize.height;
            if (this.desiredIntervals === null) {
                var desiredIntervalsCount = (this.orientation === 'Horizontal' ? 0.533 : 1) * this.maximumLabels;
                desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
                return desiredIntervalsCount;
            }
            else {
                return this.desiredIntervals;
            }
        };
        Axis.prototype.getMaxLabelWidth = function (chart) {
            var prevSize = new helper_1.Size(0, 0);
            var rotatedLabel;
            var pointX;
            var previousEnd = 0;
            var isIntersect = false;
            this.angle = this.labelRotation;
            this.maxLabelSize = new helper_1.Size(0, 0);
            var label;
            for (var i = 0; i < this.visibleLabels.length; i++) {
                label = this.visibleLabels[i];
                label.size = helper_1.measureText(label.text, this.labelStyle);
                if (label.size.width > this.maxLabelSize.width) {
                    this.maxLabelSize.width = label.size.width;
                    this.rotatedLabel = label.text;
                }
                if (label.size.height > this.maxLabelSize.height) {
                    this.maxLabelSize.height = label.size.height;
                }
                if (this.angle % 360 === 0 && this.orientation === 'Horizontal' && this.rect.width > 0 && !isIntersect &&
                    (this.labelIntersectAction === 'Rotate90' || this.labelIntersectAction === 'Rotate45')) {
                    pointX = (helper_1.valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
                    pointX -= label.size.width / 2;
                    if (this.edgeLabelPlacement === 'Shift') {
                        if (i === 0 && pointX < this.rect.x) {
                            pointX = this.rect.x;
                        }
                        if (i === this.visibleLabels.length - 1 && ((pointX + label.size.width) > (this.rect.x + this.rect.width))) {
                            pointX = this.rect.x + this.rect.width - label.size.width;
                        }
                    }
                    if (pointX <= previousEnd) {
                        this.angle = (this.labelIntersectAction === 'Rotate45') ? 45 : 90;
                        isIntersect = true;
                    }
                    previousEnd = pointX + label.size.width;
                }
            }
            if (this.angle !== 0) {
                this.maxLabelSize = helper_1.rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
            }
        };
        Axis.prototype.getModule = function (chart) {
            if (this.valueType === 'Double') {
                this.baseModule = new double_axis_1.Double(chart);
            }
            else {
                this.baseModule = chart[helper_1.firstToLowerCase(this.valueType) + 'Module'];
            }
        };
        return Axis;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisLabelFont, base_1.Font)
    ], Axis.prototype, "labelStyle", void 0);
    __decorate([
        ej2_base_1.Complex({}, CrosshairTooltip)
    ], Axis.prototype, "crosshairTooltip", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisTitleFont, base_1.Font)
    ], Axis.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "labelFormat", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "plotOffset", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Axis.prototype, "logBase", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "columnIndex", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "rowIndex", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Axis.prototype, "span", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "desiredIntervals", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], Axis.prototype, "maximumLabels", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Axis.prototype, "zoomFactor", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "zoomPosition", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Axis.prototype, "opposedPosition", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "enableAutoIntervalOnZooming", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], Axis.prototype, "rangePadding", void 0);
    __decorate([
        ej2_base_1.Property('Double')
    ], Axis.prototype, "valueType", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Axis.prototype, "edgeLabelPlacement", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], Axis.prototype, "intervalType", void 0);
    __decorate([
        ej2_base_1.Property('BetweenTicks')
    ], Axis.prototype, "labelPlacement", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "labelRotation", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "minimum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "maximum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "interval", void 0);
    __decorate([
        ej2_base_1.Complex({}, MajorTickLines)
    ], Axis.prototype, "majorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MinorTickLines)
    ], Axis.prototype, "minorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MajorGridLines)
    ], Axis.prototype, "majorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MinorGridLines)
    ], Axis.prototype, "minorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, AxisLine)
    ], Axis.prototype, "lineStyle", void 0);
    __decorate([
        ej2_base_1.Property('Hide')
    ], Axis.prototype, "labelIntersectAction", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], Axis.prototype, "tabIndex", void 0);
    exports.Axis = Axis;
    var VisibleLabels = (function () {
        function VisibleLabels(text, value, size) {
            if (size === void 0) { size = new helper_1.Size(0, 0); }
            this.text = text;
            this.value = value;
            this.size = size;
        }
        return VisibleLabels;
    }());
    exports.VisibleLabels = VisibleLabels;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createElement;
/* harmony export (immutable) */ __webpack_exports__["f"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["i"] = removeClass;
/* harmony export (immutable) */ __webpack_exports__["d"] = isVisible;
/* unused harmony export prepend */
/* unused harmony export append */
/* unused harmony export detach */
/* unused harmony export remove */
/* unused harmony export attributes */
/* harmony export (immutable) */ __webpack_exports__["a"] = select;
/* harmony export (immutable) */ __webpack_exports__["b"] = selectAll;
/* harmony export (immutable) */ __webpack_exports__["g"] = closest;
/* unused harmony export siblings */
/* unused harmony export getAttributeOrDefault */
/* harmony export (immutable) */ __webpack_exports__["h"] = setStyleAttribute;
/* unused harmony export classList */
/* harmony export (immutable) */ __webpack_exports__["e"] = matches;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_handler__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);


function createElement(tagName, properties) {
    var element = document.createElement(tagName);
    if (typeof (properties) === 'undefined') {
        return element;
    }
    element.innerHTML = (properties.innerHTML ? properties.innerHTML : '');
    if (properties.className !== undefined) {
        element.className = properties.className;
    }
    if (properties.id !== undefined) {
        element.id = properties.id;
    }
    if (properties.styles !== undefined) {
        element.setAttribute('style', properties.styles);
    }
    if (properties.attrs !== undefined) {
        attributes(element, properties.attrs);
    }
    return element;
}
function addClass(elements, classes) {
    var classList = getClassList(classes);
    for (var _i = 0, _a = elements; _i < _a.length; _i++) {
        var ele = _a[_i];
        for (var _b = 0, classList_1 = classList; _b < classList_1.length; _b++) {
            var className = classList_1[_b];
            if (!ele.classList.contains(className)) {
                ele.classList.add(className);
            }
        }
    }
    return elements;
}
function removeClass(elements, classes) {
    var classList = getClassList(classes);
    for (var _i = 0, _a = elements; _i < _a.length; _i++) {
        var ele = _a[_i];
        if (ele.className !== '') {
            for (var _b = 0, classList_2 = classList; _b < classList_2.length; _b++) {
                var className = classList_2[_b];
                ele.classList.remove(className);
            }
        }
    }
    return elements;
}
function getClassList(classes) {
    var classList = [];
    if (typeof classes === 'string') {
        classList.push(classes);
    }
    else {
        classList = classes;
    }
    return classList;
}
function isVisible(element) {
    var ele = element;
    return (ele.style.visibility === '' && ele.offsetWidth > 0);
}
function prepend(fromElements, toElement) {
    var docFrag = document.createDocumentFragment();
    for (var _i = 0, _a = fromElements; _i < _a.length; _i++) {
        var ele = _a[_i];
        docFrag.appendChild(ele);
    }
    toElement.insertBefore(docFrag, toElement.firstElementChild);
    return fromElements;
}
function append(fromElements, toElement) {
    var docFrag = document.createDocumentFragment();
    for (var _i = 0, _a = fromElements; _i < _a.length; _i++) {
        var ele = _a[_i];
        docFrag.appendChild(ele);
    }
    toElement.appendChild(docFrag);
    return fromElements;
}
function detach(element) {
    var parentNode = element.parentNode;
    return parentNode.removeChild(element);
}
function remove(element) {
    var parentNode = element.parentNode;
    __WEBPACK_IMPORTED_MODULE_0__event_handler__["a" /* EventHandler */].clearEvents(element);
    parentNode.removeChild(element);
}
function attributes(element, attributes) {
    var keys = Object.keys(attributes);
    var ele = element;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        ele.setAttribute(key, attributes[key]);
    }
    return ele;
}
function select(selector, context) {
    if (context === void 0) { context = document; }
    return context.querySelector(selector);
}
function selectAll(selector, context) {
    if (context === void 0) { context = document; }
    var nodeList = context.querySelectorAll(selector);
    return nodeList;
}
function closest(element, selector) {
    var el = element;
    if (typeof el.closest === 'function') {
        return el.closest(selector);
    }
    while (el && el.nodeType === 1) {
        if (matches(el, selector)) {
            return el;
        }
        el = el.parentNode;
    }
    return null;
}
function siblings(element) {
    var siblings = [];
    var childNodes = Array.prototype.slice.call(element.parentNode.childNodes);
    for (var _i = 0, childNodes_1 = childNodes; _i < childNodes_1.length; _i++) {
        var curNode = childNodes_1[_i];
        if (curNode.nodeType === Node.ELEMENT_NODE && element !== curNode) {
            siblings.push(curNode);
        }
    }
    return siblings;
}
function getAttributeOrDefault(element, property, value) {
    var attrVal = element.getAttribute(property);
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* isNullOrUndefined */])(attrVal)) {
        element.setAttribute(property, value.toString());
        attrVal = value;
    }
    return attrVal;
}
function setStyleAttribute(element, attrs) {
    if (attrs !== undefined) {
        Object.keys(attrs).forEach(function (key) {
            element.style[key] = attrs[key];
        });
    }
}
function classList(element, addClasses, removeClasses) {
    addClass([element], addClasses);
    removeClass([element], removeClasses);
}
function matches(element, selector) {
    var matches = element.matches || element.msMatchesSelector || element.webkitMatchesSelector;
    if (matches) {
        return matches.call(element, selector);
    }
    else {
        return [].indexOf.call(document.querySelectorAll(selector), element) !== -1;
    }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(67)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, dom_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(dom_1);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Theme;
    (function (Theme) {
        Theme.axisLabelFont = {
            size: '12px',
            fontWeight: 'Regular',
            color: '#686868',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.axisTitleFont = {
            size: '14px',
            fontWeight: 'Regular',
            color: '#424242',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.chartTitleFont = {
            size: '15px',
            fontWeight: 'Regular',
            color: '#424242',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.crosshairLabelFont = {
            size: '13px',
            fontWeight: 'Regular',
            color: '#e5e5e5',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.tooltipLabelFont = {
            size: '13px',
            fontWeight: 'Regular',
            color: null,
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.legendLabelFont = {
            size: '13px',
            fontWeight: 'Regular',
            color: '#353535',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        };
        Theme.axisLineColor = '#b5b5b5';
        Theme.axisMajorGridLineColor = '#dbdbdb';
        Theme.axisMinorGridLineColor = '#eaeaea';
        Theme.axisMajorTickLineColor = '#b5b5b5';
        Theme.axisMinorTickLineColor = '#d6d6d6';
        Theme.crossHairLabelColor = '#4f4f4f';
        Theme.chartBackgroundColor = '#FFFFFF';
        Theme.selectionRectFill = 'rgba(41, 171, 226, 0.1)';
        Theme.selectionRectStroke = '#29abe2';
    })(Theme = exports.Theme || (exports.Theme = {}));
    function getSeriesColor(theme) {
        var palette;
        switch (theme) {
            case 'FlatLight':
                palette = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
                    '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
                break;
        }
        return palette;
    }
    exports.getSeriesColor = getSeriesColor;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LineBase = (function () {
        function LineBase() {
        }
        LineBase.prototype.improveChartPerformance = function (series) {
            var tempPoints = [];
            var xVisibleRange = series.xAxis.visibleRange;
            var yVisibleRange = series.yAxis.visibleRange;
            var seriesPoints = series.points;
            var areaBounds = series.clipRect;
            var xTolerance = Math.abs(xVisibleRange.delta / areaBounds.width);
            var yTolerance = Math.abs(yVisibleRange.delta / areaBounds.height);
            var prevXValue = (seriesPoints[0] && seriesPoints[0].x > xTolerance) ? 0 : xTolerance;
            var prevYValue = (seriesPoints[0] && seriesPoints[0].y > yTolerance) ? 0 : yTolerance;
            var xVal = 0;
            var yVal = 0;
            var currentPoint;
            for (var _i = 0, seriesPoints_1 = seriesPoints; _i < seriesPoints_1.length; _i++) {
                var currentPoint_1 = seriesPoints_1[_i];
                currentPoint_1.symbolLocation = null;
                xVal = currentPoint_1.xValue ? currentPoint_1.xValue : xVisibleRange.min;
                yVal = currentPoint_1.yValue ? currentPoint_1.yValue : yVisibleRange.min;
                if (Math.abs(prevXValue - xVal) >= xTolerance || Math.abs(prevYValue - yVal) >= yTolerance) {
                    tempPoints.push(currentPoint_1);
                    prevXValue = xVal;
                    prevYValue = yVal;
                }
            }
            return tempPoints;
        };
        LineBase.prototype.appendLinePath = function (options, series) {
            var htmlObject = series.chart.renderer.drawPath(options);
            series.pathElement = htmlObject;
            series.seriesElement.appendChild(htmlObject);
            series.isRectSeries = false;
        };
        LineBase.prototype.renderMarker = function (series) {
            if (series.marker.visible) {
                series.chart.markerModule.render(series);
            }
        };
        LineBase.prototype.doProgressiveAnimation = function (series, option) {
            var animation = new ej2_base_1.Animation({});
            var path = series.pathElement;
            var strokeDashArray = path.getAttribute('stroke-dasharray');
            var pathLength = series.pathElement.getTotalLength();
            var currentTime;
            path.style.visibility = 'hidden';
            strokeDashArray = strokeDashArray !== 'null' ? strokeDashArray : '0';
            animation.animate(path, {
                duration: option.duration,
                delay: option.delay,
                progress: function (args) {
                    if (args.timeStamp >= args.delay) {
                        path.style.visibility = 'visible';
                        currentTime = Math.abs(Math.round(((args.timeStamp - args.delay) * pathLength) / args.duration));
                        path.setAttribute('stroke-dasharray', currentTime + ',' + pathLength);
                    }
                },
                end: function (model) {
                    path.setAttribute('stroke-dasharray', strokeDashArray);
                    series.chart.trigger('animationComplete', { series: series });
                }
            });
        };
        LineBase.prototype.doLinearAnimation = function (series, animation) {
            var clipRect = series.clipRectElement.childNodes[0].childNodes[0];
            var eleWidth = +clipRect.getAttribute('width');
            var width = 0;
            clipRect.setAttribute('width', '0');
            new ej2_base_1.Animation({}).animate(clipRect, {
                delay: animation.delay,
                duration: animation.duration,
                progress: function (args) {
                    if (args.timeStamp >= args.delay) {
                        width = ((args.timeStamp - args.delay) / args.duration) * eleWidth;
                        clipRect.setAttribute('width', width.toString());
                    }
                },
                end: function (model) {
                    clipRect.setAttribute('width', eleWidth.toString());
                    series.chart.trigger('animationComplete', { series: series });
                }
            });
        };
        return LineBase;
    }());
    exports.LineBase = LineBase;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Font = (function (_super) {
        __extends(Font, _super);
        function Font() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Font;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('16px')
    ], Font.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Font.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('Segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        ej2_base_1.Property('Regular')
    ], Font.prototype, "fontWeight", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], Font.prototype, "fontStyle", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Font.prototype, "opacity", void 0);
    exports.Font = Font;
    var Border = (function (_super) {
        __extends(Border, _super);
        function Border() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Border;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], Border.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Border.prototype, "width", void 0);
    exports.Border = Border;
    var TooltipSettings = (function (_super) {
        __extends(TooltipSettings, _super);
        function TooltipSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TooltipSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], TooltipSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], TooltipSettings.prototype, "shared", void 0);
    __decorate([
        ej2_base_1.Property('#FFFFFF')
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.tooltipLabelFont, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], TooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        ej2_base_1.Complex({ color: null }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    exports.TooltipSettings = TooltipSettings;
    var CrosshairSettings = (function (_super) {
        __extends(CrosshairSettings, _super);
        function CrosshairSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CrosshairSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], CrosshairSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#4f4f4f', width: 1 }, Border)
    ], CrosshairSettings.prototype, "line", void 0);
    __decorate([
        ej2_base_1.Property('Both')
    ], CrosshairSettings.prototype, "lineType", void 0);
    exports.CrosshairSettings = CrosshairSettings;
    var ChartArea = (function (_super) {
        __extends(ChartArea, _super);
        function ChartArea() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChartArea;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex({}, Border)
    ], ChartArea.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], ChartArea.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ChartArea.prototype, "opacity", void 0);
    exports.ChartArea = ChartArea;
    var Margin = (function (_super) {
        __extends(Margin, _super);
        function Margin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Margin;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "left", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "right", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "top", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "bottom", void 0);
    exports.Margin = Margin;
    var ZoomSettings = (function (_super) {
        __extends(ZoomSettings, _super);
        function ZoomSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ZoomSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enableSelectionZooming", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enablePinchZooming", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enableMouseWheelZooming", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], ZoomSettings.prototype, "enableDeferredZooming", void 0);
    __decorate([
        ej2_base_1.Property('XY')
    ], ZoomSettings.prototype, "mode", void 0);
    __decorate([
        ej2_base_1.Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    ], ZoomSettings.prototype, "toolbarItems", void 0);
    exports.ZoomSettings = ZoomSettings;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntlBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_base__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number_formatter__ = __webpack_require__(29);



var IntlBase;
(function (IntlBase) {
    IntlBase.negativeDataRegex = /^(('[^']+'|''|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
    IntlBase.customRegex = /^(('[^']+'|''|[^*#@0,.])*)(\*.)?((([0#,]*[0,]*[0#]*)(\.[0#]*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
    IntlBase.latnParseRegex = /0|1|2|3|4|5|6|7|8|9/g;
    var fractionRegex = /[0-9]/g;
    IntlBase.defaultCurrency = '$';
    var mapper = ['infinity', 'nan', 'group', 'decimal'];
    IntlBase.formatRegex = /(^[ncpa]{1})([0-1]?[0-9]|20)?$/i;
    var typeMapper = {
        '$': 'isCurrency',
        '%': 'isPercent',
        '-': 'isNegative',
        0: 'nlead',
        1: 'nend'
    };
    IntlBase.dateParseRegex = /([a-z])\1*|'([^']|'')+'|''|./gi;
    IntlBase.basicPatterns = ['short', 'medium', 'long', 'full'];
    IntlBase.defaultObject = {
        'dates': {
            'calendars': {
                'gregorian': {
                    'months': {
                        'stand-alone': {
                            'abbreviated': {
                                '1': 'Jan',
                                '2': 'Feb',
                                '3': 'Mar',
                                '4': 'Apr',
                                '5': 'May',
                                '6': 'Jun',
                                '7': 'Jul',
                                '8': 'Aug',
                                '9': 'Sep',
                                '10': 'Oct',
                                '11': 'Nov',
                                '12': 'Dec'
                            },
                            'narrow': {
                                '1': 'J',
                                '2': 'F',
                                '3': 'M',
                                '4': 'A',
                                '5': 'M',
                                '6': 'J',
                                '7': 'J',
                                '8': 'A',
                                '9': 'S',
                                '10': 'O',
                                '11': 'N',
                                '12': 'D'
                            },
                            'wide': {
                                '1': 'January',
                                '2': 'February',
                                '3': 'March',
                                '4': 'April',
                                '5': 'May',
                                '6': 'June',
                                '7': 'July',
                                '8': 'August',
                                '9': 'September',
                                '10': 'October',
                                '11': 'November',
                                '12': 'December'
                            }
                        }
                    },
                    "days": {
                        "stand-alone": {
                            "abbreviated": {
                                "sun": "Sun",
                                "mon": "Mon",
                                "tue": "Tue",
                                "wed": "Wed",
                                "thu": "Thu",
                                "fri": "Fri",
                                "sat": "Sat"
                            },
                            "narrow": {
                                "sun": "S",
                                "mon": "M",
                                "tue": "T",
                                "wed": "W",
                                "thu": "T",
                                "fri": "F",
                                "sat": "S"
                            },
                            "short": {
                                "sun": "Su",
                                "mon": "Mo",
                                "tue": "Tu",
                                "wed": "We",
                                "thu": "Th",
                                "fri": "Fr",
                                "sat": "Sa"
                            },
                            "wide": {
                                "sun": "Sunday",
                                "mon": "Monday",
                                "tue": "Tuesday",
                                "wed": "Wednesday",
                                "thu": "Thursday",
                                "fri": "Friday",
                                "sat": "Saturday"
                            }
                        }
                    },
                    "dayPeriods": {
                        "format": {
                            "wide": {
                                "am": "AM",
                                "pm": "PM"
                            }
                        }
                    },
                    'eras': {
                        'eraNames': {
                            '0': 'Before Christ',
                            '0-alt-variant': 'Before Common Era',
                            '1': 'Anno Domini',
                            "1-alt-variant": "Common Era"
                        },
                        'eraAbbr': {
                            '0': 'BC',
                            '0-alt-variant': 'BCE',
                            '1': 'AD',
                            '1-alt-variant': 'CE'
                        },
                        'eraNarrow': {
                            '0': 'B',
                            '0-alt-variant': 'BCE',
                            '1': 'A',
                            '1-alt-variant': 'CE'
                        }
                    },
                    'dateFormats': {
                        'full': 'EEEE, MMMM d, y',
                        'long': 'MMMM d, y',
                        'medium': 'MMM d, y',
                        'short': 'M/d/yy'
                    },
                    'timeFormats': {
                        'full': 'h:mm:ss a zzzz',
                        'long': 'h:mm:ss a z',
                        'medium': 'h:mm:ss a',
                        'short': 'h:mm a'
                    },
                    'dateTimeFormats': {
                        'full': "{1} 'at' {0}",
                        'long': "{1} 'at' {0}",
                        'medium': '{1}, {0}',
                        'short': '{1}, {0}',
                        'availableFormats': {
                            'd': 'd',
                            'E': 'ccc',
                            'Ed': 'd E',
                            'Ehm': 'E h:mm a',
                            'EHm': 'E HH:mm',
                            'Ehms': 'E h:mm:ss a',
                            'EHms': 'E HH:mm:ss',
                            'Gy': 'y G',
                            'GyMMM': 'MMM y G',
                            'GyMMMd': 'MMM d, y G',
                            'GyMMMEd': 'E, MMM d, y G',
                            'h': 'h a',
                            'H': 'HH',
                            'hm': 'h:mm a',
                            'Hm': 'HH:mm',
                            'hms': 'h:mm:ss a',
                            'Hms': 'HH:mm:ss',
                            'hmsv': 'h:mm:ss a v',
                            'Hmsv': 'HH:mm:ss v',
                            'hmv': 'h:mm a v',
                            'Hmv': 'HH:mm v',
                            'M': 'L',
                            'Md': 'M/d',
                            'MEd': 'E, M/d',
                            'MMM': 'LLL',
                            'MMMd': 'MMM d',
                            'MMMEd': 'E, MMM d',
                            'MMMMd': 'MMMM d',
                            'ms': 'mm:ss',
                            'y': 'y',
                            'yM': 'M/y',
                            'yMd': 'M/d/y',
                            'yMEd': 'E, M/d/y',
                            'yMMM': 'MMM y',
                            'yMMMd': 'MMM d, y',
                            'yMMMEd': 'E, MMM d, y',
                            'yMMMM': 'MMMM y',
                        },
                    }
                }
            },
            'timeZoneNames': {
                "hourFormat": "+HH:mm;-HH:mm",
                "gmtFormat": "GMT{0}",
                "gmtZeroFormat": "GMT",
            }
        },
        'numbers': {
            'currencies': {
                'USD': {
                    'displayName': 'US Dollar',
                    'symbol': '$',
                    'symbol-alt-narrow': '$'
                },
                'EUR': {
                    'displayName': 'Euro',
                    'symbol': '€',
                    'symbol-alt-narrow': '€'
                },
                'GBP': {
                    'displayName': 'British Pound',
                    'symbol-alt-narrow': '£'
                },
            },
            'defaultNumberingSystem': 'latn',
            'minimumGroupingDigits': '1',
            'symbols-numberSystem-latn': {
                'decimal': '.',
                'group': ',',
                'list': ';',
                'percentSign': '%',
                'plusSign': '+',
                'minusSign': '-',
                'exponential': 'E',
                'superscriptingExponent': '×',
                'perMille': '‰',
                'infinity': '∞',
                'nan': 'NaN',
                'timeSeparator': ':'
            },
            'decimalFormats-numberSystem-latn': {
                'standard': '#,##0.###',
            },
            'percentFormats-numberSystem-latn': {
                'standard': '#,##0%'
            },
            'currencyFormats-numberSystem-latn': {
                'standard': '¤#,##0.00',
                'accounting': '¤#,##0.00;(¤#,##0.00)'
            }
        }
    };
    IntlBase.monthIndex = {
        3: 'abbreviated',
        4: 'wide',
        5: 'narrow',
        1: 'abbreviated'
    };
    IntlBase.month = 'months';
    IntlBase.days = 'days';
    IntlBase.patternMatcher = {
        C: 'currency',
        P: 'percent',
        N: 'decimal',
        A: 'currency'
    };
    function getResultantPattern(skeleton, dateObject, type) {
        var resPattern;
        var iType = type || 'date';
        if (IntlBase.basicPatterns.indexOf(skeleton) !== -1) {
            resPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(iType + 'Formats.' + skeleton, dateObject);
            if (iType === 'dateTime') {
                var dPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('dateFormats.' + skeleton, dateObject);
                var tPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('timeFormats.' + skeleton, dateObject);
                resPattern = resPattern.replace('{1}', dPattern).replace('{0}', tPattern);
            }
        }
        else {
            resPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('dateTimeFormats.availableFormats.' + skeleton, dateObject);
        }
        return resPattern;
    }
    IntlBase.getResultantPattern = getResultantPattern;
    function getDependables(cldr, culture, isNumber) {
        var ret = {};
        ret.parserObject = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getMainObject(cldr, culture) || IntlBase.defaultObject;
        if (isNumber) {
            ret.numericObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('numbers', ret.parserObject);
        }
        else {
            ret.dateObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('dates.calendars.gregorian', ret.parserObject);
        }
        return ret;
    }
    IntlBase.getDependables = getDependables;
    function getSymbolPattern(type, numSystem, obj, isAccount) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(type + 'Formats-numberSystem-' +
            numSystem + (isAccount ? '.accounting' : '.standard'), obj) || (isAccount ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(type + 'Formats-numberSystem-' +
            numSystem + '.standard', obj) : '');
    }
    IntlBase.getSymbolPattern = getSymbolPattern;
    function getProperNumericSkeleton(skeleton) {
        var matches = skeleton.match(IntlBase.formatRegex);
        var ret = {};
        var pattern = matches[1].toUpperCase();
        ret.isAccount = (pattern === 'A');
        ret.type = IntlBase.patternMatcher[pattern];
        if (skeleton.length > 1) {
            ret.fractionDigits = parseInt(matches[2], 10);
        }
        return ret;
    }
    IntlBase.getProperNumericSkeleton = getProperNumericSkeleton;
    function getFormatData(pattern, needFraction, cSymbol, fractionOnly) {
        var nData = fractionOnly ? {} : { nlead: '', nend: '' };
        var match = pattern.match(IntlBase.customRegex);
        if (match) {
            if (!fractionOnly) {
                nData.nlead = changeCurrencySymbol(match[1], cSymbol);
                nData.nend = changeCurrencySymbol(match[10], cSymbol);
                nData.groupPattern = match[4];
            }
            var fraction = match[7];
            if (fraction && needFraction) {
                var fmatch = fraction.match(fractionRegex);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(fmatch)) {
                    nData.minimumFraction = fmatch.length;
                }
                else {
                    nData.minimumFraction = 0;
                }
                nData.maximumFraction = fraction.length - 1;
            }
        }
        return nData;
    }
    IntlBase.getFormatData = getFormatData;
    function changeCurrencySymbol(val, sym) {
        if (val) {
            return val.replace(IntlBase.defaultCurrency, sym);
        }
        return '';
    }
    function getCurrencySymbol(numericObject, currencyCode) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('currencies.' + currencyCode + '.symbol', numericObject) || '$';
    }
    IntlBase.getCurrencySymbol = getCurrencySymbol;
    function customFormat(format, dOptions, obj) {
        var options = {};
        var formatSplit = format.split(';');
        var data = ['pData', 'nData', 'zeroData'];
        for (var i = 0; i < formatSplit.length; i++) {
            options[data[i]] = customNumberFormat(formatSplit[i], dOptions, obj);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(options.nData)) {
            options.nData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, options.pData);
            options.nData.nlead = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(dOptions) ? '-' + options.nData.nlead : dOptions.minusSymbol + options.nData.nlead;
        }
        return options;
    }
    IntlBase.customFormat = customFormat;
    function customNumberFormat(format, dOptions, numObject) {
        var cOptions = { type: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 };
        var pattern = format.match(IntlBase.customRegex);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(pattern) || pattern[5] === '') {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])('Given Format is not valid or Cldr data not loaded');
        }
        cOptions.nlead = pattern[1];
        cOptions.nend = pattern[10];
        var integerPart = pattern[6];
        cOptions.useGrouping = integerPart.indexOf(',') !== -1;
        integerPart = integerPart.replace(/,/g, '');
        var fractionPart = pattern[7];
        if (integerPart.indexOf('0') !== -1) {
            cOptions.minimumIntegerDigits = integerPart.length - integerPart.indexOf('0');
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(fractionPart)) {
            cOptions.minimumFractionDigits = fractionPart.lastIndexOf('0');
            cOptions.maximumFractionDigits = fractionPart.lastIndexOf('#');
            if (cOptions.minimumFractionDigits === -1) {
                cOptions.minimumFractionDigits = 0;
            }
            if (cOptions.maximumFractionDigits === -1 || cOptions.maximumFractionDigits < cOptions.minimumFractionDigits) {
                cOptions.maximumFractionDigits = cOptions.minimumFractionDigits;
            }
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(dOptions)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '$', dOptions.currencySymbol));
            if (!cOptions.isCurrency) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', dOptions.percentSymbol));
            }
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', '%'));
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(numObject)) {
            var symbolPattern = getSymbolPattern(cOptions.type, dOptions.numberMapper.numberSystem, numObject, false);
            if (cOptions.useGrouping) {
                cOptions.groupSeparator = dOptions.numberMapper.numberSymbols[mapper[2]];
                cOptions.groupData = __WEBPACK_IMPORTED_MODULE_2__number_formatter__["a" /* NumberFormat */].getGroupingDetails(symbolPattern.split(';')[0]);
            }
            cOptions.nlead = cOptions.nlead.replace(/\'/g, '');
            cOptions.nend = cOptions.nend.replace(/\'/g, '');
        }
        return cOptions;
    }
    function isCurrencyPercent(parts, actual, symbol) {
        var options = { nlead: parts[0], nend: parts[1] };
        for (var i = 0; i < 2; i++) {
            var part = parts[i];
            var loc = part.indexOf(actual);
            if ((loc !== -1) && ((loc < part.indexOf('\'')) || (loc > part.lastIndexOf('\'')))) {
                options[typeMapper[i]] = part.substr(0, loc) + symbol + part.substr(loc + 1);
                options[typeMapper[actual]] = true;
                options.type = options.isCurrency ? 'currency' : 'percent';
                break;
            }
        }
        return options;
    }
    IntlBase.isCurrencyPercent = isCurrencyPercent;
    function getDateSeparator(dateObj) {
        var value = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('dateFormats.short', dateObj) || '').match(/[d‏M‏]([^d‏M])[d‏M‏]/i);
        return value ? value[1] : '/';
    }
    IntlBase.getDateSeparator = getDateSeparator;
})(IntlBase || (IntlBase = {}));


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParserBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
var defaultNumberingSystem = {
    'latn': {
        '_digits': '0123456789',
        '_type': 'numeric'
    }
};

var latnRegex = /^[0-9]*$/;
var defaultNumberSymbols = {
    'decimal': '.',
    'group': ',',
    'percentSign': '%',
    'plusSign': '+',
    'minusSign': '-',
    'infinity': '∞',
    'nan': 'NaN',
    'exponential': 'E'
};
var latnNumberSystem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var ParserBase = (function () {
    function ParserBase() {
    }
    ParserBase.getMainObject = function (obj, cName) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('main.' + cName, obj);
    };
    ParserBase.getNumberingSystem = function (obj) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('supplemental.numberingSystems', obj) || this.numberingSystems;
    };
    ParserBase.reverseObject = function (prop, keys) {
        var propKeys = keys || Object.keys(prop);
        var res = {};
        for (var _i = 0, propKeys_1 = propKeys; _i < propKeys_1.length; _i++) {
            var key = propKeys_1[_i];
            res[prop[key]] = key;
        }
        return res;
    };
    ParserBase.getSymbolRegex = function (props) {
        var regexStr = props.map(function (str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        }).join('|');
        return new RegExp(regexStr, 'g');
    };
    ParserBase.getSymbolMatch = function (prop) {
        var matchKeys = Object.keys(defaultNumberSymbols);
        var ret = {};
        for (var _i = 0, matchKeys_1 = matchKeys; _i < matchKeys_1.length; _i++) {
            var key = matchKeys_1[_i];
            ret[prop[key]] = defaultNumberSymbols[key];
        }
        return ret;
    };
    ParserBase.constructRegex = function (val) {
        var len = val.length;
        var ret = '';
        for (var i = 0; i < len; i++) {
            if (i !== len - 1) {
                ret += val[i] + '|';
            }
            else {
                ret += val[i];
            }
        }
        return ret;
    };
    ParserBase.convertValueParts = function (value, regex, obj) {
        return value.replace(regex, function (str) {
            return obj[str];
        });
    };
    ParserBase.getDefaultNumberingSystem = function (obj) {
        var ret = {};
        ret.obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('numbers', obj);
        ret.nSystem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('defaultNumberingSystem', ret.obj);
        return ret;
    };
    ParserBase.getCurrentNumericOptions = function (curObj, numberSystem, needSymbols) {
        var ret = {};
        var cur = this.getDefaultNumberingSystem(curObj);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(cur.nSystem)) {
            var digits = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(cur.nSystem + '._digits', numberSystem);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(digits)) {
                ret.numericPair = this.reverseObject(digits, latnNumberSystem);
                ret.numberParseRegex = new RegExp(this.constructRegex(digits), 'g');
                ret.numericRegex = '[' + digits[0] + '-' + digits[9] + ']';
                if (needSymbols) {
                    ret.numericRegex = digits[0] + '-' + digits[9];
                    ret.symbolNumberSystem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('symbols-numberSystem-' + cur.nSystem, cur.obj);
                    ret.symbolMatch = this.getSymbolMatch(ret.symbolNumberSystem);
                    ret.numberSystem = cur.nSystem;
                }
            }
        }
        return ret;
    };
    ParserBase.getNumberMapper = function (curObj, numberSystem, isNumber) {
        var ret = { mapper: {} };
        var cur = this.getDefaultNumberingSystem(curObj);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(cur.nSystem)) {
            ret.numberSystem = cur.nSystem;
            ret.numberSymbols = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('symbols-numberSystem-' + cur.nSystem, cur.obj);
            ret.timeSeparator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('timeSeparator', ret.numberSymbols);
            var digits = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(cur.nSystem + '._digits', numberSystem);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(digits)) {
                for (var _i = 0, latnNumberSystem_1 = latnNumberSystem; _i < latnNumberSystem_1.length; _i++) {
                    var i = latnNumberSystem_1[_i];
                    ret.mapper[i] = digits[i];
                }
            }
        }
        return ret;
    };
    return ParserBase;
}());

ParserBase.nPair = 'numericPair';
ParserBase.nRegex = 'numericRegex';
ParserBase.numberingSystems = defaultNumberingSystem;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DoubleRange = (function () {
        function DoubleRange(start, end) {
            if (start < end) {
                this.mStart = start;
                this.mEnd = end;
            }
            else {
                this.mStart = end;
                this.mEnd = start;
            }
        }
        Object.defineProperty(DoubleRange.prototype, "start", {
            get: function () {
                return this.mStart;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DoubleRange.prototype, "end", {
            get: function () {
                return this.mEnd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DoubleRange.prototype, "delta", {
            get: function () {
                return (this.mEnd - this.mStart);
            },
            enumerable: true,
            configurable: true
        });
        return DoubleRange;
    }());
    exports.DoubleRange = DoubleRange;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

var REGX_MOBILE = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
var REGX_IE = /msie|trident/i;
var REGX_IE11 = /Trident\/7\./;
var REGX_IOS = /(ipad|iphone|ipod touch)/i;
var REGX_IOS7 = /(ipad|iphone|ipod touch);.*os 7_\d|(ipad|iphone|ipod touch);.*os 8_\d/i;
var REGX_ANDROID = /android/i;
var REGX_WINDOWS = /trident|windows phone|edge/i;
var REGX_VERSION = /(version)[ \/]([\w.]+)/i;
var REGX_BROWSER = {
    OPERA: /(opera|opr)(?:.*version|)[ \/]([\w.]+)/i,
    EDGE: /(edge)(?:.*version|)[ \/]([\w.]+)/i,
    CHROME: /(chrome)[ \/]([\w.]+)/i,
    PANTHOMEJS: /(phantomjs)[ \/]([\w.]+)/i,
    SAFARI: /(safari)[ \/]([\w.]+)/i,
    WEBKIT: /(webkit)[ \/]([\w.]+)/i,
    MSIE: /(msie|trident) ([\w.]+)/i,
    MOZILLA: /(mozilla)(?:.*? rv:([\w.]+)|)/i
};
window.browserDetails = window.browserDetails || {};
var Browser = (function () {
    function Browser() {
    }
    Browser.extractBrowserDetail = function () {
        var browserInfo = { culture: {} };
        var keys = Object.keys(REGX_BROWSER);
        var clientInfo = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            clientInfo = Browser.userAgent.match(REGX_BROWSER[key]);
            if (clientInfo) {
                browserInfo.name = (clientInfo[1].toLowerCase() === 'opr' ? 'opera' : clientInfo[1].toLowerCase());
                browserInfo.version = clientInfo[2];
                browserInfo.culture.name = browserInfo.culture.language = navigator.language;
                if (!!Browser.userAgent.match(REGX_IE11)) {
                    browserInfo.name = 'msie';
                    break;
                }
                if (browserInfo.name === 'safari') {
                    browserInfo.version = Browser.userAgent.match(REGX_VERSION)[2];
                }
                break;
            }
        }
        return browserInfo;
    };
    Browser.getEvent = function (event) {
        var events = {
            start: {
                isPointer: 'pointerdown', isTouch: 'touchstart', isDevice: 'mousedown'
            },
            move: {
                isPointer: 'pointermove', isTouch: 'touchmove', isDevice: 'mousemove'
            },
            end: {
                isPointer: 'pointerup', isTouch: 'touchend', isDevice: 'mouseup'
            }
        };
        return (Browser.isPointer ? events[event].isPointer :
            (Browser.isTouch ? events[event].isTouch + (!Browser.isDevice ? ' ' + events[event].isDevice : '')
                : events[event].isDevice));
    };
    Browser.getTouchStartEvent = function () {
        return Browser.getEvent('start');
    };
    Browser.getTouchEndEvent = function () {
        return Browser.getEvent('end');
    };
    Browser.getTouchMoveEvent = function () {
        return Browser.getEvent('move');
    };
    Browser.getValue = function (key, regX) {
        var browserDetails = window.browserDetails;
        if ('undefined' === typeof browserDetails[key]) {
            return browserDetails[key] = regX.test(Browser.userAgent);
        }
        return browserDetails[key];
    };
    Object.defineProperty(Browser, "userAgent", {
        get: function () {
            return Browser.uA;
        },
        set: function (uA) {
            Browser.uA = uA;
            window.browserDetails = {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "info", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.info)) {
                return window.browserDetails.info = Browser.extractBrowserDetail();
            }
            return window.browserDetails.info;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isIE", {
        get: function () {
            return Browser.getValue('isIE', REGX_IE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isTouch", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.isTouch)) {
                return window.browserDetails.isTouch = ('ontouchstart' in window);
            }
            return window.browserDetails.isTouch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isPointer", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.isPointer)) {
                return window.browserDetails.isPointer = ('pointerEnabled' in window.navigator);
            }
            return window.browserDetails.isPointer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isMSPointer", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.isMSPointer)) {
                return window.browserDetails.isMSPointer = ('msPointerEnabled' in window.navigator);
            }
            return window.browserDetails.isMSPointer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isDevice", {
        get: function () {
            return Browser.getValue('isDevice', REGX_MOBILE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isIos", {
        get: function () {
            return Browser.getValue('isIos', REGX_IOS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isIos7", {
        get: function () {
            return Browser.getValue('isIos7', REGX_IOS7);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isAndroid", {
        get: function () {
            return Browser.getValue('isAndroid', REGX_ANDROID);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isWebView", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.isWebView)) {
                window.browserDetails.isWebView = !(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.cordova) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.PhoneGap)
                    && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.phonegap) && window.forge !== 'object');
                return window.browserDetails.isWebView;
            }
            return window.browserDetails.isWebView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "isWindows", {
        get: function () {
            return Browser.getValue('isWindows', REGX_WINDOWS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "touchStartEvent", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.touchStartEvent)) {
                return window.browserDetails.touchStartEvent = Browser.getTouchStartEvent();
            }
            return window.browserDetails.touchStartEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "touchMoveEvent", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.touchMoveEvent)) {
                return window.browserDetails.touchMoveEvent = Browser.getTouchMoveEvent();
            }
            return window.browserDetails.touchMoveEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser, "touchEndEvent", {
        get: function () {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(window.browserDetails.touchEndEvent)) {
                return window.browserDetails.touchEndEvent = Browser.getTouchEndEvent();
            }
            return window.browserDetails.touchEndEvent;
        },
        enumerable: true,
        configurable: true
    });
    return Browser;
}());

Browser.uA = navigator.userAgent;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChildProperty; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(4);


var ChildProperty = (function () {
    function ChildProperty(parent, propName, defaultValue, isArray) {
        this.properties = {};
        this.changedProperties = {};
        this.childChangedProperties = {};
        this.oldProperties = {};
        this.finalUpdate = function () { };
        this.callChildDataBind = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('callChildDataBind', __WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */]);
        this.parentObj = parent;
        this.controlParent = this.parentObj.controlParent || this.parentObj;
        this.propName = propName;
        this.setProperties(defaultValue, true);
        this.isParentArray = isArray;
    }
    ChildProperty.prototype.updateChange = function (val, propName) {
        if (val === true) {
            this.parentObj.childChangedProperties[propName] = val;
        }
        else {
            delete this.parentObj.childChangedProperties[propName];
        }
        if (this.parentObj.updateChange) {
            this.parentObj.updateChange(val, this.parentObj.propName);
        }
    };
    ChildProperty.prototype.updateTimeOut = function () {
        if (this.parentObj.updateTimeOut) {
            this.parentObj.finalUpdate();
            this.parentObj.updateTimeOut();
        }
        else {
            this.parentObj.finalUpdate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["l" /* setImmediate */])(this.parentObj.dataBind.bind(this.parentObj));
        }
    };
    ChildProperty.prototype.clearChanges = function () {
        this.finalUpdate();
        this.updateChange(false, this.propName);
        this.oldProperties = {};
        this.changedProperties = {};
    };
    ChildProperty.prototype.setProperties = function (prop, muteOnChange) {
        if (muteOnChange === true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this, prop);
            this.updateChange(false, this.propName);
            this.clearChanges();
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this, prop);
        }
    };
    ChildProperty.prototype.dataBind = function () {
        this.callChildDataBind(this.childChangedProperties, this);
        if (this.isParentArray) {
            var curIndex = this.parentObj[this.propName].indexOf(this);
            if (Object.keys(this.changedProperties).length) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(this.propName + '.' + curIndex, this.changedProperties, this.parentObj.changedProperties);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(this.propName + '.' + curIndex, this.oldProperties, this.parentObj.oldProperties);
            }
        }
        else {
            this.parentObj.changedProperties[this.propName] = this.changedProperties;
            this.parentObj.oldProperties[this.propName] = this.oldProperties;
        }
        this.clearChanges();
    };
    ChildProperty.prototype.saveChanges = function (key, newValue, oldValue) {
        if (this.controlParent.isProtectedOnChange) {
            return;
        }
        this.oldProperties[key] = oldValue;
        this.changedProperties[key] = newValue;
        this.updateChange(true, this.propName);
        this.finalUpdate();
        this.updateTimeOut();
    };
    return ChildProperty;
}());



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onIntlChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rightToLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return cldrData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return defaultCulture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return defaultCurrencyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Internationalization; });
/* harmony export (immutable) */ __webpack_exports__["g"] = setCulture;
/* harmony export (immutable) */ __webpack_exports__["h"] = setCurrencyCode;
/* harmony export (immutable) */ __webpack_exports__["i"] = loadCldr;
/* harmony export (immutable) */ __webpack_exports__["j"] = enableRtl;
/* harmony export (immutable) */ __webpack_exports__["k"] = getNumericObject;
/* harmony export (immutable) */ __webpack_exports__["l"] = getDefaultDateObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Internationalization_date_formatter__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Internationalization_number_formatter__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Internationalization_date_parser__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Internationalization_number_parser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__observer__ = __webpack_require__(24);







var onIntlChange = new __WEBPACK_IMPORTED_MODULE_6__observer__["a" /* Observer */]();
var rightToLeft = false;
var cldrData = {};
var defaultCulture = 'en-US';
var defaultCurrencyCode = 'USD';
var mapper = ['numericObject', 'dateObject'];
var Internationalization = (function () {
    function Internationalization(cultureName) {
        if (cultureName) {
            this.culture = cultureName;
        }
    }
    Internationalization.prototype.getDateFormat = function (options) {
        return __WEBPACK_IMPORTED_MODULE_0__Internationalization_date_formatter__["a" /* DateFormat */].dateFormat(this.getCulture(), options || { type: 'date', skeleton: 'short' }, cldrData);
    };
    Internationalization.prototype.getNumberFormat = function (options) {
        if (options && !options.currency) {
            options.currency = defaultCurrencyCode;
        }
        return __WEBPACK_IMPORTED_MODULE_1__Internationalization_number_formatter__["a" /* NumberFormat */].numberFormatter(this.getCulture(), options || {}, cldrData);
    };
    Internationalization.prototype.getDateParser = function (options) {
        return __WEBPACK_IMPORTED_MODULE_2__Internationalization_date_parser__["a" /* DateParser */].dateParser(this.getCulture(), options || { skeleton: 'short', type: 'date' }, cldrData);
    };
    Internationalization.prototype.getNumberParser = function (options) {
        return __WEBPACK_IMPORTED_MODULE_3__Internationalization_number_parser__["a" /* NumberParser */].numberParser(this.getCulture(), options || { format: 'N' }, cldrData);
    };
    Internationalization.prototype.formatNumber = function (value, option) {
        return this.getNumberFormat(option)(value);
    };
    Internationalization.prototype.formatDate = function (value, option) {
        return this.getDateFormat(option)(value);
    };
    Internationalization.prototype.parseDate = function (value, option) {
        return this.getDateParser(option)(value);
    };
    Internationalization.prototype.parseNumber = function (value, option) {
        return this.getNumberParser(option)(value);
    };
    Internationalization.prototype.getCulture = function () {
        return this.culture || defaultCulture;
    };
    return Internationalization;
}());

function setCulture(cultureName) {
    defaultCulture = cultureName;
    onIntlChange.notify('notifyExternalChange', { 'locale': defaultCulture });
}
function setCurrencyCode(currencyCode) {
    defaultCurrencyCode = currencyCode;
}
function loadCldr() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
        var obj = data_1[_a];
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["a" /* extend */])(cldrData, obj, {}, true);
    }
}
function enableRtl(status) {
    if (status === void 0) { status = true; }
    rightToLeft = status;
    onIntlChange.notify('notifyExternalChange', { enableRtl: rightToLeft });
}
function getNumericObject(locale, type) {
    var numObject = __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getDependables(cldrData, locale, true)[mapper[0]];
    var dateObject = __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getDependables(cldrData, locale)[mapper[1]];
    var numSystem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["f" /* getValue */])('defaultNumberingSystem', numObject);
    var symbPattern = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["f" /* getValue */])('symbols-numberSystem-' + numSystem, numObject);
    var pattern = __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getSymbolPattern(type || 'decimal', numSystem, numObject, false);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["a" /* extend */])(symbPattern, __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getFormatData(pattern, true, '', true), { 'dateSeparator': __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getDateSeparator(dateObject) });
}
function getDefaultDateObject() {
    return __WEBPACK_IMPORTED_MODULE_4__Internationalization_intl_base__["a" /* IntlBase */].getDependables(cldrData, '', false)[mapper[1]];
}


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Predicate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(21);

var Query = (function () {
    function Query(from) {
        this.subQuery = null;
        this.isChild = false;
        this.queries = [];
        this.key = '';
        this.fKey = '';
        if (typeof from === 'string') {
            this.fromTable = from;
        }
        else if (from && from instanceof Array) {
            this.lookups = from;
        }
        this.expands = [];
        this.sortedColumns = [];
        this.groupedColumns = [];
        this.subQuery = null;
        this.isChild = false;
        this.params = [];
        return this;
    }
    Query.prototype.setKey = function (field) {
        this.key = field;
        return this;
    };
    Query.prototype.using = function (dataManager) {
        this.dataManager = dataManager;
        return this;
    };
    Query.prototype.execute = function (dataManager, done, fail, always) {
        dataManager = dataManager || this.dataManager;
        if (dataManager) {
            return dataManager.executeQuery(this, done, fail, always);
        }
        return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* DataUtil */].throwError('Query - execute() : dataManager needs to be is set using "using" function or should be passed as argument');
    };
    Query.prototype.executeLocal = function (dataManager) {
        dataManager = dataManager || this.dataManager;
        if (dataManager) {
            return dataManager.executeLocal(this);
        }
        return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* DataUtil */].throwError('Query - executeLocal() : dataManager needs to be is set using "using" function or should be passed as argument');
    };
    Query.prototype.clone = function () {
        var cloned = new Query();
        cloned.queries = this.queries.slice(0);
        cloned.key = this.key;
        cloned.isChild = this.isChild;
        cloned.dataManager = this.dataManager;
        cloned.fromTable = this.fromTable;
        cloned.params = this.params.slice(0);
        cloned.expands = this.expands.slice(0);
        cloned.sortedColumns = this.sortedColumns.slice(0);
        cloned.groupedColumns = this.groupedColumns.slice(0);
        cloned.subQuerySelector = this.subQuerySelector;
        cloned.subQuery = this.subQuery;
        cloned.fKey = this.fKey;
        cloned.requiresCounts = this.requiresCounts;
        return cloned;
    };
    Query.prototype.from = function (tableName) {
        this.fromTable = tableName;
        return this;
    };
    Query.prototype.addParams = function (key, value) {
        if (typeof value === 'function') {
            this.params.push({ key: key, fn: value });
        }
        else {
            this.params.push({ key: key, value: value });
        }
        return this;
    };
    Query.prototype.expand = function (tables) {
        if (typeof tables === 'string') {
            this.expands = [].slice.call([tables], 0);
        }
        else {
            this.expands = tables.slice(0);
        }
        return this;
    };
    Query.prototype.where = function (fieldName, operator, value, ignoreCase) {
        operator = operator ? (operator).toLowerCase() : null;
        var predicate = null;
        if (typeof fieldName === 'string') {
            predicate = new Predicate(fieldName, operator, value, ignoreCase);
        }
        else if (fieldName instanceof Predicate) {
            predicate = fieldName;
        }
        this.queries.push({
            fn: 'onWhere',
            e: predicate
        });
        return this;
    };
    Query.prototype.search = function (searchKey, fieldNames, operator, ignoreCase) {
        if (typeof fieldNames === 'string') {
            fieldNames = [fieldNames];
        }
        operator = operator || 'contains';
        var comparer = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* DataUtil */].fnOperators[operator];
        this.queries.push({
            fn: 'onSearch',
            e: {
                fieldNames: fieldNames,
                operator: operator,
                searchKey: searchKey,
                ignoreCase: ignoreCase,
                comparer: comparer
            }
        });
        return this;
    };
    Query.prototype.sortBy = function (fieldName, comparer, isFromGroup) {
        var order = 'ascending';
        var sorts;
        var temp;
        if (typeof fieldName === 'string' && __WEBPACK_IMPORTED_MODULE_0__util__["a" /* DataUtil */].endsWith(fieldName.toLowerCase(), ' desc')) {
            fieldName = fieldName.replace(/ desc$/i, '');
            comparer = 'descending';
        }
        if (!comparer || typeof comparer === 'string') {
            order = comparer ? comparer.toLowerCase() : 'ascending';
            comparer = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* DataUtil */].fnSort(comparer);
        }
        if (isFromGroup) {
            sorts = Query.filterQueries(this.queries, 'onSortBy');
            for (var i = 0; i < sorts.length; i++) {
                temp = sorts[i].e.fieldName;
                if (typeof temp === 'string') {
                    if (temp === fieldName) {
                        return this;
                    }
                }
                else if (temp instanceof Array) {
                    for (var j = 0; j < temp.length; j++) {
                        if (temp[j] === fieldName || fieldName.toLowerCase() === temp[j] + ' desc') {
                            return this;
                        }
                    }
                }
            }
        }
        this.queries.push({
            fn: 'onSortBy',
            e: {
                fieldName: fieldName,
                comparer: comparer,
                direction: order
            }
        });
        return this;
    };
    Query.prototype.sortByDesc = function (fieldName) {
        return this.sortBy(fieldName, 'descending');
    };
    Query.prototype.group = function (fieldName) {
        this.sortBy(fieldName, null, true);
        this.queries.push({
            fn: 'onGroup',
            e: {
                fieldName: fieldName
            }
        });
        return this;
    };
    Query.prototype.page = function (pageIndex, pageSize) {
        this.queries.push({
            fn: 'onPage',
            e: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        });
        return this;
    };
    Query.prototype.range = function (start, end) {
        this.queries.push({
            fn: 'onRange',
            e: {
                start: start,
                end: end
            }
        });
        return this;
    };
    Query.prototype.take = function (nos) {
        this.queries.push({
            fn: 'onTake',
            e: {
                nos: nos
            }
        });
        return this;
    };
    Query.prototype.skip = function (nos) {
        this.queries.push({
            fn: 'onSkip',
            e: { nos: nos }
        });
        return this;
    };
    Query.prototype.select = function (fieldNames) {
        if (typeof fieldNames === 'string') {
            fieldNames = [].slice.call([fieldNames], 0);
        }
        this.queries.push({
            fn: 'onSelect',
            e: { fieldNames: fieldNames }
        });
        return this;
    };
    Query.prototype.hierarchy = function (query, selectorFn) {
        this.subQuerySelector = selectorFn;
        this.subQuery = query;
        return this;
    };
    Query.prototype.foreignKey = function (key) {
        this.fKey = key;
        return this;
    };
    Query.prototype.requiresCount = function () {
        this.requiresCounts = true;
        return this;
    };
    Query.prototype.aggregate = function (type, field) {
        this.queries.push({
            fn: 'onAggregates',
            e: { field: field, type: type }
        });
        return this;
    };
    Query.filterQueries = function (queries, name) {
        return queries.filter(function (q) {
            return q.fn === name;
        });
    };
    Query.filterQueryLists = function (queries, singles) {
        var filtered = queries.filter(function (q) {
            return singles.indexOf(q.fn) !== -1;
        });
        var res = {};
        for (var i = 0; i < filtered.length; i++) {
            if (!res[filtered[i].fn]) {
                res[filtered[i].fn] = filtered[i].e;
            }
        }
        return res;
    };
    return Query;
}());

var Predicate = (function () {
    function Predicate(field, operator, value, ignoreCase) {
        if (ignoreCase === void 0) { ignoreCase = false; }
        this.isComplex = false;
        if (typeof field === 'string') {
            this.field = field;
            this.operator = operator.toLowerCase();
            this.value = value;
            this.ignoreCase = ignoreCase;
            this.isComplex = false;
            this.comparer = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* DataUtil */].fnOperators.processOperator(this.operator);
        }
        else if (field instanceof Predicate && value instanceof Predicate || value instanceof Array) {
            this.isComplex = true;
            this.condition = operator.toLowerCase();
            this.predicates = [field];
            if (value instanceof Array) {
                [].push.apply(this.predicates, value);
            }
            else {
                this.predicates.push(value);
            }
        }
        return this;
    }
    Predicate.and = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Predicate.combinePredicates([].slice.call(args, 0), 'and');
    };
    Predicate.prototype.and = function (field, operator, value, ignoreCase) {
        return Predicate.combine(this, field, operator, value, 'and', ignoreCase);
    };
    Predicate.or = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Predicate.combinePredicates([].slice.call(args, 0), 'or');
    };
    Predicate.prototype.or = function (field, operator, value, ignoreCase) {
        return Predicate.combine(this, field, operator, value, 'or', ignoreCase);
    };
    Predicate.fromJson = function (json) {
        if (json instanceof Array) {
            var res = [];
            for (var i = 0, len = json.length; i < len; i++) {
                res.push(this.fromJSONData(json[i]));
            }
            return res;
        }
        var pred = json;
        return this.fromJSONData(pred);
    };
    Predicate.prototype.validate = function (record) {
        var predicate = this.predicates ? this.predicates : [];
        var isAnd;
        var ret;
        if (!this.isComplex && this.comparer) {
            return this.comparer.call(this, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* DataUtil */].getObject(this.field, record), this.value, this.ignoreCase);
        }
        isAnd = this.condition === 'and';
        for (var i = 0; i < predicate.length; i++) {
            ret = predicate[i].validate(record);
            if (isAnd) {
                if (!ret) {
                    return false;
                }
            }
            else {
                if (ret) {
                    return true;
                }
            }
        }
        return isAnd;
    };
    Predicate.prototype.toJson = function () {
        var predicates;
        var p;
        if (this.isComplex) {
            predicates = [];
            p = this.predicates;
            for (var i = 0; i < p.length; i++) {
                predicates.push(p[i].toJson());
            }
        }
        return {
            isComplex: this.isComplex,
            field: this.field,
            operator: this.operator,
            value: this.value,
            ignoreCase: this.ignoreCase,
            condition: this.condition,
            predicates: predicates
        };
    };
    Predicate.combinePredicates = function (predicates, operator) {
        if (predicates.length === 1) {
            if (!(predicates[0] instanceof Array)) {
                return predicates[0];
            }
            predicates = predicates[0];
        }
        return new Predicate(predicates[0], operator, predicates.slice(1));
    };
    Predicate.combine = function (pred, field, operator, value, condition, ignoreCase) {
        if (field instanceof Predicate) {
            return Predicate[condition](pred, field);
        }
        if (typeof field === 'string') {
            return Predicate[condition](pred, new Predicate(field, operator, value, ignoreCase));
        }
        return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* DataUtil */].throwError('Predicate - ' + condition + ' : invalid arguments');
    };
    Predicate.fromJSONData = function (json) {
        var preds = json.predicates || [];
        var len = preds.length;
        var predicates = [];
        var result;
        for (var i = 0; i < len; i++) {
            predicates.push(this.fromJSONData(preds[i]));
        }
        if (!json.isComplex) {
            result = new Predicate(json.field, json.operator, json.value, json.ignoreCase);
        }
        else {
            result = new Predicate(predicates[0], json.condition, predicates.slice(1));
        }
        return result;
    };
    return Predicate;
}());



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manager__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__query__ = __webpack_require__(20);



var consts = { GroupGuid: '{271bbba0-1ee7}' };
var DataUtil = (function () {
    function DataUtil() {
    }
    DataUtil.getValue = function (value, inst) {
        if (typeof value === 'function') {
            return value.call(inst || {});
        }
        return value;
    };
    DataUtil.endsWith = function (input, substr) {
        return input.slice(-substr.length) === substr;
    };
    DataUtil.startsWith = function (input, start) {
        return input.slice(0, start.length) === start;
    };
    DataUtil.fnSort = function (order) {
        order = order ? order.toLowerCase() : 'ascending';
        if (order === 'ascending') {
            return this.fnAscending;
        }
        return this.fnDescending;
    };
    DataUtil.fnAscending = function (x, y) {
        if (y === null || y === undefined) {
            return -1;
        }
        if (typeof x === 'string') {
            return x.localeCompare(y);
        }
        if (x === null || x === undefined) {
            return 1;
        }
        return x - y;
    };
    DataUtil.fnDescending = function (x, y) {
        if (y === null || y === undefined) {
            return 1;
        }
        if (typeof x === 'string') {
            return x.localeCompare(y) * -1;
        }
        if (x === null || x === undefined) {
            return -1;
        }
        return y - x;
    };
    DataUtil.extractFields = function (obj, fields) {
        var newObj = {};
        if (fields.length === 1) {
            return this.getObject(fields[0], obj);
        }
        for (var i = 0; i < fields.length; i++) {
            newObj[fields[i].replace('.', '_')] = this.getObject(fields[i], obj);
        }
        return newObj;
    };
    DataUtil.select = function (jsonArray, fields) {
        var newData = [];
        for (var i = 0; i < jsonArray.length; i++) {
            newData.push(this.extractFields(jsonArray[i], fields));
        }
        return newData;
    };
    DataUtil.group = function (jsonArray, field, aggregates, level, groupDs) {
        level = level || 1;
        var jsonData = jsonArray;
        var guid = 'GroupGuid';
        if (jsonData.GroupGuid === consts[guid]) {
            var _loop_1 = function (j) {
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(groupDs)) {
                    var indx = -1;
                    var temp = groupDs.filter(function (e) { return e.key === jsonData[j].key; });
                    indx = groupDs.indexOf(temp[0]);
                    jsonData[j].items = this_1.group(jsonData[j].items, field, aggregates, jsonData.level + 1, groupDs[indx].items);
                    jsonData[j].count = groupDs[indx].count;
                }
                else {
                    jsonData[j].items = this_1.group(jsonData[j].items, field, aggregates, jsonData.level + 1);
                    jsonData[j].count = jsonData[j].items.length;
                }
            };
            var this_1 = this;
            for (var j = 0; j < jsonData.length; j++) {
                _loop_1(j);
            }
            jsonData.childLevels += 1;
            return jsonData;
        }
        var grouped = {};
        var groupedArray = [];
        groupedArray.GroupGuid = consts[guid];
        groupedArray.level = level;
        groupedArray.childLevels = 0;
        groupedArray.records = jsonData;
        var _loop_2 = function (i) {
            var val = this_2.getVal(jsonData, i, field);
            if (!grouped[val]) {
                grouped[val] = {
                    key: val,
                    count: 0,
                    items: [],
                    aggregates: {},
                    field: field
                };
                groupedArray.push(grouped[val]);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(groupDs)) {
                    var tempObj = groupDs.filter(function (e) { return e.key === grouped[val].key; });
                    grouped[val].count = tempObj[0].count;
                }
            }
            grouped[val].count = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(groupDs) ? grouped[val].count : grouped[val].count += 1;
            grouped[val].items.push(jsonData[i]);
        };
        var this_2 = this;
        for (var i = 0; i < jsonData.length; i++) {
            _loop_2(i);
        }
        if (aggregates && aggregates.length) {
            var _loop_3 = function (i) {
                var res = {};
                var fn = void 0;
                var aggs = aggregates;
                for (var j = 0; j < aggregates.length; j++) {
                    fn = DataUtil.aggregates[aggregates[j].type];
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(groupDs)) {
                        var temp = groupDs.filter(function (e) { return e.key === groupedArray[i].key; });
                        if (fn) {
                            res[aggs[j].field + ' - ' + aggs[j].type] = fn(temp[0].items, aggs[j].field);
                        }
                    }
                    else {
                        if (fn) {
                            res[aggs[j].field + ' - ' + aggs[j].type] = fn(groupedArray[i].items, aggs[j].field);
                        }
                    }
                }
                groupedArray[i].aggregates = res;
            };
            for (var i = 0; i < groupedArray.length; i++) {
                _loop_3(i);
            }
        }
        return groupedArray;
    };
    DataUtil.buildHierarchy = function (fKey, from, source, lookup, pKey) {
        var i;
        var grp = {};
        var temp;
        if (lookup.result) {
            lookup = lookup.result;
        }
        if (lookup.GroupGuid) {
            this.throwError('DataManager: Do not have support Grouping in hierarchy');
        }
        for (i = 0; i < lookup.length; i++) {
            var fKeyData = this.getObject(fKey, lookup[i]);
            temp = grp[fKeyData] || (grp[fKeyData] = []);
            temp.push(lookup[i]);
        }
        for (i = 0; i < source.length; i++) {
            var fKeyData = this.getObject(pKey || fKey, source[i]);
            source[i][from] = grp[fKeyData];
        }
    };
    DataUtil.getFieldList = function (obj, fields, prefix) {
        if (prefix === undefined) {
            prefix = '';
        }
        if (fields === undefined || fields === null) {
            return this.getFieldList(obj, [], prefix);
        }
        var copyObj = obj;
        var keys = Object.keys(obj);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var prop = keys_1[_i];
            if (typeof copyObj[prop] === 'object' && !(copyObj[prop] instanceof Array)) {
                this.getFieldList(copyObj[prop], fields, prefix + prop + '.');
            }
            else {
                fields.push(prefix + prop);
            }
        }
        return fields;
    };
    DataUtil.getObject = function (nameSpace, from) {
        if (!nameSpace) {
            return from;
        }
        if (nameSpace.indexOf('.') === -1) {
            return from[nameSpace];
        }
        var value = from;
        var splits = nameSpace.split('.');
        for (var i = 0; i < splits.length; i++) {
            if (value == null) {
                break;
            }
            value = value[splits[i]];
        }
        return value;
    };
    DataUtil.sort = function (ds, field, comparer) {
        if (ds.length <= 1) {
            return ds;
        }
        var middle = parseInt((ds.length / 2).toString(), 10);
        var left = ds.slice(0, middle);
        var right = ds.slice(middle);
        left = this.sort(left, field, comparer);
        right = this.sort(right, field, comparer);
        return this.merge(left, right, field, comparer);
    };
    DataUtil.merge = function (left, right, fieldName, comparer) {
        var result = [];
        var current;
        while (left.length > 0 || right.length > 0) {
            if (left.length > 0 && right.length > 0) {
                if (comparer) {
                    current = comparer(this.getVal(left, 0, fieldName), this.getVal(right, 0, fieldName)) <= 0 ? left : right;
                }
                else {
                    current = left[0][fieldName] < left[0][fieldName] ? left : right;
                }
            }
            else {
                current = left.length > 0 ? left : right;
            }
            result.push(current.shift());
        }
        return result;
    };
    DataUtil.getVal = function (array, index, field) {
        return field ? this.getObject(field, array[index]) : array[index];
    };
    DataUtil.toLowerCase = function (val) {
        return val ? typeof val === 'string' ? val.toLowerCase() : val.toString() : (val === 0 || val === false) ? val.toString() : '';
    };
    DataUtil.callAdaptorFunction = function (adaptor, fnName, param1, param2) {
        if (fnName in adaptor) {
            var res = adaptor[fnName](param1, param2);
            if (!this.fnOperators.isnull(res)) {
                param1 = res;
            }
        }
        return param1;
    };
    DataUtil.isPlainObject = function (obj) {
        return (!!obj) && (obj.constructor === Object);
    };
    DataUtil.isCors = function () {
        var xhr = null;
        var request = 'XMLHttpRequest';
        try {
            xhr = new window[request]();
        }
        catch (e) {
        }
        return !!xhr && ('withCredentials' in xhr);
    };
    DataUtil.getGuid = function (prefix) {
        var hexs = '0123456789abcdef';
        var rand;
        return (prefix || '') + '00000000-0000-4000-0000-000000000000'.replace(/0/g, function (val, i) {
            if ('crypto' in window && 'getRandomValues' in crypto) {
                var arr = new Uint8Array(1);
                window.crypto.getRandomValues(arr);
                rand = arr[0] % 16 | 0;
            }
            else {
                rand = Math.random() * 16 | 0;
            }
            return hexs[i === 19 ? rand & 0x3 | 0x8 : rand];
        });
    };
    DataUtil.isNull = function (val) {
        return val === undefined || val === null;
    };
    DataUtil.getItemFromComparer = function (array, field, comparer) {
        var keyVal;
        var current;
        var key;
        var i = 0;
        var castRequired = typeof DataUtil.getVal(array, 0, field) === 'string';
        if (array.length) {
            while (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(keyVal) && i < array.length) {
                keyVal = DataUtil.getVal(array, i, field);
                key = array[i++];
            }
        }
        for (; i < array.length; i++) {
            current = DataUtil.getVal(array, i, field);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(current)) {
                continue;
            }
            if (castRequired) {
                keyVal = +keyVal;
                current = +current;
            }
            if (comparer(keyVal, current) > 0) {
                keyVal = current;
                key = array[i];
            }
        }
        return key;
    };
    return DataUtil;
}());

DataUtil.serverTimezoneOffset = 0;
DataUtil.throwError = function (error) {
    try {
        throw new Error(error);
    }
    catch (e) {
        throw e.message + '\n' + e.stack;
    }
};
DataUtil.aggregates = {
    sum: function (ds, field) {
        var result = 0;
        var val;
        var castRequired = typeof DataUtil.getVal(ds, 0, field) !== 'number';
        for (var i = 0; i < ds.length; i++) {
            val = DataUtil.getVal(ds, i, field);
            if (!isNaN(val) && val !== null) {
                if (castRequired) {
                    val = +val;
                }
                result += val;
            }
        }
        return result;
    },
    average: function (ds, field) {
        return DataUtil.aggregates.sum(ds, field) / ds.length;
    },
    min: function (ds, field) {
        var comparer;
        if (typeof field === 'function') {
            comparer = field;
            field = null;
        }
        return DataUtil.getObject(field, DataUtil.getItemFromComparer(ds, field, comparer || DataUtil.fnAscending));
    },
    max: function (ds, field) {
        var comparer;
        if (typeof field === 'function') {
            comparer = field;
            field = null;
        }
        return DataUtil.getObject(field, DataUtil.getItemFromComparer(ds, field, comparer || DataUtil.fnDescending));
    },
    truecount: function (ds, field) {
        return new __WEBPACK_IMPORTED_MODULE_1__manager__["a" /* DataManager */](ds).executeLocal(new __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */]().where(field, 'equal', true, true)).length;
    },
    falsecount: function (ds, field) {
        return new __WEBPACK_IMPORTED_MODULE_1__manager__["a" /* DataManager */](ds).executeLocal(new __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */]().where(field, 'equal', false, true)).length;
    },
    count: function (ds, field) {
        return ds.length;
    }
};
DataUtil.operatorSymbols = {
    '<': 'lessthan',
    '>': 'greaterthan',
    '<=': 'lessthanorequal',
    '>=': 'greaterthanorequal',
    '==': 'equal',
    '!=': 'notequal',
    '*=': 'contains',
    '$=': 'endswith',
    '^=': 'startswith'
};
DataUtil.odBiOperator = {
    '<': ' lt ',
    '>': ' gt ',
    '<=': ' le ',
    '>=': ' ge ',
    '==': ' eq ',
    '!=': ' ne ',
    'lessthan': ' lt ',
    'lessthanorequal': ' le ',
    'greaterthan': ' gt ',
    'greaterthanorequal': ' ge ',
    'equal': ' eq ',
    'notequal': ' ne '
};
DataUtil.odUniOperator = {
    '$=': 'endswith',
    '^=': 'startswith',
    '*=': 'substringof',
    'endswith': 'endswith',
    'startswith': 'startswith',
    'contains': 'substringof'
};
DataUtil.fnOperators = {
    equal: function (actual, expected, ignoreCase) {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) === DataUtil.toLowerCase(expected);
        }
        return actual === expected;
    },
    notequal: function (actual, expected, ignoreCase) {
        return !DataUtil.fnOperators.equal(actual, expected, ignoreCase);
    },
    lessthan: function (actual, expected, ignoreCase) {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) < DataUtil.toLowerCase(expected);
        }
        return actual < expected;
    },
    greaterthan: function (actual, expected, ignoreCase) {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) > DataUtil.toLowerCase(expected);
        }
        return actual > expected;
    },
    lessthanorequal: function (actual, expected, ignoreCase) {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) <= DataUtil.toLowerCase(expected);
        }
        return actual <= expected;
    },
    greaterthanorequal: function (actual, expected, ignoreCase) {
        if (ignoreCase) {
            return DataUtil.toLowerCase(actual) >= DataUtil.toLowerCase(expected);
        }
        return actual >= expected;
    },
    contains: function (actual, expected, ignoreCase) {
        if (ignoreCase) {
            return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(actual) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(expected) &&
                DataUtil.toLowerCase(actual).indexOf(DataUtil.toLowerCase(expected)) !== -1;
        }
        return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(actual) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(expected) &&
            actual.toString().indexOf(expected) !== -1;
    },
    notnull: function (actual) {
        return actual !== null;
    },
    isnull: function (actual) {
        return actual === null;
    },
    startswith: function (actual, expected, ignoreCase) {
        if (ignoreCase) {
            return actual && expected && DataUtil.startsWith(actual.toLowerCase(), expected.toLowerCase());
        }
        return actual && expected && DataUtil.startsWith(actual, expected);
    },
    endswith: function (actual, expected, ignoreCase) {
        if (ignoreCase) {
            return actual && expected && DataUtil.endsWith(actual.toLowerCase(), expected.toLowerCase());
        }
        return actual && expected && DataUtil.endsWith(actual, expected);
    },
    processSymbols: function (operator) {
        var fnName = DataUtil.operatorSymbols[operator];
        if (fnName) {
            var fn = DataUtil.fnOperators[fnName];
            return fn;
        }
        return DataUtil.throwError('Query - Process Operator : Invalid operator');
    },
    processOperator: function (operator) {
        var fn = DataUtil.fnOperators[operator];
        if (fn) {
            return fn;
        }
        return DataUtil.fnOperators.processSymbols(operator);
    }
};
DataUtil.parse = {
    parseJson: function (jsonText) {
        if (typeof jsonText === 'string') {
            jsonText = JSON.parse(jsonText, DataUtil.parse.jsonReviver);
        }
        else if (jsonText instanceof Array) {
            DataUtil.parse.iterateAndReviveArray(jsonText);
        }
        else if (typeof jsonText === 'object') {
            DataUtil.parse.iterateAndReviveJson(jsonText);
        }
        return jsonText;
    },
    iterateAndReviveArray: function (array) {
        for (var i = 0; i < array.length; i++) {
            if (typeof array[i] === 'object') {
                DataUtil.parse.iterateAndReviveJson(array[i]);
            }
            else if (typeof array[i] === 'string' && !/^[\s]*\[|^[\s]*\{|\"/g.test(array[i])) {
                array[i] = DataUtil.parse.jsonReviver('', array[i]);
            }
            else {
                array[i] = DataUtil.parse.parseJson(array[i]);
            }
        }
    },
    iterateAndReviveJson: function (json) {
        var value;
        var keys = Object.keys(json);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var prop = keys_2[_i];
            if (DataUtil.startsWith(prop, '__')) {
                continue;
            }
            value = json[prop];
            if (typeof value === 'object') {
                if (value instanceof Array) {
                    DataUtil.parse.iterateAndReviveArray(value);
                }
                else if (value) {
                    DataUtil.parse.iterateAndReviveJson(value);
                }
            }
            else {
                json[prop] = DataUtil.parse.jsonReviver(json[prop], value);
            }
        }
    },
    jsonReviver: function (field, value) {
        var dupValue = value;
        if (typeof value === 'string') {
            var ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
            if (ms) {
                return DataUtil.parse.jsonReplacer({ value: new Date(parseInt(ms[1], 10)) }, false).value;
            }
            else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
                var arr = dupValue.split(/[^0-9]/);
                value = DataUtil.parse.jsonReplacer({ value: new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5], 10)) }, false).value;
            }
        }
        return value;
    },
    isJson: function (jsonData) {
        if (typeof jsonData[0] === 'string') {
            return jsonData;
        }
        return DataUtil.parse.parseJson(jsonData);
    },
    isGuid: function (value) {
        var regex = /[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/i;
        var match = regex.exec(value);
        return match != null;
    },
    replacer: function (value) {
        if (DataUtil.isPlainObject(value)) {
            return DataUtil.parse.jsonReplacer(value);
        }
        if (value instanceof Array) {
            return DataUtil.parse.arrayReplacer(value);
        }
        if (value instanceof Date) {
            return DataUtil.parse.jsonReplacer({ val: value }).val;
        }
        return value;
    },
    jsonReplacer: function (val, stringify) {
        if (stringify === void 0) { stringify = true; }
        var value;
        var keys = Object.keys(val);
        for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
            var prop = keys_3[_i];
            value = val[prop];
            if (!(value instanceof Date)) {
                continue;
            }
            var d = value;
            var unixstamp = +d - (d.getTimezoneOffset() * 60000);
            val[prop] = new Date(unixstamp - (DataUtil.serverTimezoneOffset * 3600000));
            if (stringify) {
                val[prop] = val[prop].toJSON();
            }
        }
        return val;
    },
    arrayReplacer: function (val) {
        for (var i = 0; i < val.length; i++) {
            if (DataUtil.isPlainObject(val[i])) {
                val[i] = DataUtil.parse.jsonReplacer(val[i]);
            }
            else if (val[i] instanceof Date) {
                val[i] = DataUtil.parse.jsonReplacer({ date: val[i] }).date;
            }
        }
        return val;
    }
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(8), __webpack_require__(0), __webpack_require__(16), __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, axis_1, helper_1, double_range_1, helper_2, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Double = (function () {
        function Double(chart) {
            this.chart = chart;
        }
        Double.prototype.calculateNumericNiceInterval = function (axis, delta, size) {
            var actualDesiredIntervalsCount = axis.getActualDesiredIntervalsCount(size);
            var niceInterval = delta / actualDesiredIntervalsCount;
            if (axis.desiredIntervals != null) {
                return niceInterval;
            }
            var minInterval = Math.pow(10, Math.floor(helper_2.logBase(niceInterval, 10)));
            for (var _i = 0, _a = axis.intervalDivs; _i < _a.length; _i++) {
                var interval = _a[_i];
                var currentInterval = minInterval * interval;
                if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                    break;
                }
                niceInterval = currentInterval;
            }
            return niceInterval;
        };
        Double.prototype.getActualRange = function (axis, size) {
            this.initializeDoubleRange(axis);
            axis.actualRange.interval = axis.interval || this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
            axis.actualRange.min = axis.doubleRange.start;
            axis.actualRange.max = axis.doubleRange.end;
        };
        Double.prototype.initializeDoubleRange = function (axis) {
            if (axis.minimum !== null) {
                this.min = axis.minimum;
            }
            else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
                this.min = 0;
            }
            if (axis.maximum !== null) {
                this.max = axis.maximum;
            }
            else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
                this.max = 5;
            }
            if (this.min === this.max) {
                this.max = this.min + 1;
            }
            axis.doubleRange = new double_range_1.DoubleRange(this.min, this.max);
            axis.actualRange = {};
        };
        Double.prototype.calculateRangeAndInterval = function (size, axis) {
            this.calculateRange(axis, size);
            this.getActualRange(axis, size);
            this.applyRangePadding(axis, size);
            this.calculateVisibleLabels(axis);
        };
        Double.prototype.calculateRange = function (axis, size) {
            var series;
            var paddingInterval = 0;
            this.min = null;
            this.max = null;
            if (!axis.setRange()) {
                for (var _i = 0, _a = axis.series; _i < _a.length; _i++) {
                    var series_1 = _a[_i];
                    if (!series_1.visible) {
                        continue;
                    }
                    paddingInterval = 0;
                    if (series_1.type.indexOf('Column') > -1 || series_1.type.indexOf('Bar') > -1) {
                        if (series_1.xAxis.valueType === 'Double') {
                            paddingInterval = helper_1.getMinPointsDelta(series_1.xAxis, axis.series) / 2;
                        }
                    }
                    if (axis.orientation === 'Horizontal') {
                        if (this.chart.requireInvertedAxis) {
                            this.findMinMax(series_1.yMin, series_1.yMax);
                        }
                        else {
                            this.findMinMax(series_1.xMin - paddingInterval, series_1.xMax + paddingInterval);
                        }
                    }
                    if (axis.orientation === 'Vertical') {
                        if (this.chart.requireInvertedAxis) {
                            this.findMinMax(series_1.xMin - paddingInterval, series_1.xMax + paddingInterval);
                        }
                        else {
                            this.findMinMax(series_1.yMin, series_1.yMax);
                        }
                    }
                }
            }
        };
        Double.prototype.findMinMax = function (min, max) {
            if (this.min === null || this.min > min) {
                this.min = min;
            }
            if (this.max === null || this.max < max) {
                this.max = max;
            }
        };
        Double.prototype.applyRangePadding = function (axis, size) {
            var range;
            var start = axis.actualRange.min;
            var end = axis.actualRange.max;
            if (!axis.setRange()) {
                var interval = axis.actualRange.interval;
                var rangePadding = axis.rangePadding === 'Auto' ?
                    (axis.orientation === 'Vertical' && !this.chart.requireInvertedAxis) ? 'Normal' :
                        (axis.orientation === 'Horizontal' && this.chart.requireInvertedAxis) ? 'Normal' :
                            'None' : axis.rangePadding;
                if (rangePadding === 'Additional' || rangePadding === 'Round') {
                    this.findAdditional(axis, start, end, interval);
                }
                else if (rangePadding === 'Normal') {
                    this.findNormal(axis, start, end, interval, size);
                }
                else {
                    this.updateActualRange(axis, start, end, interval);
                }
            }
            axis.actualRange.delta = axis.actualRange.max - axis.actualRange.min;
            this.calculateVisibleRange(size, axis);
        };
        Double.prototype.updateActualRange = function (axis, minimum, maximum, interval) {
            axis.actualRange.min = minimum;
            axis.actualRange.max = maximum;
            axis.actualRange.interval = interval;
        };
        Double.prototype.findAdditional = function (axis, start, end, interval) {
            var minimum;
            var maximum;
            minimum = Math.floor(start / interval) * interval;
            maximum = Math.ceil(end / interval) * interval;
            if (axis.rangePadding === 'Additional') {
                minimum -= interval;
                maximum += interval;
            }
            this.updateActualRange(axis, minimum, maximum, interval);
        };
        Double.prototype.findNormal = function (axis, start, end, interval, size) {
            var remaining;
            var minimum;
            var maximum;
            var startValue = start;
            if (start < 0) {
                startValue = 0;
                minimum = start + (start / 20);
                remaining = interval + (minimum % interval);
                if ((0.365 * interval) >= remaining) {
                    minimum -= interval;
                }
                if (minimum % interval < 0) {
                    minimum = (minimum - interval) - (minimum % interval);
                }
            }
            else {
                minimum = start < ((5.0 / 6.0) * end) ? 0 : (start - (end - start) / 2);
                if (minimum % interval > 0) {
                    minimum -= (minimum % interval);
                }
            }
            maximum = (end > 0) ? (end + (end - startValue) / 20) : (end - (end - startValue) / 20);
            remaining = interval - (maximum % interval);
            if ((0.365 * interval) >= remaining) {
                maximum += interval;
            }
            if (maximum % interval > 0) {
                maximum = (maximum + interval) - (maximum % interval);
            }
            axis.doubleRange = new double_range_1.DoubleRange(minimum, maximum);
            if (minimum === 0) {
                interval = this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
                maximum = Math.ceil(maximum / interval) * interval;
            }
            this.updateActualRange(axis, minimum, maximum, interval);
        };
        Double.prototype.calculateVisibleRange = function (size, axis) {
            axis.visibleRange = axis.actualRange;
            if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
                axis.calculateVisibleRange(size);
                axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming && axis.valueType !== 'Category') ?
                    this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size)
                    : axis.visibleRange.interval;
            }
        };
        Double.prototype.calculateVisibleLabels = function (axis) {
            axis.visibleLabels = [];
            var tempInterval = axis.visibleRange.min;
            var customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            axis.format = this.chart.intl.getNumberFormat({ format: this.getLabelFormat(axis), useGrouping: this.chart.useGroupingSeparator });
            var argsData;
            if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
                tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
            }
            axis.startLabel = axis.format(axis.visibleRange.min);
            axis.endLabel = axis.format(axis.visibleRange.max);
            for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
                if (helper_2.withIn(tempInterval, axis.visibleRange)) {
                    argsData = {
                        cancel: false, name: constants_1.axisLabelRender, axis: axis,
                        text: customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(tempInterval))
                            : axis.format(tempInterval), value: tempInterval
                    };
                    this.chart.trigger(constants_1.axisLabelRender, argsData);
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new axis_1.VisibleLabels(argsData.text, argsData.value));
                    }
                }
            }
            axis.getMaxLabelWidth(this.chart);
        };
        Double.prototype.getLabelFormat = function (axis) {
            var customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            var skeleton = customLabelFormat ? '' : axis.labelFormat;
            return skeleton;
        };
        return Double;
    }());
    exports.Double = Double;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(16), __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, double_range_1, helper_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColumnBase = (function () {
        function ColumnBase() {
        }
        ColumnBase.prototype.getSideBySideInfo = function (series) {
            if (!series.position) {
                this.getSideBySidePositions(series);
            }
            series.isRectSeries = true;
            var visibleSeries = series.chart.visibleSeries;
            var seriesSpacing = 0;
            var pointSpacing = 0.7;
            var minimumPointDelta = helper_1.getMinPointsDelta(series.xAxis, visibleSeries);
            var width = minimumPointDelta * pointSpacing;
            var radius;
            var location = (series.position) / series.rectCount - 0.5;
            var doubleRange = new double_range_1.DoubleRange(location, location + (1 / series.rectCount));
            if (!(isNaN(doubleRange.start) || isNaN(doubleRange.end))) {
                doubleRange = new double_range_1.DoubleRange(doubleRange.start * width, doubleRange.end * width);
                radius = (seriesSpacing) * (doubleRange.start - doubleRange.end);
                doubleRange = new double_range_1.DoubleRange(doubleRange.start + radius / 2, doubleRange.end - radius / 2);
            }
            return doubleRange;
        };
        ColumnBase.prototype.getRectangle = function (x1, y1, x2, y2, series) {
            var point1 = this.getPointOrigin(x1, y1, series);
            var point2 = this.getPointOrigin(x2, y2, series);
            return new helper_1.Rect(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y), Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
        };
        ColumnBase.prototype.getPointOrigin = function (x, y, series) {
            if (series.chart.requireInvertedAxis) {
                x = (series.yAxis.valueType === 'Logarithmic' ? helper_1.logBase(x === 0 ? 1 : x, series.yAxis.logBase) : x);
                y = (series.xAxis.valueType === 'Logarithmic' ? helper_1.logBase(y, series.xAxis.logBase) : y);
                return new helper_1.ChartLocation((helper_1.valueToCoefficient(x, series.yAxis)) * series.yAxis.rect.width, (1 - helper_1.valueToCoefficient(y, series.xAxis)) * series.xAxis.rect.height);
            }
            else {
                x = (series.xAxis.valueType === 'Logarithmic' ? helper_1.logBase(x, series.xAxis.logBase) : x);
                y = (series.yAxis.valueType === 'Logarithmic' ? helper_1.logBase(y === 0 ? 1 : y, series.yAxis.logBase) : y);
                return new helper_1.ChartLocation((helper_1.valueToCoefficient(x, series.xAxis)) * series.xAxis.rect.width, (1 - helper_1.valueToCoefficient(y, series.yAxis)) * series.yAxis.rect.height);
            }
        };
        ColumnBase.prototype.getSideBySidePositions = function (series) {
            var chart = series.chart;
            var seriesCollection = [];
            var axis = series.chart.requireInvertedAxis ? series.chart.verticalAxes : series.chart.horizontalAxes;
            var column;
            var row;
            var stackingGroup = [];
            var verticalSeries = [];
            var axisCollection;
            for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
                var item = _a[_i];
                column = item;
                seriesCollection = [];
                axisCollection = [];
                for (var _b = 0, _c = column.axes; _b < _c.length; _b++) {
                    var columnAxis = _c[_b];
                    axisCollection.push(columnAxis);
                }
                var _loop_1 = function (index) {
                    for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
                        var item_1 = _a[_i];
                        row = item_1;
                        seriesCollection = [];
                        for (var _b = 0, _c = row.axes; _b < _c.length; _b++) {
                            var rowAxis = _c[_b];
                            for (var _d = 0, _e = rowAxis.series; _d < _e.length; _d++) {
                                var rowSeries = _e[_d];
                                for (var _f = 0, axisCollection_1 = axisCollection; _f < axisCollection_1.length; _f++) {
                                    var axis_1 = axisCollection_1[_f];
                                    for (var _g = 0, _h = axis_1.series; _g < _h.length; _g++) {
                                        var series_1 = _h[_g];
                                        if (series_1 === rowSeries && this_1.rectSeriesInChart(series_1) && series_1.visible) {
                                            seriesCollection.push(series_1);
                                        }
                                    }
                                }
                            }
                        }
                        verticalSeries = [];
                        stackingGroup = [];
                        verticalSeries[index] = [];
                        verticalSeries[index].rectCount = 0;
                        seriesCollection.forEach(function (value) {
                            if (value.type === 'StackingColumn' || value.type === 'StackingBar') {
                                if (value.stackingGroup) {
                                    if (stackingGroup[value.stackingGroup] === undefined) {
                                        value.position = verticalSeries[index].rectCount;
                                        stackingGroup[value.stackingGroup] = verticalSeries[index].rectCount++;
                                    }
                                    else {
                                        value.position = stackingGroup[value.stackingGroup];
                                    }
                                }
                                else {
                                    if (verticalSeries[index].position === undefined) {
                                        value.position = verticalSeries[index].rectCount;
                                        verticalSeries[index].position = verticalSeries[index].rectCount++;
                                    }
                                    else {
                                        value.position = verticalSeries[index].position;
                                    }
                                }
                            }
                            else {
                                value.position = verticalSeries[index].rectCount++;
                            }
                        });
                        seriesCollection.forEach(function (value) {
                            value.rectCount = verticalSeries[index].rectCount;
                        });
                    }
                };
                var this_1 = this;
                for (var index = 0; index < chart.rows.length; index++) {
                    _loop_1(index);
                }
            }
        };
        ColumnBase.prototype.updateXRegion = function (point, rect) {
            point.region = rect;
            point.symbolLocation = {
                x: rect.x + (rect.width) / 2,
                y: point.yValue < 0 ? (rect.y + rect.height) : rect.y,
            };
        };
        ColumnBase.prototype.updateYRegion = function (point, rect) {
            point.region = new helper_1.Rect(rect.x, rect.y, rect.width, rect.height);
            point.symbolLocation = {
                x: point.yValue < 0 ? rect.x : rect.x + rect.width,
                y: rect.y + rect.height / 2
            };
        };
        ColumnBase.prototype.rectSeriesInChart = function (series) {
            var type = (series.type).toLowerCase();
            return (type.indexOf('column') !== -1 || type.indexOf('bar') !== -1);
        };
        ColumnBase.prototype.triggerEvent = function (chart, series, point) {
            var argsData = {
                cancel: false, name: constants_1.pointRender, series: series, point: point, fill: series.interior, border: series.border
            };
            chart.trigger(constants_1.pointRender, argsData);
            point.color = argsData.fill;
            return argsData;
        };
        ColumnBase.prototype.drawRectangle = function (series, point, rect, argsData) {
            var check = series.chart.requireInvertedAxis ? rect.height : rect.width;
            if (check <= 0) {
                return null;
            }
            var direction = ('M' + ' ' + (rect.x) + ' ' + (rect.y + rect.height) + ' ' +
                'L' + ' ' + (rect.x) + ' ' + (rect.y) + ' ' +
                'L' + ' ' + (rect.x + rect.width) + ' ' + (rect.y) + ' ' +
                'L' + ' ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height) + ' ' + 'Z');
            var options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
            var element = series.chart.renderer.drawPath(options);
            element.setAttribute('aria-label', point.x.toString() + ':' + point.y.toString());
            series.seriesElement.appendChild(element);
        };
        ColumnBase.prototype.animate = function (series) {
            var rectElements = series.seriesElement.childNodes;
            var count = 1;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.symbolLocation) {
                    continue;
                }
                this.animateRect(rectElements[count], series, point);
                count++;
            }
        };
        ColumnBase.prototype.animateRect = function (element, series, point) {
            var option = series.animation;
            var effect = helper_1.getAnimationFunction('Linear');
            var isPlot = point.yValue < 0;
            var x;
            var y;
            var elementHeight = +point.region.height;
            var elementWidth = +point.region.width;
            var centerX;
            var centerY;
            if (!series.chart.requireInvertedAxis) {
                x = +point.region.x;
                if (series.type === 'StackingColumn') {
                    y = (1 - helper_1.valueToCoefficient(0, series.yAxis)) * (series.yAxis.rect.height);
                    centerX = x;
                    centerY = y;
                }
                else {
                    y = +point.region.y;
                    centerX = isPlot ? x : x + elementWidth;
                    centerY = isPlot ? y : y + elementHeight;
                }
            }
            else {
                y = +point.region.y;
                if (series.type === 'StackingBar') {
                    x = (helper_1.valueToCoefficient(0, series.yAxis)) * series.yAxis.rect.width;
                    centerX = isPlot ? x : x;
                    centerY = isPlot ? y : y;
                }
                else {
                    x = +point.region.x;
                    centerY = isPlot ? y : y + elementHeight;
                    centerX = isPlot ? x + elementWidth : x;
                }
            }
            var value;
            element.style.visibility = 'hidden';
            new ej2_base_1.Animation({}).animate(element, {
                duration: option.duration,
                delay: option.delay,
                progress: function (args) {
                    if (args.timeStamp >= args.delay) {
                        element.style.visibility = 'visible';
                        if (!series.chart.requireInvertedAxis) {
                            elementHeight = elementHeight ? elementHeight : 1;
                            value = effect(args.timeStamp - args.delay, 0, elementHeight, args.duration);
                            element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                                ') scale(1,' + (value / elementHeight) + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                        }
                        else {
                            elementWidth = elementWidth ? elementWidth : 1;
                            value = effect(args.timeStamp - args.delay, 0, elementWidth, args.duration);
                            element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                                ') scale(' + (value / elementWidth) + ', 1) translate(' + (-centerX) + ' ' + (-centerY) + ')');
                        }
                    }
                },
                end: function (model) {
                    element.setAttribute('transform', 'translate(0,0)');
                    if ((point.index === series.points.length - 1)) {
                        series.chart.trigger('animationComplete', { series: series });
                    }
                }
            });
        };
        return ColumnBase;
    }());
    exports.ColumnBase = ColumnBase;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

var Observer = (function () {
    function Observer(context) {
        this.boundedEvents = {};
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(context)) {
            return;
        }
        this.context = context;
    }
    ;
    Observer.prototype.on = function (property, handler, context) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(handler)) {
            return;
        }
        var cntxt = context || this.context;
        if (this.notExist(property)) {
            this.boundedEvents[property] = [{ handler: handler, context: cntxt }];
            return;
        }
        if (!this.isHandlerPresent(this.boundedEvents[property], handler)) {
            this.boundedEvents[property].push({ handler: handler, context: cntxt });
        }
    };
    Observer.prototype.off = function (property, handler) {
        if (this.notExist(property)) {
            return;
        }
        var curObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(property, this.boundedEvents);
        if (handler) {
            for (var i = 0; i < curObject.length; i++) {
                if (handler === curObject[i].handler) {
                    curObject.splice(i, 1);
                    break;
                }
            }
        }
        else {
            delete this.boundedEvents[property];
        }
    };
    Observer.prototype.notify = function (property, argument) {
        if (this.notExist(property)) {
            return;
        }
        if (argument) {
            argument.name = property;
        }
        var curObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(property, this.boundedEvents).slice(0);
        for (var _i = 0, curObject_1 = curObject; _i < curObject_1.length; _i++) {
            var cur = curObject_1[_i];
            cur.handler.call(cur.context, argument);
        }
    };
    Observer.prototype.destroy = function () {
        this.boundedEvents = this.context = undefined;
    };
    Observer.prototype.notExist = function (prop) {
        return this.boundedEvents.hasOwnProperty(prop) === false;
    };
    Observer.prototype.isHandlerPresent = function (boundedEvents, handler) {
        for (var _i = 0, boundedEvents_1 = boundedEvents; _i < boundedEvents_1.length; _i++) {
            var cur = boundedEvents_1[_i];
            if (cur.handler === handler) {
                return true;
            }
        }
        return false;
    };
    return Observer;
}());



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var instances = 'ej2_instances';
    var uid = 0;
    function createInstance(classFunction, params) {
        var arrayParam = params;
        arrayParam.unshift(undefined);
        return new (Function.prototype.bind.apply(classFunction, arrayParam));
    }
    exports.createInstance = createInstance;
    function setImmediate(handler) {
        var unbind;
        var num = new Uint16Array(5);
        var intCrypto = window.msCrypto || window.crypto;
        intCrypto.getRandomValues(num);
        var secret = 'ej2' + combineArray(num);
        var messageHandler = function (event) {
            if (event.source === window && typeof event.data === 'string' && event.data.length <= 32 && event.data === secret) {
                handler();
                unbind();
            }
        };
        window.addEventListener('message', messageHandler, false);
        window.postMessage(secret, '*');
        return unbind = function () {
            window.removeEventListener('message', messageHandler);
        };
    }
    exports.setImmediate = setImmediate;
    function getValue(nameSpace, obj) {
        var value = obj;
        var splits = nameSpace.split('.');
        for (var i = 0; i < splits.length && !isUndefined(value); i++) {
            value = value[splits[i]];
        }
        return value;
    }
    exports.getValue = getValue;
    function setValue(nameSpace, value, obj) {
        var keys = nameSpace.split('.');
        var start = obj || {};
        var fromObj = start;
        var i;
        var length = keys.length;
        var key;
        for (i = 0; i < length; i++) {
            key = keys[i];
            if (i + 1 === length) {
                fromObj[key] = value === undefined ? {} : value;
            }
            else if (isNullOrUndefined(fromObj[key])) {
                fromObj[key] = {};
            }
            fromObj = fromObj[key];
        }
        return start;
    }
    exports.setValue = setValue;
    function deleteObject(obj, key) {
        delete obj[key];
    }
    exports.deleteObject = deleteObject;
    function isObject(obj) {
        var objCon = {};
        return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
    }
    exports.isObject = isObject;
    function getEnumValue(enumObject, enumValue) {
        return enumObject[enumValue];
    }
    exports.getEnumValue = getEnumValue;
    function merge(source, destination) {
        if (!isNullOrUndefined(destination)) {
            var temrObj = source;
            var tempProp = destination;
            var keys = Object.keys(destination);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                temrObj[key] = tempProp[key];
            }
        }
    }
    exports.merge = merge;
    function extend(copied, first, second, deep) {
        var result = copied || {};
        var length = arguments.length;
        if (deep) {
            length = length - 1;
        }
        var _loop_1 = function (i) {
            if (!arguments_1[i]) {
                return "continue";
            }
            var obj1 = arguments_1[i];
            Object.keys(obj1).forEach(function (key) {
                var src = result[key];
                var copy = obj1[key];
                var clone;
                if (deep && isObject(copy)) {
                    clone = isObject(src) ? src : {};
                    result[key] = extend({}, clone, copy, true);
                }
                else {
                    result[key] = copy;
                }
            });
        };
        var arguments_1 = arguments;
        for (var i = 1; i < length; i++) {
            _loop_1(i);
        }
        return result;
    }
    exports.extend = extend;
    function isNullOrUndefined(value) {
        return value === undefined || value === null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isUndefined(value) {
        return ('undefined' === typeof value);
    }
    exports.isUndefined = isUndefined;
    function getUniqueID(definedName) {
        return definedName + '_' + uid++;
    }
    exports.getUniqueID = getUniqueID;
    function debounce(eventFunction, delay) {
        var _this = this;
        var out;
        return function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var args = arg[0];
            var later = function () {
                out = null;
                return eventFunction.call(_this, args);
            };
            clearTimeout(out);
            out = setTimeout(later, delay);
        };
    }
    exports.debounce = debounce;
    function queryParams(data) {
        var array = [];
        var keys = Object.keys(data);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            array.push(encodeURIComponent(key) + '=' + encodeURIComponent('' + data[key]));
        }
        return array.join('&');
    }
    exports.queryParams = queryParams;
    function isObjectArray(value) {
        var parser = Object.prototype.toString;
        if (parser.call(value) === '[object Array]') {
            if (parser.call(value[0]) === '[object Object]') {
                return true;
            }
        }
        return false;
    }
    exports.isObjectArray = isObjectArray;
    function compareElementParent(child, parent) {
        var node = child;
        if (node === parent) {
            return true;
        }
        else if (node === document || !node) {
            return false;
        }
        else {
            return compareElementParent(node.parentNode, parent);
        }
    }
    exports.compareElementParent = compareElementParent;
    function throwError(message) {
        try {
            throw new Error(message);
        }
        catch (e) {
            throw e.message + '\n' + e.stack;
        }
    }
    exports.throwError = throwError;
    function print(element, printWindow) {
        var div = document.createElement('div');
        var links = [].slice.call(document.getElementsByTagName('head')[0].querySelectorAll('link, style'));
        var reference = '';
        if (isNullOrUndefined(printWindow)) {
            printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
        }
        div.appendChild(element.cloneNode(true));
        for (var i = 0, len = links.length; i < len; i++) {
            reference += links[i].outerHTML;
        }
        printWindow.document.write('<!DOCTYPE html> <html><head>' + reference + '</head><body>' + div.innerHTML +
            '<script> (function() { window.ready = true; })(); </script>' + '</body></html>');
        printWindow.document.close();
        printWindow.focus();
        var interval = setInterval(function () {
            if (printWindow.ready) {
                printWindow.print();
                printWindow.close();
                clearInterval(interval);
            }
        }, 500);
        return printWindow;
    }
    exports.print = print;
    function formatUnit(value) {
        var result = value + '';
        if (result === 'auto' || result.indexOf('%') !== -1 || result.indexOf('px') !== -1) {
            return result;
        }
        return result + 'px';
    }
    exports.formatUnit = formatUnit;
    function getInstance(element, component) {
        var elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
        if (elem[instances]) {
            for (var _i = 0, _a = elem[instances]; _i < _a.length; _i++) {
                var inst = _a[_i];
                if (inst instanceof component) {
                    return inst;
                }
            }
        }
        return null;
    }
    exports.getInstance = getInstance;
    function addInstance(element, instance) {
        var elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
        if (elem[instances]) {
            elem[instances].push(instance);
        }
        else {
            elem[instances] = [instance];
        }
    }
    exports.addInstance = addInstance;
    function combineArray(num) {
        var ret = '';
        for (var i = 0; i < 5; i++) {
            ret += (i ? ',' : '') + num[i];
        }
        return ret;
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(72).setImmediate))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(10), __webpack_require__(5), __webpack_require__(3), __webpack_require__(13), __webpack_require__(11), __webpack_require__(0), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, dom_1, util_1, constants_1, base_1, theme_1, helper_1, helper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Location = (function (_super) {
        __extends(Location, _super);
        function Location() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Location;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], Location.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Location.prototype, "y", void 0);
    exports.Location = Location;
    var LegendSettings = (function (_super) {
        __extends(LegendSettings, _super);
        function LegendSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LegendSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], LegendSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Complex({ x: 0, y: 0 }, Location)
    ], LegendSettings.prototype, "location", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], LegendSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Property(8)
    ], LegendSettings.prototype, "padding", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], LegendSettings.prototype, "alignment", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.legendLabelFont, base_1.Font)
    ], LegendSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], LegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], LegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], LegendSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], LegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], LegendSettings.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], LegendSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], LegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendSettings.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], LegendSettings.prototype, "tabIndex", void 0);
    exports.LegendSettings = LegendSettings;
    var Legend = (function () {
        function Legend(chart) {
            this.rowCount = 0;
            this.columnCount = 0;
            this.pageButtonSize = 8;
            this.pageXCollection = [];
            this.isTrimmed = false;
            this.maxWidth = 0;
            this.currentPage = 1;
            this.chart = chart;
            this.legend = chart.legendSettings;
            this.legendID = chart.element.id + '_chart_legend';
        }
        Legend.prototype.getLegendOptions = function (visibleSeriesCollection) {
            this.legendCollections = [];
            for (var _i = 0, visibleSeriesCollection_1 = visibleSeriesCollection; _i < visibleSeriesCollection_1.length; _i++) {
                var series = visibleSeriesCollection_1[_i];
                this.legendCollections.push(new LegendOptions(series));
            }
        };
        Legend.prototype.calculateLegendBounds = function (rect, areaType, availableSize) {
            var legend = this.legend;
            var position = (legend.position !== 'Auto') ? legend.position : (areaType === 'None' ? 'Right' : 'Bottom');
            this.legendBounds = new helper_1.Rect(rect.x, rect.y, 0, 0);
            this.isVertical = (position === 'Left' || position === 'Right');
            if (this.isVertical) {
                this.legendBounds.height = helper_2.stringToNumber(legend.height, availableSize.height) ||
                    (rect.height + rect.y - this.chart.margin.top);
                this.legendBounds.width = helper_2.stringToNumber(legend.width || '20%', availableSize.width);
            }
            else {
                this.legendBounds.width = helper_2.stringToNumber(legend.width, availableSize.width) || rect.width;
                this.legendBounds.height = helper_2.stringToNumber(legend.height || '20%', availableSize.height);
            }
            this.getLegendBounds(availableSize, this.legendBounds, legend);
            this.getLocation(position, legend.alignment, this.legendBounds, rect, availableSize);
        };
        Legend.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
            var padding = legend.padding;
            var extraHeight = 0;
            var extraWidth = 0;
            if (!this.isVertical) {
                extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
            }
            else {
                extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
            }
            legendBounds.height += extraHeight;
            legendBounds.width += extraWidth;
            var shapeHeight = legend.shapeHeight;
            var shapeWidth = legend.shapeWidth;
            var shapePadding = legend.shapePadding;
            var maximumWidth = 0;
            var rowWidth = 0;
            var legendWidth = 0;
            var columnHeight = 0;
            var rowCount = 0;
            var legendEventArgs;
            this.maxitemHeight = Math.max(helper_1.measureText('MeasureText', legend.textStyle).height, legend.shapeHeight);
            var render = false;
            for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
                var legendOption = _a[_i];
                legendEventArgs = { fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                    markerShape: legendOption.markerShape, name: constants_1.legendRender, cancel: false };
                this.chart.trigger(constants_1.legendRender, legendEventArgs);
                legendOption.render = !legendEventArgs.cancel;
                legendOption.text = legendEventArgs.text;
                legendOption.fill = legendEventArgs.fill;
                legendOption.shape = legendEventArgs.shape;
                legendOption.markerShape = legendEventArgs.markerShape;
                legendOption.textSize = helper_1.measureText(legendOption.text, legend.textStyle);
                if (legendOption.render && legendOption.text !== '') {
                    render = true;
                    legendWidth = shapeWidth + shapePadding + legendOption.textSize.width + padding;
                    rowWidth = rowWidth + legendWidth;
                    if (legendBounds.width < (padding + rowWidth) || this.isVertical) {
                        maximumWidth = Math.max(maximumWidth, (rowWidth + padding - (this.isVertical ? 0 : legendWidth)));
                        if (rowCount === 0 && (legendWidth !== rowWidth)) {
                            rowCount = 1;
                        }
                        rowWidth = this.isVertical ? 0 : legendWidth;
                        rowCount++;
                        columnHeight = (rowCount * (this.maxitemHeight + padding)) + padding;
                    }
                }
            }
            columnHeight = Math.max(columnHeight, (this.maxitemHeight + padding) + padding);
            this.isPaging = legendBounds.height < columnHeight;
            this.totalpages = rowCount;
            if (render) {
                this.setbounds(Math.max((rowWidth + padding), maximumWidth), legend, columnHeight, legendBounds);
            }
            else {
                this.setbounds(0, legend, 0, legendBounds);
            }
        };
        Legend.prototype.setbounds = function (computedWidth, legend, computedHeight, legendBounds) {
            computedWidth = computedWidth < legendBounds.width ? computedWidth : legendBounds.width;
            computedHeight = computedHeight < legendBounds.height ? computedHeight : legendBounds.height;
            legendBounds.width = !legend.width ? computedWidth : legendBounds.width;
            legendBounds.height = !legend.height ? computedHeight : legendBounds.height;
            this.rowCount = Math.max(1, Math.ceil((legendBounds.height - legend.padding) / (this.maxitemHeight + legend.padding)));
        };
        Legend.prototype.getLocation = function (position, alignment, legendBounds, rect, availableSize) {
            var padding = this.legend.border.width / 2;
            var legendHeight = legendBounds.height + padding;
            var legendWidth = legendBounds.width + padding;
            var marginTop = this.chart.margin.top;
            if (position === 'Bottom') {
                legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
                legendBounds.y = rect.y + (rect.height - legendHeight) + padding;
                helper_1.subtractThickness(rect, new helper_1.Thickness(0, 0, 0, legendHeight));
            }
            else if (position === 'Top') {
                legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
                legendBounds.y = rect.y;
                helper_1.subtractThickness(rect, new helper_1.Thickness(0, 0, legendHeight, 0));
            }
            else if (position === 'Right') {
                legendBounds.x = rect.x + (rect.width - legendBounds.width);
                legendBounds.y = this.alignLegend(marginTop, availableSize.height, legendBounds.height, alignment);
                helper_1.subtractThickness(rect, new helper_1.Thickness(0, legendWidth, 0, 0));
            }
            else if (position === 'Left') {
                legendBounds.y = this.alignLegend(marginTop, availableSize.height, legendBounds.height, alignment);
                helper_1.subtractThickness(rect, new helper_1.Thickness(legendWidth, 0, 0, 0));
            }
            else {
                legendBounds.x = this.legend.location.x;
                legendBounds.y = this.legend.location.y;
                helper_1.subtractThickness(rect, new helper_1.Thickness(0, 0, 0, 0));
            }
        };
        Legend.prototype.alignLegend = function (start, size, legendSize, alignment) {
            switch (alignment) {
                case 'Far':
                    start = (size - legendSize) - start;
                    break;
                case 'Center':
                    start = ((size - legendSize) / 2);
                    break;
            }
            return start;
        };
        Legend.prototype.renderLegend = function (chart, legend, legendBounds) {
            var firstLegend = this.findFirstLegendPosition(this.legendCollections);
            var padding = legend.padding;
            this.maxitemHeight = Math.max(this.legendCollections[0].textSize.height, legend.shapeHeight);
            var legendGroup = chart.renderer.createGroup({ id: this.legendID + '_g' });
            var legendTranslateGroup = this.createLegendElements(chart, legendBounds, legendGroup, legend, this.legendID);
            if (firstLegend !== this.legendCollections.length) {
                var legendSeriesGroup = void 0;
                var start = void 0;
                start = new helper_1.ChartLocation(legendBounds.x + padding + (legend.shapeWidth / 2), legendBounds.y + padding + this.maxitemHeight / 2);
                var textOptions = new helper_2.TextOption('', start.x, start.y, 'start');
                this.maxsize = 0;
                var textPadding = legend.shapePadding + padding + legend.shapeWidth;
                var count = 0;
                this.pageXCollection[0] = 0;
                this.legendCollections[firstLegend].location = start;
                var previousLegend = this.legendCollections[firstLegend];
                for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
                    var legendOption = _a[_i];
                    if (legendOption.render && legendOption.text !== '') {
                        legendSeriesGroup = chart.renderer.createGroup({ id: this.legendID + '_series_' + count });
                        legendSeriesGroup.setAttribute('tabindex', legend.tabIndex.toString());
                        legendSeriesGroup.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
                        this.getRenderPoint(legendOption, start.x, textPadding, previousLegend, legendBounds, count, firstLegend);
                        this.renderSymbol(legendOption, legendSeriesGroup, count);
                        this.renderText(chart, legendOption, legendSeriesGroup, textOptions, count);
                        legendSeriesGroup.setAttribute('style', 'cursor: pointer');
                        legendTranslateGroup.appendChild(legendSeriesGroup);
                        previousLegend = legendOption;
                    }
                    count++;
                }
                if (this.isPaging) {
                    this.renderPagingElements(chart, legendBounds, textOptions, legendGroup);
                }
            }
            chart.svgObject.appendChild(legendGroup);
        };
        Legend.prototype.findFirstLegendPosition = function (legendCollection) {
            var count = 0;
            for (var _i = 0, legendCollection_1 = legendCollection; _i < legendCollection_1.length; _i++) {
                var legend = legendCollection_1[_i];
                if (legend.render && legend.text !== '') {
                    break;
                }
                count++;
            }
            return count;
        };
        Legend.prototype.createLegendElements = function (chart, legendBounds, legendGroup, legend, id) {
            var padding = legend.padding;
            var options = new helper_2.RectOption(id + '_element', legend.background, legend.border, legend.opacity, legendBounds);
            legendGroup.appendChild(chart.renderer.drawRectangle(options));
            var legendItemsGroup = chart.renderer.createGroup({ id: id + '_collections' });
            legendGroup.appendChild(legendItemsGroup);
            this.legendTranslateGroup = chart.renderer.createGroup({ id: id + '_translate_g' });
            legendItemsGroup.appendChild(this.legendTranslateGroup);
            var clippath = chart.renderer.createClipPath({ id: id + '_clipPath' });
            options.y += padding;
            options.id += '_clipPath_rect';
            this.clipRect = chart.renderer.drawRectangle(options);
            clippath.appendChild(this.clipRect);
            chart.svgObject.appendChild(clippath);
            legendItemsGroup.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
            return this.legendTranslateGroup;
        };
        Legend.prototype.getRenderPoint = function (legendOption, x, textPadding, prevLegend, rect, count, firstLegend) {
            var padding = this.legend.padding;
            var previousBound = (prevLegend.location.x + textPadding + prevLegend.textSize.width);
            if ((previousBound + (legendOption.textSize.width + textPadding)) > (rect.x + rect.width + this.legend.shapeWidth / 2) ||
                this.isVertical) {
                legendOption.location.x = x;
                legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                    prevLegend.location.y + this.maxitemHeight + padding;
            }
            else {
                legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
                legendOption.location.y = prevLegend.location.y;
            }
            var availwidth = (this.legendBounds.x + this.legendBounds.width) - (legendOption.location.x +
                textPadding - this.legend.shapeWidth / 2);
            legendOption.text = helper_2.textTrim(availwidth, legendOption.text, this.legend.textStyle);
        };
        Legend.prototype.renderSymbol = function (legendOption, group, i) {
            var symbolColor = legendOption.visible ? legendOption.fill : '#D3D3D3';
            var shape = (legendOption.shape === 'SeriesType') ? legendOption.type : legendOption.shape;
            shape = shape === 'Scatter' ? legendOption.markerShape : shape;
            var symbolOption = new helper_1.PathOption(this.legendID + '_shape_series_' + i, symbolColor, 1, symbolColor, 1, '', '');
            group.appendChild(helper_1.drawSymbol(legendOption.location, shape, new helper_1.Size(this.legend.shapeWidth, this.legend.shapeHeight), '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
            if (shape === 'Line' && legendOption.markerVisibility && legendOption.markerShape !== 'Image') {
                symbolOption.id = this.legendID + '_shape_series_marker' + i;
                shape = legendOption.markerShape;
                group.appendChild(helper_1.drawSymbol(legendOption.location, shape, new helper_1.Size(this.legend.shapeWidth / 3, this.legend.shapeHeight / 2), '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
            }
        };
        Legend.prototype.renderText = function (chart, legendOption, group, textOptions, i) {
            var legend = chart.legendSettings;
            var hiddenColor = '#D3D3D3';
            textOptions.id = this.legendID + '_text_series_' + i;
            var fontcolor = legendOption.visible ? legend.textStyle.color : hiddenColor;
            textOptions.text = legendOption.text;
            textOptions.x = legendOption.location.x + (legend.shapeWidth / 2) + legend.shapePadding;
            textOptions.y = legendOption.location.y + this.maxitemHeight / 4;
            var element = helper_2.textElement(textOptions, legend.textStyle, fontcolor, group);
            element.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
        };
        Legend.prototype.renderPagingElements = function (chart, bounds, textOption, legendGroup) {
            var paginggroup = chart.renderer.createGroup({ id: this.legendID + '_navigation' });
            legendGroup.appendChild(paginggroup);
            var grayColor = '#545454';
            var legend = chart.legendSettings;
            var padding = legend.padding;
            this.totalpages = Math.ceil(this.totalpages / Math.max(1, this.rowCount - 1));
            var symbolOption = new helper_1.PathOption(this.legendID + '_pageup', 'transparent', 2, grayColor, 1, '', '');
            var iconSize = this.pageButtonSize;
            paginggroup.setAttribute('style', 'cursor: pointer');
            this.clipPathHeight = (this.rowCount - 1) * (this.maxitemHeight + padding);
            this.clipRect.setAttribute('height', this.clipPathHeight.toString());
            var x = bounds.x + iconSize / 2;
            var y = bounds.y + this.clipPathHeight + ((bounds.height - this.clipPathHeight) / 2);
            paginggroup.appendChild(helper_1.drawSymbol({ x: x, y: y }, 'LeftArrow', new helper_1.Size(iconSize, iconSize), '', symbolOption, 'LeftArrow'));
            textOption.x = x + (iconSize / 2) + legend.padding;
            var size = helper_1.measureText(this.totalpages + '/' + this.totalpages, legend.textStyle);
            textOption.y = y + (size.height / 4);
            textOption.id = this.legendID + '_pagenumber';
            textOption.text = '1/' + this.totalpages;
            var pageTextElement = helper_2.textElement(textOption, legend.textStyle, legend.textStyle.color, paginggroup);
            x = (textOption.x + legend.padding + (iconSize / 2) + size.width);
            symbolOption.id = this.legendID + '_pagedown';
            paginggroup.appendChild(helper_1.drawSymbol({ x: x, y: y }, 'RightArrow', new helper_1.Size(iconSize, iconSize), '', symbolOption, 'RightArrow'));
            paginggroup.setAttribute('transform', 'translate(' + (bounds.width - (2 * (iconSize + legend.padding) +
                legend.padding + size.width)) + ', ' + 0 + ')');
            this.translatePage(pageTextElement, this.currentPage - 1, this.currentPage);
        };
        Legend.prototype.showText = function (event, seriesIndex, x, y) {
            var series = this.chart.series[seriesIndex];
            var id = 'EJ2_legend_tooltip';
            var tooltip = document.getElementById(id);
            if (!tooltip) {
                tooltip = dom_1.createElement('div', {
                    id: id,
                    innerHTML: series.name,
                    styles: 'top:' + (y + 10).toString() + 'px;left:' + (x + 10).toString() + 'px;background:white;' +
                        'position:fixed;border:1px solid ' + series.interior + ';',
                });
                document.body.appendChild(tooltip);
            }
        };
        Legend.prototype.removeText = function () {
            var tooltip = document.getElementById('EJ2_legend_tooltip');
            if (tooltip) {
                document.body.removeChild(tooltip);
            }
        };
        Legend.prototype.changePage = function (event, pageUp) {
            var pageText = document.getElementById(this.legendID + '_pagenumber');
            var page = parseInt(pageText.textContent.split('/')[0], 10);
            if (pageUp && page > 1) {
                this.translatePage(pageText, (page - 2), (page - 1));
            }
            else if (!pageUp && page < this.totalpages) {
                this.translatePage(pageText, page, (page + 1));
            }
        };
        Legend.prototype.translatePage = function (pagingText, page, pagenumber) {
            var height = (this.clipPathHeight) * page;
            var translate = 'translate(0,-' + height + ')';
            this.legendTranslateGroup.setAttribute('transform', translate);
            pagingText.textContent = (pagenumber) + '/' + this.totalpages;
            this.currentPage = pagenumber;
        };
        Legend.prototype.LegendClick = function (seriesIndex) {
            var chart = this.chart;
            var series = chart.visibleSeries[seriesIndex];
            var legend = this.legendCollections[seriesIndex];
            var selectedDataIndexes = [];
            if (chart.selectionModule) {
                selectedDataIndexes = util_1.extend([], chart.selectionModule.selectedDataIndexes, null, true);
            }
            if (chart.legendSettings.toggleVisibility) {
                if (!series.visible) {
                    series.visible = true;
                }
                else {
                    series.visible = false;
                }
                legend.visible = (series.visible);
                chart.loaded = null;
                if (chart.svgObject.childNodes.length > 0) {
                    while (chart.svgObject.lastChild) {
                        chart.svgObject.removeChild(chart.svgObject.lastChild);
                    }
                    dom_1.remove(chart.svgObject);
                }
                chart.animateSeries = false;
                chart.removeSvg();
                chart.refreshAxis();
                series.refreshAxisLabel();
                this.refreshSeries(chart.visibleSeries);
                chart.refreshBound();
                if (selectedDataIndexes.length > 0) {
                    chart.selectionModule.selectedDataIndexes = selectedDataIndexes;
                    chart.selectionModule.redrawSelection(chart, chart.selectionMode);
                }
            }
            else if (chart.selectionModule) {
                chart.selectionModule.legendSelection(chart, seriesIndex);
            }
        };
        Legend.prototype.refreshSeries = function (seriesCollection) {
            for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
                var series = seriesCollection_1[_i];
                series.position = undefined;
            }
        };
        Legend.prototype.click = function (event) {
            var targetId = event.target.id;
            var legendItemsId = [this.legendID + '_text_series_', this.legendID + '_shape_series_marker',
                this.legendID + '_shape_series_'];
            var seriesIndex;
            for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
                var id = legendItemsId_1[_i];
                if (targetId.indexOf(id) > -1) {
                    seriesIndex = parseInt(targetId.split(id)[1], 10);
                    this.LegendClick(seriesIndex);
                }
            }
            if (targetId.indexOf(this.legendID + '_pageup') > -1) {
                this.changePage(event, true);
            }
            else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
                this.changePage(event, false);
            }
        };
        Legend.prototype.move = function (event, x, y) {
            if (event.target.textContent.indexOf('...') > -1) {
                var targetId = event.target.id;
                var seriesIndex = parseInt(targetId.split(this.legendID + '_text_series_')[1], 10);
                if (!isNaN(seriesIndex)) {
                    this.showText(event, seriesIndex, x, y);
                }
            }
            else {
                this.removeText();
            }
        };
        Legend.prototype.getModuleName = function () {
            return 'Legend';
        };
        Legend.prototype.destroy = function (chart) {
        };
        return Legend;
    }());
    exports.Legend = Legend;
    var LegendOptions = (function () {
        function LegendOptions(series) {
            this.location = { x: 0, y: 0 };
            this.text = series.name;
            this.fill = series.interior;
            this.shape = series.legendShape;
            this.visible = (series.visible);
            this.markerVisibility = series.marker.visible;
            this.type = series.type;
            this.markerShape = series.marker.shape;
        }
        return LegendOptions;
    }());
    exports.LegendOptions = LegendOptions;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(5), __webpack_require__(0), __webpack_require__(13), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, util_1, helper_1, base_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Points = (function () {
        function Points() {
            this.symbolLocation = null;
            this.region = null;
        }
        return Points;
    }());
    exports.Points = Points;
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Animation;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], Animation.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(1000)
    ], Animation.prototype, "duration", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Animation.prototype, "delay", void 0);
    exports.Animation = Animation;
    var DataLabelSettings = (function (_super) {
        __extends(DataLabelSettings, _super);
        function DataLabelSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DataLabelSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], DataLabelSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], DataLabelSettings.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], DataLabelSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], DataLabelSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], DataLabelSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], DataLabelSettings.prototype, "rx", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], DataLabelSettings.prototype, "ry", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], DataLabelSettings.prototype, "alignment", void 0);
    __decorate([
        ej2_base_1.Complex({ width: null, color: null }, base_1.Border)
    ], DataLabelSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({ left: 5, right: 5, top: 5, bottom: 5 }, base_1.Margin)
    ], DataLabelSettings.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Complex({ size: '11px', color: null }, base_1.Font)
    ], DataLabelSettings.prototype, "font", void 0);
    exports.DataLabelSettings = DataLabelSettings;
    var MarkerSettings = (function (_super) {
        __extends(MarkerSettings, _super);
        function MarkerSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MarkerSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], MarkerSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('Circle')
    ], MarkerSettings.prototype, "shape", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MarkerSettings.prototype, "imageUrl", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MarkerSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MarkerSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Complex({ width: 1, color: null }, base_1.Border)
    ], MarkerSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MarkerSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], MarkerSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Complex({}, DataLabelSettings)
    ], MarkerSettings.prototype, "dataLabel", void 0);
    exports.MarkerSettings = MarkerSettings;
    var Series = (function (_super) {
        __extends(Series, _super);
        function Series() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.currentViewData = [];
            _this.visibleSeriesCount = 0;
            _this.clipRect = new helper_1.Rect(0, 0, 0, 0);
            _this.isRectSeries = false;
            _this.drawPoints = [];
            return _this;
        }
        Series.prototype.processJsonData = function () {
            var i = 0;
            var len = Object.keys(this.currentViewData).length;
            var point = new Points();
            var textMappingName = this.marker.dataLabel.name;
            this.points = [];
            this.xMin = Infinity;
            this.xMax = -Infinity;
            this.yMin = Infinity;
            this.yMax = -Infinity;
            if (this.xAxis.valueType === 'Category') {
                while (i < len) {
                    point = this.dataPoint(i, textMappingName);
                    this.pushCategoryData(point);
                    this.pushData(point, i);
                    i++;
                }
            }
            else if (this.xAxis.valueType === 'DateTime') {
                var option = {
                    skeleton: 'full',
                    type: 'dateTime'
                };
                var dateParser = this.chart.intl.getDateParser(option);
                var dateFormatter = this.chart.intl.getDateFormat(option);
                while (i < len) {
                    point = this.dataPoint(i, textMappingName);
                    point.xValue = Date.parse(dateParser(dateFormatter(point.x)));
                    this.pushData(point, i);
                    i++;
                }
            }
            else {
                while (i < len) {
                    point = this.dataPoint(i, textMappingName);
                    point.xValue = point.x;
                    this.pushData(point, i);
                    i++;
                }
            }
            if (this.type === 'Spline') {
                this.chart.splineSeriesModule.findSplinePoint(this);
            }
        };
        Series.prototype.pushCategoryData = function (point) {
            if (this.xAxis.labels.indexOf(point.x) < 0) {
                this.xAxis.labels.push(point.x);
            }
            point.xValue = this.xAxis.labels.indexOf(point.x);
        };
        Series.prototype.refreshAxisLabel = function () {
            if (this.xAxis.valueType !== 'Category') {
                return null;
            }
            this.xAxis.labels = [];
            for (var _i = 0, _a = this.xAxis.series; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.visible) {
                    item.xMin = Infinity;
                    item.xMax = -Infinity;
                    for (var _b = 0, _c = item.points; _b < _c.length; _b++) {
                        var point = _c[_b];
                        item.pushCategoryData(point);
                        item.xMin = Math.min(item.xMin, point.xValue);
                        item.xMax = Math.max(item.xMax, point.xValue);
                    }
                }
            }
        };
        Series.prototype.dataPoint = function (i, textMappingName) {
            var point;
            this.points[i] = new Points();
            point = this.points[i];
            point.x = this.currentViewData[i][this.xName];
            point.y = this.currentViewData[i][this.yName];
            point.text = this.currentViewData[i][textMappingName];
            return point;
        };
        Series.prototype.pushData = function (point, i) {
            if (util_1.isNullOrUndefined(point.x) || util_1.isNullOrUndefined(point.y)) {
                point.visible = false;
            }
            else {
                point.visible = true;
            }
            point.index = i;
            point.yValue = point.y;
            this.xMin = Math.min(this.xMin, point.xValue);
            this.xMax = Math.max(this.xMax, point.xValue);
            this.yMin = Math.min(this.yMin, point.yValue);
            this.yMax = Math.max(this.yMax, point.yValue);
            this.xData.push(point.xValue);
            this.yData.push(point.yValue);
        };
        Series.prototype.calculateStackedValue = function () {
            var axis = this.chart.requireInvertedAxis ? this.chart.verticalAxes : this.chart.horizontalAxes;
            var axisCollection = this.chart.axisCollections;
            var startValues;
            var endValues;
            var yValues = [];
            var lastPositive = [];
            var lastNegative = [];
            var seriesCollection;
            var stackingGroup;
            var pointsLength;
            var lastValue;
            var column;
            var row;
            var axisSeries;
            for (var _i = 0, _a = this.chart.columns; _i < _a.length; _i++) {
                var item = _a[_i];
                column = item;
                seriesCollection = [];
                axisCollection = [];
                for (var _b = 0, _c = column.axes; _b < _c.length; _b++) {
                    var columnAxis = _c[_b];
                    axisCollection.push(columnAxis);
                }
                for (var index = 0; index < this.chart.rows.length; index++) {
                    for (var _d = 0, _e = this.chart.rows; _d < _e.length; _d++) {
                        var item_1 = _e[_d];
                        row = item_1;
                        seriesCollection = [];
                        for (var _f = 0, _g = row.axes; _f < _g.length; _f++) {
                            var rowAxis = _g[_f];
                            for (var _h = 0, _j = rowAxis.series; _h < _j.length; _h++) {
                                var rowSeries = _j[_h];
                                for (var _k = 0, axisCollection_1 = axisCollection; _k < axisCollection_1.length; _k++) {
                                    var axis_1 = axisCollection_1[_k];
                                    for (var _l = 0, _m = axis_1.series; _l < _m.length; _l++) {
                                        var series = _m[_l];
                                        if (series === rowSeries && series.visible) {
                                            seriesCollection.push(series);
                                        }
                                    }
                                }
                            }
                        }
                        lastPositive = [];
                        lastNegative = [];
                        for (var _o = 0, seriesCollection_1 = seriesCollection; _o < seriesCollection_1.length; _o++) {
                            var series = seriesCollection_1[_o];
                            if (series.type.indexOf('Stacking') !== -1) {
                                stackingGroup = series.stackingGroup;
                                stackingGroup = ((series.type !== 'StackingArea') && stackingGroup) ? stackingGroup : '';
                                if (!lastPositive[stackingGroup]) {
                                    lastPositive[stackingGroup] = [];
                                    lastNegative[stackingGroup] = [];
                                }
                                yValues = series.yData;
                                startValues = [];
                                endValues = [];
                                for (var j = 0, pointsLength_1 = series.points.length; j < pointsLength_1; j++) {
                                    lastValue = 0;
                                    if (lastPositive[stackingGroup][series.points[j].xValue] === undefined) {
                                        lastPositive[stackingGroup][series.points[j].xValue] = 0;
                                    }
                                    if (lastNegative[stackingGroup][series.points[j].xValue] === undefined) {
                                        lastNegative[stackingGroup][series.points[j].xValue] = 0;
                                    }
                                    if (yValues[j] >= 0) {
                                        lastValue = lastPositive[stackingGroup][series.points[j].xValue];
                                        lastPositive[stackingGroup][series.points[j].xValue] += yValues[j];
                                    }
                                    else {
                                        lastValue = lastNegative[stackingGroup][series.points[j].xValue];
                                        lastNegative[stackingGroup][series.points[j].xValue] += yValues[j];
                                    }
                                    startValues.push(lastValue);
                                    endValues.push(yValues[j] + lastValue);
                                }
                                series.stackedValues = new helper_1.StackValues(startValues, endValues);
                                series.yMin = Math.min.apply(series.yMin, endValues);
                                series.yMax = Math.max.apply(series.yMax, endValues);
                            }
                        }
                    }
                }
            }
        };
        Series.prototype.logWithIn = function (value, axis) {
            if (axis.valueType === 'Logarithmic') {
                value = helper_1.logBase(value, axis.logBase);
            }
            else {
                value = value;
            }
            return value;
        };
        Series.prototype.refreshDataManager = function (chart) {
            var _this = this;
            this.chart = chart;
            var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
            dataManager.then(function (e) { return _this.dataManagerSuccess(e); });
        };
        Series.prototype.dataManagerSuccess = function (e) {
            this.currentViewData = e.result;
            this.recordsCount = e.count;
            var argsData = {
                name: constants_1.seriesRender, series: this, data: this.currentViewData,
            };
            this.chart.trigger(constants_1.seriesRender, argsData);
            this.processJsonData();
            this.refreshChart();
        };
        Series.prototype.refreshChart = function () {
            var chart = this.chart;
            chart.visibleSeriesCount++;
            if (chart.visibleSeries.length === chart.visibleSeriesCount) {
                chart.refreshBound();
            }
        };
        Series.prototype.renderSeries = function (chart, index) {
            var seriesType = helper_1.firstToLowerCase(this.type);
            if (chart[seriesType + 'SeriesModule']) {
                this.createSeriesElements(chart);
                chart[seriesType + 'SeriesModule'].render(this);
                if (this.marker.dataLabel.visible) {
                    chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
                }
                this.appendSeriesElement(chart.seriesElements, chart);
                this.performAnimation(chart, seriesType, this.marker, this.marker.dataLabel);
            }
        };
        Series.prototype.createSeriesElements = function (chart) {
            var elementId = chart.element.id;
            var xAxisRect = this.xAxis.rect;
            var yAxisRect = this.yAxis.rect;
            var marker = this.marker;
            var render = chart.renderer;
            var index = this.index;
            var markerHeight = (this.type === 'Scatter') ? (this.marker.height + 5) / 2 : 0;
            var markerWidth = (this.type === 'Scatter') ? (this.marker.width + 5) / 2 : 0;
            this.clipRectElement = render.drawClipPath(new helper_1.RectOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, { x: -markerWidth, y: -markerHeight, width: this.clipRect.width + markerWidth * 2,
                height: this.clipRect.height + markerHeight * 2 }));
            var transform;
            transform = 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')';
            this.seriesElement = render.createGroup({
                'id': elementId + 'SeriesGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
            });
            this.seriesElement.appendChild(this.clipRectElement);
            if (marker.visible) {
                markerHeight = (this.marker.height + 5) / 2;
                markerWidth = (this.marker.width + 5) / 2;
                var markerClipRect = render.drawClipPath(new helper_1.RectOption(elementId + '_ChartMarkerClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: -markerWidth, y: -markerHeight,
                    width: this.clipRect.width + markerWidth * 2, height: this.clipRect.height + markerHeight * 2
                }));
                this.symbolElement = render.createGroup({
                    'id': elementId + 'SymbolGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + elementId + '_ChartMarkerClipRect_' + index + ')'
                });
                this.symbolElement.appendChild(markerClipRect);
            }
            if (marker.dataLabel.visible) {
                this.shapeElement = render.createGroup({
                    'id': elementId + 'ShapeGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
                });
                this.textElement = render.createGroup({
                    'id': elementId + 'TextGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
                });
            }
        };
        Series.prototype.appendSeriesElement = function (element, chart) {
            chart.seriesElements.appendChild(this.seriesElement);
            var marker = this.marker;
            var dataLabel = marker.dataLabel;
            if (marker.visible) {
                chart.seriesElements.appendChild(this.symbolElement);
            }
            if (dataLabel.visible) {
                chart.dataLabelElements.appendChild(this.shapeElement);
                chart.dataLabelElements.appendChild(this.textElement);
            }
        };
        Series.prototype.performAnimation = function (chart, type, marker, dataLabel) {
            if (this.animation.enable && chart.animateSeries) {
                chart[type + 'SeriesModule'].doAnimation(this);
                if (marker.visible) {
                    chart.markerModule.doMarkerAnimation(this);
                }
                if (dataLabel.visible) {
                    chart.dataLabelModule.doDataLabelAnimation(this);
                }
            }
        };
        return Series;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property()
    ], Series.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "yName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "xAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "yAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Series.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "stackingGroup", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Series.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 0 }, base_1.Border)
    ], Series.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Series.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property('Line')
    ], Series.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Complex(null, MarkerSettings)
    ], Series.prototype, "marker", void 0);
    __decorate([
        ej2_base_1.Complex(null, Animation)
    ], Series.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Series.prototype, "enableTooltip", void 0);
    __decorate([
        ej2_base_1.Property('SeriesType')
    ], Series.prototype, "legendShape", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "selectionStyle", void 0);
    exports.Series = Series;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(10), __webpack_require__(5), __webpack_require__(0), __webpack_require__(11), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, dom_1, util_1, helper_1, theme_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Indexes = (function (_super) {
        __extends(Indexes, _super);
        function Indexes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Indexes;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], Indexes.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Indexes.prototype, "point", void 0);
    exports.Indexes = Indexes;
    var Selection = (function () {
        function Selection(chart) {
            this.chart = chart;
            this.renderer = chart.renderer;
        }
        Selection.prototype.initPrivateVariables = function (chart) {
            this.styleId = chart.element.id + '_ej2_chart_selection';
            this.unselected = chart.element.id + '_ej2_deselected';
            this.closeIconId = chart.element.id + '_ej2_drag_close';
            this.draggedRectGroup = chart.element.id + '_ej2_drag_group';
            this.draggedRect = chart.element.id + '_ej2_drag_rect';
            this.selectedDataIndexes = [];
            this.rectPoints = null;
            this.isSeriesMode = chart.selectionMode === 'Series';
        };
        Selection.prototype.invokeSelection = function (chart) {
            this.initPrivateVariables(chart);
            this.series = util_1.extend({}, chart.visibleSeries, null, true);
            this.seriesStyles(chart.visibleSeries);
            if (!(chart.selectionMode.indexOf('Drag') > -1)) {
                this.selectDataIndex(chart, this.concatIndexes(chart.selectedDataIndexes, this.selectedDataIndexes));
            }
        };
        Selection.prototype.concatIndexes = function (userIndexes, localIndexes) {
            return userIndexes.concat(localIndexes);
        };
        Selection.prototype.generateStyle = function (series) {
            if (series) {
                return (series.selectionStyle || this.styleId + '_series_' + series.index);
            }
            return 'undefined';
        };
        Selection.prototype.seriesStyles = function (seriesCollection) {
            var seriesclass;
            var style = document.getElementById(this.styleId);
            if (util_1.isNullOrUndefined(style)) {
                style = document.createElement('style');
                style.setAttribute('id', this.styleId);
                for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
                    var series = seriesCollection_1[_i];
                    seriesclass = series.selectionStyle || this.styleId + '_series_' + series.index;
                    style.innerHTML += series.selectionStyle ? '' : '.' + seriesclass + ' { } ';
                }
                style.innerHTML += '.' + this.unselected + ' { opacity:' + (seriesCollection[0].opacity / 3) + ';} ';
                document.body.appendChild(style);
            }
        };
        Selection.prototype.selectDataIndex = function (chart, indexes) {
            for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
                var index = indexes_1[_i];
                this.performSelection(index, chart, this.getElementByIndex(chart, index));
            }
        };
        Selection.prototype.getElementByIndex = function (chart, index) {
            var elementId = chart.element.id + '_Series_' + index.series + '_Point_' + index.point;
            elementId = (!chart.series[index.series].isRectSeries && chart.series[index.series].type !== 'Scatter' &&
                chart.series[index.series].marker.visible) ? (elementId + '_Symbol') : elementId;
            return document.getElementById(elementId);
        };
        Selection.prototype.getClusterElements = function (chart, index) {
            var clusters = [];
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                index = new Index(series.index, index.point);
                clusters.push(this.getElementByIndex(chart, index));
            }
            return clusters;
        };
        Selection.prototype.findElements = function (chart, series, index) {
            if (this.isSeriesMode) {
                return this.getSeriesElements(series);
            }
            else if (chart.selectionMode === 'Cluster') {
                return this.getClusterElements(chart, index);
            }
            else {
                return [this.getElementByIndex(chart, index)];
            }
        };
        Selection.prototype.calculateSelectedElements = function (chart, event) {
            if (event.target.id.indexOf('_Series_') > -1) {
                this.performSelection(this.indexFinder(event.target.id), chart, event.target);
            }
        };
        Selection.prototype.performSelection = function (index, chart, element) {
            this.isSeriesMode = chart.selectionMode === 'Series';
            this.legendSelectionMode = false;
            switch (chart.selectionMode) {
                case 'Series':
                    this.selection(chart, index, this.getSeriesElements(chart.series[index.series]));
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                    break;
                case 'Point':
                    if (!isNaN(index.point)) {
                        this.selection(chart, index, [element]);
                        this.blurEffect(chart.element.id, chart.visibleSeries);
                    }
                    break;
                case 'Cluster':
                    if (!isNaN(index.point)) {
                        this.clusterSelection(chart, chart.series, index);
                        this.blurEffect(chart.element.id, chart.visibleSeries);
                    }
                    break;
            }
        };
        Selection.prototype.selection = function (chart, index, selectedElements) {
            if (!chart.isMultiSelect && (chart.selectionMode.indexOf('Drag') === -1)) {
                this.removeMultiSelectEelments(chart, this.selectedDataIndexes, index, chart.series);
            }
            if (selectedElements[0] && selectedElements[0].classList.contains(this.getSelectionClass(selectedElements[0].id))) {
                this.removeStyles(selectedElements);
                this.addOrRemoveIndex(this.selectedDataIndexes, index);
            }
            else {
                this.applyStyles(selectedElements);
                this.addOrRemoveIndex(this.selectedDataIndexes, index, true);
            }
        };
        Selection.prototype.clusterSelection = function (chart, series, index) {
            this.selection(chart, index, this.getClusterElements(chart, new Index(index.series, index.point)));
        };
        Selection.prototype.removeMultiSelectEelments = function (chart, index, currentIndex, seriesCollection) {
            var series;
            for (var i = 0; i < index.length; i++) {
                series = seriesCollection[index[i].series];
                if ((this.isSeriesMode && !this.toEquals(index[i], currentIndex, this.isSeriesMode)) ||
                    (this.chart.selectionMode === 'Cluster' && !this.toEquals(index[i], currentIndex, false)) ||
                    (!this.isSeriesMode && this.toEquals(index[i], currentIndex, true) && !this.toEquals(index[i], currentIndex, false))) {
                    this.removeStyles(this.findElements(chart, series, index[i]));
                    index.splice(i, 1);
                    i--;
                }
            }
        };
        Selection.prototype.blurEffect = function (chartId, visibleSeries) {
            var visibility = this.checkVibility(this.selectedDataIndexes, this.chart.series);
            for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
                var series = visibleSeries_1[_i];
                if (series.visible) {
                    this.checkSelectionElements(document.getElementById(chartId + 'SeriesGroup' + series.index), this.generateStyle(series), visibility);
                    if (!util_1.isNullOrUndefined(document.getElementById(chartId + 'SymbolGroup' + series.index))) {
                        this.checkSelectionElements(document.getElementById(chartId + 'SymbolGroup' + series.index), this.generateStyle(series), visibility);
                    }
                }
            }
        };
        Selection.prototype.checkSelectionElements = function (element, className, visibility) {
            var children = (this.isSeriesMode ? [element] : element.childNodes);
            for (var i = 0; i < children.length; i++) {
                if (!children[i].classList.contains(className) && !children[i].parentElement.classList.contains(className) && visibility) {
                    children[i].classList.add(this.unselected);
                }
                else {
                    children[i].classList.remove(this.unselected);
                }
            }
        };
        Selection.prototype.checkVibility = function (selectedIndexes, seriesCollection) {
            var visible = false;
            var uniqueSeries = [];
            for (var _i = 0, selectedIndexes_1 = selectedIndexes; _i < selectedIndexes_1.length; _i++) {
                var index = selectedIndexes_1[_i];
                if (uniqueSeries.indexOf(index.series) === -1) {
                    uniqueSeries.push(index.series);
                }
            }
            for (var _a = 0, uniqueSeries_1 = uniqueSeries; _a < uniqueSeries_1.length; _a++) {
                var index = uniqueSeries_1[_a];
                if (seriesCollection[index].visible) {
                    visible = true;
                    break;
                }
            }
            return visible;
        };
        Selection.prototype.applyStyles = function (elements) {
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var element = elements_1[_i];
                if (element) {
                    element.parentElement.classList.remove(this.unselected);
                    element.classList.remove(this.unselected);
                    element.classList.add(this.getSelectionClass(element.id));
                }
            }
        };
        Selection.prototype.getSelectionClass = function (id) {
            return this.generateStyle(this.chart.series[this.indexFinder(id).series]);
        };
        Selection.prototype.removeStyles = function (elements) {
            for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
                var element = elements_2[_i];
                if (element) {
                    element.classList.remove(this.getSelectionClass(element.id));
                }
            }
        };
        Selection.prototype.addOrRemoveIndex = function (indexes, index, add) {
            for (var i = 0; i < indexes.length; i++) {
                if (this.toEquals(indexes[i], index, this.isSeriesMode)) {
                    indexes.splice(i, 1);
                    i--;
                }
            }
            if (add) {
                indexes.push(index);
            }
        };
        Selection.prototype.toEquals = function (first, second, checkSeriesOnly) {
            return ((first.series === second.series || (this.chart.selectionMode === 'Cluster' && !checkSeriesOnly))
                && (checkSeriesOnly || (first.point === second.point)));
        };
        Selection.prototype.redrawSelection = function (chart, oldMode) {
            this.isSeriesMode = oldMode === 'Series';
            var selectedDataIndexes = util_1.extend([], this.selectedDataIndexes, null, true);
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            this.blurEffect(chart.element.id, chart.visibleSeries);
            this.selectDataIndex(chart, selectedDataIndexes);
        };
        Selection.prototype.legendSelection = function (chart, series) {
            var seriesStyle = this.generateStyle(chart.visibleSeries[series]);
            var selectedElements = document.getElementsByClassName(seriesStyle);
            this.isSeriesMode = chart.selectionMode === 'Series';
            var isBlurEffectNeeded = true;
            if (selectedElements.length > 0) {
                var elements = [];
                for (var i = 0; i < selectedElements.length; i++) {
                    elements.push(selectedElements[i]);
                }
                this.removeStyles(elements);
                this.isSeriesMode = true;
                this.addOrRemoveIndex(this.selectedDataIndexes, new Index(series, NaN));
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var series_1 = _a[_i];
                    seriesStyle = this.generateStyle(series_1);
                    if (document.getElementsByClassName(seriesStyle).length > 0) {
                        for (var _b = 0, elements_3 = elements; _b < elements_3.length; _b++) {
                            var element = elements_3[_b];
                            this.checkSelectionElements(element, seriesStyle, true);
                        }
                        isBlurEffectNeeded = false;
                        break;
                    }
                }
                if (isBlurEffectNeeded) {
                    this.isSeriesMode = chart.selectionMode === 'Series' || this.legendSelectionMode;
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
            }
            else {
                var seriesElements = this.getSeriesElements(chart.visibleSeries[series]);
                for (var _c = 0, seriesElements_1 = seriesElements; _c < seriesElements_1.length; _c++) {
                    var seriesElement = seriesElements_1[_c];
                    this.checkSelectionElements(seriesElement, seriesStyle, false);
                }
                this.isSeriesMode = true;
                this.legendSelectionMode = true;
                isBlurEffectNeeded = this.selectedDataIndexes.length === 0;
                this.selection(chart, new Index(series, NaN), seriesElements);
                if (isBlurEffectNeeded) {
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
            }
        };
        Selection.prototype.getSeriesElements = function (series) {
            var seriesElements = [series.seriesElement];
            if (series.marker.visible && !series.isRectSeries) {
                seriesElements.push(series.symbolElement);
            }
            return seriesElements;
        };
        Selection.prototype.indexFinder = function (id) {
            var ids = ['NaN', 'NaN'];
            if (id.indexOf('SeriesGroup') > -1) {
                ids = id.split('SeriesGroup');
                ids[0] = ids[1];
            }
            else if (id.indexOf('SymbolGroup') > -1) {
                ids = id.split('SymbolGroup');
                ids[0] = ids[1];
            }
            else if (id.indexOf('_Point_') > -1) {
                ids = id.split('_Series_')[1].split('_Point_');
            }
            return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
        };
        Selection.prototype.calculateDragSelectedElements = function (chart, dragRect) {
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            var rect = new helper_1.Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
            var axisOffset = new helper_1.ChartLocation(chart.chartAxisLayoutPanel.seriesClipRect.x, chart.chartAxisLayoutPanel.seriesClipRect.y);
            this.removeOffset(rect, axisOffset);
            var points;
            var index;
            var selectedPointValues = [];
            var selectedSeriesValues = [];
            this.isSeriesMode = false;
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible) {
                    points = series.points;
                    selectedPointValues = [];
                    var xAxisOffset = series.xAxis.rect.x - axisOffset.x;
                    var yAxisOffset = series.yAxis.rect.y - axisOffset.y;
                    for (var j = 0; j < points.length; j++) {
                        if (points[j].symbolLocation && helper_1.withInBounds(points[j].symbolLocation.x + xAxisOffset, points[j].symbolLocation.y + yAxisOffset, rect)) {
                            index = new Index(series.index, points[j].index);
                            this.selection(chart, index, this.findElements(chart, series, index));
                            selectedPointValues.push({ x: points[j].xValue.toString(), y: points[j].yValue });
                        }
                    }
                    selectedSeriesValues.push(selectedPointValues);
                }
            }
            this.blurEffect(chart.element.id, chart.visibleSeries);
            this.rectPoints = new helper_1.Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
            this.createCloseButton((dragRect.x + dragRect.width), dragRect.y);
            var args = {
                name: constants_1.dragComplete,
                selectedDataValues: selectedSeriesValues,
                cancel: false
            };
            chart.trigger(constants_1.dragComplete, args);
        };
        Selection.prototype.removeOffset = function (rect, clip) {
            rect.x -= clip.x;
            rect.y -= clip.y;
        };
        Selection.prototype.drawDraggingRect = function (chart, dragRect) {
            var cartesianLayout = chart.chartAxisLayoutPanel.seriesClipRect;
            switch (chart.selectionMode) {
                case 'DragX':
                    dragRect.y = cartesianLayout.y;
                    dragRect.height = cartesianLayout.height;
                    break;
                case 'DragY':
                    dragRect.x = cartesianLayout.x;
                    dragRect.width = cartesianLayout.width;
                    break;
            }
            var element = document.getElementById(this.draggedRect);
            if (this.closeIcon) {
                this.closeIcon.remove();
            }
            if (element) {
                this.setAttributes(element, dragRect);
            }
            else {
                var dragGroup = this.renderer.createGroup({ id: this.draggedRectGroup });
                chart.svgObject.appendChild(dragGroup);
                element = this.renderer.drawRectangle(new helper_1.RectOption(this.draggedRect, theme_1.Theme.selectionRectFill, { color: theme_1.Theme.selectionRectStroke, width: 1 }, 1, dragRect));
                element.setAttribute('style', 'cursor:move;');
                dragGroup.appendChild(element);
            }
        };
        Selection.prototype.createCloseButton = function (x, y) {
            var closeIcon = this.renderer.createGroup({
                id: this.closeIconId,
                style: 'cursor:pointer; visibility: visible;'
            });
            closeIcon.appendChild(this.renderer.drawCircle(new helper_1.CircleOption(this.closeIconId + '_circle', '#FFFFFF', { color: theme_1.Theme.selectionRectStroke, width: 1 }, 1, x, y, 10)));
            var direction = 'M ' + (x - 4) + ' ' + (y - 4) + ' L ' + (x + 4) + ' ' + (y + 4) + ' M ' + (x - 4) + ' ' + (y + 4) +
                ' L ' + (x + 4) + ' ' + (y - 4);
            closeIcon.appendChild(this.renderer.drawPath({
                id: this.closeIconId + '_cross', d: direction, stroke: theme_1.Theme.selectionRectStroke,
                'stroke-width': 2, fill: theme_1.Theme.selectionRectStroke
            }));
            this.closeIcon = closeIcon;
            document.getElementById(this.draggedRectGroup).appendChild(closeIcon);
        };
        Selection.prototype.removeDraggedElements = function (chart, event) {
            if ((event.target.id.indexOf(this.closeIconId) > -1) && (event.type.indexOf('move') === -1)) {
                this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
                this.blurEffect(chart.element.id, chart.visibleSeries);
                dom_1.remove(document.getElementById(this.draggedRectGroup));
                this.changeCursorStyle(false, chart.svgObject, 'auto');
                this.rectPoints = null;
            }
        };
        Selection.prototype.resizingSelectionRect = function (chart, location, tapped) {
            var rect = new helper_1.Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
            var resize = this.findResizeMode(chart.svgObject, rect, location);
            if (this.resizing) {
                rect = helper_1.getDraggedRectLocation(rect.x, rect.y, (rect.x + rect.width), (rect.y + rect.height), chart.chartAxisLayoutPanel.seriesClipRect);
                this.drawDraggingRect(chart, rect);
                this.dragRect = rect;
            }
            if (tapped) {
                this.resizing = resize;
            }
        };
        Selection.prototype.findResizeMode = function (chartSvgObject, rect, location) {
            var cursorStyle = 'se-resize';
            var resize = false;
            if (!this.resizing) {
                var resizeEdges = [new helper_1.Rect(rect.x, (rect.y - 10), rect.width - 5, 20),
                    new helper_1.Rect((rect.x - 10), rect.y, 20, rect.height),
                    new helper_1.Rect(rect.x, (rect.y + rect.height - 10), rect.width - 10, 20),
                    new helper_1.Rect((rect.x + rect.width - 10), rect.y + 5, 20, rect.height - 15),
                    new helper_1.Rect((rect.x + rect.width - 10), (rect.y + rect.height - 10), 20, 20)];
                for (var i = 0; i < resizeEdges.length; i++) {
                    if (helper_1.withInBounds(location.x, location.y, resizeEdges[i])) {
                        cursorStyle = (i === 4) ? cursorStyle : (i % 2 === 0) ? 'ns-resize' : 'ew-resize';
                        resize = true;
                        this.resizeMode = i;
                        break;
                    }
                }
            }
            else {
                var x = rect.x;
                var y = rect.y;
                var width = (location.x - x);
                var height = (location.y - y);
                switch (this.resizeMode) {
                    case 0:
                        height = Math.abs((rect.height + rect.y) - location.y);
                        rect.y = Math.min((rect.height + rect.y), location.y);
                        rect.height = height;
                        break;
                    case 1:
                        width = Math.abs((rect.width + rect.x) - location.x);
                        rect.x = Math.min((rect.width + rect.x), location.x);
                        rect.width = width;
                        break;
                    case 2:
                        rect.height = Math.abs(height);
                        rect.y = Math.min(location.y, y);
                        break;
                    case 3:
                        rect.width = Math.abs(width);
                        rect.x = Math.min(location.x, x);
                        break;
                    case 4:
                        rect.width = Math.abs(width);
                        rect.height = Math.abs(height);
                        rect.x = Math.min(location.x, x);
                        rect.y = Math.min(location.y, y);
                        break;
                }
            }
            this.changeCursorStyle(resize, document.getElementById(this.draggedRect), cursorStyle);
            this.changeCursorStyle(resize, chartSvgObject, cursorStyle);
            return resize;
        };
        Selection.prototype.changeCursorStyle = function (isResize, rectelement, cursorStyle) {
            cursorStyle = isResize ? cursorStyle : (this.chart.svgObject === rectelement) ? 'auto' : 'move';
            rectelement.setAttribute('style', 'cursor:' + cursorStyle + ';');
        };
        Selection.prototype.removeSelectedElements = function (chart, index, seriesCollection) {
            index.splice(0, index.length);
            var seriesElements;
            for (var _i = 0, seriesCollection_2 = seriesCollection; _i < seriesCollection_2.length; _i++) {
                var series = seriesCollection_2[_i];
                seriesElements = this.getSeriesElements(series);
                this.removeStyles(seriesElements);
                for (var _a = 0, seriesElements_2 = seriesElements; _a < seriesElements_2.length; _a++) {
                    var seriesElement = seriesElements_2[_a];
                    this.removeStyles(this.getChildren(seriesElement));
                }
            }
        };
        Selection.prototype.getChildren = function (parent) {
            var children = [];
            for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].tagName !== 'defs') {
                    children.push(parent.childNodes[i]);
                }
            }
            return children;
        };
        Selection.prototype.setAttributes = function (ele, object) {
            var keys = Object.keys(object);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                ele.setAttribute(key, object[key]);
            }
        };
        Selection.prototype.draggedRectMoved = function (chart, grabbedPoint, doDrawing) {
            var rect = new helper_1.Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
            rect.x -= (grabbedPoint.x - chart.mouseX);
            rect.y -= (grabbedPoint.y - chart.mouseY);
            rect = helper_1.getDraggedRectLocation(rect.x, rect.y, rect.x + rect.width, rect.height + rect.y, chart.chartAxisLayoutPanel.seriesClipRect);
            if (doDrawing) {
                this.drawDraggingRect(chart, rect);
            }
            else {
                this.calculateDragSelectedElements(chart, rect);
            }
        };
        Selection.prototype.completeSelection = function (chart, e) {
            if ((this.dragging || this.resizing) && this.dragRect.width && this.dragRect.height) {
                this.calculateDragSelectedElements(chart, this.dragRect);
            }
            else if (this.rectGrabbing && this.rectPoints.width && this.rectPoints.height) {
                this.draggedRectMoved(chart, this.dragRect);
            }
            this.dragging = false;
            this.rectGrabbing = false;
            this.resizing = false;
            this.removeDraggedElements(chart, e);
        };
        Selection.prototype.getDragRect = function (chart, seriesClipRect) {
            return helper_1.getDraggedRectLocation(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY, seriesClipRect);
        };
        Selection.prototype.dragStart = function (chart, seriesClipRect, mouseDownX, mouseDownY, event) {
            this.dragging = (chart.selectionMode.indexOf('Drag') > -1) && (chart.isDoubleTap || !chart.isTouch);
            if (this.dragging) {
                this.dragRect = new helper_1.Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
                if (chart.mouseDownX < seriesClipRect.x || chart.mouseDownX > (seriesClipRect.x + seriesClipRect.width) ||
                    chart.mouseDownY < seriesClipRect.y || chart.mouseDownY > (seriesClipRect.y + seriesClipRect.height)) {
                    this.dragging = false;
                }
            }
            if (this.rectPoints) {
                this.dragRect = new helper_1.Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
                this.resizingSelectionRect(chart, new helper_1.ChartLocation(mouseDownX, mouseDownY), true);
                this.rectGrabbing = helper_1.withInBounds(mouseDownX, mouseDownY, this.rectPoints);
            }
        };
        Selection.prototype.mouseMove = function (chart, event) {
            var insideMoving = helper_1.withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect);
            if (insideMoving) {
                if (this.rectGrabbing && !this.resizing) {
                    this.draggedRectMoved(chart, this.dragRect, true);
                }
                else if (this.dragging && !this.resizing) {
                    this.dragRect = this.getDragRect(chart, chart.chartAxisLayoutPanel.seriesClipRect);
                    this.drawDraggingRect(chart, this.dragRect);
                }
                if (this.rectPoints) {
                    this.resizingSelectionRect(chart, new helper_1.ChartLocation(chart.mouseX, chart.mouseY));
                }
            }
            else {
                this.completeSelection(chart, event);
            }
        };
        Selection.prototype.getModuleName = function () {
            return 'Selection';
        };
        Selection.prototype.destroy = function (chart) {
        };
        return Selection;
    }());
    exports.Selection = Selection;
    var Index = (function () {
        function Index(seriesIndex, pointIndex) {
            this.series = seriesIndex;
            this.point = pointIndex;
        }
        return Index;
    }());
    exports.Index = Index;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberFormat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internationalization__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intl_base__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parser_base__ = __webpack_require__(15);




var errorText = {
    'ms': 'minimumSignificantDigits',
    'ls': 'maximumSignificantDigits',
    'mf': 'minimumFractionDigits',
    'lf': 'maximumFractionDigits',
};
var integerError = 'minimumIntegerDigits';
var percentSign = 'percentSign';
var minusSign = 'minusSign';
var spaceRegex = /\s/;
var mapper = ['infinity', 'nan', 'group', 'decimal'];
var infinity = 'infinity';
var nan = 'nan';
var NumberFormat = (function () {
    function NumberFormat() {
    }
    NumberFormat.numberFormatter = function (culture, option, cldr) {
        var _this = this;
        var fOptions = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])({}, option);
        var cOptions = {};
        var dOptions = {};
        var symbolPattern;
        var dependable = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getDependables(cldr, culture, true);
        dOptions.numberMapper = __WEBPACK_IMPORTED_MODULE_3__parser_base__["a" /* ParserBase */].getNumberMapper(dependable.parserObject, __WEBPACK_IMPORTED_MODULE_3__parser_base__["a" /* ParserBase */].getNumberingSystem(cldr), true);
        dOptions.currencySymbol = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getCurrencySymbol(dependable.numericObject, fOptions.currency || __WEBPACK_IMPORTED_MODULE_1__internationalization__["e" /* defaultCurrencyCode */]);
        dOptions.percentSymbol = dOptions.numberMapper.numberSymbols[percentSign];
        dOptions.minusSymbol = dOptions.numberMapper.numberSymbols[minusSign];
        var symbols = dOptions.numberMapper.numberSymbols;
        if ((option.format) && !(__WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].formatRegex.test(option.format))) {
            cOptions = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].customFormat(option.format, dOptions, dependable.numericObject);
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(fOptions, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getProperNumericSkeleton(option.format || 'N'));
            fOptions.isCurrency = fOptions.type === 'currency';
            fOptions.isPercent = fOptions.type === 'percent';
            symbolPattern = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getSymbolPattern(fOptions.type, dOptions.numberMapper.numberSystem, dependable.numericObject, fOptions.isAccount);
            fOptions.groupOne = this.checkValueRange(fOptions.maximumSignificantDigits, fOptions.minimumSignificantDigits, true);
            this.checkValueRange(fOptions.maximumFractionDigits, fOptions.minimumFractionDigits, false, true);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(fOptions.fractionDigits)) {
                fOptions.minimumFractionDigits = fOptions.maximumFractionDigits = fOptions.fractionDigits;
            }
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(fOptions.useGrouping)) {
                fOptions.useGrouping = true;
            }
            if (fOptions.isCurrency) {
                symbolPattern = symbolPattern.replace(/\u00A4/g, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].defaultCurrency);
            }
            var split = symbolPattern.split(';');
            cOptions.nData = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getFormatData(split[1] || '-' + split[0], true, dOptions.currencySymbol);
            cOptions.pData = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getFormatData(split[0], false, dOptions.currencySymbol);
            if (fOptions.useGrouping) {
                fOptions.groupSeparator = symbols[mapper[2]];
                fOptions.groupData = this.getGroupingDetails(split[0]);
            }
            var minFrac = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(fOptions.minimumFractionDigits);
            if (minFrac) {
                fOptions.minimumFractionDigits = cOptions.nData.minimumFraction;
            }
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(fOptions.maximumFractionDigits)) {
                var mval = cOptions.nData.maximumFraction;
                fOptions.maximumFractionDigits = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(mval) && fOptions.isPercent ? 0 : mval;
            }
            var mfrac = fOptions.minimumFractionDigits;
            var lfrac = fOptions.maximumFractionDigits;
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(mfrac) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(lfrac)) {
                if (mfrac > lfrac) {
                    fOptions.maximumFractionDigits = mfrac;
                }
            }
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions.nData, fOptions);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(cOptions.pData, fOptions);
        return function (value) {
            if (isNaN(value)) {
                return symbols[mapper[1]];
            }
            else if (!isFinite(value)) {
                return symbols[mapper[0]];
            }
            return _this.intNumberFormatter(value, cOptions, dOptions);
        };
    };
    NumberFormat.getGroupingDetails = function (pattern) {
        var ret = {};
        var match = pattern.match(__WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].negativeDataRegex);
        if (match && match[4]) {
            var pattern_1 = match[4];
            var p = pattern_1.lastIndexOf(',');
            if (p !== -1) {
                var temp = pattern_1.split('.')[0];
                ret.primary = (temp.length - p) - 1;
                var s = pattern_1.lastIndexOf(',', p - 1);
                if (s !== -1) {
                    ret.secondary = p - 1 - s;
                }
            }
        }
        return ret;
    };
    NumberFormat.checkValueRange = function (val1, val2, checkbothExist, isFraction) {
        var decide = isFraction ? 'f' : 's';
        var dint = 0;
        var str1 = errorText['l' + decide];
        var str2 = errorText['m' + decide];
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(val1)) {
            this.checkRange(val1, str1, isFraction);
            dint++;
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(val2)) {
            this.checkRange(val2, str2, isFraction);
            dint++;
        }
        if (dint === 2) {
            if (val1 < val2) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])(str2 + 'specified must be less than the' + str1);
            }
            else {
                return true;
            }
        }
        else if (checkbothExist && dint === 1) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])('Both' + str2 + 'and' + str2 + 'must be present');
        }
        return false;
    };
    NumberFormat.checkRange = function (val, text, isFraction) {
        var range = isFraction ? [0, 20] : [1, 21];
        if (val < range[0] || val > range[1]) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])(text + 'value must be within the range' + range[0] + 'to' + range[1]);
        }
    };
    NumberFormat.intNumberFormatter = function (value, fOptions, dOptions) {
        var curData;
        if (value < 0) {
            value = value * -1;
            curData = fOptions.nData;
        }
        else if (value === 0) {
            curData = fOptions.zeroData || fOptions.pData;
        }
        else {
            curData = fOptions.pData;
        }
        var fValue = '';
        if (curData.isPercent) {
            value = value * 100;
        }
        if (curData.groupOne) {
            fValue = this.processSignificantDigits(value, curData.minimumSignificantDigits, curData.maximumSignificantDigits);
        }
        else {
            fValue = this.processFraction(value, curData.minimumFractionDigits, curData.maximumFractionDigits);
            if (curData.minimumIntegerDigits) {
                fValue = this.processMinimumIntegers(fValue, curData.minimumIntegerDigits);
            }
        }
        fValue = fValue.replace('.', dOptions.numberMapper.numberSymbols[mapper[3]]);
        if (curData.useGrouping) {
            fValue = this.groupNumbers(fValue, curData.groupData.primary, curData.groupSeparator || ',', dOptions.numberMapper.numberSymbols[mapper[3]] || '.', curData.groupData.secondary);
        }
        fValue = __WEBPACK_IMPORTED_MODULE_3__parser_base__["a" /* ParserBase */].convertValueParts(fValue, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].latnParseRegex, dOptions.numberMapper.mapper);
        return curData.nlead + fValue + curData.nend;
    };
    NumberFormat.processSignificantDigits = function (value, min, max) {
        var temp = value + '';
        var tn;
        var length = temp.length;
        if (length < min) {
            return value.toPrecision(min);
        }
        else {
            temp = value.toPrecision(max);
            tn = +temp;
            return tn + '';
        }
    };
    NumberFormat.groupNumbers = function (val, level1, sep, decimalSymbol, level2) {
        var flag = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(level2) && level2 !== 0;
        var split = val.split(decimalSymbol);
        var prefix = split[0];
        var length = prefix.length;
        var str = '';
        while (length > level1) {
            str = prefix.slice(length - level1, length) + (str.length ?
                (sep + str) : '');
            length -= level1;
            if (flag) {
                level1 = level2;
                flag = false;
            }
        }
        split[0] = prefix.slice(0, length) + (str.length ? sep : '') + str;
        return split.join(decimalSymbol);
    };
    NumberFormat.processFraction = function (value, min, max) {
        var temp = (value + '').split('.')[1];
        var length = temp ? temp.length : 0;
        if (min && length < min) {
            var ret = '';
            if (length === 0) {
                ret = value.toFixed(min);
            }
            else {
                ret += value;
                for (var j = 0; j < min - length; j++) {
                    ret += '0';
                }
                return ret;
            }
            return value.toFixed(min);
        }
        else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(max) && (length > max || max === 0)) {
            return value.toFixed(max);
        }
        return value + '';
    };
    NumberFormat.processMinimumIntegers = function (value, min) {
        var temp = value.split('.');
        var lead = temp[0];
        var len = lead.length;
        if (len < min) {
            for (var i = 0; i < min - len; i++) {
                lead = '0' + lead;
            }
            temp[0] = lead;
        }
        return temp.join('.');
    };
    return NumberFormat;
}());



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

var MODULE_SUFFIX = 'Module';
var ModuleLoader = (function () {
    function ModuleLoader(parent) {
        this.loadedModules = [];
        this.parent = parent;
    }
    ;
    ModuleLoader.prototype.inject = function (requiredModules, moduleList) {
        var reqLength = requiredModules.length;
        if (reqLength === 0) {
            this.clean();
            return;
        }
        if (this.loadedModules.length) {
            this.clearUnusedModule(requiredModules);
        }
        for (var i = 0; i < reqLength; i++) {
            var modl = requiredModules[i];
            for (var _i = 0, moduleList_1 = moduleList; _i < moduleList_1.length; _i++) {
                var module = moduleList_1[_i];
                var modName = modl.member;
                if (module.prototype.getModuleName() === modl.member && !this.isModuleLoaded(modName)) {
                    var moduleObject = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* createInstance */])(module, modl.args);
                    var memberName = this.getMemberName(modName);
                    if (modl.isProperty) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(memberName, module, this.parent);
                    }
                    else {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(memberName, moduleObject, this.parent);
                    }
                    var loadedModule = modl;
                    loadedModule.member = memberName;
                    this.loadedModules.push(loadedModule);
                }
            }
        }
    };
    ModuleLoader.prototype.clean = function () {
        for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
            var modules = _a[_i];
            if (!modules.isProperty) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(modules.member, this.parent).destroy();
            }
        }
        this.loadedModules = [];
    };
    ModuleLoader.prototype.clearUnusedModule = function (moduleList) {
        var _this = this;
        var usedModules = moduleList.map(function (arg) { return _this.getMemberName(arg.member); });
        var removableModule = this.loadedModules.filter(function (module) {
            return usedModules.indexOf(module.member) === -1;
        });
        for (var _i = 0, removableModule_1 = removableModule; _i < removableModule_1.length; _i++) {
            var mod = removableModule_1[_i];
            if (!mod.isProperty) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(mod.member, this.parent).destroy();
            }
            this.loadedModules.splice(this.loadedModules.indexOf(mod), 1);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["h" /* deleteObject */])(this.parent, mod.member);
        }
    };
    ModuleLoader.prototype.getMemberName = function (name) {
        return name[0].toLowerCase() + name.substring(1) + MODULE_SUFFIX;
    };
    ModuleLoader.prototype.isModuleLoaded = function (modName) {
        for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
            var mod = _a[_i];
            if (mod.member === this.getMemberName(modName)) {
                return true;
            }
        }
        return false;
    };
    return ModuleLoader;
}());



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Adaptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JsonAdaptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UrlAdaptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ODataAdaptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ODataV4Adaptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return WebApiAdaptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return WebMethodAdaptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return RemoteSaveAdaptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CacheAdaptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__query__ = __webpack_require__(20);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Adaptor = (function () {
    function Adaptor(ds) {
        this.options = {
            from: 'table',
            requestType: 'json',
            sortBy: 'sorted',
            select: 'select',
            skip: 'skip',
            group: 'group',
            take: 'take',
            search: 'search',
            count: 'requiresCounts',
            where: 'where',
            aggregates: 'aggregates'
        };
        this.type = Adaptor;
        this.dataSource = ds;
        this.pvt = {};
    }
    Adaptor.prototype.processResponse = function (data, ds, query, xhr) {
        return data;
    };
    return Adaptor;
}());

var JsonAdaptor = (function (_super) {
    __extends(JsonAdaptor, _super);
    function JsonAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonAdaptor.prototype.processQuery = function (dataManager, query) {
        var result = dataManager.dataSource.json.slice(0);
        var count = result.length;
        var countFlg = true;
        var ret;
        var key;
        var agg = {};
        for (var i = 0; i < query.queries.length; i++) {
            key = query.queries[i];
            ret = this[key.fn].call(this, result, key.e, query);
            if (key.fn === 'onAggregates') {
                agg[key.e.field + ' - ' + key.e.type] = ret;
            }
            else {
                result = ret !== undefined ? ret : result;
            }
            if (key.fn === 'onPage' || key.fn === 'onSkip' || key.fn === 'onTake' || key.fn === 'onRange') {
                countFlg = false;
            }
            if (countFlg) {
                count = result.length;
            }
        }
        if (query.requiresCounts) {
            result = {
                result: result,
                count: count,
                aggregates: agg
            };
        }
        return result;
    };
    JsonAdaptor.prototype.batchRequest = function (dm, changes, e) {
        var i;
        for (i = 0; i < changes.addedRecords.length; i++) {
            this.insert(dm, changes.addedRecords[i]);
        }
        for (i = 0; i < changes.changedRecords.length; i++) {
            this.update(dm, e.key, changes.changedRecords[i]);
        }
        for (i = 0; i < changes.deletedRecords.length; i++) {
            this.remove(dm, e.key, changes.deletedRecords[i]);
        }
        return changes;
    };
    JsonAdaptor.prototype.onWhere = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.filter(function (obj) {
            if (e) {
                return e.validate(obj);
            }
        });
    };
    JsonAdaptor.prototype.onAggregates = function (ds, e) {
        var fn = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].aggregates[e.type];
        if (!ds || !fn || ds.length === 0) {
            return null;
        }
        return fn(ds, e.field);
    };
    JsonAdaptor.prototype.onSearch = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        if (e.fieldNames.length === 0) {
            __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getFieldList(ds[0], e.fieldNames);
        }
        return ds.filter(function (obj) {
            for (var j = 0; j < e.fieldNames.length; j++) {
                if (e.comparer.call(obj, __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase)) {
                    return true;
                }
            }
            return false;
        });
    };
    JsonAdaptor.prototype.onSortBy = function (ds, e, query) {
        if (!ds || !ds.length) {
            return ds;
        }
        var fnCompare;
        var field = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.fieldName, query);
        if (!field) {
            return ds.sort(e.comparer);
        }
        if (field instanceof Array) {
            field = field.slice(0);
            for (var i = field.length - 1; i >= 0; i--) {
                if (!field[i]) {
                    continue;
                }
                fnCompare = e.comparer;
                if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].endsWith(field[i], ' desc')) {
                    fnCompare = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].fnSort('descending');
                    field[i] = field[i].replace(' desc', '');
                }
                ds = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].sort(ds, field[i], fnCompare);
            }
            return ds;
        }
        return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].sort(ds, field, e.comparer);
    };
    JsonAdaptor.prototype.onGroup = function (ds, e, query) {
        if (!ds || !ds.length) {
            return ds;
        }
        var aggQuery = __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */].filterQueries(query.queries, 'onAggregates');
        var agg = [];
        if (aggQuery.length) {
            var tmp = void 0;
            for (var i = 0; i < aggQuery.length; i++) {
                tmp = aggQuery[i].e;
                agg.push({ type: tmp.type, field: __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(tmp.field, query) });
            }
        }
        return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].group(ds, __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.fieldName, query), agg);
    };
    JsonAdaptor.prototype.onPage = function (ds, e, query) {
        var size = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.pageSize, query);
        var start = (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.pageIndex, query) - 1) * size;
        var end = start + size;
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(start, end);
    };
    JsonAdaptor.prototype.onRange = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.start), __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.end));
    };
    JsonAdaptor.prototype.onTake = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(0, __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.nos));
    };
    JsonAdaptor.prototype.onSkip = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return ds.slice(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.nos));
    };
    JsonAdaptor.prototype.onSelect = function (ds, e) {
        if (!ds || !ds.length) {
            return ds;
        }
        return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].select(ds, __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(e.fieldNames));
    };
    JsonAdaptor.prototype.insert = function (dm, data) {
        return dm.dataSource.json.push(data);
    };
    JsonAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        var ds = dm.dataSource.json;
        var i;
        if (typeof value === 'object') {
            value = value[keyField];
        }
        for (i = 0; i < ds.length; i++) {
            if (ds[i][keyField] === value) {
                break;
            }
        }
        return i !== ds.length ? ds.splice(i, 1) : null;
    };
    JsonAdaptor.prototype.update = function (dm, keyField, value, tableName) {
        var ds = dm.dataSource.json;
        var i;
        var key = value[keyField];
        for (i = 0; i < ds.length; i++) {
            if (ds[i][keyField] === key) {
                break;
            }
        }
        return i < ds.length ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["merge"])(ds[i], value) : null;
    };
    return JsonAdaptor;
}(Adaptor));

var UrlAdaptor = (function (_super) {
    __extends(UrlAdaptor, _super);
    function UrlAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
        var queries = this.getQueryRequest(query);
        var singles = __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */].filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        var params = query.params;
        var url = dm.dataSource.url;
        var temp;
        var skip;
        var take = null;
        var options = this.options;
        var request = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        if ('onPage' in singles) {
            temp = singles.onPage;
            skip = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(temp.pageIndex, query);
            take = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(temp.pageSize, query);
            skip = (skip - 1) * take;
        }
        else if ('onRange' in singles) {
            temp = singles.onRange;
            skip = temp.start;
            take = temp.end - temp.start;
        }
        for (var i = 0; i < queries.sorts.length; i++) {
            temp = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(queries.sorts[i].e.fieldName, query);
            request.sorts.push(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onEachSort', { name: temp, direction: queries.sorts[i].e.direction }, query));
        }
        if (hierarchyFilters) {
            temp = this.getFiltersFrom(hierarchyFilters, query);
            if (temp) {
                request.filters.push(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onEachWhere', temp.toJson(), query));
            }
        }
        for (var i = 0; i < queries.filters.length; i++) {
            request.filters.push(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onEachWhere', queries.filters[i].e.toJson(), query));
            var keys_1 = typeof request.filters[i] === 'object' ? Object.keys(request.filters[i]) : [];
            for (var _i = 0, keys_2 = keys_1; _i < keys_2.length; _i++) {
                var prop = keys_2[_i];
                if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].isNull((request)[prop])) {
                    delete request[prop];
                }
            }
        }
        for (var i = 0; i < queries.searches.length; i++) {
            temp = queries.searches[i].e;
            request.searches.push(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onEachSearch', {
                fields: temp.fieldNames,
                operator: temp.operator,
                key: temp.searchKey,
                ignoreCase: temp.ignoreCase
            }, query));
        }
        for (var i = 0; i < queries.groups.length; i++) {
            request.groups.push(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(queries.groups[i].e.fieldName, query));
        }
        for (var i = 0; i < queries.aggregates.length; i++) {
            temp = queries.aggregates[i].e;
            request.aggregates.push({ type: temp.type, field: __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(temp.field, query) });
        }
        var req = {};
        this.getRequestQuery(options, query, singles, request, req);
        __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'addParams', { dm: dm, query: query, params: params, reqParams: req });
        var keys = Object.keys(req);
        for (var _a = 0, keys_3 = keys; _a < keys_3.length; _a++) {
            var prop = keys_3[_a];
            if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].isNull(req[prop]) || req[prop] === '' || req[prop].length === 0) {
                delete req[prop];
            }
        }
        if (!(options.skip in req && options.take in req) && take !== null) {
            req[options.skip] = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onSkip', skip, query);
            req[options.take] = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onTake', take, query);
        }
        var p = this.pvt;
        this.pvt = {};
        if (this.options.requestType === 'json') {
            return {
                data: JSON.stringify(req),
                url: url,
                pvtData: p,
                type: 'POST',
                contentType: 'application/json; charset=utf-8'
            };
        }
        temp = this.convertToQueryString(req, query, dm);
        temp = (dm.dataSource.url.indexOf('?') !== -1 ? '&' : '/') + temp;
        return {
            type: 'GET', url: temp.length ? url.replace(/\/*$/, temp) : url, pvtData: p
        };
    };
    UrlAdaptor.prototype.getRequestQuery = function (options, query, singles, request, request1) {
        var param = 'param';
        var req = request1;
        req[options.from] = query.fromTable;
        if (options.expand) {
            req[options.expand] = query.expands;
        }
        req[options.select] = 'onSelect' in singles ?
            __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onSelect', __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(singles.onSelect.fieldNames, query), query) : '';
        req[options.count] = query.requiresCounts ? __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onCount', query.requiresCounts, query) : '';
        req[options.search] = request.searches.length ? __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onSearch', request.searches, query) : '';
        req[options.skip] = 'onSkip' in singles ?
            __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onSkip', __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(singles.onSkip.nos, query), query) : '';
        req[options.take] = 'onTake' in singles ?
            __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onTake', __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getValue(singles.onTake.nos, query), query) : '';
        req[options.where] = request.filters.length || request.searches.length ?
            __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onWhere', request.filters, query) : '';
        req[options.sortBy] = request.sorts.length ? __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onSortBy', request.sorts, query) : '';
        req[options.group] = request.groups.length ? __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onGroup', request.groups, query) : '';
        req[options.aggregates] = request.aggregates.length ?
            __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].callAdaptorFunction(this, 'onAggregates', request.aggregates, query) : '';
        req[param] = [];
    };
    UrlAdaptor.prototype.convertToQueryString = function (request, query, dm) {
        return '';
    };
    UrlAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        var requests = request;
        var pvt = requests.pvtData || {};
        var groupDs = data.groupDs;
        if (xhr && xhr.getResponseHeader('Content-Type') &&
            xhr.getResponseHeader('Content-Type').indexOf('xml') !== -1) {
            return query.requiresCounts ? { result: [], count: 0 } : [];
        }
        var d = JSON.parse(requests.data);
        if (d && d.action === 'batch' && data.addedRecords) {
            changes.addedRecords = data.addedRecords;
            return changes;
        }
        if (data.d) {
            data = data.d;
        }
        var args = {};
        if ('count' in data) {
            args.count = data.count;
        }
        args.result = data.result ? data.result : data;
        this.getAggregateResult(pvt, data, args, groupDs);
        return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].isNull(args.count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    UrlAdaptor.prototype.onGroup = function (e) {
        this.pvt.groups = e;
    };
    UrlAdaptor.prototype.onAggregates = function (e) {
        this.pvt.aggregates = e;
    };
    UrlAdaptor.prototype.batchRequest = function (dm, changes, e) {
        var url;
        var key;
        return {
            type: 'POST',
            url: dm.dataSource.batchUrl || dm.dataSource.crudUrl || dm.dataSource.removeUrl || dm.dataSource.url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                changed: changes.changedRecords,
                added: changes.addedRecords,
                deleted: changes.deletedRecords,
                action: 'batch',
                table: e[url],
                key: e[key]
            })
        };
    };
    UrlAdaptor.prototype.beforeSend = function (dm, request) {
    };
    UrlAdaptor.prototype.insert = function (dm, data, tableName) {
        return {
            url: dm.dataSource.insertUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify({
                value: data,
                table: tableName,
                action: 'insert'
            })
        };
    };
    UrlAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        return {
            type: 'POST',
            url: dm.dataSource.removeUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify({
                key: value,
                keyColumn: keyField,
                table: tableName,
                action: 'remove'
            })
        };
    };
    UrlAdaptor.prototype.update = function (dm, keyField, value, tableName) {
        return {
            type: 'POST',
            url: dm.dataSource.updateUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify({
                value: value,
                action: 'update',
                keyColumn: keyField,
                key: value[keyField],
                table: tableName
            })
        };
    };
    UrlAdaptor.prototype.getFiltersFrom = function (data, query) {
        var key = query.fKey;
        var value;
        var prop = key;
        var pKey = query.key;
        var predicats = [];
        if (typeof data[0] !== 'object') {
            prop = null;
        }
        for (var i = 0; i < data.length; i++) {
            if (typeof data[0] === 'object') {
                value = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getObject(pKey || prop, data[i]);
            }
            else {
                value = data[i];
            }
            predicats.push(new __WEBPACK_IMPORTED_MODULE_2__query__["b" /* Predicate */](key, 'equal', value));
        }
        return __WEBPACK_IMPORTED_MODULE_2__query__["b" /* Predicate */].or(predicats);
    };
    UrlAdaptor.prototype.getAggregateResult = function (pvt, data, args, groupDs) {
        var pData = data;
        if (data && data.result) {
            pData = data.result;
        }
        if (pvt && pvt.aggregates && pvt.aggregates.length) {
            var agg = pvt.aggregates;
            var fn = void 0;
            var aggregateData = pData;
            var res = {};
            if (data.aggregate) {
                aggregateData = data.aggregate;
            }
            for (var i = 0; i < agg.length; i++) {
                fn = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].aggregates[agg[i].type];
                if (fn) {
                    res[agg[i].field + ' - ' + agg[i].type] = fn(aggregateData, agg[i].field);
                }
            }
            args.aggregates = res;
        }
        if (pvt && pvt.groups && pvt.groups.length) {
            var groups = pvt.groups;
            for (var i = 0; i < groups.length; i++) {
                var level = null;
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(groupDs)) {
                    groupDs = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].group(groupDs, groups[i]);
                }
                pData = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].group(pData, groups[i], pvt.aggregates, level, groupDs);
            }
            args.result = pData;
        }
        return args;
    };
    UrlAdaptor.prototype.getQueryRequest = function (query) {
        var req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
        req.sorts = __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */].filterQueries(query.queries, 'onSortBy');
        req.groups = __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */].filterQueries(query.queries, 'onGroup');
        req.filters = __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */].filterQueries(query.queries, 'onWhere');
        req.searches = __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */].filterQueries(query.queries, 'onSearch');
        req.aggregates = __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */].filterQueries(query.queries, 'onAggregates');
        return req;
    };
    return UrlAdaptor;
}(Adaptor));

var ODataAdaptor = (function (_super) {
    __extends(ODataAdaptor, _super);
    function ODataAdaptor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["extend"])({}, _this.options, {
            requestType: 'get',
            accept: 'application/json;odata=light;q=1,application/json;odata=verbose;q=0.5',
            multipartAccept: 'multipart/mixed',
            sortBy: '$orderby',
            select: '$select',
            skip: '$skip',
            take: '$top',
            count: '$inlinecount',
            where: '$filter',
            expand: '$expand',
            batch: '$batch',
            changeSet: '--changeset_',
            batchPre: 'batch_',
            contentId: 'Content-Id: ',
            batchContent: 'Content-Type: multipart/mixed; boundary=',
            changeSetContent: 'Content-Type: application/http\nContent-Transfer-Encoding: binary ',
            batchChangeSetContentType: 'Content-Type: application/json; charset=utf-8 '
        });
        return _this;
    }
    ODataAdaptor.prototype.onPredicate = function (predicate, query, requiresCast) {
        var returnValue = '';
        var operator;
        var guid;
        var val = predicate.value;
        var type = typeof val;
        var field = predicate.field ? ODataAdaptor.getField(predicate.field) : null;
        if (val instanceof Date) {
            val = 'datetime\'' + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].parse.replacer(val) + '\'';
        }
        if (type === 'string') {
            val = '\'' + val + '\'';
            if (requiresCast) {
                field = 'cast(' + field + ', \'Edm.String\')';
            }
            if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].parse.isGuid(val)) {
                guid = 'guid';
            }
            if (predicate.ignoreCase) {
                if (!guid) {
                    field = 'tolower(' + field + ')';
                }
                val = val.toLowerCase();
            }
        }
        operator = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].odBiOperator[predicate.operator];
        if (operator) {
            returnValue += field;
            returnValue += operator;
            if (guid) {
                returnValue += guid;
            }
            return returnValue + val;
        }
        operator = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].odUniOperator[predicate.operator];
        if (operator === 'substringof') {
            var temp = val;
            val = field;
            field = temp;
        }
        returnValue += operator + '(';
        returnValue += field + ',';
        if (guid) {
            returnValue += guid;
        }
        returnValue += val + ')';
        return returnValue;
    };
    ODataAdaptor.prototype.onComplexPredicate = function (predicate, query, requiresCast) {
        var res = [];
        for (var i = 0; i < predicate.predicates.length; i++) {
            res.push('(' + this.onEachWhere(predicate.predicates[i], query, requiresCast) + ')');
        }
        return res.join(' ' + predicate.condition + ' ');
    };
    ODataAdaptor.prototype.onEachWhere = function (filter, query, requiresCast) {
        return filter.isComplex ? this.onComplexPredicate(filter, query, requiresCast) : this.onPredicate(filter, query, requiresCast);
    };
    ODataAdaptor.prototype.onWhere = function (filters) {
        if (this.pvt.search) {
            filters.push(this.onEachWhere(this.pvt.search, null, true));
        }
        return filters.join(' and ');
    };
    ODataAdaptor.prototype.onEachSearch = function (e) {
        if (e.fields && e.fields.length === 0) {
            __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].throwError('Query() - Search : oData search requires list of field names to search');
        }
        var filter = this.pvt.search || [];
        for (var i = 0; i < e.fields.length; i++) {
            filter.push(new __WEBPACK_IMPORTED_MODULE_2__query__["b" /* Predicate */](e.fields[i], e.operator, e.key, e.ignoreCase));
        }
        this.pvt.search = filter;
    };
    ODataAdaptor.prototype.onSearch = function (e) {
        this.pvt.search = __WEBPACK_IMPORTED_MODULE_2__query__["b" /* Predicate */].or(this.pvt.search);
        return '';
    };
    ODataAdaptor.prototype.onEachSort = function (e) {
        var res = [];
        if (e.name instanceof Array) {
            for (var i = 0; i < e.name.length; i++) {
                res.push(ODataAdaptor.getField(e.name[i]) + (e.direction === 'descending' ? ' desc' : ''));
            }
        }
        else {
            res.push(ODataAdaptor.getField(e.name) + (e.direction === 'descending' ? ' desc' : ''));
        }
        return res.join(',');
    };
    ODataAdaptor.prototype.onSortBy = function (e) {
        return e.reverse().join(',');
    };
    ODataAdaptor.prototype.onGroup = function (e) {
        this.pvt.groups = e;
        return '';
    };
    ODataAdaptor.prototype.onSelect = function (e) {
        for (var i = 0; i < e.length; i++) {
            e[i] = ODataAdaptor.getField(e[i]);
        }
        return e.join(',');
    };
    ODataAdaptor.prototype.onAggregates = function (e) {
        this.pvt.aggregates = e;
        return '';
    };
    ODataAdaptor.prototype.onCount = function (e) {
        return e === true ? 'allpages' : '';
    };
    ODataAdaptor.prototype.beforeSend = function (dm, request, settings) {
        if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].endsWith(settings.url, this.options.batch) && settings.type.toLowerCase() === 'post') {
            request.setRequestHeader('Accept', this.options.multipartAccept);
            request.setRequestHeader('DataServiceVersion', '2.0');
            request.overrideMimeType('text/plain; charset=x-user-defined');
        }
        else {
            request.setRequestHeader('Accept', this.options.accept);
        }
        request.setRequestHeader('DataServiceVersion', '2.0');
        request.setRequestHeader('MaxDataServiceVersion', '2.0');
    };
    ODataAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        var pvtData = 'pvtData';
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(data.d)) {
            var dataCopy = (query && query.requiresCounts) ? data.d.results : data.d;
            var metaData = '__metadata';
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(dataCopy)) {
                for (var i = 0; i < dataCopy.length; i++) {
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(dataCopy[i][metaData])) {
                        delete dataCopy[i][metaData];
                    }
                }
            }
        }
        var pvt = request && request[pvtData];
        var emptyAndBatch = this.processBatchResponse(data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }
        var versionCheck = xhr && request.getResponseHeader('DataServiceVersion');
        var count = null;
        var version = (versionCheck && parseInt(versionCheck, 10)) || 2;
        if (query && query.requiresCounts) {
            var oDataCount = '__count';
            if (data[oDataCount] || data['odata.count']) {
                count = data[oDataCount] || data['odata.count'];
            }
            if (data.d) {
                data = data.d;
            }
            if (data[oDataCount] || data['odata.count']) {
                count = data[oDataCount] || data['odata.count'];
            }
        }
        if (version === 3 && data.value) {
            data = data.value;
        }
        if (data.d) {
            data = data.d;
        }
        if (version < 3 && data.results) {
            data = data.results;
        }
        var args = {};
        args.count = count;
        args.result = data;
        this.getAggregateResult(pvt, data, args);
        return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    ODataAdaptor.prototype.convertToQueryString = function (request, query, dm) {
        var res = [];
        var table = 'table';
        var tableName = request[table] || '';
        var format = '$format';
        delete request[table];
        if (dm.dataSource.requiresFormat) {
            request[format] = 'json';
        }
        var keys = Object.keys(request);
        for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
            var prop = keys_4[_i];
            res.push(prop + '=' + request[prop]);
        }
        res = res.join('&');
        if (dm.dataSource.url && dm.dataSource.url.indexOf('?') !== -1 && !tableName) {
            return res;
        }
        return res.length ? tableName + '?' + res : tableName || '';
    };
    ODataAdaptor.prototype.insert = function (dm, data, tableName) {
        return {
            url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : ''),
            data: JSON.stringify(data)
        };
    };
    ODataAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        return {
            type: 'DELETE',
            url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : '') + '(' + value + ')'
        };
    };
    ODataAdaptor.prototype.update = function (dm, keyField, value, tableName) {
        return {
            type: 'PUT',
            url: dm.dataSource.url.replace(/\/*$/, tableName ? '/' + tableName : '') + '(' + value[keyField] + ')',
            data: JSON.stringify(value),
            accept: this.options.accept
        };
    };
    ODataAdaptor.prototype.batchRequest = function (dm, changes, e) {
        var initialGuid = e.guid = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getGuid(this.options.batchPre);
        var url = dm.dataSource.url.replace(/\/*$/, '/' + this.options.batch);
        var args = {
            url: e.url,
            key: e.key,
            cid: 1,
            cSet: __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getGuid(this.options.changeSet)
        };
        var req = '--' + initialGuid + '\n';
        req += 'Content-Type: multipart/mixed; boundary=' + args.cSet.replace('--', '') + '\n';
        this.pvt.changeSet = 0;
        req += this.generateInsertRequest(changes.addedRecords, args);
        req += this.generateUpdateRequest(changes.changedRecords, args);
        req += this.generateDeleteRequest(changes.deletedRecords, args);
        req += args.cSet + '--\n';
        req += '--' + initialGuid + '--';
        return {
            type: 'POST',
            url: url,
            dataType: 'json',
            contentType: 'multipart/mixed; charset=UTF-8;boundary=' + initialGuid,
            data: req
        };
    };
    ODataAdaptor.prototype.generateDeleteRequest = function (arr, e) {
        if (!arr) {
            return '';
        }
        var req = '';
        var stat = {
            'method': 'DELETE ',
            'url': function (data, i, key) { return '(' + data[i][key] + ')'; },
            'data': function (data, i) { return ''; }
        };
        req = this.generateBodyContent(arr, e, stat);
        return req + '\n';
    };
    ODataAdaptor.prototype.generateInsertRequest = function (arr, e) {
        if (!arr) {
            return '';
        }
        var req = '';
        var stat = {
            'method': 'POST ',
            'url': function (data, i, key) { return ''; },
            'data': function (data, i) { return JSON.stringify(data[i]) + '\n\n'; }
        };
        req = this.generateBodyContent(arr, e, stat);
        return req;
    };
    ODataAdaptor.prototype.generateUpdateRequest = function (arr, e) {
        if (!arr) {
            return '';
        }
        var req = '';
        var stat = {
            'method': 'PUT ',
            'url': function (data, i, key) { return '(' + data[i][key] + ')'; },
            'data': function (data, i) { return JSON.stringify(data[i]) + '\n\n'; }
        };
        req = this.generateBodyContent(arr, e, stat);
        return req;
    };
    ODataAdaptor.getField = function (prop) {
        return prop.replace(/\./g, '/');
    };
    ODataAdaptor.prototype.generateBodyContent = function (arr, e, stat) {
        var req = '';
        for (var i = 0; i < arr.length; i++) {
            req += '\n' + e.cSet + '\n';
            req += this.options.changeSetContent + '\n\n';
            req += stat.method;
            req += e.url + stat.url(arr, i, e.key) + ' HTTP/1.1\n';
            req += 'Accept: ' + this.options.accept + '\n';
            req += 'Content-Id: ' + this.pvt.changeSet++ + '\n';
            req += this.options.batchChangeSetContentType + '\n\n';
            req += stat.data(arr, i);
        }
        return req;
    };
    ODataAdaptor.prototype.processBatchResponse = function (data, query, xhr, request, changes) {
        if (xhr && xhr.getResponseHeader('Content-Type') && xhr.getResponseHeader('Content-Type').indexOf('xml') !== -1) {
            return query.requiresCounts ? { result: [], count: 0 } : [];
        }
        if (request && this.options.batch && __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].endsWith(request.url, this.options.batch) && request.type.toLowerCase() === 'post') {
            var guid = xhr.getResponseHeader('Content-Type');
            var cIdx = void 0;
            var jsonObj = void 0;
            guid = guid.substring(guid.indexOf('=batchresponse') + 1);
            data = data.split(guid);
            if (data.length < 2) {
                return {};
            }
            data = data[1];
            var exVal = /(?:\bContent-Type.+boundary=)(changesetresponse.+)/i.exec(data);
            if (exVal) {
                data.replace(exVal[0], '');
            }
            var changeGuid = exVal ? exVal[1] : '';
            data = data.split(changeGuid);
            for (var i = data.length; i > -1; i--) {
                if (!/\bContent-ID:/i.test(data[i]) || !/\bHTTP.+201/.test(data[i])) {
                    continue;
                }
                cIdx = parseInt(/\bContent-ID: (\d+)/i.exec(data[i])[1], 10);
                if (changes.addedRecords[cIdx]) {
                    jsonObj = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].parse.parseJson(/^\{.+\}/m.exec(data[i])[0]);
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["extend"])({}, changes.addedRecords[cIdx], this.processResponse(jsonObj));
                }
            }
            return changes;
        }
        return null;
    };
    return ODataAdaptor;
}(UrlAdaptor));

var ODataV4Adaptor = (function (_super) {
    __extends(ODataV4Adaptor, _super);
    function ODataV4Adaptor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["extend"])({}, _this.options, {
            requestType: 'get',
            accept: 'application/json, text/javascript, */*; q=0.01',
            multipartAccept: 'multipart/mixed',
            sortBy: '$orderby',
            select: '$select',
            skip: '$skip',
            take: '$top',
            count: '$count',
            search: '$search',
            where: '$filter',
            expand: '$expand',
            batch: '$batch',
            changeSet: '--changeset_',
            batchPre: 'batch_',
            contentId: 'Content-Id: ',
            batchContent: 'Content-Type: multipart/mixed; boundary=',
            changeSetContent: 'Content-Type: application/http\nContent-Transfer-Encoding: binary ',
            batchChangeSetContentType: 'Content-Type: application/json; charset=utf-8 '
        });
        return _this;
    }
    ODataV4Adaptor.prototype.onCount = function (e) {
        return e === true ? 'true' : '';
    };
    ODataV4Adaptor.prototype.onPredicate = function (predicate, requiresCast) {
        var returnValue = '';
        var val = predicate.value;
        var isDate = val instanceof Date;
        returnValue = _super.prototype.onPredicate.call(this, predicate, requiresCast);
        if (isDate) {
            returnValue = returnValue.replace(/datetime'(.*)'$/, '$1');
        }
        return returnValue;
    };
    ODataV4Adaptor.prototype.onEachSearch = function (e) {
        var search = this.pvt.searches || [];
        search.push(e.key);
        this.pvt.searches = search;
    };
    ODataV4Adaptor.prototype.onSearch = function (e) {
        return this.pvt.searches.join(' OR ');
    };
    ODataV4Adaptor.prototype.beforeSend = function (dm, request, settings) {
        request.setRequestHeader('Accept', this.options.accept);
    };
    ODataV4Adaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        var pvtData = 'pvtData';
        var pvt = request && request[pvtData];
        var emptyAndBatch = _super.prototype.processBatchResponse.call(this, data, query, xhr, request, changes);
        if (emptyAndBatch) {
            return emptyAndBatch;
        }
        var count = null;
        var dataCount = '@odata.count';
        if (query && query.requiresCounts) {
            if (dataCount in data) {
                count = data[dataCount];
            }
        }
        data = data.value;
        var args = {};
        args.count = count;
        args.result = data;
        this.getAggregateResult(pvt, data, args);
        return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].isNull(count) ? args.result : { result: args.result, count: count, aggregates: args.aggregates };
    };
    return ODataV4Adaptor;
}(ODataAdaptor));

var WebApiAdaptor = (function (_super) {
    __extends(WebApiAdaptor, _super);
    function WebApiAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebApiAdaptor.prototype.insert = function (dm, data, tableName) {
        return {
            type: 'POST',
            url: dm.dataSource.url,
            data: JSON.stringify(data)
        };
    };
    WebApiAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        return {
            type: 'DELETE',
            url: dm.dataSource.url + '/' + value,
            data: JSON.stringify(value)
        };
    };
    WebApiAdaptor.prototype.update = function (dm, keyField, value, tableName) {
        return {
            type: 'PUT',
            url: dm.dataSource.url,
            data: JSON.stringify(value)
        };
    };
    WebApiAdaptor.prototype.beforeSend = function (dm, request, settings) {
        request.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
    };
    WebApiAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        var pvtData = 'pvtData';
        var pvt = request && request[pvtData];
        var count = null;
        var args = {};
        if (request && request.type.toLowerCase() !== 'post') {
            var versionCheck = xhr && request.getResponseHeader('DataServiceVersion');
            var version = (versionCheck && parseInt(versionCheck, 10)) || 2;
            if (query && query.requiresCounts) {
                if (!__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].isNull(data.Count)) {
                    count = data.Count;
                }
            }
            if (version < 3 && data.Items) {
                data = data.Items;
            }
            args.count = count;
            args.result = data;
            this.getAggregateResult(pvt, data, args);
        }
        args.result = args.result || data;
        return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    return WebApiAdaptor;
}(ODataAdaptor));

var WebMethodAdaptor = (function (_super) {
    __extends(WebMethodAdaptor, _super);
    function WebMethodAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebMethodAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
        var obj = new UrlAdaptor().processQuery(dm, query, hierarchyFilters);
        var getData = 'data';
        var data = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].parse.parseJson(obj[getData]);
        var result = {};
        var value = 'value';
        if (data.param) {
            for (var i = 0; i < data.param.length; i++) {
                var param = data.param[i];
                var key = Object.keys(param)[0];
                result[key] = param[key];
            }
        }
        result[value] = data;
        var pvtData = 'pvtData';
        var url = 'url';
        return {
            data: JSON.stringify(result),
            url: obj[url],
            pvtData: obj[pvtData],
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        };
    };
    return WebMethodAdaptor;
}(UrlAdaptor));

var RemoteSaveAdaptor = (function (_super) {
    __extends(RemoteSaveAdaptor, _super);
    function RemoteSaveAdaptor() {
        var _this = _super.call(this) || this;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["setValue"])('beforeSend', UrlAdaptor.prototype.beforeSend, _this);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["setValue"])('insert', UrlAdaptor.prototype.insert, _this);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["setValue"])('update', UrlAdaptor.prototype.update, _this);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["setValue"])('remove', UrlAdaptor.prototype.remove, _this);
        return _this;
    }
    RemoteSaveAdaptor.prototype.batchRequest = function (dm, changes, e) {
        var i;
        for (i = 0; i < changes.addedRecords.length; i++) {
            JsonAdaptor.prototype.insert(dm, changes.addedRecords[i]);
        }
        for (i = 0; i < changes.changedRecords.length; i++) {
            JsonAdaptor.prototype.update(dm, e.key, changes.changedRecords[i]);
        }
        for (i = 0; i < changes.deletedRecords.length; i++) {
            JsonAdaptor.prototype.remove(dm, e.key, changes.deletedRecords[i]);
        }
        return {
            type: 'POST',
            url: dm.dataSource.batchUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                changed: changes.changedRecords,
                added: changes.addedRecords,
                deleted: changes.deletedRecords,
                action: 'batch',
                table: e.url,
                key: e.key
            })
        };
    };
    return RemoteSaveAdaptor;
}(JsonAdaptor));

var CacheAdaptor = (function (_super) {
    __extends(CacheAdaptor, _super);
    function CacheAdaptor(adaptor, timeStamp, pageSize) {
        var _this = _super.call(this) || this;
        _this.isCrudAction = false;
        _this.isInsertAction = false;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(adaptor)) {
            _this.cacheAdaptor = adaptor;
        }
        _this.pageSize = pageSize;
        _this.guidId = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].getGuid('cacheAdaptor');
        var obj = { keys: [], results: [] };
        window.localStorage.setItem(_this.guidId, JSON.stringify(obj));
        var guid = _this.guidId;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base_util__["isNullOrUndefined"])(timeStamp)) {
            setInterval(function () {
                var data;
                data = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].parse.parseJson(window.localStorage.getItem(guid));
                var forDel = [];
                for (var i = 0; i < data.results.length; i++) {
                    var currentTime = +new Date();
                    var requestTime = +new Date(data.results[i].timeStamp);
                    data.results[i].timeStamp = currentTime - requestTime;
                    if (currentTime - requestTime > timeStamp) {
                        forDel.push(i);
                    }
                }
                for (var i = 0; i < forDel.length; i++) {
                    data.results.splice(forDel[i], 1);
                    data.keys.splice(forDel[i], 1);
                }
                window.localStorage.removeItem(guid);
                window.localStorage.setItem(guid, JSON.stringify(data));
            }, timeStamp);
        }
        return _this;
    }
    CacheAdaptor.prototype.generateKey = function (url, query) {
        var queries = this.getQueryRequest(query);
        var singles = __WEBPACK_IMPORTED_MODULE_2__query__["a" /* Query */].filterQueryLists(query.queries, ['onSelect', 'onPage', 'onSkip', 'onTake', 'onRange']);
        var key = url;
        var page = 'onPage';
        if (page in singles) {
            key += singles[page].pageIndex;
        }
        queries.sorts.forEach(function (obj) {
            key += obj.e.direction + obj.e.fieldName;
        });
        queries.groups.forEach(function (obj) {
            key += obj.e.fieldName;
        });
        queries.searches.forEach(function (obj) {
            key += obj.e.searchKey;
        });
        for (var filter = 0; filter < queries.filters.length; filter++) {
            var currentFilter = queries.filters[filter];
            if (currentFilter.e.isComplex) {
                var newQuery = query.clone();
                newQuery.queries = [];
                for (var i = 0; i < currentFilter.e.predicates.length; i++) {
                    newQuery.queries.push({ fn: 'onWhere', e: currentFilter.e.predicates[i], filter: query.queries.filter });
                }
                key += currentFilter.e.condition + this.generateKey(url, newQuery);
            }
            else {
                key += currentFilter.e.field + currentFilter.e.operator + currentFilter.e.value;
            }
        }
        return key;
    };
    CacheAdaptor.prototype.processQuery = function (dm, query, hierarchyFilters) {
        var key = this.generateKey(dm.dataSource.url, query);
        var cachedItems;
        cachedItems = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].parse.parseJson(window.localStorage.getItem(this.guidId));
        var data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
        if (data != null && !this.isCrudAction && !this.isInsertAction) {
            return data;
        }
        this.isCrudAction = null;
        this.isInsertAction = null;
        return this.cacheAdaptor.processQuery.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
    };
    CacheAdaptor.prototype.processResponse = function (data, ds, query, xhr, request, changes) {
        if (this.isInsertAction || (request && this.cacheAdaptor.options.batch &&
            __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === 'post')) {
            return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
        }
        data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
        var key = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
        var obj = {};
        obj = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].parse.parseJson(window.localStorage.getItem(this.guidId));
        var index = obj.keys.indexOf(key);
        if (index !== -1) {
            obj.results.splice(index, 1);
            obj.keys.splice(index, 1);
        }
        obj.results[obj.keys.push(key) - 1] = { keys: key, result: data.result, timeStamp: new Date(), count: data.count };
        while (obj.results.length > this.pageSize) {
            obj.results.splice(0, 1);
            obj.keys.splice(0, 1);
        }
        window.localStorage.setItem(this.guidId, JSON.stringify(obj));
        return data;
    };
    CacheAdaptor.prototype.beforeSend = function (dm, request, settings) {
        if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* DataUtil */].endsWith(settings.url, this.cacheAdaptor.options.batch) && settings.type.toLowerCase() === 'post') {
            request.setRequestHeader('Accept', this.cacheAdaptor.options.multipartAccept);
        }
        if (!dm.dataSource.crossDomain) {
            request.setRequestHeader('Accept', this.cacheAdaptor.options.accept);
        }
    };
    CacheAdaptor.prototype.update = function (dm, keyField, value, tableName) {
        this.isCrudAction = true;
        return this.cacheAdaptor.update(dm, keyField, value, tableName);
    };
    CacheAdaptor.prototype.insert = function (dm, data, tableName) {
        this.isInsertAction = true;
        return this.cacheAdaptor.insert(dm, data, tableName);
    };
    CacheAdaptor.prototype.remove = function (dm, keyField, value, tableName) {
        this.isCrudAction = true;
        return this.cacheAdaptor.remove(dm, keyField, value, tableName);
    };
    CacheAdaptor.prototype.batchRequest = function (dm, changes, e) {
        return this.cacheAdaptor.batchRequest(dm, changes, e);
    };
    return CacheAdaptor;
}(UrlAdaptor));



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Deferred; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__syncfusion_ej2_base_util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__syncfusion_ej2_base_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__syncfusion_ej2_base_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__query__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__adaptors__ = __webpack_require__(31);





var DataManager = (function () {
    function DataManager(dataSource, query, adaptor) {
        var _this = this;
        this.dateParse = true;
        this.requests = [];
        if (!dataSource && !this.dataSource) {
            dataSource = [];
        }
        adaptor = adaptor || dataSource.adaptor;
        var data;
        if (dataSource instanceof Array) {
            data = {
                json: dataSource,
                offline: true
            };
        }
        else if (typeof dataSource === 'object') {
            if (!dataSource.json) {
                dataSource.json = [];
            }
            data = {
                url: dataSource.url,
                insertUrl: dataSource.insertUrl,
                removeUrl: dataSource.removeUrl,
                updateUrl: dataSource.updateUrl,
                crudUrl: dataSource.crudUrl,
                batchUrl: dataSource.batchUrl,
                json: dataSource.json,
                headers: dataSource.headers,
                accept: dataSource.accept,
                data: dataSource.data,
                timeTillExpiration: dataSource.timeTillExpiration,
                cachingPageSize: dataSource.cachingPageSize,
                enableCaching: dataSource.enableCaching,
                requestType: dataSource.requestType,
                key: dataSource.key,
                crossDomain: dataSource.crossDomain,
                jsonp: dataSource.jsonp,
                dataType: dataSource.dataType,
                offline: dataSource.offline !== undefined ? dataSource.offline
                    : dataSource.adaptor instanceof __WEBPACK_IMPORTED_MODULE_4__adaptors__["h" /* RemoteSaveAdaptor */] ? false : dataSource.url ? false : true,
                requiresFormat: dataSource.requiresFormat
            };
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].throwError('DataManager: Invalid arguments');
        }
        if (data.requiresFormat === undefined && !__WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].isCors()) {
            data.requiresFormat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__syncfusion_ej2_base_util__["isNullOrUndefined"])(data.crossDomain) ? true : data.crossDomain;
        }
        if (data.dataType === undefined) {
            data.dataType = 'json';
        }
        this.dataSource = data;
        this.defaultQuery = query;
        if (data.url && data.offline && !data.json.length) {
            this.isDataAvailable = false;
            this.adaptor = adaptor || new __WEBPACK_IMPORTED_MODULE_4__adaptors__["d" /* ODataAdaptor */]();
            this.dataSource.offline = false;
            this.ready = this.executeQuery(query || new __WEBPACK_IMPORTED_MODULE_3__query__["a" /* Query */]());
            this.ready.then(function (e) {
                _this.dataSource.offline = true;
                _this.isDataAvailable = true;
                data.json = e.result;
                _this.adaptor = new __WEBPACK_IMPORTED_MODULE_4__adaptors__["b" /* JsonAdaptor */]();
            });
        }
        else {
            this.adaptor = data.offline ? new __WEBPACK_IMPORTED_MODULE_4__adaptors__["b" /* JsonAdaptor */]() : new __WEBPACK_IMPORTED_MODULE_4__adaptors__["d" /* ODataAdaptor */]();
        }
        if (!data.jsonp && this.adaptor instanceof __WEBPACK_IMPORTED_MODULE_4__adaptors__["d" /* ODataAdaptor */]) {
            data.jsonp = 'callback';
        }
        this.adaptor = adaptor || this.adaptor;
        if (data.enableCaching) {
            this.adaptor = new __WEBPACK_IMPORTED_MODULE_4__adaptors__["i" /* CacheAdaptor */](this.adaptor, data.timeTillExpiration, data.cachingPageSize);
        }
        return this;
    }
    DataManager.prototype.setDefaultQuery = function (query) {
        this.defaultQuery = query;
        return this;
    };
    DataManager.prototype.executeLocal = function (query) {
        if (!this.defaultQuery && !(query instanceof __WEBPACK_IMPORTED_MODULE_3__query__["a" /* Query */])) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].throwError('DataManager - executeLocal() : A query is required to execute');
        }
        if (!this.dataSource.json) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].throwError('DataManager - executeLocal() : Json data is required to execute');
        }
        query = query || this.defaultQuery;
        var result = this.adaptor.processQuery(this, query);
        if (query.subQuery) {
            var from = query.subQuery.fromTable;
            var lookup = query.subQuery.lookups;
            var res = query.requiresCounts ? result.result :
                result;
            if (lookup && lookup instanceof Array) {
                __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].buildHierarchy(query.subQuery.fKey, from, res, lookup, query.subQuery.key);
            }
            for (var j = 0; j < res.length; j++) {
                if (res[j][from] instanceof Array) {
                    res[j] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__syncfusion_ej2_base_util__["extend"])({}, {}, res[j]);
                    res[j][from] = this.adaptor.processResponse(query.subQuery.using(new DataManager(res[j][from].slice(0))).executeLocal(), this, query);
                }
            }
        }
        return this.adaptor.processResponse(result, this, query);
    };
    DataManager.prototype.executeQuery = function (query, done, fail, always) {
        var _this = this;
        if (typeof query === 'function') {
            always = fail;
            fail = done;
            done = query;
            query = null;
        }
        if (!query) {
            query = this.defaultQuery;
        }
        if (!(query instanceof __WEBPACK_IMPORTED_MODULE_3__query__["a" /* Query */])) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].throwError('DataManager - executeQuery() : A query is required to execute');
        }
        var deffered = new Deferred();
        var args = { query: query };
        if (!this.dataSource.offline && this.dataSource.url !== undefined) {
            var result = this.adaptor.processQuery(this, query);
            this.makeRequest(result, deffered, args, query);
        }
        else {
            DataManager.nextTick(function () {
                var res = _this.executeLocal(query);
                args = DataManager.getDeferedArgs(query, res, args);
                deffered.resolve(args);
            });
        }
        return deffered.promise;
    };
    DataManager.getDeferedArgs = function (query, result, args) {
        if (query.requiresCounts) {
            args.result = result.result;
            args.count = result.count;
        }
        else {
            args.result = result;
        }
        return args;
    };
    DataManager.nextTick = function (fn) {
        (window.setImmediate || window.setTimeout)(fn, 0);
    };
    DataManager.prototype.extendRequest = function (url, fnSuccess, fnFail) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__syncfusion_ej2_base_util__["extend"])({}, {
            type: 'GET',
            dataType: this.dataSource.dataType,
            crossDomain: this.dataSource.crossDomain,
            jsonp: this.dataSource.jsonp,
            cache: true,
            processData: false,
            onSuccess: fnSuccess,
            onFailure: fnFail
        }, url);
    };
    DataManager.prototype.makeRequest = function (url, deffered, args, query) {
        var _this = this;
        var isSelector = !!query.subQuerySelector;
        var fnFail = function (e) {
            args.error = e;
            deffered.reject(args);
        };
        var process = function (data, count, xhr, request, actual, aggregates, virtualSelectRecords) {
            args.xhr = xhr;
            args.count = count ? parseInt(count.toString(), 10) : 0;
            args.result = data;
            args.request = request;
            args.aggregates = aggregates;
            args.actual = actual;
            args.virtualSelectRecords = virtualSelectRecords;
            deffered.resolve(args);
        };
        var fnQueryChild = function (data, selector) {
            var subDeffer = new Deferred();
            var childArgs = { parent: args };
            query.subQuery.isChild = true;
            var subUrl = _this.adaptor.processQuery(_this, query.subQuery, data ? _this.adaptor.processResponse(data) : selector);
            var childReq = _this.makeRequest(subUrl, subDeffer, childArgs, query.subQuery);
            if (!isSelector) {
                subDeffer.then(function (subData) {
                    if (data) {
                        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, data, subData, query.subQuery.key);
                        process(data, subData.count, subData.xhr);
                    }
                }, fnFail);
            }
            return childReq;
        };
        var fnSuccess = function (data, request) {
            if (request.httpRequest.getResponseHeader('Content-Type').indexOf('xml') === -1 && _this.dateParse) {
                data = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].parse.parseJson(data);
            }
            var result = _this.adaptor.processResponse(data, _this, query, request.httpRequest, request);
            var count = 0;
            var aggregates = null;
            var virtualSelectRecords = 'virtualSelectRecords';
            var virtualRecords = data[virtualSelectRecords];
            if (query.requiresCounts) {
                count = result.count;
                aggregates = result.aggregates;
                result = result.result;
            }
            if (!query.subQuery) {
                process(result, count, request.httpRequest, request.type, data, aggregates, virtualRecords);
                return;
            }
            if (!isSelector) {
                fnQueryChild(result, request);
            }
        };
        var req = this.extendRequest(url, fnSuccess, fnFail);
        var ajax = new __WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base__["Ajax"](req);
        ajax.beforeSend = function () {
            _this.beforeSend(ajax.httpRequest, ajax);
        };
        req = ajax.send();
        this.requests.push(ajax);
        if (isSelector) {
            var promise = void 0;
            var res = query.subQuerySelector.call(this, { query: query.subQuery, parent: query });
            if (res && res.length) {
                promise = Promise.all([req, fnQueryChild(null, res)]);
                promise.then(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var result = args[0];
                    var pResult = _this.adaptor.processResponse(result[0], _this, query, _this.requests[0].httpRequest, _this.requests[0]);
                    var count = 0;
                    if (query.requiresCounts) {
                        count = pResult.count;
                        pResult = pResult.result;
                    }
                    var cResult = _this.adaptor.processResponse(result[1], _this, query.subQuery, _this.requests[1].httpRequest, _this.requests[1]);
                    count = 0;
                    if (query.subQuery.requiresCounts) {
                        count = cResult.count;
                        cResult = cResult.result;
                    }
                    __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, pResult, cResult, query.subQuery.key);
                    isSelector = false;
                    process(pResult, count, _this.requests[0].httpRequest);
                });
            }
            else {
                isSelector = false;
            }
        }
        return req;
    };
    DataManager.prototype.beforeSend = function (request, settings) {
        this.adaptor.beforeSend(this, request, settings);
        var headers = this.dataSource.headers;
        var props;
        for (var i = 0; headers && i < headers.length; i++) {
            props = [];
            var keys = Object.keys(headers[i]);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var prop = keys_1[_i];
                props.push(prop);
                request.setRequestHeader(prop, headers[i][prop]);
            }
        }
    };
    DataManager.prototype.saveChanges = function (changes, key, tableName, query) {
        var _this = this;
        if (tableName instanceof __WEBPACK_IMPORTED_MODULE_3__query__["a" /* Query */]) {
            query = tableName;
            tableName = null;
        }
        var args = {
            url: tableName,
            key: key || this.dataSource.key
        };
        var req = this.adaptor.batchRequest(this, changes, args, query);
        if (this.dataSource.offline) {
            return req;
        }
        var deff = new Deferred();
        var ajax = new __WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base__["Ajax"](req);
        ajax.beforeSend = function () {
            _this.beforeSend(ajax.httpRequest, ajax);
        };
        ajax.onSuccess = function (data, request) {
            deff.resolve(_this, [_this.adaptor.processResponse(data, _this, null, request.httpRequest, request, changes)]);
        };
        ajax.onFailure = function (e) {
            deff.reject([{ error: e }]);
        };
        ajax.send();
        return deff.promise;
    };
    DataManager.prototype.insert = function (data, tableName, query) {
        data = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].parse.replacer(data);
        if (tableName instanceof __WEBPACK_IMPORTED_MODULE_3__query__["a" /* Query */]) {
            query = tableName;
            tableName = null;
        }
        var req = this.adaptor.insert(this, data, tableName, query);
        if (this.dataSource.offline) {
            return req;
        }
        return this.doAjaxRequest(req);
    };
    DataManager.prototype.remove = function (keyField, value, tableName, query) {
        if (typeof value === 'object') {
            value = value[keyField];
        }
        if (tableName instanceof __WEBPACK_IMPORTED_MODULE_3__query__["a" /* Query */]) {
            query = tableName;
            tableName = null;
        }
        var res = this.adaptor.remove(this, keyField, value, tableName, query);
        if (this.dataSource.offline) {
            return res;
        }
        return this.doAjaxRequest(res);
    };
    DataManager.prototype.update = function (keyField, value, tableName, query) {
        value = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].parse.replacer(value);
        if (tableName instanceof __WEBPACK_IMPORTED_MODULE_3__query__["a" /* Query */]) {
            query = tableName;
            tableName = null;
        }
        var res = this.adaptor.update(this, keyField, value, tableName, query);
        if (this.dataSource.offline) {
            return res;
        }
        return this.doAjaxRequest(res);
    };
    DataManager.prototype.doAjaxRequest = function (res) {
        var _this = this;
        var defer = new Deferred();
        res = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__syncfusion_ej2_base_util__["extend"])({}, {
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            processData: false
        }, res);
        var ajax = new __WEBPACK_IMPORTED_MODULE_0__syncfusion_ej2_base__["Ajax"](res);
        ajax.beforeSend = function () {
            _this.beforeSend(ajax.httpRequest, ajax);
        };
        ajax.onSuccess = function (record, request) {
            try {
                __WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].parse.parseJson(record);
            }
            catch (e) {
                record = [];
            }
            record = _this.adaptor.processResponse(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* DataUtil */].parse.parseJson(record), _this, null, request.httpRequest, request);
            defer.resolve(_this, [{ record: record, dataManager: _this }]);
        };
        ajax.onFailure = function (e) {
            defer.reject([{ error: e }]);
        };
        ajax.send();
        return defer.promise;
    };
    return DataManager;
}());

var Deferred = (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        this.then = this.promise.then.bind(this.promise);
        this.catch = this.promise.catch.bind(this.promise);
    }
    return Deferred;
}());



/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(8), __webpack_require__(22), __webpack_require__(16), __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, axis_1, double_axis_1, double_range_1, helper_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Category = (function (_super) {
        __extends(Category, _super);
        function Category(chart) {
            return _super.call(this, chart) || this;
        }
        Category.prototype.calculateRangeAndInterval = function (size, axis) {
            this.calculateRange(axis, size);
            this.getActualRange(axis, size);
            this.applyRangePadding(axis, size);
            this.calculateVisibleLabels(axis);
        };
        Category.prototype.getActualRange = function (axis, size) {
            axis.doubleRange = new double_range_1.DoubleRange(this.min, this.max);
            axis.actualRange = {};
            if (!axis.interval) {
                axis.actualRange.interval = Math.max(1, Math.floor(axis.doubleRange.delta / axis.getActualDesiredIntervalsCount(size)));
            }
            else {
                axis.actualRange.interval = Math.ceil(axis.interval);
            }
            axis.actualRange.min = axis.doubleRange.start;
            axis.actualRange.max = axis.doubleRange.end;
            axis.actualRange.delta = axis.doubleRange.delta;
        };
        Category.prototype.applyRangePadding = function (axis, size) {
            var ticks = (axis.labelPlacement === 'BetweenTicks') ? 0.5 : 0;
            if (ticks > 0) {
                axis.actualRange.min -= ticks;
                axis.actualRange.max += ticks;
            }
            else {
                axis.actualRange.max += axis.actualRange.max ? 0 : 0.5;
            }
            axis.doubleRange = new double_range_1.DoubleRange(axis.actualRange.min, axis.actualRange.max);
            axis.actualRange.delta = axis.doubleRange.delta;
            this.calculateVisibleRange(size, axis);
        };
        Category.prototype.calculateVisibleLabels = function (axis) {
            axis.visibleLabels = [];
            var tempInterval;
            tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
            var position;
            var format = this.getLabelFormat();
            axis.startLabel = axis.labels[Math.round(axis.visibleRange.min)];
            axis.endLabel = axis.labels[Math.floor(axis.visibleRange.max)];
            var argsData;
            for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
                if (helper_1.withIn(tempInterval, axis.visibleRange) && axis.labels.length > 0) {
                    position = Math.round(tempInterval);
                    argsData = {
                        cancel: false, name: constants_1.axisLabelRender, axis: axis, value: position,
                        text: axis.labels[position] ? axis.labels[position] : position.toString()
                    };
                    this.chart.trigger(constants_1.axisLabelRender, argsData);
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new axis_1.VisibleLabels(argsData.text, argsData.value));
                    }
                }
            }
            axis.getMaxLabelWidth(this.chart);
        };
        Category.prototype.getLabelFormat = function () {
            return '';
        };
        Category.prototype.getModuleName = function () {
            return 'Category';
        };
        Category.prototype.destroy = function (chart) {
        };
        return Category;
    }(double_axis_1.Double));
    exports.Category = Category;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(8), __webpack_require__(22), __webpack_require__(16), __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, axis_1, double_axis_1, double_range_1, helper_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateTime = (function (_super) {
        __extends(DateTime, _super);
        function DateTime(chart) {
            return _super.call(this, chart) || this;
        }
        DateTime.prototype.calculateRangeAndInterval = function (size, axis) {
            this.calculateRange(axis, size);
            this.getActualRange(axis, size);
            this.applyRangePadding(axis, size);
            this.calculateVisibleLabels(axis);
        };
        DateTime.prototype.getActualRange = function (axis, size) {
            var option = {
                skeleton: 'full',
                type: 'dateTime'
            };
            var dateParser = this.chart.intl.getDateParser(option);
            var dateFormatter = this.chart.intl.getDateFormat(option);
            if ((axis.minimum) !== null) {
                this.min = Date.parse(dateParser(dateFormatter(axis.minimum)));
            }
            else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
                this.min = Date.parse(dateParser(dateFormatter(new Date(1970, 1, 1))));
            }
            if ((axis.maximum) !== null) {
                this.max = Date.parse(dateParser(dateFormatter(axis.maximum)));
            }
            else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
                this.max = Date.parse(dateParser(dateFormatter(new Date(1970, 5, 1))));
            }
            if (this.min === this.max) {
                this.max = this.max + 2592000000;
                this.min = this.min - 2592000000;
            }
            axis.actualRange = {};
            axis.doubleRange = new double_range_1.DoubleRange(this.min, this.max);
            var datetimeInterval = this.calculateDateTimeNiceInterval(axis, size, axis.doubleRange.start, axis.doubleRange.end);
            if (!axis.interval) {
                axis.actualRange.interval = datetimeInterval;
            }
            else {
                axis.actualRange.interval = axis.interval;
            }
            axis.actualRange.min = axis.doubleRange.start;
            axis.actualRange.max = axis.doubleRange.end;
        };
        DateTime.prototype.applyRangePadding = function (axis, size) {
            this.start = (axis.actualRange.min);
            this.end = (axis.actualRange.max);
            var minimum;
            var maximum;
            var interval = axis.actualRange.interval;
            if (!axis.setRange()) {
                var rangePadding = axis.rangePadding === 'Auto' ?
                    (axis.orientation === 'Vertical' && !this.chart.requireInvertedAxis) ? 'Normal' :
                        (axis.orientation === 'Horizontal' && this.chart.requireInvertedAxis) ? 'Normal' :
                            'None' : axis.rangePadding;
                minimum = new Date(this.start);
                maximum = new Date(this.end);
                var intervalType = axis.actualIntervalType;
                if (rangePadding === 'None') {
                    this.start = minimum.getTime();
                    this.end = maximum.getTime();
                }
                else if (rangePadding === 'Additional' || rangePadding === 'Round') {
                    switch (intervalType) {
                        case 'Years':
                            this.getYear(minimum, maximum, rangePadding, interval);
                            break;
                        case 'Months':
                            this.getMonth(minimum, maximum, rangePadding, interval);
                            break;
                        case 'Days':
                            this.getDay(minimum, maximum, rangePadding, interval);
                            break;
                        case 'Hours':
                            this.getHour(minimum, maximum, rangePadding, interval);
                            break;
                        case 'Minutes':
                            var minute = (minimum.getMinutes() / interval) * interval;
                            var endMinute = maximum.getMinutes() + (minimum.getMinutes() - minute);
                            if (rangePadding === 'Round') {
                                this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minute, 0)).getTime();
                                this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), endMinute, 59)).getTime();
                            }
                            else {
                                this.start = (new Date(minimum.getFullYear(), maximum.getMonth(), minimum.getDate(), minimum.getHours(), minute + (-interval), 0)).getTime();
                                this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), endMinute + (interval), 0)).getTime();
                            }
                            break;
                        case 'Seconds':
                            var second = (minimum.getSeconds() / interval) * interval;
                            var endSecond = maximum.getSeconds() + (minimum.getSeconds() - second);
                            if (rangePadding === 'Round') {
                                this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minimum.getMinutes(), second, 0)).getTime();
                                this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), maximum.getMinutes(), endSecond, 0)).getTime();
                            }
                            else {
                                this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minimum.getMinutes(), second + (-interval), 0)).getTime();
                                this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), maximum.getMinutes(), endSecond + (interval), 0)).getTime();
                            }
                            break;
                    }
                }
            }
            axis.actualRange.min = this.start;
            axis.actualRange.max = this.end;
            axis.actualRange.delta = (axis.actualRange.max - axis.actualRange.min);
            axis.doubleRange = new double_range_1.DoubleRange(axis.actualRange.min, axis.actualRange.max);
            this.calculateVisibleRange(size, axis);
        };
        DateTime.prototype.getYear = function (minimum, maximum, rangePadding, interval) {
            var startYear = minimum.getFullYear();
            var endYear = maximum.getFullYear();
            if (rangePadding === 'Additional') {
                this.start = (new Date(startYear - interval, 1, 1, 0, 0, 0)).getTime();
                this.end = (new Date(endYear + interval, 1, 1, 0, 0, 0)).getTime();
            }
            else {
                this.start = new Date(startYear, 0, 0, 0, 0, 0).getTime();
                this.end = new Date(endYear, 11, 30, 23, 59, 59).getTime();
            }
        };
        DateTime.prototype.getMonth = function (minimum, maximum, rangePadding, interval) {
            var month = minimum.getMonth();
            var endMonth = maximum.getMonth();
            if (rangePadding === 'Round') {
                this.start = (new Date(minimum.getFullYear(), month, 0, 0, 0, 0)).getTime();
                this.end = (new Date(maximum.getFullYear(), endMonth, new Date(maximum.getFullYear(), maximum.getMonth(), 0).getDate(), 23, 59, 59)).getTime();
            }
            else {
                this.start = (new Date(minimum.getFullYear(), month + (-interval), 1, 0, 0, 0)).getTime();
                this.end = (new Date(maximum.getFullYear(), endMonth + (interval), endMonth === 2 ? 28 : 30, 0, 0, 0)).getTime();
            }
        };
        DateTime.prototype.getDay = function (minimum, maximum, rangePadding, interval) {
            var day = minimum.getDate();
            var endDay = maximum.getDate();
            if (rangePadding === 'Round') {
                this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), day, 0, 0, 0)).getTime();
                this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), endDay, 23, 59, 59)).getTime();
            }
            else {
                this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), day + (-interval), 0, 0, 0)).getTime();
                this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), endDay + (interval), 0, 0, 0)).getTime();
            }
        };
        DateTime.prototype.getHour = function (minimum, maximum, rangePadding, interval) {
            var hour = (minimum.getHours() / interval) * interval;
            var endHour = maximum.getHours() + (minimum.getHours() - hour);
            if (rangePadding === 'Round') {
                this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), hour, 0, 0)).getTime();
                this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), endHour, 59, 59)).getTime();
            }
            else {
                this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), hour + (-interval), 0, 0)).getTime();
                this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), endHour + (interval), 0, 0)).getTime();
            }
        };
        DateTime.prototype.calculateVisibleRange = function (size, axis) {
            axis.visibleRange = axis.actualRange;
            if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
                axis.calculateVisibleRange(size);
                axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                    this.calculateDateTimeNiceInterval(axis, size, axis.visibleRange.min, axis.visibleRange.max)
                    : axis.visibleRange.interval;
            }
            axis.dateTimeInterval = this.increaseDateTimeInterval(axis, axis.visibleRange.min, axis.visibleRange.interval).getTime()
                - axis.visibleRange.min;
        };
        DateTime.prototype.calculateVisibleLabels = function (axis) {
            var tempInterval;
            var label;
            var format = axis.labelFormat ? axis.labelFormat : this.getLabelFormat(axis);
            tempInterval = axis.visibleRange.min;
            axis.visibleLabels = [];
            var argsData;
            if (!axis.setRange()) {
                tempInterval = this.alignRangeStart(axis, tempInterval, axis.visibleRange.interval, axis.actualIntervalType).getTime();
            }
            axis.format = this.chart.intl.getDateFormat({ skeleton: format, type: 'dateTime' });
            axis.startLabel = axis.format(new Date(axis.visibleRange.min));
            axis.endLabel = axis.format(new Date(axis.visibleRange.max));
            while (tempInterval <= axis.visibleRange.max) {
                if (helper_1.withIn(tempInterval, axis.visibleRange)) {
                    argsData = {
                        cancel: false, name: constants_1.axisLabelRender, axis: axis, text: axis.format(new Date(tempInterval)), value: tempInterval
                    };
                    this.chart.trigger(constants_1.axisLabelRender, argsData);
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new axis_1.VisibleLabels(argsData.text, argsData.value));
                    }
                }
                tempInterval = this.increaseDateTimeInterval(axis, tempInterval, axis.visibleRange.interval).getTime();
            }
            axis.getMaxLabelWidth(this.chart);
        };
        DateTime.prototype.increaseDateTimeInterval = function (axis, value, interval) {
            var result = new Date(value);
            interval = Math.ceil(interval);
            switch (axis.actualIntervalType) {
                case 'Years':
                    result.setFullYear(result.getFullYear() + interval);
                    return result;
                case 'Months':
                    result.setMonth(result.getMonth() + interval);
                    return result;
                case 'Days':
                    result.setDate(result.getDate() + interval);
                    return result;
                case 'Hours':
                    result.setHours(result.getHours() + interval);
                    return result;
                case 'Minutes':
                    result.setMinutes(result.getMinutes() + interval);
                    return result;
                case 'Seconds':
                    result.setSeconds(result.getSeconds() + interval);
                    return result;
            }
            return result;
        };
        DateTime.prototype.alignRangeStart = function (axis, sDate, intervalSize, intervalType) {
            var sResult = new Date(sDate);
            switch (axis.actualIntervalType) {
                case 'Years':
                    var year = Math.floor(Math.floor(sResult.getFullYear() / intervalSize) * intervalSize);
                    sResult = new Date(year, sResult.getMonth(), sResult.getDate(), 0, 0, 0);
                    return sResult;
                case 'Months':
                    var month = Math.floor(Math.floor((sResult.getMonth()) / intervalSize) * intervalSize);
                    sResult = new Date(sResult.getFullYear(), month, sResult.getDate(), 0, 0, 0);
                    return sResult;
                case 'Days':
                    var day = Math.floor(Math.floor((sResult.getDate()) / intervalSize) * intervalSize);
                    sResult = new Date(sResult.getFullYear(), sResult.getMonth(), day, 0, 0, 0);
                    return sResult;
                case 'Hours':
                    var hour = Math.floor(Math.floor((sResult.getHours()) / intervalSize) * intervalSize);
                    sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), hour, 0, 0);
                    return sResult;
                case 'Minutes':
                    var minutes = Math.floor(Math.floor((sResult.getMinutes()) / intervalSize) * intervalSize);
                    sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), sResult.getHours(), minutes, 0, 0);
                    return sResult;
                case 'Seconds':
                    var seconds = Math.floor(Math.floor((sResult.getSeconds()) / intervalSize) * intervalSize);
                    sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), sResult.getHours(), sResult.getMinutes(), seconds, 0);
                    return sResult;
            }
            return sResult;
        };
        DateTime.prototype.getLabelFormat = function (axis) {
            var format;
            if (axis.actualIntervalType === 'Years') {
                format = 'yMMM';
            }
            else if (axis.actualIntervalType === 'Months') {
                format = 'MMMEd';
            }
            else if (axis.actualIntervalType === 'Days') {
                format = 'Ed';
            }
            else if (axis.actualIntervalType === 'Hours') {
                format = 'EHm';
            }
            else if (axis.actualIntervalType === 'Minutes' || axis.actualIntervalType === 'Seconds') {
                format = 'Hms';
            }
            else {
                format = 'Hms';
            }
            return format;
        };
        DateTime.prototype.calculateDateTimeNiceInterval = function (axis, size, start, end) {
            var oneDay = 24 * 60 * 60 * 1000;
            var startDate = new Date(start);
            var endDate = new Date(end);
            var totalDays = (Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));
            var interval;
            axis.actualIntervalType = axis.intervalType;
            switch (axis.intervalType) {
                case 'Years':
                    interval = this.calculateNumericNiceInterval(axis, totalDays / 365, size);
                    break;
                case 'Months':
                    interval = this.calculateNumericNiceInterval(axis, totalDays / 30, size);
                    break;
                case 'Days':
                    interval = this.calculateNumericNiceInterval(axis, totalDays, size);
                    break;
                case 'Hours':
                    interval = this.calculateNumericNiceInterval(axis, totalDays * 24, size);
                    break;
                case 'Minutes':
                    interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60, size);
                    break;
                case 'Seconds':
                    interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60 * 60, size);
                    break;
                case 'Auto':
                    interval = this.calculateNumericNiceInterval(axis, totalDays / 365, size);
                    if (interval >= 1) {
                        axis.actualIntervalType = 'Years';
                        return interval;
                    }
                    interval = this.calculateNumericNiceInterval(axis, totalDays / 30, size);
                    if (interval >= 1) {
                        axis.actualIntervalType = 'Months';
                        return interval;
                    }
                    interval = this.calculateNumericNiceInterval(axis, totalDays, size);
                    if (interval >= 1) {
                        axis.actualIntervalType = 'Days';
                        return interval;
                    }
                    interval = this.calculateNumericNiceInterval(axis, totalDays * 24, size);
                    if (interval >= 1) {
                        axis.actualIntervalType = 'Hours';
                        return interval;
                    }
                    interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60, size);
                    if (interval >= 1) {
                        axis.actualIntervalType = 'Minutes';
                        return interval;
                    }
                    interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60 * 60, size);
                    axis.actualIntervalType = 'Seconds';
                    return interval;
            }
            return interval;
        };
        DateTime.prototype.getModuleName = function () {
            return 'DateTime';
        };
        DateTime.prototype.destroy = function (chart) {
        };
        return DateTime;
    }(double_axis_1.Double));
    exports.DateTime = DateTime;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(8), __webpack_require__(22), __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, axis_1, double_axis_1, helper_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Logarithmic = (function (_super) {
        __extends(Logarithmic, _super);
        function Logarithmic(chart) {
            return _super.call(this, chart) || this;
        }
        Logarithmic.prototype.calculateRangeAndInterval = function (size, axis) {
            this.calculateRange(axis, size);
            this.getActualRange(axis, size);
            this.calculateVisibleRange(size, axis);
            this.calculateVisibleLabels(axis);
        };
        Logarithmic.prototype.getActualRange = function (axis, size) {
            this.initializeDoubleRange(axis);
            var logStart = helper_1.logBase(this.min, axis.logBase);
            logStart = isFinite(logStart) ? logStart : this.min;
            var logEnd = helper_1.logBase(this.max, axis.logBase);
            logEnd = isFinite(logStart) ? logEnd : this.max;
            this.min = Math.floor(logStart / 1);
            this.max = Math.ceil(logEnd / 1);
            axis.actualRange.interval = axis.interval || this.calculateLogNiceInterval(this.max - this.min, size, axis);
            axis.actualRange.min = this.min;
            axis.actualRange.max = this.max;
            axis.actualRange.delta = this.max - this.min;
        };
        Logarithmic.prototype.calculateVisibleRange = function (size, axis) {
            axis.visibleRange = axis.actualRange;
            if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
                axis.calculateVisibleRange(size);
                axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                    this.calculateLogNiceInterval(axis.doubleRange.delta, size, axis)
                    : axis.visibleRange.interval;
                axis.visibleRange.interval = Math.floor(axis.visibleRange.interval) === 0 ? 1 : Math.floor(axis.visibleRange.interval);
            }
        };
        Logarithmic.prototype.calculateLogNiceInterval = function (delta, size, axis) {
            var actualDesiredIntervalsCount = axis.getActualDesiredIntervalsCount(size);
            var niceInterval = delta;
            var minInterval = Math.pow(10, Math.floor(helper_1.logBase(niceInterval, 10)));
            for (var j = 0, len = axis.intervalDivs.length; j < len; j++) {
                var currentInterval = minInterval * axis.intervalDivs[j];
                if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                    break;
                }
                niceInterval = currentInterval;
            }
            return niceInterval;
        };
        Logarithmic.prototype.calculateVisibleLabels = function (axis) {
            var tempInterval = axis.visibleRange.min;
            var tempIntervalText;
            var customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            var label;
            axis.format = this.chart.intl.getNumberFormat({ format: this.getLabelFormat(axis), useGrouping: this.chart.useGroupingSeparator });
            axis.visibleLabels = [];
            var argsData;
            if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
                tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
            }
            axis.startLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.min));
            axis.endLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.max));
            for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
                if (helper_1.withIn(tempInterval, axis.actualRange)) {
                    tempIntervalText = Math.pow(axis.logBase, tempInterval);
                    argsData = {
                        cancel: false, name: constants_1.axisLabelRender, axis: axis, value: tempInterval,
                        text: customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(tempIntervalText))
                            : axis.format(tempIntervalText)
                    };
                    this.chart.trigger(constants_1.axisLabelRender, argsData);
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new axis_1.VisibleLabels(argsData.text, argsData.value));
                    }
                }
            }
            axis.getMaxLabelWidth(this.chart);
        };
        Logarithmic.prototype.getModuleName = function () {
            return 'Logarithmic';
        };
        Logarithmic.prototype.destroy = function (chart) {
        };
        return Logarithmic;
    }(double_axis_1.Double));
    exports.Logarithmic = Logarithmic;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(10), __webpack_require__(5), __webpack_require__(2), __webpack_require__(2), __webpack_require__(0), __webpack_require__(0), __webpack_require__(11), __webpack_require__(13), __webpack_require__(8), __webpack_require__(74), __webpack_require__(0), __webpack_require__(27), __webpack_require__(76), __webpack_require__(26), __webpack_require__(28), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, dom_1, util_1, ej2_base_2, ej2_base_3, helper_1, helper_2, theme_1, base_1, axis_1, cartesian_panel_1, helper_3, chart_series_1, data_1, legend_1, selection_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Chart = (function (_super) {
        __extends(Chart, _super);
        function Chart(options, element) {
            return _super.call(this, options, element) || this;
        }
        Chart.prototype.preRender = function () {
            this.unWireEvents();
            this.initPrivateVariable();
            this.setCulture();
            this.setTheme();
            this.createSvg();
            this.wireEvents();
        };
        Chart.prototype.initPrivateVariable = function () {
            this.animateSeries = true;
            this.horizontalAxes = [];
            this.verticalAxes = [];
            this.renderer = new ej2_base_2.SvgRenderer(this.element.id);
            this.refreshAxis();
            this.refreshDefinition(this.rows);
            this.refreshDefinition(this.columns);
            this.storedPoints = [];
        };
        Chart.prototype.render = function () {
            this.trigger(constants_1.load, { chart: this });
            this.calculateAreaType();
            this.calculateVisibleSeries();
            this.calculateVisibleAxis();
            this.processData();
        };
        Chart.prototype.refreshBound = function () {
            if (this.legendModule && this.legendSettings.visible) {
                this.legendModule.getLegendOptions(this.visibleSeries);
            }
            var isCalculateStacking = false;
            var series;
            for (var i = 0, len = this.visibleSeries.length; i < len; i++) {
                series = this.visibleSeries[i];
                if ((series.type === 'StackingColumn' || series.type === 'StackingArea' ||
                    series.type === 'StackingBar') &&
                    !isCalculateStacking) {
                    series.calculateStackedValue();
                    isCalculateStacking = true;
                }
            }
            this.calculateBounds();
            this.renderElements();
        };
        Chart.prototype.renderElements = function () {
            this.dataLabelCollections = [];
            this.renderBorder();
            this.renderTitle();
            this.renderAreaBorder();
            this.seriesElements = this.renderer.createGroup({ id: this.element.id + 'SeriesCollection' });
            this.dataLabelElements = this.renderer.createGroup({ id: this.element.id + 'DataLabelCollection' });
            if (this.areaType === 'CartesianAxes' && this.rows.length > 0 && this.columns.length > 0) {
                this.chartAxisLayoutPanel.renderAxes();
                var tooltipDiv = document.createElement('div');
                tooltipDiv.id = this.element.id + '_Secondary_Element';
                tooltipDiv.setAttribute('style', 'position: relative');
                this.element.appendChild(tooltipDiv);
                if (this.tooltip.enable) {
                    this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction' }));
                }
                for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.visible) {
                        helper_1.findClipRect(item);
                        item.renderSeries(this, item.index);
                    }
                }
            }
            var clipRect = this.renderer.drawClipPath({
                'id': this.element.id + '_ChartAreaClipRect_',
                'x': this.chartAxisLayoutPanel.seriesClipRect.x,
                'y': this.chartAxisLayoutPanel.seriesClipRect.y,
                'width': this.chartAxisLayoutPanel.seriesClipRect.width,
                'height': this.chartAxisLayoutPanel.seriesClipRect.height,
                'fill': 'transparent',
                'stroke-width': 1,
                'stroke': 'Gray'
            });
            this.seriesElements.appendChild(clipRect);
            if (this.dataLabelElements.hasChildNodes()) {
                this.seriesElements.appendChild(this.dataLabelElements);
            }
            this.svgObject.appendChild(this.seriesElements);
            if (this.legendModule) {
                this.legendModule.renderLegend(this, this.legendSettings, this.legendModule.legendBounds);
            }
            if (!this.tooltip.enable) {
                this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction' }));
            }
            this.element.appendChild(this.svgObject);
            if (this.zoomModule && this.zoomModule.isZoomed) {
                this.zoomModule.applyZoomToolkit(this, this.axisCollections);
            }
            var selectedDataIndexes = [];
            if (this.selectionModule) {
                selectedDataIndexes = util_1.extend([], this.selectionModule.selectedDataIndexes, null, true);
                this.selectionModule.invokeSelection(this);
            }
            if (selectedDataIndexes.length > 0) {
                this.selectionModule.selectedDataIndexes = selectedDataIndexes;
                this.selectionModule.redrawSelection(this, this.selectionMode);
            }
            this.trigger('loaded', { chart: this });
        };
        Chart.prototype.processData = function () {
            var series;
            this.visibleSeriesCount = 0;
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series_1 = _a[_i];
                if (!series_1.visible) {
                    this.visibleSeriesCount++;
                    continue;
                }
                series_1.xData = [];
                series_1.yData = [];
                series_1.dataModule = new data_1.Data(this, series_1);
                series_1.points = [];
                series_1.refreshDataManager(this);
            }
            if (!this.visibleSeries.length || this.visibleSeriesCount === this.visibleSeries.length) {
                this.refreshBound();
            }
        };
        Chart.prototype.calculateBounds = function () {
            var padding = 5;
            var margin = this.margin;
            var titleHeight = 0;
            if (this.title) {
                titleHeight = helper_1.measureText(this.title, this.titleStyle).height + padding;
            }
            var top = margin.top + titleHeight + this.chartArea.border.width / 2;
            var left = margin.left;
            var width = this.availableSize.width - left - margin.right - this.border.width;
            var height = this.availableSize.height - top - this.border.width - margin.bottom;
            this.initialClipRect = new helper_3.Rect(left, top, width, height);
            if (this.legendModule) {
                this.legendModule.calculateLegendBounds(this.initialClipRect, this.areaType, this.availableSize);
            }
            this.chartAxisLayoutPanel.measureAxis(this.initialClipRect);
        };
        Chart.prototype.calculateAreaType = function () {
            var series = this.series[0];
            if (series) {
                this.requireInvertedAxis = (series.type === 'Bar' || series.type === 'StackingBar');
                this.areaType = this.seriesType(series.type);
            }
            if (this.areaType === 'CartesianAxes') {
                this.chartAxisLayoutPanel = new cartesian_panel_1.CartesianAxisLayoutPanel(this);
            }
        };
        Chart.prototype.seriesType = function (type) {
            if (type === 'Polar') {
                return 'PolarAxes';
            }
            if (type === 'Pie') {
                return 'None';
            }
            return 'CartesianAxes';
        };
        Chart.prototype.calculateVisibleAxis = function () {
            var axis;
            var series;
            var axes = [this.primaryXAxis, this.primaryYAxis];
            axes = axes.concat(this.axes);
            this.axisCollections = [];
            for (var i = 0, len = axes.length; i < len; i++) {
                axis = axes[i];
                axis.series = [];
                axis.labels = [];
                for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                    var series_2 = _a[_i];
                    if (series_2.xAxisName === axis.name || (series_2.xAxisName == null && axis.name === 'primaryXAxis')) {
                        axis.orientation = this.requireInvertedAxis ? 'Vertical' : 'Horizontal';
                        series_2.xAxis = axis;
                        axis.series.push(series_2);
                    }
                    else if (series_2.yAxisName === axis.name || (series_2.yAxisName == null && axis.name === 'primaryYAxis')) {
                        axis.orientation = this.requireInvertedAxis ? 'Horizontal' : 'Vertical';
                        series_2.yAxis = axis;
                        axis.series.push(series_2);
                    }
                }
                if (axis.orientation != null) {
                    this.axisCollections.push(axis);
                }
            }
            if (this.rows.length > 0 && this.columns.length > 0) {
                this.chartAxisLayoutPanel.measure();
            }
        };
        Chart.prototype.calculateVisibleSeries = function () {
            var series;
            this.visibleSeries = [];
            var colors = this.palettes.length ? this.palettes : theme_1.getSeriesColor(this.theme);
            var count = colors.length;
            for (var i = 0, len = this.series.length; i < len; i++) {
                series = this.series[i];
                series.index = i;
                if (this.areaType === 'PolarAxes' && this.seriesType(series.type) === 'PolarAxes') {
                    this.visibleSeries.push(series);
                }
                else if (this.areaType === 'None' && this.seriesType(series.type) === 'None') {
                    this.visibleSeries.push(series);
                }
                else if (this.areaType === 'CartesianAxes' && this.seriesType(series.type) === 'CartesianAxes') {
                    series.interior = series.fill ? series.fill : colors[i % count];
                    if (this.requireInvertedAxis && series.type !== 'Bar' && series.type !== 'StackingBar') {
                        continue;
                    }
                    if (!this.requireInvertedAxis && (series.type === 'Bar' || series.type === 'StackingBar')) {
                        continue;
                    }
                    this.visibleSeries.push(series);
                }
                this.series[i] = series;
            }
        };
        Chart.prototype.renderTitle = function () {
            if (this.title) {
                var areaBounds = this.chartAxisLayoutPanel.seriesClipRect;
                this.elementSize = helper_1.measureText(this.title, this.titleStyle);
                var options = new helper_1.TextOption(this.element.id + '_ChartTitle', this.availableSize.width / 2, this.margin.top + 3 * (this.elementSize.height / 4), 'middle', this.title);
                var element = helper_2.textElement(options, this.titleStyle, this.titleStyle.color, this.svgObject);
                element.setAttribute('aria-label', this.description || this.title);
                element.setAttribute('tabindex', this.tabIndex.toString());
            }
        };
        Chart.prototype.renderBorder = function () {
            var width = this.border.width;
            var rect = new helper_2.RectOption(this.element.id + '_ChartBorder', this.background, this.border, 1, new helper_3.Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.htmlObject = this.renderer.drawRectangle(rect);
            this.svgObject.appendChild(this.htmlObject);
        };
        Chart.prototype.renderAreaBorder = function () {
            if (this.areaType !== 'CartesianAxes') {
                return;
            }
            var rect = new helper_2.RectOption(this.element.id + '_ChartAreaBorder', this.chartArea.background, this.chartArea.border, this.chartArea.opacity, this.chartAxisLayoutPanel.seriesClipRect);
            this.htmlObject = this.renderer.drawRectangle(rect);
            this.svgObject.appendChild(this.htmlObject);
        };
        Chart.prototype.destroy = function () {
            this.unWireEvents();
            _super.prototype.destroy.call(this);
            this.element.classList.remove('e-chart');
        };
        Chart.prototype.getModuleName = function () {
            return 'chart';
        };
        Chart.prototype.getPersistData = function () {
            var keyEntity = ['loaded', 'animationComplete'];
            return this.addOnPersist(keyEntity);
        };
        Chart.prototype.createSvg = function () {
            this.removeSvg();
            this.calculateSize();
            this.offset = this.findPosition(this.element);
            this.svgObject = this.renderer.createSvg({
                id: this.element.id + '_svg',
                width: this.availableSize.width,
                height: this.availableSize.height
            });
        };
        Chart.prototype.calculateSize = function () {
            var containerWidth = this.element.offsetWidth;
            var containerHeight = this.element.offsetHeight;
            var width = helper_2.stringToNumber(this.width, containerWidth) || containerWidth || 600;
            var height = helper_2.stringToNumber(this.height, containerHeight) || containerHeight || 450;
            this.availableSize = new helper_3.Size(width, height);
        };
        Chart.prototype.unWireEvents = function () {
            var isIE11Pointer = ej2_base_2.Browser.isPointer;
            var startEvent = ej2_base_2.Browser.touchStartEvent;
            var moveEvent = ej2_base_2.Browser.touchMoveEvent;
            var stopEvent = ej2_base_2.Browser.touchEndEvent;
            var wheelEvent = ej2_base_2.Browser.info.name === 'mozilla' ? (isIE11Pointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
            var cancelEvent = isIE11Pointer ? 'pointerleave' : 'mouseleave';
            ej2_base_3.EventHandler.remove(this.element, startEvent, this.chartOnMouseDown);
            ej2_base_3.EventHandler.remove(this.element, moveEvent, this.mouseMove);
            ej2_base_3.EventHandler.remove(this.element, stopEvent, this.mouseEnd);
            ej2_base_3.EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
            ej2_base_3.EventHandler.remove(this.element, 'contextmenu', this.chartRightClick);
            ej2_base_3.EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
            ej2_base_3.EventHandler.remove(this.element, wheelEvent, this.chartMouseWheel);
            if (ej2_base_2.Browser.isTouch && this.isOrientation()) {
                ej2_base_3.EventHandler.remove(window, 'orientationchange', this.chartResize);
            }
            else {
                ej2_base_3.EventHandler.remove(window, 'resize', this.chartResize);
            }
        };
        Chart.prototype.findPosition = function (element) {
            var curleft = 0;
            var curtop = 0;
            if (element.offsetParent) {
                do {
                    curleft += element.offsetLeft;
                    curtop += element.offsetTop;
                    element = element.offsetParent;
                } while (element);
                return new helper_2.ChartLocation(curleft, curtop);
            }
            return null;
        };
        Chart.prototype.wireEvents = function () {
            var isIE11Pointer = ej2_base_2.Browser.isPointer;
            var wheelEvent = ej2_base_2.Browser.info.name === 'mozilla' ? (isIE11Pointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
            var startEvent = ej2_base_2.Browser.touchStartEvent;
            var stopEvent = ej2_base_2.Browser.touchEndEvent;
            var moveEvent = ej2_base_2.Browser.touchMoveEvent;
            var cancelEvent = isIE11Pointer ? 'pointerleave' : 'mouseleave';
            ej2_base_3.EventHandler.add(this.element, startEvent, this.chartOnMouseDown, this);
            ej2_base_3.EventHandler.add(this.element, moveEvent, this.mouseMove, this);
            ej2_base_3.EventHandler.add(this.element, stopEvent, this.mouseEnd, this);
            ej2_base_3.EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
            ej2_base_3.EventHandler.add(this.element, 'contextmenu', this.chartRightClick, this);
            ej2_base_3.EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
            ej2_base_3.EventHandler.add(this.element, wheelEvent, this.chartMouseWheel, this);
            if (ej2_base_2.Browser.isTouch && this.isOrientation()) {
                ej2_base_3.EventHandler.add(window, 'orientationchange', this.chartResize, this);
            }
            else {
                ej2_base_3.EventHandler.add(window, 'resize', this.chartResize, this);
            }
            this.longPress = this.longPress.bind(this);
            new ej2_base_2.Touch(this.element, { taphold: this.longPress, tapholdThreshold: 500 });
            this.setStyle(this.element);
        };
        Chart.prototype.chartRightClick = function (event) {
            if (event.buttons === 2 || event.pointerType === 'touch') {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            return true;
        };
        Chart.prototype.setStyle = function (element) {
            var zooming = this.zoomSettings;
            var disableScroll = zooming.enableSelectionZooming || zooming.enableMouseWheelZooming || zooming.enablePinchZooming ||
                this.selectionMode !== 'None' || this.crosshair.enable;
            element.style.touchAction = disableScroll ? 'none' : 'element';
            element.style.msTouchAction = disableScroll ? 'none' : 'element';
            element.style.msContentZooming = 'none';
            element.style.msUserSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.position = 'relative';
        };
        Chart.prototype.isOrientation = function () {
            return ('orientation' in window && 'onorientationchange' in window);
        };
        Chart.prototype.longPress = function (e) {
            this.mouseX = e ? (e.originalEvent.changedTouches[0].clientX - this.offset.x) : 0;
            this.mouseY = e ? (e.originalEvent.changedTouches[0].clientY - this.offset.y) : 0;
            this.startMove = true;
            if (this.crosshairModule && helper_2.withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
                if (this.tooltipModule) {
                    this.tooltipModule.tooltip();
                }
                this.crosshairModule.crosshair();
            }
            return false;
        };
        Chart.prototype.chartResize = function (e) {
            var _this = this;
            this.animateSeries = false;
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            this.resizeTo = setTimeout(function () {
                _this.createSvg();
                _this.refreshAxis();
                _this.refreshBound();
            }, 500);
            return false;
        };
        Chart.prototype.mouseMove = function (e) {
            var pageX;
            var pageY;
            var touchArg;
            var touches = null;
            var rect = this.element.getBoundingClientRect();
            if (e.type === 'touchmove') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
                touches = touchArg.touches;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
                pageX = e.clientX;
                pageY = e.clientY;
            }
            this.mouseX = pageX - rect.left;
            this.mouseY = pageY - rect.top;
            this.chartOnMouseMove(e, touches);
            return false;
        };
        Chart.prototype.mouseLeave = function (e) {
            var pageX;
            var pageY;
            var touchArg;
            var rect = this.element.getBoundingClientRect();
            if (e.type === 'touchleave') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
                pageX = e.clientX;
                pageY = e.clientY;
            }
            this.mouseX = pageX - rect.left;
            this.mouseY = pageY - rect.top;
            this.chartOnMouseLeave(e);
            return false;
        };
        Chart.prototype.chartOnMouseLeave = function (e) {
            var element = e.target;
            this.trigger(constants_1.chartMouseLeave, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (this.zoomModule) {
                if (this.zoomModule.isZoomed) {
                    this.zoomModule.performZoomRedraw(this);
                }
                this.zoomModule.pinchTarget = null;
                this.zoomModule.touchStartList = [];
                this.zoomModule.touchMoveList = [];
            }
            if (this.tooltip.enable && this.tooltipModule) {
                this.tooltipModule.removeTooltip(true);
            }
            if (this.crosshair.enable && this.crosshairModule) {
                this.crosshairModule.removeCrosshair();
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                this.selectionModule.completeSelection(this, e);
            }
            this.isChartDrag = false;
            this.isChartDrag = false;
            return false;
        };
        Chart.prototype.chartOnMouseClick = function (e) {
            var element = e.target;
            this.trigger(constants_1.chartMouseClick, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (this.legendSettings.visible && this.legendModule) {
                this.legendModule.click(e);
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                this.selectionModule.calculateSelectedElements(this, e);
            }
            return false;
        };
        Chart.prototype.chartOnMouseMove = function (e, touches) {
            var element = e.target;
            this.trigger(constants_1.chartMouseMove, { target: element.id, x: this.mouseX, y: this.mouseY });
            var zooming = this.zoomModule;
            if (this.isChartDrag && zooming) {
                if (this.isTouch) {
                    zooming.touchMoveList = this.addTouchPointer(zooming.touchMoveList, e, touches);
                    if (this.zoomSettings.enablePinchZooming && zooming.touchMoveList.length > 1
                        && zooming.touchStartList.length > 1) {
                        this.zoomModule.performPinchZooming(e, this);
                    }
                }
                zooming.renderZooming(e, this, this.isTouch);
            }
            if (!this.disableTrackTooltip) {
                if (this.tooltip.enable && this.tooltipModule && !this.tooltip.shared && (!this.isTouch || (this.startMove))) {
                    this.tooltipModule.tooltip();
                }
                if (helper_2.withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
                    if (this.tooltip.enable && this.tooltipModule && this.tooltip.shared && (!this.isTouch || (this.startMove))) {
                        this.tooltipModule.tooltip();
                    }
                    if (this.crosshair.enable && this.crosshairModule && (!this.isTouch || this.startMove)) {
                        this.crosshairModule.crosshair();
                    }
                }
                else {
                    if (this.tooltip.enable && this.tooltipModule && this.tooltip.shared) {
                        this.tooltipModule.removeTooltip();
                    }
                    if (this.crosshair.enable && this.crosshairModule) {
                        this.crosshairModule.removeCrosshair();
                    }
                }
                if (this.selectionMode !== 'None' && this.selectionModule) {
                    this.selectionModule.mouseMove(this, e);
                }
            }
            if (this.legendSettings.visible && this.legendModule) {
                this.legendModule.move(e, this.mouseX, this.mouseY);
            }
            this.isTouch = false;
            return false;
        };
        Chart.prototype.chartOnMouseDown = function (e) {
            var pageX;
            var pageY;
            var target;
            var touchArg;
            var touches = null;
            var offset = ej2_base_2.Browser.isDevice ? 20 : 30;
            var rect = this.element.getBoundingClientRect();
            var element = e.target;
            this.trigger(constants_1.chartMouseDown, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (e.type === 'touchstart') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
                target = touchArg.target;
                touches = touchArg.touches;
            }
            else {
                this.isTouch = e.pointerType === 'touch';
                pageX = e.clientX;
                pageY = e.clientY;
                target = e.target;
            }
            this.mouseDownX = this.previousMouseMoveX = pageX - rect.left;
            this.mouseDownY = this.previousMouseMoveY = pageY - rect.top;
            if (target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                helper_2.withInBounds(this.previousMouseMoveX, this.previousMouseMoveY, this.chartAxisLayoutPanel.seriesClipRect)) {
                this.isChartDrag = true;
            }
            if (this.isTouch) {
                if (this.zoomModule) {
                    this.zoomModule.touchStartList = this.addTouchPointer(this.zoomModule.touchStartList, e, touches);
                }
                this.isDoubleTap = (new Date().getTime() < this.threshold && target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                    (this.mouseDownX - offset >= this.mouseX || this.mouseDownX + offset >= this.mouseX) &&
                    (this.mouseDownY - offset >= this.mouseY || this.mouseDownY + offset >= this.mouseY) &&
                    (this.mouseX - offset >= this.mouseDownX || this.mouseX + offset >= this.mouseDownX) &&
                    (this.mouseY - offset >= this.mouseDownY || this.mouseY + offset >= this.mouseDownY));
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                if (this.isDoubleTap || !this.isTouch || this.selectionModule.rectPoints) {
                    this.selectionModule.dragStart(this, this.chartAxisLayoutPanel.seriesClipRect, this.mouseDownX, this.mouseDownY, e);
                }
            }
            return false;
        };
        Chart.prototype.mouseEnd = function (e) {
            var pageY;
            var pageX;
            var touchArg;
            var rect = this.element.getBoundingClientRect();
            if (e.type === 'touchend') {
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                this.isTouch = true;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                pageY = e.clientY;
                pageX = e.clientX;
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            }
            this.mouseX = pageX - rect.left;
            this.mouseY = pageY - rect.top;
            this.chartOnMouseUp(e);
            return false;
        };
        Chart.prototype.chartOnMouseUp = function (e) {
            var element = e.target;
            this.trigger(constants_1.chartMouseUp, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (this.tooltip.enable && this.isTouch && (!this.crosshair.enable)) {
                this.tooltipModule.tooltip();
                this.tooltipModule.removeTooltip();
            }
            if (this.startMove && this.crosshair.enable && this.isTouch) {
                this.crosshairModule.removeCrosshair();
                if (this.tooltip.enable) {
                    this.tooltipModule.removeTooltip();
                }
            }
            var performZoomRedraw = e.target.id.indexOf(this.element.id + '_ZoomOut_') === -1 ||
                e.target.id.indexOf(this.element.id + '_ZoomIn_') === -1;
            if (this.zoomModule && (this.isChartDrag || performZoomRedraw)) {
                this.zoomModule.performZoomRedraw(this);
            }
            this.isChartDrag = false;
            if (this.isTouch) {
                this.threshold = new Date().getTime() + 300;
                if (this.isDoubleTap && helper_2.withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)
                    && this.zoomModule && this.zoomModule.touchStartList.length === 1 && this.zoomModule.isZoomed) {
                    this.zoomModule.toolkit.reset();
                }
                this.isDoubleTap = false;
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                this.selectionModule.completeSelection(this, e);
            }
            this.seriesElements.removeAttribute('clip-path');
            return false;
        };
        Chart.prototype.chartMouseWheel = function (e) {
            var offset = this.element.getBoundingClientRect();
            var mouseX = e.clientX - offset.left;
            var mouseY = e.clientY - offset.top;
            if (this.zoomModule && this.zoomSettings.enableMouseWheelZooming &&
                helper_2.withInBounds(mouseX, mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
                e.preventDefault();
                this.zoomModule.performMouseWheelZooming(e, mouseX, mouseY, this, this.axisCollections);
            }
            return false;
        };
        Chart.prototype.addTouchPointer = function (touchList, e, touches) {
            if (touches) {
                touchList = [];
                for (var i = 0, length_1 = touches.length; i < length_1; i++) {
                    touchList.push({ pageX: touches[i].clientX, pageY: touches[i].clientY, pointerId: null });
                }
            }
            else {
                touchList = touchList ? touchList : [];
                if (touchList.length === 0) {
                    touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
                }
                else {
                    for (var i = 0, length_2 = touchList.length; i < length_2; i++) {
                        if (touchList[i].pointerId === e.pointerId) {
                            touchList[i] = { pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId };
                        }
                        else {
                            touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
                        }
                    }
                }
            }
            return touchList;
        };
        Chart.prototype.setCulture = function () {
            this.intl = new ej2_base_1.Internationalization();
        };
        Chart.prototype.setTheme = function () {
        };
        Chart.prototype.requiredModules = function () {
            var _this = this;
            var modules = [];
            var series = this.series;
            var moduleName;
            var markerEnable = false;
            var dataLabelEnable = false;
            var zooming = this.zoomSettings;
            series.map(function (value) {
                _this.isLegend = (_this.legendSettings.visible && ((value.name !== '') || !!_this.isLegend));
                moduleName = value.type + 'Series';
                markerEnable = value.marker.visible || markerEnable;
                dataLabelEnable = value.marker.dataLabel.visible || dataLabelEnable;
                modules.push({
                    member: moduleName,
                    args: [_this, series]
                });
            });
            modules = this.findAxisModule(modules);
            if (markerEnable) {
                modules.push({
                    member: 'Marker',
                    args: [this, series]
                });
            }
            if (this.crosshair.enable) {
                modules.push({
                    member: 'Crosshair',
                    args: [this]
                });
            }
            if (this.tooltip.enable) {
                modules.push({
                    member: 'Tooltip',
                    args: [this]
                });
            }
            if (this.isLegend) {
                modules.push({
                    member: 'Legend',
                    args: [this]
                });
            }
            if (zooming.enableSelectionZooming || zooming.enableMouseWheelZooming || zooming.enablePinchZooming) {
                modules.push({
                    member: 'Zoom',
                    args: [this, this.zoomSettings]
                });
            }
            if (this.selectionMode !== 'None') {
                modules.push({
                    member: 'Selection',
                    args: [this]
                });
            }
            if (dataLabelEnable) {
                modules.push({
                    member: 'DataLabel',
                    args: [this, series]
                });
            }
            return modules;
        };
        Chart.prototype.findAxisModule = function (modules) {
            var axisCollections = [];
            axisCollections.push(this.primaryXAxis);
            axisCollections.push(this.primaryYAxis);
            axisCollections = axisCollections.concat(this.axes);
            var datetimeEnabled = false;
            var categoryEnabled = false;
            var logarithmicEnabled = false;
            for (var _i = 0, axisCollections_1 = axisCollections; _i < axisCollections_1.length; _i++) {
                var axis = axisCollections_1[_i];
                datetimeEnabled = axis.valueType === 'DateTime' || datetimeEnabled;
                categoryEnabled = axis.valueType === 'Category' || categoryEnabled;
                logarithmicEnabled = axis.valueType === 'Logarithmic' || logarithmicEnabled;
            }
            if (datetimeEnabled) {
                modules.push({
                    member: 'DateTime',
                    args: [this]
                });
            }
            if (categoryEnabled) {
                modules.push({
                    member: 'Category',
                    args: [this]
                });
            }
            if (logarithmicEnabled) {
                modules.push({
                    member: 'Logarithmic',
                    args: [this]
                });
            }
            return modules;
        };
        Chart.prototype.removeSvg = function () {
            if (document.getElementById(this.element.id + '_Secondary_Element')) {
                document.getElementById(this.element.id + '_Secondary_Element').remove();
            }
            var removeLength = 0;
            if (this.zoomModule && this.zoomModule.pinchTarget) {
                this.zoomModule.pinchTarget.id = '';
                this.zoomModule.pinchTarget.setAttribute('opacity', '0');
                this.svgObject.appendChild(this.zoomModule.pinchTarget);
                removeLength = 1;
            }
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > removeLength) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                    dom_1.remove(this.svgObject);
                }
            }
        };
        Chart.prototype.refreshDefinition = function (definitions) {
            for (var _i = 0, definitions_1 = definitions; _i < definitions_1.length; _i++) {
                var item = definitions_1[_i];
                item.axes = [];
            }
        };
        Chart.prototype.refreshAxis = function () {
            var axis = this.primaryXAxis;
            axis.rect = new helper_3.Rect(undefined, undefined, 0, 0);
            axis = this.primaryYAxis;
            axis.rect = new helper_3.Rect(undefined, undefined, 0, 0);
            for (var _i = 0, _a = this.axes; _i < _a.length; _i++) {
                var item = _a[_i];
                axis = item;
                axis.rect = new helper_3.Rect(undefined, undefined, 0, 0);
            }
        };
        Chart.prototype.axisChange = function (axis) {
            if (!axis.name && !axis.valueType) {
                return false;
            }
            this.refreshDefinition(this.columns);
            this.refreshDefinition(this.rows);
            this.calculateVisibleAxis();
            this.processData();
            return true;
        };
        Chart.prototype.onPropertyChanged = function (newProp, oldProp) {
            var renderer = false;
            var refreshBounds = false;
            this.animateSeries = false;
            if (!this.delayRedraw) {
                for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    switch (prop) {
                        case 'primaryXAxis':
                            refreshBounds = this.axisChange(newProp.primaryXAxis);
                            if (newProp.primaryXAxis.edgeLabelPlacement) {
                                renderer = true;
                            }
                            if (!newProp.primaryXAxis.crosshairTooltip) {
                                refreshBounds = true;
                            }
                            break;
                        case 'primaryYAxis':
                            refreshBounds = this.axisChange(newProp.primaryYAxis);
                            if (newProp.primaryYAxis.edgeLabelPlacement) {
                                renderer = true;
                            }
                            if (!newProp.primaryYAxis.crosshairTooltip) {
                                refreshBounds = true;
                            }
                            break;
                        case 'height':
                        case 'width':
                            this.createSvg();
                            refreshBounds = true;
                            break;
                        case 'title':
                            if (newProp.title === '' || oldProp.title === '') {
                                refreshBounds = true;
                            }
                            else {
                                renderer = true;
                            }
                            break;
                        case 'titleStyle':
                            if (newProp.titleStyle && newProp.titleStyle.size) {
                                refreshBounds = true;
                            }
                            else {
                                renderer = true;
                            }
                            break;
                        case 'border':
                            renderer = true;
                            break;
                        case 'background':
                            renderer = true;
                            break;
                        case 'chartArea':
                            if (newProp.chartArea.border && newProp.chartArea.border.width) {
                                refreshBounds = true;
                            }
                            renderer = true;
                            break;
                        case 'legendSettings':
                            if (!newProp.legendSettings.background || !newProp.legendSettings.opacity) {
                                refreshBounds = true;
                            }
                            renderer = true;
                            break;
                        case 'palettes':
                            this.calculateVisibleSeries();
                            renderer = true;
                            break;
                        case 'selectedDataIndexes':
                        case 'selectionMode':
                            if (this.selectionModule && newProp.selectionMode && newProp.selectionMode.indexOf('Drag') === -1) {
                                this.selectionModule.redrawSelection(this, oldProp.selectionMode);
                            }
                            break;
                        case 'isMultiSelect':
                            if (this.selectionModule && !newProp.isMultiSelect && this.selectionModule.selectedDataIndexes.length > 1) {
                                this.selectionModule.redrawSelection(this, oldProp.selectionMode);
                            }
                            break;
                    }
                }
                if (!refreshBounds && renderer) {
                    this.removeSvg();
                    this.renderElements();
                }
                if (refreshBounds) {
                    this.removeSvg();
                    this.refreshAxis();
                    this.refreshBound();
                }
            }
        };
        return Chart;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Chart.prototype, "title", void 0);
    __decorate([
        ej2_base_3.Complex(theme_1.Theme.chartTitleFont, base_1.Font)
    ], Chart.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_3.Complex({}, base_1.Margin)
    ], Chart.prototype, "margin", void 0);
    __decorate([
        ej2_base_3.Complex({ color: '#DDDDDD', width: 0 }, base_1.Border)
    ], Chart.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.chartBackgroundColor)
    ], Chart.prototype, "background", void 0);
    __decorate([
        ej2_base_3.Complex({ border: { color: 'Gray', width: 0.5 }, background: 'transparent' }, base_1.ChartArea)
    ], Chart.prototype, "chartArea", void 0);
    __decorate([
        ej2_base_3.Complex({ name: 'primaryXAxis' }, axis_1.Axis)
    ], Chart.prototype, "primaryXAxis", void 0);
    __decorate([
        ej2_base_3.Complex({ name: 'primaryYAxis' }, axis_1.Axis)
    ], Chart.prototype, "primaryYAxis", void 0);
    __decorate([
        ej2_base_3.Collection([{}], axis_1.Row)
    ], Chart.prototype, "rows", void 0);
    __decorate([
        ej2_base_3.Collection([{}], axis_1.Column)
    ], Chart.prototype, "columns", void 0);
    __decorate([
        ej2_base_3.Collection([{}], axis_1.Axis)
    ], Chart.prototype, "axes", void 0);
    __decorate([
        ej2_base_3.Collection([{}], chart_series_1.Series)
    ], Chart.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], Chart.prototype, "palettes", void 0);
    __decorate([
        ej2_base_1.Property('FlatLight')
    ], Chart.prototype, "theme", void 0);
    __decorate([
        ej2_base_3.Complex({}, base_1.TooltipSettings)
    ], Chart.prototype, "tooltip", void 0);
    __decorate([
        ej2_base_3.Complex({}, base_1.CrosshairSettings)
    ], Chart.prototype, "crosshair", void 0);
    __decorate([
        ej2_base_3.Complex({}, legend_1.LegendSettings)
    ], Chart.prototype, "legendSettings", void 0);
    __decorate([
        ej2_base_3.Complex({}, base_1.ZoomSettings)
    ], Chart.prototype, "zoomSettings", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Chart.prototype, "selectionMode", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "isMultiSelect", void 0);
    __decorate([
        ej2_base_3.Collection([], selection_1.Indexes)
    ], Chart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "useGroupingSeparator", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Chart.prototype, "tabIndex", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "loaded", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "load", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "animationComplete", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "legendRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "textRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "pointRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "seriesRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "axisLabelRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "tooltipRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseMove", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseClick", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseLeave", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseDown", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseUp", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "dragComplete", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "zoomComplete", void 0);
    Chart = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], Chart);
    exports.Chart = Chart;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, line_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AreaSeries = (function (_super) {
        __extends(AreaSeries, _super);
        function AreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AreaSeries.prototype.render = function (series) {
            var firstPoint;
            var endPoint;
            var startPoint = null;
            var direction = '';
            var pointsLength = series.points.length;
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var options;
            var point;
            var currentXValue;
            for (var i = 0; i < pointsLength; i++) {
                point = series.points[i];
                currentXValue = point.xValue;
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                    if (startPoint === null) {
                        startPoint = new helper_1.ChartLocation(0, 0);
                        startPoint.x = currentXValue;
                        startPoint.y = origin;
                        firstPoint = helper_1.getPoint(currentXValue, origin, series);
                        direction += ('M' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                    }
                    firstPoint = helper_1.getPoint(currentXValue, point.yValue, series);
                    direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                    if (series.points[i + 1] && !series.points[i + 1].visible) {
                        firstPoint = helper_1.getPoint(currentXValue, origin, series);
                        endPoint = helper_1.getPoint(startPoint.x, startPoint.y, series);
                        direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ' + 'L' +
                            ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
                        startPoint = null;
                    }
                    point.symbolLocation = helper_1.getPoint(currentXValue, point.yValue, series);
                }
            }
            if (pointsLength > 1) {
                startPoint = { 'x': series.points[pointsLength - 1].xValue, 'y': origin };
                endPoint = helper_1.getPoint(startPoint.x, startPoint.y, series);
                direction += ('L' + ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
            }
            else {
                direction = '';
            }
            options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
            this.appendLinePath(options, series);
            this.renderMarker(series);
        };
        AreaSeries.prototype.destroy = function (chart) {
        };
        AreaSeries.prototype.getModuleName = function () {
            return 'AreaSeries';
        };
        AreaSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        return AreaSeries;
    }(line_base_1.LineBase));
    exports.AreaSeries = AreaSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, column_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BarSeries = (function (_super) {
        __extends(BarSeries, _super);
        function BarSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BarSeries.prototype.render = function (series) {
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var sideBySideInfo = this.getSideBySideInfo(series);
            var rect;
            var argsData;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                    rect = this.getRectangle(point.yValue, point.xValue + sideBySideInfo.start, origin, point.xValue + sideBySideInfo.end, series);
                    argsData = this.triggerEvent(series.chart, series, point);
                    if (!argsData.cancel) {
                        this.updateYRegion(point, rect);
                        this.drawRectangle(series, point, rect, argsData);
                    }
                }
            }
        };
        BarSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        BarSeries.prototype.destroy = function (chart) {
        };
        BarSeries.prototype.getModuleName = function () {
            return 'BarSeries';
        };
        return BarSeries;
    }(column_base_1.ColumnBase));
    exports.BarSeries = BarSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, column_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColumnSeries = (function (_super) {
        __extends(ColumnSeries, _super);
        function ColumnSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColumnSeries.prototype.render = function (series) {
            var rect;
            var sideBySideInfo = this.getSideBySideInfo(series);
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var argsData;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                    rect = this.getRectangle(point.xValue + sideBySideInfo.start, point.yValue, point.xValue + sideBySideInfo.end, origin, series);
                    argsData = this.triggerEvent(series.chart, series, point);
                    if (!argsData.cancel) {
                        this.updateXRegion(point, rect);
                        this.drawRectangle(series, point, rect, argsData);
                    }
                }
            }
        };
        ColumnSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        ColumnSeries.prototype.getModuleName = function () {
            return 'ColumnSeries';
        };
        ColumnSeries.prototype.destroy = function (chart) {
        };
        return ColumnSeries;
    }(column_base_1.ColumnBase));
    exports.ColumnSeries = ColumnSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, helper_2, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataLabel = (function () {
        function DataLabel(chart) {
            this.chart = chart;
        }
        DataLabel.prototype.initPrivateVariables = function (series, marker) {
            this.markerHeight = ((series.type === 'Scatter' || marker.visible) && !series.isRectSeries) ? (marker.height / 2) : 0;
            this.commonId = this.chart.element.id + '_Series_' + series.index + '_Point_';
        };
        DataLabel.prototype.render = function (series, chart, dataLabel) {
            var _this = this;
            this.initPrivateVariables(series, series.marker);
            var text;
            var rect;
            var rgbValue;
            var contrast;
            var argsData;
            var border;
            var textSize;
            series.points.map(function (point, index) {
                _this.margin = dataLabel.margin;
                border = { width: dataLabel.border.width, color: dataLabel.border.color };
                if (point.symbolLocation) {
                    text = helper_2.getLabelText(point, series.yAxis.labelFormat, chart);
                    argsData = {
                        cancel: false, name: constants_1.textRender, series: series, point: point, text: text, border: border, color: dataLabel.fill
                    };
                    chart.trigger(constants_1.textRender, argsData);
                    if (!argsData.cancel) {
                        _this.fontBackground = argsData.color;
                        textSize = helper_2.measureText(argsData.text, dataLabel.font);
                        _this.isDataLabelShape(argsData);
                        rect = _this.calculateTextPosition(point, series, textSize, dataLabel);
                        if (!helper_1.isCollide(rect, chart.dataLabelCollections)) {
                            chart.dataLabelCollections.push(rect);
                            if (_this.isShape) {
                                series.shapeElement.appendChild(chart.renderer.drawRectangle(new helper_1.RectOption(_this.commonId + index + '_TextShape', argsData.color, argsData.border, dataLabel.opacity, rect, dataLabel.rx, dataLabel.ry)));
                            }
                            rgbValue = helper_2.convertHexToColor(helper_2.colorNameToHex(_this.fontBackground));
                            contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
                            helper_2.textElement(new helper_1.TextOption(_this.commonId + index + '_Text', rect.x + _this.margin.left + textSize.width / 2, rect.y + _this.margin.top + textSize.height * 3 / 4, 'middle', argsData.text, 'rotate(0,' + (rect.x) + ',' + (rect.y) + ')', 'auto'), dataLabel.font, dataLabel.font.color || (contrast >= 128 ? 'black' : 'white'), series.textElement);
                        }
                    }
                }
            });
        };
        DataLabel.prototype.calculateTextPosition = function (point, series, textSize, dataLabel) {
            var location = new helper_1.ChartLocation(point.symbolLocation.x, point.symbolLocation.y);
            var padding = 5;
            var clipRect = series.clipRect;
            var rect;
            if (!this.chart.requireInvertedAxis) {
                this.locationX = location.x;
                var alignmentValue = textSize.height + (this.borderWidth * 2) + this.markerHeight +
                    this.margin.bottom + this.margin.top + padding;
                location.y = dataLabel.position === 'Auto' ? location.y :
                    this.calculateAlignment(alignmentValue, location.y, dataLabel.alignment, series.isRectSeries ? point.yValue < 0 : false);
                location.y = !series.isRectSeries ? this.calculatePathPosition(location.y, dataLabel.position, series, point, textSize) :
                    this.calculateRectPosition(location.y, point.region, point.yValue < 0, dataLabel.position, series, textSize);
            }
            else {
                this.locationY = location.y;
                var alignmentValue = textSize.width + this.borderWidth + this.margin.left + this.margin.right - padding;
                location.x = dataLabel.position === 'Auto' ? location.x :
                    this.calculateAlignment(alignmentValue, location.x, dataLabel.alignment, point.yValue < 0);
                location.x = this.calculateRectPosition(location.x, point.region, point.yValue < 0, dataLabel.position, series, textSize);
            }
            rect = helper_2.calculateRect(location, textSize, this.margin);
            if (!((rect.y > clipRect.height) || (rect.x > clipRect.width) ||
                (rect.x + rect.width < 0) || (rect.y + rect.height < 0))) {
                rect.x = rect.x < 0 ? padding : rect.x;
                rect.y = rect.y < 0 ? padding : rect.y;
                rect.x -= (rect.x + rect.width) > clipRect.width ? (rect.x + rect.width) - clipRect.width + padding : 0;
                rect.y -= (rect.y + rect.height) > clipRect.height ? (rect.y + rect.height) - clipRect.height + padding : 0;
                this.fontBackground = this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground;
            }
            return rect;
        };
        DataLabel.prototype.calculateRectPosition = function (y, rect, isMinus, position, series, textSize) {
            var padding = 5;
            var margin = this.margin;
            var textLength = !this.chart.requireInvertedAxis ? textSize.height : textSize.width;
            var extraSpace = this.borderWidth + textLength / 2 + padding;
            position = (series.type === 'StackingColumn' || series.type === 'StackingBar') ?
                (position === 'Outer' ? 'Top' : position) : position;
            switch (position) {
                case 'Bottom':
                    y = !this.chart.requireInvertedAxis ?
                        isMinus ? (y - rect.height + extraSpace + margin.top) : (y + rect.height - extraSpace - margin.bottom) :
                        isMinus ? (y + rect.width - extraSpace - margin.left) : (y - rect.width + extraSpace + margin.right);
                    break;
                case 'Middle':
                    y = !this.chart.requireInvertedAxis ? (isMinus ? y - (rect.height / 2) : y + (rect.height / 2)) :
                        (isMinus ? y + (rect.width / 2) : y - (rect.width / 2));
                    break;
                case 'Auto':
                    y = this.calculateRectActualPosition(y, rect, isMinus, series, textSize);
                    break;
                default:
                    if ((isMinus && position === 'Top') || (!isMinus && position === 'Outer')) {
                        y = !this.chart.requireInvertedAxis ? y - extraSpace - margin.bottom : y + extraSpace + margin.right;
                    }
                    else {
                        y = !this.chart.requireInvertedAxis ? y + extraSpace + margin.top : y - extraSpace - margin.left;
                    }
                    break;
            }
            var check = !this.chart.requireInvertedAxis ? (y < rect.y || y > rect.y + rect.height) :
                (y < rect.x || y > rect.x + rect.width);
            this.fontBackground = check ?
                (this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground)
                : this.fontBackground === 'transparent' ? series.fill : this.fontBackground;
            return y;
        };
        DataLabel.prototype.calculatePathPosition = function (y, position, series, point, size) {
            var padding = 5;
            this.fontBackground = this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground;
            switch (position) {
                case 'Top':
                case 'Outer':
                    y = y - this.markerHeight - this.borderWidth - size.height / 2 - this.margin.bottom - padding;
                    break;
                case 'Bottom':
                    y = y + this.markerHeight + this.borderWidth + size.height / 2 + this.margin.top + padding;
                    break;
                case 'Auto':
                    y = this.calculatePathActualPosition(y, this.markerHeight, series, point, size);
                    break;
            }
            return y;
        };
        DataLabel.prototype.isDataLabelShape = function (style) {
            this.isShape = (style.color !== 'transparent' || style.border.width > 0);
            this.borderWidth = style.border.width;
            if (!this.isShape) {
                this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
            }
        };
        DataLabel.prototype.calculateRectActualPosition = function (y, rect, isMinus, series, size) {
            var location;
            var labelRect;
            var isOverLap = true;
            var position = 0;
            var collection = this.chart.dataLabelCollections;
            while (isOverLap && position < 4) {
                location = this.calculateRectPosition(y, rect, isMinus, this.getPosition(position), series, size);
                if (!this.chart.requireInvertedAxis) {
                    labelRect = helper_2.calculateRect(new helper_1.ChartLocation(this.locationX, location), size, this.margin);
                    isOverLap = labelRect.y < 0 || helper_1.isCollide(labelRect, collection) || labelRect.y > series.clipRect.height;
                }
                else {
                    labelRect = helper_2.calculateRect(new helper_1.ChartLocation(location, this.locationY), size, this.margin);
                    isOverLap = labelRect.x < 0 || helper_1.isCollide(labelRect, collection) || labelRect.x > series.clipRect.width;
                }
                position++;
            }
            return location;
        };
        DataLabel.prototype.calculatePathActualPosition = function (y, markerSize, series, point, size) {
            var points = series.points;
            var index = point.index;
            var yValue = points[index].yValue;
            var position;
            var nextPoint = points.length - 1 > index ? points[index + 1] : null;
            var previousPoint = index > 0 ? points[index - 1] : null;
            var yLocation;
            var isOverLap = true;
            var labelRect;
            var isBottom;
            var positionIndex;
            var collection = this.chart.dataLabelCollections;
            if (series.type.indexOf('Step') > -1) {
                position = 'Top';
                if (index) {
                    position = (!previousPoint || !previousPoint.visible || yValue > previousPoint.yValue
                        || yValue === previousPoint.yValue) ? 'Top' : 'Bottom';
                }
            }
            else {
                if (index === 0) {
                    position = (!nextPoint || !nextPoint.visible || yValue > nextPoint.yValue) ? 'Top' : 'Bottom';
                }
                if (index === points.length - 1) {
                    position = (!previousPoint || !previousPoint.visible || yValue > previousPoint.yValue) ? 'Top' : 'Bottom';
                }
                else {
                    if (!nextPoint.visible && !(previousPoint && previousPoint.visible)) {
                        position = 'Top';
                    }
                    else if (!nextPoint.visible || !previousPoint) {
                        position = (nextPoint.yValue > yValue || (previousPoint && previousPoint.yValue > yValue)) ?
                            'Bottom' : 'Top';
                    }
                    else {
                        var slope = (nextPoint.yValue - previousPoint.yValue) / 2;
                        var intersectY = (slope * index) + (nextPoint.yValue - (slope * (index + 1)));
                        position = intersectY < yValue ? 'Top' : 'Bottom';
                    }
                }
            }
            isBottom = position === 'Bottom';
            positionIndex = ['Outer', 'Top', 'Bottom', 'Middle', 'Auto'].indexOf(position);
            while (isOverLap && positionIndex < 4) {
                yLocation = this.calculatePathPosition(y, this.getPosition(positionIndex), series, point, size);
                labelRect = helper_2.calculateRect(new helper_1.ChartLocation(this.locationX, yLocation), size, this.margin);
                isOverLap = labelRect.y < 0 || helper_1.isCollide(labelRect, collection)
                    || (labelRect.y + labelRect.height) > series.clipRect.height;
                positionIndex = isBottom ? positionIndex - 1 : positionIndex + 1;
                isBottom = false;
            }
            return yLocation;
        };
        DataLabel.prototype.calculateAlignment = function (value, y, alignment, isMinus) {
            switch (alignment) {
                case 'Far':
                    y = !this.chart.requireInvertedAxis ? (isMinus ? y + value : y - value) :
                        (isMinus ? y - value : y + value);
                    break;
                case 'Near':
                    y = !this.chart.requireInvertedAxis ? (isMinus ? y - value : y + value) :
                        (isMinus ? y + value : y - value);
                    break;
                case 'Center':
                    y = y;
                    break;
            }
            return y;
        };
        DataLabel.prototype.doDataLabelAnimation = function (series) {
            var shapeElements = series.shapeElement.childNodes;
            var textNode = series.textElement.childNodes;
            var delay = series.animation.delay + series.animation.duration;
            var location;
            for (var i = 0, count = textNode.length; i < count; i++) {
                location = new helper_1.ChartLocation((+textNode[i].getAttribute('x')) + ((+textNode[i].getAttribute('width')) / 2), (+textNode[i].getAttribute('y')) + ((+textNode[i].getAttribute('height')) / 2));
                helper_2.markerAnimate(textNode[i], delay, 200, series, null, location, true);
                if (shapeElements[i]) {
                    location = new helper_1.ChartLocation((+shapeElements[i].getAttribute('x')) + ((+shapeElements[i].getAttribute('width')) / 2), (+shapeElements[i].getAttribute('y')) + ((+shapeElements[i].getAttribute('height')) / 2));
                    helper_2.markerAnimate(shapeElements[i], delay, 200, series, null, location, true);
                }
            }
        };
        DataLabel.prototype.getPosition = function (index) {
            return (['Outer', 'Top', 'Bottom', 'Middle', 'Auto'][index]);
        };
        DataLabel.prototype.getModuleName = function () {
            return 'DataLabel';
        };
        DataLabel.prototype.destroy = function (chart) {
        };
        return DataLabel;
    }());
    exports.DataLabel = DataLabel;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, line_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LineSeries = (function (_super) {
        __extends(LineSeries, _super);
        function LineSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LineSeries.prototype.render = function (series) {
            var point1;
            var point2;
            var direction = '';
            var prevPoint = null;
            var startPoint = 'M';
            var options;
            var visiblePoints = this.improveChartPerformance(series);
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    if (prevPoint != null) {
                        point1 = helper_1.getPoint(prevPoint.xValue, prevPoint.yValue, series);
                        point2 = helper_1.getPoint(point.xValue, point.yValue, series);
                        direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' +
                            'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                        startPoint = 'L';
                    }
                    prevPoint = point;
                    point.symbolLocation = helper_1.getPoint(point.xValue, point.yValue, series);
                    point.region = new helper_1.Rect(point.symbolLocation.x - series.marker.width, point.symbolLocation.y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height);
                }
                else {
                    prevPoint = null;
                    startPoint = 'M';
                    point.symbolLocation = null;
                }
            }
            options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index, 'none', series.width, series.interior, series.opacity, series.dashArray, direction);
            this.appendLinePath(options, series);
            this.renderMarker(series);
        };
        LineSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doProgressiveAnimation(series, option);
        };
        LineSeries.prototype.getModuleName = function () {
            return 'LineSeries';
        };
        LineSeries.prototype.destroy = function (chart) {
        };
        return LineSeries;
    }(line_base_1.LineBase));
    exports.LineSeries = LineSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Marker = (function () {
        function Marker(chart) {
            this.chart = chart;
            this.elementId = chart.element.id;
        }
        Marker.prototype.render = function (series) {
            var seriesIndex = series.index;
            var marker = series.marker;
            var border = marker.border;
            var shape = marker.shape;
            var symbolId;
            var shapeOption;
            var fill = marker.fill || series.interior;
            var argsData;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (point.visible && point.symbolLocation) {
                    border.color = border.color || fill;
                    symbolId = this.elementId + '_Series_' + seriesIndex + '_Point_' + point.index + '_Symbol';
                    argsData = {
                        cancel: false, name: constants_1.pointRender, series: series, point: point, fill: fill, border: border, height: marker.height,
                        width: marker.width
                    };
                    this.chart.trigger(constants_1.pointRender, argsData);
                    point.color = argsData.fill;
                    if (!argsData.cancel) {
                        shapeOption = new helper_1.PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, marker.opacity, null);
                        series.symbolElement.appendChild(helper_1.drawSymbol(point.symbolLocation, shape, new helper_1.Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + point.y.toString()));
                    }
                }
            }
        };
        Marker.prototype.doMarkerAnimation = function (series) {
            if (!(series.type.indexOf('Column') > -1 || series.type.indexOf('Bar') > -1 || series.type === 'Scatter')) {
                var markerElements = series.symbolElement.childNodes;
                var delay = series.animation.delay + series.animation.duration;
                var j = 1;
                for (var i = 0; i < series.points.length; i++) {
                    if (!series.points[i].symbolLocation) {
                        continue;
                    }
                    helper_1.markerAnimate(markerElements[j], delay, 200, series, i, series.points[i].symbolLocation, false);
                    j++;
                }
            }
        };
        Marker.prototype.getModuleName = function () {
            return 'Marker';
        };
        Marker.prototype.destroy = function (chart) {
        };
        return Marker;
    }());
    exports.Marker = Marker;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(12), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, line_base_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScatterSeries = (function (_super) {
        __extends(ScatterSeries, _super);
        function ScatterSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScatterSeries.prototype.render = function (series) {
            var seriesIndex = series.index;
            var marker = series.marker;
            var border = series.border;
            var shape = marker.shape;
            var visiblePoints = this.improveChartPerformance(series);
            var pointIndex;
            var symbolId;
            var shapeOption;
            var argsData;
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    point.symbolLocation = helper_1.getPoint(point.xValue, point.yValue, series);
                    symbolId = series.chart.element.id + '_Series_' + seriesIndex + '_Point_' + point.index;
                    argsData = { cancel: false, name: constants_1.pointRender, series: series, point: point, fill: series.interior,
                        border: border, height: marker.height, width: marker.width
                    };
                    series.chart.trigger(constants_1.pointRender, argsData);
                    if (!argsData.cancel) {
                        point.color = argsData.fill;
                        shapeOption = new helper_1.PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
                        series.seriesElement.appendChild(helper_1.drawSymbol(point.symbolLocation, shape, new helper_1.Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + point.y.toString()));
                        point.region = new helper_1.Rect(point.symbolLocation.x - marker.width, point.symbolLocation.y - marker.height, 2 * marker.width, 2 * marker.height);
                    }
                }
            }
        };
        ScatterSeries.prototype.doAnimation = function (series) {
            var duration = series.animation.duration;
            var delay = series.animation.delay;
            var rectElements = series.seriesElement.childNodes;
            var count = 1;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.symbolLocation) {
                    continue;
                }
                helper_1.markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocation, false);
                count++;
            }
        };
        ScatterSeries.prototype.getModuleName = function () {
            return 'ScatterSeries';
        };
        ScatterSeries.prototype.destroy = function (chart) {
        };
        return ScatterSeries;
    }(line_base_1.LineBase));
    exports.ScatterSeries = ScatterSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, line_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplineSeries = (function (_super) {
        __extends(SplineSeries, _super);
        function SplineSeries() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.naturalSplinePoints = [];
            return _this;
        }
        SplineSeries.prototype.render = function (series) {
            var chart = series.chart;
            var marker = series.marker;
            var ySpline;
            var options;
            var firstPoint = null;
            var secondPoint = null;
            var direction = '';
            var pt1;
            var pt2;
            var bpt1;
            var bpt2;
            var data;
            var controlPointCount = 0;
            var controlPoint1;
            var controlPoint2;
            var startPoint = 'M';
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (point.visible && helper_1.withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                    if (firstPoint !== null) {
                        data = series.drawPoints[point.index - 1];
                        controlPoint1 = data.controlPoint1;
                        controlPoint2 = data.controlPoint2;
                        pt1 = helper_1.getPoint(firstPoint.xValue, firstPoint.yValue, series);
                        pt2 = helper_1.getPoint(point.xValue, point.yValue, series);
                        bpt1 = helper_1.getPoint(controlPoint1.x, controlPoint1.y, series);
                        bpt2 = helper_1.getPoint(controlPoint2.x, controlPoint2.y, series);
                        direction = direction.concat((startPoint + ' ' + (pt1.x) + ' ' + (pt1.y) + ' ' + 'C' + ' ' + (bpt1.x) + ' '
                            + (bpt1.y) + ' ' + (bpt2.x) + ' ' + (bpt2.y) + ' ' + (pt2.x) + ' ' + (pt2.y) + ' '));
                        startPoint = 'L';
                    }
                    firstPoint = point;
                    point.symbolLocation = helper_1.getPoint(point.xValue, point.yValue, series);
                    point.region = new helper_1.Rect(point.symbolLocation.x - marker.width, point.symbolLocation.y - marker.height, 2 * marker.width, 2 * marker.height);
                }
                else {
                    startPoint = 'M';
                    firstPoint = null;
                    point.symbolLocation = null;
                }
            }
            options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
            this.appendLinePath(options, series);
            this.renderMarker(series);
        };
        SplineSeries.prototype.findSplinePoint = function (series) {
            var spline = series.chart.splineSeriesModule;
            var value;
            this.naturalSplinePoints = this.naturalSpline(series.points);
            if (series.points.length > 1) {
                series.yMax = null;
                series.yMin = null;
                for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                    var point = _a[_i];
                    if (point.index !== 0) {
                        value = this.getControlPoints(series.points[point.index - 1], point, this.naturalSplinePoints[point.index - 1], this.naturalSplinePoints[point.index]);
                        series.drawPoints.push(value);
                        series.yMin = (Math.min(series.yMin, point.yValue, value.controlPoint1.y, value.controlPoint2.y));
                        series.yMax = (Math.max(series.yMax, point.yValue, value.controlPoint1.y, value.controlPoint2.y));
                    }
                }
            }
        };
        SplineSeries.prototype.naturalSpline = function (points) {
            var count = points.length;
            var a = 6;
            var ySpline = [];
            var ySplineDuplicate = [];
            var d1;
            var d2;
            var d3;
            var dy1;
            var dy2;
            ySpline[0] = ySplineDuplicate[0] = 0;
            ySpline[points.length - 1] = 0;
            for (var i = 1; i < count - 1; i++) {
                d1 = points[i].xValue - points[i - 1].xValue;
                d2 = points[i + 1].xValue - points[i - 1].xValue;
                d3 = points[i + 1].xValue - points[i].xValue;
                dy1 = points[i + 1].yValue - points[i].yValue;
                dy2 = points[i].yValue - points[i - 1].yValue;
                if (d1 === 0 || d2 === 0 || d3 === 0) {
                    ySpline[i] = 0;
                    ySplineDuplicate[i] = 0;
                }
                else {
                    var p = 1 / (d1 * ySpline[i - 1] + 2 * d2);
                    ySpline[i] = -p * d3;
                    ySplineDuplicate[i] = p * (a * (dy1 / d3 - dy2 / d1) - d1 * ySplineDuplicate[i - 1]);
                }
            }
            for (var k = count - 2; k >= 0; k--) {
                ySpline[k] = ySpline[k] * ySpline[k + 1] + ySplineDuplicate[k];
            }
            return ySpline;
        };
        SplineSeries.prototype.getControlPoints = function (point1, point2, ySpline1, ySpline2) {
            var one3 = 1 / 3.0;
            var deltaX2 = (point2.xValue - point1.xValue);
            deltaX2 = deltaX2 * deltaX2;
            var y1 = one3 * (((2 * point1.yValue) + point2.yValue) - one3 * deltaX2 * (ySpline1 + 0.5 * ySpline2));
            var y2 = one3 * ((point1.yValue + (2 * point2.yValue)) - one3 * deltaX2 * (0.5 * ySpline1 + ySpline2));
            var control1 = new helper_1.ChartLocation((2 * (point1.xValue) + (point2.xValue)) * one3, y1);
            var control2 = new helper_1.ChartLocation(((point1.xValue) + 2 * (point2.xValue)) * one3, y2);
            var points = new helper_1.ControlPoints(control1, control2);
            return points;
        };
        SplineSeries.prototype.getModuleName = function () {
            return 'SplineSeries';
        };
        SplineSeries.prototype.destroy = function (chart) {
        };
        SplineSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        return SplineSeries;
    }(line_base_1.LineBase));
    exports.SplineSeries = SplineSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, line_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StackingAreaSeries = (function (_super) {
        __extends(StackingAreaSeries, _super);
        function StackingAreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StackingAreaSeries.prototype.render = function (series) {
            var point1;
            var point2;
            var lineDirection = '';
            var visiblePoints = series.points;
            var pointsLength = visiblePoints.length;
            var stackedvalue = series.stackedValues;
            var origin = Math.max(series.yAxis.visibleRange.min, stackedvalue.startValues[0]);
            var border = series.border;
            var options;
            var startPoint = 0;
            point1 = helper_1.getPoint(visiblePoints[0].xValue, origin, series);
            lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
            for (var i = 0; i < pointsLength; i++) {
                visiblePoints[i].symbolLocation = null;
                if (visiblePoints[i].visible && helper_1.withInRange(visiblePoints[i - 1], visiblePoints[i], visiblePoints[i + 1], series)) {
                    point1 = helper_1.getPoint(visiblePoints[i].xValue, stackedvalue.endValues[i], series);
                    lineDirection = lineDirection.concat('L' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    visiblePoints[i].symbolLocation = helper_1.getPoint(visiblePoints[i].xValue, stackedvalue.endValues[i], series);
                }
                else {
                    for (var j = i - 1; j >= startPoint; j--) {
                        point2 = helper_1.getPoint(visiblePoints[j].xValue, stackedvalue.startValues[j], series);
                        lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    }
                    if (visiblePoints[i + 1] && visiblePoints[i + 1].visible) {
                        point1 = helper_1.getPoint(visiblePoints[i + 1].xValue, stackedvalue.startValues[i + 1], series);
                        lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    }
                    startPoint = i + 1;
                }
            }
            for (var j = pointsLength - 1; j >= startPoint; j--) {
                point2 = helper_1.getPoint(visiblePoints[j].xValue, stackedvalue.startValues[j], series);
                lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            }
            options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, lineDirection);
            this.appendLinePath(options, series);
            this.renderMarker(series);
        };
        StackingAreaSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        StackingAreaSeries.prototype.destroy = function (chart) {
        };
        StackingAreaSeries.prototype.getModuleName = function () {
            return 'StackingAreaSeries';
        };
        return StackingAreaSeries;
    }(line_base_1.LineBase));
    exports.StackingAreaSeries = StackingAreaSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, column_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StackingBarSeries = (function (_super) {
        __extends(StackingBarSeries, _super);
        function StackingBarSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StackingBarSeries.prototype.render = function (series) {
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var sideBySideInfo = this.getSideBySideInfo(series);
            var stackedValue = series.stackedValues;
            var rect;
            var argsData;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                    rect = this.getRectangle(stackedValue.endValues[point.index], point.xValue + sideBySideInfo.start, stackedValue.startValues[point.index], point.xValue + sideBySideInfo.end, series);
                    argsData = this.triggerEvent(series.chart, series, point);
                    if (!argsData.cancel) {
                        this.drawRectangle(series, point, rect, argsData);
                        this.updateYRegion(point, rect);
                    }
                }
            }
        };
        StackingBarSeries.prototype.destroy = function (chart) {
        };
        StackingBarSeries.prototype.getModuleName = function () {
            return 'StackingBarSeries';
        };
        StackingBarSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        return StackingBarSeries;
    }(column_base_1.ColumnBase));
    exports.StackingBarSeries = StackingBarSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, column_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StackingColumnSeries = (function (_super) {
        __extends(StackingColumnSeries, _super);
        function StackingColumnSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StackingColumnSeries.prototype.render = function (series) {
            series.isRectSeries = true;
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var sideBySideInfo = this.getSideBySideInfo(series);
            var rect;
            var argsData;
            var stackedValue = series.stackedValues;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                    rect = this.getRectangle(point.xValue + sideBySideInfo.start, stackedValue.endValues[point.index], point.xValue + sideBySideInfo.end, stackedValue.startValues[point.index], series);
                    argsData = this.triggerEvent(series.chart, series, point);
                    if (!argsData.cancel) {
                        this.drawRectangle(series, point, rect, argsData);
                        this.updateXRegion(point, rect);
                    }
                }
            }
        };
        StackingColumnSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        StackingColumnSeries.prototype.destroy = function (chart) {
        };
        StackingColumnSeries.prototype.getModuleName = function () {
            return 'StackingColumnSeries';
        };
        return StackingColumnSeries;
    }(column_base_1.ColumnBase));
    exports.StackingColumnSeries = StackingColumnSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, line_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StepLineSeries = (function (_super) {
        __extends(StepLineSeries, _super);
        function StepLineSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StepLineSeries.prototype.render = function (series) {
            var direction = '';
            var startPoint = 'M';
            var prevPoint = null;
            var pathOptions;
            var lineLength;
            var point1;
            var point2;
            var visiblePoints = this.improveChartPerformance(series);
            if (series.xAxis.valueType === 'Category' && series.xAxis.labelPlacement === 'BetweenTicks') {
                lineLength = 0.5;
            }
            else {
                lineLength = 0;
            }
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    if (prevPoint != null) {
                        point2 = helper_1.getPoint(point.xValue, point.yValue, series);
                        point1 = helper_1.getPoint(prevPoint.xValue, prevPoint.yValue, series);
                        direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' + 'L' + ' ' +
                            (point2.x) + ' ' + (point1.y) + 'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                        startPoint = 'L';
                    }
                    else {
                        point1 = helper_1.getPoint(point.xValue - lineLength, point.yValue, series);
                        direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                        startPoint = 'L';
                    }
                    point.symbolLocation = helper_1.getPoint(point.xValue, point.yValue, series);
                    prevPoint = point;
                    point.region = new helper_1.Rect(point.symbolLocation.x - series.marker.width, point.symbolLocation.y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height);
                }
                else {
                    prevPoint = null;
                    startPoint = 'M';
                }
            }
            point1 = helper_1.getPoint((visiblePoints[visiblePoints.length - 1].xValue + lineLength), visiblePoints[visiblePoints.length - 1].yValue, series);
            direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
            pathOptions = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
            this.appendLinePath(pathOptions, series);
            this.renderMarker(series);
        };
        StepLineSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        StepLineSeries.prototype.destroy = function (chart) {
        };
        StepLineSeries.prototype.getModuleName = function () {
            return 'StepLineSeries';
        };
        return StepLineSeries;
    }(line_base_1.LineBase));
    exports.StepLineSeries = StepLineSeries;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Crosshair = (function () {
        function Crosshair(chart) {
            this.arrowLocation = new helper_1.ChartLocation(0, 0);
            this.rx = 2;
            this.ry = 2;
            this.chart = chart;
            this.elementID = this.chart.element.id;
        }
        Crosshair.prototype.crosshair = function () {
            var chart = this.chart;
            var horizontalCross = '';
            var verticalCross = '';
            var options;
            var crosshair = chart.crosshair;
            var chartRect = chart.chartAxisLayoutPanel.seriesClipRect;
            var crossGroup = document.getElementById(this.elementID + '_UserInteraction');
            this.stopAnimation();
            if (chart.tooltip.enable && !helper_1.withInBounds(chart.tooltipModule.valueX, chart.tooltipModule.valueY, chartRect)) {
                return null;
            }
            this.valueX = chart.tooltip.enable ? chart.tooltipModule.valueX : chart.mouseX;
            this.valueY = chart.tooltip.enable ? chart.tooltipModule.valueY : chart.mouseY;
            crossGroup.setAttribute('opacity', '1');
            if (crosshair.lineType === 'Both' || crosshair.lineType === 'Horizontal') {
                horizontalCross += 'M ' + chartRect.x + ' ' + this.valueY +
                    ' L ' + (chartRect.x + chartRect.width) + ' ' + this.valueY;
            }
            if (crosshair.lineType === 'Both' || crosshair.lineType === 'Vertical') {
                verticalCross += 'M ' + this.valueX + ' ' + chartRect.y +
                    ' L ' + this.valueX + ' ' + (chartRect.y + chartRect.height);
            }
            if (crossGroup.childNodes.length === 0) {
                var axisTooltipGroup = chart.renderer.createGroup({ 'id': this.elementID + '_crosshair_axis' });
                options = new helper_1.PathOption(this.elementID + '_HorizontalLine', 'none', crosshair.line.width, crosshair.line.color, 1, null, horizontalCross);
                this.renderCrosshairLine(options, crossGroup);
                options.d = verticalCross;
                options.id = this.elementID + '_VerticalLine';
                this.renderCrosshairLine(options, crossGroup);
                crossGroup.appendChild(axisTooltipGroup);
                this.renderAxisTooltip(chart, chartRect, crossGroup.lastChild);
            }
            else {
                document.getElementById(this.elementID + '_HorizontalLine').setAttribute('d', horizontalCross);
                document.getElementById(this.elementID + '_VerticalLine').setAttribute('d', verticalCross);
                this.renderAxisTooltip(chart, chartRect, crossGroup.lastChild);
            }
        };
        Crosshair.prototype.renderCrosshairLine = function (options, crossGroup) {
            var htmlObject = this.chart.renderer.drawPath(options);
            crossGroup.appendChild(htmlObject);
        };
        Crosshair.prototype.renderAxisTooltip = function (chart, chartRect, axisGroup) {
            var axis;
            var text;
            var rect;
            var pathElement;
            var textElem;
            var options;
            var padding = 5;
            var direction;
            for (var k = 0, length_1 = chart.axisCollections.length; k < length_1; k++) {
                axis = chart.axisCollections[k];
                if (axis.crosshairTooltip.enable) {
                    if ((this.valueX <= (axis.rect.x + axis.rect.width) && axis.rect.x <= this.valueX) ||
                        (this.valueY <= (axis.rect.y + axis.rect.height) && axis.rect.y <= this.valueY)) {
                        pathElement = document.getElementById(this.elementID + '_axis_tooltip_' + k);
                        textElem = document.getElementById(this.elementID + '_axis_tooltip_text_' + k);
                        text = this.getAxisText(axis);
                        if (!text) {
                            continue;
                        }
                        rect = this.tooltipLocation(text, axis, chartRect);
                        if (pathElement === null) {
                            pathElement = chart.renderer.drawPath({
                                'id': this.elementID + '_axis_tooltip_' + k,
                                'fill': axis.crosshairTooltip.fill
                            });
                            axisGroup.appendChild(pathElement);
                            options = new helper_1.TextOption(this.elementID + '_axis_tooltip_text_' + k, 0, 0, 'start', text);
                            textElem = helper_1.textElement(options, axis.crosshairTooltip.textStyle, axis.crosshairTooltip.textStyle.color, axisGroup);
                        }
                        direction = helper_1.findDirection(this.rx, this.ry, rect, this.arrowLocation, 10, this.isTop, this.isBottom, this.isLeft, this.valueX, this.valueY);
                        pathElement.setAttribute('d', direction);
                        textElem.textContent = text;
                        textElem.setAttribute('x', (rect.x + padding).toString());
                        textElem.setAttribute('y', (rect.y + padding + 3 * this.elementSize.height / 4).toString());
                    }
                    else {
                        pathElement = document.getElementById(this.elementID + '_axis_tooltip_' + k);
                        textElem = document.getElementById(this.elementID + '_axis_tooltip_text_' + k);
                        if (pathElement !== null) {
                            pathElement.remove();
                            textElem.remove();
                        }
                    }
                }
            }
        };
        Crosshair.prototype.getAxisText = function (axis) {
            var value;
            this.isBottom = false;
            this.isTop = false;
            this.isLeft = false;
            this.isRight = false;
            var labelValue = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks')
                ? 0.5 : 0;
            if (axis.orientation === 'Horizontal') {
                value = helper_1.getValueXByPoint(Math.abs(this.valueX - axis.rect.x), axis.rect.width, axis) + labelValue;
                this.isBottom = !axis.opposedPosition;
                this.isTop = axis.opposedPosition;
            }
            else {
                value = helper_1.getValueYByPoint(Math.abs(this.valueY - axis.rect.y), axis.rect.height, axis) + labelValue;
                this.isRight = axis.opposedPosition;
                this.isLeft = !axis.opposedPosition;
            }
            if (axis.valueType === 'DateTime') {
                return axis.format(new Date(value));
            }
            else if (axis.valueType === 'Category') {
                return axis.labels[Math.floor(value)];
            }
            else if (axis.valueType === 'Logarithmic') {
                return value = axis.format(Math.pow(axis.logBase, value));
            }
            else {
                var customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
                return customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(value)) : axis.format(value);
            }
        };
        Crosshair.prototype.tooltipLocation = function (text, axis, bounds) {
            var isBottom = false;
            var isLeft = false;
            var padding = 5;
            var arrowPadding = 10;
            var tooltipRect;
            var boundsX = bounds.x;
            var boundsY = bounds.y;
            this.elementSize = helper_1.measureText(text, axis.crosshairTooltip.textStyle);
            if (axis.orientation === 'Horizontal') {
                this.arrowLocation = new helper_1.ChartLocation(this.valueX, axis.rect.y);
                tooltipRect = new helper_1.Rect((this.valueX - (this.elementSize.width / 2) - padding), axis.rect.y + arrowPadding, this.elementSize.width + padding * 2, this.elementSize.height + padding * 2);
                if (axis.opposedPosition) {
                    tooltipRect.y = axis.rect.y - (this.elementSize.height + padding * 2 + arrowPadding);
                }
                if (tooltipRect.x < boundsX) {
                    tooltipRect.x = boundsX;
                }
                if (tooltipRect.x + tooltipRect.width > boundsX + bounds.width) {
                    tooltipRect.x -= ((tooltipRect.x + tooltipRect.width) - (boundsX + bounds.width));
                }
                if (this.arrowLocation.x + arrowPadding / 2 > tooltipRect.x + tooltipRect.width - this.rx) {
                    this.arrowLocation.x = tooltipRect.x + tooltipRect.width - this.rx - arrowPadding / 2;
                }
                if (this.arrowLocation.x - arrowPadding / 2 < tooltipRect.x + this.rx) {
                    this.arrowLocation.x = tooltipRect.x + this.rx + arrowPadding / 2;
                }
            }
            else {
                this.arrowLocation = new helper_1.ChartLocation(axis.rect.x, this.valueY);
                tooltipRect = new helper_1.Rect(axis.rect.x - (this.elementSize.width) - (padding * 2 + arrowPadding), this.valueY - (this.elementSize.height / 2) - padding, this.elementSize.width + (padding * 2), this.elementSize.height + padding * 2);
                if (axis.opposedPosition) {
                    tooltipRect.x = axis.rect.x + arrowPadding;
                    if ((tooltipRect.x + tooltipRect.width) > this.chart.availableSize.width) {
                        this.arrowLocation.x -= ((tooltipRect.x + tooltipRect.width) - this.chart.availableSize.width);
                        tooltipRect.x -= ((tooltipRect.x + tooltipRect.width) - this.chart.availableSize.width);
                    }
                }
                else {
                    if (tooltipRect.x < 0) {
                        this.arrowLocation.x -= tooltipRect.x;
                        tooltipRect.x = 0;
                    }
                }
                if (tooltipRect.y < boundsY) {
                    tooltipRect.y = boundsY;
                }
                if (tooltipRect.y + tooltipRect.height >= boundsY + bounds.height) {
                    tooltipRect.y -= ((tooltipRect.y + tooltipRect.height) - (boundsY + bounds.height));
                }
                if (this.arrowLocation.y + arrowPadding / 2 > tooltipRect.y + tooltipRect.height - this.ry) {
                    this.arrowLocation.y = tooltipRect.y + tooltipRect.height - this.ry - arrowPadding / 2;
                }
                if (this.arrowLocation.y - arrowPadding / 2 < tooltipRect.y + this.ry) {
                    this.arrowLocation.y = tooltipRect.y + this.ry + arrowPadding / 2;
                }
            }
            return tooltipRect;
        };
        Crosshair.prototype.stopAnimation = function () {
            helper_1.stopTimer(this.crosshairInterval);
        };
        Crosshair.prototype.removeCrosshair = function () {
            var chart = this.chart;
            var crosshair = document.getElementById(this.elementID + '_UserInteraction');
            this.stopAnimation();
            if (crosshair && crosshair.getAttribute('opacity') !== '0') {
                this.crosshairInterval = setTimeout(function () {
                    new ej2_base_1.Animation({}).animate(crosshair, {
                        duration: 200,
                        progress: function (args) {
                            crosshair.style.animation = '';
                            crosshair.setAttribute('opacity', (1 - (args.timeStamp / args.duration)).toString());
                        },
                        end: function (model) {
                            crosshair.setAttribute('opacity', '0');
                            chart.startMove = false;
                            if (chart.tooltipModule) {
                                chart.tooltipModule.valueX = null;
                                chart.tooltipModule.valueY = null;
                            }
                        }
                    });
                }, 2000);
            }
        };
        Crosshair.prototype.getModuleName = function () {
            return 'Crosshair';
        };
        Crosshair.prototype.destroy = function (chart) {
        };
        return Crosshair;
    }());
    exports.Crosshair = Crosshair;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(10), __webpack_require__(5), __webpack_require__(2), __webpack_require__(0), __webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, dom_1, util_1, ej2_base_1, helper_1, helper_2, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Tooltip = (function () {
        function Tooltip(chart) {
            this.padding = 5;
            this.arrowPadding = 10;
            this.rx = 2;
            this.ry = 2;
            this.chart = chart;
            this.element = this.chart.element;
            this.textStyle = chart.tooltip.textStyle;
        }
        Tooltip.prototype.tooltip = function () {
            var isTooltip = this.getElement(this.element.id + '_tooltip');
            var tooltipDiv;
            var chart = this.chart;
            this.textCollection = [];
            this.updateTemplateFn(chart);
            if (!isTooltip) {
                tooltipDiv = this.createElement(chart);
            }
            if (!chart.tooltip.shared) {
                this.renderSeriesTooltip(chart, !isTooltip, tooltipDiv);
            }
            else {
                this.renderGroupedTooltip(chart, !isTooltip, tooltipDiv);
            }
        };
        Tooltip.prototype.createElement = function (chart) {
            this.textElements = [];
            var tooltipDiv = document.createElement('div');
            tooltipDiv.id = this.element.id + '_tooltip';
            tooltipDiv.className = 'ejTooltip' + this.element.id;
            tooltipDiv.setAttribute('style', 'pointer-events:none; position:absolute;z-index: 1');
            if (!chart.tooltip.template || chart.tooltip.shared) {
                var svgObject = chart.renderer.createSvg({ id: this.element.id + '_tooltip_svg' });
                tooltipDiv.appendChild(svgObject);
                var groupElement = chart.renderer.createGroup({ id: this.element.id + '_tooltip_group' });
                svgObject.appendChild(groupElement);
                var pathElement = chart.renderer.drawPath({
                    'id': this.element.id + '_tooltip_path', 'stroke-width': 1,
                    'fill': chart.tooltip.fill
                });
                groupElement.appendChild(pathElement);
            }
            return tooltipDiv;
        };
        Tooltip.prototype.getElement = function (id) {
            return document.getElementById(id);
        };
        Tooltip.prototype.renderPoint = function (point, isFirst, fill) {
            var argsData = {
                cancel: false, name: constants_1.tooltipRender, textCollections: this.getTooltipText(point),
                point: point.point, series: point.series, textStyle: this.textStyle
            };
            this.chart.trigger(constants_1.tooltipRender, argsData);
            if (!argsData.cancel) {
                this.renderText(argsData.textCollections, argsData.textStyle, fill, isFirst);
            }
            return !argsData.cancel;
        };
        Tooltip.prototype.removeText = function () {
            this.textElements = [];
            var element = this.getElement(this.element.id + '_tooltip_group');
            if (element.childNodes.length > 0) {
                while (element.lastChild && element.childNodes.length !== 1) {
                    element.removeChild(element.lastChild);
                }
            }
        };
        Tooltip.prototype.renderSeriesTooltip = function (chart, isFirst, tooltipDiv) {
            var data = this.getData(chart);
            if (data.point && data.series.enableTooltip) {
                if (!chart.storedPoints[0] || (chart.storedPoints[0].point !== data.point)) {
                    this.stopAnimation();
                    if (isFirst) {
                        document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                    }
                    if (!chart.tooltip.template) {
                        if (this.renderPoint(data, isFirst, this.textStyle.color || '#212121')) {
                            this.removeHighlight(chart);
                            this.chart.storedPoints.push(data);
                            this.highlightPoints(data);
                            this.renderTooltip(chart, data, isFirst);
                        }
                        else {
                            this.removeHighlight(chart);
                            this.getElement(this.element.id + '_tooltip').remove();
                        }
                    }
                    else {
                        this.removeHighlight(chart);
                        this.chart.storedPoints.push(data);
                        this.createTemplate(chart, data, this.getElement(this.element.id + '_tooltip'), isFirst);
                    }
                    this.isRemove = true;
                }
            }
            else {
                if (!data.point && this.isRemove) {
                    this.removeTooltip(null);
                    this.isRemove = false;
                }
                else {
                    for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                        var series = _a[_i];
                        if (series.visible) {
                            data = this.getClosestX(chart, series) || data;
                        }
                    }
                }
            }
            if (data && data.point) {
                this.findMouseValue(data, chart);
            }
        };
        Tooltip.prototype.updateTemplateFn = function (chart) {
            if (chart.tooltip.template) {
                var e = void 0;
                try {
                    if (document.querySelectorAll(chart.tooltip.template).length) {
                        this.templateFn = ej2_base_1.compile(document.querySelector(chart.tooltip.template).innerHTML.trim());
                    }
                }
                catch (e) {
                    this.templateFn = ej2_base_1.compile(chart.tooltip.template);
                }
            }
        };
        Tooltip.prototype.createTemplate = function (chart, data, parent, isFirst) {
            this.highlightPoints(data);
            var argsData = { cancel: false, name: constants_1.tooltipRender, point: data.point, series: data.series, };
            this.chart.trigger(constants_1.tooltipRender, argsData);
            var firstElement = this.getElement(this.element.id + '_tooltip').firstChild;
            if (firstElement) {
                firstElement.remove();
            }
            if (!argsData.cancel) {
                var elem = dom_1.createElement('div', {
                    innerHTML: this.templateFn(util_1.extend({}, data.point))
                });
                parent.appendChild(elem);
                var rect = parent.getBoundingClientRect();
                this.padding = 0;
                this.elementSize = new helper_1.Size(rect.width, rect.height);
                var tooltipRect = this.seriesTooltipLocation(data, new helper_1.ChartLocation(0, 0), new helper_1.ChartLocation(0, 0));
                if (chart.tooltip.enableAnimation && !chart.tooltip.shared && !isFirst && !this.isComplete) {
                    this.animateTooltipDiv(parent, tooltipRect);
                }
                else {
                    this.updateDiv(parent, tooltipRect.x, tooltipRect.y);
                }
                this.isComplete = false;
            }
            else {
                this.removeHighlight(chart);
                this.getElement(this.element.id + '_tooltip').remove();
            }
        };
        Tooltip.prototype.findMouseValue = function (data, chart) {
            if (!chart.requireInvertedAxis) {
                this.valueX = helper_2.valueToCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                    + data.series.xAxis.rect.x;
                this.valueY = chart.mouseY;
            }
            else {
                this.valueY = (1 - helper_2.valueToCoefficient(data.point.xValue, data.series.xAxis)) * data.series.xAxis.rect.height
                    + data.series.xAxis.rect.y;
                this.valueX = chart.mouseX;
            }
        };
        Tooltip.prototype.renderGroupedTooltip = function (chart, isFirst, tooltipDiv) {
            var data;
            var height = 0;
            var width = 0;
            this.stopAnimation();
            this.removeHighlight(chart);
            chart.storedPoints = [];
            if (isFirst) {
                document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
            }
            this.removeText();
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible) {
                    data = this.getClosestX(chart, series);
                }
                if (data && this.renderPoint(data, true, this.textStyle.color || data.point.color)) {
                    this.highlightPoints(data);
                    this.findMouseValue(data, chart);
                    this.chart.storedPoints.push(data);
                    height += (this.elementSize.height + this.padding);
                    width = Math.max(width, this.elementSize.width);
                    data = null;
                }
            }
            height -= this.padding;
            this.elementSize = new helper_1.Size(width, height);
            if (chart.storedPoints.length > 0) {
                this.renderTooltip(chart, chart.storedPoints[0], isFirst);
            }
            else {
                this.getElement(this.element.id + '_tooltip_path').setAttribute('d', '');
            }
        };
        Tooltip.prototype.renderTooltip = function (chart, pointData, isFirst) {
            var tooltipDiv = this.getElement(this.element.id + '_tooltip');
            var arrowLocation = new helper_1.ChartLocation(0, 0);
            var tipLocation = new helper_1.ChartLocation(0, 0);
            var textHeights;
            var svgObject = this.getElement(this.element.id + '_tooltip_svg');
            var groupElement = this.getElement(this.element.id + '_tooltip_group');
            var pathElement = this.getElement(this.element.id + '_tooltip_path');
            var rect;
            var inverted = chart.requireInvertedAxis;
            var isTop = false;
            var isLeft = false;
            var isBottom = false;
            var x = 0;
            var y = 0;
            if (chart.storedPoints.length > 1) {
                this.arrowPadding = 0;
                rect = this.sharedTooltipLocation(chart.chartAxisLayoutPanel.seriesClipRect, this.valueX, this.valueY);
                isTop = true;
            }
            else {
                var series = pointData.series;
                var point = pointData.point;
                this.arrowPadding = 10;
                rect = this.seriesTooltipLocation(pointData, arrowLocation, tipLocation);
                if (!inverted) {
                    isTop = (rect.y < (pointData.point.symbolLocation.y + series.clipRect.y));
                    isBottom = !isTop;
                    y = (isTop ? 0 : this.arrowPadding);
                }
                else {
                    isLeft = (rect.x < (pointData.point.symbolLocation.x + series.clipRect.x));
                    x = (isLeft ? 0 : this.arrowPadding);
                }
            }
            var start = chart.tooltip.border.width / 2;
            var pointRect = new helper_1.Rect(start + x, start + y, rect.width - start, rect.height - start);
            groupElement.setAttribute('opacity', '1');
            if (chart.tooltip.enableAnimation && !chart.tooltip.shared && !isFirst && !this.isComplete) {
                this.animateTooltipDiv(tooltipDiv, rect);
            }
            else {
                this.updateDiv(tooltipDiv, rect.x, rect.y);
            }
            this.isComplete = false;
            svgObject.setAttribute('height', (rect.height + chart.tooltip.border.width + (inverted ? 0 : this.arrowPadding)).toString());
            svgObject.setAttribute('width', (rect.width + chart.tooltip.border.width + (!inverted ? 0 : this.arrowPadding)).toString());
            pathElement.setAttribute('d', helper_2.findDirection(this.rx, this.ry, pointRect, arrowLocation, this.arrowPadding, isTop, isBottom, isLeft, tipLocation.x, tipLocation.y));
            pathElement.setAttribute('stroke', chart.tooltip.border.color ||
                (chart.tooltip.shared ? 'black' : pointData.point.color || pointData.series.interior));
            this.changeText(new helper_1.ChartLocation(x, y));
        };
        Tooltip.prototype.sharedTooltipLocation = function (bounds, x, y) {
            var width = this.elementSize.width + (2 * this.padding);
            var height = this.elementSize.height + (2 * this.padding);
            var tooltipRect = new helper_1.Rect(x + 2 * this.padding, y - height - this.padding, width, height);
            if (tooltipRect.y < bounds.y) {
                tooltipRect.y += (tooltipRect.height + 2 * this.padding);
            }
            if (tooltipRect.x + tooltipRect.width > bounds.x + bounds.width) {
                tooltipRect.x -= (tooltipRect.width + 4 * this.padding);
            }
            return tooltipRect;
        };
        Tooltip.prototype.seriesTooltipLocation = function (pointData, arrowLocation, tipLocation) {
            var symbolLocation = pointData.point.symbolLocation;
            var location = new helper_1.ChartLocation(symbolLocation.x, symbolLocation.y);
            var width = this.elementSize.width + (2 * this.padding);
            var height = this.elementSize.height + (2 * this.padding);
            var bounds = this.chart.chartAxisLayoutPanel.seriesClipRect;
            var series = pointData.series;
            var markerHeight = (series.isRectSeries || (!series.marker.visible && series.type !== 'Scatter')) ? 0 :
                ((series.marker.height + 2) / 2 + (2 * series.marker.border.width));
            var clipX = series.clipRect.x;
            var clipY = series.clipRect.y;
            var boundsX = bounds.x;
            var boundsY = bounds.y;
            if (!this.chart.requireInvertedAxis) {
                location = new helper_1.ChartLocation(location.x + clipX - this.elementSize.width / 2 - this.padding, location.y + clipY - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight);
                arrowLocation.x = tipLocation.x = width / 2;
                if (location.y < boundsY || (series.isRectSeries && pointData.point.y < 0)) {
                    location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + clipY + markerHeight;
                }
                if (location.y + height + this.arrowPadding > boundsY + bounds.height) {
                    location.y = (symbolLocation.y > bounds.height ? bounds.height : symbolLocation.y)
                        + clipY - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight;
                }
                tipLocation.x = width / 2;
                if (location.x < boundsX) {
                    arrowLocation.x -= (boundsX - location.x);
                    tipLocation.x -= (boundsX - location.x);
                    location.x = boundsX;
                }
                if (location.x + width > boundsX + bounds.width) {
                    arrowLocation.x += ((location.x + width) - (boundsX + bounds.width));
                    tipLocation.x += ((location.x + width) - (boundsX + bounds.width));
                    location.x -= ((location.x + width) - (boundsX + bounds.width));
                }
                if (arrowLocation.x + this.arrowPadding / 2 > width - this.rx) {
                    arrowLocation.x = width - this.rx - this.arrowPadding / 2;
                    tipLocation.x = width;
                }
                if (arrowLocation.x - this.arrowPadding / 2 < this.rx) {
                    arrowLocation.x = this.rx + this.arrowPadding / 2;
                    tipLocation.x = 0;
                }
            }
            else {
                location = new helper_1.ChartLocation(location.x + clipX + markerHeight, location.y + clipY - this.elementSize.height / 2 - (this.padding));
                arrowLocation.y = tipLocation.y = height / 2;
                if ((location.x + width + this.arrowPadding > boundsX + bounds.width) || (series.isRectSeries && pointData.point.y < 0)) {
                    location.x = (symbolLocation.x > bounds.width ? bounds.width : symbolLocation.x)
                        + clipX - markerHeight - (width + this.arrowPadding);
                }
                if (location.x < boundsX) {
                    location.x = (symbolLocation.x < 0 ? 0 : symbolLocation.x) + clipX + markerHeight;
                }
                if (location.y <= boundsY) {
                    arrowLocation.y -= (boundsY - location.y);
                    tipLocation.y -= (boundsY - location.y);
                    location.y = boundsY;
                }
                if (location.y + height >= boundsY + bounds.height) {
                    arrowLocation.y += ((location.y + height) - (boundsY + bounds.height));
                    tipLocation.y += ((location.y + height) - (boundsY + bounds.height));
                    location.y -= ((location.y + height) - (boundsY + bounds.height));
                }
                if (arrowLocation.y + this.arrowPadding / 2 > height - this.ry) {
                    arrowLocation.y = height - this.ry - this.arrowPadding / 2;
                    tipLocation.y = height;
                }
                if (arrowLocation.y - this.arrowPadding / 2 < this.ry) {
                    arrowLocation.y = this.ry + this.arrowPadding / 2;
                    tipLocation.y = 0;
                }
            }
            return new helper_1.Rect(location.x, location.y, width, height);
        };
        Tooltip.prototype.getClosestX = function (chart, series) {
            var value;
            var rect = series.clipRect;
            if (!this.chart.requireInvertedAxis) {
                value = helper_2.getValueXByPoint(Math.abs(chart.mouseX - rect.x), rect.width, series.xAxis);
            }
            else {
                value = helper_2.getValueYByPoint(Math.abs(chart.mouseY - rect.y), rect.height, series.xAxis);
            }
            var closest = this.getClosest(series, value);
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (closest === point.xValue && point.visible) {
                    return new helper_1.PointData(point, series);
                }
            }
            return null;
        };
        Tooltip.prototype.getClosest = function (series, value) {
            var xData = series.xData;
            var closest;
            if (value >= series.xMin - 0.5 && value <= series.xMax + 0.5) {
                for (var _i = 0, xData_1 = xData; _i < xData_1.length; _i++) {
                    var data = xData_1[_i];
                    if (closest == null || Math.abs(data - value) < Math.abs(closest - value)) {
                        closest = data;
                    }
                }
            }
            return closest;
        };
        Tooltip.prototype.removeHighlight = function (chart, removeRect) {
            if (removeRect === void 0) { removeRect = false; }
            for (var _i = 0, _a = chart.storedPoints; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.isRemove) {
                    if (item.series.isRectSeries) {
                        this.highlightPoint(item.series, item.point.index, false);
                        continue;
                    }
                    helper_2.removeElement(this.element.id + '_Series_' + item.series.index +
                        '_Point_' + item.point.index + '_Trackball');
                    item.isRemove = false;
                }
            }
            chart.storedPoints = [];
        };
        Tooltip.prototype.highlightPoints = function (item) {
            if (item.series.isRectSeries) {
                this.highlightPoint(item.series, item.point.index, true);
                return null;
            }
            this.drawTrackBall(item);
        };
        Tooltip.prototype.drawTrackBall = function (pointData) {
            var series = pointData.series;
            var element = (series.type === 'Scatter') ? series.seriesElement : series.symbolElement;
            if (!series.marker.visible && series.type !== 'Scatter' && pointData.point.symbolLocation) {
                return null;
            }
            var point = pointData.point;
            var marker = series.marker;
            var shape = marker.shape;
            var symbolId = this.element.id + '_Series_' + series.index + '_Point_' + point.index + '_Trackball';
            var size = new helper_1.Size(marker.width + 5, marker.height + 5);
            var options = new helper_2.PathOption(symbolId, marker.fill ? marker.fill : point.color, marker.border.width, marker.border.color, marker.opacity / 4, null, null);
            var symbol = helper_2.drawSymbol(point.symbolLocation, shape, size, null, options, '');
            symbol.setAttribute('style', 'pointer-events:none');
            element.appendChild(symbol);
        };
        Tooltip.prototype.highlightPoint = function (series, pointIndex, highlight) {
            var element = this.getElement(this.element.id + '_Series_' + series.index + '_Point_' + pointIndex);
            element.setAttribute('opacity', (highlight ? series.opacity / 2 : series.opacity).toString());
        };
        Tooltip.prototype.getTooltipText = function (pointData) {
            var series = pointData.series;
            var format = this.getFormat(this.chart);
            var separators = ['<br/>', '<br />', '<br>'];
            var labels;
            return this.parseTemplate(pointData, format, series.xAxis, series.yAxis).split(new RegExp(separators.join('|'), 'g'));
        };
        Tooltip.prototype.renderText = function (formatText, style, color, isRender) {
            var height = 0;
            var width = 0;
            var size;
            var options;
            var groupElement = this.getElement(this.element.id + '_tooltip_group');
            for (var k = 0, pointsLength = formatText.length; k < pointsLength; k++) {
                size = helper_1.measureText(formatText[k], style);
                height += size.height;
                width = Math.max(width, size.width);
                if (isRender) {
                    options = new helper_1.TextOption(this.element.id + '_tooltip_text_series_' + k, this.padding, 0, 'start', formatText[k]);
                    this.textElements.push(helper_1.textElement(options, style, color, groupElement));
                }
                this.textCollection.push(new helper_2.TextCollection(formatText[k], size.width, size.height));
                height += this.padding;
            }
            height -= this.padding;
            this.elementSize = new helper_1.Size(width, height);
        };
        Tooltip.prototype.changeText = function (point) {
            point.y += this.padding;
            point.x += this.padding;
            for (var k = 0, length_1 = this.textCollection.length; k < length_1; k++) {
                if (this.textElements[k]) {
                    point.y += (k === 0 ? (3 * this.textCollection[k].height / 4) : this.textCollection[k].height);
                    this.textElements[k].setAttribute('y', point.y.toString());
                    this.textElements[k].setAttribute('x', point.x.toString());
                    this.textElements[k].textContent = this.textCollection[k].text;
                    point.y += this.padding;
                }
            }
        };
        Tooltip.prototype.parseTemplate = function (pointData, format, xAxis, yAxis) {
            var val;
            var textValue;
            var xFormat;
            var customLabelFormat;
            var chart = this.chart;
            for (var _i = 0, _a = Object.keys(pointData.point); _i < _a.length; _i++) {
                var dataValue = _a[_i];
                val = new RegExp('${point' + '.' + dataValue + '}', 'gm');
                if (xAxis.valueType !== 'Category' && val.source === '${point.x}') {
                    customLabelFormat = xAxis.labelFormat && xAxis.labelFormat.match('{value}') !== null;
                    textValue = customLabelFormat ? xAxis.labelFormat.replace('{value}', xAxis.format(pointData.point[dataValue])) :
                        xAxis.format(pointData.point[dataValue]);
                }
                else if (val.source === '${point.y}') {
                    customLabelFormat = yAxis.labelFormat && yAxis.labelFormat.match('{value}') !== null;
                    textValue = customLabelFormat ? yAxis.labelFormat.replace('{value}', yAxis.format(pointData.point[dataValue])) :
                        yAxis.format(pointData.point[dataValue]);
                }
                else {
                    textValue = pointData.point[dataValue];
                }
                format = format.replace(val.source, textValue);
            }
            for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(pointData.series)); _b < _c.length; _b++) {
                var dataValue = _c[_b];
                val = new RegExp('${series' + '.' + dataValue + '}', 'gm');
                textValue = pointData.series[dataValue];
                format = format.replace(val.source, textValue);
            }
            return format;
        };
        Tooltip.prototype.getFormat = function (chart) {
            if (!chart.tooltip.format) {
                return '${point.x} : ${point.y}';
            }
            return chart.tooltip.format;
        };
        Tooltip.prototype.stopAnimation = function () {
            helper_1.stopTimer(this.toolTipInterval);
        };
        Tooltip.prototype.removeTooltip = function (isRemove) {
            var _this = this;
            var chart = this.chart;
            var tooltipElement = this.getElement(this.element.id + '_tooltip');
            this.stopAnimation();
            if (tooltipElement && chart.storedPoints.length > 0) {
                this.toolTipInterval = setTimeout(function () {
                    if (chart.storedPoints.length > 0) {
                        var series_1 = chart.storedPoints[0].series;
                        var tooltipGroup_1 = _this.getElement(chart.element.id + '_tooltip_group')
                            || tooltipElement.firstChild;
                        var opacity_1 = parseFloat(tooltipGroup_1.getAttribute('opacity')) || 1;
                        var element_1 = _this.getElement(chart.element.id + '_Series_' + chart.storedPoints[0].series.index
                            + '_Point_' + chart.storedPoints[0].point.index);
                        var rectOpacity_1;
                        if (element_1 && series_1.isRectSeries && !chart.tooltip.shared) {
                            rectOpacity_1 = parseFloat(element_1.getAttribute('opacity'));
                        }
                        new ej2_base_1.Animation({}).animate(tooltipGroup_1, {
                            duration: 200,
                            progress: function (args) {
                                tooltipGroup_1.style.animation = '';
                                tooltipGroup_1.setAttribute('opacity', (opacity_1 - (args.timeStamp / args.duration)).toString());
                                if (element_1 && series_1.isRectSeries && !chart.tooltip.shared) {
                                    element_1.setAttribute('opacity', (rectOpacity_1 + (rectOpacity_1 * (args.timeStamp / args.duration))).toString());
                                }
                            },
                            end: function (model) {
                                _this.valueX = null;
                                _this.valueY = null;
                                if (element_1 && series_1.isRectSeries && !chart.tooltip.shared) {
                                    element_1.setAttribute('opacity', series_1.opacity.toString());
                                }
                                _this.removeHighlight(chart, chart.tooltip.shared);
                                if (isRemove) {
                                    tooltipElement.outerHTML = '';
                                    chart.storedPoints = [];
                                }
                                tooltipGroup_1.setAttribute('opacity', '0');
                                if (chart.tooltip.template && !chart.tooltip.shared) {
                                    tooltipGroup_1.style.display = 'none';
                                }
                                chart.trigger('animationComplete', {});
                                _this.isComplete = true;
                            }
                        });
                    }
                }, 2000);
            }
        };
        Tooltip.prototype.animateTooltipDiv = function (tooltipDiv, rect) {
            var _this = this;
            var x = parseFloat(tooltipDiv.style.left);
            var y = parseFloat(tooltipDiv.style.top);
            var currenDiff;
            new ej2_base_1.Animation({}).animate(tooltipDiv, {
                duration: 300,
                progress: function (args) {
                    currenDiff = (args.timeStamp / args.duration);
                    tooltipDiv.style.left = (x + currenDiff * (rect.x - x)) + 'px';
                    tooltipDiv.style.top = (y + currenDiff * (rect.y - y)) + 'px';
                },
                end: function (model) {
                    _this.updateDiv(tooltipDiv, rect.x, rect.y);
                }
            });
        };
        Tooltip.prototype.updateDiv = function (tooltipDiv, x, y) {
            tooltipDiv.style.left = x + 'px';
            tooltipDiv.style.top = y + 'px';
        };
        Tooltip.prototype.getData = function (chart) {
            var point = null;
            var series = null;
            var width;
            var height;
            for (var len = chart.visibleSeries.length, i = len - 1; i >= 0; i--) {
                series = chart.visibleSeries[i];
                width = (series.type === 'Scatter' || (!series.isRectSeries && series.marker.visible)) ? (series.marker.height + 5) / 2 : 0;
                height = (series.type === 'Scatter' || (!series.isRectSeries && series.marker.visible)) ? (series.marker.width + 5) / 2 : 0;
                if (series.visible && helper_1.withInBounds(chart.mouseX, chart.mouseY, series.clipRect, width, height)) {
                    if (chart.areaType === 'None') {
                        point = null;
                    }
                    else {
                        point = this.getRectPoint(series, series.clipRect, chart.mouseX, chart.mouseY);
                    }
                }
                if (point) {
                    return new helper_1.PointData(point, series);
                }
            }
            return new helper_1.PointData(point, series);
        };
        Tooltip.prototype.getRectPoint = function (series, rect, x, y) {
            var currentRect;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.region) {
                    continue;
                }
                currentRect = new helper_1.Rect(rect.x + point.region.x, rect.y + point.region.y, point.region.width, point.region.height);
                if (helper_1.withInBounds(x, y, currentRect)) {
                    return point;
                }
            }
            return null;
        };
        Tooltip.prototype.getModuleName = function () {
            return 'Tooltip';
        };
        Tooltip.prototype.destroy = function (chart) {
        };
        return Tooltip;
    }());
    exports.Tooltip = Tooltip;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(0), __webpack_require__(77), __webpack_require__(11), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, helper_1, zooming_toolkit_1, theme_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Zoom = (function () {
        function Zoom(chart) {
            this.chart = chart;
            this.isDevice = ej2_base_1.Browser.isDevice;
            this.isPointer = ej2_base_1.Browser.isPointer;
            this.browserName = ej2_base_1.Browser.info.name;
            var zooming = chart.zoomSettings;
            this.toolkit = new zooming_toolkit_1.Toolkit(chart);
            this.zooming = zooming;
            this.elementId = chart.element.id;
            this.zoomingRect = new helper_1.Rect(0, 0, 0, 0);
            this.zoomAxes = [];
        }
        Zoom.prototype.renderZooming = function (e, chart, isTouch) {
            this.calculateZoomAxesRange(chart, chart.axisCollections);
            if (this.zooming.enableSelectionZooming && (!isTouch
                || (chart.isDoubleTap && this.touchStartList.length === 1)) && (!this.isPanning || chart.isDoubleTap)) {
                this.isPanning = this.isDevice ? true : this.isPanning;
                this.drawZoomingRectangle(chart);
            }
            else if (this.isPanning && chart.isChartDrag) {
                if (!isTouch || (isTouch && this.touchStartList.length === 1)) {
                    this.pinchTarget = isTouch ? e.target : null;
                    this.doPan(chart, chart.axisCollections);
                }
            }
        };
        Zoom.prototype.drawZoomingRectangle = function (chart) {
            var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
            var startLocation = new helper_1.ChartLocation(chart.previousMouseMoveX, chart.previousMouseMoveY);
            var endLocation = new helper_1.ChartLocation(chart.mouseX, chart.mouseY);
            var rect = this.zoomingRect = helper_1.getRectLocation(startLocation, endLocation, areaBounds);
            if (rect.width > 0 && rect.height > 0) {
                this.isZoomed = true;
                chart.disableTrackTooltip = true;
                chart.svgObject.setAttribute('cursor', 'crosshair');
                if (this.zooming.mode === 'X') {
                    rect.height = areaBounds.height;
                    rect.y = areaBounds.y;
                }
                else if (this.zooming.mode === 'Y') {
                    rect.width = areaBounds.width;
                    rect.x = areaBounds.x;
                }
                chart.svgObject.appendChild(chart.renderer.drawRectangle(new helper_1.RectOption(this.elementId + '_ZoomArea', theme_1.Theme.selectionRectFill, { color: theme_1.Theme.selectionRectStroke, width: 1 }, 1, rect, 0, 0, '', '3')));
            }
        };
        Zoom.prototype.doPan = function (chart, axes) {
            var currentScale;
            var offset;
            this.isZoomed = true;
            var translateX;
            var translateY;
            this.offset = !chart.delayRedraw ? chart.chartAxisLayoutPanel.seriesClipRect : this.offset;
            chart.delayRedraw = true;
            chart.disableTrackTooltip = true;
            axes.forEach(function (axis) {
                currentScale = Math.max(1 / helper_1.minMax(axis.zoomFactor, 0, 1), 1);
                if (axis.orientation === 'Horizontal') {
                    offset = (chart.previousMouseMoveX - chart.mouseX) / axis.rect.width / currentScale;
                    axis.zoomPosition = helper_1.minMax(axis.zoomPosition + offset, 0, (1 - axis.zoomFactor));
                }
                else {
                    offset = (chart.previousMouseMoveY - chart.mouseY) / axis.rect.height / currentScale;
                    axis.zoomPosition = helper_1.minMax(axis.zoomPosition - offset, 0, (1 - axis.zoomFactor));
                }
            });
            if (this.zooming.enableDeferredZooming) {
                translateX = chart.mouseX - chart.mouseDownX;
                translateY = chart.mouseY - chart.mouseDownY;
                switch (this.zooming.mode) {
                    case 'X':
                        translateY = 0;
                        break;
                    case 'Y':
                        translateX = 0;
                        break;
                }
                this.setTransform(translateX, translateY, null, null, chart, false);
                this.refreshAxis(chart.chartAxisLayoutPanel, chart, chart.axisCollections);
            }
            else {
                this.performZoomRedraw(chart);
            }
            chart.previousMouseMoveX = chart.mouseX;
            chart.previousMouseMoveY = chart.mouseY;
        };
        Zoom.prototype.performZoomRedraw = function (chart) {
            var rect = this.zoomingRect;
            chart.animateSeries = false;
            if (this.isZoomed) {
                if (rect.width > 0 && rect.height > 0) {
                    chart.svgObject.setAttribute('cursor', 'auto');
                    this.doZoom(chart, chart.axisCollections, chart.chartAxisLayoutPanel.seriesClipRect);
                    chart.isDoubleTap = false;
                }
                else if (chart.disableTrackTooltip) {
                    chart.disableTrackTooltip = false;
                    chart.delayRedraw = false;
                    chart.removeSvg();
                    chart.refreshAxis();
                    chart.refreshBound();
                }
            }
        };
        Zoom.prototype.refreshAxis = function (layout, chart, axes) {
            var mode = chart.zoomSettings.mode;
            layout.measureAxis(new helper_1.Rect(chart.initialClipRect.x, chart.initialClipRect.y, chart.initialClipRect.width, chart.initialClipRect.height));
            axes.map(function (axis, index) {
                if (axis.orientation === 'Horizontal' && mode !== 'Y') {
                    layout.drawXAxisLabels(axis, index);
                }
                if (axis.orientation === 'Vertical' && mode !== 'X') {
                    layout.drawYAxisLabels(axis, index);
                }
            });
        };
        Zoom.prototype.doZoom = function (chart, axes, bounds) {
            var zoomRect = this.zoomingRect;
            var mode = this.zooming.mode;
            var argsData;
            var previousZF;
            var previousZP;
            var currentZF;
            var currentZP;
            axes.forEach(function (axis) {
                previousZF = currentZF = axis.zoomFactor;
                previousZP = currentZP = axis.zoomPosition;
                if (axis.orientation === 'Horizontal') {
                    if (mode !== 'Y') {
                        currentZP += Math.abs((zoomRect.x - bounds.x) / (bounds.width)) * axis.zoomFactor;
                        currentZF *= (zoomRect.width / bounds.width);
                    }
                }
                else {
                    if (mode !== 'X') {
                        currentZP += (1 - Math.abs((zoomRect.height + (zoomRect.y - bounds.y)) / (bounds.height))) * axis.zoomFactor;
                        currentZF *= (zoomRect.height / bounds.height);
                    }
                }
                argsData = {
                    cancel: false, name: constants_1.zoomComplete, axis: axis, previousZoomFactor: previousZF, previousZoomPosition: previousZP,
                    currentZoomFactor: currentZF, currentZoomPosition: currentZP
                };
                chart.trigger(constants_1.zoomComplete, argsData);
                if (!argsData.cancel) {
                    axis.zoomFactor = argsData.currentZoomFactor;
                    axis.zoomPosition = argsData.currentZoomPosition;
                }
            });
            this.zoomingRect = new helper_1.Rect(0, 0, 0, 0);
            this.performZoomRedraw(chart);
        };
        Zoom.prototype.performMouseWheelZooming = function (e, mouseX, mouseY, chart, axes) {
            var direction = (this.browserName === 'mozilla' && !this.isPointer) ?
                -(e.detail) / 3 > 0 ? 1 : -1 : (e.wheelDelta / 120) > 0 ? 1 : -1;
            var mode = this.zooming.mode;
            var origin = 0.5;
            var cumulative;
            var zoomFactor;
            var zoomPosition;
            this.isZoomed = true;
            this.calculateZoomAxesRange(chart, chart.axisCollections);
            chart.disableTrackTooltip = true;
            axes.forEach(function (axis) {
                if ((axis.orientation === 'Vertical' && mode !== 'X') ||
                    (axis.orientation === 'Horizontal' && mode !== 'Y')) {
                    cumulative = Math.max(Math.max(1 / helper_1.minMax(axis.zoomFactor, 0, 1), 1) + (0.25 * direction), 1);
                    if (cumulative >= 1) {
                        origin = axis.orientation === 'Horizontal' ? mouseX / axis.rect.width : 1 - (mouseY / axis.rect.height);
                        origin = origin > 1 ? 1 : origin < 0 ? 0 : origin;
                        zoomFactor = (cumulative === 1) ? 1 : helper_1.minMax(1 / cumulative, 0, 1);
                        zoomPosition = (cumulative === 1) ? 0 : axis.zoomPosition + ((axis.zoomFactor - zoomFactor) * origin);
                        if (axis.zoomPosition !== zoomPosition || axis.zoomFactor !== zoomFactor) {
                            zoomFactor = (zoomPosition + zoomFactor) > 1 ? (1 - zoomPosition) : zoomFactor;
                        }
                    }
                    axis.zoomFactor = zoomFactor;
                    axis.zoomPosition = zoomPosition;
                }
            });
            this.performZoomRedraw(chart);
        };
        Zoom.prototype.performPinchZooming = function (e, chart) {
            if (this.zoomingRect.width > 0 && this.zoomingRect.height > 0) {
                return false;
            }
            this.calculateZoomAxesRange(chart, chart.axisCollections);
            this.isZoomed = true;
            this.isPanning = true;
            this.offset = !chart.delayRedraw ? chart.chartAxisLayoutPanel.seriesClipRect : this.offset;
            chart.delayRedraw = true;
            chart.disableTrackTooltip = true;
            var elementOffset = chart.element.getBoundingClientRect();
            var touchDown = this.touchStartList;
            var touchMove = this.touchMoveList;
            var touch0StartX = touchDown[0].pageX - elementOffset.left;
            var touch0StartY = touchDown[0].pageY - elementOffset.top;
            var touch0EndX = touchMove[0].pageX - elementOffset.left;
            var touch0EndY = touchMove[0].pageY - elementOffset.top;
            var touch1StartX = touchDown[1].pageX - elementOffset.left;
            var touch1StartY = touchDown[1].pageY - elementOffset.top;
            var touch1EndX = touchMove[1].pageX - elementOffset.left;
            var touch1EndY = touchMove[1].pageY - elementOffset.top;
            var scaleX;
            var scaleY;
            var translateXValue;
            var translateYValue;
            var pinchRect;
            var clipX;
            var clipY;
            scaleX = Math.abs(touch0EndX - touch1EndX) / Math.abs(touch0StartX - touch1StartX);
            scaleY = Math.abs(touch0EndY - touch1EndY) / Math.abs(touch0StartY - touch1StartY);
            clipX = ((this.offset.x - touch0EndX) / scaleX) + touch0StartX;
            clipY = ((this.offset.y - touch0EndY) / scaleY) + touch0StartY;
            pinchRect = new helper_1.Rect(clipX, clipY, this.offset.width / scaleX, this.offset.height / scaleY);
            translateXValue = (touch0EndX - (scaleX * touch0StartX));
            translateYValue = (touch0EndY - (scaleY * touch0StartY));
            if (!isNaN(scaleX - scaleX) && !isNaN(scaleY - scaleY)) {
                switch (this.zooming.mode) {
                    case 'XY':
                        this.setTransform(translateXValue, translateYValue, scaleX, scaleY, chart, true);
                        break;
                    case 'X':
                        this.setTransform(translateXValue, 0, scaleX, 1, chart, true);
                        break;
                    case 'Y':
                        this.setTransform(0, translateYValue, 1, scaleY, chart, true);
                        break;
                }
            }
            this.calculatePinchZoomFactor(chart, pinchRect);
            this.refreshAxis(chart.chartAxisLayoutPanel, chart, chart.axisCollections);
            return true;
        };
        Zoom.prototype.calculatePinchZoomFactor = function (chart, pinchRect) {
            var _this = this;
            var mode = this.zooming.mode;
            var selectionMin;
            var selectionMax;
            var rangeMin;
            var rangeMax;
            var value;
            var axisTrans;
            chart.axisCollections.forEach(function (axis, index) {
                if ((axis.orientation === 'Horizontal' && mode !== 'Y') ||
                    (axis.orientation === 'Vertical' && mode !== 'X')) {
                    if (axis.orientation === 'Horizontal') {
                        value = pinchRect.x - _this.offset.x;
                        axisTrans = axis.rect.width / _this.zoomAxes[index].delta;
                        rangeMin = value / axisTrans + _this.zoomAxes[index].min;
                        value = pinchRect.x + pinchRect.width - _this.offset.x;
                        rangeMax = value / axisTrans + _this.zoomAxes[index].min;
                    }
                    else {
                        value = pinchRect.y - _this.offset.y;
                        axisTrans = axis.rect.height / _this.zoomAxes[index].delta;
                        rangeMin = (value * -1 + axis.rect.height) / axisTrans + _this.zoomAxes[index].min;
                        value = pinchRect.y + pinchRect.height - _this.offset.y;
                        rangeMax = (value * -1 + axis.rect.height) / axisTrans + _this.zoomAxes[index].min;
                    }
                    selectionMin = Math.min(rangeMin, rangeMax);
                    selectionMax = Math.max(rangeMin, rangeMax);
                    axis.zoomPosition = (selectionMin - _this.zoomAxes[index].actualMin) / _this.zoomAxes[index].actualDelta;
                    axis.zoomFactor = (selectionMax - selectionMin) / _this.zoomAxes[index].actualDelta;
                    axis.zoomPosition = axis.zoomPosition < 0 ? 0 : axis.zoomPosition;
                    axis.zoomFactor = axis.zoomFactor > 1 ? 1 : axis.zoomFactor;
                }
            });
        };
        Zoom.prototype.setTransform = function (transX, transY, scaleX, scaleY, chart, isPinch) {
            chart.seriesElements.setAttribute('clip-path', 'url(#' + this.elementId + '_ChartAreaClipRect_)');
            var translate;
            var xAxisLoc;
            var yAxisLoc;
            if (transX !== null && transY !== null) {
                chart.visibleSeries.forEach(function (value) {
                    xAxisLoc = chart.requireInvertedAxis ? value.yAxis.rect.x : value.xAxis.rect.x;
                    yAxisLoc = chart.requireInvertedAxis ? value.xAxis.rect.y : value.yAxis.rect.y;
                    translate = 'translate(' + (transX + (isPinch ? (scaleX * xAxisLoc) : xAxisLoc)) +
                        ',' + (transY + (isPinch ? (scaleY * yAxisLoc) : yAxisLoc)) + ')';
                    translate = (scaleX || scaleY) ? translate + ' scale(' + scaleX + ' ' + scaleY + ')' : translate;
                    value.seriesElement.setAttribute('transform', translate);
                    if (value.symbolElement) {
                        value.symbolElement.setAttribute('transform', translate);
                    }
                    if (value.textElement) {
                        value.textElement.setAttribute('visibility', 'hidden');
                        value.shapeElement.setAttribute('visibility', 'hidden');
                    }
                });
            }
        };
        Zoom.prototype.calculateZoomAxesRange = function (chart, axes) {
            var _this = this;
            var range;
            var axisRange;
            chart.axisCollections.forEach(function (axis, index) {
                axisRange = axis.actualRange;
                if (_this.zoomAxes[index]) {
                    if (!chart.delayRedraw) {
                        _this.zoomAxes[index].min = axisRange.min;
                        _this.zoomAxes[index].delta = axisRange.delta;
                    }
                }
                else {
                    range = {
                        actualMin: axisRange.min,
                        actualDelta: axisRange.delta,
                        min: axisRange.min,
                        delta: axisRange.delta
                    };
                    _this.zoomAxes[index] = range;
                }
            });
        };
        Zoom.prototype.showZoomingToolkit = function (chart) {
            var toolboxItems = this.zooming.toolbarItems;
            var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
            var spacing = 5;
            var render = chart.renderer;
            var length = this.isDevice ? 1 : toolboxItems.length;
            var iconSize = this.isDevice ? helper_1.measureText('Reset Zoom', { size: '12px' }).width : 16;
            var height = this.isDevice ? helper_1.measureText('Reset Zoom', { size: '12px' }).height : 16;
            var width = (length * iconSize) + ((length + 1) * spacing) + ((length - 1) * spacing);
            var transX = areaBounds.x + areaBounds.width - width - spacing;
            var transY = (areaBounds.y + spacing);
            var xPosition = spacing;
            var outerElement;
            var toolkit = this.toolkit;
            var element;
            var shadowElement = '<filter id="chart_shadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/>';
            shadowElement += '<feOffset dx="-3" dy="4" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="1"/>';
            shadowElement += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
            if (length === 0 || helper_1.getElement(this.elementId + '_Zooming_KitCollection')) {
                return false;
            }
            var defElement = render.createDefs();
            toolboxItems = this.isDevice ? ['Reset'] : toolboxItems;
            defElement.innerHTML = shadowElement;
            this.toolkitElements = render.createGroup({
                id: this.elementId + '_Zooming_KitCollection',
                transform: 'translate(' + transX + ',' + transY + ')'
            });
            this.toolkitElements.appendChild(defElement);
            this.toolkitElements.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Rect', '#fafafa', { color: 'transparent', width: 1 }, 1, new helper_1.Rect(0, 0, width, (height + (spacing * 2))), 0, 0)));
            outerElement = render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Rect', '#fafafa', { color: 'transparent', width: 1 }, 0.1, new helper_1.Rect(0, 0, width, (height + (spacing * 2))), 0, 0));
            outerElement.setAttribute('filter', 'url(#chart_shadow)');
            this.toolkitElements.appendChild(outerElement);
            var currentItem;
            for (var i = 1; i <= length; i++) {
                currentItem = toolboxItems[i - 1];
                element = render.createGroup({
                    transform: 'translate(' + xPosition + ',' + spacing + ')'
                });
                switch (currentItem) {
                    case 'Pan':
                        toolkit.createPanButton(element, this.toolkitElements, chart);
                        break;
                    case 'Zoom':
                        toolkit.createZoomButton(element, this.toolkitElements, chart);
                        break;
                    case 'ZoomIn':
                        toolkit.createZoomInButton(element, this.toolkitElements, chart);
                        break;
                    case 'ZoomOut':
                        toolkit.createZoomOutButton(element, this.toolkitElements, chart);
                        break;
                    case 'Reset':
                        toolkit.createResetButton(element, this.toolkitElements, chart, this.isDevice);
                        break;
                }
                xPosition += iconSize + (spacing * 2);
            }
            this.toolkitElements.setAttribute('opacity', this.isDevice ? '1' : '0.3');
            this.toolkitElements.setAttribute('cursor', 'auto');
            chart.svgObject.appendChild(this.toolkitElements);
            if (!this.isDevice) {
                ej2_base_1.EventHandler.add(this.toolkitElements, 'mousemove touchstart', this.zoomToolkitMove, this);
                ej2_base_1.EventHandler.add(this.toolkitElements, 'mouseleave touchend', this.zoomToolkitLeave, this);
                if (this.isPanning) {
                    toolkit.pan();
                }
            }
            return true;
        };
        Zoom.prototype.applyZoomToolkit = function (chart, axes) {
            var showToolkit = false;
            var toolkitElement = helper_1.getElement(this.elementId + '_Zooming_KitCollection');
            axes.forEach(function (axis) {
                showToolkit = (showToolkit || (axis.zoomFactor !== 1 || axis.zoomPosition !== 0));
            });
            if (showToolkit) {
                this.showZoomingToolkit(chart);
                this.isZoomed = true;
            }
            else {
                this.toolkit.removeTooltip();
                if (this.toolkitElements) {
                    this.toolkitElements.remove();
                }
                this.isPanning = false;
                this.isZoomed = false;
            }
        };
        Zoom.prototype.zoomToolkitMove = function (e) {
            var element = this.toolkitElements;
            var opacity = +element.getAttribute('opacity');
            element.setAttribute('opacity', '1');
            return false;
        };
        Zoom.prototype.zoomToolkitLeave = function (e) {
            var element = this.toolkitElements;
            element.setAttribute('opacity', '0.3');
            return false;
        };
        Zoom.prototype.getModuleName = function () {
            return 'Zoom';
        };
        Zoom.prototype.destroy = function (chart) {
        };
        return Zoom;
    }());
    exports.Zoom = Zoom;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export basicPatterns */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateFormat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser_base__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__intl_base__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);



var abbreviateRegexGlobal = /\/MMMMM|MMMM|MMM|a|LLL|EEEEE|EEEE|E|K|ccc|G+|z+/gi;
var standalone = 'stand-alone';
var weekdayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var basicPatterns = ['short', 'medium', 'long', 'full'];
var timeSetter = {
    m: 'getMinutes',
    h: 'getHours',
    H: 'getHours',
    s: 'getSeconds',
    d: 'getDate',
};
var datePartMatcher = {
    'M': 'month',
    'd': 'day',
    'E': 'weekday',
    'c': 'weekday',
    'y': 'year',
    'm': 'minute',
    'h': 'hour',
    'H': 'hour',
    's': 'second',
    'L': 'month',
    'a': 'designator',
    'z': 'timeZone',
    'Z': 'timeZone',
    'G': 'era'
};
var timeSeparator = 'timeSeparator';
var DateFormat = (function () {
    function DateFormat() {
    }
    DateFormat.dateFormat = function (culture, option, cldr) {
        var _this = this;
        var dependable = __WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].getDependables(cldr, culture);
        var formatOptions = {};
        var resPattern = option.format || __WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].getResultantPattern(option.skeleton, dependable.dateObject, option.type);
        formatOptions.dateSeperator = __WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].getDateSeparator(dependable.dateObject);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(resPattern)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["i" /* throwError */])('Format options or type given must be invalid');
        }
        else {
            formatOptions.pattern = resPattern;
            formatOptions.numMapper = __WEBPACK_IMPORTED_MODULE_0__parser_base__["a" /* ParserBase */].getNumberMapper(dependable.parserObject, __WEBPACK_IMPORTED_MODULE_0__parser_base__["a" /* ParserBase */].getNumberingSystem(cldr));
            var patternMatch = resPattern.match(abbreviateRegexGlobal) || [];
            for (var _i = 0, patternMatch_1 = patternMatch; _i < patternMatch_1.length; _i++) {
                var str = patternMatch_1[_i];
                var len = str.length;
                var char = str[0];
                if (char === 'K') {
                    char = 'h';
                }
                var charKey = datePartMatcher[char];
                switch (char) {
                    case 'E':
                    case 'c':
                        formatOptions.weekday = dependable.dateObject[__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].days][standalone][__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].monthIndex[len]];
                        break;
                    case 'M':
                    case 'L':
                        formatOptions.month = dependable.dateObject[__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].month][standalone][__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].monthIndex[len]];
                        break;
                    case 'a':
                        formatOptions.designator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('dayPeriods.format.wide', dependable.dateObject);
                        break;
                    case 'G':
                        var eText = (len <= 3) ? 'eraAbbr' : (len === 4) ? 'eraNames' : 'eraNarrow';
                        formatOptions.era = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('eras.' + eText, dependable.dateObject);
                        break;
                    case 'z':
                        formatOptions.timeZone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('dates.timeZoneNames', dependable.parserObject);
                        break;
                }
            }
        }
        return function (value) {
            if (isNaN(value.getDate())) {
                return null;
            }
            return _this.intDateFormatter(value, formatOptions);
        };
    };
    DateFormat.intDateFormatter = function (value, options) {
        var pattern = options.pattern;
        var ret = '';
        var matches = pattern.match(__WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].dateParseRegex);
        for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
            var match = matches_1[_i];
            var length_1 = match.length;
            var char = match[0];
            if (char === 'K') {
                char = 'h';
            }
            var curval = void 0;
            var isNumber = void 0;
            var processNumber = void 0;
            var curstr = '';
            switch (char) {
                case 'M':
                case 'L':
                    curval = value.getMonth() + 1;
                    if (length_1 > 2) {
                        ret += options.month[curval];
                    }
                    else {
                        isNumber = true;
                    }
                    break;
                case 'E':
                case 'c':
                    ret += options.weekday[weekdayKey[value.getDay()]];
                    break;
                case 'H':
                case 'h':
                case 'm':
                case 's':
                case 'd':
                    isNumber = true;
                    curval = value[timeSetter[char]]();
                    if (char === 'h') {
                        curval = curval % 12 || 12;
                    }
                    break;
                case 'y':
                    processNumber = true;
                    curstr += value.getFullYear();
                    if (length_1 === 2) {
                        curstr = curstr.substr(curstr.length - 2);
                    }
                    break;
                case 'a':
                    var desig = value.getHours() < 12 ? 'am' : 'pm';
                    ret += options.designator[desig];
                    break;
                case 'G':
                    var dec = value.getFullYear() < 0 ? 0 : 1;
                    ret += options.era[dec];
                    break;
                case '\'':
                    ret += (match === '\'\'') ? '\'' : match.replace(/\'/g, '');
                    break;
                case 'z':
                    var timezone = value.getTimezoneOffset();
                    var pattern_1 = (length_1 < 4) ? '+H;-H' : options.timeZone.hourFormat;
                    pattern_1 = pattern_1.replace(/:/g, options.numMapper.timeSeparator);
                    if (timezone === 0) {
                        ret += options.timeZone.gmtZeroFormat;
                    }
                    else {
                        processNumber = true;
                        curstr = this.getTimeZoneValue(timezone, pattern_1);
                    }
                    curstr = options.timeZone.gmtFormat.replace(/\{0\}/, curstr);
                    break;
                case ':':
                    ret += options.numMapper.numberSymbols[timeSeparator];
                    break;
                case '/':
                    ret += options.dateSeperator;
                    break;
                default:
                    ret += match;
            }
            if (isNumber) {
                processNumber = true;
                curstr = this.checkTwodigitNumber(curval, length_1);
            }
            if (processNumber) {
                ret += __WEBPACK_IMPORTED_MODULE_0__parser_base__["a" /* ParserBase */].convertValueParts(curstr, __WEBPACK_IMPORTED_MODULE_1__intl_base__["a" /* IntlBase */].latnParseRegex, options.numMapper.mapper);
            }
        }
        return ret;
    };
    DateFormat.checkTwodigitNumber = function (val, len) {
        var ret = val + '';
        if (len === 2 && ret.length !== 2) {
            return '0' + ret;
        }
        return ret;
    };
    DateFormat.getTimeZoneValue = function (tVal, pattern) {
        var _this = this;
        var splt = pattern.split(';');
        var curPattern = splt[tVal > 0 ? 1 : 0];
        var no = Math.abs(tVal);
        return curPattern = curPattern.replace(/HH?|mm/g, function (str) {
            var len = str.length;
            var ishour = str.indexOf('H') !== -1;
            return _this.checkTwodigitNumber(Math.floor(ishour ? (no / 60) : (no % 60)), len);
        });
    };
    return DateFormat;
}());



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateParser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__intl_base__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_base__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);



var number = 'numbers';
var defNoSystem = 'defaultNumberingSystem';
var noSystem = 'numberingSystem';
var standalone = 'stand-alone';
var curWeekDay = 'curWeekDay';
var latnRegex = /^[0-9]*$/;
var abbreviateRegex = /\/MMMMM|MMMM|MMM|a|LLL|EEEEE|EEEE|E|ccc/;
var timeSetter = {
    minute: 'setMinutes',
    hour: 'setHours',
    second: 'setSeconds',
    day: 'setDate',
    month: 'setMonth'
};
var month = 'months';
var datePartMatcher = {
    'M': 'month',
    'd': 'day',
    'E': 'weekday',
    'c': 'weekday',
    'y': 'year',
    'm': 'minute',
    'h': 'hour',
    'H': 'hour',
    's': 'second',
    'L': 'month',
    'a': 'designator',
    'z': 'timeZone',
    'Z': 'timeZone',
    'G': 'era'
};
var DateParser = (function () {
    function DateParser() {
    }
    DateParser.dateParser = function (culture, option, cldr) {
        var _this = this;
        var dependable = __WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].getDependables(cldr, culture);
        var numOptions = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getCurrentNumericOptions(dependable.parserObject, __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getNumberingSystem(cldr));
        var parseOptions = {};
        var resPattern = option.format || __WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].getResultantPattern(option.skeleton, dependable.dateObject, option.type);
        var regexString = '';
        var hourOnly;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(resPattern)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["i" /* throwError */])('Format options or type given must be invalid');
        }
        else {
            parseOptions = { pattern: resPattern, evalposition: {} };
            var patternMatch = resPattern.match(__WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].dateParseRegex) || [];
            var length_1 = patternMatch.length;
            var nRegx = numOptions.numericRegex;
            for (var i = 0; i < length_1; i++) {
                var str = patternMatch[i];
                var len = str.length;
                var char = (str[0] === 'K') ? 'h' : str[0];
                var isNumber = void 0;
                var canUpdate = void 0;
                var charKey = datePartMatcher[char];
                var optional = (len === 2) ? '' : '?';
                switch (char) {
                    case 'E':
                    case 'c':
                        var weekObject = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].reverseObject(dependable.dateObject[__WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].days][standalone][__WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].monthIndex[len]]);
                        regexString += '(' + Object.keys(weekObject).join('|') + ')';
                        break;
                    case 'M':
                    case 'L':
                    case 'd':
                    case 'm':
                    case 's':
                    case 'h':
                    case 'H':
                        canUpdate = true;
                        if ((char === 'M' || char === 'L') && len > 2) {
                            parseOptions[charKey] = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].reverseObject(dependable.dateObject[month][standalone][__WEBPACK_IMPORTED_MODULE_0__intl_base__["a" /* IntlBase */].monthIndex[len]]);
                            regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + ')';
                        }
                        else {
                            isNumber = true;
                            regexString += '(' + nRegx + nRegx + optional + ')';
                        }
                        if (char === 'h') {
                            parseOptions.hour12 = true;
                        }
                        break;
                    case 'y':
                        canUpdate = isNumber = true;
                        if (len === 2) {
                            regexString += '(' + nRegx + nRegx + ')';
                        }
                        else {
                            regexString += '(' + nRegx + '+)';
                        }
                        break;
                    case 'a':
                        canUpdate = true;
                        parseOptions[charKey] = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].reverseObject(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('dayPeriods.format.wide', dependable.dateObject));
                        regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + ')';
                        break;
                    case 'G':
                        canUpdate = true;
                        var eText = (len <= 3) ? 'eraAbbr' : (len === 4) ? 'eraNames' : 'eraNarrow';
                        parseOptions[charKey] = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].reverseObject(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('eras.' + eText, dependable.dateObject));
                        regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + '?)';
                        break;
                    case 'z':
                        var tval = new Date().getTimezoneOffset();
                        canUpdate = (tval !== 0);
                        parseOptions[charKey] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* getValue */])('dates.timeZoneNames', dependable.parserObject);
                        var tzone = parseOptions[charKey];
                        hourOnly = (len < 4);
                        var hpattern = hourOnly ? '+H;-H' : tzone.hourFormat;
                        regexString += '(' + this.parseTimeZoneRegx(hpattern, tzone, nRegx) + ')?';
                        break;
                    case '\'':
                        var iString = str.replace(/\'/g, '');
                        regexString += '(' + iString + ')?';
                        break;
                    default:
                        regexString += '(.)?';
                        break;
                }
                if (canUpdate) {
                    parseOptions.evalposition[charKey] = { isNumber: isNumber, pos: i + 1, hourOnly: hourOnly };
                }
                if (i === length_1 - 1 && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(regexString)) {
                    parseOptions.parserRegex = new RegExp('^' + regexString + '$');
                }
            }
        }
        return function (value) {
            var parsedDateParts = _this.internalDateParse(value, parseOptions, numOptions);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(parsedDateParts) || !Object.keys(parsedDateParts).length) {
                return null;
            }
            return _this.getDateObject(parsedDateParts);
        };
    };
    DateParser.getDateObject = function (options, value) {
        var res = value || new Date();
        var tKeys = ['hour', 'minute', 'second', 'month', 'day'];
        var y = options.year;
        var desig = options.designator;
        var tzone = options.timeZone;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(y)) {
            var len = (y + '').length;
            if (len === 2) {
                var century = Math.floor(res.getFullYear() / 100) * 100;
                y += century;
            }
            res.setFullYear(y);
        }
        for (var _i = 0, tKeys_1 = tKeys; _i < tKeys_1.length; _i++) {
            var key = tKeys_1[_i];
            var tValue = options[key];
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(tValue)) {
                if (key === 'month') {
                    tValue -= 1;
                    if (tValue < 0 || tValue > 11) {
                        return new Date('invalid');
                    }
                    var pDate = res.getDate();
                    res.setDate(1);
                    res[timeSetter[key]](tValue);
                    var lDate = new Date(res.getFullYear(), tValue + 1, 0).getDate();
                    res.setDate(pDate < lDate ? pDate : lDate);
                }
                else {
                    if (key === 'day' && (tValue < 1 || tValue > 31)) {
                        return new Date('invalid');
                    }
                    res[timeSetter[key]](tValue);
                }
            }
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(desig)) {
            var hour = res.getHours();
            if (desig === 'pm') {
                res.setHours(hour + (hour === 12 ? 0 : 12));
            }
            else if (hour === 12) {
                res.setHours(0);
            }
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(tzone)) {
            var tzValue = tzone - res.getTimezoneOffset();
            if (tzValue !== 0) {
                res.setMinutes(res.getMinutes() + tzValue);
            }
        }
        return res;
    };
    DateParser.internalDateParse = function (value, parseOptions, num) {
        var matches = value.match(parseOptions.parserRegex);
        var retOptions = { 'hour': 0, 'minute': 0, 'second': 0 };
        var nRegx = num.numericRegex;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(matches)) {
            return null;
        }
        else {
            var props = Object.keys(parseOptions.evalposition);
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var prop = props_1[_i];
                var curObject = parseOptions.evalposition[prop];
                var matchString = matches[curObject.pos];
                if (curObject.isNumber) {
                    retOptions[prop] = this.internalNumberParser(matchString, num);
                }
                else {
                    if (prop === 'timeZone' && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(matchString)) {
                        var pos = curObject.pos;
                        var val = void 0;
                        var tmatch = matches[pos + 1];
                        var flag = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isUndefined */])(tmatch);
                        if (curObject.hourOnly) {
                            val = this.getZoneValue(flag, tmatch, matches[pos + 4], num) * 60;
                        }
                        else {
                            val = this.getZoneValue(flag, tmatch, matches[pos + 7], num) * 60;
                            val += this.getZoneValue(flag, matches[pos + 4], matches[pos + 10], num);
                        }
                        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(val)) {
                            retOptions[prop] = val;
                        }
                    }
                    else {
                        retOptions[prop] = parseOptions[prop][matchString];
                    }
                }
            }
            if (parseOptions.hour12) {
                retOptions.hour12 = true;
            }
        }
        return retOptions;
    };
    DateParser.internalNumberParser = function (value, option) {
        value = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].convertValueParts(value, option.numberParseRegex, option.numericPair);
        if (latnRegex.test(value)) {
            return +value;
        }
        return null;
    };
    DateParser.parseTimeZoneRegx = function (hourFormat, tZone, nRegex) {
        var pattern = tZone.gmtFormat;
        var ret;
        var result;
        var cRegex = '(' + nRegex + ')' + '(' + nRegex + ')';
        var splitStr;
        ret = hourFormat.replace('+', '\\+');
        if (hourFormat.indexOf('HH') !== -1) {
            ret = ret.replace(/HH|mm/g, '(' + cRegex + ')');
        }
        else {
            ret = ret.replace(/H|m/g, '(' + cRegex + '?)');
        }
        splitStr = (ret.split(';').map(function (str) {
            return pattern.replace('{0}', str);
        }));
        ret = splitStr.join('|') + '|' + tZone.gmtZeroFormat;
        return ret;
    };
    DateParser.getZoneValue = function (flag, val1, val2, num) {
        var value = this.internalNumberParser(flag ? val1 : val2, num);
        if (flag) {
            return -value;
        }
        return value;
    };
    return DateParser;
}());



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberParser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parser_base__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intl_base__ = __webpack_require__(14);



var formatRegex = /(^[ncpa]{1})([0-1]?[0-9]|20)?$/i;
var parseRegex = /^([^0-9]*)(([0-9,]*[0-9]+)(\.[0-9]+)?)([Ee][+-]?[0-9]+)?([^0-9]*)$/;
var groupRegex = /,/g;
var latnDecimalRegex = /^[0-9]*(\.[0-9]+)?$/;
var keys = ['minusSign', 'infinity'];
var NumberParser = (function () {
    function NumberParser() {
    }
    NumberParser.numberParser = function (culture, option, cldr) {
        var _this = this;
        var dependable = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getDependables(cldr, culture, true);
        var parseOptions = { custom: true };
        var numOptions;
        if ((__WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].formatRegex.test(option.format)) || !(option.format)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(parseOptions, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getProperNumericSkeleton(option.format || 'N'));
            parseOptions.custom = false;
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(parseOptions, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].customFormat(option.format, null, null));
        }
        numOptions = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getCurrentNumericOptions(dependable.parserObject, __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getNumberingSystem(cldr), true);
        parseOptions.symbolRegex = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].getSymbolRegex(Object.keys(numOptions.symbolMatch));
        parseOptions.infinity = numOptions.symbolNumberSystem[keys[1]];
        var symbolpattern = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getSymbolPattern(parseOptions.type, numOptions.numberSystem, dependable.numericObject, parseOptions.isAccount);
        if (symbolpattern) {
            symbolpattern = symbolpattern.replace(/\u00A4/g, __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].defaultCurrency);
            var split = symbolpattern.split(';');
            parseOptions.nData = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getFormatData(split[1] || '-' + split[0], true, '');
            parseOptions.pData = __WEBPACK_IMPORTED_MODULE_2__intl_base__["a" /* IntlBase */].getFormatData(split[0], true, '');
        }
        return function (value) {
            return _this.getParsedNumber(value, parseOptions, numOptions);
        };
    };
    NumberParser.getParsedNumber = function (value, options, numOptions) {
        var isNegative;
        var isPercent;
        var tempValue;
        var lead;
        var end;
        var ret;
        if (value.indexOf(options.infinity) !== -1) {
            return Infinity;
        }
        else {
            value = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].convertValueParts(value, options.symbolRegex, numOptions.symbolMatch);
            value = __WEBPACK_IMPORTED_MODULE_1__parser_base__["a" /* ParserBase */].convertValueParts(value, numOptions.numberParseRegex, numOptions.numericPair);
            if (value.indexOf('.') === 0) {
                value = '0' + value;
            }
            var matches = value.match(parseRegex);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(matches)) {
                return NaN;
            }
            lead = matches[1];
            tempValue = matches[2];
            var exponent = matches[5];
            end = matches[6];
            isNegative = options.custom ? ((lead === options.nData.nlead) && (end === options.nData.nend)) :
                ((lead.indexOf(options.nData.nlead) !== -1) && (end.indexOf(options.nData.nend) !== -1));
            isPercent = isNegative ?
                options.nData.isPercent :
                options.pData.isPercent;
            tempValue = tempValue.replace(groupRegex, '');
            if (exponent) {
                tempValue += exponent;
            }
            ret = +tempValue;
            if (options.type === 'percent' || isPercent) {
                ret = ret / 100;
            }
            if (options.custom || options.fractionDigits) {
                ret = parseFloat(ret.toFixed(options.custom ?
                    (isNegative ? options.nData.maximumFractionDigits : options.pData.maximumFractionDigits) : options.fractionDigits));
            }
            if (isNegative) {
                ret *= -1;
            }
            return ret;
        }
    };
    return NumberParser;
}());



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ajax; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

var headerRegex = /^(.*?):[ \t]*([^\r\n]*)$/gm;
var defaultType = 'GET';
var Ajax = (function () {
    function Ajax(options, type, async) {
        this.mode = true;
        this.options = {};
        if (typeof options === 'string') {
            this.url = options;
            this.type = type ? type.toUpperCase() : defaultType;
            this.mode = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(async) ? async : true;
        }
        else if (typeof options === 'object') {
            this.options = options;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* merge */])(this, this.options);
        }
        this.type = this.type ? this.type.toUpperCase() : defaultType;
    }
    Ajax.prototype.send = function (data) {
        var _this = this;
        this.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(data) ? this.data : data;
        var promise = new Promise(function (resolve, reject) {
            _this.httpRequest = new XMLHttpRequest();
            _this.httpRequest.onreadystatechange = function () { _this.stateChange(resolve, reject); };
            _this.httpRequest.open(_this.type, _this.url, _this.mode);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.data)) {
                _this.httpRequest.setRequestHeader('Content-Type', _this.contentType || 'application/json; charset=utf-8');
            }
            if (_this.beforeSend) {
                _this.beforeSend();
            }
            _this.httpRequest.send(!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.data) ? _this.data : null);
        });
        return promise;
    };
    Ajax.prototype.successHandler = function (data) {
        if (this.onSuccess) {
            this.onSuccess(data, this);
        }
        return data;
    };
    Ajax.prototype.failureHandler = function (reason) {
        if (this.onFailure) {
            this.onFailure(this.httpRequest);
        }
        return reason;
    };
    Ajax.prototype.stateChange = function (resolve, reject) {
        var data = this.httpRequest.responseText;
        if (this.dataType && this.dataType.toLowerCase() === 'json') {
            if (data === '') {
                data = undefined;
            }
            else {
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                }
            }
        }
        if (this.httpRequest.readyState === 4) {
            if (this.httpRequest.status === 200 || this.httpRequest.status === 304) {
                resolve(this.successHandler(data));
            }
            else {
                reject(new Error(this.failureHandler(this.httpRequest.statusText)));
            }
        }
    };
    Ajax.prototype.getResponseHeader = function (key) {
        var responseHeaders;
        var header;
        responseHeaders = {};
        var headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
        while (headers) {
            responseHeaders[headers[1].toLowerCase()] = headers[2];
            headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
        }
        header = responseHeaders[key.toLowerCase()];
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(header) ? null : header;
    };
    return Ajax;
}());



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Animation; });
/* harmony export (immutable) */ __webpack_exports__["b"] = ripple;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_handler__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notify_property_change__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var Animation = Animation_1 = (function (_super) {
    __extends(Animation, _super);
    function Animation(options) {
        var _this = _super.call(this, options, undefined) || this;
        _this.easing = {
            ease: 'cubic-bezier(0.250, 0.100, 0.250, 1.000)',
            linear: 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
            easeIn: 'cubic-bezier(0.420, 0.000, 1.000, 1.000)',
            easeOut: 'cubic-bezier(0.000, 0.000, 0.580, 1.000)',
            easeInOut: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
            elasticInOut: 'cubic-bezier(0.5,-0.58,0.38,1.81)',
            elasticIn: 'cubic-bezier(0.17,0.67,0.59,1.81)',
            elasticOut: 'cubic-bezier(0.7,-0.75,0.99,1.01)'
        };
        return _this;
    }
    Animation.prototype.animate = function (element, options) {
        options = !options ? {} : options;
        var model = this.getModel(options);
        if (typeof element === 'string') {
            var elements = Array.prototype.slice.call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])(element, document));
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var element_1 = elements_1[_i];
                model.element = element_1;
                Animation_1.delayAnimation(model);
            }
        }
        else {
            model.element = element;
            Animation_1.delayAnimation(model);
        }
    };
    Animation.stop = function (element, model) {
        element.style.animation = '';
        element.removeAttribute('e-animate');
        var animationId = element.getAttribute('e-animation-id');
        if (animationId) {
            var frameId = parseInt(animationId, 10);
            cancelAnimationFrame(frameId);
            element.removeAttribute('e-animation-id');
        }
        if (model && model.end) {
            model.end.call(this, model);
        }
    };
    Animation.delayAnimation = function (model) {
        if (model.delay) {
            setTimeout(function () { Animation_1.applyAnimation(model); }, model.delay);
        }
        else {
            Animation_1.applyAnimation(model);
        }
    };
    Animation.applyAnimation = function (model) {
        var _this = this;
        model.timeStamp = 0;
        var step = 0;
        var timerId = 0;
        var startTime = 0;
        var prevTimeStamp = 0;
        var duration = model.duration;
        model.element.setAttribute('e-animate', 'true');
        var startAnimation = function (timeStamp) {
            try {
                if (timeStamp) {
                    prevTimeStamp = prevTimeStamp === 0 ? timeStamp : prevTimeStamp;
                    model.timeStamp = (timeStamp + model.timeStamp) - prevTimeStamp;
                    prevTimeStamp = timeStamp;
                    if (!step && model.begin) {
                        model.begin.call(_this, model);
                    }
                    step = step + 1;
                    var avg = model.timeStamp / step;
                    if (model.timeStamp < duration && model.timeStamp + avg < duration && model.element.getAttribute('e-animate')) {
                        model.element.style.animation = model.name + ' ' + model.duration + 'ms ' + model.timingFunction;
                        if (model.progress) {
                            model.progress.call(_this, model);
                        }
                        requestAnimationFrame(startAnimation);
                    }
                    else {
                        cancelAnimationFrame(timerId);
                        model.element.removeAttribute('e-animation-id');
                        model.element.removeAttribute('e-animate');
                        model.element.style.animation = '';
                        if (model.end) {
                            model.end.call(_this, model);
                        }
                    }
                }
                else {
                    startTime = performance.now();
                    timerId = requestAnimationFrame(startAnimation);
                    model.element.setAttribute('e-animation-id', timerId.toString());
                }
            }
            catch (e) {
                cancelAnimationFrame(timerId);
                model.element.removeAttribute('e-animation-id');
                if (model.fail) {
                    model.fail.call(_this, e);
                }
            }
        };
        startAnimation();
    };
    Animation.prototype.getModel = function (options) {
        return {
            name: options.name || this.name,
            delay: options.delay || this.delay,
            duration: (options.duration !== undefined ? options.duration : this.duration),
            begin: options.begin || this.begin,
            end: options.end || this.end,
            fail: options.fail || this.fail,
            progress: options.progress || this.progress,
            timingFunction: this.easing[options.timingFunction] ? this.easing[options.timingFunction] :
                (options.timingFunction || this.easing[this.timingFunction])
        };
    };
    Animation.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    Animation.prototype.getModuleName = function () {
        return 'animation';
    };
    Animation.prototype.destroy = function () {
    };
    return Animation;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('FadeIn')
], Animation.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(400)
], Animation.prototype, "duration", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('ease')
], Animation.prototype, "timingFunction", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Animation.prototype, "delay", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Animation.prototype, "progress", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Animation.prototype, "begin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Animation.prototype, "end", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Animation.prototype, "fail", void 0);
Animation = Animation_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_3__notify_property_change__["e" /* NotifyPropertyChanges */]
], Animation);

function ripple(element, selector) {
    element.setAttribute('e-ripple', 'true');
    __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].add(element, 'mousedown', rippleHandler, { parent: element, selector: selector });
    __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].add(element, 'mouseup', rippleUpHandler, { parent: element, selector: selector });
    __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].add(element, 'mousemove', rippleMoveHandler, { parent: element, selector: selector });
    return (function () {
        element.removeAttribute('e-ripple');
        __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].remove(element, 'mousedown', rippleHandler);
        __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].remove(element, 'mouseup', rippleUpHandler);
        __WEBPACK_IMPORTED_MODULE_2__event_handler__["a" /* EventHandler */].remove(element, 'mousemove', rippleMoveHandler);
    });
}
function rippleHandler(e) {
    var target = (e.target);
    var element = this.selector ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["g" /* closest */])(target, this.selector) : target;
    if (!element) {
        return;
    }
    var offset = element.getBoundingClientRect();
    var offsetX = e.pageX - document.body.scrollLeft;
    var offsetY = e.pageY - document.body.scrollTop;
    var pageX = Math.max(Math.abs(offsetX - offset.left), Math.abs(offsetX - offset.right));
    var pageY = Math.max(Math.abs(offsetY - offset.top), Math.abs(offsetY - offset.bottom));
    var radius = Math.sqrt(pageX * pageX + pageY * pageY);
    var diameter = radius * 2;
    var x = offsetX - offset.left - radius;
    var y = offsetY - offset.top - radius;
    element.classList.add('e-ripple');
    var styles = 'width: ' + diameter + 'px;height: ' + diameter + 'px;left: ' + x + 'px;top: ' + y + 'px;' +
        'transition-duration: 350ms;';
    var rippleElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["c" /* createElement */])('div', { className: 'e-ripple-element', styles: styles });
    element.appendChild(rippleElement);
    window.getComputedStyle(rippleElement).getPropertyValue('opacity');
    rippleElement.style.transform = 'scale(1)';
}
function rippleUpHandler(e) {
    removeRipple(e, this);
}
function rippleMoveHandler(e) {
    removeRipple(e, this);
}
function removeRipple(e, eventArgs) {
    var duration = 350;
    var target = (e.target);
    var element = eventArgs.selector ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["g" /* closest */])(target, eventArgs.selector) : target;
    if (!element || (element && element.className.indexOf('e-ripple') === -1)) {
        return;
    }
    var rippleElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])('.e-ripple-element', element);
    var rippleElement = rippleElements[rippleElements.length - 1];
    setTimeout(function () {
        if (rippleElement && rippleElement.parentNode) {
            rippleElement.parentNode.removeChild(rippleElement);
        }
        if (!element.getElementsByClassName('e-ripple-element').length) {
            element.classList.remove('e-ripple');
        }
    }, duration);
}
var Animation_1;


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

var CanvasRenderer = (function () {
    function CanvasRenderer(rootID) {
        this.rootId = rootID;
    }
    CanvasRenderer.prototype.getOptionValue = function (options, key) {
        return options[key];
    };
    CanvasRenderer.prototype.createCanvas = function (options) {
        var canvasObj = document.createElement('canvas');
        canvasObj.setAttribute('id', this.rootId + '_canvas');
        this.ctx = canvasObj.getContext('2d');
        this.canvasObj = canvasObj;
        this.setCanvasSize(options.width, options.height);
        return this.canvasObj;
    };
    CanvasRenderer.prototype.setCanvasSize = function (width, height) {
        var element = document.getElementById(this.rootId);
        var size = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(element) ? element.getBoundingClientRect() : null;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.width)) {
            this.canvasObj.setAttribute('width', width ? width.toString() : size.width.toString());
        }
        else {
            this.canvasObj.setAttribute('width', this.width.toString());
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.height)) {
            this.canvasObj.setAttribute('height', height ? height.toString() : '450');
        }
        else {
            this.canvasObj.setAttribute('height', this.height.toString());
        }
    };
    CanvasRenderer.prototype.setAttributes = function (options) {
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        var dashArray = this.getOptionValue(options, 'stroke-dasharray');
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(dashArray)) {
            var dashArrayString = dashArray.split(',');
            this.ctx.setLineDash([parseInt(dashArrayString[0], 10), parseInt(dashArrayString[1], 10)]);
        }
        this.ctx.strokeStyle = this.getOptionValue(options, 'stroke');
    };
    CanvasRenderer.prototype.drawLine = function (options) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.moveTo(options.x1, options.y1);
        this.ctx.lineTo(options.x2, options.y2);
        this.ctx.stroke();
        this.ctx.restore();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawRectangle = function (options) {
        var canvasCtx = this.ctx;
        var cornerRadius = options.rx;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.globalAlpha = this.getOptionValue(options, 'opacity');
        this.setAttributes(options);
        this.ctx.rect(options.x, options.y, options.width, options.height);
        if (cornerRadius !== null && cornerRadius >= 0) {
            this.drawCornerRadius(options);
        }
        else {
            if (options.fill === 'none') {
                options.fill = 'transparent';
            }
            this.ctx.fillStyle = options.fill;
            this.ctx.fillRect(options.x, options.y, options.width, options.height);
            this.ctx.stroke();
        }
        this.ctx.restore();
        this.ctx = canvasCtx;
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawCornerRadius = function (options) {
        var cornerRadius = options.rx;
        var x = options.x;
        var y = options.y;
        var width = options.width;
        var height = options.height;
        if (options.fill === 'none') {
            options.fill = 'transparent';
        }
        this.ctx.fillStyle = options.fill;
        if (width < 2 * cornerRadius) {
            cornerRadius = width / 2;
        }
        if (height < 2 * cornerRadius) {
            cornerRadius = height / 2;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(x + width - cornerRadius, y);
        this.ctx.arcTo(x + width, y, x + width, y + height, cornerRadius);
        this.ctx.arcTo(x + width, y + height, x, y + height, cornerRadius);
        this.ctx.arcTo(x, y + height, x, y, cornerRadius);
        this.ctx.arcTo(x, y, x + width, y, cornerRadius);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawPath = function (options, canvasTranslate) {
        var path = options.d;
        var dataSplit = path.split(' ');
        var borderWidth = this.getOptionValue(options, 'stroke-width');
        var canvasCtx = this.ctx;
        var flag = true;
        this.ctx.save();
        this.ctx.beginPath();
        if (canvasTranslate) {
            this.ctx.translate(canvasTranslate[0], canvasTranslate[1]);
        }
        this.ctx.globalAlpha = options.opacity ? options.opacity : this.getOptionValue(options, 'fill-opacity');
        this.setAttributes(options);
        for (var i = 0; i < dataSplit.length; i = i + 3) {
            var x1 = parseFloat(dataSplit[i + 1]);
            var y1 = parseFloat(dataSplit[i + 2]);
            switch (dataSplit[i]) {
                case 'M':
                    if (!options.innerR && !options.cx) {
                        this.ctx.moveTo(x1, y1);
                    }
                    break;
                case 'L':
                    if (!options.innerR) {
                        this.ctx.lineTo(x1, y1);
                    }
                    break;
                case 'C':
                    var c1 = parseFloat(dataSplit[i + 3]);
                    var c2 = parseFloat(dataSplit[i + 4]);
                    var c3 = parseFloat(dataSplit[i + 5]);
                    var c4 = parseFloat(dataSplit[i + 6]);
                    this.ctx.bezierCurveTo(x1, y1, c1, c2, c3, c4);
                    i = i + 4;
                    break;
                case 'A':
                    if (!options.innerR) {
                        if (options.cx) {
                            this.ctx.arc(options.cx, options.cy, options.radius, 0, 2 * Math.PI, options.counterClockWise);
                        }
                        else {
                            this.ctx.moveTo(options.x, options.y);
                            this.ctx.arc(options.x, options.y, options.radius, options.start, options.end, options.counterClockWise);
                            this.ctx.lineTo(options.x, options.y);
                        }
                    }
                    else if (flag) {
                        this.ctx.arc(options.x, options.y, options.radius, options.start, options.end, options.counterClockWise);
                        this.ctx.arc(options.x, options.y, options.innerR, options.end, options.start, !options.counterClockWise);
                        flag = false;
                    }
                    i = i + 5;
                    break;
                case 'z':
                    this.ctx.closePath();
                    break;
            }
        }
        if (options.fill !== 'none' && options.fill !== undefined) {
            this.ctx.fillStyle = options.fill;
            this.ctx.fill();
        }
        if (borderWidth > 0) {
            this.ctx.stroke();
        }
        this.ctx.restore();
        this.ctx = canvasCtx;
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawText = function (options, label) {
        var fontWeight = this.getOptionValue(options, 'font-weight');
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(fontWeight) && fontWeight.toLowerCase() === 'regular') {
            fontWeight = 'normal';
        }
        var fontSize = this.getOptionValue(options, 'font-size');
        var fontFamily = this.getOptionValue(options, 'font-family');
        var fontStyle = this.getOptionValue(options, 'font-style').toLowerCase();
        var font = (fontStyle + ' ' + fontWeight + ' ' + fontSize + ' ' + fontFamily);
        var anchor = this.getOptionValue(options, 'text-anchor');
        var opacity = options.opacity !== undefined ? options.opacity : 1;
        if (anchor === 'middle') {
            anchor = 'center';
        }
        this.ctx.save();
        this.ctx.fillStyle = options.fill;
        this.ctx.font = font;
        this.ctx.textAlign = anchor;
        this.ctx.globalAlpha = opacity;
        if (options.baseline) {
            this.ctx.textBaseline = options.baseline;
        }
        var txtlngth = 0;
        this.ctx.translate(options.x + (txtlngth / 2), options.y);
        this.ctx.rotate(options.labelRotation * Math.PI / 180);
        this.ctx.fillText(label, 0, 0);
        this.ctx.restore();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawCircle = function (options) {
        var canvasCtx = this.ctx;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(options.cx, options.cy, options.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = options.fill;
        this.ctx.globalAlpha = options.opacity;
        this.ctx.fill();
        this.setAttributes(options);
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx = canvasCtx;
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawPolyline = function (options) {
        this.ctx.save();
        this.ctx.beginPath();
        var points = options.points.split(' ');
        for (var i = 0; i < points.length - 1; i++) {
            var point = points[i].split(',');
            var x = parseFloat(point[0]);
            var y = parseFloat(point[1]);
            if (i === 0) {
                this.ctx.moveTo(x, y);
            }
            else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.stroke();
        this.ctx.restore();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawEllipse = function (options) {
        var canvasCtx = this.ctx;
        var circumference = Math.max(options.rx, options.ry);
        var scaleX = options.rx / circumference;
        var scaleY = options.ry / circumference;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(options.cx, options.cy);
        this.ctx.save();
        this.ctx.scale(scaleX, scaleY);
        this.ctx.arc(0, 0, circumference, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = options.fill;
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.lineWidth = this.getOptionValue(options, 'stroke-width');
        this.ctx.strokeStyle = options.stroke;
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx = canvasCtx;
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.drawImage = function (options) {
        this.ctx.save();
        var imageObj = new Image();
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(options.href)) {
            imageObj.src = options.href;
            this.ctx.drawImage(imageObj, options.x, options.y, options.width, options.height);
        }
        this.ctx.restore();
        this.dataUrl = this.canvasObj.toDataURL();
    };
    CanvasRenderer.prototype.createLinearGradient = function (colors) {
        var myGradient;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            myGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasObj.height);
        }
        var color = this.setGradientValues(colors, myGradient);
        return color;
    };
    CanvasRenderer.prototype.createRadialGradient = function (colors) {
        var myGradient;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            myGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.canvasObj.height);
        }
        var colorName = this.setGradientValues(colors, myGradient);
        return colorName;
    };
    CanvasRenderer.prototype.setGradientValues = function (colors, myGradient) {
        var colorName;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            for (var i = 0; i <= colors.length - 1; i++) {
                var color = colors[i].color;
                var newColorStop = (colors[i].colorStop).slice(0, -1);
                var stopColor = parseInt(newColorStop, 10) / 100;
                myGradient.addColorStop(stopColor, color);
            }
            colorName = myGradient.toString();
        }
        else {
            colorName = colors[0].color.toString();
        }
        this.dataUrl = this.canvasObj.toDataURL();
        return colorName;
    };
    CanvasRenderer.prototype.setElementAttributes = function (options, element) {
        var keys = Object.keys(options);
        var values = Object.keys(options).map(function (key) { return options[key]; });
        for (var i = 0; i < keys.length; i++) {
            element.setAttribute(keys[i], values[i]);
        }
        return element;
    };
    CanvasRenderer.prototype.updateCanvasAttributes = function (options) {
        this.setElementAttributes(options, this.canvasObj);
        var ctx = this.ctx;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.dataUrl)) {
            var img_1 = new Image;
            img_1.onload = function () {
                ctx.drawImage(img_1, 0, 0);
            };
            img_1.src = this.dataUrl;
        }
    };
    return CanvasRenderer;
}());



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_loader__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__observer__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__child_property__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notify_property_change__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__internationalization__ = __webpack_require__(19);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var Component = (function (_super) {
    __extends(Component, _super);
    function Component(options, selector) {
        var _this = _super.call(this, options, selector) || this;
        _this.needsID = false;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.enableRtl)) {
            _this.setProperties({ 'enableRtl': __WEBPACK_IMPORTED_MODULE_6__internationalization__["b" /* rightToLeft */] }, true);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.locale)) {
            _this.setProperties({ 'locale': __WEBPACK_IMPORTED_MODULE_6__internationalization__["d" /* defaultCulture */] }, true);
        }
        _this.moduleLoader = new __WEBPACK_IMPORTED_MODULE_1__module_loader__["a" /* ModuleLoader */](_this);
        _this.localObserver = new __WEBPACK_IMPORTED_MODULE_3__observer__["a" /* Observer */](_this);
        _this.detectFunction = new Function('args', 'var prop = Object.keys(args); if(prop.length){this[prop[0]] = args[prop[0]];}');
        __WEBPACK_IMPORTED_MODULE_6__internationalization__["a" /* onIntlChange */].on('notifyExternalChange', _this.detectFunction, _this);
        if (_this.enablePersistence) {
            window.addEventListener('unload', _this.setPersistData.bind(_this));
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(selector)) {
            _this.appendTo();
        }
        return _this;
    }
    Component.prototype.requiredModules = function () {
        return [];
    };
    ;
    Component.prototype.destroy = function () {
        this.trigger('destroyed', { cancel: false });
        _super.prototype.destroy.call(this);
        __WEBPACK_IMPORTED_MODULE_6__internationalization__["a" /* onIntlChange */].off('notifyExternalChange', this.detectFunction);
        this.moduleLoader.clean();
        this.localObserver.destroy();
        if (this.enablePersistence) {
            this.setPersistData();
        }
    };
    Component.prototype.refresh = function () {
        this.clearChanges();
        this.preRender();
        this.injectModules();
        this.render();
    };
    Component.prototype.appendTo = function (selector) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(selector) && typeof (selector) === 'string') {
            this.element = document.querySelector(selector);
        }
        else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(selector)) {
            this.element = selector;
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.element)) {
            if (this.needsID && !this.element.id) {
                this.element.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["m" /* getUniqueID */])(this.getModuleName());
            }
            this.isProtectedOnChange = false;
            var inst = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('ej2_instances', this.element);
            if (!inst || inst.indexOf(this) === -1) {
                _super.prototype.addInstance.call(this);
            }
            this.preRender();
            if (this.enablePersistence) {
                this.mergePersistData();
            }
            this.injectModules();
            this.render();
            this.trigger('created');
        }
    };
    Component.prototype.dataBind = function () {
        this.injectModules();
        _super.prototype.dataBind.call(this);
    };
    ;
    Component.prototype.on = function (event, handler, context) {
        if (typeof event === 'string') {
            this.localObserver.on(event, handler, context);
        }
        else {
            for (var _i = 0, event_1 = event; _i < event_1.length; _i++) {
                var arg = event_1[_i];
                this.localObserver.on(arg.event, arg.handler, arg.context);
            }
        }
    };
    Component.prototype.off = function (event, handler) {
        if (typeof event === 'string') {
            this.localObserver.off(event, handler);
        }
        else {
            for (var _i = 0, event_2 = event; _i < event_2.length; _i++) {
                var arg = event_2[_i];
                this.localObserver.off(arg.event, arg.handler);
            }
        }
    };
    Component.prototype.notify = function (property, argument) {
        this.localObserver.notify(property, argument);
    };
    Component.prototype.getInjectedModules = function () {
        return this.injectedModules;
    };
    ;
    Component.Inject = function () {
        var moduleList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            moduleList[_i] = arguments[_i];
        }
        if (!this.prototype.injectedModules) {
            this.prototype.injectedModules = [];
        }
        for (var i = 0; i < moduleList.length; i++) {
            if (this.prototype.injectedModules.indexOf(moduleList[i]) === -1) {
                this.prototype.injectedModules.push(moduleList[i]);
            }
        }
    };
    Component.prototype.injectModules = function () {
        if (this.injectedModules && this.injectedModules.length) {
            this.moduleLoader.inject(this.requiredModules(), this.injectedModules);
        }
    };
    Component.prototype.mergePersistData = function () {
        var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        if (!(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(data) || (data === ''))) {
            this.setProperties(JSON.parse(data), true);
        }
    };
    Component.prototype.setPersistData = function () {
        window.localStorage.setItem(this.getModuleName() + this.element.id, this.getPersistData());
    };
    Component.prototype.addOnPersist = function (options) {
        var _this = this;
        var persistObj = {};
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var key = options_1[_i];
            var objValue = void 0;
            objValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])(key, this);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isUndefined */])(objValue)) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* setValue */])(key, this.getActualProperties(objValue), persistObj);
            }
        }
        return JSON.stringify(persistObj, function (key, value) {
            return _this.getActualProperties(value);
        });
    };
    Component.prototype.getActualProperties = function (obj) {
        if (obj instanceof __WEBPACK_IMPORTED_MODULE_4__child_property__["a" /* ChildProperty */]) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* getValue */])('properties', obj);
        }
        else {
            return obj;
        }
    };
    Component.prototype.ignoreOnPersist = function (options) {
        return JSON.stringify(this.iterateJsonProperties(this.properties, options));
    };
    Component.prototype.iterateJsonProperties = function (obj, ignoreList) {
        var newObj = {};
        var _loop_1 = function (key) {
            if (ignoreList.indexOf(key) === -1) {
                var value = obj[key];
                if (typeof value === 'object' && !(value instanceof Array)) {
                    var newList = ignoreList.filter(function (str) {
                        return new RegExp(key + '.').test(str);
                    }).map(function (str) {
                        return str.replace(key + '.', '');
                    });
                    newObj[key] = this_1.iterateJsonProperties(this_1.getActualProperties(value), newList);
                }
                else {
                    newObj[key] = value;
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_1(key);
        }
        return newObj;
    };
    return Component;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__notify_property_change__["a" /* Property */])(false)
], Component.prototype, "enablePersistence", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__notify_property_change__["a" /* Property */])()
], Component.prototype, "enableRtl", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__notify_property_change__["a" /* Property */])()
], Component.prototype, "locale", void 0);
Component = __decorate([
    __WEBPACK_IMPORTED_MODULE_5__notify_property_change__["e" /* NotifyPropertyChanges */]
], Component);



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Draggable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notify_property_change__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_handler__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__child_property__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var defaultPosition = { left: 0, right: 0, top: 0, bottom: 0 };
var positionProp = ['offsetLeft', 'offsetTop'];
var Position = (function (_super) {
    __extends(Position, _super);
    function Position() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Position;
}(__WEBPACK_IMPORTED_MODULE_5__child_property__["a" /* ChildProperty */]));

__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Position.prototype, "left", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Position.prototype, "right", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Position.prototype, "top", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(0)
], Position.prototype, "bottom", void 0);
var Draggable = Draggable_1 = (function (_super) {
    __extends(Draggable, _super);
    function Draggable(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.dragLimit = Draggable_1.getDefaultPosition();
        _this.borderWidth = Draggable_1.getDefaultPosition();
        _this.padding = Draggable_1.getDefaultPosition();
        _this.diffX = 0;
        _this.diffY = 0;
        _this.droppables = {};
        _this.bind();
        return _this;
    }
    Draggable.prototype.bind = function () {
        this.toggleEvents();
        if (__WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].isIE) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["f" /* addClass */])([this.element], 'e-block-touch');
        }
        this.droppables[this.scope] = {};
    };
    Draggable.getDefaultPosition = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["a" /* extend */])({}, defaultPosition);
    };
    Draggable.prototype.toggleEvents = function (isUnWire) {
        var ele;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(this.handle)) {
            ele = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["a" /* select */])(this.handle);
        }
        if (isUnWire) {
            __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(ele || this.element, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchStartEvent, this.initialize);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(ele || this.element, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchStartEvent, this.initialize, this);
        }
    };
    Draggable.prototype.initialize = function (evt) {
        this.target = evt.currentTarget;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(evt.changedTouches)) {
            evt.preventDefault();
        }
        if (this.abort) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["g" /* closest */])(evt.target, this.abort))) {
                return;
            }
        }
        this.element.setAttribute('aria-grabbed', 'true');
        var intCoord = this.getCoordinates(evt);
        this.initialPosition = { x: intCoord.pageX, y: intCoord.pageY };
        if (!this.clone) {
            var pos = this.element.getBoundingClientRect();
            this.relativeXPosition = intCoord.pageX - pos.left;
            this.relativeYPosition = intCoord.pageY - pos.top;
        }
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDragStart, this);
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDestroy, this);
        this.toggleEvents(true);
        document.body.classList.add('e-prevent-select');
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].trigger(document.documentElement, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchStartEvent, evt);
    };
    Draggable.prototype.intDragStart = function (evt) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        var intCordinate = this.getCoordinates(evt);
        var pos;
        var styleProp = getComputedStyle(this.element);
        this.margin = {
            left: parseInt(styleProp.marginLeft, 10),
            top: parseInt(styleProp.marginTop, 10),
            right: parseInt(styleProp.marginRight, 10),
            bottom: parseInt(styleProp.marginBottom, 10),
        };
        var element = this.element;
        if (this.clone && this.dragTarget) {
            var intClosest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["g" /* closest */])(evt.target, this.dragTarget);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(intClosest)) {
                element = intClosest;
            }
        }
        this.offset = this.calculateParentPosition(element);
        this.position = this.getMousePosition(evt);
        var x = this.initialPosition.x - intCordinate.pageX;
        var y = this.initialPosition.y - intCordinate.pageY;
        var distance = Math.sqrt((x * x) + (y * y));
        if (distance >= this.distance) {
            var ele = this.getHelperElement(evt);
            if (!ele || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(ele)) {
                return;
            }
            var dragTargetElement = this.helperElement = ele;
            this.parentClientRect = this.calculateParentPosition(dragTargetElement.offsetParent);
            if (this.dragStart) {
                var curTarget = this.getProperTargetElement(evt);
                this.trigger('dragStart', { event: evt, element: element, target: curTarget });
            }
            if (this.dragArea) {
                this.setDragArea();
            }
            else {
                this.dragLimit = { left: 0, right: 0, bottom: 0, top: 0 };
                this.borderWidth = { top: 0, left: 0 };
            }
            pos = { left: this.position.left - this.parentClientRect.left, top: this.position.top - this.parentClientRect.top };
            if (this.clone) {
                this.diffX = this.position.left - this.offset.left;
                this.diffY = this.position.top - this.offset.top;
            }
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["h" /* setStyleAttribute */])(dragTargetElement, {
                position: 'absolute', top: (pos.top - this.diffY) + 'px', left: (pos.left - this.diffX) + 'px'
            });
            __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDragStart);
            __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDestroy);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["d" /* isVisible */])(dragTargetElement)) {
                __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDrag, this);
                __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDragStop, this);
                this.setGlobalDroppables(false, this.element, dragTargetElement);
            }
            else {
                document.body.classList.remove('e-prevent-select');
            }
        }
    };
    Draggable.prototype.calculateParentPosition = function (ele) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(ele)) {
            return { left: 0, top: 0 };
        }
        var rect = ele.getBoundingClientRect();
        var style = getComputedStyle(ele);
        return {
            left: (rect.left + window.pageXOffset) - parseInt(style.marginLeft, 10),
            top: (rect.top + window.pageYOffset) - parseInt(style.marginTop, 10)
        };
    };
    Draggable.prototype.intDrag = function (evt) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        var left;
        var top;
        this.position = this.getMousePosition(evt);
        var docHeight = this.getDocumentWidthHeight('Height');
        if (docHeight < this.position.top) {
            this.position.top = docHeight;
        }
        var docWidth = this.getDocumentWidthHeight('Width');
        if (docWidth < this.position.left) {
            this.position.left = docWidth;
        }
        if (this.drag) {
            var curTarget = this.getProperTargetElement(evt);
            this.trigger('drag', { event: evt, element: this.element, target: curTarget });
        }
        var eleObj = this.checkTargetElement(evt);
        if (eleObj.target && eleObj.instance) {
            eleObj.instance.intOver(evt, eleObj.target);
            eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
            this.hoverObject = eleObj;
        }
        else if (this.hoverObject) {
            this.hoverObject.instance.intOut(evt, eleObj.target);
            this.hoverObject.instance.dragData[this.scope] = null;
            this.hoverObject = null;
        }
        var helperElement = this.droppables[this.scope].helper;
        this.parentClientRect = this.calculateParentPosition(this.helperElement.offsetParent);
        var tLeft = this.parentClientRect.left;
        var tTop = this.parentClientRect.top;
        var intCoord = this.getCoordinates(evt);
        var pagex = intCoord.pageX;
        var pagey = intCoord.pageY;
        var dLeft = this.position.left - this.diffX;
        var dTop = this.position.top - this.diffY;
        if (this.dragArea) {
            var styles = getComputedStyle(helperElement);
            if (this.pageX !== pagex) {
                var helperWidth = helperElement.offsetWidth + (parseFloat(styles.marginLeft)
                    + parseFloat(styles.marginRight));
                if (this.dragLimit.left > dLeft) {
                    left = this.dragLimit.left;
                }
                else if (this.dragLimit.right < dLeft + helperWidth) {
                    left = this.dragLimit.right - helperWidth;
                }
                else {
                    left = dLeft;
                }
            }
            if (this.pageY !== pagey) {
                var helperHeight = helperElement.offsetHeight + (parseFloat(styles.marginTop)
                    + parseFloat(styles.marginBottom));
                if (this.dragLimit.top > dTop) {
                    top = this.dragLimit.top;
                }
                else if (this.dragLimit.bottom < dTop + helperHeight) {
                    top = this.dragLimit.bottom - helperHeight;
                }
                else {
                    top = dTop;
                }
            }
        }
        else {
            left = dLeft;
            top = dTop;
        }
        var iTop = tTop + this.borderWidth.top;
        var iLeft = tLeft + this.borderWidth.left;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["h" /* setStyleAttribute */])(helperElement, { top: (top - iTop) + 'px', left: (left - iLeft) + 'px' });
        this.position.left = left;
        this.position.top = top;
        this.pageX = pagex;
        this.pageY = pagey;
    };
    Draggable.prototype.getDocumentWidthHeight = function (str) {
        var docBody = document.body;
        var docEle = document.documentElement;
        var returnValue = Math.max(docBody['scroll' + str], docEle['scroll' + str], docBody['offset' + str], docEle['offset' + str], docEle['client' + str]);
        return returnValue;
    };
    Draggable.prototype.intDragStop = function (evt) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* isUndefined */])(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        var type = ['touchend', 'pointerup', 'mouseup'];
        if (type.indexOf(evt.type) !== -1) {
            if (this.dragStop) {
                var curTarget = this.getProperTargetElement(evt);
                this.trigger('dragStop', { event: evt, element: this.element, target: curTarget, helper: this.helperElement });
            }
            this.intDestroy(evt);
        }
        else {
            this.element.setAttribute('aria-grabbed', 'false');
        }
        var eleObj = this.checkTargetElement(evt);
        if (eleObj.target && eleObj.instance) {
            eleObj.instance.dragStopCalled = true;
            eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
            eleObj.instance.intDrop(evt, eleObj.target);
        }
        this.setGlobalDroppables(true);
        document.body.classList.remove('e-prevent-select');
    };
    Draggable.prototype.intDestroy = function (evt) {
        this.toggleEvents();
        document.body.classList.remove('e-prevent-select');
        this.element.setAttribute('aria-grabbed', 'false');
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDragStart);
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDragStop);
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDestroy);
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(document, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchMoveEvent, this.intDrag);
    };
    Draggable.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    Draggable.prototype.getModuleName = function () {
        return 'draggable';
    };
    Draggable.prototype.setDragArea = function () {
        var eleWidthBound;
        var eleHeightBound;
        var top = 0;
        var left = 0;
        var ele;
        var type = typeof this.dragArea;
        if (type === 'string') {
            ele = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["a" /* select */])(this.dragArea);
        }
        else {
            ele = this.dragArea;
        }
        if (ele) {
            var elementArea = ele.getBoundingClientRect();
            eleWidthBound = elementArea.width ? elementArea.width : elementArea.right - elementArea.left;
            eleHeightBound = elementArea.height ? elementArea.height : elementArea.bottom - elementArea.top;
            var keys = ['Top', 'Left', 'Bottom', 'Right'];
            var styles = getComputedStyle(ele);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var tborder = styles['border' + key + 'Width'];
                var tpadding = styles['padding' + key];
                var lowerKey = key.toLowerCase();
                this.borderWidth[lowerKey] = isNaN(parseFloat(tborder)) ? 0 : parseFloat(tborder);
                this.padding[lowerKey] = isNaN(parseFloat(tpadding)) ? 0 : parseFloat(tpadding);
            }
            top = elementArea.top;
            left = elementArea.left;
            this.dragLimit.left = left + this.borderWidth.left + this.padding.left;
            this.dragLimit.top = top + this.borderWidth.top + this.padding.top;
            this.dragLimit.right = left + eleWidthBound - (this.borderWidth.right + this.padding.right);
            this.dragLimit.bottom = top + eleHeightBound - (this.borderWidth.bottom + this.padding.bottom);
        }
    };
    Draggable.prototype.getProperTargetElement = function (evt) {
        var intCoord = this.getCoordinates(evt);
        var ele;
        if (evt.target === this.helperElement || evt.type.indexOf('touch') !== -1) {
            this.helperElement.style.display = 'none';
            ele = document.elementFromPoint(intCoord.clientX, intCoord.clientY);
            this.helperElement.style.display = '';
        }
        else {
            ele = evt.target;
        }
        return ele;
    };
    Draggable.prototype.getMousePosition = function (evt) {
        var intCoord = this.getCoordinates(evt);
        var pageX = this.clone ? intCoord.pageX : intCoord.pageX - this.relativeXPosition;
        var pageY = this.clone ? intCoord.pageY : intCoord.pageY - this.relativeYPosition;
        return {
            left: pageX - (this.margin.left + this.cursorAt.left),
            top: pageY - (this.margin.top + this.cursorAt.top)
        };
    };
    Draggable.prototype.getCoordinates = function (evt) {
        if (evt.type.indexOf('touch') > -1) {
            return evt.changedTouches[0];
        }
        return evt;
    };
    Draggable.prototype.getHelperElement = function (evt) {
        var element;
        if (this.clone) {
            if (this.helper) {
                element = this.helper({ sender: evt, element: this.target });
            }
            else {
                element = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["c" /* createElement */])('div', { className: 'e-drag-helper e-block-touch', innerHTML: 'Draggable' });
                document.body.appendChild(element);
            }
        }
        else {
            element = this.element;
        }
        return element;
    };
    Draggable.prototype.setGlobalDroppables = function (reset, drag, helper) {
        this.droppables[this.scope] = reset ? null : {
            draggable: drag,
            helper: helper
        };
    };
    Draggable.prototype.checkTargetElement = function (evt) {
        var target = this.getProperTargetElement(evt);
        if (this.helperElement && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["k" /* compareElementParent */])(target, this.helperElement)) {
            this.helperElement.style.display = 'none';
            var cord = this.getCoordinates(evt);
            target = document.elementFromPoint(cord.clientX, cord.clientY);
            this.helperElement.style.display = '';
        }
        var dropIns = this.getDropInstance(target);
        if (!dropIns && target && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["b" /* isNullOrUndefined */])(target.parentNode)) {
            var parent_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["g" /* closest */])(target.parentNode, '.e-droppable') || target.parentElement;
            if (parent_1) {
                dropIns = this.getDropInstance(parent_1);
            }
        }
        return { target: target, instance: dropIns };
    };
    Draggable.prototype.getDropInstance = function (ele) {
        var name = 'getModuleName';
        var drop;
        var eleInst = ele && ele.ej2_instances;
        if (eleInst) {
            for (var _i = 0, eleInst_1 = eleInst; _i < eleInst_1.length; _i++) {
                var inst = eleInst_1[_i];
                if (inst[name]() === 'droppable') {
                    drop = inst;
                    break;
                }
            }
        }
        return drop;
    };
    Draggable.prototype.destroy = function () {
        this.toggleEvents(true);
        _super.prototype.destroy.call(this);
    };
    return Draggable;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["b" /* Complex */])({}, Position)
], Draggable.prototype, "cursorAt", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(true)
], Draggable.prototype, "clone", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Draggable.prototype, "dragArea", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Draggable.prototype, "drag", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Draggable.prototype, "dragStart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Draggable.prototype, "dragStop", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])(1)
], Draggable.prototype, "distance", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Draggable.prototype, "handle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Draggable.prototype, "abort", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Draggable.prototype, "helper", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('default')
], Draggable.prototype, "scope", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('')
], Draggable.prototype, "dragTarget", void 0);
Draggable = Draggable_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_3__notify_property_change__["e" /* NotifyPropertyChanges */]
], Draggable);

var Draggable_1;


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Droppable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notify_property_change__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_handler__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var Droppable = (function (_super) {
    __extends(Droppable, _super);
    function Droppable(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.mouseOver = false;
        _this.dragData = {};
        _this.dragStopCalled = false;
        _this.bind();
        return _this;
    }
    Droppable.prototype.bind = function () {
        this.wireEvents();
    };
    Droppable.prototype.wireEvents = function () {
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].add(this.element, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDrop, this);
    };
    Droppable.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    Droppable.prototype.getModuleName = function () {
        return 'droppable';
    };
    Droppable.prototype.intOver = function (event, element) {
        if (!this.mouseOver) {
            this.trigger('over', { event: event, target: element });
            this.mouseOver = true;
        }
    };
    Droppable.prototype.intOut = function (event, element) {
        if (this.mouseOver) {
            this.trigger('out', { evt: event, target: element });
            this.mouseOver = false;
        }
    };
    Droppable.prototype.intDrop = function (evt, element) {
        if (!this.dragStopCalled) {
            return;
        }
        else {
            this.dragStopCalled = false;
        }
        var accept = true;
        var drag = this.dragData[this.scope];
        var isDrag = drag ? (drag.helper && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["d" /* isVisible */])(drag.helper)) : false;
        var area;
        if (isDrag) {
            area = this.isDropArea(evt, drag.helper, element);
            if (this.accept) {
                accept = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dom__["e" /* matches */])(drag.helper, this.accept);
            }
        }
        if (isDrag && this.drop && area.canDrop && accept) {
            this.trigger('drop', { event: evt, target: area.target, droppedElement: drag.helper, dragData: drag });
        }
    };
    Droppable.prototype.isDropArea = function (evt, helper, element) {
        var area = { canDrop: true, target: element || evt.target };
        var isTouch = evt.type === 'touchend';
        if (isTouch || area.target === helper) {
            helper.style.display = 'none';
            var coord = isTouch ? (evt.changedTouches[0]) : evt;
            var ele = document.elementFromPoint(coord.clientX, coord.clientY);
            area.canDrop = false;
            area.canDrop = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["k" /* compareElementParent */])(ele, this.element);
            if (area.canDrop) {
                area.target = ele;
            }
            helper.style.display = '';
        }
        return area;
    };
    Droppable.prototype.destroy = function () {
        __WEBPACK_IMPORTED_MODULE_4__event_handler__["a" /* EventHandler */].remove(this.element, __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* Browser */].touchEndEvent, this.intDrop);
        _super.prototype.destroy.call(this);
    };
    return Droppable;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])()
], Droppable.prototype, "accept", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["a" /* Property */])('default')
], Droppable.prototype, "scope", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Droppable.prototype, "drop", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Droppable.prototype, "over", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__notify_property_change__["d" /* Event */])()
], Droppable.prototype, "out", void 0);
Droppable = __decorate([
    __WEBPACK_IMPORTED_MODULE_3__notify_property_change__["e" /* NotifyPropertyChanges */]
], Droppable);



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FormValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_handler__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notify_property_change__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ErrorOption;
(function (ErrorOption) {
    ErrorOption[ErrorOption["Message"] = 0] = "Message";
    ErrorOption[ErrorOption["Label"] = 1] = "Label";
})(ErrorOption || (ErrorOption = {}));
var FormValidator = FormValidator_1 = (function (_super) {
    __extends(FormValidator, _super);
    function FormValidator(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.validated = [];
        _this.errorRules = [];
        _this.allowSubmit = false;
        _this.required = 'required';
        _this.infoElement = null;
        _this.inputElement = null;
        _this.selectQuery = 'input:not([type=reset]):not([type=button]), select, textarea';
        _this.defaultMessages = {
            required: 'This field is required.',
            email: 'Please enter a valid email address.',
            url: 'Please enter a valid URL.',
            date: 'Please enter a valid date.',
            dateIso: 'Please enter a valid date ( ISO ).',
            number: 'Please enter a valid number.',
            digits: 'Please enter only digits.',
            maxLength: 'Please enter no more than {0} characters.',
            minLength: 'Please enter at least {0} characters.',
            rangeLength: 'Please enter a value between {0} and {1} characters long.',
            range: 'Please enter a value between {0} and {1}.',
            max: 'Please enter a value less than or equal to {0}.',
            min: 'Please enter a value greater than or equal to {0}.',
            regex: 'Please enter a correct value.'
        };
        element = typeof element === 'string' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* select */])(element, document) : element;
        if (_this.element != null) {
            _this.element.setAttribute('novalidate', '');
            _this.wireEvents();
        }
        else {
            return undefined;
        }
        return _this;
    }
    FormValidator.prototype.addRules = function (name, rules) {
        if (this.rules.hasOwnProperty(name)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* extend */])(this.rules[name], rules, {});
        }
        else {
            this.rules[name] = rules;
        }
    };
    FormValidator.prototype.removeRules = function (name, rules) {
        if (!name && !rules) {
            this.rules = {};
        }
        else if (this.rules[name] && !rules) {
            delete this.rules[name];
        }
        else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(this.rules[name] && rules)) {
            for (var i = 0; i < rules.length; i++) {
                delete this.rules[name][rules[i]];
            }
        }
        else {
            return;
        }
    };
    FormValidator.prototype.validate = function (selected) {
        if (selected) {
            this.validateRules(selected);
        }
        else {
            var rules = Object.keys(this.rules);
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var name_1 = rules_1[_i];
                if (this.rules[name_1][this.required]) {
                    this.validateRules(name_1);
                }
            }
        }
        return this.errorRules.length === 0;
    };
    FormValidator.prototype.reset = function () {
        this.errorRules = [];
        this.validated = [];
        this.element.reset();
        var elements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])(this.selectQuery, this.element);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var input = element;
            input.removeAttribute('aria-invalid');
            input.classList.remove(this.errorClass);
            if (input.name.length > 0) {
                this.getInputElement(input.name);
                this.getErrorElement(input.name);
                this.hideMessage(input.name);
            }
            input.classList.remove(this.validClass);
        }
    };
    FormValidator.prototype.getInputElement = function (name) {
        this.inputElement = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* select */])('[name=' + name + ']', this.element));
        return this.inputElement;
    };
    FormValidator.prototype.destroy = function () {
        this.reset();
        this.unwireEvents();
        var elements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])('.' + this.errorClass + ', .' + this.validClass, this.element);
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            element.remove();
        }
        _super.prototype.destroy.call(this);
    };
    FormValidator.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    ;
    FormValidator.prototype.getModuleName = function () {
        return 'formValidator';
    };
    FormValidator.prototype.wireEvents = function () {
        var inputElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])(this.selectQuery, this.element);
        for (var _i = 0, inputElements_1 = inputElements; _i < inputElements_1.length; _i++) {
            var input = inputElements_1[_i];
            if (FormValidator_1.isCheckable(input)) {
                __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(input, 'click', this.clickHandler, this);
            }
            else if (input.tagName === 'SELECT') {
                __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(input, 'change', this.changeHandler, this);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(input, 'focusout', this.focusOutHandler, this);
                __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(input, 'keyup', this.keyUpHandler, this);
            }
        }
        __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].add(this.element, 'submit', this.submitHandler, this);
    };
    FormValidator.prototype.unwireEvents = function () {
        var inputElements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])(this.selectQuery, this.element);
        for (var _i = 0, inputElements_2 = inputElements; _i < inputElements_2.length; _i++) {
            var input = inputElements_2[_i];
            __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].clearEvents(input);
        }
        __WEBPACK_IMPORTED_MODULE_3__event_handler__["a" /* EventHandler */].remove(this.element, 'submit', this.submitHandler);
    };
    FormValidator.prototype.focusOutHandler = function (e) {
        this.trigger('focusout', e);
        var element = e.target;
        if (this.rules[element.name]) {
            if (this.rules[element.name][this.required] || element.value.length > 0) {
                this.validate(element.name);
            }
            else if (this.validated.indexOf(element.name) === -1) {
                this.validated.push(element.name);
            }
        }
    };
    FormValidator.prototype.keyUpHandler = function (e) {
        this.trigger('keyup', e);
        var element = e.target;
        var excludeKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
        if (e.which === 9 && !this.rules[element.name][this.required]) {
            return;
        }
        if (this.validated.indexOf(element.name) !== -1 && this.rules[element.name] && excludeKeys.indexOf(e.which) === -1) {
            this.validate(element.name);
        }
    };
    FormValidator.prototype.clickHandler = function (e) {
        this.trigger('click', e);
        var element = e.target;
        if (element.type !== 'submit') {
            this.validate(element.name);
        }
        else if (element.getAttribute('formnovalidate') !== null) {
            this.allowSubmit = true;
        }
    };
    FormValidator.prototype.changeHandler = function (e) {
        this.trigger('change', e);
        var element = e.target;
        this.validate(element.name);
    };
    FormValidator.prototype.submitHandler = function (e) {
        this.trigger('submit', e);
        if (!this.allowSubmit && !this.validate()) {
            e.preventDefault();
        }
        else {
            this.allowSubmit = false;
        }
    };
    FormValidator.prototype.validateRules = function (name) {
        var rules = Object.keys(this.rules[name]);
        this.getInputElement(name);
        this.getErrorElement(name);
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
            var rule = rules_2[_i];
            var errorRule = { name: name, message: this.getErrorMessage(this.rules[name][rule], rule) };
            if (!this.isValid(name, rule) && !this.inputElement.classList.contains(this.ignore)) {
                this.removeErrorRules(name);
                this.errorRules.push(errorRule);
                this.inputElement.setAttribute('aria-invalid', 'true');
                this.inputElement.setAttribute('aria-describedby', this.inputElement.id + '-info');
                if (!this.infoElement) {
                    this.createErrorElement(name, errorRule.message);
                }
                else {
                    this.showMessage(errorRule);
                }
                this.inputElement.classList.add(this.errorClass);
                this.inputElement.classList.remove(this.validClass);
                this.trigger('validationComplete', errorRule);
                if (rule === 'required') {
                    this.inputElement.setAttribute('aria-required', 'true');
                    break;
                }
            }
            else {
                this.hideMessage(name);
            }
        }
    };
    FormValidator.prototype.isValid = function (name, rule) {
        var params = this.rules[name][rule];
        var param = (params instanceof Array && typeof params[1] === 'string') ? params[0] : params;
        var currentRule = this.rules[name][rule];
        var args = { value: this.inputElement.value, param: param, element: this.inputElement };
        this.trigger('validationBegin', args);
        if (typeof currentRule[0] === 'function') {
            var fn = currentRule[0];
            return fn.call(this, { element: this.inputElement, value: this.inputElement.value });
        }
        else if (FormValidator_1.isCheckable(this.inputElement)) {
            if (rule !== 'required') {
                return true;
            }
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["b" /* selectAll */])('input[name=' + name + ']:checked', this.element).length > 0;
        }
        else {
            return FormValidator_1.checkValidator[rule](args);
        }
    };
    FormValidator.prototype.getErrorMessage = function (ruleValue, rule) {
        var message = (ruleValue instanceof Array && typeof ruleValue[1] === 'string') ? ruleValue[1] : this.defaultMessages[rule];
        var formats = message.match(/{(\d)}/g);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* isNullOrUndefined */])(formats)) {
            for (var i = 0; i < formats.length; i++) {
                var value = ruleValue instanceof Array ? ruleValue[i] : ruleValue;
                message = message.replace(formats[i], value);
            }
        }
        return message;
    };
    FormValidator.prototype.createErrorElement = function (name, message) {
        var errorElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["c" /* createElement */])(this.errorElement, {
            className: this.errorClass,
            innerHTML: message,
            attrs: { for: name }
        });
        if (this.errorOption === ErrorOption.Message) {
            errorElement.classList.remove(this.errorClass);
            errorElement.classList.add('e-message');
            errorElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["c" /* createElement */])(this.errorContainer, { className: this.errorClass, innerHTML: errorElement.outerHTML });
        }
        errorElement.id = this.inputElement.name + '-info';
        if (this.customPlacement != null) {
            this.customPlacement.call(this, this.inputElement, errorElement);
        }
        else {
            this.inputElement.parentNode.insertBefore(errorElement, this.inputElement.nextSibling);
        }
        errorElement.style.display = 'block';
        this.getErrorElement(name);
        this.validated.push(name);
        this.checkRequired(name);
    };
    FormValidator.prototype.getErrorElement = function (name) {
        this.infoElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* select */])(this.errorElement + '.' + this.errorClass, this.inputElement.parentElement);
        if (!this.infoElement) {
            this.infoElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* select */])(this.errorElement + '.' + this.errorClass + '[for="' + name + '"]');
        }
        return this.infoElement;
    };
    FormValidator.prototype.removeErrorRules = function (name) {
        for (var i = 0; i < this.errorRules.length; i++) {
            var rule = this.errorRules[i];
            if (rule.name === name) {
                this.errorRules.splice(i, 1);
            }
        }
    };
    FormValidator.prototype.showMessage = function (errorRule) {
        this.infoElement.style.display = 'block';
        this.infoElement.innerHTML = errorRule.message;
        this.checkRequired(errorRule.name);
    };
    FormValidator.prototype.hideMessage = function (name) {
        if (this.infoElement) {
            this.infoElement.style.display = 'none';
            this.removeErrorRules(name);
            this.inputElement.classList.add(this.validClass);
            this.inputElement.classList.remove(this.errorClass);
            this.inputElement.setAttribute('aria-invalid', 'false');
        }
    };
    FormValidator.prototype.checkRequired = function (name) {
        if (!this.rules[name][this.required] && !this.inputElement.value.length) {
            this.infoElement.innerHTML = this.inputElement.value;
            this.infoElement.setAttribute('aria-invalid', 'false');
            this.hideMessage(name);
        }
    };
    FormValidator.isCheckable = function (input) {
        var inputType = input.getAttribute('type');
        return inputType && (inputType === 'checkbox' || inputType === 'radio' || inputType === 'submit');
    };
    return FormValidator;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */]));
FormValidator.checkValidator = {
    required: function (option) {
        return option.value.length > 0;
    },
    email: function (option) {
        return new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
            '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$').test(option.value);
    },
    url: function (option) {
        return new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\‌​+~#=]+)' +
            '+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?').test(option.value);
    },
    date: function (option) {
        return !isNaN(new Date(option.value).getTime());
    },
    dateIso: function (option) {
        return new RegExp('^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$').test(option.value);
    },
    number: function (option) {
        return !isNaN(Number(option.value)) && option.value.indexOf(' ') === -1;
    },
    digits: function (option) {
        return new RegExp('^[0-9]*$').test(option.value);
    },
    maxLength: function (option) {
        return option.value.length <= option.param;
    },
    minLength: function (option) {
        return option.value.length >= option.param;
    },
    rangeLength: function (option) {
        var param = option.param;
        return option.value.length >= param[0] && option.value.length <= param[1];
    },
    range: function (option) {
        var param = option.param;
        return !isNaN(Number(option.value)) && Number(option.value) >= param[0] && Number(option.value) <= param[1];
    },
    max: function (option) {
        return !isNaN(Number(option.value)) && Number(option.value) <= option.param;
    },
    min: function (option) {
        return !isNaN(Number(option.value)) && Number(option.value) >= option.param;
    },
    regex: function (option) {
        return new RegExp(option.param).test(option.value);
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('e-hidden')
], FormValidator.prototype, "ignore", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])({})
], FormValidator.prototype, "rules", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('e-error')
], FormValidator.prototype, "errorClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('e-valid')
], FormValidator.prototype, "validClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('label')
], FormValidator.prototype, "errorElement", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])('div')
], FormValidator.prototype, "errorContainer", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["a" /* Property */])(ErrorOption.Label)
], FormValidator.prototype, "errorOption", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "focusout", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "keyup", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "click", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "change", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "submit", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "validationBegin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "validationComplete", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__notify_property_change__["d" /* Event */])()
], FormValidator.prototype, "customPlacement", void 0);
FormValidator = FormValidator_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_4__notify_property_change__["e" /* NotifyPropertyChanges */]
], FormValidator);

var FormValidator_1;


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyboardEvents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notify_property_change__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var keyCode = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'control': 17,
    'alt': 18,
    'pause': 19,
    'capslock': 20,
    'space': 22,
    'escape': 27,
    'pageup': 33,
    'pagedown': 34,
    'end': 35,
    'home': 36,
    'leftarrow': 37,
    'uparrow': 38,
    'rightarrow': 39,
    'downarrow': 40,
    'insert': 45,
    'delete': 46,
    'f1': 112,
    'f2': 113,
    'f3': 114,
    'f4': 115,
    'f5': 116,
    'f6': 117,
    'f7': 118,
    'f8': 119,
    'f9': 120,
    'f10': 121,
    'f11': 122,
    'f12': 123,
    'semicolon': 186,
    'plus': 187,
    'comma': 188,
    'minus': 189,
    'dot': 190,
    'forwardslash': 191,
    'graveaccent': 192,
    'openbracket': 219,
    'backslash': 220,
    'closebracket': 221,
    'singlequote': 222
};
var KeyboardEvents = KeyboardEvents_1 = (function (_super) {
    __extends(KeyboardEvents, _super);
    function KeyboardEvents(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.keyPressHandler = function (e) {
            var isAltKey = e.altKey;
            var isCtrlKey = e.ctrlKey;
            var isShiftKey = e.shiftKey;
            var curkeyCode = e.which;
            var keys = Object.keys(_this.keyConfigs);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var rKeyObj = KeyboardEvents_1.getKeyConfigData(_this.keyConfigs[key]);
                if (isAltKey === rKeyObj.altKey && isCtrlKey === rKeyObj.ctrlKey &&
                    isShiftKey === rKeyObj.shiftKey && curkeyCode === rKeyObj.keyCode) {
                    e.action = key;
                    if (_this.keyAction) {
                        _this.keyAction(e);
                    }
                }
            }
        };
        _this.bind();
        return _this;
    }
    KeyboardEvents.prototype.destroy = function () {
        this.unwireEvents();
        _super.prototype.destroy.call(this);
    };
    KeyboardEvents.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    ;
    KeyboardEvents.prototype.bind = function () {
        this.wireEvents();
    };
    KeyboardEvents.prototype.getModuleName = function () {
        return 'keyboard';
    };
    KeyboardEvents.prototype.wireEvents = function () {
        this.element.addEventListener(this.eventName, this.keyPressHandler);
    };
    KeyboardEvents.prototype.unwireEvents = function () {
        this.element.removeEventListener(this.eventName, this.keyPressHandler);
    };
    KeyboardEvents.getKeyConfigData = function (config) {
        if (config in this.configCache) {
            return this.configCache[config];
        }
        var keys = config.toLowerCase().split('+');
        var keyData = {
            altKey: (keys.indexOf('alt') !== -1 ? true : false),
            ctrlKey: (keys.indexOf('ctrl') !== -1 ? true : false),
            shiftKey: (keys.indexOf('shift') !== -1 ? true : false),
            keyCode: null
        };
        if (keys[keys.length - 1].length > 1 && !!Number(keys[keys.length - 1])) {
            keyData.keyCode = Number(keys[keys.length - 1]);
        }
        else {
            keyData.keyCode = KeyboardEvents_1.getKeyCode(keys[keys.length - 1]);
        }
        KeyboardEvents_1.configCache[config] = keyData;
        return keyData;
    };
    KeyboardEvents.getKeyCode = function (keyVal) {
        return keyCode[keyVal] || keyVal.toUpperCase().charCodeAt(0);
    };
    return KeyboardEvents;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */]));
KeyboardEvents.configCache = {};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__notify_property_change__["a" /* Property */])({})
], KeyboardEvents.prototype, "keyConfigs", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__notify_property_change__["a" /* Property */])('keyup')
], KeyboardEvents.prototype, "eventName", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__notify_property_change__["d" /* Event */])()
], KeyboardEvents.prototype, "keyAction", void 0);
KeyboardEvents = KeyboardEvents_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__notify_property_change__["e" /* NotifyPropertyChanges */]
], KeyboardEvents);

var KeyboardEvents_1;


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return L10n; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internationalization__ = __webpack_require__(19);


var L10n = (function () {
    function L10n(controlName, localeStrings, locale) {
        this.controlName = controlName;
        this.localeStrings = localeStrings;
        this.setLocale(locale || __WEBPACK_IMPORTED_MODULE_1__internationalization__["d" /* defaultCulture */]);
    }
    L10n.prototype.setLocale = function (locale) {
        var intLocale = this.intGetControlConstant(L10n.locale, locale);
        if (!intLocale) {
            if (locale !== 'en-US') {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["i" /* throwError */])('The specified locale or controlname not found in the locale object');
            }
            else {
                this.currentLocale = this.localeStrings;
            }
        }
        else {
            this.currentLocale = intLocale;
        }
    };
    L10n.load = function (localeObject) {
        this.locale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(this.locale, localeObject, {}, true);
    };
    L10n.prototype.getConstant = function (prop) {
        return this.currentLocale[prop] || this.localeStrings[prop] || '';
    };
    L10n.prototype.intGetControlConstant = function (curObject, locale) {
        if (curObject[locale]) {
            return curObject[locale][this.controlName];
        }
        return null;
    };
    return L10n;
}());

L10n.locale = {};


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvgRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

var SvgRenderer = (function () {
    function SvgRenderer(rootID) {
        this.svgLink = 'http://www.w3.org/2000/svg';
        this.rootId = rootID;
    }
    SvgRenderer.prototype.getOptionValue = function (options, key) {
        return options[key];
    };
    SvgRenderer.prototype.createSvg = function (options) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(options.id)) {
            options.id = this.rootId + '_svg';
        }
        this.svgObj = document.getElementById(options.id);
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(document.getElementById(options.id))) {
            this.svgObj = document.createElementNS(this.svgLink, 'svg');
        }
        this.svgObj = this.setElementAttributes(options, this.svgObj);
        this.setSVGSize(options.width, options.height);
        return this.svgObj;
    };
    SvgRenderer.prototype.setSVGSize = function (width, height) {
        var element = document.getElementById(this.rootId);
        var size = !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(element) ? element.getBoundingClientRect() : null;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.width) || this.width <= 0) {
            this.svgObj.setAttribute('width', width ? width.toString() : size.width.toString());
        }
        else {
            this.svgObj.setAttribute('width', this.width.toString());
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.height) || this.height <= 0) {
            this.svgObj.setAttribute('height', height ? height.toString() : '450');
        }
        else {
            this.svgObj.setAttribute('height', this.height.toString());
        }
    };
    SvgRenderer.prototype.drawPath = function (options) {
        var path = document.getElementById(options.id);
        if (path === null) {
            path = document.createElementNS(this.svgLink, 'path');
        }
        path = this.setElementAttributes(options, path);
        return path;
    };
    SvgRenderer.prototype.drawLine = function (options) {
        var line = document.getElementById(options.id);
        if (line === null) {
            line = document.createElementNS(this.svgLink, 'line');
        }
        line = this.setElementAttributes(options, line);
        return line;
    };
    SvgRenderer.prototype.drawRectangle = function (options) {
        var rectangle = document.getElementById(options.id);
        if (rectangle === null) {
            rectangle = document.createElementNS(this.svgLink, 'rect');
        }
        rectangle = this.setElementAttributes(options, rectangle);
        return rectangle;
    };
    SvgRenderer.prototype.drawCircle = function (options) {
        var circle = document.getElementById(options.id);
        if (circle === null) {
            circle = document.createElementNS(this.svgLink, 'circle');
        }
        circle = this.setElementAttributes(options, circle);
        return circle;
    };
    SvgRenderer.prototype.drawPolyline = function (options) {
        var polyline = document.getElementById(options.id);
        if (polyline === null) {
            polyline = document.createElementNS(this.svgLink, 'polyline');
        }
        polyline = this.setElementAttributes(options, polyline);
        return polyline;
    };
    SvgRenderer.prototype.drawEllipse = function (options) {
        var ellipse = document.getElementById(options.id);
        if (ellipse === null) {
            ellipse = document.createElementNS(this.svgLink, 'ellipse');
        }
        ellipse = this.setElementAttributes(options, ellipse);
        return ellipse;
    };
    SvgRenderer.prototype.drawPolygon = function (options) {
        var polygon = document.getElementById(options.id);
        if (polygon === null) {
            polygon = document.createElementNS(this.svgLink, 'polygon');
        }
        polygon = this.setElementAttributes(options, polygon);
        return polygon;
    };
    SvgRenderer.prototype.drawImage = function (options) {
        var img = document.createElementNS(this.svgLink, 'image');
        img.setAttributeNS(null, 'height', options.height.toString());
        img.setAttributeNS(null, 'width', options.width.toString());
        img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.href);
        img.setAttributeNS(null, 'x', options.x.toString());
        img.setAttributeNS(null, 'y', options.y.toString());
        img.setAttributeNS(null, 'id', options.id);
        img.setAttributeNS(null, 'visibility', options.visibility);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(this.getOptionValue(options, 'clip-path'))) {
            img.setAttributeNS(null, 'clip-path', this.getOptionValue(options, 'clip-path'));
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(options.preserveAspectRatio)) {
            img.setAttributeNS(null, 'preserveAspectRatio', options.preserveAspectRatio);
        }
        return img;
    };
    SvgRenderer.prototype.createText = function (options, label) {
        var text = document.createElementNS(this.svgLink, 'text');
        text = this.setElementAttributes(options, text);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(label)) {
            text.textContent = label;
        }
        return text;
    };
    SvgRenderer.prototype.createTSpan = function (options, label) {
        var tSpan = document.createElementNS(this.svgLink, 'tspan');
        tSpan = this.setElementAttributes(options, tSpan);
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(label)) {
            tSpan.textContent = label;
        }
        return tSpan;
    };
    SvgRenderer.prototype.createTitle = function (text) {
        var title = document.createElementNS(this.svgLink, 'title');
        title.textContent = text;
        return title;
    };
    SvgRenderer.prototype.createDefs = function () {
        var defs = document.createElementNS(this.svgLink, 'defs');
        return defs;
    };
    SvgRenderer.prototype.createClipPath = function (options) {
        var clipPath = document.createElementNS(this.svgLink, 'clipPath');
        clipPath = this.setElementAttributes(options, clipPath);
        return clipPath;
    };
    SvgRenderer.prototype.createForeignObject = function (options) {
        var foreignObject = document.createElementNS(this.svgLink, 'foreignObject');
        foreignObject = this.setElementAttributes(options, foreignObject);
        return foreignObject;
    };
    SvgRenderer.prototype.createGroup = function (options) {
        var group = document.createElementNS(this.svgLink, 'g');
        group = this.setElementAttributes(options, group);
        return group;
    };
    SvgRenderer.prototype.createPattern = function (options, element) {
        var pattern = document.createElementNS(this.svgLink, element);
        pattern = this.setElementAttributes(options, pattern);
        return pattern;
    };
    SvgRenderer.prototype.createRadialGradient = function (colors, name, options) {
        var colorName;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            var newOptions = {
                'id': this.rootId + '_' + name + 'radialGradient',
                'cx': options.cx + '%',
                'cy': options.cy + '%',
                'r': options.r + '%',
                'fx': options.fx + '%',
                'fy': options.fy + '%'
            };
            this.drawGradient('radialGradient', newOptions, colors);
            colorName = 'url(#' + this.rootId + '_' + name + 'radialGradient)';
        }
        else {
            colorName = colors[0].color.toString();
        }
        return colorName;
    };
    SvgRenderer.prototype.createLinearGradient = function (colors, name, options) {
        var colorName;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(colors[0].colorStop)) {
            var newOptions = {
                'id': this.rootId + '_' + name + 'linearGradient',
                'x1': options.x1 + '%',
                'y1': options.y1 + '%',
                'x2': options.x2 + '%',
                'y2': options.y2 + '%'
            };
            this.drawGradient('linearGradient', newOptions, colors);
            colorName = 'url(#' + this.rootId + '_' + name + 'linearGradient)';
        }
        else {
            colorName = colors[0].color.toString();
        }
        return colorName;
    };
    SvgRenderer.prototype.drawGradient = function (gradientType, options, colors) {
        var defs = this.createDefs();
        var gradient = document.createElementNS(this.svgLink, gradientType);
        gradient = this.setElementAttributes(options, gradient);
        for (var i = 0; i < colors.length; i++) {
            var stop_1 = document.createElementNS(this.svgLink, 'stop');
            stop_1.setAttribute('offset', colors[i].colorStop);
            stop_1.setAttribute('stop-color', colors[i].color);
            stop_1.setAttribute('stop-opacity', '1');
            gradient.appendChild(stop_1);
        }
        defs.appendChild(gradient);
        return defs;
    };
    SvgRenderer.prototype.drawClipPath = function (options) {
        var defs = this.createDefs();
        var clipPath = this.createClipPath({ 'id': options.id });
        var rect = this.drawRectangle(options);
        clipPath.appendChild(rect);
        defs.appendChild(clipPath);
        return defs;
    };
    SvgRenderer.prototype.drawCircularClipPath = function (options) {
        var defs = this.createDefs();
        var clipPath = this.createClipPath({ 'id': options.id });
        var circle = this.drawCircle(options);
        clipPath.appendChild(circle);
        defs.appendChild(clipPath);
        return defs;
    };
    SvgRenderer.prototype.setElementAttributes = function (options, element) {
        var keys = Object.keys(options);
        for (var i = 0; i < keys.length; i++) {
            element.setAttribute(keys[i], options[keys[i]]);
        }
        return element;
    };
    return SvgRenderer;
}());



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = expression;
/* harmony export (immutable) */ __webpack_exports__["b"] = compile;
var LINES = new RegExp('\\n|\\r|\\s\\s+', 'g');
var QUOTES = new RegExp(/'|"/g);
var IF_STMT = new RegExp('if ?\\(');
var ELSE_STMT = new RegExp('else');
var FOR_STMT = new RegExp('for ?\\(');
var IF_OR_FOR = new RegExp('(\/if|\/for)');
var CALL_FUNCTION = new RegExp('\\((.*)\\)', '');
var NOT_NUMBER = new RegExp('^[0-9]+$', 'g');
var WORD = new RegExp('[\\w"\'.\\s+]+', 'g');
var DBL_QUOTED_STR = new RegExp('"(.*?)"', 'g');
var exp = new RegExp('\\${([^}]*)}', 'g');
function expression(value) {
    if (value) {
        exp = value;
    }
    return exp;
}
function compile(template, helper) {
    var argName = 'data';
    var evalExpResult = evalExp(template, argName, helper);
    var fnCode = "var str=\"" + evalExpResult + "\"; return str;";
    var fn = new Function(argName, fnCode);
    return fn.bind(helper);
}
function evalExp(str, nameSpace, helper) {
    var localKeys = [];
    return str.replace(LINES, '').replace(DBL_QUOTED_STR, '\'$1\'').replace(exp, function (match, cnt, offset, matchStr) {
        var matches = cnt.match(CALL_FUNCTION);
        if (matches) {
            var rlStr = matches[1];
            if (IF_STMT.test(cnt)) {
                cnt = '"; ' + cnt.replace(matches[1], rlStr.replace(WORD, function (str) {
                    str = str.trim();
                    return addNameSpace(str, !(QUOTES.test(str)) && (localKeys.indexOf(str) === -1), nameSpace, localKeys);
                })) + '{ \n str = str + "';
            }
            else if (FOR_STMT.test(cnt)) {
                var rlStr_1 = matches[1].split(' of ');
                cnt = '"; ' + cnt.replace(matches[1], function (mtc) {
                    localKeys.push(rlStr_1[0]);
                    localKeys.push(rlStr_1[0] + 'Index');
                    return 'var i=0; i < ' + addNameSpace(rlStr_1[1], true, nameSpace, localKeys) + '.length; i++';
                }) + '{ \n ' + rlStr_1[0] + '= ' + addNameSpace(rlStr_1[1], true, nameSpace, localKeys)
                    + '[i]; \n var ' + rlStr_1[0] + 'Index=i; \n str = str + "';
            }
            else {
                var fnStr = cnt.split('(');
                var fNameSpace = (helper && helper.hasOwnProperty(fnStr[0]) ? 'this.' : 'global');
                fNameSpace = (/\./.test(fnStr[0]) ? '' : fNameSpace);
                cnt = '" + ' + (fNameSpace === 'global' ? '' : fNameSpace) +
                    cnt.replace(rlStr, addNameSpace(matches[1].replace(',', nameSpace + '.'), (fNameSpace === 'global' ? false : true), nameSpace, localKeys)) +
                    '+"';
            }
        }
        else if (ELSE_STMT.test(cnt)) {
            cnt = '"; ' + cnt.replace(ELSE_STMT, '} else { \n str = str + "');
        }
        else if (!!cnt.match(IF_OR_FOR)) {
            cnt = cnt.replace(IF_OR_FOR, '"; \n } \n str = str + "');
        }
        else {
            cnt = '"+' + addNameSpace(cnt, (localKeys.indexOf(cnt) === -1), nameSpace, localKeys) + '+"';
        }
        return cnt;
    });
}
function addNameSpace(str, addNS, nameSpace, ignoreList) {
    return ((addNS && !(NOT_NUMBER.test(str)) && ignoreList.indexOf(str.split('.')[0]) === -1) ? nameSpace + '.' + str : str);
}


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwipeSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Touch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notify_property_change__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__child_property__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_handler__ = __webpack_require__(7);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SwipeSettings = (function (_super) {
    __extends(SwipeSettings, _super);
    function SwipeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SwipeSettings;
}(__WEBPACK_IMPORTED_MODULE_4__child_property__["a" /* ChildProperty */]));

__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["a" /* Property */])(50)
], SwipeSettings.prototype, "swipeThresholdDistance", void 0);
var swipeRegex = /(Up|Down)/;
var Touch = (function (_super) {
    __extends(Touch, _super);
    function Touch(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.startEvent = function (evt) {
            var point = (evt.changedTouches ? evt.changedTouches[0] : evt);
            _this.isTouchMoved = false;
            _this.movedDirection = '';
            _this.startPoint = _this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
            _this.startEventData = point;
            _this.hScrollLocked = _this.vScrollLocked = false;
            _this.tStampStart = Date.now();
            _this.timeOutTapHold = setTimeout(function () { _this.tapholdEvent(evt); }, _this.tapholdThreshold);
            __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].add(_this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchMoveEvent, _this.moveEvent, _this);
            __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].add(_this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchEndEvent, _this.endEvent, _this);
        };
        _this.moveEvent = function (evt) {
            var point = evt.changedTouches ? evt.changedTouches[0] : evt;
            _this.movedPoint = point;
            _this.isTouchMoved = !(point.clientX === _this.startPoint.clientX && point.clientY === _this.startPoint.clientY);
            var eScrollArgs = {};
            if (_this.isTouchMoved) {
                clearTimeout(_this.timeOutTapHold);
                _this.calcScrollPoints(evt);
                var scrollArg = {
                    startEvents: _this.startEventData,
                    originalEvent: evt, startX: _this.startPoint.clientX,
                    startY: _this.startPoint.clientY, distanceX: _this.distanceX,
                    distanceY: _this.distanceY, scrollDirection: _this.scrollDirection,
                    velocity: _this.getVelocity(point)
                };
                eScrollArgs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(eScrollArgs, {}, scrollArg);
                _this.trigger('scroll', eScrollArgs);
                _this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
            }
        };
        _this.endEvent = function (evt) {
            clearTimeout(_this.timeOutTapHold);
            var point = evt;
            if (evt.changedTouches) {
                point = evt.changedTouches[0];
            }
            _this.isTouchMoved = !(point.clientX === _this.startPoint.clientX && point.clientY === _this.startPoint.clientY);
            _this.endPoint = point;
            var dblTapTriggred = false;
            var eDblTapArgs;
            var eTapArgs;
            var eSwipeArgs;
            var tDistance = _this.swipeSettings.swipeThresholdDistance;
            _this.calcPoints(evt);
            var swipeArgs = {
                originalEvent: evt,
                startEvents: _this.startEventData,
                startX: _this.startPoint.clientX,
                startY: _this.startPoint.clientY,
                distanceX: _this.distanceX, distanceY: _this.distanceY, swipeDirection: _this.movedDirection,
                velocity: _this.getVelocity(point)
            };
            if (!_this.isTouchMoved) {
                eDblTapArgs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(eDblTapArgs, _this.defaultArgs, {});
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isNullOrUndefined */])(_this.lastTapTime) && (new Date().getTime() - _this.lastTapTime) < _this.doubleTapThreshold) {
                    clearTimeout(_this.timeOutTap);
                    dblTapTriggred = true;
                    _this.trigger('doubleTap', eDblTapArgs);
                }
                if (!dblTapTriggred) {
                    eTapArgs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(eTapArgs, _this.defaultArgs, {});
                    _this.timeOutTap = setTimeout(function () {
                        _this.trigger('tap', eTapArgs);
                    }, (typeof _this.doubleTap !== 'function' ? 0 : _this.doubleTapThreshold));
                }
            }
            else {
                eSwipeArgs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* extend */])(eSwipeArgs, _this.defaultArgs, swipeArgs);
                var canTrigger = false;
                var ele = _this.element;
                var scrollBool = _this.isScrollable(ele);
                var moved = swipeRegex.test(_this.movedDirection);
                if ((tDistance < _this.distanceX && !moved) || (tDistance < _this.distanceY && moved)) {
                    if (!scrollBool) {
                        canTrigger = true;
                    }
                    else {
                        canTrigger = _this.checkSwipe(ele, moved);
                    }
                }
                if (canTrigger) {
                    _this.trigger('swipe', eSwipeArgs);
                }
            }
            _this.lastTapTime = new Date().getTime();
            __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(_this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchMoveEvent, _this.moveEvent);
            __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(_this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchEndEvent, _this.endEvent);
        };
        _this.bind();
        return _this;
    }
    Touch.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    Touch.prototype.bind = function () {
        this.wireEvents();
        if (__WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].isIE) {
            this.element.classList.add('e-block-touch');
        }
    };
    Touch.prototype.destroy = function () {
        this.unwireEvents();
        _super.prototype.destroy.call(this);
    };
    Touch.prototype.wireEvents = function () {
        __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].add(this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchStartEvent, this.startEvent, this);
    };
    Touch.prototype.unwireEvents = function () {
        __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchStartEvent, this.startEvent);
    };
    Touch.prototype.getModuleName = function () {
        return 'touch';
    };
    Touch.prototype.isScrollable = function (element) {
        var eleStyle = getComputedStyle(element);
        var style = eleStyle.overflow + eleStyle.overflowX + eleStyle.overflowY;
        if ((/(auto|scroll)/).test(style)) {
            return true;
        }
        return false;
    };
    Touch.prototype.tapholdEvent = function (evt) {
        var eTapArgs;
        __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchMoveEvent, this.moveEvent);
        __WEBPACK_IMPORTED_MODULE_5__event_handler__["a" /* EventHandler */].remove(this.element, __WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */].touchEndEvent, this.endEvent);
        eTapArgs = { originalEvent: evt };
        this.trigger('taphold', eTapArgs);
    };
    Touch.prototype.calcPoints = function (evt) {
        var point = evt.changedTouches ? evt.changedTouches[0] : evt;
        this.defaultArgs = { originalEvent: evt };
        this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.startPoint.clientX)));
        this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.startPoint.clientY)));
        if (this.distanceX > this.distanceY) {
            this.movedDirection = (point.clientX > this.startPoint.clientX) ? 'Right' : 'Left';
        }
        else {
            this.movedDirection = (point.clientY < this.startPoint.clientY) ? 'Up' : 'Down';
        }
    };
    Touch.prototype.calcScrollPoints = function (evt) {
        var point = evt.changedTouches ? evt.changedTouches[0] : evt;
        this.defaultArgs = { originalEvent: evt };
        this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.lastMovedPoint.clientX)));
        this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.lastMovedPoint.clientY)));
        if ((this.distanceX > this.distanceY || this.hScrollLocked === true) && this.vScrollLocked === false) {
            this.scrollDirection = (point.clientX > this.lastMovedPoint.clientX) ? 'Right' : 'Left';
            this.hScrollLocked = true;
        }
        else {
            this.scrollDirection = (point.clientY < this.lastMovedPoint.clientY) ? 'Up' : 'Down';
            this.vScrollLocked = true;
        }
    };
    Touch.prototype.getVelocity = function (pnt) {
        var newX = pnt.clientX;
        var newY = pnt.clientY;
        var newT = Date.now();
        var xDist = newX - this.startPoint.clientX;
        var yDist = newY - this.startPoint.clientX;
        var interval = newT - this.tStampStart;
        return Math.sqrt(xDist * xDist + yDist * yDist) / interval;
    };
    Touch.prototype.checkSwipe = function (ele, flag) {
        var keys = ['scroll', 'offset'];
        var temp = flag ? ['Height', 'Top'] : ['Width', 'Left'];
        if ((ele[keys[0] + temp[0]] <= ele[keys[1] + temp[0]])) {
            return true;
        }
        return (ele[keys[0] + temp[1]] === 0) ||
            (ele[keys[1] + temp[0]] + ele[keys[0] + temp[1]] >= ele[keys[0] + temp[0]]);
    };
    return Touch;
}(__WEBPACK_IMPORTED_MODULE_3__base__["a" /* Base */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "tap", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "doubleTap", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "taphold", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "swipe", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["d" /* Event */])()
], Touch.prototype, "scroll", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["a" /* Property */])(500)
], Touch.prototype, "doubleTapThreshold", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["a" /* Property */])(750)
], Touch.prototype, "tapholdThreshold", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__notify_property_change__["b" /* Complex */])({}, SwipeSettings)
], Touch.prototype, "swipeSettings", void 0);
Touch = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__notify_property_change__["e" /* NotifyPropertyChanges */]
], Touch);



/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(68), __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, event_handler_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createElement(tagName, properties) {
        var element = document.createElement(tagName);
        if (typeof (properties) === 'undefined') {
            return element;
        }
        element.innerHTML = (properties.innerHTML ? properties.innerHTML : '');
        if (properties.className !== undefined) {
            element.className = properties.className;
        }
        if (properties.id !== undefined) {
            element.id = properties.id;
        }
        if (properties.styles !== undefined) {
            element.setAttribute('style', properties.styles);
        }
        if (properties.attrs !== undefined) {
            attributes(element, properties.attrs);
        }
        return element;
    }
    exports.createElement = createElement;
    function addClass(elements, classes) {
        var classList = getClassList(classes);
        for (var _i = 0, _a = elements; _i < _a.length; _i++) {
            var ele = _a[_i];
            for (var _b = 0, classList_1 = classList; _b < classList_1.length; _b++) {
                var className = classList_1[_b];
                if (!ele.classList.contains(className)) {
                    ele.classList.add(className);
                }
            }
        }
        return elements;
    }
    exports.addClass = addClass;
    function removeClass(elements, classes) {
        var classList = getClassList(classes);
        for (var _i = 0, _a = elements; _i < _a.length; _i++) {
            var ele = _a[_i];
            if (ele.className !== '') {
                for (var _b = 0, classList_2 = classList; _b < classList_2.length; _b++) {
                    var className = classList_2[_b];
                    ele.classList.remove(className);
                }
            }
        }
        return elements;
    }
    exports.removeClass = removeClass;
    function getClassList(classes) {
        var classList = [];
        if (typeof classes === 'string') {
            classList.push(classes);
        }
        else {
            classList = classes;
        }
        return classList;
    }
    function isVisible(element) {
        var ele = element;
        return (ele.style.visibility === '' && ele.offsetWidth > 0);
    }
    exports.isVisible = isVisible;
    function prepend(fromElements, toElement) {
        var docFrag = document.createDocumentFragment();
        for (var _i = 0, _a = fromElements; _i < _a.length; _i++) {
            var ele = _a[_i];
            docFrag.appendChild(ele);
        }
        toElement.insertBefore(docFrag, toElement.firstElementChild);
        return fromElements;
    }
    exports.prepend = prepend;
    function append(fromElements, toElement) {
        var docFrag = document.createDocumentFragment();
        for (var _i = 0, _a = fromElements; _i < _a.length; _i++) {
            var ele = _a[_i];
            docFrag.appendChild(ele);
        }
        toElement.appendChild(docFrag);
        return fromElements;
    }
    exports.append = append;
    function detach(element) {
        var parentNode = element.parentNode;
        return parentNode.removeChild(element);
    }
    exports.detach = detach;
    function remove(element) {
        var parentNode = element.parentNode;
        event_handler_1.EventHandler.clearEvents(element);
        parentNode.removeChild(element);
    }
    exports.remove = remove;
    function attributes(element, attributes) {
        var keys = Object.keys(attributes);
        var ele = element;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            ele.setAttribute(key, attributes[key]);
        }
        return ele;
    }
    exports.attributes = attributes;
    function select(selector, context) {
        if (context === void 0) { context = document; }
        return context.querySelector(selector);
    }
    exports.select = select;
    function selectAll(selector, context) {
        if (context === void 0) { context = document; }
        var nodeList = context.querySelectorAll(selector);
        return nodeList;
    }
    exports.selectAll = selectAll;
    function closest(element, selector) {
        var el = element;
        if (typeof el.closest === 'function') {
            return el.closest(selector);
        }
        while (el && el.nodeType === 1) {
            if (matches(el, selector)) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    }
    exports.closest = closest;
    function siblings(element) {
        var siblings = [];
        var childNodes = Array.prototype.slice.call(element.parentNode.childNodes);
        for (var _i = 0, childNodes_1 = childNodes; _i < childNodes_1.length; _i++) {
            var curNode = childNodes_1[_i];
            if (curNode.nodeType === Node.ELEMENT_NODE && element !== curNode) {
                siblings.push(curNode);
            }
        }
        return siblings;
    }
    exports.siblings = siblings;
    function getAttributeOrDefault(element, property, value) {
        var attrVal = element.getAttribute(property);
        if (util_1.isNullOrUndefined(attrVal)) {
            element.setAttribute(property, value.toString());
            attrVal = value;
        }
        return attrVal;
    }
    exports.getAttributeOrDefault = getAttributeOrDefault;
    function setStyleAttribute(element, attrs) {
        if (attrs !== undefined) {
            Object.keys(attrs).forEach(function (key) {
                element.style[key] = attrs[key];
            });
        }
    }
    exports.setStyleAttribute = setStyleAttribute;
    function classList(element, addClasses, removeClasses) {
        addClass([element], addClasses);
        removeClass([element], removeClasses);
    }
    exports.classList = classList;
    function matches(element, selector) {
        var matches = element.matches || element.msMatchesSelector || element.webkitMatchesSelector;
        if (matches) {
            return matches.call(element, selector);
        }
        else {
            return [].indexOf.call(document.querySelectorAll(selector), element) !== -1;
        }
    }
    exports.matches = matches;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventHandler = (function () {
        function EventHandler() {
        }
        EventHandler.addOrGetEventData = function (element) {
            if ('__eventList' in element) {
                return element.__eventList.events;
            }
            else {
                element.__eventList = {};
                return element.__eventList.events = [];
            }
        };
        EventHandler.add = function (element, eventName, listener, bindTo, intDebounce) {
            var eventData = EventHandler.addOrGetEventData(element);
            var debounceListener;
            if (intDebounce) {
                debounceListener = util_1.debounce(listener, intDebounce);
            }
            else {
                debounceListener = listener;
            }
            if (bindTo) {
                debounceListener = debounceListener.bind(bindTo);
            }
            var event = eventName.split(' ');
            for (var i = 0; i < event.length; i++) {
                eventData.push({
                    name: event[i],
                    listener: listener,
                    debounce: debounceListener
                });
                element.addEventListener(event[i], debounceListener);
            }
        };
        EventHandler.remove = function (element, eventName, listener) {
            var eventData = EventHandler.addOrGetEventData(element);
            var event = eventName.split(' ');
            var _loop_1 = function (j) {
                var index = -1;
                var debounceListener;
                if (eventData && eventData.length !== 0) {
                    eventData.some(function (x, i) {
                        return x.name === event[j] && x.listener.toString() === listener.toString() ?
                            (index = i, debounceListener = x.debounce, true) : false;
                    });
                }
                if (index !== -1) {
                    eventData.splice(index, 1);
                }
                element.removeEventListener(event[j], debounceListener);
            };
            for (var j = 0; j < event.length; j++) {
                _loop_1(j);
            }
        };
        EventHandler.clearEvents = function (element) {
            var eventData;
            var copyData;
            eventData = EventHandler.addOrGetEventData(element);
            copyData = util_1.extend([], copyData, eventData);
            for (var i = 0; i < copyData.length; i++) {
                element.removeEventListener(copyData[i].name, copyData[i].debounce);
                eventData.shift();
            }
        };
        EventHandler.trigger = function (element, eventName, eventProp) {
            var eventData = EventHandler.addOrGetEventData(element);
            var fn = null;
            for (var _i = 0, eventData_1 = eventData; _i < eventData_1.length; _i++) {
                var event_1 = eventData_1[_i];
                if (event_1.name === eventName) {
                    event_1.debounce.call(this, eventProp);
                }
            }
        };
        return EventHandler;
    }());
    exports.EventHandler = EventHandler;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manager__ = __webpack_require__(32);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DataManager", function() { return __WEBPACK_IMPORTED_MODULE_0__manager__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Deferred", function() { return __WEBPACK_IMPORTED_MODULE_0__manager__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__query__ = __webpack_require__(20);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return __WEBPACK_IMPORTED_MODULE_1__query__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Predicate", function() { return __WEBPACK_IMPORTED_MODULE_1__query__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__adaptors__ = __webpack_require__(31);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Adaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "JsonAdaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UrlAdaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ODataAdaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ODataV4Adaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "WebApiAdaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "WebMethodAdaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RemoteSaveAdaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CacheAdaptor", function() { return __WEBPACK_IMPORTED_MODULE_2__adaptors__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(21);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DataUtil", function() { return __WEBPACK_IMPORTED_MODULE_3__util__["a"]; });






/***/ }),
/* 70 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73), __webpack_require__(70)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(71);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, helper_1, helper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var axisPadding = 10;
    var CartesianAxisLayoutPanel = (function () {
        function CartesianAxisLayoutPanel(chartModule) {
            this.chart = chartModule;
            this.padding = 5;
        }
        CartesianAxisLayoutPanel.prototype.measureAxis = function (rect) {
            var chart = this.chart;
            this.seriesClipRect = new helper_2.Rect(rect.x, rect.y, rect.width, rect.height);
            this.initialClipRect = rect;
            this.leftSize = 0;
            this.rightSize = 0;
            this.topSize = 0;
            this.bottomSize = 0;
            this.measureRowAxis(chart, this.initialClipRect);
            this.initialClipRect = helper_1.subtractThickness(this.initialClipRect, new helper_2.Thickness(this.leftSize, this.rightSize, 0, 0));
            this.measureColumnAxis(chart, this.initialClipRect);
            this.initialClipRect = helper_1.subtractThickness(this.initialClipRect, new helper_2.Thickness(0, 0, this.topSize, this.bottomSize));
            if (!this.chart.delayRedraw) {
                this.calculateAxisSize(this.initialClipRect);
            }
            this.leftSize = 0;
            this.rightSize = 0;
            this.topSize = 0;
            this.bottomSize = 0;
            this.measureRowAxis(chart, this.initialClipRect);
            this.seriesClipRect = helper_1.subtractThickness(this.seriesClipRect, new helper_2.Thickness(this.leftSize, this.rightSize, 0, 0));
            this.measureColumnAxis(chart, this.initialClipRect);
            this.seriesClipRect = helper_1.subtractThickness(this.seriesClipRect, new helper_2.Thickness(0, 0, this.topSize, this.bottomSize));
            if (!this.chart.delayRedraw) {
                chart.refreshAxis();
                this.calculateAxisSize(this.seriesClipRect);
            }
        };
        CartesianAxisLayoutPanel.prototype.measureRowAxis = function (chart, rect) {
            var row;
            this.calculateRowSize(rect);
            for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
                var item = _a[_i];
                row = item;
                row.nearSizes = [];
                row.farSizes = [];
                this.arrangeAxis(row);
                this.measureDefinition(row, chart, new helper_2.Size(chart.availableSize.width, row.computedHeight), rect);
                if (this.leftSize < helper_1.sum(row.nearSizes)) {
                    this.leftSize = helper_1.sum(row.nearSizes);
                }
                if (this.rightSize < helper_1.sum(row.farSizes)) {
                    this.rightSize = helper_1.sum(row.farSizes);
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.measureColumnAxis = function (chart, rect) {
            var column;
            this.calculateColumnSize(rect);
            for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
                var item = _a[_i];
                column = item;
                column.farSizes = [];
                column.nearSizes = [];
                this.arrangeAxis(column);
                this.measureDefinition(column, chart, new helper_2.Size(column.computedWidth, chart.availableSize.height), rect);
                if (this.bottomSize < helper_1.sum(column.nearSizes)) {
                    this.bottomSize = helper_1.sum(column.nearSizes);
                }
                if (this.topSize < helper_1.sum(column.farSizes)) {
                    this.topSize = helper_1.sum(column.farSizes);
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.measureDefinition = function (definition, chart, size, clipRect) {
            var axis;
            var axisType;
            for (var _i = 0, _a = definition.axes; _i < _a.length; _i++) {
                var axis_1 = _a[_i];
                axis_1.getModule(chart);
                axis_1.baseModule.calculateRangeAndInterval(size, axis_1);
                definition.computeSize(axis_1, clipRect);
            }
            if (definition.farSizes.length > 0) {
                definition.farSizes[definition.farSizes.length - 1] -= axisPadding;
            }
            if (definition.nearSizes.length > 0) {
                definition.nearSizes[definition.nearSizes.length - 1] -= axisPadding;
            }
        };
        CartesianAxisLayoutPanel.prototype.calculateAxisSize = function (rect) {
            var chart = this.chart;
            var row;
            var column;
            var definition;
            var axis;
            var nearCount = 0;
            var farCount = 0;
            var size = 0;
            var x;
            var y;
            this.calculateRowSize(rect);
            for (var i = 0, len = chart.rows.length; i < len; i++) {
                row = chart.rows[i];
                nearCount = 0;
                farCount = 0;
                for (var j = 0, len_1 = row.axes.length; j < len_1; j++) {
                    axis = row.axes[j];
                    if (axis.rect.height === 0) {
                        axis.rect.height = row.computedHeight;
                        size = 0;
                        for (var k = i + 1, len_2 = i + axis.span; k < len_2; k++) {
                            definition = chart.rows[k];
                            size += definition.computedHeight;
                        }
                        axis.rect.y = (row.computedTop - size) + axis.plotOffset;
                        axis.rect.height = (axis.rect.height + size) - (2 * axis.plotOffset);
                        axis.rect.width = 0;
                    }
                    if (axis.opposedPosition) {
                        x = rect.x + rect.width + helper_1.sum(helper_1.subArray(row.farSizes, farCount));
                        axis.rect.x = axis.rect.x >= x ? axis.rect.x : x;
                        farCount++;
                    }
                    else {
                        x = rect.x - helper_1.sum(helper_1.subArray(row.nearSizes, nearCount));
                        axis.rect.x = axis.rect.x <= x ? axis.rect.x : x;
                        nearCount++;
                    }
                }
            }
            this.calculateColumnSize(rect);
            for (var i = 0, len = chart.columns.length; i < len; i++) {
                column = chart.columns[i];
                nearCount = 0;
                farCount = 0;
                for (var j = 0, len_3 = column.axes.length; j < len_3; j++) {
                    axis = column.axes[j];
                    if (axis.rect.width === 0) {
                        for (var k = i, len_4 = (i + axis.span); k < len_4; k++) {
                            definition = chart.columns[k];
                            axis.rect.width += definition.computedWidth;
                        }
                        axis.rect.x = column.computedLeft + axis.plotOffset;
                        axis.rect.width -= (2 * axis.plotOffset);
                        axis.rect.height = 0;
                    }
                    if (axis.opposedPosition) {
                        y = rect.y - helper_1.sum(helper_1.subArray(column.farSizes, farCount));
                        axis.rect.y = axis.rect.y <= y ? axis.rect.y : y;
                        farCount++;
                    }
                    else {
                        y = rect.y + rect.height + helper_1.sum(helper_1.subArray(column.nearSizes, nearCount));
                        axis.rect.y = axis.rect.y >= y ? axis.rect.y : y;
                        nearCount++;
                    }
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.measure = function () {
            var chart = this.chart;
            var row;
            var column;
            var definition;
            var axis;
            var actualIndex;
            var span;
            var axisLength;
            for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
                var axis_2 = _a[_i];
                if (axis_2.orientation === 'Vertical') {
                    chart.verticalAxes.push(axis_2);
                    actualIndex = this.getActualRow(axis_2);
                    row = chart.rows[actualIndex];
                    this.pushAxis(row, axis_2);
                    span = ((actualIndex + axis_2.span) > chart.rows.length ? chart.rows.length : (actualIndex + axis_2.span));
                    for (var j = actualIndex + 1; j < span; j++) {
                        definition = chart.rows[j];
                        definition.axes[row.axes.length - 1] = axis_2;
                        chart.rows[j] = definition;
                    }
                    chart.rows[actualIndex] = row;
                }
                else {
                    chart.horizontalAxes.push(axis_2);
                    actualIndex = this.getActualColumn(axis_2);
                    column = chart.columns[actualIndex];
                    this.pushAxis(column, axis_2);
                    span = ((actualIndex + axis_2.span) > chart.columns.length ? chart.columns.length : (actualIndex + axis_2.span));
                    for (var j = actualIndex + 1; j < span; j++) {
                        definition = chart.columns[j];
                        definition.axes[column.axes.length - 1] = axis_2;
                        chart.columns[j] = definition;
                    }
                    chart.columns[actualIndex] = column;
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.pushAxis = function (definition, axis) {
            for (var i = 0, len = definition.axes.length; i <= len; i++) {
                if (!definition.axes[i]) {
                    definition.axes[i] = axis;
                    break;
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.arrangeAxis = function (definition) {
            var axisCollection = [];
            for (var i = 0, len = definition.axes.length; i <= len; i++) {
                if (definition.axes[i]) {
                    axisCollection.push(definition.axes[i]);
                }
            }
            definition.axes = axisCollection;
        };
        CartesianAxisLayoutPanel.prototype.getActualColumn = function (axis) {
            var actualLength = this.chart.columns.length;
            var pos = axis.columnIndex;
            var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
            return result;
        };
        CartesianAxisLayoutPanel.prototype.getActualRow = function (axis) {
            var actualLength = this.chart.rows.length;
            var pos = axis.rowIndex;
            var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
            return result;
        };
        CartesianAxisLayoutPanel.prototype.calculateRowSize = function (rect) {
            var chart = this.chart;
            var row;
            var rowTop = rect.y + rect.height;
            var height = 0;
            var remainingHeight = Math.max(0, rect.height);
            for (var i = 0, len = chart.rows.length; i < len; i++) {
                row = chart.rows[i];
                if (row.height.indexOf('%') !== -1) {
                    height = Math.min(remainingHeight, (rect.height * parseInt(row.height, 10) / 100));
                }
                else {
                    height = Math.min(remainingHeight, parseInt(row.height, 10));
                }
                height = (i !== (len - 1)) ? height : remainingHeight;
                row.computedHeight = height;
                rowTop -= height;
                row.computedTop = rowTop;
                remainingHeight -= height;
            }
        };
        CartesianAxisLayoutPanel.prototype.calculateColumnSize = function (rect) {
            var chart = this.chart;
            var column;
            var columnLeft = rect.x;
            var width = 0;
            var remainingWidth = Math.max(0, rect.width);
            for (var i = 0, len = chart.columns.length; i < len; i++) {
                column = chart.columns[i];
                if (column.width.indexOf('%') !== -1) {
                    width = Math.min(remainingWidth, (rect.width * parseInt(column.width, 10) / 100));
                }
                else {
                    width = Math.min(remainingWidth, parseInt(column.width, 10));
                }
                width = (i !== (len - 1)) ? width : remainingWidth;
                column.computedWidth = width;
                column.computedLeft = columnLeft;
                columnLeft += width;
                remainingWidth -= width;
            }
        };
        CartesianAxisLayoutPanel.prototype.renderAxes = function () {
            var chart = this.chart;
            var axis;
            var axisElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisCollection' });
            var definitionElement = chart.renderer.createGroup({ id: chart.element.id + 'DefintionLine' });
            for (var i = 0, len = chart.axisCollections.length; i < len; i++) {
                axis = chart.axisCollections[i];
                this.element = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i });
                if (axis.orientation === 'Horizontal') {
                    if (axis.lineStyle.width > 0) {
                        this.drawAxisLine(axis, i, axis.plotOffset, 0);
                    }
                    if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                        this.drawXAxisGridLine(axis, i);
                    }
                    if (axis.visible) {
                        this.drawXAxisLabels(axis, i);
                    }
                    this.drawXAxisTitle(axis, i);
                }
                else {
                    if (axis.lineStyle.width > 0) {
                        this.drawAxisLine(axis, i, 0, axis.plotOffset);
                    }
                    if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                        this.drawYAxisGridLine(axis, i);
                    }
                    if (axis.visible) {
                        this.drawYAxisLabels(axis, i);
                    }
                    this.drawYAxisTitle(axis, i);
                }
                axisElement.appendChild(this.element);
            }
            this.element = chart.renderer.createGroup({ id: chart.element.id + 'DefintionLine' });
            for (var j = 0, len = chart.rows.length; j < len; j++) {
                var row = chart.rows[j];
                if (row.border.color) {
                    this.drawBottomLine(row, j, true);
                }
            }
            for (var j = 0, len = chart.columns.length; j < len; j++) {
                var column = chart.columns[j];
                if (column.border.color) {
                    this.drawBottomLine(column, j, false);
                }
            }
            axisElement.appendChild(this.element);
            chart.svgObject.appendChild(axisElement);
        };
        CartesianAxisLayoutPanel.prototype.drawBottomLine = function (definition, index, isRow) {
            var chart = this.chart;
            var optionsLine = {};
            var x1;
            var x2;
            var y1;
            var y2;
            var definitionName;
            if (isRow) {
                definition = definition;
                y1 = y2 = definition.computedTop + definition.computedHeight;
                x1 = this.seriesClipRect.x;
                x2 = x1 + this.seriesClipRect.width;
                definitionName = 'Row';
            }
            else {
                definition = definition;
                x1 = x2 = definition.computedLeft;
                y1 = this.seriesClipRect.y;
                y2 = y1 + this.seriesClipRect.height;
                definitionName = 'Column';
            }
            optionsLine = {
                'id': chart.element.id + '_AxisBottom_' + definitionName + index,
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                'stroke-width': definition.border.width,
                'stroke': definition.border.color,
            };
            this.htmlObject = chart.renderer.drawLine(optionsLine);
            this.element.appendChild(this.htmlObject);
        };
        CartesianAxisLayoutPanel.prototype.drawAxisLine = function (axis, index, plotX, plotY) {
            var chart = this.chart;
            var optionsLine = {};
            var rect = axis.rect;
            optionsLine = {
                'id': chart.element.id + 'AxisLine_' + index,
                x1: rect.x - plotX,
                y1: rect.y - plotY,
                x2: rect.x + rect.width + plotX,
                y2: rect.y + rect.height + plotY,
                'stroke-dasharray': axis.lineStyle.dashArray,
                'stroke-width': axis.lineStyle.width,
                'stroke': axis.lineStyle.color
            };
            this.htmlObject = chart.renderer.drawLine(optionsLine);
            this.element.appendChild(this.htmlObject);
        };
        CartesianAxisLayoutPanel.prototype.drawYAxisGridLine = function (axis, index) {
            var chart = this.chart;
            var tempInterval;
            var pointY = 0;
            var majorGrid = '';
            var majorTick = '';
            var minorGird = '';
            var minorTick = '';
            var minorDirection;
            var tickSize = (axis.opposedPosition) ? axis.majorTickLines.height : -axis.majorTickLines.height;
            var axisLineSize = (axis.opposedPosition) ? axis.lineStyle.width / 2 : -axis.lineStyle.width / 2;
            var rect = axis.rect;
            var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ?
                0.5 : 0;
            var length = axis.visibleLabels.length;
            if (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks' && length > 0) {
                length += 1;
            }
            for (var i = 0; i < length; i++) {
                tempInterval = !axis.visibleLabels[i] ? (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel
                    : axis.visibleLabels[i].value - ticksbwtLabel;
                pointY = helper_1.valueToCoefficient(tempInterval, axis) * rect.height;
                pointY = (pointY * -1) + (rect.y + rect.height);
                if (pointY >= rect.y && (rect.y + rect.height) >= pointY) {
                    if ((helper_1.inside(tempInterval, axis.visibleRange)) || this.isBorder(axis, i, pointY)) {
                        majorGrid = majorGrid.concat('M ' + this.seriesClipRect.x + ' ' + (pointY) +
                            ' L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + pointY + ' ');
                    }
                    majorTick = majorTick.concat('M ' + (rect.x + axisLineSize) + ' ' + pointY +
                        ' L ' + (rect.x + tickSize + axisLineSize) + ' ' + pointY + ' ');
                }
                if ((axis.minorGridLines.width > 0 || axis.minorTickLines.width > 0) && axis.minorTicksPerInterval > 0) {
                    minorDirection = this.drawAxisMinorLine(axis, tempInterval, minorGird, minorTick);
                    minorGird = minorDirection[0];
                    minorTick = minorDirection[1];
                }
            }
            this.renderGridLine(axis, index, majorGrid, minorGird);
            this.renderTickLine(axis, index, majorTick, minorTick);
        };
        CartesianAxisLayoutPanel.prototype.isBorder = function (axis, index, value) {
            var chart = this.chart;
            var border = chart.chartArea.border;
            var rect = this.seriesClipRect;
            var orientation = axis.orientation;
            var start = (orientation === 'Horizontal') ? rect.x : rect.y;
            var size = (orientation === 'Horizontal') ? rect.width : rect.height;
            var startIndex = (orientation === 'Horizontal') ? 0 : axis.visibleLabels.length - 1;
            var endIndex = (orientation === 'Horizontal') ? axis.visibleLabels.length - 1 : 0;
            if (axis.plotOffset > 0) {
                return true;
            }
            else if ((value === start || value === (start + size)) && (border.width <= 0 || border.color === 'transparent')) {
                return true;
            }
            else if ((value !== start && index === startIndex) || (value !== (start + size) && index === endIndex)) {
                return true;
            }
            return false;
        };
        CartesianAxisLayoutPanel.prototype.drawYAxisLabels = function (axis, index) {
            var chart = this.chart;
            var pointX = 0;
            var pointY = 0;
            var elementSize;
            var options;
            var padding = axis.majorTickLines.height + this.padding + axis.lineStyle.width / 2;
            padding = (axis.opposedPosition) ? padding : -padding;
            var anchor = (axis.opposedPosition) ? 'start' : 'end';
            var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
            var rect = axis.rect;
            for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
                pointX = (rect.x + padding);
                elementSize = axis.visibleLabels[i].size;
                pointY = helper_1.valueToCoefficient(axis.visibleLabels[i].value, axis) * rect.height;
                pointY = Math.floor((pointY * -1) + (rect.y + rect.height));
                options = new helper_1.TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY + (elementSize.height / 4), anchor, axis.visibleLabels[i].text);
                if (axis.edgeLabelPlacement) {
                    switch (axis.edgeLabelPlacement) {
                        case 'None':
                            break;
                        case 'Hide':
                            if ((i === 0 && options.y > rect.y + rect.height) ||
                                ((i === axis.visibleLabels.length - 1) && options.y - elementSize.height / 2 < rect.y)) {
                                options.text = '';
                            }
                            break;
                        case 'Shift':
                            if (i === 0 && options.y > rect.y + rect.height) {
                                options.y = pointY = rect.y + rect.height;
                            }
                            else if ((i === axis.visibleLabels.length - 1) && (options.y - elementSize.height / 2 < rect.y)) {
                                options.y = pointY = rect.y + elementSize.height / 2;
                            }
                            break;
                    }
                }
                helper_1.textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement);
            }
            if (!chart.delayRedraw) {
                this.element.appendChild(labelElement);
            }
            else if (axis.visible) {
                this.createZoomingLabel(this.chart, labelElement, axis, index);
            }
        };
        CartesianAxisLayoutPanel.prototype.drawYAxisTitle = function (axis, index) {
            var chart = this.chart;
            var labelRotation = (axis.opposedPosition) ? 90 : -90;
            var elementSize = helper_1.measureText(axis.title, axis.titleStyle);
            var padding = axis.majorTickLines.height + axis.maxLabelSize.width + this.padding * 2;
            var rect = axis.rect;
            padding = axis.opposedPosition ? padding : -padding;
            var x = rect.x + padding;
            var y = rect.y + rect.height / 2;
            var options = new helper_1.TextOption(chart.element.id + '_AxisTitle_' + index, x, y - this.padding, 'middle', axis.title, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')');
            var element = helper_1.textElement(options, axis.titleStyle, axis.titleStyle.color, this.element);
            element.setAttribute('aria-label', axis.description || axis.title);
            element.setAttribute('tabindex', axis.tabIndex.toString());
        };
        CartesianAxisLayoutPanel.prototype.drawXAxisGridLine = function (axis, index) {
            var chart = this.chart;
            var tempInterval;
            var pointX = 0;
            var majorGrid = '';
            var majorTick = '';
            var minorGird = '';
            var minorTick = '';
            var minorDirection;
            var tickSize = (axis.opposedPosition) ? -axis.majorTickLines.height : axis.majorTickLines.height;
            var axisLineSize = (axis.opposedPosition) ? -axis.lineStyle.width / 2 : axis.lineStyle.width / 2;
            var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ?
                0.5 : 0;
            var rect = axis.rect;
            var length = axis.visibleLabels.length;
            if (axis.valueType === 'Category' && length > 0 && axis.labelPlacement === 'BetweenTicks') {
                length += 1;
            }
            for (var i = 0; i < length; i++) {
                tempInterval = axis.visibleLabels[i] ? axis.visibleLabels[i].value - ticksbwtLabel
                    : (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel;
                pointX = (helper_1.valueToCoefficient(tempInterval, axis) * rect.width) + rect.x;
                if (pointX >= rect.x && (rect.x + rect.width) >= pointX) {
                    if (helper_1.inside(tempInterval, axis.visibleRange) || this.isBorder(axis, i, pointX)) {
                        majorGrid = majorGrid.concat('M ' + pointX + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height) +
                            ' L ' + pointX + ' ' + this.seriesClipRect.y + ' ');
                    }
                    majorTick = majorTick.concat('M ' + (pointX) + ' ' + (rect.y + axisLineSize) +
                        ' L ' + (pointX) + ' ' + (rect.y + tickSize + axisLineSize) + ' ');
                }
                if (axis.minorTicksPerInterval > 0 && (axis.minorGridLines.width > 0 || axis.minorTickLines.width > 0)) {
                    minorDirection = this.drawAxisMinorLine(axis, tempInterval, minorGird, minorTick);
                    minorGird = minorDirection[0];
                    minorTick = minorDirection[1];
                }
            }
            this.renderGridLine(axis, index, majorGrid, minorGird);
            this.renderTickLine(axis, index, majorTick, minorTick);
        };
        CartesianAxisLayoutPanel.prototype.drawAxisMinorLine = function (axis, tempInterval, minorGird, minorTick) {
            var value = tempInterval;
            var coor = 0;
            var position = 0;
            var range = axis.visibleRange;
            var lineWidth = axis.minorGridLines.width;
            var tickWidth = axis.minorTickLines.width;
            var direction = [];
            var tickSize = axis.opposedPosition ? -axis.minorTickLines.height : axis.minorTickLines.height;
            var rect = axis.rect;
            var logStart;
            var logEnd;
            var logInterval = 1;
            var logPosition = 1;
            if (axis.valueType === 'Logarithmic') {
                logStart = Math.pow(axis.logBase, value - range.interval);
                logEnd = Math.pow(axis.logBase, value);
                logInterval = (logEnd - logStart) / (axis.minorTicksPerInterval + 1);
                logPosition = logStart + logInterval;
            }
            if (axis.orientation === 'Horizontal') {
                for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                    value = this.findLogNumeric(axis, logPosition, logInterval, value);
                    logPosition += logInterval;
                    if (helper_1.inside(value, range)) {
                        position = Math.ceil(((value - range.min) / (range.max - range.min)) * rect.width);
                        coor = (Math.floor(position + rect.x) + lineWidth);
                        minorGird = minorGird.concat('M' + ' ' + coor + ' ' + (this.seriesClipRect.y + lineWidth)
                            + 'L ' + coor + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height + lineWidth));
                        coor = (Math.floor(position + rect.x) + tickWidth);
                        minorTick = minorTick.concat('M' + ' ' + coor + ' ' + (rect.y + lineWidth)
                            + 'L ' + coor + ' ' + (rect.y + tickSize + lineWidth));
                    }
                }
            }
            else {
                tickSize = axis.opposedPosition ? axis.minorTickLines.height : -axis.minorTickLines.height;
                for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                    value = this.findLogNumeric(axis, logPosition, logInterval, value);
                    if (helper_1.inside(value, range)) {
                        position = Math.ceil(((value - range.min) / (range.max - range.min)) * rect.height) * -1;
                        coor = (Math.floor(position + rect.y + rect.height) + lineWidth);
                        minorGird = minorGird.concat('M' + ' ' + (this.seriesClipRect.x) + ' ' + coor
                            + 'L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + coor);
                        coor = (Math.floor(position + rect.y + rect.height) + tickWidth);
                        minorTick = minorTick.concat('M' + ' ' + rect.x + ' ' + coor + 'L ' + (rect.x + tickSize) + ' ' + coor);
                    }
                    logPosition += logInterval;
                }
            }
            direction.push(minorGird);
            direction.push(minorTick);
            return direction;
        };
        CartesianAxisLayoutPanel.prototype.findLogNumeric = function (axis, logPosition, logInterval, value) {
            var range = axis.visibleRange;
            if (axis.valueType === 'Logarithmic') {
                value = helper_2.logBase(logPosition, axis.logBase);
            }
            else if (axis.valueType === 'DateTime') {
                value += axis.dateTimeInterval / (axis.minorTicksPerInterval + 1);
            }
            else {
                value += range.interval / (axis.minorTicksPerInterval + 1);
            }
            return value;
        };
        CartesianAxisLayoutPanel.prototype.drawXAxisLabels = function (axis, index) {
            var chart = this.chart;
            var pointX = 0;
            var pointY = 0;
            var elementSize;
            var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
            var padding = axis.majorTickLines.height + this.padding + axis.lineStyle.width / 2;
            var labelPadding;
            var rotateSize;
            var diffHeight;
            var yLocation;
            var angle;
            var anglePadding = ((axis.angle === 90 || axis.angle === -90)) ? -2 : 0;
            var rect = axis.rect;
            var options;
            var previousEnd = 0;
            for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
                pointX = (helper_1.valueToCoefficient(axis.visibleLabels[i].value, axis) * rect.width) + rect.x;
                elementSize = axis.visibleLabels[i].size;
                pointX -= elementSize.width / 2;
                labelPadding = (axis.opposedPosition) ?
                    -(padding + ((axis.angle !== 0) ? (3 * (elementSize.height / 4) + (2 * axis.maxLabelSize.height / 5)) : 0))
                    : padding + ((axis.angle !== 0) ? (3 * (elementSize.height / 4)) + (2 * axis.maxLabelSize.height / 5)
                        : (3 * (elementSize.height / 4)));
                pointY = (rect.y + labelPadding);
                options = new helper_1.TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, '', axis.visibleLabels[i].text);
                if (axis.edgeLabelPlacement) {
                    switch (axis.edgeLabelPlacement) {
                        case 'None':
                            break;
                        case 'Hide':
                            if ((i === 0 && options.x < rect.x) ||
                                ((i === axis.visibleLabels.length - 1) && (options.x + elementSize.width > rect.x + rect.width))) {
                                continue;
                            }
                            break;
                        case 'Shift':
                            if (i === 0 && options.x < rect.x) {
                                options.x = pointX = rect.x;
                            }
                            else if ((i === axis.visibleLabels.length - 1) && ((options.x + elementSize.width) > rect.x + rect.width)) {
                                options.x = pointX = rect.x + rect.width - elementSize.width;
                            }
                            break;
                    }
                }
                if (axis.angle % 360 === 0 && axis.labelIntersectAction === 'Hide' && options.x <= previousEnd) {
                    continue;
                }
                previousEnd = options.x + elementSize.width;
                if (axis.angle !== 0) {
                    angle = (axis.angle > 360) ? axis.angle % 360 : axis.angle;
                    rotateSize = helper_2.rotateTextSize(axis.labelStyle, axis.visibleLabels[i].text, angle, chart);
                    diffHeight = axis.maxLabelSize.height - Math.ceil(rotateSize.height - elementSize.height);
                    yLocation = axis.opposedPosition ? diffHeight / 2 : -diffHeight / 2;
                    options.transform = 'rotate(' + angle + ',' + (pointX + elementSize.width / 2 + anglePadding) + ','
                        + (pointY + yLocation) + ')';
                    options.y += yLocation;
                }
                helper_1.textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement);
            }
            if (!chart.delayRedraw) {
                this.element.appendChild(labelElement);
            }
            else if (axis.visible) {
                this.createZoomingLabel(this.chart, labelElement, axis, index);
            }
        };
        CartesianAxisLayoutPanel.prototype.drawXAxisTitle = function (axis, index) {
            var chart = this.chart;
            var elementSize = helper_1.measureText(axis.title, axis.titleStyle);
            var padding = axis.majorTickLines.height + axis.maxLabelSize.height + this.padding * 2;
            var rect = axis.rect;
            padding = axis.opposedPosition ? -(padding + elementSize.height / 4) : (padding + (3 * elementSize.height / 4));
            var options = new helper_1.TextOption(chart.element.id + '_AxisTitle_' + index, rect.x + rect.width / 2, rect.y + padding, 'middle', axis.title);
            var element = helper_1.textElement(options, axis.titleStyle, axis.titleStyle.color, this.element);
            element.setAttribute('aria-label', axis.description || axis.title);
            element.setAttribute('tabindex', axis.tabIndex.toString());
        };
        CartesianAxisLayoutPanel.prototype.renderTickLine = function (axis, index, majorTick, minorTick) {
            var options;
            var chart = this.chart;
            if (axis.majorTickLines.width > 0) {
                options = new helper_2.PathOption(chart.element.id + '_MajorTickLine_' + index, 'transparent', axis.majorTickLines.width, axis.majorTickLines.color, null, null, majorTick);
                this.htmlObject = chart.renderer.drawPath(options);
                this.element.appendChild(this.htmlObject);
            }
            if (axis.minorTickLines.width > 0) {
                options = new helper_2.PathOption(chart.element.id + '_MinorTickLine_' + index, 'transparent', axis.minorTickLines.width, axis.minorTickLines.color, null, null, minorTick);
                this.htmlObject = chart.renderer.drawPath(options);
                this.element.appendChild(this.htmlObject);
            }
        };
        CartesianAxisLayoutPanel.prototype.renderGridLine = function (axis, index, majorGrid, minorGird) {
            var chart = this.chart;
            var options;
            if (axis.majorGridLines.width > 0) {
                options = new helper_2.PathOption(chart.element.id + '_MajorGridLine_' + index, 'transparent', axis.majorGridLines.width, axis.majorGridLines.color, null, axis.majorGridLines.dashArray, majorGrid);
                this.htmlObject = chart.renderer.drawPath(options);
                this.element.appendChild(this.htmlObject);
            }
            if (axis.minorGridLines.width > 0) {
                options = new helper_2.PathOption(chart.element.id + '_MinorGridLine_' + index, 'transparent', axis.minorGridLines.width, axis.minorGridLines.color, null, axis.minorGridLines.dashArray, minorGird);
                this.htmlObject = chart.renderer.drawPath(options);
                this.element.appendChild(this.htmlObject);
            }
        };
        CartesianAxisLayoutPanel.prototype.createZoomingLabel = function (chart, labelElement, axis, index) {
            var parentNode = document.getElementById(chart.element.id + 'AxisGroup' + index);
            labelElement.setAttribute('opacity', '0.3');
            var zoomElement = chart.renderer.createGroup({
                id: chart.element.id + 'AxisLabels_Zoom' + index
            });
            zoomElement = helper_2.createZoomingLabels(chart, axis, zoomElement, index, axis.orientation === 'Vertical');
            parentNode.replaceChild(labelElement, document.getElementById(labelElement.id));
            if (helper_2.getElement(chart.element.id + 'AxisLabels_Zoom' + index)) {
                parentNode.replaceChild(zoomElement, document.getElementById(zoomElement.id));
            }
            else {
                parentNode.appendChild(zoomElement);
            }
        };
        return CartesianAxisLayoutPanel;
    }());
    exports.CartesianAxisLayoutPanel = CartesianAxisLayoutPanel;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(36), __webpack_require__(8), __webpack_require__(34), __webpack_require__(33), __webpack_require__(35), __webpack_require__(13), __webpack_require__(41), __webpack_require__(39), __webpack_require__(37), __webpack_require__(38), __webpack_require__(46), __webpack_require__(47), __webpack_require__(48), __webpack_require__(45), __webpack_require__(43), __webpack_require__(44), __webpack_require__(42), __webpack_require__(0), __webpack_require__(49), __webpack_require__(50), __webpack_require__(26), __webpack_require__(51), __webpack_require__(28), __webpack_require__(40), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, chart_1, axis_1, date_time_axis_1, category_axis_1, logarithmic_axis_1, base_1, line_series_1, column_series_1, area_series_1, bar_series_1, stacking_bar_series_1, stacking_column_series_1, step_line_series_1, stacking_area_series_1, scatter_series_1, spline_series_1, marker_1, helper_1, crosshair_1, tooltip_1, legend_1, zooming_1, selection_1, data_label_1, chart_series_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(chart_1);
    __export(axis_1);
    __export(date_time_axis_1);
    __export(category_axis_1);
    __export(logarithmic_axis_1);
    __export(base_1);
    __export(line_series_1);
    __export(column_series_1);
    __export(area_series_1);
    __export(bar_series_1);
    __export(stacking_bar_series_1);
    __export(stacking_column_series_1);
    __export(step_line_series_1);
    __export(stacking_area_series_1);
    __export(scatter_series_1);
    __export(spline_series_1);
    __export(marker_1);
    __export(helper_1);
    __export(crosshair_1);
    __export(tooltip_1);
    __export(legend_1);
    __export(zooming_1);
    __export(selection_1);
    __export(data_label_1);
    __export(chart_series_1);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(69)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Data = (function () {
        function Data(chartModule, series) {
            this.chartModule = chartModule;
            this.initDataManager(series.dataSource, series.query);
        }
        Data.prototype.initDataManager = function (dataSource, query) {
            this.dataManager = dataSource instanceof ej2_data_1.DataManager ? dataSource : new ej2_data_1.DataManager(dataSource);
            this.query = query instanceof ej2_data_1.Query ? query : new ej2_data_1.Query();
        };
        Data.prototype.generateQuery = function () {
            var chartObj = this.chartModule;
            var query = this.query.clone();
            return query;
        };
        Data.prototype.getData = function (query) {
            return this.dataManager.executeQuery(query);
        };
        return Data;
    }());
    exports.Data = Data;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(10), __webpack_require__(0), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, dom_1, helper_1, helper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Toolkit = (function () {
        function Toolkit(chart) {
            this.chart = chart;
            this.elementId = chart.element.id;
            this.selectionColor = '#ff4081';
            this.fillColor = '#737373';
        }
        Toolkit.prototype.createPanButton = function (childElement, parentElement, chart) {
            var render = this.chart.renderer;
            var fillColor = this.chart.zoomModule.isPanning ? this.selectionColor : this.fillColor;
            var direction = 'M5,3h2.3L7.275,5.875h1.4L8.65,3H11L8,0L5,3z M3,11V8.7l2.875,0.025v-1.4L3,7.35V5L0,8L3,';
            direction += '11z M11,13H8.7l0.025-2.875h-1.4L7.35,13H5l3,3L11,13z M13,5v2.3l-2.875-0.025v1.4L13,8.65V11l3-3L13,5z';
            childElement.id = this.elementId + '_Zooming_Pan';
            childElement.setAttribute('aria-label', 'Pan');
            this.panElements = childElement;
            childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Pan_1', 'transparent', {}, 1, new helper_1.Rect(0, 0, 16, 16))));
            childElement.appendChild(render.drawPath(new helper_1.PathOption(this.elementId + '_Zooming_Pan_2', fillColor, null, null, 1, null, direction)));
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.pan);
        };
        Toolkit.prototype.createZoomButton = function (childElement, parentElement, chart) {
            var render = this.chart.renderer;
            var fillColor = this.chart.zoomModule.isPanning ? this.fillColor : this.selectionColor;
            var direction = 'M0.001,14.629L1.372,16l4.571-4.571v-0.685l0.228-0.274c1.051,0.868,2.423,1.417,3.885,1.417c3.291,0,';
            direction += '5.943-2.651,5.943-5.943S13.395,0,10.103,0S4.16,2.651,4.16,5.943c0,1.508,0.503,2.834,1.417,3.885l-0.274,0.228H4.571';
            direction = direction + 'L0.001,14.629L0.001,14.629z M5.943,5.943c0-2.285,1.828-4.114,4.114-4.114s4.114,1.828,4.114,';
            childElement.id = this.elementId + '_Zooming_Zoom';
            childElement.setAttribute('aria-label', 'Zoom');
            this.zoomElements = childElement;
            childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Zoom_1', 'transparent', {}, 1, new helper_1.Rect(0, 0, 16, 16))));
            childElement.appendChild(render.drawPath(new helper_1.PathOption(this.elementId + '_Zooming_Zoom_3', fillColor, null, null, 1, null, direction + '4.114s-1.828,4.114-4.114,4.114S5.943,8.229,5.943,5.943z')));
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.zoom);
        };
        Toolkit.prototype.createZoomInButton = function (childElement, parentElement, chart) {
            var render = this.chart.renderer;
            var fillColor = this.fillColor;
            var direction = 'M10.103,0C6.812,0,4.16,2.651,4.16,5.943c0,1.509,0.503,2.834,1.417,3.885l-0.274,0.229H4.571L0,';
            direction += '14.628l0,0L1.372,16l4.571-4.572v-0.685l0.228-0.275c1.052,0.868,2.423,1.417,3.885,1.417c3.291,0,5.943-2.651,';
            direction += '5.943-5.943C16,2.651,13.395,0,10.103,0z M10.058,10.058c-2.286,0-4.114-1.828-4.114-4.114c0-2.286,1.828-4.114,';
            childElement.id = this.elementId + '_Zooming_ZoomIn';
            childElement.setAttribute('aria-label', 'ZoomIn');
            var polygonDirection = '12.749,5.466 10.749,5.466 10.749,3.466 9.749,3.466 9.749,5.466 7.749,5.466 7.749,6.466';
            childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_ZoomIn_1', 'transparent', {}, 1, new helper_1.Rect(0, 0, 16, 16))));
            childElement.appendChild(render.drawPath(new helper_1.PathOption(this.elementId + '_Zooming_ZoomIn_2', fillColor, null, null, 1, null, direction + '4.114-4.114c2.286,0,4.114,1.828,4.114,4.114C14.172,8.229,12.344,10.058,10.058,10.058z')));
            childElement.appendChild(render.drawPolygon(new helper_1.PolygonOption(this.elementId + '_Zooming_ZoomIn_3', polygonDirection + ' 9.749,6.466 9.749,8.466 10.749,8.466 10.749,6.466 12.749,6.466', fillColor)));
            this.zoomInElements = childElement;
            this.elementOpacity = chart.zoomModule.isPanning ? '0.2' : '1';
            childElement.setAttribute('opacity', this.elementOpacity);
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.zoomIn);
        };
        Toolkit.prototype.createZoomOutButton = function (childElement, parentElement, chart) {
            var render = this.chart.renderer;
            var fillColor = this.fillColor;
            var direction = 'M0,14.622L1.378,16l4.533-4.533v-0.711l0.266-0.266c1.022,0.889,2.4,1.422,3.866,';
            direction += '1.422c3.289,0,5.955-2.666,5.955-5.955S13.333,0,10.044,0S4.089,2.667,4.134,5.911c0,1.466,0.533,2.844,';
            direction += '1.422,3.866l-0.266,0.266H4.578L0,14.622L0,14.622z M5.911,5.911c0-2.311,1.822-4.133,4.133-4.133s4.133,1.822,4.133,';
            childElement.id = this.elementId + '_Zooming_ZoomOut';
            childElement.setAttribute('aria-label', 'ZoomOut');
            childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_ZoomOut_1', 'transparent', {}, 1, new helper_1.Rect(0, 0, 16, 16))));
            childElement.appendChild(render.drawPath(new helper_1.PathOption(this.elementId + '_Zooming_ZoomOut_2', fillColor, null, null, 1, null, direction + '4.133s-1.866,4.133-4.133,4.133S5.911,8.222,5.911,5.911z M12.567,6.466h-5v-1h5V6.466z')));
            this.zoomOutElements = childElement;
            this.elementOpacity = chart.zoomModule.isPanning ? '0.2' : '1';
            childElement.setAttribute('opacity', this.elementOpacity);
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.zoomOut);
        };
        Toolkit.prototype.createResetButton = function (childElement, parentElement, chart, isDevice) {
            var render = this.chart.renderer;
            var fillColor = this.fillColor;
            var size;
            var direction = 'M12.364,8h-2.182l2.909,3.25L16,8h-2.182c0-3.575-2.618-6.5-5.818-6.5c-1.128,0-2.218,0.366-3.091,';
            direction += '1.016l1.055,1.178C6.581,3.328,7.272,3.125,8,3.125C10.4,3.125,12.363,5.319,12.364,8L12.364,8z M11.091,';
            direction += '13.484l-1.055-1.178C9.419,12.672,8.728,12.875,8,12.875c-2.4,0-4.364-2.194-4.364-4.875h2.182L2.909,4.75L0,8h2.182c0,';
            childElement.id = this.elementId + '_Zooming_Reset';
            childElement.setAttribute('aria-label', 'Reset');
            if (!isDevice) {
                childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Reset_1', 'transparent', {}, 1, new helper_1.Rect(0, 0, 16, 16))));
                childElement.appendChild(render.drawPath(new helper_1.PathOption(this.elementId + '_Zooming_Reset_2', fillColor, null, null, 1, null, direction + '3.575,2.618,6.5,5.818,6.5C9.128,14.5,10.219,14.134,11.091,13.484L11.091,13.484z')));
            }
            else {
                size = helper_1.measureText('Reset Zoom', { size: '12px' });
                childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Reset_1', 'transparent', {}, 1, new helper_1.Rect(0, 0, size.width, size.height))));
                helper_2.textElement(new helper_2.TextOption(this.elementId + '_Zooming_Reset_2', 0 + size.width / 2, 0 + size.height * 3 / 4, 'middle', 'Reset Zoom', 'rotate(0,' + (0) + ',' + (0) + ')', 'auto'), { size: '12px' }, 'black', childElement);
            }
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.reset);
        };
        Toolkit.prototype.wireEvents = function (element, process) {
            ej2_base_1.EventHandler.add(element, 'mousedown touchstart', process, this);
            ej2_base_1.EventHandler.add(element, 'mouseover', this.showTooltip, this);
            ej2_base_1.EventHandler.add(element, 'mouseout', this.removeTooltip, this);
        };
        Toolkit.prototype.showTooltip = function (event) {
            var text = event.currentTarget.id.split('_Zooming_')[1];
            var left = (event.pageX - (helper_1.measureText(text, { size: '10px' }).width + 5));
            if (!this.chart.isTouch) {
                helper_1.createTooltip('EJ2_Chart_ZoomTip', text, (event.pageY + 10), left, '10px');
            }
        };
        Toolkit.prototype.removeTooltip = function () {
            helper_1.removeElement('EJ2_Chart_ZoomTip');
        };
        Toolkit.prototype.reset = function () {
            var chart = this.chart;
            if (!chart.zoomModule.isDevice) {
                dom_1.remove(chart.zoomModule.toolkitElements);
            }
            this.removeTooltip();
            chart.svgObject.setAttribute('cursor', 'auto');
            chart.axisCollections.forEach(function (axis) {
                axis.zoomFactor = 1;
                axis.zoomPosition = 0;
            });
            chart.disableTrackTooltip = false;
            chart.zoomModule.isZoomed = chart.zoomModule.isPanning = chart.isChartDrag = chart.delayRedraw = false;
            chart.zoomModule.touchMoveList = chart.zoomModule.touchStartList = [];
            chart.zoomModule.pinchTarget = null;
            chart.removeSvg();
            chart.refreshAxis();
            chart.refreshBound();
            this.elementOpacity = '1';
            return false;
        };
        Toolkit.prototype.zoomIn = function (e) {
            this.zoomInOutCalculation(1, this.chart, this.chart.axisCollections, this.chart.zoomSettings.mode);
            return false;
        };
        Toolkit.prototype.zoomOut = function (e) {
            this.zoomInOutCalculation(-1, this.chart, this.chart.axisCollections, this.chart.zoomSettings.mode);
            return false;
        };
        Toolkit.prototype.zoom = function (e) {
            this.chart.zoomModule.isPanning = false;
            var zoomModule = this.chart.zoomModule;
            this.elementOpacity = '1';
            this.chart.svgObject.setAttribute('cursor', 'auto');
            this.zoomInElements.setAttribute('opacity', this.elementOpacity);
            this.zoomOutElements.setAttribute('opacity', this.elementOpacity);
            this.applySelection(this.zoomElements.childNodes, this.selectionColor);
            this.applySelection(this.panElements.childNodes, '#737373');
            return false;
        };
        Toolkit.prototype.pan = function () {
            var zoomModule = this.chart.zoomModule;
            this.chart.zoomModule.isPanning = true;
            this.chart.svgObject.setAttribute('cursor', 'pointer');
            this.elementOpacity = '0.2';
            this.zoomInElements.setAttribute('opacity', this.elementOpacity);
            this.zoomOutElements.setAttribute('opacity', this.elementOpacity);
            this.applySelection(this.panElements.childNodes, this.selectionColor);
            this.applySelection(this.zoomElements.childNodes, '#737373');
            return false;
        };
        Toolkit.prototype.zoomInOutCalculation = function (scale, chart, axes, mode) {
            if (!chart.zoomModule.isPanning && this.elementOpacity !== '0.2') {
                var zoomFactor_1;
                var zoomPosition_1;
                var cumulative_1;
                chart.disableTrackTooltip = true;
                chart.delayRedraw = true;
                axes.forEach(function (axis) {
                    if ((axis.orientation === 'Horizontal' && mode !== 'Y') ||
                        (axis.orientation === 'Vertical' && mode !== 'X')) {
                        cumulative_1 = Math.max(Math.max(1 / helper_1.minMax(axis.zoomFactor, 0, 1), 1) + (0.25 * scale), 1);
                        zoomFactor_1 = (cumulative_1 === 1) ? 1 : helper_1.minMax(1 / cumulative_1, 0, 1);
                        zoomPosition_1 = (cumulative_1 === 1) ? 0 : axis.zoomPosition + ((axis.zoomFactor - zoomFactor_1) * 0.5);
                        if (axis.zoomPosition !== zoomPosition_1 || axis.zoomFactor !== zoomFactor_1) {
                            zoomFactor_1 = (zoomPosition_1 + zoomFactor_1) > 1 ? (1 - zoomPosition_1) : zoomFactor_1;
                        }
                        axis.zoomFactor = zoomFactor_1;
                        axis.zoomPosition = zoomPosition_1;
                    }
                });
            }
        };
        Toolkit.prototype.applySelection = function (elements, color) {
            for (var i = 1, length_1 = elements.length; i < length_1; i++) {
                elements[i].setAttribute('fill', color);
            }
        };
        return Toolkit;
    }());
    exports.Toolkit = Toolkit;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);