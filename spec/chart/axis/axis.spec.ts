/**
 * Chart spec document
 */

import { createElement } from '@syncfusion/ej2-base';
import { Chart } from '../../../src/chart/chart';
import { LineSeries } from '../../../src/chart/series/line-series';
import { Marker } from '../../../src/chart/series/marker';
import { Category } from '../../../src/chart/axis/category-axis';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { unbindResizeEvents } from '../base/data.spec';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, IAxisLabelRenderEventArgs } from '../../../src/common/model/interface';
Chart.Inject(LineSeries, Category, Marker);


describe('Chart Control', () => {
    let ele: HTMLElement;
    let svg: HTMLElement;
    let text: HTMLElement;
    let loaded: EmitType<ILoadedEventArgs>;
    describe('Axis Behavior', () => {
        let chartObj: Chart;
        beforeAll((): void => {
            ele = createElement('div', { id: 'chartContainer' });
            document.body.appendChild(ele);
            chartObj = new Chart(
                {
                    rows: [
                        {
                            height: '300'
                        },
                        {
                            height: '100'
                        }
                    ], loaded: loaded, legendSettings: { visible: false }
                }
            );
            chartObj.appendTo('#chartContainer');
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            unbindResizeEvents(chartObj);
            chartObj.destroy();
            ele.remove();
        });
        it('Checking the row definition', (done: Function) => {
            loaded = (args: Object): void => {
                let axis: HTMLElement = document.getElementById('chartContainerAxisCollection');
                expect(axis.childNodes.length == 3).toBe(true);
                axis = document.getElementById('chartContainerAxisLine_1');
                expect(parseFloat(axis.getAttribute('y2')) - parseFloat(axis.getAttribute('y1')) == 300).toBe(true);
                done();
            };
            chartObj.loaded = loaded;

        });
        it('Adding column definition to Axis', (done: Function) => {
            chartObj.columns = [{ width: '350' }, { width: '100' }];
            chartObj.width = '400'; chartObj.height = '300';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
            loaded = (args: Object): void => {
                let axis: HTMLElement = document.getElementById('chartContainerAxisCollection');
                expect(axis.childNodes.length == 3).toBe(true);
                axis = document.getElementById('chartContainerAxisLine_0');
                expect(parseFloat(axis.getAttribute('x2')) - parseFloat(axis.getAttribute('x1')) == 350).toBe(true);
                done();
            };
            chartObj.loaded = loaded;

        });
        it('Checking the empty definition', (done: Function) => {
            chartObj.columns = []; chartObj.rows = [];
            chartObj.refresh();
            unbindResizeEvents(chartObj);
            loaded = (args: Object): void => {
                let area: HTMLElement = document.getElementById('chartContainer_ChartAreaBorder');
                expect(area.getAttribute('y') == '10.25').toBe(true);
                expect(area.getAttribute('x') == '10').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });
        it('Checking the row definition with high value', (done: Function) => {
            chartObj.columns = [{ width: '100%' }]; chartObj.rows = [{ height: '100%' }];
            chartObj.primaryXAxis.rowIndex = 2; chartObj.primaryXAxis.minimum = 2;
            chartObj.primaryYAxis.columnIndex = 2; chartObj.primaryYAxis.minimum = 2;
            chartObj.refresh();
            unbindResizeEvents(chartObj);
            loaded = (args: Object): void => {
                let area: HTMLElement = document.getElementById('chartContainer_ChartAreaBorder');
                let axisLine: HTMLElement = document.getElementById('chartContainerAxisLine_1');
                expect(area.getAttribute('x') == document.getElementById('chartContainerAxisLine_0').getAttribute('x1')).toBe(true);
                expect(parseFloat(area.getAttribute('height')) == parseFloat(axisLine.getAttribute('y2')) - parseFloat(axisLine.getAttribute('y1'))).toBe(true);
                done();
            };
            chartObj.loaded = loaded;
        });
        it('Checking the definition with negative value', () => {
            chartObj.primaryXAxis.rowIndex = -1;
            chartObj.primaryYAxis.columnIndex = -1;
            chartObj.dataBind();

            let area: HTMLElement = document.getElementById('chartContainer_ChartAreaBorder');
            let axisLine: HTMLElement = document.getElementById('chartContainerAxisLine_1');
            expect(area.getAttribute('x') == document.getElementById('chartContainerAxisLine_0').getAttribute('x1')).toBe(true);
            expect(parseFloat(area.getAttribute('height')) == parseFloat(axisLine.getAttribute('y2')) - parseFloat(axisLine.getAttribute('y1'))).toBe(true);

        });
        it('Checking Axis Line', () => {
            chartObj.primaryXAxis.lineStyle.color = '#FBAF4F'; chartObj.primaryXAxis.lineStyle.width = 3;
            chartObj.primaryYAxis.lineStyle.color = '#0D97D4'; chartObj.primaryYAxis.lineStyle.width = 3;
            chartObj.dataBind();

            svg = document.getElementById('chartContainerAxisLine_0');
            expect(svg.getAttribute('stroke') == '#FBAF4F').toBe(true);
            expect(svg.getAttribute('stroke-width') == '3').toBe(true);
            svg = document.getElementById('chartContainerAxisLine_1');
            expect(svg.getAttribute('stroke') == '#0D97D4').toBe(true);
            expect(svg.getAttribute('stroke-width') == '3').toBe(true);
        });

        it('Checking Grid Line', () => {
            chartObj.primaryXAxis.majorGridLines = { color: '#C2C924', width: 2 };
            chartObj.primaryXAxis.majorTickLines = { color: '#0AA368', width: 1.5, height: 20 };
            chartObj.primaryYAxis.majorGridLines = { color: '#B4D072', width: 2 };
            chartObj.primaryYAxis.majorTickLines = { color: '#C2C924', width: 1.5, height: 20 };
            chartObj.dataBind();

            svg = document.getElementById('chartContainer_MajorGridLine_0');
            expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
            expect(svg.getAttribute('stroke-width') == '2').toBe(true);

            svg = document.getElementById('chartContainer_MajorTickLine_0');
            expect(svg.getAttribute('stroke') == '#0AA368').toBe(true);
            expect(svg.getAttribute('stroke-width') == '1.5').toBe(true);

            svg = document.getElementById('chartContainer_MajorGridLine_1');
            expect(svg.getAttribute('stroke') == '#B4D072').toBe(true);
            expect(svg.getAttribute('stroke-width') == '2').toBe(true);

            svg = document.getElementById('chartContainer_MajorTickLine_1');
            expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
            expect(svg.getAttribute('stroke-width') == '1.5').toBe(true);
        });


        it('Checking Axis title', () => {
            chartObj.primaryXAxis.title = 'Change the text';
            chartObj.primaryYAxis.title = 'Population';
            chartObj.dataBind();

            text = document.getElementById('chartContainer_AxisTitle_0');
            expect(text.textContent == 'Change the text').toBe(true);
            text = document.getElementById('chartContainer_AxisTitle_1');
            expect(text.textContent == 'Population').toBe(true);

        });

        it('Checking Axis Range', () => {
            chartObj.primaryXAxis.minimum = 12;
            chartObj.primaryXAxis.maximum = 2;
            chartObj.primaryXAxis.interval = 2;
            chartObj.dataBind();
            text = document.getElementById('chartContainer0_AxisLabel_0');
            expect(text.textContent == '2').toBe(true);
        });

        it('Checking the range padding', () => {
            chartObj.primaryXAxis = { title: 'PrimaryXAxis', rangePadding: 'Additional' };
            chartObj.primaryYAxis = { title: 'PrimaryYAxis', rangePadding: 'Normal' };
            chartObj.dataBind();

            text = document.getElementById('chartContainer0_AxisLabel_0');
            expect(text.textContent != '1').toBe(true);
            text = document.getElementById('chartContainer1_AxisLabel_0');
            expect(text.textContent == '2').toBe(true);
            text = document.getElementById('chartContainer1_AxisLabel_4');          
            expect(text.textContent == '6').toBe(true);
        });
        it('Checking the zoomFactor and zoomPosition', () => {
            chartObj.primaryXAxis = { minimum: 1000, maximum: 10000, interval: 1000, zoomFactor: 0.5, zoomPosition: 0.3 };
            chartObj.primaryYAxis = { minimum: 0, maximum: 50, enableAutoIntervalOnZooming: false, zoomFactor: 0.3, zoomPosition: 0.6 };
            chartObj.dataBind();

            text = document.getElementById('chartContainer0_AxisLabel_0');
            expect(text.textContent == '4000').toBe(true);
            text = document.getElementById('chartContainer1_AxisLabel_0');
            expect(text.textContent == '30').toBe(true);

        });
        it('Axis label rotation', () => {
            chartObj.primaryXAxis = { labelRotation: 45, zoomFactor: 1, zoomPosition: 0 };
            chartObj.primaryYAxis = { zoomFactor: 1, zoomPosition: 0 };
            chartObj.dataBind();

            svg = document.getElementById('chartContainer_ChartAreaBorder');
            text = document.getElementById('chartContainer0_AxisLabel_0');
            expect(text.getAttribute('transform').indexOf('rotate(45') > -1).toBe(true);
        });
        it('Checking Minor Grid Line', () => {
            chartObj.primaryXAxis = {
                minorGridLines: { color: '#C2C924', width: 1 },
                minorTickLines: { color: '#0AA368', width: 1, height: 3 },
                minorTicksPerInterval: 4,
                labelRotation: 0
            };
            chartObj.primaryYAxis = {
                minorGridLines: { color: '#B4D072', width: 1 },
                minorTickLines: { color: '#C2C924', width: 1, height: 3 },
                minorTicksPerInterval: 4
            };
            chartObj.dataBind();

            svg = document.getElementById('chartContainer_MinorGridLine_0');
            expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
            expect(svg.getAttribute('stroke-width') == '1').toBe(true);

            svg = document.getElementById('chartContainer_MinorTickLine_0');
            expect(svg.getAttribute('stroke') == '#0AA368').toBe(true);
            expect(svg.getAttribute('stroke-width') == '1').toBe(true);

            svg = document.getElementById('chartContainer_MinorGridLine_1');
            expect(svg.getAttribute('stroke') == '#B4D072').toBe(true);
            expect(svg.getAttribute('stroke-width') == '1').toBe(true);

            svg = document.getElementById('chartContainer_MinorTickLine_1');
            expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
            expect(svg.getAttribute('stroke-width') == '1').toBe(true);
        });

        it('Checking Minor Gird Line with opposed position', () => {
            chartObj.primaryXAxis.opposedPosition = true;
            chartObj.primaryYAxis.opposedPosition = true;
            chartObj.dataBind();

            svg = document.getElementById('chartContainer_MinorTickLine_0');
            expect(svg.getAttribute('stroke') == '#0AA368').toBe(true);
            expect(svg.getAttribute('stroke-width') == '1').toBe(true);

            svg = document.getElementById('chartContainer_MinorTickLine_1');
            expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
            expect(svg.getAttribute('stroke-width') == '1').toBe(true);
        });
        it('Checking the label format', () => {
            chartObj.primaryYAxis.opposedPosition = false; chartObj.primaryYAxis.minimum = 1000;
            chartObj.primaryYAxis.maximum = 10000;
            chartObj.primaryXAxis.labelRotation = 45;
            chartObj.primaryYAxis.labelFormat = 'C';
            chartObj.dataBind();
            text = document.getElementById('chartContainer1_AxisLabel_1');
            expect(text.textContent == '$3000.00').toBe(true);
            let element: Element = <Element>document.getElementById('chartContainer0_AxisLabel_1');
            expect(element.getAttribute('transform').indexOf('rotate(45') > -1).toBe(true);
        });
        it('Checking the rotation greater than 360', () => {
            chartObj.primaryXAxis.opposedPosition = false;
            chartObj.primaryXAxis.labelRotation = 387;
            chartObj.dataBind();
            let element: Element = <Element>document.getElementById('chartContainer0_AxisLabel_1');
            expect(element.getAttribute('transform').indexOf('rotate(27') > -1).toBe(true);
        });
    });

    describe('Axis Behavior', () => {
        let chart: Chart;
        beforeAll((): void => {
            ele = createElement('div', { id: 'chartContainer' });
            document.body.appendChild(ele);
            chart = new Chart({
                series: [{ dataSource: [{ x: 10, y: -10 }], xName: 'x', yName: 'y', fill: 'pink', animation: { enable: true } }],
                primaryXAxis: { desiredIntervals: 2 },
                primaryYAxis: { rangePadding: 'Normal' }, loaded: loaded, legendSettings: { visible: false },
                axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                    args.text = args.text + 'custom';
                }
            });
            chart.appendTo('#chartContainer');
        });
        afterAll((): void => {
            chart.destroy();
            ele.remove();
        });

        it('Checking with negative value in axis', (done: Function) => {
            loaded = (args: Object): void => {
                text = document.getElementById('chartContainerAxisLabels0');
                expect(text.childNodes.length == 3).toBe(true);
                expect(text.childNodes[0].textContent.indexOf('custom') > -1).toBe(true);
                done();
            };
            chart.loaded = loaded;
        });
        it('Changing the value type', (done: Function) => {
            loaded = (args: Object): void => {
                text = document.getElementById('chartContainerAxisLabels0');
                expect(text.childNodes.length == 1).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis.valueType = 'Category';
            chart.refresh();
        });
        it('checking minor ticklines', (done: Function) => {
            chart.loaded = (args: Object): void => {
                let tick: Element = document.getElementById('chartContainer_MinorGridLine_0');
                let border: Element = document.getElementById('chartContainer_ChartAreaBorder');
                expect(tick.getBoundingClientRect().top == border.getBoundingClientRect().top).toBe(true);
                done();
            };;
            chart.primaryXAxis.minorTicksPerInterval = 1;
            chart.primaryXAxis.minorTickLines.width = 8;
            chart.primaryXAxis.minorGridLines.width = 8;
            chart.refresh();
        });
        it('checking y axis as inversed axis', (done: Function) => {
            loaded = (args: Object): void => {
                let firstLabel: HTMLElement = document.getElementById('chartContainer1_AxisLabel_0');
                expect(firstLabel.textContent).toEqual('0');
                let lastLabel: HTMLElement = document.getElementById('chartContainer1_AxisLabel_10');
                expect(lastLabel.textContent).toEqual('5');
                expect(+firstLabel.getAttribute('y') < (+lastLabel.getAttribute('y'))).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryYAxis.valueType = 'Double';
            chart.primaryYAxis.isInversed = true;
            chart.primaryYAxis.desiredIntervals = null;
            chart.axisLabelRender = null;
            chart.series[0].dataSource = null;
            chart.refresh();
        });
        it('checking x axis as inversed axis', (done: Function) => {
            loaded = (args: Object): void => {
                let firstLabel: HTMLElement = document.getElementById('chartContainer0_AxisLabel_0');
                expect(firstLabel.textContent).toEqual('0');
                let secondLabel = document.getElementById('chartContainer0_AxisLabel_5');
                expect(secondLabel.textContent).toEqual('2.5');
                expect(+firstLabel.getAttribute('x') > (+secondLabel.getAttribute('x'))).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis.valueType = 'Double';
            chart.primaryXAxis.isInversed = true;
            chart.primaryXAxis.desiredIntervals = null;
            chart.refresh();
        });
        it('checking inversed axis with label intersect action', (done: Function) => {
            loaded = (args: Object): void => {
                let firstLabel: HTMLElement = document.getElementById('chartContainer0_AxisLabel_0');
                expect(firstLabel.textContent).toEqual('1customLabels');
                let secondLabel: HTMLElement = document.getElementById('chartContainer0_AxisLabel_1');
                expect(secondLabel).toEqual(null);
                let thirdLabel: HTMLElement = document.getElementById('chartContainer0_AxisLabel_2');
                expect(thirdLabel.textContent).toEqual('3customLabels');
                expect(+firstLabel.getAttribute('x') > ((+thirdLabel.getAttribute('x') + +thirdLabel.getAttribute('width')))).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis = { maximum: 5, minimum: 1, interval: 1};
            chart.axisLabelRender = (args: IAxisLabelRenderEventArgs) => {
                    args.text = args.text + 'customLabels';
            };
            chart.width = '400';
            chart.refresh();
        });
        it('checcking inversed axis with labelintersect action as none', (done: Function) => {
            loaded = (args: Object): void => {
                let firstLabel: HTMLElement = document.getElementById('chartContainer0_AxisLabel_0');
                expect(firstLabel.textContent).toEqual('1customLabels');
                let secondLabel: any = document.getElementById('chartContainer0_AxisLabel_1');
                expect(secondLabel.textContent).toEqual('2customLabels');
                let thirdLabel: HTMLElement = document.getElementById('chartContainer0_AxisLabel_2');
                expect(thirdLabel.textContent).toEqual('3customLabels');
                expect(+firstLabel.getAttribute('x')< ((+secondLabel.getAttribute('x') + secondLabel.textLength.baseVal.value))).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis.labelIntersectAction = 'None';
            chart.dataBind();
        });
        it('checcking inversed axis with labelintersect action as rotate45', (done: Function) => {
            loaded = (args: Object): void => {
                let firstLabel: HTMLElement = document.getElementById('chartContainer0_AxisLabel_0');
                expect(firstLabel.textContent).toEqual('1customLabels');
                expect(firstLabel.getAttribute('transform').indexOf('rotate(45') > -1).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis.labelIntersectAction = 'Rotate45';
            chart.dataBind();
        });
        it('checcking inversed axis with labelintersect action as rotate90', (done: Function) => {
            loaded = (args: Object): void => {
                let firstLabel: HTMLElement = document.getElementById('chartContainer0_AxisLabel_0');
                expect(firstLabel.textContent).toEqual('1customLabels');
                expect(firstLabel.getAttribute('transform').indexOf('rotate(90') > -1).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis.labelIntersectAction = 'Rotate90';
            chart.dataBind();
        });
        it('checking with multiple axes', (done: Function) => {
            loaded = (args: Object): void => {
                let firstLabel: HTMLElement = document.getElementById('chartContainer2_AxisLabel_0');
                expect(firstLabel.textContent).toEqual('24');
                let secondLabel: any = document.getElementById('chartContainer2_AxisLabel_1');
                expect(secondLabel.textContent).toEqual('26');
                expect(+firstLabel.getAttribute('y') < +secondLabel.getAttribute('y')).toBe(true);
                done();
            };
            chart.primaryXAxis = {valueType : 'Category', title: 'pyXAxis'};
            chart.loaded = loaded;
            chart.axisLabelRender = null;
            chart.axes = [{
                rowIndex: 0, opposedPosition: true,
                minimum: 24, maximum: 36, interval: 2, isInversed: true,
                name: 'yAxis',
                title: 'Temperature (Celsius)',
            }];
            chart.series = [
            {
                type: 'Line', animation : {enable : false}, dataSource: [{ x: 'Jan', y: 15 }],
                xName: 'x', yName: 'y', name: 'Germany', marker: { visible: true}
            },
            {
                type: 'Line', animation : {enable : false}, dataSource: [{ x: 'Jan', y: 33 }],
                xName: 'x', yName: 'y', yAxisName: 'yAxis', name: 'Japan', marker: { visible: true}
            }];
            chart.refresh();
        });
        it('checking with multiple panes', (done: Function) => {
            loaded = (args: Object) => {
                let firstLabel: HTMLElement = document.getElementById('chartContainer2_AxisLabel_0');
                expect(firstLabel.textContent).toEqual('24');
                let secondLabel: any = document.getElementById('chartContainer2_AxisLabel_1');
                expect(secondLabel.textContent).toEqual('26');
                expect(+firstLabel.getAttribute('y') < +secondLabel.getAttribute('y')).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.rows = [ { height: '50%'}, { height: '50%'}];
            chart.axes[0].rowIndex = 1;
            chart.refresh();
        });
    });
});