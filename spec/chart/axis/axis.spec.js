define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/axis/category-axis", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, category_axis_1, data_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, category_axis_1.Category);
    describe('Chart Control', function () {
        var ele;
        var svg;
        var text;
        var loaded;
        describe('Axis Behavior', function () {
            var chartObj;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chartObj = new chart_1.Chart({
                    rows: [
                        {
                            height: '300'
                        },
                        {
                            height: '100'
                        }
                    ], loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#chartContainer');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                data_spec_1.unbindResizeEvents(chartObj);
                chartObj.destroy();
                ele.remove();
            });
            it('Checking the row definition', function (done) {
                loaded = function (args) {
                    var axis = document.getElementById('chartContainerAxisCollection');
                    expect(axis.childNodes.length == 3).toBe(true);
                    axis = document.getElementById('chartContainerAxisLine_1');
                    expect(parseFloat(axis.getAttribute('y2')) - parseFloat(axis.getAttribute('y1')) == 300).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Adding column definition to Axis', function (done) {
                chartObj.columns = [{ width: '350' }, { width: '100' }];
                chartObj.width = '400';
                chartObj.height = '300';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
                loaded = function (args) {
                    var axis = document.getElementById('chartContainerAxisCollection');
                    expect(axis.childNodes.length == 3).toBe(true);
                    axis = document.getElementById('chartContainerAxisLine_0');
                    expect(parseFloat(axis.getAttribute('x2')) - parseFloat(axis.getAttribute('x1')) == 350).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking the empty definition', function (done) {
                chartObj.columns = [];
                chartObj.rows = [];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
                loaded = function (args) {
                    var area = document.getElementById('chartContainer_ChartAreaBorder');
                    expect(area.getAttribute('y') == '10.25').toBe(true);
                    expect(area.getAttribute('x') == '10').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking the row definition with high value', function (done) {
                chartObj.columns = [{ width: '100%' }];
                chartObj.rows = [{ height: '100%' }];
                chartObj.primaryXAxis.rowIndex = 2;
                chartObj.primaryXAxis.minimum = 2;
                chartObj.primaryYAxis.columnIndex = 2;
                chartObj.primaryYAxis.minimum = 2;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
                loaded = function (args) {
                    var area = document.getElementById('chartContainer_ChartAreaBorder');
                    var axisLine = document.getElementById('chartContainerAxisLine_1');
                    expect(area.getAttribute('x') == document.getElementById('chartContainerAxisLine_0').getAttribute('x1')).toBe(true);
                    expect(parseFloat(area.getAttribute('height')) == parseFloat(axisLine.getAttribute('y2')) - parseFloat(axisLine.getAttribute('y1'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Checking the definition with negative value', function () {
                chartObj.primaryXAxis.rowIndex = -1;
                chartObj.primaryYAxis.columnIndex = -1;
                chartObj.dataBind();
                var area = document.getElementById('chartContainer_ChartAreaBorder');
                var axisLine = document.getElementById('chartContainerAxisLine_1');
                expect(area.getAttribute('x') == document.getElementById('chartContainerAxisLine_0').getAttribute('x1')).toBe(true);
                expect(parseFloat(area.getAttribute('height')) == parseFloat(axisLine.getAttribute('y2')) - parseFloat(axisLine.getAttribute('y1'))).toBe(true);
            });
            it('Checking Axis Line', function () {
                chartObj.primaryXAxis.lineStyle.color = '#FBAF4F';
                chartObj.primaryXAxis.lineStyle.width = 3;
                chartObj.primaryYAxis.lineStyle.color = '#0D97D4';
                chartObj.primaryYAxis.lineStyle.width = 3;
                chartObj.dataBind();
                svg = document.getElementById('chartContainerAxisLine_0');
                expect(svg.getAttribute('stroke') == '#FBAF4F').toBe(true);
                expect(svg.getAttribute('stroke-width') == '3').toBe(true);
                svg = document.getElementById('chartContainerAxisLine_1');
                expect(svg.getAttribute('stroke') == '#0D97D4').toBe(true);
                expect(svg.getAttribute('stroke-width') == '3').toBe(true);
            });
            it('Checking Grid Line', function () {
                chartObj.primaryXAxis.majorGridLines = { color: '#C2C924', width: 2 };
                chartObj.primaryXAxis.majorTickLines = { color: '#0AA368', width: 1.5, height: 20 };
                chartObj.primaryYAxis.majorGridLines = { color: '#B4D072', width: 2 };
                chartObj.primaryYAxis.majorTickLines = { color: '#C2C924', width: 1.5, height: 20 };
                chartObj.dataBind();
                svg = document.getElementById('chartContainer_MajorGridLine_0');
                expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
                expect(svg.getAttribute('stroke-width') == '2').toBe(true);
                svg = document.getElementById('chartContainer_MajorTickLine_0');
                expect(svg.getAttribute('stroke') == '#0AA368').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1.5').toBe(true);
                svg = document.getElementById('chartContainer_MajorGridLine_1');
                expect(svg.getAttribute('stroke') == '#B4D072').toBe(true);
                expect(svg.getAttribute('stroke-width') == '2').toBe(true);
                svg = document.getElementById('chartContainer_MajorTickLine_1');
                expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1.5').toBe(true);
            });
            it('Checking Axis title', function () {
                chartObj.primaryXAxis.title = 'Change the text';
                chartObj.primaryYAxis.title = 'Population';
                chartObj.dataBind();
                text = document.getElementById('chartContainer_AxisTitle_0');
                expect(text.textContent == 'Change the text').toBe(true);
                text = document.getElementById('chartContainer_AxisTitle_1');
                expect(text.textContent == 'Population').toBe(true);
            });
            it('Checking Axis Range', function () {
                chartObj.primaryXAxis.minimum = 12;
                chartObj.primaryXAxis.maximum = 2;
                chartObj.primaryXAxis.interval = 2;
                chartObj.dataBind();
                text = document.getElementById('chartContainer0_AxisLabel_0');
                expect(text.textContent == '2').toBe(true);
            });
            it('Checking the range padding', function () {
                chartObj.primaryXAxis = { title: 'PrimaryXAxis', rangePadding: 'Additional' };
                chartObj.primaryYAxis = { title: 'PrimaryYAxis', rangePadding: 'Normal' };
                chartObj.dataBind();
                text = document.getElementById('chartContainer0_AxisLabel_0');
                expect(text.textContent != '1').toBe(true);
                text = document.getElementById('chartContainer1_AxisLabel_0');
                expect(text.textContent == '0').toBe(true);
                text = document.getElementById('chartContainer1_AxisLabel_6');
                expect(text.textContent == '6').toBe(true);
            });
            it('Checking the zoomFactor and zoomPosition', function () {
                chartObj.primaryXAxis = { minimum: 1000, maximum: 10000, interval: 1000, zoomFactor: 0.5, zoomPosition: 0.3 };
                chartObj.primaryYAxis = { minimum: 0, maximum: 50, enableAutoIntervalOnZooming: false, zoomFactor: 0.3, zoomPosition: 0.6 };
                chartObj.dataBind();
                text = document.getElementById('chartContainer0_AxisLabel_0');
                expect(text.textContent == '4000').toBe(true);
                text = document.getElementById('chartContainer1_AxisLabel_0');
                expect(text.textContent == '30').toBe(true);
            });
            it('Axis label rotation', function () {
                chartObj.primaryXAxis = { labelRotation: 45, zoomFactor: 1, zoomPosition: 0 };
                chartObj.primaryYAxis = { zoomFactor: 1, zoomPosition: 0 };
                chartObj.dataBind();
                svg = document.getElementById('chartContainer_ChartAreaBorder');
                text = document.getElementById('chartContainer0_AxisLabel_0');
                expect(text.getAttribute('transform').indexOf('rotate(45') > -1).toBe(true);
            });
            it('Checking Minor Grid Line', function () {
                chartObj.primaryXAxis = {
                    minorGridLines: { color: '#C2C924', width: 1 },
                    minorTickLines: { color: '#0AA368', width: 1, height: 3 },
                    minorTicksPerInterval: 4,
                    labelRotation: 0
                };
                chartObj.primaryYAxis = {
                    minorGridLines: { color: '#B4D072', width: 1 },
                    minorTickLines: { color: '#C2C924', width: 1, height: 3 },
                    minorTicksPerInterval: 4
                };
                chartObj.dataBind();
                svg = document.getElementById('chartContainer_MinorGridLine_0');
                expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1').toBe(true);
                svg = document.getElementById('chartContainer_MinorTickLine_0');
                expect(svg.getAttribute('stroke') == '#0AA368').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1').toBe(true);
                svg = document.getElementById('chartContainer_MinorGridLine_1');
                expect(svg.getAttribute('stroke') == '#B4D072').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1').toBe(true);
                svg = document.getElementById('chartContainer_MinorTickLine_1');
                expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1').toBe(true);
            });
            it('Checking Minor Gird Line with opposed position', function () {
                chartObj.primaryXAxis.opposedPosition = true;
                chartObj.primaryYAxis.opposedPosition = true;
                chartObj.dataBind();
                svg = document.getElementById('chartContainer_MinorTickLine_0');
                expect(svg.getAttribute('stroke') == '#0AA368').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1').toBe(true);
                svg = document.getElementById('chartContainer_MinorTickLine_1');
                expect(svg.getAttribute('stroke') == '#C2C924').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1').toBe(true);
            });
            it('Checking the label format', function () {
                chartObj.primaryYAxis.opposedPosition = false;
                chartObj.primaryYAxis.minimum = 1000;
                chartObj.primaryYAxis.maximum = 10000;
                chartObj.primaryXAxis.labelRotation = 45;
                chartObj.primaryYAxis.labelFormat = 'C';
                chartObj.dataBind();
                text = document.getElementById('chartContainer1_AxisLabel_1');
                expect(text.textContent == '$3000.00').toBe(true);
                var element = document.getElementById('chartContainer0_AxisLabel_1');
                expect(element.getAttribute('transform').indexOf('rotate(45') > -1).toBe(true);
            });
            it('Checking the rotation greater than 360', function () {
                chartObj.primaryXAxis.opposedPosition = false;
                chartObj.primaryXAxis.labelRotation = 387;
                chartObj.dataBind();
                var element = document.getElementById('chartContainer0_AxisLabel_1');
                expect(element.getAttribute('transform').indexOf('rotate(27') > -1).toBe(true);
            });
        });
        describe('Axis Behavior', function () {
            var chart;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    series: [{ dataSource: [{ x: 10, y: -10 }], xName: 'x', yName: 'y', fill: 'pink', animation: { enable: true } }],
                    primaryXAxis: { desiredIntervals: 2 },
                    primaryYAxis: { rangePadding: 'Normal' }, loaded: loaded, legendSettings: { visible: false },
                    axisLabelRender: function (args) {
                        args.text = args.text + 'custom';
                    }
                });
                chart.appendTo('#chartContainer');
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking with negative value in axis', function (done) {
                loaded = function (args) {
                    text = document.getElementById('chartContainerAxisLabels0');
                    expect(text.childNodes.length == 3).toBe(true);
                    expect(text.childNodes[0].textContent.indexOf('custom') > -1).toBe(true);
                    done();
                };
                chart.loaded = loaded;
            });
            it('Changing the value type', function (done) {
                loaded = function (args) {
                    text = document.getElementById('chartContainerAxisLabels0');
                    expect(text.childNodes.length == 1).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.valueType = 'Category';
                chart.refresh();
            });
        });
    });
});
