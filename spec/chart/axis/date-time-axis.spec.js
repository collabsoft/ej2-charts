define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/bar-series", "../base/data.spec", "../../../src/chart/axis/date-time-axis", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, bar_series_1, data_spec_1, date_time_axis_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, date_time_axis_1.DateTime, bar_series_1.BarSeries);
    describe('Chart Control', function () {
        describe('Datetime Axis', function () {
            var chart;
            var ele;
            var svg;
            var loaded;
            var loaded1;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Sales Across Years', intervalType: 'Years', valueType: 'DateTime',
                        minimum: new Date(2000, 6, 1), maximum: new Date(2010, 6, 1), interval: 1
                    },
                    primaryYAxis: { title: 'Sales Amount in millions(USD)', rangePadding: 'Additional' },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, animation: { enable: false },
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y'
                        },
                    ],
                    height: '600', width: '900', legendSettings: { visible: false }
                });
                chart.appendTo('#chartContainer');
                data_spec_2.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking year', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('chartContainerAxisLabels0');
                    expect(svg.childNodes.length == 11).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking month label', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('chartContainerAxisLabels0');
                    expect(svg.childNodes.length == 16).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis = {
                    intervalType: 'Auto', minimum: null, maximum: null,
                    rangePadding: 'Additional', valueType: 'DateTime'
                };
                chart.series = [{ dataSource: data_spec_1.datetimeData1, xName: 'x', yName: 'y', fill: '#ACE5FF', width: 2, animation: { enable: false } }];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking the Labels with empty data', function () {
                chart.series = [];
                chart.primaryXAxis.zoomFactor = 0.7;
                chart.primaryXAxis.zoomPosition = 0.2;
                chart.primaryXAxis.rangePadding = 'None';
                chart.primaryYAxis.rangePadding = 'Normal';
                chart.loaded = null;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                svg = document.getElementById('chartContainerAxisLabels0');
                expect(svg.childNodes.length == 8).toBe(true);
            });
            it('Checking Auto interval with hours', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('chartContainerAxisLabels0');
                    expect(svg.childNodes.length == 15).toBe(true);
                    expect(svg.childNodes[2].textContent == 'Fri 02:00').toBe(true);
                    done();
                };
                data_spec_2.unbindResizeEvents(chart);
                chart.primaryXAxis.rangePadding = 'Additional';
                chart.primaryXAxis.interval = null;
                chart.primaryXAxis.zoomFactor = 1;
                chart.primaryXAxis.zoomPosition = 0;
                chart.series = [{
                        fill: '#ACE5FF', width: 2, animation: { enable: false }, xName: 'x', yName: 'y',
                        dataSource: [{ x: new Date(2000, 3, 21), y: 10 }, { x: new Date(2000, 3, 22), y: 40 }]
                    }];
                data_spec_2.unbindResizeEvents(chart);
                chart.loaded = loaded;
                chart.height = '450';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking Auto interval with minutes', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainerAxisLabels0');
                    expect(svg.childNodes.length == 13).toBe(true);
                    expect(svg.childNodes[1].textContent == '03:05:00').toBe(true);
                    done();
                };
                chart.primaryXAxis.rangePadding = 'Round';
                chart.series[0].dataSource = [{ x: new Date(2000, 3, 21, 3), y: 50 }, { x: new Date(2000, 3, 21, 4), y: 10 }];
                chart.loaded = loaded;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking Auto interval with seconds', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainerAxisLabels0');
                    var content = svg.childNodes[2].textContent;
                    expect(svg.childNodes.length == 12).toBe(true);
                    expect(content == '03:02:20').toBe(true);
                    done();
                };
                chart.primaryXAxis.rangePadding = 'Additional';
                chart.series[0].dataSource = [{ x: new Date(2000, 3, 21, 3, 2), y: 10 }, { x: new Date(2000, 3, 21, 3, 5), y: 45 }];
                chart.loaded = loaded;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking interval type with Months', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('chartContainerAxisLabels0').childNodes[2].textContent == 'Tue, May 1').toBe(true);
                    done();
                };
                chart.series = [];
                chart.primaryXAxis.intervalType = 'Months';
                chart.primaryXAxis.minimum = new Date(2000, 6, 1);
                chart.primaryXAxis.maximum = new Date(2005, 7, 1);
                chart.loaded = loaded;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking interval type with Days', function () {
                chart.primaryXAxis.intervalType = 'Days';
                chart.primaryXAxis.minimum = new Date(2000, 6, 1);
                chart.primaryXAxis.maximum = new Date(2000, 9, 1);
                chart.loaded = null;
                chart.dataBind();
                data_spec_2.unbindResizeEvents(chart);
                expect(document.getElementById('chartContainerAxisLabels0').childNodes[2].textContent == '21 Fri').toBe(true);
            });
            it('Checking interval type with Hours', function () {
                chart.primaryXAxis.intervalType = 'Hours';
                chart.primaryXAxis.minimum = new Date(2000, 6, 1, 3);
                chart.primaryXAxis.maximum = new Date(2000, 7, 1);
                chart.dataBind();
                expect(document.getElementById('chartContainerAxisLabels0').childNodes[2].textContent == 'Sun 11:00').toBe(true);
            });
            it('Checking interval type with minutes', function () {
                chart.primaryXAxis.intervalType = 'Minutes';
                chart.primaryXAxis.minimum = new Date(2000, 6, 1, 4);
                chart.primaryXAxis.maximum = new Date(2000, 6, 1, 6);
                chart.dataBind();
                expect(document.getElementById('chartContainerAxisLabels0').childNodes[2].textContent == '04:20:00').toBe(true);
            });
            it('Checking interval type with seconds', function () {
                chart.primaryXAxis.intervalType = 'Seconds';
                chart.primaryXAxis.minimum = new Date(2000, 6, 1, 1);
                chart.primaryXAxis.maximum = new Date(2000, 6, 1, 2);
                chart.dataBind();
                expect(document.getElementById('chartContainerAxisLabels0').childNodes[2].textContent == '01:16:40').toBe(true);
            });
            it('Checking with years and its Additional rangePadding', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('chartContainerAxisLabels0').childNodes[0].textContent == 'Feb 1999').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.labelFormat = '';
                chart.primaryXAxis.zoomFactor = 1;
                chart.primaryXAxis.zoomPosition = 0;
                chart.primaryXAxis.minimum = null;
                chart.primaryXAxis.maximum = null;
                chart.primaryXAxis.interval = null;
                chart.primaryXAxis.intervalType = 'Years';
                chart.primaryXAxis.rangePadding = 'Additional';
                chart.series = [{
                        fill: '#ACE5FF', width: 2, animation: { enable: false }, xName: 'x', yName: 'y',
                        dataSource: [{ x: new Date(2000, 3, 21), y: 14 }, { x: new Date(2010, 3, 21), y: 45 }]
                    }];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with years and its Round rangePadding', function (done) {
                loaded1 = function (args) {
                    expect(document.getElementById('chartContainerAxisLabels0').childNodes[0].textContent == 'Dec 1999').toBe(true);
                    done();
                };
                chart.loaded = loaded1;
                chart.primaryXAxis.rangePadding = 'Round';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with Months and its rangePadding', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('chartContainerAxisLabels0').childNodes[0].textContent == 'Wed, Mar 1').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Months';
                chart.primaryXAxis.rangePadding = 'Additional';
                chart.series = [{
                        fill: '#ACE5FF', width: 2, animation: { enable: false }, xName: 'x', yName: 'y',
                        dataSource: [{ x: new Date(2000, 3, 21), y: 14 }, { x: new Date(2002, 3, 21), y: 45 }]
                    }];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with Months and its Round rangePadding', function (done) {
                loaded1 = function (args) {
                    expect(document.getElementById('chartContainerAxisLabels0').childNodes[0].textContent == 'Fri, Mar 31').toBe(true);
                    done();
                };
                chart.loaded = loaded1;
                chart.primaryXAxis.rangePadding = 'Round';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with Days and its rangePadding', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('chartContainerAxisLabels0').childNodes[0].textContent == '20 Sun').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Days';
                chart.primaryXAxis.rangePadding = 'Additional';
                chart.series = [{
                        fill: '#ACE5FF', width: 2, animation: { enable: false }, xName: 'x', yName: 'y',
                        dataSource: [{ x: new Date(2000, 7, 21), y: 14 }, { x: new Date(2000, 9, 21), y: 45 }]
                    }];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with Days and its Round rangePadding', function (done) {
                loaded1 = function (args) {
                    expect(document.getElementById('chartContainerAxisLabels0').childNodes[0].textContent == '25 Fricus').toBe(true);
                    done();
                };
                chart.loaded = loaded1;
                chart.primaryXAxis.rangePadding = 'Round';
                chart.axisLabelRender = function (args) {
                    args.text = args.text + 'cus';
                };
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with edgelabelplacement and labelintersect action', function (done) {
                loaded1 = function (args) {
                    svg = document.getElementById('chartContainer0_AxisLabel_0');
                    expect(svg === null);
                    done();
                };
                chart.loaded = loaded1;
                chart.primaryXAxis.edgeLabelPlacement = 'Hide';
                chart.primaryXAxis.labelIntersectAction = 'Rotate90';
                chart.primaryXAxis.intervalType = 'Months';
                chart.width = '700';
                chart.dataBind();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with Bar series', function (done) {
                loaded1 = function (args) {
                    svg = document.getElementById('chartContainerAxisLabels0');
                    expect(svg.childNodes.length === 1);
                    done();
                };
                chart.series[0].type = 'Bar';
                chart.primaryYAxis.rangePadding = 'Auto';
                chart.primaryXAxis.rangePadding = 'Auto';
                chart.primaryXAxis.zoomFactor = 0.7;
                chart.primaryXAxis.enableAutoIntervalOnZooming = false;
                chart.primaryXAxis.labelFormat = 'yMMM';
                chart.loaded = loaded1;
                chart.axisLabelRender = null;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with Bar series with datetime single point', function (done) {
                loaded1 = function (args) {
                    var series = args.chart.series[0];
                    expect(series.points[0].symbolLocation.y === 190.125).toBe(true);
                    done();
                };
                chart.series[0].type = 'Bar';
                chart.primaryYAxis.rangePadding = 'Auto';
                chart.primaryXAxis.rangePadding = 'Auto';
                chart.primaryXAxis.zoomFactor = 1;
                chart.series[0].dataSource = [{ x: new Date(2016, 0, 1), y: 20 }];
                chart.primaryXAxis.enableAutoIntervalOnZooming = true;
                chart.primaryXAxis.labelFormat = 'yMMM';
                chart.loaded = loaded1;
                chart.axisLabelRender = null;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with Line series with labelrotation -45 degree', function (done) {
                loaded1 = function (args) {
                    svg = document.getElementById('chartContainer_AxisTitle_0');
                    var axis = document.getElementById('chartContainer0_AxisLabel_3');
                    expect(parseFloat(svg.getAttribute('y')) > parseFloat(axis.getAttribute('y'))).toBe(true);
                    done();
                };
                chart.series[0].type = 'Line';
                chart.series[0].dataSource = null;
                chart.series[0].dataSource = data_spec_1.datetimeData;
                chart.primaryXAxis.labelRotation = -45;
                chart.loaded = loaded1;
                chart.axisLabelRender = null;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with edgelabelplacement and labelrotation', function (done) {
                loaded1 = function (args) {
                    svg = document.getElementById('chartContainer_ChartAreaBorder');
                    var axis = document.getElementById('chartContainer0_AxisLabel_3');
                    expect(parseFloat(svg.getAttribute('y')) + parseFloat(svg.getAttribute('height')) < parseFloat(axis.getAttribute('y'))).toBe(true);
                    done();
                };
                chart.primaryXAxis.edgeLabelPlacement = 'Shift';
                chart.loaded = loaded1;
                chart.axisLabelRender = null;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with minorGridLines and minorTickLines', function (done) {
                loaded1 = function (args) {
                    svg = document.getElementById('chartContainer_MinorGridLine_0');
                    var axis = document.getElementById('chartContainer_MajorTickLine_0');
                    expect(svg !== null).toBe(true);
                    expect(axis !== null).toBe(true);
                    done();
                };
                chart.primaryXAxis.edgeLabelPlacement = 'Shift';
                chart.primaryXAxis.labelRotation = 0;
                chart.primaryXAxis.minorTicksPerInterval = 3;
                chart.loaded = loaded1;
                chart.axisLabelRender = null;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with labelIntersectAction with edgeLabelPlacement', function (done) {
                loaded1 = function (args) {
                    var axisLabelFirst = document.getElementById('chartContainer0_AxisLabel_0');
                    var axisLabelLast = document.getElementById('chartContainer0_AxisLabel_11');
                    expect(axisLabelFirst.getAttribute('transform').indexOf('rotate(45') > -1).toBe(true);
                    expect(axisLabelLast.getAttribute('transform').indexOf('rotate(45') > -1).toBe(true);
                    done();
                };
                chart.primaryXAxis.edgeLabelPlacement = 'Shift';
                chart.primaryXAxis.labelIntersectAction = 'Rotate45';
                chart.primaryXAxis.interval = 7;
                chart.primaryXAxis.minorTicksPerInterval = 0;
                chart.loaded = loaded1;
                chart.axisLabelRender = null;
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
        });
    });
});
