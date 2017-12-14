import { Mean, RectOption } from '../../common/utils/helper';
import { getPoint, PathOption, sum, templateAnimate } from '../../common/utils/helper';
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
        var point;
        var symbolId;
        var capId;
        var errorbar = series.errorBar;
        var errorBarCap = series.errorBar.errorBarCap;
        var border = series.border;
        var start;
        var mid;
        var end;
        var isInverted;
        var isVert;
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
        var path = '';
        var paths;
        var capDirection = '';
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
        var horSquareDev;
        var verStandardMean;
        var horStandardMean;
        var verSquareTotal;
        var horSquareTotal;
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
export { ErrorBar };
