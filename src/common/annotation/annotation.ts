import { Chart } from '../../chart/chart';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { AccumulationAnnotationSettings } from '../../accumulation-chart/annotation/accumulation-annotation';
import { ChartAnnotationSettings } from '../../chart/annotation/chart-annotation';
import { createTemplate, measureElementRect, logBase } from '../utils/helper';
import { ChartLocation, stringToNumber, appendElement, withIn, Rect } from '../utils/helper';
import { Alignment, Position } from '../utils/enum';
import { AccPoints, AccumulationSeries } from '../../accumulation-chart/model/acc-base';
import { getPoint } from '../utils/helper';
import { Axis } from '../../chart/axis/axis';
import { DateFormatOptions, createElement } from '@syncfusion/ej2-base';
import { IAnnotationRenderEventArgs } from '../model/interface';
import { annotationRender } from '../model/constants';


/**
 * Annotation Module handles the Annotation for chart and accumulation series.
 */
export class AnnotationBase {

    private control: Chart | AccumulationChart;
    private annotation: AccumulationAnnotationSettings | ChartAnnotationSettings;
    private isChart: boolean;

    /**
     * Constructor for chart and accumulation annotation
     * @param control 
     */
    constructor(control: Chart | AccumulationChart) {
        this.control = control;
    }

    /**
     * Method to render the annotation for chart and accumulation series.
     * @param annotation 
     * @param index 
     */
    public render(annotation: AccumulationAnnotationSettings | ChartAnnotationSettings, index: number): HTMLElement {
        this.isChart = this.control.getModuleName() === 'chart';
        this.annotation = annotation;
        let childElement: HTMLElement = createTemplate(
            createElement('div', {
                id: this.control.element.id + '_Annotation_' + index,
                styles: 'position: absolute;'
            }),
            index, annotation.content, this.control);
        return childElement;
    }

    /**
     * Method to calculate the location for annotation - coordinate unit as pixel.
     * @param location 
     */
    public setAnnotationPixelValue(location: ChartLocation): boolean {
        let rect: Rect;
        rect = this.annotation.region === 'Chart' ?
            new Rect(0, 0, this.control.availableSize.width, this.control.availableSize.height) :
            this.isChart ?
                (<Chart>this.control).chartAxisLayoutPanel.seriesClipRect :
                (<AccumulationSeries>this.control.series[0]).accumulationBound;
        location.x = ((typeof this.annotation.x !== 'string') ?
            ((typeof this.annotation.x === 'number') ? this.annotation.x : 0) :
            stringToNumber(this.annotation.x, rect.width)) + rect.x;
        location.y = ((typeof this.annotation.y === 'number') ? this.annotation.y :
            stringToNumber(this.annotation.y, rect.height)) + rect.y;
        return true;
    }

    /**
     * Method to calculate the location for annotation - coordinate unit as point.
     * @param location 
     */
    public setAnnotationPointValue(location: ChartLocation): boolean {
        let symbolLocation: ChartLocation = new ChartLocation(0, 0);
        if (this.isChart) {
            let xAxis: Axis; let yAxis: Axis;
            let chart: Chart = <Chart>this.control;
            let annotation: ChartAnnotationSettings = <ChartAnnotationSettings>this.annotation;
            let xValue: number; let isLog: boolean = false;
            let xAxisName: string = annotation.xAxisName;
            let yAxisName: string = annotation.yAxisName;
            let isInverted: boolean = chart.requireInvertedAxis;
            let withinRange: boolean;
            for (let axis of chart.axisCollections) {
                if (xAxisName === axis.name || (xAxisName == null && axis.name === 'primaryXAxis')) {
                    xAxis = axis;
                    if (xAxis.valueType === 'Category') {
                        if (xAxis.labels.indexOf(<string>annotation.x) < 0) {
                            return false;
                        } else {
                            xValue = xAxis.labels.indexOf(<string>annotation.x);
                        }
                    } else if (xAxis.valueType === 'DateTime') {
                        let option: DateFormatOptions = { skeleton: 'full', type: 'dateTime' };
                        xValue = (typeof this.annotation.x === 'object') ?
                            Date.parse(chart.intl.getDateParser(option)(
                                chart.intl.getDateFormat(option)(annotation.x)
                            )) : 0;
                    } else {
                        xValue = +annotation.x;
                    }
                } else if (yAxisName === axis.name || (yAxisName == null && axis.name === 'primaryYAxis')) {
                    yAxis = axis; isLog = yAxis.valueType === 'Logarithmic';
                }
            }
            if (xAxis && yAxis && withIn(
                xAxis.valueType === 'Logarithmic' ? logBase(xValue, xAxis.logBase) : xValue, xAxis.visibleRange
            )) {
                withinRange = withIn(
                    (isLog ? logBase(+this.annotation.y, yAxis.logBase) : +this.annotation.y),
                    yAxis.visibleRange
                );
                symbolLocation = isInverted ? getPoint(
                    withinRange ? +annotation.y :
                        isLog ?
                            Math.pow(yAxis.logBase, yAxis.visibleRange.max) :
                            +annotation.y > yAxis.visibleRange.max ? yAxis.visibleRange.max : yAxis.visibleRange.min,
                    xValue, yAxis, xAxis
                ) : getPoint(
                    xValue, withinRange ? +annotation.y :
                        isLog ? Math.pow(yAxis.logBase, yAxis.visibleRange.max) :
                            +annotation.y > yAxis.visibleRange.max ? yAxis.visibleRange.max : yAxis.visibleRange.min,
                    xAxis, yAxis
                );
                location.x = symbolLocation.x + (isInverted ? yAxis.rect.x : xAxis.rect.x);
                location.y = symbolLocation.y + (isInverted ? xAxis.rect.y : yAxis.rect.y);
            } else {
                return false;
            }
            return true;
        } else {
            return this.setAccumulationPointValue(location);
        }
    }

    /**
     * Method to calculate the location for annotation - coordinate unit as point in accumulation chart.
     * @param location 
     */
    public setAccumulationPointValue(location: ChartLocation): boolean {
        let accumulation: AccumulationChart = <AccumulationChart>this.control;
        let point: AccPoints;
        for (let accPoint of accumulation.visibleSeries[0].points) {
            if (typeof accPoint.x === 'object') {
                if (Date.parse(accPoint.x as string) === Date.parse(this.annotation.x as string) &&
                    accPoint.y === this.annotation.y) {
                    point = accPoint;
                    break;
                }
            } else {
                if (accPoint.x === this.annotation.x && accPoint.y === this.annotation.y) {
                    point = accPoint;
                    break;
                }
            }
        }
        if (point && point.visible) {
            location.x = point.symbolLocation.x;
            location.y = point.symbolLocation.y;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Method to set the element style for accumulation / chart annotation. 
     * @param location 
     * @param element 
     * @param parentElement 
     */
    public setElementStyle(location: ChartLocation, element: HTMLElement, parentElement: HTMLElement): void {
        let elementRect: ClientRect = measureElementRect(element);
        let argsData: IAnnotationRenderEventArgs = {
            cancel: false, name: annotationRender, content: element,
            location: location
        };
        this.control.trigger(annotationRender, argsData);
        if (!argsData.cancel) {
            argsData.content.style.left = this.setAlignmentValue(
                this.annotation.horizontalAlignment, elementRect.width, argsData.location.x
            ) + 'px';
            argsData.content.style.top = this.setAlignmentValue(
                this.annotation.verticalAlignment, elementRect.height, argsData.location.y
            ) + 'px';
            argsData.content.setAttribute('aria-label', this.annotation.description || 'Annotation');
            appendElement(argsData.content, parentElement);
        }
    }

    /**
     * Method to calculate the alignment value for annotation.
     * @param alignment 
     * @param size 
     * @param value 
     */
    public setAlignmentValue(alignment: Alignment | Position, size: number, value: number): number {
        switch (alignment) {
            case 'Top': case 'Near': value -= size; break;
            case 'Bottom': case 'Far': value += 0; break;
            case 'Middle': case 'Center': value -= (size / 2); break;
        }
        return value;
    }
}