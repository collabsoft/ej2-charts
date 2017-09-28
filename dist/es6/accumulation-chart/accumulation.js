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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, Component, Complex, Collection, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { Internationalization, Event, Browser, EventHandler, Touch } from '@syncfusion/ej2-base';
import { remove, extend, isNullOrUndefined, createElement } from '@syncfusion/ej2-base';
import { Font, Margin, Border, Indexes } from '../common/model/base';
import { AccumulationSeries, AccumulationTooltipSettings } from './model/acc-base';
import { Theme } from '../common/model/theme';
import { load, chartMouseClick, chartMouseDown } from '../common/model/constants';
import { chartMouseLeave, chartMouseMove, chartMouseUp, resized } from '../common/model/constants';
import { LegendSettings } from '../common/legend/legend';
import { Rect, Size, subtractRect, measureText, RectOption, textTrim, showTooltip } from '../common/utils/helper';
import { textElement, TextOption, createSvg, calculateSize, removeElement, getElement } from '../common/utils/helper';
import { Data } from '../common/model/data';
import { PieSeries } from './renderer/pie-series';
import { AccumulationAnnotationSettings } from './model/acc-base';
var AccumulationChart = (function (_super) {
    __extends(AccumulationChart, _super);
    function AccumulationChart(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.explodeDistance = 0;
        _this.type = 'Pie';
        return _this;
    }
    AccumulationChart.prototype.preRender = function () {
        this.unWireEvents();
        this.setCulture();
        this.animateSeries = true;
        calculateSize(this);
        this.wireEvents();
    };
    AccumulationChart.prototype.render = function () {
        this.trigger(load, { accumulation: this });
        this.calculateAreaType();
        this.calculateVisibleSeries();
        this.processData();
    };
    AccumulationChart.prototype.unWireEvents = function () {
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var move = Browser.touchMoveEvent;
        var stop = Browser.touchEndEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        EventHandler.remove(this.element, move, this.accumulationMouseMove);
        EventHandler.remove(this.element, stop, this.accumulationMouseEnd);
        EventHandler.remove(this.element, start, this.accumulationMouseStart);
        EventHandler.remove(this.element, 'click', this.accumulationOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.accumulationRightClick);
        EventHandler.remove(this.element, cancel, this.accumulationMouseLeave);
        EventHandler.remove(window, (Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.accumulationResize);
    };
    AccumulationChart.prototype.wireEvents = function () {
        var isIE11Pointer = Browser.isPointer;
        var start = Browser.touchStartEvent;
        var stop = Browser.touchEndEvent;
        var move = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        EventHandler.add(this.element, move, this.accumulationMouseMove, this);
        EventHandler.add(this.element, stop, this.accumulationMouseEnd, this);
        EventHandler.add(this.element, start, this.accumulationMouseStart, this);
        EventHandler.add(this.element, 'click', this.accumulationOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.accumulationRightClick, this);
        EventHandler.add(this.element, cancel, this.accumulationMouseLeave, this);
        EventHandler.add(window, (Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.accumulationResize, this);
        new Touch(this.element);
        this.setStyle(this.element);
    };
    AccumulationChart.prototype.setMouseXY = function (e) {
        var pageX;
        var pageY;
        if (e.type.indexOf('touch') > -1) {
            this.isTouch = true;
            var touchArg = e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.mouseY = pageY;
        this.mouseX = pageX;
    };
    AccumulationChart.prototype.accumulationMouseEnd = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseUp, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            if (this.accumulationTooltipModule && this.accumulationTooltipModule.tooltip) {
                this.pieSeriesModule.getTooltipPoint(e, this, this.mouseX, this.mouseY);
                this.accumulationTooltipModule.fadeOutTooltip();
            }
            if (this.accumulationDataLabelModule && this.visibleSeries[0].dataLabel.visible) {
                this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY, this.isTouch);
            }
            if (this.accumulationLegendModule && this.legendSettings.visible) {
                this.accumulationLegendModule.move(e, this.mouseX, this.mouseY, this.isTouch);
            }
        }
        return false;
    };
    AccumulationChart.prototype.accumulationMouseStart = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseDown, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        return false;
    };
    AccumulationChart.prototype.accumulationResize = function (e) {
        var _this = this;
        var args = {
            accumulation: this,
            previousSize: new Size(this.availableSize.width, this.availableSize.height),
            name: resized,
            currentSize: new Size(0, 0)
        };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(function () {
            args.currentSize = _this.availableSize;
            _this.trigger(resized, args);
            _this.refreshSeries();
            _this.refreshChart();
        }, 500);
        return false;
    };
    AccumulationChart.prototype.setStyle = function (element) {
        element.style.touchAction = 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
    };
    AccumulationChart.prototype.accumulationMouseMove = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseMove, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.move(e, this.mouseX, this.mouseY);
        }
        if (this.accumulationDataLabelModule && this.visibleSeries[0] && this.visibleSeries[0].dataLabel.visible) {
            this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY);
        }
        if (this.accumulationTooltipModule && this.pieSeriesModule && this.tooltip.enable && !this.isTouch) {
            this.pieSeriesModule.getTooltipPoint(e, this, this.mouseX, this.mouseY);
        }
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
        }
        return false;
    };
    AccumulationChart.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((event.target.textContent.indexOf('...') > -1) && (targetId === (this.element.id + '_title'))) {
            showTooltip(this.title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    AccumulationChart.prototype.accumulationOnMouseClick = function (e) {
        this.setMouseXY(e);
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.click(e);
        }
        if (this.selectionMode !== 'None' && this.accumulationSelectionModule) {
            this.accumulationSelectionModule.calculateSelectedElements(this, e);
        }
        if (this.visibleSeries[0].explode) {
            this.pieSeriesModule.processExplode(e);
        }
        this.trigger(chartMouseClick, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        return false;
    };
    AccumulationChart.prototype.accumulationRightClick = function (event) {
        if (event.buttons === 2 || event.pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    };
    AccumulationChart.prototype.accumulationMouseLeave = function (e) {
        this.setMouseXY(e);
        this.trigger(chartMouseLeave, { target: e.target.id, x: this.mouseX, y: this.mouseY });
        if (this.accumulationTooltipModule && this.tooltip.enable) {
            this.accumulationTooltipModule.tooltip.close();
        }
        return false;
    };
    AccumulationChart.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    AccumulationChart.prototype.createPieSvg = function () {
        this.removeSvg();
        createSvg(this);
    };
    AccumulationChart.prototype.removeSvg = function () {
        removeElement(this.element.id + '_Secondary_Element');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        removeElement('EJ2_legend_tooltip');
        removeElement('EJ2_datalabel_tooltip');
    };
    AccumulationChart.prototype.createSecondaryElement = function () {
        this.element.appendChild(createElement('div', {
            id: this.element.id + '_Secondary_Element',
            styles: 'position: relative'
        }));
    };
    AccumulationChart.prototype.calculateAreaType = function () {
        var series = this.series[0];
        if (series) {
            this.type = series.type;
        }
        this.pieSeriesModule = new PieSeries();
    };
    AccumulationChart.prototype.calculateVisibleSeries = function () {
        this.visibleSeries = [];
        for (var i = 0, length_1 = this.series.length; i < length_1; i++) {
            this.series[i].index = i;
            if (this.series[i].type === this.type && this.visibleSeries.length === 0) {
                this.visibleSeries.push(this.series[i]);
                break;
            }
        }
    };
    AccumulationChart.prototype.processData = function () {
        this.seriesCounts = 0;
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            series.dataModule = new Data(series.dataSource, series.query);
            series.refreshDataManager(this);
        }
    };
    AccumulationChart.prototype.refreshChart = function () {
        this.doGrouppingProcess();
        this.createPieSvg();
        this.calculateBounds();
        this.renderElements();
    };
    AccumulationChart.prototype.doGrouppingProcess = function () {
        var series = this.visibleSeries[0];
        if (!isNullOrUndefined(series.resultData) && ((!isNullOrUndefined(series.lastGroupTo) &&
            series.lastGroupTo !== series.groupTo))) {
            series.getPoints(series.resultData, this);
        }
    };
    AccumulationChart.prototype.calculateBounds = function () {
        this.initialClipRect = new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height);
        subtractRect(this.initialClipRect, new Rect(0, measureText(this.title, this.titleStyle).height, this.margin.right + this.margin.left, this.margin.bottom + this.margin.top));
        this.calculateLegendBounds();
    };
    AccumulationChart.prototype.calculateLegendBounds = function () {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        this.accumulationLegendModule.getLegendOptions(this, this.visibleSeries);
        this.accumulationLegendModule.calculateLegendBounds(this.initialClipRect, this.availableSize);
    };
    AccumulationChart.prototype.renderElements = function () {
        this.renderBorder();
        this.renderTitle();
        this.createSecondaryElement();
        this.renderSeries();
        this.renderLegend();
        this.element.appendChild(this.svgObject);
        this.processSelection();
        this.processExplode();
        this.renderAnnotation();
        this.trigger('loaded', { accumulation: this });
        this.animateSeries = false;
    };
    AccumulationChart.prototype.renderAnnotation = function () {
        if (this.annotationModule) {
            this.annotationModule.renderAnnotations(getElement(this.element.id + '_Secondary_Element'));
        }
    };
    AccumulationChart.prototype.processExplode = function () {
        if (!this.visibleSeries[0].explode) {
            return null;
        }
        this.pieSeriesModule.invokeExplode();
    };
    AccumulationChart.prototype.renderSeries = function () {
        this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_SeriesCollection' }));
        for (var i = 0, length_2 = this.visibleSeries.length; i < length_2; i++) {
            if (this.visibleSeries[i].visible) {
                this.pieSeriesModule.initProperties(this, this.visibleSeries[i]);
                this.visibleSeries[i].renderSeries(this);
            }
        }
    };
    AccumulationChart.prototype.renderBorder = function () {
        var padding = this.border.width;
        this.svgObject.appendChild(this.renderer.drawRectangle(new RectOption(this.element.id + '_border', this.background, this.border, 1, new Rect(padding / 2, padding / 2, this.availableSize.width - padding, this.availableSize.height - padding))));
    };
    AccumulationChart.prototype.renderLegend = function () {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        if (this.accumulationLegendModule.legendCollections.length) {
            this.accumulationLegendModule.getSmartLegendLocation(this.visibleSeries[0].labelBound, this.accumulationLegendModule.legendBounds, this.margin);
            this.accumulationLegendModule.renderLegend(this, this.legendSettings, this.accumulationLegendModule.legendBounds);
        }
    };
    AccumulationChart.prototype.processSelection = function () {
        if (!this.accumulationSelectionModule || this.selectionMode === 'None') {
            return null;
        }
        var selectedDataIndexes = extend([], this.accumulationSelectionModule.selectedDataIndexes, null, true);
        this.accumulationSelectionModule.invokeSelection(this);
        if (selectedDataIndexes.length > 0) {
            this.accumulationSelectionModule.selectedDataIndexes = selectedDataIndexes;
            this.accumulationSelectionModule.redrawSelection(this, this.selectionMode);
        }
    };
    AccumulationChart.prototype.renderTitle = function () {
        if (!this.title) {
            return null;
        }
        var height = measureText(this.title, this.titleStyle).height;
        textElement(new TextOption(this.element.id + '_title', this.availableSize.width / 2, this.margin.top + (height * 3 / 4), 'middle', textTrim(this.availableSize.width, this.title, this.titleStyle), '', 'auto'), this.titleStyle, this.titleStyle.color, this.svgObject);
    };
    AccumulationChart.prototype.getSeriesElement = function () {
        return this.svgObject.getElementsByTagName('g')[0];
    };
    AccumulationChart.prototype.refreshSeries = function () {
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            this.refreshPoints(series.points);
        }
    };
    AccumulationChart.prototype.refreshPoints = function (points) {
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            point.labelRegion = null;
            point.labelVisible = true;
        }
    };
    AccumulationChart.prototype.getModuleName = function () {
        return 'accumulationchart';
    };
    AccumulationChart.prototype.destroy = function () {
        this.unWireEvents();
        _super.prototype.destroy.call(this);
        this.element.classList.remove('e-accumulationchart');
    };
    AccumulationChart.prototype.requiredModules = function () {
        var modules = [];
        var enableAnnotation = false;
        modules.push({
            member: this.type + 'Series',
            args: [this]
        });
        if (this.legendSettings.visible) {
            modules.push({
                member: 'AccumulationLegend',
                args: [this]
            });
        }
        if (this.findDatalabelVisibility()) {
            modules.push({
                member: 'AccumulationDataLabel',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'AccumulationTooltip',
                args: [this]
            });
        }
        if (this.selectionMode !== 'None') {
            modules.push({
                member: 'AccumulationSelection',
                args: [this]
            });
        }
        enableAnnotation = this.annotations.some(function (value) {
            return (value.content !== null);
        });
        if (enableAnnotation) {
            modules.push({
                member: 'Annotation',
                args: [this, this.annotations]
            });
        }
        return modules;
    };
    AccumulationChart.prototype.findDatalabelVisibility = function () {
        for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.dataLabel.visible) {
                return true;
            }
        }
        return false;
    };
    AccumulationChart.prototype.getPersistData = function () {
        return '';
    };
    AccumulationChart.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'theme':
                    this.animateSeries = true;
                    break;
            }
        }
        this.refreshSeries();
        this.refreshChart();
    };
    return AccumulationChart;
}(Component));
__decorate([
    Property(null)
], AccumulationChart.prototype, "width", void 0);
__decorate([
    Property(null)
], AccumulationChart.prototype, "height", void 0);
__decorate([
    Property(null)
], AccumulationChart.prototype, "title", void 0);
__decorate([
    Complex(Theme.chartTitleFont, Font)
], AccumulationChart.prototype, "titleStyle", void 0);
__decorate([
    Complex({}, LegendSettings)
], AccumulationChart.prototype, "legendSettings", void 0);
__decorate([
    Complex({}, AccumulationTooltipSettings)
], AccumulationChart.prototype, "tooltip", void 0);
__decorate([
    Property('None')
], AccumulationChart.prototype, "selectionMode", void 0);
__decorate([
    Property(false)
], AccumulationChart.prototype, "isMultiSelect", void 0);
__decorate([
    Collection([], Indexes)
], AccumulationChart.prototype, "selectedDataIndexes", void 0);
__decorate([
    Complex({}, Margin)
], AccumulationChart.prototype, "margin", void 0);
__decorate([
    Property(true)
], AccumulationChart.prototype, "enableSmartLabels", void 0);
__decorate([
    Complex({ color: '#DDDDDD', width: 0 }, Border)
], AccumulationChart.prototype, "border", void 0);
__decorate([
    Property(Theme.chartBackgroundColor)
], AccumulationChart.prototype, "background", void 0);
__decorate([
    Collection([{}], AccumulationSeries)
], AccumulationChart.prototype, "series", void 0);
__decorate([
    Collection([{}], AccumulationAnnotationSettings)
], AccumulationChart.prototype, "annotations", void 0);
__decorate([
    Property('Material')
], AccumulationChart.prototype, "theme", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "loaded", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "load", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "seriesRender", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "legendRender", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "textRender", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "tooltipRender", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "pointRender", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "annotationRender", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "chartMouseMove", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "chartMouseClick", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "animationComplete", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "chartMouseDown", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "chartMouseLeave", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "chartMouseUp", void 0);
__decorate([
    Event()
], AccumulationChart.prototype, "resized", void 0);
AccumulationChart = __decorate([
    NotifyPropertyChanges
], AccumulationChart);
export { AccumulationChart };
