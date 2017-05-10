/**
 * Line and Area Series Spec
 */
import { createElement } from '@syncfusion/ej2-base/dom';
import { SvgRenderer } from '@syncfusion/ej2-base';
import { Chart } from '../../../src/chart/chart';
import { } from '../../../src/chart/utils/helper';
import { Series, Points } from '../../../src/chart/series/chart-series';
import { LineSeries } from '../../../src/chart/series/line-series';
import { StepLineSeries } from '../../../src/chart/series/step-line-series';
import { ColumnSeries } from '../../../src/chart/series/column-series';
import { AreaSeries } from '../../../src/chart/series/area-series';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Category } from '../../../src/chart/axis/category-axis';
import { Marker } from '../../../src/chart/series/marker';
import { DataLabel } from '../../../src/chart/series/data-label';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { unbindResizeEvents } from '../base/data.spec';
import { tooltipData11, tooltipData12, datetimeData11, negativeDataPoint } from '../base/data.spec';
import { firstSeries, secondSeries, thirdSeries, fourthSeries } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs, ITextRenderEventArgs } from '../../../src/chart/model/interface';

Chart.Inject(LineSeries, Marker, ColumnSeries, AreaSeries, DateTime, Category, DataLabel, StepLineSeries);

export interface series1 {
    series: Series;
}

let data: any = tooltipData11;
let data2: any = tooltipData12;
let negativPoint: any = negativeDataPoint;
let dateTime: any = datetimeData11;

let india: any = firstSeries;
let germany: any = secondSeries;
let england: any = thirdSeries;
let france: any = fourthSeries;

describe('Chart Control Series', () => {
    /**
     * Marker Spec started here
     */
    describe('Line Series - Marker', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: HTMLElement;
        element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', minimum: 2005, maximum: 2011, interval: 1 },
                    primaryYAxis: { title: 'PrimaryYAxis', minimum: 25, maximum: 50, interval: 5, rangePadding: 'None' },
                    series: [{
                        animation: { enable: false },
                        dataSource: india, xName: 'x', yName: 'y', name: 'India',
                        fill: '#E94649', type: 'Line', marker: { visible: true }
                    }, {
                        animation: { enable: false },
                        dataSource: germany, xName: 'x', yName: 'y', name: 'germany', fill: '#F6B53F',
                        type: 'Line', marker: { visible: true }
                    }, {
                        animation: { enable: false },
                        type: 'Line', dataSource: england, xName: 'x', yName: 'y',
                        name: 'England', fill: '#6FAAB0', marker: { visible: true }
                    }, {
                        animation: { enable: false },
                        dataSource: france, name: 'France', xName: 'x', yName: 'y',
                        fill: '#C4C24A', type: 'Line', marker: { visible: true }
                    }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            element.remove();
        });

        it('Showing default marker', (done: Function) => {
            loaded = (args: Object): void => {
                let series1: number = document.getElementById('containerSymbolGroup1').childNodes.length;
                expect(series1 == 8).toBe(true);
                let marker: HTMLElement = document.getElementById('container_Series_3_Point_0_Symbol');
                expect(marker.getAttribute('fill') == '#C4C24A').toBe(true);
                expect(marker.getAttribute('rx') == '2.5').toBe(true);
                expect(marker.getAttribute('ry') == '2.5').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Changing visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let series1: HTMLElement = document.getElementById('containerSymbolGroup1');
                expect(series1 == null).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.visible = false;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Changing size', (done: Function) => {
            loaded = (args: Object): void => {
                let series1: HTMLElement = document.getElementById('container_Series_1_Point_3_Symbol');
                expect(series1.getAttribute('rx') == '5').toBe(true);
                expect(series1.getAttribute('ry') == '5').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.visible = true;
            chartObj.series[1].marker.width = 10;
            chartObj.series[1].marker.height = 10;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Changing size default', (done: Function) => {
            loaded = (args: Object): void => {
                let series1: HTMLElement;
                series1 = document.getElementById('container_Series_1_Point_3_Symbol');
                expect(series1.getAttribute('rx') == '0').toBe(true);
                expect(series1.getAttribute('ry') == '0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.width = 0;
            chartObj.series[1].marker.height = 0;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking specify marker color', (done: Function) => {
            loaded = (args: Object): void => {
                let series1: HTMLElement = document.getElementById('container_Series_0_Point_3_Symbol');
                expect(series1.getAttribute('fill') == 'violet').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.fill = 'violet';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with checking column series marker visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let series1 = document.getElementById('container_Series_0_Point_3_Symbol');
                expect(series1 == null).toBe(true);
                chartObj.series[0].type = 'Line'; done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].type = 'Column';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Changing marker shape 1', (done: Function) => {
            loaded = (args: Object): void => {
                let series1: HTMLElement = document.getElementById('container_Series_3_Point_1_Symbol');
                let element: Element = new SvgRenderer('').createGroup({});
                let direction: string = series1.getAttribute('d');
                expect(direction.indexOf('z') > 0).toBe(true);
                series1 = document.getElementById('container_Series_2_Point_1_Symbol');
                direction = series1.getAttribute('d');
                expect(direction.indexOf('z') <= -1).toBe(true);
                series1 = document.getElementById('container_Series_1_Point_1_Symbol');
                direction = series1.getAttribute('d');
                expect(direction.indexOf('z') > 0).toBe(true);
                series1 = document.getElementById('container_Series_0_Point_1_Symbol');
                direction = series1.getAttribute('d');
                expect(direction.indexOf('z') <= -1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.height = 10;
            chartObj.series[0].marker.width = 10;
            chartObj.series[1].marker.height = 10;
            chartObj.series[1].marker.width = 10;
            chartObj.series[2].marker.height = 10;
            chartObj.series[2].marker.width = 10;
            chartObj.series[3].marker.height = 10;
            chartObj.series[3].marker.width = 10;
            chartObj.series[0].marker.shape = 'Cross';
            chartObj.series[1].marker.shape = 'Diamond';
            chartObj.series[2].marker.shape = 'HorizontalLine';
            chartObj.series[3].marker.shape = 'InvertedTriangle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Changing marker shape 2', (done: Function) => {
            loaded = (args: Object): void => {
                let direction: string;
                let series1: HTMLElement;
                series1 = document.getElementById('container_Series_3_Point_1_Symbol');
                direction = series1.getAttribute('d');
                expect(direction.indexOf('z') <= -1).toBe(true);
                series1 = document.getElementById('container_Series_2_Point_1_Symbol');
                direction = series1.getAttribute('d');
                expect(direction.indexOf('z') > 0).toBe(true);
                series1 = document.getElementById('container_Series_1_Point_1_Symbol');
                direction = series1.getAttribute('d');
                expect(direction.indexOf('z') > 0).toBe(true);
                series1 = document.getElementById('container_Series_0_Point_1_Symbol');
                direction = series1.getAttribute('d');
                expect(direction.indexOf('z') <= -1).toBe(true); done();
            };
            chartObj.loaded = loaded;

            chartObj.series[0].marker.shape = 'Pentagon';
            chartObj.series[1].marker.shape = 'Rectangle';
            chartObj.series[2].marker.shape = 'Triangle';
            chartObj.series[3].marker.shape = 'VerticalLine';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('with image', (done: Function) => {
            loaded = (args: Object): void => {
                let series1 = document.getElementById('container_Series_1_Point_0_Symbol');
                expect(series1.getAttribute('href') == 'base/spec/img/img1.jpg').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.shape = 'Image';
            chartObj.series[1].marker.imageUrl = 'base/spec/img/img1.jpg';
            chartObj.series[1].marker.height = 20;
            chartObj.series[1].marker.width = 20;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with marker properties', (done: Function) => {
            loaded = (args: Object): void => {
                let series1 = document.getElementById('container_Series_2_Point_2_Symbol');
                expect(series1.getAttribute('fill') == 'green').toBe(true);
                expect(series1.getAttribute('opacity') == '0.1').toBe(true);
                expect(series1.getAttribute('stroke') == 'red').toBe(true);
                expect(series1.getAttribute('stroke-width') == '4').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[2].marker.fill = 'green';
            chartObj.series[2].marker.opacity = 0.1;
            chartObj.series[2].marker.border = {
                width: 4,
                color: 'red'
            };
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
    });

    /**
     * Default Line Series
     */

    describe('Line Series', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let animate: EmitType<IAnimationCompleteEventArgs>;
        let element1: Element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element1);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        animation: { enable: false },
                        name: 'ChartSeriesNameGold',
                        fill: 'rgba(135,206,235,1)',
                        xName: 'x',
                        yName: 'y',
                        marker: {
                            visible: false
                        }
                    }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            element1.remove();
        });

        it('Default Series Type without data Points', (done: Function) => {
            loaded = (args: Object): void => {
                let svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('d') == '').toBe(true);
                let xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                let yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                expect(yAxisLabelCollection.childNodes.length == 7).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('With single data point', (done: Function) => {
            loaded = (args: Object): void => {

                let svg: HTMLElement = document.getElementById('container_Series_0');
                expect(svg.getAttribute('d') == '').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = [{
                x: 1,
                y: 10
            }];
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });

        it('Single data point with range', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0');
                expect(svg.getAttribute('d') == '').toBe(true);
                let xAxisLabelCollection: HTMLElement = document.getElementById('containerAxisLabels0');
                expect(xAxisLabelCollection.childNodes.length == 3).toBe(true);
                let yAxisLabelCollection: HTMLElement = document.getElementById('containerAxisLabels1');
                expect(yAxisLabelCollection.childNodes.length == 5).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.minimum = 0;
            chartObj.primaryXAxis.maximum = 2;
            chartObj.primaryXAxis.interval = 1;
            chartObj.primaryYAxis.minimum = 8;
            chartObj.primaryYAxis.maximum = 12;
            chartObj.primaryYAxis.interval = 1;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking series visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: number = document.getElementById('containerSeriesCollection').childNodes.length;
                expect(seriesElements == 1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].visible = false;
            chartObj.primaryYAxis.minimum = null;
            chartObj.primaryYAxis.maximum = null;
            chartObj.primaryYAxis.interval = null;
            chartObj.primaryXAxis.minimum = null;
            chartObj.primaryXAxis.maximum = null;
            chartObj.primaryXAxis.interval = null;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with data source', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: number = document.getElementById('containerSeriesCollection').childNodes.length;
                expect(seriesElements == 2).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryYAxis.minimum = null;
            chartObj.primaryYAxis.maximum = null;
            chartObj.primaryYAxis.interval = null;
            chartObj.primaryXAxis.minimum = null;
            chartObj.primaryXAxis.maximum = null;
            chartObj.primaryXAxis.interval = null;
            chartObj.series[0].visible = true;
            chartObj.series[0].dataSource = data;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with range', (done: Function) => {
            loaded = (args: Object): void => {
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                let seriesElements: HTMLElement = document.getElementById('container_Series_0');
                let path: string = seriesElements.getAttribute('d');
                expect((path.match(/M/g) || []).length == 1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.minimum = 0;
            chartObj.primaryXAxis.maximum = 10000;
            chartObj.primaryXAxis.interval = 1000;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with dateTimeRange', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0');
                let stroke: string = seriesElements.getAttribute('stroke-width');
                expect(stroke == '2').toBe(true);
                let labelElement = document.getElementById('container0_AxisLabel_3');
                expect(labelElement.textContent == 'Jul 2003').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
            { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
            { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
            ];
            chartObj.series[0].width = 2;
            chartObj.primaryXAxis.valueType = 'DateTime';
            chartObj.primaryXAxis.labelFormat = '';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('with dash array', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0');
                let stroke: string = seriesElements.getAttribute('stroke-dasharray');
                expect(stroke == '4').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dashArray = '4';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with fill and stroke', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements = document.getElementById('container_Series_0');
                expect(seriesElements.getAttribute('stroke') == 'red').toBe(true);
                expect(seriesElements.getAttribute('stroke') != 'green').toBe(true);
                expect(seriesElements.getAttribute('stroke-width') != '4').toBe(true);
                expect(seriesElements.getAttribute('stroke-width') == '10').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dashArray = null;
            chartObj.series[0].fill = 'red';
            chartObj.series[0].border.color = 'green';
            chartObj.series[0].width = 10;
            chartObj.series[0].border.width = 4;
            chartObj.series[0].opacity = 0.6;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Animation', (done: Function) => {
            animate = (args: IAnimationCompleteEventArgs): void => {
                let pathLength: number = (<SVGPathElement>args.series.pathElement).getTotalLength();
                expect(pathLength >= 700).toBe(true);
                done();
            };
            chartObj.series[0].animation.enable = true;
            chartObj.series[0].marker.visible = true;
            unbindResizeEvents(chartObj);
            chartObj.animationComplete = animate;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });

        /*   it('within xAxis range', (done: Function) => {
               loaded = (args: Object): void => {
                   let svgLength: number = (<SVGPathElement>(<Series>chartObj.series[0]).pathElement).getTotalLength();
                   expect((Math.round(svgLength)) != 362).toBe(true); done();
               };
               chartObj.loaded = loaded;
               chartObj.primaryXAxis.minimum = 4500;
               chartObj.primaryXAxis.maximum = 6500;
               chartObj.primaryXAxis.interval = 500;
               chartObj.refresh(); unbindResizeEvents(chartObj);
           }); */
    });

    /**
     * Default Area Series
     */

    describe('Area Series', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let element1: Element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element1);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        animation: { enable: false },
                        name: 'ChartSeriesNameGold',
                        fill: 'rgba(135,206,235,1)',
                        type: 'Area',
                        xName: 'x',
                        yName: 'y',
                        marker: {
                            visible: false
                        }
                    }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            element1.remove();
        });

        it('Default Series Type without data Points', (done: Function) => {
            loaded = (args: Object): void => {
                let svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('d') == '').toBe(true);
                let xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                let yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                expect(yAxisLabelCollection.childNodes.length == 7).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('With single data point', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0');
                expect(svg.getAttribute('d') == '').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = [{
                x: 1,
                y: 10
            }];
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });

        it('Single data point with range', (done: Function) => {
            loaded = (args: Object): void => {
                let svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('d') == '').toBe(true);
                let xAxisLabelCollection: HTMLElement = document.getElementById('containerAxisLabels0');
                expect(xAxisLabelCollection.childNodes.length == 3).toBe(true);
                let yAxisLabelCollection: HTMLElement = document.getElementById('containerAxisLabels1');
                expect(yAxisLabelCollection.childNodes.length == 5).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.minimum = 0;
            chartObj.primaryXAxis.maximum = 2;
            chartObj.primaryXAxis.interval = 1;
            chartObj.primaryYAxis.minimum = 8;
            chartObj.primaryYAxis.maximum = 12;
            chartObj.primaryYAxis.interval = 1;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking series visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: number = document.getElementById('containerSeriesCollection').childNodes.length;
                expect(seriesElements == 1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].visible = false;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with data source', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: number = document.getElementById('containerSeriesCollection').childNodes.length;
                expect(seriesElements == 2).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryYAxis.minimum = null;
            chartObj.primaryYAxis.maximum = null;
            chartObj.primaryYAxis.interval = null;
            chartObj.primaryXAxis.minimum = null;
            chartObj.primaryXAxis.maximum = null;
            chartObj.primaryXAxis.interval = null;
            chartObj.series[0].visible = true;
            chartObj.series[0].dataSource = data;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with range', (done: Function) => {
            loaded = (args: Object): void => {
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                let seriesElements: HTMLElement = document.getElementById('container_Series_0');
                let path: string = seriesElements.getAttribute('d');
                expect((path.match(/M/g) || []).length == 1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.minimum = 0;
            chartObj.primaryXAxis.maximum = 10000;
            chartObj.primaryXAxis.interval = 1000;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with dateTimeRange', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0');
                let stroke: string = seriesElements.getAttribute('stroke-width');
                expect(stroke == '0').toBe(true);
                let labelElement = document.getElementById('container0_AxisLabel_3');
                expect(labelElement.textContent == 'Jul 2003').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
            { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: null },
            { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
            ];
            chartObj.series[0].width = 2;
            chartObj.primaryXAxis.valueType = 'DateTime';
            chartObj.primaryXAxis.labelFormat = '';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });


        it('with dash array', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0');
                let stroke: string = seriesElements.getAttribute('stroke-dasharray');
                expect(stroke == '4').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dashArray = '4';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with fill and stroke', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements = document.getElementById('container_Series_0');
                expect(seriesElements.getAttribute('stroke') == 'green').toBe(true);
                expect(seriesElements.getAttribute('stroke') != 'red').toBe(true);
                expect(seriesElements.getAttribute('stroke-width') != '10').toBe(true);
                expect(seriesElements.getAttribute('stroke-width') == '4').toBe(true);
                expect(seriesElements.getAttribute('opacity') == '0.6').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = data;
            chartObj.series[0].dashArray = null;
            chartObj.series[0].fill = 'red';
            chartObj.series[0].border.color = 'green';
            chartObj.series[0].width = 10;
            chartObj.primaryXAxis.valueType = 'Category';
            chartObj.series[0].border.width = 4;
            chartObj.series[0].opacity = 0.6;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking with null Points', (done: Function) => {
            loaded = (args: Object): void => {                
                let path = document.getElementById('container_Series_0');
                let id: string = path.getAttribute('d');
                let check: number = id.lastIndexOf('M');               
                expect(check !== 0).toBe(true);
                chartObj.destroy();
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource[3].y = null;
            chartObj.series[0].marker.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
    });

    describe('Line Series - Data Label', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let element: Element;
        element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chartObj = new Chart(
                {
                    primaryXAxis: { valueType: 'DateTime' },
                    primaryYAxis: { rangePadding: 'None' },
                    series: [{
                        animation: { enable: false },
                        xName: 'x', yName: 'y',
                        name: 'India', fill: '#E94649',
                        marker: { visible: false, dataLabel: { visible: false } }
                    }],
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

        it('With single data point', (done: Function) => {
            loaded = (args: Object): void => {
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
            { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
            { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }];
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });

        it('Showing default data label', (done: Function) => {
            loaded = (args: Object): void => {
                let element = document.getElementById('container_Series_0_Point_3_Text');
                expect(element.textContent == '65').toBe(true);
                expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Showing default marker shape', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(element.textContent == '65').toBe(true);
                expect(element.getAttribute('fill') == 'white').toBe(true);
                expect(document.getElementById('containerShapeGroup0').childNodes.length == 6).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.fill = '#E94649';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('checking visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(element == null).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.visible = false;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with marker visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(element != null).toBe(true);
                let marker: number = +document.getElementById('container_Series_0_Point_3_Symbol').getAttribute('cy');
                let label: number = +document.getElementById('container_Series_0_Point_3_Text').getAttribute('y');
                expect(marker > label).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.visible = true;
            chartObj.series[0].marker.width = 10;
            chartObj.series[0].marker.height = 10;
            chartObj.series[0].marker.dataLabel.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with marker size without marker visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_0_Point_3_Symbol');
                expect(marker == null).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.visible = false;
            chartObj.series[0].marker.width = 10;
            chartObj.series[0].marker.height = 10;
            chartObj.series[0].marker.dataLabel.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking edge dataLabel', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_0_Point_5_Text');
                let location: number = (+marker.getAttribute('x')) + (+marker.getAttribute('width'));
                let clipRectWidth: number = 757.5;
                expect(location < clipRectWidth).toBe(true);
                marker = document.getElementById('container_Series_0_Point_0_Text');
                expect(+marker.getAttribute('x') > 0).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking auto position', (done: Function) => {
            loaded = (args: Object): void => {
                let point0: number = +document.getElementById('container_Series_0_Point_0_Text').getAttribute('y');
                let point1: number = +document.getElementById('container_Series_0_Point_1_Text').getAttribute('y');
                let point2: number = +document.getElementById('container_Series_0_Point_2_Text').getAttribute('y');
                let point3: number = +document.getElementById('container_Series_0_Point_3_Text').getAttribute('y');
                let point4: number = +document.getElementById('container_Series_0_Point_4_Text').getAttribute('y');
                let point5: number = +document.getElementById('container_Series_0_Point_5_Text').getAttribute('y');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.y;
                let point1Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                let point2Location: number = (<Points>(<Series>chartObj.series[0]).points[2]).symbolLocation.y;
                let point3Location: number = (<Points>(<Series>chartObj.series[0]).points[3]).symbolLocation.y;
                let point4Location: number = (<Points>(<Series>chartObj.series[0]).points[4]).symbolLocation.y;
                let point5Location: number = (<Points>(<Series>chartObj.series[0]).points[5]).symbolLocation.y;


                expect(point0 < point0Location).toBe(true);
                expect(point1 < point1Location).toBe(true);
                expect(point2 < point2Location).toBe(true);
                expect(point3 < point3Location).toBe(true);
                expect(point4 > point4Location).toBe(true);
                expect(point5 > point5Location).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Adding another series', (done: Function) => {

            loaded = (args: Object): void => {
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series = [chartObj.series[0], {
                name: 'series1', type: 'Line', fill: '#ACE5FF', width: 3,
                animation: { enable: false },
                dataSource: [
                    { x: new Date(2000, 6, 11), y: 45 },
                    { x: new Date(2002, 3, 7), y: 40 },
                    { x: new Date(2004, 3, 6), y: 45 },
                    { x: new Date(2006, 3, 30), y: 40 },
                    { x: new Date(2008, 3, 8), y: 45 },
                    { x: new Date(2010, 3, 8), y: 20 }
                ], xName: 'x', yName: 'y',
                marker: {
                    dataLabel: {
                        visible: true
                    }
                }
            }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking default data label position with multiple series', (done: Function) => {

            loaded = (args: Object): void => {
                let point0: number = +document.getElementById('container_Series_1_Point_0_Text').getAttribute('y');
                let point1: number = +document.getElementById('container_Series_1_Point_1_Text').getAttribute('y');
                let point2: number = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                let point3: number = +document.getElementById('container_Series_1_Point_3_Text').getAttribute('y');
                let point4: number = +document.getElementById('container_Series_1_Point_4_Text').getAttribute('y');
                let point5: number = +document.getElementById('container_Series_1_Point_5_Text').getAttribute('y');
                let point0Location: number = (<Points>(<Series>chartObj.series[1]).points[0]).symbolLocation.y;
                let point1Location: number = (<Points>(<Series>chartObj.series[1]).points[1]).symbolLocation.y;
                let point2Location: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                let point3Location: number = (<Points>(<Series>chartObj.series[1]).points[3]).symbolLocation.y;
                let point4Location: number = (<Points>(<Series>chartObj.series[1]).points[4]).symbolLocation.y;
                let point5Location: number = (<Points>(<Series>chartObj.series[1]).points[5]).symbolLocation.y;
                expect(point0 < point0Location).toBe(true);
                expect(point1 > point1Location).toBe(true);
                expect(point2 < point2Location).toBe(true);
                expect(point3 > point3Location).toBe(true);
                expect(point4 < point4Location).toBe(true);
                expect(point5 > point5Location).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking data label shape without fill', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_1_Point_2_TextShape');
                expect(marker.getAttribute('stroke') == 'grey').toBe(true);
                expect(marker.getAttribute('stroke-width') == '2').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.border.width = 2;
            chartObj.series[1].marker.dataLabel.border.color = 'grey';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });


        it('Checking font color saturation - background black', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_1_Point_3_Text');
                expect(marker.getAttribute('fill') == 'white').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.chartArea.background = 'black';
            chartObj.chartArea.border = {
                color: ''
            };
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking font color saturation - background white', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_1_Point_3_Text');
                expect(marker.getAttribute('fill') == 'black').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.chartArea.background = 'white';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking dataLabel positions Bottom', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                let hiddenText: HTMLElement = document.getElementById('container_Series_1_Point_1_Text');
                expect(hiddenText == null).toBe(true);
                expect(hiddenShape == null).toBe(true);
                let element: number = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                expect((<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y < element).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Bottom';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking dataLabel positions Top', (done: Function) => {
            loaded = (args: Object): void => {
                let element1: number = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                expect((<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y > element1).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Top';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking dataLabel positions Middle', (done: Function) => {
            loaded = (args: Object): void => {
                let element: number = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                let locationY: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                let height: number = document.getElementById('container_Series_1_Point_2_Text').getBoundingClientRect().height;
                expect(locationY == (element - (height / 4))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Middle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking dataLabel positions Outer', (done: Function) => {
            loaded = (args: Object): void => {
                let element1: number = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                expect((<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y > element1).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Outer';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking font color saturation with font color', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(marker.getAttribute('fill') == 'green').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.font.color = 'green';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Data label format', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(marker.textContent == 'This is 65').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryYAxis.labelFormat = 'This is {value}';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Data label format with globalize format', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(marker.textContent == '65.00').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryYAxis.labelFormat = 'n2';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Datalabel alignment with position auto - alignment near', (done: Function) => {
            let svg: number;
            loaded = (args: Object): void => {
                svg = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                expect(svg > (<Points>(<Series>chartObj.series[0]).points[4]).symbolLocation.y).toBe(true);
                done();
            };
            svg = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
            expect(svg > (<Points>(<Series>chartObj.series[0]).points[4]).symbolLocation.y).toBe(true);
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Datalabel alignment with position auto - alignment far', (done: Function) => {
            let svg: number;
            loaded = (args: Object): void => {
                svg = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                expect(svg > (<Points>(<Series>chartObj.series[0]).points[4]).symbolLocation.y).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Data label alignment except Auto position in Bottom Position - near', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(svg == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Bottom';
            chartObj.series[1].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position in Bottom Position - far', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape != null).toBe(true);
                let elementY: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let elementHeight: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('height');
                let symbolLocation = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementY < (symbolLocation + elementHeight)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position in Bottom Position - center', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape == null).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Center';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Datalabel alignment except Auto position in Outer Position - near', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape == null).toBe(true);
                let elementY: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                symbolLocation = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                let elementHeight: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('height');
                expect(elementY > (symbolLocation - elementHeight - elementHeight)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Outer';
            chartObj.series[1].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Datalabel alignment except Auto position in Outer Position - far', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape != null).toBe(true);
                let elementY: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementY < (symbolLocation)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Datalabel alignment except Auto position in Outer Position - middle', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape != null).toBe(true);
                let elementY: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementY < (symbolLocation)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Center';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position in Top Position', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape == null).toBe(true);
                let elementY: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementY > (symbolLocation)).toBe(true);
                elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                symbolLocation = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                let elementHeight: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('height');
                expect(elementY > (symbolLocation - elementHeight - elementHeight)).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Top';
            chartObj.series[1].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position in Middle Position - near', (done: Function) => {
            loaded = (args: Object): void => {
                let elementY: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementY > (symbolLocation)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Middle';
            chartObj.series[1].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position in Middle Position - far', (done: Function) => {
            loaded = (args: Object): void => {
                let elementY: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementY < (symbolLocation)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Data label alignment except Auto position in Middle Position - center', (done: Function) => {
            loaded = (args: Object): void => {
                let elementY: number = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                let height: number = document.getElementById('container_Series_1_Point_2_Text').getBoundingClientRect().height;
                expect((elementY - (height / 4)) == (symbolLocation)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Center';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking margin', (done: Function) => {
            loaded = (args: Object): void => {
                let shape = document.getElementById('container_Series_0_Point_2_TextShape');
                let shapeY = + shape.getAttribute('y');
                let shapeX = + shape.getAttribute('x');
                let shapeWidth = + shape.getAttribute('width');
                let shapeHeight = + shape.getAttribute('height');
                let text = document.getElementById('container_Series_0_Point_2_Text');
                let textX = + text.getAttribute('x');
                let textY = + text.getAttribute('y');
                expect(textX > (shapeX + 20)).toBe(true);
                expect(textY > (shapeY + 25)).toBe(true);
                expect(textY < (shapeY + shapeHeight - 5)).toBe(true);
                expect(textX < (shapeX + shapeWidth - 10)).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.margin = {
                left: 20,
                right: 10,
                top: 25,
                bottom: 5
            }
            chartObj.refresh(); unbindResizeEvents(chartObj);
        })

        it('Checking Overlap data', (done: Function) => {
            loaded = (args: Object): void => {
                expect(document.getElementById('containerShapeGroup2').childNodes.length == 3).toBe(true);
                expect(document.getElementById('container_Series_2_Point_0_TextShape') == null).toBe(true);
                expect(document.getElementById('container_Series_2_Point_2_TextShape') == null).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.margin = {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            }
            chartObj.series = [chartObj.series[0], chartObj.series[1], {
                name: 'series1', type: 'Line', fill: 'violet', width: 4,
                animation: { enable: false },
                dataSource: [
                    { x: new Date(2000, 6, 11), y: 45 },
                    { x: new Date(2002, 3, 7), y: 60 },
                    { x: new Date(2004, 3, 6), y: 45 },
                    { x: new Date(2006, 3, 30), y: 60 },
                    { x: new Date(2008, 3, 8), y: 40 },
                    { x: new Date(2010, 3, 8), y: 85 }
                ],
                xName: 'x', yName: 'y',
                marker: { dataLabel: { visible: true, fill: 'black', opacity: 0.6 } }
            }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        })
        it('Changing series Type', (done: Function) => {
            loaded = (args: Object): void => {
                expect(document.getElementById('containerShapeGroup2').childNodes.length == 6).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[2].type = 'Column';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking properties', (done: Function) => {
            loaded = (args: Object): void => {
                expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                expect(document.getElementById('container_Series_0_Point_3_Text').textContent == '65.00').toBe(true);
                let element = document.getElementById('container_Series_1_Point_2_TextShape');
                expect(element.getAttribute('fill') == 'transparent').toBe(true);
                expect(element.getAttribute('stroke') == 'green').toBe(true);
                expect(element.getAttribute('stroke-width') == '2').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.fill = 'transparent';
            chartObj.series[1].marker.dataLabel.fill = 'transparent';
            chartObj.series[1].marker.dataLabel.border = {
                width: 2,
                color: 'green'
            };
            chartObj.series[0].marker.dataLabel.rx = 10;
            chartObj.series[0].marker.dataLabel.ry = 10;
            chartObj.series[2].marker.dataLabel.rx = 10;
            chartObj.series[2].marker.dataLabel.ry = 10;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking auto position for scope', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(svg == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            let series0: Object = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
            { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
            { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
            ];
            let series1: Object = [
                { x: new Date(2000, 6, 11), y: 45 },
                { x: new Date(2002, 3, 7), y: 40 },
                { x: new Date(2004, 3, 6), y: 45 },
                { x: new Date(2006, 3, 30), y: 40 },
                { x: new Date(2008, 3, 8), y: 45 },
                { x: new Date(2010, 3, 8), y: 20 }
            ];
            let series2: Object = [
                { x: new Date(2000, 6, 11), y: 45 },
                { x: new Date(2002, 3, 7), y: 60 },
                { x: new Date(2004, 3, 6), y: 45 },
                { x: new Date(2006, 3, 30), y: 60 },
                { x: new Date(2008, 3, 8), y: 40 },
                { x: new Date(2010, 3, 8), y: 85 }
            ];
            chartObj.series[1].marker.dataLabel.position = 'Auto';
            chartObj.series[2].marker.dataLabel.position = 'Auto';
            chartObj.series[0].marker.dataLabel.position = 'Auto';
            chartObj.series[0].type = 'Line';
            chartObj.series[1].type = 'Line';
            chartObj.series[2].type = 'Line';
            series1[1].y = null;
            series1[4].y = null;
            series0[4].y = null;
            series0[3].y = null;
            series0[1].y = null;
            series2[4].y = null;
            chartObj.series[0].dataSource = series0;
            chartObj.series[1].dataSource = series1;
            chartObj.series[2].dataSource = series2;
            chartObj.primaryYAxis.minimum = 0;
            chartObj.primaryYAxis.maximum = 97;
            chartObj.primaryYAxis.interval = 44;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking auto position for scope - top', (done: Function) => {
            let series0: Object = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
            { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
            { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
            ];
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(svg != null).toBe(true); done();
            };
            chartObj.loaded = loaded;
            series0[4].y = 45;
            chartObj.series[0].dataSource = series0;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking dataLabel Top edge', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(svg != null).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryYAxis.minimum = 25;
            chartObj.primaryYAxis.maximum = 50;
            chartObj.primaryYAxis.interval = 5;
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.series = [{
                animation: { enable: false },
                dataSource: [{
                    x: 2005,
                    y: 30
                }, {
                    x: 2006,
                    y: 40
                }, {
                    x: 2007,
                    y: 40
                }, {
                    x: 2008,
                    y: 48
                }, {
                    x: 2009,
                    y: 25
                }, {
                    x: 2010,
                    y: 39
                }],
                xName: 'x', yName: 'y',
                name: 'India',
                fill: '#E94649',
                marker: {
                    visible: false,
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        fill: ''
                    }
                }
            }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking stepline Top edge', (done: Function) => {
            loaded = (args: Object): void => {
                let element: number = +document.getElementById('container_Series_0_Point_0_Text').getAttribute('y');
                let location: number = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.y;
                expect(element < location).toBe(true);
                element = +document.getElementById('container_Series_0_Point_1_Text').getAttribute('y');
                location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                expect(element < location).toBe(true);
                element = +document.getElementById('container_Series_0_Point_2_Text').getAttribute('y');
                location = (<Points>(<Series>chartObj.series[0]).points[2]).symbolLocation.y;
                expect(element < location).toBe(true);
                element = +document.getElementById('container_Series_0_Point_3_Text').getAttribute('y');
                location = (<Points>(<Series>chartObj.series[0]).points[3]).symbolLocation.y;
                expect(element > location).toBe(true);
                element = +document.getElementById('container_Series_0_Point_4_Text').getAttribute('y');
                location = (<Points>(<Series>chartObj.series[0]).points[4]).symbolLocation.y;
                expect(element > location).toBe(true);
                element = +document.getElementById('container_Series_0_Point_5_Text').getAttribute('y');
                location = (<Points>(<Series>chartObj.series[0]).points[5]).symbolLocation.y;
                expect(element < location).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryYAxis.minimum = 0;
            chartObj.primaryYAxis.maximum = 50;
            chartObj.primaryYAxis.interval = 5;
            chartObj.primaryXAxis.minimum = 2004;
            chartObj.primaryXAxis.maximum = 2014;
            chartObj.primaryXAxis.interval = 2;
            chartObj.series[0].type = 'StepLine';
            chartObj.series[0].marker.dataLabel.position = 'Auto';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
    });

    describe('Data Label with Event checking', () => {
        let chart: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let text: EmitType<ITextRenderEventArgs>;
        let element: Element;
        beforeAll((): void => {
            element = createElement('div', { id: 'datalabelcontainer' });
            document.body.appendChild(element);
            chart = new Chart(
                {
                    primaryXAxis: {
                        title: 'PrimaryXAxis',
                        lineStyle: { width: 2 },
                        valueType: 'DateTime'
                    },

                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#663AB6', width: 1,
                            marker: { visible: true, dataLabel: { visible: true, fill: 'transparent' } },
                            animation: { enable: false }, dataSource: [
                                { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                                { x: new Date(2004, 3, 6), y: -15 }, { x: new Date(2006, 3, -30), y: -65 },
                                { x: new Date(2007, 3, 8), y: 90 }, { x: new Date(2008, 3, 8), y: 85 }],
                            xName: 'x',
                            yName: 'y'
                        }
                    ], title: 'Chart TS Title'
                });
            chart.appendTo('#datalabelcontainer');
            unbindResizeEvents(chart);
        });

        afterAll((): void => {
            chart.destroy();
            element.remove();
        });
        it('checking text render event', (done: Function) => {
            loaded = (args: Object): void => {
                let element: Element = document.getElementById('datalabelcontainer_Series_0_Point_4_TextShape');
                expect(document.getElementById('datalabelcontainer_Series_0_Point_3_TextShape') == null).toBe(true);
                expect(element != null).toBe(true);
                expect(element.getAttribute('fill') == 'transparent').toBe(true);
                expect(document.getElementById('datalabelcontainer_Series_0_Point_5_TextShape') == null).toBe(true);
                element = document.getElementById('datalabelcontainer_Series_0_Point_5_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true);
                element = document.getElementById('datalabelcontainer_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true);
                element = document.getElementById('datalabelcontainer_Series_0_Point_2_TextShape');
                expect(element.getAttribute('fill') == 'red').toBe(true);
                element = document.getElementById('datalabelcontainer_Series_0_Point_2_Text');
                expect(element.getAttribute('fill') == 'white').toBe(true);
                element = document.getElementById('datalabelcontainer_Series_0_Point_3_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true);
                element = document.getElementById('datalabelcontainer_Series_0_Point_5_Text');
                expect(element.textContent == '5th').toBe(true);
                done();
            };
            text = (args: ITextRenderEventArgs): void => {
                if (args.point.index == 4) {
                    args.border.color = 'green';
                    args.border.width = 2;
                }
                if (args.point.index == 2) {
                    args.color = 'red';
                    args.border.color = 'green';
                    args.border.width = 2;
                }
                if (args.point.index == 5) {
                    args.text = '5th';
                }
            };
            chart.loaded = loaded;
            chart.textRender = text;
        });
        it('checking top corner text color', (done: Function) => {
            loaded = (args: Object): void => {
                let element: Element = document.getElementById('datalabelcontainer_Series_0_Point_0_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true);
                element = document.getElementById('datalabelcontainer_Series_0_Point_1_Text');
                expect(element.getAttribute('fill') == 'white').toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.textRender = null;
            chart.series[0].type = 'Column';
            chart.series[0].fill = 'black';
            chart.series[0].marker.dataLabel.position = 'Top';
            chart.primaryYAxis.minimum = 9;
            chart.primaryYAxis.maximum = 75;
            chart.refresh();
        });
    });

});