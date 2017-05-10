
/**
 * Specifies the StackingColumn series spec.
 */
import { remove, createElement } from '@syncfusion/ej2-base/dom';
import { Chart } from '../../../src/chart/chart';
import { ChartSeriesType, ChartRangePadding, ValueType } from '../../../src/chart/utils/enum';
import { LineSeries } from '../../../src/chart/series/line-series';
import { Marker } from '../../../src/chart/series/marker';
import { } from '../../../src/chart/series/marker';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Category } from '../../../src/chart/axis/category-axis';
import { StackingColumnSeries } from '../../../src/chart/series/stacking-column-series';
import { Series, Points } from '../../../src/chart/series/chart-series';
import { DataLabel } from '../../../src/chart/series/data-label';
import { unbindResizeEvents } from '../base/data.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { tooltipData21, tooltipData22, datetimeData21, negativeDataPoint, seriesData1 } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs, IPointRenderEventArgs } from '../../../src/chart/model/interface';

Chart.Inject(LineSeries, Marker, StackingColumnSeries, DateTime, Category, DataLabel);
let data: any = tooltipData21;
let data2: any = tooltipData22;
let dateTime: any = datetimeData21;
export interface Arg {
    chart: Chart;
}

describe('Chart Control', () => {
    describe('Chart StackingColumn series', () => {
        let chartObj: Chart;
        let elem: HTMLElement;
        let svg: HTMLElement;
        let targetElement: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let dataLabel: HTMLElement;
        let marker: HTMLElement;


        beforeAll(() => {
            elem = createElement('div', { id: 'container' });
            document.body.appendChild(elem);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',

                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
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
                svg = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                svg = document.getElementById('container_Series_1_Point_0');
                expect(svg.getAttribute('fill') == 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });
        it('Checking with null Points', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_3');
                expect(svg == null).toBe(true);
                svg = document.getElementById('container_Series_1_Point_5');
                expect(svg == null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = data;
            chartObj.series[1].dataSource = data2;
            chartObj.series[0].dataSource[3].y = null;
            chartObj.series[1].dataSource[5].y = null;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with negative Points', (done: Function) => {
            loaded = (args: Arg): void => {
                let axisLabel = document.getElementById('container1_AxisLabel_6');
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                expect((series1.points[1].region.y) + series1.points[0].region.height > parseFloat(axisLabel.getAttribute('y'))).toBe(true);
                expect((series2.points[4].region.y) + series2.points[4].region.height > parseFloat(axisLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = negativeDataPoint;
            chartObj.series[1].dataSource = negativeDataPoint;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with different stackingGroup', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                expect(series1.points[1].region.x < series2.points[1].region.x).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = data;
            chartObj.series[1].dataSource = data2;
            chartObj.series[0].dataSource[3].y = 70;
            chartObj.series[1].dataSource[5].y = 60;
            chartObj.series[0].stackingGroup = 'a';
            chartObj.series[1].stackingGroup = 'b';
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
          it('Checking with default DataLabel ', (done: Function) => {
            loaded = (args: Object): void => {
                dataLabel = document.getElementById('container_Series_0_Point_0_Text')
                expect(dataLabel.textContent === '70').toBe(true);
                dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                expect(dataLabel.textContent === '73').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.series[0].marker.dataLabel.visible = true;
            chartObj.series[0].stackingGroup = '';
            chartObj.series[1].stackingGroup = '';
            chartObj.series[1].marker.dataLabel.visible = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking data label shape without fill', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_TextShape');
                expect(marker.getAttribute('stroke') === 'grey').toBe(true);
                expect(marker.getAttribute('stroke-width') === '2').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.border.width = 2;
            chartObj.series[0].marker.dataLabel.border.color = 'grey';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking font color saturation', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Text');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.chartArea.background = 'black';
            chartObj.chartArea.border.color = '';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking font color saturation', (done: Function) => {
            loaded = (args: Object): void => {
                marker = document.getElementById('container_Series_0_Point_0_Text');
                expect(marker.getAttribute('fill') === 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.chartArea.background = 'white';
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with DataLabel bottom position', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect(series1.points[0].region.y + series1.points[0].region.height >
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);

                dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                expect(series2.points[0].region.y + series2.points[0].region.height >
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.series[1].marker.dataLabel.position = 'Bottom';
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('Checking with DataLabel middle position', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect((series1.points[0].region.y + series1.points[0].region.height) / 2 <=
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                expect((series2.points[0].region.y + series2.points[0].region.height) / 2 <=
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.series[1].marker.dataLabel.position = 'Middle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with DataLabel top position', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect(series1.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                expect(series2.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[1].marker.dataLabel.position = 'Top';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with DataLabel outer position', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect(series1.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                expect(series2.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Outer';
            chartObj.series[1].marker.dataLabel.position = 'Outer';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with datalabel top position and labelAlignment Near', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');;
                expect(series1.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[0].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with datalabel top position and LabelAlignment far', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect(series1.points[0].region.y > parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[0].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with datalabel top position and labelAlignment center', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect(series1.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Outer';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with datalabel Bottom position and labelAlignment Near', (done: Function) => {
            loaded = (args: Object): void => {
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect(dataLabel != null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = seriesData1;
            chartObj.series[1].dataSource = seriesData1;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.series[0].marker.dataLabel.alignment = 'Near';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with datalabel Bottom and LabelAlignment far', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect((series1.points[0].region.y + series1.points[0].region.height) >
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = data;
            chartObj.series[1].dataSource = data2;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.series[0].marker.dataLabel.alignment = 'Far';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with datalabel custom labelFormat', (done: Function) => {
            loaded = (args: Object): void => {
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect(dataLabel.textContent === '70%').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = data;
            chartObj.series[1].dataSource = data2;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.series[0].marker.dataLabel.alignment = 'Far';
            chartObj.primaryYAxis.labelFormat = '{value}%';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with datalabel bottom position and LabelAlignment center', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                expect((series1.points[0].region.y + series1.points[0].region.height) >
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.primaryYAxis.labelFormat = '';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with DataLabel top position for negative points', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                svg = document.getElementById('container_Series_0_Point_2');
                dataLabel = document.getElementById('container_Series_0_Point_2_Text');
                expect((series1.points[2].region.y + series1.points[2].region.height) >
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);

                svg = document.getElementById('container_Series_1_Point_5');
                dataLabel = document.getElementById('container_Series_1_Point_5_Text');
                expect((series2.points[5].region.y + series2.points[5].region.height) >
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[1].marker.dataLabel.position = 'Top';
            chartObj.series[0].dataSource = negativeDataPoint;
            chartObj.series[1].dataSource = negativeDataPoint;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with DataLabel outer position for negative points', (done: Function) => {
            chartObj.series[0].marker.dataLabel.position = 'Outer';
            chartObj.series[1].marker.dataLabel.position = 'Outer';
            chartObj.refresh(); unbindResizeEvents(chartObj);
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                dataLabel = document.getElementById('container_Series_0_Point_2_Text');
                expect((series1.points[2].region.y + series1.points[2].region.height) >
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                dataLabel = document.getElementById('container_Series_1_Point_5_Text');
                expect((series2.points[5].region.y + series2.points[5].region.height) >
                    parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });
        it('Checking with DataLabel bottom position for negative points', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                dataLabel = document.getElementById('container_Series_0_Point_2_Text');
                expect(series1.points[2].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);

                dataLabel = document.getElementById('container_Series_1_Point_5_Text');
                expect(series2.points[5].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.series[1].marker.dataLabel.alignment = 'Center';
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.series[1].marker.dataLabel.position = 'Bottom';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with DataLabel Middle position for negative points', (done: Function) => {
            loaded = (args: Arg): void => {
                let series1: Series = <Series>args.chart.series[0];
                let series2: Series = <Series>args.chart.series[1];
                dataLabel = document.getElementById('container_Series_0_Point_2_Text');
                expect(series1.points[2].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                dataLabel = document.getElementById('container_Series_1_Point_5_Text');
                expect(series2.points[5].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.series[1].marker.dataLabel.alignment = 'Center';
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.series[1].marker.dataLabel.position = 'Middle';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with border', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_3');
                expect(svg.getAttribute('stroke') === 'green').toBe(true);
                expect(svg.getAttribute('stroke-width') === '2').toBe(true);
                svg = document.getElementById('container_Series_1_Point_3');
                expect(svg.getAttribute('stroke') === 'black');
                expect(svg.getAttribute('stroke-width') === '2').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].border.width = 2;
            chartObj.series[0].border.color = 'green';
            chartObj.series[1].border.width = 2;
            chartObj.series[1].border.color = 'black';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with empty data', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_3');
                expect(svg === null).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = data;
            chartObj.series[0].dataSource[3].y = null;
            chartObj.series[0].dataSource[3].x = null;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with multiple series', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') == 'red').toBe(true);

                svg = document.getElementById('container_Series_1_Point_0');
                expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series = [{
                dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'red', type: 'StackingColumn',
                animation: { enable: false }
            },
            {
                dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'StackingColumn',
                animation: { enable: false }
            }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with multiple series and stackingGroup', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                svg = document.getElementById('container_Series_1_Point_0');
                expect(svg.getAttribute('fill') == 'red').toBe(true);
                svg = document.getElementById('container_Series_2_Point_0');
                expect(svg.getAttribute('fill') == 'green').toBe(true);
                svg = document.getElementById('container_Series_3_Point_0');
                expect(svg.getAttribute('fill') == 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series = [{
                dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)',
                type: 'StackingColumn', animation: { enable: false },
            },
            {
                dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'red', type: 'StackingColumn',
                animation: { enable: false }, stackingGroup: 'a',
            },
            {
                dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'green', type: 'StackingColumn',
                animation: { enable: false }, stackingGroup: 'a'
            },
            {
                dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'blue', type: 'StackingColumn',
                animation: { enable: false },
            }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with multiple axes ', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                svg = document.getElementById('container_Series_1_Point_0');
                expect(svg.getAttribute('fill') == 'red').toBe(true);
                svg = document.getElementById('container_Series_2_Point_0');
                expect(svg.getAttribute('fill') == 'green').toBe(true);
                svg = document.getElementById('container_Series_3_Point_0');
                expect(svg.getAttribute('fill') == 'blue').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.axes = [{
                rowIndex: 1, name: 'yAxis1',
                titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
            }];
            chartObj.height = '600';
            chartObj.series[1].yAxisName = 'yAxis1';
            chartObj.series[2].yAxisName = 'yAxis1';
            chartObj.rows = [{ border: { width: 4, color: 'red' }, height: '300' },
            { border: { width: 4, color: 'blue' } },];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking animation', (done: Function) => {

           let animate: EmitType<IAnimationCompleteEventArgs> = (args: series1): void => {
                let point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                done();
            };
            chartObj.series[0].animation.enable = true;
            chartObj.series[1].animation.enable = true;
            chartObj.series[2].animation.enable = true;
            chartObj.series[3].animation.enable = true;
            chartObj.animationComplete = animate;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
          it('Checking Events', (done: Function) => {
            loaded = (args: Object): void => {
                /*let element: HTMLElement = document.getElementById('container_Series_0_Point_2');
                expect(element.getAttribute('fill') == 'brown').toBe(true);
                element = document.getElementById('container_Series_0_Point_0');
                expect(element == null).toBe(true);*/
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

