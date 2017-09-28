import { EventHandler, Browser } from '@syncfusion/ej2-base';
import { getRectLocation, minMax, getElement, ChartLocation, Rect, RectOption, measureText } from '../../common/utils/helper';
import { Toolkit } from './zooming-toolkit';
import { Theme } from '../../common/model/theme';
import { zoomComplete } from '../../common/model/constants';
var Zoom = (function () {
    function Zoom(chart) {
        this.chart = chart;
        this.isDevice = Browser.isDevice;
        this.isPointer = Browser.isPointer;
        this.browserName = Browser.info.name;
        var zooming = chart.zoomSettings;
        this.toolkit = new Toolkit(chart);
        this.zooming = zooming;
        this.elementId = chart.element.id;
        this.zoomingRect = new Rect(0, 0, 0, 0);
        this.zoomAxes = [];
    }
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
    };
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
            if (axis.orientation === 'Horizontal') {
                if (mode !== 'Y') {
                    currentZP += Math.abs((zoomRect.x - bounds.x) / (bounds.width)) * axis.zoomFactor;
                    currentZF *= (zoomRect.width / bounds.width);
                }
            }
            else {
                if (mode !== 'X') {
                    currentZP += (1 - Math.abs((zoomRect.height + (zoomRect.y - bounds.y)) / (bounds.height))) * axis.zoomFactor;
                    currentZF *= (zoomRect.height / bounds.height);
                }
            }
            argsData = {
                cancel: false, name: zoomComplete, axis: axis, previousZoomFactor: previousZF, previousZoomPosition: previousZP,
                currentZoomFactor: currentZF, currentZoomPosition: currentZP
            };
            chart.trigger(zoomComplete, argsData);
            if (!argsData.cancel) {
                axis.zoomFactor = argsData.currentZoomFactor;
                axis.zoomPosition = argsData.currentZoomPosition;
            }
        });
        this.zoomingRect = new Rect(0, 0, 0, 0);
        this.performZoomRedraw(chart);
    };
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
            axisRange = axis.actualRange;
            if (_this.zoomAxes[index]) {
                if (!chart.delayRedraw) {
                    _this.zoomAxes[index].min = axisRange.min;
                    _this.zoomAxes[index].delta = axisRange.delta;
                }
            }
            else {
                range = {
                    actualMin: axisRange.min,
                    actualDelta: axisRange.delta,
                    min: axisRange.min,
                    delta: axisRange.delta
                };
                _this.zoomAxes[index] = range;
            }
        });
    };
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
        this.toolkitElements.setAttribute('opacity', this.isDevice ? '1' : '0.3');
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
    Zoom.prototype.applyZoomToolkit = function (chart, axes) {
        var showToolkit = false;
        var toolkitElement = getElement(this.elementId + '_Zooming_KitCollection');
        axes.forEach(function (axis) {
            showToolkit = (showToolkit || (axis.zoomFactor !== 1 || axis.zoomPosition !== 0));
        });
        if (showToolkit) {
            this.showZoomingToolkit(chart);
            this.isZoomed = true;
        }
        else {
            this.toolkit.removeTooltip();
            if (this.toolkitElements) {
                this.toolkitElements.remove();
            }
            this.isPanning = false;
            this.isZoomed = false;
        }
    };
    Zoom.prototype.zoomToolkitMove = function (e) {
        var element = this.toolkitElements;
        var opacity = +element.getAttribute('opacity');
        element.setAttribute('opacity', '1');
        return false;
    };
    Zoom.prototype.zoomToolkitLeave = function (e) {
        var element = this.toolkitElements;
        element.setAttribute('opacity', '0.3');
        return false;
    };
    Zoom.prototype.getModuleName = function () {
        return 'Zoom';
    };
    Zoom.prototype.destroy = function (chart) {
    };
    return Zoom;
}());
export { Zoom };
