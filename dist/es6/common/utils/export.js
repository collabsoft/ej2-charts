import { print as printWindow, createElement } from '@syncfusion/ej2-base';
import { getElement } from '../utils/helper';
import { beforePrint } from '../model/constants';
/**
 * Annotation Module handles the Annotation for chart and accumulation series.
 */
var ExportUtils = /** @class */ (function () {
    /**
     * Constructor for chart and accumulation annotation
     * @param control
     */
    function ExportUtils(control) {
        this.control = control;
    }
    /**
     * To print the accumulation and chart elements
     * @param elements
     */
    ExportUtils.prototype.print = function (elements) {
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(elements), name: beforePrint
        };
        this.control.trigger(beforePrint, argsData);
        if (!argsData.cancel) {
            printWindow(argsData.htmlContent, this.printWindow);
        }
    };
    /**
     * To get the html string of the chart and accumulation
     * @param elements
     * @private
     */
    ExportUtils.prototype.getHTMLContent = function (elements) {
        var div = createElement('div');
        if (elements) {
            if (elements instanceof Array) {
                elements.forEach(function (value) {
                    div.appendChild(getElement(value).cloneNode(true));
                });
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            div.appendChild(this.control.element.cloneNode(true));
        }
        return div;
    };
    /**
     * To export the chart svgObject
     * @param type
     * @param fileName
     */
    ExportUtils.prototype.export = function (type, fileName) {
        var element = createElement('canvas', {
            id: 'ej2-canvas',
            attrs: {
                'width': this.control.availableSize.width.toString(),
                'height': this.control.availableSize.height.toString()
            }
        });
        var url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(this.control.svgObject)], { type: 'image/svg+xml' }));
        var image = new Image();
        var ctx = element.getContext('2d');
        image.onload = (function () {
            ctx.drawImage(image, 0, 0);
            window.URL.revokeObjectURL(url);
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(element.msToBlob(), fileName + '.' + type.toLocaleLowerCase());
            }
            else {
                var imgURI = element.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                createElement('a', {
                    attrs: {
                        'download': fileName + '.' + type.toLocaleLowerCase(),
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
    };
    return ExportUtils;
}());
export { ExportUtils };
