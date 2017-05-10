
/**
 * Specifies Stackingarea series spec.
 */
import { remove, createElement } from '@syncfusion/ej2-base/dom';
import { Chart } from '../../../src/chart/chart';
import {
    ChartSeriesType, ChartRangePadding, ValueType,
    ChartShape, LabelPlacement
} from '../../../src/chart/utils/enum';
import { LineSeries } from '../../../src/chart/series/line-series';
import { Marker } from '../../../src/chart/series/marker';
import { } from '../../../src/chart/series/marker';
import { StackingAreaSeries } from '../../../src/chart/series/stacking-area-series';
import { AreaSeries } from '../../../src/chart/series/area-series';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Category } from '../../../src/chart/axis/category-axis';
import { Series } from '../../../src/chart/series/chart-series';
import { StackingColumnSeries } from '../../../src/chart/series/stacking-column-series';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { unbindResizeEvents } from '../base/data.spec';
import { tooltipData21, tooltipData22, datetimeData21, categoryData, negativeDataPoint } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs } from '../../../src/chart/model/interface';
Chart.Inject(LineSeries, Marker, StackingAreaSeries, StackingColumnSeries, AreaSeries, DateTime, Category);
let data: any = tooltipData21;
let data2: any = tooltipData22;
let datetime: any = datetimeData21;
export interface Arg {
    chart: Chart;
}
describe('Chart Control', () => {
    describe('Chart StackingArea series', () => {
        let chartObj: Chart;
        let elem: HTMLElement;
        let svg: HTMLElement;
        let marker: HTMLElement;
        let dataLabel: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let targetElement: HTMLElement;
        beforeAll(() => {
            elem = createElement('div', { id: 'container' });
            document.body.appendChild(elem);
            chartObj = new Chart({
                primaryXAxis: { title: 'PrimaryXAxis' },
                primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                series: [{
                    dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea',
                    name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                },
                {
                    dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea',
                    name: 'ChartSeriesNameDiamond', fill: 'blue',
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
        it('Checking with default points', (done: Function) => {
            loaded = (args: Object): void => {
                let series1: HTMLElement = document.getElementById('container_Series_0');
                expect(series1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);

                let series2: HTMLElement = document.getElementById('container_Series_1');
                expect(series2.getAttribute('fill') == 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });

        it('Checking with null Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0');
                expect(svg.childNodes[3] == null).toBe(true);
                svg = document.getElementById('container_Series_1');
                expect(svg.childNodes[5] == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource[3].y = null;
            chartObj.series[1].dataSource[5].y = null;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking with negative Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                svg = document.getElementById('container_Series_1');
                expect(svg.getAttribute('fill') === 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = negativeDataPoint;
            chartObj.series[1].dataSource = negativeDataPoint;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking with marker visible false', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(svg == null).toBe(true);
                svg = document.getElementById('container_Series_1_Point_0_Symbol');
                expect(svg == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.series[0].dataSource = data;
            chartObj.series[1].dataSource = data2;
            chartObj.series[0].marker.visible = false;
            chartObj.series[1].marker.visible = false;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with marker size', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                expect(series1.marker.height === 10).toBe(true);
                expect(series1.marker.width === 10).toBe(true);
                expect(series2.marker.height === 10).toBe(true);
                expect(series2.marker.width === 10).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.visible = true;
            chartObj.series[0].marker.height = 10;
            chartObj.series[0].marker.width = 10;
            chartObj.series[1].marker.visible = true;
            chartObj.series[1].marker.height = 10;
            chartObj.series[1].marker.width = 10;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with marker with shape', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(svg.getAttribute('fill') === 'red').toBe(true);
                svg = document.getElementById('container_Series_1_Point_0_Symbol');
                expect(svg.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.shape = 'Rectangle';
            chartObj.series[0].marker.fill = 'red';
            chartObj.series[1].marker.shape = 'Diamond';
            chartObj.series[1].marker.fill = 'black';
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
        it('Checking marker with null Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_2_Symbol');
                expect(svg === null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource[2].y = null;
            chartObj.series[0].marker.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with add new element in data', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_8_Symbol');
                expect(svg != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            remove(document.getElementById('containerSeriesGroup0'));
            chartObj.series[0].dataSource = null;
            let length = Object.keys(data).length;
            length++;
            data[length - 1] = [];
            data[length - 1].y = 50;
            data[length - 1].x = 10000;
            chartObj.series[0].dataSource = data;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with single data', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0_Symbol');
                expect(svg != null).toBe(true);
                svg = document.getElementById('container_Series_1_Point_0_Symbol');
                expect(svg != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.rangePadding = 'Additional';
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.series[0].dataSource = null;
            chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
            chartObj.series[1].dataSource = null;
            chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });

        it('Checking with marker without animation', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                svg = document.getElementById('container_Series_1');
                expect(svg.getAttribute('fill') == 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = data;
            chartObj.series[1].dataSource = data2;
            chartObj.series[0].marker.visible = true;
            chartObj.series[1].marker.visible = true;
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
            chartObj.series[1].dataSource = categoryData;
            chartObj.series[0].marker.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it(' checking with fill and stroke', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('fill') === 'red').toBe(true);
                expect(svg.getAttribute('stroke') === 'green').toBe(true);
                expect(svg.getAttribute('stroke-width') === '4').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.series[0].dataSource = data;
            chartObj.series[1].dataSource = data;
            chartObj.series[0].fill = 'red';
            chartObj.series[0].border.color = 'green';
            chartObj.series[0].border.width = 4;
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
            chartObj.series[1].dataSource = categoryData;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with multiple series', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                svg = document.getElementById('container_Series_1');
                expect(svg.getAttribute('fill') == 'red').toBe(true);
                svg = document.getElementById('container_Series_2');
                expect(svg.getAttribute('fill') == 'green').toBe(true);
                svg = document.getElementById('container_Series_3');
                expect(svg.getAttribute('fill') == 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series = [{
                dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)',
                type: 'StackingArea', animation: { enable: false },
            },
            {
                dataSource: data2, name: 'silver', xName: 'x', yName: 'y', fill: 'red', type: 'StackingArea',
                animation: { enable: false },
            },
            {
                dataSource: data, name: 'Diamond', xName: 'x', yName: 'y', fill: 'green', type: 'StackingArea',
                animation: { enable: false },
            },
            {
                dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'blue', type: 'StackingArea',
                animation: { enable: false },
            }];
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('checking with dateTime', (done: Function) => {
            loaded = (args: Object): void => {
                let axislabel: HTMLElement = document.getElementById('container0_AxisLabel_3');
                expect(axislabel.textContent === 'Feb 2002').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = datetime;
            chartObj.series[1].dataSource = datetime;
            chartObj.series[2].dataSource = datetime;
            chartObj.series[3].dataSource = datetime;
            chartObj.primaryXAxis.valueType = 'DateTime';
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with multiple axes ', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_1');
                expect(svg.getAttribute('fill') == 'red').toBe(true);
                svg = document.getElementById('container_Series_0');
                expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.axes = [{
                rowIndex: 1, name: 'yAxis1', minimum: 0,
                titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
            }];
            chartObj.height = '600';
            chartObj.series[2].yAxisName = 'yAxis1';
            chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
            { height: '300', border: { width: 4, color: 'blue' } },];
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
            chartObj.series[3].animation.enable = true;
            chartObj.animationComplete = animate;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
    });
});

export interface series1 {
    series: Series;
}