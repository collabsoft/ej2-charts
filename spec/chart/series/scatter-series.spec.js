define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/marker", "../../../src/chart/series/scatter-series", "../../../src/chart/series/line-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/tooltip", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, marker_1, scatter_series_1, line_series_1, date_time_axis_1, category_axis_1, tooltip_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(marker_1.Marker, scatter_series_1.ScatterSeries, line_series_1.LineSeries, date_time_axis_1.DateTime, category_axis_1.Category, tooltip_1.Tooltip);
    var data = data_spec_2.tool1;
    var data2 = data_spec_2.tool2;
    var datetime = data_spec_2.datetimeData;
    describe('Chart Control', function () {
        describe('Chart Scatter series', function () {
            var chartObj;
            var elem;
            var svg;
            var marker;
            var datalabel;
            var targetElement;
            var loaded;
            var trigger = new data_spec_2.MouseEvents();
            beforeAll(function () {
                if (document.getElementById('container')) {
                    document.getElementById('container').remove();
                }
                elem = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
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
            it('Checking with fill', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') === 'green').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container1_AxisLabel_4');
                    var series = args.chart.series[0];
                    marker = document.getElementById('container_Series_0_Point_1');
                    expect(parseFloat(svg.getAttribute('y')) < series.points[1].symbolLocation.y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = 60;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 1, y: 10 }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker shape Circle', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'black';
                chartObj.series[0].dataSource = data;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape diamond', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape HorizontalLine', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'HorizontalLine';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape InvertedTriangle', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'InvertedTriangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Pentagon', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Triangle', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Triangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape rectangle', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape verticalLine', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'VerticalLine';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Cross', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Cross';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape image', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Image';
                chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker size', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var series = chartObj.series[0];
                    expect(series.points[2].region.y === 24.40625).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.height = 20;
                chartObj.series[0].marker.width = 20;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker visible false', function (done) {
                loaded = function (args) {
                    datalabel = document.getElementById('container_Series_0_Point_0');
                    expect(datalabel !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis onticks', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_1');
                    expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{ dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', type: 'Scatter', animation: { enable: false } },
                    { dataSource: data2, xName: 'x', name: 'silver', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Scatter', animation: { enable: false } }];
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with dateTime', function (done) {
                loaded = function (args) {
                    var axislabel = document.getElementById('container0_AxisLabel_3');
                    expect(axislabel.textContent === 'Jul 2003').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = datetime;
                chartObj.series[1].dataSource = datetime;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_1');
                    expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1', minimum: 20, maximum: 80, interval: 20,
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.height = '600';
                chartObj.series[1].yAxisName = 'yAxis1';
                chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
                    { height: '300', border: { width: 4, color: 'blue' } }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with axis with opposed position', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_ChartAreaBorder');
                    var svg1 = document.getElementById('container2_AxisLabel_0');
                    expect(parseFloat(svg.getAttribute('x')) + parseFloat(svg.getAttribute('width')) <
                        parseFloat(svg1.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes[0].opposedPosition = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking animation', function (done) {
                var animate = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === null).toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[1].animation.enable = true;
                chartObj.animationComplete = animate;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
    });
    describe('checking for multiple axes', function () {
        var chartObj;
        var elem = dom_1.createElement('div', { id: 'container' });
        var targetElement;
        var loaded;
        var marker0;
        HTMLElement;
        var dataLabel0;
        beforeAll(function () {
            document.body.appendChild(elem);
            chartObj = new chart_1.Chart({
                axes: [{
                        rowIndex: 0,
                        columnIndex: 0,
                        name: 'yAxis1',
                        title: 'YAxis1',
                    },
                    {
                        rowIndex: 0,
                        columnIndex: 0,
                        name: 'yAxis2',
                        title: 'YAxis2',
                    },
                    {
                        rowIndex: 1,
                        columnIndex: 0,
                        name: 'yAxis3',
                        title: 'YAxis3',
                    },
                    {
                        rowIndex: 1,
                        columnIndex: 0,
                        name: 'yAxis4',
                        title: 'YAxis4'
                    },
                    {
                        rowIndex: 0,
                        columnIndex: 1,
                        name: 'yAxis6',
                        title: 'YAxis6',
                        opposedPosition: true,
                    },
                    {
                        rowIndex: 0,
                        columnIndex: 1,
                        name: 'yAxis5',
                        title: 'YAxis5',
                        opposedPosition: true,
                    },
                    {
                        rowIndex: 1,
                        columnIndex: 1,
                        name: 'yAxis7',
                        title: 'YAxis7',
                        opposedPosition: true,
                    },
                    {
                        rowIndex: 1,
                        columnIndex: 1,
                        name: 'yAxis8',
                        title: 'YAxis8',
                        opposedPosition: true,
                    },
                    {
                        columnIndex: 0,
                        rowIndex: 0,
                        name: 'xAxis1',
                        title: 'Xaxis1',
                    },
                    {
                        columnIndex: 0,
                        rowIndex: 0,
                        name: 'xAxis2',
                        title: 'Xaxis2',
                    },
                    {
                        columnIndex: 1,
                        rowIndex: 0,
                        name: 'xAxis3',
                        title: 'Xaxis3',
                    },
                    {
                        columnIndex: 1,
                        rowIndex: 0,
                        name: 'xAxis4',
                        title: 'Xaxis4',
                    },
                    {
                        columnIndex: 0,
                        rowIndex: 1,
                        name: 'xAxis5',
                        title: 'Xaxis5',
                        opposedPosition: true,
                    },
                    {
                        columnIndex: 0,
                        rowIndex: 1,
                        name: 'xAxis6',
                        title: 'Xaxis6',
                        opposedPosition: true,
                    },
                    {
                        columnIndex: 1,
                        rowIndex: 1,
                        name: 'xAxis7',
                        title: 'Xaxis7',
                        opposedPosition: true,
                    },
                    {
                        columnIndex: 1,
                        rowIndex: 1,
                        name: 'xAxis8',
                        title: 'Xaxis8',
                        opposedPosition: true,
                    },
                ],
                series: [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameGold', fill: 'green',
                        xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameGold', fill: 'red',
                        xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameGold1', fill: 'black',
                        xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameDiamond', fill: 'blue',
                        xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameSilver', fill: 'green',
                        xAxisName: 'xAxis5', yAxisName: 'yAxis3',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                        type: 'Scatter',
                        name: 'ChartSeriesNameRuby', fill: 'red',
                        xAxisName: 'xAxis6', yAxisName: 'yAxis4',
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNamePlatinum', fill: 'rgba(135,000,235,1)',
                        xAxisName: 'xAxis3', yAxisName: 'yAxis5',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameEmerald', fill: 'purple',
                        xAxisName: 'xAxis4', yAxisName: 'yAxis6',
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNamePearl', fill: 'violet',
                        xAxisName: 'xAxis7', yAxisName: 'yAxis7'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                        type: 'Scatter',
                        name: 'ChartSeriesNameCoral', fill: 'yellow',
                        xAxisName: 'xAxis8', yAxisName: 'yAxis8',
                    }
                ],
                rows: [
                    { height: '400', border: { width: 2, color: 'red' } },
                    { height: '400', border: { width: 2, color: 'red' } },
                ],
                columns: [
                    { width: '400', border: { width: 2, color: 'black' } },
                    { width: '400', border: { width: 2, color: 'black' } },
                ], legendSettings: { visible: false },
                title: 'Chart TS Title', height: '1000', width: '1000',
            });
            chartObj.appendTo('#container');
            data_spec_1.unbindResizeEvents(chartObj);
        });
        afterAll(function () {
            chartObj.destroy();
            elem.remove();
        });
        it('Checking with fill', function (done) {
            loaded = function (args) {
                var svg = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') === 'green').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
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
            chartObj.refresh();
        });
    });
});
