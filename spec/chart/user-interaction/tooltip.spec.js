define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/bar-series", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/series/marker", "../base/data.spec", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, column_series_1, bar_series_1, tooltip_1, marker_1, data_spec_1, date_time_axis_1, category_axis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, marker_1.Marker, column_series_1.ColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category, bar_series_1.BarSeries);
    chart_1.Chart.Inject(tooltip_1.Tooltip);
    var data = data_spec_1.tooltipData1;
    var data2 = data_spec_1.tooltipData2;
    describe('Chart Control', function () {
        describe('Chart Tooltip', function () {
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
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                            marker: {
                                shape: 'Circle', visible: true, width: 10, height: 10, opacity: 1,
                                border: { width: 1, color: 'null' }
                            }
                        }], width: '800',
                    tooltip: { enable: true, fill: 'rgba(247,247,247,0.85)', textStyle: { size: '12px' }, format: '${series.name} : ${point.x} <br/> : ${point.y}' },
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Default Tooltip', function (done) {
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var text2 = group.childNodes[2];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 3).toBe(true);
                    expect(text1.textContent == 'ChartSeriesNameGold : $2000.00 ').toBe(true);
                    expect(text2.textContent == ' : 40').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
            });
            it('Edge Tooltip', function () {
                targetElement = chartObj.element.querySelector('#container_Series_0_Point_0_Symbol');
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                var tooltip = document.getElementById('container_tooltip');
                expect(tooltip != null).toBe(true);
                var text2 = tooltip.childNodes[0].childNodes[0].childNodes[2];
                var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                expect(text2.textContent == ' : 70').toBe(true);
                var trackSymbol = document.getElementById('containerSymbolGroup0').lastChild;
                expect(trackSymbol != null).toBe(true);
                targetElement = chartObj.element.querySelector('#container_Series_0_Point_7_Symbol');
                y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft - 1;
                trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                expect(text1.textContent == 'ChartSeriesNameGold : $8000.00 ').toBe(true);
            });
            it('Column Tooltip', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.top) > series.points[2].region.y + parseFloat(chartArea.getAttribute('y')));
                    target = document.getElementById('container_Series_0_Point_0');
                    y = series.points[0].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[0].region.x + series.points[0].region.width / 2 + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[0].region.width / 2 + series.points[0].region.x + parseFloat(chartArea.getAttribute('x')));
                    target = document.getElementById('container_Series_0_Point_7');
                    y = series.points[7].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Column';
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Tooltip for Negative point', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    y = series.points[1].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.top) < series.points[1].region.height + series.points[1].region.y + parseFloat(chartArea.getAttribute('y')));
                    target = document.getElementById('container_Series_0_Point_5');
                    y = series.points[5].region.y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[5].region.x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.top) > series.points[5].region.height + series.points[5].region.y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chartObj.loaded = loaded;
                data[1].y = -40;
                data[5].y = -20;
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Remove Column Tooltip', function (done) {
                var animate = function (args) {
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip == null).toBe(true);
                    done();
                };
                chartObj.animationComplete = animate;
                chartObj.dataBind();
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + 200 + elem.offsetTop;
                x = parseFloat(chartArea.getAttribute('width')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mouseleaveEvent(elem, Math.ceil(x), Math.ceil(y));
            });
            it('Tooltip for Category Axis', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent == 'ChartSeriesNameGold : 7000 ').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].type = 'Line';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Tooltip Without marker', function (done) {
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = chartObj.series[0].points[4].symbolLocation.y;
                    x = chartObj.series[0].points[4].symbolLocation.x;
                    y += parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x += parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent == 'ChartSeriesNameGold : 5000 ').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].marker.height = 5;
                chartObj.series[0].marker.width = 5;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Tooltip for datetime Axis', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent == 'ChartSeriesNameGold : Apr 2006 ').toBe(true);
                    dom_1.remove(document.getElementById('container_tooltip'));
                    dom_1.remove(document.getElementById('container_Series_0_Point_3_Trackball'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryXAxis.labelFormat = '';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.series[0].marker.visible = true;
                chartObj.height = '470';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Changing the visibility of tooltip', function (done) {
                var target;
                var tooltip;
                loaded = function (args) {
                    target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Changing the visibility of tooltip with axis label format', function (done) {
                var target;
                var tooltip;
                loaded1 = function (args) {
                    target = document.getElementById('container_Series_0_Point_2_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(path.getAttribute('fill') == 'pink').toBe(true);
                    expect(text1.getAttribute('fill') == 'red').toBe(true);
                    expect(text1.textContent == '#3000 : 70C').toBe(true);
                    expect(document.getElementById('container_Series_0_Point_2_Trackball').getAttribute('fill') == 'blue').toBe(true);
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y + 50));
                    done();
                };
                chartObj.loaded = loaded1;
                chartObj.tooltip.enable = true;
                chartObj.tooltip.fill = 'pink';
                chartObj.tooltip.textStyle.color = 'red';
                chartObj.tooltip.format = null;
                chartObj.primaryYAxis.labelFormat = '{value}C';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryXAxis.labelFormat = '#{value}';
                chartObj.series[0].dataSource = data;
                chartObj.series[0].marker.fill = 'blue';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with template', function (done) {
                var tooltip;
                dom_1.remove(document.getElementById('container_tooltip'));
                loaded1 = function (args) {
                    var target;
                    target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + 200 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('width')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mouseleaveEvent(elem, Math.ceil(x), Math.ceil(y));
                };
                var animate = function (args) {
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip == null).toBe(true);
                    done();
                };
                chartObj.tooltip.template = '<div>${x}</div><div>${y}</div>';
                chartObj.title = 'Template';
                chartObj.loaded = loaded1;
                chartObj.animationComplete = animate;
                chartObj.dataBind();
            });
            it('Checking with inverted axis series', function (done) {
                var tooltip;
                loaded1 = function (args) {
                    trigger.mousemovetEvent(elem, 400, 105);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    trigger.mousemovetEvent(elem, 300, 170);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded1;
                chartObj.series = [{ type: 'Bar', dataSource: data, xName: 'x', yName: 'y', animation: { enable: false },
                    }, { type: 'Bar', dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false } }];
                chartObj.animationComplete = null;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
    });
});
