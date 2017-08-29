
/**
 * Specifies the  Stepline series spec.
 */
import { remove, createElement } from '@syncfusion/ej2-base';
import { Chart } from '../../../src/chart/chart';
import {
    ChartSeriesType, ChartRangePadding, ValueType,
    ChartShape, LabelPlacement
} from '../../../src/chart/utils/enum';
import { unbindResizeEvents } from '../base/data.spec';
import { Marker } from '../../../src/chart/series/marker';
import { } from '../../../src/chart/series/marker';
import { StepLineSeries } from '../../../src/chart/series/step-line-series';
import { StackingAreaSeries } from '../../../src/chart/series/stacking-area-series';
import { StackingColumnSeries } from '../../../src/chart/series/stacking-column-series';
import { LineSeries } from '../../../src/chart/series/line-series';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Category } from '../../../src/chart/axis/category-axis';
import { Series, Points } from '../../../src/chart/series/chart-series';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { Axis } from '../../../src/chart/axis/axis';
import { tooltipData1, tooltipData2, datetimeData, categoryData, negativeDataPoint } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs } from '../../../src/chart/model/interface';

Chart.Inject(Marker, StepLineSeries, StackingAreaSeries, StackingColumnSeries, LineSeries, Category, DateTime);
let data: any = tooltipData1;
let data2: any = tooltipData2;
let datetime: any = datetimeData;
export interface Arg {
    chart: Chart;
}

describe('Chart Control', () => {
    describe('Chart Stepline series', () => {
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
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StepLine',
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
                expect(parseFloat(svg.getAttribute('y')) < series.points[1].symbolLocation.y).toBe(true);
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
            chartObj.series[0].dataSource = [{ x: 1, y: 10 }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with marker shape Circle', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
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
            chartObj.series = [{ dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', type: 'StepLine', animation: { enable: false } },
            { dataSource: data2, xName: 'x', name: 'silver', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'StepLine', animation: { enable: false } },
            { dataSource: data, xName: 'x', name: 'diamond', yName: 'y', fill: 'blue', type: 'StepLine', animation: { enable: false } }];
            chartObj.series[0].marker.visible = true;
            chartObj.series[1].marker.visible = true;
            chartObj.series[2].marker.visible = true;
            // chartObj.primaryXAxis.valueType = ValueType.DateTime;
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

        it('Checking with multiple axes ', (done: Function) => {
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
                let point : Element =  <Element>document.getElementById('container_ChartSeriesClipRect_' + args.series.index).childNodes[0];
                expect(point.getAttribute('width') === document.getElementById('container_ChartAreaBorder').getAttribute('width')).toBe(true);
                done();
            };
            chartObj.series[0].animation.enable = true;
            chartObj.series[1].animation.enable = true;
            chartObj.series[2].animation.enable = true;
            chartObj.animationComplete = animate;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with category axis and multiple category data ', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                expect(series1.stackedValues.startValues[0] === 0).toBe(true);
                expect(series2.stackedValues.startValues[0] === 0).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series = [{
                dataSource: [{ x: "USA", y: 50 }, { x: "China", y: 50 },
                { x: "Japan", y: 70 }, { x: "Australia", y: 60 },
                { x: "France", y: 50 }, { x: "Germany", y: 50 },
                { x: "Italy", y: 60 }, { x: "Sweden", y: 60 }],
                name: 'Gold', xName: 'x', yName: 'y', fill: 'red', type: 'StackingColumn'
            }, {
                type: 'StackingColumn',
                dataSource: [{ x: '1', y: 70 }, { x: '2', y: 60 }, { x: '3', y: 20 }, { x: '4', y: 100 },
                            { x: '5', y: 30 }, { x: '6', y: 120 }, { x: '7', y: 140 }],
                name: 'silver', fill: 'blue', xName: 'x', yName: 'y'
            }];
            chartObj.primaryXAxis.valueType = 'Category';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
    });
});
export interface series1 {
    series: Series;
}