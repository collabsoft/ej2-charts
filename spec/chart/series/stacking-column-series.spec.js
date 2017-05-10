define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/marker", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/stacking-column-series", "../../../src/chart/series/data-label", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, marker_1, date_time_axis_1, category_axis_1, stacking_column_series_1, data_label_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker, stacking_column_series_1.StackingColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category, data_label_1.DataLabel);
    var data = data_spec_2.tooltipData21;
    var data2 = data_spec_2.tooltipData22;
    var dateTime = data_spec_2.datetimeData21;
    describe('Chart Control', function () {
        describe('Chart StackingColumn series', function () {
            var chartObj;
            var elem;
            var svg;
            var targetElement;
            var loaded;
            var dataLabel;
            var marker;
            beforeAll(function () {
                elem = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
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
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg == null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_5');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[1].dataSource[5].y = null;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    var axisLabel = document.getElementById('container1_AxisLabel_6');
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect((series1.points[1].region.y) + series1.points[0].region.height > parseFloat(axisLabel.getAttribute('y'))).toBe(true);
                    expect((series2.points[4].region.y) + series2.points[4].region.height > parseFloat(axisLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.series[1].dataSource = data_spec_2.negativeDataPoint;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with different stackingGroup', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.points[1].region.x < series2.points[1].region.x).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].dataSource[3].y = 70;
                chartObj.series[1].dataSource[5].y = 60;
                chartObj.series[0].stackingGroup = 'a';
                chartObj.series[1].stackingGroup = 'b';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with default DataLabel ', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect(dataLabel.textContent === '70').toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                    expect(dataLabel.textContent === '73').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].stackingGroup = '';
                chartObj.series[1].stackingGroup = '';
                chartObj.series[1].marker.dataLabel.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label shape without fill', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_TextShape');
                    expect(marker.getAttribute('stroke') === 'grey').toBe(true);
                    expect(marker.getAttribute('stroke-width') === '2').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.border.width = 2;
                chartObj.series[0].marker.dataLabel.border.color = 'grey';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking font color saturation', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Text');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartArea.background = 'black';
                chartObj.chartArea.border.color = '';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking font color saturation', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Text');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartArea.background = 'white';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with DataLabel bottom position', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect(series1.points[0].region.y + series1.points[0].region.height >
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                    expect(series2.points[0].region.y + series2.points[0].region.height >
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with DataLabel middle position', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect((series1.points[0].region.y + series1.points[0].region.height) / 2 <=
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                    expect((series2.points[0].region.y + series2.points[0].region.height) / 2 <=
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with DataLabel top position', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect(series1.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                    expect(series2.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with DataLabel outer position', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect(series1.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_0_Text');
                    expect(series2.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with datalabel top position and labelAlignment Near', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    ;
                    expect(series1.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with datalabel top position and LabelAlignment far', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect(series1.points[0].region.y > parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with datalabel top position and labelAlignment center', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect(series1.points[0].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with datalabel Bottom position and labelAlignment Near', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect(dataLabel != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.seriesData1;
                chartObj.series[1].dataSource = data_spec_2.seriesData1;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with datalabel Bottom and LabelAlignment far', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect((series1.points[0].region.y + series1.points[0].region.height) >
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with datalabel custom labelFormat', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect(dataLabel.textContent === '70%').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
                chartObj.primaryYAxis.labelFormat = '{value}%';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with datalabel bottom position and LabelAlignment center', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text');
                    expect((series1.points[0].region.y + series1.points[0].region.height) >
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.primaryYAxis.labelFormat = '';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with DataLabel top position for negative points', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    svg = document.getElementById('container_Series_0_Point_2');
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text');
                    expect((series1.points[2].region.y + series1.points[2].region.height) >
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_5');
                    dataLabel = document.getElementById('container_Series_1_Point_5_Text');
                    expect((series2.points[5].region.y + series2.points[5].region.height) >
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.series[1].dataSource = data_spec_2.negativeDataPoint;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with DataLabel outer position for negative points', function (done) {
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text');
                    expect((series1.points[2].region.y + series1.points[2].region.height) >
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_5_Text');
                    expect((series2.points[5].region.y + series2.points[5].region.height) >
                        parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking with DataLabel bottom position for negative points', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text');
                    expect(series1.points[2].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_5_Text');
                    expect(series2.points[5].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with DataLabel Middle position for negative points', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text');
                    expect(series1.points[2].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_5_Text');
                    expect(series2.points[5].region.y < parseFloat(dataLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with border', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg.getAttribute('stroke') === 'green').toBe(true);
                    expect(svg.getAttribute('stroke-width') === '2').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_3');
                    expect(svg.getAttribute('stroke') === 'black');
                    expect(svg.getAttribute('stroke-width') === '2').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].border.width = 2;
                chartObj.series[0].border.color = 'green';
                chartObj.series[1].border.width = 2;
                chartObj.series[1].border.color = 'black';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with empty data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].dataSource[3].x = null;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == 'red').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'red', type: 'StackingColumn',
                        animation: { enable: false }
                    },
                    {
                        dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'StackingColumn',
                        animation: { enable: false }
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple series and stackingGroup', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('fill') == 'red').toBe(true);
                    svg = document.getElementById('container_Series_2_Point_0');
                    expect(svg.getAttribute('fill') == 'green').toBe(true);
                    svg = document.getElementById('container_Series_3_Point_0');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)',
                        type: 'StackingColumn', animation: { enable: false },
                    },
                    {
                        dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'red', type: 'StackingColumn',
                        animation: { enable: false }, stackingGroup: 'a',
                    },
                    {
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'green', type: 'StackingColumn',
                        animation: { enable: false }, stackingGroup: 'a'
                    },
                    {
                        dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'blue', type: 'StackingColumn',
                        animation: { enable: false },
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('fill') == 'red').toBe(true);
                    svg = document.getElementById('container_Series_2_Point_0');
                    expect(svg.getAttribute('fill') == 'green').toBe(true);
                    svg = document.getElementById('container_Series_3_Point_0');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.height = '600';
                chartObj.series[1].yAxisName = 'yAxis1';
                chartObj.series[2].yAxisName = 'yAxis1';
                chartObj.rows = [{ border: { width: 4, color: 'red' }, height: '300' },
                    { border: { width: 4, color: 'blue' } },];
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
            it('Checking Events', function (done) {
                loaded = function (args) {
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
