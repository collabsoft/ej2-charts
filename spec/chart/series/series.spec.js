define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/series/line-series", "../../../src/chart/series/marker", "../../../src/chart/chart", "@syncfusion/ej2-data", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, line_series_1, marker_1, chart_1, ej2_data_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker);
    describe('Chart Control', function () {
        var ele;
        var svg;
        var loaded;
        var dataManager = new ej2_data_1.DataManager({
            url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
        });
        var query = new ej2_data_1.Query().take(50).where('Estimate', 'greaterThan', 0, false);
        describe('series in chart', function () {
            var chart;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    border: { width: 1, color: 'red' },
                    primaryXAxis: {
                        title: 'PrimaryXAxis', lineStyle: { color: 'blue', width: 2 },
                        minorTicksPerInterval: 4, minorGridLines: { width: 0 }, minorTickLines: { width: 1 }
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', lineStyle: { color: 'blue', width: 2 } },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 3,
                            dataSource: data_spec_1.seriesData1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: '#F6B53F', width: 2,
                            dataSource: data_spec_1.seriesData2, animation: { enable: false }, xName: 'x', yName: 'y'
                        }
                    ],
                    height: '600', legendSettings: { visible: false }
                }, '#container');
                data_spec_2.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking with Line series with data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') == '#ACE5FF').toBe(true);
                    expect(svg.getAttribute('stroke-width') == '3').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('stroke') == '#F6B53F').toBe(true);
                    expect(svg.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chart.loaded = loaded;
            });
            it('Checking with Pie series with dataSource', function (done) {
                chart.series[0].type = 'Pie';
                chart.series[1].type = 'Line';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    var length = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(length == 1).toBe(true);
                    done();
                };
                chart.loaded = loaded;
            });
            it('Checking with Polar series with dataSource', function (done) {
                chart.series[0].type = 'Polar';
                chart.series[1].type = 'Line';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    svg = document.getElementById('containerAxisGroup1');
                    expect(svg == null || svg == undefined).toBe(true);
                    chart.getPersistData();
                    done();
                };
                chart.loaded = loaded;
            });
        });
        describe('Checking with Line and Bar Combination', function () {
            var chartObj;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new chart_1.Chart({
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, animation: { enable: false },
                            dataSource: [{ x: 10, y: 30 }, { x: 20, y: 40 }, { x: 30, y: 20 }, { x: 40, y: 15 }, { x: 50, y: 45 }],
                            xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series1', type: 'Bar', fill: 'red', width: 2, animation: { enable: false },
                            dataSource: [{ x: 10, y: 30 }, { x: 20, y: 40 }, { x: 30, y: 20 }, { x: 40, y: 15 }, { x: 50, y: 45 }],
                            xName: 'x', yName: 'y'
                        }
                    ], legendSettings: { visible: false }
                }, '#container');
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking with Line series with points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesCollection');
                    expect(svg.childNodes.length == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
        });
        describe('Line series with remote dataSource', function () {
            var chartEle1;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartEle1 = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            dataSource: dataManager, xName: 'Id', yName: 'Estimate', query: query
                        },
                    ],
                    height: '600', legendSettings: { visible: false }
                });
                chartEle1.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartEle1);
            });
            afterAll(function () {
                chartEle1.destroy();
                ele.remove();
            });
            it('Checking the series', function (done) {
                loaded = function (args) {
                    var text = document.getElementById('container0_AxisLabel_0');
                    expect(text.textContent != null).toBe(true);
                    done();
                };
                chartEle1.loaded = loaded;
            });
        });
        describe('Multiple series with dataSource', function () {
            var chartEle;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                var query = new ej2_data_1.Query().take(5);
                chartEle = new chart_1.Chart({
                    series: [
                        {
                            name: 'dataSource', type: 'Line', fill: 'yellow', width: 2,
                            dataSource: data_spec_1.data, xName: 'EmployeeID', yName: 'Freight', query: query, animation: { enable: true }
                        },
                        {
                            name: 'data', type: 'Line', fill: 'red', width: 2,
                            dataSource: [{ x: 1, y: 30 }, { x: 5, y: 40 }, { x: 7, y: 20 }, { x: 9, y: 15 }, { x: 11, y: 45 }],
                            xName: 'x', yName: 'y', animation: { enable: true, delay: 300 }
                        },
                    ], legendSettings: { visible: false }
                });
                chartEle.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartEle);
            });
            afterAll(function () {
                chartEle.destroy();
                ele.remove();
            });
            it('Checking the series data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') == 'yellow').toBe(true);
                    expect(svg.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chartEle.loaded = loaded;
            });
        });
        describe('marker in line chart', function () {
            var chartObj;
            var ele;
            var marker;
            var loaded;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new chart_1.Chart({
                    border: { width: 1, color: 'red' },
                    primaryXAxis: {
                        title: 'PrimaryXAxis', lineStyle: { color: 'blue', width: 2 },
                        minorTicksPerInterval: 4, minorGridLines: { width: 0 }, minorTickLines: { width: 1 }
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', lineStyle: { color: 'blue', width: 2 } },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: 'red',
                            dataSource: data_spec_1.seriesData1, animation: { enable: false }, xName: 'x', yName: 'y',
                            marker: {
                                visible: true,
                                shape: 'Circle',
                                fill: 'black', height: 10, width: 10
                            }
                        },
                    ],
                    height: '400', width: '600', legendSettings: { visible: false }
                }, '#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking with marker shape Circle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('checking with marker shape diamond', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape HorizontalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'HorizontalLine';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape InvertedTriangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'InvertedTriangle';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Pentagon', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_4_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Triangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Triangle';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape rectangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(marker.getAttribute('fill') === chartObj.series[0].fill).toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.series[0].marker.fill = null;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape verticalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'brown').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'VerticalLine';
                chartObj.series[0].marker.fill = 'brown';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape verticalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'brown').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Cross';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with null point', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker === null).toBe(true);
                    marker = document.getElementById('container_Series_0_Point_5_Symbol');
                    expect(marker.getAttribute('fill') === 'pink').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.pointRender = function (argsData) {
                    argsData.fill = 'pink';
                    if (argsData.point.index == 6) {
                        argsData.cancel = true;
                    }
                };
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].marker.shape = 'Cross';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with animation', function (done) {
                var animate;
                animate = function (args) {
                    var pathLength = args.series.pathElement.getTotalLength();
                    expect(pathLength >= 400).toBe(true);
                    done();
                };
                chartObj.series[0].animation = { enable: true, delay: 1000 };
                chartObj.animationComplete = animate;
                chartObj.series[0].dashArray = '2';
                chartObj.refresh();
            });
            it('checking single point with negative data', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container1_AxisLabel_0');
                    expect(marker.textContent == '-63.2').toBe(true);
                    marker = document.getElementById('container1_AxisLabel_35');
                    expect(marker.textContent == '-56.200').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ 'x': 1, 'y': -60 }];
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
    });
});
