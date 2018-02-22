/** 
 * Defines the common functionalities of accumulation series
 */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChartLocation, degreeToLocation, getElement, indexFinder } from '../../common/utils/helper';
import { AccumulationChart } from '../accumulation';
import { AccPoints, pointByIndex } from '../model/acc-base';

/**
 * Accumulation Base used to do some base calculation for accumulation chart.
 */
export class AccumulationBase {

    /** @private */
    constructor(accumulation: AccumulationChart) {
        this.accumulation = accumulation;
    }

    private pieCenter: ChartLocation;

    /**
     * Gets the center of the pie
     * @private
     */
    public get center(): ChartLocation {
        return this.pieCenter || (this.accumulation.visibleSeries[0].type === 'Pie' ?
        this.accumulation.pieSeriesModule.center : null );
    }

    /**
     * Sets the center of the pie
     * @private
     */
    public set center(value: ChartLocation) {
        this.pieCenter = value;
    }

    private pieRadius: number;
    /**
     * Gets the radius of the pie
     * @private
     */
    public get radius(): number {
        return this.pieRadius !== undefined ? this.pieRadius :
            this.accumulation.pieSeriesModule.radius;
    }

    /**
     * Sets the radius of the pie
     * @private
     */
    public set radius(value: number) {
        this.pieRadius = value;
    }

    private pieLabelRadius: number;
    /**
     * Gets the label radius of the pie
     * @private
     */
    public get labelRadius(): number {
        return this.pieLabelRadius !== undefined ? this.pieLabelRadius :
             this.accumulation.pieSeriesModule.labelRadius;
    }

    /**
     * Sets the label radius of the pie
     * @private
     */
    public set labelRadius(value: number) {
        this.pieLabelRadius = value;
    }

    /** @private */
    protected accumulation: AccumulationChart;

    /** 
     * Checks whether the series is circular or not
     * @private
     */
    protected isCircular(): boolean {
        return this.accumulation.type === 'Pie';
    }

    /**
     * To process the explode on accumulation chart loading
     * @private
     */
    public processExplode(event: Event): void {
        if ((<HTMLElement>event.target).id.indexOf('_Series_') > -1 || (<HTMLElement>event.target).id.indexOf('_datalabel_') > -1) {
            let pointIndex: number = indexFinder((<HTMLElement>event.target).id).point;
            if (isNaN(pointIndex) || ((<HTMLElement>event.target).id.indexOf('_datalabel_') > -1 &&
            this.accumulation.visibleSeries[0].points[pointIndex].labelPosition === 'Outside')) {
                return null;
            }
            this.explodePoints(pointIndex, this.accumulation);
            this.deExplodeAll(pointIndex);
        }
    }

    /**
     * To invoke the explode on accumulation chart loading
     * @private
     */
    public invokeExplode(): void {
        if (this.accumulation.visibleSeries[0].explodeAll) {
            for (let point of this.accumulation.visibleSeries[0].points) {
                this.explodePoints(point.index, this.accumulation);
            }
        } else if (!isNullOrUndefined(this.accumulation.visibleSeries[0].explodeIndex)) {
            this.explodePoints(this.accumulation.visibleSeries[0].explodeIndex, this.accumulation);
        }
        if (this.accumulation.accumulationSelectionModule && this.accumulation.selectionMode !== 'None' &&
            this.accumulation.accumulationSelectionModule.selectedDataIndexes.length) {
            for (let index of this.accumulation.accumulationSelectionModule.selectedDataIndexes) {
                this.explodePoints(index.point, this.accumulation, true);
                this.deExplodeAll(index.point);
            }
        }
    }

    /**
     * To deExplode all points in the series
     */
    private deExplodeAll(index: number): void {
        let pointId: string = this.accumulation.element.id + '_Series_0_Point_';
        let points: AccPoints[] = this.accumulation.visibleSeries[0].points;
        for (let currentPoint of points) {
            if (index !== currentPoint.index) {
                this.deExplodeSlice(currentPoint.index, pointId, this.center);
            }
        }
    }

    /**
     * To explode point by index
     * @private
     */
    public explodePoints(index: number, chart: AccumulationChart, explode: boolean = false): void {
        let pointId: string = this.accumulation.element.id + '_Series_0_Point_';
        let translate: ChartLocation;
        let points: AccPoints[] = this.accumulation.visibleSeries[0].points;
        let point: AccPoints = pointByIndex(index, this.accumulation.visibleSeries[0].points);
        if (isNullOrUndefined(point)) {
            return null;
        }
        if (!this.isCircular()) {
            translate = { x: chart.explodeDistance, y: 0 };
        } else {
            translate = degreeToLocation(point.midAngle, chart.explodeDistance, this.center);
        }
        if (this.isExplode(pointId + index) || explode) {
            this.explodeSlice(index, translate, pointId, this.center || { x: 0, y: 0 });
        } else {
            this.deExplodeSlice(index, pointId, this.center);
        }
    }

    /**
     * To check point is exploded by id
     */
    private isExplode(id: string): boolean {
        let element: Element = getElement(id);
        if (element && (element.getAttribute('transform') === 'translate(0, 0)' || element.getAttribute('transform') === null ||
            element.getAttribute('transform') === 'translate(0)')) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * To deExplode the point by index
     */
    private deExplodeSlice(index: number, sliceId: string, center: ChartLocation): void {
        let position: string = 'translate(0, 0)';
        this.setTranslate(index, sliceId, position);
    }

    /**
     * To translate the point elements by index and position
     */
    private setTranslate(index: number, sliceId: string, position: string): void {
        this.setElementTransform(sliceId + index, position);
        if (this.accumulation.visibleSeries[0].dataLabel.visible) {
            sliceId = this.accumulation.element.id + '_datalabel_Series_0_';
            this.setElementTransform(sliceId + 'shape_' + index, position);
            this.setElementTransform(sliceId + 'text_' + index, position);
            this.setElementTransform(sliceId + 'connector_' + index, position);
        }
    }

    /**
     * To translate the point element by id and position
     */
    private setElementTransform(id: string, position: string): void {
        let element: Element = getElement(id);
        if (element) {
            element.setAttribute('transform', position);
        }
    }

    /**
     * To translate the point elements by index position
     */
    private explodeSlice(index: number, translate: ChartLocation, sliceId: string, center: ChartLocation): void {
        let position: string = 'translate(' + (translate.x - center.x) + ', ' + (translate.y - center.y) + ')';
        this.setTranslate(index, sliceId, position);
    }
}