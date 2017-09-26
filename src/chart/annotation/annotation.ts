import { Chart } from '../../chart/chart';
import { ChartAnnotationSettings } from './chart-annotation';
import { AnnotationBase } from '../../common/annotation/annotation';
import { ChartLocation, appendElement } from '../../common/utils/helper';
import { createElement } from '@syncfusion/ej2-base';

/**
 * Annotation Module handles the Annotation for chart.
 */
export class ChartAnnotation extends AnnotationBase {

    private chart: Chart;
    private annotations: ChartAnnotationSettings[];
    private parentElement: HTMLElement;

    /**
     * Constructor for chart annotation.
     * @private.
     */
    constructor(control: Chart, annotations: ChartAnnotationSettings[]) {
        super(control);
        this.chart = control;
        this.annotations = annotations;
    }

    /**
     * Method to render the annotation for chart
     * @param element 
     */
    public renderAnnotations(element: Element): void {
        let annotationElement: HTMLElement;
        let location: ChartLocation;
        this.parentElement = createElement('div', {
            id: this.chart.element.id + '_Annotation_Collections'
        });
        this.annotations.map((annotation: ChartAnnotationSettings, index: number) => {
            annotationElement = this.render(annotation, index);
            location = new ChartLocation(0, 0);
            if (this['setAnnotation' + annotation.coordinateUnits + 'Value'](location)) {
                this.setElementStyle(location, annotationElement, this.parentElement);
            }
        });
        appendElement(this.parentElement, element);
    }

    /**
     * To destroy the annotation. 
     * @return {void}
     * @private
     */
    public destroy(control: Chart): void {
        // Destroy method performed here
    }

    /**
     * Get module name.
     */
    protected getModuleName(): string {
        // Returns te module name
        return 'Annotation';
    }
}