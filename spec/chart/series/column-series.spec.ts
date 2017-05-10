/**
 * Column Series Spec
 */
import { createElement } from '@syncfusion/ej2-base/dom';
import { Chart } from '../../../src/chart/chart';
import { Series, Points } from '../../../src/chart/series/chart-series';
import { LineSeries } from '../../../src/chart/series/line-series';
import { DataLabel } from '../../../src/chart/series/data-label';
import { Category } from '../../../src/chart/axis/category-axis';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { ChartSeriesType, ChartRangePadding } from '../../../src/chart/utils/enum';
import { ValueType } from '../../../src/chart/utils/enum';
import { ColumnSeries } from '../../../src/chart/series/column-series';
import { tooltipData1, negativeDataPoint } from '../base/data.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { unbindResizeEvents } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs, IPointRenderEventArgs } from '../../../src/chart/model/interface';
Chart.Inject(LineSeries, ColumnSeries, DataLabel, Category, DateTime);

describe('Column Series', () => {
    let element: HTMLElement;
    /**
     * Default Column Series
     */

    describe('Column Series', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        animation: { enable: false }, name: 'ChartSeriesNameGold',
                        type: 'Column', fill: 'rgba(135,206,235,1)',
                    }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }

                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            document.getElementById('container').remove();
        });

        it('Default Series Type without data Points', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = document.getElementById('containerSeriesGroup0').childNodes.length;
                expect(svg == 1).toBe(true);
                let xAxisLabelCollection: HTMLElement = document.getElementById('containerAxisLabels0');
                expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                let yAxisLabelCollection: HTMLElement = document.getElementById('containerAxisLabels1');
                expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Added data Source', (done: Function) => {
            loaded = (args: Object): void => {
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = [{
                x: 1,
                y: 10
            }];
            chartObj.series[0].xName = 'x';
            chartObj.series[0].yName = 'y';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('With single data point', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('d') != '').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Single data point with range', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_0_Point_0');
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
                expect(seriesElements == 1).toBe(true);
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.primaryYAxis.interval = null;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null; done();
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
                let seriesElements: number = document.getElementById('containerSeriesGroup0').childNodes.length;
                expect(seriesElements == 2).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].visible = true;
            chartObj.series[0].dataSource = tooltipData1;
            chartObj.series[0].xName = 'x';
            chartObj.series[0].yName = 'y';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with range', (done: Function) => {
            loaded = (args: Object): void => {
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                let seriesElements: HTMLElement = document.getElementById('container_Series_0_Point_3');
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
                let seriesElements: HTMLElement = document.getElementById('container_Series_0_Point_3');
                let stroke: string = seriesElements.getAttribute('stroke-width');
                expect(stroke == '0').toBe(true);
                let labelElement: HTMLElement = document.getElementById('container0_AxisLabel_3');
                expect(labelElement.textContent == 'Jul 2003').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
            { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
            { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
            ];
            chartObj.series[0].width = 2;
            chartObj.primaryXAxis.valueType = 'DateTime';
            chartObj.primaryXAxis.labelFormat = null;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with dash array', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0_Point_3');
                let stroke: string = seriesElements.getAttribute('stroke-dasharray');
                expect(stroke == '4,3').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dashArray = '4,3';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with empty point(y Value)', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0_Point_3');
                expect(seriesElements == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            let dataSource: any = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
            { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
            { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }
            ];
            dataSource[3].y = null;
            chartObj.series[0].dataSource = dataSource;
            chartObj.primaryXAxis.valueType = 'Category';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with empty point(x Value)', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0_Point_3');
                expect(seriesElements == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            let dataSource: any = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
            { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
            { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }
            ];
            dataSource[3].y = 10;
            dataSource[3].x = null;

            chartObj.series[0].dataSource = dataSource;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with empty point(x and y Value)', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0_Point_3');
                let seriesElements1: HTMLElement = document.getElementById('container_Series_0_Point_5');
                expect(seriesElements == null).toBe(true);
                expect(seriesElements1 == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            let dataSource: any = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
            { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
            { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }];
            dataSource[3].y = null;
            dataSource[3].x = null;
            dataSource[5].y = null;
            dataSource[5].x = null;
            chartObj.series[0].dataSource = dataSource;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with fill and stroke', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0_Point_3');
                expect(seriesElements.getAttribute('stroke') == 'green').toBe(true);
                expect(seriesElements.getAttribute('stroke') != 'red').toBe(true);
                expect(seriesElements.getAttribute('stroke-width') != '10').toBe(true);
                expect(seriesElements.getAttribute('stroke-width') == '4').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = tooltipData1;
            chartObj.series[0].dashArray = null;
            chartObj.series[0].fill = 'red';
            chartObj.series[0].border.color = 'green';
            chartObj.series[0].width = 10;
            chartObj.series[0].border.width = 4;
            chartObj.series[0].opacity = 0.6;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with border', (done: Function) => {
            loaded = (args: Object): void => {
                let svg = document.getElementById('container_Series_0_Point_1');
                let path = svg.getAttribute('d');
                let count = path.indexOf('Z')
                expect(count !== -1).toBe(true);
                expect(svg.getAttribute('stroke') === 'red').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].border.color = 'red';
            chartObj.series[0].border.width = 4;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('within xAxis range', (done: Function) => {
            loaded = (args: Object): void => {
                let svgLength: number = document.getElementById('containerSeriesGroup0').childNodes.length;
                expect(svgLength == 5).toBe(true); done();
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.primaryXAxis.minimum = 4500;
            chartObj.primaryXAxis.maximum = 6500;
            chartObj.primaryXAxis.interval = 500;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
    });

    describe('Column Series with negative', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let animationCOmplete: EmitType<IAnimationCompleteEventArgs>;
        element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        animation: { enable: false }, name: 'ChartSeriesNameGold',
                        dataSource: [{ x: new Date(2000, 6, -11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                        { x: new Date(2004, 3, 6), y: -15 }, { x: new Date(2006, 3, 30), y: 65 },
                        { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                        ], xName: 'x', yName: 'y',
                        type: 'Column', fill: 'rgba(135,206,235,1)',
                    }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }

                });
            chartObj.appendTo('#container');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            document.getElementById('container').remove();
        });

        it('Default Series Type with negative points', (done: Function) => {
            loaded = (args: Object): void => {
                let seriesElements: HTMLElement = document.getElementById('container_Series_0_Point_3');
                let seriesElements1: HTMLElement = document.getElementById('container_Series_0_Point_5');
                expect(seriesElements != null).toBe(true);
                expect(seriesElements1 != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking animation', (done: Function) => {

            animationCOmplete = (args: IAnimationCompleteEventArgs): void => {
                let point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                done();
            };

            chartObj.series[0].animation.enable = true;


            chartObj.animationComplete = animationCOmplete;

            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
    });

    describe('DataLabel', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chartObj = new Chart(
                {
                    primaryXAxis: { valueType: 'DateTime' },
                    primaryYAxis: { rangePadding: 'None' },
                    series: [{
                        animation: { enable: false },
                        dataSource: [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                        { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                        { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }], xName: 'x', yName: 'y', name: 'India',
                        fill: '#E94649', type: 'Column', marker: { visible: false, dataLabel: { visible: false } }
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

        it('Showing default marker', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(element.textContent == '65').toBe(true);
                expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                done();
            };
            chartObj.series[0].marker.dataLabel.visible = true;
            chartObj.loaded = loaded;
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
                expect(element == null).toBe(true);
                done();
            };
            chartObj.series[0].marker.dataLabel.visible = false;
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('with marker visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(element != null).toBe(true);
                let marker: HTMLElement = document.getElementById('container_Series_0_Point_3_Symbol');
                let label: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(marker == null).toBe(true); done();
            };
            chartObj.series[0].marker.visible = true;
            chartObj.series[0].marker.height = 10;
            chartObj.series[0].marker.width = 10;
            chartObj.series[0].marker.dataLabel.visible = true;
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });


        it('with marker size without marker visibility', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_0_Point_3_Symbol');
                expect(marker == null).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.visible = false;
            chartObj.series[0].marker.height = 10;
            chartObj.series[0].marker.width = 10;
            chartObj.series[0].marker.dataLabel.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking edge dataLabel', (done: Function) => {
            let marker: HTMLElement = document.getElementById('container_Series_0_Point_5_Text');
            let location: number = (+marker.getAttribute('x')) + (+marker.getAttribute('width'));
            let clipRectWidth: number = 757.5;
            expect(location < clipRectWidth).toBe(true);
            marker = document.getElementById('container_Series_0_Point_0_Text');
            expect(+marker.getAttribute('x') > 0).toBe(true); done();
        });

        it('Checking auto position', (done: Function) => {
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
        });

        it('Added another series', (done: Function) => {
            loaded = (args: Object): void => {
                done();
            };
            chartObj.series = [chartObj.series[0], {
                name: 'series1', type: 'Column', fill: '#ACE5FF', width: 3,
                animation: { enable: false },
                dataSource: [
                    { x: new Date(2000, 6, 11), y: 45 },
                    { x: new Date(2002, 3, 7), y: 40 },
                    { x: new Date(2004, 3, 6), y: 45 },
                    { x: new Date(2006, 3, 30), y: 40 },
                    { x: new Date(2008, 3, 8), y: 45 },
                    { x: new Date(2010, 3, 8), y: 20 }
                ],
                xName: 'x', yName: 'y',
                marker: { dataLabel: { visible: true } }
            }];
            chartObj.loaded = loaded;
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
                expect(point1 < point1Location).toBe(true);
                expect(point2 < point2Location).toBe(true);
                expect(point3 < point3Location).toBe(true);
                expect(point4 < point4Location).toBe(true);
                expect(point5 < point5Location).toBe(true); done();
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

        it('Checking dataLabel positions Default', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                let hiddenText: HTMLElement = document.getElementById('container_Series_1_Point_1_Text');
                expect(hiddenText != null).toBe(true);
                expect(hiddenShape != null).toBe(true);
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
                expect((<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y < element1).toBe(true);
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
                expect(locationY != element).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Middle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking dataLabel positions Outer', (done: Function) => {
            loaded = (args: Object): void => {
                let element1: number = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                expect((<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y > element1).toBe(true); done();
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

        it('Checking Data label format with globalize format', (done: Function) => {
            loaded = (args: Object): void => {
                let marker: HTMLElement = document.getElementById('container_Series_0_Point_3_Text');
                expect(marker.textContent == '65.00').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryYAxis.labelFormat = 'n2';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment with position auto - near alignment', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                expect(svg > (<Points>(<Series>chartObj.series[0]).points[4]).symbolLocation.y).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Data label alignment with position auto - far alignment', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                expect(svg > (<Points>(<Series>chartObj.series[0]).points[4]).symbolLocation.y).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Data label alignment except Auto position - bottom Position alignment near', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(svg != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Bottom';
            chartObj.series[1].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position - bottom Position alignment far', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape != null).toBe(true);
                let elementY: HTMLElement = document.getElementById('container_Series_1_Point_2_TextShape');
                expect(elementY != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position - bottom Position alignment center', (done: Function) => {
            loaded = (args: Object): void => {
                let xLocation: number = +document.getElementById('container_Series_1_Point_5_TextShape').getAttribute('x');
                let width: number = +document.getElementById('container_ChartAreaBorder').getAttribute('width');
                expect(xLocation > width).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Center';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Data label alignment except Auto position - Outer Position  - alignment near', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape != null).toBe(true);
                let elementYLocation: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementYLocation > (symbolLocation)).toBe(true);
                elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                symbolLocation = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementYLocation > (symbolLocation)).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Outer';
            chartObj.series[1].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position - Outer Position  - alignment far', (done: Function) => {
            loaded = (args: Object): void => {
                let xLocation = +document.getElementById('container_Series_1_Point_5_TextShape').getAttribute('x');
                let width = +document.getElementById('container_ChartAreaBorder').getAttribute('width');
                expect(xLocation > width).toBe(true);
                let elementYLocation: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementYLocation < (symbolLocation)).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking Data label alignment except Auto position - Outer Position - alignment center', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape != null).toBe(true);
                let elementYLocation: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementYLocation < (symbolLocation)).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.alignment = 'Center';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking Data label alignment except Auto position - Top Position', (done: Function) => {
            loaded = (args: Object): void => {
                let hiddenShape: HTMLElement = document.getElementById('container_Series_1_Point_1_TextShape');
                expect(hiddenShape != null).toBe(true);
                let elementYLocation: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                let symbolLocation: number = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                expect(elementYLocation > (symbolLocation)).toBe(true);
                elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                symbolLocation = (<Points>(<Series>chartObj.series[1]).points[2]).symbolLocation.y;
                let elementHeight: number = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('height');
                expect(elementYLocation != (symbolLocation - elementHeight - 5)).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[1].marker.dataLabel.position = 'Top';
            chartObj.series[1].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking margin', (done: Function) => {
            loaded = (args: Object): void => {
                let shape: HTMLElement = document.getElementById('container_Series_0_Point_2_TextShape');
                let shapeY: number = + shape.getAttribute('y');
                let shapeX: number = + shape.getAttribute('x');
                let shapeWidth: number = + shape.getAttribute('width');
                let shapeHeight: number = + shape.getAttribute('height');
                let text: HTMLElement = document.getElementById('container_Series_0_Point_2_Text');
                let textX: number = + text.getAttribute('x');
                let textY: number = + text.getAttribute('y');
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
            };
            chartObj.refresh(); unbindResizeEvents(chartObj);
        })
        it('Checking Overlap data', (done: Function) => {            
            chartObj.loaded = (args: Object): void => {
                expect(document.getElementById('containerShapeGroup2').childNodes.length == 6).toBe(true);
                expect(document.getElementById('container_Series_2_Point_0_TextShape') != null).toBe(true);
                expect(document.getElementById('container_Series_2_Point_2_TextShape') != null).toBe(true); done();
            };
            chartObj.series[0].marker.dataLabel.margin = {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            }
            chartObj.series = [chartObj.series[0], chartObj.series[1], {
                name: 'series1', type: 'Column', fill: 'violet', width: 4,
                animation: { enable: false },
                dataSource: [
                    { x: new Date(2000, 6, 11), y: 45 },
                    { x: new Date(2002, 3, 7), y: 60 },
                    { x: new Date(2004, 3, 6), y: 45 },
                    { x: new Date(2006, 3, 30), y: 60 },
                    { x: new Date(2008, 3, 8), y: 40 },
                    { x: new Date(2010, 3, 8), y: 85 }
                ], xName: 'x', yName: 'y',
                marker: { dataLabel: { visible: true, fill: 'black', opacity: 0.6 } }
            }];
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        })
        it('Changing series Type', (done: Function) => {
            loaded = (args: Object): void => {
                expect(document.getElementById('containerShapeGroup2').childNodes.length > 4).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[2].type = 'Line';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking properties', (done: Function) => {
            loaded = (args: Object): void => {
                expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                expect(document.getElementById('container_Series_0_Point_3_Text').textContent == '65.00').toBe(true);
                let element: HTMLElement = document.getElementById('container_Series_1_Point_2_TextShape');
                expect(element.getAttribute('fill') == 'transparent').toBe(true);
                expect(element.getAttribute('stroke') == 'green').toBe(true);
                expect(element.getAttribute('stroke-width') == '2').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.fill = 'transparent';
            chartObj.series[1].marker.dataLabel.fill = 'transparent';
            chartObj.series[1].marker.dataLabel.alignment = 'Center';
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
    });

    /**
     * Data Label negative point
     */
    describe('Column Series with negative point data label', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        element = createElement('div', { id: 'container' });
        beforeAll(() => {
            document.body.appendChild(element);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        animation: { enable: false },
                        name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                        { x: 3000, y: 70 }, { x: 4000, y: 60 },
                        { x: 5000, y: -50 }, { x: 6000, y: -40 },
                        { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                        type: 'Column', fill: 'rgba(135,206,235,1)',
                        marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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

        it('With negative location', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                expect(svg > point0Location).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('With Label position Top', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                expect(svg < point0Location).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('With Label position Bottom', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                expect(svg < point0Location).toBe(true);
                let rect: number = +document.getElementById('container_Series_0_Point_1').getAttribute('y');
                let rectHeight: number = +document.getElementById('container_Series_0_Point_1').getAttribute('height');
                expect(svg == (rect + 5)); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('With Label position Middle', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                let svgHeight: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('height');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                expect(svg < point0Location).toBe(true);
                let rect: number = +document.getElementById('container_Series_0_Point_1').getAttribute('y');
                let rectHeight: number = +document.getElementById('container_Series_0_Point_1').getAttribute('height');
                expect(svg == (rect - svgHeight + rectHeight / 2)); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Color saturation middle position', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'white').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.fill = 'red';
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Color saturation fill as transparent', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.fill = 'transparent';
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Color saturation with chart area background black', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'white').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.chartArea.background = 'black';
            chartObj.chartArea.border = {
                color: ''
            };
            chartObj.series[0].marker.dataLabel.position = 'Outer';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Color saturation with top position', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Color saturation with data label fill color', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'white').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.fill = 'red';
            chartObj.series[0].marker.dataLabel.position = 'Outer';
            chartObj.refresh(); unbindResizeEvents(chartObj);
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
            chartObj.dataBind();
        });
    });

});

export interface series1 {
    series: Series;
}