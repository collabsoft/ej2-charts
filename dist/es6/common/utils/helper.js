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
import { SvgRenderer, Animation, compile as templateComplier } from '@syncfusion/ej2-base';
import { merge } from '@syncfusion/ej2-base';
import { createElement, remove } from '@syncfusion/ej2-base';
export function measureText(text, font) {
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
    htmlObject.style.lineHeight = 'normal';
    return new Size(htmlObject.clientWidth, htmlObject.clientHeight);
}
export function rotateTextSize(font, text, angle, chart) {
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
export function removeElement(id) {
    var element = getElement(id);
    if (element) {
        remove(element);
    }
}
export function logBase(value, base) {
    return Math.log(value) / Math.log(base);
}
export function showTooltip(text, x, y, areaWidth, id, element, isTouch) {
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
export function inside(value, range) {
    return (value < range.max) && (value > range.min);
}
export function withIn(value, range) {
    return (value <= range.max) && (value >= range.min);
}
export function withInRange(previousPoint, currentPoint, nextPoint, series) {
    var mX2 = series.logWithIn(currentPoint.xValue, series.xAxis);
    var mX1 = previousPoint ? series.logWithIn(previousPoint.xValue, series.xAxis) : mX2;
    var mX3 = nextPoint ? series.logWithIn(nextPoint.xValue, series.xAxis) : mX2;
    var xStart = Math.floor(series.xAxis.visibleRange.min);
    var xEnd = Math.ceil(series.xAxis.visibleRange.max);
    return ((mX1 >= xStart && mX1 <= xEnd) || (mX2 >= xStart && mX2 <= xEnd) ||
        (mX3 >= xStart && mX3 <= xEnd) || (xStart >= mX1 && xStart <= mX3));
}
export function sum(values) {
    var sum = 0;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var value = values_1[_i];
        sum += value;
    }
    return sum;
}
export function subArraySum(values, first, last, index, series) {
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
export function subtractThickness(rect, thickness) {
    rect.x += thickness.left;
    rect.y += thickness.top;
    rect.width -= thickness.left + thickness.right;
    rect.height -= thickness.top + thickness.bottom;
    return rect;
}
export function subtractRect(rect, thickness) {
    rect.x += thickness.x;
    rect.y += thickness.y;
    rect.width -= thickness.x + thickness.width;
    rect.height -= thickness.y + thickness.height;
    return rect;
}
export function degreeToLocation(degree, radius, center) {
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
export function getAngle(center, point) {
    var angle = Math.atan2((point.y - center.y), (point.x - center.x));
    angle = angle < 0 ? (6.283 + angle) : angle;
    return angle * (180 / Math.PI);
}
export function subArray(values, index) {
    var subArray = [];
    for (var i = 0; i <= index - 1; i++) {
        subArray.push(values[i]);
    }
    return subArray;
}
export function valueToCoefficient(value, axis) {
    var range = axis.visibleRange;
    var result = (value - range.min) / (range.delta);
    return axis.isInversed ? (1 - result) : result;
}
export function TransformToVisible(x, y, xAxis, yAxis, isInverted, series) {
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
export function CoefficientToVector(coefficient, startAngle) {
    startAngle = startAngle < 0 ? startAngle + 360 : startAngle;
    var angle = Math.PI * (1.5 - 2 * coefficient);
    angle = angle + (startAngle * Math.PI) / 180;
    return { x: Math.cos(angle), y: Math.sin(angle) };
}
export function valueToPolarCoefficient(value, axis) {
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
var Mean = (function () {
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
export { Mean };
var PolarArc = (function () {
    function PolarArc(startAngle, endAngle, innerRadius, radius, currentXPosition) {
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.innerRadius = innerRadius;
        this.radius = radius;
        this.currentXPosition = currentXPosition;
    }
    return PolarArc;
}());
export { PolarArc };
export function createTooltip(id, text, top, left, fontSize) {
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
export function createZoomingLabels(chart, axis, parent, index, isVertical) {
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
export function withInBounds(x, y, bounds, width, height) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    return (x >= bounds.x - width && x <= bounds.x + bounds.width + width && y >= bounds.y - height
        && y <= bounds.y + bounds.height + height);
}
export function getValueXByPoint(value, size, axis) {
    var actualValue = !axis.isInversed ? value / size : (1 - (value / size));
    return actualValue * (axis.visibleRange.delta) + axis.visibleRange.min;
}
export function getValueYByPoint(value, size, axis) {
    var actualValue = axis.isInversed ? value / size : (1 - (value / size));
    return actualValue * (axis.visibleRange.delta) + axis.visibleRange.min;
}
export function findClipRect(series) {
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
export function firstToLowerCase(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}
export function getMinPointsDelta(axis, seriesCollection) {
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
export function getAnimationFunction(effect) {
    var functionName;
    switch (effect) {
        case 'Linear':
            functionName = linear;
            break;
    }
    return functionName;
}
export function linear(currentTime, startValue, endValue, duration) {
    return -endValue * Math.cos(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
}
export function markerAnimate(element, delay, duration, series, pointIndex, point, isLabel) {
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
export function templateAnimate(element, delay, duration, name, isRemove) {
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
export function drawSymbol(location, shape, size, url, options, label) {
    var functionName = 'Path';
    var renderer = new SvgRenderer('');
    var temp = calculateShapes(location, size, shape, options, url);
    var htmlObject = renderer['draw' + temp.functionName](temp.renderOption);
    htmlObject.setAttribute('aria-label', label);
    return htmlObject;
}
export function calculateShapes(location, size, shape, options, url) {
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
export function getRectLocation(startLocation, endLocation, outerRect) {
    var x;
    var y;
    x = (endLocation.x < outerRect.x) ? outerRect.x :
        (endLocation.x > (outerRect.x + outerRect.width)) ? outerRect.x + outerRect.width : endLocation.x;
    y = (endLocation.y < outerRect.y) ? outerRect.y :
        (endLocation.y > (outerRect.y + outerRect.height)) ? outerRect.y + outerRect.height : endLocation.y;
    return new Rect((x > startLocation.x ? startLocation.x : x), (y > startLocation.y ? startLocation.y : y), Math.abs(x - startLocation.x), Math.abs(y - startLocation.y));
}
export function minMax(value, min, max) {
    return value > max ? max : (value < min ? min : value);
}
export function getElement(id) {
    return document.getElementById(id);
}
export function getTemplateFunction(template) {
    var templateFn = null;
    var e;
    try {
        if (document.querySelectorAll(template).length) {
            templateFn = templateComplier(document.querySelector(template).innerHTML.trim());
        }
    }
    catch (e) {
        templateFn = templateComplier(template);
    }
    return templateFn;
}
export function createTemplate(childElement, pointIndex, content, chart, point, series) {
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
export function getFontStyle(font) {
    var style = '';
    style = 'font-size:' + font.size +
        '; font-style:' + font.fontStyle + '; font-weight:' + font.fontWeight +
        '; font-family:' + font.fontFamily + ';opacity:' + font.opacity +
        '; color:' + font.color + ';';
    return style;
}
export function measureElementRect(element) {
    var bounds;
    document.body.appendChild(element);
    bounds = element.getBoundingClientRect();
    removeElement(element.id);
    return bounds;
}
export function findlElement(elements, id) {
    var element;
    for (var i = 0, length_1 = elements.length; i < length_1; i++) {
        if (elements[i].id.indexOf(id) > -1) {
            element = elements[i];
            continue;
        }
    }
    return element;
}
export function getPoint(x, y, xAxis, yAxis, isInverted, series) {
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
export function appendElement(child, parent) {
    if (child && child.hasChildNodes() && parent) {
        parent.appendChild(child);
    }
    else {
        return null;
    }
}
export function getDraggedRectLocation(x1, y1, x2, y2, outerRect) {
    var width = Math.abs(x1 - x2);
    var height = Math.abs(y1 - y2);
    var x = Math.max(checkBounds(Math.min(x1, x2), width, outerRect.x, outerRect.width), outerRect.x);
    var y = Math.max(checkBounds(Math.min(y1, y2), height, outerRect.y, outerRect.height), outerRect.y);
    return new Rect(x, y, Math.min(width, outerRect.width), Math.min(height, outerRect.height));
}
export function checkBounds(start, size, min, max) {
    if (start < min) {
        start = min;
    }
    else if ((start + size) > (max + min)) {
        start = (max + min) - size;
    }
    return start;
}
export function getLabelText(currentPoint, series, chart) {
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
export function stopTimer(timer) {
    window.clearInterval(timer);
}
export function isCollide(rect, collections, clipRect) {
    var isCollide;
    var currentRect = new Rect(rect.x + clipRect.x, rect.y + clipRect.y, rect.width, rect.height);
    isCollide = collections.some(function (rect) {
        return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
            currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
    });
    return isCollide;
}
export function isOverlap(currentRect, rect) {
    return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
        currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
}
export function containsRect(currentRect, rect) {
    return (currentRect.x <= rect.x && currentRect.x + currentRect.width >= rect.x + rect.width &&
        currentRect.y <= rect.y && currentRect.height + currentRect.y >= rect.y + rect.height);
}
export function calculateRect(location, textSize, margin) {
    return new Rect((location.x - (textSize.width / 2) - margin.left), (location.y - (textSize.height / 2) - margin.top), textSize.width + margin.left + margin.right, textSize.height + margin.top + margin.bottom);
}
export function convertToHexCode(value) {
    return '#' + componentToHex(value.r) + componentToHex(value.g) + componentToHex(value.b);
}
export function componentToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
export function convertHexToColor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new ColorValue(255, 255, 255);
}
export function colorNameToHex(color) {
    var element;
    color = color === 'transparent' ? 'white' : color;
    element = document.getElementById('chartmeasuretext');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    var exp = /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/;
    var isRGBValue = exp.exec(color);
    return convertToHexCode(new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10)));
}
export function getSaturationColor(color, factor) {
    color = colorNameToHex(color);
    color = color.replace(/[^0-9a-f]/gi, '');
    if (color.length < 6) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    factor = factor || 0;
    var rgb = '#';
    var colorCode;
    for (var i = 0; i < 3; i++) {
        colorCode = parseInt(color.substr(i * 2, 2), 16);
        colorCode = Math.round(Math.min(Math.max(0, colorCode + (colorCode * factor)), 255));
        rgb += ('00' + colorCode.toString(16)).substr(colorCode.toString(16).length);
    }
    return rgb;
}
export function getMedian(values) {
    var half = Math.floor(values.length / 2);
    return values.length % 2 ? values[half] : ((values[half - 1] + values[half]) / 2.0);
}
export function calculateLegendShapes(location, size, shape, options) {
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
export function textTrim(maxWidth, text, font) {
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
export function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
export function findDirection(rX, rY, rect, arrowLocation, arrowPadding, top, bottom, left, tipX, tipY, tipRadius) {
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
export function textElement(options, font, color, parent, isMinus) {
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
export function calculateSize(chart) {
    var containerWidth = chart.element.clientWidth;
    var containerHeight = chart.element.clientHeight;
    chart.availableSize = new Size(stringToNumber(chart.width, containerWidth) || containerWidth || 600, stringToNumber(chart.height, containerHeight) || containerHeight || 450);
}
export function createSvg(chart) {
    chart.renderer = new SvgRenderer(chart.element.id);
    calculateSize(chart);
    chart.svgObject = chart.renderer.createSvg({
        id: chart.element.id + '_svg',
        width: chart.availableSize.width,
        height: chart.availableSize.height
    });
}
export function titlePositionX(chartSize, leftPadding, rightPadding, titleStyle, textSize) {
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
var CustomizeOption = (function () {
    function CustomizeOption(id) {
        this.id = id;
    }
    return CustomizeOption;
}());
export { CustomizeOption };
var StackValues = (function () {
    function StackValues(startValue, endValue) {
        this.startValues = startValue;
        this.endValues = endValue;
    }
    return StackValues;
}());
export { StackValues };
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
export { TextOption };
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
export { PathOption };
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
export { RectOption };
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
export { CircleOption };
var PolygonOption = (function () {
    function PolygonOption(id, points, fill) {
        this.id = id;
        this.points = points;
        this.fill = fill;
    }
    return PolygonOption;
}());
export { PolygonOption };
var Size = (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
export { Size };
var Rect = (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
export { Rect };
var ChartLocation = (function () {
    function ChartLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return ChartLocation;
}());
export { ChartLocation };
var Thickness = (function () {
    function Thickness(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
    return Thickness;
}());
export { Thickness };
var ColorValue = (function () {
    function ColorValue(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return ColorValue;
}());
export { ColorValue };
var PointData = (function () {
    function PointData(point, series, index) {
        if (index === void 0) { index = 0; }
        this.point = point;
        this.series = series;
        this.lierIndex = index;
    }
    return PointData;
}());
export { PointData };
var ControlPoints = (function () {
    function ControlPoints(controlPoint1, controlPoint2) {
        this.controlPoint1 = controlPoint1;
        this.controlPoint2 = controlPoint2;
    }
    return ControlPoints;
}());
export { ControlPoints };
