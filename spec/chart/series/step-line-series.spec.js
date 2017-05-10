define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../base/data.spec", "../../../src/chart/series/marker", "../../../src/chart/series/step-line-series", "../../../src/chart/series/stacking-area-series", "../../../src/chart/series/stacking-column-series", "../../../src/chart/series/line-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, data_spec_1, marker_1, step_line_series_1, stacking_area_series_1, stacking_column_series_1, line_series_1, date_time_axis_1, category_axis_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(marker_1.Marker, step_line_series_1.StepLineSeries, stacking_area_series_1.StackingAreaSeries, stacking_column_series_1.StackingColumnSeries, line_series_1.LineSeries, category_axis_1.Category, date_time_axis_1.DateTime);
    var data = data_spec_2.tooltipData1;
    var data2 = data_spec_2.tooltipData2;
    var datetime = data_spec_2.datetimeData;
    describe('Chart Control', function () {
        describe('Chart Stepline series', function () {
            var chartObj;
            var elem;
            var svg;
            var marker;
            var datalabel;
            var targetElement;
            var loaded;
            beforeAll(function () {
                elem = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StepLine',
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
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') === 'green').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3_Symbol');
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
                    expect(parseFloat(svg.getAttribute('y')) < series.points[1].symbolLocation.y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
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
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'black';
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape diamond', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape HorizontalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'HorizontalLine';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape InvertedTriangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'InvertedTriangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Pentagon', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Triangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Triangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape rectangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape verticalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'VerticalLine';
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
            it('Checking with marker visible false', function (done) {
                loaded = function (args) {
                    datalabel = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(datalabel === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
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
                chartObj.series[0].marker.visible = true;
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
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('stroke') === 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{ dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', type: 'StepLine', animation: { enable: false } },
                    { dataSource: data2, xName: 'x', name: 'silver', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'StepLine', animation: { enable: false } },
                    { dataSource: data, xName: 'x', name: 'diamond', yName: 'y', fill: 'blue', type: 'StepLine', animation: { enable: false } }];
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.series[2].marker.visible = true;
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
                chartObj.series[2].dataSource = datetime;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('stroke') === 'rgba(135,206,235,1)').toBe(true);
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
                    var point = document.getElementById('container_ChartSeriesClipRect_' + args.series.index).childNodes[0];
                    expect(point.getAttribute('width') === document.getElementById('container_ChartAreaBorder').getAttribute('width')).toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[1].animation.enable = true;
                chartObj.series[2].animation.enable = true;
                chartObj.animationComplete = animate;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis and multiple category data ', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.stackedValues.startValues[0] === 0).toBe(true);
                    expect(series2.stackedValues.startValues[0] === 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: [{ x: "USA", y: 50 }, { x: "China", y: 50 },
                            { x: "Japan", y: 70 }, { x: "Australia", y: 60 },
                            { x: "France", y: 50 }, { x: "Germany", y: 50 },
                            { x: "Italy", y: 60 }, { x: "Sweden", y: 60 }],
                        name: 'Gold', xName: 'x', yName: 'y', fill: 'red', type: 'StackingColumn'
                    }, {
                        type: 'StackingColumn',
                        dataSource: [{ x: '1', y: 70 }, { x: '2', y: 60 }, { x: '3', y: 20 }, { x: '4', y: 100 },
                            { x: '5', y: 30 }, { x: '6', y: 120 }, { x: '7', y: 140 }],
                        name: 'silver', fill: 'blue', xName: 'x', yName: 'y'
                    }];
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
    });
    describe('Chart Control', function () {
        describe('Chart column series', function () {
            var chartObj;
            var elem;
            var svg;
            var loaded;
            beforeAll(function () {
                elem = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Months', edgeLabelPlacement: 'Shift',
                    },
                    primaryYAxis: { title: 'Temperature (Celcius)', labelFormat: '{value}°C' },
                    axes: [{
                            rowIndex: 0, columnIndex: 0, name: 'yAxis1', title: 'YAxis1'
                        },
                        { rowIndex: 0, columnIndex: 0, name: 'yAxis2', title: 'YAxis2' },
                        { rowIndex: 1, columnIndex: 0, name: 'yAxis3', title: 'YAxis3' },
                        { rowIndex: 1, columnIndex: 0, name: 'yAxis4', title: 'YAxis4' },
                        { rowIndex: 0, columnIndex: 1, name: 'yAxis6', title: 'YAxis6', opposedPosition: true },
                        { rowIndex: 0, columnIndex: 1, name: 'yAxis5', title: 'YAxis5', opposedPosition: true },
                        { rowIndex: 1, columnIndex: 1, name: 'yAxis7', title: 'YAxis7', opposedPosition: true },
                        { rowIndex: 1, columnIndex: 1, name: 'yAxis8', title: 'YAxis8', opposedPosition: true, },
                        { columnIndex: 0, rowIndex: 0, name: 'xAxis1', interval: 1, minimum: 1, title: 'Xaxis1' },
                        { columnIndex: 0, rowIndex: 0, name: 'xAxis2', interval: 1, minimum: 1, title: 'Xaxis2' },
                        { columnIndex: 1, rowIndex: 0, name: 'xAxis3', interval: 1, minimum: 1, title: 'Xaxis3' },
                        { columnIndex: 1, rowIndex: 0, name: 'xAxis4', minimum: 1, interval: 1, title: 'Xaxis4' },
                        { columnIndex: 0, rowIndex: 1, name: 'xAxis5', interval: 1, minimum: 1, title: 'Xaxis5', opposedPosition: true },
                        { columnIndex: 0, rowIndex: 1, name: 'xAxis6', interval: 1, minimum: 1, title: 'Xaxis6', opposedPosition: true },
                        { columnIndex: 1, rowIndex: 1, name: 'xAxis7', interval: 1, minimum: 1, title: 'Xaxis7', opposedPosition: true },
                        { columnIndex: 1, rowIndex: 1, interval: 1, name: 'xAxis8', title: 'Xaxis8', minimum: 1, opposedPosition: true },
                    ],
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'ChartSeriesNameGold1', fill: 'black',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                            xAxisName: 'xAxis2', yAxisName: 'yAxis2',
                        }],
                    rows: [{ height: '300', border: { width: 2, color: 'red' } },
                        { height: '300', border: { width: 2, color: 'red' } }],
                    columns: [{ width: '300', border: { width: 2, color: 'black' } },
                        { width: '300', border: { width: 2, color: 'black' } }],
                    height: '600'
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[0].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes with two columns', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[0].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 2).toBe(true);
                    done();
                };
                chartObj.axes = [{
                        rowIndex: 0, columnIndex: 0, name: 'yAxis1', title: 'YAxis1',
                    },
                    {
                        rowIndex: 0, columnIndex: 0, name: 'yAxis2', title: 'YAxis2',
                    },
                    {
                        rowIndex: 0, columnIndex: 1, name: 'yAxis3', title: 'YAxis3',
                    },
                    {
                        rowIndex: 0, columnIndex: 1, name: 'yAxis4', title: 'YAxis4',
                    }];
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        xAxisName: 'yAxis1', stackingGroup: 'a'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameGold1', fill: 'black',
                        xAxisName: 'yAxis1',
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameGold2', fill: 'red',
                        xAxisName: 'yAxis1',
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameGold3', fill: 'green',
                        xAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameDiamond', fill: 'blue',
                        xAxisName: 'yAxis2', stackingGroup: 'a'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameDiamond', fill: 'rgba(135,206,235,1)',
                        xAxisName: 'yAxis2',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameDiamond1', fill: 'yellow',
                        xAxisName: 'yAxis2'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameSilver', fill: 'blue',
                        xAxisName: 'yAxis3', stackingGroup: 'a'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                        name: 'ChartSeriesNameSilver1', fill: 'black',
                        xAxisName: 'yAxis3',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                        type: 'StackingColumn',
                        name: 'ChartSeriesNameRuby', fill: 'red',
                        xAxisName: 'yAxis4', stackingGroup: 'a'
                    }];
                chartObj.rows = [{}];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
    });
});
