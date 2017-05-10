define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/series/marker", "../base/data.spec", "../../../src/chart/axis/date-time-axis", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/axis/category-axis", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, column_series_1, crosshair_1, marker_1, data_spec_1, date_time_axis_1, tooltip_1, category_axis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker, column_series_1.ColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category);
    chart_1.Chart.Inject(crosshair_1.Crosshair, tooltip_1.Tooltip);
    describe('Chart Trackball', function () {
        describe('Chart Trackball Default', function () {
            var chartObj;
            var elem = dom_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var loaded1;
            var trigger = new data_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category', crosshairTooltip: { enable: true } },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', labelFormat: 'C', crosshairTooltip: { enable: true } },
                    series: [{
                            dataSource: data_spec_1.track1, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: '#B82E3D', width: 2,
                            type: 'Line', marker: { visible: true, height: 8, width: 8 },
                        }, {
                            dataSource: data_spec_1.track2, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'blue', width: 2,
                            type: 'Line', marker: { visible: true, height: 8, width: 8 },
                        },
                        {
                            dataSource: data_spec_1.track3, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'aqua', width: 2,
                            type: 'Line', marker: { visible: true, height: 8, width: 8 },
                        },
                        {
                            dataSource: data_spec_1.track4, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'red', width: 2,
                            type: 'Line', marker: { visible: true, height: 8, width: 8 },
                        }
                    ], width: '1000',
                    tooltip: { enable: true, shared: true, format: '${series.name} : ${point.x} <br/> : ${point.y}' },
                    crosshair: { enable: true },
                    title: 'Export', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
                dom_1.remove(document.getElementById('container_tooltip'));
            });
            it('Default Trackball with shared tooltip', function (done) {
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    var element1;
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var text2 = group.childNodes[2];
                    var text3 = group.childNodes[3];
                    var text4 = group.childNodes[5];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 9).toBe(true);
                    expect(text1.textContent == 'Japan : Feb ').toBe(true);
                    expect(text2.textContent == ' : -$1.00').toBe(true);
                    expect(text3.getAttribute('fill') == chartObj.series[1].fill).toBe(true);
                    expect(text4.getAttribute('fill') == chartObj.series[2].fill).toBe(true);
                    var trackSymbol = document.getElementById('containerSymbolGroup0').lastChild;
                    expect(trackSymbol.id.indexOf('Trackball') > 0).toBe(true);
                    trackSymbol = document.getElementById('containerSymbolGroup1').lastChild;
                    expect(trackSymbol.id.indexOf('Trackball') > 0).toBe(true);
                    trackSymbol = document.getElementById('containerSymbolGroup2').lastChild;
                    expect(trackSymbol.id.indexOf('Trackball') > 0).toBe(true);
                    trackSymbol = document.getElementById('containerSymbolGroup3').lastChild;
                    expect(trackSymbol.id.indexOf('Trackball') > 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('With Column type series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    var element1;
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d') == '').toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 2).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    expect(crosshair.childNodes[2].childNodes[1].textContent == 'Mar').toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 2).toBe(true);
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 5).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(document.getElementById('container_Series_1_Point_2').getAttribute('opacity') == '0.5').toBe(true);
                    expect(document.getElementById('container_Series_2_Point_2').getAttribute('opacity') == '0.5').toBe(true);
                    expect(document.getElementById('container_Series_3_Point_2').getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.series[0].type = 'Column';
                chartObj.series[1].type = 'Column';
                chartObj.series[2].type = 'Column';
                chartObj.series[3].type = 'Column';
                chartObj.primaryYAxis.crosshairTooltip.enable = false;
                chartObj.crosshair.lineType = 'Vertical';
                chartObj.tooltip.format = '${series.name} : ${point.x} : ${point.y}';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking the visibility of series with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_4');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetLeft > x).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    expect(group.childNodes.length == 4).toBe(true);
                    done();
                };
                chartObj.series[2].visible = false;
                chartObj.crosshair.lineType = 'Horizontal';
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking the with null points', function (done) {
                data_spec_1.track1[4].y = null;
                data_spec_1.track1[7].y = null;
                data_spec_1.track2[5].y = null;
                data_spec_1.track2[8].y = null;
                data_spec_1.track2[data_spec_1.track2.length - 1].y = null;
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_1_Point_4_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetLeft < x).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    expect(group.childNodes.length == 2).toBe(true);
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_11_Symbol');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft - 10;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.series = [];
                chartObj.series = [{
                        dataSource: data_spec_1.track1, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: '#B82E3D', width: 2,
                        type: 'Line', marker: { visible: true, height: 8, width: 8 },
                    }, {
                        dataSource: data_spec_1.track2, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: 'blue', width: 2,
                        type: 'Line', marker: { visible: true, height: 8, width: 8 },
                    }];
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking the areabounds', function (done) {
                var animate = function (args) {
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.crosshair.lineType = 'Both';
                chartObj.animationComplete = animate;
                chartObj.dataBind();
                targetElement = chartObj.element.querySelector('#container_Series_0_Point_0_Symbol');
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
            });
            it('Checking the single series', function (done) {
                data_spec_1.track1[4].y = 24;
                data_spec_1.track1[7].y = -16;
                data_spec_1.track2[5].y = 23;
                data_spec_1.track2[8].y = -11;
                data_spec_1.track2[data_spec_1.track2.length - 1].y = null;
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_0_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetLeft + elem.offsetLeft - 0.5 == x).toBe(true);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.series = [];
                chartObj.series = [{
                        dataSource: data_spec_1.track1, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: '#B82E3D', width: 2,
                        type: 'Line', marker: { visible: true, height: 8, width: 8 },
                    }];
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.tooltip.format = '${point.x}';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking the single series with column series', function (done) {
                data_spec_1.track1[4].y = 24;
                data_spec_1.track1[7].y = -16;
                data_spec_1.track2[5].y = 23;
                data_spec_1.track2[8].y = -11;
                data_spec_1.track2[data_spec_1.track2.length - 1].y = null;
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_7');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetTop < y + series.points[7].region.height).toBe(true);
                    target = document.getElementById('container_Series_0_Point_1');
                    series = chartObj.series[0];
                    y = series.points[1].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    done();
                };
                chartObj.series[0].type = 'Column';
                chartObj.loaded = loaded;
                chartObj.tooltipRender = function (args) {
                    args.textCollections[0] = args.textCollections[0] + 'custom';
                    if (args.point.index == 1) {
                        args.cancel = true;
                    }
                };
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.tooltip.format = '${point.y}';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Trigger Mouse Leave', function (done) {
                var animate = function (args) {
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip == null).toBe(true);
                    done();
                };
                chartObj.animationComplete = animate;
                chartObj.tooltipRender = null;
                chartObj.dataBind();
                var target = document.getElementById('container_Series_0_Point_2');
                var series = chartObj.series[0];
                chartObj.isTouch = false;
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                chartObj.isTouch = true;
                y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                target = document.getElementById('container_Series_0_Point_3');
                series = chartObj.series[0];
                y = series.points[3].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = series.points[3].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mouseupEvent(target, Math.ceil(x), Math.ceil(y));
                chartObj.isTouch = false;
                y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + 200 + elem.offsetTop;
                x = parseFloat(chartArea.getAttribute('width')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mouseleaveEvent(elem, Math.ceil(x), Math.ceil(y));
                chartObj.longPress();
            });
        });
    });
});
