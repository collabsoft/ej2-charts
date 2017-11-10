import { print as printWindow, createElement } from '@syncfusion/ej2-base';
import { Chart } from '../../chart/chart';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { getElement } from '../utils/helper';
import { ExportType } from '../utils/enum';
import { IPrintEventArgs } from '../model/interface';
import { beforePrint } from '../model/constants';

/**
 * Annotation Module handles the Annotation for chart and accumulation series.
 */
export class ExportUtils {
    private control: Chart | AccumulationChart;
    private printWindow: Window;

    /**
     * Constructor for chart and accumulation annotation
     * @param control 
     */
    constructor(control: Chart | AccumulationChart) {
        this.control = control;
    }

    /**
     * To print the accumulation and chart elements
     * @param elements 
     */
    public print(elements?: string[] | string | Element): void {
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        let argsData: IPrintEventArgs = {
            cancel: false, htmlContent: this.getHTMLContent(elements), name: beforePrint
        };
        this.control.trigger(beforePrint, argsData);
        if (!argsData.cancel) {
            printWindow(argsData.htmlContent, this.printWindow);
        }
    }

    /**
     * To get the html string of the chart and accumulation
     * @param elements 
     * @private
     */
    public getHTMLContent(elements?: string[] | string | Element): Element {
        let div: Element = createElement('div');
        if (elements) {
            if (elements instanceof Array) {
                elements.forEach((value: string) => {
                    div.appendChild(getElement(value).cloneNode(true) as Element);
                });
            } else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true) as Element);
            } else {
                div.appendChild(getElement(elements).cloneNode(true) as Element);
            }
        } else {
            div.appendChild(this.control.element.cloneNode(true) as Element);
        }
        return div;
    }
    /**
     * To export the chart svgObject
     * @param type 
     * @param fileName 
     */
    public export(type: ExportType, fileName: string): void {
        let element: HTMLCanvasElement = <HTMLCanvasElement>createElement('canvas', {
            id: 'ej2-canvas',
            attrs: {
                'width': this.control.availableSize.width.toString(),
                'height': this.control.availableSize.height.toString()
            }
        });
        let url: string = window.URL.createObjectURL(
            new Blob(
                [(new XMLSerializer()).serializeToString(this.control.svgObject)],
                { type: 'image/svg+xml' }
            )
        );
        let image: HTMLImageElement = new Image();
        let ctx: CanvasRenderingContext2D = element.getContext('2d');
        image.onload = (() => {
            ctx.drawImage(image, 0, 0);
            window.URL.revokeObjectURL(url);
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(element.msToBlob(), fileName + '.' + (type as string).toLocaleLowerCase());
            } else {
                let imgURI: string = element.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                createElement('a', {
                    attrs: {
                        'download': fileName + '.' + (type as string).toLocaleLowerCase(),
                        'href': imgURI
                    }
                }).dispatchEvent(new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                }));
            }
        });
        image.src = url;
    }
}