import { Animation, Browser, ChildProperty, Collection, Complex, Component, Event, EventHandler, Internationalization, L10n, NotifyPropertyChanges, Property, SvgRenderer, Touch, compile, createElement, extend, getValue, isNullOrUndefined, merge, print, remove, setStyleAttribute } from '@syncfusion/ej2-base';
import { DataManager, DataUtil, Query } from '@syncfusion/ej2-data';
import { Tooltip } from '@syncfusion/ej2-popups';

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Methods for calculating the text size.
 */
/**
 * Function to measure the height and width of the text.
 * @param  {string} text
 * @param  {FontModel} font
 * @param  {string} id
 * @returns no
 * @private
 */
function measureText(text, font) {
    var htmlObject = document.getElementById('chartmeasuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'chartmeasuretext' });
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
    // For bootstrap line height issue
    htmlObject.style.lineHeight = 'normal';
    return new Size(htmlObject.clientWidth, htmlObject.clientHeight);
}
/** @private */
function rotateTextSize(font, text, angle, chart) {
    var renderer = new SvgRenderer(chart.element.id);
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
    if (!chart.delayRedraw) {
        chart.element.appendChild(chart.svgObject);
    }
    chart.svgObject.appendChild(htmlObject);
    box = htmlObject.getBoundingClientRect();
    remove(htmlObject);
    if (!chart.delayRedraw) {
        remove(chart.svgObject);
    }
    return new Size((box.right - box.left), (box.bottom - box.top));
}
/** @private */
function removeElement(id) {
    var element = getElement(id);
    if (element) {
        remove(element);
    }
}
/** @private */
function logBase(value, base) {
    return Math.log(value) / Math.log(base);
}
/** @private */
function showTooltip(text, x, y, areaWidth, id, element, isTouch) {
    //let id1: string = 'EJ2_legend_tooltip';
    var tooltip = document.getElementById(id);
    var width = measureText(text, {
        fontFamily: 'Segoe UI', size: '12px',
        fontStyle: 'Normal', fontWeight: 'Regular'
    }).width + 5;
    x = (x + width > areaWidth) ? x - width : x;
    if (!tooltip) {
        tooltip = createElement('div', {
            innerHTML: text,
            id: id,
            styles: 'top:' + (y + 15).toString() + 'px;left:' + (x + 15).toString() + 'px;background-color: rgb(255, 255, 255);' +
                'position:absolute;border:1px solid rgb(112, 112, 112); padding-left : 3px; padding-right : 2px;' +
                'padding-bottom : 2px; padding-top : 2px; font-size:12px; font-family: "Segoe UI"'
        });
        element.appendChild(tooltip);
    }
    else {
        tooltip.innerHTML = text;
        tooltip.style.top = (y + 15).toString() + 'px';
        tooltip.style.left = (x + 15).toString() + 'px';
    }
    if (isTouch) {
        setTimeout(function () { removeElement(id); }, 1500);
    }
}
/** @private */
function inside(value, range) {
    return (value < range.max) && (value > range.min);
}
/** @private */
function withIn(value, range) {
    return (value <= range.max) && (value >= range.min);
}
/** @private */
function withInRange(previousPoint, currentPoint, nextPoint, series) {
    var mX2 = series.logWithIn(currentPoint.xValue, series.xAxis);
    var mX1 = previousPoint ? series.logWithIn(previousPoint.xValue, series.xAxis) : mX2;
    var mX3 = nextPoint ? series.logWithIn(nextPoint.xValue, series.xAxis) : mX2;
    var xStart = Math.floor(series.xAxis.visibleRange.min);
    var xEnd = Math.ceil(series.xAxis.visibleRange.max);
    return ((mX1 >= xStart && mX1 <= xEnd) || (mX2 >= xStart && mX2 <= xEnd) ||
        (mX3 >= xStart && mX3 <= xEnd) || (xStart >= mX1 && xStart <= mX3));
}
/** @private */
function sum(values) {
    var sum = 0;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var value = values_1[_i];
        sum += value;
    }
    return sum;
}
/** @private */
function subArraySum(values, first, last, index, series) {
    var sum = 0;
    if (index !== null) {
        for (var i = (first + 1); i < last; i++) {
            if (index.indexOf(i) === -1) {
                sum += values[i][series.yName];
            }
        }
    }
    else {
        for (var i = (first + 1); i < last; i++) {
            sum += values[i][series.yName];
        }
    }
    return sum;
}
/** @private */
function subtractThickness(rect, thickness) {
    rect.x += thickness.left;
    rect.y += thickness.top;
    rect.width -= thickness.left + thickness.right;
    rect.height -= thickness.top + thickness.bottom;
    return rect;
}
/** @private */
function subtractRect(rect, thickness) {
    rect.x += thickness.x;
    rect.y += thickness.y;
    rect.width -= thickness.x + thickness.width;
    rect.height -= thickness.y + thickness.height;
    return rect;
}
/** @private */
function degreeToLocation(degree, radius, center) {
    var radian = (degree * Math.PI) / 180;
    return new ChartLocation(Math.cos(radian) * radius + center.x, Math.sin(radian) * radius + center.y);
}
function getAccumulationLegend(locX, locY, r, height, width, mode) {
    var cartesianlarge = degreeToLocation(270, r, new ChartLocation(locX, locY));
    var cartesiansmall = degreeToLocation(270, r, new ChartLocation(locX + (width / 10), locY));
    return 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + ' ' + (locX + r) + ' ' + (locY) + ' ' + 'A' + ' ' + (r) + ' ' + (r) +
        ' ' + 0 + ' ' + 1 + ' ' + 1 + ' ' + cartesianlarge.x + ' ' + cartesianlarge.y + ' ' + 'Z' + ' ' + 'M' + ' ' + (locX +
        (width / 10)) + ' ' + (locY - (height / 10)) + ' ' + 'L' + (locX + (r)) + ' ' + (locY - height / 10) + ' ' + 'A' + ' '
        + (r) + ' ' + (r) + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + cartesiansmall.x + ' ' + cartesiansmall.y + ' ' + 'Z';
}
/** @private */
function getAngle(center, point) {
    var angle = Math.atan2((point.y - center.y), (point.x - center.x));
    angle = angle < 0 ? (6.283 + angle) : angle;
    return angle * (180 / Math.PI);
}
/** @private */
function subArray(values, index) {
    var subArray = [];
    for (var i = 0; i <= index - 1; i++) {
        subArray.push(values[i]);
    }
    return subArray;
}
/** @private */
function valueToCoefficient(value, axis) {
    var range = axis.visibleRange;
    var result = (value - range.min) / (range.delta);
    return axis.isInversed ? (1 - result) : result;
}
/** @private */
function TransformToVisible(x, y, xAxis, yAxis, isInverted, series) {
    x = (xAxis.valueType === 'Logarithmic' ? logBase(x, xAxis.logBase) : x);
    y = (yAxis.valueType === 'Logarithmic' ?
        logBase(y === 0 ? 1 : y, yAxis.logBase) : y);
    x += xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks' && series.type !== 'Radar' ? 0.5 : 0;
    var radius = series.chart.radius * valueToCoefficient(y, yAxis);
    var point = CoefficientToVector(valueToPolarCoefficient(x, xAxis), series.chart.primaryXAxis.startAngle);
    return {
        x: (series.clipRect.width / 2 + series.clipRect.x) + radius * point.x,
        y: (series.clipRect.height / 2 + series.clipRect.y) + radius * point.y
    };
}
/** @private */
function CoefficientToVector(coefficient, startAngle) {
    startAngle = startAngle < 0 ? startAngle + 360 : startAngle;
    var angle = Math.PI * (1.5 - 2 * coefficient);
    angle = angle + (startAngle * Math.PI) / 180;
    return { x: Math.cos(angle), y: Math.sin(angle) };
}
/** @private */
function valueToPolarCoefficient(value, axis) {
    var range = axis.visibleRange;
    var delta;
    var length;
    if (axis.valueType !== 'Category') {
        delta = (range.max - (axis.valueType === 'DateTime' ? axis.dateTimeInterval : range.interval)) - range.min;
        length = axis.visibleLabels.length - 1;
        delta = delta === 0 ? 1 : delta;
    }
    else {
        delta = range.delta;
        length = axis.visibleLabels.length;
    }
    return axis.isInversed ? ((value - range.min) / delta) * (1 - 1 / (length)) :
        1 - ((value - range.min) / delta) * (1 - 1 / (length));
}
/** @private */
var Mean = /** @class */ (function () {
    function Mean(verticalStandardMean, verticalSquareRoot, horizontalStandardMean, horizontalSquareRoot, verticalMean, horizontalMean) {
        this.verticalStandardMean = verticalStandardMean;
        this.horizontalStandardMean = horizontalStandardMean;
        this.verticalSquareRoot = verticalSquareRoot;
        this.horizontalSquareRoot = horizontalSquareRoot;
        this.verticalMean = verticalMean;
        this.horizontalMean = horizontalMean;
    }
    return Mean;
}());
/** @private */
var PolarArc = /** @class */ (function () {
    function PolarArc(startAngle, endAngle, innerRadius, radius, currentXPosition) {
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.innerRadius = innerRadius;
        this.radius = radius;
        this.currentXPosition = currentXPosition;
    }
    return PolarArc;
}());
/** @private */
function createTooltip(id, text, top, left, fontSize) {
    var tooltip = getElement(id);
    var style = 'top:' + top.toString() + 'px;' +
        'left:' + left.toString() + 'px;' +
        'background:' + '#FFFFFF' + ';' +
        'position:absolute;border:1px solid #707070;font-size:' + fontSize + ';border-radius:2px;';
    if (!tooltip) {
        tooltip = createElement('div', {
            id: id, innerHTML: '&nbsp;' + text + '&nbsp;', styles: style
        });
        document.body.appendChild(tooltip);
    }
    else {
        tooltip.setAttribute('innerHTML', '&nbsp;' + text + '&nbsp;');
        tooltip.setAttribute('styles', style);
    }
}
/** @private */
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
        size = measureText(i ? axis.endLabel : axis.startLabel, axis.labelStyle);
        if (isVertical) {
            arrowLocation = i ? new ChartLocation(rect.x, rect.y + rx) :
                new ChartLocation(axis.rect.x, (rect.y + rect.height - rx));
            x = (rect.x + (opposedPosition ? (rect.width + margin) : -(size.width + margin + margin)));
            y = (rect.y + (i ? 0 : rect.height - size.height - margin));
            x += (x < 0 || ((chartRect) < (x + size.width + margin))) ? (opposedPosition ? -(size.width / 2) : size.width / 2) : 0;
            direction = findDirection(rx, rx, new Rect(x, y, size.width + margin, size.height + margin), arrowLocation, margin, false, false, !opposedPosition, arrowLocation.x, arrowLocation.y + (i ? -rx : rx));
        }
        else {
            arrowLocation = i ? new ChartLocation((rect.x + rect.width - rx), (rect.y + rect.height)) :
                new ChartLocation(rect.x + rx, (rect.y + rect.height));
            x = (rect.x + (i ? (rect.width - size.width - margin) : 0));
            y = (opposedPosition ? (rect.y - size.height - 10) : (rect.y + rect.height + margin));
            direction = findDirection(rx, rx, new Rect(x, y, size.width + margin, size.height + margin), arrowLocation, margin, opposedPosition, !opposedPosition, false, arrowLocation.x + (i ? rx : -rx), arrowLocation.y);
        }
        x = x + (margin / 2);
        y = y + (3 * (size.height / 4)) + (margin / 2);
        parent.appendChild(chart.renderer.drawPath(new PathOption(chart.element.id + '_Zoom_' + index + '_AxisLabel_Shape_' + i, '#414141', 2, '#414141', 1, null, direction)));
        textElement(new TextOption(chart.element.id + '_Zoom_' + index + '_AxisLabel_' + i, x, y, anchor, i ? axis.endLabel : axis.startLabel), { color: 'white', fontFamily: 'Segoe UI', fontWeight: 'Regular', size: '11px' }, 'white', parent);
    }
    return parent;
}
//Within bounds
/** @private */
function withInBounds(x, y, bounds, width, height) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    return (x >= bounds.x - width && x <= bounds.x + bounds.width + width && y >= bounds.y - height
        && y <= bounds.y + bounds.height + height);
}
/** @private */
function getValueXByPoint(value, size, axis) {
    var actualValue = !axis.isInversed ? value / size : (1 - (value / size));
    return actualValue * (axis.visibleRange.delta) + axis.visibleRange.min;
}
/** @private */
function getValueYByPoint(value, size, axis) {
    var actualValue = axis.isInversed ? value / size : (1 - (value / size));
    return actualValue * (axis.visibleRange.delta) + axis.visibleRange.min;
}
/** @private */
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
/** @private */
function firstToLowerCase(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}
/** @private */
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
/** @private */
function getAnimationFunction(effect) {
    var functionName;
    switch (effect) {
        case 'Linear':
            functionName = linear;
            break;
    }
    return functionName;
}
/**
 * Animation Effect Calculation Started Here
 * @param currentTime
 * @param startValue
 * @param endValue
 * @param duration
 * @private
 */
function linear(currentTime, startValue, endValue, duration) {
    return -endValue * Math.cos(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
}
/**
 * Animation Effect Calculation End
 * @private
 */
function markerAnimate(element, delay, duration, series, pointIndex, point, isLabel) {
    var centerX = point.x;
    var centerY = point.y;
    var height = 0;
    element.style.visibility = 'hidden';
    new Animation({}).animate(element, {
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
            element.style.visibility = '';
            element.removeAttribute('transform');
            if ((series.type === 'Scatter' || series.type === 'Bubble') && !isLabel && (pointIndex === series.points.length - 1)) {
                series.chart.trigger('animationComplete', { series: series });
            }
        }
    });
}
/**
 * Animation for template
 * @private
 */
function templateAnimate(element, delay, duration, name, isRemove) {
    new Animation({}).animate(element, {
        duration: duration,
        delay: delay,
        name: name,
        progress: function (args) {
            args.element.style.visibility = 'visible';
        },
        end: function (args) {
            if (isRemove) {
                remove(args.element);
            }
            else {
                args.element.style.visibility = 'visible';
            }
        },
    });
}
/** @private */
function drawSymbol(location, shape, size, url, options, label) {
    var renderer = new SvgRenderer('');
    var temp = calculateShapes(location, size, shape, options, url);
    var htmlObject = renderer['draw' + temp.functionName](temp.renderOption);
    htmlObject.setAttribute('aria-label', label);
    return htmlObject;
}
/** @private */
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
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': width / 2, 'ry': height / 2, 'cx': locX, 'cy': locY });
            break;
        case 'Cross':
            path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' +
                (locY + (-height / 2));
            merge(options, { 'd': path });
            break;
        case 'HorizontalLine':
            path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY;
            merge(options, { 'd': path });
            break;
        case 'VerticalLine':
            path = 'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' + (locY + (-height / 2));
            merge(options, { 'd': path });
            break;
        case 'Diamond':
            path = 'M' + ' ' + x + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + locY + ' z';
            merge(options, { 'd': path });
            break;
        case 'Rectangle':
        case 'Hilo':
        case 'HiloOpenClose':
        case 'Candle':
        case 'Waterfall':
        case 'BoxAndWhisker':
        case 'StepArea':
            path = 'M' + ' ' + x + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (-height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'Pyramid':
        case 'Triangle':
            path = 'M' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'Funnel':
        case 'InvertedTriangle':
            path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + (locX - (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' z';
            merge(options, { 'd': path });
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
            merge(options, { 'd': path });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': height, 'width': width, x: x, y: y });
            break;
    }
    options = calculateLegendShapes(location, new Size(width, height), shape, options).renderOption;
    return { renderOption: options, functionName: functionName };
}
/** @private */
function getRectLocation(startLocation, endLocation, outerRect) {
    var x;
    var y;
    x = (endLocation.x < outerRect.x) ? outerRect.x :
        (endLocation.x > (outerRect.x + outerRect.width)) ? outerRect.x + outerRect.width : endLocation.x;
    y = (endLocation.y < outerRect.y) ? outerRect.y :
        (endLocation.y > (outerRect.y + outerRect.height)) ? outerRect.y + outerRect.height : endLocation.y;
    return new Rect((x > startLocation.x ? startLocation.x : x), (y > startLocation.y ? startLocation.y : y), Math.abs(x - startLocation.x), Math.abs(y - startLocation.y));
}
/** @private */
function minMax(value, min, max) {
    return value > max ? max : (value < min ? min : value);
}
/** @private */
function getElement(id) {
    return document.getElementById(id);
}
/** @private */
function getTemplateFunction(template) {
    var templateFn = null;
    try {
        if (document.querySelectorAll(template).length) {
            templateFn = compile(document.querySelector(template).innerHTML.trim());
        }
    }
    catch (e) {
        templateFn = compile(template);
    }
    return templateFn;
}
/** @private */
function createTemplate(childElement, pointIndex, content, chart, point, series) {
    var templateFn;
    var templateElement;
    templateFn = getTemplateFunction(content);
    try {
        if (templateFn && templateFn({ chart: chart, series: series, point: point }).length) {
            templateElement = templateFn({ chart: chart, series: series, point: point });
            while (templateElement.length > 0) {
                childElement.appendChild(templateElement[0]);
            }
        }
    }
    catch (e) {
        return childElement;
    }
    return childElement;
}
/** @private */
function getFontStyle(font) {
    var style = '';
    style = 'font-size:' + font.size +
        '; font-style:' + font.fontStyle + '; font-weight:' + font.fontWeight +
        '; font-family:' + font.fontFamily + ';opacity:' + font.opacity +
        '; color:' + font.color + ';';
    return style;
}
/** @private */
function measureElementRect(element) {
    var bounds;
    document.body.appendChild(element);
    bounds = element.getBoundingClientRect();
    removeElement(element.id);
    return bounds;
}
/** @private */
function findlElement(elements, id) {
    var element;
    for (var i = 0, length_1 = elements.length; i < length_1; i++) {
        if (elements[i].id.indexOf(id) > -1) {
            element = elements[i];
            continue;
        }
    }
    return element;
}
/** @private */
function getPoint(x, y, xAxis, yAxis, isInverted, series) {
    var xLength = isInverted ? xAxis.rect.height : xAxis.rect.width;
    var yLength = isInverted ? yAxis.rect.width : yAxis.rect.height;
    var xvalue = (xAxis.valueType === 'Logarithmic') ? logBase(((x === 0 || x < 0) ? 1 : x), xAxis.logBase) : x;
    var yvalue = (yAxis.valueType === 'Logarithmic') ? logBase(((y === 0 || y < 0) ? 1 : y), yAxis.logBase) : y;
    xvalue = valueToCoefficient(xvalue, xAxis);
    yvalue = valueToCoefficient(yvalue, yAxis);
    var locationX = isInverted ? yvalue * (yLength) : xvalue * (xLength);
    var locationY = isInverted ? (1 - xvalue) * (xLength) : (1 - yvalue) * (yLength);
    return new ChartLocation(locationX, locationY);
}
/** @private */
function appendElement(child, parent) {
    if (child && child.hasChildNodes() && parent) {
        parent.appendChild(child);
    }
    else {
        return null;
    }
}
/** @private */
function getDraggedRectLocation(x1, y1, x2, y2, outerRect) {
    var width = Math.abs(x1 - x2);
    var height = Math.abs(y1 - y2);
    var x = Math.max(checkBounds(Math.min(x1, x2), width, outerRect.x, outerRect.width), outerRect.x);
    var y = Math.max(checkBounds(Math.min(y1, y2), height, outerRect.y, outerRect.height), outerRect.y);
    return new Rect(x, y, Math.min(width, outerRect.width), Math.min(height, outerRect.height));
}
/** @private */
function checkBounds(start, size, min, max) {
    if (start < min) {
        start = min;
    }
    else if ((start + size) > (max + min)) {
        start = (max + min) - size;
    }
    return start;
}
/** @private */
function getLabelText(currentPoint, series, chart) {
    var labelFormat = series.yAxis.labelFormat;
    var text = [];
    var customLabelFormat = labelFormat.match('{value}') !== null;
    switch (series.seriesType) {
        case 'XY':
            text.push(currentPoint.text || currentPoint.yValue.toString());
            break;
        case 'HighLow':
            text.push(currentPoint.text || Math.max(currentPoint.high, currentPoint.low).toString());
            text.push(currentPoint.text || Math.min(currentPoint.high, currentPoint.low).toString());
            break;
        case 'HighLowOpenClose':
            text.push(currentPoint.text || Math.max(currentPoint.high, currentPoint.low).toString());
            text.push(currentPoint.text || Math.min(currentPoint.high, currentPoint.low).toString());
            text.push(currentPoint.text || Math.max(currentPoint.open, currentPoint.close).toString());
            text.push(currentPoint.text || Math.min(currentPoint.open, currentPoint.close).toString());
            break;
        case 'BoxPlot':
            text.push(currentPoint.text || currentPoint.median.toString());
            text.push(currentPoint.text || currentPoint.maximum.toString());
            text.push(currentPoint.text || currentPoint.minimum.toString());
            text.push(currentPoint.text || currentPoint.upperQuartile.toString());
            text.push(currentPoint.text || currentPoint.lowerQuartile.toString());
            for (var _i = 0, _a = currentPoint.outliers; _i < _a.length; _i++) {
                var liers = _a[_i];
                text.push(currentPoint.text || liers.toString());
            }
            break;
    }
    if (labelFormat && !currentPoint.text) {
        for (var i = 0; i < text.length; i++) {
            text[i] = customLabelFormat ? labelFormat.replace('{value}', series.yAxis.format(parseFloat(text[i]))) :
                series.yAxis.format(parseFloat(text[i]));
        }
    }
    return text;
}
/** @private */
function stopTimer(timer) {
    window.clearInterval(timer);
}
/** @private */
function isCollide(rect, collections, clipRect) {
    var isCollide;
    var currentRect = new Rect(rect.x + clipRect.x, rect.y + clipRect.y, rect.width, rect.height);
    isCollide = collections.some(function (rect) {
        return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
            currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
    });
    return isCollide;
}
/** @private */
function isOverlap(currentRect, rect) {
    return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
        currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
}
/** @private */
function containsRect(currentRect, rect) {
    return (currentRect.x <= rect.x && currentRect.x + currentRect.width >= rect.x + rect.width &&
        currentRect.y <= rect.y && currentRect.height + currentRect.y >= rect.y + rect.height);
}
/** @private */
function calculateRect(location, textSize, margin) {
    return new Rect((location.x - (textSize.width / 2) - margin.left), (location.y - (textSize.height / 2) - margin.top), textSize.width + margin.left + margin.right, textSize.height + margin.top + margin.bottom);
}
/** @private */
function convertToHexCode(value) {
    return '#' + componentToHex(value.r) + componentToHex(value.g) + componentToHex(value.b);
}
/** @private */
function componentToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
/** @private */
function convertHexToColor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new ColorValue(255, 255, 255);
}
/** @private */
function colorNameToHex(color) {
    var element;
    color = color === 'transparent' ? 'white' : color;
    element = document.getElementById('chartmeasuretext');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    var exp = /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/;
    var isRGBValue = exp.exec(color);
    return convertToHexCode(new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10)));
}
/** @private */
function getSaturationColor(color, factor) {
    color = colorNameToHex(color);
    color = color.replace(/[^0-9a-f]/gi, '');
    if (color.length < 6) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    factor = factor || 0;
    // convert to decimal and change luminosity
    var rgb = '#';
    var colorCode;
    for (var i = 0; i < 3; i++) {
        colorCode = parseInt(color.substr(i * 2, 2), 16);
        colorCode = Math.round(Math.min(Math.max(0, colorCode + (colorCode * factor)), 255));
        rgb += ('00' + colorCode.toString(16)).substr(colorCode.toString(16).length);
    }
    return rgb;
}
/** @private */
function getMedian(values) {
    var half = Math.floor(values.length / 2);
    return values.length % 2 ? values[half] : ((values[half - 1] + values[half]) / 2.0);
}
/** @private */
// tslint:disable-next-line:max-func-body-length
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
            merge(options, { 'd': path });
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
            merge(options, { 'd': path });
            break;
        case 'RightArrow':
            var space = 2;
            path = 'M' + ' ' + (locX + (-width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY) + ' ' + 'L' + ' ' +
                (locX + (-width / 2)) + ' ' + (locY + (height / 2)) + ' L' + ' ' + (locX + (-width / 2)) + ' ' +
                (locY + (height / 2) - space) + ' ' + 'L' + ' ' + (locX + (width / 2) - (2 * space)) + ' ' + (locY) +
                ' L' + (locX + (-width / 2)) + ' ' + (locY - (height / 2) + space) + ' Z';
            merge(options, { 'd': path });
            break;
        case 'LeftArrow':
            options.fill = options.stroke;
            options.stroke = 'transparent';
            space = 2;
            path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (-width / 2)) + ' ' + (locY) + ' ' + 'L' + ' ' +
                (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' +
                (locX + (width / 2)) + ' ' + (locY + (height / 2) - space) + ' L' + ' ' + (locX + (-width / 2) + (2 * space))
                + ' ' + (locY) + ' L' + (locX + (width / 2)) + ' ' + (locY - (height / 2) + space) + ' Z';
            merge(options, { 'd': path });
            break;
        case 'Column':
        case 'StackingColumn':
        case 'StackingColumn100':
        case 'RangeColumn':
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
            merge(options, { 'd': path });
            break;
        case 'Bar':
        case 'StackingBar':
        case 'StackingBar100':
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
            merge(options, { 'd': path });
            break;
        case 'Spline':
            options.fill = 'transparent';
            path = 'M' + ' ' + (locX - (width / 2)) + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' '
                + locX + ' ' + (locY - height) + ' ' + locX + ' ' + (locY + (height / 5))
                + ' ' + 'M' + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + (locX
                + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' + (locX + (width / 2)) + ' '
                + (locY - (height / 2));
            merge(options, { 'd': path });
            break;
        case 'Area':
        case 'RangeArea':
        case 'StackingArea':
        case 'StackingArea100':
            path = 'M' + ' ' + (locX - (width / 2) - (padding / 4)) + ' ' + (locY + (height / 2))
                + ' ' + 'L' + ' ' + (locX + (-width / 4) + (-padding / 8)) + ' ' + (locY - (height / 2))
                + ' ' + 'L' + ' ' + (locX) + ' ' + (locY + (height / 4)) + ' ' + 'L' + ' ' + (locX
                + (width / 4) + (padding / 8)) + ' ' + (locY + (-height / 2) + (height / 4)) + ' '
                + 'L' + ' ' + (locX + (height / 2) + (padding / 4)) + ' ' + (locY + (height / 2)) + ' ' + 'Z';
            merge(options, { 'd': path });
            break;
        case 'SplineArea':
            path = 'M' + ' ' + (locX - (width / 2)) + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + locX
                + ' ' + (locY - height) + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Z' + ' ' + 'M'
                + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + (locX + (width / 2)) + ' '
                + (locY + (height / 2)) + ' ' + (locX + (width / 2)) + ' '
                + (locY - (height / 2)) + ' ' + ' Z';
            merge(options, { 'd': path });
            break;
        case 'Pie':
        case 'Doughnut':
            options.stroke = 'transparent';
            var r = Math.min(height, width) / 2;
            path = getAccumulationLegend(locX, locY, r, height, width, shape);
            merge(options, { 'd': path });
            break;
    }
    return { renderOption: options };
}
/** @private */
function textTrim(maxWidth, text, font) {
    var label = text;
    var size = measureText(text, font).width;
    if (size > maxWidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth) {
                return label;
            }
        }
    }
    return label;
}
/** @private */
function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/** @private */
function findDirection(rX, rY, rect, arrowLocation, arrowPadding, top, bottom, left, tipX, tipY, tipRadius) {
    var direction = '';
    var startX = rect.x;
    var startY = rect.y;
    var width = rect.x + rect.width;
    var height = rect.y + rect.height;
    tipRadius = tipRadius ? tipRadius : 0;
    if (top) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + startY + ' ' + (startX + rX) + ' ' + startY + ' ' +
            ' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + width + ' '
            + startY + ' ' + (width) + ' ' + (startY + rY));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' '
            + (height) + ' ' + (width - rX) + ' ' + (height));
        if (arrowPadding !== 0) {
            direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding / 2) + ' ' + (height));
            direction = direction.concat(' L' + ' ' + (tipX + tipRadius) + ' ' + (height + arrowPadding - tipRadius));
            direction += ' Q' + ' ' + (tipX) + ' ' + (height + arrowPadding) + ' ' + (tipX - tipRadius) +
                ' ' + (height + arrowPadding - tipRadius);
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
        direction = direction.concat(' L' + ' ' + (tipX - tipRadius) + ' ' + (arrowLocation.y + tipRadius));
        direction += ' Q' + ' ' + (tipX) + ' ' + (arrowLocation.y) + ' ' + (tipX + tipRadius) + ' ' + (arrowLocation.y + tipRadius);
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
        direction = direction.concat(' L' + ' ' + (width + arrowPadding - tipRadius) + ' ' + (tipY - tipRadius));
        direction += ' Q ' + (width + arrowPadding) + ' ' + (tipY) + ' ' + (width + arrowPadding - tipRadius) + ' ' + (tipY + tipRadius);
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (arrowLocation.y + arrowPadding / 2) +
            ' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' ' + (height) + ' ' + (width - rX) + ' ' + (height));
        direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + startX + ' '
            + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
    }
    else {
        direction = direction.concat('M' + ' ' + (startX + rX) + ' ' + (startY) + ' Q ' + (startX) + ' '
            + (startY) + ' ' + (startX) + ' ' + (startY + rY) + ' L' + ' ' + (startX) + ' ' + (arrowLocation.y - arrowPadding / 2));
        direction = direction.concat(' L' + ' ' + (startX - arrowPadding + tipRadius) + ' ' + (tipY - tipRadius));
        direction += ' Q ' + (startX - arrowPadding) + ' ' + (tipY) + ' ' + (startX - arrowPadding + tipRadius) + ' ' + (tipY + tipRadius);
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
/** @private */
function textElement(options, font, color, parent, isMinus) {
    if (isMinus === void 0) { isMinus = false; }
    var renderOptions = {};
    var htmlObject;
    var tspanElement;
    var renderer = new SvgRenderer('');
    var text;
    var height;
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
        'dominant-baseline': options.baseLine
    };
    text = typeof options.text === 'string' ? options.text : isMinus ? options.text[options.text.length - 1] : options.text[0];
    htmlObject = renderer.createText(renderOptions, text);
    if (typeof options.text !== 'string' && options.text.length > 1) {
        for (var i = 1, len = options.text.length; i < len; i++) {
            height = (measureText(options.text[i], font).height);
            tspanElement = renderer.createTSpan({
                'x': options.x, 'id': options.id,
                'y': (options.y) + ((isMinus) ? -(i * height) : (i * height))
            }, isMinus ? options.text[options.text.length - (i + 1)] : options.text[i]);
            htmlObject.appendChild(tspanElement);
        }
    }
    parent.appendChild(htmlObject);
    return htmlObject;
}
/**
 * Method to calculate the width and height of the chart
 */
function calculateSize(chart) {
    var containerWidth = chart.element.clientWidth;
    var containerHeight = chart.element.clientHeight;
    chart.availableSize = new Size(stringToNumber(chart.width, containerWidth) || containerWidth || 600, stringToNumber(chart.height, containerHeight) || containerHeight || 450);
}
function createSvg(chart) {
    chart.renderer = new SvgRenderer(chart.element.id);
    calculateSize(chart);
    chart.svgObject = chart.renderer.createSvg({
        id: chart.element.id + '_svg',
        width: chart.availableSize.width,
        height: chart.availableSize.height
    });
}
/**
 * Method to calculate x position of title
 */
function titlePositionX(chartSize, leftPadding, rightPadding, titleStyle, textSize) {
    var positionX;
    if (titleStyle.textAlignment === 'Near') {
        positionX = leftPadding;
    }
    else if (titleStyle.textAlignment === 'Center') {
        positionX = chartSize.width / 2 - textSize.width / 2;
    }
    else {
        positionX = chartSize.width - rightPadding - textSize.width;
    }
    return positionX;
}
/** @private */
var CustomizeOption = /** @class */ (function () {
    function CustomizeOption(id) {
        this.id = id;
    }
    return CustomizeOption;
}());
/** @private */
var StackValues = /** @class */ (function () {
    function StackValues(startValue, endValue) {
        this.startValues = startValue;
        this.endValues = endValue;
    }
    return StackValues;
}());
/** @private */
var TextOption = /** @class */ (function (_super) {
    __extends$1(TextOption, _super);
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
/** @private */
var PathOption = /** @class */ (function (_super) {
    __extends$1(PathOption, _super);
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
/** @private */
var RectOption = /** @class */ (function (_super) {
    __extends$1(RectOption, _super);
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
/** @private */
var CircleOption = /** @class */ (function (_super) {
    __extends$1(CircleOption, _super);
    function CircleOption(id, fill, border, opacity, cx, cy, r) {
        var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
        _this.cy = cy;
        _this.cx = cx;
        _this.r = r;
        return _this;
    }
    return CircleOption;
}(PathOption));
/** @private */
var PolygonOption = /** @class */ (function () {
    function PolygonOption(id, points, fill) {
        this.id = id;
        this.points = points;
        this.fill = fill;
    }
    return PolygonOption;
}());
/** @private */
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
/** @private */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
/** @private */
var ChartLocation = /** @class */ (function () {
    function ChartLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return ChartLocation;
}());
/** @private */
var Thickness = /** @class */ (function () {
    function Thickness(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
    return Thickness;
}());
/** @private */
var ColorValue = /** @class */ (function () {
    function ColorValue(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return ColorValue;
}());
/** @private */
var PointData = /** @class */ (function () {
    function PointData(point, series, index) {
        if (index === void 0) { index = 0; }
        this.point = point;
        this.series = series;
        this.lierIndex = index;
    }
    return PointData;
}());
/** @private */
var ControlPoints = /** @class */ (function () {
    function ControlPoints(controlPoint1, controlPoint2) {
        this.controlPoint1 = controlPoint1;
        this.controlPoint2 = controlPoint2;
    }
    return ControlPoints;
}());

/**
 * Specifies Chart Themes
 */
var Theme;
(function (Theme) {
    /** @private */
    Theme.axisLabelFont = {
        size: '12px',
        fontWeight: 'Normal',
        color: '#686868',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.axisTitleFont = {
        size: '14px',
        fontWeight: 'Normal',
        color: '#424242',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.chartTitleFont = {
        size: '15px',
        fontWeight: '500',
        color: '#424242',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.crosshairLabelFont = {
        size: '13px',
        fontWeight: 'Normal',
        color: '#e5e5e5',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.tooltipLabelFont = {
        size: '13px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Normal',
        color: '#353535',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.stripLineLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#353535',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.axisLineColor = '#b5b5b5';
    /** @private */
    Theme.axisMajorGridLineColor = '#dbdbdb';
    /** @private */
    Theme.axisMinorGridLineColor = '#eaeaea';
    /** @private */
    Theme.axisMajorTickLineColor = '#b5b5b5';
    /** @private */
    Theme.axisMinorTickLineColor = '#d6d6d6';
    /** @private */
    Theme.crossHairLabelColor = '#4f4f4f';
    /** @private */
    Theme.chartBackgroundColor = '#FFFFFF';
    /** @private */
    Theme.selectionRectFill = 'rgba(41, 171, 226, 0.1)';
    /** @private */
    Theme.selectionRectStroke = '#29abe2';
})(Theme || (Theme = {}));
/** @private */
function getSeriesColor(theme) {
    var palette;
    switch (theme) {
        case 'Material':
            palette = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
                '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
            break;
        case 'Fabric':
            palette = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
                '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300'];
            break;
        case 'Bootstrap':
            palette = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
                '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
            break;
    }
    return palette;
}

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the appearance of the connectors
 */
var Connector = /** @class */ (function (_super) {
    __extends$2(Connector, _super);
    function Connector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('Line')
    ], Connector.prototype, "type", void 0);
    __decorate$1([
        Property(null)
    ], Connector.prototype, "color", void 0);
    __decorate$1([
        Property(1)
    ], Connector.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], Connector.prototype, "length", void 0);
    __decorate$1([
        Property('')
    ], Connector.prototype, "dashArray", void 0);
    return Connector;
}(ChildProperty));
/**
 * Configures the fonts in charts.
 */
var Font = /** @class */ (function (_super) {
    __extends$2(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('16px')
    ], Font.prototype, "size", void 0);
    __decorate$1([
        Property('')
    ], Font.prototype, "color", void 0);
    __decorate$1([
        Property('Segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate$1([
        Property('Normal')
    ], Font.prototype, "fontWeight", void 0);
    __decorate$1([
        Property('Normal')
    ], Font.prototype, "fontStyle", void 0);
    __decorate$1([
        Property(1)
    ], Font.prototype, "opacity", void 0);
    __decorate$1([
        Property('Center')
    ], Font.prototype, "textAlignment", void 0);
    return Font;
}(ChildProperty));
/**
 * Configures the borders in the chart.
 */
var Border = /** @class */ (function (_super) {
    __extends$2(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('')
    ], Border.prototype, "color", void 0);
    __decorate$1([
        Property(1)
    ], Border.prototype, "width", void 0);
    return Border;
}(ChildProperty));
/**
 * Configures the chart area.
 */
var ChartArea = /** @class */ (function (_super) {
    __extends$2(ChartArea, _super);
    function ChartArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Complex({}, Border)
    ], ChartArea.prototype, "border", void 0);
    __decorate$1([
        Property('transparent')
    ], ChartArea.prototype, "background", void 0);
    __decorate$1([
        Property(1)
    ], ChartArea.prototype, "opacity", void 0);
    return ChartArea;
}(ChildProperty));
/**
 * Configures the chart margins.
 */
var Margin = /** @class */ (function (_super) {
    __extends$2(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(10)
    ], Margin.prototype, "left", void 0);
    __decorate$1([
        Property(10)
    ], Margin.prototype, "right", void 0);
    __decorate$1([
        Property(10)
    ], Margin.prototype, "top", void 0);
    __decorate$1([
        Property(10)
    ], Margin.prototype, "bottom", void 0);
    return Margin;
}(ChildProperty));
/**
 * Configures the animation behavior for chart series.
 */
var Animation$1 = /** @class */ (function (_super) {
    __extends$2(Animation$$1, _super);
    function Animation$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(true)
    ], Animation$$1.prototype, "enable", void 0);
    __decorate$1([
        Property(1000)
    ], Animation$$1.prototype, "duration", void 0);
    __decorate$1([
        Property(0)
    ], Animation$$1.prototype, "delay", void 0);
    return Animation$$1;
}(ChildProperty));
/** @private */
var Indexes = /** @class */ (function (_super) {
    __extends$2(Indexes, _super);
    function Indexes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(0)
    ], Indexes.prototype, "series", void 0);
    __decorate$1([
        Property(0)
    ], Indexes.prototype, "point", void 0);
    return Indexes;
}(ChildProperty));
/**
 * Column series rounded corner options
 */
var CornerRadius = /** @class */ (function (_super) {
    __extends$2(CornerRadius, _super);
    function CornerRadius() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(0)
    ], CornerRadius.prototype, "topLeft", void 0);
    __decorate$1([
        Property(0)
    ], CornerRadius.prototype, "topRight", void 0);
    __decorate$1([
        Property(0)
    ], CornerRadius.prototype, "bottomLeft", void 0);
    __decorate$1([
        Property(0)
    ], CornerRadius.prototype, "bottomRight", void 0);
    return CornerRadius;
}(ChildProperty));
/**
 * @private
 */
var Index = /** @class */ (function () {
    function Index(seriesIndex, pointIndex) {
        this.series = seriesIndex;
        this.point = pointIndex;
    }
    return Index;
}());
/**
 * Configures the Empty Points of series
 */
var EmptyPointSettings = /** @class */ (function (_super) {
    __extends$2(EmptyPointSettings, _super);
    function EmptyPointSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], EmptyPointSettings.prototype, "fill", void 0);
    __decorate$1([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], EmptyPointSettings.prototype, "border", void 0);
    __decorate$1([
        Property('Gap')
    ], EmptyPointSettings.prototype, "mode", void 0);
    return EmptyPointSettings;
}(ChildProperty));

/**
 * Numeric Range.
 * @private
 */
var DoubleRange = /** @class */ (function () {
    function DoubleRange(start, end) {
        /*
          if (!isNaN(start) && !isNaN(end)) {
           this.mIsEmpty = true;
          } else {
              this.mIsEmpty = false;
          }*/
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
        //private mIsEmpty: boolean;
        /** @private */
        get: function () {
            return this.mStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRange.prototype, "end", {
        /** @private */
        get: function () {
            return this.mEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRange.prototype, "delta", {
        /*
          get isEmpty(): boolean {
             return this.mIsEmpty;
         }*/
        /** @private */
        get: function () {
            return (this.mEnd - this.mStart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoubleRange.prototype, "median", {
        /** @private */
        get: function () {
            return this.mStart + (this.mEnd - this.mStart) / 2;
        },
        enumerable: true,
        configurable: true
    });
    return DoubleRange;
}());

/**
 * Numeric module is used to render numeric axis.
 */
var Double = /** @class */ (function () {
    /**
     * Constructor for the dateTime module.
     * @private
     */
    function Double(chart) {
        this.chart = chart;
    }
    /**
     * Numeric Nice Interval for the axis.
     * @private
     */
    Double.prototype.calculateNumericNiceInterval = function (axis, delta, size) {
        var actualDesiredIntervalsCount = axis.getActualDesiredIntervalsCount(size);
        var niceInterval = delta / actualDesiredIntervalsCount;
        if (axis.desiredIntervals != null) {
            return niceInterval;
        }
        var minInterval = Math.pow(10, Math.floor(logBase(niceInterval, 10)));
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
    /**
     * Actual Range for the axis.
     * @private
     */
    Double.prototype.getActualRange = function (axis, size) {
        this.initializeDoubleRange(axis);
        axis.actualRange.interval = axis.interval || this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
        axis.actualRange.min = axis.doubleRange.start;
        axis.actualRange.max = axis.doubleRange.end;
    };
    /**
     * Range for the axis.
     * @private
     */
    Double.prototype.initializeDoubleRange = function (axis) {
        //Axis Min
        if (axis.minimum !== null) {
            this.min = axis.minimum;
        }
        else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
            this.min = 0;
        }
        // Axis Max
        if (axis.maximum !== null) {
            this.max = axis.maximum;
        }
        else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
            this.max = 5;
        }
        if (this.min === this.max) {
            this.max = this.min + 1;
        }
        axis.doubleRange = new DoubleRange(this.min, this.max);
        axis.actualRange = {};
    };
    /**
     * The function to calculate the range and labels for the axis.
     * @return {void}
     * @private
     */
    Double.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis, this.chart);
    };
    /**
     * Calculate Range for the axis.
     * @private
     */
    Double.prototype.calculateRange = function (axis, size) {
        /*! Generate axis range */
        this.min = null;
        this.max = null;
        if (!axis.setRange()) {
            for (var _i = 0, _a = axis.series; _i < _a.length; _i++) {
                var series_1 = _a[_i];
                if (!series_1.visible) {
                    continue;
                }
                this.paddingInterval = 0;
                if ((series_1.type.indexOf('Column') > -1 && axis.orientation === 'Horizontal')
                    || (series_1.type.indexOf('Bar') > -1 && axis.orientation === 'Vertical')) {
                    if ((series_1.xAxis.valueType === 'Double' || series_1.xAxis.valueType === 'DateTime')
                        && series_1.xAxis.rangePadding === 'Auto') {
                        this.paddingInterval = getMinPointsDelta(series_1.xAxis, axis.series) / 2;
                    }
                }
                //For xRange
                if (axis.orientation === 'Horizontal') {
                    if (this.chart.requireInvertedAxis) {
                        this.findMinMax(series_1.yMin, series_1.yMax);
                    }
                    else {
                        this.findMinMax(series_1.xMin - this.paddingInterval, series_1.xMax + this.paddingInterval);
                    }
                }
                // For yRange
                if (axis.orientation === 'Vertical') {
                    if (this.chart.requireInvertedAxis) {
                        this.findMinMax(series_1.xMin - this.paddingInterval, series_1.xMax + this.paddingInterval);
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
    /**
     * Apply padding for the range.
     * @private
     */
    Double.prototype.applyRangePadding = function (axis, size) {
        var start = axis.actualRange.min;
        var end = axis.actualRange.max;
        if (!axis.setRange()) {
            var interval = axis.actualRange.interval;
            var padding = axis.getRangePadding(this.chart);
            if (padding === 'Additional' || padding === 'Round') {
                this.findAdditional(axis, start, end, interval);
            }
            else if (padding === 'Normal') {
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
        axis.actualRange.min = axis.minimum != null ? axis.minimum : minimum;
        axis.actualRange.max = axis.maximum != null ? axis.maximum : maximum;
        axis.actualRange.interval = axis.interval != null ? axis.interval : interval;
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
        axis.doubleRange = new DoubleRange(minimum, maximum);
        if (minimum === 0) {
            interval = this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
            maximum = Math.ceil(maximum / interval) * interval;
        }
        this.updateActualRange(axis, minimum, maximum, interval);
    };
    /**
     * Calculate visible range for axis.
     * @private
     */
    Double.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = {
            max: axis.actualRange.max, min: axis.actualRange.min,
            delta: axis.actualRange.delta, interval: axis.actualRange.interval
        };
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming && axis.valueType !== 'Category') ?
                this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size)
                : axis.visibleRange.interval;
        }
    };
    /**
     * Calculate label for the axis.
     * @private
     */
    Double.prototype.calculateVisibleLabels = function (axis, chart) {
        /*! Generate axis labels */
        axis.visibleLabels = [];
        var tempInterval = axis.visibleRange.min;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0 || this.paddingInterval) {
            tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        }
        var format = this.getFormat(axis);
        var isCustom = format.match('{value}') !== null;
        axis.format = chart.intl.getNumberFormat({ format: isCustom ? '' : format,
            useGrouping: chart.useGroupingSeparator });
        axis.startLabel = axis.format(axis.visibleRange.min);
        axis.endLabel = axis.format(axis.visibleRange.max);
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.visibleRange)) {
                axis.triggerLabelRender(chart, tempInterval, this.formatValue(axis, isCustom, format, tempInterval));
            }
        }
        axis.getMaxLabelWidth(chart);
    };
    /**
     * Format of the axis label.
     * @private
     */
    Double.prototype.getFormat = function (axis) {
        if (axis.labelFormat) {
            return axis.labelFormat;
        }
        return axis.isStack100 ? '{value}%' : '';
    };
    /**
     * Formatted the axis label.
     * @private
     */
    Double.prototype.formatValue = function (axis, isCustom, format, tempInterval) {
        return isCustom ? format.replace('{value}', axis.format(tempInterval))
            : axis.format(tempInterval);
    };
    return Double;
}());

/**
 * Specifies the chart constant value
 */
/** @private */
var loaded = 'loaded';
/** @private */
var load = 'load';
/** @private */
var animationComplete = 'animationComplete';
/** @private */
var legendRender = 'legendRender';
/** @private */
var textRender = 'textRender';
/** @private */
var pointRender = 'pointRender';
/** @private */
var seriesRender = 'seriesRender';
/** @private */
var axisLabelRender = 'axisLabelRender';
/** @private */
var tooltipRender = 'tooltipRender';
/** @private */
var chartMouseMove = 'chartMouseMove';
/** @private */
var chartMouseClick = 'chartMouseClick';
/** @private */
var chartMouseLeave = 'chartMouseLeave';
/** @private */
var chartMouseDown = 'chartMouseDown';
/** @private */
var chartMouseUp = 'chartMouseUp';
/** @private */
var zoomComplete = 'zoomComplete';
/** @private */
var dragComplete = 'dragComplete';
/** @private */
var resized = 'resized';
/** @private */
var beforePrint = 'beforePrint';
/** @private */
var annotationRender = 'annotationRender';

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the Annotation for chart.
 */
var ChartAnnotationSettings = /** @class */ (function (_super) {
    __extends$4(ChartAnnotationSettings, _super);
    function ChartAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property('0')
    ], ChartAnnotationSettings.prototype, "x", void 0);
    __decorate$3([
        Property('0')
    ], ChartAnnotationSettings.prototype, "y", void 0);
    __decorate$3([
        Property(null)
    ], ChartAnnotationSettings.prototype, "content", void 0);
    __decorate$3([
        Property('Center')
    ], ChartAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate$3([
        Property('Pixel')
    ], ChartAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate$3([
        Property('Chart')
    ], ChartAnnotationSettings.prototype, "region", void 0);
    __decorate$3([
        Property('Middle')
    ], ChartAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate$3([
        Property(null)
    ], ChartAnnotationSettings.prototype, "xAxisName", void 0);
    __decorate$3([
        Property(null)
    ], ChartAnnotationSettings.prototype, "yAxisName", void 0);
    __decorate$3([
        Property(null)
    ], ChartAnnotationSettings.prototype, "description", void 0);
    return ChartAnnotationSettings;
}(ChildProperty));
/**
 * Strip line properties
 */
var StripLineSettings = /** @class */ (function (_super) {
    __extends$4(StripLineSettings, _super);
    function StripLineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property(true)
    ], StripLineSettings.prototype, "visible", void 0);
    __decorate$3([
        Property(false)
    ], StripLineSettings.prototype, "startFromAxis", void 0);
    __decorate$3([
        Property(null)
    ], StripLineSettings.prototype, "start", void 0);
    __decorate$3([
        Property(null)
    ], StripLineSettings.prototype, "end", void 0);
    __decorate$3([
        Property(null)
    ], StripLineSettings.prototype, "size", void 0);
    __decorate$3([
        Property('#808080')
    ], StripLineSettings.prototype, "color", void 0);
    __decorate$3([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], StripLineSettings.prototype, "border", void 0);
    __decorate$3([
        Property('')
    ], StripLineSettings.prototype, "text", void 0);
    __decorate$3([
        Property(null)
    ], StripLineSettings.prototype, "rotation", void 0);
    __decorate$3([
        Property('Middle')
    ], StripLineSettings.prototype, "horizontalAlignment", void 0);
    __decorate$3([
        Property('Middle')
    ], StripLineSettings.prototype, "verticalAlignment", void 0);
    __decorate$3([
        Complex(Theme.stripLineLabelFont, Font)
    ], StripLineSettings.prototype, "textStyle", void 0);
    __decorate$3([
        Property('Behind')
    ], StripLineSettings.prototype, "zIndex", void 0);
    __decorate$3([
        Property(1)
    ], StripLineSettings.prototype, "opacity", void 0);
    return StripLineSettings;
}(ChildProperty));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var axisPadding = 10;
/**
 * Configures the `rows` of the chart.
 */
var Row = /** @class */ (function (_super) {
    __extends$3(Row, _super);
    function Row() {
        /**
         * The height of the row as a string accept input both as '100px' and '100%'.
         * If specified as '100%, row renders to the full height of its chart.
         * @default 100%.
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.axes = [];
        /** @private */
        _this.nearSizes = [];
        /** @private */
        _this.farSizes = [];
        return _this;
    }
    /**
     * Measure the row size
     * @return {void}
     * @private
     */
    Row.prototype.computeSize = function (axis, clipRect) {
        var titleSize = 0;
        var width = 0;
        var innerPadding = 5;
        if (axis.visible) {
            if (axis.title) {
                titleSize = measureText(axis.title, axis.titleStyle).height + innerPadding;
            }
            width += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.width + innerPadding + axisPadding +
                axis.lineStyle.width / 2);
        }
        if (axis.opposedPosition) {
            this.farSizes.push(width);
        }
        else {
            this.nearSizes.push(width);
        }
    };
    __decorate$2([
        Property('100%')
    ], Row.prototype, "height", void 0);
    __decorate$2([
        Complex({}, Border)
    ], Row.prototype, "border", void 0);
    return Row;
}(ChildProperty));
/**
 * Configures the `columns` of the chart.
 */
var Column = /** @class */ (function (_super) {
    __extends$3(Column, _super);
    function Column() {
        /**
         * The width of the column as a string accepts input both as like '100px' or '100%'.
         * If specified as '100%, column renders to the full width of its chart.
         * @default 100%.
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.axes = [];
        /** @private */
        _this.nearSizes = [];
        /** @private */
        _this.farSizes = [];
        /** @private */
        _this.padding = 0;
        return _this;
    }
    /**
     * Measure the column size
     * @return {void}
     * @private
     */
    Column.prototype.computeSize = function (axis, clipRect) {
        var titleSize = 0;
        var height = 0;
        var innerPadding = 5;
        if (axis.visible) {
            if (axis.title) {
                titleSize = measureText(axis.title, axis.titleStyle).height + innerPadding;
            }
            height += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.height + innerPadding + axisPadding
                + axis.lineStyle.width / 2);
        }
        if (axis.opposedPosition) {
            this.farSizes.push(height);
        }
        else {
            this.nearSizes.push(height);
        }
    };
    __decorate$2([
        Property('100%')
    ], Column.prototype, "width", void 0);
    __decorate$2([
        Complex({}, Border)
    ], Column.prototype, "border", void 0);
    return Column;
}(ChildProperty));
/**
 * Configures the major grid lines in the `axis`.
 */
var MajorGridLines = /** @class */ (function (_super) {
    __extends$3(MajorGridLines, _super);
    function MajorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(1)
    ], MajorGridLines.prototype, "width", void 0);
    __decorate$2([
        Property('')
    ], MajorGridLines.prototype, "dashArray", void 0);
    __decorate$2([
        Property(Theme.axisMajorGridLineColor)
    ], MajorGridLines.prototype, "color", void 0);
    return MajorGridLines;
}(ChildProperty));
/**
 * Configures the minor grid lines in the `axis`.
 */
var MinorGridLines = /** @class */ (function (_super) {
    __extends$3(MinorGridLines, _super);
    function MinorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(0.7)
    ], MinorGridLines.prototype, "width", void 0);
    __decorate$2([
        Property('')
    ], MinorGridLines.prototype, "dashArray", void 0);
    __decorate$2([
        Property(Theme.axisMinorGridLineColor)
    ], MinorGridLines.prototype, "color", void 0);
    return MinorGridLines;
}(ChildProperty));
/**
 * Configures the axis line of a chart.
 */
var AxisLine = /** @class */ (function (_super) {
    __extends$3(AxisLine, _super);
    function AxisLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(1)
    ], AxisLine.prototype, "width", void 0);
    __decorate$2([
        Property('')
    ], AxisLine.prototype, "dashArray", void 0);
    __decorate$2([
        Property(Theme.axisLineColor)
    ], AxisLine.prototype, "color", void 0);
    return AxisLine;
}(ChildProperty));
/**
 * Configures the major tick lines.
 */
var MajorTickLines = /** @class */ (function (_super) {
    __extends$3(MajorTickLines, _super);
    function MajorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(1)
    ], MajorTickLines.prototype, "width", void 0);
    __decorate$2([
        Property(5)
    ], MajorTickLines.prototype, "height", void 0);
    __decorate$2([
        Property(Theme.axisMajorTickLineColor)
    ], MajorTickLines.prototype, "color", void 0);
    return MajorTickLines;
}(ChildProperty));
/**
 * Configures the minor tick lines.
 */
var MinorTickLines = /** @class */ (function (_super) {
    __extends$3(MinorTickLines, _super);
    function MinorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(0.7)
    ], MinorTickLines.prototype, "width", void 0);
    __decorate$2([
        Property(5)
    ], MinorTickLines.prototype, "height", void 0);
    __decorate$2([
        Property(Theme.axisMinorTickLineColor)
    ], MinorTickLines.prototype, "color", void 0);
    return MinorTickLines;
}(ChildProperty));
/**
 * Configures the crosshair ToolTip.
 */
var CrosshairTooltip = /** @class */ (function (_super) {
    __extends$3(CrosshairTooltip, _super);
    function CrosshairTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property(false)
    ], CrosshairTooltip.prototype, "enable", void 0);
    __decorate$2([
        Property(Theme.crossHairLabelColor)
    ], CrosshairTooltip.prototype, "fill", void 0);
    __decorate$2([
        Complex(Theme.crosshairLabelFont, Font)
    ], CrosshairTooltip.prototype, "textStyle", void 0);
    return CrosshairTooltip;
}(ChildProperty));
/**
 * Configures the axes in the chart.
 */
var Axis = /** @class */ (function (_super) {
    __extends$3(Axis, _super);
    function Axis() {
        /**
         * Options to customize the axis label.
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.visibleLabels = [];
        /** @private */
        _this.series = [];
        /** @private */
        _this.rect = new Rect(undefined, undefined, 0, 0);
        /** @private */
        _this.axisBottomLine = null;
        /** @private */
        _this.intervalDivs = [10, 5, 2, 1];
        /** @private */
        _this.angle = _this.labelRotation;
        /** @private */
        _this.isStack100 = false;
        return _this;
    }
    /**
     * The function used to find whether the range is set.
     * @return {boolean}
     * @private
     */
    Axis.prototype.setRange = function () {
        if (this.minimum != null && this.maximum != null) {
            return true;
        }
        return false;
    };
    /**
     * Calculate visible range for axis.
     * @return {void}
     * @private
     */
    Axis.prototype.calculateVisibleRange = function (size) {
        if (this.zoomFactor < 1 || this.zoomPosition > 0) {
            var baseRange = this.actualRange;
            var start = void 0;
            var end = void 0;
            if (!this.isInversed) {
                start = this.actualRange.min + this.zoomPosition * this.actualRange.delta;
                end = start + this.zoomFactor * this.actualRange.delta;
            }
            else {
                start = this.actualRange.max - (this.zoomPosition * this.actualRange.delta);
                end = start - (this.zoomFactor * this.actualRange.delta);
            }
            if (start < baseRange.min) {
                end = end + (baseRange.min - start);
                start = baseRange.min;
            }
            if (end > baseRange.max) {
                start = start - (end - baseRange.max);
                end = baseRange.max;
            }
            this.doubleRange = new DoubleRange(start, end);
            this.visibleRange.min = this.doubleRange.start;
            this.visibleRange.max = this.doubleRange.end;
            this.visibleRange.delta = this.doubleRange.delta;
        }
    };
    /**
     * Calculate desired interval for the axis.
     * @return {void}
     * @private
     */
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
    /**
     * Triggers the event.
     * @return {void}
     * @private
     */
    Axis.prototype.triggerLabelRender = function (chart, tempInterval, text) {
        var argsData;
        argsData = {
            cancel: false, name: axisLabelRender, axis: this,
            text: text, value: tempInterval
        };
        chart.trigger(axisLabelRender, argsData);
        if (!argsData.cancel) {
            this.visibleLabels.push(new VisibleLabels(argsData.text, argsData.value));
        }
    };
    /**
     * Calculate padding for the axis.
     * @return {string}
     * @private
     */
    Axis.prototype.getRangePadding = function (chart) {
        var padding = this.rangePadding;
        if (padding !== 'Auto') {
            return padding;
        }
        switch (this.orientation) {
            case 'Horizontal':
                if (chart.requireInvertedAxis) {
                    padding = (this.isStack100 ? 'Round' : 'Normal');
                }
                else {
                    padding = 'None';
                }
                break;
            case 'Vertical':
                if (!chart.requireInvertedAxis) {
                    padding = (this.isStack100 ? 'Round' : 'Normal');
                }
                else {
                    padding = 'None';
                }
                break;
        }
        return padding;
    };
    /**
     * Calculate maximum label width for the axis.
     * @return {void}
     * @private
     */
    Axis.prototype.getMaxLabelWidth = function (chart) {
        var pointX;
        var previousEnd = 0;
        var isIntersect = false;
        this.angle = this.labelRotation;
        this.maxLabelSize = new Size(0, 0);
        var action = this.labelIntersectAction;
        var label;
        for (var i = 0; i < this.visibleLabels.length; i++) {
            label = this.visibleLabels[i];
            label.size = measureText(label.text, this.labelStyle);
            if (label.size.width > this.maxLabelSize.width) {
                this.maxLabelSize.width = label.size.width;
                this.rotatedLabel = label.text;
            }
            if (label.size.height > this.maxLabelSize.height) {
                this.maxLabelSize.height = label.size.height;
            }
            if (action === 'None' || action === 'Hide' || action === 'Trim') {
                continue;
            }
            if (this.angle % 360 === 0 && this.orientation === 'Horizontal' && this.rect.width > 0 && !isIntersect) {
                pointX = (valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
                pointX -= label.size.width / 2;
                if (this.edgeLabelPlacement === 'Shift') {
                    if (i === 0 && pointX < this.rect.x) {
                        pointX = this.rect.x;
                    }
                    if (i === this.visibleLabels.length - 1 && ((pointX + label.size.width) > (this.rect.x + this.rect.width))) {
                        pointX = this.rect.x + this.rect.width - label.size.width;
                    }
                }
                switch (action) {
                    case 'MultipleRows':
                        if (i > 0) {
                            this.findMultiRows(i, pointX, label);
                        }
                        break;
                    case 'Rotate45':
                    case 'Rotate90':
                        if (i > 0 && (!this.isInversed ? pointX <= previousEnd : pointX + label.size.width >= previousEnd)) {
                            this.angle = (action === 'Rotate45') ? 45 : 90;
                            isIntersect = true;
                        }
                        break;
                    default:
                        this.findWrap(i, pointX, label);
                        break;
                }
                previousEnd = this.isInversed ? pointX : pointX + label.size.width;
            }
        }
        if (this.angle !== 0) {
            this.maxLabelSize = rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
        }
    };
    /**
     * Finds the wrap for axis label.
     * @return {void}
     */
    Axis.prototype.findWrap = function (width, currentX, currentLabel) {
        var intervalLength = this.rect.width / this.visibleLabels.length;
        var textCollection = currentLabel.text.split(' ');
        var label = '';
        var labelCollection = [];
        var text;
        for (var i = 0, len = textCollection.length; i < len; i++) {
            text = textCollection[i];
            if (measureText(label.concat(text), this.labelStyle).width < intervalLength) {
                label = label.concat((label === '' ? '' : ' ') + text);
            }
            else {
                if (label !== '') {
                    labelCollection.push(textTrim(intervalLength, label, this.labelStyle));
                    label = text;
                }
                else {
                    labelCollection.push(textTrim(intervalLength, text, this.labelStyle));
                    text = '';
                }
            }
            if (label && i === len - 1) {
                labelCollection.push(textTrim(intervalLength, label, this.labelStyle));
            }
        }
        currentLabel.text = labelCollection;
        var height = (currentLabel.size.height * labelCollection.length);
        if (height > this.maxLabelSize.height) {
            this.maxLabelSize.height = height;
        }
    };
    /**
     * Finds the multiple rows for axis.
     * @return {void}
     */
    Axis.prototype.findMultiRows = function (length, currentX, currentLabel) {
        var label;
        var pointX;
        var store = [];
        var isMultiRows;
        for (var i = length - 1; i >= 0; i--) {
            label = this.visibleLabels[i];
            pointX = (valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
            isMultiRows = !this.isInversed ? currentX < (pointX + label.size.width / 2) :
                currentX + currentLabel.size.width > (pointX - label.size.width / 2);
            if (isMultiRows) {
                store.push(label.index);
                currentLabel.index = (currentLabel.index > label.index) ? currentLabel.index : label.index + 1;
            }
            else {
                currentLabel.index = store.indexOf(label.index) > -1 ? currentLabel.index : label.index;
            }
        }
        var height = (currentLabel.size.height * currentLabel.index) + (5 * (currentLabel.index - 1));
        if (height > this.maxLabelSize.height) {
            this.maxLabelSize.height = height;
        }
    };
    /**
     * Finds the default module for axis.
     * @return {void}
     * @private
     */
    Axis.prototype.getModule = function (chart) {
        if (this.valueType === 'Double') {
            this.baseModule = new Double(chart);
        }
        else {
            this.baseModule = chart[firstToLowerCase(this.valueType) + 'Module'];
        }
    };
    __decorate$2([
        Complex(Theme.axisLabelFont, Font)
    ], Axis.prototype, "labelStyle", void 0);
    __decorate$2([
        Complex({}, CrosshairTooltip)
    ], Axis.prototype, "crosshairTooltip", void 0);
    __decorate$2([
        Property('')
    ], Axis.prototype, "title", void 0);
    __decorate$2([
        Complex(Theme.axisTitleFont, Font)
    ], Axis.prototype, "titleStyle", void 0);
    __decorate$2([
        Property('')
    ], Axis.prototype, "labelFormat", void 0);
    __decorate$2([
        Property('')
    ], Axis.prototype, "skeleton", void 0);
    __decorate$2([
        Property('DateTime')
    ], Axis.prototype, "skeletonType", void 0);
    __decorate$2([
        Property(0)
    ], Axis.prototype, "plotOffset", void 0);
    __decorate$2([
        Property(false)
    ], Axis.prototype, "isIndexed", void 0);
    __decorate$2([
        Property(10)
    ], Axis.prototype, "logBase", void 0);
    __decorate$2([
        Property(0)
    ], Axis.prototype, "columnIndex", void 0);
    __decorate$2([
        Property(0)
    ], Axis.prototype, "rowIndex", void 0);
    __decorate$2([
        Property(1)
    ], Axis.prototype, "span", void 0);
    __decorate$2([
        Property(null)
    ], Axis.prototype, "desiredIntervals", void 0);
    __decorate$2([
        Property(3)
    ], Axis.prototype, "maximumLabels", void 0);
    __decorate$2([
        Property(1)
    ], Axis.prototype, "zoomFactor", void 0);
    __decorate$2([
        Property(0)
    ], Axis.prototype, "zoomPosition", void 0);
    __decorate$2([
        Property(false)
    ], Axis.prototype, "opposedPosition", void 0);
    __decorate$2([
        Property(true)
    ], Axis.prototype, "enableAutoIntervalOnZooming", void 0);
    __decorate$2([
        Property('Auto')
    ], Axis.prototype, "rangePadding", void 0);
    __decorate$2([
        Property('Double')
    ], Axis.prototype, "valueType", void 0);
    __decorate$2([
        Property('None')
    ], Axis.prototype, "edgeLabelPlacement", void 0);
    __decorate$2([
        Property('Auto')
    ], Axis.prototype, "intervalType", void 0);
    __decorate$2([
        Property('BetweenTicks')
    ], Axis.prototype, "labelPlacement", void 0);
    __decorate$2([
        Property('')
    ], Axis.prototype, "name", void 0);
    __decorate$2([
        Property(true)
    ], Axis.prototype, "visible", void 0);
    __decorate$2([
        Property(0)
    ], Axis.prototype, "minorTicksPerInterval", void 0);
    __decorate$2([
        Property(0)
    ], Axis.prototype, "labelRotation", void 0);
    __decorate$2([
        Property(null)
    ], Axis.prototype, "minimum", void 0);
    __decorate$2([
        Property(null)
    ], Axis.prototype, "maximum", void 0);
    __decorate$2([
        Property(null)
    ], Axis.prototype, "interval", void 0);
    __decorate$2([
        Complex({}, MajorTickLines)
    ], Axis.prototype, "majorTickLines", void 0);
    __decorate$2([
        Complex({}, MinorTickLines)
    ], Axis.prototype, "minorTickLines", void 0);
    __decorate$2([
        Complex({}, MajorGridLines)
    ], Axis.prototype, "majorGridLines", void 0);
    __decorate$2([
        Complex({}, MinorGridLines)
    ], Axis.prototype, "minorGridLines", void 0);
    __decorate$2([
        Complex({}, AxisLine)
    ], Axis.prototype, "lineStyle", void 0);
    __decorate$2([
        Property('Hide')
    ], Axis.prototype, "labelIntersectAction", void 0);
    __decorate$2([
        Property(false)
    ], Axis.prototype, "isInversed", void 0);
    __decorate$2([
        Property(100)
    ], Axis.prototype, "coefficient", void 0);
    __decorate$2([
        Property(0)
    ], Axis.prototype, "startAngle", void 0);
    __decorate$2([
        Property(null)
    ], Axis.prototype, "description", void 0);
    __decorate$2([
        Property(2)
    ], Axis.prototype, "tabIndex", void 0);
    __decorate$2([
        Collection([], StripLineSettings)
    ], Axis.prototype, "stripLines", void 0);
    return Axis;
}(ChildProperty));
/** @private */
var VisibleLabels = /** @class */ (function () {
    function VisibleLabels(text, value, size, index) {
        if (size === void 0) { size = new Size(0, 0); }
        if (index === void 0) { index = 1; }
        this.text = text;
        this.originalText = text;
        this.value = value;
        this.size = size;
        this.index = 1;
    }
    return VisibleLabels;
}());

/**
 * Specifies the Cartesian Axis Layout.
 */
var axisPadding$1 = 10;
var CartesianAxisLayoutPanel = /** @class */ (function () {
    /** @private */
    function CartesianAxisLayoutPanel(chartModule) {
        this.chart = chartModule;
        this.padding = 5;
    }
    /**
     * Measure the axis size.
     * @return {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.measureAxis = function (rect) {
        var chart = this.chart;
        this.seriesClipRect = new Rect(rect.x, rect.y, rect.width, rect.height);
        this.initialClipRect = rect;
        this.leftSize = 0;
        this.rightSize = 0;
        this.topSize = 0;
        this.bottomSize = 0;
        //Measure Axis size with initial Rect
        this.measureRowAxis(chart, this.initialClipRect);
        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));
        this.measureColumnAxis(chart, this.initialClipRect);
        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));
        if (!this.chart.delayRedraw) {
            this.calculateAxisSize(this.initialClipRect);
        }
        this.leftSize = 0;
        this.rightSize = 0;
        this.topSize = 0;
        this.bottomSize = 0;
        //Measure Axis size with series Rect
        this.measureRowAxis(chart, this.initialClipRect);
        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));
        this.measureColumnAxis(chart, this.initialClipRect);
        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));
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
            this.measureDefinition(row, chart, new Size(chart.availableSize.width, row.computedHeight), rect);
            if (this.leftSize < sum(row.nearSizes)) {
                this.leftSize = sum(row.nearSizes);
            }
            if (this.rightSize < sum(row.farSizes)) {
                this.rightSize = sum(row.farSizes);
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
            this.measureDefinition(column, chart, new Size(column.computedWidth, chart.availableSize.height), rect);
            if (this.bottomSize < sum(column.nearSizes)) {
                this.bottomSize = sum(column.nearSizes);
            }
            if (this.topSize < sum(column.farSizes)) {
                this.topSize = sum(column.farSizes);
            }
        }
    };
    /**
     * Measure the column and row in chart.
     * @return {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.measureDefinition = function (definition, chart, size, clipRect) {
        for (var _i = 0, _a = definition.axes; _i < _a.length; _i++) {
            var axis_1 = _a[_i];
            axis_1.getModule(chart);
            axis_1.baseModule.calculateRangeAndInterval(size, axis_1);
            definition.computeSize(axis_1, clipRect);
        }
        if (definition.farSizes.length > 0) {
            definition.farSizes[definition.farSizes.length - 1] -= axisPadding$1;
        }
        if (definition.nearSizes.length > 0) {
            definition.nearSizes[definition.nearSizes.length - 1] -= axisPadding$1;
        }
    };
    /**
     * Measure the axis.
     * @return {void}
     * @private
     */
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
                    x = rect.x + rect.width + sum(subArray(row.farSizes, farCount));
                    axis.rect.x = axis.rect.x >= x ? axis.rect.x : x;
                    farCount++;
                }
                else {
                    x = rect.x - sum(subArray(row.nearSizes, nearCount));
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
                    y = rect.y - sum(subArray(column.farSizes, farCount));
                    axis.rect.y = axis.rect.y <= y ? axis.rect.y : y;
                    farCount++;
                }
                else {
                    y = rect.y + rect.height + sum(subArray(column.nearSizes, nearCount));
                    axis.rect.y = axis.rect.y >= y ? axis.rect.y : y;
                    nearCount++;
                }
            }
        }
    };
    /**
     * Measure the axis.
     * @return {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.measure = function () {
        var chart = this.chart;
        var row;
        var column;
        var definition;
        var actualIndex;
        var span;
        for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
            var axis_2 = _a[_i];
            //definition.Axes = axis;
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
    /**
     * Measure the row size.
     * @return {void}
     */
    CartesianAxisLayoutPanel.prototype.calculateRowSize = function (rect) {
        /*! Calculate row size */
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
    /**
     * Measure the row size.
     * @return {void}
     */
    CartesianAxisLayoutPanel.prototype.calculateColumnSize = function (rect) {
        /*! Calculate column size */
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
    /**
     * To render the axis element.
     * @return {void}
     * @private
     */
    CartesianAxisLayoutPanel.prototype.renderAxes = function () {
        var chart = this.chart;
        var axis;
        var axisElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisCollection' });
        var definitionElement = chart.renderer.createGroup({ id: chart.element.id + 'DefintionLine' });
        for (var i = 0, len = chart.axisCollections.length; i < len; i++) {
            axis = chart.axisCollections[i];
            this.element = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i });
            if (axis.orientation === 'Horizontal') {
                if (axis.visible && axis.lineStyle.width > 0) {
                    this.drawAxisLine(axis, i, axis.plotOffset, 0);
                }
                if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                    this.drawXAxisGridLine(axis, i);
                }
                if (axis.visible) {
                    this.drawXAxisLabels(axis, i);
                    this.drawXAxisTitle(axis, i);
                }
            }
            else {
                if (axis.visible && axis.lineStyle.width > 0) {
                    this.drawAxisLine(axis, i, 0, axis.plotOffset);
                }
                if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                    this.drawYAxisGridLine(axis, i);
                }
                if (axis.visible) {
                    this.drawYAxisLabels(axis, i);
                    this.drawYAxisTitle(axis, i);
                }
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
        //Gridlines
        for (var i = 0; i < length; i++) {
            tempInterval = !axis.visibleLabels[i] ? (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel
                : axis.visibleLabels[i].value - ticksbwtLabel;
            pointY = valueToCoefficient(tempInterval, axis) * rect.height;
            pointY = (pointY * -1) + (rect.y + rect.height);
            if (pointY >= rect.y && (rect.y + rect.height) >= pointY) {
                if ((inside(tempInterval, axis.visibleRange)) || this.isBorder(axis, i, pointY)) {
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
    /**
     * To render the axis label.
     * @return {void}
     * @private
     */
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
            pointY = valueToCoefficient(axis.visibleLabels[i].value, axis) * rect.height;
            pointY = Math.floor((pointY * -1) + (rect.y + rect.height));
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY + (elementSize.height / 4), anchor, axis.visibleLabels[i].text);
            if (axis.edgeLabelPlacement) {
                switch (axis.edgeLabelPlacement) {
                    case 'None':
                        break;
                    case 'Hide':
                        if (((i === 0 || (axis.isInversed && i === len - 1)) && options.y > rect.y + rect.height) ||
                            (((i === len - 1) || (axis.isInversed && i === 0)) && options.y - elementSize.height / 2 < rect.y)) {
                            options.text = '';
                        }
                        break;
                    case 'Shift':
                        if ((i === 0 || (axis.isInversed && i === len - 1)) && options.y > rect.y + rect.height) {
                            options.y = pointY = rect.y + rect.height;
                        }
                        else if (((i === len - 1) || (axis.isInversed && i === 0)) && (options.y - elementSize.height / 2 < rect.y)) {
                            options.y = pointY = rect.y + elementSize.height / 2;
                        }
                        break;
                }
            }
            textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement);
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
        var elementSize = measureText(axis.title, axis.titleStyle);
        var padding = axis.majorTickLines.height + axis.maxLabelSize.width + this.padding * 2;
        var rect = axis.rect;
        padding = axis.opposedPosition ? padding : -padding;
        var x = rect.x + padding;
        var y = rect.y + rect.height / 2;
        var options = new TextOption(chart.element.id + '_AxisTitle_' + index, x, y - this.padding, 'middle', axis.title, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')');
        var element = textElement(options, axis.titleStyle, axis.titleStyle.color, this.element);
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
        //Gridlines
        for (var i = 0; i < length; i++) {
            tempInterval = axis.visibleLabels[i] ? axis.visibleLabels[i].value - ticksbwtLabel
                : (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel;
            pointX = (valueToCoefficient(tempInterval, axis) * rect.width) + rect.x;
            if (pointX >= rect.x && (rect.x + rect.width) >= pointX) {
                if (inside(tempInterval, axis.visibleRange) || this.isBorder(axis, i, pointX)) {
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
                if (inside(value, range)) {
                    position = Math.ceil(((value - range.min) / (range.max - range.min)) * rect.width);
                    coor = (Math.floor(position + rect.x));
                    minorGird = minorGird.concat('M' + ' ' + coor + ' ' + (this.seriesClipRect.y)
                        + 'L ' + coor + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height));
                    coor = (Math.floor(position + rect.x));
                    minorTick = minorTick.concat('M' + ' ' + coor + ' ' + (rect.y)
                        + 'L ' + coor + ' ' + (rect.y + tickSize));
                }
            }
        }
        else {
            tickSize = axis.opposedPosition ? axis.minorTickLines.height : -axis.minorTickLines.height;
            for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                value = this.findLogNumeric(axis, logPosition, logInterval, value);
                if (inside(value, range)) {
                    position = Math.ceil(((value - range.min) / (range.max - range.min)) * rect.height) * -1;
                    coor = (Math.floor(position + rect.y + rect.height));
                    minorGird = minorGird.concat('M' + ' ' + (this.seriesClipRect.x) + ' ' + coor
                        + 'L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + coor);
                    coor = (Math.floor(position + rect.y + rect.height));
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
            value = logBase(logPosition, axis.logBase);
        }
        else if (axis.valueType === 'DateTime') {
            value += axis.dateTimeInterval / (axis.minorTicksPerInterval + 1);
        }
        else {
            value += range.interval / (axis.minorTicksPerInterval + 1);
        }
        return value;
    };
    /**
     * To render the axis label.
     * @return {void}
     * @private
     */
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
        var previousEnd = axis.isInversed ? (rect.x + rect.width) : rect.x;
        var width = 0;
        var intervalLength = axis.rect.width / axis.visibleLabels.length;
        var label;
        for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
            label = axis.visibleLabels[i];
            pointX = (valueToCoefficient(label.value, axis) * rect.width) + rect.x;
            elementSize = label.size;
            width = ((axis.labelIntersectAction === 'Trim' || axis.labelIntersectAction === 'Wrap')
                && elementSize.width > intervalLength) ? intervalLength : elementSize.width;
            pointX -= width / 2;
            labelPadding = (axis.opposedPosition) ?
                -(padding + ((axis.angle !== 0) ? (3 * (elementSize.height / 4) + (2 * axis.maxLabelSize.height / 5)) :
                    (label.index > 1 ? (2 * (elementSize.height / 4)) : 0)))
                : padding + ((axis.angle !== 0) ? (3 * (elementSize.height / 4)) + (2 * axis.maxLabelSize.height / 5)
                    : (3 * (elementSize.height / 4)));
            pointY = (rect.y + (labelPadding * label.index));
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, '', this.findAxisLabel(axis, label.text, intervalLength));
            if (axis.edgeLabelPlacement) {
                switch (axis.edgeLabelPlacement) {
                    case 'None':
                        break;
                    case 'Hide':
                        if (((i === 0 || (axis.isInversed && i === len - 1)) && options.x < rect.x) ||
                            ((i === len - 1 || (axis.isInversed && i === 0)) && (options.x + width > rect.x + rect.width))) {
                            continue;
                        }
                        break;
                    case 'Shift':
                        if ((i === 0 || (axis.isInversed && i === len - 1)) && options.x < rect.x) {
                            options.x = pointX = rect.x;
                        }
                        else if ((i === len - 1 || (axis.isInversed && i === 0)) && ((options.x + width) > rect.x + rect.width)) {
                            options.x = pointX = rect.x + rect.width - width;
                        }
                        break;
                }
            }
            if (axis.angle % 360 === 0 && axis.labelIntersectAction === 'Hide' && i !== 0 &&
                (!axis.isInversed ? options.x <= previousEnd : options.x + width >= previousEnd)) {
                continue;
            }
            previousEnd = axis.isInversed ? options.x : options.x + width;
            if (axis.angle !== 0) {
                angle = (axis.angle > 360) ? axis.angle % 360 : axis.angle;
                rotateSize = rotateTextSize(axis.labelStyle, label.text, angle, chart);
                diffHeight = axis.maxLabelSize.height - Math.ceil(rotateSize.height - elementSize.height);
                yLocation = axis.opposedPosition ? diffHeight / 2 : -diffHeight / 2;
                options.transform = 'rotate(' + angle + ',' + (pointX + width / 2 + anglePadding) + ','
                    + (pointY + yLocation) + ')';
                options.y += yLocation;
            }
            textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement, axis.opposedPosition).setAttribute('style', 'cursor: default');
        }
        if (!chart.delayRedraw) {
            this.element.appendChild(labelElement);
        }
        else if (axis.visible) {
            this.createZoomingLabel(this.chart, labelElement, axis, index);
        }
    };
    CartesianAxisLayoutPanel.prototype.findAxisLabel = function (axis, label, width) {
        switch (axis.labelIntersectAction) {
            case 'Trim':
                return textTrim(width, label, axis.labelStyle);
            default:
                return label;
        }
    };
    CartesianAxisLayoutPanel.prototype.drawXAxisTitle = function (axis, index) {
        var chart = this.chart;
        var elementSize = measureText(axis.title, axis.titleStyle);
        var padding = axis.majorTickLines.height + axis.maxLabelSize.height + this.padding * 2;
        var rect = axis.rect;
        padding = axis.opposedPosition ? -(padding + elementSize.height / 4) : (padding + (3 * elementSize.height / 4));
        var options = new TextOption(chart.element.id + '_AxisTitle_' + index, rect.x + rect.width / 2, rect.y + padding, 'middle', axis.title);
        var element = textElement(options, axis.titleStyle, axis.titleStyle.color, this.element);
        element.setAttribute('aria-label', axis.description || axis.title);
        element.setAttribute('tabindex', axis.tabIndex.toString());
    };
    CartesianAxisLayoutPanel.prototype.renderTickLine = function (axis, index, majorTick, minorTick) {
        var options;
        var chart = this.chart;
        if (axis.majorTickLines.width > 0 && axis.visible) {
            options = new PathOption(chart.element.id + '_MajorTickLine_' + index, 'transparent', axis.majorTickLines.width, axis.majorTickLines.color, null, null, majorTick);
            this.htmlObject = chart.renderer.drawPath(options);
            this.element.appendChild(this.htmlObject);
        }
        if (axis.minorTickLines.width > 0 && axis.visible) {
            options = new PathOption(chart.element.id + '_MinorTickLine_' + index, 'transparent', axis.minorTickLines.width, axis.minorTickLines.color, null, null, minorTick);
            this.htmlObject = chart.renderer.drawPath(options);
            this.element.appendChild(this.htmlObject);
        }
    };
    CartesianAxisLayoutPanel.prototype.renderGridLine = function (axis, index, majorGrid, minorGird) {
        var chart = this.chart;
        var options;
        if (axis.majorGridLines.width > 0) {
            options = new PathOption(chart.element.id + '_MajorGridLine_' + index, 'transparent', axis.majorGridLines.width, axis.majorGridLines.color, null, axis.majorGridLines.dashArray, majorGrid);
            this.htmlObject = chart.renderer.drawPath(options);
            this.element.appendChild(this.htmlObject);
        }
        if (axis.minorGridLines.width > 0) {
            options = new PathOption(chart.element.id + '_MinorGridLine_' + index, 'transparent', axis.minorGridLines.width, axis.minorGridLines.color, null, axis.minorGridLines.dashArray, minorGird);
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
        zoomElement = createZoomingLabels(chart, axis, zoomElement, index, axis.orientation === 'Vertical');
        parentNode.replaceChild(labelElement, document.getElementById(labelElement.id));
        if (getElement(chart.element.id + 'AxisLabels_Zoom' + index)) {
            parentNode.replaceChild(zoomElement, document.getElementById(zoomElement.id));
        }
        else {
            parentNode.appendChild(zoomElement);
        }
    };
    return CartesianAxisLayoutPanel;
}());

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Points model for the series.
 * @private
 */
var Points = /** @class */ (function () {
    function Points() {
        this.symbolLocations = null;
        this.regions = null;
        this.regionData = null;
    }
    return Points;
}());
/**
 * Configures the data label in the series.
 */
var DataLabelSettings = /** @class */ (function (_super) {
    __extends$5(DataLabelSettings, _super);
    function DataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property(false)
    ], DataLabelSettings.prototype, "visible", void 0);
    __decorate$4([
        Property(null)
    ], DataLabelSettings.prototype, "name", void 0);
    __decorate$4([
        Property('transparent')
    ], DataLabelSettings.prototype, "fill", void 0);
    __decorate$4([
        Property(1)
    ], DataLabelSettings.prototype, "opacity", void 0);
    __decorate$4([
        Property('Auto')
    ], DataLabelSettings.prototype, "position", void 0);
    __decorate$4([
        Property(5)
    ], DataLabelSettings.prototype, "rx", void 0);
    __decorate$4([
        Property(5)
    ], DataLabelSettings.prototype, "ry", void 0);
    __decorate$4([
        Property('Center')
    ], DataLabelSettings.prototype, "alignment", void 0);
    __decorate$4([
        Complex({ width: null, color: null }, Border)
    ], DataLabelSettings.prototype, "border", void 0);
    __decorate$4([
        Complex({ left: 5, right: 5, top: 5, bottom: 5 }, Margin)
    ], DataLabelSettings.prototype, "margin", void 0);
    __decorate$4([
        Complex({ size: '11px', color: null }, Font)
    ], DataLabelSettings.prototype, "font", void 0);
    __decorate$4([
        Property(null)
    ], DataLabelSettings.prototype, "template", void 0);
    return DataLabelSettings;
}(ChildProperty));
/**
 *  Configures the marker in the series.
 */
var MarkerSettings = /** @class */ (function (_super) {
    __extends$5(MarkerSettings, _super);
    function MarkerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property(false)
    ], MarkerSettings.prototype, "visible", void 0);
    __decorate$4([
        Property('Circle')
    ], MarkerSettings.prototype, "shape", void 0);
    __decorate$4([
        Property('')
    ], MarkerSettings.prototype, "imageUrl", void 0);
    __decorate$4([
        Property(5)
    ], MarkerSettings.prototype, "height", void 0);
    __decorate$4([
        Property(5)
    ], MarkerSettings.prototype, "width", void 0);
    __decorate$4([
        Complex({ width: 2, color: null }, Border)
    ], MarkerSettings.prototype, "border", void 0);
    __decorate$4([
        Property(null)
    ], MarkerSettings.prototype, "fill", void 0);
    __decorate$4([
        Property(1)
    ], MarkerSettings.prototype, "opacity", void 0);
    __decorate$4([
        Complex({}, DataLabelSettings)
    ], MarkerSettings.prototype, "dataLabel", void 0);
    return MarkerSettings;
}(ChildProperty));
/**
 * Defines the behavior of the Trendlines
 */
var Trendline = /** @class */ (function (_super) {
    __extends$5(Trendline, _super);
    function Trendline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        return _this;
    }
    /** @private */
    Trendline.prototype.setDataSource = function (series, chart) {
        if (series) {
            this.points = series.points;
        }
        var type = firstToLowerCase(this.type);
        chart.trendLineModule.initDataSource(this, chart);
        chart.visibleSeriesCount++;
    };
    __decorate$4([
        Property('')
    ], Trendline.prototype, "name", void 0);
    __decorate$4([
        Property('Linear')
    ], Trendline.prototype, "type", void 0);
    __decorate$4([
        Property(2)
    ], Trendline.prototype, "period", void 0);
    __decorate$4([
        Property(2)
    ], Trendline.prototype, "polynomialOrder", void 0);
    __decorate$4([
        Property(0)
    ], Trendline.prototype, "backwardForecast", void 0);
    __decorate$4([
        Property(0)
    ], Trendline.prototype, "forwardForecast", void 0);
    __decorate$4([
        Complex({}, Animation$1)
    ], Trendline.prototype, "animation", void 0);
    __decorate$4([
        Complex({}, MarkerSettings)
    ], Trendline.prototype, "marker", void 0);
    __decorate$4([
        Property(true)
    ], Trendline.prototype, "enableTooltip", void 0);
    __decorate$4([
        Property(null)
    ], Trendline.prototype, "intercept", void 0);
    __decorate$4([
        Property('')
    ], Trendline.prototype, "fill", void 0);
    __decorate$4([
        Property(1)
    ], Trendline.prototype, "width", void 0);
    __decorate$4([
        Property('SeriesType')
    ], Trendline.prototype, "legendShape", void 0);
    return Trendline;
}(ChildProperty));
var ErrorBarCapSettings = /** @class */ (function (_super) {
    __extends$5(ErrorBarCapSettings, _super);
    function ErrorBarCapSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property(1)
    ], ErrorBarCapSettings.prototype, "width", void 0);
    __decorate$4([
        Property(10)
    ], ErrorBarCapSettings.prototype, "length", void 0);
    __decorate$4([
        Property('black')
    ], ErrorBarCapSettings.prototype, "color", void 0);
    __decorate$4([
        Property(1)
    ], ErrorBarCapSettings.prototype, "opacity", void 0);
    return ErrorBarCapSettings;
}(ChildProperty));
var ErrorBarSettings = /** @class */ (function (_super) {
    __extends$5(ErrorBarSettings, _super);
    function ErrorBarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property(false)
    ], ErrorBarSettings.prototype, "visible", void 0);
    __decorate$4([
        Property('Fixed')
    ], ErrorBarSettings.prototype, "type", void 0);
    __decorate$4([
        Property('Both')
    ], ErrorBarSettings.prototype, "direction", void 0);
    __decorate$4([
        Property('Vertical')
    ], ErrorBarSettings.prototype, "mode", void 0);
    __decorate$4([
        Property('black')
    ], ErrorBarSettings.prototype, "color", void 0);
    __decorate$4([
        Property(1)
    ], ErrorBarSettings.prototype, "verticalError", void 0);
    __decorate$4([
        Property(1)
    ], ErrorBarSettings.prototype, "width", void 0);
    __decorate$4([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalError", void 0);
    __decorate$4([
        Property(3)
    ], ErrorBarSettings.prototype, "verticalPositiveError", void 0);
    __decorate$4([
        Property(3)
    ], ErrorBarSettings.prototype, "verticalNegativeError", void 0);
    __decorate$4([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalPositiveError", void 0);
    __decorate$4([
        Property(1)
    ], ErrorBarSettings.prototype, "horizontalNegativeError", void 0);
    __decorate$4([
        Complex(null, ErrorBarCapSettings)
    ], ErrorBarSettings.prototype, "errorBarCap", void 0);
    return ErrorBarSettings;
}(ChildProperty));
/**
 * Defines the common behavior of Series and Technical Indicators
 */
var SeriesBase = /** @class */ (function (_super) {
    __extends$5(SeriesBase, _super);
    function SeriesBase() {
        /**
         * The DataSource field that contains the x value.
         * It is applicable for series and technical indicators
         * @default ''.
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.currentViewData = [];
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        /** @private */
        _this.seriesType = 'XY';
        return _this;
    }
    /**
     * Process data for the series.
     * @hidden
     */
    SeriesBase.prototype.processJsonData = function () {
        var i = 0;
        var len = Object.keys(this.currentViewData).length;
        var point = new Points();
        var textMappingName = this instanceof Series && this.marker.dataLabel.name ?
            this.marker.dataLabel.name : '';
        if (this instanceof Series && this.type === 'Waterfall') {
            this.chart[firstToLowerCase(this.type) + 'SeriesModule'].
                processWaterfallData(this.currentViewData, this);
        }
        this.points = [];
        this.xMin = Infinity;
        this.xMax = -Infinity;
        this.yMin = Infinity;
        this.yMax = -Infinity;
        this.sizeMax = -Infinity;
        this.getSeriesType();
        if (this.xAxis.valueType === 'Category') {
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                this.pushCategoryData(point, i);
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
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
                point.x = new Date(DataUtil.parse.parseJson({ val: point.x }).val);
                point.xValue = Date.parse(dateParser(dateFormatter(point.x)));
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
                i++;
            }
        }
        else {
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                point.xValue = point.x;
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
                i++;
            }
        }
        if (this instanceof Series) {
            if (this.type === 'Spline' || this.drawType === 'Spline') {
                this.chart.splineSeriesModule.findSplinePoint(this);
            }
        }
    };
    SeriesBase.prototype.pushData = function (point, i) {
        point.index = i;
        point.yValue = point.y;
        // To find the min, max for the axis range.
        this.xMin = Math.min(this.xMin, point.xValue);
        this.xMax = Math.max(this.xMax, point.xValue);
        this.xData.push(point.xValue);
    };
    /** @private */
    SeriesBase.prototype.dataPoint = function (i, textMappingName) {
        var point;
        this.points[i] = new Points();
        point = this.points[i];
        var currentViewData = this.currentViewData;
        point.x = getValue(this.xName, currentViewData[i]);
        point.high = getValue(this.high, currentViewData[i]);
        point.low = getValue(this.low, currentViewData[i]);
        point.open = getValue(this.open, currentViewData[i]);
        point.close = getValue(this.close, currentViewData[i]);
        point.volume = getValue(this.volume, currentViewData[i]);
        if (this instanceof Series) {
            point.y = getValue(this.yName, currentViewData[i]);
            point.size = getValue(this.size, currentViewData[i]);
            point.text = getValue(textMappingName, currentViewData[i]);
        }
        return point;
    };
    /**
     * To set empty point value based on empty point mode
     * @private
     */
    SeriesBase.prototype.setEmptyPoint = function (point, i) {
        if (!this.findVisibility(point)) {
            point.visible = true;
            return null;
        }
        point.isEmpty = true;
        var mode = this instanceof Series ? this.emptyPointSettings.mode : 'Drop';
        switch (mode) {
            case 'Zero':
                point.visible = true;
                if (this instanceof Series && this.seriesType.indexOf('HighLow') > -1) {
                    point.high = point.low = 0;
                    if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                        point.open = point.close = 0;
                    }
                }
                else {
                    point.y = point.yValue = this.yData[i] = 0;
                }
                break;
            case 'Average':
                if (this instanceof Series) {
                    if (this.seriesType.indexOf('HighLow') > -1) {
                        point.high = isNullOrUndefined(point.high) ? this.getAverage(this.high, i) : point.high;
                        point.low = isNullOrUndefined(point.low) ? this.getAverage(this.low, i) : point.low;
                        if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                            point.open = isNullOrUndefined(point.open) ? this.getAverage(this.open, i) : point.open;
                            point.close = isNullOrUndefined(point.close) ? this.getAverage(this.close, i) : point.close;
                        }
                    }
                    else {
                        point.y = point.yValue = this.yData[i] = this.getAverage(this.yName, i);
                    }
                }
                point.visible = true;
                break;
            case 'Drop':
            case 'Gap':
                this.yData[i] = null;
                point.visible = false;
                break;
        }
    };
    SeriesBase.prototype.findVisibility = function (point) {
        var type = this instanceof Series ? this.seriesType : 'HighLowOpenClose';
        var yValues;
        switch (type) {
            case 'XY':
                this.setXYMinMax(point.yValue);
                this.yData.push(point.yValue);
                if (this instanceof Series && this.type === 'Bubble') {
                    this.sizeMax = Math.max(this.sizeMax, point.size);
                }
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.y);
            case 'HighLow':
                this.setHiloMinMax(point.high, point.low);
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.low) || isNullOrUndefined(point.high);
            case 'HighLowOpenClose':
                this.setHiloMinMax(point.high, point.low);
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.low) ||
                    isNullOrUndefined(point.open) || isNullOrUndefined(point.close)
                    || isNullOrUndefined(point.high);
            case 'BoxPlot':
                yValues = (point.y || [null]).filter(function (value) {
                    return !isNullOrUndefined(value);
                }).sort(function (a, b) {
                    return a - b;
                });
                point.y = yValues;
                this.yMin = Math.min(this.yMin, Math.min.apply(Math, yValues));
                this.yMax = Math.max(this.yMax, Math.max.apply(Math, yValues));
                return !yValues.length;
        }
    };
    /**
     * To get Y min max for the provided point seriesType XY
     */
    SeriesBase.prototype.setXYMinMax = function (yValue) {
        this.yMin = Math.min(this.yMin, isNullOrUndefined(yValue) ? this.yMin : yValue);
        this.yMax = Math.max(this.yMax, isNullOrUndefined(yValue) ? this.yMax : yValue);
    };
    /**
     * To get Y min max for the provided point seriesType XY
     */
    SeriesBase.prototype.setHiloMinMax = function (high, low) {
        this.yMin = Math.min(this.yMin, Math.min(isNullOrUndefined(low) ? this.yMin : low, isNullOrUndefined(high) ? this.yMin : high));
        this.yMax = Math.max(this.yMax, Math.max(isNullOrUndefined(low) ? this.yMax : low, isNullOrUndefined(high) ? this.yMax : high));
    };
    /**
     * Finds the type of the series
     * @private
     */
    SeriesBase.prototype.getSeriesType = function () {
        var type;
        if (this instanceof Series) {
            var seriesType = this.chart.chartAreaType === 'PolarRadar' ? this.drawType : this.type;
            if (seriesType) {
                switch (seriesType) {
                    case 'RangeColumn':
                    case 'RangeArea':
                    case 'Hilo':
                        type = 'HighLow';
                        break;
                    case 'HiloOpenClose':
                    case 'Candle':
                        type = 'HighLowOpenClose';
                        break;
                    case 'BoxAndWhisker':
                        type = 'BoxPlot';
                        break;
                    default:
                        type = 'XY';
                }
            }
        }
        this.seriesType = type;
    };
    /** @private */
    SeriesBase.prototype.pushCategoryData = function (point, index) {
        if (!this.xAxis.isIndexed) {
            if (this.xAxis.labels.indexOf(point.x) < 0) {
                this.xAxis.labels.push(point.x);
            }
            point.xValue = this.xAxis.labels.indexOf(point.x);
        }
        else {
            this.xAxis.labels[index] ? this.xAxis.labels[index] += ', ' + point.x :
                this.xAxis.labels.push(point.x);
            point.xValue = index;
        }
    };
    /**
     * To find average of given property
     */
    SeriesBase.prototype.getAverage = function (member, i, data) {
        if (data === void 0) { data = this.currentViewData; }
        var previous = data[i - 1] ? (data[i - 1][member] || 0) : 0;
        var next = data[i + 1] ? (data[i + 1][member] || 0) : 0;
        return (previous + next) / 2;
    };
    /**
     * To find the control points for spline.
     * @return {void}
     * @private
     */
    SeriesBase.prototype.refreshDataManager = function (chart) {
        var _this = this;
        this.chart = chart;
        if (isNullOrUndefined(this.query) && !isNullOrUndefined(this.dataSource)) {
            this.dataManagerSuccess({ result: this.dataSource, count: this.dataSource.length }, chart, false);
            return;
        }
        var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, chart); });
    };
    SeriesBase.prototype.dataManagerSuccess = function (e, chart, isRemoteData) {
        if (isRemoteData === void 0) { isRemoteData = true; }
        this.currentViewData = e.result !== '' ? e.result : [];
        if (this instanceof Series) {
            var argsData = {
                name: seriesRender, series: this, data: this.currentViewData, fill: this.interior
            };
            this.chart.trigger(seriesRender, argsData);
            this.interior = argsData.fill;
            this.currentViewData = argsData.data;
        }
        this.processJsonData();
        this.recordsCount = e.count;
        this.refreshChart(isRemoteData);
    };
    SeriesBase.prototype.refreshChart = function (isRemoteData) {
        var chart = this.chart;
        if (this instanceof Series) {
            chart.visibleSeriesCount += isRemoteData ? 1 : 0;
        }
        chart.refreshTechnicalIndicator(this);
        if (this instanceof Series && this.category !== 'TrendLine') {
            for (var _i = 0, _a = this.trendlines; _i < _a.length; _i++) {
                var trendline = _a[_i];
                trendline.setDataSource(this, chart);
            }
        }
        //if (chart.visibleSeries.length === (chart.visibleSeriesCount - chart.indicators.length)) {
        if (chart.visibleSeries.length === (chart.visibleSeriesCount)) {
            chart.refreshBound();
            chart.trigger('loaded', { chart: chart });
        }
        if (this instanceof Series) {
            chart.visibleSeriesCount += isRemoteData ? 0 : 1;
        }
    };
    __decorate$4([
        Property('')
    ], SeriesBase.prototype, "xName", void 0);
    __decorate$4([
        Property('')
    ], SeriesBase.prototype, "high", void 0);
    __decorate$4([
        Property('')
    ], SeriesBase.prototype, "low", void 0);
    __decorate$4([
        Property('')
    ], SeriesBase.prototype, "open", void 0);
    __decorate$4([
        Property('')
    ], SeriesBase.prototype, "close", void 0);
    __decorate$4([
        Property('')
    ], SeriesBase.prototype, "volume", void 0);
    __decorate$4([
        Property(null)
    ], SeriesBase.prototype, "xAxisName", void 0);
    __decorate$4([
        Property(null)
    ], SeriesBase.prototype, "yAxisName", void 0);
    __decorate$4([
        Complex(null, Animation$1)
    ], SeriesBase.prototype, "animation", void 0);
    __decorate$4([
        Property(null)
    ], SeriesBase.prototype, "fill", void 0);
    __decorate$4([
        Property(1)
    ], SeriesBase.prototype, "width", void 0);
    __decorate$4([
        Property('0')
    ], SeriesBase.prototype, "dashArray", void 0);
    __decorate$4([
        Property('')
    ], SeriesBase.prototype, "dataSource", void 0);
    __decorate$4([
        Property()
    ], SeriesBase.prototype, "query", void 0);
    return SeriesBase;
}(ChildProperty));
/**
 *  Configures the series in charts.
 */
var Series = /** @class */ (function (_super) {
    __extends$5(Series, _super);
    // tslint:disable-next-line:no-any
    function Series(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        _this.visibleSeriesCount = 0;
        /** @private */
        _this.category = 'Series';
        /** @private */
        _this.isRectSeries = false;
        /** @private */
        _this.drawPoints = [];
        /** @private */
        _this.delayedAnimation = false;
        return _this;
    }
    /**
     * Refresh the axis label.
     * @return {boolean}
     * @private
     */
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
                    item.pushCategoryData(point, point.index);
                    item.xMin = Math.min(item.xMin, point.xValue);
                    item.xMax = Math.max(item.xMax, point.xValue);
                }
            }
        }
    };
    /**
     * To get the series collection.
     * @return {void}
     * @private
     */
    Series.prototype.findSeriesCollection = function (column, row, isStack) {
        var seriesCollection = [];
        for (var _i = 0, _a = row.axes; _i < _a.length; _i++) {
            var rowAxis = _a[_i];
            for (var _b = 0, _c = rowAxis.series; _b < _c.length; _b++) {
                var rowSeries = _c[_b];
                for (var _d = 0, _e = column.axes; _d < _e.length; _d++) {
                    var axis = _e[_d];
                    for (var _f = 0, _g = axis.series; _f < _g.length; _f++) {
                        var series = _g[_f];
                        if (series === rowSeries && series.visible && this.rectSeriesInChart(series, isStack)) {
                            seriesCollection.push(series);
                        }
                    }
                }
            }
        }
        return seriesCollection;
    };
    /**
     * To get the column type series.
     * @return {void}
     * @private
     */
    Series.prototype.rectSeriesInChart = function (series, isStack) {
        var type = (series.type).toLowerCase();
        return (type.indexOf('column') !== -1 || type.indexOf('bar') !== -1 ||
            type.indexOf('hiloopenclose') !== -1 || type.indexOf('candle') !== -1 ||
            type.indexOf('hilo') !== -1 || series.drawType.indexOf('Column') !== -1 ||
            type.indexOf('waterfall') !== -1 || type.indexOf('boxandwhisker') !== -1 || isStack);
    };
    /**
     * To calculate the stacked values.
     * @return {void}
     * @private
     */
    Series.prototype.calculateStackedValue = function (isStacking100) {
        for (var _i = 0, _a = this.chart.columns; _i < _a.length; _i++) {
            var columnItem = _a[_i];
            for (var _b = 0, _c = this.chart.rows; _b < _c.length; _b++) {
                var item = _c[_b];
                this.calculateStackingValues(this.findSeriesCollection(columnItem, item, true), isStacking100);
            }
        }
    };
    Series.prototype.calculateStackingValues = function (seriesCollection, isStacking100) {
        var startValues;
        var endValues;
        var yValues = [];
        var lastPositive = [];
        var lastNegative = [];
        var stackingGroup;
        var lastValue;
        var value;
        var frequencies = [];
        if (isStacking100) {
            frequencies = this.findFrequencies(seriesCollection);
        }
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            if (series.type.indexOf('Stacking') !== -1 || (series.drawType.indexOf('Stacking') !== -1 &&
                (series.chart.chartAreaType === 'PolarRadar'))) {
                stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' : series.stackingGroup;
                if (!lastPositive[stackingGroup]) {
                    lastPositive[stackingGroup] = [];
                    lastNegative[stackingGroup] = [];
                }
                yValues = series.yData;
                startValues = [];
                endValues = [];
                for (var j = 0, pointsLength = series.points.length; j < pointsLength; j++) {
                    lastValue = 0;
                    value = yValues[j];
                    if (lastPositive[stackingGroup][series.points[j].xValue] === undefined) {
                        lastPositive[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (lastNegative[stackingGroup][series.points[j].xValue] === undefined) {
                        lastNegative[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (isStacking100) {
                        value = value / frequencies[stackingGroup][series.points[j].xValue] * 100;
                        value = !isNaN(value) ? value : 0;
                        series.points[j].percent = value.toFixed(2);
                    }
                    if (value >= 0) {
                        lastValue = lastPositive[stackingGroup][series.points[j].xValue];
                        lastPositive[stackingGroup][series.points[j].xValue] += value;
                    }
                    else {
                        lastValue = lastNegative[stackingGroup][series.points[j].xValue];
                        lastNegative[stackingGroup][series.points[j].xValue] += value;
                    }
                    startValues.push(lastValue);
                    endValues.push(value + lastValue);
                    if (isStacking100 && (endValues[j] > 100)) {
                        endValues[j] = 100;
                    }
                }
                series.stackedValues = new StackValues(startValues, endValues);
                series.yMin = Math.min.apply(0, startValues);
                series.yMax = Math.max.apply(0, endValues);
                if (series.yMin > Math.min.apply(0, endValues)) {
                    series.yMin = (isStacking100) ? -100 : Math.min.apply(0, endValues);
                }
                if (series.yMax < Math.max.apply(0, startValues)) {
                    series.yMax = 0;
                }
            }
        }
    };
    Series.prototype.findFrequencies = function (seriesCollection) {
        var frequencies = [];
        var stackingGroup;
        for (var _i = 0, seriesCollection_2 = seriesCollection; _i < seriesCollection_2.length; _i++) {
            var series = seriesCollection_2[_i];
            series.yAxis.isStack100 = series.type.indexOf('100') !== -1 ? true : false;
            if (series.type.indexOf('Stacking') !== -1) {
                stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' : series.stackingGroup;
                if (!frequencies[stackingGroup]) {
                    frequencies[stackingGroup] = [];
                }
                for (var j = 0, pointsLength = series.points.length; j < pointsLength; j++) {
                    if (frequencies[stackingGroup][series.points[j].xValue] === undefined) {
                        frequencies[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (series.yData[j] > 0) {
                        frequencies[stackingGroup][series.points[j].xValue] += series.yData[j];
                    }
                    else {
                        frequencies[stackingGroup][series.points[j].xValue] -= series.yData[j];
                    }
                }
            }
        }
        return frequencies;
    };
    /**
     * To find the log values.
     * @return {void}
     * @private
     */
    Series.prototype.logWithIn = function (value, axis) {
        if (axis.valueType === 'Logarithmic') {
            value = logBase(value, axis.logBase);
        }
        else {
            value = value;
        }
        return value;
    };
    /* private dataManagerFailure(e: { result: Object[] }): void {
         this.currentViewData = [];
         this.refreshChart();
     }*/
    /** @private */
    Series.prototype.renderSeries = function (chart, index) {
        var seriesType = firstToLowerCase(this.type);
        if (seriesType.indexOf('100') !== -1) {
            seriesType = seriesType.replace('100', '');
        }
        if (chart[seriesType + 'SeriesModule']) {
            if (this.category !== 'Indicator' && this.category !== 'TrendLine') {
                this.createSeriesElements(chart);
            }
            chart[seriesType + 'SeriesModule'].render(this, this.xAxis, this.yAxis, chart.requireInvertedAxis);
            if (this.category !== 'Indicator') {
                if (this.errorBar.visible) {
                    this.chart.errorBarModule.render(this);
                }
                if (this.marker.dataLabel.visible) {
                    chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
                }
                this.appendSeriesElement(chart.seriesElements, chart);
            }
            this.performAnimation(chart, seriesType, this.errorBar, this.marker, this.marker.dataLabel);
        }
    };
    /**
     * To create seris element.
     * @return {void}
     * @private
     */
    Series.prototype.createSeriesElements = function (chart) {
        if (this.category !== 'Indicator') {
            var elementId = chart.element.id;
            var xAxisRect = this.xAxis.rect;
            // 8 for extend border value 5 for extend size value
            var explodeValue = this.marker.border.width + 8 + 5;
            var yAxisRect = this.yAxis.rect;
            var marker = this.marker;
            var render = chart.renderer;
            var index = this.index;
            var markerHeight = (this.type === 'Scatter') ? (this.marker.height + explodeValue) / 2 : 0;
            var markerWidth = (this.type === 'Scatter') ? (this.marker.width + explodeValue) / 2 : 0;
            if (chart.chartAreaType === 'PolarRadar') {
                this.clipRectElement = render.drawCircularClipPath(new CircleOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, this.clipRect.width / 2 + this.clipRect.x, this.clipRect.height / 2 + this.clipRect.y, chart.radius));
            }
            else {
                this.clipRectElement = render.drawClipPath(new RectOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: -markerWidth, y: -markerHeight,
                    width: this.clipRect.width + markerWidth * 2,
                    height: this.clipRect.height + markerHeight * 2
                }));
            }
            var transform = void 0;
            transform = chart.chartAreaType === 'Cartesian' ? 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')' : '';
            this.symbolElement = null;
            this.seriesElement = render.createGroup({
                'id': elementId + 'SeriesGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
            });
            this.seriesElement.appendChild(this.clipRectElement);
        }
    };
    /**
     * To append the series.
     * @return {void}
     * @private
     */
    Series.prototype.appendSeriesElement = function (element, chart) {
        var marker = this.marker;
        var dataLabel = marker.dataLabel;
        if (this.category !== 'TrendLine') {
            chart.seriesElements.appendChild(this.seriesElement);
            var errorBar = this.errorBar;
            if (errorBar.visible) {
                if (chart.chartAreaType === 'PolarRadar') {
                    chart.seriesElements.appendChild(this.seriesElement);
                }
                else {
                    chart.seriesElements.appendChild(this.errorBarElement);
                }
            }
            if (this.type === 'Scatter' || this.type === 'Bubble') {
                chart.seriesElements.appendChild(this.seriesElement);
            }
        }
        if (marker.visible && ((chart.chartAreaType === 'Cartesian' && (!this.isRectSeries || this.type === 'BoxAndWhisker'))
            || ((this.drawType !== 'Scatter' && !this.isRectSeries) && chart.chartAreaType === 'PolarRadar')) &&
            this.type !== 'Scatter' && this.type !== 'Bubble') {
            chart.seriesElements.appendChild(this.symbolElement);
        }
        if (dataLabel.visible) {
            chart.dataLabelElements.appendChild(this.shapeElement);
            chart.dataLabelElements.appendChild(this.textElement);
        }
    };
    /**
     * To perform animation for chart series.
     * @return {void}
     * @private
     */
    Series.prototype.performAnimation = function (chart, type, errorBar, marker, dataLabel) {
        if (this.animation.enable && chart.animateSeries) {
            chart[type + 'SeriesModule'].doAnimation(this);
            if (errorBar.visible) {
                chart.errorBarModule.doErrorBarAnimation(this);
            }
            if (marker.visible) {
                chart.markerRender.doMarkerAnimation(this);
            }
            if (dataLabel.visible) {
                chart.dataLabelModule.doDataLabelAnimation(this);
            }
        }
    };
    /**
     * To set border color for empty point
     * @private
     */
    Series.prototype.setPointColor = function (point, color) {
        return point.isEmpty ? (this.emptyPointSettings.fill || color) : color;
    };
    /**
     * To set border color for empty point
     * @private
     */
    Series.prototype.setBorderColor = function (point, border) {
        border.width = point.isEmpty ? (this.emptyPointSettings.border.width || border.width) : border.width;
        border.color = point.isEmpty ? (this.emptyPointSettings.border.color || border.color) : border.color;
        return border;
    };
    __decorate$4([
        Property('')
    ], Series.prototype, "name", void 0);
    __decorate$4([
        Property('')
    ], Series.prototype, "yName", void 0);
    __decorate$4([
        Property('Line')
    ], Series.prototype, "drawType", void 0);
    __decorate$4([
        Property(true)
    ], Series.prototype, "isClosed", void 0);
    __decorate$4([
        Property('#2ecd71')
    ], Series.prototype, "bearFillColor", void 0);
    __decorate$4([
        Property('#e74c3d')
    ], Series.prototype, "bullFillColor", void 0);
    __decorate$4([
        Property(false)
    ], Series.prototype, "enableSolidCandles", void 0);
    __decorate$4([
        Property('')
    ], Series.prototype, "size", void 0);
    __decorate$4([
        Property('')
    ], Series.prototype, "stackingGroup", void 0);
    __decorate$4([
        Property(true)
    ], Series.prototype, "visible", void 0);
    __decorate$4([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], Series.prototype, "border", void 0);
    __decorate$4([
        Property(1)
    ], Series.prototype, "opacity", void 0);
    __decorate$4([
        Property('Line')
    ], Series.prototype, "type", void 0);
    __decorate$4([
        Complex(null, ErrorBarSettings)
    ], Series.prototype, "errorBar", void 0);
    __decorate$4([
        Complex(null, MarkerSettings)
    ], Series.prototype, "marker", void 0);
    __decorate$4([
        Collection([], Trendline)
    ], Series.prototype, "trendlines", void 0);
    __decorate$4([
        Property(true)
    ], Series.prototype, "enableTooltip", void 0);
    __decorate$4([
        Property('SeriesType')
    ], Series.prototype, "legendShape", void 0);
    __decorate$4([
        Property(null)
    ], Series.prototype, "selectionStyle", void 0);
    __decorate$4([
        Property(1)
    ], Series.prototype, "minRadius", void 0);
    __decorate$4([
        Property(3)
    ], Series.prototype, "maxRadius", void 0);
    __decorate$4([
        Property('Natural')
    ], Series.prototype, "splineType", void 0);
    __decorate$4([
        Property(0.5)
    ], Series.prototype, "cardinalSplineTension", void 0);
    __decorate$4([
        Complex(null, EmptyPointSettings)
    ], Series.prototype, "emptyPointSettings", void 0);
    __decorate$4([
        Property(true)
    ], Series.prototype, "showMean", void 0);
    __decorate$4([
        Property('Normal')
    ], Series.prototype, "boxPlotMode", void 0);
    __decorate$4([
        Property(0.7)
    ], Series.prototype, "columnWidth", void 0);
    __decorate$4([
        Property(0)
    ], Series.prototype, "columnSpacing", void 0);
    __decorate$4([
        Property('#C64E4A')
    ], Series.prototype, "negativeFillColor", void 0);
    __decorate$4([
        Property('#4E81BC')
    ], Series.prototype, "summaryFillColor", void 0);
    __decorate$4([
        Property()
    ], Series.prototype, "intermediateSumIndexes", void 0);
    __decorate$4([
        Property()
    ], Series.prototype, "sumIndexes", void 0);
    __decorate$4([
        Complex({ color: 'black', width: 2 }, Connector)
    ], Series.prototype, "connector", void 0);
    __decorate$4([
        Complex(null, CornerRadius)
    ], Series.prototype, "cornerRadius", void 0);
    return Series;
}(SeriesBase));

/**
 * data module is used to generate query and dataSource
 */
var Data = /** @class */ (function () {
    /**
     * Constructor for data module
     * @private
     */
    function Data(dataSource, query) {
        this.initDataManager(dataSource, query);
    }
    /**
     * The function used to initialize dataManager and query
     * @return {void}
     * @private
     */
    Data.prototype.initDataManager = function (dataSource, query) {
        this.dataManager = dataSource instanceof DataManager ? dataSource : new DataManager(dataSource);
        this.query = query instanceof Query ? query : new Query();
    };
    /**
     * The function used to generate updated Query from chart model
     * @return {void}
     * @private
     */
    Data.prototype.generateQuery = function () {
        var query = this.query.clone();
        return query;
    };
    /**
     * The function used to get dataSource by executing given Query
     * @param  {Query} query - A Query that specifies to generate dataSource
     * @return {void}
     * @private
     */
    Data.prototype.getData = function (query) {
        return this.dataManager.executeQuery(query);
    };
    return Data;
}());

/**
 * To get the data on mouse move.
 * @private
 */
var Data$1 = /** @class */ (function () {
    /**
     * Constructor for the data.
     * @private
     */
    function Data(chart) {
        /** @private */
        this.currentPoints = [];
        /** @private */
        this.previousPoints = [];
        this.chart = chart;
        this.lierIndex = 0;
    }
    /**
     * Method to get the Data.
     * @private
     */
    Data.prototype.getData = function () {
        var chart = this.chart;
        var point = null;
        var series = null;
        var width;
        var height;
        for (var len = chart.visibleSeries.length, i = len - 1; i >= 0; i--) {
            series = chart.visibleSeries[i];
            width = (series.type === 'Scatter' || series.drawType === 'Scatter' || (!series.isRectSeries && series.marker.visible))
                ? (series.marker.height + 5) / 2 : 0;
            height = (series.type === 'Scatter' || series.drawType === 'Scatter' || (!series.isRectSeries && series.marker.visible))
                ? (series.marker.width + 5) / 2 : 0;
            if (series.visible && withInBounds(chart.mouseX, chart.mouseY, series.clipRect, width, height)) {
                point = this.getRectPoint(series, series.clipRect, chart.mouseX, chart.mouseY);
            }
            if (point) {
                return new PointData(point, series);
            }
        }
        return new PointData(point, series);
    };
    Data.prototype.getRectPoint = function (series, rect, x, y) {
        var fromCenterX;
        var fromCenterY;
        var clickAngle;
        var arcAngle = 0;
        var startAngle;
        var endAngle;
        var distanceFromCenter;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.regionData) {
                if (!point.regions || !point.regions.length) {
                    continue;
                }
            }
            if (point.regionData && this.chart.chartAreaType === 'PolarRadar' && series.drawType.indexOf('Column') > -1) {
                fromCenterX = x - (series.clipRect.width / 2 + series.clipRect.x);
                fromCenterY = y - (series.clipRect.height / 2 + series.clipRect.y);
                arcAngle = 2 * Math.PI * (point.regionData.currentXPosition < 0 ? 1 + point.regionData.currentXPosition
                    : point.regionData.currentXPosition);
                clickAngle = (Math.atan2(fromCenterY, fromCenterX) + 0.5 * Math.PI - arcAngle) % (2 * Math.PI);
                clickAngle = clickAngle < 0 ? 2 * Math.PI + clickAngle : clickAngle;
                clickAngle = clickAngle + 2 * Math.PI * series.chart.primaryXAxis.startAngle;
                startAngle = point.regionData.startAngle;
                startAngle -= arcAngle;
                startAngle = startAngle < 0 ? 2 * Math.PI + startAngle : startAngle;
                endAngle = point.regionData.endAngle;
                endAngle -= arcAngle;
                endAngle = endAngle < 0 ? 2 * Math.PI + endAngle : endAngle;
                distanceFromCenter = Math.sqrt(Math.pow(Math.abs(fromCenterX), 2) + Math.pow(Math.abs(fromCenterY), 2));
                if (clickAngle >= startAngle && clickAngle <= endAngle &&
                    (((distanceFromCenter >= point.regionData.innerRadius && distanceFromCenter <= point.regionData.radius) ||
                        (distanceFromCenter <= point.regionData.innerRadius && distanceFromCenter >= point.regionData.radius))
                        && distanceFromCenter <= series.chart.radius)) {
                    return point;
                }
            }
            else if (this.checkRegionContainsPoint(point.regions, rect, x, y)) {
                return point;
            }
        }
        return null;
    };
    /**
     * Checks whether the region contains a point
     */
    Data.prototype.checkRegionContainsPoint = function (regionRect, rect, x, y) {
        var _this = this;
        return regionRect.some(function (region, index) {
            _this.lierIndex = index;
            return withInBounds(x, y, new Rect((_this.chart.chartAreaType === 'Cartesian' ? rect.x : 0) + region.x, (_this.chart.chartAreaType === 'Cartesian' ? rect.y : 0) + region.y, region.width, region.height));
        });
    };
    Data.prototype.getClosest = function (series, value) {
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
    Data.prototype.getClosestX = function (chart, series) {
        var value;
        var rect = series.clipRect;
        if (!chart.requireInvertedAxis) {
            value = getValueXByPoint(chart.mouseX - rect.x, rect.width, series.xAxis);
        }
        else {
            value = getValueYByPoint(chart.mouseY - rect.y, rect.height, series.xAxis);
        }
        var closest = this.getClosest(series, value);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (closest === point.xValue && point.visible) {
                return new PointData(point, series);
            }
        }
        return null;
    };
    return Data;
}());

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Marker Module used to render the marker for line type series.
 */
var MarkerExplode = /** @class */ (function (_super) {
    __extends$7(MarkerExplode, _super);
    /**
     * Constructor for the marker module.
     * @private
     */
    function MarkerExplode(chart) {
        var _this = _super.call(this, chart) || this;
        _this.addEventListener();
        _this.elementId = chart.element.id;
        return _this;
    }
    /**
     * @hidden
     */
    MarkerExplode.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    /**
     * @hidden
     */
    /* public removeEventListener(): void {
         if (this.chart.isDestroyed) { return; }
         this.chart.off(Browser.touchMoveEvent, this.mouseMoveHandler);
    }*/
    /**
     * @hidden
     */
    MarkerExplode.prototype.mouseUpHandler = function () {
        var chart = this.chart;
        if (chart.isTouch && !chart.crosshair.enable) {
            this.markerMove(true);
        }
    };
    /**
     * @hidden
     */
    MarkerExplode.prototype.mouseMoveHandler = function () {
        var chart = this.chart;
        if ((!chart.crosshair.enable || (chart.tooltip.enable)) && (!chart.isTouch || chart.startMove)) {
            this.markerMove(false);
        }
    };
    MarkerExplode.prototype.markerMove = function (remove$$1) {
        var _this = this;
        var chart = this.chart;
        this.currentPoints = [];
        var data;
        var explodeSeries;
        if (!chart.tooltip.shared || !chart.tooltip.enable) {
            data = this.getData();
            explodeSeries = (data.series.type === 'BoxAndWhisker' || data.series.type === 'Bubble' || data.series.drawType === 'Scatter'
                || data.series.type === 'Scatter' || (!data.series.isRectSeries && data.series.marker.visible));
            data.lierIndex = this.lierIndex;
            if (data.point && explodeSeries && ((!this.previousPoints[0] || (this.previousPoints[0].point !== data.point)) ||
                (this.previousPoints[0] && this.previousPoints[0].lierIndex > 3 && this.previousPoints[0].lierIndex !== this.lierIndex))) {
                this.currentPoints.push(data);
            }
        }
        else {
            if (!withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                return null;
            }
            if (chart.tooltip.enable) {
                var pointData = chart.chartAreaType === 'PolarRadar' ? this.getData() : null;
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var chartSeries = _a[_i];
                    if (!chartSeries.enableTooltip || chartSeries.category === 'Indicator') {
                        continue;
                    }
                    if (chart.chartAreaType === 'Cartesian' && chartSeries.visible) {
                        data = this.getClosestX(chart, chartSeries);
                    }
                    else if (chart.chartAreaType === 'PolarRadar' && chartSeries.visible && pointData.point !== null) {
                        data = new PointData(chartSeries.points[pointData.point.index], chartSeries);
                    }
                    if (data) {
                        this.currentPoints.push(data);
                        data = null;
                    }
                }
            }
        }
        var length = this.previousPoints.length;
        if (this.currentPoints.length > 0) {
            if (length === 0 || (length > 0 && this.previousPoints[0].point !== this.currentPoints[0].point)) {
                if (this.previousPoints.length > 0) {
                    this.removeHighlightedMarker();
                }
                var _loop_1 = function (data_1) {
                    if (data_1 && data_1.point &&
                        (!data_1.series.isRectSeries || data_1.series.type === 'BoxAndWhisker')) {
                        stopTimer(this_1.markerExplode);
                        this_1.isRemove = true;
                        data_1.point.symbolLocations.map(function (location, index) {
                            _this.drawTrackBall(data_1.series, data_1.point, location, index);
                        });
                    }
                };
                var this_1 = this;
                for (var _b = 0, _c = this.currentPoints; _b < _c.length; _b++) {
                    var data_1 = _c[_b];
                    _loop_1(data_1);
                }
                this.previousPoints = extend([], this.currentPoints, null, true);
            }
        }
        if (!chart.tooltip.enable && ((this.currentPoints.length === 0 && this.isRemove) || (remove$$1 && this.isRemove) ||
            !withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect))) {
            this.isRemove = false;
            this.markerExplode = setTimeout(function () {
                _this.removeHighlightedMarker();
            }, 2000);
        }
        this.currentPoints = [];
    };
    MarkerExplode.prototype.drawTrackBall = function (series, point, location, index) {
        var marker = series.marker;
        var element = series.symbolElement || series.seriesElement;
        var shape = series.type === 'Bubble' ? 'Circle' : marker.shape;
        var symbolId = this.elementId + '_Series_' + series.index + '_Point_' + point.index + '_Trackball' +
            (index ? index : '');
        var width = (series.type !== 'Bubble') ? marker.width : (point.regions[0].width);
        var height = (series.type !== 'Bubble') ? marker.height : (point.regions[0].height);
        var size = new Size(width + 5, height + 5);
        var border = (series.type === 'Bubble' || series.type === 'Scatter' ? series.border : marker.border);
        var explodeSeries = (series.type === 'BoxAndWhisker' || series.type === 'Bubble' || series.type === 'Scatter');
        var borderColor = (border.color && border.color !== 'transparent') ? border.color :
            explodeSeries ? point.color : series.interior;
        var colorValue = convertHexToColor(colorNameToHex(borderColor));
        for (var i = 0; i < 2; i++) {
            var options = new PathOption(symbolId + '_' + i, i ? (marker.fill || point.color || (explodeSeries ? series.interior : '#ffffff')) : 'transparent', marker.border.width + (i ? 0 : 8), i ? borderColor : 'rgba(' + colorValue.r + ',' + colorValue.g + ',' + colorValue.b + ',0.2)', marker.opacity, null, null);
            var symbol = drawSymbol(location, shape, size, marker.imageUrl, options, '');
            symbol.setAttribute('style', 'pointer-events:none');
            symbol.setAttribute('class', 'EJ2-Trackball');
            element.appendChild(symbol);
        }
    };
    /**
     * @hidden
     */
    MarkerExplode.prototype.removeHighlightedMarker = function () {
        var elements = document.getElementsByClassName('EJ2-Trackball');
        for (var i = 0, len = elements.length; i < len; i++) {
            remove(elements[0]);
        }
        this.previousPoints = [];
    };
    return MarkerExplode;
}(Data$1));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Marker Module used to render the marker for line type series.
 */
var Marker = /** @class */ (function (_super) {
    __extends$6(Marker, _super);
    /**
     * Constructor for the marker module.
     * @private
     */
    function Marker(chart) {
        var _this = _super.call(this, chart) || this;
        _this.addEventListener();
        return _this;
    }
    /**
     * Render the marker for series.
     * @return {void}
     * @private
     */
    Marker.prototype.render = function (series) {
        var _this = this;
        this.createElement(series);
        var _loop_1 = function (point) {
            if (point.visible && point.symbolLocations.length) {
                point.symbolLocations.map(function (location, index) {
                    _this.renderMarker(series, point, location, index);
                });
            }
        };
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            _loop_1(point);
        }
    };
    Marker.prototype.renderMarker = function (series, point, location, index) {
        var seriesIndex = series.index;
        var marker = series.marker;
        var border = {
            color: marker.border.color,
            width: marker.border.width
        };
        var shape = marker.shape;
        var borderColor = marker.border.color;
        var symbolId;
        var shapeOption;
        var isBoxPlot = series.type === 'BoxAndWhisker';
        var fill = marker.fill || (isBoxPlot ? series.interior : '#ffffff');
        var argsData;
        var parentElement = isBoxPlot ?
            findlElement(series.seriesElement.childNodes, 'Series_' + series.index + '_Point_' + point.index)
            : series.symbolElement;
        border.color = borderColor || series.interior;
        symbolId = this.elementId + '_Series_' + seriesIndex + '_Point_' + point.index + '_Symbol' +
            (index ? index : '');
        argsData = {
            cancel: false, name: pointRender, series: series, point: point, fill: series.setPointColor(point, fill),
            border: {
                color: series.type === 'BoxAndWhisker' ?
                    (!isNullOrUndefined(borderColor) && borderColor !== 'transparent') ? borderColor :
                        getSaturationColor(fill, -0.6)
                    : border.color,
                width: border.width
            },
            height: marker.height,
            width: marker.width
        };
        argsData.border = series.setBorderColor(point, { width: argsData.border.width, color: argsData.border.color });
        this.chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        if (!argsData.cancel) {
            var y = void 0;
            if (series.type === 'RangeArea') {
                y = index ? point.low : point.high;
            }
            else if (isBoxPlot) {
                y = point.outliers[index];
            }
            else {
                y = point.y;
            }
            shapeOption = new PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, marker.opacity, null);
            if (parentElement !== undefined && parentElement !== null) {
                parentElement.appendChild(drawSymbol(location, shape, new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + y.toString()));
            }
        }
        else {
            location = null;
        }
    };
    Marker.prototype.createElement = function (series) {
        var markerClipRect;
        var marker = series.marker;
        // 8 for extend border value 5 for extend size value
        var explodeValue = marker.border.width + 8 + 5;
        var render = series.chart.renderer;
        var transform;
        transform = series.chart.chartAreaType === 'Cartesian' ? 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')' : '';
        if (marker.visible) {
            var markerHeight = (marker.height + explodeValue) / 2;
            var markerWidth = (marker.width + explodeValue) / 2;
            if (series.chart.chartAreaType === 'Cartesian') {
                markerClipRect = render.drawClipPath(new RectOption(this.elementId + '_ChartMarkerClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: -markerWidth, y: -markerHeight,
                    width: series.clipRect.width + markerWidth * 2,
                    height: series.clipRect.height + markerHeight * 2
                }));
            }
            else {
                markerClipRect = render.drawCircularClipPath(new CircleOption(this.elementId + '_ChartMarkerClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1, series.clipRect.width / 2 + series.clipRect.x, series.clipRect.height / 2 + series.clipRect.y, series.chart.radius + Math.max(markerHeight, markerWidth)));
            }
            series.symbolElement = render.createGroup({
                'id': this.elementId + 'SymbolGroup' + series.index,
                'transform': transform,
                'clip-path': 'url(#' + this.elementId + '_ChartMarkerClipRect_' + series.index + ')'
            });
            series.symbolElement.appendChild(markerClipRect);
        }
    };
    Marker.prototype.getRangeLowPoint = function (region, series) {
        var x = region.x;
        var y = region.y;
        if (series.chart.requireInvertedAxis) {
            y += region.height / 2;
            x += series.yAxis.isInversed ? region.width : 0;
        }
        else {
            y += series.yAxis.isInversed ? 0 : region.height;
            x += region.width / 2;
        }
        return { x: x, y: y };
    };
    /**
     * Animates the marker.
     * @return {void}.
     * @private
     */
    Marker.prototype.doMarkerAnimation = function (series) {
        if (!(series.isRectSeries || series.type === 'Scatter' || series.type === 'Bubble' ||
            (series.chart.chartAreaType === 'PolarRadar' && (series.drawType === 'Scatter' || series.drawType.indexOf('Column') > -1)))) {
            var markerElements = series.symbolElement.childNodes;
            var delay = series.animation.delay + series.animation.duration;
            var j = 1;
            var incFactor = series.type === 'RangeArea' ? 2 : 1;
            for (var i = 0; i < series.points.length; i++) {
                if (!series.points[i].symbolLocations.length) {
                    continue;
                }
                markerAnimate(markerElements[j], delay, 200, series, i, series.points[i].symbolLocations[0], false);
                if (incFactor === 2) {
                    var lowPoint = this.getRangeLowPoint(series.points[i].regions[0], series);
                    markerAnimate(markerElements[j + 1], delay, 200, series, i, lowPoint, false);
                }
                j += incFactor;
            }
        }
    };
    return Marker;
}(MarkerExplode));

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the location for the legend.
 */
var Location = /** @class */ (function (_super) {
    __extends$8(Location, _super);
    function Location() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$5([
        Property(0)
    ], Location.prototype, "x", void 0);
    __decorate$5([
        Property(0)
    ], Location.prototype, "y", void 0);
    return Location;
}(ChildProperty));
/**
 * Configures the legends in charts.
 */
var LegendSettings = /** @class */ (function (_super) {
    __extends$8(LegendSettings, _super);
    function LegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$5([
        Property(true)
    ], LegendSettings.prototype, "visible", void 0);
    __decorate$5([
        Property(null)
    ], LegendSettings.prototype, "height", void 0);
    __decorate$5([
        Property(null)
    ], LegendSettings.prototype, "width", void 0);
    __decorate$5([
        Complex({ x: 0, y: 0 }, Location)
    ], LegendSettings.prototype, "location", void 0);
    __decorate$5([
        Property('Auto')
    ], LegendSettings.prototype, "position", void 0);
    __decorate$5([
        Property(8)
    ], LegendSettings.prototype, "padding", void 0);
    __decorate$5([
        Property('Center')
    ], LegendSettings.prototype, "alignment", void 0);
    __decorate$5([
        Complex(Theme.legendLabelFont, Font)
    ], LegendSettings.prototype, "textStyle", void 0);
    __decorate$5([
        Property(10)
    ], LegendSettings.prototype, "shapeHeight", void 0);
    __decorate$5([
        Property(10)
    ], LegendSettings.prototype, "shapeWidth", void 0);
    __decorate$5([
        Complex({}, Border)
    ], LegendSettings.prototype, "border", void 0);
    __decorate$5([
        Property(5)
    ], LegendSettings.prototype, "shapePadding", void 0);
    __decorate$5([
        Property('transparent')
    ], LegendSettings.prototype, "background", void 0);
    __decorate$5([
        Property(1)
    ], LegendSettings.prototype, "opacity", void 0);
    __decorate$5([
        Property(true)
    ], LegendSettings.prototype, "toggleVisibility", void 0);
    __decorate$5([
        Property(null)
    ], LegendSettings.prototype, "description", void 0);
    __decorate$5([
        Property(3)
    ], LegendSettings.prototype, "tabIndex", void 0);
    return LegendSettings;
}(ChildProperty));
/**
 * Legend base class for Chart and Accumulation chart.
 * @private
 */
var BaseLegend = /** @class */ (function () {
    /**
     * Constructor for the dateTime module.
     * @private
     */
    function BaseLegend(chart) {
        this.rowCount = 0; // legend row counts per page 
        this.columnCount = 0; // legend column counts per page 
        this.pageButtonSize = 8;
        this.pageXCollections = []; // pages of x locations
        this.maxColumns = 0;
        this.isTrimmed = false;
        this.maxWidth = 0;
        this.currentPage = 1;
        this.chart = chart;
        this.legend = chart.legendSettings;
        this.legendID = chart.element.id + '_chart_legend';
        this.isChartControl = (chart.getModuleName() === 'chart');
    }
    /**
     * Calculate the bounds for the legends.
     * @return {void}
     * @private
     */
    BaseLegend.prototype.calculateLegendBounds = function (rect, availableSize) {
        var legend = this.legend;
        this.getPosition(legend.position, availableSize);
        this.legendBounds = new Rect(rect.x, rect.y, 0, 0);
        this.isVertical = (this.position === 'Left' || this.position === 'Right');
        if (this.isVertical) {
            this.legendBounds.height = stringToNumber(legend.height, availableSize.height - (rect.y - this.chart.margin.top)) || rect.height;
            this.legendBounds.width = stringToNumber(legend.width || '20%', availableSize.width);
        }
        else {
            this.legendBounds.width = stringToNumber(legend.width, availableSize.width) || rect.width;
            this.legendBounds.height = stringToNumber(legend.height || '20%', availableSize.height);
        }
        this.library.getLegendBounds(availableSize, this.legendBounds, legend);
        this.getLocation(this.position, legend.alignment, this.legendBounds, rect, availableSize);
    };
    /**
     * To find legend position based on available size for chart and accumulation chart
     */
    BaseLegend.prototype.getPosition = function (position, availableSize) {
        if (this.isChartControl) {
            this.position = (position !== 'Auto') ? position : 'Bottom';
        }
        else {
            if (position === 'Auto' && this.chart.visibleSeries &&
                (this.chart.visibleSeries[0].type === 'Funnel' || this.chart.visibleSeries[0].type === 'Pyramid')) {
                position = 'Top';
            }
            this.position = (position !== 'Auto') ? position :
                (availableSize.width > availableSize.height ? 'Right' : 'Bottom');
        }
    };
    /**
     * To set bounds for chart and accumulation chart
     */
    BaseLegend.prototype.setBounds = function (computedWidth, computedHeight, legend, legendBounds) {
        computedWidth = computedWidth < legendBounds.width ? computedWidth : legendBounds.width;
        computedHeight = computedHeight < legendBounds.height ? computedHeight : legendBounds.height;
        legendBounds.width = !legend.width ? computedWidth : legendBounds.width;
        legendBounds.height = !legend.height ? computedHeight : legendBounds.height;
        this.rowCount = Math.max(1, Math.ceil((legendBounds.height - legend.padding) / (this.maxItemHeight + legend.padding)));
    };
    /**
     * To find legend location based on position, alignment for chart and accumulation chart
     */
    BaseLegend.prototype.getLocation = function (position, alignment, legendBounds, rect, availableSize) {
        var padding = this.legend.border.width;
        var legendHeight = legendBounds.height + padding;
        var legendWidth = legendBounds.width + padding;
        var marginBottom = this.chart.margin.bottom;
        if (position === 'Bottom') {
            legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
            legendBounds.y = rect.y + (rect.height - legendHeight) + padding;
            subtractThickness(rect, new Thickness(0, 0, 0, legendHeight));
        }
        else if (position === 'Top') {
            legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
            legendBounds.y = rect.y + padding;
            subtractThickness(rect, new Thickness(0, 0, legendHeight, 0));
        }
        else if (position === 'Right') {
            legendBounds.x = rect.x + (rect.width - legendBounds.width);
            legendBounds.y = rect.y + this.alignLegend(0, availableSize.height - (rect.y + marginBottom), legendBounds.height, alignment);
            subtractThickness(rect, new Thickness(0, legendWidth, 0, 0));
        }
        else if (position === 'Left') {
            legendBounds.y = rect.y + this.alignLegend(0, availableSize.height - (rect.y + marginBottom), legendBounds.height, alignment);
            subtractThickness(rect, new Thickness(legendWidth, 0, 0, 0));
        }
        else {
            legendBounds.x = this.legend.location.x;
            legendBounds.y = this.legend.location.y;
            subtractThickness(rect, new Thickness(0, 0, 0, 0));
        }
    };
    /**
     * To find legend alignment for chart and accumulation chart
     */
    BaseLegend.prototype.alignLegend = function (start, size, legendSize, alignment) {
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
    /**
     * Renders the legend.
     * @return {void}
     * @private
     */
    BaseLegend.prototype.renderLegend = function (chart, legend, legendBounds) {
        var firstLegend = this.findFirstLegendPosition(this.legendCollections);
        var padding = legend.padding;
        this.maxItemHeight = Math.max(this.legendCollections[0].textSize.height, legend.shapeHeight);
        var legendGroup = chart.renderer.createGroup({ id: this.legendID + '_g' });
        var legendTranslateGroup = this.createLegendElements(chart, legendBounds, legendGroup, legend, this.legendID);
        if (firstLegend !== this.legendCollections.length) {
            var legendSeriesGroup = void 0; // legendItem group for each series group element
            var start = void 0; // starting shape center x,y position && to resolve lint error used new line for declaration
            start = new ChartLocation(legendBounds.x + padding + (legend.shapeWidth / 2), legendBounds.y + padding + this.maxItemHeight / 2);
            var textOptions = new TextOption('', start.x, start.y, 'start');
            //  initialization for totalPages legend click totalpage again calculate
            this.totalPages = this.isChartControl ? this.totalPages : 0;
            var textPadding = legend.shapePadding + padding + legend.shapeWidth;
            var count = 0;
            this.pageXCollections = [];
            this.legendCollections[firstLegend].location = start;
            var previousLegend = this.legendCollections[firstLegend];
            for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
                var legendOption = _a[_i];
                if (legendOption.render && legendOption.text !== '') {
                    legendSeriesGroup = chart.renderer.createGroup({
                        id: this.legendID + this.generateId(legendOption, '_g_', count)
                    });
                    legendSeriesGroup.setAttribute('tabindex', legend.tabIndex.toString());
                    legendSeriesGroup.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
                    this.library.getRenderPoint(legendOption, start, textPadding, previousLegend, legendBounds, count, firstLegend);
                    this.renderSymbol(legendOption, legendSeriesGroup, count);
                    this.renderText(chart, legendOption, legendSeriesGroup, textOptions, count);
                    legendSeriesGroup.setAttribute('style', 'cursor: ' + ((!legend.toggleVisibility && chart.selectionMode === 'None') ? 'auto' : 'pointer'));
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
    /**
     * To find first valid legend text index for chart and accumulation chart
     */
    BaseLegend.prototype.findFirstLegendPosition = function (legendCollection) {
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
    /**
     * To create legend rendering elements for chart and accumulation chart
     */
    BaseLegend.prototype.createLegendElements = function (chart, legendBounds, legendGroup, legend, id) {
        var padding = legend.padding;
        var options = new RectOption(id + '_element', legend.background, legend.border, legend.opacity, legendBounds);
        legendGroup.appendChild(chart.renderer.drawRectangle(options));
        var legendItemsGroup = chart.renderer.createGroup({ id: id + '_collections' });
        legendGroup.appendChild(legendItemsGroup);
        this.legendTranslateGroup = chart.renderer.createGroup({ id: id + '_translate_g' });
        legendItemsGroup.appendChild(this.legendTranslateGroup);
        var clippath = chart.renderer.createClipPath({ id: id + '_clipPath' });
        options.y += padding;
        options.id += '_clipPath_rect';
        options.width = (!this.isChartControl && this.isVertical) ? this.maxWidth - padding : legendBounds.width;
        this.clipRect = chart.renderer.drawRectangle(options);
        clippath.appendChild(this.clipRect);
        chart.svgObject.appendChild(clippath);
        legendItemsGroup.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
        return this.legendTranslateGroup;
    };
    /**
     * To render legend symbols for chart and accumulation chart
     */
    BaseLegend.prototype.renderSymbol = function (legendOption, group, i) {
        var symbolColor = legendOption.visible ? legendOption.fill : '#D3D3D3';
        var shape = (legendOption.shape === 'SeriesType') ? legendOption.type : legendOption.shape;
        shape = shape === 'Scatter' ? legendOption.markerShape : shape;
        var symbolOption = new PathOption(this.legendID + this.generateId(legendOption, '_shape_', i), symbolColor, 1, symbolColor, 1, '', '');
        group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth, this.legend.shapeHeight), '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        if (shape === 'Line' && legendOption.markerVisibility && legendOption.markerShape !== 'Image' ||
            legendOption.type === 'Doughnut') {
            symbolOption.id = this.legendID + this.generateId(legendOption, '_shape_marker_', i);
            shape = legendOption.type === 'Doughnut' ? 'Circle' : legendOption.markerShape;
            symbolOption.fill = legendOption.type === 'Doughnut' ? '#FFFFFF' : symbolOption.fill;
            group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth / 2, this.legend.shapeHeight / 2), '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        }
    };
    /**
     * To render legend text for chart and accumulation chart
     */
    BaseLegend.prototype.renderText = function (chart, legendOption, group, textOptions, i) {
        var legend = chart.legendSettings;
        var hiddenColor = '#D3D3D3';
        textOptions.id = this.legendID + this.generateId(legendOption, '_text_', i);
        var fontcolor = legendOption.visible ? legend.textStyle.color : hiddenColor;
        textOptions.text = legendOption.text;
        textOptions.x = legendOption.location.x + (legend.shapeWidth / 2) + legend.shapePadding;
        textOptions.y = legendOption.location.y + this.maxItemHeight / 4;
        var element = textElement(textOptions, legend.textStyle, fontcolor, group);
        element.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
    };
    /**
     * To render legend paging elements for chart and accumulation chart
     */
    BaseLegend.prototype.renderPagingElements = function (chart, bounds, textOption, legendGroup) {
        var paginggroup = chart.renderer.createGroup({ id: this.legendID + '_navigation' });
        legendGroup.appendChild(paginggroup);
        var grayColor = '#545454';
        var legend = chart.legendSettings; // to solve parameter lint error, legend declaration is here
        var padding = 8; // const padding for paging elements
        if (this.isChartControl || !this.isVertical) {
            this.totalPages = Math.ceil(this.totalPages / Math.max(1, this.rowCount - 1));
        }
        else {
            this.totalPages = Math.ceil(this.totalPages / this.maxColumns);
        }
        var symbolOption = new PathOption(this.legendID + '_pageup', 'transparent', 5, grayColor, 1, '', '');
        var iconSize = this.pageButtonSize;
        paginggroup.setAttribute('style', 'cursor: pointer');
        // Page left arrow drawing calculation started here
        this.clipPathHeight = (this.rowCount - 1) * (this.maxItemHeight + legend.padding);
        this.clipRect.setAttribute('height', this.clipPathHeight.toString());
        var x = bounds.x + iconSize / 2;
        var y = bounds.y + this.clipPathHeight + ((bounds.height - this.clipPathHeight) / 2);
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'LeftArrow', new Size(iconSize, iconSize), '', symbolOption, 'LeftArrow'));
        // Page numbering rendering calculation started here
        textOption.x = x + (iconSize / 2) + padding;
        var size = measureText(this.totalPages + '/' + this.totalPages, legend.textStyle);
        textOption.y = y + (size.height / 4);
        textOption.id = this.legendID + '_pagenumber';
        textOption.text = '1/' + this.totalPages;
        var pageTextElement = textElement(textOption, legend.textStyle, legend.textStyle.color, paginggroup);
        // Page right arrow rendering calculation started here
        x = (textOption.x + padding + (iconSize / 2) + size.width);
        symbolOption.id = this.legendID + '_pagedown';
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'RightArrow', new Size(iconSize, iconSize), '', symbolOption, 'RightArrow'));
        // placing the navigation buttons and page numbering in legend right corner
        paginggroup.setAttribute('transform', 'translate(' + (bounds.width - (2 * (iconSize + padding) +
            padding + size.width)) + ', ' + 0 + ')');
        this.translatePage(pageTextElement, this.currentPage - 1, this.currentPage);
    };
    /**
     * To translate legend pages for chart and accumulation chart
     */
    BaseLegend.prototype.translatePage = function (pagingText, page, pageNumber) {
        var size = (this.clipPathHeight) * page;
        var translate = 'translate(0,-' + size + ')';
        if (!this.isChartControl && this.isVertical) {
            var pageLength = page * this.maxColumns;
            size = this.pageXCollections[page * this.maxColumns] - this.legendBounds.x;
            size = size < 0 ? 0 : size; // to avoid small pixel variation
            translate = 'translate(-' + size + ',0)';
        }
        this.legendTranslateGroup.setAttribute('transform', translate);
        pagingText.textContent = (pageNumber) + '/' + this.totalPages;
        this.currentPage = pageNumber;
    };
    /**
     * To change legend pages for chart and accumulation chart
     */
    BaseLegend.prototype.changePage = function (event, pageUp) {
        var pageText = document.getElementById(this.legendID + '_pagenumber');
        var page = parseInt(pageText.textContent.split('/')[0], 10);
        if (pageUp && page > 1) {
            this.translatePage(pageText, (page - 2), (page - 1));
        }
        else if (!pageUp && page < this.totalPages) {
            this.translatePage(pageText, page, (page + 1));
        }
    };
    /**
     * To find legend elements id based on chart or accumulation chart
     * @private
     */
    BaseLegend.prototype.generateId = function (option, prefix, count) {
        if (this.isChartControl) {
            return prefix + count;
        }
        else {
            return prefix + option.pointIndex;
        }
    };
    /**
     * To show or hide trimmed text tooltip for legend.
     * @return {void}
     * @private
     */
    BaseLegend.prototype.move = function (event) {
        var _this = this;
        var x = this.chart.mouseX;
        var y = this.chart.mouseY;
        if (event.target.textContent.indexOf('...') > -1) {
            var targetId = event.target.id.split(this.legendID + '_text_');
            if (targetId.length === 2) {
                var index = parseInt(targetId[1], 10);
                var element = this.chart.element;
                if (!isNaN(index)) {
                    if (this.chart.isTouch) {
                        removeElement(this.chart.element.id + '_EJ2_Legend_Tooltip');
                    }
                    if (this.isChartControl) {
                        showTooltip(this.chart.series[index].name, x, y, element.offsetWidth, element.id + '_EJ2_Legend_Tooltip', getElement(this.chart.element.id + '_Secondary_Element'));
                    }
                    else {
                        var location_1 = this.chart.removeSvgOffset(x, y);
                        showTooltip(this.chart.visibleSeries[0].points[index].x.toString(), location_1.x + 10, location_1.y + 10, element.offsetWidth, element.id + '_EJ2_Legend_Tooltip', getElement(this.chart.element.id + '_Secondary_Element'));
                    }
                }
            }
        }
        else {
            removeElement(this.chart.element.id + '_EJ2_Legend_Tooltip');
        }
        if (this.chart.isTouch) {
            clearTimeout(this.clearTooltip);
            this.clearTooltip = setTimeout(function () { removeElement(_this.chart.element.id + '_EJ2_Legend_Tooltip'); }, 1000);
        }
    };
    return BaseLegend;
}());
/**
 * Class for legend options
 * @private
 */
var LegendOptions = /** @class */ (function () {
    function LegendOptions(text, fill, shape, visible, type, markerShape, markerVisibility, pointIndex, seriesIndex) {
        this.location = { x: 0, y: 0 };
        this.text = text;
        this.fill = fill;
        this.shape = shape;
        this.visible = visible;
        this.type = type;
        this.markerVisibility = markerVisibility;
        this.markerShape = markerShape;
        this.pointIndex = pointIndex;
        this.seriesIndex = seriesIndex;
    }
    return LegendOptions;
}());

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path='../series/chart-series-model.d.ts' />
/**
 * Defines how to represent the market trend using technical indicators
 */
var TechnicalIndicator = /** @class */ (function (_super) {
    __extends$9(TechnicalIndicator, _super);
    function TechnicalIndicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        return _this;
    }
    /** @private */
    TechnicalIndicator.prototype.setDataSource = function (series, chart) {
        if (series) {
            this.xData = series.xData;
            this.yData = series.yData;
            this.points = series.points;
        }
        var type = firstToLowerCase(this.type);
        chart[type + 'IndicatorModule'].initDataSource(this, chart);
        chart.visibleSeriesCount += this.targetSeries.length;
    };
    __decorate$6([
        Property('Sma')
    ], TechnicalIndicator.prototype, "type", void 0);
    __decorate$6([
        Property(14)
    ], TechnicalIndicator.prototype, "period", void 0);
    __decorate$6([
        Property(14)
    ], TechnicalIndicator.prototype, "kPeriod", void 0);
    __decorate$6([
        Property(3)
    ], TechnicalIndicator.prototype, "dPeriod", void 0);
    __decorate$6([
        Property(80)
    ], TechnicalIndicator.prototype, "overBought", void 0);
    __decorate$6([
        Property(20)
    ], TechnicalIndicator.prototype, "overSold", void 0);
    __decorate$6([
        Property(2)
    ], TechnicalIndicator.prototype, "standardDeviation", void 0);
    __decorate$6([
        Property('Close')
    ], TechnicalIndicator.prototype, "field", void 0);
    __decorate$6([
        Property(12)
    ], TechnicalIndicator.prototype, "slowPeriod", void 0);
    __decorate$6([
        Property(26)
    ], TechnicalIndicator.prototype, "fastPeriod", void 0);
    __decorate$6([
        Property(true)
    ], TechnicalIndicator.prototype, "showZones", void 0);
    __decorate$6([
        Complex({ color: '#ff9933', width: 2 }, Connector)
    ], TechnicalIndicator.prototype, "macdLine", void 0);
    __decorate$6([
        Property('Both')
    ], TechnicalIndicator.prototype, "macdType", void 0);
    __decorate$6([
        Property('#2ecd71')
    ], TechnicalIndicator.prototype, "macdPositiveColor", void 0);
    __decorate$6([
        Property('#e74c3d')
    ], TechnicalIndicator.prototype, "macdNegativeColor", void 0);
    __decorate$6([
        Property('rgba(211,211,211,0.25)')
    ], TechnicalIndicator.prototype, "bandColor", void 0);
    __decorate$6([
        Complex({ color: '#ffb735', width: 1 }, Connector)
    ], TechnicalIndicator.prototype, "upperLine", void 0);
    __decorate$6([
        Complex({ color: '#f2ec2f', width: 1 }, Connector)
    ], TechnicalIndicator.prototype, "lowerLine", void 0);
    __decorate$6([
        Complex({ color: '#f2ec2f', width: 1 }, Connector)
    ], TechnicalIndicator.prototype, "periodLine", void 0);
    __decorate$6([
        Property('')
    ], TechnicalIndicator.prototype, "seriesName", void 0);
    return TechnicalIndicator;
}(SeriesBase));

/**
 * Annotation Module handles the Annotation for chart and accumulation series.
 */
var ExportUtils = /** @class */ (function () {
    /**
     * Constructor for chart and accumulation annotation
     * @param control
     */
    function ExportUtils(control) {
        this.control = control;
    }
    /**
     * To print the accumulation and chart elements
     * @param elements
     */
    ExportUtils.prototype.print = function (elements) {
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(elements), name: beforePrint
        };
        this.control.trigger(beforePrint, argsData);
        if (!argsData.cancel) {
            print(argsData.htmlContent, this.printWindow);
        }
    };
    /**
     * To get the html string of the chart and accumulation
     * @param elements
     * @private
     */
    ExportUtils.prototype.getHTMLContent = function (elements) {
        var div = createElement('div');
        if (elements) {
            if (elements instanceof Array) {
                elements.forEach(function (value) {
                    div.appendChild(getElement(value).cloneNode(true));
                });
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            div.appendChild(this.control.element.cloneNode(true));
        }
        return div;
    };
    /**
     * To export the chart svgObject
     * @param type
     * @param fileName
     */
    ExportUtils.prototype.export = function (type, fileName) {
        var element = createElement('canvas', {
            id: 'ej2-canvas',
            attrs: {
                'width': this.control.availableSize.width.toString(),
                'height': this.control.availableSize.height.toString()
            }
        });
        var url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(this.control.svgObject)], { type: 'image/svg+xml' }));
        var image = new Image();
        var ctx = element.getContext('2d');
        image.onload = (function () {
            ctx.drawImage(image, 0, 0);
            window.URL.revokeObjectURL(url);
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(element.msToBlob(), fileName + '.' + type.toLocaleLowerCase());
            }
            else {
                var imgURI = element.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                createElement('a', {
                    attrs: {
                        'download': fileName + '.' + type.toLocaleLowerCase(),
                        'href': imgURI
                    }
                }).dispatchEvent(new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                }));
            }
        });
        image.src = url;
    };
    return ExportUtils;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the ToolTips in the chart.
 */
var TooltipSettings = /** @class */ (function (_super) {
    __extends(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "shared", void 0);
    __decorate([
        Property('#000816')
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "header", void 0);
    __decorate([
        Property(0.75)
    ], TooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Complex(Theme.tooltipLabelFont, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], TooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Complex({ color: '#cccccc', width: 0.5 }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    return TooltipSettings;
}(ChildProperty));
/**
 * Configures the crosshair in the chart.
 */
var CrosshairSettings = /** @class */ (function (_super) {
    __extends(CrosshairSettings, _super);
    function CrosshairSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CrosshairSettings.prototype, "enable", void 0);
    __decorate([
        Complex({ color: '#4f4f4f', width: 1 }, Border)
    ], CrosshairSettings.prototype, "line", void 0);
    __decorate([
        Property('Both')
    ], CrosshairSettings.prototype, "lineType", void 0);
    return CrosshairSettings;
}(ChildProperty));
/**
 * Configures the zooming behavior for the chart.
 */
var ZoomSettings = /** @class */ (function (_super) {
    __extends(ZoomSettings, _super);
    function ZoomSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], ZoomSettings.prototype, "enableSelectionZooming", void 0);
    __decorate([
        Property(false)
    ], ZoomSettings.prototype, "enablePinchZooming", void 0);
    __decorate([
        Property(false)
    ], ZoomSettings.prototype, "enableMouseWheelZooming", void 0);
    __decorate([
        Property(true)
    ], ZoomSettings.prototype, "enableDeferredZooming", void 0);
    __decorate([
        Property('XY')
    ], ZoomSettings.prototype, "mode", void 0);
    __decorate([
        Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    ], ZoomSettings.prototype, "toolbarItems", void 0);
    return ZoomSettings;
}(ChildProperty));
/**
 * Represents the Chart control.
 * ```html
 * <div id="chart"/>
 * <script>
 *   var chartObj = new Chart({ isResponsive : true });
 *   chartObj.appendTo("#chart");
 * </script>
 * ```
 */
var Chart = /** @class */ (function (_super) {
    __extends(Chart, _super);
    /**
     * Constructor for creating the widget
     * @hidden
     */
    function Chart(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.chartAreaType = 'Cartesian';
        return _this;
    }
    /**
     * Initialize the event handler.
     */
    Chart.prototype.preRender = function () {
        this.unWireEvents();
        this.initPrivateVariable();
        this.setCulture();
        this.setTheme();
        this.createChartSvg();
        this.wireEvents();
    };
    Chart.prototype.initPrivateVariable = function () {
        this.animateSeries = true;
        this.horizontalAxes = [];
        this.verticalAxes = [];
        this.refreshAxis();
        this.refreshDefinition(this.rows);
        this.refreshDefinition(this.columns);
        if (this.tooltipModule) {
            this.tooltipModule.previousPoints = [];
        }
    };
    /**
     * To Initialize the control rendering.
     */
    Chart.prototype.render = function () {
        this.trigger(load, { chart: this });
        this.markerRender = new Marker(this);
        this.calculateAreaType();
        this.calculateVisibleSeries();
        this.initTechnicalIndicators();
        this.initTrendLines();
        this.calculateVisibleAxis();
        this.processData();
    };
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    Chart.prototype.getLocalizedLabel = function (key) {
        return this.localeObject.getConstant(key);
    };
    /**
     * Refresh the chart bounds.
     * @private
     */
    Chart.prototype.refreshBound = function () {
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.getLegendOptions(this.visibleSeries);
        }
        var isCalculateStacking = false;
        var series;
        for (var i = 0, len = this.visibleSeries.length; i < len; i++) {
            series = this.visibleSeries[i];
            series.position = series.rectCount = undefined;
            if (((series.type.indexOf('Stacking') !== -1) || (series.drawType.indexOf('Stacking') !== -1
                && this.chartAreaType === 'PolarRadar')) && !isCalculateStacking) {
                series.calculateStackedValue(series.type.indexOf('100') > -1);
                isCalculateStacking = true;
            }
        }
        this.calculateBounds();
        this.renderElements();
    };
    Chart.prototype.renderElements = function () {
        this.renderBorder();
        this.renderTitle();
        this.renderAreaBorder();
        this.renderSeriesElements();
        this.applyZoomkit();
        this.performSelection();
        this.setSecondaryElementPosition();
        this.renderAnnotation();
    };
    /**
     * To set the left and top position for data label template for center aligned chart
     */
    Chart.prototype.setSecondaryElementPosition = function () {
        var element = getElement(this.element.id + '_Secondary_Element');
        if (!element) {
            return;
        }
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
        element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
    };
    Chart.prototype.initializeModuleElements = function () {
        this.dataLabelCollections = [];
        this.seriesElements = this.renderer.createGroup({ id: this.element.id + 'SeriesCollection' });
        this.yAxisElements = this.renderer.createGroup({ id: this.element.id + 'yAxisCollection' });
        if (this.indicators.length) {
            this.indicatorElements = this.renderer.createGroup({ id: this.element.id + 'IndicatorCollection' });
        }
        if (this.hasTrendlines()) {
            this.trendLineElements = this.renderer.createGroup({ id: this.element.id + 'TrendLineCollection' });
        }
        this.dataLabelElements = this.renderer.createGroup({ id: this.element.id + 'DataLabelCollection' });
    };
    Chart.prototype.hasTrendlines = function () {
        var isTrendline;
        for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
            var series = _a[_i];
            isTrendline = series.trendlines.length ? true : false;
            if (isTrendline) {
                break;
            }
        }
        return isTrendline;
    };
    Chart.prototype.renderSeriesElements = function () {
        // Initialize the series elements values
        this.initializeModuleElements();
        if (this.rows.length > 0 && this.columns.length > 0) {
            this.chartAxisLayoutPanel.renderAxes();
            var tooltipDiv = document.createElement('div');
            tooltipDiv.id = this.element.id + '_Secondary_Element';
            tooltipDiv.setAttribute('style', 'position: relative');
            this.element.appendChild(tooltipDiv);
            // For userInteraction
            if (this.tooltip.enable) {
                this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction', style: 'pointer-events:none;' }));
            }
            for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                var indicator = _a[_i];
                if (this[firstToLowerCase(indicator.type) + 'IndicatorModule']) {
                    this[firstToLowerCase(indicator.type) + 'IndicatorModule'].createIndicatorElements(this, indicator, indicator.index);
                }
            }
            for (var _b = 0, _c = this.visibleSeries; _b < _c.length; _b++) {
                var series = _c[_b];
                if (series.trendlines.length) {
                    this.trendLineModule.getTrendLineElements(series, this);
                }
            }
            for (var _d = 0, _e = this.visibleSeries; _d < _e.length; _d++) {
                var item = _e[_d];
                if (item.visible) {
                    findClipRect(item);
                    item.renderSeries(this, item.index);
                }
            }
        }
        //Append the series elements method calling here
        this.appendSeriesElements();
    };
    Chart.prototype.appendSeriesElements = function () {
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
        if (this.stripLineModule) {
            this.stripLineModule.renderStripLine(this, 'Behind', this.axisCollections);
        }
        this.svgObject.appendChild(this.seriesElements);
        if (this.chartAreaType === 'PolarRadar') {
            this.svgObject.appendChild(this.yAxisElements);
        }
        if (this.indicatorElements) {
            this.svgObject.appendChild(this.indicatorElements);
        }
        if (this.trendLineElements) {
            this.svgObject.appendChild(this.trendLineElements);
        }
        if (this.stripLineModule) {
            this.stripLineModule.renderStripLine(this, 'Over', this.axisCollections);
        }
        if (this.legendModule) {
            this.legendModule.renderLegend(this, this.legendSettings, this.legendModule.legendBounds);
        }
        if (!this.tooltip.enable) {
            this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction', style: 'pointer-events:none;' }));
        }
        this.element.appendChild(this.svgObject);
    };
    Chart.prototype.applyZoomkit = function () {
        if (this.zoomModule && this.zoomModule.isZoomed) {
            this.zoomModule.applyZoomToolkit(this, this.axisCollections);
        }
    };
    Chart.prototype.renderAnnotation = function () {
        if (this.annotationModule) {
            this.annotationModule.renderAnnotations(getElement(this.element.id + '_Secondary_Element'));
        }
    };
    Chart.prototype.performSelection = function () {
        var selectedDataIndexes = [];
        if (this.selectionModule) {
            selectedDataIndexes = extend([], this.selectionModule.selectedDataIndexes, null, true);
            this.selectionModule.invokeSelection(this);
        }
        if (selectedDataIndexes.length > 0) {
            this.selectionModule.selectedDataIndexes = selectedDataIndexes;
            this.selectionModule.redrawSelection(this, this.selectionMode);
        }
    };
    Chart.prototype.processData = function () {
        this.visibleSeriesCount = 0;
        var check = true;
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series_1 = _a[_i];
            if (!series_1.visible) {
                this.visibleSeriesCount++;
                continue;
            }
            if (series_1.category !== 'Indicator' && series_1.category !== 'TrendLine') {
                this.initializeDataModule(series_1);
            }
        }
        for (var _b = 0, _c = this.indicators; _b < _c.length; _b++) {
            var indicator = _c[_b];
            if (!indicator.seriesName && indicator.dataSource) {
                var techIndicator = indicator;
                this.initializeDataModule(techIndicator);
                check = false;
            }
        }
        if (!this.visibleSeries.length || this.visibleSeriesCount === this.visibleSeries.length && check) {
            this.refreshBound();
            this.trigger('loaded', { chart: this });
        }
    };
    Chart.prototype.initializeDataModule = function (series) {
        series.xData = [];
        series.yData = [];
        series.dataModule = new Data(series.dataSource, series.query);
        series.points = [];
        series.refreshDataManager(this);
    };
    Chart.prototype.calculateBounds = function () {
        var padding = 15;
        var margin = this.margin;
        // Title Height;
        var titleHeight = 0;
        if (this.title) {
            titleHeight = measureText(this.title, this.titleStyle).height + padding;
        }
        var top = margin.top + titleHeight + this.chartArea.border.width / 2;
        var left = margin.left;
        var width = this.availableSize.width - left - margin.right - this.border.width;
        var height = this.availableSize.height - top - this.border.width - margin.bottom;
        this.initialClipRect = new Rect(left, top, width, height);
        if (this.legendModule) {
            this.legendModule.calculateLegendBounds(this.initialClipRect, this.availableSize);
        }
        this.chartAxisLayoutPanel.measureAxis(this.initialClipRect);
    };
    /**
     * Handles the print method for chart control.
     */
    Chart.prototype.print = function (id) {
        var exportChart = new ExportUtils(this);
        exportChart.print(id);
    };
    /**
     * Handles the export method for chart control.
     * @param type
     * @param fileName
     */
    Chart.prototype.export = function (type, fileName) {
        var exportChart = new ExportUtils(this);
        exportChart.export(type, fileName);
    };
    /**
     * Defines the trendline initialization
     */
    Chart.prototype.initTrendLines = function () {
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            var trendIndex = 0;
            for (var _b = 0, _c = series.trendlines; _b < _c.length; _b++) {
                var trendline = _c[_b];
                var trendLine = trendline;
                var type = firstToLowerCase(trendLine.type);
                if (this.trendLineModule) {
                    trendLine.index = trendIndex;
                    trendLine.sourceIndex = series.index;
                    this.trendLineModule.initSeriesCollection(trendLine, this);
                    if (trendLine.targetSeries) {
                        this.visibleSeries.push(trendLine.targetSeries);
                    }
                }
                trendIndex++;
            }
        }
    };
    Chart.prototype.calculateAreaType = function () {
        var series = this.series[0];
        if (series) {
            this.requireInvertedAxis = ((series.type.indexOf('Bar') !== -1) && !this.isTransposed) ||
                ((series.type.indexOf('Bar') === -1) && this.isTransposed && this.chartAreaType !== 'PolarRadar');
        }
        this.chartAxisLayoutPanel = this.chartAreaType === 'PolarRadar' ? (this.polarSeriesModule || this.radarSeriesModule)
            : new CartesianAxisLayoutPanel(this);
    };
    Chart.prototype.calculateVisibleAxis = function () {
        var axis;
        var axes = [this.primaryXAxis, this.primaryYAxis];
        axes = this.chartAreaType === 'Cartesian' ? axes.concat(this.axes) : axes;
        this.axisCollections = [];
        for (var i = 0, len = axes.length; i < len; i++) {
            axis = axes[i];
            axis.series = [];
            axis.labels = [];
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series_2 = _a[_i];
                this.initAxis(series_2, axis, true);
            }
            for (var _b = 0, _c = this.indicators; _b < _c.length; _b++) {
                var indicator = _c[_b];
                this.initAxis(indicator, axis, false);
            }
            if (axis.orientation != null) {
                this.axisCollections.push(axis);
            }
        }
        if (this.rows.length > 0 && this.columns.length > 0) {
            this.chartAxisLayoutPanel.measure();
        }
    };
    Chart.prototype.initAxis = function (series, axis, isSeries) {
        if (series.xAxisName === axis.name || (series.xAxisName == null && axis.name === 'primaryXAxis')) {
            axis.orientation = this.requireInvertedAxis ? 'Vertical' : 'Horizontal';
            series.xAxis = axis;
            if (isSeries) {
                axis.series.push(series);
            }
        }
        else if (series.yAxisName === axis.name || (series.yAxisName == null && axis.name === 'primaryYAxis')) {
            axis.orientation = this.requireInvertedAxis ? 'Horizontal' : 'Vertical';
            series.yAxis = axis;
            if (isSeries) {
                axis.series.push(series);
            }
        }
    };
    Chart.prototype.initTechnicalIndicators = function () {
        var i = 0;
        for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
            var indicator = _a[_i];
            var techIndicator = indicator;
            var type = firstToLowerCase(techIndicator.type);
            if (this[type + 'IndicatorModule']) {
                techIndicator.index = i;
                this[type + 'IndicatorModule'].initSeriesCollection(techIndicator, this);
                for (var _b = 0, _c = techIndicator.targetSeries; _b < _c.length; _b++) {
                    var targetSeries = _c[_b];
                    if (indicator.seriesName || indicator.dataSource) {
                        this.visibleSeries.push(targetSeries);
                    }
                }
            }
            i++;
        }
    };
    /** @private */
    Chart.prototype.refreshTechnicalIndicator = function (series) {
        if (this.indicators.length) {
            var targetIndicator = null;
            if (series instanceof Series && series.category !== 'Indicator') {
                for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                    var indicator = _a[_i];
                    if (indicator.seriesName === series.name && !indicator.dataSource) {
                        targetIndicator = indicator;
                        targetIndicator.setDataSource(series, this);
                    }
                }
            }
            else if (series instanceof TechnicalIndicator) {
                targetIndicator = series;
                targetIndicator.setDataSource(series instanceof Series ? series : null, this);
            }
        }
    };
    Chart.prototype.calculateVisibleSeries = function () {
        var series;
        this.visibleSeries = [];
        var colors = this.palettes.length ? this.palettes : getSeriesColor(this.theme);
        var count = colors.length;
        for (var i = 0, len = this.series.length; i < len; i++) {
            series = this.series[i];
            series.index = i;
            series.interior = series.fill || colors[i % count];
            switch (series.type) {
                case 'Bar':
                case 'StackingBar':
                case 'StackingBar100':
                    if (this.series[0].type.indexOf('Bar') === -1) {
                        continue;
                    }
                    break;
                case 'Polar':
                case 'Radar':
                    if (this.chartAreaType !== 'PolarRadar') {
                        continue;
                    }
                    if (this.chartAreaType === 'PolarRadar' && ((series.xAxisName === null && series.yAxisName !== null) ||
                        (series.xAxisName !== null && series.yAxisName === null) ||
                        (series.xAxisName !== null && series.yAxisName !== null))) {
                        continue;
                    }
                    break;
                default:
                    if (this.chartAreaType === 'PolarRadar' || this.series[0].type.indexOf('Bar') > -1) {
                        continue;
                    }
                    break;
            }
            this.visibleSeries.push(series);
            this.series[i] = series;
        }
    };
    Chart.prototype.renderTitle = function () {
        if (this.title) {
            var maxTitleSize = this.availableSize.width - this.margin.left - this.margin.right;
            var trimmedTitle = textTrim(maxTitleSize, this.title, this.titleStyle);
            this.elementSize = measureText(trimmedTitle, this.titleStyle);
            var options = new TextOption(this.element.id + '_ChartTitle', titlePositionX(this.availableSize, this.margin.left, this.margin.right, this.titleStyle, this.elementSize), this.margin.top + 3 * (this.elementSize.height / 4), 'start', trimmedTitle);
            var element = textElement(options, this.titleStyle, this.titleStyle.color, this.svgObject);
            element.setAttribute('aria-label', this.description || this.title);
            element.setAttribute('tabindex', this.tabIndex.toString());
        }
    };
    Chart.prototype.renderBorder = function () {
        var width = this.border.width;
        var rect = new RectOption(this.element.id + '_ChartBorder', this.background, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
        this.htmlObject = this.renderer.drawRectangle(rect);
        this.svgObject.appendChild(this.htmlObject);
    };
    Chart.prototype.renderAreaBorder = function () {
        if (this.chartAreaType === 'PolarRadar') {
            return null;
        }
        else {
            var rect = new RectOption(this.element.id + '_ChartAreaBorder', this.chartArea.background, this.chartArea.border, this.chartArea.opacity, this.chartAxisLayoutPanel.seriesClipRect);
            this.htmlObject = this.renderer.drawRectangle(rect);
            this.svgObject.appendChild(this.htmlObject);
        }
    };
    /**
     * To add series for the chart
     * @param {SeriesModel[]} seriesCollection - Defines the series collection to be added in chart.
     * @return {void}.
     */
    Chart.prototype.addSeries = function (seriesCollection) {
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            series = new Series(this, 'series', series);
            this.series.push(series);
        }
        this.refresh();
    };
    /**
     * To destroy the widget
     * @method destroy
     * @return {void}.
     * @member of Chart
     */
    Chart.prototype.destroy = function () {
        this.unWireEvents();
        _super.prototype.destroy.call(this);
        this.element.classList.remove('e-chart');
    };
    /**
     * Get component name
     */
    Chart.prototype.getModuleName = function () {
        return 'chart';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    Chart.prototype.getPersistData = function () {
        var keyEntity = ['loaded', 'animationComplete'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Method to create SVG element.
     */
    Chart.prototype.createChartSvg = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * Method to bind events for chart
     */
    Chart.prototype.unWireEvents = function () {
        /*! Find the Events type */
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */
        EventHandler.remove(this.element, startEvent, this.chartOnMouseDown);
        EventHandler.remove(this.element, moveEvent, this.mouseMove);
        EventHandler.remove(this.element, stopEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.chartRightClick);
        EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.chartResize);
    };
    Chart.prototype.wireEvents = function () {
        /*! Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.chartOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.chartRightClick, this);
        EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.chartResize.bind(this));
        this.longPress = this.longPress.bind(this);
        new Touch(this.element, { tapHold: this.longPress, tapHoldThreshold: 500 });
        /*! Apply the style for chart */
        this.setStyle(this.element);
    };
    Chart.prototype.chartRightClick = function (event) {
        if (this.crosshair.enable && this.crosshairModule &&
            (event.buttons === 2 || event.which === 0 || event.pointerType === 'touch')) {
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
        element.style.display = 'block';
    };
    /**
     * Finds the orientation.
     * @return {boolean}
     * @private
     */
    Chart.prototype.isOrientation = function () {
        return ('orientation' in window && 'onorientationchange' in window);
    };
    /**
     * Handles the long press on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.longPress = function (e) {
        this.mouseX = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientX) : 0;
        this.mouseY = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientY) : 0;
        this.startMove = true;
        this.setMouseXY(this.mouseX, this.mouseY);
        this.notify('tapHold', e);
        return false;
    };
    /**
     * To find mouse x, y for aligned chart element svg position
     */
    Chart.prototype.setMouseXY = function (pageX, pageY) {
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
    };
    /**
     * Handles the chart resize.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartResize = function (e) {
        var _this = this;
        this.animateSeries = false;
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(function () {
            if (_this.isDestroyed) {
                clearTimeout(_this.resizeTo);
                return;
            }
            _this.createChartSvg();
            _this.refreshAxis();
            _this.refreshBound();
            _this.trigger('loaded', { chart: _this });
        }, 500);
        return false;
    };
    /**
     * Handles the mouse move.
     * @return {boolean}
     * @private
     */
    Chart.prototype.mouseMove = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        if (e.type === 'touchmove') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseMove(e);
        return false;
    };
    /**
     * Handles the mouse leave.
     * @return {boolean}
     * @private
     */
    Chart.prototype.mouseLeave = function (e) {
        var pageX;
        var pageY;
        var touchArg;
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
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseLeave(e);
        return false;
    };
    /**
     * Handles the mouse leave on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseLeave = function (e) {
        var element = e.target;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.trigger(chartMouseLeave, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        this.notify(cancelEvent, e);
        return false;
    };
    /**
     * Handles the mouse click on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseClick = function (e) {
        var element = e.target;
        this.trigger(chartMouseClick, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.notify('click', e);
        return false;
    };
    /**
     * Handles the mouse move on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseMove = function (e) {
        var element = e.target;
        this.trigger(chartMouseMove, { target: element.id, x: this.mouseX, y: this.mouseY });
        // Tooltip for chart series.
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
            this.axisTooltip(e, this.mouseX, this.mouseY);
        }
        this.notify(Browser.touchMoveEvent, e);
        this.isTouch = false;
        return false;
    };
    Chart.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((targetId === (this.element.id + '_ChartTitle')) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    Chart.prototype.axisTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((targetId.indexOf('AxisLabel') > -1) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.findAxisLabel(targetId), x, y, this.element.offsetWidth, this.element.id + '_EJ2_AxisLabel_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_AxisLabel_Tooltip');
        }
    };
    Chart.prototype.findAxisLabel = function (text) {
        var texts = ((text.replace(this.element.id, '')).replace('AxisLabel_', '')).split('_');
        return this.axisCollections[parseInt(texts[0], 10)].visibleLabels[parseInt(texts[1], 10)].originalText;
    };
    /**
     * Handles the mouse down on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseDown = function (e) {
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var offset = Browser.isDevice ? 20 : 30;
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        this.trigger(chartMouseDown, { target: element.id, x: this.mouseX, y: this.mouseY });
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            target = touchArg.target;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.clientX;
            pageY = e.clientY;
            target = e.target;
        }
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        this.mouseDownX = this.previousMouseMoveX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseDownY = this.previousMouseMoveY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
        if (this.isTouch) {
            this.isDoubleTap = (new Date().getTime() < this.threshold && target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                (this.mouseDownX - offset >= this.mouseX || this.mouseDownX + offset >= this.mouseX) &&
                (this.mouseDownY - offset >= this.mouseY || this.mouseDownY + offset >= this.mouseY) &&
                (this.mouseX - offset >= this.mouseDownX || this.mouseX + offset >= this.mouseDownX) &&
                (this.mouseY - offset >= this.mouseDownY || this.mouseY + offset >= this.mouseDownY));
        }
        this.notify(Browser.touchStartEvent, e);
        return false;
    };
    /**
     * Handles the mouse up.
     * @return {boolean}
     * @private
     */
    Chart.prototype.mouseEnd = function (e) {
        var pageY;
        var pageX;
        var touchArg;
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
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseUp(e);
        return false;
    };
    /**
     * Handles the mouse up.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseUp = function (e) {
        var element = e.target;
        this.trigger(chartMouseUp, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            this.axisTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            this.threshold = new Date().getTime() + 300;
        }
        this.seriesElements.removeAttribute('clip-path');
        this.notify(Browser.touchEndEvent, e);
        return false;
    };
    /**
     * Method to set culture for chart
     */
    Chart.prototype.setCulture = function () {
        this.intl = new Internationalization();
        this.setLocaleConstants();
        this.localeObject = new L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
    };
    /**
     * Method to set locale constants
     */
    Chart.prototype.setLocaleConstants = function () {
        this.defaultLocalConstants = {
            ZoomIn: 'ZoomIn',
            Zoom: 'Zoom',
            ZoomOut: 'ZoomOut',
            Pan: 'Pan',
            Reset: 'Reset',
            ResetZoom: 'Reset Zoom'
        };
    };
    /**
     * Themeing for chart goes here
     */
    Chart.prototype.setTheme = function () {
        /*! Set theme */
    };
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}
     * @private
     */
    Chart.prototype.requiredModules = function () {
        var _this = this;
        var modules = [];
        var series = this.series;
        var enableAnnotation = false;
        var moduleName;
        var errorBarVisible = false;
        var dataLabelEnable = false;
        var zooming = this.zoomSettings;
        this.chartAreaType = (series.length > 0 && (series[0].type === 'Polar' || series[0].type === 'Radar')) ? 'PolarRadar' : 'Cartesian';
        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip',
                args: [this]
            });
        }
        series.map(function (value) {
            _this.isLegend = (_this.legendSettings.visible && ((value.name !== '') || !!_this.isLegend));
            moduleName = value.type.indexOf('100') !== -1 ? value.type.replace('100', '') + 'Series' : value.type + 'Series';
            errorBarVisible = value.errorBar.visible || errorBarVisible;
            dataLabelEnable = value.marker.dataLabel.visible || dataLabelEnable;
            modules.push({
                member: moduleName,
                args: [_this, series]
            });
            if (_this.chartAreaType === 'PolarRadar') {
                modules.push({
                    member: value.drawType + 'Series',
                    args: [_this, series]
                });
            }
        });
        this.findIndicatorModules(modules);
        this.findTrendLineModules(modules);
        modules = this.findAxisModule(modules);
        enableAnnotation = this.annotations.some(function (value) {
            return (value.content !== null);
        });
        if (errorBarVisible) {
            modules.push({
                member: 'ErrorBar',
                args: [this, series]
            });
        }
        if (this.isLegend) {
            modules.push({
                member: 'Legend',
                args: [this]
            });
        }
        if (this.chartAreaType !== 'PolarRadar' && (zooming.enableSelectionZooming
            || zooming.enableMouseWheelZooming || zooming.enablePinchZooming)) {
            modules.push({
                member: 'Zoom',
                args: [this, this.zoomSettings]
            });
        }
        if (this.chartAreaType !== 'PolarRadar' || (this.chartAreaType === 'PolarRadar' &&
            (!(this.selectionMode.indexOf('DragX') > -1 || this.selectionMode.indexOf('DragXY') > -1 ||
                this.selectionMode.indexOf('DragY') > -1)))) {
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
        if (enableAnnotation) {
            modules.push({
                member: 'Annotation',
                args: [this, this.annotations]
            });
        }
        if (this.chartAreaType !== 'PolarRadar' && this.crosshair.enable) {
            modules.push({
                member: 'Crosshair',
                args: [this]
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
        var striplineEnabled = false;
        for (var _i = 0, axisCollections_1 = axisCollections; _i < axisCollections_1.length; _i++) {
            var axis = axisCollections_1[_i];
            datetimeEnabled = axis.valueType === 'DateTime' || datetimeEnabled;
            categoryEnabled = axis.valueType === 'Category' || categoryEnabled;
            logarithmicEnabled = axis.valueType === 'Logarithmic' || logarithmicEnabled;
            striplineEnabled = this.findStriplineVisibility(axis.stripLines) || striplineEnabled;
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
        if (striplineEnabled) {
            modules.push({
                member: 'StripLine',
                args: [this]
            });
        }
        return modules;
    };
    Chart.prototype.findIndicatorModules = function (modules) {
        var macdEnable;
        var bandEnable;
        var indicators = this.indicators;
        if (this.indicators.length) {
            modules.push({
                member: 'LineSeries',
                args: [this]
            });
            indicators.map(function (indicator) {
                macdEnable = macdEnable || indicator.type === 'Macd';
                bandEnable = bandEnable || indicator.type === 'BollingerBands';
            });
            if (macdEnable) {
                modules.push({
                    member: 'ColumnSeries',
                    args: [this]
                });
            }
            if (bandEnable) {
                modules.push({
                    member: 'RangeAreaSeries',
                    args: [this]
                });
            }
            for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                var indicator = _a[_i];
                modules.push({
                    member: indicator.type + 'Indicator',
                    args: [this]
                });
            }
        }
    };
    Chart.prototype.findTrendLineModules = function (modules) {
        var isLine;
        var isSpline;
        var _loop_1 = function (series) {
            var markerEnable;
            series.trendlines.map(function (trendline) {
                markerEnable = markerEnable || trendline.marker.visible;
                isLine = isLine || (trendline.type === 'Linear' || trendline.type === 'MovingAverage') ? true : false;
                isSpline = isSpline || !isLine ? true : false;
            });
            if (markerEnable) {
                modules.push({
                    member: 'Marker',
                    args: [this_1, series]
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
            var series = _a[_i];
            _loop_1(series);
        }
        if (isLine || isSpline) {
            modules.push({
                member: 'TrendLine',
                args: [this]
            });
        }
        if (isLine) {
            modules.push({
                member: 'LineSeries',
                args: [this]
            });
        }
        if (isSpline) {
            modules.push({
                member: 'SplineSeries',
                args: [this]
            });
        }
    };
    Chart.prototype.findStriplineVisibility = function (striplines) {
        var visible = false;
        for (var _i = 0, striplines_1 = striplines; _i < striplines_1.length; _i++) {
            var stripline = striplines_1[_i];
            if (stripline.visible) {
                visible = true;
                break;
            }
        }
        return visible;
    };
    /**
     * To Remove the SVG.
     * @return {boolean}
     * @private
     */
    Chart.prototype.removeSvg = function () {
        if (document.getElementById(this.element.id + '_Secondary_Element')) {
            remove(document.getElementById(this.element.id + '_Secondary_Element'));
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
                remove(this.svgObject);
            }
        }
    };
    Chart.prototype.refreshDefinition = function (definitions) {
        for (var _i = 0, definitions_1 = definitions; _i < definitions_1.length; _i++) {
            var item = definitions_1[_i];
            item.axes = [];
        }
    };
    /**
     * Refresh the axis default value.
     * @return {boolean}
     * @private
     */
    Chart.prototype.refreshAxis = function () {
        var axis = this.primaryXAxis;
        axis.rect = new Rect(undefined, undefined, 0, 0);
        axis = this.primaryYAxis;
        axis.isStack100 = false;
        axis.rect = new Rect(undefined, undefined, 0, 0);
        for (var _i = 0, _a = this.axes; _i < _a.length; _i++) {
            var item = _a[_i];
            axis = item;
            axis.rect = new Rect(undefined, undefined, 0, 0);
            axis.isStack100 = false;
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
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    // tslint:disable-next-line:max-func-body-length
    Chart.prototype.onPropertyChanged = function (newProp, oldProp) {
        var renderer = false;
        var refreshBounds = false;
        if (Object.keys(newProp).length === 1 && Object.keys(newProp)[0] === 'indicators') {
            //add valid check, it should happen only when property change is triggered for target series
            return;
        }
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
                        this.createChartSvg();
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
                    case 'zoomSettings':
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
                    case 'theme':
                        this.animateSeries = true;
                        break;
                    case 'locale':
                        this.setCulture();
                        renderer = true;
                        break;
                    case 'tooltip':
                        this.tooltipModule.previousPoints = [];
                        break;
                }
            }
            if (!refreshBounds && renderer) {
                this.removeSvg();
                this.renderElements();
                this.trigger('loaded', { chart: this });
            }
            if (refreshBounds) {
                this.removeSvg();
                this.refreshAxis();
                this.refreshBound();
                this.trigger('loaded', { chart: this });
            }
        }
    };
    __decorate([
        Property(null)
    ], Chart.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Chart.prototype, "height", void 0);
    __decorate([
        Property('')
    ], Chart.prototype, "title", void 0);
    __decorate([
        Complex(Theme.chartTitleFont, Font)
    ], Chart.prototype, "titleStyle", void 0);
    __decorate([
        Complex({}, Margin)
    ], Chart.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], Chart.prototype, "border", void 0);
    __decorate([
        Property(Theme.chartBackgroundColor)
    ], Chart.prototype, "background", void 0);
    __decorate([
        Complex({ border: { color: 'Gray', width: 0.5 }, background: 'transparent' }, ChartArea)
    ], Chart.prototype, "chartArea", void 0);
    __decorate([
        Complex({ name: 'primaryXAxis' }, Axis)
    ], Chart.prototype, "primaryXAxis", void 0);
    __decorate([
        Complex({ name: 'primaryYAxis' }, Axis)
    ], Chart.prototype, "primaryYAxis", void 0);
    __decorate([
        Collection([{}], Row)
    ], Chart.prototype, "rows", void 0);
    __decorate([
        Collection([{}], Column)
    ], Chart.prototype, "columns", void 0);
    __decorate([
        Collection([{}], Axis)
    ], Chart.prototype, "axes", void 0);
    __decorate([
        Collection([{}], Series)
    ], Chart.prototype, "series", void 0);
    __decorate([
        Collection([{}], ChartAnnotationSettings)
    ], Chart.prototype, "annotations", void 0);
    __decorate([
        Property([])
    ], Chart.prototype, "palettes", void 0);
    __decorate([
        Property('Material')
    ], Chart.prototype, "theme", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], Chart.prototype, "tooltip", void 0);
    __decorate([
        Complex({}, CrosshairSettings)
    ], Chart.prototype, "crosshair", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], Chart.prototype, "legendSettings", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], Chart.prototype, "zoomSettings", void 0);
    __decorate([
        Property('None')
    ], Chart.prototype, "selectionMode", void 0);
    __decorate([
        Property(false)
    ], Chart.prototype, "isMultiSelect", void 0);
    __decorate([
        Collection([], Indexes)
    ], Chart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Property(false)
    ], Chart.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(false)
    ], Chart.prototype, "isTransposed", void 0);
    __decorate([
        Collection([], TechnicalIndicator)
    ], Chart.prototype, "indicators", void 0);
    __decorate([
        Property(null)
    ], Chart.prototype, "description", void 0);
    __decorate([
        Property(1)
    ], Chart.prototype, "tabIndex", void 0);
    __decorate([
        Property(true)
    ], Chart.prototype, "enableSideBySidePlacement", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "annotationRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "load", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "pointRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseMove", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseClick", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseLeave", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseDown", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseUp", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "dragComplete", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "zoomComplete", void 0);
    Chart = __decorate([
        NotifyPropertyChanges
    ], Chart);
    return Chart;
}(Component));

var __extends$10 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * DateTime module is used to render DateTime axis.
 */
var DateTime = /** @class */ (function (_super) {
    __extends$10(DateTime, _super);
    /**
     * Constructor for the dateTime module.
     * @private
     */
    function DateTime(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * The function to calculate the range and labels for the axis.
     * @return {void}
     */
    DateTime.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis);
    };
    /**
     * Actual Range for the axis.
     * @private
     */
    DateTime.prototype.getActualRange = function (axis, size) {
        var option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        var dateParser = this.chart.intl.getDateParser(option);
        var dateFormatter = this.chart.intl.getDateFormat(option);
        // Axis min
        if ((axis.minimum) !== null) {
            this.min = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: axis.minimum }).val))));
        }
        else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
            this.min = Date.parse(dateParser(dateFormatter(new Date(1970, 1, 1))));
        }
        // Axis Max
        if ((axis.maximum) !== null) {
            this.max = Date.parse(dateParser(dateFormatter(new Date(DataUtil.parse.parseJson({ val: axis.maximum }).val))));
        }
        else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
            this.max = Date.parse(dateParser(dateFormatter(new Date(1970, 5, 1))));
        }
        if (this.min === this.max) {
            this.max = this.max + 2592000000;
            this.min = this.min - 2592000000;
        }
        axis.actualRange = {};
        axis.doubleRange = new DoubleRange(this.min, this.max);
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
    /**
     * Apply padding for the range.
     * @private
     */
    DateTime.prototype.applyRangePadding = function (axis, size) {
        this.start = (axis.actualRange.min);
        this.end = (axis.actualRange.max);
        var minimum;
        var maximum;
        var interval = axis.actualRange.interval;
        if (!axis.setRange()) {
            var rangePadding = axis.getRangePadding(this.chart);
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
        axis.actualRange.min = (axis.minimum != null) ? this.min : this.start;
        axis.actualRange.max = (axis.maximum != null) ? this.max : this.end;
        axis.actualRange.delta = (axis.actualRange.max - axis.actualRange.min);
        axis.doubleRange = new DoubleRange(axis.actualRange.min, axis.actualRange.max);
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
    /**
     * Calculate visible range for axis.
     * @private
     */
    DateTime.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = {
            min: axis.actualRange.min,
            max: axis.actualRange.max,
            interval: axis.actualRange.interval,
            delta: axis.actualRange.delta,
        };
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                this.calculateDateTimeNiceInterval(axis, size, axis.visibleRange.min, axis.visibleRange.max)
                : axis.visibleRange.interval;
        }
        axis.dateTimeInterval = this.increaseDateTimeInterval(axis, axis.visibleRange.min, axis.visibleRange.interval).getTime()
            - axis.visibleRange.min;
    };
    /**
     * Calculate visible labels for the axis.
     * @private
     */
    DateTime.prototype.calculateVisibleLabels = function (axis) {
        axis.visibleLabels = [];
        var tempInterval = axis.visibleRange.min;
        if (!axis.setRange()) {
            tempInterval = this.alignRangeStart(axis, tempInterval, axis.visibleRange.interval, axis.actualIntervalType).getTime();
        }
        axis.format = this.chart.intl.getDateFormat({
            format: axis.labelFormat, type: firstToLowerCase(axis.skeletonType), skeleton: this.getSkeleton(axis)
        });
        axis.startLabel = axis.format(new Date(axis.visibleRange.min));
        axis.endLabel = axis.format(new Date(axis.visibleRange.max));
        while (tempInterval <= axis.visibleRange.max) {
            if (withIn(tempInterval, axis.visibleRange)) {
                axis.triggerLabelRender(this.chart, tempInterval, axis.format(new Date(tempInterval)));
            }
            tempInterval = this.increaseDateTimeInterval(axis, tempInterval, axis.visibleRange.interval).getTime();
        }
        axis.getMaxLabelWidth(this.chart);
    };
    /** @private */
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
    /**
     * To get the skeleton for the DateTime axis.
     * @return {string}
     * @private
     */
    DateTime.prototype.getSkeleton = function (axis) {
        var skeleton;
        if (axis.skeleton) {
            return axis.skeleton;
        }
        if (axis.actualIntervalType === 'Years') {
            skeleton = 'yMMM';
        }
        else if (axis.actualIntervalType === 'Months') {
            skeleton = 'MMMd';
        }
        else if (axis.actualIntervalType === 'Days') {
            skeleton = 'yMd';
        }
        else if (axis.actualIntervalType === 'Hours') {
            skeleton = 'EHm';
        }
        else if (axis.actualIntervalType === 'Minutes' || axis.actualIntervalType === 'Seconds') {
            skeleton = 'Hms';
        }
        else {
            skeleton = 'Hms';
        }
        return skeleton;
    };
    DateTime.prototype.calculateDateTimeNiceInterval = function (axis, size, start, end) {
        var oneDay = 24 * 60 * 60 * 1000;
        var startDate = new Date(start);
        var endDate = new Date(end);
        //var axisInterval ;
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
    /**
     * Get module name
     */
    DateTime.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'DateTime';
    };
    /**
     * To destroy the category axis.
     * @return {void}
     * @private
     */
    DateTime.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return DateTime;
}(Double));

var __extends$11 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Category module is used to render category axis.
 */
var Category = /** @class */ (function (_super) {
    __extends$11(Category, _super);
    /**
     * Constructor for the category module.
     * @private
     */
    function Category(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * The function to calculate the range and labels for the axis.
     * @return {void}
     */
    Category.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis);
    };
    /**
     * Actual Range for the axis.
     * @private
     */
    Category.prototype.getActualRange = function (axis, size) {
        axis.doubleRange = new DoubleRange(this.min, this.max);
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
    /**
     * Padding for the axis.
     * @private
     */
    Category.prototype.applyRangePadding = function (axis, size) {
        var ticks = (axis.labelPlacement === 'BetweenTicks' && this.chart.chartAreaType !== 'PolarRadar') ? 0.5 : 0;
        if (ticks > 0) {
            axis.actualRange.min -= ticks;
            axis.actualRange.max += ticks;
        }
        else {
            axis.actualRange.max += axis.actualRange.max ? 0 : 0.5;
        }
        axis.doubleRange = new DoubleRange(axis.actualRange.min, axis.actualRange.max);
        axis.actualRange.delta = axis.doubleRange.delta;
        this.calculateVisibleRange(size, axis);
    };
    /**
     * Calculate label for the axis.
     * @private
     */
    Category.prototype.calculateVisibleLabels = function (axis) {
        /*! Generate axis labels */
        axis.visibleLabels = [];
        var tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        var position;
        axis.startLabel = axis.labels[Math.round(axis.visibleRange.min)];
        axis.endLabel = axis.labels[Math.floor(axis.visibleRange.max)];
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.visibleRange) && axis.labels.length > 0) {
                position = Math.round(tempInterval);
                axis.triggerLabelRender(this.chart, position, axis.labels[position] ? axis.labels[position] : position.toString());
            }
        }
        axis.getMaxLabelWidth(this.chart);
    };
    /**
     * Get module name
     */
    Category.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Category';
    };
    /**
     * To destroy the category axis.
     * @return {void}
     * @private
     */
    Category.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return Category;
}(Double));

var __extends$12 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Logarithmic module is used to render log axis.
 */
var Logarithmic = /** @class */ (function (_super) {
    __extends$12(Logarithmic, _super);
    /**
     * Constructor for the logerithmic module.
     * @private
     */
    function Logarithmic(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * The method to calculate the range and labels for the axis.
     * @return {void}
     */
    Logarithmic.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.calculateVisibleRange(size, axis);
        this.calculateVisibleLabels(axis, this.chart);
    };
    /**
     * Calculates actual range for the axis.
     * @private
     */
    Logarithmic.prototype.getActualRange = function (axis, size) {
        this.initializeDoubleRange(axis);
        this.min = this.min < 0 ? 0 : this.min;
        var logStart = logBase(this.min, axis.logBase);
        logStart = isFinite(logStart) ? logStart : this.min;
        var logEnd = logBase(this.max, axis.logBase);
        logEnd = isFinite(logStart) ? logEnd : this.max;
        this.min = Math.floor(logStart / 1);
        this.max = Math.ceil(logEnd / 1);
        axis.actualRange.interval = axis.interval || this.calculateLogNiceInterval(this.max - this.min, size, axis);
        axis.actualRange.min = this.min;
        axis.actualRange.max = this.max;
        axis.actualRange.delta = this.max - this.min;
    };
    /**
     * Calculates visible range for the axis.
     * @private
     */
    Logarithmic.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = {
            interval: axis.actualRange.interval, max: axis.actualRange.max,
            min: axis.actualRange.min, delta: axis.actualRange.delta
        };
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                this.calculateLogNiceInterval(axis.doubleRange.delta, size, axis)
                : axis.visibleRange.interval;
            axis.visibleRange.interval = Math.floor(axis.visibleRange.interval) === 0 ? 1 : Math.floor(axis.visibleRange.interval);
        }
    };
    /**
     * Calculates log iInteval for the axis.
     * @private
     */
    Logarithmic.prototype.calculateLogNiceInterval = function (delta, size, axis) {
        var actualDesiredIntervalsCount = axis.getActualDesiredIntervalsCount(size);
        var niceInterval = delta;
        var minInterval = Math.pow(10, Math.floor(logBase(niceInterval, 10)));
        for (var j = 0, len = axis.intervalDivs.length; j < len; j++) {
            var currentInterval = minInterval * axis.intervalDivs[j];
            if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    };
    /**
     * Calculates labels for the axis.
     * @private
     */
    Logarithmic.prototype.calculateVisibleLabels = function (axis, chart) {
        /*! Generate axis labels */
        var tempInterval = axis.visibleRange.min;
        axis.visibleLabels = [];
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        }
        var axisFormat = this.getFormat(axis);
        var isCustomFormat = axisFormat.match('{value}') !== null;
        axis.format = chart.intl.getNumberFormat({ format: isCustomFormat ? '' : axisFormat,
            useGrouping: chart.useGroupingSeparator });
        axis.startLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.min));
        axis.endLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.max));
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.visibleRange)) {
                axis.triggerLabelRender(this.chart, tempInterval, this.formatValue(axis, isCustomFormat, axisFormat, Math.pow(axis.logBase, tempInterval)));
            }
        }
        axis.getMaxLabelWidth(this.chart);
    };
    /**
     * Get module name
     */
    Logarithmic.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Logarithmic';
    };
    /**
     * To destroy the category axis.
     * @return {void}
     * @private
     */
    Logarithmic.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return Logarithmic;
}(Double));

/**
 * StripLine src
 */
/**
 * `StripLine` module used to render the stripLine in chart.
 */
var StripLine = /** @class */ (function () {
    function StripLine() {
    }
    StripLine.prototype.measureStripLine = function (axis, stripline, seriesClipRect) {
        var rect = this.getFromTovalue(stripline.start, stripline.end, stripline.size, stripline.startFromAxis, axis);
        var height = (axis.orientation === 'Vertical') ? (rect.to - rect.from) * axis.rect.height : seriesClipRect.height;
        var width = (axis.orientation === 'Horizontal') ? (rect.to - rect.from) * axis.rect.width : seriesClipRect.width;
        var x = (axis.orientation === 'Vertical') ? seriesClipRect.x : ((rect.from * axis.rect.width) + axis.rect.x);
        var y = (axis.orientation === 'Horizontal') ? seriesClipRect.y : (axis.rect.y + axis.rect.height -
            (rect.to * axis.rect.height));
        if (height !== 0 && width !== 0) {
            return new Rect(x, y, width, height);
        }
        return new Rect(0, 0, 0, 0);
    };
    /**
     * To get from to value from start, end, size, start from axis
     */
    StripLine.prototype.getFromTovalue = function (start, end, size, startFromAxis, axis) {
        var from = startFromAxis ? axis.visibleRange.min : this.findValue(Math.min(start, isNullOrUndefined(end) ? start : end), axis);
        var to = this.findValue(this.getToValue(Math.max(start, isNullOrUndefined(end) ? start : end), from, size, axis, end), axis);
        return { from: valueToCoefficient(axis.isInversed ? to : from, axis), to: valueToCoefficient(axis.isInversed ? from : to, axis) };
    };
    StripLine.prototype.getToValue = function (to, from, size, axis, end) {
        if (axis.valueType === 'DateTime') {
            return (isNullOrUndefined(end) ? new Date(new Date(from).getTime() + size) : to);
        }
        else {
            return isNullOrUndefined(end) ? (axis.valueType === 'Logarithmic' ? Math.pow(axis.logBase, from) : from) + size : to;
        }
    };
    StripLine.prototype.findValue = function (value, axis) {
        if (axis.valueType === 'Logarithmic') {
            value = logBase(value, axis.logBase);
        }
        if (value < axis.visibleRange.min) {
            value = axis.visibleRange.min;
        }
        else if (value > axis.visibleRange.max) {
            value = axis.visibleRange.max;
        }
        return value;
    };
    /**
     * To render striplines based start and end.
     * @private
     * @param chart
     * @param position
     * @param axes
     */
    StripLine.prototype.renderStripLine = function (chart, position, axes) {
        var id = chart.element.id + '_stripline_' + position + '_';
        var striplineGroup = chart.renderer.createGroup({ id: id + 'collections' });
        var seriesClipRect = chart.chartAxisLayoutPanel.seriesClipRect;
        var rect;
        var count = 0;
        for (var _i = 0, axes_1 = axes; _i < axes_1.length; _i++) {
            var axis = axes_1[_i];
            for (var _a = 0, _b = axis.stripLines; _a < _b.length; _a++) {
                var stripline = _b[_a];
                if (stripline.visible && stripline.zIndex === position) {
                    rect = this.measureStripLine(axis, stripline, seriesClipRect);
                    this.renderRectangle(stripline, rect, id + 'rect_' + count, striplineGroup, chart);
                    this.renderText(stripline, rect, id + 'text_' + count, striplineGroup, chart, axis);
                    count++;
                }
            }
        }
        chart.svgObject.appendChild(striplineGroup);
    };
    StripLine.prototype.renderRectangle = function (stripline, rect, id, parent, chart) {
        parent.appendChild(chart.renderer.drawRectangle(new RectOption(id, stripline.color, stripline.border, stripline.opacity, rect, 0, 0, '', '')));
    };
    StripLine.prototype.renderText = function (stripline, rect, id, parent, chart, axis) {
        var textSize = measureText(stripline.text, stripline.textStyle);
        var textMid = 3 * (textSize.height / 8);
        var ty = rect.y + (rect.height / 2) + textMid;
        var rotation = (stripline.rotation === null) ? ((axis.orientation === 'Vertical') ? 0 : -90) : stripline.rotation;
        var tx = rect.x + (rect.width / 2);
        var alignment;
        var anchor;
        var padding = 5;
        if (axis.orientation === 'Horizontal') {
            tx = this.getTextStart(tx + (textMid * this.factor(stripline.horizontalAlignment)), rect.width, stripline.horizontalAlignment);
            ty = this.getTextStart(ty - textMid, rect.height, stripline.verticalAlignment);
            alignment = this.invertAlignment(stripline.verticalAlignment);
        }
        else {
            tx = this.getTextStart(tx, rect.width, stripline.horizontalAlignment);
            ty = this.getTextStart(ty + (textMid * this.factor(stripline.verticalAlignment)) - padding, rect.height, stripline.verticalAlignment);
            alignment = stripline.horizontalAlignment;
        }
        anchor = alignment;
        textElement(new TextOption(id, tx, ty, anchor, stripline.text, 'rotate(' + rotation + ' ' + tx + ',' + ty + ')', 'middle'), stripline.textStyle, stripline.textStyle.color, parent);
    };
    StripLine.prototype.invertAlignment = function (anchor) {
        switch (anchor) {
            case 'Start':
                anchor = 'End';
                break;
            case 'End':
                anchor = 'Start';
                break;
        }
        return anchor;
    };
    StripLine.prototype.factor = function (anchor) {
        var factor = 0;
        switch (anchor) {
            case 'Start':
                factor = 1;
                break;
            case 'End':
                factor = -1;
                break;
        }
        return factor;
    };
    StripLine.prototype.getTextStart = function (xy, size, textAlignment) {
        var padding = 5;
        switch (textAlignment) {
            case 'Start':
                xy = xy - (size / 2) + padding;
                break;
            case 'End':
                xy = xy + (size / 2) - padding;
                break;
        }
        return xy;
    };
    /**
     * To get the module name for `StripLine`.
     * @private
     */
    StripLine.prototype.getModuleName = function () {
        return 'StripLine';
    };
    /**
     * To destroy the `StripLine` module.
     * @private
     */
    StripLine.prototype.destroy = function () {
        // destroy peform here
    };
    return StripLine;
}());

/**
 * render Line series
 */
var LineBase = /** @class */ (function () {
    /** @private */
    function LineBase(chartModule) {
        this.chart = chartModule;
        this.padding = 5;
    }
    /**
     * To improve the chart performance.
     * @return {void}
     * @private
     */
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
        for (var _i = 0, seriesPoints_1 = seriesPoints; _i < seriesPoints_1.length; _i++) {
            var currentPoint_1 = seriesPoints_1[_i];
            currentPoint_1.symbolLocations = [];
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
    /**
     * To append the line path.
     * @return {void}
     * @private
     */
    LineBase.prototype.appendLinePath = function (options, series) {
        var htmlObject = series.chart.renderer.drawPath(options);
        series.pathElement = htmlObject;
        series.seriesElement.appendChild(htmlObject);
        series.isRectSeries = false;
    };
    /**
     * To render the marker for the series.
     * @return {void}
     * @private
     */
    LineBase.prototype.renderMarker = function (series) {
        if (series.marker.visible) {
            series.chart.markerRender.render(series);
        }
    };
    /**
     * To do the progressive animation.
     * @return {void}
     */
    LineBase.prototype.doProgressiveAnimation = function (series, option) {
        var animation = new Animation({});
        var path = series.pathElement;
        var strokeDashArray = path.getAttribute('stroke-dasharray');
        var pathLength = series.pathElement.getTotalLength();
        var currentTime;
        path.style.visibility = 'hidden';
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
    /**
     * To do the linear animation.
     * @return {void}
     */
    LineBase.prototype.doLinearAnimation = function (series, animation) {
        var clipRect = series.clipRectElement.childNodes[0].childNodes[0];
        var effect = getAnimationFunction('Linear');
        var elementHeight = +clipRect.getAttribute('height');
        var elementWidth = +clipRect.getAttribute('width');
        var xCenter = +clipRect.getAttribute('x');
        var yCenter = series.chart.requireInvertedAxis ? +clipRect.getAttribute('height') + +clipRect.getAttribute('y') :
            +clipRect.getAttribute('y');
        var value;
        clipRect.style.visibility = 'hidden';
        new Animation({}).animate(clipRect, {
            duration: animation.duration,
            delay: animation.delay,
            progress: function (args) {
                if (args.timeStamp >= args.delay) {
                    clipRect.style.visibility = 'visible';
                    if (series.chart.requireInvertedAxis) {
                        value = effect(args.timeStamp - args.delay, 0, elementHeight, args.duration);
                        clipRect.setAttribute('transform', 'translate(' + xCenter + ' ' + yCenter +
                            ') scale(1,' + (value / elementHeight) + ') translate(' + (-xCenter) + ' ' + (-yCenter) + ')');
                    }
                    else {
                        value = effect(args.timeStamp - args.delay, 0, elementWidth, args.duration);
                        clipRect.setAttribute('transform', 'translate(' + xCenter + ' ' + yCenter +
                            ') scale(' + (value / elementWidth) + ', 1) translate(' + (-xCenter) + ' ' + (-yCenter) + ')');
                    }
                }
            },
            end: function (model) {
                clipRect.setAttribute('transform', 'translate(0,0)');
                series.chart.trigger('animationComplete', { series: series });
            }
        });
    };
    return LineBase;
}());

var __extends$13 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Line Module used to render the line series.
 */
var LineSeries = /** @class */ (function (_super) {
    __extends$13(LineSeries, _super);
    function LineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Line Series.
     * @return {void}.
     * @private
     */
    LineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var point1;
        var point2;
        var direction = '';
        var prevPoint = null;
        var startPoint = 'M';
        var options;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var visiblePoints = this.improveChartPerformance(series);
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (prevPoint != null) {
                    point1 = getCoordinate(prevPoint.xValue, prevPoint.yValue, xAxis, yAxis, isInverted, series);
                    point2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' +
                        'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    startPoint = 'L';
                }
                prevPoint = point;
                point.symbolLocations.push(getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series));
                point.regions.push(new Rect(point.symbolLocations[0].x - series.marker.width, point.symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
            else {
                prevPoint = (series.emptyPointSettings.mode === 'Drop') ? prevPoint : null;
                startPoint = (series.emptyPointSettings.mode === 'Drop') ? startPoint : 'M';
                point.symbolLocations = [];
            }
        }
        if (series.chart.chartAreaType === 'PolarRadar') {
            if (series.isClosed) {
                point2 = getCoordinate(visiblePoints[visiblePoints.length - 1].xValue, visiblePoints[visiblePoints.length - 1].yValue, xAxis, yAxis, isInverted, series);
                point1 = getCoordinate(visiblePoints[0].xValue, visiblePoints[0].yValue, xAxis, yAxis, isInverted, series);
                direction = direction.concat(startPoint + ' ' + point2.x + ' ' + point2.y + ' ' + 'L' + ' ' + point1.x + ' ' + point1.y);
            }
        }
        var name = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
            series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
                series.chart.element.id + '_Series_' + series.index;
        options = new PathOption(name, 'none', series.width, series.interior, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    LineSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doProgressiveAnimation(series, option);
    };
    /**
     * Get module name.
     */
    LineSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'LineSeries';
    };
    /**
     * To destroy the line series.
     * @return {void}
     * @private
     */
    LineSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return LineSeries;
}(LineBase));

/**
 * Column Series Base
 */
var ColumnBase = /** @class */ (function () {
    function ColumnBase() {
    }
    /**
     * To get the position of the column series.
     * @return {DoubleRange}
     * @private
     */
    ColumnBase.prototype.getSideBySideInfo = function (series) {
        if (series.chart.enableSideBySidePlacement && !series.position) {
            this.getSideBySidePositions(series);
        }
        var position = !series.chart.enableSideBySidePlacement ? 0 : series.position;
        var rectCount = !series.chart.enableSideBySidePlacement ? 1 : series.rectCount;
        series.isRectSeries = true;
        var visibleSeries = series.chart.visibleSeries;
        var seriesSpacing = series.chart.enableSideBySidePlacement ? series.columnSpacing : 0; // Column Spacing
        var pointSpacing = series.columnWidth; // Column width
        var minimumPointDelta = getMinPointsDelta(series.xAxis, visibleSeries);
        var width = minimumPointDelta * pointSpacing;
        var radius;
        var location = (position) / rectCount - 0.5;
        var doubleRange = new DoubleRange(location, location + (1 / rectCount));
        if (!(isNaN(doubleRange.start) || isNaN(doubleRange.end))) {
            doubleRange = new DoubleRange(doubleRange.start * width, doubleRange.end * width);
            radius = seriesSpacing * doubleRange.delta;
            doubleRange = new DoubleRange(doubleRange.start + radius / 2, doubleRange.end - radius / 2);
        }
        return doubleRange;
    };
    /**
     * To get the rect values.
     * @return {Rect}
     * @private
     */
    ColumnBase.prototype.getRectangle = function (x1, y1, x2, y2, series) {
        var point1 = getPoint(x1, y1, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        var point2 = getPoint(x2, y2, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        return new Rect(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y), Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
    };
    /**
     * To get the position of each series.
     * @return {void}
     * @private
     */
    ColumnBase.prototype.getSideBySidePositions = function (series) {
        var chart = series.chart;
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var columnItem = _a[_i];
            for (var _b = 0, _c = chart.rows; _b < _c.length; _b++) {
                var item = _c[_b];
                this.findRectPosition(series.findSeriesCollection(columnItem, item, false));
            }
        }
    };
    ColumnBase.prototype.findRectPosition = function (seriesCollection) {
        var stackingGroup = [];
        var vSeries = { rectCount: 0, position: null };
        seriesCollection.forEach(function (value) {
            if (value.type.indexOf('Stacking') !== -1) {
                if (value.stackingGroup) {
                    if (stackingGroup[value.stackingGroup] === undefined) {
                        value.position = vSeries.rectCount;
                        stackingGroup[value.stackingGroup] = vSeries.rectCount++;
                    }
                    else {
                        value.position = stackingGroup[value.stackingGroup];
                    }
                }
                else {
                    if (vSeries.position === null) {
                        value.position = vSeries.rectCount;
                        vSeries.position = vSeries.rectCount++;
                    }
                    else {
                        value.position = vSeries.position;
                    }
                }
            }
            else {
                value.position = vSeries.rectCount++;
            }
        });
        seriesCollection.forEach(function (value) {
            value.rectCount = vSeries.rectCount;
        });
    };
    /**
     * Updates the symbollocation for points
     * @return void
     * @private
     */
    ColumnBase.prototype.updateSymbolLocation = function (point, rect, series) {
        if (!series.chart.requireInvertedAxis) {
            this.updateXRegion(point, rect, series);
        }
        else {
            this.updateYRegion(point, rect, series);
        }
    };
    /**
     * Update the region for the point.
     * @return {void}
     * @private
     */
    ColumnBase.prototype.updateXRegion = function (point, rect, series) {
        point.regions.push(rect);
        point.symbolLocations.push({
            x: rect.x + (rect.width) / 2,
            y: (series.seriesType === 'BoxPlot' || series.seriesType.indexOf('HighLow') !== -1 ||
                (point.yValue >= 0 === !series.yAxis.isInversed)) ? rect.y : (rect.y + rect.height)
        });
    };
    /**
     * Update the region for the point in bar series.
     * @return {void}
     * @private
     */
    ColumnBase.prototype.updateYRegion = function (point, rect, series) {
        point.regions.push(rect);
        point.symbolLocations.push({
            x: (series.seriesType === 'BoxPlot' || series.seriesType.indexOf('HighLow') !== -1 ||
                (point.yValue >= 0 === !series.yAxis.isInversed)) ? rect.x + rect.width : rect.x,
            y: rect.y + rect.height / 2
        });
    };
    /**
     * To trigger the point rendering event.
     * @return {void}
     * @private
     */
    ColumnBase.prototype.triggerEvent = function (series, point, fill, border) {
        var argsData = {
            cancel: false, name: pointRender, series: series, point: point,
            fill: series.setPointColor(point, fill),
            border: series.setBorderColor(point, border)
        };
        series.chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        return argsData;
    };
    /**
     * To draw the rectangle for points.
     * @return {void}
     * @private
     */
    ColumnBase.prototype.drawRectangle = function (series, point, rect, argsData) {
        var check = series.chart.requireInvertedAxis ? rect.height : rect.width;
        if (check <= 0) {
            return null;
        }
        var direction = this.calculateRoundedRectPath(rect, series.cornerRadius.topLeft, series.cornerRadius.topRight, series.cornerRadius.bottomLeft, series.cornerRadius.bottomRight);
        var name = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name +
            '_Point_' + point.index : series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index;
        var options = new PathOption(name, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
        var element = series.chart.renderer.drawPath(options);
        switch (series.seriesType) {
            case 'XY':
                element.setAttribute('aria-label', point.x.toString() + ':' + point.yValue.toString());
                break;
            case 'HighLow':
                element.setAttribute('aria-label', point.x.toString() + ':' + point.high.toString() + ':' + point.low.toString());
                break;
        }
        series.seriesElement.appendChild(element);
    };
    /**
     * To animate the series.
     * @return {void}
     */
    ColumnBase.prototype.animate = function (series) {
        var rectElements = series.seriesElement.childNodes;
        var count = series.category === 'Indicator' ? 0 : 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.symbolLocations.length && !(series.type === 'BoxAndWhisker' && point.regions.length)) {
                continue;
            }
            this.animateRect(rectElements[count], series, point);
            count++;
        }
    };
    /**
     * To animate the series.
     * @return {void}
     * @private
     */
    ColumnBase.prototype.animateRect = function (element, series, point) {
        var option = series.animation;
        var effect = getAnimationFunction('Linear');
        var isPlot = point.yValue < 0;
        var x;
        var y;
        var elementHeight = +point.regions[0].height;
        var elementWidth = +point.regions[0].width;
        var centerX;
        var centerY;
        if (!series.chart.requireInvertedAxis) {
            x = +point.regions[0].x;
            if (series.type.indexOf('Stacking') > -1) {
                y = (1 - valueToCoefficient(0, series.yAxis)) * (series.yAxis.rect.height);
                centerX = x;
                centerY = y;
            }
            else {
                y = +point.regions[0].y;
                centerY = (series.seriesType.indexOf('HighLow') !== -1 || series.type.indexOf('Waterfall') !== -1) ? y + elementHeight / 2 :
                    (isPlot !== series.yAxis.isInversed) ? y : y + elementHeight;
                centerX = isPlot ? x : x + elementWidth;
            }
        }
        else {
            y = +point.regions[0].y;
            if (series.type.indexOf('Stacking') > -1) {
                x = (valueToCoefficient(0, series.yAxis)) * series.yAxis.rect.width;
                centerX = x;
                centerY = y;
            }
            else {
                x = +point.regions[0].x;
                centerY = isPlot ? y : y + elementHeight;
                centerX = (series.seriesType.indexOf('HighLow') !== -1 || series.type.indexOf('Waterfall') !== -1) ? x + elementWidth / 2 :
                    (isPlot !== series.yAxis.isInversed) ? x + elementWidth : x;
            }
        }
        var value;
        element.style.visibility = 'hidden';
        new Animation({}).animate(element, {
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
                var seriesElement = series.seriesElement;
                if (element === seriesElement.lastElementChild || point.index === series.points.length - 1 ||
                    (series.type === 'Waterfall' && element === seriesElement.children[seriesElement.childElementCount - 2])) {
                    series.chart.trigger('animationComplete', { series: series });
                    if (series.type === 'Waterfall') {
                        var rectElements = seriesElement.childNodes;
                        for (var i = 0; i < rectElements.length; i++) {
                            if (rectElements[i].id.indexOf('Connector') !== -1) {
                                rectElements[i].style.visibility = 'visible';
                                rectElements[i].setAttribute('transform', 'translate(0,0)');
                            }
                        }
                    }
                }
            }
        });
    };
    /**
     * To get rounded rect path direction
     */
    ColumnBase.prototype.calculateRoundedRectPath = function (rect, topLeft, topRight, bottomLeft, bottomRight) {
        return 'M' + ' ' + rect.x + ' ' + (topLeft + rect.y) +
            ' Q ' + rect.x + ' ' + rect.y + ' ' + (rect.x + topLeft) + ' ' +
            rect.y + ' ' + 'L' + ' ' + (rect.x + rect.width - topRight) + ' ' + rect.y +
            ' Q ' + (rect.x + rect.width) + ' ' + rect.y + ' ' +
            (rect.x + rect.width) + ' ' + (rect.y + topRight) + ' ' + 'L ' +
            (rect.x + rect.width) + ' ' + (rect.y + rect.height - bottomRight)
            + ' Q ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height) + ' ' + (rect.x + rect.width - bottomRight) + ' ' +
            (rect.y + rect.height) + ' ' + 'L ' + (rect.x + bottomLeft) + ' ' + (rect.y + rect.height) + ' Q ' + rect.x + ' ' +
            (rect.y + rect.height) + ' ' + rect.x + ' ' + (rect.y + rect.height - bottomLeft) + ' ' + 'L' + ' ' + rect.x + ' ' +
            (topLeft + rect.y) + ' ' + 'Z';
    };
    return ColumnBase;
}());

var __extends$14 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Column Module used to render the column series.
 */
var ColumnSeries = /** @class */ (function (_super) {
    __extends$14(ColumnSeries, _super);
    function ColumnSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Column series.
     * @return {void}
     * @private
     */
    ColumnSeries.prototype.render = function (series) {
        var rect;
        var sideBySideInfo = this.getSideBySideInfo(series);
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var pointColumn = _a[_i];
            pointColumn.symbolLocations = [];
            pointColumn.regions = [];
            if (pointColumn.visible && withInRange(series.points[pointColumn.index - 1], pointColumn, series.points[pointColumn.index + 1], series)) {
                rect = this.getRectangle(pointColumn.xValue + sideBySideInfo.start, pointColumn.yValue, pointColumn.xValue + sideBySideInfo.end, origin, series);
                var color = series.category === 'Indicator' ? pointColumn.color : series.interior;
                argsData = this.triggerEvent(series, pointColumn, color, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.updateSymbolLocation(pointColumn, rect, series);
                    this.drawRectangle(series, pointColumn, rect, argsData);
                }
            }
        }
    };
    /**
     * Animates the series.
     * @return {void}
     * @private
     */
    ColumnSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * Get module name.
     */
    ColumnSeries.prototype.getModuleName = function () {
        return 'ColumnSeries';
        /**
         * return the module name
         */
    };
    /**
     * To destroy the column series.
     * @return {void}
     * @private
     */
    ColumnSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return ColumnSeries;
}(ColumnBase));

var __extends$15 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Area Module used to render the Area series.
 */
var AreaSeries = /** @class */ (function (_super) {
    __extends$15(AreaSeries, _super);
    function AreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Area series.
     * @return {void}
     * @private
     */
    AreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var firstPoint;
        var endPoint;
        var startPoint = null;
        var direction = '';
        var pointsLength = series.points.length;
        var origin = series.chart.chartAreaType === 'PolarRadar' ? series.points[0].yValue :
            Math.max(series.yAxis.visibleRange.min, 0);
        var options;
        var point;
        var currentXValue;
        var symbolLocation;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (var i = 0; i < pointsLength; i++) {
            point = series.points[i];
            currentXValue = point.xValue;
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                if (startPoint === null) {
                    startPoint = new ChartLocation(currentXValue, origin);
                    // Start point for the current path
                    firstPoint = getCoordinate(currentXValue, origin, xAxis, yAxis, isInverted, series);
                    direction += ('M' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                }
                // First Point to draw the area path
                firstPoint = getCoordinate(currentXValue, point.yValue, xAxis, yAxis, isInverted, series);
                direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                if (series.points[i + 1] && !series.points[i + 1].visible && series.emptyPointSettings.mode !== 'Drop') {
                    // current start point
                    firstPoint = getCoordinate(currentXValue, origin, xAxis, yAxis, isInverted, series);
                    // current end point
                    endPoint = getCoordinate(startPoint.x, startPoint.y, xAxis, yAxis, isInverted, series);
                    direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ' + 'L' +
                        ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
                    startPoint = null;
                }
                symbolLocation = getCoordinate(currentXValue, point.yValue, xAxis, yAxis, isInverted, series);
                point.symbolLocations.push(symbolLocation);
                point.regions.push(new Rect(symbolLocation.x - series.marker.width, symbolLocation.y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
        }
        if (pointsLength > 1) {
            startPoint = {
                'x': series.points[pointsLength - 1].xValue,
                'y': series.chart.chartAreaType === 'PolarRadar' ? series.points[pointsLength - 1].yValue : origin
            };
            endPoint = getCoordinate(startPoint.x, startPoint.y, xAxis, yAxis, isInverted, series);
            direction += ('L' + ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
        }
        else {
            direction = '';
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    /**
     * To destroy the area series.
     * @return {void}
     * @private
     */
    AreaSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    /**
     * Get module name
     */
    AreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'AreaSeries';
    };
    /**
     * Animates the series.
     * @return {void}
     * @private
     */
    AreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    return AreaSeries;
}(LineBase));

var __extends$16 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Bar Module used to render the bar series.
 */
var BarSeries = /** @class */ (function (_super) {
    __extends$16(BarSeries, _super);
    function BarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Bar series.
     * @return {void}
     * @private
     */
    BarSeries.prototype.render = function (series) {
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var sideBySideInfo = this.getSideBySideInfo(series);
        var rect;
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var pointBar = _a[_i];
            pointBar.symbolLocations = [];
            pointBar.regions = [];
            if (pointBar.visible && withInRange(series.points[pointBar.index - 1], pointBar, series.points[pointBar.index + 1], series)) {
                rect = this.getRectangle(pointBar.xValue + sideBySideInfo.start, pointBar.yValue, pointBar.xValue + sideBySideInfo.end, origin, series);
                argsData = this.triggerEvent(series, pointBar, series.interior, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.updateSymbolLocation(pointBar, rect, series);
                    this.drawRectangle(series, pointBar, rect, argsData);
                }
            }
        }
    };
    /**
     * Animates the series.
     * @return {void}
     * @private
     */
    BarSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the bar series.
     * @return {void}
     * @private
     */
    BarSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Get module name
     */
    BarSeries.prototype.getModuleName = function () {
        return 'BarSeries';
    };
    return BarSeries;
}(ColumnBase));

var __extends$18 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PolarRadarPanel = /** @class */ (function (_super) {
    __extends$18(PolarRadarPanel, _super);
    function PolarRadarPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Measure the polar radar axis size.
     * @return {void}
     * @private
     */
    PolarRadarPanel.prototype.measureAxis = function (rect) {
        var chart = this.chart;
        this.initialClipRect = rect;
        this.seriesClipRect = new Rect(rect.x, rect.y, rect.width, rect.height);
        //Measure axis size calculation
        this.measureRowAxis(chart, this.initialClipRect);
        this.measureColumnAxis(chart, this.initialClipRect);
        this.calculateAxisSize();
    };
    PolarRadarPanel.prototype.measureRowAxis = function (chart, rect) {
        this.calculateRowSize(rect);
        var row = chart.rows[0];
        this.measureDefinition(row, chart, new Size(chart.availableSize.width, row.computedHeight), rect);
    };
    PolarRadarPanel.prototype.measureColumnAxis = function (chart, rect) {
        this.calculateColumnSize(rect);
        var column = chart.columns[0];
        this.measureDefinition(column, chart, new Size(column.computedWidth, chart.availableSize.height), rect);
    };
    /**
     * Measure the column and row in chart.
     * @return {void}
     * @private
     */
    PolarRadarPanel.prototype.measureDefinition = function (definition, chart, size, clipRect) {
        for (var _i = 0, _a = definition.axes; _i < _a.length; _i++) {
            var axis = _a[_i];
            axis.getModule(chart);
            axis.baseModule.calculateRangeAndInterval(size, axis);
        }
    };
    /**
     * Measure the axis.
     * @return {void}
     * @private
     */
    PolarRadarPanel.prototype.calculateAxisSize = function () {
        var chart = this.chart;
        var axis;
        var padding = 5;
        this.centerX = this.initialClipRect.width * 0.5 + this.initialClipRect.x;
        this.centerY = this.initialClipRect.height * 0.5 + this.initialClipRect.y;
        chart.radius = Math.min(this.initialClipRect.width, this.initialClipRect.height) / 2 - padding -
            chart.primaryXAxis.majorTickLines.height - chart.primaryXAxis.maxLabelSize.height;
        chart.radius = (chart.primaryXAxis.coefficient * chart.radius) / 100;
        this.seriesClipRect.y = this.centerY - chart.radius;
        this.seriesClipRect.x = this.centerX - chart.radius;
        this.seriesClipRect.height = 2 * chart.radius;
        this.seriesClipRect.width = 2 * chart.radius;
        this.calculateRowSize(this.seriesClipRect);
        axis = chart.primaryYAxis;
        axis.rect = this.seriesClipRect;
        this.calculateColumnSize(this.seriesClipRect);
        axis = chart.primaryXAxis;
        axis.rect = this.seriesClipRect;
    };
    /**
     * Measure the axis.
     * @return {void}
     * @private
     */
    PolarRadarPanel.prototype.measure = function () {
        var chart = this.chart;
        chart.verticalAxes.push(chart.primaryYAxis);
        var row = chart.rows[0];
        row.axes[0] = chart.primaryYAxis;
        chart.rows[0] = row;
        chart.horizontalAxes.push(chart.primaryXAxis);
        var column = chart.columns[0];
        column.axes[0] = chart.primaryXAxis;
        chart.columns[0] = column;
    };
    /**
     * Measure the row size.
     * @return {void}
     */
    PolarRadarPanel.prototype.calculateRowSize = function (rect) {
        /*! Calculate row size */
        var chart = this.chart;
        var row = chart.rows[0];
        row.computedHeight = rect.height / 2;
        row.computedTop = rect.y;
        chart.rows[0] = row;
    };
    /**
     * Measure the row size.
     * @return {void}
     */
    PolarRadarPanel.prototype.calculateColumnSize = function (rect) {
        /*! Calculate column size */
        var chart = this.chart;
        var column = chart.columns[0];
        column.computedLeft = rect.x;
        column.computedWidth = rect.width;
        chart.columns[0] = column;
    };
    /**
     * To render the axis element.
     * @return {void}
     * @private
     */
    PolarRadarPanel.prototype.renderAxes = function () {
        var axis;
        var chart = this.chart;
        this.startAngle = chart.primaryXAxis.startAngle;
        var axisElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisCollection' });
        for (var i = 0, len = chart.axisCollections.length; i < len; i++) {
            this.element = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i });
            axis = chart.axisCollections[i];
            if (axis.orientation === 'Horizontal') {
                if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                    this.drawXAxisGridLine(axis, i);
                }
                if (axis.visible) {
                    this.drawXAxisLabels(axis, i);
                }
            }
            else {
                this.drawYAxisGridLine(axis, i);
                if (axis.lineStyle.width > 0) {
                    this.drawYAxisLine(axis, i, axis.plotOffset, 0);
                }
                if (axis.visible) {
                    this.drawYAxisLabels(axis, i);
                }
            }
            axisElement.appendChild(this.element);
        }
        axisElement.appendChild(this.element);
        chart.svgObject.appendChild(axisElement);
    };
    PolarRadarPanel.prototype.drawYAxisLine = function (axis, index, plotX, plotY) {
        var chart = this.chart;
        var optionsLine = {};
        var vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[0].value, axis), this.startAngle);
        var axisLine = 'M ' + this.centerX + ' ' + this.centerY + 'L ' +
            (this.centerX + chart.radius * vector.x) + ' ' + (this.centerY + chart.radius * vector.y);
        optionsLine = {
            'id': chart.element.id + 'AxisLine_' + index,
            'd': axisLine,
            'stroke-dasharray': axis.lineStyle.dashArray,
            'stroke-width': axis.lineStyle.width,
            'stroke': axis.lineStyle.color
        };
        chart.yAxisElements.appendChild(chart.renderer.drawPath(optionsLine));
    };
    PolarRadarPanel.prototype.drawYAxisLabels = function (axis, index) {
        var chart = this.chart;
        var elementSize;
        var options;
        var pointX = 0;
        var pointY = 0;
        var vector;
        var angle = this.startAngle < 0 ? this.startAngle + 360 : this.startAngle;
        var anchor = 'middle';
        var radius;
        var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[0].value, axis), this.startAngle);
        for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
            radius = chart.radius * valueToCoefficient(axis.visibleLabels[i].value, axis);
            elementSize = axis.visibleLabels[i].size;
            radius = chart.radius * valueToCoefficient(axis.visibleLabels[i].value, axis);
            pointX = (this.centerX + radius * vector.x) -
                (axis.majorTickLines.height + elementSize.width / 2) * (Math.cos(angle * Math.PI / 180));
            pointY = (this.centerY + radius * vector.y) -
                (axis.majorTickLines.height + elementSize.height / 2) * (Math.sin(angle * Math.PI / 180));
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY + (elementSize.height / 4), anchor, axis.visibleLabels[i].text);
            textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement);
        }
        chart.yAxisElements.appendChild(labelElement);
    };
    PolarRadarPanel.prototype.drawYAxisGridLine = function (axis, index) {
        var chart = this.chart;
        var options;
        var radius;
        var majorTick = '';
        var majorGrid = '';
        var vector;
        var vector2;
        var angle = this.startAngle < 0 ? this.startAngle + 360 : this.startAngle;
        var rect = axis.rect;
        var x1;
        var y1;
        var x2;
        var y2;
        if (axis.majorGridLines.width > 0) {
            if (chart.visibleSeries[0].type === 'Polar') {
                for (var j = 0; j < axis.visibleLabels.length; j++) {
                    radius = chart.radius * valueToCoefficient(axis.visibleLabels[j].value, axis);
                    options = new CircleOption(chart.element.id + '_MajorGridLine_' + index, 'transparent', axis.majorGridLines, axis.majorGridLines.width, this.centerX, this.centerY, radius);
                    this.element.appendChild(chart.renderer.drawCircle(options));
                }
            }
            else {
                for (var j = 0; j < axis.visibleLabels.length; j++) {
                    radius = chart.radius * valueToCoefficient(axis.visibleLabels[j].value, axis);
                    for (var i = 0, len = chart.primaryXAxis.visibleLabels.length; i < len; i++) {
                        vector = CoefficientToVector(valueToPolarCoefficient(chart.primaryXAxis.visibleLabels[i].value, chart.primaryXAxis), this.startAngle);
                        if (i + 1 < len) {
                            vector2 = CoefficientToVector(valueToPolarCoefficient(chart.primaryXAxis.visibleLabels[i + 1].value, chart.primaryXAxis), this.startAngle);
                        }
                        else {
                            vector2 = CoefficientToVector(valueToPolarCoefficient(chart.primaryXAxis.visibleLabels[0].value, chart.primaryXAxis), this.startAngle);
                        }
                        x1 = this.centerX + radius * vector.x;
                        y1 = this.centerY + radius * vector.y;
                        x2 = this.centerX + radius * vector2.x;
                        y2 = this.centerY + radius * vector2.y;
                        majorGrid = majorGrid.concat('M' + ' ' + x1 + ' ' + y1 + ' ' + 'L' + ' ' + x2 + ' ' + y2 + ' ');
                    }
                }
                options = new PathOption(chart.element.id + '_MajorGridLine_' + index, 'transparent', axis.majorGridLines.width, axis.majorGridLines.color, null, null, majorGrid);
                this.element.appendChild(chart.renderer.drawPath(options));
            }
        }
        if (axis.majorTickLines.width > 0) {
            vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[0].value, axis), this.startAngle);
            for (var i = 0; i < axis.visibleLabels.length; i++) {
                radius = chart.radius * valueToCoefficient(axis.visibleLabels[i].value, axis);
                x1 = this.centerX + radius * vector.x;
                y1 = this.centerY + radius * vector.y;
                x2 = x1 - axis.majorTickLines.height * (Math.cos(angle * Math.PI / 180));
                y2 = y1 - axis.majorTickLines.height * (Math.sin(angle * Math.PI / 180));
                majorTick = majorTick.concat('M ' + x1 + ' ' + y1 +
                    ' L ' + x2 + ' ' + y2 + ' ');
            }
        }
        this.renderTickLine(axis, index, majorTick, '');
    };
    PolarRadarPanel.prototype.drawXAxisGridLine = function (axis, index) {
        var chart = this.chart;
        var tempInterval;
        var vector;
        var majorGrid = '';
        var majorTick = '';
        var minorGirdLine = '';
        var minorTickLine = '';
        var x1 = this.centerX;
        var x2;
        var y1 = this.centerY;
        var y2;
        var minorDirection;
        var tickSize = axis.majorTickLines.height;
        var rect = axis.rect;
        var length = axis.visibleLabels.length;
        //Gridlines
        for (var i = 0; i < length; i++) {
            tempInterval = axis.visibleLabels[i].value;
            vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[i].value, axis), this.startAngle);
            x2 = this.centerX + chart.radius * vector.x;
            y2 = this.centerY + chart.radius * vector.y;
            majorGrid = majorGrid.concat('M ' + x1 + ' ' + y1 + ' ' + 'L' + x2 + ' ' + y2);
            majorTick = majorTick.concat('M ' + x2 + ' ' + y2 +
                ' L ' + (x2 + axis.majorTickLines.height * vector.x) + ' ' + (y2 + axis.majorTickLines.height * vector.y) + ' ');
            if (axis.minorTicksPerInterval > 0 && (axis.minorGridLines.width > 0 || axis.minorTickLines.width > 0)
                && axis.valueType !== 'Category' && chart.visibleSeries[0].type !== 'Radar') {
                minorDirection = this.drawAxisMinorLine(axis, tempInterval, minorGirdLine, minorTickLine);
                minorGirdLine = minorDirection[0];
                minorTickLine = minorDirection[1];
            }
        }
        this.renderTickLine(axis, index, majorTick, minorTickLine);
        this.renderGridLine(axis, index, majorGrid, minorGirdLine);
    };
    PolarRadarPanel.prototype.drawAxisMinorLine = function (axis, tempInterval, minorGird, minorTick) {
        var value = tempInterval;
        var x;
        var y;
        var vector;
        var range = axis.visibleRange;
        var direction = [];
        var tickSize = axis.minorTickLines.height;
        var rect = axis.rect;
        for (var j = 0; j < axis.minorTicksPerInterval; j++) {
            value += (axis.valueType === 'DateTime' ? axis.dateTimeInterval : axis.visibleRange.interval) /
                (axis.minorTicksPerInterval + 1);
            if (inside(value, range)) {
                vector = CoefficientToVector(valueToPolarCoefficient(value, axis), this.startAngle);
                x = this.centerX + this.chart.radius * vector.x;
                y = this.centerY + this.chart.radius * vector.y;
                minorGird = minorGird.concat('M' + ' ' + this.centerX + ' ' + this.centerY
                    + 'L ' + x + ' ' + y);
                minorTick = minorTick.concat('M' + ' ' + x + ' ' + y + 'L' + ' ' + (x + axis.minorTickLines.height * vector.x) + ' ' +
                    (y + (axis.minorTickLines.height * vector.y)));
            }
        }
        direction.push(minorGird);
        direction.push(minorTick);
        return direction;
    };
    /**
     * To render the axis label.
     * @return {void}
     * @private
     */
    PolarRadarPanel.prototype.drawXAxisLabels = function (axis, index) {
        var chart = this.chart;
        var pointX = 0;
        var pointY = 0;
        var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        var options;
        var vector;
        var labelText;
        var firstLabelX;
        var padding = 5;
        var lastLabelX;
        var textAnchor = '';
        var ticksbwtLabel = axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks'
            && chart.visibleSeries[0].type !== 'Radar' ? 0.5 : 0;
        var radius = chart.radius + axis.majorTickLines.height;
        for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
            vector = CoefficientToVector(valueToPolarCoefficient(axis.visibleLabels[i].value + ticksbwtLabel, axis), this.startAngle);
            if (!isNaN(vector.x) && !isNaN(vector.y)) {
                pointX = this.centerX + (radius + axis.majorTickLines.height + padding) * vector.x;
                pointY = this.centerY + (radius + axis.majorTickLines.height + padding) * vector.y;
                textAnchor = parseFloat(pointX.toFixed(1)) === parseFloat(this.centerX.toFixed(1)) ? 'middle' :
                    (pointX < this.centerX) ? 'end' : 'start';
            }
            labelText = axis.visibleLabels[i].text;
            if (i === 0) {
                firstLabelX = pointX;
            }
            else if (i === axis.visibleLabels.length - 1 && axis.valueType !== 'Category') {
                lastLabelX = measureText(labelText, axis.labelStyle).height;
                lastLabelX += pointX;
                labelText = (lastLabelX > firstLabelX) ? '' : labelText;
            }
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, textAnchor, labelText, '', 'central');
            textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement);
        }
        this.element.appendChild(labelElement);
    };
    PolarRadarPanel.prototype.renderTickLine = function (axis, index, majorTickLine, minorTickLine) {
        var tickOptions;
        var chart = this.chart;
        if (axis.majorTickLines.width > 0) {
            tickOptions = new PathOption(chart.element.id + '_MajorTickLine_' + index, 'transparent', axis.majorTickLines.width, axis.majorTickLines.color, null, null, majorTickLine);
            chart.yAxisElements.appendChild(chart.renderer.drawPath(tickOptions));
        }
        if (axis.minorTickLines.width > 0) {
            tickOptions = new PathOption(chart.element.id + '_MinorTickLine_' + index, 'transparent', axis.minorTickLines.width, axis.minorTickLines.color, null, null, minorTickLine);
            chart.yAxisElements.appendChild(chart.renderer.drawPath(tickOptions));
        }
    };
    PolarRadarPanel.prototype.renderGridLine = function (axis, index, majorGrid, minorGird) {
        var chart = this.chart;
        var gridOptions;
        if (axis.majorGridLines.width > 0) {
            gridOptions = new PathOption(chart.element.id + '_MajorGridLine_' + index, 'transparent', axis.majorGridLines.width, axis.majorGridLines.color, null, axis.majorGridLines.dashArray, majorGrid);
            this.element.appendChild(chart.renderer.drawPath(gridOptions));
        }
        if (axis.minorGridLines.width > 0) {
            gridOptions = new PathOption(chart.element.id + '_MinorGridLine_' + index, 'transparent', axis.minorGridLines.width, axis.minorGridLines.color, null, axis.minorGridLines.dashArray, minorGird);
            this.element.appendChild(chart.renderer.drawPath(gridOptions));
        }
    };
    return PolarRadarPanel;
}(LineBase));

var __extends$17 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `PolarSeries` Module used to render the polar series.
 */
var PolarSeries = /** @class */ (function (_super) {
    __extends$17(PolarSeries, _super);
    function PolarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Polar Series.
     * @return {void}.
     * @private
     */
    PolarSeries.prototype.render = function (series) {
        var seriesType = firstToLowerCase(series.drawType);
        if (series.drawType.indexOf('Column') > -1) {
            this.columnDrawTypeRender(series);
        }
        else {
            series.chart[seriesType + 'SeriesModule'].render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        }
    };
    /**
     * Render Column DrawType.
     * @return {void}.
     * @private
     */
    PolarSeries.prototype.columnDrawTypeRender = function (series) {
        var visiblePoints = series.points;
        var options;
        var argsData;
        var startAngle;
        var endAngle;
        var itemCurrentXPos;
        var radius;
        var pointStartAngle;
        var pointEndAngle;
        var x1;
        var x2;
        var y1;
        var y2;
        var startValue;
        var endValue;
        var innerRadius;
        var centerX = (series.clipRect.width / 2) + series.clipRect.x;
        var dStartX;
        var dStartY;
        var centerY = (series.clipRect.height / 2) + series.clipRect.y;
        var dEndX;
        var dEndY;
        var axisInversed = series.xAxis.isInversed ? 1 : 0;
        var direction = '';
        var sumofYValues = 0;
        var interval = (series.points[1] ? series.points[1].xValue : 2 * series.points[0].xValue) - series.points[0].xValue;
        var ticks = series.xAxis.valueType === 'Category' && series.xAxis.labelPlacement === 'BetweenTicks' ? 0 : interval / 2;
        var rangeInterval = series.xAxis.valueType === 'DateTime' ? series.xAxis.dateTimeInterval : 1;
        var min = series.xAxis.actualRange.min;
        var inversedValue;
        var vector;
        this.getSeriesPosition(series);
        var position = series.xAxis.isInversed ? (series.rectCount - 1 - series.position) : series.position;
        var ticksbwtLabel = series.xAxis.valueType === 'Category' && series.xAxis.labelPlacement === 'BetweenTicks' ? 0.5
            : 0.5 - (series.rectCount / 2);
        do {
            sumofYValues += rangeInterval;
            min += rangeInterval;
        } while (min <= series.xAxis.actualRange.max - (series.xAxis.valueType === 'Category' ? 0 : 1));
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                inversedValue = series.xAxis.isInversed ? (series.xAxis.visibleRange.max - point.xValue) :
                    point.xValue - series.xAxis.visibleRange.min;
                itemCurrentXPos = (inversedValue) +
                    ((interval / series.rectCount) * position - ticks) + (sumofYValues / 360 * series.xAxis.startAngle);
                itemCurrentXPos = (((itemCurrentXPos) / (sumofYValues)));
                startAngle = 2 * Math.PI * (itemCurrentXPos + series.xAxis.startAngle);
                endAngle = 2 * Math.PI * ((itemCurrentXPos + series.xAxis.startAngle) + (interval / series.rectCount) / (sumofYValues));
                pointStartAngle = startAngle;
                pointEndAngle = endAngle;
                startAngle = (startAngle - 0.5 * Math.PI);
                endAngle = (endAngle - 0.5 * Math.PI) - 0.000001;
                if (series.drawType === 'StackingColumn' || series.drawType === 'RangeColumn') {
                    startValue = series.drawType === 'RangeColumn' ? point.low : series.stackedValues.startValues[point.index];
                    endValue = series.drawType === 'RangeColumn' ? point.high : series.stackedValues.endValues[point.index];
                    endValue = (series.yAxis.valueType === 'Logarithmic' ?
                        logBase(endValue === 0 ? 1 : endValue, series.yAxis.logBase) : endValue);
                    endValue = endValue > series.yAxis.actualRange.max ? series.yAxis.actualRange.max : endValue;
                    radius = startValue === endValue ? 0 : series.chart.radius * valueToCoefficient(endValue, series.yAxis);
                    x1 = centerX + radius * Math.cos(startAngle);
                    x2 = centerX + radius * Math.cos(endAngle);
                    y1 = centerY + radius * Math.sin(startAngle);
                    y2 = centerY + radius * Math.sin(endAngle);
                    innerRadius = series.chart.radius * valueToCoefficient((startValue === 0 && series.yAxis.visibleRange.min !== 0) ? series.yAxis.visibleRange.min : startValue, series.yAxis);
                    dStartX = centerX + innerRadius * Math.cos(startAngle);
                    dStartY = centerY + innerRadius * Math.sin(startAngle);
                    dEndX = centerX + innerRadius * Math.cos(endAngle);
                    dEndY = centerY + innerRadius * Math.sin(endAngle);
                    if (series.type === 'Polar') {
                        direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'A' + ' ' + radius + ' ' + radius + ' ' + '0' + ' '
                            + '0' + ' ' + 1 + ' ' + x2 + ' ' + y2 + ' ' + 'L' + ' ' + dEndX + ' ' + dEndY + ' ' +
                            'A' + ' ' + innerRadius + ' ' + innerRadius + ' ' + '1' + ' ' + '0' + ' ' + '0' + ' '
                            + dStartX + ' ' + dStartY + ' ' + 'z');
                    }
                    else {
                        direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'L' + ' ' + x2 + ' ' + y2 + ' ' + 'L'
                            + dEndX + ' ' + dEndY + ' ' + 'L' + ' ' + dStartX + ' ' + dStartY + ' ' + 'z');
                    }
                    point.regionData = new PolarArc(pointStartAngle, pointEndAngle, innerRadius, radius, itemCurrentXPos);
                }
                else {
                    endValue = point.yValue > series.yAxis.actualRange.max ? series.yAxis.actualRange.max : point.yValue;
                    radius = series.chart.radius * valueToCoefficient((series.yAxis.valueType === 'Logarithmic' ? logBase(endValue, series.yAxis.logBase) : endValue), series.yAxis);
                    x1 = centerX + radius * Math.cos(startAngle);
                    x2 = centerX + radius * Math.cos(endAngle);
                    y1 = centerY + radius * Math.sin(startAngle);
                    y2 = centerY + radius * Math.sin(endAngle);
                    if (series.type === 'Polar') {
                        direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'A' + ' ' + radius + ' ' + radius + ' ' + '0' + ' ' +
                            '0' + ' ' + 1 + ' ' + x2 + ' ' + y2 + ' ' + 'L' + ' ' + centerX + ' ' +
                            centerY + ' ' + 'z');
                    }
                    else {
                        direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'L' + ' ' + x2 + ' ' + y2 + ' ' + 'L' + ' '
                            + centerX + ' ' + centerY + ' ' + 'z');
                    }
                    point.regionData = new PolarArc(pointStartAngle, pointEndAngle, 0, radius, itemCurrentXPos);
                }
                argsData = this.triggerEvent(series.chart, series, point);
                options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
                if (!argsData.cancel) {
                    this.appendLinePath(options, series);
                    if (series.type === 'Polar') {
                        vector = CoefficientToVector(valueToPolarCoefficient((point.xValue + ticksbwtLabel / series.rectCount + series.position / series.rectCount), series.xAxis), series.chart.primaryXAxis.startAngle);
                        point.symbolLocations.push({
                            x: series.clipRect.width / 2 + series.clipRect.x + radius * vector.x,
                            y: series.clipRect.height / 2 + series.clipRect.y + radius * vector.y
                        });
                    }
                    else {
                        point.symbolLocations.push({ x: (x1 + x2) / 2, y: (y1 + y2) / 2 });
                    }
                }
            }
        }
        series.isRectSeries = true;
    };
    /**
     * To trigger the point rendering event.
     * @return {void}
     * @private
     */
    PolarSeries.prototype.triggerEvent = function (chart, series, point) {
        var argsData = {
            cancel: false, name: pointRender, series: series, point: point,
            fill: series.setPointColor(point, series.interior),
            border: series.setBorderColor(point, { width: series.border.width, color: series.border.color })
        };
        chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        return argsData;
    };
    /** get position for column drawtypes
     * @return {void}.
     * @private
     */
    PolarSeries.prototype.getSeriesPosition = function (series) {
        var chart = series.chart;
        var seriesCollection = [];
        var stackingGroup = [];
        var vSeries = { rectCount: 0, position: null };
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series_1 = _a[_i];
            if (series_1.visible && (series_1.type === 'Polar' || series_1.type === 'Radar') && series_1.drawType.indexOf('Column') !== -1) {
                seriesCollection.push(series_1);
            }
        }
        seriesCollection.forEach(function (series) {
            if (series.drawType.indexOf('Stacking') !== -1) {
                if (series.stackingGroup) {
                    if (stackingGroup[series.stackingGroup] === undefined) {
                        series.position = vSeries.rectCount;
                        stackingGroup[series.stackingGroup] = vSeries.rectCount++;
                    }
                    else {
                        series.position = stackingGroup[series.stackingGroup];
                    }
                }
                else {
                    if (vSeries.position === null) {
                        series.position = vSeries.rectCount;
                        vSeries.position = vSeries.rectCount++;
                    }
                    else {
                        series.position = vSeries.position;
                    }
                }
            }
            else {
                series.position = vSeries.rectCount++;
            }
        });
        seriesCollection.forEach(function (value) {
            value.rectCount = vSeries.rectCount;
        });
    };
    /**
     * Animates the series.
     * @return {void}.
     */
    PolarSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        if (series.drawType === 'Scatter') {
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.symbolLocations.length || !rectElements[count]) {
                    continue;
                }
                markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocations[0], false);
                count++;
            }
        }
        else {
            for (count = 1; count < rectElements.length; count++) {
                this.doPolarRadarAnimation(rectElements[count], delay, duration, series);
            }
        }
    };
    /**
     * To do the Polar Radar draw type column animation.
     * @return {void}
     * @private
     */
    PolarSeries.prototype.doPolarRadarAnimation = function (animateElement, delay, duration, series) {
        var chartcenterX = series.clipRect.width / 2 + series.clipRect.x;
        var chartcenterY = series.clipRect.height / 2 + series.clipRect.y;
        var elementHeight = 0;
        animateElement.style.visibility = 'hidden';
        new Animation({}).animate(animateElement, {
            duration: duration,
            delay: delay,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    args.element.style.visibility = 'visible';
                    elementHeight = ((args.timeStamp - args.delay) / args.duration);
                    animateElement.setAttribute('transform', 'translate(' + chartcenterX
                        + ' ' + chartcenterY + ') scale(' + elementHeight + ') translate(' + (-chartcenterX) + ' ' + (-chartcenterY) + ')');
                }
            },
            end: function (model) {
                animateElement.style.visibility = 'visible';
                animateElement.removeAttribute('transform');
                series.chart.trigger('animationComplete', { series: series });
            }
        });
    };
    /**
     * Get module name.
     */
    PolarSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'PolarSeries';
    };
    /**
     * To destroy the polar series.
     * @return {void}
     * @private
     */
    PolarSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return PolarSeries;
}(PolarRadarPanel));

var __extends$19 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `RadarSeries` Module used to render the radar series.
 */
var RadarSeries = /** @class */ (function (_super) {
    __extends$19(RadarSeries, _super);
    function RadarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render radar Series.
     * @return {void}.
     * @private
     */
    RadarSeries.prototype.render = function (series) {
        var seriesType = firstToLowerCase(series.drawType);
        if (series.drawType.indexOf('Column') === -1) {
            series.chart[seriesType + 'SeriesModule'].render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        }
        else {
            this.columnDrawTypeRender(series);
        }
    };
    /**
     * Get module name.
     */
    RadarSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'RadarSeries';
    };
    /**
     * To destroy the radar series.
     * @return {void}
     * @private
     */
    RadarSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return RadarSeries;
}(PolarSeries));

var __extends$20 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Stacking Bar Module used to render the Stacking Bar series.
 */
var StackingBarSeries = /** @class */ (function (_super) {
    __extends$20(StackingBarSeries, _super);
    function StackingBarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Stacking bar series.
     * @return {void}
     * @private
     */
    StackingBarSeries.prototype.render = function (series) {
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var sideBySideInfo = this.getSideBySideInfo(series);
        var stackedValue = series.stackedValues;
        var rect;
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var pointStack = _a[_i];
            pointStack.symbolLocations = [];
            pointStack.regions = [];
            if (pointStack.visible && withInRange(series.points[pointStack.index - 1], pointStack, series.points[pointStack.index + 1], series)) {
                rect = this.getRectangle(pointStack.xValue + sideBySideInfo.start, stackedValue.endValues[pointStack.index], pointStack.xValue + sideBySideInfo.end, stackedValue.startValues[pointStack.index], series);
                argsData = this.triggerEvent(series, pointStack, series.interior, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.drawRectangle(series, pointStack, rect, argsData);
                    this.updateSymbolLocation(pointStack, rect, series);
                }
            }
        }
    };
    /**
     * To destroy the stacking bar.
     * @return {void}
     * @private
     */
    StackingBarSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Get module name.
     */
    StackingBarSeries.prototype.getModuleName = function () {
        return 'StackingBarSeries';
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    StackingBarSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    return StackingBarSeries;
}(ColumnBase));

var __extends$21 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Candle Module used to render the candle series.
 */
var CandleSeries = /** @class */ (function (_super) {
    __extends$21(CandleSeries, _super);
    function CandleSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Candle series.
     * @return {void}
     * @private
     */
    CandleSeries.prototype.render = function (series) {
        var sideBySideInfo = this.getSideBySideInfo(series);
        var argsData;
        var borderWidth = Math.max(series.border.width, 1);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var direction = '';
            var centerRegion = void 0;
            var tickRegion = void 0;
            var midPoint = void 0;
            midPoint = (sideBySideInfo.start + sideBySideInfo.end) / 2;
            //initializing after zooming and also normal initialization
            point.regions = [];
            point.symbolLocations = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                //region to cover the top and bottom ticks
                tickRegion = this.getRectangle((point.xValue + sideBySideInfo.median), Math.max(point.high, point.low), (point.xValue + sideBySideInfo.median), Math.min(point.high, point.low), series);
                if (!series.chart.requireInvertedAxis) {
                    tickRegion.x -= borderWidth / 2;
                    tickRegion.width = borderWidth;
                }
                else {
                    tickRegion.y -= borderWidth / 2;
                    tickRegion.height = borderWidth;
                }
                //get middleRect
                centerRegion = this.getRectangle((point.xValue + sideBySideInfo.start), Math.max(point.open, point.close), (point.xValue + sideBySideInfo.end), Math.min(point.open, point.close), series);
                direction = this.getPathString(tickRegion, centerRegion, series);
                argsData = this.triggerPointRenderEvent(series, point);
                if (!argsData.cancel) {
                    this.drawCandle(series, point, centerRegion, argsData, direction);
                    this.updateSymbolLocation(point, tickRegion, series);
                    this.updateSymbolLocation(point, centerRegion, series);
                }
            }
        }
    };
    /**
     * Trigger point rendering event
     */
    CandleSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var fill;
        fill = this.getCandleColor(point, series);
        var border = { color: series.border.color, width: Math.max(series.border.width, 1) };
        return this.triggerEvent(series, point, fill, border);
    };
    /**
     * Find the color of the candle
     * @param series
     * @private
     */
    CandleSeries.prototype.getCandleColor = function (point, series) {
        var previousPoint = series.points[point.index - 1];
        if (series.enableSolidCandles === false) {
            if (!previousPoint) {
                return series.bearFillColor;
            }
            else {
                return previousPoint.close > point.close ? series.bullFillColor :
                    series.bearFillColor;
            }
        }
        else {
            return point.open > point.close ? series.bullFillColor :
                series.bearFillColor;
        }
    };
    /**
     * Finds the path of the candle shape
     * @param Series
     * @private
     */
    CandleSeries.prototype.getPathString = function (topRect, midRect, series) {
        var direction = '';
        var width = series.chart.requireInvertedAxis ? topRect.height : topRect.width;
        var center = series.chart.requireInvertedAxis ? topRect.y + topRect.height / 2 :
            topRect.x + topRect.width / 2;
        //tick 1 segment
        direction += !series.chart.requireInvertedAxis ?
            'M' + ' ' + (center) + ' ' + (topRect.y) + ' ' + 'L' + ' ' + (center) + ' ' + midRect.y :
            'M' + ' ' + (topRect.x) + ' ' + (center) + ' ' + 'L' + ' ' + (midRect.x) + ' ' + center;
        direction = direction.concat(' M' + ' ' + (midRect.x) + ' ' + (midRect.y) + ' ' +
            'L' + ' ' + (midRect.x + midRect.width) + ' ' + (midRect.y) + ' ' +
            'L' + ' ' + (midRect.x + midRect.width) + ' ' +
            (midRect.y + midRect.height) + ' ' +
            'L' + ' ' + (midRect.x) + ' ' + (midRect.y + midRect.height) +
            ' ' + 'Z');
        direction += !series.chart.requireInvertedAxis ?
            ' M' + ' ' + (center) + ' ' + (midRect.y + midRect.height) + ' ' + 'L' + ' ' + (center) + ' ' + (topRect.y +
                topRect.height) :
            ' M' + ' ' + (midRect.x + midRect.width) + ' ' + (center) + ' ' + 'L' + ' ' +
                (topRect.x + topRect.width) + ' ' + center;
        return direction;
    };
    /**
     * Draws the candle shape
     * @param series
     * @private
     */
    CandleSeries.prototype.drawCandle = function (series, point, rect, argsData, direction) {
        var check = series.chart.requireInvertedAxis ? rect.height : rect.width;
        if (check <= 0) {
            return null;
        }
        var fill = !series.enableSolidCandles ?
            (point.open > point.close ? argsData.fill : 'transparent') : argsData.fill;
        argsData.border.color = argsData.fill;
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
        var candleElement = series.chart.renderer.drawPath(options);
        candleElement.setAttribute('aria-label', point.x.toString() + ':' + point.high.toString()
            + ':' + point.low.toString() + ':' + point.close.toString() + ':' + point.open.toString());
        series.seriesElement.appendChild(candleElement);
    };
    /**
     * Animate the series
     * @param series
     * @private
     */
    CandleSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * Get module name.
     */
    CandleSeries.prototype.getModuleName = function () {
        return 'CandleSeries';
        /**
         * return the module name
         */
    };
    /**
     * To destroy the candle series.
     * @return {void}
     * @private
     */
    CandleSeries.prototype.destroy = function (chart) {
        /**
         * Destroys the candle series.
         */
    };
    return CandleSeries;
}(ColumnBase));

var __extends$22 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Stacking Column Module used to render the Stacking Column series.
 */
var StackingColumnSeries = /** @class */ (function (_super) {
    __extends$22(StackingColumnSeries, _super);
    function StackingColumnSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Stacking column series.
     * @return {void}
     * @private
     */
    StackingColumnSeries.prototype.render = function (series) {
        series.isRectSeries = true;
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var sideBySideInfo = this.getSideBySideInfo(series);
        var rect;
        var argsData;
        var stackedValue = series.stackedValues;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                rect = this.getRectangle(point.xValue + sideBySideInfo.start, stackedValue.endValues[point.index], point.xValue + sideBySideInfo.end, stackedValue.startValues[point.index], series);
                argsData = this.triggerEvent(series, point, series.interior, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.drawRectangle(series, point, rect, argsData);
                    this.updateSymbolLocation(point, rect, series);
                }
            }
        }
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    StackingColumnSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the stacking column.
     * @return {void}
     * @private
     */
    StackingColumnSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Get module name.
     */
    StackingColumnSeries.prototype.getModuleName = function () {
        return 'StackingColumnSeries';
    };
    return StackingColumnSeries;
}(ColumnBase));

var __extends$23 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * StepLine Module used to render the step line series.
 */
var StepLineSeries = /** @class */ (function (_super) {
    __extends$23(StepLineSeries, _super);
    function StepLineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Step line series.
     * @return {void}
     * @private
     */
    StepLineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var direction = '';
        var startPoint = 'M';
        var prevPoint = null;
        var pathOptions;
        var lineLength;
        var point1;
        var point2;
        var visiblePoints = this.improveChartPerformance(series);
        if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
            lineLength = 0.5;
        }
        else {
            lineLength = 0;
        }
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (prevPoint != null) {
                    point2 = getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted);
                    point1 = getPoint(prevPoint.xValue, prevPoint.yValue, xAxis, yAxis, isInverted);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' + 'L' + ' ' +
                        (point2.x) + ' ' + (point1.y) + 'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    startPoint = 'L';
                }
                else {
                    point1 = getPoint(point.xValue - lineLength, point.yValue, xAxis, yAxis, isInverted);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    startPoint = 'L';
                }
                point.symbolLocations.push(getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted));
                prevPoint = point;
                point.regions.push(new Rect(point.symbolLocations[0].x - series.marker.width, point.symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
            else {
                prevPoint = series.emptyPointSettings.mode === 'Drop' ? prevPoint : null;
                startPoint = series.emptyPointSettings.mode === 'Drop' ? startPoint : 'M';
            }
        }
        point1 = getPoint(visiblePoints[visiblePoints.length - 1].xValue + lineLength, visiblePoints[visiblePoints.length - 1].yValue, xAxis, yAxis, isInverted);
        direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
        pathOptions = new PathOption(series.chart.element.id + '_Series_' + series.index, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
        this.appendLinePath(pathOptions, series);
        this.renderMarker(series);
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    StepLineSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * To destroy the step line series.
     * @return {void}
     * @private
     */
    StepLineSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    /**
     * Get module name.
     */
    StepLineSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'StepLineSeries';
    };
    return StepLineSeries;
}(LineBase));

var __extends$24 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * StepArea Module used to render the StepArea series.
 */
var StepAreaSeries = /** @class */ (function (_super) {
    __extends$24(StepAreaSeries, _super);
    function StepAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render StepArea series.
     * @return {void}
     * @private
     */
    StepAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var currentPoint;
        var secondPoint;
        var start = null;
        var direction = '';
        var pointsLength = series.points.length;
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var options;
        var point;
        var xValue;
        var lineLength;
        var prevPoint = null;
        if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
            lineLength = 0.5;
        }
        else {
            lineLength = 0;
        }
        for (var i = 0; i < pointsLength; i++) {
            point = series.points[i];
            xValue = point.xValue;
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                if (start === null) {
                    start = new ChartLocation(xValue, 0);
                    // Start point for the current path
                    currentPoint = getPoint(xValue - lineLength, origin, xAxis, yAxis, isInverted);
                    direction += ('M' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    currentPoint = getPoint(xValue - lineLength, point.yValue - lineLength, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                // First Point to draw the Steparea path
                if (prevPoint != null) {
                    currentPoint = getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted);
                    secondPoint = getPoint(prevPoint.xValue, prevPoint.yValue, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' +
                        (currentPoint.x) + ' ' + (secondPoint.y) + 'L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                else if (series.emptyPointSettings.mode === 'Gap') {
                    currentPoint = getPoint(point.xValue + lineLength, point.yValue, xAxis, yAxis, isInverted);
                    direction += 'L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                }
                point.symbolLocations.push(getPoint(xValue, point.yValue, xAxis, yAxis, isInverted));
                point.regions.push(new Rect(point.symbolLocations[0].x - series.marker.width, point.symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
                prevPoint = point;
            }
            if (series.points[i + 1] && !series.points[i + 1].visible && series.emptyPointSettings.mode !== 'Drop') {
                // current start point
                currentPoint = getPoint(xValue + lineLength, origin, xAxis, yAxis, isInverted);
                direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y));
                start = null;
                prevPoint = null;
            }
        }
        if (pointsLength > 1) {
            start = { 'x': series.points[pointsLength - 1].xValue + lineLength, 'y': series.points[pointsLength - 1].yValue };
            secondPoint = getPoint(start.x, start.y, xAxis, yAxis, isInverted);
            direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
            start = { 'x': series.points[pointsLength - 1].xValue + lineLength, 'y': origin };
            secondPoint = getPoint(start.x, start.y, xAxis, yAxis, isInverted);
            direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    StepAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * To destroy the step Area series.
     * @return {void}
     * @private
     */
    StepAreaSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    /**
     * Get module name.
     */
    StepAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'StepAreaSeries';
    };
    return StepAreaSeries;
}(LineBase));

var __extends$25 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Stacking Area Module used to render the Stacking Area series.
 */
var StackingAreaSeries = /** @class */ (function (_super) {
    __extends$25(StackingAreaSeries, _super);
    function StackingAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Stacking area series.
     * @return {void}
     * @private
     */
    StackingAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var lineDirection = '';
        var visiblePoints = series.points;
        var pointsLength = visiblePoints.length;
        var stackedvalue = series.stackedValues;
        var origin = series.chart.chartAreaType === 'PolarRadar' ?
            Math.max(series.yAxis.visibleRange.min, stackedvalue.endValues[0]) :
            Math.max(series.yAxis.visibleRange.min, stackedvalue.startValues[0]);
        var border = series.border;
        var options;
        var startPoint = 0;
        var point1 = getCoordinate(visiblePoints[0].xValue, origin, xAxis, yAxis, isInverted, series);
        var point2;
        lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
        for (var i = 0; i < pointsLength; i++) {
            visiblePoints[i].symbolLocations = [];
            visiblePoints[i].regions = [];
            if (visiblePoints[i].visible && withInRange(visiblePoints[i - 1], visiblePoints[i], visiblePoints[i + 1], series)) {
                point1 = getCoordinate(visiblePoints[i].xValue, stackedvalue.endValues[i], xAxis, yAxis, isInverted, series);
                lineDirection = lineDirection.concat('L' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                visiblePoints[i].symbolLocations.push(getCoordinate(visiblePoints[i].xValue, stackedvalue.endValues[i], xAxis, yAxis, isInverted, series));
                visiblePoints[i].regions.push(new Rect(visiblePoints[i].symbolLocations[0].x - series.marker.width, visiblePoints[i].symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
            else {
                if (series.emptyPointSettings.mode !== 'Drop') {
                    for (var j = i - 1; j >= startPoint; j--) {
                        point2 = getCoordinate(visiblePoints[j].xValue, stackedvalue.startValues[j], xAxis, yAxis, isInverted, series);
                        lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    }
                    if (visiblePoints[i + 1] && visiblePoints[i + 1].visible) {
                        point1 = getCoordinate(visiblePoints[i + 1].xValue, stackedvalue.startValues[i + 1], xAxis, yAxis, isInverted, series);
                        lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    }
                    startPoint = i + 1;
                }
            }
        }
        if (series.chart.chartAreaType === 'PolarRadar' && visiblePoints.length > 1) {
            point1 = { 'x': series.points[0].xValue, 'y': stackedvalue.endValues[0] };
            point2 = getCoordinate(point1.x, point1.y, xAxis, yAxis, isInverted, series);
            lineDirection += ('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            point1 = { 'x': series.points[0].xValue, 'y': stackedvalue.startValues[0] };
            point2 = getCoordinate(point1.x, point1.y, xAxis, yAxis, isInverted, series);
            lineDirection += ('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
        }
        for (var j = pointsLength - 1; j >= startPoint; j--) {
            var previousSeries = this.getPreviousSeries(series);
            if (previousSeries.emptyPointSettings.mode !== 'Drop' || !previousSeries.points[j].isEmpty) {
                point2 = getCoordinate(visiblePoints[j].xValue, stackedvalue.startValues[j], xAxis, yAxis, isInverted, series);
                lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            }
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, lineDirection);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    StackingAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * To destroy the stacking area.
     * @return {void}
     * @private
     */
    StackingAreaSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    /**
     * Get module name.
     */
    StackingAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'StackingAreaSeries';
    };
    /**
     * To find previous visible series
     */
    StackingAreaSeries.prototype.getPreviousSeries = function (series) {
        var seriesCollection = series.chart.visibleSeries;
        for (var i = 0, length_1 = seriesCollection.length; i < length_1; i++) {
            if (series.index === seriesCollection[i].index && i !== 0) {
                return seriesCollection[i - 1];
            }
        }
        return seriesCollection[0];
    };
    return StackingAreaSeries;
}(LineBase));

/**
 * Scatter Module used to render the scatter series.
 */
var ScatterSeries = /** @class */ (function () {
    function ScatterSeries() {
    }
    /**
     * Render the scatter series.
     * @return {void}
     * @private
     */
    ScatterSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var seriesIndex = series.index;
        var marker = series.marker;
        var border = series.border;
        var shape = marker.shape;
        var visiblePoints = series.points;
        var symbolId;
        var shapeOption;
        var argsData;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                point.symbolLocations.push(getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series));
                symbolId = series.chart.element.id + '_Series_' + seriesIndex + '_Point_' + point.index;
                argsData = {
                    cancel: false, name: pointRender, series: series, point: point,
                    fill: series.setPointColor(point, series.interior),
                    border: series.setBorderColor(point, { width: series.border.width, color: series.border.color }),
                    height: marker.height, width: marker.width
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    point.color = argsData.fill;
                    shapeOption = new PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
                    series.seriesElement.appendChild(drawSymbol(point.symbolLocations[0], shape, new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + point.yValue.toString()));
                    point.regions.push(new Rect(point.symbolLocations[0].x - marker.width, point.symbolLocations[0].y - marker.height, 2 * marker.width, 2 * marker.height));
                }
            }
        }
    };
    /**
     * Animates the series.
     * @return {void}.
     */
    ScatterSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.symbolLocations.length || !rectElements[count]) {
                continue;
            }
            markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocations[0], false);
            count++;
        }
    };
    /**
     * Get module name.
     */
    ScatterSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'ScatterSeries';
    };
    /**
     * To destroy the scatter.
     * @return {void}
     * @private
     */
    ScatterSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    return ScatterSeries;
}());

var __extends$26 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `RangeColumnSeries` Module used to render the range column series.
 */
var RangeColumnSeries = /** @class */ (function (_super) {
    __extends$26(RangeColumnSeries, _super);
    function RangeColumnSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Range Column series.
     * @return {void}
     * @private
     */
    RangeColumnSeries.prototype.render = function (series) {
        var rect;
        var sideBySideInfo = this.getSideBySideInfo(series);
        //let origin: number = Math.max(<number>series.yAxis.visibleRange.min, 0);
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var rangePoint = _a[_i];
            rangePoint.symbolLocations = [];
            rangePoint.regions = [];
            if (rangePoint.visible && withInRange(series.points[rangePoint.index - 1], rangePoint, series.points[rangePoint.index + 1], series)) {
                rect = this.getRectangle(rangePoint.xValue + sideBySideInfo.start, rangePoint.high, rangePoint.xValue + sideBySideInfo.end, rangePoint.low, series);
                argsData = this.triggerEvent(series, rangePoint, series.interior, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.updateSymbolLocation(rangePoint, rect, series);
                    this.drawRectangle(series, rangePoint, rect, argsData);
                }
            }
        }
    };
    /**
     * Get module name.
     */
    RangeColumnSeries.prototype.getModuleName = function () {
        return 'RangeColumnSeries';
        /**
         * return the module name
         */
    };
    /**
     * Animates the series.
     * @return {void}
     * @private
     */
    RangeColumnSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the range column series.
     * @return {void}
     * @private
     */
    RangeColumnSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return RangeColumnSeries;
}(ColumnBase));

var __extends$27 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Waterfall Module used to render the waterfall series.
 */
var WaterfallSeries = /** @class */ (function (_super) {
    __extends$27(WaterfallSeries, _super);
    function WaterfallSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render waterfall series.
     * @return {void}
     * @private
     */
    WaterfallSeries.prototype.render = function (series) {
        var rect;
        var sideBySideInfo = this.getSideBySideInfo(series);
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var argsData;
        var prevEndValue = 0;
        var direction = '';
        var currentEndValue = 0;
        var originValue;
        var prevRegion = null;
        var y;
        var isInversed = series.chart.requireInvertedAxis;
        var intermediateOrigin = 0;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                //Calcute the current point value to render waterfall series.
                var isSum = this.isIntermediateSum(series, point.index);
                var totalSum = this.isSumIndex(series, point.index);
                currentEndValue += isSum || totalSum === true ? 0 : point.yValue;
                //Calcute the origin value for points
                originValue = (isSum === true ? intermediateOrigin : ((prevEndValue !== null && !totalSum) ? prevEndValue : origin));
                rect = this.getRectangle(point.xValue + sideBySideInfo.start, currentEndValue, point.xValue + sideBySideInfo.end, originValue, series);
                argsData = this.triggerPointRenderEvent(series, point);
                //intermediateOrigin is used only for imtermediate data 
                if (isSum) {
                    intermediateOrigin = currentEndValue;
                }
                prevEndValue = currentEndValue;
                if (!argsData.cancel) {
                    this.updateSymbolLocation(point, rect, series);
                    this.drawRectangle(series, point, rect, argsData);
                }
                var currentRegion = point.regions[0];
                if (prevRegion !== null) {
                    var prevLeft = isInversed ? prevRegion.x : prevRegion.y;
                    var currentLeft = isInversed ? currentRegion.x : currentRegion.y;
                    var prevBottom = isInversed ? prevRegion.x + prevRegion.width : prevRegion.y + prevRegion.height;
                    var currentBottom = isInversed ?
                        currentRegion.x + currentRegion.width : currentRegion.y + currentRegion.height;
                    if (Math.round(prevLeft) === Math.round(currentLeft) ||
                        Math.round(prevBottom) === Math.round(currentLeft)) {
                        y = isInversed ? currentRegion.x : currentRegion.y;
                    }
                    else {
                        y = currentBottom;
                    }
                    if (isInversed) {
                        direction = direction.concat('M' + ' ' + y + ' ' + (prevRegion.y + prevRegion.height) + ' ' +
                            'L' + ' ' + y + ' ' + currentRegion.y + ' ');
                    }
                    else {
                        direction = direction.concat('M' + ' ' + prevRegion.x + ' ' + y + ' ' +
                            'L' + ' ' + (currentRegion.x + currentRegion.width) + ' ' + y + ' ');
                    }
                }
                prevRegion = point.regions[0];
            }
        }
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Connector_', 'none', series.connector.width, series.connector.color, series.opacity, series.connector.dashArray, direction);
        var element = series.chart.renderer.drawPath(options);
        if (series.chart.animateSeries) {
            element.style.visibility = 'hidden';
        }
        series.seriesElement.appendChild(element);
    };
    /**
     * To check intermediateSumIndex in waterfall series.
     * @return boolean
     * @private
     */
    WaterfallSeries.prototype.isIntermediateSum = function (series, index) {
        if (series.intermediateSumIndexes !== undefined && series.intermediateSumIndexes.indexOf(index) !== -1) {
            return true;
        }
        return false;
    };
    /**
     * To check sumIndex in waterfall series.
     * @return boolean
     * @private
     */
    WaterfallSeries.prototype.isSumIndex = function (series, index) {
        if (series.sumIndexes !== undefined && series.sumIndexes.indexOf(index) !== -1) {
            return true;
        }
        return false;
    };
    /**
     * To trigger the point rendering event for waterfall series.
     * @return IPointRenderEventArgs
     * @private
     */
    WaterfallSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var color;
        var isSum = this.isIntermediateSum(series, point.index);
        var totalSum = this.isSumIndex(series, point.index);
        if (isSum || totalSum) {
            color = series.summaryFillColor;
        }
        else if (point.y < 0) {
            color = series.negativeFillColor;
        }
        else {
            color = series.interior;
        }
        return this.triggerEvent(series, point, color, { color: series.border.color, width: series.border.width });
    };
    /**
     * Add sumIndex and intermediateSumIndex data.
     * @return {object[]}
     * @private
     */
    WaterfallSeries.prototype.processWaterfallData = function (json, series) {
        var data = json;
        var length = json.length;
        var index;
        var intermediateSum = series.intermediateSumIndexes;
        var sumIndex = series.sumIndexes;
        if (intermediateSum !== undefined && intermediateSum.length > 0) {
            for (var i = 0; i < intermediateSum.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (j === intermediateSum[i]) {
                        if (i === 0) {
                            index = subArraySum(data, -1, intermediateSum[i], null, series);
                        }
                        else {
                            index = subArraySum(data, intermediateSum[i - 1], intermediateSum[i], null, series);
                        }
                        data[j][series.yName] = index;
                    }
                }
            }
        }
        if (sumIndex !== undefined && sumIndex.length > 0) {
            for (var k = 0; k < sumIndex.length; k++) {
                for (var j = 0; j < data.length; j++) {
                    if (j === sumIndex[k]) {
                        if (intermediateSum !== undefined) {
                            index = subArraySum(data, -1, sumIndex[k], sumIndex, series);
                        }
                        else {
                            index = subArraySum(data, -1, sumIndex[k], null, series);
                        }
                        data[j][series.yName] = index;
                    }
                }
            }
        }
        return data;
    };
    /**
     * Animates the waterfall series.
     * @return {void}
     * @private
     */
    WaterfallSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * Get module name.
     */
    WaterfallSeries.prototype.getModuleName = function () {
        return 'WaterfallSeries';
        /**
         * return the module name
         */
    };
    /**
     * To destroy the waterfall series.
     * @return {void}
     * @private
     */
    WaterfallSeries.prototype.destroy = function (chart) {
        /**
         * Destroys the waterfall series.
         */
    };
    return WaterfallSeries;
}(ColumnBase));

var __extends$28 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Hilo Module used to render the Hilo series.
 */
var HiloSeries = /** @class */ (function (_super) {
    __extends$28(HiloSeries, _super);
    function HiloSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Hiloseries.
     * @return {void}
     * @private
     */
    HiloSeries.prototype.render = function (series) {
        var region;
        var sideBySideInfo = this.getSideBySideInfo(series);
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible &&
                withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                region = this.getRectangle(point.xValue + sideBySideInfo.median, point.high, point.xValue + sideBySideInfo.median, point.low, series);
                argsData = this.triggerPointRenderEvent(series, point);
                if (!argsData.cancel) {
                    if (!series.chart.requireInvertedAxis) {
                        region.width = argsData.border.width;
                        region.x = region.x - (region.width / 2);
                    }
                    else {
                        region.height = argsData.border.width;
                        region.y = region.y - (region.height / 2);
                    }
                    argsData.border.width = 0;
                    this.updateSymbolLocation(point, region, series);
                    this.drawRectangle(series, point, region, argsData);
                }
            }
        }
    };
    /**
     * To trigger the point rendering event.
     * @return {void}
     * @private
     */
    HiloSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var border = { color: series.fill, width: Math.max(series.border.width, 2) };
        return _super.prototype.triggerEvent.call(this, series, point, series.interior, border);
    };
    /**
     * Get module name.
     */
    HiloSeries.prototype.getModuleName = function () {
        return 'HiloSeries';
        /**
         * return the module name
         */
    };
    /**
     * Animates the series.
     * @return {void}
     * @private
     */
    HiloSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the Hilo series.
     * @return {void}
     * @private
     */
    HiloSeries.prototype.destroy = function (chart) {
        /**
         * Destroys the Hilo Series
         */
    };
    return HiloSeries;
}(ColumnBase));

var __extends$29 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * hiloOpenClose Module used to render the hiloOpenClose series.
 */
var HiloOpenCloseSeries = /** @class */ (function (_super) {
    __extends$29(HiloOpenCloseSeries, _super);
    function HiloOpenCloseSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render HiloOpenCloseSeries series.
     * @return {void}
     * @private
     */
    HiloOpenCloseSeries.prototype.render = function (series) {
        var highLowRect;
        var sideBySideInfo = this.getSideBySideInfo(series);
        var argsData;
        var borderWidth = Math.max(series.border.width, 2);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible &&
                withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                //highlow
                highLowRect = this.getRectangle(point.xValue + sideBySideInfo.start, Math.max(point.high, point.low), point.xValue + sideBySideInfo.end, Math.min(point.high, point.low), series);
                point.regions.push(this.getRectangle(point.xValue + sideBySideInfo.median, Math.max(point.high, point.low), point.xValue + sideBySideInfo.median, Math.min(point.high, point.low), series));
                this.updateTickRegion(!series.chart.requireInvertedAxis, point.regions[0], borderWidth);
                //open
                point.regions.push(this.getRectangle(point.xValue + sideBySideInfo.start, Math.max(point.open, point.close), point.xValue + sideBySideInfo.median, Math.max(point.open, point.close), series));
                //close
                point.regions.push(this.getRectangle(point.xValue + sideBySideInfo.median, Math.min(point.open, point.close), point.xValue + sideBySideInfo.end, Math.min(point.open, point.close), series));
                argsData = this.triggerPointRenderEvent(series, point);
                if (!argsData.cancel) {
                    this.updateSymbolLocation(point, point.regions[0], series);
                    var open_1 = { x: point.regions[1].x, y: point.regions[1].y };
                    var close_1 = { x: point.regions[2].x, y: point.regions[2].y };
                    this.drawHiloOpenClosePath(series, point, open_1, close_1, highLowRect, argsData);
                }
                this.updateTickRegion(series.chart.requireInvertedAxis, point.regions[1], borderWidth);
                this.updateTickRegion(series.chart.requireInvertedAxis, point.regions[2], borderWidth);
            }
        }
    };
    /**
     * Updates the tick region
     */
    HiloOpenCloseSeries.prototype.updateTickRegion = function (horizontal, region, borderWidth) {
        if (horizontal) {
            region.x -= borderWidth / 2;
            region.width = borderWidth;
        }
        else {
            region.y -= borderWidth / 2;
            region.height = borderWidth;
        }
    };
    /**
     * Trigger point rendering event
     */
    HiloOpenCloseSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var fill = (point.open <= point.close) ? series.bearFillColor : series.bullFillColor;
        var border = { color: series.border.color, width: Math.max(series.border.width, 1) };
        return this.triggerEvent(series, point, fill, border);
    };
    /**
     * To draw the rectangle for points.
     * @return {void}
     * @private
     */
    HiloOpenCloseSeries.prototype.drawHiloOpenClosePath = function (series, point, open, close, rect, argsData) {
        // region highlow
        var direction;
        var options;
        if (series.chart.requireInvertedAxis) {
            direction = ('M' + ' ' + (rect.x) + ' ' + (rect.y + rect.height / 2) + ' ' +
                'L' + ' ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height / 2) + ' ');
            direction += ('M' + ' ' + (open.x) + ' ' + (rect.y + rect.height / 2) + ' ' +
                'L' + ' ' + (open.x) + ' ' + (rect.y + rect.height) + ' ');
            direction += ('M' + ' ' + (close.x) + ' ' + (rect.y + rect.height / 2) + ' ' +
                'L' + ' ' + (close.x) + ' ' + (rect.y) + ' ');
        }
        else {
            direction = ('M' + ' ' + (rect.x + rect.width / 2) + ' ' + (rect.y + rect.height) + ' ' +
                'L' + ' ' + (rect.x + rect.width / 2) + ' ' + (rect.y) + ' ');
            //region opentick
            direction += ('M' + ' ' + (rect.x) + ' ' + (open.y) + ' ' +
                'L' + ' ' + (rect.x + rect.width / 2) + ' ' + (open.y) + ' ');
            //region closetick
            direction += ('M' + ' ' + (rect.x + rect.width / 2) + ' ' + (close.y) + ' ' +
                'L' + ' ' + (rect.x + rect.width) + ' ' + (close.y) + ' ');
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.fill, series.opacity, series.dashArray, direction);
        var element = series.chart.renderer.drawPath(options);
        element.setAttribute('aria-label', point.x.toString() + ':' + point.high.toString()
            + ':' + point.low.toString() + ':' + point.close.toString() + ':' + point.open.toString());
        series.seriesElement.appendChild(element);
    };
    /**
     * Get module name.
     */
    HiloOpenCloseSeries.prototype.getModuleName = function () {
        return 'HiloOpenCloseSeries';
        /**
         * return the module name
         */
    };
    /**
     * Animates the series.
     * @return {void}
     * @private
     */
    HiloOpenCloseSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * To destroy the column series.
     * @return {void}
     * @private
     */
    HiloOpenCloseSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return HiloOpenCloseSeries;
}(ColumnBase));

var __extends$30 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * RangeAreaSeries Module used to render the rangeArea series.
 */
var RangeAreaSeries = /** @class */ (function (_super) {
    __extends$30(RangeAreaSeries, _super);
    function RangeAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render RangeArea Series.
     * @return {void}.
     * @private
     */
    RangeAreaSeries.prototype.render = function (series) {
        var point;
        var direction = '';
        var command = 'M';
        var closed = undefined;
        var visiblePoints = this.improveChartPerformance(series);
        for (var i = 0, length_1 = visiblePoints.length; i < length_1; i++) {
            point = visiblePoints[i];
            point.symbolLocations = [];
            point.regions = [];
            var low = Math.min(point.low, point.high);
            var high = Math.max(point.low, point.high);
            if (series.yAxis.isInversed) {
                var temp = low;
                low = high;
                high = temp;
            }
            var lowPoint = getPoint(point.xValue, low, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
            var highPoint = getPoint(point.xValue, high, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
            point.symbolLocations.push(highPoint);
            point.symbolLocations.push(lowPoint);
            var rect = new Rect(Math.min(lowPoint.x, highPoint.x), Math.min(lowPoint.y, highPoint.y), Math.max(Math.abs(highPoint.x - lowPoint.x), series.marker.width), Math.max(Math.abs(highPoint.y - lowPoint.y), series.marker.width));
            if (!series.chart.requireInvertedAxis) {
                rect.x -= series.marker.width / 2;
            }
            else {
                rect.y -= series.marker.width / 2;
            }
            point.regions.push(rect);
            //Path to connect the high points
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                direction = direction.concat(command + ' ' + (lowPoint.x) + ' ' + (lowPoint.y) + ' ');
                closed = false;
                if ((i + 1 < visiblePoints.length && !visiblePoints[i + 1].visible)
                    || i === visiblePoints.length - 1) {
                    // Path to connect the low points
                    direction = this.closeRangeAreaPath(visiblePoints, point, series, direction, i);
                    command = 'M';
                    direction = direction.concat(' ' + 'Z');
                    closed = true;
                }
                command = 'L';
            }
            else {
                if (closed === false && i !== 0) {
                    direction = this.closeRangeAreaPath(visiblePoints, point, series, direction, i);
                    closed = true;
                }
                command = 'M';
                point.symbolLocations = [];
            }
        }
        var name = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
            series.chart.element.id + '_Series_' + series.index;
        var options = new PathOption(name, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    /**
     * path for rendering the low points
     * @return {void}.
     * @private
     */
    RangeAreaSeries.prototype.closeRangeAreaPath = function (visiblePoints, point, series, direction, i) {
        for (var j = i; j >= 0; j--) {
            if (visiblePoints[j].visible && visiblePoints[j].symbolLocations[0]) {
                point = visiblePoints[j];
                direction += 'L' + ' ' + (point.symbolLocations[0].x) + ' ' + ((point.symbolLocations[0].y)) + ' ';
            }
            else {
                break;
            }
        }
        return direction;
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    RangeAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * Get module name.
     */
    RangeAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'RangeAreaSeries';
    };
    /**
     * To destroy the line series.
     * @return {void}
     * @private
     */
    RangeAreaSeries.prototype.destroy = function (chart) {
        /**
         * Destroys range area series
         */
    };
    return RangeAreaSeries;
}(LineBase));

/**
 * Bubble Module used to render the Bubble series.
 */
var BubbleSeries = /** @class */ (function () {
    function BubbleSeries() {
    }
    /**
     * Render the Bubble series.
     * @return {void}
     * @private
     */
    BubbleSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var marker = series.marker;
        var visiblePoints = series.points;
        var shapeOption;
        var argsData;
        //let bubbleMode: RadiusMode = bubbleOptions.radiusMode;
        var segmentRadius;
        var radius;
        var value = Math.max(series.chart.initialClipRect.height, series.chart.initialClipRect.width);
        var percentChange = value / 100;
        var maxRadius = series.maxRadius * percentChange;
        var minRadius = series.minRadius * percentChange;
        var maximumSize = null;
        var maxValue = null;
        if ((series.maxRadius === null || series.minRadius === null)) {
            for (var _i = 0, _a = series.chart.visibleSeries; _i < _a.length; _i++) {
                var value_1 = _a[_i];
                if (value_1.type === 'Bubble' && value_1.visible === true && (value_1.maxRadius === null || value_1.minRadius === null)) {
                    maximumSize = value_1.sizeMax > maximumSize ? value_1.sizeMax : maximumSize;
                }
            }
            maxValue = (value / 5) / 2;
            minRadius = maxRadius = 1;
            radius = maxValue * maxRadius;
        }
        else {
            maximumSize = series.sizeMax;
            radius = maxRadius - minRadius;
        }
        for (var _b = 0, visiblePoints_1 = visiblePoints; _b < visiblePoints_1.length; _b++) {
            var bubblePoint = visiblePoints_1[_b];
            bubblePoint.symbolLocations = [];
            bubblePoint.regions = [];
            if (bubblePoint.visible &&
                withInRange(visiblePoints[bubblePoint.index - 1], bubblePoint, visiblePoints[bubblePoint.index + 1], series)) {
                bubblePoint.symbolLocations.push(getPoint(bubblePoint.xValue, bubblePoint.yValue, xAxis, yAxis, isInverted));
                if ((series.maxRadius === null || series.minRadius === null)) {
                    segmentRadius = radius * Math.abs(+bubblePoint.size / maximumSize);
                }
                else {
                    segmentRadius = minRadius + radius * Math.abs(+bubblePoint.size / maximumSize);
                }
                segmentRadius = segmentRadius || minRadius;
                argsData = {
                    cancel: false, name: pointRender, series: series, point: bubblePoint,
                    fill: series.setPointColor(bubblePoint, series.interior),
                    border: series.setBorderColor(bubblePoint, { width: series.border.width, color: series.border.color }),
                    height: 2 * segmentRadius, width: 2 * segmentRadius
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    bubblePoint.color = argsData.fill;
                    shapeOption = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + bubblePoint.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
                    series.seriesElement.appendChild(drawSymbol(bubblePoint.symbolLocations[0], 'Circle', new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, bubblePoint.x.toString() + ':' + bubblePoint.yValue.toString()));
                    bubblePoint.regions.push(new Rect(bubblePoint.symbolLocations[0].x - segmentRadius, bubblePoint.symbolLocations[0].y - segmentRadius, 2 * segmentRadius, 2 * segmentRadius));
                }
            }
        }
    };
    /**
     * To destroy the Bubble.
     * @return {void}
     * @private
     */
    BubbleSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    /**
     * Get module name.
     */
    BubbleSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'BubbleSeries';
    };
    /**
     * Animates the series.
     * @return {void}.
     */
    BubbleSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var bubblePoint = _a[_i];
            if (!bubblePoint.symbolLocations.length) {
                continue;
            }
            markerAnimate(rectElements[count], delay, duration, series, bubblePoint.index, bubblePoint.symbolLocations[0], false);
            count++;
        }
    };
    return BubbleSeries;
}());

var __extends$31 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Spline Module used to render the spline series.
 */
var SplineSeries = /** @class */ (function (_super) {
    __extends$31(SplineSeries, _super);
    function SplineSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.splinePoints = [];
        return _this;
    }
    /**
     * Render the spline series.
     * @return {void}
     * @private
     */
    SplineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var chart = series.chart;
        var marker = series.marker;
        var options;
        var firstPoint = null;
        var direction = '';
        var pt1;
        var pt2;
        var bpt1;
        var bpt2;
        var data;
        var controlPoint1;
        var controlPoint2;
        var startPoint = 'M';
        var points = this.filterEmptyPoints(series);
        var previous;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            previous = this.getPreviousIndex(points, point.index - 1, series);
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(points[previous], point, points[this.getNextIndex(points, point.index - 1, series)], series)) {
                if (firstPoint !== null) {
                    data = series.drawPoints[previous];
                    controlPoint1 = data.controlPoint1;
                    controlPoint2 = data.controlPoint2;
                    pt1 = getCoordinate(firstPoint.xValue, firstPoint.yValue, xAxis, yAxis, isInverted, series);
                    pt2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
                    bpt1 = getCoordinate(controlPoint1.x, controlPoint1.y, xAxis, yAxis, isInverted, series);
                    bpt2 = getCoordinate(controlPoint2.x, controlPoint2.y, xAxis, yAxis, isInverted, series);
                    direction = direction.concat((startPoint + ' ' + (pt1.x) + ' ' + (pt1.y) + ' ' + 'C' + ' ' + (bpt1.x) + ' '
                        + (bpt1.y) + ' ' + (bpt2.x) + ' ' + (bpt2.y) + ' ' + (pt2.x) + ' ' + (pt2.y) + ' '));
                    startPoint = 'L';
                }
                firstPoint = point;
                point.symbolLocations.push(getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series));
                point.regions.push(new Rect(point.symbolLocations[0].x - marker.width, point.symbolLocations[0].y - marker.height, 2 * marker.width, 2 * marker.height));
            }
            else {
                startPoint = 'M';
                firstPoint = null;
                point.symbolLocations = [];
            }
        }
        var name = series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
            series.chart.element.id + '_Series_' + series.index;
        options = new PathOption(name, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    /**
     * To find the control points for spline.
     * @return {void}
     * @private
     */
    SplineSeries.prototype.findSplinePoint = function (series) {
        var spline = series.chart.splineSeriesModule;
        var value;
        var points = this.filterEmptyPoints(series);
        this.splinePoints = this.findSplineCoefficients(points, series);
        if (points.length > 1) {
            series.drawPoints = [];
            for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
                var point = points_2[_i];
                if (point.index !== 0) {
                    var previous = this.getPreviousIndex(points, point.index - 1, series);
                    value = this.getControlPoints(points[previous], point, this.splinePoints[previous], this.splinePoints[point.index], series);
                    series.drawPoints.push(value);
                    if (point.yValue && value.controlPoint1.y && value.controlPoint2.y) {
                        series.yMin = Math.floor(Math.min(series.yMin, point.yValue, value.controlPoint1.y, value.controlPoint2.y));
                        series.yMax = Math.ceil(Math.max(series.yMax, point.yValue, value.controlPoint1.y, value.controlPoint2.y));
                    }
                }
            }
        }
    };
    SplineSeries.prototype.getPreviousIndex = function (points, i, series) {
        if (series.emptyPointSettings.mode !== 'Drop') {
            return i;
        }
        while (isNullOrUndefined(points[i]) && i > -1) {
            i = i - 1;
        }
        return i;
    };
    SplineSeries.prototype.getNextIndex = function (points, i, series) {
        if (series.emptyPointSettings.mode !== 'Drop') {
            return i;
        }
        while (isNullOrUndefined(points[i]) && i < points.length) {
            i = i + 1;
        }
        return i;
    };
    SplineSeries.prototype.filterEmptyPoints = function (series) {
        if (series.emptyPointSettings.mode !== 'Drop') {
            return series.points;
        }
        var points = extend([], series.points, null, true);
        for (var i = 0; i < points.length; i++) {
            points[i].index = i;
            if (points[i].isEmpty) {
                points[i].symbolLocations = [];
                points[i].regions = [];
                points.splice(i, 1);
                i--;
            }
        }
        return points;
    };
    /**
     * To find the natural spline.
     * @return {void}
     * @private
     */
    SplineSeries.prototype.findSplineCoefficients = function (points, series) {
        var count = points.length;
        var ySpline = [];
        var ySplineDuplicate = [];
        var coefficient1;
        var coefficient2;
        var coefficient3;
        var dy1;
        var dy2;
        var dx = [];
        var dy = [];
        var slope = [];
        var interPoint;
        var slopeLength;
        var cardinalSplineTension = series.cardinalSplineTension ? series.cardinalSplineTension : 0.5;
        cardinalSplineTension = cardinalSplineTension < 0 ? 0 : cardinalSplineTension > 1 ? 1 : cardinalSplineTension;
        switch (series.splineType) {
            case 'Monotonic':
                for (var i = 0; i < count - 1; i++) {
                    dx[i] = points[i + 1].xValue - points[i].xValue;
                    dy[i] = points[i + 1].yValue - points[i].yValue;
                    slope[i] = dy[i] / dx[i];
                }
                //interpolant points
                slopeLength = slope.length;
                // to find the first and last co-efficient value
                ySpline[0] = slope[0];
                ySpline[count - 1] = slope[slopeLength - 1];
                //to find the other co-efficient values
                for (var j = 0; j < dx.length; j++) {
                    if (slopeLength > j + 1) {
                        if (slope[j] * slope[j + 1] <= 0) {
                            ySpline[j + 1] = 0;
                        }
                        else {
                            interPoint = dx[j] + dx[j + 1];
                            ySpline[j + 1] = 3 * interPoint / ((interPoint + dx[j + 1]) / slope[j] + (interPoint + dx[j]) / slope[j + 1]);
                        }
                    }
                }
                break;
            case 'Cardinal':
                for (var i = 0; i < count; i++) {
                    if (i === 0) {
                        ySpline[i] = (count > 2) ? (cardinalSplineTension * (points[i + 2].xValue - points[i].xValue)) : 0;
                    }
                    else if (i === (count - 1)) {
                        ySpline[i] = (count > 2) ? (cardinalSplineTension * (points[count - 1].xValue - points[count - 3].xValue)) : 0;
                    }
                    else {
                        ySpline[i] = (cardinalSplineTension * (points[i + 1].xValue - points[i - 1].xValue));
                    }
                }
                break;
            default:
                if (series.splineType === 'Clamped') {
                    var firstIndex = (points[1].yValue - points[0].yValue) / (points[1].xValue - points[0].xValue);
                    var lastIndex = (points[count - 1].xValue - points[count - 2].xValue) /
                        (points[count - 1].yValue - points[count - 2].yValue);
                    ySpline[0] = (3 * (points[1].yValue - points[0].yValue)) / (points[1].xValue - points[0].xValue) - 3;
                    ySplineDuplicate[0] = 0.5;
                    ySpline[points.length - 1] = (3 * (points[points.length - 1].yValue - points[points.length - 2].yValue)) /
                        (points[points.length - 1].xValue - points[points.length - 2].xValue);
                    ySpline[0] = ySplineDuplicate[0] = Math.abs(ySpline[0]) === Infinity ? 0 : ySpline[0];
                    ySpline[points.length - 1] = ySplineDuplicate[points.length - 1] = Math.abs(ySpline[points.length - 1]) === Infinity ?
                        0 : ySpline[points.length - 1];
                }
                else {
                    // assigning the first and last value as zero
                    ySpline[0] = ySplineDuplicate[0] = 0;
                    ySpline[points.length - 1] = 0;
                }
                for (var i = 1; i < count - 1; i++) {
                    coefficient1 = points[i].xValue - points[i - 1].xValue;
                    coefficient2 = points[i + 1].xValue - points[i - 1].xValue;
                    coefficient3 = points[i + 1].xValue - points[i].xValue;
                    dy1 = points[i + 1].yValue - points[i].yValue || null;
                    dy2 = points[i].yValue - points[i - 1].yValue || null;
                    if (coefficient1 === 0 || coefficient2 === 0 || coefficient3 === 0) {
                        ySpline[i] = 0;
                        ySplineDuplicate[i] = 0;
                    }
                    else {
                        var p = 1 / (coefficient1 * ySpline[i - 1] + 2 * coefficient2);
                        ySpline[i] = -p * coefficient3;
                        ySplineDuplicate[i] = p * (6 * (dy1 / coefficient3 - dy2 / coefficient1) - coefficient1 * ySplineDuplicate[i - 1]);
                    }
                }
                for (var k = count - 2; k >= 0; k--) {
                    ySpline[k] = ySpline[k] * ySpline[k + 1] + ySplineDuplicate[k];
                }
                break;
        }
        return ySpline;
    };
    /**
     * To find the control points for spline.
     * @return {void}
     * @private
     */
    SplineSeries.prototype.getControlPoints = function (point1, point2, ySpline1, ySpline2, series) {
        var controlPoint1;
        var controlPoint2;
        var point;
        var ySplineDuplicate1 = ySpline1;
        var ySplineDuplicate2 = ySpline2;
        switch (series.splineType) {
            case 'Cardinal':
                if (series.xAxis.valueType === 'DateTime') {
                    ySplineDuplicate1 = ySpline1 / this.dateTimeInterval(series);
                    ySplineDuplicate2 = ySpline2 / this.dateTimeInterval(series);
                }
                controlPoint1 = new ChartLocation(point1.xValue + ySpline1 / 3, point1.yValue + ySplineDuplicate1 / 3);
                controlPoint2 = new ChartLocation(point2.xValue - ySpline2 / 3, point2.yValue - ySplineDuplicate2 / 3);
                point = new ControlPoints(controlPoint1, controlPoint2);
                break;
            case 'Monotonic':
                var value = (point2.xValue - point1.xValue) / 3;
                controlPoint1 = new ChartLocation(point1.xValue + value, point1.yValue + ySpline1 * value);
                controlPoint2 = new ChartLocation(point2.xValue - value, point2.yValue - ySpline2 * value);
                point = new ControlPoints(controlPoint1, controlPoint2);
                break;
            default:
                var one3 = 1 / 3.0;
                var deltaX2 = (point2.xValue - point1.xValue);
                deltaX2 = deltaX2 * deltaX2;
                var y1 = one3 * (((2 * point1.yValue) + point2.yValue) - one3 * deltaX2 * (ySpline1 + 0.5 * ySpline2));
                var y2 = one3 * ((point1.yValue + (2 * point2.yValue)) - one3 * deltaX2 * (0.5 * ySpline1 + ySpline2));
                controlPoint1 = new ChartLocation((2 * (point1.xValue) + (point2.xValue)) * one3, y1);
                controlPoint2 = new ChartLocation(((point1.xValue) + 2 * (point2.xValue)) * one3, y2);
                point = new ControlPoints(controlPoint1, controlPoint2);
                break;
        }
        return point;
    };
    /**
     * calculate datetime interval in hours
     *
     */
    SplineSeries.prototype.dateTimeInterval = function (series) {
        var interval = series.xAxis.actualIntervalType;
        var intervalInMilliseconds;
        if (interval === 'Years') {
            intervalInMilliseconds = 365 * 24 * 60 * 60 * 1000;
        }
        else if (interval === 'Months') {
            intervalInMilliseconds = 30 * 24 * 60 * 60 * 1000;
        }
        else if (interval === 'Days') {
            intervalInMilliseconds = 24 * 60 * 60 * 1000;
        }
        else if (interval === 'Hours') {
            intervalInMilliseconds = 60 * 60 * 1000;
        }
        else if (interval === 'Minutes') {
            intervalInMilliseconds = 60 * 1000;
        }
        else if (interval === 'Seconds') {
            intervalInMilliseconds = 1000;
        }
        else {
            intervalInMilliseconds = 30 * 24 * 60 * 60 * 1000;
        }
        return intervalInMilliseconds;
    };
    /**
     * Get module name.
     */
    SplineSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'SplineSeries';
    };
    /**
     * To destroy the spline.
     * @return {void}
     * @private
     */
    SplineSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    SplineSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    return SplineSeries;
}(LineBase));

var __extends$33 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Technical Analysis module helps to predict the market trend
 */
var TechnicalAnalysis = /** @class */ (function (_super) {
    __extends$33(TechnicalAnalysis, _super);
    function TechnicalAnalysis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the collection of series, that are used to represent the given technical indicator
     * @private
     */
    TechnicalAnalysis.prototype.initSeriesCollection = function (indicator, chart) {
        indicator.targetSeries = [];
        var signalLine = new Series(indicator, 'targetSeries', {}, true);
        this.setSeriesProperties(signalLine, indicator, 'SignalLine', indicator.fill, indicator.width, chart);
    };
    /**
     * Initializes the properties of the given series
     * @private
     */
    TechnicalAnalysis.prototype.setSeriesProperties = function (series, indicator, name, fill, width, chart) {
        series.name = name;
        series.xName = 'x';
        series.yName = 'y';
        series.fill = fill || '#606eff';
        series.dashArray = indicator.dashArray;
        series.width = width;
        series.xAxisName = indicator.xAxisName;
        series.animation = indicator.animation;
        series.yAxisName = indicator.yAxisName;
        series.clipRectElement = indicator.clipRectElement;
        series.points = [];
        series.enableTooltip = true;
        series.interior = series.fill;
        series.category = 'Indicator';
        series.index = indicator.index;
        series.chart = chart;
        series.xMin = Infinity;
        series.xMax = -Infinity;
        series.yMin = Infinity;
        series.yMax = -Infinity;
        series.xData = [];
        series.yData = [];
        series.marker.visible = false;
        indicator.targetSeries.push(series);
    };
    /**
     * Creates the elements of a technical indicator
     * @private
     */
    TechnicalAnalysis.prototype.createIndicatorElements = function (chart, indicator, index) {
        if (indicator.seriesName || indicator.dataSource) {
            findClipRect(indicator.targetSeries[0]);
        }
        var clipRect = new Rect(0, 0, 0, 0);
        if (indicator.seriesName || indicator.dataSource) {
            clipRect = indicator.targetSeries[0].clipRect;
        }
        //defines the clip rect element
        var clipRectElement = chart.renderer.drawClipPath(new RectOption(chart.element.id + '_ChartIndicatorClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
            x: 0, y: 0, width: clipRect.width,
            height: clipRect.height,
        }));
        //creates the group for an indicator
        indicator.indicatorElement = chart.renderer.createGroup({
            'id': chart.element.id + 'IndicatorGroup' + index,
            'transform': 'translate(' + clipRect.x + ',' + clipRect.y + ')',
            'clip-path': 'url(#' + chart.element.id + '_ChartIndicatorClipRect_' + index + ')'
        });
        indicator.indicatorElement.appendChild(clipRectElement);
        //Defines a group for each series in a technical indicator
        for (var _i = 0, _a = indicator.targetSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            series.clipRectElement = clipRectElement;
            var element = series.chart.renderer.createGroup({
                'id': series.chart.element.id + '_Indicator_' +
                    indicator.index + '_' + series.name + '_Group'
            });
            indicator.indicatorElement.appendChild(element);
            series.seriesElement = element;
        }
        chart.indicatorElements.appendChild(indicator.indicatorElement);
    };
    TechnicalAnalysis.prototype.getDataPoint = function (x, y, sourcePoint, series, index, indicator) {
        if (indicator === void 0) { indicator = null; }
        var point = new Points();
        point.x = x;
        point.y = y;
        point.xValue = sourcePoint.xValue;
        point.color = series.fill;
        point.index = index;
        point.yValue = y;
        point.visible = true;
        series.xMin = Math.min(series.xMin, point.xValue);
        series.yMin = Math.min(series.yMin, point.yValue);
        series.xMax = Math.max(series.xMax, point.xValue);
        series.yMax = Math.max(series.yMax, point.yValue);
        series.xData.push(point.xValue);
        if (indicator && indicator.type === 'Macd' && series.type === 'Column') {
            if (point.y >= 0) {
                point.color = indicator.macdPositiveColor;
            }
            else {
                point.color = indicator.macdNegativeColor;
            }
        }
        return point;
    };
    TechnicalAnalysis.prototype.getRangePoint = function (x, high, low, sourcePoint, series, index, indicator) {
        if (indicator === void 0) { indicator = null; }
        var point = new Points();
        point.x = x;
        point.high = high;
        point.low = low;
        point.xValue = sourcePoint.xValue;
        point.color = series.fill;
        point.index = index;
        point.visible = true;
        series.xData.push(point.xValue);
        return point;
    };
    TechnicalAnalysis.prototype.setSeriesRange = function (points, indicator, series) {
        if (series === void 0) { series = null; }
        if (!series) {
            indicator.targetSeries[0].points = points;
        }
        else {
            series.points = points;
        }
    };
    return TechnicalAnalysis;
}(LineBase));

var __extends$32 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * SMA Indicator predicts the trend using moving average approach
 */
var SmaIndicator = /** @class */ (function (_super) {
    __extends$32(SmaIndicator, _super);
    function SmaIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the predictions based on SMA approach
     * @private
     */
    SmaIndicator.prototype.initDataSource = function (indicator, chart) {
        var smaPoints = [];
        var points = indicator.points;
        if (points && points.length) {
            //prepare data
            var validData = points;
            var field = firstToLowerCase(indicator.field);
            var xField = 'x';
            var signalSeries = indicator.targetSeries[0];
            if (validData && validData.length && validData.length >= indicator.period) {
                //find initial average
                var average = 0;
                var sum$$1 = 0;
                for (var i = 0; i < indicator.period; i++) {
                    sum$$1 += validData[i][field];
                }
                average = sum$$1 / indicator.period;
                smaPoints.push(this.getDataPoint(validData[indicator.period - 1][xField], average, validData[indicator.period - 1], signalSeries, smaPoints.length));
                var index = indicator.period;
                while (index < validData.length) {
                    sum$$1 -= validData[index - indicator.period][field];
                    sum$$1 += validData[index][field];
                    average = sum$$1 / indicator.period;
                    smaPoints.push(this.getDataPoint(validData[index][xField], average, validData[index], signalSeries, smaPoints.length));
                    index++;
                }
            }
            this.setSeriesRange(smaPoints, indicator);
        }
    };
    /**
     * To destroy the SMA indicator
     * @return {void}
     * @private
     */
    SmaIndicator.prototype.destroy = function (chart) {
        /**
         * Destroys the SMA indicator
         */
    };
    /**
     * Get module name.
     */
    SmaIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'SmaIndicator';
    };
    return SmaIndicator;
}(TechnicalAnalysis));

var __extends$34 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * EMA Indicator predicts the trend using moving average approach
 */
var EmaIndicator = /** @class */ (function (_super) {
    __extends$34(EmaIndicator, _super);
    function EmaIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the predictions based on EMA approach
     * @private
     */
    EmaIndicator.prototype.initDataSource = function (indicator, chart) {
        var field = firstToLowerCase(indicator.field);
        var xField = 'x';
        var emaPoints = [];
        var signalSeries = indicator.targetSeries[0];
        //prepare data
        var validData = indicator.points;
        if (validData && validData.length && validData.length >= indicator.period) {
            //find initial average
            var sum$$1 = 0;
            var average = 0;
            //smoothing factor
            var k = (2 / (indicator.period + 1));
            for (var i = 0; i < indicator.period; i++) {
                sum$$1 += validData[i][field];
            }
            average = sum$$1 / indicator.period;
            emaPoints.push(this.getDataPoint(validData[indicator.period - 1][xField], average, validData[indicator.period - 1], signalSeries, emaPoints.length));
            var index = indicator.period;
            while (index < validData.length) {
                //previous average
                var prevAverage = emaPoints[index - indicator.period][signalSeries.yName];
                var yValue = (validData[index][field] - prevAverage) * k + prevAverage;
                emaPoints.push(this.getDataPoint(validData[index][xField], yValue, validData[index], signalSeries, emaPoints.length));
                index++;
            }
        }
        this.setSeriesRange(emaPoints, indicator);
    };
    /**
     * To destroy the EMA Indicator
     * @return {void}
     * @private
     */
    EmaIndicator.prototype.destroy = function (chart) {
        /**
         * Destroys the EMA Indicator
         */
    };
    /**
     * Get module name.
     */
    EmaIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'EmaIndicator';
    };
    return EmaIndicator;
}(TechnicalAnalysis));

var __extends$35 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * TMA Indicator predicts the trend using moving average approach
 */
var TmaIndicator = /** @class */ (function (_super) {
    __extends$35(TmaIndicator, _super);
    function TmaIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the predictions based on TMA approach
     * @private
     */
    TmaIndicator.prototype.initDataSource = function (indicator, chart) {
        var tmaPoints = [];
        var field = firstToLowerCase(indicator.field);
        var xField = 'x';
        var signalSeries = indicator.targetSeries[0];
        //prepare data
        var validData = indicator.points;
        if (validData && validData.length && validData.length >= indicator.period) {
            var signalSeries_1 = indicator.targetSeries[0];
            //prepare data
            var validData_1 = indicator.points;
            if (validData_1.length && validData_1.length >= indicator.period) {
                //smoothing factor
                var k = (2 / (indicator.period + 1));
                //find initial average
                var sum$$1 = 0;
                var smaValues = [];
                //sma values
                var index = 0;
                var length_1 = validData_1.length;
                var period = indicator.period;
                while (length_1 >= period) {
                    sum$$1 = 0;
                    index = validData_1.length - length_1;
                    for (var j = index; j < index + period; j++) {
                        sum$$1 = sum$$1 + validData_1[j][field];
                    }
                    sum$$1 = sum$$1 / period;
                    smaValues.push(sum$$1);
                    length_1--;
                }
                //initial values
                for (var k_1 = 0; k_1 < period - 1; k_1++) {
                    sum$$1 = 0;
                    for (var j = 0; j < k_1 + 1; j++) {
                        sum$$1 = sum$$1 + validData_1[j][field];
                    }
                    sum$$1 = sum$$1 / (k_1 + 1);
                    smaValues.splice(k_1, 0, sum$$1);
                }
                index = indicator.period;
                while (index <= smaValues.length) {
                    sum$$1 = 0;
                    for (var j = index - indicator.period; j < index; j++) {
                        sum$$1 = sum$$1 + smaValues[j];
                    }
                    sum$$1 = sum$$1 / indicator.period;
                    tmaPoints.push(this.getDataPoint(validData_1[index - 1][xField], sum$$1, validData_1[index - 1], signalSeries_1, tmaPoints.length));
                    index++;
                }
            }
        }
        this.setSeriesRange(tmaPoints, indicator);
    };
    /**
     * To destroy the TMA indicator.
     * @return {void}
     * @private
     */
    TmaIndicator.prototype.destroy = function (chart) {
        /**
         * Destroys the TMA Indicator
         */
    };
    /**
     * Get module name.
     */
    TmaIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'TmaIndicator';
    };
    return TmaIndicator;
}(TechnicalAnalysis));

var __extends$36 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Defines How to represent the Accumulation Distribution TechnicalIndicator
 */
var AccumulationDistributionIndicator = /** @class */ (function (_super) {
    __extends$36(AccumulationDistributionIndicator, _super);
    function AccumulationDistributionIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the predictions using accumulation distribution approach
     * @private
     */
    AccumulationDistributionIndicator.prototype.initDataSource = function (indicator, chart) {
        var sourceSeries = indicator.sourceSeries;
        var adPoints = [];
        var validData = indicator.points;
        if (validData.length > 0 && validData.length > indicator.period) {
            adPoints = this.calculateADPoints(indicator, validData);
        }
        this.setSeriesRange(adPoints, indicator);
    };
    /**
     *  Calculates the Accumulation Distribution values
     * @private
     */
    AccumulationDistributionIndicator.prototype.calculateADPoints = function (indicator, validData) {
        var temp = [];
        var sum = 0;
        var i = 0;
        var value = 0;
        var high = 0;
        var low = 0;
        var close = 0;
        var signalSeries = indicator.targetSeries[0];
        for (i = 0; i < validData.length; i++) {
            high = Number(validData[i].high);
            low = Number(validData[i].low);
            close = Number(validData[i].close);
            /**
             * Money Flow Multiplier = [(Close -  Low) - (High - Close)] /(High - Low)
             * Money Flow Volume = Money Flow Multiplier x Volume for the Period
             * ADL = Previous ADL + Current Period's Money Flow Volume
             */
            value = ((close - low) - (high - close)) / (high - low);
            /**
             * Sum is to calculate the Y values of the Accumulation distribution indicator
             */
            sum = sum + value * Number(validData[i].volume);
            /**
             * To calculate the x and y values for the Accumulation distribution indicator
             */
            temp[i] = this.getDataPoint(validData[i].x, sum, validData[i], signalSeries, temp.length);
        }
        return temp;
    };
    /**
     * To destroy the Accumulation Distribution Technical Indicator.
     * @return {void}
     * @private
     */
    AccumulationDistributionIndicator.prototype.destroy = function (chart) {
        /**
         * Destroys the Accumulation Distribution Technical indicator
         */
    };
    /**
     * Get module name.
     */
    AccumulationDistributionIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the Indicator
         */
        return 'AccumulationDistributionIndicator';
    };
    return AccumulationDistributionIndicator;
}(TechnicalAnalysis));

var __extends$37 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Defines How to represent the Average true Range Technical Indicator
 */
var AtrIndicator = /** @class */ (function (_super) {
    __extends$37(AtrIndicator, _super);
    function AtrIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the predictions using Average True Range approach
     * @private
     */
    AtrIndicator.prototype.initDataSource = function (indicator, chart) {
        var sourceSeries = indicator.sourceSeries;
        var validData = indicator.points;
        if (validData.length > 0 && validData.length > indicator.period) {
            this.calculateATRPoints(indicator, validData);
        }
    };
    /**
     *  To calculate Average True Range indicator points
     * @private
     */
    AtrIndicator.prototype.calculateATRPoints = function (indicator, validData) {
        var average = 0;
        var highLow = 0;
        var highClose = 0;
        var lowClose = 0;
        var trueRange = 0;
        var points = [];
        var temp = [];
        var period = indicator.period;
        var sum = 0;
        var y = 'y';
        var signalSeries = indicator.targetSeries[0];
        for (var i = 0; i < validData.length; i++) {
            /**
             * Current High less the current Low
             * Current High less the previous Close (absolute value)
             * Current Low less the previous Close (absolute value)
             */
            highLow = Number(validData[i].high) - Number(validData[i].low);
            if (i > 0) {
                //
                highClose = Math.abs(Number(validData[i].high) - Number(validData[i - 1].close));
                lowClose = Math.abs(Number(validData[i].low) - Number(validData[i - 1].close));
            }
            /**
             * To find the maximum of highLow, highClose, lowClose
             */
            trueRange = Math.max(highLow, highClose, lowClose);
            sum = sum + trueRange;
            /**
             * Push the x and y values for the Average true range indicator
             */
            if (i >= period) {
                average = (Number(temp[i - 1][y]) * (period - 1) + trueRange) / period;
                points.push(this.getDataPoint(validData[i].x, average, validData[i], signalSeries, points.length));
            }
            else {
                average = sum / period;
                if (i === period - 1) {
                    points.push(this.getDataPoint(validData[i].x, average, validData[i], signalSeries, points.length));
                }
            }
            temp[i] = { x: validData[i].x, y: average };
        }
        this.setSeriesRange(points, indicator);
    };
    /**
     * To destroy the Average true range indicator.
     * @return {void}
     * @private
     */
    AtrIndicator.prototype.destroy = function (chart) {
        /**
         * Destroy the Average true range indicator
         */
    };
    /**
     * Get module name.
     */
    AtrIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the Indicator
         */
        return 'AtrIndicator';
    };
    return AtrIndicator;
}(TechnicalAnalysis));

var __extends$38 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Defines how to represent the market trend using momentum indicators
 */
var MomentumIndicator = /** @class */ (function (_super) {
    __extends$38(MomentumIndicator, _super);
    function MomentumIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the collection of series to represent a momentum indicator
     * @private
     */
    MomentumIndicator.prototype.initSeriesCollection = function (indicator, chart) {
        _super.prototype.initSeriesCollection.call(this, indicator, chart);
        var upperLine = new Series(indicator, 'targetSeries', {}, true);
        _super.prototype.setSeriesProperties.call(this, upperLine, indicator, 'UpperLine', indicator.upperLine.color, indicator.upperLine.width, chart);
    };
    /**
     * Defines the predictions using momentum approach
     * @private
     */
    MomentumIndicator.prototype.initDataSource = function (indicator, chart) {
        var upperCollection = [];
        var signalCollection = [];
        var validData = indicator.points;
        if (validData && validData.length) {
            var upperSeries = indicator.targetSeries[1];
            var signalSeries = indicator.targetSeries[0];
            var length_1 = indicator.period;
            if (validData.length >= indicator.period) {
                for (var i = 0; i < validData.length; i++) {
                    upperCollection.push(this.getDataPoint(validData[i].x, 100, validData[i], upperSeries, upperCollection.length));
                    if (!(i < length_1)) {
                        signalCollection.push(this.getDataPoint(validData[i].x, (Number(validData[i].close) / Number(validData[i - length_1].close) * 100), validData[i], signalSeries, signalCollection.length));
                    }
                }
            }
            this.setSeriesRange(signalCollection, indicator, indicator.targetSeries[0]);
            this.setSeriesRange(upperCollection, indicator, indicator.targetSeries[1]);
        }
    };
    /**
     * To destroy the momentum indicator
     * @return {void}
     * @private
     */
    MomentumIndicator.prototype.destroy = function (chart) {
        /**
         * Destroys the momentum indicator
         */
    };
    /**
     * Get module name.
     */
    MomentumIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'MomentumIndicator';
    };
    return MomentumIndicator;
}(TechnicalAnalysis));

var __extends$39 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * RSI predicts the trend using RSI approach
 */
var RsiIndicator = /** @class */ (function (_super) {
    __extends$39(RsiIndicator, _super);
    function RsiIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Initializes the series collection to represent the RSI Indicator
     * @private
     */
    RsiIndicator.prototype.initSeriesCollection = function (indicator, chart) {
        _super.prototype.initSeriesCollection.call(this, indicator, chart);
        if (indicator.showZones) {
            var lowerLine = new Series(indicator, 'targetSeries', {}, true);
            _super.prototype.setSeriesProperties.call(this, lowerLine, indicator, 'LowerLine', indicator.lowerLine.color, indicator.lowerLine.width, chart);
            var upperLine = new Series(indicator, 'targetSeries', {}, true);
            _super.prototype.setSeriesProperties.call(this, upperLine, indicator, 'UpperLine', indicator.upperLine.color, indicator.upperLine.width, chart);
        }
    };
    /**
     * Defines the predictions using RSI approach
     * @private
     */
    RsiIndicator.prototype.initDataSource = function (indicator, chart) {
        var signalCollection = [];
        var lowerCollection = [];
        var upperCollection = [];
        var signalSeries = indicator.targetSeries[0];
        //prepare data
        var validData = indicator.points;
        if (validData.length && validData.length >= indicator.period) {
            //Find upper band and lower band values
            if (indicator.showZones) {
                for (var i = 0; i < validData.length; i++) {
                    upperCollection.push(this.getDataPoint(validData[i].x, indicator.overBought, validData[i], indicator.targetSeries[1], upperCollection.length));
                    lowerCollection.push(this.getDataPoint(validData[i].x, indicator.overSold, validData[i], indicator.targetSeries[2], lowerCollection.length));
                }
            }
            //Find signal line value
            var prevClose = Number(validData[0].close);
            var gain = 0;
            var loss = 0;
            for (var i = 1; i <= indicator.period; i++) {
                var close_1 = Number(validData[i].close);
                if (close_1 > prevClose) {
                    gain += close_1 - prevClose;
                }
                else {
                    loss += prevClose - close_1;
                }
                prevClose = close_1;
            }
            gain = gain / indicator.period;
            loss = loss / indicator.period;
            signalCollection.push(this.getDataPoint(validData[indicator.period].x, 100 - (100 / (1 + gain / loss)), validData[indicator.period], signalSeries, signalCollection.length));
            for (var j = indicator.period + 1; j < validData.length; j++) {
                var close_2 = Number(validData[j].close);
                if (close_2 > prevClose) {
                    gain = (gain * (indicator.period - 1) + (close_2 - prevClose)) / indicator.period;
                    loss = (loss * (indicator.period - 1)) / indicator.period;
                }
                else if (close_2 < prevClose) {
                    loss = (loss * (indicator.period - 1) + (prevClose - close_2)) / indicator.period;
                    gain = (gain * (indicator.period - 1)) / indicator.period;
                }
                prevClose = close_2;
                signalCollection.push(this.getDataPoint(validData[j].x, 100 - (100 / (1 + gain / loss)), validData[j], signalSeries, signalCollection.length));
            }
        }
        this.setSeriesRange(signalCollection, indicator, indicator.targetSeries[0]);
        if (indicator.showZones) {
            this.setSeriesRange(upperCollection, indicator, indicator.targetSeries[1]);
            this.setSeriesRange(lowerCollection, indicator, indicator.targetSeries[2]);
        }
    };
    /**
     * To destroy the RSI Indicator.
     * @return {void}
     * @private
     */
    RsiIndicator.prototype.destroy = function (chart) {
        /**
         * Destroys the RSI Indicator
         */
    };
    /**
     * Get module name.
     */
    RsiIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the indicator.
         */
        return 'RsiIndicator';
    };
    return RsiIndicator;
}(TechnicalAnalysis));

var __extends$40 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Stochastic predicts the trend using Stochastic approach
 */
var StochasticIndicator = /** @class */ (function (_super) {
    __extends$40(StochasticIndicator, _super);
    function StochasticIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the collection of series that represents the stochastic indicator
     * @private
     */
    StochasticIndicator.prototype.initSeriesCollection = function (indicator, chart) {
        _super.prototype.initSeriesCollection.call(this, indicator, chart);
        var periodLine = new Series(indicator, 'targetSeries', {}, true);
        this.setSeriesProperties(periodLine, indicator, 'PeriodLine', indicator.periodLine.color, indicator.periodLine.width, chart);
        if (indicator.showZones) {
            var upperSeries = new Series(indicator, 'targetSeries', {}, true);
            this.setSeriesProperties(upperSeries, indicator, 'UpperLine', indicator.upperLine.color, indicator.upperLine.width, chart);
            var lowerSeries = new Series(indicator, 'targetSeries', {}, true);
            this.setSeriesProperties(lowerSeries, indicator, 'LowerLine', indicator.lowerLine.color, indicator.lowerLine.width, chart);
        }
    };
    /**
     * Defines the predictions based on stochastic approach
     * @private
     */
    StochasticIndicator.prototype.initDataSource = function (indicator, chart) {
        var signalCollection = [];
        var upperCollection = [];
        var lowerCollection = [];
        var periodCollection = [];
        var source = [];
        var sourceSeries = indicator.sourceSeries;
        var validData = indicator.points;
        if (validData.length && validData.length >= indicator.period) {
            if (indicator.showZones) {
                for (var i = 0; i < validData.length; i++) {
                    upperCollection.push(this.getDataPoint(validData[i].x, indicator.overBought, validData[i], indicator.targetSeries[2], upperCollection.length));
                    lowerCollection.push(this.getDataPoint(validData[i].x, indicator.overSold, validData[i], indicator.targetSeries[3], lowerCollection.length));
                }
            }
            source = this.calculatePeriod(indicator.period, indicator.kPeriod, validData, indicator.targetSeries[1]);
            periodCollection = this.smaCalculation(indicator.period, indicator.kPeriod, source, indicator.targetSeries[1]);
            signalCollection = this.smaCalculation(indicator.period + indicator.kPeriod - 1, indicator.dPeriod, source, indicator.targetSeries[0]);
        }
        this.setSeriesRange(signalCollection, indicator, indicator.targetSeries[0]);
        this.setSeriesRange(periodCollection, indicator, indicator.targetSeries[1]);
        if (indicator.showZones) {
            this.setSeriesRange(upperCollection, indicator, indicator.targetSeries[2]);
            this.setSeriesRange(lowerCollection, indicator, indicator.targetSeries[3]);
        }
    };
    /**
     * Calculates the SMA Values
     * @private
     */
    StochasticIndicator.prototype.smaCalculation = function (period, kPeriod, data, sourceSeries) {
        var pointCollection = [];
        if (data.length >= period + kPeriod) {
            var count = period + (kPeriod - 1);
            var temp = [];
            var values = [];
            for (var i = 0; i < data.length; i++) {
                var value = Number(data[i].y);
                temp.push(value);
            }
            var length_1 = temp.length;
            while (length_1 >= count) {
                var sum = 0;
                for (var i = period - 1; i < (period + kPeriod - 1); i++) {
                    sum = sum + temp[i];
                }
                sum = sum / kPeriod;
                values.push(sum.toFixed(2));
                temp.splice(0, 1);
                length_1 = temp.length;
            }
            var len = count - 1;
            for (var i = 0; i < data.length; i++) {
                if (!(i < len)) {
                    pointCollection.push(this.getDataPoint(data[i].x, Number(values[i - len]), data[i], sourceSeries, pointCollection.length));
                    data[i].y = Number((values[i - len]));
                }
            }
        }
        return pointCollection;
    };
    /**
     * Calculates the period line values.
     * @private
     */
    StochasticIndicator.prototype.calculatePeriod = function (period, kPeriod, data, series) {
        var lowValues = [];
        var highValues = [];
        var closeValues = [];
        var modifiedSource = [];
        for (var j = 0; j < data.length; j++) {
            lowValues[j] = data[j].low;
            highValues[j] = data[j].high;
            closeValues[j] = data[j].close;
        }
        if (data.length > period) {
            var mins = [];
            var maxs = [];
            for (var i = 0; i < period - 1; ++i) {
                maxs.push(0);
                mins.push(0);
                modifiedSource.push(this.getDataPoint(data[i].x, data[i].close, data[i], series, modifiedSource.length));
            }
            for (var i = period - 1; i < data.length; ++i) {
                var min = Number.MAX_VALUE;
                var max = Number.MIN_VALUE;
                for (var j = 0; j < period; ++j) {
                    min = Math.min(min, lowValues[i - j]);
                    max = Math.max(max, highValues[i - j]);
                }
                maxs.push(max);
                mins.push(min);
            }
            for (var i = period - 1; i < data.length; ++i) {
                var top_1 = 0;
                var bottom = 0;
                top_1 += closeValues[i] - mins[i];
                bottom += maxs[i] - mins[i];
                modifiedSource.push(this.getDataPoint(data[i].x, (top_1 / bottom) * 100, data[i], series, modifiedSource.length));
            }
        }
        return modifiedSource;
    };
    /**
     * To destroy the Stocastic Indicator.
     * @return {void}
     * @private
     */
    StochasticIndicator.prototype.destroy = function (chart) {
        /**
         * Destroys the stochastic indicator
         */
    };
    /**
     * Get module name.
     */
    StochasticIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the indicator.
         */
        return 'StochasticIndicator';
    };
    return StochasticIndicator;
}(TechnicalAnalysis));

var __extends$41 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Bollinger Band Indicator predicts the trend using Bollinger approach
 */
var BollingerBands = /** @class */ (function (_super) {
    __extends$41(BollingerBands, _super);
    function BollingerBands() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Initializes the series collection to represent bollinger band
     */
    BollingerBands.prototype.initSeriesCollection = function (indicator, chart) {
        indicator.targetSeries = [];
        var rangeArea = new Series(indicator, 'targetSeries', {}, true);
        rangeArea.type = 'RangeArea';
        if (indicator.bandColor !== 'transparent' && indicator.bandColor !== 'none') {
            this.setSeriesProperties(rangeArea, indicator, 'BollingerBand', indicator.bandColor, 0, chart);
        }
        var signalLine = new Series(indicator, 'targetSeries', {}, true);
        this.setSeriesProperties(signalLine, indicator, 'SignalLine', indicator.fill, indicator.width, chart);
        var upperLine = new Series(indicator, 'targetSeries', {}, true);
        this.setSeriesProperties(upperLine, indicator, 'UpperLine', indicator.upperLine.color, indicator.upperLine.width, chart);
        var lowerLine = new Series(indicator, 'targetSeries', {}, true);
        this.setSeriesProperties(lowerLine, indicator, 'LowerLine', indicator.lowerLine.color, indicator.lowerLine.width, chart);
    };
    /**
     * Defines the predictions using Bollinger Band Approach
     * @private
     */
    BollingerBands.prototype.initDataSource = function (indicator, chart) {
        var enableBand = indicator.bandColor !== 'transparent' && indicator.bandColor !== 'none';
        var start = enableBand ? 1 : 0;
        var signalCollection = [];
        var upperCollection = [];
        var lowerCollection = [];
        var bandCollection = [];
        var upperSeries = indicator.targetSeries[start + 1];
        var lowerSeries = indicator.targetSeries[start + 2];
        var signalSeries = indicator.targetSeries[start];
        var rangeAreaSeries = enableBand ? indicator.targetSeries[0] : null;
        //prepare data
        var validData = indicator.points;
        if (validData.length && validData.length >= indicator.period) {
            var sum = 0;
            var deviationSum = 0;
            var multiplier = indicator.standardDeviation;
            var limit = validData.length;
            var length_1 = Math.round(indicator.period);
            var smaPoints = [];
            var deviations = [];
            var bollingerPoints = [];
            for (var i_1 = 0; i_1 < length_1; i_1++) {
                sum += Number(validData[i_1].close);
            }
            var sma = sum / indicator.period;
            for (var i_2 = 0; i_2 < limit; i_2++) {
                var y = Number(validData[i_2].close);
                if (i_2 >= length_1 - 1 && i_2 < limit) {
                    if (i_2 - indicator.period >= 0) {
                        var diff = y - Number(validData[i_2 - length_1].close);
                        sum = sum + diff;
                        sma = sum / (indicator.period);
                        smaPoints[i_2] = sma;
                        deviations[i_2] = Math.pow(y - sma, 2);
                        deviationSum += deviations[i_2] - deviations[i_2 - length_1];
                    }
                    else {
                        smaPoints[i_2] = sma;
                        deviations[i_2] = Math.pow(y - sma, 2);
                        deviationSum += deviations[i_2];
                    }
                    var range = Math.sqrt(deviationSum / (indicator.period));
                    var lowerBand = smaPoints[i_2] - (multiplier * range);
                    var upperBand = smaPoints[i_2] + (multiplier * range);
                    if (i_2 + 1 === length_1) {
                        for (var j_1 = 0; j_1 < length_1 - 1; j_1++) {
                            bollingerPoints[j_1] = {
                                'X': validData[j_1].x, 'mb': smaPoints[i_2],
                                'lb': lowerBand, 'ub': upperBand, visible: true
                            };
                        }
                    }
                    bollingerPoints[i_2] = {
                        'X': validData[i_2].x, 'mb': smaPoints[i_2],
                        'lb': lowerBand, 'ub': upperBand, visible: true
                    };
                }
                else {
                    if (i_2 < indicator.period - 1) {
                        smaPoints[i_2] = sma;
                        deviations[i_2] = Math.pow(y - sma, 2);
                        deviationSum += deviations[i_2];
                    }
                }
            }
            var i = -1;
            var j = -1;
            for (var k = 0; k < limit; k++) {
                if (k >= (length_1 - 1)) {
                    var ub = 'ub';
                    var lb = 'lb';
                    var mb = 'mb';
                    upperCollection.push(this.getDataPoint(validData[k].x, bollingerPoints[k][ub], validData[k], upperSeries, upperCollection.length));
                    lowerCollection.push(this.getDataPoint(validData[k].x, bollingerPoints[k][lb], validData[k], lowerSeries, lowerCollection.length));
                    signalCollection.push(this.getDataPoint(validData[k].x, bollingerPoints[k][mb], validData[k], signalSeries, signalCollection.length));
                    if (enableBand) {
                        bandCollection.push(this.getRangePoint(validData[k].x, upperCollection[++i].y, lowerCollection[++j].y, validData[k], rangeAreaSeries, bandCollection.length));
                    }
                }
            }
        }
        if (enableBand) {
            this.setSeriesRange(bandCollection, indicator, indicator.targetSeries[0]);
        }
        this.setSeriesRange(signalCollection, indicator, indicator.targetSeries[start]);
        this.setSeriesRange(upperCollection, indicator, indicator.targetSeries[start + 1]);
        this.setSeriesRange(lowerCollection, indicator, indicator.targetSeries[start + 2]);
    };
    /**
     * To destroy the Bollinger Band.
     * @return {void}
     * @private
     */
    BollingerBands.prototype.destroy = function (chart) {
        /**
         * Destroys the bollinger band
         */
    };
    /**
     * Get module name.
     */
    BollingerBands.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'BollingerBandsIndicator';
    };
    return BollingerBands;
}(TechnicalAnalysis));

var __extends$42 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * MACD Indicator predicts the trend using MACD approach
 */
var MacdIndicator = /** @class */ (function (_super) {
    __extends$42(MacdIndicator, _super);
    function MacdIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the collection of series to represent the MACD indicator
     * @private
     */
    MacdIndicator.prototype.initSeriesCollection = function (indicator, chart) {
        _super.prototype.initSeriesCollection.call(this, indicator, chart);
        if (indicator.macdType === 'Line' || indicator.macdType === 'Both') {
            var macdSeries = new Series(indicator, 'targetSeries', {}, true);
            this.setSeriesProperties(macdSeries, indicator, 'MacdLine', indicator.macdLine.color, indicator.macdLine.width, chart);
        }
        if (indicator.macdType === 'Histogram' || indicator.macdType === 'Both') {
            var histogramSeries = new Series(indicator, 'targetSeries', {}, true);
            histogramSeries.type = 'Column';
            this.setSeriesProperties(histogramSeries, indicator, 'Histogram', indicator.macdPositiveColor, indicator.width, chart);
        }
    };
    /**
     * Defines the predictions using MACD approach
     * @private
     */
    MacdIndicator.prototype.initDataSource = function (indicator, chart) {
        var signalCollection = [];
        var fastPeriod = indicator.fastPeriod;
        var slowPeriod = indicator.slowPeriod;
        var trigger = indicator.period;
        var length = fastPeriod + trigger;
        var macdCollection = [];
        var histogramCollection = [];
        var validData = indicator.points;
        var signalSeries = indicator.targetSeries[0];
        var histogramSeries;
        var macdLineSeries;
        if (indicator.macdType === 'Histogram') {
            histogramSeries = indicator.targetSeries[1];
        }
        else {
            macdLineSeries = indicator.targetSeries[1];
            if (indicator.macdType === 'Both') {
                histogramSeries = indicator.targetSeries[2];
            }
        }
        if (validData && length < validData.length && slowPeriod <= fastPeriod &&
            slowPeriod > 0 && (length - 2) >= 0) {
            var shortEMA = this.calculateEMAValues(slowPeriod, validData, 'close');
            var longEMA = this.calculateEMAValues(fastPeriod, validData, 'close');
            var macdValues = this.getMACDVales(indicator, shortEMA, longEMA);
            macdCollection = this.getMACDPoints(indicator, macdValues, validData, macdLineSeries || signalSeries);
            var signalEMA = this.calculateEMAValues(trigger, macdCollection, 'y');
            signalCollection = this.getSignalPoints(indicator, signalEMA, validData, signalSeries);
            if (histogramSeries) {
                histogramCollection = this.getHistogramPoints(indicator, macdValues, signalEMA, validData, histogramSeries);
            }
        }
        this.setSeriesRange(signalCollection, indicator, indicator.targetSeries[0]);
        if (histogramSeries) {
            this.setSeriesRange(histogramCollection, indicator, histogramSeries);
        }
        if (macdLineSeries) {
            this.setSeriesRange(macdCollection, indicator, macdLineSeries);
        }
    };
    /**
     * Calculates the EMA values for the given period
     */
    MacdIndicator.prototype.calculateEMAValues = function (period, validData, field) {
        var sum = 0;
        var initialEMA = 0;
        var emaValues = [];
        var emaPercent = (2 / (period + 1));
        for (var i = 0; i < period; i++) {
            sum += Number(validData[i][field]);
        }
        initialEMA = (sum / period);
        emaValues.push(initialEMA);
        var emaAvg = initialEMA;
        for (var j = period; j < validData.length; j++) {
            emaAvg = (Number(validData[j][field]) - emaAvg) * emaPercent + emaAvg;
            emaValues.push(emaAvg);
        }
        return emaValues;
    };
    /**
     * Defines the MACD Points
     */
    MacdIndicator.prototype.getMACDPoints = function (indicator, macdPoints, validData, series) {
        var macdCollection = [];
        var dataMACDIndex = indicator.fastPeriod - 1;
        var macdIndex = 0;
        while (dataMACDIndex < validData.length) {
            macdCollection.push(this.getDataPoint(validData[dataMACDIndex].x, macdPoints[macdIndex], validData[dataMACDIndex], series, macdCollection.length));
            dataMACDIndex++;
            macdIndex++;
        }
        return macdCollection;
    };
    /**
     * Calculates the signal points
     */
    MacdIndicator.prototype.getSignalPoints = function (indicator, signalEma, validData, series) {
        var dataSignalIndex = indicator.fastPeriod + indicator.period - 2;
        var signalIndex = 0;
        var signalCollection = [];
        while (dataSignalIndex < validData.length) {
            signalCollection.push(this.getDataPoint(validData[dataSignalIndex].x, signalEma[signalIndex], validData[dataSignalIndex], series, signalCollection.length));
            dataSignalIndex++;
            signalIndex++;
        }
        return signalCollection;
    };
    /**
     * Calculates the MACD values
     */
    MacdIndicator.prototype.getMACDVales = function (indicator, shortEma, longEma) {
        var macdPoints = [];
        var diff = indicator.fastPeriod - indicator.slowPeriod;
        for (var i = 0; i < longEma.length; i++) {
            macdPoints.push((shortEma[i + diff] - longEma[i]));
        }
        return macdPoints;
    };
    /**
     * Calculates the Histogram Points
     */
    MacdIndicator.prototype.getHistogramPoints = function (indicator, macdPoints, signalEma, validData, series) {
        var dataHistogramIndex = indicator.fastPeriod + indicator.period - 2;
        var histogramIndex = 0;
        var histogramCollection = [];
        while (dataHistogramIndex < validData.length) {
            histogramCollection.push(this.getDataPoint(validData[dataHistogramIndex].x, macdPoints[histogramIndex + (indicator.period - 1)] - signalEma[histogramIndex], validData[dataHistogramIndex], series, histogramCollection.length, indicator));
            dataHistogramIndex++;
            histogramIndex++;
        }
        return histogramCollection;
    };
    /**
     * To destroy the MACD Indicator.
     * @return {void}
     * @private
     */
    MacdIndicator.prototype.destroy = function (chart) {
        /**
         * Destroys the MACD indicator
         */
    };
    /**
     * Get module name.
     */
    MacdIndicator.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'MacdIndicator';
    };
    return MacdIndicator;
}(TechnicalAnalysis));

/**
 * Trendline module helps to predict the market trend using predefined approaches
 */
var Trendlines = /** @class */ (function () {
    function Trendlines() {
    }
    /**
     * Defines the collection of series, that are used to represent a trendline
     * @private
     */
    Trendlines.prototype.initSeriesCollection = function (trendline, chart) {
        var trendLineSeries = new Series(trendline, 'targetSeries', {}, true);
        if (trendline.type === 'Linear' || trendline.type === 'MovingAverage') {
            trendLineSeries.type = 'Line';
        }
        else {
            trendLineSeries.type = 'Spline';
        }
        this.setSeriesProperties(trendLineSeries, trendline, trendline.type, trendline.fill, trendline.width, chart);
    };
    /**
     * Initializes the properties of the trendline series
     */
    Trendlines.prototype.setSeriesProperties = function (series, trendline, name, fill, width, chart) {
        series.name = trendline.name;
        series.xName = 'x';
        series.yName = 'y';
        series.fill = fill || 'blue';
        series.width = width;
        series.clipRectElement = trendline.clipRectElement;
        series.points = [];
        series.enableTooltip = trendline.enableTooltip;
        series.index = trendline.index;
        series.sourceIndex = trendline.sourceIndex;
        series.interior = series.fill;
        series.animation = trendline.animation;
        series.legendShape = 'HorizontalLine';
        series.marker = trendline.marker;
        series.category = 'TrendLine';
        series.chart = chart;
        series.xMin = Infinity;
        series.xMax = -Infinity;
        series.yMin = Infinity;
        series.yMax = -Infinity;
        series.xData = [];
        series.yData = [];
        trendline.targetSeries = series;
    };
    /**
     * Creates the elements of a trendline
     */
    Trendlines.prototype.createTrendLineElements = function (chart, trendline, index, element, clipRectElement) {
        trendline.trendLineElement = element;
        trendline.targetSeries.clipRectElement = clipRectElement;
        trendline.targetSeries.seriesElement = element;
        chart.trendLineElements.appendChild(trendline.trendLineElement);
    };
    /**
     * Defines the data point of trendline
     */
    Trendlines.prototype.getDataPoint = function (x, y, sourcePoint, series, index) {
        var trendPoint = new Points();
        trendPoint.x = x;
        trendPoint.y = y;
        trendPoint.xValue = Number(x);
        trendPoint.color = series.fill;
        trendPoint.index = index;
        trendPoint.yValue = Number(y);
        trendPoint.visible = true;
        series.xMin = Math.min(series.xMin, trendPoint.xValue);
        series.yMin = Math.min(series.yMin, trendPoint.yValue);
        series.xMax = Math.max(series.xMax, trendPoint.xValue);
        series.yMax = Math.max(series.yMax, trendPoint.yValue);
        series.xData.push(trendPoint.xValue);
        return trendPoint;
    };
    /**
     * Finds the slope and intercept of trendline
     */
    Trendlines.prototype.findSlopeIntercept = function (xValues, yValues, trendline, points) {
        var xAvg = 0;
        var yAvg = 0;
        var xyAvg = 0;
        var xxAvg = 0;
        var yyAvg = 0;
        var index = 0;
        var slope = 0;
        var intercept = 0;
        while (index < points.length) {
            xAvg += xValues[index];
            yAvg += yValues[index];
            xyAvg += xValues[index] * yValues[index];
            xxAvg += xValues[index] * xValues[index];
            yyAvg += yValues[index] * yValues[index];
            index++;
        }
        var type = trendline.type;
        if (trendline.intercept && (type === 'Linear' || type === 'Exponential')) {
            intercept = trendline.intercept;
            switch (type) {
                case 'Linear':
                    slope = ((xyAvg) - (trendline.intercept * xAvg)) / xxAvg;
                    break;
                case 'Exponential':
                    slope = ((xyAvg) - (Math.log(Math.abs(trendline.intercept)) * xAvg)) / xxAvg;
                    break;
            }
        }
        else {
            slope = ((points.length * xyAvg) - (xAvg * yAvg)) / ((points.length * xxAvg) - (xAvg * xAvg));
            if (type === 'Exponential' || type === 'Power') {
                intercept = Math.exp((yAvg - (slope * xAvg)) / points.length);
            }
            else {
                intercept = (yAvg - (slope * xAvg)) / points.length;
            }
        }
        return { slope: slope, intercept: intercept };
    };
    /**
     * Defines the points to draw the trendlines
     */
    Trendlines.prototype.initDataSource = function (trendline, chart) {
        var points = trendline.points;
        if (points && points.length) {
            //prepare data
            var trendlineSeries = trendline.targetSeries;
            switch (trendline.type) {
                case 'Linear':
                    this.setLinearRange(points, trendline, trendlineSeries);
                    break;
                case 'Exponential':
                    this.setExponentialRange(points, trendline, trendlineSeries);
                    break;
                case 'MovingAverage':
                    this.setMovingAverageRange(points, trendline, trendlineSeries);
                    break;
                case 'Polynomial':
                    this.setPolynomialRange(points, trendline, trendlineSeries);
                    break;
                case 'Power':
                    this.setPowerRange(points, trendline, trendlineSeries);
                    break;
                case 'Logarithmic':
                    this.setLogarithmicRange(points, trendline, trendlineSeries);
                    break;
            }
            if (trendline.type !== 'Linear' && trendline.type !== 'MovingAverage') {
                trendlineSeries.chart.splineSeriesModule.findSplinePoint(trendlineSeries);
            }
        }
    };
    /**
     * Calculation of exponential Points
     */
    Trendlines.prototype.setExponentialRange = function (points, trendline, series) {
        var xValue = [];
        var yValue = [];
        var index = 0;
        var slopeIntercept;
        while (index < points.length) {
            var point = points[index];
            xValue.push(point.xValue);
            yValue.push(Math.log(point.yValue));
            index++;
        }
        slopeIntercept = this.findSlopeIntercept(xValue, yValue, trendline, points);
        series.points = this.getExponentialPoints(trendline, points, xValue, yValue, series, slopeIntercept);
    };
    /**
     * Calculation of logarithmic points
     */
    Trendlines.prototype.setLogarithmicRange = function (points, trendline, series) {
        var xLogValue = [];
        var yLogValue = [];
        var xPointsLgr = [];
        var slopeIntercept;
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            xPointsLgr.push(point.xValue);
            xLogValue.push(Math.log(point.xValue));
            yLogValue.push(point.yValue);
            index++;
        }
        slopeIntercept = this.findSlopeIntercept(xLogValue, yLogValue, trendline, points);
        series.points = this.getLogarithmicPoints(trendline, points, xPointsLgr, yLogValue, series, slopeIntercept);
    };
    /**
     * Calculation of polynomial points
     */
    Trendlines.prototype.setPolynomialRange = function (points, trendline, series) {
        var xPolyValues = [];
        var yPolyValues = [];
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            xPolyValues.push(point.xValue);
            yPolyValues.push(point.yValue);
            index++;
        }
        series.points = this.getPolynomialPoints(trendline, points, xPolyValues, yPolyValues, series);
    };
    /**
     * Calculation of power points
     */
    Trendlines.prototype.setPowerRange = function (points, trendline, series) {
        var xValues = [];
        var yValues = [];
        var powerPoints = [];
        var slopeIntercept;
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            powerPoints.push(point.xValue);
            xValues.push(Math.log(point.xValue));
            yValues.push(Math.log(point.yValue));
            index++;
        }
        slopeIntercept = this.findSlopeIntercept(xValues, yValues, trendline, points);
        series.points = this.getPowerPoints(trendline, points, powerPoints, yValues, series, slopeIntercept);
    };
    /**
     * Calculation of linear points
     */
    Trendlines.prototype.setLinearRange = function (points, trendline, series) {
        var xValues = [];
        var yValues = [];
        var slopeIntercept;
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            xValues.push(point.xValue);
            yValues.push(point.yValue);
            index++;
        }
        slopeIntercept = this.findSlopeIntercept(xValues, yValues, trendline, points);
        series.points = this.getLinearPoints(trendline, points, xValues, yValues, series, slopeIntercept);
    };
    /**
     * Calculation of moving average points
     */
    Trendlines.prototype.setMovingAverageRange = function (points, trendline, series) {
        var xValues = [];
        var yValues = [];
        var xAvgValues = [];
        var index = 0;
        while (index < points.length) {
            var point = points[index];
            xAvgValues.push(point.xValue);
            xValues.push(index + 1);
            yValues.push(point.yValue);
            index++;
        }
        series.points = this.getMovingAveragePoints(trendline, points, xAvgValues, yValues, series);
    };
    /**
     * Calculation of logarithmic points
     */
    Trendlines.prototype.getLogarithmicPoints = function (trendline, points, xValues, yValues, series, slopeInterceptLog) {
        var midPoint = Math.round((points.length / 2));
        var pts = [];
        var x1Log = xValues[0] - trendline.backwardForecast;
        var y1Log = slopeInterceptLog.intercept + (slopeInterceptLog.slope * Math.log(x1Log));
        var x2Log = xValues[midPoint - 1];
        var y2Log = slopeInterceptLog.intercept + (slopeInterceptLog.slope * Math.log(x2Log));
        var x3Log = xValues[xValues.length - 1] + trendline.forwardForecast;
        var y3Log = slopeInterceptLog.intercept + (slopeInterceptLog.slope * Math.log(x3Log));
        pts.push(this.getDataPoint(x1Log, y1Log, points[0], series, pts.length));
        pts.push(this.getDataPoint(x2Log, y2Log, points[midPoint - 1], series, pts.length));
        pts.push(this.getDataPoint(x3Log, y3Log, points[points.length - 1], series, pts.length));
        return pts;
    };
    /**
     * Defines the points based on data point
     */
    Trendlines.prototype.getPowerPoints = function (trendline, points, xValues, yValues, series, slopeInterceptPower) {
        var midPoint = Math.round((points.length / 2));
        var pts = [];
        var x1 = xValues[0] - trendline.backwardForecast;
        x1 = x1 > -1 ? x1 : 0;
        var y1 = slopeInterceptPower.intercept * Math.pow(x1, slopeInterceptPower.slope);
        var x2 = xValues[midPoint - 1];
        var y2 = slopeInterceptPower.intercept * Math.pow(x2, slopeInterceptPower.slope);
        var x3 = xValues[xValues.length - 1] + trendline.forwardForecast;
        var y3 = slopeInterceptPower.intercept * Math.pow(x3, slopeInterceptPower.slope);
        pts.push(this.getDataPoint(x1, y1, points[0], series, pts.length));
        pts.push(this.getDataPoint(x2, y2, points[midPoint - 1], series, pts.length));
        pts.push(this.getDataPoint(x3, y3, points[points.length - 1], series, pts.length));
        return pts;
    };
    /**
     * Get the polynomial points based on polynomial slopes
     */
    Trendlines.prototype.getPolynomialPoints = function (trendline, points, xValues, yValues, series) {
        var midPoint = Math.round((points.length / 2));
        var pts = [];
        var polynomialOrder = points.length <= trendline.polynomialOrder ? points.length : trendline.polynomialOrder;
        polynomialOrder = Math.max(2, polynomialOrder);
        polynomialOrder = Math.min(6, polynomialOrder);
        trendline.polynomialOrder = polynomialOrder;
        trendline.polynomialSlopes = [];
        trendline.polynomialSlopes.length = trendline.polynomialOrder + 1;
        var index = 0;
        while (index < xValues.length) {
            var xVal = xValues[index];
            var yVal = yValues[index];
            var subIndex = 0;
            while (subIndex <= trendline.polynomialOrder) {
                if (!trendline.polynomialSlopes[subIndex]) {
                    trendline.polynomialSlopes[subIndex] = 0;
                }
                trendline.polynomialSlopes[subIndex] += Math.pow(xVal, subIndex) * yVal;
                ++subIndex;
            }
            index++;
        }
        var numArray = [];
        numArray.length = 1 + 2 * trendline.polynomialOrder;
        var matrix = [];
        matrix.length = trendline.polynomialOrder + 1;
        var newIndex = 0;
        while (newIndex < (trendline.polynomialOrder + 1)) {
            matrix[newIndex] = [];
            matrix[newIndex].length = 3;
            newIndex++;
        }
        var nIndex = 0;
        while (nIndex < xValues.length) {
            var d = xValues[nIndex];
            var num2 = 1.0;
            var nIndex2 = 0;
            while (nIndex2 < numArray.length) {
                if (!numArray[nIndex2]) {
                    numArray[nIndex2] = 0;
                }
                numArray[nIndex2] += num2;
                num2 *= d;
                ++nIndex2;
            }
            ++nIndex;
        }
        var nnIndex = 0;
        while (nnIndex <= trendline.polynomialOrder) {
            var nnIndex2 = 0;
            while (nnIndex2 <= trendline.polynomialOrder) {
                matrix[nnIndex][nnIndex2] = numArray[nnIndex + nnIndex2];
                ++nnIndex2;
            }
            ++nnIndex;
        }
        if (!this.gaussJordanElimination(matrix, trendline.polynomialSlopes)) {
            trendline.polynomialSlopes = null;
        }
        pts = this.getPoints(trendline, points, xValues, yValues, series);
        return pts;
    };
    /**
     * Defines the moving average points
     */
    Trendlines.prototype.getMovingAveragePoints = function (trendline, points, xValues, yValues, series) {
        var pts = [];
        var period = trendline.period >= points.length ? points.length - 1 : trendline.period;
        period = Math.max(2, period);
        var index = 0;
        var y;
        var x;
        var count;
        var nullCount;
        while (index < points.length - 1) {
            y = count = nullCount = 0;
            for (var j = index; count < period; j++) {
                count++;
                if (!yValues[j]) {
                    nullCount++;
                }
                y += yValues[j];
            }
            y = period - nullCount <= 0 ? null : y / (period - nullCount);
            if (y && !isNaN(y)) {
                x = xValues[period - 1 + index];
                pts.push(this.getDataPoint(x, y, points[period - 1 + index], series, pts.length));
            }
            index++;
        }
        return pts;
    };
    /**
     * Defines the linear points
     */
    Trendlines.prototype.getLinearPoints = function (trendline, points, xValues, yValues, series, slopeInterceptLinear) {
        var pts = [];
        var x1Linear = xValues[0] - trendline.backwardForecast;
        var y1Linear = slopeInterceptLinear.slope * x1Linear + slopeInterceptLinear.intercept;
        var x2Linear = xValues[xValues.length - 1] + trendline.forwardForecast;
        var y2Linear = slopeInterceptLinear.slope * x2Linear + slopeInterceptLinear.intercept;
        pts.push(this.getDataPoint(x1Linear, y1Linear, points[0], series, pts.length));
        pts.push(this.getDataPoint(x2Linear, y2Linear, points[points.length - 1], series, pts.length));
        return pts;
    };
    /**
     * Defines the exponential points
     */
    Trendlines.prototype.getExponentialPoints = function (trendline, points, xValues, yValues, series, slopeInterceptExp) {
        var midPoint = Math.round((points.length / 2));
        var ptsExp = [];
        var x1 = xValues[0] - trendline.backwardForecast;
        var y1 = slopeInterceptExp.intercept * Math.exp(slopeInterceptExp.slope * x1);
        var x2 = xValues[midPoint - 1];
        var y2 = slopeInterceptExp.intercept * Math.exp(slopeInterceptExp.slope * x2);
        var x3 = xValues[xValues.length - 1] + trendline.forwardForecast;
        var y3 = slopeInterceptExp.intercept * Math.exp(slopeInterceptExp.slope * x3);
        ptsExp.push(this.getDataPoint(x1, y1, points[0], series, ptsExp.length));
        ptsExp.push(this.getDataPoint(x2, y2, points[midPoint - 1], series, ptsExp.length));
        ptsExp.push(this.getDataPoint(x3, y3, points[points.length - 1], series, ptsExp.length));
        return ptsExp;
    };
    /**
     * Defines the points based on data point
     */
    Trendlines.prototype.getPoints = function (trendline, points, xValues, yValues, series) {
        var midPoint = Math.round((points.length / 2));
        var polynomialSlopes = trendline.polynomialSlopes;
        var pts = [];
        var x1 = 1;
        var index = 1;
        var xValue;
        var yValue;
        while (index <= polynomialSlopes.length) {
            if (index === 1) {
                xValue = xValues[0] - trendline.backwardForecast;
                yValue = this.getPolynomialYValue(polynomialSlopes, xValue);
                pts.push(this.getDataPoint(xValue, yValue, points[0], series, pts.length));
            }
            else if (index === polynomialSlopes.length) {
                xValue = xValues[points.length - 1] + trendline.forwardForecast;
                yValue = this.getPolynomialYValue(polynomialSlopes, xValue);
                pts.push(this.getDataPoint(xValue, yValue, points[points.length - 1], series, pts.length));
            }
            else {
                x1 += (points.length + trendline.forwardForecast) / polynomialSlopes.length;
                xValue = xValues[parseInt(x1.toString(), 10) - 1];
                yValue = this.getPolynomialYValue(polynomialSlopes, xValue);
                pts.push(this.getDataPoint(xValue, yValue, points[parseInt(x1.toString(), 10) - 1], series, pts.length));
            }
            index++;
        }
        return pts;
    };
    /**
     * Defines the polynomial value of y
     */
    Trendlines.prototype.getPolynomialYValue = function (slopes, x) {
        var sum$$1 = 0;
        var index = 0;
        while (index < slopes.length) {
            sum$$1 += slopes[index] * Math.pow(x, index);
            index++;
        }
        return sum$$1;
    };
    /**
     * Defines the gauss jordan elimination
     */
    Trendlines.prototype.gaussJordanElimination = function (matrix, polynomialSlopes) {
        var length = matrix.length;
        var numArray1 = [];
        var numArray2 = [];
        var numArray3 = [];
        numArray1.length = length;
        numArray2.length = length;
        numArray3.length = length;
        var index = 0;
        while (index < length) {
            numArray3[index] = 0;
            ++index;
        }
        var index1 = 0;
        while (index1 < length) {
            var num1 = 0;
            var index2 = 0;
            var index3 = 0;
            var index4 = 0;
            while (index4 < length) {
                if (numArray3[index4] !== 1) {
                    var index5 = 0;
                    while (index5 < length) {
                        if (numArray3[index5] === 0 && Math.abs(matrix[index4][index5]) >= num1) {
                            num1 = Math.abs(matrix[index4][index5]);
                            index2 = index4;
                            index3 = index5;
                        }
                        ++index5;
                    }
                }
                ++index4;
            }
            ++numArray3[index3];
            if (index2 !== index3) {
                var index4_1 = 0;
                while (index4_1 < length) {
                    var num2 = matrix[index2][index4_1];
                    matrix[index2][index4_1] = matrix[index3][index4_1];
                    matrix[index3][index4_1] = num2;
                    ++index4_1;
                }
                var num3 = polynomialSlopes[index2];
                polynomialSlopes[index2] = polynomialSlopes[index3];
                polynomialSlopes[index3] = num3;
            }
            numArray2[index1] = index2;
            numArray1[index1] = index3;
            if (matrix[index3][index3] === 0.0) {
                return false;
            }
            var num4 = 1.0 / matrix[index3][index3];
            matrix[index3][index3] = 1.0;
            var iindex4 = 0;
            while (iindex4 < length) {
                matrix[index3][iindex4] *= num4;
                ++iindex4;
            }
            polynomialSlopes[index3] *= num4;
            var iandex4 = 0;
            while (iandex4 < length) {
                if (iandex4 !== index3) {
                    var num2 = matrix[iandex4][index3];
                    matrix[iandex4][index3] = 0.0;
                    var index5 = 0;
                    while (index5 < length) {
                        matrix[iandex4][index5] -= matrix[index3][index5] * num2;
                        ++index5;
                    }
                    polynomialSlopes[iandex4] -= polynomialSlopes[index3] * num2;
                }
                ++iandex4;
            }
            ++index1;
        }
        var iindex1 = length - 1;
        while (iindex1 >= 0) {
            if (numArray2[iindex1] !== numArray1[iindex1]) {
                var iindex2 = 0;
                while (iindex2 < length) {
                    var num = matrix[iindex2][numArray2[iindex1]];
                    matrix[iindex2][numArray2[iindex1]] = matrix[iindex2][numArray1[iindex1]];
                    matrix[iindex2][numArray1[iindex1]] = num;
                    ++iindex2;
                }
            }
            --iindex1;
        }
        return true;
    };
    /**
     * Defines the trendline elements
     */
    Trendlines.prototype.getTrendLineElements = function (series, chart) {
        findClipRect(series);
        var clipRect = series.clipRect;
        var clipRectElement = chart.renderer.drawClipPath(new RectOption(chart.element.id + '_ChartTrendlineClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1, {
            x: 0, y: 0, width: clipRect.width,
            height: clipRect.height,
        }));
        var element;
        element = chart.renderer.createGroup({
            'id': chart.element.id + 'TrendlineSeriesGroup' + series.index,
            'transform': 'translate(' + clipRect.x + ',' + clipRect.y + ')',
            'clip-path': 'url(#' + chart.element.id + '_ChartTrendlineClipRect_' + series.index + ')'
        });
        //defines the clip rect element
        element.appendChild(clipRectElement);
        for (var _i = 0, _a = series.trendlines; _i < _a.length; _i++) {
            var trendline = _a[_i];
            this.createTrendLineElements(chart, trendline, trendline.index, element, clipRectElement);
        }
    };
    /**
     * To destroy the trendline
     */
    Trendlines.prototype.destroy = function (chart) {
        /**
         * Destroys the Linear Trendline
         */
    };
    /**
     * Get module name
     */
    Trendlines.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'TrendLine';
    };
    return Trendlines;
}());

/**
 * Crosshair Module used to render the crosshair for chart.
 */
var Crosshair = /** @class */ (function () {
    /**
     * Constructor for crosshair module.
     * @private
     */
    function Crosshair(chart) {
        this.arrowLocation = new ChartLocation(0, 0);
        this.rx = 2;
        this.ry = 2;
        this.chart = chart;
        this.elementID = this.chart.element.id;
        this.addEventListener();
    }
    /**
     * @hidden
     */
    Crosshair.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);
    };
    Crosshair.prototype.mouseUpHandler = function () {
        if (this.chart.startMove) {
            this.removeCrosshair(2000);
        }
    };
    Crosshair.prototype.mouseLeaveHandler = function () {
        this.removeCrosshair(1000);
    };
    Crosshair.prototype.mouseMoveHandler = function (event) {
        var chart = this.chart;
        if (event.type === 'touchmove' && (Browser.isIos || Browser.isIos7) && chart.startMove && event.preventDefault) {
            event.preventDefault();
        }
        // Tooltip for chart series.
        if (!chart.disableTrackTooltip) {
            if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                if (chart.startMove || !chart.isTouch) {
                    this.crosshair();
                }
            }
            else {
                this.removeCrosshair(1000);
            }
        }
    };
    /**
     * Handles the long press on chart.
     * @return {boolean}
     * @private
     */
    Crosshair.prototype.longPress = function () {
        var chart = this.chart;
        if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.crosshair();
        }
        return false;
    };
    /**
     * Renders the crosshair.
     * @return {void}
     * @private
     */
    Crosshair.prototype.crosshair = function () {
        var chart = this.chart;
        var horizontalCross = '';
        var verticalCross = '';
        var options;
        var crosshair = chart.crosshair;
        var chartRect = chart.chartAxisLayoutPanel.seriesClipRect;
        var crossGroup = document.getElementById(this.elementID + '_UserInteraction');
        this.stopAnimation();
        if (chart.tooltip.enable && !withInBounds(chart.tooltipModule.valueX, chart.tooltipModule.valueY, chartRect)) {
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
            options = new PathOption(this.elementID + '_HorizontalLine', 'none', crosshair.line.width, crosshair.line.color, 1, null, horizontalCross);
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
                        options = new TextOption(this.elementID + '_axis_tooltip_text_' + k, 0, 0, 'start', text);
                        textElem = textElement(options, axis.crosshairTooltip.textStyle, axis.crosshairTooltip.textStyle.color, axisGroup);
                    }
                    direction = findDirection(this.rx, this.ry, rect, this.arrowLocation, 10, this.isTop, this.isBottom, this.isLeft, this.valueX, this.valueY);
                    pathElement.setAttribute('d', direction);
                    textElem.textContent = text;
                    textElem.setAttribute('x', (rect.x + padding).toString());
                    textElem.setAttribute('y', (rect.y + padding + 3 * this.elementSize.height / 4).toString());
                }
                else {
                    removeElement(this.elementID + '_axis_tooltip_' + k);
                    removeElement(this.elementID + '_axis_tooltip_text_' + k);
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
            value = getValueXByPoint(Math.abs(this.valueX - axis.rect.x), axis.rect.width, axis) + labelValue;
            this.isBottom = !axis.opposedPosition;
            this.isTop = axis.opposedPosition;
        }
        else {
            value = getValueYByPoint(Math.abs(this.valueY - axis.rect.y), axis.rect.height, axis) + labelValue;
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
        var padding = 5;
        var arrowPadding = 10;
        var tooltipRect;
        var boundsX = bounds.x;
        var boundsY = bounds.y;
        this.elementSize = measureText(text, axis.crosshairTooltip.textStyle);
        if (axis.orientation === 'Horizontal') {
            this.arrowLocation = new ChartLocation(this.valueX, axis.rect.y);
            tooltipRect = new Rect((this.valueX - (this.elementSize.width / 2) - padding), axis.rect.y + arrowPadding, this.elementSize.width + padding * 2, this.elementSize.height + padding * 2);
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
            this.arrowLocation = new ChartLocation(axis.rect.x, this.valueY);
            tooltipRect = new Rect(axis.rect.x - (this.elementSize.width) - (padding * 2 + arrowPadding), this.valueY - (this.elementSize.height / 2) - padding, this.elementSize.width + (padding * 2), this.elementSize.height + padding * 2);
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
        stopTimer(this.crosshairInterval);
    };
    /**
     * Removes the crosshair on mouse leave.
     * @return {void}
     * @private
     */
    Crosshair.prototype.removeCrosshair = function (duration) {
        var chart = this.chart;
        var crosshair = document.getElementById(this.elementID + '_UserInteraction');
        this.stopAnimation();
        if (crosshair && crosshair.getAttribute('opacity') !== '0') {
            this.crosshairInterval = setTimeout(function () {
                new Animation({}).animate(crosshair, {
                    duration: 200,
                    progress: function (args) {
                        // crosshair.removeAttribute('e-animate');
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
            }, duration);
        }
    };
    /**
     * Get module name.
     */
    Crosshair.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Crosshair';
    };
    /**
     * To destroy the crosshair.
     * @return {void}
     * @private
     */
    Crosshair.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return Crosshair;
}());

var __extends$43 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Tooltip Module used to render the tooltip for series.
 */
var Tooltip$1 = /** @class */ (function (_super) {
    __extends$43(Tooltip$$1, _super);
    /**
     * Constructor for tooltip module.
     * @private.
     */
    function Tooltip$$1(chart) {
        var _this = _super.call(this, chart) || this;
        _this.padding = 5;
        _this.arrowPadding = 12;
        _this.rx = 2;
        _this.ry = 2;
        _this.markerPoint = [];
        _this.element = _this.chart.element;
        _this.addEventListener();
        _this.textStyle = chart.tooltip.textStyle;
        return _this;
    }
    /**
     * @hidden
     */
    Tooltip$$1.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    Tooltip$$1.prototype.mouseUpHandler = function () {
        var chart = this.chart;
        if (chart.isTouch &&
            ((withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect) && chart.tooltip.shared)
                || !chart.tooltip.shared)) {
            if (!chart.crosshair.enable) {
                this.tooltip();
                this.removeTooltip(2000);
            }
            else if (chart.startMove) {
                this.removeTooltip(2000);
            }
        }
    };
    Tooltip$$1.prototype.mouseLeaveHandler = function () {
        this.removeTooltip(1000);
    };
    Tooltip$$1.prototype.mouseMoveHandler = function () {
        var chart = this.chart;
        // Tooltip for chart series.      
        if (!chart.disableTrackTooltip) {
            if (!chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                this.tooltip();
            }
            if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                if (chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                    this.tooltip();
                }
            }
            else {
                if (chart.tooltip.shared) {
                    this.removeTooltip(1000);
                }
            }
        }
    };
    /**
     * Handles the long press on chart.
     * @return {boolean}
     * @private
     */
    Tooltip$$1.prototype.longPress = function () {
        var chart = this.chart;
        if (chart.crosshair.enable && withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.tooltip();
        }
        return false;
    };
    /**
     * Renders the tooltip.
     * @return {void}
     * @private
     */
    Tooltip$$1.prototype.tooltip = function () {
        var isTooltip = this.getElement(this.element.id + '_tooltip');
        var tooltipDiv;
        var chart = this.chart;
        this.inverted = this.chart.requireInvertedAxis;
        this.updateTemplateFn(chart);
        this.formattedText = [];
        this.header = (chart.tooltip.header === null) ? ((chart.tooltip.shared) ? '<b>${point.x}</b>' : '<b>${series.name}</b>')
            : (chart.tooltip.header);
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
    Tooltip$$1.prototype.createElement = function (chart) {
        this.textElements = [];
        var tooltipDiv = document.createElement('div');
        tooltipDiv.id = this.element.id + '_tooltip';
        tooltipDiv.className = 'ejTooltip' + this.element.id;
        tooltipDiv.setAttribute('style', 'pointer-events:none; position:absolute;z-index: 1');
        if (!chart.tooltip.template || chart.tooltip.shared) {
            // SVG element for tooltip
            var svgObject = chart.renderer.createSvg({ id: this.element.id + '_tooltip_svg' });
            tooltipDiv.appendChild(svgObject);
            // Group to hold text and path.
            var groupElement = chart.renderer.createGroup({ id: this.element.id + '_tooltip_group' });
            svgObject.appendChild(groupElement);
            var pathElement = chart.renderer.drawPath({
                'id': this.element.id + '_tooltip_path', 'stroke-width': chart.tooltip.border.width,
                'fill': chart.tooltip.fill, 'opacity': chart.tooltip.opacity, 'stroke': chart.tooltip.border.color
            });
            groupElement.appendChild(pathElement);
        }
        return tooltipDiv;
    };
    Tooltip$$1.prototype.getElement = function (id) {
        return document.getElementById(id);
    };
    Tooltip$$1.prototype.renderPoint = function (point, isFirst, fill, firstText) {
        if (firstText === void 0) { firstText = true; }
        var argsData = {
            cancel: false, name: tooltipRender, textCollections: this.getTooltipText(point, firstText),
            point: point.point, series: point.series, textStyle: this.textStyle
        };
        this.chart.trigger(tooltipRender, argsData);
        if (!argsData.cancel) {
            if (point.series.type === 'BoxAndWhisker') {
                this.removeText();
                isFirst = true;
            }
            this.formattedText = this.formattedText.concat(argsData.textCollections);
        }
        return !argsData.cancel;
    };
    Tooltip$$1.prototype.removeText = function () {
        this.textElements = [];
        var element = this.getElement(this.element.id + '_tooltip_group');
        if (element.childNodes.length > 0) {
            while (element.lastChild && element.childNodes.length !== 1) {
                element.removeChild(element.lastChild);
            }
        }
    };
    Tooltip$$1.prototype.findHeader = function (data) {
        this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            this.formattedText = this.formattedText.concat(this.header);
        }
    };
    Tooltip$$1.prototype.renderSeriesTooltip = function (chart, isFirst, tooltipDiv) {
        var data = this.getData();
        data.lierIndex = this.lierIndex;
        this.currentPoints = [];
        if (data.point && ((!this.previousPoints[0] || (this.previousPoints[0].point !== data.point)) ||
            (this.previousPoints[0] && this.previousPoints[0].lierIndex > 3 && this.previousPoints[0].lierIndex !== this.lierIndex))) {
            this.currentPoints.push(data);
            if (data.series.enableTooltip) {
                this.stopAnimation();
                if (isFirst) {
                    document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                }
                if (!chart.tooltip.template) {
                    if (this.header !== '') {
                        this.findHeader(data);
                    }
                    if (this.renderPoint(data, isFirst, this.textStyle.color || '#212121')) {
                        this.renderText(isFirst, chart);
                        this.removeHighlight(chart);
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
                    this.createTemplate(chart, data, this.getElement(this.element.id + '_tooltip'), isFirst);
                }
                this.isRemove = true;
            }
            this.previousPoints = extend([], this.currentPoints, null, true);
        }
        else {
            if (!data.point && this.isRemove) {
                this.removeTooltip(1000);
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
    Tooltip$$1.prototype.updateTemplateFn = function (chart) {
        if (chart.tooltip.template) {
            try {
                if (document.querySelectorAll(chart.tooltip.template).length) {
                    this.templateFn = compile(document.querySelector(chart.tooltip.template).innerHTML.trim());
                }
            }
            catch (e) {
                this.templateFn = compile(chart.tooltip.template);
            }
        }
    };
    Tooltip$$1.prototype.createTemplate = function (chart, data, parent, isFirst) {
        this.highlightPoints(data);
        var argsData = { cancel: false, name: tooltipRender, point: data.point, series: data.series, };
        this.chart.trigger(tooltipRender, argsData);
        var firstElement = this.getElement(this.element.id + '_tooltip').firstChild;
        if (firstElement) {
            firstElement.remove();
        }
        var point = extend({}, data.point);
        point.x = this.formatPointValue(data.point, data.series.xAxis, 'x', true, false);
        if ((data.series.seriesType === 'XY')) {
            point.y = this.formatPointValue(data.point, data.series.yAxis, 'y', false, true);
        }
        else {
            point.low = this.formatPointValue(data.point, data.series.yAxis, 'low', false, true);
            point.high = this.formatPointValue(data.point, data.series.yAxis, 'high', false, true);
        }
        if (!argsData.cancel) {
            var templateElement = this.templateFn(point);
            var elem = createElement('div');
            while (templateElement.length > 0) {
                elem.appendChild(templateElement[0]);
            }
            parent.appendChild(elem);
            var rect = parent.getBoundingClientRect();
            this.padding = 0;
            this.elementSize = new Size(rect.width, rect.height);
            var tooltipRect = this.seriesTooltipLocation(data, new ChartLocation(0, 0), new ChartLocation(0, 0));
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
    Tooltip$$1.prototype.findMouseValue = function (data, chart) {
        if (!chart.requireInvertedAxis) {
            if (chart.chartAreaType === 'PolarRadar') {
                this.valueX = valueToPolarCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                    + data.series.xAxis.rect.x;
            }
            else {
                this.valueX = valueToCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                    + data.series.xAxis.rect.x;
            }
            this.valueY = chart.mouseY;
        }
        else {
            this.valueY = (1 - valueToCoefficient(data.point.xValue, data.series.xAxis)) * data.series.xAxis.rect.height
                + data.series.xAxis.rect.y;
            this.valueX = chart.mouseX;
        }
    };
    Tooltip$$1.prototype.renderGroupedTooltip = function (chart, isFirst, tooltipDiv) {
        var data;
        var pointData = chart.chartAreaType === 'PolarRadar' ? this.getData() : null;
        this.stopAnimation();
        this.removeHighlight(chart);
        this.currentPoints = [];
        var extraPoints = [];
        if (isFirst) {
            document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
        }
        this.removeText();
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (!series.enableTooltip) {
                continue;
            }
            if (chart.chartAreaType === 'Cartesian' && series.visible) {
                data = this.getClosestX(chart, series);
            }
            else if (chart.chartAreaType === 'PolarRadar' && series.visible && pointData.point !== null) {
                data = new PointData(series.points[pointData.point.index], series);
            }
            if (data && this.header !== '' && this.currentPoints.length === 0) {
                this.findHeader(data);
            }
            if (data && this.renderPoint(data, true, this.textStyle.color || data.point.color, this.currentPoints.length === 0)) {
                if (series.category === 'Series') {
                    this.highlightPoints(data);
                }
                this.findMouseValue(data, chart);
                this.currentPoints.push(data);
                data = null;
            }
            else if (data) {
                extraPoints.push(data);
            }
        }
        this.renderText(isFirst, chart);
        if (this.currentPoints.length > 0) {
            this.renderTooltip(chart, this.currentPoints[0], isFirst);
        }
        else {
            this.getElement(this.element.id + '_tooltip_path').setAttribute('d', '');
        }
        this.currentPoints = this.currentPoints.concat(extraPoints);
        this.previousPoints = extend([], this.currentPoints, null, true);
    };
    Tooltip$$1.prototype.renderTooltip = function (chart, pointData, isFirst) {
        var tooltipDiv = this.getElement(this.element.id + '_tooltip');
        var arrowLocation = new ChartLocation(0, 0);
        var tipLocation = new ChartLocation(0, 0);
        var svgObject = this.getElement(this.element.id + '_tooltip_svg');
        var groupElement = this.getElement(this.element.id + '_tooltip_group');
        var pathElement = this.getElement(this.element.id + '_tooltip_path');
        var rect;
        var isTop = false;
        var isLeft = false;
        var isBottom = false;
        var x = 0;
        var y = 0;
        var location = pointData.series.type === 'BoxAndWhisker' ?
            this.getBoxLocation(pointData) : pointData.point.symbolLocations[0];
        this.tipRadius = 1;
        var series = pointData.series;
        var point = pointData.point;
        if (this.header !== '') {
            this.elementSize.height += 5;
        }
        if (this.currentPoints.length > 1) {
            this.arrowPadding = 0;
            rect = this.sharedTooltipLocation(chart.chartAxisLayoutPanel.seriesClipRect, this.valueX, this.valueY);
            isTop = true;
        }
        else {
            this.arrowPadding = 12;
            rect = this.seriesTooltipLocation(pointData, arrowLocation, tipLocation);
            if (!this.inverted || !series.isRectSeries) {
                isTop = (rect.y < (location.y + (chart.chartAreaType === 'Cartesian' ? series.clipRect.y : 0)));
                isBottom = !isTop;
                y = (isTop ? 0 : this.arrowPadding);
            }
            else {
                isLeft = (rect.x < (location.x + series.clipRect.x));
                x = (isLeft ? 0 : this.arrowPadding);
            }
        }
        if (this.header !== '') {
            var headerSize = measureText(this.header, chart.tooltip.textStyle).height + (this.padding * 2) +
                (isBottom ? this.arrowPadding : 0); //header padding;
            var xLength = (this.padding * 3) + (!isLeft && !isTop && !isBottom ? this.arrowPadding : 0);
            var direction = 'M ' + xLength + ' ' + headerSize +
                'L ' + (rect.width + (!isLeft && !isTop && !isBottom ? this.arrowPadding : 0) - (this.padding * 2)) +
                ' ' + headerSize;
            var pathElement_1 = this.chart.renderer.drawPath({
                'id': this.element.id + '_header_path', 'stroke-width': 1,
                'fill': null, 'opacity': 0.8, 'stroke': '#ffffff', 'd': direction
            });
            groupElement.appendChild(pathElement_1);
        }
        var start = chart.tooltip.border.width / 2;
        var pointRect = new Rect(start + x, start + y, rect.width - start, rect.height - start);
        groupElement.setAttribute('opacity', '1');
        if (chart.tooltip.enableAnimation && !chart.tooltip.shared && !isFirst && !this.isComplete) {
            this.animateTooltipDiv(tooltipDiv, rect);
        }
        else {
            this.updateDiv(tooltipDiv, rect.x, rect.y);
        }
        this.isComplete = false;
        svgObject.setAttribute('height', (rect.height + chart.tooltip.border.width + (!((!this.inverted) ||
            (!pointData.series.isRectSeries)) ? 0 : this.arrowPadding)).toString());
        svgObject.setAttribute('width', (rect.width + chart.tooltip.border.width + (((!this.inverted) ||
            (!pointData.series.isRectSeries)) ? 0 : this.arrowPadding)).toString());
        svgObject.setAttribute('opacity', '1');
        pathElement.setAttribute('d', findDirection(this.rx, this.ry, pointRect, arrowLocation, this.arrowPadding, isTop, isBottom, isLeft, tipLocation.x, tipLocation.y, this.tipRadius));
        pathElement.setAttribute('filter', Browser.isIE ? '' : 'url(#chart_shadow_tooltip)');
        var shadowElement = '<filter id="chart_shadow_tooltip" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/>';
        shadowElement += '<feOffset dx="3" dy="3" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/>';
        shadowElement += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
        var defElement = chart.renderer.createDefs();
        defElement.setAttribute('id', 'chart_tooltip_definition');
        groupElement.appendChild(defElement);
        defElement.innerHTML = shadowElement;
        pathElement.setAttribute('stroke', chart.tooltip.border.color);
        this.changeText(new ChartLocation(x, y), isBottom, !isLeft && !isTop && !isBottom, rect);
    };
    Tooltip$$1.prototype.sharedTooltipLocation = function (bounds, x, y) {
        var width = this.elementSize.width + (2 * this.padding);
        var height = this.elementSize.height + (2 * this.padding);
        var tooltipRect = new Rect(x + 2 * this.padding, y - height - this.padding, width, height);
        if (tooltipRect.y < bounds.y) {
            tooltipRect.y += (tooltipRect.height + 2 * this.padding);
        }
        if (tooltipRect.x + tooltipRect.width > bounds.x + bounds.width) {
            tooltipRect.x -= (tooltipRect.width + 4 * this.padding);
        }
        return tooltipRect;
    };
    Tooltip$$1.prototype.getBoxLocation = function (data) {
        var location;
        location = this.lierIndex > 3 ? data.point.symbolLocations[this.lierIndex - 4] :
            {
                x: data.point.regions[0].x + (data.point.regions[0].width / 2),
                y: data.point.regions[0].y + (data.point.regions[0].height / 2)
            };
        return location;
    };
    Tooltip$$1.prototype.seriesTooltipLocation = function (pointData, arrowLocation, tipLocation) {
        var series = pointData.series;
        var isBoxPlot = series.type === 'BoxAndWhisker';
        var symbolLocation = isBoxPlot ? this.getBoxLocation(pointData) : pointData.point.symbolLocations[0];
        var location = new ChartLocation(symbolLocation.x, symbolLocation.y);
        if (series.type === 'RangeArea' && pointData.point.regions[0]) {
            if (!series.chart.requireInvertedAxis) {
                location.y = pointData.point.regions[0].y + pointData.point.regions[0].height / 2;
            }
            else {
                location.x = pointData.point.regions[0].x + pointData.point.regions[0].width / 2;
            }
        }
        var width = this.elementSize.width + (2 * this.padding);
        var height = this.elementSize.height + (2 * this.padding);
        var bounds = this.chart.chartAxisLayoutPanel.seriesClipRect;
        var markerHeight = 0;
        if (!series.isRectSeries) {
            markerHeight = (this.chart.tooltip.shared || series.marker.visible || series.type === 'Scatter'
                || series.drawType === 'Scatter') ? ((series.marker.height + 2) / 2 + (2 * series.marker.border.width)) : 0;
        }
        var clipX = this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.x;
        var clipY = this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.y;
        var boundsX = bounds.x;
        var boundsY = bounds.y;
        if (!this.inverted || !series.isRectSeries) {
            location.y = (series.type === 'Waterfall' && pointData.point.y < 0) ?
                location.y - pointData.point.regions[0].height : location.y;
            location = new ChartLocation(location.x + clipX - this.elementSize.width / 2 - this.padding, location.y + clipY - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight);
            arrowLocation.x = tipLocation.x = width / 2;
            if (location.y < boundsY || (series.isRectSeries && pointData.point.y < 0 && series.type !== 'Waterfall')) {
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
                this.tipRadius = 0;
            }
            if (arrowLocation.x - this.arrowPadding / 2 < this.rx) {
                arrowLocation.x = this.rx + this.arrowPadding / 2;
                tipLocation.x = 0;
                this.tipRadius = 0;
            }
        }
        else {
            location.x = (series.type === 'Waterfall' && pointData.point.y < 0) ?
                location.x + pointData.point.regions[0].width : location.x;
            location = new ChartLocation(location.x + clipX + markerHeight, location.y + clipY - this.elementSize.height / 2 - (this.padding));
            arrowLocation.y = tipLocation.y = height / 2;
            if ((location.x + width + this.arrowPadding > boundsX + bounds.width) || (series.isRectSeries &&
                pointData.point.y < 0 && series.type !== 'Waterfall')) {
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
                this.tipRadius = 0;
            }
            if (arrowLocation.y - this.arrowPadding / 2 < this.ry) {
                arrowLocation.y = this.ry + this.arrowPadding / 2;
                tipLocation.y = 0;
                this.tipRadius = 0;
            }
        }
        return new Rect(location.x, location.y, width, height);
    };
    Tooltip$$1.prototype.removeHighlight = function (chart, removeRect) {
        if (removeRect === void 0) { removeRect = false; }
        var item;
        for (var i = 0, len = this.previousPoints.length; i < len; i++) {
            item = this.previousPoints[i];
            if (item.series.isRectSeries && item.series.visible) {
                this.highlightPoint(item.series, item.point.index, false);
                continue;
            }
            if (!item.series.marker.visible && item.series.type !== 'Scatter' && item.series.type !== 'Bubble') {
                this.previousPoints.shift();
                len -= 1;
            }
        }
    };
    Tooltip$$1.prototype.highlightPoints = function (item) {
        if (item.series.isRectSeries) {
            this.highlightPoint(item.series, item.point.index, true);
            return null;
        }
    };
    Tooltip$$1.prototype.highlightPoint = function (series, pointIndex, highlight) {
        var element = this.getElement(this.element.id + '_Series_' + series.index + '_Point_' + pointIndex);
        if (element) {
            element.setAttribute('opacity', (highlight ? series.opacity / 2 : series.opacity).toString());
        }
    };
    Tooltip$$1.prototype.getTooltipText = function (pointData, isFirst) {
        if (isFirst === void 0) { isFirst = true; }
        var series = pointData.series;
        return this.parseTemplate(pointData.point, series, this.getFormat(this.chart, series), series.xAxis, series.yAxis);
    };
    Tooltip$$1.prototype.renderText = function (isRender, chart) {
        var height = 0;
        var width = 0; // Padding for text;
        var subWidth = 0;
        var size;
        var lines;
        var key = 'properties';
        var font = extend({}, this.chart.tooltip.textStyle, null, true)[key];
        var groupElement = this.getElement(this.element.id + '_tooltip_group');
        var tspanElement;
        var tspanStyle = '';
        var line;
        var tspanOption;
        this.header = this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim();
        var headerSpace = (this.header !== '' && this.formattedText[0] !== '') ? 5 : 0;
        var isRow = true;
        var isColumn = true;
        this.markerPoint = [];
        var markerSize = 10;
        var spaceWidth = 4;
        var dy = (22 / parseFloat(Theme.tooltipLabelFont.size)) * (parseFloat(font.size));
        if (!isRender) {
            removeElement(this.element.id + '_tooltip_text');
            removeElement(this.element.id + '_header_path');
            removeElement(this.element.id + '_tooltip_trackball_group');
            removeElement('chart_tooltip_definition');
        }
        var options = new TextOption(this.element.id + '_tooltip_text', this.padding * 2, this.padding * 4, 'start', '');
        var parentElement = textElement(options, font, null, groupElement, false);
        for (var k = 0, pointsLength = this.formattedText.length; k < pointsLength; k++) {
            var textCollection = this.formattedText[k].replace(/<(b|strong)>/g, '<b>')
                .replace(/<\/(b|strong)>/g, '</b>')
                .split(/<br.*?>/g);
            size = measureText(this.formattedText[k], font);
            if ((k !== 0) || (this.header === '')) {
                this.markerPoint.push((this.header !== '' ? (this.padding) : 0) + options.y + height);
            }
            for (var i = 0, len = textCollection.length; i < len; i++) {
                lines = textCollection[i].replace(/<b>/g, '<br><b>').replace(/<\/b>/g, '</b><br>').split('<br>');
                subWidth = 0;
                isColumn = true;
                height += dy;
                for (var k_1 = 0, len_1 = lines.length; k_1 < len_1; k_1++) {
                    line = lines[k_1];
                    if (line.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
                        subWidth += spaceWidth;
                        if (isColumn && !isRow) {
                            tspanOption = { x: (this.padding * 2) + (markerSize + 5), dy: dy + ((isColumn) ? headerSpace : 0), fill: '' };
                            headerSpace = null;
                        }
                        else {
                            if (isRow && isColumn) {
                                tspanOption = { x: (this.header === '') ? ((this.padding * 2) + (markerSize + 5)) : (this.padding * 2) };
                            }
                            else {
                                tspanOption = {};
                            }
                        }
                        isColumn = false;
                        tspanElement = chart.renderer.createTSpan(tspanOption, '');
                        parentElement.appendChild(tspanElement);
                        if (line.indexOf('<b>') > -1) {
                            tspanStyle = 'font-weight:bold';
                            font.fontWeight = 'bold';
                            (tspanElement).setAttribute('fill', chart.tooltip.textStyle.color || '#ffffff');
                        }
                        else {
                            tspanStyle = '';
                            font.fontWeight = 'Normal';
                            (tspanElement).setAttribute('fill', chart.tooltip.textStyle.color || '#dbdbdb');
                        }
                        (tspanElement).textContent = line = line.replace(/<[a-zA-Z\/](.|\n)*?>/g, '');
                        subWidth += measureText(line, font).width;
                        if (tspanStyle !== '') {
                            tspanElement.setAttribute('style', tspanStyle);
                        }
                        isRow = false;
                    }
                }
                subWidth -= spaceWidth;
                width = Math.max(width, subWidth);
            }
        }
        height -= (this.header ? this.padding : 0);
        this.elementSize = new Size(width + (width > 0 ? (2 * this.padding) : 0), height + (this.header !== '' ? this.padding : 0));
        this.elementSize.width += (markerSize + 5); // marker size + marker Spacing
        var element = (parentElement.childNodes[0]);
        if (this.header !== '' && element) {
            font.fontWeight = 'bold';
            var width_1 = (this.elementSize.width + (2 * this.padding)) / 2 - measureText(this.header, font).width / 2;
            element.setAttribute('x', width_1.toString());
        }
    };
    Tooltip$$1.prototype.changeText = function (point, isBottom, isRight, rect) {
        var element = document.getElementById(this.element.id + '_tooltip_text');
        if (isBottom) {
            element.setAttribute('transform', 'translate(0,' + this.arrowPadding + ')');
        }
        if (isRight) {
            element.setAttribute('transform', 'translate(' + this.arrowPadding + ' 0)');
        }
        this.drawMarker(isBottom, isRight, 10);
    };
    Tooltip$$1.prototype.drawMarker = function (isBottom, isRight, size) {
        var count = 0;
        var shapeOption;
        var groupElement = this.getElement(this.element.id + '_tooltip_group');
        var markerGroup = this.chart.renderer.createGroup({ id: this.element.id + '_tooltip_trackball_group' });
        var x = (this.padding * 2) + (size / 2) + (isRight ? this.arrowPadding : 0);
        var series;
        for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
            var data = _a[_i];
            series = data.series;
            if (series.visible && series.enableTooltip && data.point.visible) {
                shapeOption = new PathOption(this.element.id + '_Tooltip_Trackball_' + series.index, series.marker.fill ||
                    ((data.point && data.point.color && data.point.color !== '#ffffff') ? data.point.color : series.interior), 1, '#cccccc', series.opacity, null);
                markerGroup.appendChild(drawSymbol(new ChartLocation(x, this.markerPoint[count] - this.padding + (isBottom ? this.arrowPadding : 0)), series.marker.shape, new Size(size, size), series.marker.imageUrl, shapeOption, null));
                count++;
            }
        }
        groupElement.appendChild(markerGroup);
    };
    Tooltip$$1.prototype.parseTemplate = function (point, series, format, xAxis, yAxis) {
        var val;
        var textValue;
        var chart = this.chart;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            val = new RegExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(val.source, this.formatPointValue(point, val.source === '${point.x}' ? xAxis : yAxis, dataValue, val.source === '${point.x}', (val.source === '${point.high}' ||
                val.source === '${point.open}' ||
                val.source === '${point.close}' ||
                val.source === '${point.low}' ||
                val.source === '${point.y}' ||
                val.source === '${point.minimum}' ||
                val.source === '${point.maximum}' ||
                val.source === '${point.outliers}' ||
                val.source === '${point.upperQuartile}' ||
                val.source === '${point.lowerQuartile}' ||
                val.source === '${point.median}')));
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            val = new RegExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(val.source, textValue);
        }
        return format;
    };
    Tooltip$$1.prototype.formatPointValue = function (point, axis, dataValue, isXPoint, isYPoint) {
        var textValue;
        var customLabelFormat;
        var value;
        if (axis.valueType !== 'Category' && isXPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(point[dataValue])) :
                axis.format(point[dataValue]);
        }
        else if (isYPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            value = dataValue === 'outliers' ? axis.format(point[dataValue][this.lierIndex - 4]) :
                axis.format(point[dataValue]);
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', value) : value;
        }
        else {
            textValue = point[dataValue];
        }
        return textValue;
    };
    Tooltip$$1.prototype.getFormat = function (chart, series) {
        if (chart.tooltip.format) {
            if (series.seriesType === 'XY' && series.category === 'Indicator') {
                return this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
            }
            return chart.tooltip.format;
        }
        var format = !chart.tooltip.shared ? '${point.x}' : '${series.name}';
        switch (series.seriesType) {
            case 'XY':
                if (series.category === 'Indicator') {
                    this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
                }
                return format + ' : ' + ((series.type === 'Bubble') ? '<b>${point.y}</b>  Size : <b>${point.size}</b>'
                    : '<b>${point.y}</b>');
            case 'HighLow':
                return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b>');
            case 'HighLowOpenClose':
                return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
                    'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>');
            case 'BoxPlot': {
                return format + '<br/>' + (this.lierIndex > 3 ? 'Outliers : <b>${point.outliers}</b>' :
                    'Maximum : <b>${point.maximum}</b><br/>Q1 : <b>${point.upperQuartile}</b><br/>' +
                        'Median : <b>${point.median}</b><br/>Q3 : <b>${point.lowerQuartile}</b><br/>Minimum : <b>${point.minimum}</b>');
            }
        }
        return '';
    };
    Tooltip$$1.prototype.getIndicatorTooltipFormat = function (series, chart, format) {
        var toolTip;
        if (series.seriesType === 'XY') {
            toolTip = series.name + ' : ${point.y}';
        }
        else {
            toolTip = format;
        }
        return toolTip;
    };
    Tooltip$$1.prototype.stopAnimation = function () {
        stopTimer(this.toolTipInterval);
    };
    /**
     * Removes the tooltip on mouse leave.
     * @return {void}
     * @private
     */
    Tooltip$$1.prototype.removeTooltip = function (duration) {
        var _this = this;
        var chart = this.chart;
        var tooltipElement = this.getElement(this.element.id + '_tooltip');
        this.stopAnimation();
        if (tooltipElement && this.previousPoints.length > 0) {
            var data_1 = this.previousPoints;
            this.toolTipInterval = setTimeout(function () {
                var series = data_1[0].series;
                var tooltipGroup = tooltipElement.firstChild;
                var opacity = parseFloat(tooltipGroup.getAttribute('opacity')) || 1;
                var element = _this.getElement(chart.element.id + '_Series_' + data_1[0].series.index
                    + '_Point_' + data_1[0].point.index);
                var rectOpacity;
                if (element && series.isRectSeries && !chart.tooltip.shared) {
                    rectOpacity = parseFloat(element.getAttribute('opacity'));
                }
                new Animation({}).animate(tooltipGroup, {
                    duration: 200,
                    progress: function (args) {
                        //  tooltipGroup.removeAttribute('e-animate');
                        tooltipGroup.style.animation = '';
                        tooltipGroup.setAttribute('opacity', (opacity - (args.timeStamp / args.duration)).toString());
                        if (element && series.isRectSeries && !chart.tooltip.shared) {
                            element.setAttribute('opacity', (rectOpacity + (rectOpacity * (args.timeStamp / args.duration))).toString());
                        }
                    },
                    end: function (model) {
                        _this.valueX = null;
                        _this.valueY = null;
                        _this.currentPoints = [];
                        if (element && series.isRectSeries && !chart.tooltip.shared) {
                            element.setAttribute('opacity', series.opacity.toString());
                        }
                        _this.removeHighlight(chart, chart.tooltip.shared);
                        _this.removeHighlightedMarker(data_1);
                        tooltipGroup.setAttribute('opacity', '0');
                        if (chart.tooltip.template && !chart.tooltip.shared) {
                            tooltipGroup.style.display = 'none';
                        }
                        chart.trigger('animationComplete', {});
                        _this.isComplete = true;
                    }
                });
            }, duration);
        }
    };
    /**
     * @hidden
     */
    Tooltip$$1.prototype.removeHighlightedMarker = function (data) {
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var item = data_2[_i];
            removeElement(this.element.id + '_Series_' + item.series.index +
                '_Point_' + item.point.index + '_Trackball');
        }
        if (this.chart.markerRender) {
            this.chart.markerRender.removeHighlightedMarker();
        }
        this.previousPoints = [];
    };
    Tooltip$$1.prototype.animateTooltipDiv = function (tooltipDiv, rect) {
        var _this = this;
        var x = parseFloat(tooltipDiv.style.left);
        var y = parseFloat(tooltipDiv.style.top);
        var currenDiff;
        new Animation({}).animate(tooltipDiv, {
            duration: 300,
            progress: function (args) {
                currenDiff = (args.timeStamp / args.duration);
                tooltipDiv.style.animation = null;
                tooltipDiv.style.left = (x + currenDiff * (rect.x - x)) + 'px';
                tooltipDiv.style.top = (y + currenDiff * (rect.y - y)) + 'px';
            },
            end: function (model) {
                _this.updateDiv(tooltipDiv, rect.x, rect.y);
            }
        });
    };
    Tooltip$$1.prototype.updateDiv = function (tooltipDiv, x, y) {
        tooltipDiv.style.left = x + 'px';
        tooltipDiv.style.top = y + 'px';
    };
    /**
     * Get module name.
     */
    Tooltip$$1.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Tooltip';
    };
    /**
     * To destroy the tooltip.
     * @return {void}
     * @private
     */
    Tooltip$$1.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return Tooltip$$1;
}(Data$1));

/**
 * Zooming Toolkit created here
 * @private
 */
var Toolkit = /** @class */ (function () {
    /** @private */
    function Toolkit(chart) {
        this.chart = chart;
        this.elementId = chart.element.id;
        this.selectionColor = '#ff4081';
        this.fillColor = '#737373';
    }
    /**
     * To create the pan button.
     * @return {void}
     * @private
     */
    Toolkit.prototype.createPanButton = function (childElement, parentElement, chart) {
        var render = this.chart.renderer;
        var fillColor = this.chart.zoomModule.isPanning ? this.selectionColor : this.fillColor;
        var direction = 'M5,3h2.3L7.275,5.875h1.4L8.65,3H11L8,0L5,3z M3,11V8.7l2.875,0.025v-1.4L3,7.35V5L0,8L3,';
        direction += '11z M11,13H8.7l0.025-2.875h-1.4L7.35,13H5l3,3L11,13z M13,5v2.3l-2.875-0.025v1.4L13,8.65V11l3-3L13,5z';
        childElement.id = this.elementId + '_Zooming_Pan';
        childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('Pan'));
        this.panElements = childElement;
        childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Pan_1', 'transparent', {}, 1, new Rect(0, 0, 16, 16))));
        childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_Pan_2', fillColor, null, null, 1, null, direction)));
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.pan);
    };
    /**
     * To create the zoom button.
     * @return {void}
     * @private
     */
    Toolkit.prototype.createZoomButton = function (childElement, parentElement, chart) {
        var render = this.chart.renderer;
        var fillColor = this.chart.zoomModule.isPanning ? this.fillColor : this.selectionColor;
        var direction = 'M0.001,14.629L1.372,16l4.571-4.571v-0.685l0.228-0.274c1.051,0.868,2.423,1.417,3.885,1.417c3.291,0,';
        direction += '5.943-2.651,5.943-5.943S13.395,0,10.103,0S4.16,2.651,4.16,5.943c0,1.508,0.503,2.834,1.417,3.885l-0.274,0.228H4.571';
        direction = direction + 'L0.001,14.629L0.001,14.629z M5.943,5.943c0-2.285,1.828-4.114,4.114-4.114s4.114,1.828,4.114,';
        childElement.id = this.elementId + '_Zooming_Zoom';
        childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('Zoom'));
        this.zoomElements = childElement;
        childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Zoom_1', 'transparent', {}, 1, new Rect(0, 0, 16, 16))));
        childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_Zoom_3', fillColor, null, null, 1, null, direction + '4.114s-1.828,4.114-4.114,4.114S5.943,8.229,5.943,5.943z')));
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.zoom);
    };
    /**
     * To create the ZoomIn button.
     * @return {void}
     * @private
     */
    Toolkit.prototype.createZoomInButton = function (childElement, parentElement, chart) {
        var render = this.chart.renderer;
        var fillColor = this.fillColor;
        var direction = 'M10.103,0C6.812,0,4.16,2.651,4.16,5.943c0,1.509,0.503,2.834,1.417,3.885l-0.274,0.229H4.571L0,';
        direction += '14.628l0,0L1.372,16l4.571-4.572v-0.685l0.228-0.275c1.052,0.868,2.423,1.417,3.885,1.417c3.291,0,5.943-2.651,';
        direction += '5.943-5.943C16,2.651,13.395,0,10.103,0z M10.058,10.058c-2.286,0-4.114-1.828-4.114-4.114c0-2.286,1.828-4.114,';
        childElement.id = this.elementId + '_Zooming_ZoomIn';
        childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('ZoomIn'));
        var polygonDirection = '12.749,5.466 10.749,5.466 10.749,3.466 9.749,3.466 9.749,5.466 7.749,5.466 7.749,6.466';
        childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_ZoomIn_1', 'transparent', {}, 1, new Rect(0, 0, 16, 16))));
        childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_ZoomIn_2', fillColor, null, null, 1, null, direction + '4.114-4.114c2.286,0,4.114,1.828,4.114,4.114C14.172,8.229,12.344,10.058,10.058,10.058z')));
        childElement.appendChild(render.drawPolygon(new PolygonOption(this.elementId + '_Zooming_ZoomIn_3', polygonDirection + ' 9.749,6.466 9.749,8.466 10.749,8.466 10.749,6.466 12.749,6.466', fillColor)));
        this.zoomInElements = childElement;
        this.elementOpacity = chart.zoomModule.isPanning ? '0.2' : '1';
        childElement.setAttribute('opacity', this.elementOpacity);
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.zoomIn);
    };
    /**
     * To create the ZoomOut button.
     * @return {void}
     * @private
     */
    Toolkit.prototype.createZoomOutButton = function (childElement, parentElement, chart) {
        var render = this.chart.renderer;
        var fillColor = this.fillColor;
        var direction = 'M0,14.622L1.378,16l4.533-4.533v-0.711l0.266-0.266c1.022,0.889,2.4,1.422,3.866,';
        direction += '1.422c3.289,0,5.955-2.666,5.955-5.955S13.333,0,10.044,0S4.089,2.667,4.134,5.911c0,1.466,0.533,2.844,';
        direction += '1.422,3.866l-0.266,0.266H4.578L0,14.622L0,14.622z M5.911,5.911c0-2.311,1.822-4.133,4.133-4.133s4.133,1.822,4.133,';
        childElement.id = this.elementId + '_Zooming_ZoomOut';
        childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('ZoomOut'));
        childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_ZoomOut_1', 'transparent', {}, 1, new Rect(0, 0, 16, 16))));
        childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_ZoomOut_2', fillColor, null, null, 1, null, direction + '4.133s-1.866,4.133-4.133,4.133S5.911,8.222,5.911,5.911z M12.567,6.466h-5v-1h5V6.466z')));
        this.zoomOutElements = childElement;
        this.elementOpacity = chart.zoomModule.isPanning ? '0.2' : '1';
        childElement.setAttribute('opacity', this.elementOpacity);
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.zoomOut);
    };
    /**
     * To create the Reset button.
     * @return {void}
     * @private
     */
    Toolkit.prototype.createResetButton = function (childElement, parentElement, chart, isDevice) {
        var render = this.chart.renderer;
        var fillColor = this.fillColor;
        var size;
        var direction = 'M12.364,8h-2.182l2.909,3.25L16,8h-2.182c0-3.575-2.618-6.5-5.818-6.5c-1.128,0-2.218,0.366-3.091,';
        direction += '1.016l1.055,1.178C6.581,3.328,7.272,3.125,8,3.125C10.4,3.125,12.363,5.319,12.364,8L12.364,8z M11.091,';
        direction += '13.484l-1.055-1.178C9.419,12.672,8.728,12.875,8,12.875c-2.4,0-4.364-2.194-4.364-4.875h2.182L2.909,4.75L0,8h2.182c0,';
        childElement.id = this.elementId + '_Zooming_Reset';
        childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('Reset'));
        if (!isDevice) {
            childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Reset_1', 'transparent', {}, 1, new Rect(0, 0, 16, 16))));
            childElement.appendChild(render.drawPath(new PathOption(this.elementId + '_Zooming_Reset_2', fillColor, null, null, 1, null, direction + '3.575,2.618,6.5,5.818,6.5C9.128,14.5,10.219,14.134,11.091,13.484L11.091,13.484z')));
        }
        else {
            size = measureText(this.chart.getLocalizedLabel('ResetZoom'), { size: '12px' });
            childElement.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Reset_1', 'transparent', {}, 1, new Rect(0, 0, size.width, size.height))));
            textElement(new TextOption(this.elementId + '_Zooming_Reset_2', 0 + size.width / 2, 0 + size.height * 3 / 4, 'middle', this.chart.getLocalizedLabel('ResetZoom'), 'rotate(0,' + (0) + ',' + (0) + ')', 'auto'), { size: '12px' }, 'black', childElement);
        }
        parentElement.appendChild(childElement);
        this.wireEvents(childElement, this.reset);
    };
    /**
     * To bind events.
     * @return {void}
     * @private
     */
    Toolkit.prototype.wireEvents = function (element, process) {
        EventHandler.add(element, 'mousedown touchstart', process, this);
        EventHandler.add(element, 'mouseover', this.showTooltip, this);
        EventHandler.add(element, 'mouseout', this.removeTooltip, this);
    };
    /**
     * To show tooltip.
     * @return {void}
     * @private
     */
    Toolkit.prototype.showTooltip = function (event) {
        var text = event.currentTarget.id.split('_Zooming_')[1];
        var left = (event.pageX - (measureText(text, { size: '10px' }).width + 5));
        if (!this.chart.isTouch) {
            createTooltip('EJ2_Chart_ZoomTip', this.chart.getLocalizedLabel(text), (event.pageY + 10), left, '10px');
        }
    };
    /** @private */
    Toolkit.prototype.removeTooltip = function () {
        removeElement('EJ2_Chart_ZoomTip');
    };
    // Toolkit events function calculation here.
    /** @private */
    Toolkit.prototype.reset = function () {
        var chart = this.chart;
        if (!chart.zoomModule.isDevice) {
            remove(chart.zoomModule.toolkitElements);
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
    /** @private */
    Toolkit.prototype.pan = function () {
        var zoomModule = this.chart.zoomModule;
        var element;
        this.chart.zoomModule.isPanning = true;
        this.chart.svgObject.setAttribute('cursor', 'pointer');
        this.elementOpacity = '0.2';
        element = this.zoomInElements ? this.zoomInElements.setAttribute('opacity', this.elementOpacity) : null;
        element = this.zoomOutElements ? this.zoomOutElements.setAttribute('opacity', this.elementOpacity) : null;
        element = this.panElements ? this.applySelection(this.panElements.childNodes, this.selectionColor) : null;
        element = this.zoomElements ? this.applySelection(this.zoomElements.childNodes, '#737373') : null;
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
                    cumulative_1 = Math.max(Math.max(1 / minMax(axis.zoomFactor, 0, 1), 1) + (0.25 * scale), 1);
                    zoomFactor_1 = (cumulative_1 === 1) ? 1 : minMax(1 / cumulative_1, 0, 1);
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

/**
 * Zooming Module handles the zooming for chart.
 */
var Zoom = /** @class */ (function () {
    /**
     * Constructor for Zooming module.
     * @private.
     */
    function Zoom(chart) {
        this.chart = chart;
        this.isPointer = Browser.isPointer;
        this.browserName = Browser.info.name;
        this.wheelEvent = this.browserName === 'mozilla' ? (this.isPointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
        this.cancelEvent = this.isPointer ? 'pointerleave' : 'mouseleave';
        this.addEventListener();
        this.isDevice = Browser.isDevice;
        var zooming = chart.zoomSettings;
        this.toolkit = new Toolkit(chart);
        this.zooming = zooming;
        this.elementId = chart.element.id;
        this.zoomingRect = new Rect(0, 0, 0, 0);
        this.zoomAxes = [];
        this.zoomkitOpacity = 0.3;
        this.isIOS = Browser.isIos || Browser.isIos7;
    }
    /**
     * Function that handles the Rectangular zooming.
     * @return {void}
     * @private
     */
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
        chart.startMove = (chart.startMove) ? !this.isPanning : chart.startMove;
    };
    // Zooming rectangle drawn here
    Zoom.prototype.drawZoomingRectangle = function (chart) {
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var startLocation = new ChartLocation(chart.previousMouseMoveX, chart.previousMouseMoveY);
        var endLocation = new ChartLocation(chart.mouseX, chart.mouseY);
        var rect = this.zoomingRect = getRectLocation(startLocation, endLocation, areaBounds);
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
            chart.svgObject.appendChild(chart.renderer.drawRectangle(new RectOption(this.elementId + '_ZoomArea', Theme.selectionRectFill, { color: Theme.selectionRectStroke, width: 1 }, 1, rect, 0, 0, '', '3')));
        }
    };
    // Panning performed here
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
            currentScale = Math.max(1 / minMax(axis.zoomFactor, 0, 1), 1);
            if (axis.orientation === 'Horizontal') {
                offset = (chart.previousMouseMoveX - chart.mouseX) / axis.rect.width / currentScale;
                axis.zoomPosition = minMax(axis.zoomPosition + offset, 0, (1 - axis.zoomFactor));
            }
            else {
                offset = (chart.previousMouseMoveY - chart.mouseY) / axis.rect.height / currentScale;
                axis.zoomPosition = minMax(axis.zoomPosition - offset, 0, (1 - axis.zoomFactor));
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
    /**
     * Redraw the chart on zooming.
     * @return {void}
     * @private
     */
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
        layout.measureAxis(new Rect(chart.initialClipRect.x, chart.initialClipRect.y, chart.initialClipRect.width, chart.initialClipRect.height));
        axes.map(function (axis, index) {
            if (axis.orientation === 'Horizontal' && mode !== 'Y') {
                layout.drawXAxisLabels(axis, index);
            }
            if (axis.orientation === 'Vertical' && mode !== 'X') {
                layout.drawYAxisLabels(axis, index);
            }
        });
    };
    // Rectangular zoom calculated here performed here
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
            argsData = {
                cancel: false, name: zoomComplete, axis: axis, previousZoomFactor: previousZF, previousZoomPosition: previousZP,
                currentZoomFactor: currentZF, currentZoomPosition: currentZP
            };
            if (axis.orientation === 'Horizontal') {
                if (mode !== 'Y') {
                    currentZP += Math.abs((zoomRect.x - bounds.x) / (bounds.width)) * axis.zoomFactor;
                    currentZF *= (zoomRect.width / bounds.width);
                    argsData.currentZoomPosition = currentZP;
                    argsData.currentZoomFactor = currentZF;
                    chart.trigger(zoomComplete, argsData);
                }
            }
            else {
                if (mode !== 'X') {
                    currentZP += (1 - Math.abs((zoomRect.height + (zoomRect.y - bounds.y)) / (bounds.height))) * axis.zoomFactor;
                    currentZF *= (zoomRect.height / bounds.height);
                    argsData.currentZoomFactor = currentZF;
                    argsData.currentZoomPosition = currentZP;
                    chart.trigger(zoomComplete, argsData);
                }
            }
            if (!argsData.cancel) {
                axis.zoomFactor = argsData.currentZoomFactor;
                axis.zoomPosition = argsData.currentZoomPosition;
            }
        });
        this.zoomingRect = new Rect(0, 0, 0, 0);
        this.performZoomRedraw(chart);
    };
    /**
     * Function that handles the Mouse wheel zooming.
     * @return {void}
     * @private
     */
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
                cumulative = Math.max(Math.max(1 / minMax(axis.zoomFactor, 0, 1), 1) + (0.25 * direction), 1);
                if (cumulative >= 1) {
                    origin = axis.orientation === 'Horizontal' ? mouseX / axis.rect.width : 1 - (mouseY / axis.rect.height);
                    origin = origin > 1 ? 1 : origin < 0 ? 0 : origin;
                    zoomFactor = (cumulative === 1) ? 1 : minMax(1 / cumulative, 0, 1);
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
    /**
     * Function that handles the Pinch zooming.
     * @return {void}
     * @private
     */
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
        pinchRect = new Rect(clipX, clipY, this.offset.width / scaleX, this.offset.height / scaleY);
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
        chart.startMove = (chart.startMove) ? !this.isPanning : chart.startMove;
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
    // Series transformation style applied here.
    Zoom.prototype.setTransform = function (transX, transY, scaleX, scaleY, chart, isPinch) {
        chart.seriesElements.setAttribute('clip-path', 'url(#' + this.elementId + '_ChartAreaClipRect_)');
        var translate;
        var xAxisLoc;
        var yAxisLoc;
        var element;
        if (transX !== null && transY !== null) {
            chart.visibleSeries.forEach(function (value) {
                xAxisLoc = chart.requireInvertedAxis ? value.yAxis.rect.x : value.xAxis.rect.x;
                yAxisLoc = chart.requireInvertedAxis ? value.xAxis.rect.y : value.yAxis.rect.y;
                translate = 'translate(' + (transX + (isPinch ? (scaleX * xAxisLoc) : xAxisLoc)) +
                    ',' + (transY + (isPinch ? (scaleY * yAxisLoc) : yAxisLoc)) + ')';
                translate = (scaleX || scaleY) ? translate + ' scale(' + scaleX + ' ' + scaleY + ')' : translate;
                value.seriesElement.setAttribute('transform', translate);
                element = getElement(chart.element.id + '_Series_' + value.index + '_DataLabelCollections');
                if (value.errorBarElement) {
                    value.errorBarElement.setAttribute('transform', translate);
                }
                if (value.symbolElement) {
                    value.symbolElement.setAttribute('transform', translate);
                }
                if (value.textElement) {
                    value.textElement.setAttribute('visibility', 'hidden');
                    value.shapeElement.setAttribute('visibility', 'hidden');
                }
                if (element) {
                    element.style.visibility = 'hidden';
                }
            });
        }
    };
    Zoom.prototype.calculateZoomAxesRange = function (chart, axes) {
        var _this = this;
        var range;
        var axisRange;
        chart.axisCollections.forEach(function (axis, index) {
            axisRange = axis.visibleRange;
            if (_this.zoomAxes[index]) {
                if (!chart.delayRedraw) {
                    _this.zoomAxes[index].min = axisRange.min;
                    _this.zoomAxes[index].delta = axisRange.delta;
                }
            }
            else {
                range = {
                    actualMin: axis.actualRange.min,
                    actualDelta: axis.actualRange.delta,
                    min: axisRange.min,
                    delta: axisRange.delta
                };
                _this.zoomAxes[index] = range;
            }
        });
    };
    // Zooming Toolkit created here
    Zoom.prototype.showZoomingToolkit = function (chart) {
        var toolboxItems = this.zooming.toolbarItems;
        var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
        var spacing = 5;
        var render = chart.renderer;
        var length = this.isDevice ? 1 : toolboxItems.length;
        var iconSize = this.isDevice ? measureText('Reset Zoom', { size: '12px' }).width : 16;
        var height = this.isDevice ? measureText('Reset Zoom', { size: '12px' }).height : 22;
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
        if (length === 0 || getElement(this.elementId + '_Zooming_KitCollection')) {
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
        this.toolkitElements.appendChild(render.drawRectangle(new RectOption(this.elementId + '_Zooming_Rect', '#fafafa', { color: 'transparent', width: 1 }, 1, new Rect(0, 0, width, (height + (spacing * 2))), 0, 0)));
        outerElement = render.drawRectangle(new RectOption(this.elementId + '_Zooming_Rect', '#fafafa', { color: 'transparent', width: 1 }, 0.1, new Rect(0, 0, width, (height + (spacing * 2))), 0, 0));
        outerElement.setAttribute('filter', 'url(#chart_shadow)');
        this.toolkitElements.appendChild(outerElement);
        var currentItem;
        for (var i = 1; i <= length; i++) {
            currentItem = toolboxItems[i - 1];
            element = render.createGroup({
                transform: 'translate(' + xPosition + ',' + (this.isDevice ? spacing : (spacing + 3)) + ')'
            });
            // for desktop toolkit hight is 32 and top padding is 8 icon size 16
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
        this.toolkitElements.setAttribute('opacity', this.isDevice ? '1' : '' + this.zoomkitOpacity);
        this.toolkitElements.setAttribute('cursor', 'auto');
        chart.svgObject.appendChild(this.toolkitElements);
        if (!this.isDevice) {
            EventHandler.add(this.toolkitElements, 'mousemove touchstart', this.zoomToolkitMove, this);
            EventHandler.add(this.toolkitElements, 'mouseleave touchend', this.zoomToolkitLeave, this);
            if (this.isPanning) {
                toolkit.pan();
            }
        }
        return true;
    };
    /**
     * To the show the zooming toolkit.
     * @return {void}
     * @private
     */
    Zoom.prototype.applyZoomToolkit = function (chart, axes) {
        var showToolkit = false;
        axes.forEach(function (axis) {
            showToolkit = (showToolkit || (axis.zoomFactor !== 1 || axis.zoomPosition !== 0));
        });
        if (showToolkit) {
            this.showZoomingToolkit(chart);
            this.isZoomed = true;
        }
        else {
            this.toolkit.removeTooltip();
            this.isPanning = false;
            this.isZoomed = false;
        }
    };
    Zoom.prototype.zoomToolkitMove = function (e) {
        var element = this.toolkitElements;
        var opacity = +element.getAttribute('opacity');
        this.zoomkitOpacity = 1;
        element.setAttribute('opacity', '' + this.zoomkitOpacity);
        return false;
    };
    Zoom.prototype.zoomToolkitLeave = function (e) {
        var element = this.toolkitElements;
        this.zoomkitOpacity = 0.3;
        element.setAttribute('opacity', '' + this.zoomkitOpacity);
        return false;
    };
    /**
     * @hidden
     */
    Zoom.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        EventHandler.add(this.chart.element, this.wheelEvent, this.chartMouseWheel, this);
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchStartEvent, this.mouseDownHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        this.chart.on(this.cancelEvent, this.mouseCancelHandler, this);
    };
    /**
     * @hidden
     */
    Zoom.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        EventHandler.remove(this.chart.element, this.wheelEvent, this.chartMouseWheel);
        this.chart.off(Browser.touchMoveEvent, this.mouseMoveHandler);
        this.chart.off(Browser.touchStartEvent, this.mouseDownHandler);
        this.chart.off(Browser.touchEndEvent, this.mouseUpHandler);
        this.chart.off(this.cancelEvent, this.mouseCancelHandler);
    };
    /**
     * Handles the mouse wheel on chart.
     * @return {boolean}
     * @private
     */
    Zoom.prototype.chartMouseWheel = function (e) {
        var chart = this.chart;
        var offset = chart.element.getBoundingClientRect();
        var svgRect = getElement(chart.element.id + '_svg').getBoundingClientRect();
        var mouseX = (e.clientX - offset.left) - Math.max(svgRect.left - offset.left, 0);
        var mouseY = (e.clientY - offset.top) - Math.max(svgRect.top - offset.top, 0);
        if (this.zooming.enableMouseWheelZooming &&
            withInBounds(mouseX, mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            e.preventDefault();
            this.performMouseWheelZooming(e, mouseX, mouseY, chart, chart.axisCollections);
        }
        return false;
    };
    /**
     * @hidden
     */
    Zoom.prototype.mouseMoveHandler = function (e) {
        //Zooming for chart
        var chart = this.chart;
        var touches = null;
        if (e.type === 'touchmove') {
            if (e.preventDefault && this.isIOS &&
                (this.isPanning || (chart.isDoubleTap)
                    || (this.zooming.enablePinchZooming && this.touchStartList.length > 1))) {
                e.preventDefault();
            }
            touches = e.touches;
        }
        if (chart.isChartDrag) {
            if (chart.isTouch) {
                this.touchMoveList = this.addTouchPointer(this.touchMoveList, e, touches);
                if (this.zooming.enablePinchZooming && this.touchMoveList.length > 1
                    && this.touchStartList.length > 1) {
                    this.performPinchZooming(e, chart);
                }
            }
            this.renderZooming(e, chart, chart.isTouch);
        }
    };
    /**
     * @hidden
     */
    Zoom.prototype.mouseDownHandler = function (e) {
        //Zooming for chart
        var chart = this.chart;
        var touches = null;
        var target;
        if (e.type === 'touchstart') {
            touches = e.touches;
            target = e.target;
        }
        else {
            target = e.target;
        }
        if (target.id.indexOf(chart.element.id + '_Zooming_') === -1 &&
            withInBounds(chart.previousMouseMoveX, chart.previousMouseMoveY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            chart.isChartDrag = true;
        }
        if (chart.isTouch) {
            this.touchStartList = this.addTouchPointer(this.touchStartList, e, touches);
        }
    };
    /**
     * @hidden
     */
    Zoom.prototype.mouseUpHandler = function (e) {
        var chart = this.chart;
        var performZoomRedraw = e.target.id.indexOf(chart.element.id + '_ZoomOut_') === -1 ||
            e.target.id.indexOf(chart.element.id + '_ZoomIn_') === -1;
        if (chart.isChartDrag || performZoomRedraw) {
            this.performZoomRedraw(chart);
        }
        if (chart.isTouch) {
            if (chart.isDoubleTap && withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)
                && this.touchStartList.length === 1 && this.isZoomed) {
                this.toolkit.reset();
            }
            this.touchStartList = [];
            chart.isDoubleTap = false;
        }
    };
    /**
     * @hidden
     */
    Zoom.prototype.mouseCancelHandler = function (e) {
        if (this.isZoomed) {
            this.performZoomRedraw(this.chart);
        }
        this.pinchTarget = null;
        this.touchStartList = [];
        this.touchMoveList = [];
    };
    /**
     * Handles the touch pointer.
     * @return {boolean}
     * @private
     */
    Zoom.prototype.addTouchPointer = function (touchList, e, touches) {
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
    /**
     * Get module name.
     */
    Zoom.prototype.getModuleName = function () {
        // Returns te module name
        return 'Zoom';
    };
    /**
     * To destroy the zooming.
     * @return {void}
     * @private
     */
    Zoom.prototype.destroy = function (chart) {
        // Destroy method performed here
        this.removeEventListener();
    };
    return Zoom;
}());

/**
 * Selection Module handles the selection for chart.
 * @private
 */
var BaseSelection = /** @class */ (function () {
    function BaseSelection(control) {
        this.control = control;
    }
    /**
     * To create selection styles for series
     */
    BaseSelection.prototype.seriesStyles = function () {
        var seriesclass;
        var style = document.getElementById(this.styleId);
        if (isNullOrUndefined(style)) {
            style = document.createElement('style');
            style.setAttribute('id', this.styleId);
            for (var _i = 0, _a = this.control.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                seriesclass = series.selectionStyle || this.styleId + '_series_' + series.index;
                style.innerHTML += series.selectionStyle ? '' : '.' + seriesclass + ' { } ';
            }
            style.innerHTML += '.' + this.unselected + ' { opacity:' + (0.3) + ';} ';
            document.body.appendChild(style);
        }
    };
    /**
     * To concat indexes
     */
    BaseSelection.prototype.concatIndexes = function (userIndexes, localIndexes) {
        return userIndexes.concat(localIndexes);
    };
    /**
     * Selected points series visibility checking on legend click
     */
    BaseSelection.prototype.checkVisibility = function (selectedIndexes) {
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
            if (this.control.series[index].visible) {
                visible = true;
                break;
            }
        }
        return visible;
    };
    /**
     * To add svg element style class
     * @private
     */
    BaseSelection.prototype.addSvgClass = function (element, className) {
        var elementClassName = element.getAttribute('class') || '';
        elementClassName += ((elementClassName !== '') ? ' ' : '');
        if (elementClassName.indexOf(className) === -1) {
            element.setAttribute('class', elementClassName + className);
        }
    };
    /**
     * To remove svg element style class
     * @private
     */
    BaseSelection.prototype.removeSvgClass = function (element, className) {
        var elementClassName = element.getAttribute('class') || '';
        if (elementClassName.indexOf(className) > -1) {
            element.setAttribute('class', elementClassName.replace(className, ''));
        }
    };
    /**
     * To get children from parent element
     */
    BaseSelection.prototype.getChildren = function (parent) {
        var children = [];
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].tagName !== 'defs') {
                children.push(parent.childNodes[i]);
            }
        }
        return children;
    };
    return BaseSelection;
}());

var __extends$44 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Selection src file
 */
/**
 * Selection Module handles the selection for chart.
 * @private
 */
var Selection = /** @class */ (function (_super) {
    __extends$44(Selection, _super);
    /**
     * Constructor for selection module.
     * @private.
     */
    function Selection(chart) {
        var _this = _super.call(this, chart) || this;
        _this.chart = chart;
        _this.renderer = chart.renderer;
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for selection module.
     */
    Selection.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on(cancelEvent, this.completeSelection, this);
        this.chart.on('click', this.calculateSelectedElements, this);
        this.chart.on(Browser.touchStartEvent, this.mousedown, this);
        this.chart.on(Browser.touchEndEvent, this.completeSelection, this);
    };
    /**
     * Chart mouse down
     */
    Selection.prototype.mousedown = function (e) {
        var chart = this.chart;
        if (chart.selectionMode === 'None' || chart.isChartDrag) {
            return;
        }
        if (chart.isDoubleTap || !chart.isTouch || this.rectPoints) {
            this.dragStart(chart, chart.chartAxisLayoutPanel.seriesClipRect, chart.mouseDownX, chart.mouseDownY, e);
        }
    };
    /**
     * UnBinding events for selection module.
     */
    Selection.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
        this.chart.off('pointerleave' || 'mouseleave', this.completeSelection);
        this.chart.off('click', this.calculateSelectedElements);
        this.chart.off(Browser.touchStartEvent, this.mousedown);
        this.chart.off(Browser.touchEndEvent, this.completeSelection);
    };
    /**
     * To find private variable values
     */
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
    /**
     * Method to select the point and series.
     * @return {void}
     * @private
     */
    Selection.prototype.invokeSelection = function (chart) {
        this.initPrivateVariables(chart);
        this.series = extend({}, chart.visibleSeries, null, true);
        this.seriesStyles();
        if (!(chart.selectionMode.indexOf('Drag') > -1)) {
            this.selectDataIndex(chart, this.concatIndexes(chart.selectedDataIndexes, this.selectedDataIndexes));
        }
    };
    Selection.prototype.generateStyle = function (series) {
        if (series) {
            return (series.selectionStyle || this.styleId + '_series_' + series.index);
        }
        return 'undefined';
    };
    Selection.prototype.selectDataIndex = function (chart, indexes) {
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            this.performSelection(index, chart, this.getElementByIndex(chart, index)[0]);
        }
    };
    Selection.prototype.getElementByIndex = function (chart, index, suffix) {
        if (suffix === void 0) { suffix = ''; }
        var elementId = chart.element.id + '_Series_' + index.series + '_Point' + '_' + index.point;
        var series = chart.series[index.series];
        elementId = (!series.isRectSeries && series.type !== 'Scatter' && series.type !== 'Bubble' &&
            series.marker.visible) ? (elementId + '_Symbol' + suffix) : elementId;
        return [getElement(elementId), (series.type === 'RangeArea' && series.marker.visible) ? getElement(elementId + '1') : null];
    };
    Selection.prototype.getClusterElements = function (chart, index) {
        var clusters = [];
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            index = new Index(series.index, index.point);
            clusters.push(this.getElementByIndex(chart, index)[0]);
        }
        return clusters;
    };
    Selection.prototype.findElements = function (chart, series, index, suffix) {
        if (suffix === void 0) { suffix = ''; }
        if (this.isSeriesMode) {
            return this.getSeriesElements(series);
        }
        else if (chart.selectionMode === 'Cluster') {
            return this.getClusterElements(chart, index);
        }
        else {
            return this.getElementByIndex(chart, index, suffix);
        }
    };
    /**
     * To find the selected element.
     * @return {void}
     * @private
     */
    Selection.prototype.calculateSelectedElements = function (event) {
        if (this.chart.selectionMode === 'None' || event.target.id.indexOf(this.chart.element.id + '_') === -1) {
            return;
        }
        if (event.target.id.indexOf('_Series_') > -1) {
            this.performSelection(this.indexFinder(event.target.id), this.chart, event.target);
        }
    };
    Selection.prototype.performSelection = function (index, chart, element) {
        this.isSeriesMode = chart.selectionMode === 'Series';
        if (chart.series[index.series].type === 'BoxAndWhisker' &&
            element.id === chart.element.id + '_Series_' + index.series + '_Point_' + index.point + '_BoxPath') {
            element = element.parentElement;
        }
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
        var className = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
        if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
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
                (this.control.selectionMode === 'Cluster' && !this.toEquals(index[i], currentIndex, false)) ||
                (!this.isSeriesMode && this.toEquals(index[i], currentIndex, true) && !this.toEquals(index[i], currentIndex, false))) {
                this.removeStyles(this.findElements(chart, series, index[i]));
                index.splice(i, 1);
                i--;
            }
        }
    };
    Selection.prototype.blurEffect = function (chartId, visibleSeries) {
        var visibility = this.checkVisibility(this.selectedDataIndexes); // legend click scenario
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            if (series.visible) {
                this.checkSelectionElements(getElement(chartId + 'SeriesGroup' + series.index), this.generateStyle(series), visibility);
                if (!isNullOrUndefined(getElement(chartId + 'SymbolGroup' + series.index))) {
                    this.checkSelectionElements(getElement(chartId + 'SymbolGroup' + series.index), this.generateStyle(series), visibility);
                }
            }
        }
    };
    Selection.prototype.checkSelectionElements = function (element, className, visibility) {
        var children = (this.isSeriesMode ? [element] : element.childNodes);
        var elementClassName;
        var parentClassName;
        for (var i = 0; i < children.length; i++) {
            elementClassName = children[i].getAttribute('class') || '';
            parentClassName = children[i].parentNode.getAttribute('class') || '';
            if (elementClassName.indexOf(className) === -1 &&
                parentClassName.indexOf(className) === -1 && visibility) {
                this.addSvgClass(children[i], this.unselected);
            }
            else {
                this.removeSvgClass(children[i], this.unselected);
            }
        }
    };
    Selection.prototype.applyStyles = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (element) {
                this.removeSvgClass(element.parentNode, this.unselected);
                this.removeSvgClass(element, this.unselected);
                this.addSvgClass(element, this.getSelectionClass(element.id));
            }
        }
    };
    Selection.prototype.getSelectionClass = function (id) {
        return this.generateStyle(this.control.series[this.indexFinder(id).series]);
    };
    Selection.prototype.removeStyles = function (elements) {
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            if (element) {
                this.removeSvgClass(element, this.getSelectionClass(element.id));
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
        return ((first.series === second.series || (this.control.selectionMode === 'Cluster' && !checkSeriesOnly))
            && (checkSeriesOnly || (first.point === second.point)));
    };
    /**
     * To redraw the selected points.
     * @return {void}
     * @private
     */
    Selection.prototype.redrawSelection = function (chart, oldMode) {
        this.isSeriesMode = oldMode === 'Series';
        var selectedDataIndexes = extend([], this.selectedDataIndexes, null, true);
        this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        this.blurEffect(chart.element.id, chart.visibleSeries);
        this.selectDataIndex(chart, selectedDataIndexes);
    };
    /** @private */
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
                this.isSeriesMode = chart.selectionMode === 'Series';
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
            this.selection(chart, new Index(series, NaN), seriesElements);
            this.isSeriesMode = chart.selectionMode === 'Series';
            this.blurEffect(chart.element.id, chart.visibleSeries);
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
        else if (id.indexOf('_Series_') > -1) {
            ids[0] = id.split('_Series_')[1];
        }
        return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
    };
    /**
     * Drag selection that returns the selected data.
     * @return {void}
     * @private
     */
    Selection.prototype.calculateDragSelectedElements = function (chart, dragRect) {
        this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        var rect = new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
        var axisOffset = new ChartLocation(chart.chartAxisLayoutPanel.seriesClipRect.x, chart.chartAxisLayoutPanel.seriesClipRect.y);
        this.removeOffset(rect, axisOffset);
        var points;
        var index;
        var selectedPointValues = [];
        var selectedSeriesValues = [];
        this.isSeriesMode = false;
        var _loop_1 = function (series) {
            if (series.visible) {
                points = series.points;
                selectedPointValues = [];
                var xAxisOffset_1;
                var yAxisOffset_1;
                if ((chart.isTransposed || series.type.indexOf('Bar') !== -1) &&
                    !(chart.isTransposed && series.type.indexOf('Bar') !== -1)) {
                    xAxisOffset_1 = series.xAxis.rect.y - axisOffset.y;
                    yAxisOffset_1 = series.yAxis.rect.x - axisOffset.x;
                }
                else {
                    xAxisOffset_1 = series.xAxis.rect.x - axisOffset.x;
                    yAxisOffset_1 = series.yAxis.rect.y - axisOffset.y;
                }
                for (var j = 0; j < points.length; j++) {
                    var yValue = series.type !== 'RangeArea' ? points[j].yValue :
                        points[j].regions[0].y;
                    var isCurrentPoint = void 0;
                    if (series.type === 'BoxAndWhisker') {
                        isCurrentPoint = points[j].regions.some(function (region) {
                            return withInBounds(region.x + xAxisOffset_1, region.y + yAxisOffset_1, rect);
                        });
                    }
                    else {
                        isCurrentPoint = points[j].symbolLocations.some(function (location) {
                            return location && withInBounds(location.x + xAxisOffset_1, location.y + yAxisOffset_1, rect);
                        });
                    }
                    if (isCurrentPoint && series.category !== 'Indicator') {
                        index = new Index(series.index, points[j].index);
                        this_1.selection(chart, index, this_1.findElements(chart, series, index));
                        selectedPointValues.push({ x: points[j].xValue.toString(), y: yValue });
                    }
                    if (isCurrentPoint && series.type === 'RangeArea') {
                        selectedPointValues.push({ x: points[j].xValue.toString(), y: points[j].regions[0].y });
                    }
                }
                selectedSeriesValues.push(selectedPointValues);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            _loop_1(series);
        }
        this.blurEffect(chart.element.id, chart.visibleSeries);
        this.rectPoints = new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
        this.createCloseButton((dragRect.x + dragRect.width), dragRect.y);
        var args = {
            name: dragComplete,
            selectedDataValues: selectedSeriesValues,
            cancel: false
        };
        chart.trigger(dragComplete, args);
    };
    Selection.prototype.removeOffset = function (rect, clip) {
        rect.x -= clip.x;
        rect.y -= clip.y;
    };
    /**
     * Method to draw dragging rect.
     * @return {void}
     * @private
     */
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
        if (dragRect.width < 5 || dragRect.height < 5) {
            return null;
        }
        var element = getElement(this.draggedRect);
        if (this.closeIcon) {
            removeElement(this.closeIconId);
        }
        if (element) {
            this.setAttributes(element, dragRect);
        }
        else {
            var dragGroup = this.renderer.createGroup({ id: this.draggedRectGroup });
            chart.svgObject.appendChild(dragGroup);
            element = this.renderer.drawRectangle(new RectOption(this.draggedRect, Theme.selectionRectFill, { color: Theme.selectionRectStroke, width: 1 }, 1, dragRect));
            element.setAttribute('style', 'cursor:move;');
            dragGroup.appendChild(element);
        }
    };
    Selection.prototype.createCloseButton = function (x, y) {
        var closeIcon = this.renderer.createGroup({
            id: this.closeIconId,
            style: 'cursor:pointer; visibility: visible;'
        });
        closeIcon.appendChild(this.renderer.drawCircle(new CircleOption(this.closeIconId + '_circle', '#FFFFFF', { color: Theme.selectionRectStroke, width: 1 }, 1, x, y, 10)));
        var direction = 'M ' + (x - 4) + ' ' + (y - 4) + ' L ' + (x + 4) + ' ' + (y + 4) + ' M ' + (x - 4) + ' ' + (y + 4) +
            ' L ' + (x + 4) + ' ' + (y - 4);
        closeIcon.appendChild(this.renderer.drawPath({
            id: this.closeIconId + '_cross', d: direction, stroke: Theme.selectionRectStroke,
            'stroke-width': 2, fill: Theme.selectionRectStroke
        }));
        this.closeIcon = closeIcon;
        getElement(this.draggedRectGroup).appendChild(closeIcon);
    };
    /**
     * Method to remove dragged element.
     * @return {void}
     * @private
     */
    Selection.prototype.removeDraggedElements = function (chart, event) {
        if ((event.target.id.indexOf(this.closeIconId) > -1) && (event.type.indexOf('move') === -1)) {
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            this.blurEffect(chart.element.id, chart.visibleSeries);
            remove(getElement(this.draggedRectGroup));
            this.changeCursorStyle(false, chart.svgObject, 'auto');
            this.rectPoints = null;
        }
    };
    /**
     * Method to resize the drag rect.
     * @return {void}
     * @private
     */
    Selection.prototype.resizingSelectionRect = function (chart, location, tapped) {
        var rect = new Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
        var resize = this.findResizeMode(chart.svgObject, rect, location);
        if (this.resizing) {
            rect = getDraggedRectLocation(rect.x, rect.y, (rect.x + rect.width), (rect.y + rect.height), chart.chartAxisLayoutPanel.seriesClipRect);
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
            var resizeEdges = [new Rect(rect.x, (rect.y - 10), rect.width - 5, 20),
                new Rect((rect.x - 10), rect.y, 20, rect.height),
                new Rect(rect.x, (rect.y + rect.height - 10), rect.width - 10, 20),
                new Rect((rect.x + rect.width - 10), rect.y + 5, 20, rect.height - 15),
                new Rect((rect.x + rect.width - 10), (rect.y + rect.height - 10), 20, 20)]; //corner
            for (var i = 0; i < resizeEdges.length; i++) {
                if (withInBounds(location.x, location.y, resizeEdges[i])) {
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
        this.changeCursorStyle(resize, getElement(this.draggedRect), cursorStyle);
        this.changeCursorStyle(resize, chartSvgObject, cursorStyle);
        return resize;
    };
    Selection.prototype.changeCursorStyle = function (isResize, rectelement, cursorStyle) {
        cursorStyle = isResize ? cursorStyle : (this.control.svgObject === rectelement) ? 'auto' : 'move';
        rectelement.setAttribute('style', 'cursor:' + cursorStyle + ';');
    };
    Selection.prototype.removeSelectedElements = function (chart, index, seriesCollection) {
        index.splice(0, index.length);
        var seriesElements;
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            seriesElements = this.getSeriesElements(series);
            this.removeStyles(seriesElements);
            for (var _a = 0, seriesElements_2 = seriesElements; _a < seriesElements_2.length; _a++) {
                var seriesElement = seriesElements_2[_a];
                this.removeStyles(this.getChildren(seriesElement));
            }
        }
    };
    Selection.prototype.setAttributes = function (ele, object) {
        var keys = Object.keys(object);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            ele.setAttribute(key, object[key]);
        }
    };
    /**
     * Method to move the dragged rect.
     * @return {void}
     * @private
     */
    Selection.prototype.draggedRectMoved = function (chart, grabbedPoint, doDrawing) {
        var rect = new Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
        rect.x -= (grabbedPoint.x - chart.mouseX);
        rect.y -= (grabbedPoint.y - chart.mouseY);
        rect = getDraggedRectLocation(rect.x, rect.y, rect.x + rect.width, rect.height + rect.y, chart.chartAxisLayoutPanel.seriesClipRect);
        if (doDrawing) {
            this.drawDraggingRect(chart, rect);
        }
        else {
            this.calculateDragSelectedElements(chart, rect);
        }
    };
    /**
     * To complete the selection.
     * @return {void}
     * @private
     */
    Selection.prototype.completeSelection = function (e) {
        var chart = this.chart;
        if (chart.selectionMode === 'None') {
            return;
        }
        if ((this.dragging || this.resizing) && this.dragRect.width > 5 && this.dragRect.height > 5) {
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
        return getDraggedRectLocation(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY, seriesClipRect);
    };
    /** @private */
    Selection.prototype.dragStart = function (chart, seriesClipRect, mouseDownX, mouseDownY, event) {
        this.dragging = (chart.selectionMode.indexOf('Drag') > -1) && (chart.isDoubleTap || !chart.isTouch) &&
            chart.chartAreaType !== 'PolarRadar';
        if (this.dragging) {
            this.dragRect = new Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
            if (chart.mouseDownX < seriesClipRect.x || chart.mouseDownX > (seriesClipRect.x + seriesClipRect.width) ||
                chart.mouseDownY < seriesClipRect.y || chart.mouseDownY > (seriesClipRect.y + seriesClipRect.height)) {
                this.dragging = false;
            }
        }
        if (this.rectPoints) {
            this.dragRect = new Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
            this.resizingSelectionRect(chart, new ChartLocation(mouseDownX, mouseDownY), true);
            this.rectGrabbing = withInBounds(mouseDownX, mouseDownY, this.rectPoints);
        }
    };
    /** @private */
    Selection.prototype.mouseMove = function (event) {
        var chart = this.chart;
        if (chart.selectionMode === 'None') {
            return;
        }
        if (event.type === 'touchmove' && (Browser.isIos || Browser.isIos7) && this.dragging && event.preventDefault) {
            event.preventDefault();
        }
        var insideMoving = withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect);
        if (insideMoving) {
            if (this.rectGrabbing && !this.resizing) {
                this.draggedRectMoved(chart, this.dragRect, true);
            }
            else if (this.dragging && !this.resizing) {
                this.dragRect = this.getDragRect(chart, chart.chartAxisLayoutPanel.seriesClipRect);
                this.drawDraggingRect(chart, this.dragRect);
            }
            if (this.rectPoints) {
                this.resizingSelectionRect(chart, new ChartLocation(chart.mouseX, chart.mouseY));
            }
        }
        else {
            this.completeSelection(event);
        }
    };
    /**
     * Get module name.
     * @private
     */
    Selection.prototype.getModuleName = function () {
        return 'Selection';
    };
    /**
     * To destroy the selection.
     * @return {void}
     * @private
     */
    Selection.prototype.destroy = function (chart) {
        this.removeEventListener();
        // Destroy method performed here
    };
    return Selection;
}(BaseSelection));

/**
 * DataLabel Module used to render the column series.
 */
var DataLabel = /** @class */ (function () {
    /**
     * Constructor for the data label module.
     * @private
     */
    function DataLabel(chart) {
        this.errorHeight = 0;
        this.chart = chart;
    }
    DataLabel.prototype.initPrivateVariables = function (series, marker) {
        var transform;
        var render = series.chart.renderer;
        transform = series.chart.chartAreaType === 'Cartesian' ? 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')' : '';
        if (marker.dataLabel.visible) {
            series.shapeElement = render.createGroup({
                'id': this.chart.element.id + 'ShapeGroup' + series.index,
                'transform': transform,
                'clip-path': 'url(#' + this.chart.element.id + '_ChartSeriesClipRect_' + series.index + ')'
            });
            series.textElement = render.createGroup({
                'id': this.chart.element.id + 'TextGroup' + series.index,
                'transform': transform,
                'clip-path': 'url(#' + this.chart.element.id + '_ChartSeriesClipRect_' + series.index + ')'
            });
        }
        this.markerHeight = ((series.type === 'Scatter' || marker.visible) && !this.isRectSeries(series)) ? (marker.height / 2) : 0;
        this.commonId = this.chart.element.id + '_Series_' + series.index + '_Point_';
        this.calculateErrorHeight(series, series.marker.dataLabel.position);
    };
    DataLabel.prototype.calculateErrorHeight = function (series, position) {
        if (!series.errorBar.visible) {
            return null;
        }
        else if (series.errorBar.visible && this.chart.chartAreaType !== 'PolarRadar') {
            var direction = series.errorBar.direction;
            var positiveHeight = this.chart.errorBarModule.positiveHeight;
            var negativeHeight = this.chart.errorBarModule.negativeHeight;
            if (this.isRectSeries(series)) {
                if (position === 'Top' || position === 'Auto') {
                    if (direction === 'Both' || direction === 'Minus') {
                        this.errorHeight = negativeHeight;
                    }
                    else {
                        this.errorHeight = 0;
                    }
                }
                if (position === 'Outer' || position === 'Auto') {
                    if (direction === 'Both' || direction === 'Plus') {
                        this.errorHeight = positiveHeight;
                    }
                    else {
                        this.errorHeight = 0;
                    }
                }
            }
            else {
                if (position === 'Top' || position === 'Outer' || position === 'Auto') {
                    if ((direction === 'Both' || direction === 'Plus') && (!series.chart.isTransposed)) {
                        this.errorHeight = positiveHeight;
                    }
                    else {
                        this.errorHeight = 0;
                    }
                }
                if (position === 'Bottom' || position === 'Auto') {
                    if (direction === 'Both' || direction === 'Minus') {
                        this.errorHeight = negativeHeight;
                    }
                    else {
                        this.errorHeight = 0;
                    }
                }
            }
        }
        else {
            this.errorHeight = 0;
        }
    };
    DataLabel.prototype.isRectSeries = function (series) {
        return series.isRectSeries || series.type === 'RangeArea';
    };
    /**
     * Render the data label for series.
     * @return {void}
     * @private
     */
    DataLabel.prototype.render = function (series, chart, dataLabel) {
        var _this = this;
        // initialize the private variable
        this.initPrivateVariables(series, series.marker);
        var rect;
        var rgbValue;
        var contrast;
        var argsData;
        var border;
        var textSize;
        this.inverted = chart.requireInvertedAxis;
        this.yAxisInversed = series.yAxis.isInversed;
        var element = createElement('div', {
            id: chart.element.id + '_Series_' + series.index + '_DataLabelCollections'
        });
        // Data label point iteration started
        series.points.map(function (point, index) {
            _this.margin = dataLabel.margin;
            var labelText = [];
            var labelLength;
            var clip = series.clipRect;
            border = { width: dataLabel.border.width, color: dataLabel.border.color };
            if ((point.symbolLocations.length && point.symbolLocations[0]) ||
                (series.type === 'BoxAndWhisker' && point.regions.length)) {
                labelText = getLabelText(point, series, chart);
                labelLength = labelText.length;
                for (var i = 0; i < labelLength; i++) {
                    argsData = {
                        cancel: false, name: textRender, series: series,
                        point: point, text: labelText[i], border: border,
                        color: dataLabel.fill, template: dataLabel.template
                    };
                    chart.trigger(textRender, argsData);
                    if (!argsData.cancel) {
                        _this.fontBackground = argsData.color;
                        _this.isDataLabelShape(argsData);
                        _this.markerHeight = series.type === 'Bubble' ? (point.regions[0].height / 2) : _this.markerHeight;
                        if (argsData.template !== null) {
                            _this.createDataLabelTemplate(element, series, dataLabel, point, argsData, i);
                        }
                        else {
                            textSize = measureText(argsData.text, dataLabel.font);
                            rect = _this.calculateTextPosition(point, series, textSize, dataLabel, i);
                            if (!isCollide(rect, chart.dataLabelCollections, clip)) {
                                chart.dataLabelCollections.push(new Rect(rect.x + clip.x, rect.y + clip.y, rect.width, rect.height));
                                if (_this.isShape) {
                                    series.shapeElement.appendChild(chart.renderer.drawRectangle(new RectOption(_this.commonId + index + '_TextShape_' + i, argsData.color, argsData.border, dataLabel.opacity, rect, dataLabel.rx, dataLabel.ry)));
                                }
                                // Checking the font color
                                rgbValue = convertHexToColor(colorNameToHex(_this.fontBackground));
                                contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
                                textElement(new TextOption(_this.commonId + index + '_Text_' + i, rect.x + _this.margin.left + textSize.width / 2, rect.y + _this.margin.top + textSize.height * 3 / 4, 'middle', argsData.text, 'rotate(0,' + (rect.x) + ',' + (rect.y) + ')', 'auto'), dataLabel.font, dataLabel.font.color ||
                                    ((contrast >= 128 || series.type === 'Hilo') ? 'black' : 'white'), series.textElement);
                            }
                        }
                    }
                }
            }
        });
        if (element.childElementCount) {
            getElement(chart.element.id + '_Secondary_Element').appendChild(element);
        }
    };
    /**
     * Render the data label template.
     * @return {void}
     * @private
     */
    DataLabel.prototype.createDataLabelTemplate = function (parentElement, series, dataLabel, point, data, labelIndex) {
        this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
        var clip = series.clipRect;
        var childElement = createTemplate(createElement('div', {
            id: this.chart.element.id + '_Series_' + series.index + '_DataLabel_'
                + point.index + (labelIndex ? ('_' + labelIndex) : ''),
            styles: 'position: absolute;background-color:' + data.color + ';' +
                getFontStyle(dataLabel.font) + ';border:' + data.border.width + 'px solid ' + data.border.color + ';'
        }), point.index, data.template, this.chart, point, series);
        var elementRect = measureElementRect(childElement);
        var rect = this.calculateTextPosition(point, series, { width: elementRect.width, height: elementRect.height }, dataLabel, labelIndex);
        childElement.style.left = ((this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.x) + rect.x) + 'px';
        childElement.style.top = ((this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.y) + rect.y) + 'px';
        var rgbValue = convertHexToColor(colorNameToHex(this.fontBackground));
        childElement.style.color = dataLabel.font.color ||
            ((Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000)) >= 128 ? 'black' : 'white');
        if (childElement.childElementCount && !isCollide(rect, this.chart.dataLabelCollections, clip)
            && (series.seriesType !== 'XY' || point.yValue === undefined || withIn(point.yValue, series.yAxis.visibleRange))
            && withIn(point.xValue, series.xAxis.visibleRange)) {
            this.chart.dataLabelCollections.push(new Rect(rect.x + clip.x, rect.y + clip.y, rect.width, rect.height));
            parentElement.appendChild(childElement);
            if (series.animation.enable && this.chart.animateSeries) {
                this.doDataLabelAnimation(series, childElement);
            }
        }
    };
    DataLabel.prototype.calculateTextPosition = function (point, series, textSize, dataLabel, labelIndex) {
        var labelRegion = labelIndex > 1 ? (series.type === 'Candle') ? point.regions[1] : point.regions[0] : point.regions[0];
        if (labelIndex > 1 && series.type === 'HiloOpenClose') {
            labelRegion = (labelIndex === 2) ? point.regions[1] : point.regions[2];
        }
        var location;
        location = this.getLabelLocation(point, series, textSize, labelIndex);
        var padding = 5;
        var clipRect = series.clipRect;
        var rect;
        // calculating alignment
        if (!this.chart.requireInvertedAxis || !this.isRectSeries(series) || series.type === 'BoxAndWhisker') {
            this.locationX = location.x;
            var alignmentValue = textSize.height + (this.borderWidth * 2) + this.markerHeight +
                this.margin.bottom + this.margin.top + padding;
            location.y = (dataLabel.position === 'Auto') ? location.y :
                this.calculateAlignment(alignmentValue, location.y, dataLabel.alignment, this.isRectSeries(series) ? point.yValue < 0 : false);
            // calculating position
            location.y = (!this.isRectSeries(series) || series.type === 'BoxAndWhisker') ?
                this.calculatePathPosition(location.y, dataLabel.position, series, point, textSize, labelIndex) :
                this.calculateRectPosition(location.y, labelRegion, point.yValue < 0 !== this.yAxisInversed, dataLabel.position, series, textSize, labelIndex, point);
            if (this.isRectSeries(series) && this.chart.chartAreaType === 'PolarRadar') {
                location = this.calculatePolarRectPosition(location, dataLabel.position, series, point, textSize, labelIndex);
            }
        }
        else {
            this.locationY = location.y;
            var alignmentValue = textSize.width + this.borderWidth + this.margin.left + this.margin.right - padding;
            location.x = dataLabel.position === 'Auto' ? location.x :
                this.calculateAlignment(alignmentValue, location.x, dataLabel.alignment, point.yValue < 0);
            location.x = this.calculateRectPosition(location.x, labelRegion, point.yValue < 0 !== this.yAxisInversed, dataLabel.position, series, textSize, labelIndex, point);
        }
        rect = calculateRect(location, textSize, this.margin);
        // Checking the condition whether data Label has been exist the clip rect
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
    // Calculation label location for polar column draw types
    DataLabel.prototype.calculatePolarRectPosition = function (location, position, series, point, size, labelIndex) {
        var padding = 5;
        var columnRadius;
        if (labelIndex === 0) {
            columnRadius = point.regionData.radius < point.regionData.innerRadius ? point.regionData.innerRadius
                : point.regionData.radius;
        }
        else {
            columnRadius = point.regionData.radius > point.regionData.innerRadius ? point.regionData.innerRadius
                : point.regionData.radius;
        }
        var vector;
        var ticksbwtLabel = series.xAxis.valueType === 'Category' && series.xAxis.labelPlacement === 'BetweenTicks' ? 0.5
            : 0.5 - (series.rectCount / 2);
        this.fontBackground = this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground;
        if (series.drawType.indexOf('Stacking') > -1) {
            position = position === 'Outer' ? 'Top' : position;
        }
        else if (series.drawType.indexOf('Range') > -1) {
            position = (position === 'Outer' || position === 'Top') ? position : 'Auto';
        }
        if (position === 'Outer') {
            columnRadius = labelIndex === 0 ? columnRadius + 2 * padding : columnRadius - 2 * padding;
        }
        else if (position === 'Middle') {
            columnRadius = columnRadius / 2 + padding;
        }
        else if (position === 'Top') {
            columnRadius = labelIndex === 0 ? columnRadius - 2 * padding : columnRadius + 2 * padding;
        }
        else if (position === 'Bottom') {
            columnRadius = padding;
        }
        else {
            if (labelIndex === 0) {
                columnRadius = columnRadius >= series.chart.radius ? columnRadius - padding :
                    series.drawType === 'StackingColumn' ? columnRadius - 2 * padding : columnRadius + 2 * padding;
            }
            else {
                columnRadius = columnRadius >= series.chart.radius ? columnRadius + padding : columnRadius - 2 * padding;
            }
        }
        vector = CoefficientToVector(valueToPolarCoefficient((point.xValue + ticksbwtLabel / series.rectCount + series.position / series.rectCount), series.xAxis), series.chart.primaryXAxis.startAngle);
        location.x = series.clipRect.width / 2 + series.clipRect.x + columnRadius * vector.x;
        location.y = series.clipRect.height / 2 + series.clipRect.y + columnRadius * vector.y;
        return location;
    };
    /**
     * Get the label location
     */
    DataLabel.prototype.getLabelLocation = function (point, series, textSize, labelIndex) {
        var location = new ChartLocation(0, 0);
        var labelRegion = (series.type === 'Candle' && labelIndex > 1) ? point.regions[1] : point.regions[0];
        if (series.type === 'HiloOpenClose') {
            labelRegion = (labelIndex === 2) ? point.regions[1] : point.regions[2];
        }
        var xAxis = series.xAxis;
        var yAxis = series.yAxis;
        var isInverted = series.chart.requireInvertedAxis;
        if (series.type === 'BoxAndWhisker') {
            this.markerHeight = 0;
            switch (labelIndex) {
                case 0:
                    location = getPoint(point.xValue, point.median, xAxis, yAxis, isInverted);
                    break;
                case 1:
                    location = getPoint(point.xValue, point.maximum, xAxis, yAxis, isInverted);
                    break;
                case 2:
                    location = getPoint(point.xValue, point.minimum, xAxis, yAxis, isInverted);
                    break;
                case 3:
                    location = getPoint(point.xValue, point.upperQuartile, xAxis, yAxis, isInverted);
                    break;
                case 4:
                    location = getPoint(point.xValue, point.lowerQuartile, xAxis, yAxis, isInverted);
                    break;
                default: {
                    location = getPoint(point.xValue, point.outliers[labelIndex - 5], xAxis, yAxis, isInverted);
                    this.markerHeight = series.marker.height / 2;
                    break;
                }
            }
        }
        else if (labelIndex === 0 || labelIndex === 1) {
            location = new ChartLocation(point.symbolLocations[0].x, point.symbolLocations[0].y);
        }
        else if ((labelIndex === 2 || labelIndex === 3) && series.type === 'Candle') {
            location = new ChartLocation(point.symbolLocations[1].x, point.symbolLocations[1].y);
        }
        else if (isInverted) {
            location = { x: labelRegion.x + (labelRegion.width) / 2, y: labelRegion.y };
        }
        else {
            location = { x: labelRegion.x + labelRegion.width, y: labelRegion.y + (labelRegion.height) / 2 };
        }
        //Aligning the label at the beginning of the tick, when tick size is less than text size
        if (labelIndex > 1 && series.type === 'HiloOpenClose') {
            if (series.chart.requireInvertedAxis) {
                var height = labelRegion.height;
                location.y = labelRegion.y + height / 2 + 2 * (labelIndex === 2 ? 1 : -1);
            }
            else {
                var width = labelRegion.width;
                location.x = labelRegion.x + width / 2 + 2 * (labelIndex === 2 ? 1 : -1);
            }
        }
        return location;
    };
    DataLabel.prototype.calculateRectPosition = function (labelLocation, rect, isMinus, position, series, textSize, labelIndex, point) {
        if (series.chart.chartAreaType === 'PolarRadar') {
            return null;
        }
        var padding = 5;
        var margin = this.margin;
        var textLength = !this.inverted ? textSize.height : textSize.width;
        var extraSpace = this.borderWidth + textLength / 2 + padding;
        if (series.type.indexOf('Stacking') > -1) {
            position = position === 'Outer' ? 'Top' : position;
        }
        else if (series.type.indexOf('Range') > -1) {
            position = (position === 'Outer' || position === 'Top') ? position : 'Auto';
        }
        else if (series.type === 'Waterfall') {
            position = position === 'Auto' ? 'Middle' : position;
        }
        switch (position) {
            case 'Bottom':
                labelLocation = !this.inverted ?
                    isMinus ? (labelLocation - rect.height + extraSpace + margin.top) :
                        (labelLocation + rect.height - extraSpace - margin.bottom) :
                    isMinus ? (labelLocation + rect.width - extraSpace - margin.left) :
                        (labelLocation - rect.width + extraSpace + margin.right);
                break;
            case 'Middle':
                labelLocation = labelLocation = !this.inverted ?
                    (isMinus ? labelLocation - (rect.height / 2) : labelLocation + (rect.height / 2)) :
                    (isMinus ? labelLocation + (rect.width / 2) : labelLocation - (rect.width / 2));
                break;
            case 'Auto':
                labelLocation = this.calculateRectActualPosition(labelLocation, rect, isMinus, series, textSize, labelIndex, point);
                break;
            default:
                extraSpace += this.errorHeight;
                labelLocation = this.calculateTopAndOuterPosition(labelLocation, rect, position, series, labelIndex, extraSpace, isMinus);
                break;
        }
        var check = !this.inverted ? (labelLocation < rect.y || labelLocation > rect.y + rect.height) :
            (labelLocation < rect.x || labelLocation > rect.x + rect.width);
        this.fontBackground = check ?
            (this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground)
            : this.fontBackground === 'transparent' ? (point.color || series.interior) : this.fontBackground;
        return labelLocation;
    };
    DataLabel.prototype.calculatePathPosition = function (labelLocation, position, series, point, size, labelIndex) {
        var padding = 5;
        if ((series.type.indexOf('Area') > -1 && series.type !== 'RangeArea')
            && this.yAxisInversed && series.marker.dataLabel.position !== 'Auto') {
            position = position === 'Top' ? 'Bottom' : position === 'Bottom' ? 'Top' : position;
        }
        this.fontBackground = this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground;
        switch (position) {
            case 'Top':
            case 'Outer':
                labelLocation = labelLocation - this.markerHeight - this.borderWidth - size.height / 2 - this.margin.bottom - padding -
                    this.errorHeight;
                break;
            case 'Bottom':
                labelLocation = labelLocation + this.markerHeight + this.borderWidth + size.height / 2 + this.margin.top + padding +
                    this.errorHeight;
                break;
            case 'Auto':
                labelLocation = this.calculatePathActualPosition(labelLocation, this.markerHeight, series, point, size, labelIndex);
                break;
        }
        return labelLocation;
    };
    DataLabel.prototype.isDataLabelShape = function (style) {
        this.isShape = (style.color !== 'transparent' || style.border.width > 0);
        this.borderWidth = style.border.width;
        if (!this.isShape) {
            this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
        }
    };
    DataLabel.prototype.calculateRectActualPosition = function (labelLocation, rect, isMinus, series, size, labelIndex, point) {
        var location;
        var labelRect;
        var isOverLap = true;
        var position = 0;
        var collection = this.chart.dataLabelCollections;
        var finalPosition = series.type.indexOf('Range') !== -1 || series.type === 'Hilo' ? 2 : 4;
        while (isOverLap && position < finalPosition) {
            location = this.calculateRectPosition(labelLocation, rect, isMinus, this.getPosition(position), series, size, labelIndex, point);
            if (!this.inverted) {
                labelRect = calculateRect(new ChartLocation(this.locationX, location), size, this.margin);
                isOverLap = labelRect.y < 0 || isCollide(labelRect, collection, series.clipRect) || labelRect.y > series.clipRect.height;
            }
            else {
                labelRect = calculateRect(new ChartLocation(location, this.locationY), size, this.margin);
                isOverLap = labelRect.x < 0 || isCollide(labelRect, collection, series.clipRect) ||
                    labelRect.x + labelRect.width > series.clipRect.width;
            }
            position++;
        }
        return location;
    };
    // alignment calculation assigned here
    DataLabel.prototype.calculateAlignment = function (value, labelLocation, alignment, isMinus) {
        switch (alignment) {
            case 'Far':
                labelLocation = !this.inverted ? (isMinus ? labelLocation + value : labelLocation - value) :
                    (isMinus ? labelLocation - value : labelLocation + value);
                break;
            case 'Near':
                labelLocation = !this.inverted ? (isMinus ? labelLocation - value : labelLocation + value) :
                    (isMinus ? labelLocation + value : labelLocation - value);
                break;
            case 'Center':
                labelLocation = labelLocation;
                break;
        }
        return labelLocation;
    };
    //calculation for top and outer position of datalabel for rect series
    DataLabel.prototype.calculateTopAndOuterPosition = function (location, rect, position, series, index, extraSpace, isMinus) {
        var margin = this.margin;
        var top;
        switch (series.type) {
            case 'RangeColumn':
            case 'RangeArea':
            case 'Hilo':
                top = (index === 0 && !this.yAxisInversed) || (index === 1 && this.yAxisInversed);
                location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top);
                break;
            case 'Candle':
                top = (index === 0 || index === 2) && !this.yAxisInversed
                    || (index === 1 || index === 3) && this.yAxisInversed;
                location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top, index > 1);
                break;
            case 'HiloOpenClose':
                if (index <= 1) {
                    top = (index === 0 && !this.yAxisInversed) || (index === 1 && this.yAxisInversed);
                    location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top);
                }
                else {
                    if (this.yAxisInversed) {
                        location = !this.inverted ? location + extraSpace + margin.top : location - extraSpace - margin.right;
                    }
                    else {
                        location = !this.inverted ? location - extraSpace - margin.bottom : location + extraSpace + margin.left;
                    }
                }
                break;
            default:
                if ((isMinus && position === 'Top') || (!isMinus && position === 'Outer')) {
                    location = !this.inverted ? location - extraSpace - margin.bottom : location + extraSpace + margin.left;
                }
                else {
                    location = !this.inverted ? location + extraSpace + margin.top : location - extraSpace - margin.right;
                }
                break;
        }
        return location;
    };
    /**
     * Updates the label location
     */
    DataLabel.prototype.updateLabelLocation = function (position, location, extraSpace, margin, rect, top, inside$$1) {
        if (inside$$1 === void 0) { inside$$1 = false; }
        if (!this.inverted) {
            if (top) {
                location = (position === 'Outer' && !inside$$1) ? location - extraSpace - margin.bottom : location + extraSpace + margin.top;
            }
            else {
                location = (position === 'Outer' && !inside$$1) ? location + rect.height + extraSpace + margin.top :
                    location + rect.height - extraSpace - margin.bottom;
            }
        }
        else {
            if (top) {
                location = (position === 'Outer' && !inside$$1) ? location + extraSpace + margin.left : location - extraSpace - margin.right;
            }
            else {
                location = (position === 'Outer' && !inside$$1) ? location - rect.width - extraSpace - margin.right :
                    location - rect.width + extraSpace + margin.left;
            }
        }
        return location;
    };
    DataLabel.prototype.calculatePathActualPosition = function (y, markerSize, series, point, size, labelIndex) {
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
        if (series.type === 'Bubble') {
            position = 'Top';
        }
        else if (series.type.indexOf('Step') > -1) {
            position = 'Top';
            if (index) {
                position = (!previousPoint || !previousPoint.visible || (yValue > previousPoint.yValue !== this.yAxisInversed)
                    || yValue === previousPoint.yValue) ? 'Top' : 'Bottom';
            }
        }
        else if (series.type === 'BoxAndWhisker') {
            if (labelIndex === 1 || labelIndex === 3 || labelIndex > 4) {
                position = series.yAxis.isInversed ? 'Bottom' : 'Top';
            }
            else if (labelIndex === 2 || labelIndex === 4) {
                position = series.yAxis.isInversed ? 'Top' : 'Bottom';
            }
            else {
                isOverLap = false;
                position = 'Middle';
                yLocation = this.calculatePathPosition(y, position, series, point, size, labelIndex);
            }
        }
        else {
            if (index === 0) {
                position = (!nextPoint || !nextPoint.visible || yValue > nextPoint.yValue ||
                    (yValue < nextPoint.yValue && this.yAxisInversed)) ? 'Top' : 'Bottom';
            }
            else if (index === points.length - 1) {
                position = (!previousPoint || !previousPoint.visible || yValue > previousPoint.yValue ||
                    (yValue < previousPoint.yValue && this.yAxisInversed)) ? 'Top' : 'Bottom';
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
                    position = !this.yAxisInversed ? intersectY < yValue ? 'Top' : 'Bottom' :
                        intersectY < yValue ? 'Bottom' : 'Top';
                }
            }
        }
        isBottom = position === 'Bottom';
        positionIndex = ['Outer', 'Top', 'Bottom', 'Middle', 'Auto'].indexOf(position);
        while (isOverLap && positionIndex < 4) {
            yLocation = this.calculatePathPosition(y, this.getPosition(positionIndex), series, point, size, labelIndex);
            labelRect = calculateRect(new ChartLocation(this.locationX, yLocation), size, this.margin);
            isOverLap = labelRect.y < 0 || isCollide(labelRect, collection, series.clipRect)
                || (labelRect.y + labelRect.height) > series.clipRect.height;
            positionIndex = isBottom ? positionIndex - 1 : positionIndex + 1;
            isBottom = false;
        }
        return yLocation;
    };
    /**
     * Animates the data label.
     * @return {void}.
     * @private
     */
    DataLabel.prototype.doDataLabelAnimation = function (series, element) {
        var shapeElements = series.shapeElement.childNodes;
        var textNode = series.textElement.childNodes;
        var delay = series.animation.delay + series.animation.duration;
        var location;
        var length = element ? 1 : textNode.length;
        for (var i = 0; i < length; i++) {
            if (element) {
                element.style.visibility = 'hidden';
                templateAnimate(element, delay, 200, 'ZoomIn');
            }
            else {
                location = new ChartLocation((+textNode[i].getAttribute('x')) + ((+textNode[i].getAttribute('width')) / 2), (+textNode[i].getAttribute('y')) + ((+textNode[i].getAttribute('height')) / 2));
                markerAnimate(textNode[i], delay, 200, series, null, location, true);
                if (shapeElements[i]) {
                    location = new ChartLocation((+shapeElements[i].getAttribute('x')) + ((+shapeElements[i].getAttribute('width')) / 2), (+shapeElements[i].getAttribute('y')) + ((+shapeElements[i].getAttribute('height')) / 2));
                    markerAnimate(shapeElements[i], delay, 200, series, null, location, true);
                }
            }
        }
    };
    DataLabel.prototype.getPosition = function (index) {
        return (['Outer', 'Top', 'Bottom', 'Middle', 'Auto'][index]);
    };
    /**
     * Get module name.
     */
    DataLabel.prototype.getModuleName = function () {
        // Returns the module name
        return 'DataLabel';
    };
    /**
     * To destroy the dataLabel for series.
     * @return {void}
     * @private
     */
    DataLabel.prototype.destroy = function (chart) {
        // Destroy method performed here
    };
    return DataLabel;
}());

/**
 * Error bar Module used to render the error bar for series.
 */
var ErrorBar = /** @class */ (function () {
    /**
     * Constructor for the error bar module.
     * @private
     */
    function ErrorBar(chart) {
        this.chart = chart;
    }
    /**
     * Render the error bar for series.
     * @return {void}
     * @private
     */
    ErrorBar.prototype.render = function (series) {
        if (this.chart.chartAreaType === 'PolarRadar') {
            return null;
        }
        this.createElement(series);
        this.renderErrorBar(series);
    };
    ErrorBar.prototype.renderErrorBar = function (series) {
        var seriesIndex = series.index;
        var symbolId;
        var capId;
        var errorbar = series.errorBar;
        var errorBarCap = series.errorBar.errorBarCap;
        var border = series.border;
        var errorDirection = ['', ''];
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point_1 = _a[_i];
            if (point_1.visible && point_1.symbolLocations[0]) {
                var errorX = 0;
                var errorY = 0;
                switch (errorbar.mode) {
                    case 'Vertical':
                        errorY = errorbar.verticalError;
                        break;
                    case 'Horizontal':
                        errorX = errorbar.horizontalError;
                        break;
                    case 'Both':
                        errorX = errorbar.horizontalError;
                        errorY = errorbar.verticalError;
                        break;
                }
                errorDirection = this['calculate' + errorbar.type + 'Value'](point_1, series, this.chart.requireInvertedAxis, errorX, errorY);
                symbolId = this.chart.element.id + '_Series_' + '_ErrorBarGroup_' + seriesIndex + '_Point_' + point_1.index;
                capId = this.chart.element.id + '_Series_' + '_ErrorBarCap_' + seriesIndex + '_Point_' + point_1.index;
                var shapeOption = new PathOption(symbolId, '', errorbar.width, errorbar.color, null, '', errorDirection[0]);
                var path = this.chart.renderer.drawPath(shapeOption);
                series.errorBarElement.appendChild(path);
                var capOption = new PathOption(capId, '', errorBarCap.width, errorBarCap.color, null, '', errorDirection[1]);
                var capPath = this.chart.renderer.drawPath(capOption);
                series.errorBarElement.appendChild(capPath);
            }
        }
    };
    // path calculation for error bar
    ErrorBar.prototype.findLocation = function (point, series, isInverted, x1, y1) {
        var errorbar = series.errorBar;
        var direction = errorbar.direction;
        var location = [];
        var stackedValue = series.stackedValues;
        var yValue = series.type.indexOf('Stacking') > -1 ? series.stackedValues.endValues[point.index] :
            (series.seriesType === 'HighLow' || series.seriesType === 'HighLowOpenClose') ? (series.points[point.index].high) :
                point.yValue;
        var startPoint = getPoint(point.xValue + ((direction === 'Plus' || direction === 'Both') ? (errorbar.type === 'Custom' &&
            (errorbar.mode === 'Horizontal' || errorbar.mode === 'Both')) ? x1 = errorbar.horizontalPositiveError : x1 : 0), yValue + ((direction === 'Plus' || direction === 'Both') ? (errorbar.type === 'Custom' &&
            (errorbar.mode === 'Vertical' || errorbar.mode === 'Both')) ? y1 = errorbar.verticalPositiveError : y1 : 0), series.xAxis, series.yAxis, isInverted);
        location.push(startPoint);
        if (series.isRectSeries) {
            var midPoint = point.symbolLocations[0];
            location.push(midPoint);
        }
        else {
            var midPoint = getPoint(point.xValue, point.yValue, series.xAxis, series.yAxis, isInverted);
            location.push(midPoint);
        }
        var endPoint = getPoint(point.xValue - ((direction === 'Minus' || direction === 'Both') ? (errorbar.type === 'Custom' &&
            (errorbar.mode === 'Horizontal' || errorbar.mode === 'Both')) ? x1 = errorbar.horizontalNegativeError : x1 : 0), yValue - ((direction === 'Minus' || direction === 'Both') ? (errorbar.type === 'Custom' &&
            (errorbar.mode === 'Vertical' || errorbar.mode === 'Both')) ? y1 = errorbar.verticalNegativeError : y1 : 0), series.xAxis, series.yAxis, isInverted);
        location.push(endPoint);
        // calculate error height for datalabel position alignment
        point.error = (errorbar.mode === 'Vertical') ? errorbar.verticalError : errorbar.horizontalError;
        this.negativeHeight = (errorbar.mode === 'Vertical' || errorbar.mode === 'Both') ? (isInverted ? (location[1].x - location[2].x) :
            (location[2].y - location[1].y)) : 0;
        this.positiveHeight = (errorbar.mode === 'Vertical' || errorbar.mode === 'Both') ? (isInverted ? (location[0].x - location[1].x) :
            (location[1].y - location[0].y)) : 0;
        return this.getErrorDirection(location[0], location[1], location[2], series, isInverted);
    };
    // calculations for eror bar types
    ErrorBar.prototype.calculateFixedValue = function (point, series, isInverted, errorX, errorY, xAxis, yAxis) {
        var errorbar = series.errorBar;
        return this.findLocation(point, series, isInverted, errorX, errorY);
    };
    ErrorBar.prototype.calculatePercentageValue = function (point, series, isInverted, errorX, errorY, xAxis, yAxis) {
        errorX = (errorX / 100) * point.xValue;
        errorY = (errorY / 100) * point.yValue;
        return this.findLocation(point, series, isInverted, errorX, errorY);
    };
    ErrorBar.prototype.calculateStandardDeviationValue = function (point, series, isInverted, errorX, errorY, xAxis, yAxis) {
        var getMean = this.meanCalculation(series, series.errorBar.mode);
        errorX = errorX * (getMean.horizontalSquareRoot + getMean.horizontalMean);
        errorY = errorY * (getMean.verticalSquareRoot + getMean.verticalMean);
        return this.findLocation(point, series, isInverted, errorX, errorY);
    };
    ErrorBar.prototype.calculateStandardErrorValue = function (point, series, isInverted, errorX, errorY, xAxis, yAxis) {
        var length = series.points.length;
        var getMean = this.meanCalculation(series, series.errorBar.mode);
        errorX = ((errorX * getMean.horizontalSquareRoot) / Math.sqrt(length));
        errorY = ((errorY * getMean.verticalSquareRoot) / Math.sqrt(length));
        return this.findLocation(point, series, isInverted, errorX, errorY);
    };
    ErrorBar.prototype.calculateCustomValue = function (point, series, isInverted, errorX, errorY, xAxis, yAxis) {
        var errorbar = series.errorBar;
        return this.findLocation(point, series, isInverted, errorX, errorY);
    };
    ErrorBar.prototype.getHorizontalDirection = function (start, mid, end, direction, errorMode, capLength) {
        var path = '';
        var capDirection = '';
        path += ' M ' + start.x + ' ' + mid.y + ' L ' + end.x + ' ' + mid.y;
        capDirection += (direction === 'Plus' || direction === 'Both') ? ' M ' + (start.x) + ' ' + (mid.y - capLength) + ' L '
            + (start.x) + ' ' + (mid.y + capLength) : '';
        capDirection += (direction === 'Minus' || direction === 'Both') ? ' M ' + (end.x) + ' ' + (mid.y - capLength) + ' L '
            + (end.x) + ' ' + (mid.y + capLength) : ' ';
        return [path, capDirection];
    };
    ErrorBar.prototype.getVerticalDirection = function (start, mid, end, direction, errorMode, capLength) {
        var path = '';
        var capDirection = '';
        path += ' M ' + mid.x + ' ' + start.y + ' L ' + mid.x + ' ' + end.y;
        capDirection += (direction === 'Plus' || direction === 'Both') ? ' M ' + (mid.x - capLength) + ' ' + start.y + ' L '
            + (mid.x + capLength) + ' ' + start.y : '';
        capDirection += (direction === 'Minus' || direction === 'Both') ? ' M ' + (mid.x - capLength) + ' ' + end.y + ' L '
            + (mid.x + capLength) + ' ' + end.y : '';
        return [path, capDirection];
    };
    ErrorBar.prototype.getBothDirection = function (start, mid, end, direction, errorMode, capLength) {
        var capDirection = '';
        var path = '';
        var pathH = this.getHorizontalDirection(start, mid, end, direction, errorMode, capLength);
        var pathV = this.getVerticalDirection(start, mid, end, direction, errorMode, capLength);
        path = pathH[0].concat(pathV[0]);
        capDirection = pathH[1].concat(pathV[1]);
        return [path, capDirection];
    };
    ErrorBar.prototype.getErrorDirection = function (start, mid, end, series, isInverted) {
        var direction = series.errorBar.direction;
        var mode = series.errorBar.mode;
        var capLength = series.errorBar.errorBarCap.length;
        var paths;
        var errorMode = mode;
        switch (mode) {
            case 'Both':
                errorMode = mode;
                break;
            case 'Horizontal':
                errorMode = (isInverted) ? 'Vertical' : mode;
                break;
            case 'Vertical':
                errorMode = (isInverted) ? 'Horizontal' : mode;
                break;
        }
        switch (errorMode) {
            case 'Horizontal':
                paths = this.getHorizontalDirection(start, mid, end, direction, errorMode, capLength);
                break;
            case 'Vertical':
                paths = this.getVerticalDirection(start, mid, end, direction, errorMode, capLength);
                break;
            case 'Both':
                paths = this.getBothDirection(start, mid, end, direction, errorMode, capLength);
                break;
        }
        return [paths[0], paths[1]];
    };
    // mean calculation for standard deviation and standard error
    ErrorBar.prototype.meanCalculation = function (series, mode) {
        var sumOfX = 0;
        var sumOfY = 0;
        var verticalMean = 0;
        var horizontalMean = 0;
        var verStandardMean;
        var horStandardMean;
        var verSquareRoot;
        var horSquareRoot;
        var length = series.points.length;
        switch (mode) {
            case 'Vertical':
                sumOfY = sum(series.yData);
                verticalMean = sumOfY / length;
                break;
            case 'Horizontal':
                sumOfX = sum(series.xData);
                horizontalMean = sumOfX / length;
                break;
            case 'Both':
                sumOfY = sum(series.yData);
                verticalMean = sumOfY / length;
                sumOfX = sum(series.xData);
                horizontalMean = sumOfX / length;
        }
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (mode === 'Vertical') {
                sumOfY = sumOfY + Math.pow((point.yValue - verticalMean), 2);
            }
            else if (mode === 'Horizontal') {
                sumOfX = sumOfX + Math.pow((point.xValue - horizontalMean), 2);
            }
            else {
                sumOfY = sumOfY + Math.pow((point.yValue - verticalMean), 2);
                sumOfX = sumOfX + Math.pow((point.xValue - horizontalMean), 2);
            }
        }
        verStandardMean = sumOfY / (length - 1);
        verSquareRoot = Math.sqrt(sumOfY / (length - 1));
        horStandardMean = sumOfX / (length - 1);
        horSquareRoot = Math.sqrt(sumOfX / (length - 1));
        return new Mean(verStandardMean, verSquareRoot, horStandardMean, horSquareRoot, verticalMean, horizontalMean);
    };
    ErrorBar.prototype.createElement = function (series) {
        var explodeValue = 5;
        var render = series.chart.renderer;
        var transform;
        transform = series.chart.chartAreaType === 'Cartesian' ? 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')' : '';
        var markerHeight = (series.marker.height + explodeValue) / 2;
        var markerWidth = (series.marker.width + explodeValue) / 2;
        if (series.chart.chartAreaType === 'Cartesian') {
            var errorBarClipRect = render.drawClipPath(new RectOption(this.chart.element.id + '_ChartErrorBarClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                x: -markerWidth, y: -markerHeight,
                width: series.clipRect.width + markerWidth * 2, height: series.clipRect.height + markerHeight * 2
            }));
            series.errorBarElement = render.createGroup({
                'id': this.chart.element.id + 'ErrorBarGroup' + series.index,
                'transform': transform,
                'clip-path': 'url(#' + this.chart.element.id + '_ChartErrorBarClipRect_' + series.index + ')'
            });
            series.errorBarElement.appendChild(errorBarClipRect);
        }
    };
    /**
     * Animates the error bar.
     * @return {void}.
     * @private
     */
    ErrorBar.prototype.doErrorBarAnimation = function (series) {
        var errorBarElements = series.errorBarElement.childNodes;
        if (!errorBarElements) {
            return null;
        }
        var delay = series.animation.delay + series.animation.duration;
        var j = 1;
        while (j < errorBarElements.length) {
            for (var i = 0; i < series.points.length; i++) {
                if (!series.points[i].symbolLocations[0]) {
                    continue;
                }
                errorBarElements[j].style.visibility = 'hidden';
                templateAnimate(errorBarElements[j], delay, 350, series.chart.requireInvertedAxis ? 'SlideLeftIn' : 'SlideBottomIn', false);
            }
            j++;
        }
    };
    /**
     * Get module name.
     */
    ErrorBar.prototype.getModuleName = function () {
        // Returns the module name
        return 'ErrorBar';
    };
    /**
     * To destroy the errorBar for series.
     * @return {void}
     * @private
     */
    ErrorBar.prototype.destroy = function (chart) {
        // Destroy method performed here
    };
    return ErrorBar;
}());

var __extends$45 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Chart legend
 */
/**
 * `Legend` module used to render legend for the chart.
 */
var Legend = /** @class */ (function (_super) {
    __extends$45(Legend, _super);
    function Legend(chart) {
        var _this = _super.call(this, chart) || this;
        _this.library = _this;
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for legend module.
     */
    Legend.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on('click', this.click, this);
        this.chart.on(Browser.touchEndEvent, this.mouseEnd, this);
    };
    /**
     * UnBinding events for legend module.
     */
    Legend.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
        this.chart.off('click', this.click);
        this.chart.off(Browser.touchEndEvent, this.mouseEnd);
    };
    /**
     * To handle mosue move for legend module
     */
    Legend.prototype.mouseMove = function (e) {
        if (this.chart.legendSettings.visible && !this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * To handle mosue end for legend module
     */
    Legend.prototype.mouseEnd = function (e) {
        if (this.chart.legendSettings.visible && this.chart.isTouch) {
            this.move(e);
        }
    };
    /**
     * Get the legend options.
     * @return {void}
     * @private
     */
    Legend.prototype.getLegendOptions = function (visibleSeriesCollection) {
        this.legendCollections = [];
        var seriesType;
        for (var _i = 0, visibleSeriesCollection_1 = visibleSeriesCollection; _i < visibleSeriesCollection_1.length; _i++) {
            var series = visibleSeriesCollection_1[_i];
            if (series.category !== 'Indicator') {
                seriesType = (visibleSeriesCollection[0].chart.chartAreaType === 'PolarRadar') ? series.drawType :
                    series.type;
                this.legendCollections.push(new LegendOptions(series.name, series.interior, series.legendShape, series.visible, seriesType, series.marker.shape, series.marker.visible));
            }
        }
    };
    /** @private */
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
        this.maxItemHeight = Math.max(measureText('MeasureText', legend.textStyle).height, legend.shapeHeight);
        var render = false;
        for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
            var legendOption = _a[_i];
            legendEventArgs = {
                fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                markerShape: legendOption.markerShape, name: legendRender, cancel: false
            };
            this.chart.trigger(legendRender, legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendEventArgs.text;
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.markerShape = legendEventArgs.markerShape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle);
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
                    columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding;
                }
            }
        }
        columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding);
        this.isPaging = legendBounds.height < columnHeight;
        this.totalPages = rowCount;
        if (render) {
            this.setBounds(Math.max((rowWidth + padding), maximumWidth), columnHeight, legend, legendBounds);
        }
        else {
            this.setBounds(0, 0, legend, legendBounds);
        }
    };
    /** @private */
    Legend.prototype.getRenderPoint = function (legendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        var previousBound = (prevLegend.location.x + textPadding + prevLegend.textSize.width);
        if ((previousBound + (legendOption.textSize.width + textPadding)) > (rect.x + rect.width + this.legend.shapeWidth / 2) ||
            this.isVertical) {
            legendOption.location.x = start.x;
            legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                prevLegend.location.y + this.maxItemHeight + padding;
        }
        else {
            legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            legendOption.location.y = prevLegend.location.y;
        }
        var availwidth = (this.legendBounds.x + this.legendBounds.width) - (legendOption.location.x +
            textPadding - this.legend.shapeWidth / 2);
        legendOption.text = textTrim(+availwidth.toFixed(4), legendOption.text, this.legend.textStyle);
    };
    /** @private */
    Legend.prototype.LegendClick = function (seriesIndex) {
        var chart = this.chart;
        var series = chart.visibleSeries[seriesIndex];
        var legend = this.legendCollections[seriesIndex];
        var selectedDataIndexes = [];
        if (chart.selectionModule) {
            selectedDataIndexes = extend([], chart.selectionModule.selectedDataIndexes, null, true);
        }
        if (chart.legendSettings.toggleVisibility) {
            if (!series.visible) {
                series.visible = true;
            }
            else {
                series.visible = false;
            }
            legend.visible = (series.visible);
            if (chart.svgObject.childNodes.length > 0) {
                while (chart.svgObject.lastChild) {
                    chart.svgObject.removeChild(chart.svgObject.lastChild);
                }
                remove(chart.svgObject);
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
    /**
     * To show the tooltip for the trimmed text in legend.
     * @return {void}
     * @private
     */
    Legend.prototype.click = function (event) {
        if (!this.chart.legendSettings.visible) {
            return;
        }
        var targetId = event.target.id;
        var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
            this.legendID + '_shape_'];
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
    /**
     * Get module name
     */
    Legend.prototype.getModuleName = function () {
        return 'Legend';
    };
    /**
     * To destroy the Legend.
     * @return {void}
     * @private
     */
    Legend.prototype.destroy = function (chart) {
        this.removeEventListener();
    };
    return Legend;
}(BaseLegend));

/**
 * Annotation Module handles the Annotation for chart and accumulation series.
 */
var AnnotationBase = /** @class */ (function () {
    /**
     * Constructor for chart and accumulation annotation
     * @param control
     */
    function AnnotationBase(control) {
        this.control = control;
    }
    /**
     * Method to render the annotation for chart and accumulation series.
     * @private
     * @param annotation
     * @param index
     */
    AnnotationBase.prototype.render = function (annotation, index) {
        this.isChart = this.control.getModuleName() === 'chart';
        this.annotation = annotation;
        var childElement = createTemplate(createElement('div', {
            id: this.control.element.id + '_Annotation_' + index,
            styles: 'position: absolute;'
        }), index, annotation.content, this.control);
        return childElement;
    };
    /**
     * Method to calculate the location for annotation - coordinate unit as pixel.
     * @private
     * @param location
     */
    AnnotationBase.prototype.setAnnotationPixelValue = function (location) {
        var rect;
        rect = this.annotation.region === 'Chart' ?
            new Rect(0, 0, this.control.availableSize.width, this.control.availableSize.height) :
            this.isChart ?
                this.control.chartAxisLayoutPanel.seriesClipRect :
                this.control.series[0].accumulationBound;
        location.x = ((typeof this.annotation.x !== 'string') ?
            ((typeof this.annotation.x === 'number') ? this.annotation.x : 0) :
            stringToNumber(this.annotation.x, rect.width)) + rect.x;
        location.y = ((typeof this.annotation.y === 'number') ? this.annotation.y :
            stringToNumber(this.annotation.y, rect.height)) + rect.y;
        return true;
    };
    /**
     * Method to calculate the location for annotation - coordinate unit as point.
     * @private
     * @param location
     */
    AnnotationBase.prototype.setAnnotationPointValue = function (location) {
        var symbolLocation = new ChartLocation(0, 0);
        if (this.isChart) {
            var xAxis = void 0;
            var yAxis = void 0;
            var chart = this.control;
            var annotation = this.annotation;
            var xValue = void 0;
            var isLog = false;
            var xAxisName = annotation.xAxisName;
            var yAxisName = annotation.yAxisName;
            var isInverted = chart.requireInvertedAxis;
            for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
                var axis = _a[_i];
                if (xAxisName === axis.name || (xAxisName == null && axis.name === 'primaryXAxis')) {
                    xAxis = axis;
                    if (xAxis.valueType === 'Category') {
                        if (xAxis.labels.indexOf(annotation.x) < 0) {
                            return false;
                        }
                        else {
                            xValue = xAxis.labels.indexOf(annotation.x);
                        }
                    }
                    else if (xAxis.valueType === 'DateTime') {
                        var option = { skeleton: 'full', type: 'dateTime' };
                        xValue = (typeof this.annotation.x === 'object') ?
                            Date.parse(chart.intl.getDateParser(option)(chart.intl.getDateFormat(option)(new Date(DataUtil.parse.parseJson({ val: annotation.x }).val)))) : 0;
                    }
                    else {
                        xValue = +annotation.x;
                    }
                }
                else if (yAxisName === axis.name || (yAxisName == null && axis.name === 'primaryYAxis')) {
                    yAxis = axis;
                    isLog = yAxis.valueType === 'Logarithmic';
                }
            }
            if (xAxis && yAxis && withIn(xAxis.valueType === 'Logarithmic' ? logBase(xValue, xAxis.logBase) : xValue, xAxis.visibleRange)) {
                symbolLocation = getPoint(xValue, withIn((isLog ? logBase(+this.annotation.y, yAxis.logBase) : +this.annotation.y), yAxis.visibleRange) ? +annotation.y :
                    isLog ? Math.pow(yAxis.logBase, yAxis.visibleRange.max) :
                        +annotation.y > yAxis.visibleRange.max ? yAxis.visibleRange.max : yAxis.visibleRange.min, xAxis, yAxis, isInverted);
                location.x = symbolLocation.x + (isInverted ? yAxis.rect.x : xAxis.rect.x);
                location.y = symbolLocation.y + (isInverted ? xAxis.rect.y : yAxis.rect.y);
            }
            else {
                return false;
            }
            return true;
        }
        else {
            return this.setAccumulationPointValue(location);
        }
    };
    /**
     * Method to calculate the location for annotation - coordinate unit as point in accumulation chart.
     * @private
     * @param location
     */
    AnnotationBase.prototype.setAccumulationPointValue = function (location) {
        var accumulation = this.control;
        var point;
        for (var _i = 0, _a = accumulation.visibleSeries[0].points; _i < _a.length; _i++) {
            var accPoint = _a[_i];
            if (typeof accPoint.x === 'object') {
                if (Date.parse(accPoint.x) === Date.parse(this.annotation.x) &&
                    accPoint.y === this.annotation.y) {
                    point = accPoint;
                    break;
                }
            }
            else {
                if (accPoint.x === this.annotation.x && accPoint.y === this.annotation.y) {
                    point = accPoint;
                    break;
                }
            }
        }
        if (point && point.visible) {
            location.x = point.symbolLocation.x;
            location.y = point.symbolLocation.y;
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Method to set the element style for accumulation / chart annotation.
     * @private
     * @param location
     * @param element
     * @param parentElement
     */
    AnnotationBase.prototype.setElementStyle = function (location, element, parentElement) {
        var elementRect = measureElementRect(element);
        var argsData = {
            cancel: false, name: annotationRender, content: element,
            location: location
        };
        this.control.trigger(annotationRender, argsData);
        if (!argsData.cancel) {
            argsData.content.style.left = this.setAlignmentValue(this.annotation.horizontalAlignment, elementRect.width, argsData.location.x) + 'px';
            argsData.content.style.top = this.setAlignmentValue(this.annotation.verticalAlignment, elementRect.height, argsData.location.y) + 'px';
            argsData.content.setAttribute('aria-label', this.annotation.description || 'Annotation');
            appendElement(argsData.content, parentElement);
        }
    };
    /**
     * Method to calculate the alignment value for annotation.
     * @private
     * @param alignment
     * @param size
     * @param value
     */
    AnnotationBase.prototype.setAlignmentValue = function (alignment, size, value) {
        switch (alignment) {
            case 'Top':
            case 'Near':
                value -= size;
                break;
            case 'Bottom':
            case 'Far':
                value += 0;
                break;
            case 'Middle':
            case 'Center':
                value -= (size / 2);
                break;
        }
        return value;
    };
    return AnnotationBase;
}());

var __extends$46 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Annotation Module handles the Annotation for chart.
 */
var ChartAnnotation = /** @class */ (function (_super) {
    __extends$46(ChartAnnotation, _super);
    /**
     * Constructor for chart annotation.
     * @private.
     */
    function ChartAnnotation(control, annotations) {
        var _this = _super.call(this, control) || this;
        _this.chart = control;
        _this.annotations = annotations;
        return _this;
    }
    /**
     * Method to render the annotation for chart
     * @param element
     * @private
     */
    ChartAnnotation.prototype.renderAnnotations = function (element) {
        var _this = this;
        var annotationElement;
        var location;
        this.parentElement = createElement('div', {
            id: this.chart.element.id + '_Annotation_Collections'
        });
        this.annotations.map(function (annotation, index) {
            annotationElement = _this.render(annotation, index);
            location = new ChartLocation(0, 0);
            if (_this['setAnnotation' + annotation.coordinateUnits + 'Value'](location)) {
                _this.setElementStyle(location, annotationElement, _this.parentElement);
            }
        });
        appendElement(this.parentElement, element);
    };
    /**
     * To destroy the annotation.
     * @return {void}
     * @private
     */
    ChartAnnotation.prototype.destroy = function (control) {
        // Destroy method performed here
    };
    /**
     * Get module name.
     */
    ChartAnnotation.prototype.getModuleName = function () {
        // Returns te module name
        return 'Annotation';
    };
    return ChartAnnotation;
}(AnnotationBase));

var __extends$47 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Box and whisker Module used to render the box and whisker series.
 */
var BoxAndWhiskerSeries = /** @class */ (function (_super) {
    __extends$47(BoxAndWhiskerSeries, _super);
    function BoxAndWhiskerSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render BoxAndWhisker series.
     * @return {void}
     * @private
     */
    BoxAndWhiskerSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var sideBySideInfo = this.getSideBySideInfo(series);
        var argsData;
        var borderWidth = series.border.width || 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            var centerRegion_1 = void 0;
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                this.findBoxPlotValues(point.y, point, series.boxPlotMode);
                //region to cover the top and bottom ticks
                this.updateTipRegion(series, point, sideBySideInfo);
                //get middleRect
                centerRegion_1 = this.getRectangle((point.xValue + sideBySideInfo.start), point.upperQuartile, (point.xValue + sideBySideInfo.end), point.lowerQuartile, series);
                point.regions.push(centerRegion_1);
                argsData = this.triggerEvent(series, point, series.interior, {
                    color: (!isNullOrUndefined(series.border.color) && series.border.color !== 'transparent') ? series.border.color :
                        getSaturationColor(series.interior, -0.6),
                    width: series.border.width ? series.border.width : 1
                });
                if (!argsData.cancel) {
                    this.renderBoxAndWhisker(series, point, centerRegion_1, argsData, this.getPathString(point, series, getPoint(point.xValue, point.median, xAxis, yAxis, isInverted), getPoint(point.xValue, point.average, xAxis, yAxis, isInverted)));
                }
            }
        }
        if (series.marker.visible) {
            series.chart.markerRender.render(series);
        }
    };
    /**
     * update the tip region fo box plot
     * @param series
     * @param point
     * @param sideBySideInfo
     */
    BoxAndWhiskerSeries.prototype.updateTipRegion = function (series, point, sideBySideInfo) {
        var tipRegion = this.getRectangle((point.xValue + sideBySideInfo.median), point.maximum, (point.xValue + sideBySideInfo.median), point.minimum, series);
        this.updateTipSize(series, point, tipRegion, series.chart.requireInvertedAxis);
    };
    /**
     * Update tip size to tip regions
     * @param series
     * @param point
     * @param region
     * @param isInverted
     */
    BoxAndWhiskerSeries.prototype.updateTipSize = function (series, point, region, isInverted) {
        var borderWidth = series.border.width || 1;
        if (!isInverted) {
            region.x -= borderWidth / 2;
            region.width = region.width || borderWidth;
        }
        else {
            region.y -= borderWidth / 2;
            region.height = region.height || borderWidth;
        }
        point.regions.push(region);
    };
    /**
     * Calculation for path direction performed here
     * @param point
     * @param series
     * @param median
     * @param average
     */
    BoxAndWhiskerSeries.prototype.getPathString = function (point, series, median, average) {
        var topRect = point.regions[0];
        var midRect = point.regions[1];
        var direction = '';
        var width = series.chart.requireInvertedAxis ? topRect.height : topRect.width;
        var center = series.chart.requireInvertedAxis ? topRect.y + topRect.height / 2 :
            topRect.x + topRect.width / 2;
        var midWidth = midRect.x + midRect.width;
        var midHeight = midRect.y + midRect.height;
        var topWidth = topRect.x + topRect.width;
        var topHeight = topRect.y + topRect.height;
        if (!series.chart.requireInvertedAxis) {
            this.updateTipSize(series, point, { x: midRect.x, y: topRect.y, width: midWidth - midRect.x, height: 0 }, true);
            this.updateTipSize(series, point, { x: midRect.x, y: topHeight, width: midWidth - midRect.x, height: 0 }, true);
            direction += 'M ' + midRect.x + ' ' + topRect.y + ' ' + ' L ' + midWidth + ' ' + topRect.y;
            direction += ' M ' + center + ' ' + topRect.y + ' ' + ' L ' + center + ' ' + midRect.y;
            direction += ' M ' + midRect.x + ' ' + midRect.y + ' ' + ' L ' + midWidth + ' ' + midRect.y +
                ' L ' + midWidth + ' ' + midHeight + ' L ' + midRect.x + ' ' + midHeight + ' Z';
            direction += ' M ' + center + ' ' + midHeight + ' L ' + center + ' ' + topHeight;
            direction += ' M ' + midRect.x + ' ' + topHeight + ' L ' + midWidth + ' ' + topHeight;
            direction += ' M ' + midRect.x + ' ' + median.y + ' L ' + midWidth + ' ' + median.y;
            direction += series.showMean ?
                ' M ' + (average.x - 5) + ' ' + (average.y - 5) + ' L ' + (average.x + 5) + ' ' + (average.y + 5) +
                    ' M ' + (average.x + 5) + ' ' + (average.y - 5) + ' L ' + (average.x - 5) + ' ' + (average.y + 5) : '';
        }
        else {
            this.updateTipSize(series, point, { x: topRect.x, y: midRect.y, width: 0, height: midHeight - midRect.y }, false);
            this.updateTipSize(series, point, { x: topWidth, y: midRect.y, width: 0, height: midHeight - midRect.y }, true);
            direction += 'M ' + topRect.x + ' ' + midRect.y + ' L ' + topRect.x + ' ' + midHeight;
            direction += 'M ' + topRect.x + ' ' + center + ' ' + ' L ' + midRect.x + ' ' + center;
            direction += ' M ' + midRect.x + ' ' + midRect.y + ' ' + ' L ' + midWidth + ' ' + midRect.y +
                ' L ' + midWidth + ' ' + midHeight + ' L ' + midRect.x + ' ' + midHeight + ' Z';
            direction += ' M ' + midWidth + ' ' + center + ' L ' + topWidth + ' ' + center;
            direction += ' M ' + topWidth + ' ' + midRect.y + ' L ' + topWidth + ' ' + midHeight;
            direction += ' M ' + median.x + ' ' + midRect.y + ' ' + ' L ' + median.x + ' ' + midHeight;
            direction += series.showMean ?
                'M ' + (average.x + 5) + ' ' + (average.y - 5) + ' L ' + (average.x - 5) + ' ' + (average.y + 5) +
                    'M ' + (average.x - 5) + ' ' + (average.y - 5) + ' L ' + (average.x + 5) + ' ' + (average.y + 5) : '';
        }
        return direction;
    };
    /**
     * Rendering for box and whisker append here.
     * @param series
     * @param point
     * @param rect
     * @param argsData
     * @param direction
     */
    BoxAndWhiskerSeries.prototype.renderBoxAndWhisker = function (series, point, rect, argsData, direction) {
        var location;
        var size;
        var symbolId = series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index;
        var element = series.chart.renderer.drawPath(new PathOption(symbolId + '_BoxPath', argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction));
        element.setAttribute('aria-label', point.x.toString() + ':' + point.maximum.toString()
            + ':' + point.minimum.toString() + ':' + point.lowerQuartile.toString() + ':' + point.upperQuartile.toString());
        var parentElement = series.chart.renderer.createGroup({
            'id': symbolId
        });
        parentElement.appendChild(element);
        for (var i = 0; i < point.outliers.length; i++) {
            location = getPoint(point.xValue, point.outliers[i], series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
            size = new Size(series.marker.width, series.marker.height);
            point.symbolLocations.push(location);
            this.updateTipSize(series, point, {
                x: location.x - (size.width / 2), y: location.y - (size.height / 2),
                width: size.width, height: size.height
            }, true);
        }
        series.seriesElement.appendChild(parentElement);
    };
    /**
     * To find the box plot values
     * @param yValues
     * @param point
     * @param mode
     */
    BoxAndWhiskerSeries.prototype.findBoxPlotValues = function (yValues, point, mode) {
        var yCount = yValues.length;
        var quartile = {
            average: sum(yValues) / yCount,
            lowerQuartile: 0, upperQuartile: 0,
            maximum: 0, minimum: 0,
            median: 0, outliers: []
        };
        if (mode === 'Exclusive') {
            quartile.lowerQuartile = this.getExclusiveQuartileValue(yValues, yCount, 0.25);
            quartile.upperQuartile = this.getExclusiveQuartileValue(yValues, yCount, 0.75);
            quartile.median = this.getExclusiveQuartileValue(yValues, yCount, 0.5);
        }
        else if (mode === 'Inclusive') {
            quartile.lowerQuartile = this.getInclusiveQuartileValue(yValues, yCount, 0.25);
            quartile.upperQuartile = this.getInclusiveQuartileValue(yValues, yCount, 0.75);
            quartile.median = this.getInclusiveQuartileValue(yValues, yCount, 0.5);
        }
        else {
            quartile.median = getMedian(yValues);
            this.getQuartileValues(yValues, yCount, quartile);
        }
        this.getMinMaxOutlier(yValues, yCount, quartile);
        point.minimum = quartile.minimum;
        point.maximum = quartile.maximum;
        point.lowerQuartile = quartile.lowerQuartile;
        point.upperQuartile = quartile.upperQuartile;
        point.median = quartile.median;
        point.outliers = quartile.outliers;
        point.average = quartile.average;
    };
    /**
     * to find the exclusive quartile values
     * @param yValues
     * @param count
     * @param percentile
     */
    BoxAndWhiskerSeries.prototype.getExclusiveQuartileValue = function (yValues, count, percentile) {
        if (count === 0) {
            return 0;
        }
        else if (count === 1) {
            return yValues[0];
        }
        var value = 0;
        var rank = percentile * (count + 1);
        var integerRank = Math.floor(Math.abs(rank));
        var fractionRank = rank - integerRank;
        if (integerRank === 0) {
            value = yValues[0];
        }
        else if (integerRank > count - 1) {
            value = yValues[count - 1];
        }
        else {
            value = fractionRank * (yValues[integerRank] - yValues[integerRank - 1]) + yValues[integerRank - 1];
        }
        return value;
    };
    /**
     * to find the inclusive quartile values
     * @param yValues
     * @param count
     * @param percentile
     */
    BoxAndWhiskerSeries.prototype.getInclusiveQuartileValue = function (yValues, count, percentile) {
        if (count === 0) {
            return 0;
        }
        else if (count === 1) {
            return yValues[0];
        }
        var value = 0;
        var rank = percentile * (count - 1);
        var integerRank = Math.floor(Math.abs(rank));
        var fractionRank = rank - integerRank;
        value = fractionRank * (yValues[integerRank + 1] - yValues[integerRank]) + yValues[integerRank];
        return value;
    };
    /**
     * To find the quartile values
     * @param yValues
     * @param count
     * @param lowerQuartile
     * @param upperQuartile
     */
    BoxAndWhiskerSeries.prototype.getQuartileValues = function (yValues, count, quartile) {
        if (count === 1) {
            quartile.lowerQuartile = yValues[0];
            quartile.upperQuartile = yValues[0];
            return null;
        }
        var isEvenList = count % 2 === 0;
        var halfLength = count / 2;
        var lowerQuartileArray = yValues.slice(0, halfLength);
        var upperQuartileArray = yValues.slice(isEvenList ? halfLength : halfLength + 1, count);
        quartile.lowerQuartile = getMedian(lowerQuartileArray);
        quartile.upperQuartile = getMedian(upperQuartileArray);
    };
    /**
     * To find the min, max and outlier values
     * @param yValues
     * @param lowerQuartile
     * @param upperQuartile
     * @param minimum
     * @param maximum
     * @param outliers
     */
    BoxAndWhiskerSeries.prototype.getMinMaxOutlier = function (yValues, count, quartile) {
        var interquartile = quartile.upperQuartile - quartile.lowerQuartile;
        var rangeIQR = 1.5 * interquartile;
        for (var i = 0; i < count; i++) {
            if (yValues[i] < quartile.lowerQuartile - rangeIQR) {
                quartile.outliers.push(yValues[i]);
            }
            else {
                quartile.minimum = yValues[i];
                break;
            }
        }
        for (var i = count - 1; i >= 0; i--) {
            if (yValues[i] > quartile.upperQuartile + rangeIQR) {
                quartile.outliers.push(yValues[i]);
            }
            else {
                quartile.maximum = yValues[i];
                break;
            }
        }
    };
    /**
     * Animate the series
     * @param series
     * @private
     */
    BoxAndWhiskerSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * Get module name.
     */
    BoxAndWhiskerSeries.prototype.getModuleName = function () {
        return 'BoxAndWhiskerSeries';
        /**
         * return the module name
         */
    };
    /**
     * To destroy the candle series.
     * @return {void}
     * @private
     */
    BoxAndWhiskerSeries.prototype.destroy = function (chart) {
        /**
         * Destroys the candle series.
         */
    };
    return BoxAndWhiskerSeries;
}(ColumnBase));

/**
 * Chart component exported items
 */

var __extends$49 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * AccumulationChart base file
 */
/**
 * Annotation for accumulation series
 */
var AccumulationAnnotationSettings = /** @class */ (function (_super) {
    __extends$49(AccumulationAnnotationSettings, _super);
    function AccumulationAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$8([
        Property(null)
    ], AccumulationAnnotationSettings.prototype, "content", void 0);
    __decorate$8([
        Property('0')
    ], AccumulationAnnotationSettings.prototype, "x", void 0);
    __decorate$8([
        Property('0')
    ], AccumulationAnnotationSettings.prototype, "y", void 0);
    __decorate$8([
        Property('Pixel')
    ], AccumulationAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate$8([
        Property('Chart')
    ], AccumulationAnnotationSettings.prototype, "region", void 0);
    __decorate$8([
        Property('Middle')
    ], AccumulationAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate$8([
        Property('Center')
    ], AccumulationAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate$8([
        Property(null)
    ], AccumulationAnnotationSettings.prototype, "description", void 0);
    return AccumulationAnnotationSettings;
}(ChildProperty));
/**
 * Configures the dataLabel in accumulation chart.
 */
var AccumulationDataLabelSettings = /** @class */ (function (_super) {
    __extends$49(AccumulationDataLabelSettings, _super);
    function AccumulationDataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$8([
        Property(false)
    ], AccumulationDataLabelSettings.prototype, "visible", void 0);
    __decorate$8([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "name", void 0);
    __decorate$8([
        Property('transparent')
    ], AccumulationDataLabelSettings.prototype, "fill", void 0);
    __decorate$8([
        Property('Inside')
    ], AccumulationDataLabelSettings.prototype, "position", void 0);
    __decorate$8([
        Property(5)
    ], AccumulationDataLabelSettings.prototype, "rx", void 0);
    __decorate$8([
        Property(5)
    ], AccumulationDataLabelSettings.prototype, "ry", void 0);
    __decorate$8([
        Complex({ width: null, color: null }, Border)
    ], AccumulationDataLabelSettings.prototype, "border", void 0);
    __decorate$8([
        Complex({ size: '11px', color: null }, Font)
    ], AccumulationDataLabelSettings.prototype, "font", void 0);
    __decorate$8([
        Complex({}, Connector)
    ], AccumulationDataLabelSettings.prototype, "connectorStyle", void 0);
    __decorate$8([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "template", void 0);
    return AccumulationDataLabelSettings;
}(ChildProperty));
/**
 * Configures the tooltip in accumulation chart.
 */
var AccumulationTooltipSettings = /** @class */ (function (_super) {
    __extends$49(AccumulationTooltipSettings, _super);
    function AccumulationTooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$8([
        Property(false)
    ], AccumulationTooltipSettings.prototype, "enable", void 0);
    __decorate$8([
        Property(true)
    ], AccumulationTooltipSettings.prototype, "enableAnimation", void 0);
    __decorate$8([
        Property(null)
    ], AccumulationTooltipSettings.prototype, "format", void 0);
    __decorate$8([
        Property('#FFFFFF')
    ], AccumulationTooltipSettings.prototype, "fill", void 0);
    __decorate$8([
        Complex({ color: null }, Border)
    ], AccumulationTooltipSettings.prototype, "border", void 0);
    __decorate$8([
        Property(null)
    ], AccumulationTooltipSettings.prototype, "template", void 0);
    __decorate$8([
        Complex(Theme.tooltipLabelFont, Font)
    ], AccumulationTooltipSettings.prototype, "textStyle", void 0);
    return AccumulationTooltipSettings;
}(ChildProperty));
/**
 * Points model for the series.
 * @private
 */
var AccPoints = /** @class */ (function () {
    function AccPoints() {
        this.visible = true;
        this.symbolLocation = null;
        /** @private */
        this.region = null;
        /** @private */
        this.labelRegion = null;
        /** @private */
        this.labelVisible = true;
    }
    return AccPoints;
}());
/**
 *  Configures the series in accumulation chart.
 */
var AccumulationSeries = /** @class */ (function (_super) {
    __extends$49(AccumulationSeries, _super);
    function AccumulationSeries() {
        /**
         * Specifies the dataSource for the series. It can be an array of JSON objects or an instance of DataManager.
         * ```html
         * <div id='Pie'></div>
         * ```
         * ```typescript
         * let dataManager: DataManager = new DataManager({
         *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
         * });
         * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
         * let pie: AccumulationChart = new AccumulationChart({
         * ...
         *     series: [{
         *        dataSource: dataManager,
         *        xName: 'Id',
         *        yName: 'Estimate',
         *        query: query
         *    }],
         * ...
         * });
         * pie.appendTo('#Pie');
         * ```
         * @default ''
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.points = [];
        /** @private */
        _this.sumOfPoints = 0;
        return _this;
    }
    /** @private To refresh the Datamanager for series */
    AccumulationSeries.prototype.refreshDataManager = function (accumulation) {
        var _this = this;
        if (isNullOrUndefined(this.query)) {
            this.dataManagerSuccess({ result: this.dataSource, count: this.dataSource.length }, accumulation);
            return;
        }
        var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, accumulation); });
    };
    /**
     * To get points on dataManager is success
     * @private
     */
    AccumulationSeries.prototype.dataManagerSuccess = function (e, accumulation) {
        var argsData = {
            name: seriesRender, series: this, data: e.result,
        };
        accumulation.trigger(seriesRender, argsData);
        this.resultData = e.result;
        this.getPoints(e.result, accumulation);
        if (++accumulation.seriesCounts === accumulation.visibleSeries.length) {
            accumulation.refreshChart();
        }
    };
    /** @private To find points from result data */
    AccumulationSeries.prototype.getPoints = function (result, accumulation) {
        var length = Object.keys(result).length;
        this.sumOfPoints = 0;
        if (length === 0) {
            return null;
        }
        this.findSumOfPoints(result);
        this.points = [];
        this.sumOfClub = 0;
        var point;
        var colors = this.palettes.length ? this.palettes : getSeriesColor(accumulation.theme);
        var clubValue = stringToNumber(this.groupTo, this.sumOfPoints);
        for (var i = 0; i < length; i++) {
            point = this.setPoints(result, i, colors);
            var currentY = point.y;
            if (!this.isClub(point, clubValue)) {
                if (isNullOrUndefined(point.y)) {
                    point.visible = false;
                }
                this.pushPoints(point, colors);
            }
        }
        this.lastGroupTo = this.groupTo;
        if (this.sumOfClub > 0) {
            var clubPoint = new AccPoints();
            clubPoint.x = 'Others';
            clubPoint.y = this.sumOfClub;
            clubPoint.text = clubPoint.originalText = clubPoint.x + ': ' + this.sumOfClub;
            this.pushPoints(clubPoint, colors);
        }
    };
    /**
     * Method to set point index and color
     */
    AccumulationSeries.prototype.pushPoints = function (point, colors) {
        point.index = this.points.length;
        point.color = point.color || colors[point.index % colors.length];
        this.points.push(point);
    };
    /**
     * Method to find club point
     */
    AccumulationSeries.prototype.isClub = function (point, clubValue) {
        if (Math.abs(point.y) <= clubValue && !isNullOrUndefined(clubValue)) {
            this.sumOfClub += Math.abs(point.y);
            return true;
        }
        return false;
    };
    /**
     * Method to find sum of points in the series
     */
    AccumulationSeries.prototype.findSumOfPoints = function (result) {
        var length = Object.keys(result).length;
        for (var i = 0; i < length; i++) {
            if (!isNullOrUndefined(result[i][this.yName])) {
                this.sumOfPoints += Math.abs(result[i][this.yName]);
            }
        }
    };
    /**
     * Method to set points x, y and text from data source
     */
    AccumulationSeries.prototype.setPoints = function (data, i, colors) {
        var point = new AccPoints();
        point.x = getValue(this.xName, data[i]);
        point.y = getValue(this.yName, data[i]);
        point.text = point.originalText = getValue(this.dataLabel.name || '', data[i]);
        this.setAccEmptyPoint(point, i, data, colors);
        return point;
    };
    /**
     * Method render the series elements for accumulation chart
     * @private
     */
    AccumulationSeries.prototype.renderSeries = function (accumulation) {
        var seriesGroup = accumulation.renderer.createGroup({ id: accumulation.element.id + '_Series_' + this.index });
        this.renderPoints(accumulation, seriesGroup);
        var datalabelGroup;
        if (accumulation.accumulationDataLabelModule && this.dataLabel.visible) {
            datalabelGroup = accumulation.renderer.createGroup({ id: accumulation.element.id + '_datalabel_Series_' + this.index });
            datalabelGroup.style.visibility =
                (this.animation.enable && accumulation.animateSeries && this.type === 'Pie') ? 'hidden' : 'visible';
            this.renderDataLabel(accumulation, datalabelGroup);
        }
        if (this.type === 'Pie') {
            this.findMaxBounds(this.labelBound, this.accumulationBound);
            accumulation.pieSeriesModule.animateSeries(accumulation, this.animation, this, seriesGroup);
        }
        if (accumulation.accumulationLegendModule) {
            this.labelBound.x -= accumulation.explodeDistance;
            this.labelBound.y -= accumulation.explodeDistance;
            this.labelBound.height += (accumulation.explodeDistance - this.labelBound.y);
            this.labelBound.width += (accumulation.explodeDistance - this.labelBound.x);
        }
    };
    /**
     * Method render the points elements for accumulation chart series.
     */
    AccumulationSeries.prototype.renderPoints = function (accumulation, seriesGroup) {
        var pointId = accumulation.element.id + '_Series_' + this.index + '_Point_';
        var option;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var argsData = {
                cancel: false, name: pointRender, series: this, point: point, fill: point.color,
                border: this.isEmpty(point) ? { width: this.emptyPointSettings.border.width, color: this.emptyPointSettings.border.color } :
                    { width: this.border.width, color: this.border.color }
            };
            accumulation.trigger(pointRender, argsData);
            point.color = argsData.fill;
            if (point.visible) {
                option = new PathOption(pointId + point.index, point.color, argsData.border.width || 1, argsData.border.color || point.color, 1, '', '');
                accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].
                    renderPoint(point, this, accumulation, option);
                seriesGroup.appendChild(accumulation.renderer.drawPath(option));
            }
        }
        accumulation.getSeriesElement().appendChild(seriesGroup);
    };
    /**
     * Method render the datalabel elements for accumulation chart.
     */
    AccumulationSeries.prototype.renderDataLabel = function (accumulation, datalabelGroup) {
        accumulation.accumulationDataLabelModule.findAreaRect();
        var element = createElement('div', {
            id: accumulation.element.id + '_Series_0' + '_DataLabelCollections'
        });
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.visible) {
                accumulation.accumulationDataLabelModule.renderDataLabel(point, this.dataLabel, datalabelGroup, this.points, this.index, element);
            }
        }
        if (this.dataLabel.template !== null && element.childElementCount) {
            getElement(accumulation.element.id + '_Secondary_Element').appendChild(element);
        }
        accumulation.getSeriesElement().appendChild(datalabelGroup);
    };
    /**
     * To find maximum bounds for smart legend placing
     * @private
     */
    AccumulationSeries.prototype.findMaxBounds = function (totalbound, bound) {
        totalbound.x = bound.x < totalbound.x ? bound.x : totalbound.x;
        totalbound.y = bound.y < totalbound.y ? bound.y : totalbound.y;
        totalbound.height = (bound.y + bound.height) > totalbound.height ? (bound.y + bound.height) : totalbound.height;
        totalbound.width = (bound.x + bound.width) > totalbound.width ? (bound.x + bound.width) : totalbound.width;
    };
    /**
     * To set empty point value for null points
     * @private
     */
    AccumulationSeries.prototype.setAccEmptyPoint = function (point, i, data, colors) {
        if (!isNullOrUndefined(point.y)) {
            return null;
        }
        point.color = this.emptyPointSettings.fill || point.color;
        switch (this.emptyPointSettings.mode) {
            case 'Zero':
                point.y = 0;
                point.visible = true;
                break;
            case 'Average':
                var previous = data[i - 1] ? (data[i - 1][this.yName] || 0) : 0;
                var next = data[i + 1] ? (data[i + 1][this.yName] || 0) : 0;
                point.y = (Math.abs(previous) + Math.abs(next)) / 2;
                this.sumOfPoints += point.y;
                point.visible = true;
                break;
            case 'Drop':
                point.visible = false;
                break;
        }
    };
    /**
     * To find point is empty
     */
    AccumulationSeries.prototype.isEmpty = function (point) {
        return point.color === this.emptyPointSettings.fill;
    };
    __decorate$8([
        Property('')
    ], AccumulationSeries.prototype, "dataSource", void 0);
    __decorate$8([
        Property()
    ], AccumulationSeries.prototype, "query", void 0);
    __decorate$8([
        Property('')
    ], AccumulationSeries.prototype, "xName", void 0);
    __decorate$8([
        Property('')
    ], AccumulationSeries.prototype, "name", void 0);
    __decorate$8([
        Property('')
    ], AccumulationSeries.prototype, "yName", void 0);
    __decorate$8([
        Property(true)
    ], AccumulationSeries.prototype, "visible", void 0);
    __decorate$8([
        Complex({ color: null, width: 0 }, Border)
    ], AccumulationSeries.prototype, "border", void 0);
    __decorate$8([
        Complex(null, Animation$1)
    ], AccumulationSeries.prototype, "animation", void 0);
    __decorate$8([
        Property('SeriesType')
    ], AccumulationSeries.prototype, "legendShape", void 0);
    __decorate$8([
        Property(null)
    ], AccumulationSeries.prototype, "selectionStyle", void 0);
    __decorate$8([
        Property(null)
    ], AccumulationSeries.prototype, "groupTo", void 0);
    __decorate$8([
        Complex({}, AccumulationDataLabelSettings)
    ], AccumulationSeries.prototype, "dataLabel", void 0);
    __decorate$8([
        Property([])
    ], AccumulationSeries.prototype, "palettes", void 0);
    __decorate$8([
        Property(0)
    ], AccumulationSeries.prototype, "startAngle", void 0);
    __decorate$8([
        Property(360)
    ], AccumulationSeries.prototype, "endAngle", void 0);
    __decorate$8([
        Property('80%')
    ], AccumulationSeries.prototype, "radius", void 0);
    __decorate$8([
        Property('0')
    ], AccumulationSeries.prototype, "innerRadius", void 0);
    __decorate$8([
        Property('Pie')
    ], AccumulationSeries.prototype, "type", void 0);
    __decorate$8([
        Property(true)
    ], AccumulationSeries.prototype, "enableTooltip", void 0);
    __decorate$8([
        Property(false)
    ], AccumulationSeries.prototype, "explode", void 0);
    __decorate$8([
        Property('30%')
    ], AccumulationSeries.prototype, "explodeOffset", void 0);
    __decorate$8([
        Property(false)
    ], AccumulationSeries.prototype, "explodeAll", void 0);
    __decorate$8([
        Property(null)
    ], AccumulationSeries.prototype, "explodeIndex", void 0);
    __decorate$8([
        Complex({ mode: 'Drop' }, EmptyPointSettings)
    ], AccumulationSeries.prototype, "emptyPointSettings", void 0);
    __decorate$8([
        Property(0)
    ], AccumulationSeries.prototype, "gapRatio", void 0);
    __decorate$8([
        Property('80%')
    ], AccumulationSeries.prototype, "width", void 0);
    __decorate$8([
        Property('80%')
    ], AccumulationSeries.prototype, "height", void 0);
    __decorate$8([
        Property('20%')
    ], AccumulationSeries.prototype, "neckWidth", void 0);
    __decorate$8([
        Property('20%')
    ], AccumulationSeries.prototype, "neckHeight", void 0);
    __decorate$8([
        Property('Linear')
    ], AccumulationSeries.prototype, "pyramidMode", void 0);
    return AccumulationSeries;
}(ChildProperty));
/**
 * method to get series from index
 * @private
 */
function getSeriesFromIndex(index, visibleSeries) {
    for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
        var series = visibleSeries_1[_i];
        if (index === series.index) {
            return series;
        }
    }
    return visibleSeries[0];
}
/**
 * method to get point from index
 * @private
 */
function pointByIndex(index, points) {
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        if (point.index === index) {
            return point;
        }
    }
    return null;
}
/**
 * method to find series, point index by element id
 * @private
 */
function indexFinder(id) {
    var ids = ['NaN', 'NaN'];
    if (id.indexOf('_Point_') > -1) {
        ids = id.split('_Series_')[1].split('_Point_');
    }
    else if (id.indexOf('_shape_') > -1) {
        ids = id.split('_shape_');
        ids[0] = '0';
    }
    else if (id.indexOf('_text_') > -1) {
        ids = id.split('_text_');
        ids[0] = '0';
    }
    return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
}

/**
 * Defines the common functionalities of accumulation series
 */
/**
 * Accumulation Base used to do some base calculation for accumulation chart.
 */
var AccumulationBase = /** @class */ (function () {
    /** @private */
    function AccumulationBase(accumulation) {
        this.accumulation = accumulation;
    }
    Object.defineProperty(AccumulationBase.prototype, "center", {
        /**
         * Gets the center of the pie
         * @private
         */
        get: function () {
            return this.pieCenter || (this.accumulation.visibleSeries[0].type === 'Pie' ?
                this.accumulation.pieSeriesModule.center : null);
        },
        /**
         * Sets the center of the pie
         * @private
         */
        set: function (value) {
            this.pieCenter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccumulationBase.prototype, "radius", {
        /**
         * Gets the radius of the pie
         * @private
         */
        get: function () {
            return this.pieRadius !== undefined ? this.pieRadius :
                this.accumulation.pieSeriesModule.radius;
        },
        /**
         * Sets the radius of the pie
         * @private
         */
        set: function (value) {
            this.pieRadius = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccumulationBase.prototype, "labelRadius", {
        /**
         * Gets the label radius of the pie
         * @private
         */
        get: function () {
            return this.pieLabelRadius !== undefined ? this.pieLabelRadius :
                this.accumulation.pieSeriesModule.labelRadius;
        },
        /**
         * Sets the label radius of the pie
         * @private
         */
        set: function (value) {
            this.pieLabelRadius = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks whether the series is circular or not
     * @private
     */
    AccumulationBase.prototype.isCircular = function () {
        return this.accumulation.type === 'Pie';
    };
    /**
     * To get tooltip point from mouse x, y
     * @private
     */
    AccumulationBase.prototype.getTooltipPoint = function (e, accumulation, x, y) {
        var target = e.target;
        target = accumulation.isTouch ? document.elementFromPoint(x, y) : target;
        var id = target.id.split(accumulation.element.id + '_Series_');
        if (id[1]) {
            var seriesIndex = parseInt(id[1].split('_Point_')[0], 10);
            var pointIndex = parseInt(id[1].split('_Point_')[1], 10);
            if (!isNullOrUndefined(seriesIndex) && !isNaN(seriesIndex) && !isNullOrUndefined(pointIndex) && !isNaN(pointIndex)) {
                var series = this.getSeriesFromIndex(seriesIndex, accumulation.visibleSeries);
                if (series.enableTooltip) {
                    accumulation.accumulationTooltipModule.renderTooltip(series.points[pointIndex], series.index);
                }
            }
        }
        else if (accumulation.accumulationTooltipModule && accumulation.accumulationTooltipModule.tooltip && !this.isDataLabel(target)) {
            accumulation.accumulationTooltipModule.tooltip.close();
        }
    };
    /**
     * To find datalabel from target element
     */
    AccumulationBase.prototype.isDataLabel = function (target) {
        if (target.id.indexOf(this.accumulation.element.id + '_datalabel_Series_') > -1) {
            return true;
        }
        return false;
    };
    /**
     * To get series from index
     */
    AccumulationBase.prototype.getSeriesFromIndex = function (index, visibleSeries) {
        return visibleSeries[0];
    };
    /**
     * To process the explode on accumulation chart loading
     * @private
     */
    AccumulationBase.prototype.processExplode = function (event) {
        if (event.target.id.indexOf('_Series_') > -1 || event.target.id.indexOf('_datalabel_') > -1) {
            var pointIndex = indexFinder(event.target.id).point;
            if (isNaN(pointIndex) || (event.target.id.indexOf('_datalabel_') > -1 &&
                this.accumulation.visibleSeries[0].points[pointIndex].labelPosition === 'Outside')) {
                return null;
            }
            this.explodePoints(pointIndex, this.accumulation);
            this.deExplodeAll(pointIndex);
        }
    };
    /**
     * To invoke the explode on accumulation chart loading
     * @private
     */
    AccumulationBase.prototype.invokeExplode = function () {
        if (this.accumulation.visibleSeries[0].explodeAll) {
            for (var _i = 0, _a = this.accumulation.visibleSeries[0].points; _i < _a.length; _i++) {
                var point = _a[_i];
                this.explodePoints(point.index, this.accumulation);
            }
        }
        else if (!isNullOrUndefined(this.accumulation.visibleSeries[0].explodeIndex)) {
            this.explodePoints(this.accumulation.visibleSeries[0].explodeIndex, this.accumulation);
        }
        if (this.accumulation.accumulationSelectionModule && this.accumulation.selectionMode !== 'None' &&
            this.accumulation.accumulationSelectionModule.selectedDataIndexes.length) {
            for (var _b = 0, _c = this.accumulation.accumulationSelectionModule.selectedDataIndexes; _b < _c.length; _b++) {
                var index = _c[_b];
                this.explodePoints(index.point, this.accumulation, true);
                this.deExplodeAll(index.point);
            }
        }
    };
    /**
     * To deExplode all points in the series
     */
    AccumulationBase.prototype.deExplodeAll = function (index) {
        var pointId = this.accumulation.element.id + '_Series_0_Point_';
        var points = this.accumulation.visibleSeries[0].points;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var currentPoint = points_1[_i];
            if (index !== currentPoint.index) {
                this.deExplodeSlice(currentPoint.index, pointId, this.center);
            }
        }
    };
    /**
     * To explode point by index
     * @private
     */
    AccumulationBase.prototype.explodePoints = function (index, chart, explode) {
        if (explode === void 0) { explode = false; }
        var pointId = this.accumulation.element.id + '_Series_0_Point_';
        var translate;
        var points = this.accumulation.visibleSeries[0].points;
        var point = pointByIndex(index, this.accumulation.visibleSeries[0].points);
        if (isNullOrUndefined(point)) {
            return null;
        }
        if (!this.isCircular()) {
            translate = { x: chart.explodeDistance, y: 0 };
        }
        else {
            translate = degreeToLocation(point.midAngle, chart.explodeDistance, this.center);
        }
        if (this.isExplode(pointId + index) || explode) {
            this.explodeSlice(index, translate, pointId, this.center || { x: 0, y: 0 });
        }
        else {
            this.deExplodeSlice(index, pointId, this.center);
        }
    };
    /**
     * To check point is exploded by id
     */
    AccumulationBase.prototype.isExplode = function (id) {
        var element = getElement(id);
        if (element && (element.getAttribute('transform') === 'translate(0, 0)' || element.getAttribute('transform') === null ||
            element.getAttribute('transform') === 'translate(0)')) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * To deExplode the point by index
     */
    AccumulationBase.prototype.deExplodeSlice = function (index, sliceId, center) {
        var position = 'translate(0, 0)';
        this.setTranslate(index, sliceId, position);
    };
    /**
     * To translate the point elements by index and position
     */
    AccumulationBase.prototype.setTranslate = function (index, sliceId, position) {
        this.setElementTransform(sliceId + index, position);
        if (this.accumulation.visibleSeries[0].dataLabel.visible) {
            sliceId = this.accumulation.element.id + '_datalabel_Series_0_';
            this.setElementTransform(sliceId + 'shape_' + index, position);
            this.setElementTransform(sliceId + 'text_' + index, position);
            this.setElementTransform(sliceId + 'connector_' + index, position);
        }
    };
    /**
     * To translate the point element by id and position
     */
    AccumulationBase.prototype.setElementTransform = function (id, position) {
        var element = getElement(id);
        if (element) {
            element.setAttribute('transform', position);
        }
    };
    /**
     * To translate the point elements by index position
     */
    AccumulationBase.prototype.explodeSlice = function (index, translate, sliceId, center) {
        var position = 'translate(' + (translate.x - center.x) + ', ' + (translate.y - center.y) + ')';
        this.setTranslate(index, sliceId, position);
    };
    return AccumulationBase;
}());

var __extends$51 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Accumulation charts base file
 */
/**
 * PieBase class used to do pie base calculations.
 */
var PieBase = /** @class */ (function (_super) {
    __extends$51(PieBase, _super);
    function PieBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * To initialize the property values.
     * @private
     */
    PieBase.prototype.initProperties = function (chart, series) {
        this.accumulation = chart;
        var size = Math.min(chart.initialClipRect.width, chart.initialClipRect.height);
        this.initAngles(series);
        this.radius = stringToNumber(series.radius, size / 2);
        this.innerRadius = stringToNumber(series.innerRadius, this.radius);
        this.labelRadius = series.dataLabel.position === 'Inside' ? (((this.radius - this.innerRadius) / 2) + this.innerRadius) :
            (this.radius + stringToNumber(series.dataLabel.connectorStyle.length || '4%', size / 2));
        chart.explodeDistance = series.explode ? stringToNumber(series.explodeOffset, this.radius) : 0;
        this.findCenter(chart, series);
        this.defaultLabelBound(series, series.dataLabel.visible, series.dataLabel.position);
        this.totalAngle -= 0.001;
    };
    /**
     * To find the center of the accumulation.
     * @private
     */
    PieBase.prototype.findCenter = function (accumulation, series) {
        this.accumulation = accumulation;
        this.center = {
            x: stringToNumber('50%', accumulation.initialClipRect.width) + (accumulation.initialClipRect.x),
            y: stringToNumber('50%', accumulation.initialClipRect.height) + (accumulation.initialClipRect.y)
        };
        var accumulationRect = this.getSeriesBound(series);
        var accumulationRectCenter = new ChartLocation(accumulationRect.x + accumulationRect.width / 2, accumulationRect.y + accumulationRect.height / 2);
        this.center.x += (this.center.x - accumulationRectCenter.x);
        this.center.y += (this.center.y - accumulationRectCenter.y);
        this.accumulation.center = this.center;
    };
    /**
     * To find angles from series.
     */
    PieBase.prototype.initAngles = function (series) {
        this.totalAngle = (series.endAngle - series.startAngle) % 360;
        this.startAngle = series.startAngle - 90;
        this.totalAngle = this.totalAngle <= 0 ? (360 + this.totalAngle) : this.totalAngle;
        this.startAngle = (this.startAngle < 0 ? (this.startAngle + 360) : this.startAngle) % 360;
    };
    /**
     * To calculate data-label bound
     * @private
     */
    PieBase.prototype.defaultLabelBound = function (series, visible, position) {
        var accumulationBound = this.getSeriesBound(series);
        series.accumulationBound = accumulationBound;
        series.labelBound = new Rect(accumulationBound.x, accumulationBound.y, accumulationBound.width + accumulationBound.x, accumulationBound.height + accumulationBound.y);
        if (visible && position === 'Outside') {
            series.labelBound = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        }
    };
    /**
     * To calculate series bound
     * @private
     */
    PieBase.prototype.getSeriesBound = function (series) {
        var rect = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        this.initAngles(series);
        var start = this.startAngle;
        var total = this.totalAngle;
        var end = (this.startAngle + total) % 360;
        end = (end === 0) ? 360 : end;
        series.findMaxBounds(rect, this.getRectFromAngle(start));
        series.findMaxBounds(rect, this.getRectFromAngle(end));
        series.findMaxBounds(rect, new Rect(this.center.x, this.center.y, 0, 0));
        var nextQuandrant = (Math.floor(start / 90) * 90 + 90) % 360;
        var lastQuadrant = (Math.floor(end / 90) * 90) % 360;
        lastQuadrant = (lastQuadrant === 0) ? 360 : lastQuadrant;
        if (total >= 90 || lastQuadrant === nextQuandrant) {
            series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            series.findMaxBounds(rect, this.getRectFromAngle(lastQuadrant));
        }
        if (start === 0 || (start + total >= 360)) {
            series.findMaxBounds(rect, this.getRectFromAngle(0));
        }
        var length = nextQuandrant === lastQuadrant ? 0 : Math.floor(total / 90);
        for (var i = 1; i < length; i++) {
            nextQuandrant = nextQuandrant + 90;
            if ((nextQuandrant < lastQuadrant || end < start) || total === 360) {
                series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            }
        }
        rect.width -= rect.x;
        rect.height -= rect.y;
        return rect;
    };
    /**
     * To get rect location size from angle
     */
    PieBase.prototype.getRectFromAngle = function (angle) {
        var location = degreeToLocation(angle, this.radius, this.center);
        return new Rect(location.x, location.y, 0, 0);
    };
    /**
     * To get path arc direction
     */
    PieBase.prototype.getPathArc = function (center, start, end, radius, innerRadius) {
        var degree = end - start;
        degree = degree < 0 ? (degree + 360) : degree;
        var flag = (degree < 180) ? 0 : 1;
        if (!innerRadius && innerRadius === 0) {
            return this.getPiePath(center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius, flag);
        }
        else {
            return this.getDoughnutPath(center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius, degreeToLocation(start, innerRadius, center), degreeToLocation(end, innerRadius, center), innerRadius, flag);
        }
    };
    /**
     * To get pie direction
     */
    PieBase.prototype.getPiePath = function (center, start, end, radius, clockWise) {
        return 'M ' + center.x + ' ' + center.y + ' L ' + start.x + ' ' + start.y + ' A ' + radius + ' ' +
            radius + ' 0 ' + clockWise + ' 1 ' + end.x + ' ' + end.y + ' Z';
    };
    /**
     * To get doughnut direction
     */
    PieBase.prototype.getDoughnutPath = function (center, start, end, radius, innerStart, innerEnd, innerRadius, clockWise) {
        return 'M ' + start.x + ' ' + start.y + ' A ' + radius + ' ' + radius + ' 0 ' + clockWise +
            ' 1 ' + end.x + ' ' + end.y + ' L ' + innerEnd.x + ' ' + innerEnd.y + ' A ' + innerRadius +
            ' ' + innerRadius + ' 0 ' + clockWise + ',0 ' + innerStart.x + ' ' + innerStart.y + ' Z';
    };
    /**
     * Method to start animation for pie series.
     */
    PieBase.prototype.doAnimation = function (slice, series) {
        var _this = this;
        var startAngle = series.startAngle - 85;
        var value;
        var radius = Math.max(this.accumulation.availableSize.height, this.accumulation.availableSize.width) * 0.75;
        radius += radius * (0.414); // formula r + r / 2 * (1.414 -1)
        var effect = getAnimationFunction('Linear'); // need to check animation type
        new Animation({}).animate(slice, {
            duration: series.animation.duration,
            delay: series.animation.delay,
            progress: function (args) {
                value = effect(args.timeStamp, startAngle, _this.totalAngle, args.duration);
                slice.setAttribute('d', _this.getPathArc(_this.center, startAngle, value, radius, 0));
            },
            end: function (args) {
                slice.setAttribute('d', _this.getPathArc(_this.center, 0, 359.99999, radius, 0));
                _this.accumulation.trigger(animationComplete, { series: series, accumulation: _this.accumulation });
                var datalabelGroup = getElement(_this.accumulation.element.id + '_datalabel_Series_' + series.index);
                datalabelGroup.style.visibility = _this.accumulation.isDestroyed ? 'hidden' : 'visible';
            }
        });
    };
    return PieBase;
}(AccumulationBase));

var __extends$50 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * PieSeries module used to render `Pie` Series.
 */
var PieSeries = /** @class */ (function (_super) {
    __extends$50(PieSeries, _super);
    function PieSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * To get path option, degree, symbolLocation from the point.
     * @private
     */
    PieSeries.prototype.renderPoint = function (point, series, chart, option) {
        var sum$$1 = series.sumOfPoints;
        var degree = ((Math.abs(point.y) / sum$$1) * (this.totalAngle));
        option.d = this.getPathOption(point, degree);
        point.midAngle = (this.startAngle - (degree / 2)) % 360;
        point.endAngle = this.startAngle % 360;
        point.symbolLocation = degreeToLocation(point.midAngle, (this.radius + this.innerRadius) / 2, this.center);
        return option;
    };
    /**
     * To get path option from the point.
     */
    PieSeries.prototype.getPathOption = function (point, degree) {
        var path = this.getPathArc(this.center, this.startAngle % 360, (this.startAngle + degree) % 360, this.radius, this.innerRadius);
        this.startAngle += degree;
        return path;
    };
    /**
     * To animate the pie series.
     * @private
     */
    PieSeries.prototype.animateSeries = function (accumulation, option, series, slice) {
        var groupId = accumulation.element.id + 'SeriesGroup' + series.index;
        if (series.animation.enable && accumulation.animateSeries) {
            var clippath = accumulation.renderer.createClipPath({ id: groupId + '_clipPath' });
            var path = new PathOption(groupId + '_slice', 'transparent', 1, 'transparent', 1, '', '');
            var clipslice = accumulation.renderer.drawPath(path);
            clippath.appendChild(clipslice);
            accumulation.svgObject.appendChild(clippath);
            slice.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
            this.doAnimation(clipslice, series);
        }
    };
    /**
     * To get the module name of the Pie series.
     */
    PieSeries.prototype.getModuleName = function () {
        return 'PieSeries';
    };
    /**
     * To destroy the pie series.
     * @return {void}
     * @private
     */
    PieSeries.prototype.destroy = function (accumulation) {
        /**
         * Destroy method calling here
         */
    };
    return PieSeries;
}(PieBase));

var __extends$48 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * AccumulationChart file
 */
/**
 * Represents the AccumulationChart control.
 * ```html
 * <div id="accumulation"/>
 * <script>
 *   var accObj = new AccumulationChart({ });
 *   accObj.appendTo("#accumulation");
 * </script>
 * ```
 */
var AccumulationChart = /** @class */ (function (_super) {
    __extends$48(AccumulationChart, _super);
    /**
     * Constructor for creating the AccumulationChart widget
     * @private
     */
    function AccumulationChart(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private explode radius internal property */
        _this.explodeDistance = 0;
        return _this;
    }
    Object.defineProperty(AccumulationChart.prototype, "type", {
        /** @private */
        get: function () {
            if (this.series && this.series.length) {
                return this.series[0].type;
            }
            return 'Pie';
        },
        enumerable: true,
        configurable: true
    });
    // accumulation chart methods
    /**
     *  To create svg object, renderer and binding events for the container.
     */
    AccumulationChart.prototype.preRender = function () {
        this.unWireEvents();
        this.setCulture();
        this.animateSeries = true;
        calculateSize(this);
        this.wireEvents();
    };
    /**
     * To render the accumulation chart elements
     */
    AccumulationChart.prototype.render = function () {
        this.trigger(load, { accumulation: this });
        this.accBaseModule = new AccumulationBase(this);
        this.pieSeriesModule = new PieSeries(this);
        this.calculateVisibleSeries();
        this.processData();
    };
    /**
     * Method to unbind events for accumulation chart
     */
    AccumulationChart.prototype.unWireEvents = function () {
        /*! Find the Events type */
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var move = Browser.touchMoveEvent;
        var stop = Browser.touchEndEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */
        EventHandler.remove(this.element, move, this.accumulationMouseMove);
        EventHandler.remove(this.element, stop, this.accumulationMouseEnd);
        EventHandler.remove(this.element, start, this.accumulationMouseStart);
        EventHandler.remove(this.element, 'click', this.accumulationOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.accumulationRightClick);
        EventHandler.remove(this.element, cancel, this.accumulationMouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.accumulationResize);
    };
    /**
     * Method to bind events for the accumulation chart
     */
    AccumulationChart.prototype.wireEvents = function () {
        /*! Find the Events type */
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var stop = Browser.touchEndEvent;
        var move = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        /*! Bind the Event handler */
        EventHandler.add(this.element, move, this.accumulationMouseMove, this);
        EventHandler.add(this.element, stop, this.accumulationMouseEnd, this);
        EventHandler.add(this.element, start, this.accumulationMouseStart, this);
        EventHandler.add(this.element, 'click', this.accumulationOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.accumulationRightClick, this);
        EventHandler.add(this.element, cancel, this.accumulationMouseLeave, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.accumulationResize.bind(this));
        new Touch(this.element); // To avoid geasture blocking for browser
        /*! Apply the style for chart */
        this.setStyle(this.element);
    };
    /**
     * Method to set mouse x, y from events
     */
    AccumulationChart.prototype.setMouseXY = function (e) {
        var pageX;
        var pageY;
        if (e.type.indexOf('touch') > -1) {
            this.isTouch = true;
            var touchArg = e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.mouseY = pageY;
        this.mouseX = pageX;
    };
    /**
     * Handles the mouse end.
     * @return {boolean}
     * @private
     */
    AccumulationChart.prototype.accumulationMouseEnd = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseUp, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            if (this.accumulationTooltipModule && this.accumulationTooltipModule.tooltip) {
                this.accBaseModule.getTooltipPoint(e, this, this.mouseX, this.mouseY);
                this.accumulationTooltipModule.fadeOutTooltip();
            }
            if (this.accumulationDataLabelModule && this.visibleSeries[0].dataLabel.visible) {
                this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY, this.isTouch);
            }
            if (this.accumulationLegendModule && this.legendSettings.visible) {
                this.accumulationLegendModule.move(e);
            }
        }
        return false;
    };
    /**
     * To find mouse x, y for aligned chart element svg position
     * @private
     */
    AccumulationChart.prototype.removeSvgOffset = function (x, y) {
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        return { x: (x - rect.left) - Math.max(svgRect.left - rect.left, 0), y: (y - rect.top) - Math.max(svgRect.top - rect.top, 0) };
    };
    /**
     * Handles the mouse start.
     * @return {boolean}
     * @private
     */
    AccumulationChart.prototype.accumulationMouseStart = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseDown, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        return false;
    };
    /**
     * Handles the accumulation chart resize.
     * @return {boolean}
     * @private
     */
    AccumulationChart.prototype.accumulationResize = function (e) {
        var _this = this;
        var args = {
            accumulation: this,
            previousSize: new Size(this.availableSize.width, this.availableSize.height),
            name: resized,
            currentSize: new Size(0, 0)
        };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(function () {
            if (_this.isDestroyed) {
                clearTimeout(_this.resizeTo);
                return;
            }
            calculateSize(_this);
            args.currentSize = _this.availableSize;
            _this.trigger(resized, args);
            _this.refreshSeries();
            _this.refreshChart();
        }, 500);
        return false;
    };
    /**
     * Handles the export method for chart control.
     */
    AccumulationChart.prototype.export = function (type, fileName) {
        var exportChart = new ExportUtils(this);
        exportChart.export(type, fileName);
    };
    /**
     * Handles the print method for accumulation chart control.
     */
    AccumulationChart.prototype.print = function (id) {
        var exportChart = new ExportUtils(this);
        exportChart.print(id);
    };
    /**
     * Applying styles for accumulation chart element
     */
    AccumulationChart.prototype.setStyle = function (element) {
        element.style.touchAction = 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
    };
    /**
     * Handles the mouse move on accumulation chart.
     * @return {boolean}
     * @private
     */
    AccumulationChart.prototype.accumulationMouseMove = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseMove, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.move(e);
        }
        if (this.accumulationDataLabelModule && this.visibleSeries[0] && this.visibleSeries[0].dataLabel.visible) {
            this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY);
        }
        if (this.accumulationTooltipModule && this.accBaseModule && this.tooltip.enable && !this.isTouch) {
            this.accBaseModule.getTooltipPoint(e, this, this.mouseX, this.mouseY);
        }
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
        }
        return false;
    };
    AccumulationChart.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((event.target.textContent.indexOf('...') > -1) && (targetId === (this.element.id + '_title'))) {
            showTooltip(this.title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    /**
     * Handles the mouse click on accumulation chart.
     * @return {boolean}
     * @private
     */
    AccumulationChart.prototype.accumulationOnMouseClick = function (e) {
        this.setMouseXY(e);
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.click(e);
        }
        if (this.selectionMode !== 'None' && this.accumulationSelectionModule) {
            this.accumulationSelectionModule.calculateSelectedElements(this, e);
        }
        if (this.visibleSeries[0].explode) {
            this.accBaseModule.processExplode(e);
        }
        this.trigger(chartMouseClick, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        return false;
    };
    /**
     * Handles the mouse right click on accumulation chart.
     * @return {boolean}
     * @private
     */
    AccumulationChart.prototype.accumulationRightClick = function (event) {
        if (event.buttons === 2 || event.pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    };
    /**
     * Handles the mouse leave on accumulation chart.
     * @return {boolean}
     * @private
     */
    AccumulationChart.prototype.accumulationMouseLeave = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseLeave, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.accumulationTooltipModule && this.tooltip.enable) {
            this.accumulationTooltipModule.tooltip.close();
        }
        return false;
    };
    /**
     * Method to set culture for chart
     */
    AccumulationChart.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    /**
     * Method to create SVG element for accumulation chart.
     */
    AccumulationChart.prototype.createPieSvg = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * To Remove the SVG from accumulation chart.
     * @return {boolean}
     * @private
     */
    AccumulationChart.prototype.removeSvg = function () {
        removeElement(this.element.id + '_Secondary_Element');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        removeElement('EJ2_legend_tooltip');
        removeElement('EJ2_datalabel_tooltip');
    };
    /**
     * Method to create the secondary element for tooltip, datalabel and annotaitons.
     */
    AccumulationChart.prototype.createSecondaryElement = function () {
        this.element.appendChild(createElement('div', {
            id: this.element.id + '_Secondary_Element',
            styles: 'position: relative'
        }));
    };
    /**
     * Method to find visible series based on series types
     */
    AccumulationChart.prototype.calculateVisibleSeries = function () {
        this.visibleSeries = [];
        for (var i = 0, length_1 = this.series.length; i < length_1; i++) {
            this.series[i].index = i;
            if (this.series[i].type === this.type && this.visibleSeries.length === 0) {
                this.visibleSeries.push(this.series[i]);
                break;
            }
        }
    };
    /**
     * To find points from dataSource
     */
    AccumulationChart.prototype.processData = function () {
        this.seriesCounts = 0;
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            series.dataModule = new Data(series.dataSource, series.query);
            series.refreshDataManager(this);
        }
    };
    /**
     * To refresh the accumulation chart
     * @private
     */
    AccumulationChart.prototype.refreshChart = function () {
        this.doGrouppingProcess();
        this.createPieSvg();
        this.calculateBounds();
        this.renderElements();
    };
    /**
     * Method to find groupped points
     */
    AccumulationChart.prototype.doGrouppingProcess = function () {
        var series = this.visibleSeries[0];
        if (!isNullOrUndefined(series.resultData) && ((!isNullOrUndefined(series.lastGroupTo) &&
            series.lastGroupTo !== series.groupTo))) {
            series.getPoints(series.resultData, this);
        }
    };
    /**
     * Method to calculate bounds for accumulation chart
     */
    AccumulationChart.prototype.calculateBounds = function () {
        this.initialClipRect = new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height);
        subtractRect(this.initialClipRect, new Rect(0, measureText(this.title, this.titleStyle).height, this.margin.right + this.margin.left, this.margin.bottom + this.margin.top));
        this.calculateLegendBounds();
    };
    /*
     * Method to calculate legend bounds for accumulation chart
     */
    AccumulationChart.prototype.calculateLegendBounds = function () {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        this.accumulationLegendModule.getLegendOptions(this, this.visibleSeries);
        this.accumulationLegendModule.calculateLegendBounds(this.initialClipRect, this.availableSize);
    };
    /**
     * To render elements for accumulation chart
     * @private
     */
    AccumulationChart.prototype.renderElements = function () {
        this.renderBorder();
        this.renderTitle();
        this.createSecondaryElement();
        this.renderSeries();
        this.renderLegend();
        this.element.appendChild(this.svgObject);
        this.processSelection();
        this.processExplode();
        this.renderAnnotation();
        this.setSecondaryElementPosition();
        this.trigger('loaded', { accumulation: this });
        this.animateSeries = false;
    };
    /**
     * To set the left and top position for data label template for center aligned chart
     */
    AccumulationChart.prototype.setSecondaryElementPosition = function () {
        var tooltipParent = getElement(this.element.id + '_Secondary_Element');
        if (!tooltipParent) {
            return;
        }
        var targetElement = createElement('div', {
            id: this.element.id + '_pie_tooltip',
            styles: 'position: absolute;background: transparent;height: 2px;width: 2px;'
        });
        tooltipParent.appendChild(targetElement);
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        tooltipParent.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
        tooltipParent.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
    };
    /**
     * To render the annotaitions for accumulation series.
     */
    AccumulationChart.prototype.renderAnnotation = function () {
        if (this.annotationModule) {
            this.annotationModule.renderAnnotations(getElement(this.element.id + '_Secondary_Element'));
        }
    };
    /**
     * Method to process the explode in accumulation chart
     */
    AccumulationChart.prototype.processExplode = function () {
        if (!this.visibleSeries[0].explode) {
            return null;
        }
        this.accBaseModule.invokeExplode();
    };
    /**
     * Method to render series for accumulation chart
     */
    AccumulationChart.prototype.renderSeries = function () {
        this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_SeriesCollection' }));
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.visible && this[(firstToLowerCase(series.type) + 'SeriesModule')]) {
                this[(firstToLowerCase(series.type) + 'SeriesModule')].initProperties(this, series);
                series.renderSeries(this);
            }
        }
    };
    /**
     * Method to render border for accumulation chart
     */
    AccumulationChart.prototype.renderBorder = function () {
        var padding = this.border.width;
        this.svgObject.appendChild(this.renderer.drawRectangle(new RectOption(this.element.id + '_border', this.background, this.border, 1, new Rect(padding / 2, padding / 2, this.availableSize.width - padding, this.availableSize.height - padding))));
    };
    /**
     * Method to render legend for accumulation chart
     */
    AccumulationChart.prototype.renderLegend = function () {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        if (this.accumulationLegendModule.legendCollections.length) {
            if (this.visibleSeries[0].type === 'Pie') {
                this.accumulationLegendModule.getSmartLegendLocation(this.visibleSeries[0].labelBound, this.accumulationLegendModule.legendBounds, this.margin);
            }
            this.accumulationLegendModule.renderLegend(this, this.legendSettings, this.accumulationLegendModule.legendBounds);
        }
    };
    /**
     * To process the selection in accumulation chart
     */
    AccumulationChart.prototype.processSelection = function () {
        if (!this.accumulationSelectionModule || this.selectionMode === 'None') {
            return null;
        }
        var selectedDataIndexes = extend([], this.accumulationSelectionModule.selectedDataIndexes, null, true);
        this.accumulationSelectionModule.invokeSelection(this);
        if (selectedDataIndexes.length > 0) {
            this.accumulationSelectionModule.selectedDataIndexes = selectedDataIndexes;
            this.accumulationSelectionModule.redrawSelection(this, this.selectionMode);
        }
    };
    /**
     * To render title for accumulation chart
     */
    AccumulationChart.prototype.renderTitle = function () {
        if (!this.title) {
            return null;
        }
        var maxTitleSize = this.availableSize.width - this.margin.left - this.margin.right;
        var trimmedTitle = textTrim(maxTitleSize, this.title, this.titleStyle);
        var elementSize = measureText(trimmedTitle, this.titleStyle);
        textElement(new TextOption(this.element.id + '_title', titlePositionX(this.availableSize, this.margin.left, this.margin.left, this.titleStyle, elementSize), this.margin.top + (elementSize.height * 3 / 4), 'start', trimmedTitle, '', 'auto'), this.titleStyle, this.titleStyle.color, this.svgObject);
    };
    /**
     * To get the series parent element
     * @private
     */
    AccumulationChart.prototype.getSeriesElement = function () {
        return this.svgObject.getElementsByTagName('g')[0];
    };
    /**
     * To refresh the all visible series points
     * @private
     */
    AccumulationChart.prototype.refreshSeries = function () {
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            this.refreshPoints(series.points);
        }
    };
    /**
     * To refresh points label region and visible
     * @private
     */
    AccumulationChart.prototype.refreshPoints = function (points) {
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            point.labelPosition = null;
            point.labelRegion = null;
            point.labelVisible = true;
        }
    };
    /**
     * To get Module name
     *  @private
     */
    AccumulationChart.prototype.getModuleName = function () {
        return 'accumulationchart';
    };
    /**
     * To destroy the accumulationcharts
     * @private
     */
    AccumulationChart.prototype.destroy = function () {
        this.unWireEvents();
        _super.prototype.destroy.call(this);
        this.element.classList.remove('e-accumulationchart');
    };
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}
     * @private
     */
    AccumulationChart.prototype.requiredModules = function () {
        var modules = [];
        var enableAnnotation = false;
        modules.push({
            member: this.type + 'Series',
            args: [this]
        });
        if (this.legendSettings.visible) {
            modules.push({
                member: 'AccumulationLegend',
                args: [this]
            });
        }
        if (this.findDatalabelVisibility()) {
            modules.push({
                member: 'AccumulationDataLabel',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'AccumulationTooltip',
                args: [this]
            });
        }
        if (this.selectionMode !== 'None') {
            modules.push({
                member: 'AccumulationSelection',
                args: [this]
            });
        }
        enableAnnotation = this.annotations.some(function (value) {
            return (value.content !== null);
        });
        if (enableAnnotation) {
            modules.push({
                member: 'Annotation',
                args: [this, this.annotations]
            });
        }
        return modules;
    };
    /**
     * To find datalabel visibility in series
     */
    AccumulationChart.prototype.findDatalabelVisibility = function () {
        for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.dataLabel.visible) {
                return true;
            }
        }
        return false;
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    AccumulationChart.prototype.getPersistData = function () {
        return '';
    };
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    AccumulationChart.prototype.onPropertyChanged = function (newProp, oldProp) {
        var update = {
            refreshElements: false, refreshBounds: false
        };
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'theme':
                    this.animateSeries = true;
                    break;
                case 'title':
                    if (newProp.title === '' || oldProp.title === '') {
                        update.refreshBounds = true;
                    }
                    else {
                        update.refreshElements = true;
                    }
                    break;
                case 'height':
                case 'width':
                case 'margin':
                    update.refreshBounds = true;
                    break;
                case 'titleStyle':
                    if (newProp.titleStyle && newProp.titleStyle.size) {
                        update.refreshBounds = true;
                    }
                    else {
                        update.refreshElements = true;
                    }
                    break;
                case 'legendSettings':
                    update.refreshBounds = true;
                    update.refreshElements = true;
                    break;
                case 'background':
                case 'border':
                case 'annotations':
                case 'enableSmartLabels':
                    update.refreshElements = true;
                    break;
                case 'isMultiSelect':
                case 'selectedDataIndexes':
                case 'selectionMode':
                    if (this.accumulationSelectionModule) {
                        if (isNullOrUndefined(this.accumulationSelectionModule.selectedDataIndexes)) {
                            this.accumulationSelectionModule.invokeSelection(this);
                        }
                        else {
                            this.accumulationSelectionModule.redrawSelection(this, oldProp.selectionMode);
                        }
                    }
                    break;
            }
        }
        if (!update.refreshBounds && update.refreshElements) {
            this.createPieSvg();
            this.renderElements();
        }
        else if (update.refreshBounds) {
            this.refreshSeries();
            this.createPieSvg();
            this.calculateBounds();
            this.renderElements();
        }
    };
    __decorate$7([
        Property(null)
    ], AccumulationChart.prototype, "width", void 0);
    __decorate$7([
        Property(null)
    ], AccumulationChart.prototype, "height", void 0);
    __decorate$7([
        Property(null)
    ], AccumulationChart.prototype, "title", void 0);
    __decorate$7([
        Complex(Theme.chartTitleFont, Font)
    ], AccumulationChart.prototype, "titleStyle", void 0);
    __decorate$7([
        Complex({}, LegendSettings)
    ], AccumulationChart.prototype, "legendSettings", void 0);
    __decorate$7([
        Complex({}, AccumulationTooltipSettings)
    ], AccumulationChart.prototype, "tooltip", void 0);
    __decorate$7([
        Property('None')
    ], AccumulationChart.prototype, "selectionMode", void 0);
    __decorate$7([
        Property(false)
    ], AccumulationChart.prototype, "isMultiSelect", void 0);
    __decorate$7([
        Collection([], Indexes)
    ], AccumulationChart.prototype, "selectedDataIndexes", void 0);
    __decorate$7([
        Complex({}, Margin)
    ], AccumulationChart.prototype, "margin", void 0);
    __decorate$7([
        Property(true)
    ], AccumulationChart.prototype, "enableSmartLabels", void 0);
    __decorate$7([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], AccumulationChart.prototype, "border", void 0);
    __decorate$7([
        Property(Theme.chartBackgroundColor)
    ], AccumulationChart.prototype, "background", void 0);
    __decorate$7([
        Collection([{}], AccumulationSeries)
    ], AccumulationChart.prototype, "series", void 0);
    __decorate$7([
        Collection([{}], AccumulationAnnotationSettings)
    ], AccumulationChart.prototype, "annotations", void 0);
    __decorate$7([
        Property('Material')
    ], AccumulationChart.prototype, "theme", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "loaded", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "load", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "seriesRender", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "legendRender", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "textRender", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "tooltipRender", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "pointRender", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "annotationRender", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "beforePrint", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "chartMouseMove", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "chartMouseClick", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "animationComplete", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "chartMouseDown", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "chartMouseLeave", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "chartMouseUp", void 0);
    __decorate$7([
        Event()
    ], AccumulationChart.prototype, "resized", void 0);
    AccumulationChart = __decorate$7([
        NotifyPropertyChanges
    ], AccumulationChart);
    return AccumulationChart;
}(Component));

/**
 * Defines the common behavior of funnel and pyramid series
 */
var __extends$53 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * TriangularBase is used to calculate base functions for funnel/pyramid series.
 */
var TriangularBase = /** @class */ (function (_super) {
    __extends$53(TriangularBase, _super);
    function TriangularBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Initializes the properties of funnel/pyramid series
     * @private
     */
    TriangularBase.prototype.initProperties = function (chart, series) {
        var actualChartArea = chart.initialClipRect;
        series.triangleSize = new Size(stringToNumber(series.width, actualChartArea.width), stringToNumber(series.height, actualChartArea.height));
        series.neckSize = new Size(stringToNumber(series.neckWidth, actualChartArea.width), stringToNumber(series.neckHeight, actualChartArea.height));
        this.defaultLabelBound(series, series.dataLabel.visible, series.dataLabel.position, chart);
        if (series.explodeOffset === '30%') {
            series.explodeOffset = '25px';
        }
        chart.explodeDistance = stringToNumber(series.explodeOffset, actualChartArea.width);
        var points = series.points;
        this.initializeSizeRatio(points, series);
    };
    /**
     * Initializes the size of the pyramid/funnel segments
     * @private
     */
    TriangularBase.prototype.initializeSizeRatio = function (points, series, reverse) {
        if (reverse === void 0) { reverse = false; }
        var sumOfPoints = series.sumOfPoints;
        //Limiting the ratio within the range of 0 to 1
        var gapRatio = Math.min(Math.max(series.gapRatio, 0), 1);
        //% equivalence of a value 1
        var coEff = 1 / (sumOfPoints * (1 + gapRatio / (1 - gapRatio)));
        var spacing = gapRatio / (points.length - 1);
        var y = 0;
        //starting from bottom
        for (var i = points.length - 1; i >= 0; i--) {
            var index = reverse ? points.length - 1 - i : i;
            if (points[index].visible) {
                var height = coEff * points[index].y;
                points[index].yRatio = y;
                points[index].heightRatio = height;
                y += height + spacing;
            }
        }
    };
    /**
     * Marks the label location from the set of points that forms a pyramid/funnel segment
     * @private
     */
    TriangularBase.prototype.setLabelLocation = function (series, point, points) {
        var last = points.length - 1;
        var bottom = series.type === 'Funnel' ? points.length - 2 : points.length - 1;
        var x = (points[0].x + points[bottom].x) / 2;
        var right = (points[1].x + points[bottom - 1].x) / 2;
        point.region = new Rect(x, points[0].y, right - x, points[bottom].y - points[0].y);
        point.symbolLocation = {
            x: point.region.x + point.region.width / 2,
            y: point.region.y + point.region.height / 2
        };
        point.labelOffset = {
            x: point.symbolLocation.x - (points[0].x + points[last].x) / 2,
            y: point.symbolLocation.y - (points[0].y + points[last].y) / 2
        };
    };
    /**
     * Finds the path to connect the list of points
     * @private
     */
    TriangularBase.prototype.findPath = function (locations) {
        var path = 'M';
        for (var i = 0; i < locations.length; i++) {
            path += locations[i].x + ' ' + locations[i].y;
            if (i !== locations.length - 1) {
                path += ' L';
            }
        }
        return path;
    };
    /**
     * To calculate data-label bounds
     * @private
     */
    TriangularBase.prototype.defaultLabelBound = function (series, visible, position, chart) {
        var x = (chart.initialClipRect.width - series.triangleSize.width) / 2;
        var y = (chart.initialClipRect.height - series.triangleSize.height) / 2;
        var accumulationBound = new Rect(x, y, series.triangleSize.width, series.triangleSize.height);
        series.labelBound = new Rect(accumulationBound.x, accumulationBound.y, accumulationBound.width + accumulationBound.x, accumulationBound.height + accumulationBound.y);
        series.accumulationBound = accumulationBound;
        if (visible && position === 'Outside') {
            series.labelBound = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        }
    };
    return TriangularBase;
}(AccumulationBase));

/**
 * Defines the behavior of a funnel series
 */
var __extends$52 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * FunnelSeries module used to render `Funnel` Series.
 */
var FunnelSeries = /** @class */ (function (_super) {
    __extends$52(FunnelSeries, _super);
    function FunnelSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the path of a funnel segment
     */
    FunnelSeries.prototype.getSegmentData = function (point, series, chart) {
        var lineWidth;
        var topRadius;
        var bottomRadius;
        var endTop;
        var endBottom;
        var minRadius;
        var endMin;
        var bottomY;
        var area = series.triangleSize;
        var offset = 0;
        var extraSpace = (chart.initialClipRect.width - series.triangleSize.width) / 2;
        var emptySpaceAtLeft = extraSpace + chart.initialClipRect.x;
        var seriesTop = chart.initialClipRect.y + (chart.initialClipRect.height - area.height) / 2;
        //defines the top and bottom of a segment
        var top = point.yRatio * area.height;
        var bottom = top + point.heightRatio * area.height;
        var neckSize = series.neckSize;
        lineWidth = neckSize.width + (area.width - neckSize.width) * ((area.height - neckSize.height - top) /
            (area.height - neckSize.height));
        topRadius = (area.width / 2) - lineWidth / 2;
        //Calculating the middle slope change and bottom
        endTop = topRadius + lineWidth;
        if (bottom > area.height - neckSize.height || area.height === neckSize.height) {
            lineWidth = neckSize.width;
        }
        else {
            lineWidth = neckSize.width + (area.width - neckSize.width) *
                ((area.height - neckSize.height - bottom) / (area.height - neckSize.height));
        }
        bottomRadius = (area.width / 2) - (lineWidth / 2);
        endBottom = bottomRadius + lineWidth;
        if (top >= area.height - neckSize.height) {
            topRadius = bottomRadius = minRadius = (area.width / 2) - neckSize.width / 2;
            endTop = endBottom = endMin = (area.width / 2) + neckSize.width / 2;
        }
        else if (bottom > (area.height - neckSize.height)) {
            minRadius = bottomRadius = (area.width / 2) - lineWidth / 2;
            endMin = endBottom = minRadius + lineWidth;
            bottomY = area.height - neckSize.height;
        }
        top += seriesTop;
        bottom += seriesTop;
        bottomY += seriesTop;
        var line1 = { x: emptySpaceAtLeft + offset + topRadius, y: top };
        var line2 = { x: emptySpaceAtLeft + offset + endTop, y: top };
        var line4 = { x: emptySpaceAtLeft + offset + endBottom, y: bottom };
        var line5 = { x: emptySpaceAtLeft + offset + bottomRadius, y: bottom };
        var line3 = { x: emptySpaceAtLeft + offset + endBottom, y: bottom };
        var line6 = { x: emptySpaceAtLeft + offset + bottomRadius, y: bottom };
        if (bottomY) {
            line3 = { x: emptySpaceAtLeft + offset + endMin, y: bottomY };
            line6 = { x: emptySpaceAtLeft + offset + minRadius, y: bottomY };
        }
        var polygon = [line1, line2, line3, line4, line5, line6];
        this.setLabelLocation(series, point, polygon);
        var direction = this.findPath(polygon);
        return direction;
    };
    /**
     * Renders a funnel segment
     * @private
     */
    FunnelSeries.prototype.renderPoint = function (point, series, chart, options) {
        var direction = this.getSegmentData(point, series, chart);
        point.midAngle = 0;
        options.d = direction;
    };
    /**
     * To get the module name of the funnel series.
     */
    FunnelSeries.prototype.getModuleName = function () {
        return 'FunnelSeries';
    };
    /**
     * To destroy the funnel series.
     * @return {void}
     * @private
     */
    FunnelSeries.prototype.destroy = function (accumulation) {
        /**
         * Destroys the funnel series
         */
    };
    return FunnelSeries;
}(TriangularBase));

/**
 * Defines the behavior of a pyramid series
 */
var __extends$54 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * PyramidSeries module used to render `Pyramid` Series.
 */
var PyramidSeries = /** @class */ (function (_super) {
    __extends$54(PyramidSeries, _super);
    function PyramidSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Defines the path of a pyramid segment
     */
    PyramidSeries.prototype.getSegmentData = function (point, series, chart) {
        var area = series.triangleSize;
        //top of th series
        var seriesTop = chart.initialClipRect.y + (chart.initialClipRect.height - area.height) / 2;
        var offset = 0;
        var extraSpace = (chart.initialClipRect.width - series.triangleSize.width) / 2;
        var emptySpaceAtLeft = extraSpace + chart.initialClipRect.x;
        //top and bottom
        var top = point.yRatio;
        var bottom = point.yRatio + point.heightRatio;
        //width of the top and bottom edge
        var topRadius = 0.5 * (1 - point.yRatio);
        var bottomRadius = 0.5 * (1 - bottom);
        top += seriesTop / area.height;
        bottom += seriesTop / area.height;
        var line1 = {
            x: emptySpaceAtLeft + offset + topRadius * area.width,
            y: top * area.height
        };
        var line2 = {
            x: emptySpaceAtLeft + offset + (1 - topRadius) * area.width,
            y: top * area.height
        };
        var line3 = {
            x: emptySpaceAtLeft + offset + (1 - bottomRadius) * area.width,
            y: bottom * area.height
        };
        var line4 = {
            x: emptySpaceAtLeft + offset + bottomRadius * area.width,
            y: bottom * area.height
        };
        var polygon = [line1, line2, line3, line4];
        this.setLabelLocation(series, point, polygon);
        var direction = this.findPath(polygon);
        return direction;
    };
    /**
     * Initializes the size of the pyramid segments
     * @private
     */
    PyramidSeries.prototype.initializeSizeRatio = function (points, series) {
        if (series.pyramidMode === 'Linear') {
            _super.prototype.initializeSizeRatio.call(this, points, series, true);
        }
        else {
            this.calculateSurfaceSegments(series);
        }
    };
    /**
     * Defines the size of the pyramid segments, the surface of that will reflect the values
     */
    PyramidSeries.prototype.calculateSurfaceSegments = function (series) {
        var count = series.points.length;
        var sumOfValues = series.sumOfPoints;
        var y = [];
        var height = [];
        var gapRatio = Math.min(0, Math.max(series.gapRatio, 1));
        var gapHeight = gapRatio / (count - 1);
        var preSum = this.getSurfaceHeight(0, sumOfValues);
        var currY = 0;
        for (var i = 0; i < count; i++) {
            if (series.points[i].visible) {
                y[i] = currY;
                height[i] = this.getSurfaceHeight(currY, Math.abs(series.points[i].y));
                currY += height[i] + gapHeight * preSum;
            }
        }
        var coef = 1 / (currY - gapHeight * preSum);
        for (var i = 0; i < count; i++) {
            if (series.points[i].visible) {
                series.points[i].yRatio = coef * y[i];
                series.points[i].heightRatio = coef * height[i];
            }
        }
    };
    /**
     * Finds the height of pyramid segment
     */
    PyramidSeries.prototype.getSurfaceHeight = function (y, surface) {
        var result = this.solveQuadraticEquation(1, 2 * y, -surface);
        return result;
    };
    /**
     * Solves quadratic equation
     */
    PyramidSeries.prototype.solveQuadraticEquation = function (a, b, c) {
        var root1;
        var root2;
        var d = b * b - 4 * a * c;
        if (d >= 0) {
            var sd = Math.sqrt(d);
            root1 = (-b - sd) / (2 * a);
            root2 = (-b + sd) / (2 * a);
            return Math.max(root1, root2);
        }
        return 0;
    };
    /**
     * Renders a pyramid segment
     */
    PyramidSeries.prototype.renderPoint = function (point, series, chart, options) {
        var direction = this.getSegmentData(point, series, chart);
        point.midAngle = 0;
        options.d = direction;
    };
    /**
     * To get the module name of the Pyramid series.
     */
    PyramidSeries.prototype.getModuleName = function () {
        return 'PyramidSeries';
    };
    /**
     * To destroy the pyramid series
     * @return {void}
     * @private
     */
    PyramidSeries.prototype.destroy = function (accumulation) {
        /**
         * Destroys the pyramid series
         */
    };
    return PyramidSeries;
}(TriangularBase));

var __extends$55 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * AccumulationChart legend
 */
/**
 * AccumulationLegend module used to render `Legend` for Accumulation chart.
 */
var AccumulationLegend = /** @class */ (function (_super) {
    __extends$55(AccumulationLegend, _super);
    /**
     * Constructor for Accumulation Legend.
     * @param chart
     */
    function AccumulationLegend(chart) {
        var _this = _super.call(this, chart) || this;
        _this.library = _this;
        _this.titleRect = new Rect(0, chart.margin.top, 0, 0);
        return _this;
    }
    /**
     * Get the legend options.
     * @return {void}
     * @private
     */
    AccumulationLegend.prototype.getLegendOptions = function (chart, series) {
        this.legendCollections = [];
        for (var i = 0; i < 1; i++) {
            var seriesType = series[i].type;
            if (seriesType === 'Pie' || seriesType === 'Doughnut') {
                seriesType = (series[i].innerRadius !== '0' && series[i].innerRadius !== '0%') ?
                    'Doughnut' : 'Pie';
            }
            for (var _i = 0, _a = series[i].points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!isNullOrUndefined(point.x) && !isNullOrUndefined(point.y)) {
                    this.legendCollections.push(new LegendOptions(point.x.toString(), point.color, series[i].legendShape, point.visible, seriesType, null, null, point.index, series[i].index));
                }
            }
        }
    };
    /**
     * To find legend bounds for accumulation chart.
     * @private
     */
    AccumulationLegend.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
        var extraWidth = 0;
        var extraHeight = 0;
        var padding = legend.padding;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        }
        else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBounds.width += extraWidth;
        legendBounds.height += extraHeight;
        var shapePadding = legend.shapePadding;
        var maximumWidth = 0;
        var shapeWidth = legend.shapeWidth;
        var rowWidth = 0;
        var rowCount = 0;
        var columnWidth = [];
        var columnHeight = 0;
        var legendWidth = 0;
        this.maxItemHeight = Math.max(measureText('MeasureText', legend.textStyle).height, legend.shapeHeight);
        var legendEventArgs;
        var render = false;
        for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
            var legendOption = _a[_i];
            legendEventArgs = { fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                name: 'legendRender', cancel: false };
            this.chart.trigger('legendRender', legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendEventArgs.text;
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle);
            if (legendOption.render && legendOption.text !== '') {
                render = true;
                legendWidth = shapeWidth + shapePadding + legendOption.textSize.width + padding;
                if (this.isVertical) {
                    ++rowCount;
                    columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding;
                    if ((rowCount * (this.maxItemHeight + padding)) + padding > legendBounds.height) {
                        columnHeight = Math.max(columnHeight, (rowCount * (this.maxItemHeight + padding)) + padding);
                        rowWidth = rowWidth + maximumWidth;
                        columnWidth.push(maximumWidth);
                        this.totalPages = Math.max(rowCount, this.totalPages || 1);
                        maximumWidth = 0;
                        rowCount = 1;
                    }
                    maximumWidth = Math.max(legendWidth, maximumWidth);
                }
                else {
                    rowWidth = rowWidth + legendWidth;
                    if (legendBounds.width < (padding + rowWidth)) {
                        maximumWidth = Math.max(maximumWidth, (rowWidth + padding - legendWidth));
                        if (rowCount === 0 && (legendWidth !== rowWidth)) {
                            rowCount = 1;
                        }
                        rowWidth = legendWidth;
                        rowCount++;
                        columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding;
                    }
                }
            }
        }
        if (this.isVertical) {
            rowWidth = rowWidth + maximumWidth;
            this.isPaging = legendBounds.width < (rowWidth + padding);
            columnHeight = Math.max(columnHeight, ((this.totalPages || 1) * (this.maxItemHeight + padding)) + padding);
            this.isPaging = this.isPaging && (this.totalPages > 1);
            if (columnWidth[columnWidth.length - 1] !== maximumWidth) {
                columnWidth.push(maximumWidth);
            }
        }
        else {
            this.isPaging = legendBounds.height < columnHeight;
            this.totalPages = this.totalRowCount = rowCount;
            columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding);
        }
        this.maxColumns = 0; // initialization for max columns
        var width = this.isVertical ? this.getMaxColumn(columnWidth, legendBounds.width, padding, rowWidth + padding) :
            Math.max(rowWidth + padding, maximumWidth);
        if (render) {
            this.setBounds(width, columnHeight, legend, legendBounds);
        }
        else {
            this.setBounds(0, 0, legend, legendBounds);
        }
    };
    /**
     * To find maximum column size for legend
     */
    AccumulationLegend.prototype.getMaxColumn = function (columns, width, padding, rowWidth) {
        var maxPageColumn = padding;
        this.maxColumnWidth = Math.max.apply(null, columns);
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            maxPageColumn += this.maxColumnWidth;
            this.maxColumns++;
            if (maxPageColumn + padding > width) {
                maxPageColumn -= this.maxColumnWidth;
                this.maxColumns--;
                break;
            }
        }
        this.isPaging = (maxPageColumn < rowWidth) && (this.totalPages > 1);
        if (maxPageColumn === padding) {
            maxPageColumn = width;
        }
        this.maxColumns = Math.max(1, this.maxColumns);
        this.maxWidth = maxPageColumn;
        return maxPageColumn;
    };
    /**
     * To find available width from legend x position.
     */
    AccumulationLegend.prototype.getAvailWidth = function (tx, width, legendX) {
        if (this.isVertical) {
            width = this.maxWidth;
        }
        return width - ((this.legend.padding * 2) + this.legend.shapeWidth + this.legend.shapePadding);
    };
    /**
     * To find legend rendering locations from legend options.
     * @private
     */
    AccumulationLegend.prototype.getRenderPoint = function (legendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        if (this.isVertical) {
            if (count === firstLegend || (prevLegend.location.y + (this.maxItemHeight * 1.5) + (padding * 2) > rect.y + rect.height)) {
                legendOption.location.x = prevLegend.location.x + ((count === firstLegend) ? 0 : this.maxColumnWidth);
                legendOption.location.y = start.y;
                this.pageXCollections.push(legendOption.location.x - (this.legend.shapeWidth / 2) - padding);
                this.totalPages++;
            }
            else {
                legendOption.location.x = prevLegend.location.x;
                legendOption.location.y = prevLegend.location.y + this.maxItemHeight + padding;
            }
        }
        else {
            var previousBound = (prevLegend.location.x + textPadding + prevLegend.textSize.width);
            if ((previousBound + (legendOption.textSize.width + textPadding)) > (rect.x + rect.width + this.legend.shapeWidth / 2)) {
                legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                    prevLegend.location.y + this.maxItemHeight + padding;
                legendOption.location.x = start.x;
            }
            else {
                legendOption.location.y = prevLegend.location.y;
                legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            }
            this.totalPages = this.totalRowCount;
        }
        var availablewidth = this.getAvailWidth(legendOption.location.x, this.legendBounds.width, this.legendBounds.x);
        legendOption.text = textTrim(+availablewidth.toFixed(4), legendOption.text, this.legend.textStyle);
    };
    /**
     * finding the smart legend place according to positions.
     * @return {void}
     * @private
     */
    AccumulationLegend.prototype.getSmartLegendLocation = function (labelBound, legendBound, margin) {
        var space;
        switch (this.position) {
            case 'Left':
                space = ((labelBound.x - legendBound.width) - margin.left) / 2;
                legendBound.x = (labelBound.x - legendBound.width) < margin.left ? legendBound.x :
                    (labelBound.x - legendBound.width) - space;
                break;
            case 'Right':
                space = ((this.chart.availableSize.width - margin.right) - (labelBound.x + labelBound.width + legendBound.width)) / 2;
                legendBound.x = (labelBound.x + labelBound.width + legendBound.width) > (this.chart.availableSize.width - margin.right) ?
                    legendBound.x : (labelBound.x + labelBound.width + space);
                break;
            case 'Top':
                this.getTitleRect(this.chart);
                space = ((labelBound.y - legendBound.height) - (this.titleRect.y + this.titleRect.height)) / 2;
                legendBound.y = (labelBound.y - legendBound.height) < margin.top ? legendBound.y :
                    (labelBound.y - legendBound.height) - space;
                break;
            case 'Bottom':
                space = ((this.chart.availableSize.height - margin.bottom) - (labelBound.y + labelBound.height + legendBound.height)) / 2;
                legendBound.y = labelBound.y + labelBound.height + legendBound.height > (this.chart.availableSize.height - margin.bottom) ?
                    legendBound.y : (labelBound.y + labelBound.height) + space;
                break;
        }
    };
    /**
     * To get title rect.
     */
    AccumulationLegend.prototype.getTitleRect = function (accumulation) {
        if (!accumulation.title) {
            return null;
        }
        var titleSize = measureText(accumulation.title, accumulation.titleStyle);
        this.titleRect = new Rect(accumulation.availableSize.width / 2 - titleSize.width / 2, accumulation.margin.top, titleSize.width, titleSize.height);
    };
    /**
     * To get legend by index
     */
    AccumulationLegend.prototype.legendByIndex = function (index, legendCollections) {
        for (var _i = 0, legendCollections_1 = legendCollections; _i < legendCollections_1.length; _i++) {
            var legend = legendCollections_1[_i];
            if (legend.pointIndex === index) {
                return legend;
            }
        }
        return null;
    };
    /**
     * To show or hide the legend on clicking the legend.
     * @return {void}
     */
    AccumulationLegend.prototype.click = function (event) {
        var targetId = event.target.id;
        var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_',
            this.legendID + '_shape_marker_'];
        var selectedDataIndexes = [];
        if (this.chart.accumulationSelectionModule) {
            selectedDataIndexes = extend([], this.chart.accumulationSelectionModule.selectedDataIndexes, null, true);
        }
        for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
            var id = legendItemsId_1[_i];
            if (targetId.indexOf(id) > -1) {
                var pointIndex = parseInt(targetId.split(id)[1], 10);
                var currentSeries = this.chart.visibleSeries[0];
                var point = pointByIndex(pointIndex, currentSeries.points);
                var legendOption = this.legendByIndex(pointIndex, this.legendCollections);
                if (this.chart.legendSettings.toggleVisibility) {
                    point.visible = !point.visible;
                    legendOption.visible = point.visible;
                    this.chart.removeSvg();
                    if (point.visible) {
                        currentSeries.sumOfPoints += point.y;
                    }
                    else {
                        currentSeries.sumOfPoints -= point.y;
                    }
                    this.chart.refreshPoints(currentSeries.points);
                    this.chart.renderElements();
                }
                else if (this.chart.accumulationSelectionModule) {
                    this.chart.accumulationSelectionModule.legendSelection(this.chart, 0, pointIndex);
                }
            }
        }
        if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        }
        else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
    };
    /**
     * Get module name
     */
    AccumulationLegend.prototype.getModuleName = function () {
        return 'AccumulationLegend';
    };
    /**
     * To destroy the Legend.
     * @return {void}
     * @private
     */
    AccumulationLegend.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    return AccumulationLegend;
}(BaseLegend));

var __extends$56 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * AccumulationChart DataLabel module file
 */
/**
 * AccumulationDataLabel module used to render `dataLabel`.
 */
var AccumulationDataLabel = /** @class */ (function (_super) {
    __extends$56(AccumulationDataLabel, _super);
    function AccumulationDataLabel(accumulation) {
        var _this = _super.call(this, accumulation) || this;
        _this.id = accumulation.element.id + '_datalabel_Series_';
        if (accumulation.title) {
            var titleSize = measureText(accumulation.title, accumulation.titleStyle);
            _this.titleRect = new Rect(accumulation.availableSize.width / 2 - titleSize.width / 2, accumulation.margin.top, titleSize.width, titleSize.height);
        }
        return _this;
    }
    /**
     * Method to get datalabel text location.
     * @private
     */
    AccumulationDataLabel.prototype.getDataLabelPosition = function (point, dataLabel, textSize, points, parent, id) {
        var radius = this.isCircular() ? this.labelRadius : this.getLabelDistance(point, dataLabel);
        this.getLabelRegion(point, dataLabel.position, textSize, radius, this.marginValue);
        point.labelAngle = point.midAngle;
        point.labelPosition = dataLabel.position;
        if (this.accumulation.enableSmartLabels) {
            this.getSmartLabel(point, dataLabel, textSize, points, parent, id);
        }
    };
    /**
     * Method to get datalabel bound.
     */
    AccumulationDataLabel.prototype.getLabelRegion = function (point, position, textSize, labelRadius, margin, endAngle) {
        if (endAngle === void 0) { endAngle = 0; }
        var labelAngle = endAngle || point.midAngle;
        var space = 10;
        var location = degreeToLocation(labelAngle, labelRadius, this.isCircular() ? this.center :
            this.getLabelLocation(point, position));
        location.y = (position === 'Inside') ? (location.y - textSize.height / 2) : location.y;
        location.x = (position === 'Inside') ? (location.x - textSize.width / 2) : location.x;
        point.labelRegion = new Rect(location.x, location.y, textSize.width + (margin * 2), textSize.height + (margin * 2));
        if (position === 'Outside') {
            point.labelRegion.y -= point.labelRegion.height / 2;
            if (labelAngle >= 90 && labelAngle <= 270) {
                point.labelRegion.x -= (point.labelRegion.width + space);
            }
            else {
                point.labelRegion.x += space;
            }
        }
    };
    /**
     * Method to get datalabel smart position.
     */
    AccumulationDataLabel.prototype.getSmartLabel = function (point, dataLabel, textSize, points, parent, id) {
        var circular = this.isCircular();
        var labelRadius = circular ? this.radius : this.getLabelDistance(point, dataLabel);
        var connectorLength = circular ? (dataLabel.connectorStyle.length || '4%') :
            '0px';
        labelRadius += stringToNumber(connectorLength, labelRadius);
        var previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
        if (dataLabel.position === 'Inside') {
            if (previousPoint && previousPoint.labelRegion && (isOverlap(point.labelRegion, previousPoint.labelRegion)
                || this.isOverlapping(point, points)) || !circular && !containsRect(point.region, point.labelRegion)) {
                point.labelPosition = 'Outside';
                if (!circular) {
                    labelRadius = this.getLabelDistance(point, dataLabel);
                }
                this.getLabelRegion(point, point.labelPosition, textSize, labelRadius, this.marginValue);
                previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
                if (previousPoint && (isOverlap(point.labelRegion, previousPoint.labelRegion) ||
                    this.isConnectorLineOverlapping(point, previousPoint))) {
                    this.setOuterSmartLabel(previousPoint, point, dataLabel.border.width, labelRadius, textSize, this.marginValue);
                }
            }
        }
        else {
            if (previousPoint && previousPoint.labelRegion && (isOverlap(point.labelRegion, previousPoint.labelRegion)
                || this.isOverlapping(point, points) || this.isConnectorLineOverlapping(point, previousPoint))) {
                this.setOuterSmartLabel(previousPoint, point, dataLabel.border.width, labelRadius, textSize, this.marginValue);
            }
        }
        if (this.isOverlapping(point, points) || (this.titleRect && point.labelRegion && isOverlap(point.labelRegion, this.titleRect))) {
            this.setPointVisibileFalse(point);
        }
        if (this.accumulation.accumulationLegendModule && point.labelVisible && point.labelRegion) {
            var rect = this.accumulation.accumulationLegendModule.legendBounds;
            var padding = this.accumulation.legendSettings.border.width / 2;
            this.textTrimming(point, new Rect(rect.x - padding, rect.y - padding, rect.width + (2 * padding), rect.height + (2 * padding)), dataLabel.font, this.accumulation.accumulationLegendModule.position);
        }
        if (point.labelVisible && point.labelRegion) {
            var position = this.isCircular() ? (point.labelRegion.x >= this.center.x) ? 'InsideRight' : 'InsideLeft' :
                'InsideRight';
            this.textTrimming(point, this.areaRect, dataLabel.font, position);
        }
        if (point.labelVisible && point.labelRegion && ((point.labelRegion.y + point.labelRegion.height >
            this.areaRect.y + this.areaRect.height || point.labelRegion.y < this.areaRect.y) || (point.labelRegion.x < this.areaRect.x ||
            point.labelRegion.x + point.labelRegion.width > this.areaRect.x + this.areaRect.width))) {
            this.setPointVisibileFalse(point);
        }
    };
    /**
     * To find trimmed datalabel tooltip needed.
     * @return {void}
     * @private
     */
    AccumulationDataLabel.prototype.move = function (e, x, y, isTouch) {
        var _this = this;
        var location = this.accumulation.removeSvgOffset(x, y);
        if (e.target.textContent.indexOf('...') > -1) {
            var targetId = e.target.id.split(this.id);
            if (targetId.length === 2) {
                var seriesIndex = parseInt(targetId[1].split('_text_')[0], 10);
                var pointIndex = parseInt(targetId[1].split('_text_')[1], 10);
                if (!isNaN(seriesIndex) && !isNaN(pointIndex)) {
                    if (isTouch) {
                        removeElement(this.accumulation.element.id + '_EJ2_Datalabel_Tooltip');
                    }
                    var point = getSeriesFromIndex(seriesIndex, (this.accumulation).visibleSeries).points[pointIndex];
                    showTooltip(point.text || point.y.toString(), location.x, location.y, this.areaRect.width, this.accumulation.element.id + '_EJ2_Datalabel_Tooltip', getElement(this.accumulation.element.id + '_Secondary_Element'));
                }
            }
        }
        else {
            removeElement(this.accumulation.element.id + '_EJ2_Datalabel_Tooltip');
        }
        if (isTouch) {
            clearTimeout(this.clearTooltip);
            this.clearTooltip = setTimeout(function () { removeElement(_this.accumulation.element.id + '_EJ2_Datalabel_Tooltip'); }, 1000);
        }
    };
    /**
     * To find previous valid label point
     */
    AccumulationDataLabel.prototype.findPreviousPoint = function (points, index, position) {
        var point = points[0];
        for (var i = index - 1; i >= 0; i--) {
            point = points[i];
            if (point.visible && point.labelVisible && point.labelRegion && point.labelPosition === position) {
                return point;
            }
        }
        return null;
    };
    /**
     * To find current point datalabel is overlapping with other points
     */
    AccumulationDataLabel.prototype.isOverlapping = function (currentPoint, points) {
        for (var i = currentPoint.index - 1; i >= 0; i--) {
            if (points[i].visible && points[i].labelVisible && points[i].labelRegion && currentPoint.labelRegion &&
                currentPoint.labelVisible && isOverlap(currentPoint.labelRegion, points[i].labelRegion)) {
                return true;
            }
        }
        return false;
    };
    /**
     * To get text trimmed while exceeds the accumulation chart area.
     */
    AccumulationDataLabel.prototype.textTrimming = function (point, rect, font, position) {
        if (isOverlap(point.labelRegion, rect)) {
            var size = point.labelRegion.width;
            if (position === 'Right') {
                size = rect.x - point.labelRegion.x;
            }
            else if (position === 'Left') {
                size = point.labelRegion.x - (rect.x + rect.width);
                if (size < 0) {
                    size += point.labelRegion.width;
                    point.labelRegion.x = rect.x + rect.width;
                }
            }
            else if (position === 'InsideRight') {
                size = (rect.x + rect.width) - point.labelRegion.x;
            }
            else if (position === 'InsideLeft') {
                size = (point.labelRegion.x + point.labelRegion.width) - rect.x;
                if (size < point.labelRegion.width) {
                    point.labelRegion.x = rect.x;
                }
            }
            else {
                this.setPointVisibileFalse(point);
            }
            if (point.labelVisible && point.labelRegion) {
                if (size < point.labelRegion.width) {
                    point.label = textTrim(size - (this.marginValue * 2), point.label, font);
                    point.labelRegion.width = size;
                }
                if (point.label.length === 3 && point.label.indexOf('...') > -1) {
                    this.setPointVisibileFalse(point);
                }
            }
        }
    };
    /**
     * To set point label visible and region to disable.
     */
    AccumulationDataLabel.prototype.setPointVisibileFalse = function (point) {
        point.labelVisible = false;
        point.labelRegion = null;
    };
    /**
     * To set datalabel angle position for outside labels
     */
    AccumulationDataLabel.prototype.setOuterSmartLabel = function (previousPoint, point, border, labelRadius, textsize, margin) {
        if (!this.isCircular()) {
            this.setSmartLabelForSegments(point, previousPoint, labelRadius, textsize, margin);
        }
        else {
            var labelAngle = this.getOverlappedAngle(previousPoint.labelRegion, point.labelRegion, point.midAngle, border * 2);
            this.getLabelRegion(point, 'Outside', textsize, labelRadius, margin, labelAngle);
            if (labelAngle > point.endAngle) {
                this.setPointVisibileFalse(point);
            }
            point.labelAngle = labelAngle;
            while (point.labelVisible && (isOverlap(previousPoint.labelRegion, point.labelRegion) || labelAngle <= previousPoint.labelAngle
                || this.isConnectorLineOverlapping(point, previousPoint))) {
                if (labelAngle > point.endAngle) {
                    this.setPointVisibileFalse(point);
                    break;
                }
                point.labelAngle = labelAngle;
                this.getLabelRegion(point, 'Outside', textsize, labelRadius, margin, labelAngle);
                labelAngle += 0.1;
            }
        }
    };
    /**
     * Sets smart label positions for funnel and pyramid series
     */
    AccumulationDataLabel.prototype.setSmartLabelForSegments = function (point, prevPoint, distance, textSize, margin) {
        var textRegion = point.labelRegion;
        //let overlapWidth: number = prevPoint.labelRegion.x + prevPoint.labelRegion.width - textRegion.x;
        var overlapHeight = this.accumulation.type === 'Funnel' ?
            prevPoint.labelRegion.y - (textRegion.y + textRegion.height) :
            point.labelRegion.y - (prevPoint.labelRegion.y + prevPoint.labelRegion.height);
        if (overlapHeight < 0) {
            point.labelRegion.y += this.accumulation.type === 'Funnel' ? overlapHeight : -overlapHeight;
        }
    };
    /**
     * To find connector line overlapping.
     */
    AccumulationDataLabel.prototype.isConnectorLineOverlapping = function (point, previous) {
        var start = this.getLabelLocation(point);
        var end = new ChartLocation(0, 0);
        this.getEdgeOfLabel(point.labelRegion, point.labelAngle, end);
        var previousstart = this.getLabelLocation(previous);
        var previousend = new ChartLocation(0, 0);
        this.getEdgeOfLabel(previous.labelRegion, previous.labelAngle, previousend);
        return this.isLineRectangleIntersect(start, end, point.labelRegion) ||
            this.isLineRectangleIntersect(start, end, previous.labelRegion) ||
            this.isLineRectangleIntersect(previousstart, previousend, point.labelRegion);
    };
    /**
     * To find two rectangle intersect
     */
    AccumulationDataLabel.prototype.isLineRectangleIntersect = function (line1, line2, rect) {
        var rectPoints = [
            new ChartLocation(Math.round(rect.x), Math.round(rect.y)),
            new ChartLocation(Math.round((rect.x + rect.width)), Math.round(rect.y)),
            new ChartLocation(Math.round((rect.x + rect.width)), Math.round((rect.y + rect.height))),
            new ChartLocation(Math.round(rect.x), Math.round((rect.y + rect.height)))
        ];
        line1.x = Math.round(line1.x);
        line1.y = Math.round(line1.y);
        line2.x = Math.round(line2.x);
        line2.y = Math.round(line2.y);
        for (var i = 0; i < rectPoints.length; i++) {
            if (this.isLinesIntersect(line1, line2, rectPoints[i], rectPoints[(i + 1) % rectPoints.length])) {
                return true;
            }
        }
        return false;
    };
    /**
     * To find two line intersect
     */
    AccumulationDataLabel.prototype.isLinesIntersect = function (point1, point2, point11, point12) {
        var a1 = point2.y - point1.y;
        var b1 = point1.x - point2.x;
        var c1 = a1 * point1.x + b1 * point1.y;
        var a2 = point12.y - point11.y;
        var b2 = point11.x - point12.x;
        var c2 = a2 * point11.x + b2 * point11.y;
        var delta = a1 * b2 - a2 * b1;
        if (delta !== 0) {
            var x = (b2 * c1 - b1 * c2) / delta;
            var y = (a1 * c2 - a2 * c1) / delta;
            var lies = Math.min(point1.x, point2.x) <= x && x <= Math.max(point1.x, point2.x);
            lies = lies && Math.min(point1.y, point2.y) <= y && y <= Math.max(point1.y, point2.y);
            lies = lies && Math.min(point11.x, point12.x) <= x && x <= Math.max(point11.x, point12.x);
            lies = lies && Math.min(point11.y, point12.y) <= y && y <= Math.max(point11.y, point12.y);
            return lies;
        }
        return false;
    };
    /**
     * To get two rectangle overlapping angles.
     */
    AccumulationDataLabel.prototype.getOverlappedAngle = function (first, second, angle, padding) {
        var x = first.x;
        if (angle >= 90 && angle <= 270) {
            second.y = first.y - (padding + second.height / 2);
            x = first.x + first.width;
        }
        else {
            second.y = first.y + first.height + padding;
        }
        return getAngle(this.center, new ChartLocation(x, second.y));
    };
    /**
     * To get connector line path
     */
    AccumulationDataLabel.prototype.getConnectorPath = function (label, point, dataLabel, end) {
        if (end === void 0) { end = 0; }
        var connector = dataLabel.connectorStyle;
        var labelRadius = this.isCircular() ? this.labelRadius : this.getLabelDistance(point, dataLabel);
        var start = this.getConnectorStartPoint(point, connector);
        var labelAngle = end || point.midAngle;
        var middle = new ChartLocation(0, 0);
        var endPoint = this.getEdgeOfLabel(label, labelAngle, middle, connector.width);
        if (connector.type === 'Curve') {
            if (this.isCircular()) {
                var r = labelRadius - this.radius;
                middle = degreeToLocation(labelAngle, labelRadius - (r / 2), this.center);
                return 'M ' + start.x + ' ' + start.y + ' Q' + middle.x + ',' + middle.y + ' ' + endPoint.x + ',' + endPoint.y;
            }
            else {
                return this.getPolyLinePath(start, endPoint);
            }
        }
        else {
            return 'M ' + start.x + ' ' + start.y + ' L ' + middle.x + ' ' + middle.y + ' L ' + endPoint.x + ' ' + endPoint.y;
        }
    };
    /**
     * Finds the curved path for funnel/pyramid data label connectors
     */
    AccumulationDataLabel.prototype.getPolyLinePath = function (start, end) {
        var controlPoints = [start, end];
        if (start.y === end.y) {
            return 'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y;
        }
        var path = 'M';
        for (var i = 0; i <= 16; i++) {
            var t = i / 16;
            var points = this.getBezierPoint(t, controlPoints, 0, 2);
            path += points.x + ',' + points.y;
            if (i !== 16) {
                path += ' L';
            }
        }
        return path;
    };
    /**
     * Finds the bezier point for funnel/pyramid data label connectors
     */
    AccumulationDataLabel.prototype.getBezierPoint = function (t, controlPoints, index, count) {
        if (count === 1) {
            return controlPoints[index];
        }
        var p0 = this.getBezierPoint(t, controlPoints, index, count - 1);
        var p1 = this.getBezierPoint(t, controlPoints, index + 1, count - 1);
        var x = (p0.x) ? p0.x : p0.x;
        var y = (p0.y) ? p0.y : p0.y;
        var x1 = (p1.x) ? p1.x : p1.x;
        var y1 = (p1.y) ? p1.y : p1.y;
        var x2 = (1 - t) * x + t * x1;
        var y2 = (1 - t) * y + t * y1;
        if (p0.x) {
            return { x: x2, y: y2 };
        }
        else {
            return { x: x2, y: y2 };
        }
    };
    /**
     * To get label edges based on the center and label rect position.
     */
    AccumulationDataLabel.prototype.getEdgeOfLabel = function (labelshape, angle, middle, border) {
        if (border === void 0) { border = 1; }
        var edge = new ChartLocation(labelshape.x, labelshape.y);
        if (angle >= 90 && angle <= 270) {
            edge.x += labelshape.width + border / 2;
            edge.y += labelshape.height / 2;
            middle.x = edge.x + 10;
            middle.y = edge.y;
        }
        else {
            edge.x -= border / 2;
            edge.y += labelshape.height / 2;
            middle.x = edge.x - 10;
            middle.y = edge.y;
        }
        return edge;
    };
    /**
     * Finds the distance between the label position and the edge/center of the funnel/pyramid
     */
    AccumulationDataLabel.prototype.getLabelDistance = function (point, dataLabel) {
        if (point.labelPosition && dataLabel.position !== point.labelPosition || dataLabel.connectorStyle.length) {
            var length_1 = stringToNumber(dataLabel.connectorStyle.length || '70px', this.accumulation.initialClipRect.width);
            if (length_1 < this.accumulation.initialClipRect.width) {
                return length_1;
            }
        }
        var position = point.labelPosition || dataLabel.position;
        var series = this.accumulation.visibleSeries[0];
        var extraSpace = (this.accumulation.initialClipRect.width - series.triangleSize.width) / 2;
        var labelLocation;
        switch (position) {
            case 'Inside':
                return 0;
            case 'Outside':
                labelLocation = point.symbolLocation.x + point.labelOffset.x;
                return this.accumulation.initialClipRect.width - labelLocation - extraSpace;
        }
    };
    /**
     * Finds the label position / beginning of the connector(ouside funnel labels)
     */
    AccumulationDataLabel.prototype.getLabelLocation = function (point, position) {
        if (position === void 0) { position = 'Outside'; }
        if (this.accumulation.type !== 'Pie') {
            position = point.labelPosition || position;
            var location_1 = {
                x: point.symbolLocation.x,
                y: point.symbolLocation.y - point.labelOffset.y
            };
            switch (position) {
                case 'Inside':
                    location_1.y = point.region.y + point.region.height / 2;
                    break;
                case 'Outside':
                    location_1.x += point.labelOffset.x;
            }
            return location_1;
        }
        else {
            return degreeToLocation(point.midAngle, this.radius, this.center);
        }
    };
    /**
     * Finds the beginning of connector line
     */
    AccumulationDataLabel.prototype.getConnectorStartPoint = function (point, connector) {
        return this.isCircular() ? degreeToLocation(point.midAngle, this.radius - connector.width, this.center) :
            this.getLabelLocation(point);
    };
    /**
     * To find area rect based on margin, available size.
     * @private
     */
    AccumulationDataLabel.prototype.findAreaRect = function () {
        this.areaRect = new Rect(0, 0, this.accumulation.availableSize.width, this.accumulation.availableSize.height);
        var margin = this.accumulation.margin;
        subtractThickness(this.areaRect, new Thickness(margin.left, margin.right, margin.top, margin.bottom));
    };
    /**
     * To render the datalabels from series points.
     * @private
     */
    AccumulationDataLabel.prototype.renderDataLabel = function (point, dataLabel, parent, points, series, templateElement) {
        var id = this.accumulation.element.id + '_datalabel_Series_' + series + '_';
        var datalabelGroup = this.accumulation.renderer.createGroup({ id: id + 'g_' + point.index });
        point.label = point.originalText || point.y.toString();
        var argsData = {
            cancel: false, name: textRender, series: this.accumulation.visibleSeries[0], point: point,
            text: point.label, border: dataLabel.border, color: dataLabel.fill, template: dataLabel.template
        };
        this.accumulation.trigger(textRender, argsData);
        var isTemplate = argsData.template !== null;
        point.labelVisible = !argsData.cancel;
        point.text = point.label = argsData.text;
        this.marginValue = argsData.border.width ? (5 + argsData.border.width) : 1;
        // Template element
        var childElement = createElement('div', {
            id: this.accumulation.element.id + '_Series_' + 0 + '_DataLabel_' + point.index,
            styles: 'position: absolute;background-color:' + argsData.color + ';' +
                getFontStyle(dataLabel.font) + ';border:' + argsData.border.width + 'px solid ' + argsData.border.color + ';'
        });
        var textSize = isTemplate ? this.getTemplateSize(childElement, point, argsData) :
            measureText(point.label, dataLabel.font);
        textSize.height += 4; // 4 for calculation with padding for smart label shape
        textSize.width += 4;
        this.getDataLabelPosition(point, dataLabel, textSize, points, datalabelGroup, id);
        if (point.labelVisible) {
            this.correctLabelRegion(point.labelRegion, textSize);
            if (isTemplate) {
                this.setTemplateStyle(childElement, point, templateElement, dataLabel.font.color, argsData.color);
            }
            else {
                datalabelGroup.appendChild(this.accumulation.renderer.drawRectangle(new RectOption(id + 'shape_' + point.index, argsData.color, argsData.border, 1, point.labelRegion, dataLabel.rx, dataLabel.ry)));
                textElement(new TextOption(id + 'text_' + point.index, point.labelRegion.x + this.marginValue, point.labelRegion.y + (textSize.height * 3 / 4) + this.marginValue, 'start', point.label, '', 'auto'), dataLabel.font, dataLabel.font.color || this.getSaturatedColor(point, argsData.color), datalabelGroup);
            }
            if (this.accumulation.accumulationLegendModule && (dataLabel.position === 'Outside' || this.accumulation.enableSmartLabels)) {
                this.accumulation.visibleSeries[0].findMaxBounds(this.accumulation.visibleSeries[0].labelBound, point.labelRegion);
            }
            if (point.labelPosition === 'Outside') {
                var path = this.getConnectorPath(extend({}, point.labelRegion, null, true), point, dataLabel, point.labelAngle);
                var pathElement = this.accumulation.renderer.drawPath(new PathOption(id + 'connector_' + point.index, 'transparent', dataLabel.connectorStyle.width, dataLabel.connectorStyle.color || point.color, 1, '', path));
                datalabelGroup.appendChild(pathElement);
            }
            parent.appendChild(datalabelGroup);
        }
    };
    /**
     * To find the template element size
     * @param element
     * @param point
     * @param argsData
     */
    AccumulationDataLabel.prototype.getTemplateSize = function (element, point, argsData) {
        var clientRect;
        element = createTemplate(element, point.index, argsData.template, this.accumulation, point, this.accumulation.visibleSeries[0]);
        clientRect = measureElementRect(element);
        return { width: clientRect.width, height: clientRect.height };
    };
    /**
     * To set the template element style
     * @param childElement
     * @param point
     * @param parent
     * @param labelColor
     * @param fill
     */
    AccumulationDataLabel.prototype.setTemplateStyle = function (childElement, point, parent, labelColor, fill) {
        childElement.style.left = (point.labelRegion.x) + 'px';
        childElement.style.top = (point.labelRegion.y) + 'px';
        childElement.style.color = labelColor ||
            this.getSaturatedColor(point, fill);
        if (childElement.childElementCount) {
            parent.appendChild(childElement);
            this.doTemplateAnimation(this.accumulation, childElement);
        }
    };
    /**
     * To find saturated color for datalabel
     */
    AccumulationDataLabel.prototype.getSaturatedColor = function (point, color) {
        var saturatedColor;
        if (this.marginValue >= 1) {
            saturatedColor = color === 'transparent' ? this.getLabelBackground(point) : color;
        }
        else {
            saturatedColor = this.getLabelBackground(point);
        }
        saturatedColor = (saturatedColor === 'transparent') ? window.getComputedStyle(document.body, null).backgroundColor : saturatedColor;
        var rgbValue = convertHexToColor(colorNameToHex(saturatedColor));
        var contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
        return contrast >= 128 ? 'black' : 'white';
    };
    /**
     * Animates the data label template.
     * @return {void}.
     * @private
     */
    AccumulationDataLabel.prototype.doTemplateAnimation = function (accumulation, element) {
        var series = accumulation.visibleSeries[0];
        var delay = series.animation.delay + series.animation.duration;
        if (series.animation.enable && accumulation.animateSeries) {
            element.style.visibility = 'hidden';
            templateAnimate(element, delay, 200, 'ZoomIn');
        }
    };
    /**
     * To find background color for the datalabel
     */
    AccumulationDataLabel.prototype.getLabelBackground = function (point) {
        return point.labelPosition === 'Outside' ? this.accumulation.background : point.color;
    };
    /**
     * To correct the padding between datalabel regions.
     */
    AccumulationDataLabel.prototype.correctLabelRegion = function (labelRegion, textSize, padding) {
        if (padding === void 0) { padding = 4; }
        labelRegion.height -= padding;
        labelRegion.width -= padding;
        labelRegion.x += padding / 2;
        labelRegion.y += padding / 2;
        textSize.height -= padding;
        textSize.width -= padding;
    };
    /**
     * To get the dataLabel module name
     */
    AccumulationDataLabel.prototype.getModuleName = function () {
        return 'AccumulationDataLabel';
    };
    /**
     * To destroy the data label.
     * @return {void}
     * @private
     */
    AccumulationDataLabel.prototype.destroy = function (accumulation) {
        /**
         * Destroy method performed here
         */
    };
    return AccumulationDataLabel;
}(AccumulationBase));

/**
 * AccumulationChart Tooltip file
 */
/**
 * AccumulationTooltip module used to render `Tooltip` for Accumulation Chart.
 */
var AccumulationTooltip = /** @class */ (function () {
    function AccumulationTooltip(accumulation) {
        this.accumulation = accumulation;
        this.tooltipOption = accumulation.tooltip;
        this.targetId = accumulation.element.id + '_pie_tooltip';
        this.tooltip = new Tooltip({
            opensOn: 'custom',
            beforeOpen: this.tooltipCustomization.bind(this),
            openDelay: 0,
            closeDelay: 1000
        });
        this.tooltip.appendTo(accumulation.element);
    }
    /**
     * To set template function for toooltip
     */
    AccumulationTooltip.prototype.setTemplateFunction = function (template) {
        try {
            if (document.querySelectorAll(template).length) {
                this.templateFn = compile(document.querySelector(template).innerHTML.trim());
            }
        }
        catch (e) {
            this.templateFn = compile(template);
        }
    };
    /**
     * To render the tooltip for the point
     */
    AccumulationTooltip.prototype.renderTooltip = function (point, seriesIndex) {
        var element = getElement(this.targetId);
        if (element && (element.getAttribute('data-tooltip-id') === null) ||
            this.tooltipIndex !== 'series_' + seriesIndex + '_point_' + point.index) {
            this.updatePosition(this.targetId, point.symbolLocation.x, point.symbolLocation.y, this.accumulation.element.id + '_Series_0_Point_' + point.index);
            this.setTemplateFunction(this.tooltipOption.template);
            this.currentPoint = point;
            this.tooltip.content = this.getTooltipContent(point, seriesIndex);
            this.tooltip.open(getElement(this.targetId));
            this.tooltipIndex = 'series_' + seriesIndex + '_point_' + point.index;
        }
    };
    /**
     * To remove accumulation chart tooltip with animation
     * @private
     */
    AccumulationTooltip.prototype.fadeOutTooltip = function () {
        clearTimeout(this.clearTooltip);
        this.removeTooltip = this.removeTooltip.bind(this);
        this.clearTooltip = setTimeout(this.removeTooltip, 500);
    };
    /**
     * To remove accumulation chart tooltip element
     * @private
     */
    AccumulationTooltip.prototype.removeTooltip = function () {
        if (this.tooltip) {
            this.tooltip.close();
        }
    };
    /**
     * To get accumulation chart point tooltip content
     */
    AccumulationTooltip.prototype.getTooltipContent = function (point, seriesIndex) {
        if (this.tooltipOption.template && this.templateFn) {
            var templates = this.templateFn(point);
            var element = createElement('div');
            while (templates.length > 0) {
                element.appendChild(templates[0]);
            }
            return element;
        }
        else {
            return this.getTooltipText(point, this.tooltipOption, seriesIndex);
        }
    };
    /**
     * To customize the accumulation chart tooltip
     */
    AccumulationTooltip.prototype.tooltipCustomization = function (args) {
        var argsData = {
            cancel: false, name: tooltipRender,
            content: this.tooltip.content,
            textStyle: this.tooltipOption.textStyle,
            series: this.accumulation.visibleSeries[0],
            point: this.currentPoint
        };
        this.accumulation.trigger(tooltipRender, argsData);
        args.cancel = argsData.cancel;
        this.tooltip.content = argsData.content;
        this.tooltipOption.textStyle = argsData.textStyle;
        var content = document.getElementsByClassName('e-tooltip-wrap')[0];
        var font = this.tooltipOption.textStyle;
        var position = this.tooltip.position.split(' ');
        var borderColor = this.tooltipOption.border.color || this.currentPoint.color;
        var pointerSize = 8;
        var outerWidth;
        var innerWidth;
        args.element.classList.remove('e-popup-close');
        args.element.classList.add('e-popup-open');
        var arrowEle = args.element.querySelector('.e-arrow-tip');
        var borderWidth = this.tooltipOption.border.width;
        setStyleAttribute(args.element, {
            'backgroundColor': this.tooltipOption.fill, 'borderColor': borderColor,
            'borderWidth': borderWidth, 'borderRadius': '5px', 'pointer-events': 'none'
        });
        setStyleAttribute(args.element.querySelector('.e-tip-content'), {
            'color': font.color || '#000000', 'fontFamily': font.fontFamily, 'fontSize': font.size,
            'fontWeight': font.fontWeight, 'opacity': font.opacity.toString(), 'fontStyle': font.fontStyle
        });
        pointerSize = args.element.querySelector('.e-arrow-tip').offsetHeight;
        outerWidth = pointerSize + 'px';
        setStyleAttribute(args.element.querySelector('.e-arrow-tip-outer'), {
            'borderRightColor': 'transparent', 'borderLeftColor': 'transparent', 'borderBottomColor': borderColor,
            'borderLeftWidth': outerWidth, 'borderRightWidth': outerWidth, 'borderBottomWidth': outerWidth,
            'borderTopColor': borderColor,
        });
        innerWidth = (pointerSize - borderWidth) + 'px';
        setStyleAttribute(args.element.querySelector('.e-arrow-tip-inner'), {
            'borderRightColor': 'transparent', 'borderLeftColor': 'transparent', 'borderBottomColor': borderColor,
            'borderLeftWidth': innerWidth, 'borderRightWidth': innerWidth, 'borderBottomWidth': innerWidth,
            'left': borderWidth, 'top': 0, 'borderTopColor': this.tooltipOption.fill
        });
        setStyleAttribute(args.element, {
            'display': 'block', 'transitionProperty': 'left,top',
            'transitionDuration': this.tooltipOption.enableAnimation ? '500ms' : '0ms'
        });
        this.tooltip.dataBind();
    };
    /**
     * To update the tooltip element position
     * @private
     */
    AccumulationTooltip.prototype.updatePosition = function (id, x, y, pointId) {
        var pointElement = getElement(pointId);
        var translate = pointElement.getAttribute('transform');
        if (!isNullOrUndefined(translate) && translate !== '') {
            translate = translate.replace('translate(', '');
            translate = translate.replace(')', '');
            var tx = parseInt(translate.split(',')[0], 10);
            var ty = parseInt(translate.split(',')[1], 10);
            x = !isNaN(tx) ? tx + x : x;
            y = !isNaN(ty) ? ty + y : y;
        }
        var tooltip = getElement(id);
        if (tooltip) {
            tooltip.style.top = y + 'px';
            tooltip.style.left = x + 'px';
        }
        else {
            tooltip = createElement('div', {
                id: id,
                styles: 'position:absolute;left:' + x + 'px;top:' + y +
                    'px;width:2px;height:2px;background:transparent'
            });
            getElement(this.accumulation.element.id + '_Secondary_Element').appendChild(tooltip);
        }
    };
    /**
     * To get accumulation chart tooltip text from format.
     */
    AccumulationTooltip.prototype.getTooltipText = function (point, tooltip, seriesIndex) {
        var format = tooltip.format ? tooltip.format : '${point.x} : ${point.y}';
        var series = getSeriesFromIndex(seriesIndex, this.accumulation.visibleSeries);
        return this.parseTemplate(point, format, series);
    };
    /**
     * To parse the tooltip template
     */
    AccumulationTooltip.prototype.parseTemplate = function (point, format, series) {
        var value;
        var textValue;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            value = new RegExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(value.source, point[dataValue]);
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            value = new RegExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(value.source, textValue);
        }
        return format;
    };
    /**
     * Get module name
     */
    AccumulationTooltip.prototype.getModuleName = function () {
        return 'AccumulationTooltip';
    };
    /**
     * To destroy the Tooltip.
     * @return {void}
     * @private
     */
    AccumulationTooltip.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    return AccumulationTooltip;
}());

var __extends$57 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Selection Module handles the selection for chart.
 * @private
 */
var AccumulationSelection = /** @class */ (function (_super) {
    __extends$57(AccumulationSelection, _super);
    function AccumulationSelection(accumulation) {
        var _this = _super.call(this, accumulation) || this;
        _this.renderer = accumulation.renderer;
        return _this;
    }
    /**
     * To initialize the private variables
     */
    AccumulationSelection.prototype.initPrivateVariables = function (accumulation) {
        this.styleId = accumulation.element.id + '_ej2_chart_selection';
        this.unselected = accumulation.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.rectPoints = null;
    };
    /**
     * Method to select the point and series.
     * @return {void}
     */
    AccumulationSelection.prototype.invokeSelection = function (accumulation) {
        this.initPrivateVariables(accumulation);
        this.series = extend({}, accumulation.visibleSeries, null, true);
        this.seriesStyles();
        this.selectDataIndex(this.concatIndexes(accumulation.selectedDataIndexes, this.selectedDataIndexes), accumulation);
    };
    /**
     * To get series selection style by series.
     */
    AccumulationSelection.prototype.generateStyle = function (series) {
        return (series.selectionStyle || this.styleId + '_series_' + series.index);
    };
    /**
     * To get elements by index, series
     */
    AccumulationSelection.prototype.findElements = function (accumulation, series, index) {
        return [this.getElementByIndex(index)];
    };
    /**
     * To get series point element by index
     */
    AccumulationSelection.prototype.getElementByIndex = function (index) {
        var elementId = this.control.element.id + '_Series_' + index.series + '_Point_' + index.point;
        return document.getElementById(elementId);
    };
    /**
     * To calculate selected elements on mouse click or touch
     * @private
     */
    AccumulationSelection.prototype.calculateSelectedElements = function (accumulation, event) {
        if (event.target.id.indexOf(accumulation.element.id + '_') === -1) {
            return;
        }
        if (event.target.id.indexOf('_Series_') > -1 || event.target.id.indexOf('_datalabel_') > -1) {
            this.performSelection(indexFinder(event.target.id), accumulation, event.target);
        }
    };
    /**
     * To perform the selection process based on index and element.
     */
    AccumulationSelection.prototype.performSelection = function (index, accumulation, element) {
        element = element.id.indexOf('datalabel') > -1 ?
            accumulation.getSeriesElement().childNodes[index.series].childNodes[index.point]
            : element;
        switch (accumulation.selectionMode) {
            case 'Point':
                if (!isNaN(index.point)) {
                    this.selection(accumulation, index, [element]);
                    this.blurEffect(accumulation.element.id, accumulation.visibleSeries);
                }
                break;
        }
    };
    /**
     * To select the element by index. Adding or removing selection style class name.
     */
    AccumulationSelection.prototype.selection = function (accumulation, index, selectedElements) {
        if (!accumulation.isMultiSelect) {
            this.removeMultiSelectEelments(accumulation, this.selectedDataIndexes, index, accumulation.series);
        }
        var className = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
        if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
            this.removeStyles(selectedElements, index);
            this.addOrRemoveIndex(this.selectedDataIndexes, index);
        }
        else {
            this.applyStyles(selectedElements, index);
            this.addOrRemoveIndex(this.selectedDataIndexes, index, true);
        }
    };
    /**
     * To redraw the selection process on accumulation chart refresh.
     * @private
     */
    AccumulationSelection.prototype.redrawSelection = function (accumulation, oldMode) {
        var selectedDataIndexes = extend([], this.selectedDataIndexes, null, true);
        this.removeSelectedElements(accumulation, this.selectedDataIndexes);
        this.blurEffect(accumulation.element.id, accumulation.visibleSeries);
        this.selectDataIndex(selectedDataIndexes, accumulation);
    };
    /**
     * To remove the selected elements style classes by indexes.
     */
    AccumulationSelection.prototype.removeSelectedElements = function (accumulation, indexes) {
        var seriesgroup = accumulation.getSeriesElement();
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            this.removeStyles([this.getElementByIndex(index)], index);
        }
    };
    /**
     * To perform the selection for legend elements.
     * @private
     */
    AccumulationSelection.prototype.legendSelection = function (accumulation, series, pointIndex) {
        var element = accumulation.getSeriesElement().childNodes[series].childNodes[pointIndex];
        var seriesStyle = this.generateStyle(accumulation.visibleSeries[series]);
        var seriesElements = accumulation.getSeriesElement().childNodes[series].childNodes[pointIndex];
        this.selection(accumulation, new Index(series, pointIndex), [seriesElements]);
        this.blurEffect(accumulation.element.id, accumulation.visibleSeries);
    };
    /**
     * To select the element by selected data indexes.
     */
    AccumulationSelection.prototype.selectDataIndex = function (indexes, accumulation) {
        var element;
        for (var _i = 0, indexes_2 = indexes; _i < indexes_2.length; _i++) {
            var index = indexes_2[_i];
            element = this.getElementByIndex(index);
            if (element) {
                this.performSelection(index, accumulation, element);
            }
        }
    };
    /**
     * To remove the selection styles for multi selection process.
     */
    AccumulationSelection.prototype.removeMultiSelectEelments = function (accumulation, index, currentIndex, seriesCollection) {
        var series;
        for (var i = 0; i < index.length; i++) {
            series = seriesCollection[index[i].series];
            if (!this.checkEquals(index[i], currentIndex)) {
                this.removeStyles(this.findElements(accumulation, series, index[i]), index[i]);
                index.splice(i, 1);
                i--;
            }
        }
    };
    /**
     * To apply the opacity effect for accumulation chart series elements.
     */
    AccumulationSelection.prototype.blurEffect = function (pieId, visibleSeries) {
        var visibility = this.checkPointVisibility(this.selectedDataIndexes); // legend click scenario
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            if (series.visible) {
                this.checkSelectionElements(document.getElementById(pieId + '_SeriesCollection'), this.generateStyle(series), visibility);
            }
        }
    };
    /**
     * To check selection elements by style class name.
     */
    AccumulationSelection.prototype.checkSelectionElements = function (element, className, visibility) {
        var children = (element.childNodes[0].childNodes);
        var legendShape;
        var elementClass;
        var parentClass;
        for (var i = 0; i < children.length; i++) {
            elementClass = children[i].getAttribute('class') || '';
            parentClass = children[i].parentNode.getAttribute('class') || '';
            if (elementClass.indexOf(className) === -1 && parentClass.indexOf(className) === -1 && visibility) {
                this.addSvgClass(children[i], this.unselected);
            }
            else {
                this.removeSvgClass(children[i], this.unselected);
            }
            if (this.control.accumulationLegendModule && this.control.legendSettings.visible) {
                legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + i);
                if (legendShape) {
                    if (elementClass.indexOf(className) === -1 && parentClass.indexOf(className) === -1 && visibility) {
                        this.addSvgClass(legendShape, this.unselected);
                    }
                    else {
                        this.removeSvgClass(legendShape, this.unselected);
                    }
                }
            }
        }
    };
    /**
     * To apply selection style for elements.
     */
    AccumulationSelection.prototype.applyStyles = function (elements, index) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var legendShape = void 0;
            if (element) {
                if (this.control.accumulationLegendModule && this.control.legendSettings.visible) {
                    legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + index.point);
                    this.removeSvgClass(legendShape, this.unselected);
                    this.addSvgClass(legendShape, this.getSelectionClass(legendShape.id));
                }
                this.removeSvgClass(element.parentNode, this.unselected);
                this.removeSvgClass(element, this.unselected);
                this.addSvgClass(element, this.getSelectionClass(element.id));
            }
        }
    };
    /**
     * To get selection style class name by id
     */
    AccumulationSelection.prototype.getSelectionClass = function (id) {
        return this.generateStyle(this.control.series[indexFinder(id).series]);
    };
    /**
     * To remove selection style for elements.
     */
    AccumulationSelection.prototype.removeStyles = function (elements, index) {
        var legendShape;
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            if (element) {
                if (this.control.accumulationLegendModule && this.control.legendSettings.visible) {
                    legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + index.point);
                    this.removeSvgClass(legendShape, this.getSelectionClass(legendShape.id));
                }
                this.removeSvgClass(element, this.getSelectionClass(element.id));
            }
        }
    };
    /**
     * To apply or remove selected elements index.
     */
    AccumulationSelection.prototype.addOrRemoveIndex = function (indexes, index, add) {
        for (var i = 0; i < indexes.length; i++) {
            if (this.checkEquals(indexes[i], index)) {
                indexes.splice(i, 1);
                i--;
            }
        }
        if (add) {
            indexes.push(index);
        }
    };
    /**
     * To check two index, point and series are equal
     */
    AccumulationSelection.prototype.checkEquals = function (first, second) {
        return ((first.point === second.point) && (first.series === second.series));
    };
    /**
     * To check selected points are visibility
     */
    AccumulationSelection.prototype.checkPointVisibility = function (selectedDataIndexes) {
        var visible = false;
        for (var _i = 0, selectedDataIndexes_1 = selectedDataIndexes; _i < selectedDataIndexes_1.length; _i++) {
            var data = selectedDataIndexes_1[_i];
            if (pointByIndex(data.point, this.control.visibleSeries[0].points).visible) {
                visible = true;
                break;
            }
        }
        return visible;
    };
    /**
     * Get module name.
     */
    AccumulationSelection.prototype.getModuleName = function () {
        return 'AccumulationSelection';
    };
    /**
     * To destroy the selection.
     * @return {void}
     * @private
     */
    AccumulationSelection.prototype.destroy = function (accumulation) {
        // Destroy method performed here
    };
    return AccumulationSelection;
}(BaseSelection));

/**
 * AccumulationChart annotation properties
 */
var __extends$58 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Annotation Module handles the Annotation for accumulation chart.
 */
var AccumulationAnnotation = /** @class */ (function (_super) {
    __extends$58(AccumulationAnnotation, _super);
    /**
     * Constructor for Accumulation chart annotation.
     * @private.
     */
    function AccumulationAnnotation(control, annotations) {
        var _this = _super.call(this, control) || this;
        _this.pie = control;
        _this.annotations = annotations;
        return _this;
    }
    /**
     * Method to render the annotation for accumulation chart
     * @param element
     */
    AccumulationAnnotation.prototype.renderAnnotations = function (element) {
        var _this = this;
        var annotationElement;
        var location;
        this.parentElement = createElement('div', {
            id: this.pie.element.id + '_Annotation_Collections'
        });
        this.annotations.map(function (annotation, index) {
            location = new ChartLocation(0, 0);
            annotationElement = _this.render(annotation, index);
            if (_this['setAnnotation' + annotation.coordinateUnits + 'Value'](location)) {
                _this.setElementStyle(location, annotationElement, _this.parentElement);
            }
        });
        appendElement(this.parentElement, element);
    };
    /**
     * Get module name.
     */
    AccumulationAnnotation.prototype.getModuleName = function () {
        // Returns te module name
        return 'Annotation';
    };
    /**
     * To destroy the annotation.
     * @return {void}
     * @private
     */
    AccumulationAnnotation.prototype.destroy = function (control) {
        // Destroy method performed here
    };
    return AccumulationAnnotation;
}(AnnotationBase));

/**
 * Pie Component items exported
 */

/**
 * Chart and accumulation common files
 */

/**
 * Chart components exported.
 */

export { TooltipSettings, CrosshairSettings, ZoomSettings, Chart, Row, Column, MajorGridLines, MinorGridLines, AxisLine, MajorTickLines, MinorTickLines, CrosshairTooltip, Axis, VisibleLabels, DateTime, Category, Logarithmic, StripLine, Connector, Font, Border, ChartArea, Margin, Animation$1 as Animation, Indexes, CornerRadius, Index, EmptyPointSettings, LineSeries, ColumnSeries, AreaSeries, BarSeries, PolarSeries, RadarSeries, StackingBarSeries, CandleSeries, StackingColumnSeries, StepLineSeries, StepAreaSeries, StackingAreaSeries, ScatterSeries, RangeColumnSeries, WaterfallSeries, HiloSeries, HiloOpenCloseSeries, RangeAreaSeries, BubbleSeries, SplineSeries, TechnicalIndicator, SmaIndicator, EmaIndicator, TmaIndicator, AccumulationDistributionIndicator, AtrIndicator, MomentumIndicator, RsiIndicator, StochasticIndicator, BollingerBands, MacdIndicator, Trendlines, measureText, rotateTextSize, removeElement, logBase, showTooltip, inside, withIn, withInRange, sum, subArraySum, subtractThickness, subtractRect, degreeToLocation, getAngle, subArray, valueToCoefficient, TransformToVisible, CoefficientToVector, valueToPolarCoefficient, Mean, PolarArc, createTooltip, createZoomingLabels, withInBounds, getValueXByPoint, getValueYByPoint, findClipRect, firstToLowerCase, getMinPointsDelta, getAnimationFunction, linear, markerAnimate, templateAnimate, drawSymbol, calculateShapes, getRectLocation, minMax, getElement, getTemplateFunction, createTemplate, getFontStyle, measureElementRect, findlElement, getPoint, appendElement, getDraggedRectLocation, checkBounds, getLabelText, stopTimer, isCollide, isOverlap, containsRect, calculateRect, convertToHexCode, componentToHex, convertHexToColor, colorNameToHex, getSaturationColor, getMedian, calculateLegendShapes, textTrim, stringToNumber, findDirection, textElement, calculateSize, createSvg, titlePositionX, CustomizeOption, StackValues, TextOption, PathOption, RectOption, CircleOption, PolygonOption, Size, Rect, ChartLocation, Thickness, ColorValue, PointData, ControlPoints, Crosshair, Tooltip$1 as Tooltip, Zoom, Selection, DataLabel, ErrorBar, Points, DataLabelSettings, MarkerSettings, Trendline, ErrorBarCapSettings, ErrorBarSettings, SeriesBase, Series, Legend, ChartAnnotation, ChartAnnotationSettings, StripLineSettings, BoxAndWhiskerSeries, AccumulationChart, AccumulationAnnotationSettings, AccumulationDataLabelSettings, AccumulationTooltipSettings, AccPoints, AccumulationSeries, getSeriesFromIndex, pointByIndex, indexFinder, PieSeries, FunnelSeries, PyramidSeries, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection, AccumulationAnnotation, loaded, load, animationComplete, legendRender, textRender, pointRender, seriesRender, axisLabelRender, tooltipRender, chartMouseMove, chartMouseClick, chartMouseLeave, chartMouseDown, chartMouseUp, zoomComplete, dragComplete, resized, beforePrint, annotationRender, Theme, getSeriesColor };
//# sourceMappingURL=ej2-charts.es5.js.map
