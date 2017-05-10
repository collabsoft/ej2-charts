define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../base/data.spec"], function (require, exports, dom_1, chart_1, line_series_1, data_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries);
    describe('Chart Control', function () {
        describe('Chart direct properties and its behavior', function () {
            var chart;
            var ele;
            var svg;
            var text;
            var loaded;
            beforeAll(function () {
                ele = dom_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart();
                chart.appendTo('#container');
                data_spec_1.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking chart instance creation', function (done) {
                loaded = function (args) {
                    expect(chart != null).toBe(true);
                    done();
                };
                chart.loaded = loaded;
            });
            it('Checking with empty options', function () {
                var className = document.getElementById('container').className;
                expect(className).toEqual('e-control e-chart e-touch');
            });
            it('Checking module name', function () {
                expect(chart.getModuleName()).toBe('chart');
            });
            it('Checking with empty size property', function () {
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width') != null).toBe(true);
            });
            it('Checking the null height of the chart', function () {
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('height')).toEqual('450');
            });
            it('Checking the null width of the chart', function (done) {
                chart.width = null;
                ele.setAttribute('style', 'width:0px');
                chart.loaded = function (args) {
                    svg = document.getElementById('container_svg');
                    expect(svg.getAttribute('width')).toEqual('600');
                    done();
                };
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('Checking the percentage size of the chart', function (done) {
                chart.width = '50%';
                ele.setAttribute('style', 'width:900px');
                chart.loaded = function (args) {
                    svg = document.getElementById('container_svg');
                    expect(svg.getAttribute('width')).toEqual('450');
                    done();
                };
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('Checking the width of the chart', function () {
                chart.width = '500';
                chart.loaded = null;
                chart.dataBind();
                data_spec_1.unbindResizeEvents(chart);
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width')).toEqual('500');
            });
            it('Checking the height of the chart', function () {
                chart.height = '500';
                chart.dataBind();
                data_spec_1.unbindResizeEvents(chart);
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('height')).toEqual('500');
            });
            it('Checking both height and width of the chart', function () {
                chart.width = '500';
                chart.height = '300';
                chart.dataBind();
                data_spec_1.unbindResizeEvents(chart);
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width')).toEqual('500');
                expect(svg.getAttribute('height')).toEqual('300');
            });
            it('Checking with empty title', function () {
                text = document.getElementById('container_ChartTitle');
                expect(text == null).toBe(true);
            });
            it('Checking with  title', function () {
                chart.title = 'Syncfusion Chart Title';
                chart.dataBind();
                data_spec_1.unbindResizeEvents(chart);
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent == 'Syncfusion Chart Title').toBe(true);
                expect(text.getAttribute('y')).toEqual('25');
            });
            it('Checking the title font size', function () {
                chart.title = 'Chart Title';
                chart.titleStyle.size = '24px';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.getAttribute('font-size')).toEqual('24px');
            });
            it('Checking the border color', function () {
                chart.border.width = 2;
                chart.border.color = 'green';
                chart.dataBind();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('stroke') == 'green').toBe(true);
                expect(svg.getAttribute('stroke-width') == '2').toBe(true);
            });
            it('Checking the Chart Area border color', function () {
                chart.chartArea.border.color = 'red';
                chart.chartArea.background = 'green';
                chart.chartArea.opacity = 0.5;
                chart.dataBind();
                svg = document.getElementById('container_ChartAreaBorder');
                expect(svg.getAttribute('stroke') == 'red').toBe(true);
                expect(svg.getAttribute('fill') == 'green').toBe(true);
                expect(svg.getAttribute('opacity') == '0.5').toBe(true);
            });
            it('Checking the Chart background', function () {
                chart.background = 'yellow';
                chart.dataBind();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('fill') == 'yellow').toBe(true);
            });
            it('Checking context menu event', function () {
                var menu = document.createEvent('MouseEvent');
                menu.initEvent('contextmenu', true, false);
                ele.dispatchEvent(menu);
                expect(ele).not.toBe(null);
            });
        });
    });
});
