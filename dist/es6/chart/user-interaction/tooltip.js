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
import { createElement, extend, Browser } from '@syncfusion/ej2-base';
import { Animation, compile as templateComplier } from '@syncfusion/ej2-base';
import { measureText, TextOption, Size, Rect, PointData, ChartLocation, textElement } from '../../common/utils/helper';
import { findDirection, stopTimer, drawSymbol, PathOption, valueToCoefficient, removeElement, valueToPolarCoefficient, withInBounds } from '../../common/utils/helper';
import { Data } from '../../chart/utils/get-data';
import { tooltipRender } from '../../common/model/constants';
import { Theme } from '../../common/model/theme';
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(chart) {
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
    Tooltip.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    Tooltip.prototype.mouseUpHandler = function () {
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
    Tooltip.prototype.mouseLeaveHandler = function () {
        this.removeTooltip(1000);
    };
    Tooltip.prototype.mouseMoveHandler = function () {
        var chart = this.chart;
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
    Tooltip.prototype.longPress = function () {
        var chart = this.chart;
        if (chart.crosshair.enable && withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.tooltip();
        }
        return false;
    };
    Tooltip.prototype.tooltip = function () {
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
                'id': this.element.id + '_tooltip_path', 'stroke-width': chart.tooltip.border.width,
                'fill': chart.tooltip.fill, 'opacity': chart.tooltip.opacity, 'stroke': chart.tooltip.border.color
            });
            groupElement.appendChild(pathElement);
        }
        return tooltipDiv;
    };
    Tooltip.prototype.getElement = function (id) {
        return document.getElementById(id);
    };
    Tooltip.prototype.renderPoint = function (point, isFirst, fill, firstText) {
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
                        this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
                        this.formattedText = this.formattedText.concat(this.header);
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
    Tooltip.prototype.updateTemplateFn = function (chart) {
        if (chart.tooltip.template) {
            var e = void 0;
            try {
                if (document.querySelectorAll(chart.tooltip.template).length) {
                    this.templateFn = templateComplier(document.querySelector(chart.tooltip.template).innerHTML.trim());
                }
            }
            catch (e) {
                this.templateFn = templateComplier(chart.tooltip.template);
            }
        }
    };
    Tooltip.prototype.createTemplate = function (chart, data, parent, isFirst) {
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
    Tooltip.prototype.findMouseValue = function (data, chart) {
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
    Tooltip.prototype.renderGroupedTooltip = function (chart, isFirst, tooltipDiv) {
        var data;
        var height = 0;
        var width = 0;
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
                this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
                this.formattedText = this.formattedText.concat(this.header);
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
    Tooltip.prototype.renderTooltip = function (chart, pointData, isFirst) {
        var tooltipDiv = this.getElement(this.element.id + '_tooltip');
        var arrowLocation = new ChartLocation(0, 0);
        var tipLocation = new ChartLocation(0, 0);
        var textHeights;
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
                (isBottom ? this.arrowPadding : 0);
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
    Tooltip.prototype.sharedTooltipLocation = function (bounds, x, y) {
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
    Tooltip.prototype.getBoxLocation = function (data) {
        var location;
        location = this.lierIndex > 3 ? data.point.symbolLocations[this.lierIndex - 4] :
            {
                x: data.point.regions[0].x + (data.point.regions[0].width / 2),
                y: data.point.regions[0].y + (data.point.regions[0].height / 2)
            };
        return location;
    };
    Tooltip.prototype.seriesTooltipLocation = function (pointData, arrowLocation, tipLocation) {
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
    Tooltip.prototype.removeHighlight = function (chart, removeRect) {
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
    Tooltip.prototype.highlightPoints = function (item) {
        if (item.series.isRectSeries) {
            this.highlightPoint(item.series, item.point.index, true);
            return null;
        }
    };
    Tooltip.prototype.highlightPoint = function (series, pointIndex, highlight) {
        var element = this.getElement(this.element.id + '_Series_' + series.index + '_Point_' + pointIndex);
        if (element) {
            element.setAttribute('opacity', (highlight ? series.opacity / 2 : series.opacity).toString());
        }
    };
    Tooltip.prototype.getTooltipText = function (pointData, isFirst) {
        if (isFirst === void 0) { isFirst = true; }
        var series = pointData.series;
        var text;
        return this.parseTemplate(pointData.point, series, this.getFormat(this.chart, series), series.xAxis, series.yAxis);
    };
    Tooltip.prototype.renderText = function (isRender, chart) {
        var height = 0;
        var width = 0;
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
        this.elementSize.width += (markerSize + 5);
        var element = (parentElement.childNodes[0]);
        if (this.header !== '' && element) {
            font.fontWeight = 'bold';
            var width_1 = (this.elementSize.width + (2 * this.padding)) / 2 - measureText(this.header, font).width / 2;
            element.setAttribute('x', width_1.toString());
        }
    };
    Tooltip.prototype.changeText = function (point, isBottom, isRight, rect) {
        var element = document.getElementById(this.element.id + '_tooltip_text');
        if (isBottom) {
            element.setAttribute('transform', 'translate(0,' + this.arrowPadding + ')');
        }
        if (isRight) {
            element.setAttribute('transform', 'translate(' + this.arrowPadding + ' 0)');
        }
        this.drawMarker(isBottom, isRight, 10);
    };
    Tooltip.prototype.drawMarker = function (isBottom, isRight, size) {
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
    Tooltip.prototype.parseTemplate = function (point, series, format, xAxis, yAxis) {
        var val;
        var textValue;
        var xFormat;
        var customLabelFormat;
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
    Tooltip.prototype.formatPointValue = function (point, axis, dataValue, isXPoint, isYPoint) {
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
    Tooltip.prototype.getFormat = function (chart, series) {
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
    Tooltip.prototype.getIndicatorTooltipFormat = function (series, chart, format) {
        var toolTip;
        var points = [];
        if (series.seriesType === 'XY') {
            toolTip = series.name + ' : ${point.y}';
        }
        else {
            toolTip = format;
        }
        return toolTip;
    };
    Tooltip.prototype.stopAnimation = function () {
        stopTimer(this.toolTipInterval);
    };
    Tooltip.prototype.removeTooltip = function (duration) {
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
    Tooltip.prototype.removeHighlightedMarker = function (data) {
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
    Tooltip.prototype.animateTooltipDiv = function (tooltipDiv, rect) {
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
    Tooltip.prototype.updateDiv = function (tooltipDiv, x, y) {
        tooltipDiv.style.left = x + 'px';
        tooltipDiv.style.top = y + 'px';
    };
    Tooltip.prototype.getModuleName = function () {
        return 'Tooltip';
    };
    Tooltip.prototype.destroy = function (chart) {
    };
    return Tooltip;
}(Data));
export { Tooltip };
