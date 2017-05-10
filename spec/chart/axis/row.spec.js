define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries);
    describe('Chart Control', function () {
        var ele;
        var loaded;
        describe('Row Definition', function () {
            var chartObj;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', minimum: 110, maximum: 150, interval: 10, rangePadding: 'None' },
                    axes: [{
                            rowIndex: 1, name: 'yAxis1', minimum: 20, maximum: 80, interval: 20, title: 'Axis2',
                            titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            animation: { enable: false }, dataSource: data_spec_1.definition1, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis1',
                            animation: { enable: false }, dataSource: data_spec_1.definition2, xName: 'x', yName: 'y'
                        }
                    ], height: '600', title: 'Chart TS Title',
                    rows: [{ height: '300', border: { width: 4, color: 'red' } },
                        { height: '300', border: { width: 4, color: 'blue' } }], legendSettings: { visible: false }
                });
                chartObj.appendTo('#chartContainer');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking Row Definition with pixel', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer_AxisBottom_Row0');
                    expect(svg.getAttribute('y1') == '540.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('chartContainer_AxisBottom_Row1');
                    expect(svg.getAttribute('y1') == '240.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking Row Definition with percentage', function (done) {
                chartObj.primaryYAxis.rowIndex = 1;
                chartObj.axes[0].rowIndex = 0;
                chartObj.width = '900';
                chartObj.rows[0].height = '50%';
                chartObj.rows[1].height = '50%';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer_AxisTitle_1');
                    expect(svg.getAttribute('y') == '156.5625').toBe(true);
                    svg = document.getElementById('chartContainer1_AxisLabel_0');
                    expect(svg.getAttribute('y') == '290.75').toBe(true);
                    expect(svg.getAttribute('x') == '52').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_2');
                    expect(svg.getAttribute('y') == '409.1875').toBe(true);
                    svg = document.getElementById('chartContainer2_AxisLabel_3');
                    expect(svg.getAttribute('y') == '290.75').toBe(true);
                    expect(svg.getAttribute('x') == '52').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
        });
        describe('Row Definition with spanning', function () {
            var chart;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    border: { width: 1, color: "black" }, primaryXAxis: { title: '' },
                    primaryYAxis: { title: 'Axis1', span: 2, rangePadding: 'None' }, title: '',
                    axes: [
                        {
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis2', majorGridLines: { width: 0 }, rowIndex: 1, minimum: 100, maximum: 160, interval: 20
                        },
                        {
                            title: 'Axis3', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis3', majorGridLines: { width: 0 }, rowIndex: 1, span: 2, minimum: 100, maximum: 160, interval: 20
                        },
                        {
                            title: 'Axis4', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis4', majorGridLines: { width: 0 }, rowIndex: 2, plotOffset: 10, minimum: 100, maximum: 160, interval: 10
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, dataSource: data_spec_1.definition3,
                            animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'pink', width: 2, yAxisName: 'yAxis2',
                            dataSource: data_spec_1.definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series3', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis3',
                            dataSource: data_spec_1.definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series4', type: 'Line', fill: 'blue', width: 2, yAxisName: 'yAxis4',
                            dataSource: data_spec_1.definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                    ],
                    rows: [
                        { height: '300' },
                        { height: '200' },
                        { height: '200' },
                    ], height: '700', width: '900', legendSettings: { visible: false }
                });
                chart.appendTo('#chartContainer');
                data_spec_2.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking the Spanning axis', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer1_AxisLabel_6');
                    expect(svg.getAttribute('y') == '166.75').toBe(true);
                    expect(svg.getAttribute('x') == '171').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_1');
                    expect(svg.getAttribute('y') == '408.5').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_2');
                    expect(svg.getAttribute('y') == '258.5').toBe(true);
                    expect(svg.getAttribute('x') == '92').toBe(true);
                    svg = document.getElementById('chartContainer2_AxisLabel_3');
                    expect(svg.getAttribute('y') == '166.75').toBe(true);
                    expect(svg.getAttribute('x') == '114.5').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_3');
                    expect(svg.getAttribute('y') == '181.875').toBe(true);
                    expect(svg.getAttribute('x') == '29.5').toBe(true);
                    svg = document.getElementById('chartContainer3_AxisLabel_3');
                    expect(svg.getAttribute('y') == '13.75').toBe(true);
                    expect(svg.getAttribute('x') == '52').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_4');
                    expect(svg.getAttribute('y') == '81.875').toBe(true);
                    expect(svg.getAttribute('x') == '148.5').toBe(true);
                    svg = document.getElementById('chartContainer4_AxisLabel_3');
                    expect(svg.getAttribute('y') == '89.75').toBe(true);
                    expect(svg.getAttribute('x') == '171').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking the Spanning axis with opposedPosition', function (done) {
                chart.primaryYAxis.opposedPosition = true;
                chart.axes = [{ opposedPosition: true }, { opposedPosition: true, span: 3 }, { opposedPosition: true }];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    done();
                };
                chart.loaded = loaded;
            });
        });
        describe('Checking Row Definition with opposedPosition', function () {
            var chartEle;
            ele = dom_1.createElement('div', { id: 'chartContainer' });
            beforeAll(function () {
                document.body.appendChild(ele);
                chartEle = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { opposedPosition: true, title: 'PrimaryYAxis', minimum: 110, maximum: 150, interval: 10, rangePadding: 'None' },
                    axes: [
                        {
                            rowIndex: 2,
                            opposedPosition: true,
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis1',
                            minimum: 20, maximum: 80, interval: 20,
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            animation: { enable: false }, dataSource: data_spec_1.definition1, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis1',
                            animation: { enable: false }, dataSource: data_spec_1.definition2, xName: 'x', yName: 'y'
                        },
                    ],
                    height: '600', title: 'Chart TS Title',
                    rows: [
                        {
                            height: '300', border: { width: 4, color: 'red' },
                        },
                        {
                            height: '300', border: { width: 4, color: 'blue' },
                        }
                    ], legendSettings: { visible: false }
                }, '#chartContainer');
                data_spec_2.unbindResizeEvents(chartEle);
            });
            afterAll(function () {
                chartEle.destroy();
                ele.remove();
            });
            it('Checking the bottom line with opposed position', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer_AxisBottom_Row0');
                    expect(svg.getAttribute('y2') == '540.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('chartContainer_AxisBottom_Row1');
                    expect(svg.getAttribute('y2') == '240.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartEle.loaded = loaded;
                data_spec_2.unbindResizeEvents(chartEle);
            });
        });
    });
});
