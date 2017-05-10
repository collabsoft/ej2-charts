define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/utils/helper", "../../../src/chart/series/marker", "../../../src/chart/series/data-label", "../../../src/chart/legend/legend", "../../../src/chart/series/column-series", "../base/data.spec", "../../../src/chart/series/stacking-column-series", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, helper_1, marker_1, data_label_1, legend_1, column_series_1, data_spec_1, stacking_column_series_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(marker_1.Marker, column_series_1.ColumnSeries, stacking_column_series_1.StackingColumnSeries, data_label_1.DataLabel, legend_1.Legend);
    describe('Chart Control', function () {
        describe('Chart Bar series', function () {
            var chartObj;
            var elem;
            var point;
            var svg;
            var targetElement;
            var loaded;
            var done;
            var dataLabel;
            var x;
            var y;
            var loaded1;
            var seriesColor = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
                '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
            var paletteColor = ['#005378', '#006691', '#007EB5', '#0D97D4', '#00AEFF',
                '#14B9FF', '#54CCFF', '#87DBFF', '#ADE5FF', '#C5EDFF'];
            beforeAll(function () {
                elem = dom_1.createElement('div', { id: 'theme' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { minimum: 0.5, maximum: 1.5, interval: 1 },
                    primaryYAxis: { minimum: 0, maximum: 25, interval: 5 },
                    series: [{
                            dataSource: [{ x: 1, y: 16 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'USA', marker: { dataLabel: { visible: true, fill: seriesColor[0] } }
                        }, {
                            dataSource: [{ x: 1, y: 17 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'GBR', marker: { dataLabel: { visible: true, fill: seriesColor[1] } }
                        }, {
                            dataSource: [{ x: 1, y: 16 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'CHN', marker: { dataLabel: { visible: true, fill: seriesColor[2] } }
                        }, {
                            dataSource: [{ x: 1, y: 19 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'RUS', marker: { dataLabel: { visible: true, fill: seriesColor[3] } }
                        }, {
                            dataSource: [{ x: 1, y: 17 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'GER', marker: { dataLabel: { visible: true, fill: seriesColor[4] } }
                        }, {
                            dataSource: [{ x: 1, y: 12 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'JAP', marker: { dataLabel: { visible: true, fill: seriesColor[5] } }
                        }, {
                            dataSource: [{ x: 1, y: 10 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'FRN', marker: { dataLabel: { visible: true, fill: seriesColor[6] } }
                        }, {
                            dataSource: [{ x: 1, y: 18 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'IND', marker: { dataLabel: { visible: true, fill: seriesColor[7] } }
                        }, {
                            dataSource: [{ x: 1, y: 10 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'AUS', marker: { dataLabel: { visible: true, fill: seriesColor[8] } }
                        }, {
                            dataSource: [{ x: 1, y: 15 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'NZ', marker: { dataLabel: { visible: true, fill: seriesColor[9] } }
                        }, {
                            dataSource: [{ x: 1, y: 19 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'PAK', marker: { dataLabel: { visible: true, fill: seriesColor[0] } }
                        }, {
                            dataSource: [{ x: 1, y: 19 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'SPN', marker: { dataLabel: { visible: true, fill: seriesColor[1] } }
                        }
                    ], width: '950',
                    legendSettings: { visible: true },
                    title: 'Series Palette'
                });
                chartObj.appendTo('#theme');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with default pattern color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(seriesColor[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(seriesColor[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(seriesColor[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(seriesColor[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(seriesColor[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(seriesColor[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(seriesColor[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(seriesColor[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(seriesColor[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(seriesColor[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(seriesColor[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(seriesColor[1]);
                    done();
                };
                chartObj.loaded = loaded;
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with legend color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_chart_legend_shape_series_';
                    expect(helper_1.getElement(prefix + 0).getAttribute('fill')).toBe(seriesColor[0]);
                    expect(helper_1.getElement(prefix + 1).getAttribute('fill')).toBe(seriesColor[1]);
                    expect(helper_1.getElement(prefix + 2).getAttribute('fill')).toBe(seriesColor[2]);
                    expect(helper_1.getElement(prefix + 3).getAttribute('fill')).toBe(seriesColor[3]);
                    expect(helper_1.getElement(prefix + 4).getAttribute('fill')).toBe(seriesColor[4]);
                    expect(helper_1.getElement(prefix + 5).getAttribute('fill')).toBe(seriesColor[5]);
                    expect(helper_1.getElement(prefix + 6).getAttribute('fill')).toBe(seriesColor[6]);
                    expect(helper_1.getElement(prefix + 7).getAttribute('fill')).toBe(seriesColor[7]);
                    expect(helper_1.getElement(prefix + 8).getAttribute('fill')).toBe(seriesColor[8]);
                    expect(helper_1.getElement(prefix + 9).getAttribute('fill')).toBe(seriesColor[9]);
                    expect(helper_1.getElement(prefix + 10).getAttribute('fill')).toBe(seriesColor[0]);
                    expect(helper_1.getElement(prefix + 11).getAttribute('fill')).toBe(seriesColor[1]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with dataLabel color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0_TextShape';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(seriesColor[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(seriesColor[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(seriesColor[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(seriesColor[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(seriesColor[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(seriesColor[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(seriesColor[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(seriesColor[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(seriesColor[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(seriesColor[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(seriesColor[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(seriesColor[1]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking palette while changing', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(paletteColor[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(paletteColor[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(paletteColor[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(paletteColor[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(paletteColor[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(paletteColor[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(paletteColor[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(paletteColor[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.palettes = paletteColor;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking series fill', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(paletteColor[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe('violet');
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(paletteColor[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(paletteColor[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe('grey');
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(paletteColor[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(paletteColor[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(paletteColor[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[3].fill = 'violet';
                chartObj.series[6].fill = 'grey';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking series fill with data bind', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe('violet');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.palettes = ['violet'];
                chartObj.legendSettings.visible = false;
                data_spec_1.unbindResizeEvents(chartObj);
                chartObj.dataBind();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
    });
});
