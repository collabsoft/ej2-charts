define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/series/marker", "../base/data.spec", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, column_series_1, crosshair_1, marker_1, data_spec_1, date_time_axis_1, category_axis_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker, column_series_1.ColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category);
    chart_1.Chart.Inject(crosshair_1.Crosshair);
    describe('Chart Crosshair', function () {
        describe('Chart Crosshair Default', function () {
            var chartObj;
            var elem = dom_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var loaded1;
            var trigger = new data_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                if (document.getElementById('container')) {
                    document.getElementById('container').remove();
                }
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category', labelPlacement: 'OnTicks', crosshairTooltip: { enable: true } },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', labelFormat: 'C', crosshairTooltip: { enable: true } },
                    series: [{
                            dataSource: data_spec_1.categoryData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: '#B82E3D', width: 2,
                            type: 'Column', marker: { visible: true, height: 8, width: 8 },
                        }, {
                            dataSource: data_spec_1.categoryData1, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'blue', width: 2,
                            type: 'Column', marker: { visible: true, height: 8, width: 8 },
                        }
                    ], width: '1000',
                    crosshair: { enable: true },
                    title: 'Export', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Default Crosshair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
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
                    expect(element1.textContent == 'France').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '$39.97').toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + elem.offsetTop + 1;
                    x = parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft + 1;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    crosshair = document.getElementById('container_svg').lastChild;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Customizing Axis Tooltip', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 4 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 2).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.getAttribute('fill') == 'red').toBe(true);
                    expect(element1.getAttribute('font-size') == '16px').toBe(true);
                    expect(element1.textContent == 'Japan').toBe(true);
                    done();
                };
                chartObj.primaryYAxis.crosshairTooltip.enable = false;
                chartObj.primaryXAxis.crosshairTooltip.textStyle.color = 'red';
                chartObj.primaryXAxis.crosshairTooltip.textStyle.size = '16px';
                chartObj.primaryXAxis.opposedPosition = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('OnTicks and BetweenTicks', function (done) {
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 10;
                trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                var crosshair = document.getElementById('container_svg').lastChild;
                var element1;
                element1 = crosshair.childNodes[2].childNodes[1];
                expect(element1.textContent == 'France1').toBe(true);
                data_spec_2.unbindResizeEvents(chartObj);
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 10;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == 'Germany1').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Chart Crosshair Default', function () {
            var chartObj1;
            var elem = dom_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var loaded1;
            var trigger = new data_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                if (document.getElementById('container')) {
                    document.getElementById('container').remove();
                }
                document.body.appendChild(elem);
                chartObj1 = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category', labelPlacement: 'OnTicks', crosshairTooltip: { enable: true } },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', labelFormat: 'C', crosshairTooltip: { enable: true } },
                    axes: [
                        { name: 'xAxis1', opposedPosition: true, crosshairTooltip: { enable: true } },
                        { name: 'yAxis1', crosshairTooltip: { enable: true } }, { name: 'yAxis2', opposedPosition: true },
                        { name: 'xAxis2', valueType: 'DateTime', crosshairTooltip: { enable: true } },
                    ],
                    series: [{
                            dataSource: data_spec_1.categoryData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'China', fill: '#B82E3D', width: 2, type: 'Line',
                        }, {
                            dataSource: data_spec_1.tooltipData1, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'red', width: 2, type: 'Line', xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'blue', width: 2, type: 'Line', xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                        }
                    ], width: '1000',
                    crosshair: { enable: true },
                    title: 'Export', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj1.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj1);
            });
            afterAll(function () {
                chartObj1.destroy();
                elem.remove();
            });
            it('Default Crosshair with different type of axis', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 10).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == 'Australia').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '$59.81').toBe(true);
                    expect(crosshair.childNodes[2].lastChild.textContent == 'May 2005').toBe(true);
                    done();
                };
                chartObj1.loaded = loaded;
                data_spec_2.unbindResizeEvents(chartObj1);
            });
            it('Changing the Visibility different axis', function (done) {
                data_spec_2.unbindResizeEvents(chartObj1);
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 8).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    expect(element1.getAttribute('fill') == 'blue').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '$59.81').toBe(true);
                    var elem1 = crosshair.childNodes[2].lastChild;
                    expect(elem1.getAttribute('fill') == 'red').toBe(true);
                    crosshair.innerHTML = '';
                    done();
                };
                chartObj1.axes[0].crosshairTooltip.enable = false;
                chartObj1.axes[2].crosshairTooltip.enable = true;
                chartObj1.axes[3].crosshairTooltip.textStyle.color = 'red';
                chartObj1.primaryXAxis.crosshairTooltip.enable = false;
                chartObj1.primaryYAxis.crosshairTooltip.fill = 'blue';
                chartObj1.loaded = loaded;
                data_spec_2.unbindResizeEvents(chartObj1);
                chartObj1.refresh();
                data_spec_2.unbindResizeEvents(chartObj1);
            });
            it('Changing the Visibility different axis', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 3 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 3 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent.indexOf('#') > -1).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent.indexOf('$') > -1).toBe(true);
                    done();
                };
                chartObj1.axes[0].crosshairTooltip.enable = true;
                chartObj1.axes[0].labelFormat = '{value}$';
                chartObj1.primaryYAxis.labelFormat = '#{value}';
                chartObj1.loaded = loaded;
                chartObj1.refresh();
                data_spec_2.unbindResizeEvents(chartObj1);
            });
            it('crosshair with multiple axes', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '106.5').toBe(true);
                    done();
                };
                chartObj1.primaryXAxis.crosshairTooltip.enable = true;
                chartObj1.axes = [{
                        columnIndex: 1, valueType: 'DateTime', name: 'xAxis1',
                        crosshairTooltip: { enable: true }
                    }, {
                        rowIndex: 1, name: 'yAxis1',
                        crosshairTooltip: { enable: true }
                    }, {
                        rowIndex: 1, columnIndex: 1, name: 'yAxis2',
                        crosshairTooltip: { enable: true }
                    }];
                chartObj1.series = [{
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'China', fill: '#B82E3D', width: 2, type: 'Line',
                    }, {
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: 'red', width: 2, type: 'Line', yAxisName: 'yAxis2', xAxisName: 'xAxis1'
                    },
                    {
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: 'blue', width: 2, type: 'Line', yAxisName: 'yAxis1',
                    }
                ];
                chartObj1.rows = [{ height: '200', border: { width: 2, color: 'red' } },
                    { height: '100', border: { width: 2, color: 'red' } }];
                chartObj1.columns = [{ width: '300', border: { width: 2, color: 'black' } },
                    { width: '300', border: { width: 2, color: 'black' } }];
                chartObj1.primaryXAxis.valueType = 'DateTime';
                chartObj1.axes[0].labelFormat = '';
                chartObj1.primaryYAxis.labelFormat = '';
                chartObj1.loaded = loaded;
                chartObj1.refresh();
                data_spec_2.unbindResizeEvents(chartObj1);
            });
        });
    });
});
