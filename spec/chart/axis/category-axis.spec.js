define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/marker", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, line_series_1, marker_1, data_label_1, category_axis_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, category_axis_1.Category, marker_1.Marker, data_label_1.DataLabel);
    describe('Chart Control', function () {
        describe('Category Axis', function () {
            var chart;
            var ele;
            var loaded;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{ dataSource: data_spec_1.categoryData, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', animation: { enable: false } }],
                    height: '400', width: '900',
                    loaded: loaded, legendSettings: { visible: false }
                }, '#container');
                data_spec_2.unbindResizeEvents(chart);
            });
            afterAll(function () {
                data_spec_2.unbindResizeEvents(chart);
                chart.destroy();
                ele.remove();
            });
            it('Checking the Labels', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 8).toBe(true);
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'USA').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Sweden').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking with multiple series', function (done) {
                chart.series = [
                    { dataSource: data_spec_1.categoryData, xName: 'x', yName: 'y', name: 'Gold', fill: 'rgba(135,206,235,1)', animation: { enable: false } },
                    { dataSource: data_spec_1.categoryData1, xName: 'x', yName: 'y', name: 'Gold', fill: 'brown', animation: { enable: false } }
                ];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 10).toBe(true);
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'USA').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_9');
                    expect(svg.textContent == 'Germany1').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking labelPlacement', function (done) {
                chart.primaryXAxis.labelPlacement = 'OnTicks';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    var svg1 = document.getElementById('containerAxisLine_1');
                    expect(parseFloat(svg.getAttribute('x')) < parseFloat(svg1.getAttribute('x1'))).toBe(true);
                    done();
                };
                chart.loaded = loaded;
            });
            it('Checking edgelabelPlacement', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg == null).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.edgeLabelPlacement = 'Hide';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking edgelabelPlacement shift', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    expect(parseFloat(svg.getAttribute('x')) === parseFloat(chartArea.getAttribute('x'))).toBe(true);
                    svg = document.getElementById('container0_AxisLabel_9');
                    expect(parseFloat(svg.getAttribute('x')) < parseFloat(chartArea.getAttribute('width')) + parseFloat(chartArea.getAttribute('x')));
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.edgeLabelPlacement = 'Shift';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking the labels with category range', function (done) {
                chart.primaryXAxis.interval = 2;
                chart.primaryXAxis.edgeLabelPlacement = 'None';
                chart.axisLabelRender = function (args) {
                    args.text = args.text + 'cus';
                };
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 5).toBe(true);
                    expect(svg.childNodes[1].textContent.indexOf('cus') > -1).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking the Label intersect action with rotate45', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 10).toBe(true);
                    var element = svg.childNodes[1];
                    expect(element.getAttribute('transform').indexOf('rotate(45') > -1).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
                chart.primaryXAxis.labelIntersectAction = 'Rotate45';
                chart.primaryXAxis.interval = 1;
                chart.axisLabelRender = function (args) {
                    args.text = args.text + 'cus';
                };
                chart.width = '400';
                chart.dataBind();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking the Label intersect action with hide', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length != 10).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
                chart.primaryXAxis.labelIntersectAction = 'Hide';
                chart.axisLabelRender = function (args) {
                    args.text = args.text + 'cus';
                };
                chart.dataBind();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking the Label intersect action with rotate90', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 10).toBe(true);
                    var element = svg.childNodes[1];
                    expect(element.getAttribute('transform').indexOf('rotate(90') > -1).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                data_spec_2.unbindResizeEvents(chart);
                chart.primaryXAxis.labelIntersectAction = 'Rotate90';
                chart.axisLabelRender = function (args) {
                    args.text = args.text + 'cus';
                };
                chart.dataBind();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking the axis labels without data for series', function (done) {
                var trigger = new data_spec_1.MouseEvents();
                chart.primaryXAxis.interval = null;
                chart.primaryXAxis.crosshairTooltip.enable = true;
                chart.primaryYAxis.crosshairTooltip.enable = true;
                chart.series = [{ dataSource: null, name: 'Gold', fill: 'rgba(135,206,235,1)' }];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 0).toBe(true);
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 3 + ele.offsetTop;
                    var x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 3 + ele.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.crosshair.enable = true;
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking category axis with on ticks single point', function (done) {
                var trigger = new data_spec_1.MouseEvents();
                chart.primaryXAxis.interval = null;
                chart.primaryXAxis.labelPlacement = 'OnTicks';
                chart.primaryXAxis.crosshairTooltip.enable = true;
                chart.primaryYAxis.crosshairTooltip.enable = true;
                chart.series = [{ dataSource: [{ 'x': 'USA', 'y': 2.5 }], xName: 'x',
                        yName: 'y', name: 'Gold', fill: 'rgba(135,206,235,1)', marker: { visible: true, dataLabel: { visible: true } } }];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    expect(document.getElementById('container_Series_0_Point_0_Text').getAttribute('x') == '12.5').toBe(true);
                    expect(document.getElementById('containerAxisLabels0').childNodes.length == 1).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.crosshair.enable = true;
                data_spec_2.unbindResizeEvents(chart);
            });
            it('Checking category axis with zoom position', function (done) {
                var trigger = new data_spec_1.MouseEvents();
                chart.primaryXAxis.interval = null;
                chart.primaryXAxis.labelPlacement = 'BetweenTicks';
                chart.primaryXAxis.zoomPosition = 0.0018;
                chart.primaryXAxis.zoomFactor = 0.1317;
                chart.primaryXAxis.crosshairTooltip.enable = true;
                chart.primaryYAxis.crosshairTooltip.enable = true;
                chart.series = [{ dataSource: [{ 'x': 'USA', 'y': 2.5 }], xName: 'x',
                        yName: 'y', name: 'Gold', fill: 'rgba(135,206,235,1)' }];
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
                loaded = function (args) {
                    expect(document.getElementById('containerAxisLabels0').childNodes.length == 0).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.crosshair.enable = true;
                data_spec_2.unbindResizeEvents(chart);
            });
        });
    });
});
