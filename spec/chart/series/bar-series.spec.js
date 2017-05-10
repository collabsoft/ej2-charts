define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/marker", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/series/bar-series", "../../../src/chart/series/column-series", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, marker_1, category_axis_1, date_time_axis_1, bar_series_1, column_series_1, tooltip_1, crosshair_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker, bar_series_1.BarSeries, column_series_1.ColumnSeries, tooltip_1.Tooltip, crosshair_1.Crosshair, category_axis_1.Category, date_time_axis_1.DateTime);
    describe('Chart Control', function () {
        describe('Chart Bar series', function () {
            var chartObj;
            var elem;
            var point;
            var svg;
            var targetElement;
            var loaded;
            var done;
            var dataLabel;
            var trigger = new data_spec_2.MouseEvents();
            var x;
            var y;
            var animationComplete;
            beforeAll(function () {
                elem = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', },
                    primaryYAxis: { title: 'PrimaryYAxis', },
                    series: [{
                            dataSource: data_spec_2.bar1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                    ], width: '800',
                    tooltip: { enable: true, fill: 'rgba(247,247,247,0.85)', textStyle: { size: '12px' }, format: '#series.name# : #point.x# <br/> : #point.y#' },
                    legendSettings: { visible: false },
                    title: 'Chart TS Title'
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with default points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.bar1;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.rangePadding = 'Additional';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    var series = chartObj.series[0];
                    var axisLabel = document.getElementById('container1_AxisLabel_4');
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(series.points[1].region.x < parseFloat(axisLabel.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with border', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking multiple series bar chart', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    var point1 = document.getElementById('container_Series_0_Point_2');
                    var point2 = document.getElementById('container_Series_1_Point_2');
                    expect((series0.points[2].region.y) == series1.points[2].region.height + series1.points[2].region.y).toBe(true);
                    done();
                };
                chartObj.series = [{
                        dataSource: data_spec_2.bar1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.bar2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.bar2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'None';
                chartObj.primaryYAxis.rangePadding = 'None';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking multiple series with diff orientation(horizontal) ', function (done) {
                loaded = function (args) {
                    var point1 = document.getElementById('container_Series_0_Point_0');
                    var point2 = document.getElementById('container_Series_1_Point_0');
                    expect(point2 == null).toBe(true);
                    done();
                };
                chartObj.series = [{
                        dataSource: data_spec_2.bar1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.bar2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.bar2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking multiple series with diff orientation(vertical) ', function (done) {
                loaded = function (args) {
                    var point1 = document.getElementById('container_Series_0_Point_0');
                    var point2 = document.getElementById('container_Series_1_Point_0');
                    expect(point2 != null).toBe(true);
                    expect(point1 != null).toBe(true);
                    done();
                };
                chartObj.series = [];
                chartObj.series = [{
                        dataSource: data_spec_2.bar1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.bar2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.bar2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNamepearl', fill: 'rgba(135,000,000,1)',
                    }];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('default Tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[1].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[1].region.y + parseFloat(chartArea.getAttribute('y')));
                    target = document.getElementById('container_Series_0_Point_7');
                    series = chartObj.series[0];
                    y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + 30 + elem.offsetTop;
                    x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Bar';
                chartObj.series[0].dataSource = data_spec_2.bar1;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('tooltip checking with positive edges', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_7');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var tooltipWidth;
                    y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    tooltipWidth = document.getElementById('container_tooltip_svg');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.left) > (elem.offsetLeft + series.points[7].region.x + (series.points[7].region.width / 2) + parseFloat(chartArea.getAttribute('x')))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.bar1;
                chartObj.primaryXAxis.rangePadding = 'Additional';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('negative Tooltip', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[1].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.left) < series.points[1].region.x + series.points[1].region.width + parseFloat(chartArea.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Bar';
                data_spec_2.bar1[7].y = -10, data_spec_2.bar1[1].y = -60;
                chartObj.series[0].dataSource = data_spec_2.bar1;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('tooltip checking with negative edge', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_7');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var tooltipWidth;
                    y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    tooltipWidth = document.getElementById('container_tooltip_svg');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect((parseFloat(tooltip.style.left) + parseFloat(tooltipWidth.getAttribute('width'))) < series.points[1].region.x + series.points[1].region.width + parseFloat(chartArea.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.bar1;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it(' checking with category  axis', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    point = document.getElementById("container_Series_0_Point_1");
                    var point2 = document.getElementById("container_Series_1_Point_1");
                    expect(point.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    expect(point2 == null).toBe(true);
                    var target = document.getElementById('container_Series_0_Point_0');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[0].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[0].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series = [{
                        dataSource: data_spec_2.categoryData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
                    }],
                    chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with track ball', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_7');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) - 10 + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetTop < y + series.points[7].region.height).toBe(true);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.series[1].type = 'Bar';
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.crosshair.enable = true;
                chartObj.tooltip.shared = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with cross hair', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].region.x + series.points[2].region.width / 2 + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').childNodes[4];
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == 'Japan').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '35.076').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it(' checking with datetime  axis', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    point = document.getElementById("container_Series_0_Point_1");
                    var point2 = document.getElementById("container_Series_1_Point_1");
                    expect(point.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    expect(point2 == null).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = null;
                chartObj.series[1].dataSource = null;
                chartObj.series = [{
                        dataSource: data_spec_2.datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    }],
                    chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes rows', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_0');
                    expect(point.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    var point1 = document.getElementById('container_Series_1_Point_1');
                    expect(point1.getAttribute('fill') === 'rgba(135,000,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1', title: 'AdditionalAxis',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.series = [{
                        dataSource: data_spec_2.bar1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.bar2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                ],
                    chartObj.height = '600';
                chartObj.series[1].xAxisName = 'yAxis1';
                chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
                    { height: '300', border: { width: 4, color: 'blue' } }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking animation', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[1].animation.enable = true;
                chartObj.animationComplete = animationComplete;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
        describe('Bar Series with data label', function () {
            var chartObj;
            var loaded;
            var animationComplete;
            var element;
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
                            type: 'Bar', fill: 'rgba(135,206,235,1)',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
            it('With negative location', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].region.x;
                    expect(svg < point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocation.x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                    var pointLocation1 = chartObj.series[0].points[0].symbolLocation.x;
                    expect(svg < pointLocation1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                    var point0Location = (chartObj.series[0].points[1].region.x +
                        chartObj.series[0].points[1].region.width);
                    expect(svg < point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].region.x;
                    expect(svg1 > point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('With Label position Middle', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('y');
                    var svgHeight = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('height');
                    var point0Location = chartObj.series[0].points[1].symbolLocation.y;
                    expect(svg < point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Color saturation with data label fill color', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].animation.enable = true;
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
