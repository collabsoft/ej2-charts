/**
 * AccumulationChart Selection src file
 */
import { SvgRenderer} from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { Rect } from '../../common/utils/helper';
import { AccumulationSelectionMode } from '../model/enum';
import { AccumulationChart } from '../accumulation';
import { AccumulationSeries, indexFinder, pointByIndex, AccPoints } from '../model/acc-base';
import { AccumulationSeriesModel } from '../model/acc-base-model';
import { Indexes, Index } from '../../common/model/base';
import { BaseSelection } from '../../common/selection/selection';
/**
 * Selection Module handles the selection for chart.
 * @private
 */
export class AccumulationSelection extends BaseSelection {
    private renderer: SvgRenderer;
    /** @private */
    public rectPoints: Rect;
    public selectedDataIndexes: Indexes[];
    private series: AccumulationSeries[];

    constructor(pie: AccumulationChart) {
        super(pie);
        this.renderer = pie.renderer;
    }
    private initPrivateVariables(pie: AccumulationChart): void {
        this.styleId = pie.element.id + '_ej2_chart_selection';
        this.unselected = pie.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.rectPoints = null;
    }
    /**
     * Method to select the point and series.
     * @return {void}
     * @private
     */
    public invokeSelection(pie: AccumulationChart): void {
        this.initPrivateVariables(pie);
        this.series = <AccumulationSeries[]>extend({}, pie.visibleSeries, null, true);
        this.seriesStyles();
        this.selectDataIndex(this.concatIndexes(pie.selectedDataIndexes, this.selectedDataIndexes), pie);
    }
    private generateStyle(series: AccumulationSeriesModel): string {
        return (series.selectionStyle || this.styleId + '_series_' + (<AccumulationSeries>series).index);
    }
    private findElements(pie: AccumulationChart, series: AccumulationSeriesModel, index: Index): Element[] {
        return [this.getElementByIndex(index)];
    }
    private getElementByIndex(index: Index): Element {
        let elementId: string = this.control.element.id + '_Series_' + index.series + '_Point_' + index.point;
        return document.getElementById(elementId);
    }
    public calculateSelectedElements(pie: AccumulationChart, event: Event): void {
        if ((<HTMLElement>event.target).id.indexOf('_Series_') > -1 || (<HTMLElement>event.target).id.indexOf('_datalabel_') > -1) {
            this.performSelection(indexFinder((<HTMLElement>event.target).id), pie, <Element>event.target);
        }
    }
    private performSelection(index: Index, pie: AccumulationChart, element?: Element): void {
        element = element.id.indexOf('datalabel') > -1 ? <Element>pie.getSeriesElement().childNodes[index.series].childNodes[index.point]
            : element;
        switch (pie.selectionMode) {
            case 'Point':
                if (!isNaN(index.point)) {
                    this.selection(pie, index, [element]);
                    this.blurEffect(pie.element.id, pie.visibleSeries);
                }
                break;
        }
    }
    private selection(pie: AccumulationChart, index: Index, selectedElements: Element[]): void {
        if (!pie.isMultiSelect) {
            this.removeMultiSelectEelments(pie, this.selectedDataIndexes, index, pie.series);
        }
        if (selectedElements[0] && selectedElements[0].classList.contains(this.getSelectionClass(selectedElements[0].id))) {
            this.removeStyles(selectedElements, index);
            this.addOrRemoveIndex(this.selectedDataIndexes, index);
        } else {
            this.applyStyles(selectedElements, index);
            this.addOrRemoveIndex(this.selectedDataIndexes, index, true);
        }
    }
    public redrawSelection(pie: AccumulationChart, oldMode: AccumulationSelectionMode): void {
        let selectedDataIndexes: Indexes[] = <Indexes[]>extend([], this.selectedDataIndexes, null, true);
        this.removeSelectedElements(pie, this.selectedDataIndexes);
        this.blurEffect(pie.element.id, pie.visibleSeries);
        this.selectDataIndex(selectedDataIndexes, pie);
    }
    private removeSelectedElements(pie: AccumulationChart, indexes: Index[]): void {
        let seriesgroup: Element = pie.getSeriesElement();
        for (let index of indexes) {
            this.removeStyles([this.getElementByIndex(index)], index);
        }
    }
    public legendSelection(pie: AccumulationChart, series: number, pointIndex: number): void {
        let element: Element = <Element>pie.getSeriesElement().childNodes[series].childNodes[pointIndex];
        let seriesStyle: string = this.generateStyle(pie.visibleSeries[series]);
        let seriesElements: Element = <Element>pie.getSeriesElement().childNodes[series].childNodes[pointIndex];
        this.selection(pie, new Index(series, pointIndex), [seriesElements]);
        this.blurEffect(pie.element.id, pie.visibleSeries);
    }
    private selectDataIndex(indexes: Index[], pie: AccumulationChart): void {
        let element: Element;
        for (let index of indexes) {
            element = this.getElementByIndex(index);
            if (element) {
                this.performSelection(index, pie, element);
            }
        }
    }
    private removeMultiSelectEelments(pie: AccumulationChart, index: Index[], currentIndex: Index,
                                      seriesCollection: AccumulationSeriesModel[]): void {
        let series: AccumulationSeriesModel;
        for (let i: number = 0; i < index.length; i++) {
            series = seriesCollection[index[i].series];
            if (!this.checkEquals(index[i], currentIndex)) {
                this.removeStyles(this.findElements(pie, series, index[i]), index[i]);
                index.splice(i, 1);
                i--;
            }
        }
    }
    private blurEffect(pieId: string, visibleSeries: AccumulationSeries[]): void {
        let visibility: boolean = this.checkPointVisibility(this.selectedDataIndexes); // legend click scenario
        for (let series of visibleSeries) {
            if (series.visible) {
                this.checkSelectionElements(document.getElementById(pieId + '_SeriesCollection'),
                                            this.generateStyle(series), visibility);
            }
        }
    }
    private checkSelectionElements(element: Element, className: string, visibility: boolean): void {
        let children: HTMLCollection | Element[] = <HTMLCollection>(element.childNodes[0].childNodes);
        let legendShape: Element;
        for (let i: number = 0; i < children.length; i++) {
            if (!children[i].parentElement.classList.contains(className) && !children[i].classList.contains(className) && visibility) {
                children[i].classList.add(this.unselected);
            } else {
                children[i].classList.remove(this.unselected);
            }
            if (this.control.legendSettings.visible) {
                legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + i);
                if (legendShape) {
                    if (!children[i].classList.contains(className) && !children[i].parentElement.classList.contains(className)
                    && visibility) {
                        legendShape.classList.add(this.unselected);
                    } else {
                        legendShape.classList.remove(this.unselected);
                    }
                }
            }
        }
    }
    private applyStyles(elements: Element[], index: Index): void {
        for (let element of elements) {
            let legendShape: Element;
            if (element) {
                if (this.control.legendSettings.visible) {
                    legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + index.point);
                    legendShape.classList.remove(this.unselected);
                    legendShape.classList.add(this.getSelectionClass(legendShape.id));
                }
                element.parentElement.classList.remove(this.unselected);
                element.classList.remove(this.unselected);
                element.classList.add(this.getSelectionClass(element.id));
            }
        }
    }
    private getSelectionClass(id: string): string {
        return this.generateStyle((this.control as AccumulationChart).series[indexFinder(id).series]);
    }

    private removeStyles(elements: Element[], index: Index): void {
        let legendShape: Element;
        for (let element of elements) {
            if (element) {
                if (this.control.legendSettings.visible) {
                    legendShape = document.getElementById(this.control.element.id + '_chart_legend_shape_' + index.point);
                    legendShape.classList.remove(this.getSelectionClass(legendShape.id));
                }
                element.classList.remove(this.getSelectionClass(element.id));
            }
        }
    }
    private addOrRemoveIndex(indexes: Index[], index: Index, add?: boolean): void {
        for (let i: number = 0; i < indexes.length; i++) {
            if (this.checkEquals(indexes[i], index)) {
                indexes.splice(i, 1);
                i--;
            }
        }
        if (add) { indexes.push(index); }
    }
    private checkEquals(first: Index, second: Index): boolean {
        return ((first.point === second.point) && (first.series === second.series));
    }
    private checkPointVisibility(selectedDataIndexes: Indexes[]): boolean {
        let visible: boolean = false;
        for (let data of selectedDataIndexes) {
            if (pointByIndex(data.point, <AccPoints[]>this.control.visibleSeries[0].points).visible) {
                visible = true;
                break;
            }
        }
        return visible;
    }
    /**
     * Get module name.
     */
    public getModuleName(): string {
        return 'AccumulationSelection';
    }
    /**
     * To destroy the selection. 
     * @return {void}
     * @private
     */
    public destroy(pie: AccumulationChart): void {
        // Destroy method performed here
    }
}