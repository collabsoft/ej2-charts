define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/area-series", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/series/column-series", "../../../src/chart/series/data-label", "../../../src/chart/series/bar-series", "../../../src/chart/user-interaction/zooming", "../../../src/chart/legend/legend", "../../../src/chart/series/marker", "../base/data.spec", "../base/data.spec", "../base/events.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, area_series_1, category_axis_1, date_time_axis_1, column_series_1, data_label_1, bar_series_1, zooming_1, legend_1, marker_1, data_spec_1, data_spec_2, events_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, data_label_1.DataLabel, area_series_1.AreaSeries, category_axis_1.Category, date_time_axis_1.DateTime, marker_1.Marker, column_series_1.ColumnSeries, legend_1.Legend, bar_series_1.BarSeries, zooming_1.Zoom);
    var data = data_spec_1.tooltipData1;
    var data2 = data_spec_1.tooltipData2;
    var prevent = function () {
    };
    var trigger = new events_spec_1.MouseEvents();
    exports.categoryData = [{ x: 'USA', y: 50 }, { x: 'China', y: 40 },
        { x: 'Japan', y: 70 }, { x: 'Australia', y: 60 },
        { x: 'France', y: 50 }, { x: 'Germany', y: 80 },
        { x: 'Italy', y: 40 }, { x: 'Sweden', y: 30 }];
    exports.categoryData1 = [{ x: 'USA', y: 70 }, { x: 'China', y: 60 },
        { x: 'Japan', y: 60 }, { x: 'Australia', y: 56 },
        { x: 'France', y: 45 }, { x: 'Germany', y: 30 },
        { x: 'Italy', y: 35 }, { x: 'Sweden', y: 25 }];
    describe('Chart Control', function () {
        var chartObj;
        var targetElement;
        var firstElement;
        var resetElement;
        var loaded;
        var loaded1;
        var x;
        var path;
        var y;
        var dragEle;
        var mouseMove;
        var instance;
        var mouseUp;
        describe('Default Zooming Selection', function () {
            var elem = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'n1', zoomFactor: 0.1 },
                    primaryYAxis: { title: 'PrimaryYAxis', labelFormat: 'n1', rangePadding: 'None' },
                    series: [{
                            type: 'Line',
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                            marker: {
                                visible: false
                            }
                        }],
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    width: '800',
                    zoomSettings: { enableSelectionZooming: false }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                dom_1.remove(elem);
            });
            it('Checking default selection zooming', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 200, 200, 350, 350);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement == null).toBe(true);
                    chartObj.primaryXAxis.zoomFactor = 1;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking default selection zooming', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 200, 200, 350, 350);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(document.getElementById('container0_AxisLabel_0').textContent == '2200.0').toBe(true);
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enableSelectionZooming = true;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Selection zooming - false', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 200, 200, 350, 350);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(document.getElementById('container0_AxisLabel_0').textContent != '2200.0').toBe(true);
                    expect(resetElement == null).toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableSelectionZooming = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking rect size', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.dragEvent(elem, 300, 300, 350, 350);
                    targetElement = document.getElementById('container_ZoomArea');
                    expect(targetElement.getAttribute('width') == '50');
                    expect(targetElement.getAttribute('height') == '50');
                    expect(targetElement.getAttribute('fill') == 'rgba(69,114,167,0.25)');
                    expect(targetElement.getAttribute('stroke') == 'rgba(69,114,167,0.25)');
                    trigger.mouseLeaveEvent(elem);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.zoomSettings.enableSelectionZooming = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking series path', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 200, 200, 350, 350);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(document.getElementById('container_Series_0').getAttribute('d') != '').toBe(true);
                    trigger.draganddropEvent(elem, 200, 200, 300, 300);
                    path = document.getElementById('container_Series_0').getAttribute('d');
                    expect((path.match(/M/g) || []).length == 1).toBe(true);
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking zoom position and zoom factor', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking mouse cursor', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.mousedownEvent(elem, 100, 100, 150, 150);
                    trigger.mousemoveEvent(elem, 100, 100, 150, 150);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement == null).toBe(true);
                    trigger.mouseupEvent(elem, 100, 100, 150, 150);
                    targetElement = document.getElementById('container_svg');
                    expect(targetElement.getAttribute('cursor') != 'crosshair').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking selection zooming in toolkit', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 200, 200, 350, 350);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    trigger.dragEvent(targetElement, 10, 10, -400, 300);
                    resetElement = document.getElementById('container_ZoomArea');
                    expect(resetElement == null).toBe(true);
                    trigger.mousedownEvent(document.getElementById('container_Zooming_Reset'), 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking selection zooming upTo bottom of the axis line', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 380.5);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.00').toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('checking selection zooming upTo outside of the axis line', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 880.5);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.00').toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking selection zooming with multiple axes', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 880.5);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.00').toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.rows = [{ height: '50%' }, { height: '50%' }];
                chartObj.columns = [{ width: '50%' }, { width: '50%' }];
                chartObj.axes = [
                    { name: 'xAxis1', rowIndex: 0, columnIndex: 1, },
                    { name: 'xAxis2', rowIndex: 1, columnIndex: 0, opposedPosition: true },
                    { name: 'xAxis3', rowIndex: 1, columnIndex: 1, opposedPosition: true },
                    { name: 'yAxis1', rowIndex: 0, columnIndex: 1, opposedPosition: true },
                    { name: 'yAxis2', rowIndex: 1, columnIndex: 0 },
                    { name: 'yAxis3', rowIndex: 1, columnIndex: 1, opposedPosition: true }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking rect size outside of the area', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.dragEvent(elem, 30, 30, 50, 50);
                    targetElement = document.getElementById('container_ZoomArea');
                    expect(targetElement == null).toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableSelectionZooming = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Checking Zooming Toolkit', function () {
            var elem = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'n1' },
                    primaryYAxis: { title: 'PrimaryYAxis', labelFormat: 'n1', rangePadding: 'None' },
                    series: [{
                            type: 'Line',
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                            marker: {
                                visible: false
                            }
                        }],
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    width: '800',
                    zoomSettings: { enablePinchZooming: true, enableSelectionZooming: true }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Selection zooming - checking toolkit elements', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length == 8).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Selection zooming - empty toolbar items', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement == null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement == null).toBe(true);
                    done();
                };
                chartObj.zoomSettings.toolbarItems = [];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Selection zooming - shown single item Reset', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement != null).toBe(true);
                    path = targetElement.getAttribute('transform');
                    expect(path == 'translate(759,40.25)').toBe(true);
                    done();
                };
                chartObj.zoomSettings.toolbarItems = ['Reset'];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Selection zooming - shown Reset and zoom', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Zoom');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement != null).toBe(true);
                    path = resetElement.getAttribute('transform');
                    expect(path == 'translate(31,5)').toBe(true);
                    done();
                };
                chartObj.zoomSettings.toolbarItems = ['Reset', 'Zoom'];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Selection zooming - shown Reset and pan', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Pan');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement != null).toBe(true);
                    path = resetElement.getAttribute('transform');
                    expect(path == 'translate(31,5)').toBe(true);
                    done();
                };
                chartObj.zoomSettings.toolbarItems = ['Reset', 'Pan'];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Selecting Pan button', function (done) {
                chartObj.loaded = null;
                targetElement = document.getElementById('container_Zooming_Pan');
                trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                targetElement = document.getElementById('container_Zooming_Pan_2');
                expect(targetElement.getAttribute('fill') == '#ff4081').toBe(true);
                done();
            });
            it('Selection zooming - shown zoom in', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    targetElement = document.getElementById('container_Zooming_ZoomIn');
                    expect(targetElement != null).toBe(true);
                    expect(targetElement.getAttribute('opacity') == '0.2').toBe(true);
                    done();
                };
                chartObj.zoomSettings.toolbarItems = ['Reset', 'Pan', 'ZoomIn'];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Selection zooming - shown zoom out', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    targetElement = document.getElementById('container_Zooming_ZoomOut');
                    expect(targetElement != null).toBe(true);
                    expect(targetElement.getAttribute('opacity') == '0.2').toBe(true);
                    done();
                };
                chartObj.zoomSettings.toolbarItems = [
                    'Reset',
                    'Pan',
                    'ZoomIn',
                    'ZoomOut',
                    'Zoom'
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Selection zooming - Clicking zoom Button', function (done) {
                chartObj.loaded = null;
                targetElement = document.getElementById('container_Zooming_Zoom_3');
                path = targetElement.getAttribute('fill');
                trigger.mousedownEvent(document.getElementById('container_Zooming_Zoom'), 0, 0, 5, 5);
                targetElement = document.getElementById('container_Zooming_Zoom_3');
                expect(targetElement.getAttribute('fill') == '#ff4081').toBe(true);
                targetElement = document.getElementById('container_Zooming_Pan_2');
                expect(targetElement.getAttribute('fill') == path).toBe(true);
                done();
            });
            it('Checking Tooltip - Zoom Kit', function (done) {
                chartObj.loaded = null;
                targetElement = document.getElementById('container_Zooming_KitCollection');
                trigger.mousemoveEvent(targetElement, 0, 0, 5, 5);
                expect(targetElement.getAttribute('opacity') != '0.1').toBe(true);
                done();
            });
            it('Checking tooltip div', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    trigger.mousemoveEvent(targetElement, 0, 0, 5, 5);
                    targetElement = document.getElementById('container_Zooming_Zoom');
                    trigger.mouseoverEvent(targetElement);
                    expect(document.getElementById('EJ2_Chart_ZoomTip') != null);
                    trigger.mouseoutEvent(targetElement);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking zoom Tooltip text', function (done) {
                chartObj.loaded = null;
                targetElement = document.getElementById('container_Zooming_KitCollection');
                trigger.mousemoveEvent(targetElement, 0, 0, 5, 5);
                targetElement = document.getElementById('container_Zooming_Zoom');
                trigger.mouseoverEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement != null).toBe(true);
                expect(firstElement.textContent.indexOf('Zoom') == 1).toBe(true);
                trigger.mouseoutEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement == null).toBe(true);
                done();
            });
            it('Checking pan Tooltip text', function (done) {
                chartObj.loaded = null;
                targetElement = document.getElementById('container_Zooming_KitCollection');
                trigger.mousemoveEvent(targetElement, 0, 0, 5, 5);
                targetElement = document.getElementById('container_Zooming_Pan');
                trigger.mouseoverEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement != null).toBe(true);
                expect(firstElement.textContent.indexOf('Pan') == 1).toBe(true);
                trigger.mouseoutEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement == null).toBe(true);
                done();
            });
            it('Checking ZoomIn Tooltip text', function (done) {
                chartObj.loaded = null;
                targetElement = document.getElementById('container_Zooming_KitCollection');
                trigger.mousemoveEvent(targetElement, 0, 0, 5, 5);
                targetElement = document.getElementById('container_Zooming_ZoomIn');
                trigger.mouseoverEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement != null).toBe(true);
                expect(firstElement.textContent.indexOf('ZoomIn') == 1).toBe(true);
                trigger.mouseoutEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement == null).toBe(true);
                done();
            });
            it('Checking ZoomOut Tooltip text', function (done) {
                chartObj.loaded = null;
                targetElement = document.getElementById('container_Zooming_KitCollection');
                trigger.mousemoveEvent(targetElement, 0, 0, 5, 5);
                targetElement = document.getElementById('container_Zooming_ZoomOut');
                trigger.mouseoverEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement != null).toBe(true);
                expect(firstElement.textContent.indexOf('ZoomOut') == 1).toBe(true);
                trigger.mouseoutEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement == null).toBe(true);
                done();
            });
            it('Checking Reset Tooltip text', function (done) {
                chartObj.loaded = null;
                targetElement = document.getElementById('container_Zooming_KitCollection');
                trigger.mousemoveEvent(targetElement, 0, 0, 5, 5);
                targetElement = document.getElementById('container_Zooming_Reset');
                trigger.mouseoverEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement != null).toBe(true);
                expect(firstElement.textContent.indexOf('Reset') == 1).toBe(true);
                trigger.mouseoutEvent(targetElement);
                firstElement = document.getElementById('EJ2_Chart_ZoomTip');
                expect(firstElement == null).toBe(true);
                done();
            });
        });
        describe('Checking Panning', function () {
            var elem = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category' },
                    primaryYAxis: { title: 'PrimaryYAxis', labelFormat: 'n1', rangePadding: 'None' },
                    series: [{
                            type: 'Area',
                            dataSource: exports.categoryData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: '#A569BD',
                            marker: {
                                visible: true, width: 10, height: 10, dataLabel: { visible: false, fill: '' }
                            }
                        }, {
                            type: 'Line', width: 4,
                            dataSource: exports.categoryData1, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: '#F5B041',
                            marker: {
                                visible: true, width: 10, height: 10, dataLabel: { visible: false, fill: '' }
                            }
                        }],
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    width: '800',
                    zoomSettings: { enablePinchZooming: true, enableSelectionZooming: true }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking Pan Button', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length == 8).toBe(true);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    targetElement = document.getElementById('container_Zooming_Pan_2');
                    expect(targetElement.getAttribute('fill') == '#ff4081').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking chart cursor', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    targetElement = document.getElementById('container_svg');
                    firstElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.getAttribute('cursor') == 'pointer').toBe(true);
                    expect(firstElement.getAttribute('cursor') == 'auto').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking chart cursor default', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    resetElement = document.getElementById('container_Zooming_Reset');
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    targetElement = document.getElementById('container_svg');
                    expect(targetElement.getAttribute('cursor') == 'auto').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Pan', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.draganddropEvent(elem, 400, 200, -200, 200);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.38').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Pan with mode X', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.draganddropEvent(elem, 400, 200, -200, 200);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.55').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.mode = 'X';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Pan with mode Y', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.draganddropEvent(elem, 400, 200, -200, 200);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.18').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.mode = 'Y';
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Pan with bar', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.draganddropEvent(elem, 400, 200, -200, 200);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.58').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.18').toBe(true);
                    done();
                };
                chartObj.series[0].type = 'Bar';
                chartObj.series[1].type = 'Bar';
                chartObj.zoomSettings.mode = 'XY';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Pan axis Labels start and end', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.dragEvent(elem, 400, 200, -200, 200);
                    expect(document.getElementById('container_Zoom_0_AxisLabel_0').textContent == 'France').toBe(true);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.series[0].type = 'Area';
                chartObj.series[1].type = 'Line';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking deferred panning', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 650, 500);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.dragEvent(elem, 400, 200, -200, 200);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(1) == '0.8').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(1) == '0.8').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(1) == '0.2').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    trigger.mouseupEvent(elem, 400, 200, -200, 200);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(1) == '0.8').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(1) == '0.8').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(1) == '0.2').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.zoomSettings.enableDeferredZooming = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking touch panning', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 450, 400);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    targetElement = document.getElementById('container_ChartAreaBorder');
                    chartObj.chartOnMouseDown(trigger.onTouchStart(targetElement, 608, 189, null, null, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(targetElement, 728, 389, null, null, 404, 189));
                    chartObj.mouseEnd(trigger.onTouchEnd(targetElement, 728, 389, null, null, 404, 189));
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.49').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.10').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking deferred panning with outside of the area', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 450, 400);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.dragEvent(elem, 400, 200, -200, 1200);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(1) == '0.5').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(1) == '0.8').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(1) == '0.4').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(1) == '0.2').toBe(true);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking Panning with datetime axis', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.03').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.dragEvent(elem, 400, 200, -200, 200);
                    expect(document.getElementById('container_Zoom_0_AxisLabel_0') == null).toBe(true);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.42').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.38').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        type: 'Column',
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'ChartSeriesNameGold', fill: '#A569BD',
                        marker: {
                            visible: true, width: 10, height: 10, dataLabel: { visible: false, fill: '' }
                        }
                    }];
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.zoomSettings.enableDeferredZooming = false;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Checking zoomIn and zoomOut', function () {
            var elem = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis', labelFormat: 'n1', rangePadding: 'None' },
                    series: [{
                            type: 'Column',
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: '#A569BD',
                            marker: {
                                visible: true, width: 10, height: 10, dataLabel: { visible: false, fill: '' }
                            }
                        }, {
                            type: 'Column', width: 4,
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: '#F5B041',
                            marker: {
                                visible: true, width: 10, height: 10, dataLabel: { visible: false, fill: '' }
                            }
                        }],
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    width: '600',
                    zoomSettings: { enablePinchZooming: true, enableSelectionZooming: true }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking default zooming ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 600, 800);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking ZoomIn ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    targetElement = document.getElementById('container_Zooming_ZoomIn');
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.95').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.05').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.77').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.68').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.14').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.07').toBe(true);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking ZoomOut ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 600, 800);
                    targetElement = document.getElementById('container_Zooming_ZoomOut');
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.95').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.82').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.05').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    expect(chartObj.primaryXAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition == 0).toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Checking mode', function () {
            var elem = dom_1.createElement('div', { id: 'container' });
            var factor;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis', labelFormat: 'n1', rangePadding: 'None' },
                    series: [{
                            type: 'Column',
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Silver', fill: '#A569BD',
                            marker: {
                                visible: true, width: 10, height: 10, dataLabel: { visible: false, fill: '' }
                            }
                        }, {
                            type: 'Column', width: 4,
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Gold', fill: '#F5B041',
                            marker: {
                                visible: true, width: 10, height: 10, dataLabel: { visible: false, fill: '' }
                            }
                        }],
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    width: '900',
                    zoomSettings: { enableSelectionZooming: true, mode: 'X', enablePinchZooming: true }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking zoom in while panning ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 600, 800);
                    factor = chartObj.primaryXAxis.zoomFactor;
                    targetElement = document.getElementById('container_Zooming_Pan');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    targetElement = document.getElementById('container_Zooming_ZoomIn');
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    expect(chartObj.primaryXAxis.zoomFactor == factor).toBe(true);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking zoom in with mode X ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 600, 800);
                    targetElement = document.getElementById('container_Zooming_ZoomIn');
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.32').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '1.00').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.17').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking zoom in with mode Y ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 600, 800);
                    targetElement = document.getElementById('container_Zooming_ZoomIn');
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    trigger.mousedownEvent(targetElement, 0, 0, 5, 5);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '1.00').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.37').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.00').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.23').toBe(true);
                    done();
                };
                chartObj.zoomSettings.mode = 'Y';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Checking Mouse Wheel', function () {
            var elem = dom_1.createElement('div', { id: 'container' });
            var wheelArgs;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis', labelFormat: 'n1', rangePadding: 'None' },
                    series: [{
                            type: 'Line',
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Silver', fill: '#A569BD'
                        }],
                    zoomSettings: { enableSelectionZooming: true, enablePinchZooming: true },
                    width: '900',
                    height: '400'
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking mouse wheel as false ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 3,
                        clientX: 210,
                        clientY: 100
                    };
                    chartObj.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition == 0).toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking mouse wheel as forward ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 3,
                        clientX: 210,
                        clientY: 100
                    };
                    chartObj.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.80').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.80').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.05').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.14').toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking mouse wheel as backward ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: -120,
                        detail: 3,
                        clientX: 310,
                        clientY: 100
                    };
                    chartObj.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition == 0).toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking mouse wheel with pointer as false with backward ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var isPointer = chartObj.zoomModule.isPointer;
                    var browserName = chartObj.zoomModule.browserName;
                    chartObj.zoomModule.browserName = 'mozilla';
                    chartObj.zoomModule.isPointer = false;
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: -120,
                        detail: 3,
                        clientX: 410,
                        clientY: 100
                    };
                    chartObj.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition == 0).toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    chartObj.zoomModule.isPointer = isPointer;
                    chartObj.zoomModule.browserName = browserName;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking mouse wheel with pointer as false with forward ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var isPointer = chartObj.zoomModule.isPointer;
                    chartObj.zoomModule.isPointer = false;
                    var browserName = chartObj.zoomModule.browserName;
                    chartObj.zoomModule.browserName = 'mozilla';
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: -120,
                        detail: -3,
                        clientX: 210,
                        clientY: 100
                    };
                    chartObj.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.80').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.80').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.05').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.14').toBe(true);
                    chartObj.zoomModule.isPointer = isPointer;
                    chartObj.zoomModule.browserName = browserName;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking mouse wheel as forward with mode x ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 3,
                        clientX: 210,
                        clientY: 100
                    };
                    chartObj.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.67').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.80').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.08').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.14').toBe(true);
                    done();
                };
                chartObj.zoomSettings.mode = 'X';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking mouse wheel as forward with mode y ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 3,
                        clientX: 210,
                        clientY: 100
                    };
                    chartObj.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.67').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.67').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.08').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.23').toBe(true);
                    done();
                };
                chartObj.zoomSettings.mode = 'Y';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking zooming toolkit', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length == 8).toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Checking Pinch Zooming', function () {
            var elem = dom_1.createElement('div', { id: 'container' });
            var areaElement;
            var wheelArgs;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis', labelFormat: 'n1', rangePadding: 'None' },
                    series: [{
                            type: 'Line',
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Silver', fill: '#A569BD', marker: { visible: true, dataLabel: { visible: true } }
                        }],
                    zoomSettings: { enableSelectionZooming: true, enablePinchZooming: true },
                    width: '900',
                    height: '400'
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking pinch zooming with label', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    areaElement = document.getElementById('container_ChartAreaBorder');
                    chartObj.chartOnMouseDown(trigger.onTouchStart(areaElement, 608, 189, 504, 289, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 728, 389, 404, 289, 404, 189));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 748, 129, 304, 289, 304, 289));
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.23').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.63').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.46').toBe(true);
                    expect(document.getElementById('containerTextGroup0').getAttribute('visibility') == 'hidden').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking pinch pan enable and toolkit', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    expect(chartObj.zoomModule.isPanning).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length == 8).toBe(true);
                    targetElement = document.getElementById('container_Zooming_Pan_2');
                    expect(targetElement.getAttribute('fill') == '#ff4081').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking mouse hover and leave the toolkit', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    trigger.mousemoveEvent(targetElement, 0, 0, 5, 5);
                    expect(targetElement.getAttribute('opacity') == '1').toBe(true);
                    trigger.mouseLeaveEvent(targetElement);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking reset element double tap', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.doDoubleTab(areaElement, 608, 189, 504, 289, 504, 289, chartObj);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement == null).toBe(true);
                    expect(chartObj.primaryXAxis.zoomFactor == 1).toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking reset element double tap outside of the area', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 600, 800);
                    trigger.doDoubleTab(areaElement, 608, 189, 504, 325, 504, 325, chartObj);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    expect(chartObj.primaryXAxis.zoomFactor != 1).toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor != 1).toBe(true);
                    trigger.doDoubleTab(areaElement, 608, 189, 504, 289, 504, 289, chartObj);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking pinch zooming with mode X', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    areaElement = document.getElementById('container_ChartAreaBorder');
                    chartObj.chartOnMouseDown(trigger.onTouchStart(areaElement, 608, 189, 504, 289, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 728, 389, 404, 289, 404, 189));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 748, 129, 304, 289, 304, 289));
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.23').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '1.00').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.46').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition == 0).toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    trigger.doDoubleTab(areaElement, 608, 189, 504, 289, 504, 289, chartObj);
                    done();
                };
                chartObj.zoomSettings.mode = 'X';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking pinch zooming with mode Y', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    areaElement = document.getElementById('container_ChartAreaBorder');
                    chartObj.chartOnMouseDown(trigger.onTouchStart(areaElement, 608, 189, 504, 289, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 728, 389, 404, 289, 404, 189));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 748, 129, 304, 289, 304, 289));
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '1.00').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.63').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.00').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.03').toBe(true);
                    expect(document.getElementById('container_Zoom_0_AxisLabel_0') == null).toBe(true);
                    expect(document.getElementById('container_Zoom_0_AxisLabel_1') == null).toBe(true);
                    expect(document.getElementById('container_Zoom_1_AxisLabel_0').textContent == '12.6').toBe(true);
                    expect(document.getElementById('container_Zoom_1_AxisLabel_1').textContent == '62.6').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    trigger.doDoubleTab(areaElement, 608, 189, 504, 289, 504, 289, chartObj);
                    done();
                };
                chartObj.zoomSettings.mode = 'Y';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking pinch zooming toolkit in mobile device', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    areaElement = document.getElementById('container_ChartAreaBorder');
                    chartObj.zoomModule.isDevice = true;
                    chartObj.chartOnMouseDown(trigger.onTouchStart(areaElement, 608, 189, 504, 289, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 728, 389, 404, 289, 404, 189));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 748, 129, 304, 289, 304, 289));
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length == 4).toBe(true);
                    chartObj.isTouch = true;
                    trigger.doDoubleTab(areaElement, 608, 189, 504, 289, 504, 289, chartObj);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking pinch zooming with Pointer ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    areaElement = document.getElementById('container_ChartAreaBorder');
                    chartObj.chartOnMouseDown(trigger.onPointerStart(areaElement, 608, 189, 25));
                    chartObj.chartOnMouseDown(trigger.onPointerStart(areaElement, 504, 289, 26));
                    chartObj.mouseMove(trigger.onPointerMove(areaElement, 728, 389, 25));
                    chartObj.mouseMove(trigger.onPointerMove(areaElement, 404, 289, 26));
                    chartObj.mouseMove(trigger.onPointerMove(areaElement, 768, 399, 25));
                    chartObj.mouseMove(trigger.onPointerMove(areaElement, 304, 289, 26));
                    expect(document.getElementById('container_Zoom_1_AxisLabel_0').textContent == '10.0').toBe(true);
                    chartObj.mouseLeave(trigger.onPointerLeave(areaElement, 768, 399, 25));
                    chartObj.mouseLeave(trigger.onPointerLeave(areaElement, 304, 289, 26));
                    trigger.doDoubleTab(areaElement, 608, 189, 504, 289, 504, 289, chartObj);
                    done();
                };
                chartObj.zoomSettings.mode = 'XY';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
        });
        describe('Checking touch and device ', function () {
            var elem = dom_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryYAxis: { rangePadding: 'None' },
                    series: [{
                            type: 'Line',
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                            marker: {
                                visible: false
                            }
                        }],
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    width: '800',
                    zoomSettings: { enablePinchZooming: true, enableSelectionZooming: true }
                });
                chartObj.appendTo('#container');
                data_spec_2.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking touch', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length == 8).toBe(true);
                    chartObj.isTouch = true;
                    targetElement = document.getElementById('container_Zooming_Zoom');
                    trigger.mouseoverEvent(targetElement);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking zooming with legend visibility', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_chart_legend_text_series_' + 0);
                    trigger.clickEvent(targetElement);
                    expect(chartObj.series[0].visible).toBe(false);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length == 8).toBe(true);
                    chartObj.isTouch = true;
                    targetElement = document.getElementById('container_Zooming_Zoom');
                    trigger.mouseoverEvent(targetElement);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_2.unbindResizeEvents(chartObj);
            });
            it('Checking touch resize event', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    expect(document.getElementById('container_svg').getAttribute('width') == '800').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartResize({});
            });
            it('Checking touch resize event', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    expect(document.getElementById('container_svg').getAttribute('width') == '800').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartResize({});
            });
        });
    });
});
