/**
 * Chart spec document
 */

import { createElement } from '@syncfusion/ej2-base/dom';
import { Chart } from '../../../src/chart/chart';
import { LineSeries } from '../../../src/chart/series/line-series';
import { unbindResizeEvents } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs } from '../../../src/chart/model/interface';
Chart.Inject(LineSeries);



describe('Chart Control', () => {
    describe('Chart direct properties and its behavior', () => {
        let chart: Chart;
        let ele: HTMLElement;
        let svg: HTMLElement;
        let text: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        beforeAll((): void => {
            ele = createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            chart = new Chart();
            chart.appendTo('#container');
            unbindResizeEvents(chart);
        });

        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('Checking chart instance creation', (done: Function) => {
            loaded = (args: Object): void => {
                expect(chart != null).toBe(true);
                done();
            }
            chart.loaded = loaded;
        });
        it('Checking with empty options', () => {
            let className: string = document.getElementById('container').className;
            expect(className).toEqual('e-control e-chart e-touch');
        });
        it('Checking module name', () => {
            expect(chart.getModuleName()).toBe('chart');
        });
        it('Checking with empty size property', () => {
            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('width') != null).toBe(true);
        });
        it('Checking the null height of the chart', () => {
            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('height')).toEqual('450');
        });
        it('Checking the null width of the chart', (done: Function) => {
            chart.width = null;
            ele.setAttribute('style', 'width:0px');
            chart.loaded = (args: Object) => {
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width')).toEqual('600');
                done();
            };
            chart.refresh();
            unbindResizeEvents(chart);
        });
        it('Checking the percentage size of the chart', (done: Function) => {
            chart.width = '50%';
            ele.setAttribute('style', 'width:900px');
            chart.loaded = (args: Object) => {
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width')).toEqual('450');
                done();
            };
            chart.refresh();
            unbindResizeEvents(chart);
        });
        it('Checking the width of the chart', () => {
            chart.width = '500';
            chart.loaded = null;
            chart.dataBind();
            unbindResizeEvents(chart);
            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('width')).toEqual('500');
        });
        it('Checking the height of the chart', () => {
            chart.height = '500';
            chart.dataBind();
            unbindResizeEvents(chart);
            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('height')).toEqual('500');
        });
        it('Checking both height and width of the chart', () => {
            chart.width = '500';
            chart.height = '300';
            chart.dataBind();
            unbindResizeEvents(chart);
            svg = document.getElementById('container_svg');
            expect(svg.getAttribute('width')).toEqual('500');
            expect(svg.getAttribute('height')).toEqual('300');
        });
        it('Checking with empty title', () => {
            text = document.getElementById('container_ChartTitle');
            expect(text == null).toBe(true);
        });
        it('Checking with  title', () => {
            chart.title = 'Syncfusion Chart Title';
            chart.dataBind();
            unbindResizeEvents(chart);
            text = document.getElementById('container_ChartTitle');
            expect(text.textContent == 'Syncfusion Chart Title').toBe(true);
            expect(text.getAttribute('y')).toEqual('25');
        });

        it('Checking the title font size', () => {
            chart.title = 'Chart Title';
            chart.titleStyle.size = '24px';
            chart.dataBind();
            text = document.getElementById('container_ChartTitle');
            expect(text.getAttribute('font-size')).toEqual('24px');
        });
        it('Checking the border color', () => {
            chart.border.width = 2;
            chart.border.color = 'green';
            chart.dataBind();
            svg = document.getElementById('container_ChartBorder');
            expect(svg.getAttribute('stroke') == 'green').toBe(true);
            expect(svg.getAttribute('stroke-width') == '2').toBe(true);
        });

        it('Checking the Chart Area border color', () => {
            chart.chartArea.border.color = 'red';
            chart.chartArea.background = 'green';
            chart.chartArea.opacity = 0.5;
            chart.dataBind();
            svg = document.getElementById('container_ChartAreaBorder');
            expect(svg.getAttribute('stroke') == 'red').toBe(true);
            expect(svg.getAttribute('fill') == 'green').toBe(true);
            expect(svg.getAttribute('opacity') == '0.5').toBe(true);
        });
        it('Checking the Chart background', () => {
            chart.background = 'yellow';
            chart.dataBind();
            svg = document.getElementById('container_ChartBorder');            
            expect(svg.getAttribute('fill') == 'yellow').toBe(true);
        });

        it('Checking context menu event', () => {
            let menu: Event = document.createEvent('MouseEvent');
            menu.initEvent('contextmenu', true, false);
            ele.dispatchEvent(menu);
            expect(ele).not.toBe(null);
        });
    });
});