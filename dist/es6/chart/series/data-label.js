import { ChartLocation, Rect, TextOption, RectOption, isCollide, markerAnimate } from '../../common/utils/helper';
import { getLabelText, measureText, convertHexToColor, calculateRect, textElement, colorNameToHex } from '../../common/utils/helper';
import { textRender } from '../../common/model/constants';
import { createTemplate, getFontStyle, getElement, measureElementRect, templateAnimate, withIn, CoefficientToVector, valueToPolarCoefficient } from '../../common/utils/helper';
import { createElement } from '@syncfusion/ej2-base';
import { getPoint } from '../../common/utils/helper';
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
    DataLabel.prototype.updateLabelLocation = function (position, location, extraSpace, margin, rect, top, inside) {
        if (inside === void 0) { inside = false; }
        if (!this.inverted) {
            if (top) {
                location = (position === 'Outer' && !inside) ? location - extraSpace - margin.bottom : location + extraSpace + margin.top;
            }
            else {
                location = (position === 'Outer' && !inside) ? location + rect.height + extraSpace + margin.top :
                    location + rect.height - extraSpace - margin.bottom;
            }
        }
        else {
            if (top) {
                location = (position === 'Outer' && !inside) ? location + extraSpace + margin.left : location - extraSpace - margin.right;
            }
            else {
                location = (position === 'Outer' && !inside) ? location - rect.width - extraSpace - margin.right :
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
export { DataLabel };
