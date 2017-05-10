define(["require", "exports", "@syncfusion/ej2-base/dom", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/step-line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/area-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/marker", "../../../src/chart/series/data-label", "../base/data.spec", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, ej2_base_1, chart_1, line_series_1, step_line_series_1, column_series_1, area_series_1, date_time_axis_1, category_axis_1, marker_1, data_label_1, data_spec_1, data_spec_2, data_spec_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker, column_series_1.ColumnSeries, area_series_1.AreaSeries, date_time_axis_1.DateTime, category_axis_1.Category, data_label_1.DataLabel, step_line_series_1.StepLineSeries);
    var data = data_spec_2.tooltipData11;
    var data2 = data_spec_2.tooltipData12;
    var negativPoint = data_spec_2.negativeDataPoint;
    var dateTime = data_spec_2.datetimeData11;
    var india = data_spec_3.firstSeries;
    var germany = data_spec_3.secondSeries;
    var england = data_spec_3.thirdSeries;
    var france = data_spec_3.fourthSeries;
    describe('Chart Control Series', function () {
        describe('Line Series - Marker', function () {
            var chartObj;
            var loaded;
            var element;
            element = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', minimum: 2005, maximum: 2011, interval: 1 },
                    primaryYAxis: { title: 'PrimaryYAxis', minimum: 25, maximum: 50, interval: 5, rangePadding: 'None' },
                    series: [{
                            animation: { enable: false },
                            dataSource: india, xName: 'x', yName: 'y', name: 'India',
                            fill: '#E94649', type: 'Line', marker: { visible: true }
                        }, {
                            animation: { enable: false },
                            dataSource: germany, xName: 'x', yName: 'y', name: 'germany', fill: '#F6B53F',
                            type: 'Line', marker: { visible: true }
                        }, {
                            animation: { enable: false },
                            type: 'Line', dataSource: england, xName: 'x', yName: 'y',
                            name: 'England', fill: '#6FAAB0', marker: { visible: true }
                        }, {
                            animation: { enable: false },
                            dataSource: france, name: 'France', xName: 'x', yName: 'y',
                            fill: '#C4C24A', type: 'Line', marker: { visible: true }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('Showing default marker', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSymbolGroup1').childNodes.length;
                    expect(series1 == 8).toBe(true);
                    var marker = document.getElementById('container_Series_3_Point_0_Symbol');
                    expect(marker.getAttribute('fill') == '#C4C24A').toBe(true);
                    expect(marker.getAttribute('rx') == '2.5').toBe(true);
                    expect(marker.getAttribute('ry') == '2.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Changing visibility', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSymbolGroup1');
                    expect(series1 == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.visible = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Changing size', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_1_Point_3_Symbol');
                    expect(series1.getAttribute('rx') == '5').toBe(true);
                    expect(series1.getAttribute('ry') == '5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.visible = true;
                chartObj.series[1].marker.width = 10;
                chartObj.series[1].marker.height = 10;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Changing size default', function (done) {
                loaded = function (args) {
                    var series1;
                    series1 = document.getElementById('container_Series_1_Point_3_Symbol');
                    expect(series1.getAttribute('rx') == '0').toBe(true);
                    expect(series1.getAttribute('ry') == '0').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.width = 0;
                chartObj.series[1].marker.height = 0;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking specify marker color', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(series1.getAttribute('fill') == 'violet').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.fill = 'violet';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with checking column series marker visibility', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(series1 == null).toBe(true);
                    chartObj.series[0].type = 'Line';
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Column';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Changing marker shape 1', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_3_Point_1_Symbol');
                    var element = new ej2_base_1.SvgRenderer('').createGroup({});
                    var direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') > 0).toBe(true);
                    series1 = document.getElementById('container_Series_2_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') <= -1).toBe(true);
                    series1 = document.getElementById('container_Series_1_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') > 0).toBe(true);
                    series1 = document.getElementById('container_Series_0_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') <= -1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.width = 10;
                chartObj.series[1].marker.height = 10;
                chartObj.series[1].marker.width = 10;
                chartObj.series[2].marker.height = 10;
                chartObj.series[2].marker.width = 10;
                chartObj.series[3].marker.height = 10;
                chartObj.series[3].marker.width = 10;
                chartObj.series[0].marker.shape = 'Cross';
                chartObj.series[1].marker.shape = 'Diamond';
                chartObj.series[2].marker.shape = 'HorizontalLine';
                chartObj.series[3].marker.shape = 'InvertedTriangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Changing marker shape 2', function (done) {
                loaded = function (args) {
                    var direction;
                    var series1;
                    series1 = document.getElementById('container_Series_3_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') <= -1).toBe(true);
                    series1 = document.getElementById('container_Series_2_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') > 0).toBe(true);
                    series1 = document.getElementById('container_Series_1_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') > 0).toBe(true);
                    series1 = document.getElementById('container_Series_0_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') <= -1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.series[1].marker.shape = 'Rectangle';
                chartObj.series[2].marker.shape = 'Triangle';
                chartObj.series[3].marker.shape = 'VerticalLine';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with image', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(series1.getAttribute('href') == 'base/spec/img/img1.jpg').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.shape = 'Image';
                chartObj.series[1].marker.imageUrl = 'base/spec/img/img1.jpg';
                chartObj.series[1].marker.height = 20;
                chartObj.series[1].marker.width = 20;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with marker properties', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_2_Point_2_Symbol');
                    expect(series1.getAttribute('fill') == 'green').toBe(true);
                    expect(series1.getAttribute('opacity') == '0.1').toBe(true);
                    expect(series1.getAttribute('stroke') == 'red').toBe(true);
                    expect(series1.getAttribute('stroke-width') == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[2].marker.fill = 'green';
                chartObj.series[2].marker.opacity = 0.1;
                chartObj.series[2].marker.border = {
                    width: 4,
                    color: 'red'
                };
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
        describe('Line Series', function () {
            var chartObj;
            var loaded;
            var animate;
            var element1 = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element1);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold',
                            fill: 'rgba(135,206,235,1)',
                            xName: 'x',
                            yName: 'y',
                            marker: {
                                visible: false
                            }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                element1.remove();
            });
            it('Default Series Type without data Points', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('With single data point', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 1,
                        y: 10
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking series visibility', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 1).toBe(true);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with data source', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.primaryYAxis.interval = null;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with range', function (done) {
                loaded = function (args) {
                    chartObj.primaryXAxis.minimum = null;
                    chartObj.primaryXAxis.maximum = null;
                    chartObj.primaryXAxis.interval = null;
                    var seriesElements = document.getElementById('container_Series_0');
                    var path = seriesElements.getAttribute('d');
                    expect((path.match(/M/g) || []).length == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 10000;
                chartObj.primaryXAxis.interval = 1000;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with dateTimeRange', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-width');
                    expect(stroke == '2').toBe(true);
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
                chartObj.primaryXAxis.labelFormat = '';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with dash array', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-dasharray');
                    expect(stroke == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = '4';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with fill and stroke', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    expect(seriesElements.getAttribute('stroke') == 'red').toBe(true);
                    expect(seriesElements.getAttribute('stroke') != 'green').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') != '4').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') == '10').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = null;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].width = 10;
                chartObj.series[0].border.width = 4;
                chartObj.series[0].opacity = 0.6;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Animation', function (done) {
                animate = function (args) {
                    var pathLength = args.series.pathElement.getTotalLength();
                    expect(pathLength >= 700).toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[0].marker.visible = true;
                data_spec_1.unbindResizeEvents(chartObj);
                chartObj.animationComplete = animate;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
        describe('Area Series', function () {
            var chartObj;
            var loaded;
            var element1 = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element1);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold',
                            fill: 'rgba(135,206,235,1)',
                            type: 'Area',
                            xName: 'x',
                            yName: 'y',
                            marker: {
                                visible: false
                            }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                element1.remove();
            });
            it('Default Series Type without data Points', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('With single data point', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 1,
                        y: 10
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking series visibility', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with data source', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.primaryYAxis.interval = null;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with range', function (done) {
                loaded = function (args) {
                    chartObj.primaryXAxis.minimum = null;
                    chartObj.primaryXAxis.maximum = null;
                    chartObj.primaryXAxis.interval = null;
                    var seriesElements = document.getElementById('container_Series_0');
                    var path = seriesElements.getAttribute('d');
                    expect((path.match(/M/g) || []).length == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 10000;
                chartObj.primaryXAxis.interval = 1000;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with dateTimeRange', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-width');
                    expect(stroke == '0').toBe(true);
                    var labelElement = document.getElementById('container0_AxisLabel_3');
                    expect(labelElement.textContent == 'Jul 2003').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: null },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                ];
                chartObj.series[0].width = 2;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryXAxis.labelFormat = '';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with dash array', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-dasharray');
                    expect(stroke == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = '4';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with fill and stroke', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    expect(seriesElements.getAttribute('stroke') == 'green').toBe(true);
                    expect(seriesElements.getAttribute('stroke') != 'red').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') != '10').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') == '4').toBe(true);
                    expect(seriesElements.getAttribute('opacity') == '0.6').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[0].dashArray = null;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].width = 10;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].border.width = 4;
                chartObj.series[0].opacity = 0.6;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0');
                    var id = path.getAttribute('d');
                    var check = id.lastIndexOf('M');
                    expect(check !== 0).toBe(true);
                    chartObj.destroy();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
        describe('Line Series - Data Label', function () {
            var chartObj;
            var loaded;
            var element;
            element = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'DateTime' },
                    primaryYAxis: { rangePadding: 'None' },
                    series: [{
                            animation: { enable: false },
                            xName: 'x', yName: 'y',
                            name: 'India', fill: '#E94649',
                            marker: { visible: false, dataLabel: { visible: false } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('With single data point', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Showing default data label', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text');
                    expect(element.textContent == '65').toBe(true);
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking visibility', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text');
                    expect(element == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with marker visibility', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text');
                    expect(element != null).toBe(true);
                    var marker = +document.getElementById('container_Series_0_Point_3_Symbol').getAttribute('cy');
                    var label = +document.getElementById('container_Series_0_Point_3_Text').getAttribute('y');
                    expect(marker > label).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('with marker size without marker visibility', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking edge dataLabel', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_5_Text');
                    var location = (+marker.getAttribute('x')) + (+marker.getAttribute('width'));
                    var clipRectWidth = 757.5;
                    expect(location < clipRectWidth).toBe(true);
                    marker = document.getElementById('container_Series_0_Point_0_Text');
                    expect(+marker.getAttribute('x') > 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking auto position', function (done) {
                loaded = function (args) {
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
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Adding another series', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [chartObj.series[0], {
                        name: 'series1', type: 'Line', fill: '#ACE5FF', width: 3,
                        animation: { enable: false },
                        dataSource: [
                            { x: new Date(2000, 6, 11), y: 45 },
                            { x: new Date(2002, 3, 7), y: 40 },
                            { x: new Date(2004, 3, 6), y: 45 },
                            { x: new Date(2006, 3, 30), y: 40 },
                            { x: new Date(2008, 3, 8), y: 45 },
                            { x: new Date(2010, 3, 8), y: 20 }
                        ], xName: 'x', yName: 'y',
                        marker: {
                            dataLabel: {
                                visible: true
                            }
                        }
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                    expect(point1 > point1Location).toBe(true);
                    expect(point2 < point2Location).toBe(true);
                    expect(point3 > point3Location).toBe(true);
                    expect(point4 < point4Location).toBe(true);
                    expect(point5 > point5Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking dataLabel positions Bottom', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    var hiddenText = document.getElementById('container_Series_1_Point_1_Text');
                    expect(hiddenText == null).toBe(true);
                    expect(hiddenShape == null).toBe(true);
                    var element = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    expect(chartObj.series[1].points[2].symbolLocation.y < element).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking dataLabel positions Top', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    expect(chartObj.series[1].points[2].symbolLocation.y > element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking dataLabel positions Middle', function (done) {
                loaded = function (args) {
                    var element = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    var locationY = chartObj.series[1].points[2].symbolLocation.y;
                    var height = document.getElementById('container_Series_1_Point_2_Text').getBoundingClientRect().height;
                    expect(locationY == (element - (height / 4))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Data label format', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Text');
                    expect(marker.textContent == 'This is 65').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.labelFormat = 'This is {value}';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Datalabel alignment with position auto - alignment near', function (done) {
                var svg;
                loaded = function (args) {
                    svg = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                    expect(svg > chartObj.series[0].points[4].symbolLocation.y).toBe(true);
                    done();
                };
                svg = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                expect(svg > chartObj.series[0].points[4].symbolLocation.y).toBe(true);
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Datalabel alignment with position auto - alignment far', function (done) {
                var svg;
                loaded = function (args) {
                    svg = +document.getElementById('container_Series_0_Point_4_TextShape').getAttribute('y');
                    expect(svg > chartObj.series[0].points[4].symbolLocation.y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position in Bottom Position - near', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position in Bottom Position - far', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape != null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var elementHeight = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('height');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementY < (symbolLocation + elementHeight)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position in Bottom Position - center', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Datalabel alignment except Auto position in Outer Position - near', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape == null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    var elementHeight = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('height');
                    expect(elementY > (symbolLocation - elementHeight - elementHeight)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Datalabel alignment except Auto position in Outer Position - far', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape != null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementY < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Datalabel alignment except Auto position in Outer Position - middle', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape != null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementY < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position in Top Position', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape');
                    expect(hiddenShape == null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementY > (symbolLocation)).toBe(true);
                    elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    var elementHeight = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('height');
                    expect(elementY > (symbolLocation - elementHeight - elementHeight)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position in Middle Position - near', function (done) {
                loaded = function (args) {
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementY > (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position in Middle Position - far', function (done) {
                loaded = function (args) {
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    expect(elementY < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Data label alignment except Auto position in Middle Position - center', function (done) {
                loaded = function (args) {
                    var elementY = +document.getElementById('container_Series_1_Point_2_Text').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocation.y;
                    var height = document.getElementById('container_Series_1_Point_2_Text').getBoundingClientRect().height;
                    expect((elementY - (height / 4)) == (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking Overlap data', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup2').childNodes.length == 3).toBe(true);
                    expect(document.getElementById('container_Series_2_Point_0_TextShape') == null).toBe(true);
                    expect(document.getElementById('container_Series_2_Point_2_TextShape') == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.margin = {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5
                };
                chartObj.series = [chartObj.series[0], chartObj.series[1], {
                        name: 'series1', type: 'Line', fill: 'violet', width: 4,
                        animation: { enable: false },
                        dataSource: [
                            { x: new Date(2000, 6, 11), y: 45 },
                            { x: new Date(2002, 3, 7), y: 60 },
                            { x: new Date(2004, 3, 6), y: 45 },
                            { x: new Date(2006, 3, 30), y: 60 },
                            { x: new Date(2008, 3, 8), y: 40 },
                            { x: new Date(2010, 3, 8), y: 85 }
                        ],
                        xName: 'x', yName: 'y',
                        marker: { dataLabel: { visible: true, fill: 'black', opacity: 0.6 } }
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Changing series Type', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup2').childNodes.length == 6).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[2].type = 'Column';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                chartObj.series[1].marker.dataLabel.border = {
                    width: 2,
                    color: 'green'
                };
                chartObj.series[0].marker.dataLabel.rx = 10;
                chartObj.series[0].marker.dataLabel.ry = 10;
                chartObj.series[2].marker.dataLabel.rx = 10;
                chartObj.series[2].marker.dataLabel.ry = 10;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking auto position for scope', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_4_Text');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                var series0 = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                ];
                var series1 = [
                    { x: new Date(2000, 6, 11), y: 45 },
                    { x: new Date(2002, 3, 7), y: 40 },
                    { x: new Date(2004, 3, 6), y: 45 },
                    { x: new Date(2006, 3, 30), y: 40 },
                    { x: new Date(2008, 3, 8), y: 45 },
                    { x: new Date(2010, 3, 8), y: 20 }
                ];
                var series2 = [
                    { x: new Date(2000, 6, 11), y: 45 },
                    { x: new Date(2002, 3, 7), y: 60 },
                    { x: new Date(2004, 3, 6), y: 45 },
                    { x: new Date(2006, 3, 30), y: 60 },
                    { x: new Date(2008, 3, 8), y: 40 },
                    { x: new Date(2010, 3, 8), y: 85 }
                ];
                chartObj.series[1].marker.dataLabel.position = 'Auto';
                chartObj.series[2].marker.dataLabel.position = 'Auto';
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.series[0].type = 'Line';
                chartObj.series[1].type = 'Line';
                chartObj.series[2].type = 'Line';
                series1[1].y = null;
                series1[4].y = null;
                series0[4].y = null;
                series0[3].y = null;
                series0[1].y = null;
                series2[4].y = null;
                chartObj.series[0].dataSource = series0;
                chartObj.series[1].dataSource = series1;
                chartObj.series[2].dataSource = series2;
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 97;
                chartObj.primaryYAxis.interval = 44;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking auto position for scope - top', function (done) {
                var series0 = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                ];
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_4_Text');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                series0[4].y = 45;
                chartObj.series[0].dataSource = series0;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking dataLabel Top edge', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_3_Text');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = 25;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.primaryYAxis.interval = 5;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series = [{
                        animation: { enable: false },
                        dataSource: [{
                                x: 2005,
                                y: 30
                            }, {
                                x: 2006,
                                y: 40
                            }, {
                                x: 2007,
                                y: 40
                            }, {
                                x: 2008,
                                y: 48
                            }, {
                                x: 2009,
                                y: 25
                            }, {
                                x: 2010,
                                y: 39
                            }],
                        xName: 'x', yName: 'y',
                        name: 'India',
                        fill: '#E94649',
                        marker: {
                            visible: false,
                            dataLabel: {
                                visible: true,
                                position: 'Top',
                                fill: ''
                            }
                        }
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking stepline Top edge', function (done) {
                loaded = function (args) {
                    var element = +document.getElementById('container_Series_0_Point_0_Text').getAttribute('y');
                    var location = chartObj.series[0].points[0].symbolLocation.y;
                    expect(element < location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_1_Text').getAttribute('y');
                    location = chartObj.series[0].points[1].symbolLocation.y;
                    expect(element < location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_2_Text').getAttribute('y');
                    location = chartObj.series[0].points[2].symbolLocation.y;
                    expect(element < location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_3_Text').getAttribute('y');
                    location = chartObj.series[0].points[3].symbolLocation.y;
                    expect(element > location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_4_Text').getAttribute('y');
                    location = chartObj.series[0].points[4].symbolLocation.y;
                    expect(element > location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_5_Text').getAttribute('y');
                    location = chartObj.series[0].points[5].symbolLocation.y;
                    expect(element < location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.primaryYAxis.interval = 5;
                chartObj.primaryXAxis.minimum = 2004;
                chartObj.primaryXAxis.maximum = 2014;
                chartObj.primaryXAxis.interval = 2;
                chartObj.series[0].type = 'StepLine';
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
        describe('Data Label with Event checking', function () {
            var chart;
            var loaded;
            var text;
            var element;
            beforeAll(function () {
                element = dom_1.createElement('div', { id: 'datalabelcontainer' });
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis',
                        lineStyle: { width: 2 },
                        valueType: 'DateTime'
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#663AB6', width: 1,
                            marker: { visible: true, dataLabel: { visible: true, fill: 'transparent' } },
                            animation: { enable: false }, dataSource: [
                                { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                                { x: new Date(2004, 3, 6), y: -15 }, { x: new Date(2006, 3, -30), y: -65 },
                                { x: new Date(2007, 3, 8), y: 90 }, { x: new Date(2008, 3, 8), y: 85 }
                            ],
                            xName: 'x',
                            yName: 'y'
                        }
                    ], title: 'Chart TS Title'
                });
                chart.appendTo('#datalabelcontainer');
                data_spec_1.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('checking text render event', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('datalabelcontainer_Series_0_Point_4_TextShape');
                    expect(document.getElementById('datalabelcontainer_Series_0_Point_3_TextShape') == null).toBe(true);
                    expect(element != null).toBe(true);
                    expect(element.getAttribute('fill') == 'transparent').toBe(true);
                    expect(document.getElementById('datalabelcontainer_Series_0_Point_5_TextShape') == null).toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_5_Text');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_4_Text');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_2_TextShape');
                    expect(element.getAttribute('fill') == 'red').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_2_Text');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_3_Text');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_5_Text');
                    expect(element.textContent == '5th').toBe(true);
                    done();
                };
                text = function (args) {
                    if (args.point.index == 4) {
                        args.border.color = 'green';
                        args.border.width = 2;
                    }
                    if (args.point.index == 2) {
                        args.color = 'red';
                        args.border.color = 'green';
                        args.border.width = 2;
                    }
                    if (args.point.index == 5) {
                        args.text = '5th';
                    }
                };
                chart.loaded = loaded;
                chart.textRender = text;
            });
            it('checking top corner text color', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('datalabelcontainer_Series_0_Point_0_Text');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_1_Text');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.textRender = null;
                chart.series[0].type = 'Column';
                chart.series[0].fill = 'black';
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.primaryYAxis.minimum = 9;
                chart.primaryYAxis.maximum = 75;
                chart.refresh();
            });
        });
    });
});
