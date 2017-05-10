define(["require", "exports", "../utils/helper", "../utils/helper", "../model/constants"], function (require, exports, helper_1, helper_2, constants_1) {
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
});
