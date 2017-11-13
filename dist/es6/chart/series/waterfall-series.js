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
import { PathOption, withInRange, subArraySum } from '../../common/utils/helper';
import { ColumnBase } from './column-base';
var WaterfallSeries = (function (_super) {
    __extends(WaterfallSeries, _super);
    function WaterfallSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
                var isSum = this.isIntermediateSum(series, point.index);
                var totalSum = this.isSumIndex(series, point.index);
                currentEndValue += isSum || totalSum === true ? 0 : point.yValue;
                originValue = (isSum === true ? intermediateOrigin : ((prevEndValue !== null && !totalSum) ? prevEndValue : origin));
                rect = this.getRectangle(point.xValue + sideBySideInfo.start, currentEndValue, point.xValue + sideBySideInfo.end, originValue, series);
                argsData = this.triggerPointRenderEvent(series, point);
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
    WaterfallSeries.prototype.isIntermediateSum = function (series, index) {
        if (series.intermediateSumIndexes !== undefined && series.intermediateSumIndexes.indexOf(index) !== -1) {
            return true;
        }
        return false;
    };
    WaterfallSeries.prototype.isSumIndex = function (series, index) {
        if (series.sumIndexes !== undefined && series.sumIndexes.indexOf(index) !== -1) {
            return true;
        }
        return false;
    };
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
    WaterfallSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    WaterfallSeries.prototype.getModuleName = function () {
        return 'WaterfallSeries';
    };
    WaterfallSeries.prototype.destroy = function (chart) {
    };
    return WaterfallSeries;
}(ColumnBase));
export { WaterfallSeries };
