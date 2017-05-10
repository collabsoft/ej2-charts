define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries);
    describe('Chart Control', function () {
        var ele;
        var svg;
        var loaded;
        describe('Checking Column Definition', function () {
            var chartObj;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    axes: [
                        {
                            columnIndex: 1, name: 'yAxis1', title: 'Axis2', rangePadding: 'None',
                            titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            dataSource: data_spec_1.definition5, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, xAxisName: 'yAxis1',
                            dataSource: data_spec_1.definition6, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                    ],
                    height: '600', width: '900', title: 'Chart TS Title',
                    columns: [
                        {
                            width: '400', border: { width: 4, color: 'red' }
                        },
                        {
                            width: '400', border: { width: 4, color: 'blue' }
                        }
                    ], legendSettings: { visible: false }
                }, '#chartContainer');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking the bottom line', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('chartContainer_AxisBottom_Column0');
                    expect(svg.getAttribute('x1') == '56.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('chartContainer_AxisBottom_Column1');
                    expect(svg.getAttribute('x1') == '456.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking column Definition with percentage', function (done) {
                chartObj.primaryXAxis.columnIndex = 1;
                chartObj.axes[0].columnIndex = 0;
                chartObj.columns[0].width = '50%';
                chartObj.columns[1].width = '50%';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
                loaded = function (args) {
                    svg = document.getElementById('chartContainer_AxisTitle_1');
                    expect(svg.getAttribute('y') == '282.875').toBe(true);
                    svg = document.getElementById('chartContainer1_AxisLabel_0');
                    expect(svg.getAttribute('y') == '543.75').toBe(true);
                    expect(svg.getAttribute('x') == '46').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_2');
                    expect(svg.getAttribute('y') == '584.75').toBe(true);
                    svg = document.getElementById('chartContainer2_AxisLabel_3');
                    expect(svg.getAttribute('y') == '562.25').toBe(true);
                    expect(svg.getAttribute('x') == '363.0625').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_0');
                    expect(svg.getAttribute('y') == '584.75').toBe(true);
                    expect(svg.getAttribute('x') == '681.625').toBe(true);
                    svg = document.getElementById('chartContainer0_AxisLabel_2');
                    expect(svg.getAttribute('y') == '562.25').toBe(true);
                    expect(svg.getAttribute('x') == '675.625').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_2');
                    expect(svg.getAttribute('y') == '584.75').toBe(true);
                    expect(svg.getAttribute('x') == '264.875').toBe(true);
                    svg = document.getElementById('chartContainer2_AxisLabel_4');
                    expect(svg.getAttribute('y') == '562.25').toBe(true);
                    expect(svg.getAttribute('x') == '467.25').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Checking Column Definition with Spanning', function () {
            var chartElem;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chartElem = new chart_1.Chart({
                    border: { width: 1, color: 'black' },
                    primaryXAxis: { title: '', span: 2 },
                    primaryYAxis: { title: 'Axis1', rangePadding: 'None' },
                    title: '',
                    axes: [
                        {
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis2', majorGridLines: { width: 0 }, columnIndex: 1, rangePadding: 'None'
                        },
                        {
                            title: 'Axis3', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis3', majorGridLines: { width: 0 }, columnIndex: 1, span: 2, rangePadding: 'None'
                        },
                        {
                            title: 'Axis4', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis4', majorGridLines: { width: 0 }, columnIndex: 2, plotOffset: 10, rangePadding: 'None'
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            dataSource: data_spec_1.definition3, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'pink', width: 2, xAxisName: 'yAxis2',
                            dataSource: data_spec_1.definition1, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                        {
                            name: 'series3', type: 'Line', fill: 'red', width: 2, xAxisName: 'yAxis3',
                            dataSource: data_spec_1.definition4, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                        {
                            name: 'series4', type: 'Line', fill: 'blue', width: 2, xAxisName: 'yAxis4',
                            dataSource: data_spec_1.definition1, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                    ],
                    columns: [
                        { width: '300' },
                        { width: '300' },
                        { width: '300' },
                    ], height: '600', width: '900', legendSettings: { visible: false }
                }, '#chartContainer');
                data_spec_2.unbindResizeEvents(chartElem);
            });
            afterAll(function () {
                chartElem.destroy();
                ele.remove();
            });
            it('Axis Spanning', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('chartContainer_AxisTitle_2');
                    expect(svg.getAttribute('y') == '524.25').toBe(true);
                    expect(svg.getAttribute('x') == '512.5').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_3');
                    expect(svg.getAttribute('y') == '583.75').toBe(true);
                    expect(svg.getAttribute('x') == '625.75').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_4');
                    expect(svg.getAttribute('y') == '488.75').toBe(true);
                    expect(svg.getAttribute('x') == '775.75').toBe(true);
                    done();
                };
                data_spec_2.unbindResizeEvents(chartElem);
                chartElem.loaded = loaded;
            });
            it('Checking the Spanning axis with opposedPosition', function (done) {
                chartElem.primaryXAxis.opposedPosition = true;
                chartElem.axes = [{ opposedPosition: true }, { opposedPosition: true, span: 3 }, { opposedPosition: true }];
                chartElem.refresh();
                data_spec_2.unbindResizeEvents(chartElem);
                loaded = function (args) {
                    done();
                };
                data_spec_2.unbindResizeEvents(chartElem);
                chartElem.loaded = loaded;
            });
        });
        describe('Checking Column Definition with oppossed position', function () {
            var chart;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', opposedPosition: true },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    axes: [
                        {
                            columnIndex: 2, opposedPosition: true, name: 'yAxis1', rangePadding: 'None',
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            dataSource: data_spec_1.definition5, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, xAxisName: 'yAxis1',
                            dataSource: data_spec_1.definition6, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                    ], height: '600', width: '900', title: 'Chart TS Title',
                    columns: [
                        {
                            width: '400', border: { width: 4, color: 'red' }
                        },
                        {
                            width: '400', border: { width: 4, color: 'blue' }
                        }
                    ], legendSettings: { visible: false }
                }, '#chartContainer');
                data_spec_2.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking the bottom line with opposed position', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('chartContainer_AxisBottom_Column0');
                    expect(svg.getAttribute('x2') == '56.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('chartContainer_AxisBottom_Column1');
                    expect(svg.getAttribute('x2') == '456.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
            });
        });
    });
});
