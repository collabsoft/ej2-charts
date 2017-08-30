/**
 * Datetime spec document
 */
import { createElement } from '@syncfusion/ej2-base';
import { Chart } from '../../../src/chart/chart';
import { LineSeries } from '../../../src/chart/series/line-series';
import { definition1, definition2, definition3 } from '../base/data.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { unbindResizeEvents } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs } from '../../../src/common/model/interface';
Chart.Inject(LineSeries);

describe('Chart Control', () => {
    let ele: HTMLElement;
    let loaded: EmitType<ILoadedEventArgs>;
    describe('Row Definition', () => {
        let chartObj: Chart;
        beforeAll((): void => {
            ele = createElement('div', { id: 'chartContainer' });
            document.body.appendChild(ele);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', minimum: 110, maximum: 150, interval: 10, rangePadding: 'None'  },
                    axes: [{
                        rowIndex: 1, name: 'yAxis1', minimum: 20, maximum: 80, interval: 20, title: 'Axis2',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            animation: { enable: false }, dataSource: definition1, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis1',
                            animation: { enable: false }, dataSource: definition2, xName: 'x', yName: 'y'
                        }], height: '600', title: 'Chart TS Title',
                    rows: [{ height: '300', border: { width: 4, color: 'red' } },
                    { height: '300', border: { width: 4, color: 'blue' } }], legendSettings: { visible: false}
                });
            chartObj.appendTo('#chartContainer');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            ele.remove();
        });

        it('Checking Row Definition with pixel', (done: Function) => {

            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('chartContainer_AxisBottom_Row0');
             
                expect(svg.getAttribute('y1') == '543.5' || svg.getAttribute('y1') == '539.5').toBe(true);
                expect(svg.getAttribute('stroke') == 'red').toBe(true);
                svg = document.getElementById('chartContainer_AxisBottom_Row1');
              
                expect(svg.getAttribute('y1') == '243.5' || svg.getAttribute('y1') == '239.5').toBe(true);
                expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });

        it('Checking Row Definition with percentage', (done: Function) => {
            chartObj.primaryYAxis.rowIndex = 1;
            chartObj.axes[0].rowIndex = 0; chartObj.width = '900';
            chartObj.rows[0].height = '50%'; chartObj.rows[1].height = '50%';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('chartContainer_AxisTitle_1');
                
                expect(svg.getAttribute('y') == '155.0625' || svg.getAttribute('y') == '156.3125').toBe(true);
                svg = document.getElementById('chartContainer1_AxisLabel_0');
                
                expect(svg.getAttribute('y') == '291' || svg.getAttribute('y') == '290.75').toBe(true);
                
                expect(svg.getAttribute('x') == '49' || svg.getAttribute('x') == '52').toBe(true);

                svg = document.getElementById('chartContainer_AxisTitle_2');
               
                expect(svg.getAttribute('y') == '410.6875' || svg.getAttribute('y') == '408.4375').toBe(true);

                svg = document.getElementById('chartContainer2_AxisLabel_3');
                
                expect(svg.getAttribute('y') == '291' || svg.getAttribute('y') == '290.75').toBe(true);
               
                expect(svg.getAttribute('x') == '49' || svg.getAttribute('x') == '52').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });
    });
    describe('Row Definition with spanning', () => {
        let chart: Chart;
        beforeAll((): void => {
            ele = createElement('div', { id: 'chartContainer' });
            document.body.appendChild(ele);
            chart = new Chart(
                {
                    border: { width: 1, color: "black" }, primaryXAxis: { title: '' },
                    primaryYAxis: { title: 'Axis1', span: 2, rangePadding: 'None'  }, title: '',
                    axes: [
                        {
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis2', majorGridLines: { width: 0 }, rowIndex: 1, minimum: 100, maximum: 160, interval: 20
                        },
                        {
                            title: 'Axis3', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis3', majorGridLines: { width: 0 }, rowIndex: 1, span: 2, minimum: 100, maximum: 160, interval: 20
                        },
                        {
                            title: 'Axis4', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis4', majorGridLines: { width: 0 }, rowIndex: 2, plotOffset: 10, minimum: 100, maximum: 160, interval: 10
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, dataSource: definition3,
                            animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'pink', width: 2, yAxisName: 'yAxis2',
                            dataSource: definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series3', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis3',
                            dataSource: definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series4', type: 'Line', fill: 'blue', width: 2, yAxisName: 'yAxis4',
                            dataSource: definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },

                    ],
                    rows: [
                        { height: '300' },
                        { height: '200' },
                        { height: '200' },
                    ], height: '700', width: '900', legendSettings: { visible: false}
                });
            chart.appendTo('#chartContainer');
            unbindResizeEvents(chart);
        });

        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('Checking the Spanning axis', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('chartContainer1_AxisLabel_6');                
                expect(svg.getAttribute('y') == '166' || svg.getAttribute('y') == '166.75').toBe(true);
                
               
                expect(svg.getAttribute('x') == '173' || svg.getAttribute('x') == '162').toBe(true);

                svg = document.getElementById('chartContainer_AxisTitle_1');
            
                expect(svg.getAttribute('y') == '409.5' || svg.getAttribute('y') == '408.5').toBe(true);

                svg = document.getElementById('chartContainer_AxisTitle_2');
              
                expect(svg.getAttribute('y') == '259.5' || svg.getAttribute('y') == '258.5').toBe(true);
             
                expect(svg.getAttribute('x') == '92' || svg.getAttribute('x') == '86').toBe(true);

                svg = document.getElementById('chartContainer2_AxisLabel_3');
            
                expect(svg.getAttribute('y') == '167.5' || svg.getAttribute('y') == '166.75').toBe(true);
              
                expect(svg.getAttribute('x') == '114.5' || svg.getAttribute('x') == '108.5').toBe(true);

                svg = document.getElementById('chartContainer_AxisTitle_3');
               
                expect(svg.getAttribute('y') == '181.375' || svg.getAttribute('y') == '181.875').toBe(true);
               
                expect(svg.getAttribute('x') == '29.5' || svg.getAttribute('x') == '26.5').toBe(true);

                svg = document.getElementById('chartContainer3_AxisLabel_3');
                
                expect(svg.getAttribute('y') == '13.5' || svg.getAttribute('y') == '13.75').toBe(true);
                 
                expect(svg.getAttribute('x') == '52' || svg.getAttribute('x') == '49').toBe(true);

                svg = document.getElementById('chartContainer_AxisTitle_4');
                
                expect(svg.getAttribute('y') == '81.375' || svg.getAttribute('y') == '81.875').toBe(true);
               
                expect(svg.getAttribute('x') == '150.5' || svg.getAttribute('x') == '139.5').toBe(true);

                svg = document.getElementById('chartContainer4_AxisLabel_3');
              
                expect(svg.getAttribute('y') == '90' || svg.getAttribute('y') == '89.75').toBe(true);
                 
                expect(svg.getAttribute('x') == '173' || svg.getAttribute('x') == '162').toBe(true);
                done();
            };
            chart.loaded = loaded;
            unbindResizeEvents(chart);

        });
        it('Checking the Spanning axis with opposedPosition', (done: Function) => {
            chart.primaryYAxis.opposedPosition = true;
            chart.axes = [{ opposedPosition: true }, { opposedPosition: true, span: 3 }, { opposedPosition: true }];
            chart.refresh();
            unbindResizeEvents(chart);
            loaded = (args: Object): void => {
                done();
            };
            chart.loaded = loaded;
        });
    });

    describe('Checking Row Definition with opposedPosition', () => {
        let chartEle: Chart;
        ele = createElement('div', { id: 'chartContainer' });
        beforeAll(() => {
            document.body.appendChild(ele);
            chartEle = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { opposedPosition: true, title: 'PrimaryYAxis', minimum: 110, maximum: 150, interval: 10, rangePadding: 'None' },
                    axes: [
                        {
                            rowIndex: 2,
                            opposedPosition: true,
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis1',
                            minimum: 20, maximum: 80, interval: 20,
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            animation: { enable: false }, dataSource: definition1, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis1',
                            animation: { enable: false }, dataSource: definition2, xName: 'x', yName: 'y'
                        },
                    ],
                    height: '600', title: 'Chart TS Title',
                    rows: [
                        {
                            height: '300', border: { width: 4, color: 'red' },
                        },
                        {
                            height: '300', border: { width: 4, color: 'blue' },
                        }
                    ], legendSettings: { visible: false}
                }, '#chartContainer');
                unbindResizeEvents(chartEle);

        });

        afterAll((): void => {
            chartEle.destroy();
            ele.remove();
        });

        it('Checking the bottom line with opposed position', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('chartContainer_AxisBottom_Row0');
                
                expect(svg.getAttribute('y2') == '543.5' || svg.getAttribute('y2') == '539.5').toBe(true);

                expect(svg.getAttribute('stroke') == 'red').toBe(true);
                svg = document.getElementById('chartContainer_AxisBottom_Row1');
               
                expect(svg.getAttribute('y2') == '243.5' || svg.getAttribute('y2') == '239.5').toBe(true);

                expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                done();
            };
            chartEle.loaded = loaded;
            unbindResizeEvents(chartEle);
        });
    });
});