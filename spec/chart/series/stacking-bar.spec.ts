
/**
 * Specifies the Bar series spec.
 */
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { Chart } from '../../../src/chart/chart';
import { ChartSeriesType, ChartRangePadding, ValueType } from '../../../src/chart/utils/enum';
import { LineSeries } from '../../../src/chart/series/line-series';
import { Marker } from '../../../src/chart/series/marker';
import { StackingBarSeries } from '../../../src/chart/series/stacking-bar-series';
import { ColumnSeries } from '../../../src/chart/series/column-series';
import { DataLabel } from '../../../src/chart/series/data-label';
import { Series, Points } from '../../../src/chart/series/chart-series';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Category } from '../../../src/chart/axis/category-axis';
import { BarSeries } from '../../../src/chart/series/bar-series';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { unbindResizeEvents } from '../base/data.spec';
import { tooltipData1, tooltipData2, datetimeData, categoryData, categoryData1, negativeDataPoint } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs, IPointRenderEventArgs } from '../../../src/chart/model/interface';
Chart.Inject(LineSeries, Marker, StackingBarSeries, ColumnSeries, DateTime, Category, BarSeries, DataLabel);
let data: any = tooltipData1;
let data2: any = tooltipData2;
let dateTime: any = datetimeData;
export interface Arg {
    chart: Chart;
}

describe('Chart Control', () => {
    describe('Chart stackingBar series', () => {
        let chartObj: Chart;
        let elem: HTMLElement;
        let point1: HTMLElement;
        let point2: HTMLElement;
        let point3: HTMLElement;
        let svg: HTMLElement;
        let targetElement: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let done: Function;
        let dataLabel1: HTMLElement;
        let dataLabel2: HTMLElement;
        let dataLabel3: HTMLElement;

        beforeAll(() => {
            elem = createElement('div', { id: 'container' });
            document.body.appendChild(elem);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)', stackingGroup: ''
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)', stackingGroup: ''
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)', stackingGroup: ''
                    },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            elem.remove();
        });
        it('Checking with default points', (done: Function) => {
            loaded = (args: Object): void => {
                point1 = document.getElementById('container_Series_0_Point_0');
                expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                point2 = document.getElementById('container_Series_1_Point_1');
                expect(point2.getAttribute('fill') == 'rgba(135,000,235,1)').toBe(true);
                point3 = document.getElementById('container_Series_2_Point_1');
                expect(point3.getAttribute('fill') == 'rgba(135,000,000,1)').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });
        it('Checking with null Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_3');
                expect(svg == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = data;
            chartObj.series[0].dataSource[3].y = null;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });


        it('Checking with single Points', (done: Function) => {

            loaded = (args: Object): void => {
                let svg1: HTMLElement = document.getElementById('container_Series_0_Point_0');
                expect(svg1 != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.rangePadding = 'Additional';
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.series[0].dataSource = null;
            chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
            chartObj.series[1].dataSource = null;
            chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
            chartObj.series[2].dataSource = null;
            chartObj.series[2].dataSource = [{ x: 4, y: 30 }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with single Points for stackingbar100 series', (done: Function) => {

            loaded = (args: Object): void => {
                let svg1: HTMLElement = document.getElementById('container_Series_0_Point_0');
                expect(svg1 != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.rangePadding = 'Additional';
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.series[0].dataSource = null;
            chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
            chartObj.series[1].dataSource = null;
            chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
            chartObj.series[2].dataSource = null;
            chartObj.series[2].dataSource = [{ x: 4, y: 30 }];
            chartObj.series[0].type = 'StackingBar100';
            chartObj.series[1].type = 'StackingBar100';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });


        it('Checking with negative Points', (done: Function) => {
            loaded = (args: Arg): void => {
                let zeroLabel = document.getElementById('container1_AxisLabel_3');
                let series1: Series = <Series>args.chart.series[0];

                expect(series1.points[1].region.y < parseFloat(zeroLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].type = 'StackingBar';
            chartObj.series[1].type = 'StackingBar';
            chartObj.series[0].dataSource = negativeDataPoint;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('checking multiple series chart', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                expect(series1.points[2].region.y == series2.points[2].region.height + series2.points[2].region.y).toBe(true);
                done();
            }
            chartObj.series = [{
                dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)', stackingGroup: 'a'
            },
            {
                dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)', stackingGroup: 'b'
            },
            {
                dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
            }
            ];

            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking multiple series with diff orientation(horizontal) ', (done: Function) => {
            loaded = (args: Object): void => {
                let point1 = document.getElementById('container_Series_0_Point_0');
                let point2 = document.getElementById('container_Series_1_Point_0');
                expect(point2 == null).toBe(true);
                done();
            }
            chartObj.series = [{
                dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
            },
            {
                dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
            },
            {
                dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
            }
            ];
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it(' checking with category  axis', (done: Function) => {
            loaded = (args: Object): void => {
                point1 = document.getElementById("container_Series_0_Point_1");
                let point2 = document.getElementById("container_Series_1_Point_1")
                expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                done();
            }
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Category';
            chartObj.series = [{
                dataSource: categoryData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
            },
            {
                dataSource: categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
            },
            {
                dataSource: categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
            }],

                chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it(' checking with datetime  axis', (done: Function) => {
            loaded = (args: Object): void => {
                point1 = document.getElementById("container_Series_0_Point_1");
                let point2 = document.getElementById("container_Series_1_Point_1")
                expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                done();
            }
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'DateTime';
            chartObj.series = [{
                dataSource: datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)'
            },
            {
                dataSource: datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(000,206,235,1)'
            }],
                chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with multiple axes ', (done: Function) => {
            loaded = (args: Object): void => {
                point1 = document.getElementById('container_Series_0_Point_0');
                expect(point1.getAttribute('fill') === 'red').toBe(true);
                point2 = document.getElementById('container_Series_1_Point_1');
                expect(point2.getAttribute('fill') === 'rgba(135,000,235,1)').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.axes = [{
                columnIndex: 1, name: 'xAxis1', title: 'AdditionalAxis',
                titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
            }];
            chartObj.series = [{
                dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameGold', fill: 'red'
            },
            {
                dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)'
            },
            {
                dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNamePearl', fill: 'rgba(135,000,000,1)'
            },
            {
                dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
            }],
                chartObj.width = '800';
            chartObj.series[1].yAxisName = 'xAxis1';
            chartObj.series[2].yAxisName = 'xAxis1';
            chartObj.columns = [{ width: '400', border: { width: 4, color: 'red' } },
            { width: '400', border: { width: 4, color: 'blue' } }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking animation', (done: Function) => {

           let animate: EmitType<IAnimationCompleteEventArgs> = (args: series1): void => {
                let point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                done();
            };
            chartObj.loaded  = null;
            chartObj.series[0].animation.enable = true;
            chartObj.series[1].animation.enable = true;
            chartObj.series[2].animation.enable = true;
            chartObj.series[3].animation.enable = true;
            chartObj.animationComplete = animate;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking animation for stackingbar100 series', (done: Function) => {

           let animate: EmitType<IAnimationCompleteEventArgs> = (args: series1): void => {
                let point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                done();
            };
            chartObj.series[0].type ='StackingBar100';
            chartObj.series[1].type ='StackingBar100';
            chartObj.series[2].type ='StackingBar100';
            chartObj.series[3].type ='StackingBar100';
            chartObj.animationComplete = animate;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
    });
    describe('StackingBar Series with data label', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: HTMLElement;
        element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        animation: { enable: false },
                        name: 'ChartSeriesNameGold', dataSource: negativeDataPoint, xName: 'x', yName: 'y',
                        type: 'StackingBar', fill: 'rgba(135,206,235,1)', stackingGroup: 'a',
                        marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                    },
                    {
                        animation: { enable: false },
                        name: 'ChartSeriesNameSilver', dataSource: data2, xName: 'x', yName: 'y',
                        type: 'StackingBar', fill: 'green', stackingGroup: 'a',
                        marker: { visible: false, dataLabel: { visible: true, fill: 'black' } }
                    },
                    {
                        animation: { enable: false },
                        name: 'ChartSeriesNameSilver', dataSource: data2, xName: 'x', yName: 'y',
                        type: 'StackingBar', fill: 'yellow', stackingGroup: 'b',
                        marker: { visible: false, dataLabel: { visible: true, fill: 'black' } }
                    },
                    ],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            element.remove();
        });

        it('With negative location with auto position', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).region.x;
                expect(svg > point0Location).toBe(true);
                svg = +document.getElementById('container_Series_2_Point_6_TextShape').getAttribute('x');
                point0Location = (<Points>(<Series>chartObj.series[2]).points[6]).region.x;
                expect(svg == (point0Location + 5)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With negative location with auto position for stackingbar100', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).region.x;
                expect(svg > point0Location).toBe(true);
                svg = +document.getElementById('container_Series_2_Point_6_TextShape').getAttribute('x');
                point0Location = (<Points>(<Series>chartObj.series[2]).points[6]).region.x;
                expect(svg == (point0Location + 5)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].type = 'StackingBar100';
            chartObj.series[1].type = 'StackingBar100';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Top for stackingbar100', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.x;
                expect(svg > point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.x;
                expect(svg1 < point0Location1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Top for stackingbar', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.x;
                expect(svg > point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.x;
                expect(svg1 < point0Location1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.series[0].type = 'StackingBar';
            chartObj.series[1].type = 'StackingBar';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Outer for stackingbar', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.x;
                expect(svg > point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.x;
                expect(svg1 < point0Location1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Outer';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Outer for stackingbar100', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.x;
                expect(svg > point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.x;
                expect(svg1 < point0Location1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Outer';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.series[0].type = 'StackingBar100';
            chartObj.series[1].type = 'StackingBar100';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Top and alignment near for stackingbar100', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.x;
                expect(svg > point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.x;
                expect(svg1 < point0Location1).toBe(true); done();
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[0].marker.dataLabel.alignment = 'Near';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Top and alignment near for stackingbar', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.x;
                expect(svg > point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.x;
                expect(svg1 < point0Location1).toBe(true); done();
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[0].marker.dataLabel.alignment = 'Near';
            chartObj.series[0].type = 'StackingBar';
            chartObj.series[1].type = 'StackingBar';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Bottom for stackingbar', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).region.x +
                    (<Points>(<Series>chartObj.series[0]).points[1]).region.width;
                expect(svg < point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).region.x;
                expect(svg1 > point0Location1).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.series[1].marker.dataLabel.position = 'Bottom';
            chartObj.series[2].marker.dataLabel.position = 'Bottom';

            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Bottom for stackingbar100', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).region.x +
                    (<Points>(<Series>chartObj.series[0]).points[1]).region.width;
                expect(svg < point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).region.x;
                expect(svg1 > point0Location1).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.series[1].marker.dataLabel.position = 'Bottom';
            chartObj.series[2].marker.dataLabel.position = 'Bottom';
            chartObj.series[0].type = 'StackingBar100';
            chartObj.series[1].type = 'StackingBar100';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Middle for stackingbar100', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                let svgHeight: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('height');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                expect(svg < point0Location).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.series[1].marker.dataLabel.position = 'Middle';
            chartObj.series[2].marker.dataLabel.position = 'Middle';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Middle for stackingbar', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                let svgHeight: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('height');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                expect(svg < point0Location).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.series[1].marker.dataLabel.position = 'Middle';
            chartObj.series[2].marker.dataLabel.position = 'Middle';
            chartObj.series[0].type = 'StackingBar';
            chartObj.series[1].type = 'StackingBar';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('Color saturation middle position', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'white').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.fill = 'red';
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.series[0].marker.dataLabel.alignment = 'Far';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });

        it('Color saturation fill as transparent', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.fill = 'transparent';
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('Color saturation with chart area background black', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.chartArea.background = 'black';
            chartObj.chartArea.border = {
                color: ''
            };
            chartObj.series[0].marker.dataLabel.position = 'Outer';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
          it('Checking Events', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_2');
                expect(element.getAttribute('fill') == 'brown').toBe(true);
                element = document.getElementById('container_Series_0_Point_0');
                expect(element == null).toBe(true);
                done();
            };
          chartObj.pointRender =  (args : IPointRenderEventArgs) => {
              if(args.point.index === 0) {
                    args.cancel = true;
              }
               if(args.point.index === 2) {
                   args.fill = 'brown';
               }
           }
          chartObj.loaded = loaded;
          chartObj.title = 'Events Changed';
          chartObj.dataBind();
         });
    });
});


export interface series1 {
    series: Series;
}