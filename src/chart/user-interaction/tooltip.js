define(["require", "exports", "@syncfusion/ej2-base/dom", "@syncfusion/ej2-base/util", "@syncfusion/ej2-base", "../utils/helper", "../utils/helper", "../model/constants"], function (require, exports, dom_1, util_1, ej2_base_1, helper_1, helper_2, constants_1) {
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
});
