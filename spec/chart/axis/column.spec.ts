/**
 * ColumnDefinition spec document
 */
import { createElement } from '@syncfusion/ej2-base';
import { Chart } from '../../../src/chart/chart';
import { LineSeries } from '../../../src/chart/series/line-series';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { definition5, definition6, definition3, definition1, definition4 } from '../base/data.spec';
import { unbindResizeEvents } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs, IPointRenderEventArgs } from '../../../src/common/model/interface';
Chart.Inject(LineSeries);

describe('Chart Control', () => {
    let ele: HTMLElement;
    let svg: HTMLElement;
    let loaded: EmitType<ILoadedEventArgs>;
    describe('Checking Column Definition', () => {
        let chartObj: Chart;
        beforeAll((): void => {
            ele = createElement('div', { id: 'chartContainer' });
            document.body.appendChild(ele);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None'  },
                    axes: [
                        {
                            columnIndex: 1, name: 'yAxis1', title: 'Axis2', rangePadding: 'None',
                            titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            dataSource: definition5, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, xAxisName: 'yAxis1',
                            dataSource: definition6, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                    ],
                    height: '600', width: '900', title: 'Chart TS Title',
                    columns: [
                        {
                            width: '400', border: { width: 4, color: 'red' }
                        },
                        {
                            width: '400', border: { width: 4, color: 'blue' }
                        }
                    ], legendSettings: { visible: false }
                }, '#chartContainer');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            ele.remove();
        });
        it('Checking the bottom line', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('chartContainer_AxisBottom_Column0');
                
                expect(svg.getAttribute('x1') == '58.5' || svg.getAttribute('x1') == '53.5').toBe(true);
                expect(svg.getAttribute('stroke') == 'red').toBe(true);
                svg = document.getElementById('chartContainer_AxisBottom_Column1');
                 
                expect(svg.getAttribute('x1') == '458.5' ||svg.getAttribute('x1') == '453.5').toBe(true);
                expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            unbindResizeEvents(chartObj);
        });

        it('Checking column Definition with percentage', (done: Function) => {

            chartObj.primaryXAxis.columnIndex = 1;
            chartObj.axes[0].columnIndex = 0;
            chartObj.columns[0].width = '50%'; chartObj.columns[1].width = '50%';
            chartObj.refresh();
            unbindResizeEvents(chartObj);

            loaded = (args: Object): void => {
                svg = document.getElementById('chartContainer_AxisTitle_1');
              
                expect(svg.getAttribute('y') == '282.375' || svg.getAttribute('y') == '282.875').toBe(true);
                svg = document.getElementById('chartContainer1_AxisLabel_0');
              
                expect(svg.getAttribute('y') == '543' || svg.getAttribute('y') == '546.75').toBe(true);
                 
                 expect(svg.getAttribute('x') == '48' || svg.getAttribute('x') == '43').toBe(true);

                svg = document.getElementById('chartContainer_AxisTitle_2');
                  
                expect(svg.getAttribute('y') == '584.75' || svg.getAttribute('y') == '585.5').toBe(true);

                svg = document.getElementById('chartContainer2_AxisLabel_3');
                  
                expect(svg.getAttribute('y') == '562' || svg.getAttribute('y') == '565.25').toBe(true);
                 
                expect(svg.getAttribute('x') == '363.3125' || svg.getAttribute('x') == '361.1875').toBe(true);
 
                svg = document.getElementById('chartContainer_AxisTitle_0');
                
                expect(svg.getAttribute('y') == '584.75' || svg.getAttribute('y') == '585.5').toBe(true);
                
                expect(svg.getAttribute('x') == '682.125' || svg.getAttribute('x') == '680.875').toBe(true);

                svg = document.getElementById('chartContainer0_AxisLabel_2');
                 
                expect(svg.getAttribute('y') == '562' || svg.getAttribute('y') == '565.25').toBe(true);
                 
                expect(svg.getAttribute('x') == '675.625' || svg.getAttribute('x') == '674.875').toBe(true);
 
                svg = document.getElementById('chartContainer_AxisTitle_2');
                            
                expect(svg.getAttribute('y') == '584.75' || svg.getAttribute('y') == '585.5').toBe(true);
                            
                expect(svg.getAttribute('x') == '266.375' || svg.getAttribute('x') == '262.625').toBe(true);

                svg = document.getElementById('chartContainer2_AxisLabel_4');
                             
                expect(svg.getAttribute('y') == '562' || svg.getAttribute('y') == '565.25').toBe(true);
                             
                expect(svg.getAttribute('x') == '467.75' || svg.getAttribute('x') == '465.75').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            unbindResizeEvents(chartObj);
        });
    });
    describe('Checking Column Definition with Spanning', () => {
        let chartElem: Chart;
        beforeAll((): void => {
            ele = createElement('div', { id: 'chartContainer' });
            document.body.appendChild(ele);
            chartElem = new Chart({
                border: { width: 1, color: 'black' },
                primaryXAxis: { title: '', span: 2 },
                primaryYAxis: { title: 'Axis1', rangePadding: 'None'  },
                title: '',
                axes: [
                    {
                        title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        name: 'yAxis2', majorGridLines: { width: 0 }, columnIndex: 1, rangePadding: 'None'
                    },
                    {
                        title: 'Axis3', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        name: 'yAxis3', majorGridLines: { width: 0 }, columnIndex: 1, span: 2, rangePadding: 'None'
                    },
                    {
                        title: 'Axis4', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        name: 'yAxis4', majorGridLines: { width: 0 }, columnIndex: 2, plotOffset: 10, rangePadding: 'None'
                    }
                ],
                series: [
                    {
                        name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                        dataSource: definition3, xName: 'x', yName: 'y', animation: { enable: false }
                    },

                    {
                        name: 'series2', type: 'Line', fill: 'pink', width: 2, xAxisName: 'yAxis2',
                        dataSource: definition1, xName: 'x', yName: 'y', animation: { enable: false }
                    },
                    {
                        name: 'series3', type: 'Line', fill: 'red', width: 2, xAxisName: 'yAxis3',
                        dataSource: definition4, xName: 'x', yName: 'y', animation: { enable: false }
                    },
                    {
                        name: 'series4', type: 'Line', fill: 'blue', width: 2, xAxisName: 'yAxis4',
                        dataSource: definition1, xName: 'x', yName: 'y', animation: { enable: false }
                    },

                ],
                columns: [
                    { width: '300' },
                    { width: '300' },
                    { width: '300' },
                ], height: '600', width: '900', legendSettings: { visible: false }
            }, '#chartContainer');
            unbindResizeEvents(chartElem);

        });

        afterAll((): void => {
            chartElem.destroy();
            ele.remove();
        });
        it('Axis Spanning', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('chartContainer_AxisTitle_2');
              
                expect(svg.getAttribute('y') == '528' || svg.getAttribute('y') == '523.25').toBe(true);
               
                expect(svg.getAttribute('x') == '512.5' || svg.getAttribute('x') == '509.5').toBe(true);

                svg = document.getElementById('chartContainer_AxisTitle_3');
                
                expect(svg.getAttribute('y') == '584.5' || svg.getAttribute('y') == '583.75').toBe(true);
                
                expect(svg.getAttribute('x') == '624.25' || svg.getAttribute('x') == '625.75').toBe(true);

                svg = document.getElementById('chartContainer_AxisTitle_4');
                
                expect(svg.getAttribute('y') == '492.5' || svg.getAttribute('y') == '486.75').toBe(true);
               
                expect(svg.getAttribute('x') == '774.25' || svg.getAttribute('x') == '775.75').toBe(true);
                done();
            };
            unbindResizeEvents(chartElem);
            chartElem.loaded = loaded;
        });
        it('Checking the Spanning axis with opposedPosition', (done: Function) => {
            chartElem.primaryXAxis.opposedPosition = true;
            chartElem.axes = [{ opposedPosition: true }, { opposedPosition: true, span: 3 }, { opposedPosition: true }];
            chartElem.refresh();
            unbindResizeEvents(chartElem);
            loaded = (args: Object): void => {
                done();
            };
            unbindResizeEvents(chartElem);
            chartElem.loaded = loaded;
        });
    });

    describe('Checking Column Definition with oppossed position', () => {
        let chart: Chart;
        beforeAll(() => {
            ele = createElement('div', { id: 'chartContainer' });
            document.body.appendChild(ele);
            chart = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', opposedPosition: true  },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None'  },
                    axes: [
                        {
                            columnIndex: 2, opposedPosition: true, name: 'yAxis1', rangePadding: 'None',
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            dataSource: definition5, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, xAxisName: 'yAxis1',
                            dataSource: definition6, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                    ], height: '600', width: '900', title: 'Chart TS Title',
                    columns: [
                        {
                            width: '400', border: { width: 4, color: 'red' }
                        },
                        {
                            width: '400', border: { width: 4, color: 'blue' }
                        }
                    ], legendSettings: { visible: false }
                }, '#chartContainer');
            unbindResizeEvents(chart);
        });

        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });
        it('Checking the bottom line with opposed position', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('chartContainer_AxisBottom_Column0');
            
                expect(svg.getAttribute('x2') == '58.5' || svg.getAttribute('x2') == '53.5').toBe(true);

                expect(svg.getAttribute('stroke') == 'red').toBe(true);
                svg = document.getElementById('chartContainer_AxisBottom_Column1');
              
                expect(svg.getAttribute('x2') == '458.5' || svg.getAttribute('x2') == '453.5').toBe(true);               
                expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                done();
            };
            chart.loaded = loaded;
            unbindResizeEvents(chart);
        });
    });
});