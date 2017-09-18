
/**
 * Specifies the  Spline series spec.
 */
import { remove, createElement } from '@syncfusion/ej2-base';
import { Chart } from '../../../src/chart/chart';
import {
    ChartSeriesType, ChartRangePadding, ValueType,
    ChartShape, LabelPlacement
} from '../../../src/chart/utils/enum';
import { Marker } from '../../../src/chart/series/marker';
import { } from '../../../src/chart/series/marker';
import { SplineSeries } from '../../../src/chart/series/spline-series';
import { ScatterSeries } from '../../../src/chart/series/scatter-series';
import { LineSeries } from '../../../src/chart/series/line-series';
import { StepLineSeries } from '../../../src/chart/series/step-line-series';
import { AreaSeries } from '../../../src/chart/series/area-series';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Category } from '../../../src/chart/axis/category-axis';
import { Series, Points } from '../../../src/chart/series/chart-series';
import { DataLabel } from '../../../src/chart/series/data-label'
import { unbindResizeEvents } from '../base/data.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { tooltipData1, tooltipData2, datetimeData, categoryData, negativeDataPoint, spline1 } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs } from '../../../src/common/model/interface';
export interface Series1 {
    series: Series
}

Chart.Inject(Marker, SplineSeries, ScatterSeries, StepLineSeries, LineSeries, Category, DateTime, AreaSeries, DataLabel);
let data: any = tooltipData1;
let data2: any = tooltipData2;
let datetime: any = datetimeData;
export interface Arg {
    chart: Chart;
}

describe('Chart Control', () => {
    describe('Chart Spline series', () => {
        let chartObj: Chart;
        let elem: HTMLElement;
        let svg: HTMLElement;
        let marker: HTMLElement;
        let datalabel: HTMLElement;
        let targetElement: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        beforeAll(() => {
            elem = createElement('div', { id: 'container' });
            document.body.appendChild(elem);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        dataSource: spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                        name: 'ChartSeriesNameGold', fill: 'green',
                    },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });
        afterAll((): void => {
            elem.remove();
            chartObj.destroy();
        });
        it('Checking without range', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0');
                expect(svg.getAttribute('stroke') === 'green').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });
        it('Checking with null Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_3_Symbol');
                expect(svg === null).toBe(true);
                let path = document.getElementById('container_Series_0');
                let id: string = path.getAttribute('d');
                let check: number = id.lastIndexOf('M');               
                expect(check !== 0).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource[3].y = null;
            chartObj.series[0].marker.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });

        it('Checking with negative Points', (done: Function) => {
            loaded = (args: Arg): void => {
                svg = document.getElementById('container1_AxisLabel_4');
                let series: Series = <Series>args.chart.series[0];
                expect(parseFloat(svg.getAttribute('y')) < series.points[4].symbolLocation.y).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = negativeDataPoint;
            chartObj.series[0].marker.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with single Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(svg != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = null;
            chartObj.series[0].dataSource = [{ x: 1, y: 1000 }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with marker shape Circle', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryYAxis.minimum = 0;
            chartObj.primaryYAxis.maximum = 80;
            chartObj.primaryYAxis.interval = 10;
            chartObj.series[0].marker.shape = 'Circle';
            chartObj.series[0].marker.fill = 'black';
            chartObj.series[0].dataSource = data;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape diamond', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Diamond';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        })
        it('checking with marker shape HorizontalLine', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'HorizontalLine';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape InvertedTriangle', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'InvertedTriangle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape Pentagon', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Pentagon';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape Triangle', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Triangle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape rectangle', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Rectangle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape verticalLine', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'VerticalLine';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape image', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(svg.getAttribute('href') === 'base/spec/img/img1.jpg').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Image';
            chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with marker visible false', (done: Function) => {
            loaded = (args: Object): void => {
                datalabel = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(datalabel === null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.visible = false;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });


        it('Checking with category axis', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Category';
            chartObj.series[0].dataSource = categoryData;
            chartObj.series[0].marker.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with category axis onticks', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Category';
            chartObj.primaryXAxis.labelPlacement = 'OnTicks';
            chartObj.series[0].dataSource = categoryData;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with multiple series', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('stroke') === 'red').toBe(true);
                svg = document.getElementById('container_Series_1');
                expect(svg.getAttribute('stroke') === 'rgba(135,206,235,1)').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series = [{ dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', type: 'Spline', animation: { enable: false } },
            { dataSource: data2, xName: 'x', name: 'silver', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Spline', animation: { enable: false } },
            { dataSource: data, xName: 'x', name: 'diamond', yName: 'y', fill: 'blue', type: 'Spline', animation: { enable: false } }];
            chartObj.series[0].marker.visible = true;
            chartObj.series[1].marker.visible = true;
            chartObj.series[2].marker.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('checking with dateTime', (done: Function) => {
            loaded = (args: Object): void => {
                let axislabel: HTMLElement = document.getElementById('container0_AxisLabel_3');
                expect(axislabel.textContent === 'Jul 2003').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = datetime;
            chartObj.series[1].dataSource = datetime;
            chartObj.series[2].dataSource = datetime;
            chartObj.primaryXAxis.valueType = 'DateTime';
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with range ', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('stroke') === 'red').toBe(true);
                svg = document.getElementById('container_Series_1');
                expect(svg.getAttribute('stroke') === 'rgba(135,206,235,1)').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.axes = [{
                rowIndex: 1, name: 'yAxis1', minimum: 20, maximum: 80, interval: 20,
                titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
            }];
            chartObj.height = '600';
            chartObj.series[1].yAxisName = 'yAxis1';
            chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
            { height: '300', border: { width: 4, color: 'blue' } }];
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });


        it('Checking with multiple axes ', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('stroke') === 'red').toBe(true);
                svg = document.getElementById('container_Series_1');
                expect(svg.getAttribute('stroke') === 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Double',
                chartObj.series = [
                    {
                        dataSource: spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                        name: 'ChartSeriesNameGold', fill: 'red',
                    },
                    {
                        dataSource: spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                        name: 'ChartSeriesNameSilver', fill: 'blue',
                    },
                    {
                        dataSource: spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                        name: 'ChartSeriesNameRuby', fill: 'green',
                    },
                    {
                        dataSource: spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                        name: 'ChartSeriesNamediamond', fill: 'black',
                    },
                ]


            chartObj.axes = [{
                rowIndex: 1, name: 'yAxis1',
                titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
            },
            {
                columnIndex: 1, name: 'xAxis1',
                titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
            }];
            chartObj.height = '650';
            chartObj.width = '800';
            chartObj.series[1].yAxisName = 'yAxis1';
            chartObj.series[2].xAxisName = 'xAxis1';
            chartObj.series[3].yAxisName = 'yAxis1';
            chartObj.series[3].xAxisName = 'xAxis1';

            chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
            { height: '300', border: { width: 4, color: 'blue' } }];
            chartObj.columns = [{ width: '400', border: { width: 4, color: 'red' } }, { width: '400', border: { width: 4, color: 'red' } }];
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with axis with opposed position', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let svg1: HTMLElement = document.getElementById('container2_AxisLabel_0');
                expect(parseFloat(svg.getAttribute('x')) + parseFloat(svg.getAttribute('width')) <
                    parseFloat(svg1.getAttribute('x'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.axes[0].opposedPosition = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
    });
    describe('spline Series with animation', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                        animation: { enable: true, duration: 1500 }, name: 'ChartSeriesNameGold',
                        dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                        { x: 3000, y: 70 }, { x: 4000, y: -60 },
                        { x: 5000, y: 50 }, { x: 6000, y: 40 },
                        { x: 7000, y: 40 }, { x: 8000, y: 70 }
                        ], xName: 'x', yName: 'y',
                        type: 'Spline', fill: 'rgba(135,206,235,1)',
                        marker: { visible: true }
                    }],

                    width: '800',
                    legendSettings: { visible: false },
                    title: 'Chart TS Title', loaded: loaded,

                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            document.getElementById('container').remove();
        });

        it('Default animation', (done: Function) => {
           let animate: EmitType<IAnimationCompleteEventArgs> = (args: Series1): void => {
                let series: Series = args.series;
                let element: HTMLElement = document.getElementById('container_ChartSeriesClipRect_0').childNodes[0] as HTMLElement;
                expect(series.clipRect.width === parseFloat(element.getAttribute('width'))).toBe(true);
                done();
            };
            chartObj.animationComplete = animate;
        });
    });
    describe('Spline Series Inversed axis', () => {
        let chart: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: HTMLElement;
        let dataLabelY;
        let pointY;
        element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chart = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', isInversed: true },
                    series: [{
                        animation: { enable: false },
                        name: 'ChartSeriesNameGold', dataSource: data, xName: 'x', yName: 'y', size: 'size',
                        type: 'Spline', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                    }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
            chart.appendTo('#container');
            unbindResizeEvents(chart);
        });

        afterAll((): void => {
            chart.destroy();
            element.remove();
        });

        it('With Label position Auto', (done: Function) => {
            loaded = (args: Object): void => {
                dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                pointY = (<Points>(<Series>chart.series[0]).points[2]).symbolLocation.y;
                expect(dataLabelY > pointY).toBe(true);
                dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                pointY = (<Points>(<Series>chart.series[0]).points[6]).symbolLocation.y;
                expect(dataLabelY < pointY).toBe(true);
                done();
            };
            chart.loaded = loaded;
            unbindResizeEvents(chart);
        });

        it('With Label position Outer', (done: Function) => {
            loaded = (args: Object): void => {
                dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                pointY = (<Points>(<Series>chart.series[0]).points[2]).symbolLocation.y;
                expect(dataLabelY < pointY).toBe(true);
                dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                pointY = (<Points>(<Series>chart.series[0]).points[6]).symbolLocation.y;
                expect(dataLabelY < pointY).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].marker.dataLabel.position = 'Outer';
            chart.refresh();
            unbindResizeEvents(chart);
        });

        it('With Label position Top', (done: Function) => {
            loaded = (args: Object): void => {
                dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                pointY = (<Points>(<Series>chart.series[0]).points[2]).symbolLocation.y;
                expect(dataLabelY < pointY).toBe(true);
                dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                pointY = (<Points>(<Series>chart.series[0]).points[6]).symbolLocation.y;
                expect(dataLabelY < pointY).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].marker.dataLabel.position = 'Top';
            chart.series[0].marker.dataLabel.alignment = 'Center';
            chart.refresh();
            unbindResizeEvents(chart);
        });
        it('With Label position Bottom', (done: Function) => {
            loaded = (args: Object): void => {
                dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                pointY = (<Points>(<Series>chart.series[0]).points[2]).symbolLocation.y;
                expect(dataLabelY > pointY).toBe(true);
                dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                pointY = (<Points>(<Series>chart.series[0]).points[6]).symbolLocation.y;
                expect(dataLabelY > pointY).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].marker.dataLabel.position = 'Bottom';
            chart.refresh();
            unbindResizeEvents(chart);
        });
        it('With Label position Middle', (done: Function) => {
            loaded = (args: Object): void => {
                let labelY: number = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                let labelHeight: number = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                let point: Points = (<Points>(<Series>chart.series[0]).points[1]);
                expect(labelY + labelHeight / 2).toEqual(point.region.y + point.region.height / 2);
                done();
            };
            chart.loaded = loaded;
            chart.series[0].marker.dataLabel.position = 'Middle';
            chart.refresh();
            unbindResizeEvents(chart);
        });
    });
});