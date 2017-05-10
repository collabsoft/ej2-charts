
/**
 * Specifies the  Scatter series spec.
 */
import { remove, createElement } from '@syncfusion/ej2-base/dom';
import { Chart } from '../../../src/chart/chart';
import { Marker } from '../../../src/chart/series/marker';
import { } from '../../../src/chart/series/marker';
import { ScatterSeries } from '../../../src/chart/series/scatter-series';
import { LineSeries } from '../../../src/chart/series/line-series';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Category } from '../../../src/chart/axis/category-axis';
import { Series, Points } from '../../../src/chart/series/chart-series';
import { Tooltip } from '../../../src/chart/user-interaction/tooltip';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { unbindResizeEvents } from '../base/data.spec';
import { tool1, tool2, datetimeData, categoryData, negativeDataPoint, MouseEvents } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs, IPointRenderEventArgs } from '../../../src/chart/model/interface';
Chart.Inject(Marker, ScatterSeries, LineSeries, DateTime, Category, Tooltip);
let data: any = tool1;
let data2: any = tool2;
let datetime: any = datetimeData;
export interface Arg {
    chart: Chart;
}

export interface series1 {
    series: Series;
}

describe('Chart Control', () => {
    describe('Chart Scatter series', () => {
        let chartObj: Chart;
        let elem: HTMLElement;
        let svg: HTMLElement;
        let marker: HTMLElement;
        let datalabel: HTMLElement;
        let targetElement: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let trigger: MouseEvents = new MouseEvents();
        beforeAll(() => {
            if (document.getElementById('container')) {
                document.getElementById('container').remove();
            }
            elem = createElement('div', { id: 'container' });
            document.body.appendChild(elem);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
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
        it('Checking with fill', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') === 'green').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });
        it('Checking with null Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_3');
                expect(svg === null).toBe(true);
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
                marker = document.getElementById('container_Series_0_Point_1');
                expect(parseFloat(svg.getAttribute('y')) < series.points[1].symbolLocation.y).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource[3].y = 60;
            chartObj.series[0].dataSource = negativeDataPoint;
            chartObj.series[0].marker.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with single Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0');
                expect(svg != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = null;
            chartObj.series[0].dataSource = [{ x: 1, y: 10 }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with marker shape Circle', (done: Function) => {
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Circle';
            chartObj.series[0].marker.fill = 'black';
            chartObj.series[0].dataSource = data;
            chartObj.tooltip.enable = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape diamond', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Diamond';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        })
        it('checking with marker shape HorizontalLine', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'HorizontalLine';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape InvertedTriangle', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'InvertedTriangle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape Pentagon', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Pentagon';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape Triangle', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Triangle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape rectangle', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Rectangle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape verticalLine', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'VerticalLine';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape Cross', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Cross';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with marker shape image', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_2');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                let x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_Series_0_Point_2_Trackball');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Image';
            chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with marker size', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let series: Series = <Series>chartObj.series[0];
                expect(series.points[2].region.y === 24.40625).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.height = 20;
            chartObj.series[0].marker.width = 20;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with marker visible false', (done: Function) => {
            loaded = (args: Object): void => {
                datalabel = document.getElementById('container_Series_0_Point_0');
                expect(datalabel !== null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.visible = false;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with category axis', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0');
                expect(marker != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Category';
            chartObj.series[0].dataSource = categoryData;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with category axis onticks', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0');
                expect(marker != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.labelPlacement = 'OnTicks';
            chartObj.series[0].dataSource = categoryData;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with multiple series', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_1');
                expect(svg.getAttribute('fill') === 'red').toBe(true);
                svg = document.getElementById('container_Series_1_Point_1');
                expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series = [{ dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', type: 'Scatter', animation: { enable: false } },
            { dataSource: data2, xName: 'x', name: 'silver', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Scatter', animation: { enable: false } }];
            chartObj.series[0].marker.visible = true;
            chartObj.series[1].marker.visible = true;
            chartObj.primaryXAxis.valueType = 'Double';
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
            chartObj.primaryXAxis.valueType = 'DateTime';
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });

        it('Checking with multiple axes ', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') === 'red').toBe(true);
                svg = document.getElementById('container_Series_1_Point_1');
                expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
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
        it('Checking animation', (done: Function) => {

            let animate: EmitType<IAnimationCompleteEventArgs> = (args: series1): void => {
                let point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                expect(point.getAttribute('transform') === null).toBe(true);
                done();
            };
            chartObj.series[0].animation.enable = true;
            chartObj.series[1].animation.enable = true;
            chartObj.animationComplete = animate;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });

    });
});

describe('checking for multiple axes', () => {
    let chartObj: Chart;
    let elem: HTMLElement = createElement('div', { id: 'container' });
    let targetElement: HTMLElement;
    let loaded: EmitType<ILoadedEventArgs>;
    let marker0; HTMLElement;
    let dataLabel0: HTMLElement;

    beforeAll(() => {
        document.body.appendChild(elem);
        chartObj = new Chart(
            {
                //primaryXAxis: { title: 'PrimaryXAxis', rangePadding: ChartRangePadding.Additional },
                //primaryYAxis: { title: 'PrimaryYAxis' },
                axes: [{
                    rowIndex: 0,
                    columnIndex: 0,
                    name: 'yAxis1',
                    title: 'YAxis1',
                },
                {
                    rowIndex: 0,
                    columnIndex: 0,
                    name: 'yAxis2',
                    title: 'YAxis2',
                },

                {
                    rowIndex: 1,
                    columnIndex: 0,
                    name: 'yAxis3',
                    title: 'YAxis3',
                },
                {
                    rowIndex: 1,
                    columnIndex: 0,
                    name: 'yAxis4',
                    title: 'YAxis4'
                },
                {
                    rowIndex: 0,
                    columnIndex: 1,
                    name: 'yAxis6',
                    title: 'YAxis6',
                    opposedPosition: true,
                },
                {
                    rowIndex: 0,
                    columnIndex: 1,
                    name: 'yAxis5',
                    title: 'YAxis5',
                    opposedPosition: true,
                },

                {
                    rowIndex: 1,
                    columnIndex: 1,
                    name: 'yAxis7',
                    title: 'YAxis7',
                    opposedPosition: true,
                },
                {
                    rowIndex: 1,
                    columnIndex: 1,
                    name: 'yAxis8',
                    title: 'YAxis8',
                    opposedPosition: true,
                },
                {
                    columnIndex: 0,
                    rowIndex: 0,
                    name: 'xAxis1',
                    title: 'Xaxis1',

                },
                {
                    columnIndex: 0,
                    rowIndex: 0,
                    name: 'xAxis2',
                    title: 'Xaxis2',
                },
                {
                    columnIndex: 1,
                    rowIndex: 0,
                    name: 'xAxis3',
                    title: 'Xaxis3',

                },
                {
                    columnIndex: 1,
                    rowIndex: 0,
                    name: 'xAxis4',
                    title: 'Xaxis4',

                },
                {
                    columnIndex: 0,
                    rowIndex: 1,
                    name: 'xAxis5',
                    title: 'Xaxis5',
                    opposedPosition: true,

                },
                {
                    columnIndex: 0,
                    rowIndex: 1,
                    name: 'xAxis6',
                    title: 'Xaxis6',
                    opposedPosition: true,
                },
                {
                    columnIndex: 1,
                    rowIndex: 1,
                    name: 'xAxis7',
                    title: 'Xaxis7',
                    opposedPosition: true,

                },
                {
                    columnIndex: 1,
                    rowIndex: 1,
                    name: 'xAxis8',
                    title: 'Xaxis8',
                    opposedPosition: true,

                },
                ],
                series: [{
                    dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                    name: 'ChartSeriesNameGold', fill: 'green', //marker: { visible: true, dataLabel: { visible: true } },
                    xAxisName: 'xAxis1', yAxisName: 'yAxis1'

                },
                {
                    dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                    name: 'ChartSeriesNameGold', fill: 'red', //marker: { visible: true, dataLabel: { visible: true } },
                    xAxisName: 'xAxis1', yAxisName: 'yAxis1'

                },
                {
                    dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                    name: 'ChartSeriesNameGold1', fill: 'black', //marker: { visible: true, dataLabel: { visible: true } },
                    xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                },
                {
                    dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                    name: 'ChartSeriesNameDiamond', fill: 'blue', //marker: { visible: true, dataLabel: { visible: true } },
                    xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                },
                {
                    dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                    name: 'ChartSeriesNameSilver', fill: 'green',
                    //marker: { visible: true, dataLabel: { visible: true } },
                    xAxisName: 'xAxis5', yAxisName: 'yAxis3',
                },
                {
                    dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                    type: 'Scatter',
                    //marker: { visible: true, dataLabel: { visible: false } },
                    name: 'ChartSeriesNameRuby', fill: 'red',
                    xAxisName: 'xAxis6', yAxisName: 'yAxis4',
                },
                {
                    dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                    name: 'ChartSeriesNamePlatinum', fill: 'rgba(135,000,235,1)', //marker: { visible: true, dataLabel: { visible: true } },
                    xAxisName: 'xAxis3', yAxisName: 'yAxis5',
                },
                {
                    dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                    name: 'ChartSeriesNameEmerald', fill: 'purple', //marker: { visible: true, dataLabel: { visible: true } },
                    xAxisName: 'xAxis4', yAxisName: 'yAxis6',
                },
                {
                    dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                    name: 'ChartSeriesNamePearl', fill: 'violet',
                    //marker: { visible: true, dataLabel: { visible: true } },
                    xAxisName: 'xAxis7', yAxisName: 'yAxis7'
                },
                {
                    dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                    type: 'Scatter',
                    //marker: { visible: true, dataLabel: { visible: false } },
                    name: 'ChartSeriesNameCoral', fill: 'yellow',
                    xAxisName: 'xAxis8', yAxisName: 'yAxis8',

                }
                ],
                rows: [
                    { height: '400', border: { width: 2, color: 'red' } },
                    { height: '400', border: { width: 2, color: 'red' } },

                ],
                columns: [
                    { width: '400', border: { width: 2, color: 'black' } },
                    { width: '400', border: { width: 2, color: 'black' } },
                ], legendSettings: { visible: false },
                title: 'Chart TS Title', height: '1000', width: '1000',

            });
        chartObj.appendTo('#container');
        unbindResizeEvents(chartObj);
    });
    afterAll((): void => {
        chartObj.destroy();
        elem.remove();
    });
    it('Checking with fill', (done: Function) => {
        loaded = (args: Object): void => {
            let svg: HTMLElement = document.getElementById('container_Series_0_Point_0');
            expect(svg.getAttribute('fill') === 'green').toBe(true);
            done();
        };
        chartObj.loaded = loaded;
    });
    it('Checking Events', (done: Function) => {
        loaded = (args: Object): void => {
            let element: HTMLElement = document.getElementById('container_Series_0_Point_2');
            expect(element.getAttribute('fill') == 'brown').toBe(true);
            element = document.getElementById('container_Series_0_Point_0');
            expect(element == null).toBe(true);
            done();
        };
        chartObj.pointRender = (args: IPointRenderEventArgs) => {
            if (args.point.index === 0) {
                args.cancel = true;
            }
            if (args.point.index === 2) {
                args.fill = 'brown';
            }
        }
        chartObj.loaded = loaded;
        chartObj.title = 'Events Changed';
        chartObj.refresh();
    });
});