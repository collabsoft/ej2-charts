import { ChartLocation, TextOption, RectOption, isCollide, markerAnimate } from '../../common/utils/helper';
import { getLabelText, measureText, convertHexToColor, calculateRect, textElement, colorNameToHex } from '../../common/utils/helper';
import { textRender } from '../../common/model/constants';
import { createTemplate, getFontStyle, getElement, measureElementRect, templateAnimate, withIn } from '../../common/utils/helper';
import { createElement } from '@syncfusion/ej2-base';
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
        var rect;
        var rgbValue;
        var contrast;
        var argsData;
        var border;
        var textSize;
        this.yAxisInversed = series.yAxis.isInversed;
        var element = createElement('div', {
            id: chart.element.id + '_Series_' + series.index + '_DataLabelCollections'
        });
        series.points.map(function (point, index) {
            _this.margin = dataLabel.margin;
            var labelText = [];
            var labelLength;
            border = { width: dataLabel.border.width, color: dataLabel.border.color };
            if (point.symbolLocation) {
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
                        _this.markerHeight = series.type === 'Bubble' ? (point.region.height / 2) : _this.markerHeight;
                        if (argsData.template !== null) {
                            _this.createDataLabelTemplate(element, series, dataLabel, point, argsData, i);
                        }
                        else {
                            textSize = measureText(argsData.text, dataLabel.font);
                            rect = _this.calculateTextPosition(point, series, textSize, dataLabel, i);
                            if (!isCollide(rect, chart.dataLabelCollections)) {
                                chart.dataLabelCollections.push(rect);
                                if (_this.isShape) {
                                    series.shapeElement.appendChild(chart.renderer.drawRectangle(new RectOption(_this.commonId + index + '_TextShape_' + i, argsData.color, argsData.border, dataLabel.opacity, rect, dataLabel.rx, dataLabel.ry)));
                                }
                                rgbValue = convertHexToColor(colorNameToHex(_this.fontBackground));
                                contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
                                textElement(new TextOption(_this.commonId + index + '_Text_' + i, rect.x + _this.margin.left + textSize.width / 2, rect.y + _this.margin.top + textSize.height * 3 / 4, 'middle', argsData.text, 'rotate(0,' + (rect.x) + ',' + (rect.y) + ')', 'auto'), dataLabel.font, dataLabel.font.color || (contrast >= 128 ? 'black' : 'white'), series.textElement);
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
    DataLabel.prototype.createDataLabelTemplate = function (parentElement, series, dataLabel, point, data, labelIndex) {
        this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
        var childElement = createTemplate(createElement('div', {
            id: this.chart.element.id + '_Series_' + series.index + '_DataLabel_'
                + point.index + (labelIndex ? ('_' + labelIndex) : ''),
            styles: 'position: absolute;background-color:' + data.color + ';' +
                getFontStyle(dataLabel.font) + ';border:' + data.border.width + 'px solid ' + data.border.color + ';'
        }), point.index, data.template, this.chart, point, series);
        var elementRect = measureElementRect(childElement);
        var rect = this.calculateTextPosition(point, series, { width: elementRect.width, height: elementRect.height }, dataLabel, labelIndex);
        childElement.style.left = (series.clipRect.x + rect.x) + 'px';
        childElement.style.top = (series.clipRect.y + rect.y) + 'px';
        var rgbValue = convertHexToColor(colorNameToHex(this.fontBackground));
        childElement.style.color = dataLabel.font.color ||
            ((Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000)) >= 128 ? 'black' : 'white');
        if (childElement.childElementCount && !isCollide(rect, this.chart.dataLabelCollections)
            && (point.yValue === undefined || withIn(point.yValue, series.yAxis.visibleRange))
            && withIn(point.xValue, series.xAxis.visibleRange)) {
            this.chart.dataLabelCollections.push(rect);
            parentElement.appendChild(childElement);
            if (series.animation.enable && this.chart.animateSeries) {
                this.doDataLabelAnimation(series, childElement);
            }
        }
    };
    DataLabel.prototype.calculateTextPosition = function (point, series, textSize, dataLabel, labelIndex) {
        var location = new ChartLocation(point.symbolLocation.x, point.symbolLocation.y);
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
                this.calculateRectPosition(location.y, point.region, point.yValue < 0 !== series.yAxis.isInversed, dataLabel.position, series, textSize, labelIndex);
        }
        else {
            this.locationY = location.y;
            var alignmentValue = textSize.width + this.borderWidth + this.margin.left + this.margin.right - padding;
            location.x = dataLabel.position === 'Auto' ? location.x :
                this.calculateAlignment(alignmentValue, location.x, dataLabel.alignment, point.yValue < 0);
            location.x = this.calculateRectPosition(location.x, point.region, point.yValue < 0 !== series.yAxis.isInversed, dataLabel.position, series, textSize, labelIndex);
        }
        rect = calculateRect(location, textSize, this.margin);
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
    DataLabel.prototype.calculateRectPosition = function (y, rect, isMinus, position, series, textSize, labelIndex) {
        var padding = 5;
        var margin = this.margin;
        var textLength = !this.chart.requireInvertedAxis ? textSize.height : textSize.width;
        var extraSpace = this.borderWidth + textLength / 2 + padding;
        if (series.type.indexOf('Stacking') > -1) {
            position = position === 'Outer' ? 'Top' : position;
        }
        else if (series.type.indexOf('Range') > -1) {
            position = (position === 'Outer' || position === 'Top') ? position : 'Auto';
        }
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
                y = this.calculateRectActualPosition(y, rect, isMinus, series, textSize, labelIndex);
                break;
            default:
                if (series.type === 'RangeColumn') {
                    if (labelIndex === 0) {
                        y = position !== 'Outer' !== this.yAxisInversed ? y + extraSpace + margin.bottom :
                            y - extraSpace - margin.top;
                    }
                    else {
                        var height = this.yAxisInversed ? -rect.height : rect.height;
                        y = position !== 'Outer' !== this.yAxisInversed ? y + height - extraSpace - margin.bottom :
                            y + height + extraSpace + margin.top;
                    }
                }
                else {
                    if ((isMinus && position === 'Top') || (!isMinus && position === 'Outer')) {
                        y = !this.chart.requireInvertedAxis ? y - extraSpace - margin.bottom : y + extraSpace + margin.right;
                    }
                    else {
                        y = !this.chart.requireInvertedAxis ? y + extraSpace + margin.top : y - extraSpace - margin.left;
                    }
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
        if ((series.type.indexOf('Area') > -1) && this.yAxisInversed && series.marker.dataLabel.position !== 'Auto') {
            position = position === 'Top' ? 'Bottom' : position === 'Bottom' ? 'Top' : position;
        }
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
    DataLabel.prototype.calculateRectActualPosition = function (y, rect, isMinus, series, size, labelIndex) {
        var location;
        var labelRect;
        var isOverLap = true;
        var position = 0;
        var collection = this.chart.dataLabelCollections;
        var finalPosition = series.type === 'RangeColumn' ? 2 : 4;
        while (isOverLap && position < finalPosition) {
            location = this.calculateRectPosition(y, rect, isMinus, this.getPosition(position), series, size, labelIndex);
            if (!this.chart.requireInvertedAxis) {
                labelRect = calculateRect(new ChartLocation(this.locationX, location), size, this.margin);
                isOverLap = labelRect.y < 0 || isCollide(labelRect, collection) || labelRect.y > series.clipRect.height;
            }
            else {
                labelRect = calculateRect(new ChartLocation(location, this.locationY), size, this.margin);
                isOverLap = labelRect.x < 0 || isCollide(labelRect, collection) || labelRect.x > series.clipRect.width;
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
            yLocation = this.calculatePathPosition(y, this.getPosition(positionIndex), series, point, size);
            labelRect = calculateRect(new ChartLocation(this.locationX, yLocation), size, this.margin);
            isOverLap = labelRect.y < 0 || isCollide(labelRect, collection)
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
    DataLabel.prototype.doDataLabelAnimation = function (series, element) {
        var shapeElements = series.shapeElement.childNodes;
        var textNode = series.textElement.childNodes;
        var delay = series.animation.delay + series.animation.duration;
        var location;
        var length = element ? 1 : textNode.length;
        for (var i = 0; i < length; i++) {
            if (element) {
                templateAnimate(element, delay, 200);
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
    DataLabel.prototype.getModuleName = function () {
        return 'DataLabel';
    };
    DataLabel.prototype.destroy = function (chart) {
    };
    return DataLabel;
}());
export { DataLabel };
