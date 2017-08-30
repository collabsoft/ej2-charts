/**
 * Accumulation charts base file
 */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Animation, AnimationOptions } from '@syncfusion/ej2-base';
import { AccumulationChart } from '../accumulation';
import { stringToNumber, ChartLocation, degreeToLocation, Rect, getAnimationFunction, getElement} from '../../common/utils/helper';
import { animationComplete} from '../../common/model/constants';
import { AccumulationLabelPosition} from '../model/enum';
import { AccumulationSeries, PiePoints, pointByIndex, indexFinder} from '../model/acc-base';

export class PieBase {
    protected startAngle: number;
    protected totalAngle: number;
    protected innerRadius: number;
    protected center: ChartLocation;
    protected radius: number;
    protected labelRadius: number;
    protected pie: AccumulationChart;
    /** @private */
    public findCenter(pie: AccumulationChart): void {
        this.pie = pie;
        this.center = {
            x: stringToNumber('50%', pie.initialClipRect.width) + (pie.initialClipRect.x),
            y: stringToNumber('50%', pie.initialClipRect.height) + (pie.initialClipRect.y)
        };
        let pieRect: Rect = this.getSeriesBound(pie.visibleSeries[0]);
        let pieRectCenter: ChartLocation = new ChartLocation(pieRect.x + pieRect.width / 2, pieRect.y + pieRect.height / 2);
        this.center.x += (this.center.x - pieRectCenter.x);
        this.center.y += (this.center.y - pieRectCenter.y);
        this.pie.center = this.center;
    }
    public initProperties(chart: AccumulationChart , series: AccumulationSeries): void {
        let size: number = Math.min(chart.initialClipRect.width, chart.initialClipRect.height);
        this.initAngles(series);
        this.radius = stringToNumber(series.radius, size / 2);
        this.innerRadius = stringToNumber(series.innerRadius, this.radius);
        this.labelRadius = series.dataLabel.position === 'Inside' ? (((this.radius - this.innerRadius) / 2) + this.innerRadius) :
          (this.radius + stringToNumber(series.dataLabel.connectorStyle.length, size / 2));
        this.findCenter(chart);
        chart.explodeDistance = series.explode ? stringToNumber(series.explodeOffset, this.radius) : 0;
        this.defaultLabelBound(series, series.dataLabel.visible, series.dataLabel.position);
        this.totalAngle -= 0.001;
    }
    private initAngles(series: AccumulationSeries): void {
        this.totalAngle = (series.endAngle - series.startAngle) % 360;
        this.startAngle =  series.startAngle - 90;
        this.totalAngle = this.totalAngle <= 0 ? (360 + this.totalAngle) : this.totalAngle;
        this.startAngle = (this.startAngle < 0 ? (this.startAngle + 360) : this.startAngle) % 360;
    }
    /** @private calculating data-label bound */
    public defaultLabelBound(series: AccumulationSeries, visible: boolean, position: AccumulationLabelPosition): void {
        let pieBound: Rect = this.getSeriesBound(series);
        series.pieBound =  pieBound;
        series.labelBound = new Rect(pieBound.x, pieBound.y, pieBound.width + pieBound.x, pieBound.height + pieBound.y);
        if (visible && position === 'Outside') {
            series.labelBound = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        }
    }
    public getSeriesBound(series: AccumulationSeries): Rect {
        let rect: Rect = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        this.initAngles(series);
        let start: number = this.startAngle;
        let total: number = this.totalAngle;
        let end: number = (this.startAngle + total) % 360;
        end = (end === 0) ? 360 : end;
        series.findMaxBounds(rect, this.getRectFromAngle(start));
        series.findMaxBounds(rect, this.getRectFromAngle(end));
        series.findMaxBounds(rect, new Rect(this.center.x, this.center.y, 0, 0));
        let nextQuandrant: number = (Math.floor(start / 90) * 90 + 90) % 360;
        let lastQuadrant: number = (Math.floor(end / 90) * 90) % 360;
        lastQuadrant = (lastQuadrant === 0) ? 360 : lastQuadrant;
        if (total >= 90 || lastQuadrant === nextQuandrant) {
            series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            series.findMaxBounds(rect, this.getRectFromAngle(lastQuadrant));
        }
        if (start === 0 || (start + total >= 360)) {
            series.findMaxBounds(rect, this.getRectFromAngle(0));
        }
        let length: number = nextQuandrant === lastQuadrant ? 0 : Math.floor(total / 90);
        for (let i: number = 1; i < length; i++) {
            nextQuandrant = nextQuandrant + 90;
            if ((nextQuandrant < lastQuadrant || end < start) || total === 360) {
                series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            }
        }
        rect.width -= rect.x;
        rect.height -= rect.y;

        return rect;
    }
    private getRectFromAngle(angle: number) : Rect {
        let location: ChartLocation = degreeToLocation(angle, this.radius, this.center);
        return new Rect(location.x, location.y, 0, 0);
    }
    protected getPathArc(center: ChartLocation, start: number, end: number, radius: number, innerRadius: number): string {
        let degree: number = end - start; degree = degree < 0 ? (degree + 360) : degree;
        let flag: number = (degree < 180) ? 0 : 1;
        if (!innerRadius && innerRadius === 0) {
            return this.getPiePath(center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius, flag);
        } else {
            return this.getDoughnutPath(
                center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius,
                degreeToLocation(start, innerRadius, center), degreeToLocation(end, innerRadius, center), innerRadius, flag);
        }
    }
    protected getPiePath(center: ChartLocation, start: ChartLocation, end: ChartLocation, radius: number, clockWise: number): string {
        return 'M ' + center.x + ' ' + center.y + ' L ' + start.x + ' ' + start.y + ' A ' + radius + ' ' +
                radius + ' 0 ' + clockWise + ' 1 ' + end.x + ' ' + end.y + ' Z';
    }
    protected getDoughnutPath(center: ChartLocation, start: ChartLocation, end: ChartLocation, radius: number,
                              innerStart: ChartLocation, innerEnd: ChartLocation, innerRadius: number, clockWise: number): string {
        return 'M ' + start.x + ' ' + start.y + ' A ' + radius + ' ' + radius + ' 0 ' + clockWise +
                ' 1 ' + end.x + ' ' + end.y + ' L ' + innerEnd.x + ' ' + innerEnd.y + ' A ' + innerRadius +
                ' ' + innerRadius + ' 0 ' + clockWise + ',0 ' + innerStart.x + ' ' + innerStart.y + ' Z';
    }
    public getTooltipPoint(e: MouseEvent, pie: AccumulationChart, x: number, y: number) : void {
        let target: Element = e.target as Element;
        target = pie.isTouch ? document.elementFromPoint(x, y) : target;
        let id: string[] = target.id.split(pie.element.id + '_Series_');
        if (id[1]) {
            let seriesIndex: number = parseInt(id[1].split('_Point_')[0], 10);
            let pointIndex: number = parseInt(id[1].split('_Point_')[1], 10);
            if (!isNullOrUndefined(seriesIndex) && !isNaN(seriesIndex) && !isNullOrUndefined(pointIndex) && !isNaN(pointIndex)) {
                let series: AccumulationSeries = this.getSeriesFromIndex(seriesIndex, pie.visibleSeries);
                if (series.enableTooltip) {
                    pie.accumulationTooltipModule.renderTooltip(series.points[pointIndex], series.index);
                }
            }
        } else if (pie.accumulationTooltipModule && pie.accumulationTooltipModule.tooltip && !this.isDataLabel(target)) {
            pie.accumulationTooltipModule.tooltip.close();
        }
    }
    private isDataLabel(target: Element): boolean {
        if (target.id.indexOf(this.pie.element.id + '_datalabel_Series_') > -1) {
            return true;
        }
        return false;
    }
    private getSeriesFromIndex(index: number, visibleSeries: AccumulationSeries[]): AccumulationSeries {
        // for (let series of visibleSeries) {
        //     if (index === series.index) {
        //         return <Series>series;
        //     }
        // }
        return <AccumulationSeries>visibleSeries[0];
    }
    public processExplode(pie: AccumulationChart, event: Event): void {
        if ((<HTMLElement>event.target).id.indexOf('_Series_') > -1 || (<HTMLElement>event.target).id.indexOf('_datalabel_') > -1) {
            let pointIndex: number = indexFinder((<HTMLElement>event.target).id).point;
            if (isNaN(pointIndex)) {
                return null;
            }
            this.explodePoints(pointIndex);
            this.deExplodeAll(pointIndex);
        }
    }
    public invokeExplode(): void {
        if (this.pie.visibleSeries[0].explodeAll) {
            for (let point of this.pie.visibleSeries[0].points) {
                this.explodePoints(point.index);
            }
        } else if (!isNullOrUndefined(this.pie.visibleSeries[0].explodeIndex)) {
            this.explodePoints(this.pie.visibleSeries[0].explodeIndex);
        }
        if (this.pie.accumulationSelectionModule && this.pie.selectionMode !== 'None' &&
            this.pie.accumulationSelectionModule.selectedDataIndexes.length) {
            for (let index of this.pie.accumulationSelectionModule.selectedDataIndexes) {
                this.explodePoints(index.point, true);
                this.deExplodeAll(index.point);
            }
        }
    }
    private deExplodeAll(index: number): void {
        let pointId: string = this.pie.element.id + '_Series_0_Point_';
        let points: PiePoints[] = this.pie.visibleSeries[0].points;
        for (let currentPoint of points) {
            if (index !== currentPoint.index) {
                this.deExplodeSlice(currentPoint.index, pointId, this.center);
            }
        }
    }
    /** @private */
    public explodePoints(index: number, explode: boolean = false): void {
        let pointId: string = this.pie.element.id + '_Series_0_Point_';
        let translate: ChartLocation;
        let points: PiePoints[] = this.pie.visibleSeries[0].points;
        let point: PiePoints = pointByIndex(index, this.pie.visibleSeries[0].points);
        if (isNullOrUndefined(point)) {
            return null;
        }
        translate = degreeToLocation(point.midAngle, this.pie.explodeDistance, this.center);
        if (this.isExplode(pointId + index) || explode) {
            this.explodeSlice(index, translate, pointId, this.center);
        } else {
            this.deExplodeSlice(index, pointId, this.center);
        }
    }
    private isExplode(id: string): boolean {
        let element: Element = getElement(id);
        if (element && (element.getAttribute('transform') === 'translate(0, 0)' || element.getAttribute('transform') === null ||
        element.getAttribute('transform') === 'translate(0)')) {
            return true;
        } else {
            return false;
        }
    }
    private deExplodeSlice(index: number, sliceId: string, center: ChartLocation) : void {
        let position: string = 'translate(0, 0)';
        this.setTranslate(index, sliceId, position);
    }
    private setTranslate(index: number, sliceId: string, position: string): void {
        this.setElementTransform(sliceId + index, position);
        if (this.pie.visibleSeries[0].dataLabel.visible) {
            sliceId = this.pie.element.id + '_datalabel_Series_0_';
            this.setElementTransform(sliceId + 'shape_' + index, position);
            this.setElementTransform(sliceId + 'text_' + index, position);
            this.setElementTransform(sliceId + 'connector_' + index, position);
        }
    }
    private setElementTransform(id: string, position: string): void {
        let element: Element = getElement(id);
        if (element) {
            element.setAttribute('transform', position);
        }
    }
    private explodeSlice(index: number, translate: ChartLocation, sliceId: string, center: ChartLocation) : void {
        let position: string = 'translate(' + (translate.x - center.x) + ', ' + (translate.y - center.y) + ')';
        this.setTranslate(index, sliceId, position);
    }
    protected doAnimation(slice: Element, series: AccumulationSeries) : void {
        let startAngle: number = series.startAngle - 90;
        let value: number;
        let radius: number = Math.max(this.pie.availableSize.height, this.pie.availableSize.width) * 0.75;
        radius += radius * (0.414); // formula r + r / 2 * (1.414 -1)
        let effect: Function = getAnimationFunction('Linear'); // need to check animation type
        new Animation({}).animate(<HTMLElement>slice, {
            duration: series.animation.duration,
            delay: series.animation.delay,
            progress: (args: AnimationOptions): void => {
                value = effect(args.timeStamp, startAngle, this.totalAngle, args.duration);
                slice.setAttribute('d', this.getPathArc(this.center, startAngle, value, radius, 0));
            },
            end: (args: AnimationOptions) => {
                slice.setAttribute('d', this.getPathArc(this.center, 0, 359.99999, radius, 0));
                this.pie.trigger(animationComplete, { series: series, pie: this.pie });
                let datalabelGroup: Element = getElement(this.pie.element.id + '_datalabel_Series_' + series.index);
                (datalabelGroup as HTMLElement).style.visibility = 'visible';
            }
        });
    }
}