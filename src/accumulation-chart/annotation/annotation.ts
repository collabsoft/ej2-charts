/** 
 * AccumulationChart annotation properties
 */

import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { AccumulationAnnotationSettings } from '../model/acc-base';
import { AnnotationBase } from '../../common/annotation/annotation';
import { ChartLocation, appendElement } from '../../common/utils/helper';
import { createElement } from '@syncfusion/ej2-base';

/**
 * Annotation Module handles the Annotation for accumulation chart.
 */
export class AccumulationAnnotation extends AnnotationBase {

    private pie: AccumulationChart;
    private annotations: AccumulationAnnotationSettings[];
    private parentElement: HTMLElement;

    /**
     * Constructor for Accumulation chart annotation.
     * @private.
     */
    constructor(control: AccumulationChart, annotations: AccumulationAnnotationSettings[]) {
        super(control);
        this.pie = control;
        this.annotations = annotations;
    }

    /**
     * Method to render the annotation for accumulation chart
     * @param element 
     */
    public renderAnnotations(element: Element): void {
        let annotationElement: HTMLElement;
        let location: ChartLocation;
        this.parentElement = createElement('div', {
            id: this.pie.element.id + '_Annotation_Collections'
        });
        this.annotations.map((annotation: AccumulationAnnotationSettings, index: number) => {
            location = new ChartLocation(0, 0);
            annotationElement = this.render(annotation, index);
            if (this['setAnnotation' + annotation.coordinateUnits + 'Value'](location)) {
                this.setElementStyle(location, annotationElement, this.parentElement);
            }
        });
        appendElement(this.parentElement, element);
    }

    /**
     * Get module name.
     */
    protected getModuleName(): string {
        // Returns te module name
        return 'Annotation';
    }
    /**
     * To destroy the annotation. 
     * @return {void}
     * @private
     */
    public destroy(control: AccumulationChart): void {
        // Destroy method performed here
    }
}