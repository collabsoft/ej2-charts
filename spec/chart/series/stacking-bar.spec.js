define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/marker", "../../../src/chart/series/stacking-bar-series", "../../../src/chart/series/column-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/bar-series", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, marker_1, stacking_bar_series_1, column_series_1, data_label_1, date_time_axis_1, category_axis_1, bar_series_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker, stacking_bar_series_1.StackingBarSeries, column_series_1.ColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category, bar_series_1.BarSeries, data_label_1.DataLabel);
    var data = data_spec_2.tooltipData1;
    var data2 = data_spec_2.tooltipData2;
    var dateTime = data_spec_2.datetimeData;
    describe('Chart Control', function () {
        describe('Chart stackingBar series', function () {
            var chartObj;
            var elem;
            var point1;
            var point2;
            var point3;
            var svg;
            var targetElement;
            var loaded;
            var done;
            var dataLabel1;
            var dataLabel2;
            var dataLabel3;
            beforeAll(function () {
                elem = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)', stackingGroup: ''
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                            name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)', stackingGroup: ''
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                            name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)', stackingGroup: ''
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
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
                    point1 = document.getElementById('container_Series_0_Point_0');
                    expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    point2 = document.getElementById('container_Series_1_Point_1');
                    expect(point2.getAttribute('fill') == 'rgba(135,000,235,1)').toBe(true);
                    point3 = document.getElementById('container_Series_2_Point_1');
                    expect(point3.getAttribute('fill') == 'rgba(135,000,000,1)').toBe(true);
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
                chartObj.series[0].dataSource = data;
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
                chartObj.primaryXAxis.rangePadding = 'Additional';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[1].dataSource = null;
                chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[2].dataSource = null;
                chartObj.series[2].dataSource = [{ x: 4, y: 30 }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    var zeroLabel = document.getElementById('container1_AxisLabel_3');
                    var series1 = args.chart.series[0];
                    expect(series1.points[1].region.y < parseFloat(zeroLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking multiple series chart', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.points[2].region.y == series2.points[2].region.height + series2.points[2].region.y).toBe(true);
                    done();
                };
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)', stackingGroup: 'a'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)', stackingGroup: 'b'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
                    }
                ];
                chartObj.loaded = loaded;
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
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it(' checking with category  axis', function (done) {
                loaded = function (args) {
                    point1 = document.getElementById("container_Series_0_Point_1");
                    var point2 = document.getElementById("container_Series_1_Point_1");
                    expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series = [{
                        dataSource: data_spec_2.categoryData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
                    }],
                    chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it(' checking with datetime  axis', function (done) {
                loaded = function (args) {
                    point1 = document.getElementById("container_Series_0_Point_1");
                    var point2 = document.getElementById("container_Series_1_Point_1");
                    expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series = [{
                        dataSource: data_spec_2.datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)'
                    },
                    {
                        dataSource: data_spec_2.datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(000,206,235,1)'
                    }],
                    chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    point1 = document.getElementById('container_Series_0_Point_0');
                    expect(point1.getAttribute('fill') === 'red').toBe(true);
                    point2 = document.getElementById('container_Series_1_Point_1');
                    expect(point2.getAttribute('fill') === 'rgba(135,000,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.axes = [{
                        columnIndex: 1, name: 'xAxis1', title: 'AdditionalAxis',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'red'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNamePearl', fill: 'rgba(135,000,000,1)'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
                    }],
                    chartObj.width = '800';
                chartObj.series[1].yAxisName = 'xAxis1';
                chartObj.series[2].yAxisName = 'xAxis1';
                chartObj.columns = [{ width: '400', border: { width: 4, color: 'red' } },
                    { width: '400', border: { width: 4, color: 'blue' } }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking animation', function (done) {
                var animate = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
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
        describe('StackingBar Series with data label', function () {
            var chartObj;
            var loaded;
            var element;
            element = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: data_spec_2.negativeDataPoint, xName: 'x', yName: 'y',
                            type: 'StackingBar', fill: 'rgba(135,206,235,1)', stackingGroup: 'a',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        },
                        {
                            animation: { enable: false },
                            name: 'ChartSeriesNameSilver', dataSource: data2, xName: 'x', yName: 'y',
                            type: 'StackingBar', fill: 'green', stackingGroup: 'a',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'black' } }
                        },
                        {
                            animation: { enable: false },
                            name: 'ChartSeriesNameSilver', dataSource: data2, xName: 'x', yName: 'y',
                            type: 'StackingBar', fill: 'yellow', stackingGroup: 'b',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'black' } }
                        },
                    ],
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
            it('With negative location with auto position', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].region.x;
                    expect(svg > point0Location).toBe(true);
                    svg = +document.getElementById('container_Series_2_Point_6_TextShape').getAttribute('x');
                    point0Location = chartObj.series[2].points[6].region.x;
                    expect(svg == (point0Location + 5)).toBe(true);
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
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocation.x;
                    expect(svg1 < point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('With Label position Outer', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocation.x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocation.x;
                    expect(svg1 < point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('With Label position Top and alignment near', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocation.x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocation.x;
                    expect(svg1 < point0Location1).toBe(true);
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].region.x +
                        chartObj.series[0].points[1].region.width;
                    expect(svg < point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].region.x;
                    expect(svg1 > point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.series[2].marker.dataLabel.position = 'Bottom';
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
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.series[2].marker.dataLabel.position = 'Middle';
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
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
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
                    expect(element.getAttribute('fill') == 'black').toBe(true);
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
