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
import { extend, createElement } from '@syncfusion/ej2-base';
import { ChartLocation, degreeToLocation, Rect, isOverlap, stringToNumber, getAngle, TextOption } from '../../common/utils/helper';
import { textTrim, subtractThickness, Thickness, removeElement, measureText, RectOption, textElement } from '../../common/utils/helper';
import { PathOption, colorNameToHex, convertHexToColor, showTooltip } from '../../common/utils/helper';
import { getSeriesFromIndex } from '../model/acc-base';
import { textRender } from '../../common/model/constants';
import { PieBase } from '../renderer/pie-base';
import { getFontStyle, createTemplate, measureElementRect, templateAnimate } from '../../common/utils/helper';
var AccumulationDataLabel = (function (_super) {
    __extends(AccumulationDataLabel, _super);
    function AccumulationDataLabel(accumulation) {
        var _this = _super.call(this) || this;
        _this.accumulation = accumulation;
        _this.id = accumulation.element.id + '_datalabel_Series_';
        if (accumulation.title) {
            var titleSize = measureText(accumulation.title, accumulation.titleStyle);
            _this.titleRect = new Rect(accumulation.availableSize.width / 2 - titleSize.width / 2, accumulation.margin.top, titleSize.width, titleSize.height);
        }
        return _this;
    }
    AccumulationDataLabel.prototype.getDataLabelPosition = function (point, midAngle, dataLabel, textSize, points, parent, id) {
        this.getLabelbound(point, midAngle, dataLabel.position, textSize, this.labelRadius, this.marginValue);
        point.labelAngle = midAngle;
        point.labelPosition = dataLabel.position;
        if (this.accumulation.enableSmartLabels) {
            this.getSmartLabel(point, midAngle, dataLabel, textSize, points, parent, id);
        }
    };
    AccumulationDataLabel.prototype.getLabelbound = function (point, midAngle, position, textSize, labelRadius, margin, endAngle) {
        if (endAngle === void 0) { endAngle = 0; }
        var labelAngle = endAngle || midAngle;
        var space = 10;
        var location = degreeToLocation(labelAngle, labelRadius, this.center);
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
    AccumulationDataLabel.prototype.getSmartLabel = function (point, midAngle, dataLabel, textSize, points, parent, id) {
        var labelRadius = this.radius + stringToNumber(dataLabel.connectorStyle.length, this.radius);
        var previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
        if (dataLabel.position === 'Inside') {
            if (previousPoint && previousPoint.labelRegion && (isOverlap(point.labelRegion, previousPoint.labelRegion)
                || this.isOverlapping(point, points))) {
                point.labelPosition = 'Outside';
                this.getLabelbound(point, midAngle, point.labelPosition, textSize, labelRadius, this.marginValue);
                previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
                if (previousPoint && (isOverlap(point.labelRegion, previousPoint.labelRegion) ||
                    this.isConnectorLineOverlapping(point, previousPoint))) {
                    this.setOuterSmartLabel(previousPoint, point, midAngle, dataLabel.border.width, labelRadius, textSize, this.marginValue);
                }
            }
        }
        else {
            if (previousPoint && previousPoint.labelRegion && (isOverlap(point.labelRegion, previousPoint.labelRegion)
                || this.isOverlapping(point, points) || this.isConnectorLineOverlapping(point, previousPoint))) {
                this.setOuterSmartLabel(previousPoint, point, midAngle, dataLabel.border.width, labelRadius, textSize, this.marginValue);
            }
        }
        if (this.isOverlapping(point, points) || (this.titleRect && point.labelRegion && isOverlap(point.labelRegion, this.titleRect))) {
            this.setPointVisibileFalse(point);
        }
        if (this.accumulation.accumulationLegendModule && point.labelVisible && point.labelRegion) {
            this.textTrimming(point, this.accumulation.accumulationLegendModule.legendBounds, dataLabel.font, this.accumulation.accumulationLegendModule.position);
        }
        if (point.labelVisible && point.labelRegion) {
            var position = (point.labelRegion.x >= this.center.x) ? 'InsideRight' : 'InsideLeft';
            this.textTrimming(point, this.areaRect, dataLabel.font, position);
        }
        if (point.labelVisible && point.labelRegion && ((point.labelRegion.y + point.labelRegion.height >
            this.areaRect.y + this.areaRect.height || point.labelRegion.y < this.areaRect.y) || (point.labelRegion.x < this.areaRect.x ||
            point.labelRegion.x + point.labelRegion.width > this.areaRect.x + this.areaRect.width))) {
            this.setPointVisibileFalse(point);
        }
    };
    AccumulationDataLabel.prototype.move = function (e, x, y, isTouch) {
        var _this = this;
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
                    showTooltip(point.text || point.y.toString(), x, y, this.areaRect.width, this.accumulation.element.id + '_EJ2_Datalabel_Tooltip');
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
    AccumulationDataLabel.prototype.isOverlapping = function (currentPoint, points) {
        for (var i = currentPoint.index - 1; i >= 0; i--) {
            if (points[i].visible && points[i].labelVisible && points[i].labelRegion && currentPoint.labelRegion &&
                currentPoint.labelVisible && isOverlap(currentPoint.labelRegion, points[i].labelRegion)) {
                return true;
            }
        }
        return false;
    };
    AccumulationDataLabel.prototype.textTrimming = function (point, rect, font, position) {
        if (isOverlap(point.labelRegion, rect)) {
            var size = point.labelRegion.width;
            if (position === 'Right') {
                size = rect.x - point.labelRegion.x;
            }
            else if (position === 'Left') {
                size = point.labelRegion.x - (rect.x + rect.width);
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
    AccumulationDataLabel.prototype.setPointVisibileFalse = function (point) {
        point.labelVisible = false;
        point.labelRegion = null;
    };
    AccumulationDataLabel.prototype.setOuterSmartLabel = function (previousPoint, point, midAngle, border, labelRadius, textsize, margin) {
        var labelAngle = this.getOverlappedAngle(previousPoint.labelRegion, point.labelRegion, midAngle, border * 2);
        this.getLabelbound(point, midAngle, 'Outside', textsize, labelRadius, margin, labelAngle);
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
            this.getLabelbound(point, midAngle, 'Outside', textsize, labelRadius, margin, labelAngle);
            labelAngle += 0.1;
        }
    };
    AccumulationDataLabel.prototype.isConnectorLineOverlapping = function (point, previous) {
        var start = degreeToLocation(point.midAngle, this.radius, this.center);
        var end = new ChartLocation(0, 0);
        this.getEdgeOfLabel(point.labelRegion, point.labelAngle, end);
        var previousstart = degreeToLocation(previous.midAngle, this.radius, this.center);
        var previousend = new ChartLocation(0, 0);
        this.getEdgeOfLabel(previous.labelRegion, previous.labelAngle, previousend);
        return this.isLineRectangleIntersect(start, end, point.labelRegion) ||
            this.isLineRectangleIntersect(start, end, previous.labelRegion) ||
            this.isLineRectangleIntersect(previousstart, previousend, point.labelRegion);
    };
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
    AccumulationDataLabel.prototype.getConnectorPath = function (label, midAngle, connector, labelRadius, end) {
        if (labelRadius === void 0) { labelRadius = null; }
        if (end === void 0) { end = 0; }
        var start = degreeToLocation(midAngle, this.radius - connector.width, this.center);
        var labelAngle = end || midAngle;
        labelRadius = labelRadius || this.labelRadius;
        var middle = new ChartLocation(0, 0);
        var endPoint = this.getEdgeOfLabel(label, labelAngle, middle, connector.width);
        if (connector.type === 'Curve') {
            var r = labelRadius - this.radius;
            middle = degreeToLocation(labelAngle, labelRadius - (r / 2), this.center);
            return 'M ' + start.x + ' ' + start.y + ' Q' + middle.x + ',' + middle.y + ' ' + endPoint.x + ',' + endPoint.y;
        }
        else {
            return 'M ' + start.x + ' ' + start.y + ' L ' + middle.x + ' ' + middle.y + ' L ' + endPoint.x + ' ' + endPoint.y;
        }
    };
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
    AccumulationDataLabel.prototype.findAreaRect = function () {
        this.areaRect = new Rect(0, 0, this.accumulation.availableSize.width, this.accumulation.availableSize.height);
        var margin = this.accumulation.margin;
        subtractThickness(this.areaRect, new Thickness(margin.left, margin.right, margin.top, margin.bottom));
    };
    AccumulationDataLabel.prototype.renderDataLabel = function (point, dataLabel, parent, points, series, templateElement) {
        var id = this.accumulation.element.id + '_datalabel_Series_' + series + '_';
        var datalabelGroup = this.accumulation.renderer.createGroup({ id: id + 'g_' + point.index });
        point.label = point.text || point.y.toString();
        var argsData = {
            cancel: false, name: textRender, series: this.accumulation.visibleSeries[0], point: point,
            text: point.label, border: dataLabel.border, color: dataLabel.fill, template: dataLabel.template
        };
        this.accumulation.trigger(textRender, argsData);
        var isTemplate = argsData.template !== null;
        point.labelVisible = !argsData.cancel;
        point.text = point.label = argsData.text;
        this.marginValue = argsData.border.width ? (5 + argsData.border.width) : 1;
        var childElement = createElement('div', {
            id: this.accumulation.element.id + '_Series_' + 0 + '_DataLabel_' + point.index,
            styles: 'position: absolute;background-color:' + argsData.color + ';' +
                getFontStyle(dataLabel.font) + ';border:' + argsData.border.width + 'px solid ' + argsData.border.color + ';'
        });
        var textSize = isTemplate ? this.getTemplateSize(childElement, point, argsData) :
            measureText(point.label, dataLabel.font);
        textSize.height += 4;
        textSize.width += 4;
        this.getDataLabelPosition(point, point.midAngle, dataLabel, textSize, points, datalabelGroup, id);
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
                var path = this.getConnectorPath(extend({}, point.labelRegion, null, true), point.midAngle, dataLabel.connectorStyle, null, point.labelAngle);
                var pathElement = this.accumulation.renderer.drawPath(new PathOption(id + 'connector_' + point.index, 'transparent', dataLabel.connectorStyle.width, dataLabel.connectorStyle.color || point.color, 1, '', path));
                datalabelGroup.appendChild(pathElement);
            }
            parent.appendChild(datalabelGroup);
        }
    };
    AccumulationDataLabel.prototype.getTemplateSize = function (element, point, argsData) {
        var clientRect;
        element = createTemplate(element, point.index, argsData.template, this.accumulation, point, this.accumulation.visibleSeries[0]);
        clientRect = measureElementRect(element);
        return { width: clientRect.width, height: clientRect.height };
    };
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
    AccumulationDataLabel.prototype.doTemplateAnimation = function (accumulation, element) {
        var series = accumulation.visibleSeries[0];
        var delay = series.animation.delay + series.animation.duration;
        if (series.animation.enable && accumulation.animateSeries) {
            templateAnimate(element, delay, 200);
        }
    };
    AccumulationDataLabel.prototype.getSaturatedColor = function (point, color) {
        var saturatedColor;
        if (this.marginValue > 1) {
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
    AccumulationDataLabel.prototype.getLabelBackground = function (point) {
        return point.labelPosition === 'Outside' ? this.accumulation.background : point.color;
    };
    AccumulationDataLabel.prototype.correctLabelRegion = function (labelRegion, textSize, padding) {
        if (padding === void 0) { padding = 4; }
        labelRegion.height -= padding;
        labelRegion.width -= padding;
        labelRegion.x += padding / 2;
        labelRegion.y += padding / 2;
        textSize.height -= padding;
        textSize.width -= padding;
    };
    AccumulationDataLabel.prototype.getModuleName = function () {
        return 'AccumulationDataLabel';
    };
    AccumulationDataLabel.prototype.destroy = function (accumulation) {
    };
    return AccumulationDataLabel;
}(PieBase));
export { AccumulationDataLabel };
