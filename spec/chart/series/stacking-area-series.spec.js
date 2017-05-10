define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/marker", "../../../src/chart/series/stacking-area-series", "../../../src/chart/series/area-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/stacking-column-series", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, marker_1, stacking_area_series_1, area_series_1, date_time_axis_1, category_axis_1, stacking_column_series_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker, stacking_area_series_1.StackingAreaSeries, stacking_column_series_1.StackingColumnSeries, area_series_1.AreaSeries, date_time_axis_1.DateTime, category_axis_1.Category);
    var data = data_spec_2.tooltipData21;
    var data2 = data_spec_2.tooltipData22;
    var datetime = data_spec_2.datetimeData21;
    describe('Chart Control', function () {
        describe('Chart StackingArea series', function () {
            var chartObj;
            var elem;
            var svg;
            var marker;
            var dataLabel;
            var loaded;
            var targetElement;
            beforeAll(function () {
                elem = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
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
            it('Checking with default points', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0');
                    expect(series1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    var series2 = document.getElementById('container_Series_1');
                    expect(series2.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.childNodes[3] == null).toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.childNodes[5] == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[1].dataSource[5].y = null;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') === 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.series[1].dataSource = data_spec_2.negativeDataPoint;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker visible false', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg == null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].marker.visible = false;
                chartObj.series[1].marker.visible = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker size', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.marker.height === 10).toBe(true);
                    expect(series1.marker.width === 10).toBe(true);
                    expect(series2.marker.height === 10).toBe(true);
                    expect(series2.marker.width === 10).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.width = 10;
                chartObj.series[1].marker.visible = true;
                chartObj.series[1].marker.height = 10;
                chartObj.series[1].marker.width = 10;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker with shape', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(svg.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.series[0].marker.fill = 'red';
                chartObj.series[1].marker.shape = 'Diamond';
                chartObj.series[1].marker.fill = 'black';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape image', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg.getAttribute('href') === 'base/spec/img/img1.jpg').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Image';
                chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking marker with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[2].y = null;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with add new element in data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_8_Symbol');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                dom_1.remove(document.getElementById('containerSeriesGroup0'));
                chartObj.series[0].dataSource = null;
                var length = Object.keys(data).length;
                length++;
                data[length - 1] = [];
                data[length - 1].y = 50;
                data[length - 1].x = 10000;
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with single data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg != null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'Additional';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[1].dataSource = null;
                chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker without animation', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.series[1].dataSource = data_spec_2.categoryData;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it(' checking with fill and stroke', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    expect(svg.getAttribute('stroke') === 'green').toBe(true);
                    expect(svg.getAttribute('stroke-width') === '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].border.width = 4;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis onticks', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.series[1].dataSource = data_spec_2.categoryData;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') == 'red').toBe(true);
                    svg = document.getElementById('container_Series_2');
                    expect(svg.getAttribute('fill') == 'green').toBe(true);
                    svg = document.getElementById('container_Series_3');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)',
                        type: 'StackingArea', animation: { enable: false },
                    },
                    {
                        dataSource: data2, name: 'silver', xName: 'x', yName: 'y', fill: 'red', type: 'StackingArea',
                        animation: { enable: false },
                    },
                    {
                        dataSource: data, name: 'Diamond', xName: 'x', yName: 'y', fill: 'green', type: 'StackingArea',
                        animation: { enable: false },
                    },
                    {
                        dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'blue', type: 'StackingArea',
                        animation: { enable: false },
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with dateTime', function (done) {
                loaded = function (args) {
                    var axislabel = document.getElementById('container0_AxisLabel_3');
                    expect(axislabel.textContent === 'Feb 2002').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = datetime;
                chartObj.series[1].dataSource = datetime;
                chartObj.series[2].dataSource = datetime;
                chartObj.series[3].dataSource = datetime;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') == 'red').toBe(true);
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1', minimum: 0,
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.height = '600';
                chartObj.series[2].yAxisName = 'yAxis1';
                chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
                    { height: '300', border: { width: 4, color: 'blue' } },];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking animation', function (done) {
                var animate = function (args) {
                    var point = document.getElementById('container_ChartSeriesClipRect_' + args.series.index).childNodes[0];
                    expect(point.getAttribute('width') === document.getElementById('container_ChartAreaBorder').getAttribute('width')).toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[1].animation.enable = true;
                chartObj.series[2].animation.enable = true;
                chartObj.series[3].animation.enable = true;
                chartObj.animationComplete = animate;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
    });
});
