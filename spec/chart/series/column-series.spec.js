define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/series/column-series", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, data_label_1, category_axis_1, date_time_axis_1, column_series_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, data_label_1.DataLabel, category_axis_1.Category, date_time_axis_1.DateTime);
    describe('Column Series', function () {
        var element;
        describe('Column Series', function () {
            var chartObj;
            var loaded;
            element = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false }, name: 'ChartSeriesNameGold',
                            type: 'Column', fill: 'rgba(135,206,235,1)',
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Default Series Type without data Points', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svg == 1).toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Added data Source', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 1,
                        y: 10
                    }];
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('With single data point', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 3).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 5).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 2;
                chartObj.primaryXAxis.interval = 1;
                chartObj.primaryYAxis.minimum = 8;
                chartObj.primaryYAxis.maximum = 12;
                chartObj.primaryYAxis.interval = 1;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking series visibility', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 1).toBe(true);
                    chartObj.primaryYAxis.minimum = null;
                    chartObj.primaryYAxis.maximum = null;
                    chartObj.primaryYAxis.interval = null;
                    chartObj.primaryXAxis.minimum = null;
                    chartObj.primaryXAxis.maximum = null;
                    chartObj.primaryXAxis.interval = null;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = false;
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.primaryYAxis.interval = null;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with data source', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = data_spec_1.tooltipData1;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with range', function (done) {
                loaded = function (args) {
                    chartObj.primaryXAxis.minimum = null;
                    chartObj.primaryXAxis.maximum = null;
                    chartObj.primaryXAxis.interval = null;
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var path = seriesElements.getAttribute('d');
                    expect((path.match(/M/g) || []).length == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 10000;
                chartObj.primaryXAxis.interval = 1000;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with dateTimeRange', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var stroke = seriesElements.getAttribute('stroke-width');
                    expect(stroke == '0').toBe(true);
                    var labelElement = document.getElementById('container0_AxisLabel_3');
                    expect(labelElement.textContent == 'Jul 2003').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                ];
                chartObj.series[0].width = 2;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryXAxis.labelFormat = null;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with dash array', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var stroke = seriesElements.getAttribute('stroke-dasharray');
                    expect(stroke == '4,3').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = '4,3';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with empty point(y Value)', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    expect(seriesElements == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                var dataSource = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
                    { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
                    { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }
                ];
                dataSource[3].y = null;
                chartObj.series[0].dataSource = dataSource;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with empty point(x Value)', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    expect(seriesElements == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                var dataSource = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
                    { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
                    { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }
                ];
                dataSource[3].y = 10;
                dataSource[3].x = null;
                chartObj.series[0].dataSource = dataSource;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with empty point(x and y Value)', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var seriesElements1 = document.getElementById('container_Series_0_Point_5');
                    expect(seriesElements == null).toBe(true);
                    expect(seriesElements1 == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                var dataSource = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
                    { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
                    { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }];
                dataSource[3].y = null;
                dataSource[3].x = null;
                dataSource[5].y = null;
                dataSource[5].x = null;
                chartObj.series[0].dataSource = dataSource;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with fill and stroke', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    expect(seriesElements.getAttribute('stroke') == 'green').toBe(true);
                    expect(seriesElements.getAttribute('stroke') != 'red').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') != '10').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.tooltipData1;
                chartObj.series[0].dashArray = null;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].width = 10;
                chartObj.series[0].border.width = 4;
                chartObj.series[0].opacity = 0.6;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking with border', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_1');
                    var path = svg.getAttribute('d');
                    var count = path.indexOf('Z');
                    expect(count !== -1).toBe(true);
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].border.color = 'red';
                chartObj.series[0].border.width = 4;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('within xAxis range', function (done) {
                loaded = function (args) {
                    var svgLength = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svgLength == 5).toBe(true);
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryXAxis.minimum = 4500;
                chartObj.primaryXAxis.maximum = 6500;
                chartObj.primaryXAxis.interval = 500;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Column Series with negative', function () {
            var chartObj;
            var loaded;
            var animationCOmplete;
            element = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false }, name: 'ChartSeriesNameGold',
                            dataSource: [{ x: new Date(2000, 6, -11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                                { x: new Date(2004, 3, 6), y: -15 }, { x: new Date(2006, 3, 30), y: 65 },
                                { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                            ], xName: 'x', yName: 'y',
                            type: 'Column', fill: 'rgba(135,206,235,1)',
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Default Series Type with negative points', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var seriesElements1 = document.getElementById('container_Series_0_Point_5');
                    expect(seriesElements != null).toBe(true);
                    expect(seriesElements1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking animation', function (done) {
                animationCOmplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.animationComplete = animationCOmplete;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('DataLabel', function () {
            var chartObj;
            var loaded;
            element = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'DateTime' },
                    primaryYAxis: { rangePadding: 'None' },
                    series: [{
                            animation: { enable: false },
                            dataSource: [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                                { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                                { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }], xName: 'x', yName: 'y', name: 'India',
                            fill: '#E94649', type: 'Column', marker: { visible: false, dataLabel: { visible: false } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('Showing default marker', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text');
                    expect(element.textContent == '65').toBe(true);
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Showing default marker shape', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text');
                    expect(element.textContent == '65').toBe(true);
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 6).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = '#E94649';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking visibility', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text');
                    expect(element == null).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.visible = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with marker visibility', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text');
                    expect(element != null).toBe(true);
                    var marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    var label = document.getElementById('container_Series_0_Point_3_Text');
                    expect(marker == null).toBe(true);
                    done();
                };
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('with marker size without marker visibility', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking edge dataLabel', function (done) {
                var marker = document.getElementById('container_Series_0_Point_5_Text');
                var location = (+marker.getAttribute('x')) + (+marker.getAttribute('width'));
                var clipRectWidth = 757.5;
                expect(location < clipRectWidth).toBe(true);
                marker = document.getElementById('container_Series_0_Point_0_Text');
                expect(+marker.getAttribute('x') > 0).toBe(true);
                done();
            });
            it('Checking auto position', function (done) {
                var point0 = +document.getElementById('container_Series_0_Point_0_Text').getAttribute('y');
                var point1 = +document.getElementById('container_Series_0_Point_1_Text').getAttribute('y');
                var point2 = +document.getElementById('container_Series_0_Point_2_Text').getAttribute('y');
                var point3 = +document.getElementById('container_Series_0_Point_3_Text').getAttribute('y');
                var point4 = +document.getElementById('container_Series_0_Point_4_Text').getAttribute('y');
                var point5 = +document.getElementById('container_Series_0_Point_5_Text').getAttribute('y');
                var point0Location = chartObj.series[0].points[0].symbolLocation.y;
                var point1Location = chartObj.series[0].points[1].symbolLocation.y;
                var point2Location = chartObj.series[0].points[2].symbolLocation.y;
                var point3Location = chartObj.series[0].points[3].symbolLocation.y;
                var point4Location = chartObj.series[0].points[4].symbolLocation.y;
                var point5Location = chartObj.series[0].points[5].symbolLocation.y;
                expect(point0 < point0Location).toBe(true);
                expect(point1 < point1Location).toBe(true);
                expect(point2 < point2Location).toBe(true);
                expect(point3 < point3Location).toBe(true);
                expect(point4 > point4Location).toBe(true);
                expect(point5 > point5Location).toBe(true);
                done();
            });
            it('Added another series', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.series = [chartObj.series[0], {
                        name: 'series1', type: 'Column', fill: '#ACE5FF', width: 3,
                        animation: { enable: false },
                        dataSource: [
                            { x: new Date(2000, 6, 11), y: 45 },
                            { x: new Date(2002, 3, 7), y: 40 },
                            { x: new Date(2004, 3, 6), y: 45 },
                            { x: new Date(2006, 3, 30), y: 40 },
                            { x: new Date(2008, 3, 8), y: 45 },
                            { x: new Date(2010, 3, 8), y: 20 }
                        ],
                        xName: 'x', yName: 'y',
                        marker: { dataLabel: { visible: true } }
                    }];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking default data label position with multiple series', function (done) {
                loaded = function (args) {
                    var point0 = +document.getElementById('container_Series_1_Point_0_Text').getAttribute('y');
                    var point1 = +document.getElementById('container_Series_1_Point_1_Text').getAttribute('y');
                    var point2 = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    var point3 = +document.getElementById('container_Series_1_Point_3_Text').getAttribute('y');
                    var point4 = +document.getElementById('container_Series_1_Point_4_Text').getAttribute('y');
                    var point5 = +document.getElementById('container_Series_1_Point_5_Text').getAttribute('y');
                    var point0Location = chartObj.series[1].points[0].symbolLocation.y;
                    var point1Location = chartObj.series[1].points[1].symbolLocation.y;
                    var point2Location = chartObj.series[1].points[2].symbolLocation.y;
                    var point3Location = chartObj.series[1].points[3].symbolLocation.y;
                    var point4Location = chartObj.series[1].points[4].symbolLocation.y;
                    var point5Location = chartObj.series[1].points[5].symbolLocation.y;
                    expect(point0 < point0Location).toBe(true);
                    expect(point1 < point1Location).toBe(true);
                    expect(point2 < point2Location).toBe(true);
                    expect(point3 < point3Location).toBe(true);
                    expect(point4 < point4Location).toBe(true);
                    expect(point5 < point5Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking data label shape without fill', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_1_Point_2_TextShape');
                    expect(marker.getAttribute('stroke') == 'grey').toBe(true);
                    expect(marker.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.border.width = 2;
                chartObj.series[1].marker.dataLabel.border.color = 'grey';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking font color saturation - background black', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_1_Point_3_Text');
                    expect(marker.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartArea.background = 'black';
                chartObj.chartArea.border = {
                    color: ''
                };
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking font color saturation - background white', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_1_Point_3_Text');
                    expect(marker.getAttribute('fill') == 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartArea.background = 'white';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking dataLabel positions Default', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    var hiddenText = document.getElementById('container_Series_1_Point_1_Text');
                    expect(hiddenText != null).toBe(true);
                    expect(hiddenShape != null).toBe(true);
                    var element = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    expect(chartObj.series[1].points[2].symbolLocation.y < element).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking dataLabel positions Top', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    expect(chartObj.series[1].points[2].symbolLocation.y < element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking dataLabel positions Middle', function (done) {
                loaded = function (args) {
                    var element = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    var locationY = chartObj.series[1].points[2].symbolLocation.y;
                    var height = document.getElementById('container_Series_1_Point_2_Text').getBoundingClientRect().height;
                    expect(locationY != element).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking dataLabel positions Outer', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    expect(chartObj.series[1].points[2].symbolLocation.y > element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking font color saturation with font color', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Text');
                    expect(marker.getAttribute('fill') == 'green').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.font.color = 'green';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label format with globalize format', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Text');
                    expect(marker.textContent == '65.00').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.labelFormat = 'n2';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment with position auto - near alignment', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                    expect(svg > chartObj.series[0].points[4].symbolLocation.y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment with position auto - far alignment', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                    expect(svg > chartObj.series[0].points[4].symbolLocation.y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position - bottom Position alignment near', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position - bottom Position alignment far', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape != null).toBe(true);
                    var elementY = document.getElementById('container_Series_1_Point_2_TextShape');
                    expect(elementY != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position - bottom Position alignment center', function (done) {
                loaded = function (args) {
                    var xLocation = +document.getElementById('container_Series_1_Point_5_TextShape').getAttribute('x');
                    var width = +document.getElementById('container_ChartAreaBorder').getAttribute('width');
                    expect(xLocation > width).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position - Outer Position  - alignment near', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape != null).toBe(true);
                    var elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementYLocation > (symbolLocation)).toBe(true);
                    elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementYLocation > (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position - Outer Position  - alignment far', function (done) {
                loaded = function (args) {
                    var xLocation = +document.getElementById('container_Series_1_Point_5_TextShape').getAttribute('x');
                    var width = +document.getElementById('container_ChartAreaBorder').getAttribute('width');
                    expect(xLocation > width).toBe(true);
                    var elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementYLocation < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position - Outer Position - alignment center', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape != null).toBe(true);
                    var elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementYLocation < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position - Top Position', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape != null).toBe(true);
                    var elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementYLocation > (symbolLocation)).toBe(true);
                    elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    var elementHeight = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('height');
                    expect(elementYLocation != (symbolLocation - elementHeight - 5)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking margin', function (done) {
                loaded = function (args) {
                    var shape = document.getElementById('container_Series_0_Point_2_TextShape');
                    var shapeY = +shape.getAttribute('y');
                    var shapeX = +shape.getAttribute('x');
                    var shapeWidth = +shape.getAttribute('width');
                    var shapeHeight = +shape.getAttribute('height');
                    var text = document.getElementById('container_Series_0_Point_2_Text');
                    var textX = +text.getAttribute('x');
                    var textY = +text.getAttribute('y');
                    expect(textX > (shapeX + 20)).toBe(true);
                    expect(textY > (shapeY + 25)).toBe(true);
                    expect(textY < (shapeY + shapeHeight - 5)).toBe(true);
                    expect(textX < (shapeX + shapeWidth - 10)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.margin = {
                    left: 20,
                    right: 10,
                    top: 25,
                    bottom: 5
                };
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Overlap data', function (done) {
                chartObj.loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup2').childNodes.length == 6).toBe(true);
                    expect(document.getElementById('container_Series_2_Point_0_TextShape') != null).toBe(true);
                    expect(document.getElementById('container_Series_2_Point_2_TextShape') != null).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.margin = {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5
                };
                chartObj.series = [chartObj.series[0], chartObj.series[1], {
                        name: 'series1', type: 'Column', fill: 'violet', width: 4,
                        animation: { enable: false },
                        dataSource: [
                            { x: new Date(2000, 6, 11), y: 45 },
                            { x: new Date(2002, 3, 7), y: 60 },
                            { x: new Date(2004, 3, 6), y: 45 },
                            { x: new Date(2006, 3, 30), y: 60 },
                            { x: new Date(2008, 3, 8), y: 40 },
                            { x: new Date(2010, 3, 8), y: 85 }
                        ], xName: 'x', yName: 'y',
                        marker: { dataLabel: { visible: true, fill: 'black', opacity: 0.6 } }
                    }];
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Changing series Type', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup2').childNodes.length > 4).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[2].type = 'Line';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking properties', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    expect(document.getElementById('container_Series_0_Point_3_Text').textContent == '65.00').toBe(true);
                    var element = document.getElementById('container_Series_1_Point_2_TextShape');
                    expect(element.getAttribute('fill') == 'transparent').toBe(true);
                    expect(element.getAttribute('stroke') == 'green').toBe(true);
                    expect(element.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'transparent';
                chartObj.series[1].marker.dataLabel.fill = 'transparent';
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.series[1].marker.dataLabel.border = {
                    width: 2,
                    color: 'green'
                };
                chartObj.series[0].marker.dataLabel.rx = 10;
                chartObj.series[0].marker.dataLabel.ry = 10;
                chartObj.series[2].marker.dataLabel.rx = 10;
                chartObj.series[2].marker.dataLabel.ry = 10;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Column Series with negative point data label', function () {
            var chartObj;
            var loaded;
            element = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                            type: 'Column', fill: 'rgba(135,206,235,1)',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('With negative location', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocation.y;
                    expect(svg > point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocation.y;
                    expect(svg < point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocation.y;
                    expect(svg < point0Location).toBe(true);
                    var rect = +document.getElementById('container_Series_0_Point_1').getAttribute('y');
                    var rectHeight = +document.getElementById('container_Series_0_Point_1').getAttribute('height');
                    expect(svg == (rect + 5));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('With Label position Middle', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                    var svgHeight = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('height');
                    var point0Location = chartObj.series[0].points[1].symbolLocation.y;
                    expect(svg < point0Location).toBe(true);
                    var rect = +document.getElementById('container_Series_0_Point_1').getAttribute('y');
                    var rectHeight = +document.getElementById('container_Series_0_Point_1').getAttribute('height');
                    expect(svg == (rect - svgHeight + rectHeight / 2));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Color saturation middle position', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Color saturation fill as transparent', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'transparent';
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Color saturation with chart area background black', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text');
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
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Color saturation with top position', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Color saturation with data label fill color', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Events', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2');
                    expect(element.getAttribute('fill') == 'brown').toBe(true);
                    element = document.getElementById('container_Series_0_Point_0');
                    expect(element == null).toBe(true);
                    done();
                };
                chartObj.pointRender = function (args) {
                    if (args.point.index === 0) {
                        args.cancel = true;
                    }
                    if (args.point.index === 2) {
                        args.fill = 'brown';
                    }
                };
                chartObj.loaded = loaded;
                chartObj.title = 'Events Changed';
                chartObj.dataBind();
            });
        });
    });
});
