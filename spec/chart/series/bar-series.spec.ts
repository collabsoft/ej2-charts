
/**
 * Specifies the Bar series spec.
 */
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { Chart } from '../../../src/chart/chart';
import { LineSeries } from '../../../src/chart/series/line-series';
import { Marker } from '../../../src/chart/series/marker';
import { Category } from '../../../src/chart/axis/category-axis';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Series, Points } from '../../../src/chart/series/chart-series';
import { BarSeries } from '../../../src/chart/series/bar-series';
import { ColumnSeries } from '../../../src/chart/series/column-series';
import { Tooltip } from '../../../src/chart/user-interaction/tooltip';
import { Crosshair } from '../../../src/chart/user-interaction/crosshair';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { unbindResizeEvents } from '../base/data.spec';
import { MouseEvents } from '../base/events.spec';
import { bar, barData, datetimeData, categoryData, categoryData1, negativeDataPoint } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAnimationCompleteEventArgs, IPointRenderEventArgs } from '../../../src/chart/model/interface';

Chart.Inject(LineSeries, Marker, BarSeries, ColumnSeries, Tooltip, Crosshair, Category, DateTime);



describe('Chart Control', () => {
    describe('Chart Bar series', () => {
        let chartObj: Chart;
        let elem: HTMLElement;
        let point: HTMLElement;
        let svg: HTMLElement;
        let targetElement: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let done: Function;
        let dataLabel: HTMLElement;
        let trigger: MouseEvents = new MouseEvents();
        let x: number;
        let y: number;
        let animationComplete:  EmitType<IAnimationCompleteEventArgs>;

        beforeAll(() => {
            elem = createElement('div', { id: 'container' });
            document.body.appendChild(elem);
            chartObj = new Chart(
                {
                    primaryXAxis: { title: 'PrimaryXAxis', },
                    primaryYAxis: { title: 'PrimaryYAxis', },
                    series: [{
                        dataSource: bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    ], width: '800',
                    tooltip: { enable: true, fill: 'rgba(247,247,247,0.85)', textStyle: { size: '12px' }, format: '${series.name} : ${point.x} <br/> : ${point.y}' },
                    legendSettings: { visible: false },
                    title: 'Chart TS Title'
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
                svg = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
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
            chartObj.series[0].dataSource = bar;
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
            chartObj.primaryYAxis.rangePadding = 'Additional';
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.series[0].dataSource = null;
            chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking with negative Points', (done: Function) => {
            loaded = (args: Object): void => {
                let series: Series = <Series>chartObj.series[0];
                let axisLabel = document.getElementById('container1_AxisLabel_4');
                svg = document.getElementById('container_Series_0_Point_1');
                expect(series.points[1].region.x < parseFloat(axisLabel.getAttribute('x'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = negativeDataPoint;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('checking with border', (done: Function) => {
            loaded = (args: Object): void => {
                svg = document.getElementById('container_Series_0_Point_1');
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

        it('checking multiple series bar chart', (done: Function) => {
            loaded = (args: Object): void => {
                let series0: Series = <Series>chartObj.series[0];
                let series1: Series = <Series>chartObj.series[1];
                let point1 = document.getElementById('container_Series_0_Point_2');
                let point2 = document.getElementById('container_Series_1_Point_2');
                expect((series0.points[2].region.y) == series1.points[2].region.height + series1.points[2].region.y).toBe(true);
                done();
            }
            chartObj.series = [{
                dataSource: bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
            },
            {
                dataSource: barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
            },
            {
                dataSource: barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
            }
            ];
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.rangePadding = 'None';
            chartObj.primaryYAxis.rangePadding = 'None';
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
                dataSource: bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
            },
            {
                dataSource: barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
            },
            {
                dataSource: barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
            }
            ];
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('checking multiple series with diff orientation(vertical) ', (done: Function) => {
            loaded = (args: Object): void => {
                let point1 = document.getElementById('container_Series_0_Point_0');
                let point2 = document.getElementById('container_Series_1_Point_0');
                expect(point2 != null).toBe(true);
                expect(point1 != null).toBe(true);
                done();
            }
            chartObj.series = [];
            chartObj.series = [{
                dataSource: bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
            },
            {
                dataSource: barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
            },
            {
                dataSource: barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                name: 'ChartSeriesNamepearl', fill: 'rgba(135,000,000,1)',
            }];
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('default Tooltip', (done: Function) => {

            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_1');
                let series: Series = <Series>chartObj.series[0];

                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                y = series.points[1].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[1].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_tooltip');
                expect(tooltip != null).toBe(true);
                expect(target.getAttribute('opacity') == '0.5').toBe(true);
                expect(parseFloat(tooltip.style.left) > series.points[1].region.y + parseFloat(chartArea.getAttribute('y')));

                target = document.getElementById('container_Series_0_Point_7');
                series = <Series>chartObj.series[0];

                y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + 30 + elem.offsetTop;
                x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                tooltip = document.getElementById('container_tooltip');
                expect(tooltip != null).toBe(true);
                expect(target.getAttribute('opacity') == '0.5').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].type = 'Bar';
            chartObj.series[0].dataSource = bar;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('tooltip checking with positive edges', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_7');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let tooltipWidth: HTMLElement;
                y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                let tooltip: HTMLElement = document.getElementById('container_tooltip');
                tooltipWidth = document.getElementById('container_tooltip_svg');
                expect(tooltip != null).toBe(true);
                expect(target.getAttribute('opacity') == '0.5').toBe(true);
                expect(parseFloat(tooltip.style.left) > (elem.offsetLeft + series.points[7].region.x + (series.points[7].region.width / 2) + parseFloat(chartArea.getAttribute('x')))).toBe(true);
                done();
            }
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = bar;
            chartObj.primaryXAxis.rangePadding = 'Additional';
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('negative Tooltip', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_1');
                let series: Series = <Series>chartObj.series[0];

                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                y = series.points[1].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[1].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_tooltip');
                expect(tooltip != null).toBe(true);
                expect(target.getAttribute('opacity') == '0.5').toBe(true);
                expect(parseFloat(tooltip.style.left) < series.points[1].region.x + series.points[1].region.width + parseFloat(chartArea.getAttribute('x'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].type = 'Bar';
            bar[7].y = -10, bar[1].y = -60;
            chartObj.series[0].dataSource = bar;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('tooltip checking with negative edge', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_7');
                let series: Series = <Series>chartObj.series[0];
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let tooltipWidth: HTMLElement;
                y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                let tooltip: HTMLElement = document.getElementById('container_tooltip');
                tooltipWidth = document.getElementById('container_tooltip_svg');
                expect(tooltip != null).toBe(true);
                expect(target.getAttribute('opacity') == '0.5').toBe(true);
                expect((parseFloat(tooltip.style.left) + parseFloat(tooltipWidth.getAttribute('width'))) < series.points[1].region.x + series.points[1].region.width + parseFloat(chartArea.getAttribute('x'))).toBe(true);
                done();
            }
            chartObj.loaded = loaded;
            chartObj.series[0].dataSource = bar;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it(' checking with category  axis', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                point = document.getElementById("container_Series_0_Point_1");
                let point2 = document.getElementById("container_Series_1_Point_1");
                expect(point.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                expect(point2 == null).toBe(true);
                let target: HTMLElement = document.getElementById('container_Series_0_Point_0');
                let series: Series = <Series>chartObj.series[0];

                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                y = series.points[0].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[0].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_tooltip');
                expect(tooltip != null).toBe(true);
                expect(target.getAttribute('opacity') == '0.5').toBe(true);
                done();
            };
            chartObj.primaryXAxis.valueType = 'Category';
            chartObj.series = [{
                dataSource: categoryData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
            },
            {
                dataSource: categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
            },
            {
                dataSource: categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
            }],
                chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
        it('checking with track ball', (done: Function) => {
            loaded = (args: Object): void => {
                let target: HTMLElement = document.getElementById('container_Series_0_Point_7');
                let series: Series = <Series>chartObj.series[0];

                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) - 10 + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));

                let tooltip: HTMLElement = document.getElementById('container_tooltip');
                expect(tooltip != null).toBe(true);
                expect(tooltip.offsetTop < y + series.points[7].region.height).toBe(true);
                tooltip = document.getElementById('container_tooltip');
                expect(tooltip != null).toBe(true);
                done();
            };
            chartObj.series[1].type = 'Bar';
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.labelPlacement = 'OnTicks';
            chartObj.primaryXAxis.crosshairTooltip.enable = true;
            chartObj.primaryYAxis.crosshairTooltip.enable = true;
            chartObj.crosshair.enable = true;
            chartObj.tooltip.shared = true;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('checking with cross hair', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                let chartArea: HTMLElement = document.getElementById('container_ChartAreaBorder');
                let series: Series = <Series>chartObj.series[0];

                y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[2].region.x + series.points[2].region.width / 2 + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));

                let crosshair: Element = <Element>document.getElementById('container_svg').childNodes[4];
                let element1: HTMLElement;
                expect(crosshair.childNodes.length == 3).toBe(true);
                element1 = <HTMLElement>crosshair.childNodes[0];
                expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                element1 = <HTMLElement>crosshair.childNodes[1];
                expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                element1 = <HTMLElement>crosshair.childNodes[2].childNodes[0];
                expect(element1.getAttribute('d') !== '').toBe(true);
                element1 = <HTMLElement>crosshair.childNodes[2].childNodes[2];
                expect(element1.getAttribute('d') !== '').toBe(true);
                element1 = <HTMLElement>crosshair.childNodes[2].childNodes[1];
                expect(element1.textContent == 'Japan').toBe(true);
                element1 = <HTMLElement>crosshair.childNodes[2].childNodes[3];
                expect(element1.textContent == '35.077').toBe(true);
                done();
            }
            chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it(' checking with datetime  axis', (done: Function) => {
            remove(document.getElementById('container_tooltip'));
            loaded = (args: Object): void => {
                point = document.getElementById("container_Series_0_Point_1");
                let point2 = document.getElementById("container_Series_1_Point_1");
                expect(point.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                expect(point2 == null).toBe(true);
                done();
            }
            chartObj.primaryXAxis.valueType = 'DateTime';
            chartObj.series[0].dataSource = null;
            chartObj.series[1].dataSource = null;
            chartObj.series = [{
                dataSource: datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
            }],
                chartObj.loaded = loaded;
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });
        it('Checking with multiple axes rows', (done: Function) => {
            loaded = (args: Object): void => {
                point = document.getElementById('container_Series_0_Point_0');
                expect(point.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                let point1 = document.getElementById('container_Series_1_Point_1');
                expect(point1.getAttribute('fill') === 'rgba(135,000,235,1)').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.primaryXAxis.valueType = 'Double';
            chartObj.axes = [{
                rowIndex: 1, name: 'yAxis1', title: 'AdditionalAxis',
                titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
            }];
            chartObj.series = [{
                dataSource: bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
            },
            {
                dataSource: barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
            },
            ],
                chartObj.height = '600';
            chartObj.series[1].xAxisName = 'yAxis1';
            chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
            { height: '300', border: { width: 4, color: 'blue' } }];
            chartObj.refresh(); unbindResizeEvents(chartObj);
        });

        it('Checking animation', (done: Function) => {

            animationComplete = (args: IAnimationCompleteEventArgs): void => {
                let point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                done();
            };
            chartObj.series[0].animation.enable = true;
            chartObj.series[1].animation.enable = true;
            chartObj.animationComplete = animationComplete;
            chartObj.refresh(); unbindResizeEvents(chartObj);

        });
    });
    describe('Bar Series with data label', () => {
        let chartObj: Chart;
        let loaded: EmitType<ILoadedEventArgs>;
        let animationComplete: EmitType<IAnimationCompleteEventArgs>;
        let element: HTMLElement;
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
                        type: 'Bar', fill: 'rgba(135,206,235,1)',
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
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).region.x;
                expect(svg < point0Location).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Top', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.x;
                expect(svg > point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let pointLocation1 = (<Points>(<Series>chartObj.series[0]).points[0]).symbolLocation.x;
                expect(svg < pointLocation1).toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Bottom', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                let point0Location: number = ((<Points>(<Series>chartObj.series[0]).points[1]).region.x +
                    (<Points>(<Series>chartObj.series[0]).points[1]).region.width);
                expect(svg < point0Location).toBe(true);
                let svg1: number = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                let point0Location1 = (<Points>(<Series>chartObj.series[0]).points[0]).region.x;
                expect(svg1 > point0Location1).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Bottom';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('With Label position Middle', (done: Function) => {
            loaded = (args: Object): void => {
                let svg: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                let svgHeight: number = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('height');
                let point0Location: number = (<Points>(<Series>chartObj.series[0]).points[1]).symbolLocation.y;
                expect(svg < point0Location).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Middle';
            chartObj.series[0].marker.dataLabel.alignment = 'Center';
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
                expect(element.getAttribute('fill') == 'white').toBe(true);
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
        it('Color saturation with top position', (done: Function) => {
            loaded = (args: Object): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'black').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].marker.dataLabel.position = 'Top';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('Color saturation with data label fill color', (done: Function) => {
            loaded = (args: ILoadedEventArgs): void => {
                let element: HTMLElement = document.getElementById('container_Series_0_Point_4_Text');
                expect(element.getAttribute('fill') == 'white').toBe(true); done();
            };
            chartObj.loaded = loaded;
            chartObj.series[0].animation.enable = true;            
            chartObj.series[0].marker.dataLabel.fill = 'red';
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
           };
          chartObj.loaded = loaded;
          chartObj.title = 'Events Changed';
          chartObj.dataBind();
         });
    });
});

export interface series1 {
    series: Series;
}
