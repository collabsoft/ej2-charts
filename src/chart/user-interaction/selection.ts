/**
 * Selection src file
 */
import { SvgRenderer, ChildProperty, Property } from '@syncfusion/ej2-base';
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base/util';
import { ChartLocation, Rect, RectOption, CircleOption, withInBounds, getDraggedRectLocation } from '../utils/helper';
import { SelectionMode } from '../utils/enum';
import { Chart } from '../chart';
import { Series, Points } from '../series/chart-series';
import { SeriesModel } from '../series/chart-series-model';
import { IndexesModel } from './selection-model';
import { Theme } from '../model/theme';
import { IDragCompleteEventArgs } from '../model/interface';
import { dragComplete } from '../model/constants';
/** @private */
export class Indexes extends ChildProperty<Indexes> {
    /**
     * Specifies the series index
     */
    @Property(0)
    public series: number;

    /**
     * Specifies the point index
     */
    @Property(0)
    public point: number;

}
/**
 * Selection Module handles the selection for chart.
 * @private
 */
export class Selection {

    private chart: Chart;
    private renderer: SvgRenderer;
    private isSeriesMode: boolean;
    private resizing: boolean;
    /** @private */
    public rectPoints: Rect;
    private unselected: string;
    private closeIconId: string;
    private closeIcon: Element;
    private styleId: string;
    private draggedRectGroup: string;
    private draggedRect: string;
    /** @private */
    public selectedDataIndexes: Indexes[];
    private series: Series[];
    private dragging: boolean;
    private dragRect: Rect;
    private rectGrabbing: boolean;
    private resizeMode: number;
    private legendSelectionMode: boolean;

    /**
     * Constructor for selection module.
     * @private.
     */

    constructor(chart: Chart) {
        this.chart = chart;
        this.renderer = chart.renderer;
    }
    private initPrivateVariables(chart: Chart): void {
        this.styleId = chart.element.id + '_ej2_chart_selection';
        this.unselected = chart.element.id + '_ej2_deselected';
        this.closeIconId = chart.element.id + '_ej2_drag_close';
        this.draggedRectGroup = chart.element.id + '_ej2_drag_group';
        this.draggedRect = chart.element.id + '_ej2_drag_rect';
        this.selectedDataIndexes = [];
        this.rectPoints = null;
        this.isSeriesMode = chart.selectionMode === 'Series';
    }
    /**
     * Method to select the point and series.
     * @return {void}
     * @private
     */
    public invokeSelection(chart: Chart): void {
        this.initPrivateVariables(chart);
        this.series = <Series[]>extend({}, chart.visibleSeries, null, true);
        this.seriesStyles(chart.visibleSeries);
        if (!(chart.selectionMode.indexOf('Drag') > -1)) {
            this.selectDataIndex(chart, this.concatIndexes(chart.selectedDataIndexes, this.selectedDataIndexes));
        }
    }
    private concatIndexes(userIndexes: IndexesModel[], localIndexes: Indexes[]): Indexes[] {
        return <Indexes[]>userIndexes.concat(localIndexes);
    }
    private generateStyle(series: SeriesModel): string {
        if (series) {
            return (series.selectionStyle || this.styleId + '_series_' + (<Series>series).index);
        }
        return 'undefined';
    }
    private seriesStyles(seriesCollection: Series[]): void {
        let seriesclass: string;
        let style: HTMLStyleElement = <HTMLStyleElement>document.getElementById(this.styleId);
        if (isNullOrUndefined(style)) {
            style = document.createElement('style');
            style.setAttribute('id', this.styleId);
            for (let series of seriesCollection) {
                seriesclass = series.selectionStyle || this.styleId + '_series_' + series.index;
                style.innerHTML += series.selectionStyle ? '' : '.' + seriesclass + ' { } ';
            }
            style.innerHTML += '.' + this.unselected + ' { opacity:' + (seriesCollection[0].opacity / 3) + ';} ';
            document.body.appendChild(style);
        }
    }
    private selectDataIndex(chart: Chart, indexes: Index[]): void {
        for (let index of indexes) {
            this.performSelection(index, chart, this.getElementByIndex(chart, index));
        }
    }
    private getElementByIndex(chart: Chart, index: Index): Element {
        let elementId: string = chart.element.id + '_Series_' + index.series + '_Point_' + index.point;
        elementId = (!(<Series>chart.series[index.series]).isRectSeries && (<Series>chart.series[index.series]).type !== 'Scatter' &&
                    (<Series>chart.series[index.series]).type !== 'Bubble' &&
                    (<Series>chart.series[index.series]).marker.visible) ? (elementId + '_Symbol') : elementId;
        return document.getElementById(elementId);
    }
    private getClusterElements(chart: Chart, index: Index): Element[] {
        let clusters: Element[] = [];
        for (let series of chart.visibleSeries) {
            index = new Index(series.index, index.point);
            clusters.push(this.getElementByIndex(chart, index));
        }
        return clusters;
    }
    private findElements(chart: Chart, series: SeriesModel, index: Index): Element[] {
        if (this.isSeriesMode) {
            return this.getSeriesElements(series);
        } else if (chart.selectionMode === 'Cluster') {
            return this.getClusterElements(chart, index);
        } else {
            return [this.getElementByIndex(chart, index)];
        }
    }
    /**
     * To find the selected element.
     * @return {void}
     * @private
     */
    public calculateSelectedElements(chart: Chart, event: Event): void {
        if ((<HTMLElement>event.target).id.indexOf('_Series_') > -1) {
            this.performSelection(this.indexFinder((<HTMLElement>event.target).id), chart, <Element>event.target);
        }
    }
    private performSelection(index: Index, chart: Chart, element?: Element): void {
        this.isSeriesMode = chart.selectionMode === 'Series';
        this.legendSelectionMode = false;
        switch (chart.selectionMode) {
            case 'Series':
                this.selection(chart, index, this.getSeriesElements(chart.series[index.series]));
                this.blurEffect(chart.element.id, chart.visibleSeries);
                break;
            case 'Point':
                if (!isNaN(index.point)) {
                    this.selection(chart, index, [element]);
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
                break;
            case 'Cluster':
                if (!isNaN(index.point)) {
                    this.clusterSelection(chart, <Series[]>chart.series, index);
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
                break;
        }
    }
    private selection(chart: Chart, index: Index, selectedElements: Element[]): void {
        if (!chart.isMultiSelect && (chart.selectionMode.indexOf('Drag') === -1)) {
            this.removeMultiSelectEelments(chart, this.selectedDataIndexes, index, chart.series);
        }
        let className: string = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
        if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
            this.removeStyles(selectedElements);
            this.addOrRemoveIndex(this.selectedDataIndexes, index);
        } else {
            this.applyStyles(selectedElements);
            this.addOrRemoveIndex(this.selectedDataIndexes, index, true);
        }
    }
    private clusterSelection(chart: Chart, series: Series[], index: Index): void {
        this.selection(chart, index, this.getClusterElements(chart, new Index(index.series, index.point)));
    }
    private removeMultiSelectEelments(chart: Chart, index: Index[], currentIndex: Index, seriesCollection: SeriesModel[]): void {
        let series: SeriesModel;
        for (let i: number = 0; i < index.length; i++) {
            series = seriesCollection[index[i].series];
            if ((this.isSeriesMode && !this.toEquals(index[i], currentIndex, this.isSeriesMode)) ||
                (this.chart.selectionMode === 'Cluster' && !this.toEquals(index[i], currentIndex, false)) ||
                (!this.isSeriesMode && this.toEquals(index[i], currentIndex, true) && !this.toEquals(index[i], currentIndex, false))) {
                this.removeStyles(this.findElements(chart, series, index[i]));
                index.splice(i, 1);
                i--;
            }
        }
    }
    private blurEffect(chartId: string, visibleSeries: Series[]): void {
        let visibility: boolean = this.checkVibility(this.selectedDataIndexes, this.chart.series); // legend click scenario
        for (let series of visibleSeries) {
            if (series.visible) {
                this.checkSelectionElements(document.getElementById(chartId + 'SeriesGroup' + series.index),
                                            this.generateStyle(series), visibility);
                if (!isNullOrUndefined(document.getElementById(chartId + 'SymbolGroup' + series.index))) {
                    this.checkSelectionElements(document.getElementById(chartId + 'SymbolGroup' + series.index),
                                                this.generateStyle(series), visibility);
                }
            }
        }
    }
    private checkSelectionElements(element: Element, className: string, visibility: boolean): void {
        let children: HTMLCollection | Element[] = <Element[]>(this.isSeriesMode ? [element] : element.childNodes);
        let elementClassName: string;
        let parentClassName: string;
        for (let i: number = 0; i < children.length; i++) {
            elementClassName = children[i].getAttribute('class') || '';
            parentClassName = (<Element>children[i].parentNode).getAttribute('class') || '';
            if (elementClassName.indexOf(className) === -1 &&
            parentClassName.indexOf(className) === -1 && visibility) {
                this.addSVGClass(children[i], this.unselected);
            } else {
                this.removeSVGClass(children[i], this.unselected);
            }
        }
    }
    private addSVGClass(element: Element, classname: string): void {
        let elementClassName: string = element.getAttribute('class') || '';
        elementClassName += ((elementClassName !== '') ? ' ' : '');
        if (elementClassName.indexOf(classname) === -1) {
            element.setAttribute('class', elementClassName + classname);
        }
    }
    private removeSVGClass(element: Element, classname: string): void {
        let elementClassName: string = element.getAttribute('class') || '';
        if (elementClassName.indexOf(classname) > -1) {
            element.setAttribute('class', elementClassName.replace(classname, ''));
        }
    }
    /**
     * Selected points series visibility checking on legend click
     */
    private checkVibility(selectedIndexes: Indexes[], seriesCollection: SeriesModel[]): boolean {
        let visible: boolean = false;
        let uniqueSeries: number[] = [];
        for (let index of selectedIndexes) {
            if (uniqueSeries.indexOf(index.series) === -1) {
                uniqueSeries.push(index.series);
            }
        }
        for (let index of uniqueSeries) {
            if (seriesCollection[index].visible) {
                visible = true;
                break;
            }
        }
        return visible;
    }
    private applyStyles(elements: Element[]): void {
        for (let element of elements) {
            if (element) {
                this.removeSVGClass(<Element>element.parentNode, this.unselected);
                this.removeSVGClass(element, this.unselected);
                this.addSVGClass(element, this.getSelectionClass(element.id));
            }
        }
    }
    private getSelectionClass(id: string): string {
        return this.generateStyle(this.chart.series[this.indexFinder(id).series]);
    }
    private removeStyles(elements: Element[]): void {
        for (let element of elements) {
            if (element) {
                this.removeSVGClass(element, this.getSelectionClass(element.id));
            }
        }
    }
    private addOrRemoveIndex(indexes: Index[], index: Index, add?: boolean): void {
        for (let i: number = 0; i < indexes.length; i++) {
            if (this.toEquals(indexes[i], index, this.isSeriesMode)) {
                indexes.splice(i, 1);
                i--;
            }
        }
        if (add) { indexes.push(index); }
    }
    private toEquals(first: Index, second: Index, checkSeriesOnly: boolean): boolean {
        return ((first.series === second.series || (this.chart.selectionMode === 'Cluster' && !checkSeriesOnly))
        && (checkSeriesOnly || (first.point === second.point)));
    }
    /**
     * To redraw the selected points.
     * @return {void}
     * @private
     */
    public redrawSelection(chart: Chart, oldMode: SelectionMode): void {
        this.isSeriesMode = oldMode === 'Series';
        let selectedDataIndexes: Indexes[] = <Indexes[]>extend([], this.selectedDataIndexes, null, true);
        this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        this.blurEffect(chart.element.id, chart.visibleSeries);
        this.selectDataIndex(chart, selectedDataIndexes);
    }
    /** @private */
    public legendSelection(chart: Chart, series: number): void {
        let seriesStyle: string = this.generateStyle(chart.visibleSeries[series]);
        let selectedElements: HTMLCollection = document.getElementsByClassName(seriesStyle);
        this.isSeriesMode = chart.selectionMode === 'Series';
        let isBlurEffectNeeded: boolean = true;
        if (selectedElements.length > 0 ) {
            let elements: Element[] = [];
            for (let i: number = 0; i < selectedElements.length; i++) {
                elements.push(selectedElements[i]);
            }
            this.removeStyles(elements);
            this.isSeriesMode = true;
            this.addOrRemoveIndex(this.selectedDataIndexes, new Index(series, NaN));
            for (let series of chart.visibleSeries) {
                seriesStyle = this.generateStyle(series);
                if (document.getElementsByClassName(seriesStyle).length > 0) {
                    for (let element of elements) {
                        this.checkSelectionElements(element, seriesStyle, true);
                    }
                    isBlurEffectNeeded = false;
                    break;
                }
            }
            if (isBlurEffectNeeded) {
                this.isSeriesMode = chart.selectionMode === 'Series' || this.legendSelectionMode;
                this.blurEffect(chart.element.id, chart.visibleSeries);
            }
        } else {
            let seriesElements: Element[] = this.getSeriesElements(chart.visibleSeries[series]);
            for ( let seriesElement of seriesElements) {
                this.checkSelectionElements(seriesElement, seriesStyle, false);
            }
            this.isSeriesMode = true;
            this.legendSelectionMode = true;
            isBlurEffectNeeded = this.selectedDataIndexes.length === 0;
            this.selection(chart, new Index(series, NaN), seriesElements);
            if (isBlurEffectNeeded) {
                this.blurEffect(chart.element.id, chart.visibleSeries);
            }
        }
    }
    private getSeriesElements(series: SeriesModel): Element[] {
        let seriesElements: Element[] = [(<Series>series).seriesElement];
        if (series.marker.visible && !(<Series>series).isRectSeries) {
            seriesElements.push((<Series>series).symbolElement);
        }
        return seriesElements;
    }
    private indexFinder(id: string): Index {
        let ids: string[] = ['NaN', 'NaN'];
        if (id.indexOf('SeriesGroup') > -1) {
            ids = id.split('SeriesGroup');
            ids[0] = ids[1];
        } else if (id.indexOf('SymbolGroup') > -1) {
            ids = id.split('SymbolGroup');
            ids[0] = ids[1];
        } else if (id.indexOf('_Point_') > -1) {
            ids = id.split('_Series_')[1].split('_Point_');
        } else if (id.indexOf('_Series_') > -1) {
            ids[0] = id.split('_Series_')[1];
        }
        return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
    }
    /**
     * Drag selection that returns the selected data.
     * @return {void}
     * @private
     */
    public calculateDragSelectedElements(chart: Chart, dragRect: Rect): void {
        this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        let rect: Rect = new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
        let axisOffset: ChartLocation = new ChartLocation(chart.chartAxisLayoutPanel.seriesClipRect.x,
                                                          chart.chartAxisLayoutPanel.seriesClipRect.y);
        this.removeOffset(rect, axisOffset);
        let points: Points[];
        let index: Index;
        let selectedPointValues: {x: string, y: number}[] = [];
        let selectedSeriesValues: {x: string, y: number}[][] = [];
        this.isSeriesMode = false;
        for (let series of chart.visibleSeries) {
            if (series.visible) {
                points = (<Series>series).points;
                selectedPointValues = [];
                let xAxisOffset: number;
                let yAxisOffset: number;
                if (series.type.indexOf('Bar') !== -1) {
                   xAxisOffset = series.xAxis.rect.y - axisOffset.y;
                   yAxisOffset = series.yAxis.rect.x - axisOffset.x;
                } else {
                   xAxisOffset = series.xAxis.rect.x - axisOffset.x;
                   yAxisOffset = series.yAxis.rect.y - axisOffset.y;
                }
                for (let j: number = 0; j < points.length; j++) {
                    if (points[j].symbolLocation && withInBounds(points[j].symbolLocation.x + xAxisOffset,
                                                                 points[j].symbolLocation.y + yAxisOffset, rect)) {
                        index = new Index((<Series>series).index, points[j].index);
                        this.selection(chart, index, this.findElements(chart, series, index));
                        selectedPointValues.push({x: points[j].xValue.toString(), y: points[j].yValue });
                    }
                }
                selectedSeriesValues.push(selectedPointValues);
            }
        }
        this.blurEffect(chart.element.id, chart.visibleSeries);
        this.rectPoints = new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
        this.createCloseButton((dragRect.x + dragRect.width), dragRect.y);
        let args: IDragCompleteEventArgs = {
            name: dragComplete,
            selectedDataValues: selectedSeriesValues,
            cancel: false
        };
        chart.trigger(dragComplete, args);
    }
    private removeOffset(rect: Rect, clip: ChartLocation): void {
        rect.x -= clip.x;
        rect.y -= clip.y;
    }
    /**
     * Method to draw dragging rect.
     * @return {void}
     * @private
     */
    public drawDraggingRect(chart: Chart, dragRect: Rect): void {
        let cartesianLayout: Rect = chart.chartAxisLayoutPanel.seriesClipRect;
        switch (chart.selectionMode) {
            case 'DragX':
                dragRect.y = cartesianLayout.y;
                dragRect.height = cartesianLayout.height;
                break;
            case 'DragY':
                dragRect.x = cartesianLayout.x;
                dragRect.width = cartesianLayout.width;
                break;
        }
        let element: Element = document.getElementById(this.draggedRect);
        if (this.closeIcon && this.closeIcon.parentNode) { remove(this.closeIcon); }
        if (element) {
            this.setAttributes(element, dragRect);
        } else {
            let dragGroup: Element = this.renderer.createGroup({ id: this.draggedRectGroup });
            chart.svgObject.appendChild(dragGroup);
            element = this.renderer.drawRectangle(new RectOption(
                this.draggedRect, Theme.selectionRectFill, { color: Theme.selectionRectStroke, width: 1 }, 1, dragRect));
            element.setAttribute('style', 'cursor:move;');
            dragGroup.appendChild(element);
        }
    }
    private createCloseButton(x: number, y: number): void {
        let closeIcon: Element = this.renderer.createGroup({
            id: this.closeIconId,
            style: 'cursor:pointer; visibility: visible;'
        });
        closeIcon.appendChild(this.renderer.drawCircle(
            new CircleOption(this.closeIconId + '_circle', '#FFFFFF', { color: Theme.selectionRectStroke, width: 1 }, 1, x, y, 10, )));
        let direction: string = 'M ' + (x - 4) + ' ' + (y - 4) + ' L ' + (x + 4) + ' ' + (y + 4) + ' M ' + (x - 4) + ' ' + (y + 4) +
            ' L ' + (x + 4) + ' ' + (y - 4);
        closeIcon.appendChild(this.renderer.drawPath({
            id: this.closeIconId + '_cross', d: direction, stroke: Theme.selectionRectStroke,
            'stroke-width': 2, fill: Theme.selectionRectStroke
        }));
        this.closeIcon = closeIcon;
        document.getElementById(this.draggedRectGroup).appendChild(closeIcon);
    }
    /**
     * Method to remove dragged element.
     * @return {void}
     * @private
     */

    public removeDraggedElements(chart: Chart, event: Event): void {
        if (((<HTMLElement>event.target).id.indexOf(this.closeIconId) > -1) && (event.type.indexOf('move') === -1)) {
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            this.blurEffect(chart.element.id, chart.visibleSeries);
            remove(document.getElementById(this.draggedRectGroup));
            this.changeCursorStyle(false, chart.svgObject, 'auto');
            this.rectPoints = null;
        }
    }
    /**
     * Method to resize the drag rect.
     * @return {void}
     * @private
     */
    public resizingSelectionRect(chart: Chart, location: ChartLocation, tapped?: boolean): void {
        let rect: Rect = new Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
        let resize: boolean = this.findResizeMode(chart.svgObject, rect, location);
        if (this.resizing) {
            rect = getDraggedRectLocation(rect.x, rect.y, (rect.x + rect.width), (rect.y + rect.height),
                                          chart.chartAxisLayoutPanel.seriesClipRect);
            this.drawDraggingRect(chart, rect);
            this.dragRect = rect;
        }
        if (tapped) {
            this.resizing = resize;
        }

    }
    private findResizeMode(chartSvgObject: Element, rect: Rect, location: ChartLocation): boolean {
        let cursorStyle: string = 'se-resize';
        let resize: boolean = false;
        if (!this.resizing) {
            let resizeEdges: Rect[] = [new Rect(rect.x, (rect.y - 10), rect.width - 5, 20), // top
            new Rect((rect.x - 10), rect.y, 20, rect.height), //left
            new Rect(rect.x, (rect.y + rect.height - 10), rect.width - 10, 20), //bottom
            new Rect((rect.x + rect.width - 10), rect.y + 5, 20, rect.height - 15), //right
            new Rect((rect.x + rect.width - 10), (rect.y + rect.height - 10), 20, 20)]; //corner
            for (let i: number = 0; i < resizeEdges.length; i++) {
                if (withInBounds(location.x, location.y, resizeEdges[i])) {
                    cursorStyle = (i === 4) ? cursorStyle : (i % 2 === 0) ? 'ns-resize' : 'ew-resize';
                    resize = true;
                    this.resizeMode = i;
                    break;
                }
            }
        } else {
            let x: number = rect.x;
            let y: number = rect.y;
            let width: number = (location.x - x);
            let height: number = (location.y - y);
            switch (this.resizeMode) {
                case 0:
                    height = Math.abs((rect.height + rect.y) - location.y);
                    rect.y = Math.min((rect.height + rect.y), location.y);
                    rect.height = height;
                    break;
                case 1:
                    width = Math.abs((rect.width + rect.x) - location.x);
                    rect.x = Math.min((rect.width + rect.x), location.x);
                    rect.width = width;
                    break;
                case 2:
                    rect.height = Math.abs(height);
                    rect.y = Math.min(location.y, y);
                    break;
                case 3:
                    rect.width = Math.abs(width);
                    rect.x = Math.min(location.x, x);
                    break;
                case 4:
                    rect.width = Math.abs(width);
                    rect.height = Math.abs(height);
                    rect.x = Math.min(location.x, x);
                    rect.y = Math.min(location.y, y);
                    break;
            }
        }
        this.changeCursorStyle(resize, document.getElementById(this.draggedRect), cursorStyle);
        this.changeCursorStyle(resize, chartSvgObject, cursorStyle);
        return resize;
    }
    private changeCursorStyle(isResize: boolean, rectelement: Element, cursorStyle: string): void {
        cursorStyle = isResize ? cursorStyle : (this.chart.svgObject === rectelement) ? 'auto' : 'move';
        rectelement.setAttribute('style', 'cursor:' + cursorStyle + ';');
    }
    private removeSelectedElements(chart: Chart, index: Index[], seriesCollection: SeriesModel[]): void {
        index.splice(0, index.length);
        let seriesElements: Element[];
        for (let series of seriesCollection) {
            seriesElements = this.getSeriesElements(series);
            this.removeStyles(seriesElements);
            for (let seriesElement of seriesElements) {
                this.removeStyles(this.getChildren(seriesElement));
            }
        }
    }
    private getChildren(parent: Element): Element[] {
        let children: Element[] = [];
        for (let i: number = 0; i < parent.childNodes.length; i++) {
            if ((<Element>parent.childNodes[i]).tagName !== 'defs') {
                children.push((<Element>parent.childNodes[i]));
            }
        }
        return children;
    }
    private setAttributes(ele: Element, object: Object): void {
        let keys: string[] = Object.keys(object);
        for (let key of keys) {
            ele.setAttribute(key, object[key]);
        }
    }
    /**
     * Method to move the dragged rect.
     * @return {void}
     * @private
     */
    public draggedRectMoved(chart: Chart, grabbedPoint: Rect, doDrawing?: boolean): void {
        let rect: Rect = new Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
        rect.x -= (grabbedPoint.x - chart.mouseX);
        rect.y -= (grabbedPoint.y - chart.mouseY);
        rect = getDraggedRectLocation(rect.x, rect.y, rect.x + rect.width, rect.height + rect.y, chart.chartAxisLayoutPanel.seriesClipRect);
        if (doDrawing) {
            this.drawDraggingRect(chart, rect);
        } else {
            this.calculateDragSelectedElements(chart, rect);
        }
    }
    /**
     * To complete the selection.
     * @return {void}
     * @private
     */
    public completeSelection(chart: Chart, e: Event): void {
        if ((this.dragging || this.resizing) && this.dragRect.width && this.dragRect.height) {
            this.calculateDragSelectedElements(chart, this.dragRect);
        } else if (this.rectGrabbing && this.rectPoints.width && this.rectPoints.height) {
            this.draggedRectMoved(chart, this.dragRect);
        }
        this.dragging = false;
        this.rectGrabbing = false;
        this.resizing = false;
        this.removeDraggedElements(chart, e);
    }
    private getDragRect(chart: Chart, seriesClipRect: Rect): Rect {
        return getDraggedRectLocation(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY, seriesClipRect);
    }

    /** @private */
    public dragStart(chart: Chart, seriesClipRect: Rect, mouseDownX: number, mouseDownY: number, event: Event): void {
        this.dragging = (chart.selectionMode.indexOf('Drag') > - 1) && (chart.isDoubleTap || !chart.isTouch);
        if (this.dragging) {
            this.dragRect = new Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
            if (chart.mouseDownX < seriesClipRect.x || chart.mouseDownX > (seriesClipRect.x + seriesClipRect.width) ||
                chart.mouseDownY < seriesClipRect.y || chart.mouseDownY > (seriesClipRect.y + seriesClipRect.height) ) {
                this.dragging = false;
            }
        }
        if (this.rectPoints) {
            this.dragRect = new Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
            this.resizingSelectionRect(chart, new ChartLocation(mouseDownX, mouseDownY), true);
            this.rectGrabbing = withInBounds(mouseDownX, mouseDownY, this.rectPoints);
        }
    }
    /** @private */
    public mouseMove(chart: Chart, event: Event): void {
        let insideMoving: boolean = withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect);
        if (insideMoving) {
            if (this.rectGrabbing && !this.resizing) {
                this.draggedRectMoved(chart, this.dragRect, true);
            } else if (this.dragging && !this.resizing) {
                this.dragRect = this.getDragRect(chart, chart.chartAxisLayoutPanel.seriesClipRect);
                this.drawDraggingRect(chart, this.dragRect);
            }
            if (this.rectPoints) {
                this.resizingSelectionRect(chart, new ChartLocation(chart.mouseX, chart.mouseY));
            }
        } else {
            this.completeSelection(chart, event);
        }
    }
    /**
     * Get module name.
     * @private
     */
    public getModuleName(): string {
        return 'Selection';
    }
    /**
     * To destroy the selection.
     * @return {void}
     * @private
     */
    public destroy(chart: Chart): void {
        // Destroy method performed here
    }
}
 /**
  * @hidden
  */
export class Index {
    public series: number;
    public point: number;
    constructor(seriesIndex: number, pointIndex?: number) {
        this.series = seriesIndex;
        this.point = pointIndex;
    }
}