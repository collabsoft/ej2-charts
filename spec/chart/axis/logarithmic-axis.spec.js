define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/area-series", "../../../src/chart/series/column-series", "../../../src/chart/series/bar-series", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/axis/date-time-axis", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, area_series_1, column_series_1, bar_series_1, logarithmic_axis_1, date_time_axis_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, logarithmic_axis_1.Logarithmic, column_series_1.ColumnSeries, area_series_1.AreaSeries, bar_series_1.BarSeries, date_time_axis_1.DateTime);
    var data = data_spec_2.seriesData1;
    var datetime = data_spec_2.datetimeData;
    describe('Chart Control', function () {
        describe('Chart Logarithmic axis', function () {
            var chartObj;
            var elem;
            var svg;
            var text;
            var datalabel;
            var loaded;
            beforeAll(function () {
                elem = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis',
                        valueType: 'Logarithmic'
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    series: [{
                            dataSource: [
                                { y: 18, x: 1 }, { y: 29, x: 2 }, { y: 30, x: 3 }, { y: 41, x: 4 },
                                { y: 52, x: 5 }, { y: 62, x: 6 },
                                { y: 74, x: 7 }, { y: 85, x: 8 }, { y: 96, x: 9 }, { y: 102, x: 10 }
                            ], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                            name: 'ChartSeriesNameGold', fill: 'green',
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with labels for primaryXAxis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("containerAxisLabels0");
                    expect(svg.childNodes.length == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking with axis labels for primaryXAxis with logBase 2', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length === 5).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.logBase = 2;
                chartObj.primaryXAxis.interval = null;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking axis labels for primaryXAxis with range', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length === 6).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 1;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking axis labels for primaryXAxis', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text.textContent === "1").toBe(true);
                    text = document.getElementById("container0_AxisLabel_1");
                    expect(text.textContent === "10").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.logBase = 10;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking axis labels for primaryXAxis with minorGridLine', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("container_MinorGridLine_0");
                    expect(svg.getAttribute("stroke") == "#eaeaea").toBe(true);
                    expect(svg.getAttribute("stroke-width") == "2").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minorGridLines.width = 2;
                chartObj.primaryXAxis.minorTicksPerInterval = 3;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking axis labels for primaryXAxis with interval', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text.textContent == "1").toBe(true);
                    text = document.getElementById("container0_AxisLabel_1");
                    expect(text.textContent == "100").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 1;
                chartObj.primaryXAxis.interval = 2;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking axis labels for primary YAxis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("containerAxisLabels1");
                    expect(svg.childNodes.length == 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking axis labels for primary YAxis with logBase', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerAxisLabels1');
                    expect(svg.childNodes.length === 4).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.logBase = 2;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking axis labels for primary YAxis with range', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container1_AxisLabel_0");
                    expect(text.textContent == "1").toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text.textContent == "2").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = 1;
                chartObj.primaryYAxis.maximum = 260;
                chartObj.primaryYAxis.logBase = 2;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking axis labels for primary YAxis with label', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container1_AxisLabel_0");
                    expect(text.textContent == "1").toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text.textContent == "10").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.logBase = 10;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking axis labels for primary YAxis with minorGridLine', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("container_MinorGridLine_1");
                    expect(svg.getAttribute("stroke") == "#eaeaea").toBe(true);
                    expect(svg.getAttribute("stroke-width") == "2").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minorGridLines.width = 2;
                chartObj.primaryYAxis.minorTicksPerInterval = 3;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking axis labels for primary YAxis with interval', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container1_AxisLabel_0");
                    expect(text.textContent == "1").toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text.textContent == "4").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.interval = 2;
                chartObj.primaryYAxis.logBase = 2;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with bar Series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg.childElementCount - 1 == 10).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Bar';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with bar Series with datetime and logarithmic', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    var series1 = args.chart.series[0];
                    expect(series1.points[1].region.y === 269.6575147554806).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Bar';
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.series[0].dataSource = datetime;
                chartObj.primaryYAxis.interval = 1;
                chartObj.primaryYAxis.logBase = 10;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with Column Series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg.childElementCount - 1 == 10).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.primaryXAxis.minimum = 1;
                chartObj.primaryXAxis.interval = 2;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.primaryYAxis.interval = 2;
                chartObj.primaryYAxis.logBase = 2;
                chartObj.series[0].dataSource = [
                    { y: 18, x: 1 }, { y: 29, x: 2 }, { y: 30, x: 3 }, { y: 41, x: 4 },
                    { y: 52, x: 5 }, { y: 62, x: 6 },
                    { y: 74, x: 7 }, { y: 85, x: 8 }, { y: 96, x: 9 }, { y: 102, x: 10 }
                ];
                chartObj.series[0].type = 'Column';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with Area Series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Area';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with range', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text.textContent == "0.1").toBe(true);
                    text = document.getElementById("container0_AxisLabel_1");
                    expect(text.textContent == "10").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Line';
                chartObj.primaryXAxis.minimum = 0.2;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with large data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [
                    {
                        dataSource: [{ x: 1, y: 8 }, { x: 2, y: 10000 }, { x: 3, y: 400 }, { x: 4, y: 600 },
                            { x: 5, y: 900 }, { x: 6, y: 1400 }, { x: 7, y: 2000 }, { x: 8, y: 4000 },
                            { x: 9, y: 6000 }, { x: 10, y: 8000 }, { x: 10, y: 9000 }],
                        name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Line',
                        animation: { enable: false }
                    }
                ];
                chartObj.primaryXAxis.minorGridLines.width = 0;
                chartObj.primaryYAxis.minorGridLines.width = 0;
                chartObj.primaryXAxis.minorTickLines.width = 0;
                chartObj.primaryYAxis.minorTickLines.width = 0;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.logBase = 10;
                chartObj.primaryYAxis.minimum = 1;
                chartObj.primaryXAxis.interval = 1;
                chartObj.primaryXAxis.minimum = 1;
                chartObj.primaryYAxis.maximum = null;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with edgelabelplacement', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text === null).toBe(true);
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    text = document.getElementById('container1_AxisLabel_0');
                    expect(parseFloat(text.getAttribute('y')) === parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.interval = null;
                chartObj.primaryXAxis.edgeLabelPlacement = 'Hide';
                chartObj.primaryYAxis.edgeLabelPlacement = 'Shift';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with edgelabelplacement Hide', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    text = document.getElementById('container1_AxisLabel_0');
                    expect(text.textContent === '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.interval = null;
                chartObj.primaryYAxis.edgeLabelPlacement = 'Hide';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with labelFormat', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text.textContent === '$1.00').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.edgeLabelPlacement = 'None';
                chartObj.primaryYAxis.edgeLabelPlacement = 'None';
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.series[0].dataSource = data;
                chartObj.primaryXAxis.labelFormat = 'C';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking the zoomFactor and zoomPosition', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text !== null).toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelFormat = '';
                chartObj.primaryXAxis.zoomFactor = 0.5;
                chartObj.primaryXAxis.zoomPosition = 0.5;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking the enableAutoIntervalOnZooming false', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text !== null).toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.enableAutoIntervalOnZooming = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with multiple axes', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container2_AxisLabel_0');
                    expect(svg.textContent === '10@').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'red', type: 'Line',
                        animation: { enable: false }
                    },
                    {
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Line',
                        animation: { enable: false }
                    }];
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1', valueType: 'Logarithmic', labelFormat: '{value}@',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.series[0].yAxisName = 'yAxis1';
                chartObj.rows = [{ border: { width: 4, color: 'red' }, height: '300', },
                    { border: { width: 4, color: 'blue' } }];
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.enableAutoIntervalOnZooming = true;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking the Labels with empty data', function () {
                chartObj.series = [];
                chartObj.primaryXAxis.zoomFactor = 0.7;
                chartObj.primaryXAxis.zoomPosition = 0.2;
                chartObj.axisLabelRender = function (args) {
                    args.text = args.text + 'cus';
                };
                chartObj.loaded = null;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
                svg = document.getElementById('containerAxisLabels0');
                expect(svg.childNodes.length == 1).toBe(true);
                expect(svg.childNodes[0].textContent.indexOf('cus') > -1).toBe(true);
            });
        });
    });
});
