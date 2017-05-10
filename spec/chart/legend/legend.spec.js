define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/series/marker", "../../../src/chart/series/line-series", "../../../src/chart/series/bar-series", "../../../src/chart/series/step-line-series", "../../../src/chart/series/area-series", "../../../src/chart/series/stacking-area-series", "../../../src/chart/series/column-series", "../../../src/chart/series/stacking-column-series", "../../../src/chart/series/scatter-series", "../../../src/chart/series/spline-series", "../../../src/chart/legend/legend", "../../../src/chart/user-interaction/selection", "../base/events.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, marker_1, line_series_1, bar_series_1, step_line_series_1, area_series_1, stacking_area_series_1, column_series_1, stacking_column_series_1, scatter_series_1, spline_series_1, legend_1, selection_1, events_spec_1, data_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, spline_series_1.SplineSeries, legend_1.Legend, marker_1.Marker, step_line_series_1.StepLineSeries, area_series_1.AreaSeries, stacking_area_series_1.StackingAreaSeries, stacking_column_series_1.StackingColumnSeries, column_series_1.ColumnSeries, scatter_series_1.ScatterSeries, bar_series_1.BarSeries, selection_1.Selection);
    var i;
    var currentPoint;
    var value = 0;
    var data = [];
    var seriesCollection = [];
    var colors = ['#663AB6', '#EB3F79', '#F8AB1D', '#B82E3D', '#049CB1', '#F2424F', '#C2C924', '#3DA046', '#074D67', '#02A8F4'];
    var toggle = true;
    for (var j = 0; j < 20; j++) {
        for (i = 0; i < 10; i++) {
            value = Math.random() * 100;
            currentPoint = { x: i, y: value };
            data.push(currentPoint);
        }
        if (j % 5 === 0 && j !== 0) {
            toggle = false;
        }
        else {
            toggle = true;
        }
        seriesCollection[j] = {
            name: 'Series ' + j, fill: colors[j % 9], dataSource: data,
            xName: 'x', yName: 'y',
            marker: { visible: true, shape: 'Circle' },
            animation: { enable: false },
            legendShape: 'SeriesType', visible: toggle,
            type: 'Line'
        };
        data = [];
    }
    describe('Chart Control Legend Checking', function () {
        var count = 0;
        var chartObj;
        var loaded;
        var legendRendering;
        var id = 'container1';
        var legendId = id + '_chart_legend';
        var legendElement;
        var trigger = new events_spec_1.MouseEvents();
        var ele = dom_1.createElement('div', { id: id });
        document.body.appendChild(ele);
        var series = [seriesCollection[0], seriesCollection[1], seriesCollection[2], seriesCollection[3], seriesCollection[4]];
        beforeAll(function () {
            chartObj = new chart_1.Chart({
                height: '400', width: '800', series: series,
                legendSettings: { border: { color: 'red' }, visible: true },
                primaryYAxis: { minimum: 0, maximum: 100 },
                primaryXAxis: { minimum: 0, maximum: 10 }
            });
            chartObj.appendTo(ele);
            data_spec_1.unbindResizeEvents(chartObj);
        });
        afterAll(function () {
            chartObj.destroy();
            document.getElementById(id).remove();
        });
        it('Single Series Static Name and Multiple series legend text', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_text_series_0');
                expect(legendElement.textContent).toEqual('SeriesOnetesting');
                for (var i_1 = 0, length_1 = chartObj.series.length; i_1 < length_1; i_1++) {
                    legendElement = document.getElementById(legendId + '_text_series_' + i_1);
                    expect(legendElement.textContent).toEqual(chartObj.series[i_1].name);
                }
                done();
            };
            chartObj.series[0].name = 'SeriesOnetesting';
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Height Only', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('height'), 10)).toEqual(100);
                done();
            };
            chartObj.legendSettings = { height: '100' };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Width Only', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('width'), 10)).toEqual(240);
                done();
            };
            chartObj.legendSettings = { width: '240', height: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Height and Width', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('width'), 10)).toEqual(240);
                expect(parseInt(legendElement.getAttribute('height'), 10)).toEqual(100);
                done();
            };
            chartObj.legendSettings = { height: '100', width: '240' };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Trimmed text and mouse over and out', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_text_series_0');
                trigger.mousemoveEvent(legendElement, 0, 0, 383, 309.25);
                var tooltip = document.getElementById('EJ2_legend_tooltip');
                expect(tooltip.textContent).toBe('Series one');
                expect(legendElement.textContent.split('...').length).toEqual(2);
                legendElement = document.getElementById(legendId + '_text_series_2');
                trigger.mousemoveEvent(legendElement, 0, 0, 383, 280);
                tooltip = document.getElementById('EJ2_legend_tooltip');
                expect(tooltip).toBe(null);
                legendElement = document.getElementById(legendId + '_text_series_1');
                trigger.mousemoveEvent(legendElement, 0, 0, 383, 332.25);
                tooltip = document.getElementById('EJ2_legend_tooltip');
                expect(tooltip.textContent).toBe('Series two');
                tooltip.remove();
                done();
            };
            chartObj.legendSettings = { width: '80' };
            chartObj.series[0].name = 'Series one';
            chartObj.series[1].name = 'Series two';
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Style fill, height, width', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                for (var i_2 = 0, length_2 = chartObj.series.length; i_2 < length_2; i_2++) {
                    legendElement = document.getElementById(legendId + '_shape_series_' + i_2);
                    if (i_2 % 5 === 0 && i_2 !== 0) {
                        expect(legendElement.getAttribute('fill')).toEqual('lightgray');
                    }
                    else {
                        expect(legendElement.getAttribute('fill')).toEqual(chartObj.series[i_2].fill);
                    }
                    expect(legendElement.getAttribute('d')).not.toEqual('');
                }
                done();
            };
            chartObj.legendSettings = {
                border: { color: 'red', width: 1 },
                shapePadding: 8, shapeHeight: 10, shapeWidth: 10,
                height: '100', width: '240',
                position: 'Right'
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Style font, background, padding', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                var legendgroup = document.getElementById(legendId + '_element');
                expect(legendgroup.getAttribute('fill')).toEqual('gray');
                legendElement = document.getElementById(legendId + '_shape_series_0');
                var d = legendElement.getAttribute('d').split(' ');
                expect(Number(d[7]) - Number(d[1])).toBe(10);
                expect(Number(d[8]) - Number(d[2])).toBe(10);
                legendElement = document.getElementById(legendId + '_text_series_0');
                expect(legendElement.getAttribute('x')).toEqual('34');
                expect(legendElement.getAttribute('font-size')).toEqual(chartObj.legendSettings.textStyle.size);
                expect(legendElement.getAttribute('fill')).toEqual(chartObj.legendSettings.textStyle.color);
                expect(parseFloat(legendElement.getAttribute('opacity'))).toEqual(chartObj.legendSettings.textStyle.opacity);
                expect(legendElement.getAttribute('font-style')).toEqual(chartObj.legendSettings.textStyle.fontStyle);
                expect(legendElement.getAttribute('font-family')).toEqual(chartObj.legendSettings.textStyle.fontFamily);
                expect(legendElement.getAttribute('font-weight')).toEqual(chartObj.legendSettings.textStyle.fontWeight);
                done();
            };
            chartObj.legendSettings = {
                shapePadding: 4, border: { color: 'red', width: 5 }, padding: 10,
                textStyle: {
                    size: '12px', color: 'Blue', opacity: 0.5, fontStyle: 'italic', fontFamily: 'Lucida Console',
                    fontWeight: 'bold'
                },
                background: 'gray', alignment: 'Near',
                position: 'Bottom',
            };
            chartObj.series[0].legendShape = 'Rectangle';
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Bottom Position', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(280);
                expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(290);
                done();
            };
            chartObj.legendSettings = {
                position: 'Bottom', alignment: 'Center',
                width: '240'
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Custom X and Y Position', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                var container = document.getElementById(id + '_svg');
                expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(100);
                expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(100);
                done();
            };
            chartObj.legendSettings = {
                position: 'Custom',
                height: '100', width: '240',
                location: { x: 100, y: 100 }
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Right Position', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(550);
                expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(150);
                done();
            };
            chartObj.legendSettings = {
                position: 'Right',
                height: '100', width: '240'
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Top Position', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(280);
                expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(10);
                done();
            };
            chartObj.legendSettings = {
                position: 'Top',
                height: '100', width: '240'
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Top Position With Title', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(280);
                expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(35);
                done();
            };
            chartObj.title = 'Chart Legend Spec Title';
            chartObj.legendSettings = {
                position: 'Top',
                height: '100', width: '240'
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Left Position', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(10);
                expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(150);
                done();
            };
            chartObj.legendSettings = {
                position: 'Left',
                height: '100', width: '240'
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Page Navigation Down and Up for vertical orientation', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_pagedown');
                var pagenumber;
                var downclick = 3;
                for (i = 1; i < downclick; i++) {
                    trigger.clickEvent(legendElement);
                    pagenumber = parseInt((document.getElementById(legendId + '_pagenumber').textContent.split('/')[0]), 10);
                }
                legendElement = document.getElementById(legendId + '_pageup');
                var upclick = 1;
                for (i = 1; i <= upclick; i++) {
                    trigger.clickEvent(legendElement);
                    pagenumber = parseInt((document.getElementById(legendId + '_pagenumber').textContent.split('/')[0]), 10);
                }
                expect(pagenumber).toBe(downclick - upclick);
                trigger.clickEvent(legendElement);
                done();
            };
            chartObj.series = seriesCollection;
            chartObj.legendSettings = {
                position: 'Right', alignment: 'Near', height: '180', width: '100'
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Page Navigation Down and Up for horizontal orientation', function () {
            chartObj.legendSettings = {
                position: 'Bottom', alignment: 'Near', height: '180', width: '160'
            };
            chartObj.dataBind();
            legendElement = document.getElementById(legendId + '_pagedown');
            var pagenumber;
            var downclick = 3;
            for (i = 1; i < downclick; i++) {
                trigger.clickEvent(legendElement);
                pagenumber = parseInt((document.getElementById(legendId + '_pagenumber').textContent.split('/')[0]), 10);
            }
            legendElement = document.getElementById(legendId + '_pageup');
            var upclick = 1;
            for (i = 1; i <= upclick; i++) {
                trigger.clickEvent(legendElement);
                pagenumber = parseInt((document.getElementById(legendId + '_pagenumber').textContent.split('/')[0]), 10);
            }
            expect(pagenumber).toBe(downclick - upclick);
            trigger.clickEvent(legendElement);
        });
        it('Legend Alignment Far placing for Horizontal', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(540);
                expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(290);
                done();
            };
            chartObj.series = [series[0]];
            chartObj.legendSettings = { position: 'Bottom', alignment: 'Far', height: '100', width: '250' };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Alignment Far placing for Vertical', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_element');
                expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(10);
                expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(290);
                done();
            };
            chartObj.legendSettings = { position: 'Left', alignment: 'Far' };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as ColumnSeries', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].type = 'Column';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as AreaSeries', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].type = 'Area';
            chartObj.series[0].animation.enable = true;
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as StackingColumnSeries', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].type = 'StackingColumn';
            chartObj.series[0].animation.enable = false;
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as StackingAreaSeries', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].type = 'StackingArea';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as SteplineSeries', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].type = 'StepLine';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as SplineSeries', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                expect(legendElement.getAttribute('fill')).toEqual('transparent');
                done();
            };
            chartObj.series[0].type = 'Spline';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as Scatter Series', function (done) {
            loaded = function (args) {
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('ellipse');
                expect(legendElement.getAttribute('rx')).toEqual('5');
                expect(legendElement.getAttribute('ry')).toEqual('5');
                done();
            };
            chartObj.series[0].type = 'Scatter';
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as Bar series', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].type = 'Bar';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as Circle', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('ellipse');
                expect(legendElement.getAttribute('rx')).toEqual('5');
                expect(legendElement.getAttribute('ry')).toEqual('5');
                done();
            };
            chartObj.series[0].legendShape = 'Circle';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as Rectangle', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].legendShape = 'Rectangle';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as Cross', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].legendShape = 'Cross';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as Diamond', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].legendShape = 'Diamond';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as HorizontalLine', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].legendShape = 'HorizontalLine';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as VerticalLine', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].legendShape = 'VerticalLine';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Shape type as Triangle', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.series[0].legendShape = 'Triangle';
            chartObj.legendSettings = { height: null, width: null };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend border width', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.tagName).toEqual('path');
                expect(legendElement.getAttribute('d')).not.toEqual(null);
                done();
            };
            chartObj.legendSettings = { border: { width: 1, color: 'yellow' } };
            chartObj.loaded = loaded;
            chartObj.dataBind();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend visible false', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                var element = document.getElementById(legendId);
                expect(element).toBe(null);
                done();
            };
            chartObj.legendSettings = { visible: false };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend click on Visible series', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_text_series_' + 0);
                trigger.clickEvent(legendElement);
                expect(chartObj.series[0].visible).toBe(false);
                done();
            };
            chartObj.legendSettings = { visible: true };
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend click on Hidden series', function () {
            legendElement = document.getElementById(legendId + '_text_series_' + 0);
            trigger.clickEvent(legendElement);
            expect(chartObj.series[0].visible).toBe(true);
        });
        it('Legend Rendering Event Checking', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_text_series_' + 0);
                expect(legendElement.textContent).toBe('Text Changed');
                legendElement = document.getElementById(legendId + '_shape_series_0');
                expect(legendElement.getAttribute('fill')).toBe('#33CCFF');
                expect(legendElement.getAttribute('d').split('L').length).toBe(4);
                done();
            };
            legendRendering = function (args) {
                args.text = 'Text Changed';
                args.fill = '#33CCFF';
                args.shape = 'Triangle';
            };
            chartObj.legendRender = legendRendering;
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Toggle visible and adding different type opposite axis series', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_text_series_' + 0);
                trigger.clickEvent(legendElement);
                var seriesElement = document.getElementById(id + 'SeriesGroup0');
                expect(seriesElement).not.toBe(null);
                done();
            };
            legendElement = document.getElementById(legendId + '_text_series_' + 0);
            trigger.clickEvent(legendElement);
            chartObj.series[0].type = 'Column';
            chartObj.legendRender = null;
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Rendering Series Names are same ', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_text_series_' + 0);
                expect(legendElement.textContent).toBe('All are Same Text');
                legendElement = document.getElementById(legendId + '_text_series_' + 1);
                expect(legendElement.textContent).toBe('All are Same Text');
                legendElement = document.getElementById(legendId + '_text_series_' + 2);
                expect(legendElement.textContent).toBe('All are Same Text');
                legendElement = document.getElementById(legendId + '_text_series_' + 3);
                expect(legendElement.textContent).toBe('All are Same Text');
                done();
            };
            chartObj.series = seriesCollection.slice(0, 4);
            for (var _i = 0, _a = chartObj.series; _i < _a.length; _i++) {
                var series_1 = _a[_i];
                series_1.name = 'All are Same Text';
            }
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Toggle visible and adding different type series ', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                var seriesElement = document.getElementById(id + 'SeriesGroup' + 4);
                expect(seriesElement).not.toBe(null);
                done();
            };
            legendElement = document.getElementById(legendId + '_text_series_' + 0);
            trigger.clickEvent(legendElement);
            var allseries = chartObj.series;
            seriesCollection[4].type = 'Line';
            allseries.push(seriesCollection[4]);
            chartObj.series = allseries;
            chartObj.loaded = loaded;
            chartObj.legendRender = null;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Selection and legend click', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                var selection = id + '_ej2_chart_selection_series_';
                var point = document.getElementById(id + '_Series_4' + '_Point_3');
                trigger.clickEvent(point);
                point = document.getElementById(id + '_Series_1' + '_Point_3');
                trigger.clickEvent(point);
                var selectedElement = document.getElementsByClassName(selection + 4);
                expect(selectedElement.length).not.toBe(0);
                selectedElement = document.getElementsByClassName(selection + 1);
                expect(selectedElement.length).not.toBe(0);
                legendElement = document.getElementById(legendId + '_text_series_' + 4);
                trigger.clickEvent(legendElement);
                selectedElement = document.getElementsByClassName(selection + 4);
                expect(selectedElement.length).toBe(0);
                selectedElement = document.getElementsByClassName(selection + 1);
                expect(selectedElement.length).not.toBe(0);
                legendElement = document.getElementById(legendId + '_text_series_' + 1);
                trigger.clickEvent(legendElement);
                selectedElement = document.getElementsByClassName(selection + 1);
                expect(selectedElement.length).toBe(0);
                legendElement = document.getElementById(legendId + '_text_series_' + 4);
                trigger.clickEvent(legendElement);
                selectedElement = document.getElementsByClassName(selection + 4);
                expect(selectedElement.length).not.toBe(0);
                legendElement = document.getElementById(legendId + '_text_series_' + 1);
                trigger.clickEvent(legendElement);
                selectedElement = document.getElementsByClassName(selection + 1);
                expect(selectedElement.length).not.toBe(0);
                done();
            };
            chartObj.selectionMode = 'Point';
            chartObj.isMultiSelect = true;
            for (var _i = 0, _a = chartObj.series; _i < _a.length; _i++) {
                var series_2 = _a[_i];
                series_2.type = 'Column';
            }
            chartObj.loaded = loaded;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
        it('Legend Rendering Event args cancel Checking', function (done) {
            loaded = function (args) {
                chartObj.loaded = null;
                legendElement = document.getElementById(legendId + '_text_series_' + 0);
                expect(legendElement).toBe(null);
                legendElement = document.getElementById(legendId + '_text_series_' + 1);
                expect(legendElement).not.toBe(null);
                expect(legendElement.getAttribute('x')).toBe('34');
                expect(legendElement.getAttribute('y')).toBe('311');
                legendElement = document.getElementById(legendId + '_text_series_' + 2);
                expect(legendElement).not.toBe(null);
                expect(legendElement.getAttribute('x')).toBe('34');
                expect(legendElement.getAttribute('y')).toBe('333');
                legendElement = document.getElementById(legendId + '_text_series_' + 3);
                expect(legendElement).not.toBe(null);
                expect(legendElement.getAttribute('x')).toBe('34');
                expect(legendElement.getAttribute('y')).toBe('355');
                expect(chartObj.legendModule.legendBounds.height).toBe(98);
                expect(chartObj.legendModule.legendBounds.width).toBe(98);
                done();
            };
            legendRendering = function (args) {
                if (args.text === 'Series 0') {
                    args.cancel = true;
                }
            };
            i = 0;
            for (var _i = 0, _a = chartObj.series; _i < _a.length; _i++) {
                var series_3 = _a[_i];
                series_3.name = 'Series ' + i;
                i++;
            }
            chartObj.series[0].visible = true;
            chartObj.legendRender = legendRendering;
            chartObj.loaded = loaded;
            chartObj.legendSettings.height = null;
            chartObj.legendSettings.width = null;
            chartObj.refresh();
            data_spec_1.unbindResizeEvents(chartObj);
        });
    });
});
