define(["require", "exports", "@syncfusion/ej2-base/dom", "../../../src/chart/chart", "../../../src/chart/user-interaction/selection", "../../../src/chart/user-interaction/zooming", "../../../src/chart/series/marker", "../../../src/chart/series/line-series", "../../../src/chart/series/step-line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/stacking-column-series", "../../../src/chart/series/stacking-area-series", "../../../src/chart/series/area-series", "../../../src/chart/legend/legend", "../base/events.spec", "../base/data.spec", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, dom_1, chart_1, selection_1, zooming_1, marker_1, line_series_1, step_line_series_1, column_series_1, stacking_column_series_1, stacking_area_series_1, area_series_1, legend_1, events_spec_1, data_spec_1, data_spec_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, step_line_series_1.StepLineSeries, column_series_1.ColumnSeries, area_series_1.AreaSeries, stacking_area_series_1.StackingAreaSeries, selection_1.Selection, stacking_column_series_1.StackingColumnSeries, legend_1.Legend, marker_1.Marker, zooming_1.Zoom);
    var seriesCollection = [];
    var colors = ['#663AB6', '#EB3F79', '#F8AB1D', '#B82E3D', '#049CB1', '#F2424F', '#C2C924', '#3DA046', '#074D67', '#02A8F4'];
    seriesCollection = [
        {
            name: 'First',
            marker: { visible: true, height: 15, width: 15, shape: 'Triangle' },
            width: 5,
            animation: { enable: false },
            selectionStyle: null,
            fill: colors[0],
            dataSource: data_spec_1.firstSeries, xName: 'x', yName: 'y',
            type: 'Column'
        },
        {
            name: 'Second',
            marker: { visible: true, height: 15, width: 15, shape: 'Triangle' },
            width: 10,
            visible: true,
            selectionStyle: null,
            animation: { enable: false },
            fill: colors[5],
            dataSource: data_spec_1.secondSeries, xName: 'x', yName: 'y',
            type: 'Column'
        },
        {
            name: 'Third',
            marker: { visible: true, height: 15, width: 15, shape: 'Triangle' },
            width: 5,
            animation: { enable: false },
            selectionStyle: null,
            fill: colors[8],
            dataSource: data_spec_1.thirdSeries, xName: 'x', yName: 'y',
            type: 'Column'
        }
    ];
    describe('Chart Control Selection ', function () {
        var id = 'ej2Container';
        var selection = id + '_ej2_chart_selection_series_';
        var chartObj;
        var element;
        var selected;
        var i = 0;
        var j = 0;
        var loaded;
        var trigger = new events_spec_1.MouseEvents();
        var chartContainer;
        var draggedRectGroup = id + '_ej2_drag_rect';
        var closeId = id + '_ej2_drag_close';
        beforeAll(function () {
            chartContainer = dom_1.createElement('div', { id: id });
            document.body.appendChild(chartContainer);
            document.body.appendChild(dom_1.createElement('style', {
                innerHTML: ' .selection { stroke-width: 5; fill: lime; stroke: red; opacity: 1; } '
            }));
            chartObj = new chart_1.Chart({
                series: seriesCollection,
                primaryXAxis: { minimum: 2004, maximum: 2012 },
                primaryYAxis: { rangePadding: 'None' },
                height: '500',
                width: '800',
                loaded: loaded,
                selectionMode: 'Point',
                isMultiSelect: false
            });
            chartObj.appendTo('#' + id);
            data_spec_2.unbindResizeEvents(chartObj);
        });
        afterAll(function () {
            chartObj.destroy();
            chartContainer.remove();
        });
        it('MultiSelect false Selection Mode Point', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_3');
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_0' + '_Point_1');
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_0' + '_Point_5');
                trigger.clickEvent(element);
                expect(document.getElementsByClassName(selection + '0').length).toBe(1);
                done();
            };
            chartObj.loaded = loaded;
        });
        it('MultiSelect false Selection Mode Cluster', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_5');
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_1' + '_Point_2');
                trigger.clickEvent(element);
                for (var i_1 = 0; i_1 < seriesCollection.length; i_1++) {
                    expect(document.getElementsByClassName(selection + i_1).length).toBe(1);
                }
                done();
            };
            chartObj.selectionMode = 'Cluster';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('MultiSelect false Selection Mode Series', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_3');
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_1' + '_Point_3');
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + '1');
                expect(selected.length).toBe(1);
                expect(selected[0].childNodes.length).toBe(8);
                done();
            };
            chartObj.selectionMode = 'Series';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('MultiSelect true Selection Mode Series', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_' + 1);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_1' + '_Point_' + 2);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_2' + '_Point_' + 3);
                trigger.clickEvent(element);
                expect(document.getElementsByClassName(selection + '0')[0].childNodes.length).toBe(chartObj.visibleSeries[0].points.length + 1);
                expect(document.getElementsByClassName(selection + '1')[0].childNodes.length).toBe(chartObj.visibleSeries[1].points.length + 1);
                expect(document.getElementsByClassName(selection + '2')[0].childNodes.length).toBe(chartObj.visibleSeries[2].points.length + 1);
                element = document.getElementById(id + '_Series_0' + '_Point_' + 2);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_1' + '_Point_' + 4);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_2' + '_Point_' + 3);
                trigger.clickEvent(element);
                expect(document.getElementsByClassName(selection + '0').length).toBe(0);
                expect(document.getElementsByClassName(selection + '1').length).toBe(0);
                expect(document.getElementsByClassName(selection + '2').length).toBe(0);
                done();
            };
            chartObj.isMultiSelect = true;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('MultiSelect true Selection Mode Point', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_' + 3);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_1' + '_Point_' + 2);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_2' + '_Point_' + 3);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_0' + '_Point_' + 5);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_2' + '_Point_' + 4);
                trigger.clickEvent(element);
                expect(document.getElementsByClassName(selection + '0').length).toBe(2);
                expect(document.getElementsByClassName(selection + '1').length).toBe(1);
                expect(document.getElementsByClassName(selection + '2').length).toBe(2);
                done();
            };
            chartObj.selectionMode = 'Point';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('MultiSelect true Selection Mode  Cluster', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_' + 3);
                trigger.clickEvent(element);
                for (var i_2 = 0; i_2 < seriesCollection.length; i_2++) {
                    expect(document.getElementsByClassName(selection + i_2).length).toBe(1);
                }
                done();
            };
            chartObj.selectionMode = 'Cluster';
            chartObj.isMultiSelect = true;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Single point selection and UnSelection', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0_Point_4');
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + '0');
                expect(element).toBe(selected[0]);
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + '0');
                expect(selected.length).toBe(0);
                done();
            };
            chartObj.selectionMode = 'Point';
            chartObj.isMultiSelect = false;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Multiple point selection and UnSelection', function (done) {
            loaded = function () {
                for (j = 0; j < seriesCollection.length; j++) {
                    for (i = 0, length = chartObj.visibleSeries[j].points.length; i < length; i++) {
                        element = document.getElementById(id + '_Series_' + j + '_Point_' + i);
                        trigger.clickEvent(element);
                        selected = document.getElementsByClassName(selection + j);
                        expect(selected.length).toBe(i + 1);
                    }
                    for (i = 0; i > 0; i--) {
                        element = document.getElementById(id + '_Series_' + j + '_Point_' + i);
                        trigger.clickEvent(element);
                        selected = document.getElementsByClassName(selection + j);
                        expect(selected.length).toBe(i);
                    }
                }
                done();
            };
            chartObj.selectionMode = 'Point';
            chartObj.isMultiSelect = true;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Single Series selection and UnSelection', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0_Point_0');
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + '0');
                expect(selected.length).toBe(1);
                expect(selected[0].childNodes.length).toBe(8);
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + '0');
                expect(selected.length).toBe(0);
                done();
            };
            chartObj.selectionMode = 'Series';
            chartObj.isMultiSelect = false;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Multiple Series selection and UnSelection', function (done) {
            loaded = function () {
                var total = 0;
                for (i = 0, length = seriesCollection.length; i < length; i++) {
                    element = document.getElementById(id + '_Series_' + i + '_Point_0');
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName(selection + i);
                    expect(selected.length).toBe(1);
                    total = 9 * (i + 1);
                    expect(selected[0].childNodes.length).toBe(8);
                }
                for (; i > 0; i--) {
                    element = document.getElementById(id + '_Series_' + (i - 1) + '_Point_4');
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName(selection + (i - 1));
                    total -= 9;
                    expect(selected.length).toBe(0);
                }
                expect(total).toBe(0);
                done();
            };
            chartObj.selectionMode = 'Series';
            chartObj.isMultiSelect = true;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Single Cluster selection and UnSelection', function (done) {
            loaded = function () {
                var index = Math.floor((Math.random() * 10) % 6);
                element = document.getElementById(id + '_Series_1_Point_' + index);
                trigger.clickEvent(element);
                for (i = 0; i < seriesCollection.length; i++) {
                    selected = document.getElementsByClassName(selection + i);
                    expect(selected.length).toBe(1);
                }
                element = document.getElementById(id + '_Series_0_Point_' + index);
                trigger.clickEvent(element);
                for (i = 0; i < seriesCollection.length; i++) {
                    selected = document.getElementsByClassName(selection + i);
                    expect(selected.length).toBe(0);
                }
                done();
            };
            chartObj.selectionMode = 'Cluster';
            chartObj.isMultiSelect = false;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Multiple Cluster selection and UnSelection', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_1_Point_' + 1);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_0_Point_' + 3);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_2_Point_' + 5);
                trigger.clickEvent(element);
                for (i = 0; i < seriesCollection.length; i++) {
                    selected = document.getElementsByClassName(selection + i);
                    expect(selected.length).toBe(3);
                }
                element = document.getElementById(id + '_Series_1_Point_' + 1);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_0_Point_' + 3);
                trigger.clickEvent(element);
                element = document.getElementById(id + '_Series_2_Point_' + 5);
                trigger.clickEvent(element);
                for (i = 0; i < seriesCollection.length; i++) {
                    selected = document.getElementsByClassName(selection + i);
                    expect(selected.length).toBe(0);
                }
                done();
            };
            chartObj.selectionMode = 'Cluster';
            chartObj.isMultiSelect = true;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selected DataIndexes checking', function (done) {
            loaded = function () {
                expect(document.getElementsByClassName(selection + '0').length).toBe(1);
                done();
            };
            chartObj.selectionMode = 'Point';
            chartObj.selectedDataIndexes = [{ series: 0, point: 2 }];
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selection mode DragX', function (done) {
            loaded = function () {
                trigger.draganddropEvent(chartContainer, 100, 100, 300, 300);
                element = document.getElementById(draggedRectGroup);
                expect(element.getAttribute('x')).toEqual('92');
                expect(element.getAttribute('y')).toEqual('10.25');
                expect(element.getAttribute('height')).toEqual('420.75');
                expect(element.getAttribute('width')).toEqual('200');
                done();
            };
            chartObj.selectionMode = 'DragX';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selection mode DragY', function (done) {
            loaded = function () {
                data_spec_2.unbindResizeEvents(chartObj);
                trigger.draganddropEvent(chartContainer, 100, 100, 300, 300);
                element = document.getElementById(draggedRectGroup);
                expect(element.getAttribute('x')).toEqual('34.5');
                expect(element.getAttribute('y')).toEqual('92');
                expect(element.getAttribute('height')).toEqual('200');
                expect(element.getAttribute('width')).toEqual('755.5');
                done();
            };
            chartObj.selectionMode = 'DragY';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selection mode Drag moving', function (done) {
            loaded = function () {
                trigger.draganddropEvent(chartContainer, 100, 100, 300, 300);
                trigger.touchdraganddropEvent(chartObj, chartContainer, 150, 150, 200, 200);
                element = document.getElementById(draggedRectGroup);
                expect(element.getAttribute('x')).toEqual('142');
                expect(element.getAttribute('y')).toEqual('142');
                expect(element.getAttribute('height')).toEqual('200');
                expect(element.getAttribute('width')).toEqual('200');
                done();
            };
            chartObj.selectionMode = 'DragXY';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selection mode Drag Resizing', function (done) {
            loaded = function () {
                trigger.draganddropEvent(chartContainer, 100, 100, 300, 300);
                trigger.draganddropEvent(chartContainer, 305, 305, 330, 330);
                element = document.getElementById(draggedRectGroup);
                expect(element.getAttribute('x')).toEqual('92');
                expect(element.getAttribute('y')).toEqual('92');
                expect(element.getAttribute('height')).toEqual('230');
                expect(element.getAttribute('width')).toEqual('230');
                done();
            };
            chartObj.selectionMode = 'DragXY';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selection mode DragXY', function (done) {
            loaded = function () {
                trigger.draganddropEvent(chartContainer, 100, 100, 300, 300);
                element = document.getElementById(draggedRectGroup);
                expect(element.getAttribute('x')).toEqual('92');
                expect(element.getAttribute('y')).toEqual('92');
                expect(element.getAttribute('height')).toEqual('200');
                expect(element.getAttribute('width')).toEqual('200');
                expect(document.getElementsByClassName(selection + '2').length).toBe(2);
                trigger.mouseupEvent(document.getElementById(closeId), 0, 0, 0, 0);
                done();
            };
            chartObj.selectionMode = 'DragXY';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selected Data Index removing checking', function (done) {
            loaded = function () {
                expect(document.getElementsByClassName(selection + '0').length).toBe(0);
                done();
            };
            chartObj.selectedDataIndexes = [];
            chartObj.selectionMode = 'Series';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selected Redraw checking', function (done) {
            element = document.getElementById(id + '_Series_0_Point_' + 3);
            trigger.clickEvent(element);
            chartObj.isMultiSelect = false;
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + '0').length).toBe(1);
            done();
        });
        it('Selected Legend toggle visible false', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_chart_legend' + '_text_series_' + 1);
                trigger.clickEvent(element);
                expect(document.getElementsByClassName(selection + '1').length).toBe(1);
                trigger.clickEvent(element);
                expect(document.getElementsByClassName(selection + '1').length).toBe(0);
                done();
            };
            chartObj.legendSettings = { toggleVisibility: false };
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selected refresh clear selection', function (done) {
            loaded = function () {
                for (i = 0; i < chartObj.series.length; i++) {
                    expect(document.getElementsByClassName(selection + i).length).toBe(0);
                }
                done();
            };
            chartObj.selectionMode = 'Cluster';
            chartObj.isMultiSelect = true;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Selected DataBind cluster', function (done) {
            element = document.getElementById(id + '_Series_0_Point_' + 3);
            trigger.clickEvent(element);
            chartObj.dataBind();
            for (i = 0; i < chartObj.series.length; i++) {
                expect(document.getElementsByClassName(selection + i).length).toBe(1);
            }
            done();
        });
        it('Selected DataBind cluster to series', function (done) {
            chartObj.selectionMode = 'Series';
            chartObj.dataBind();
            selected = document.getElementsByClassName(selection + 0);
            expect(selected[0].childNodes.length).toBeGreaterThanOrEqual(5);
            for (i = 1; i < chartObj.series.length; i++) {
                selected = document.getElementsByClassName(selection + i);
                expect(selected.length).toBe(0);
            }
            done();
        });
        it('Selected DataBind series to point', function (done) {
            element = document.getElementById(id + '_Series_1_Point_' + 3);
            trigger.clickEvent(element);
            chartObj.selectionMode = 'Point';
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + '0').length).toBe(1);
            expect(document.getElementsByClassName(selection + '1').length).toBe(1);
            expect(document.getElementsByClassName(selection + '2').length).toBe(0);
            done();
        });
        it('Selected DataBind point to series', function (done) {
            element = document.getElementById(id + '_Series_0_Point_' + 2);
            trigger.clickEvent(element);
            chartObj.selectionMode = 'Series';
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + '0').length).toBe(0);
            expect(document.getElementsByClassName(selection + '1').length).toBe(1);
            expect(document.getElementsByClassName(selection + '2').length).toBe(0);
            done();
        });
        it('Selected DataBind series to cluster', function (done) {
            element = document.getElementById(id + '_Series_0_Point_' + 4);
            trigger.clickEvent(element);
            chartObj.selectionMode = 'Cluster';
            chartObj.dataBind();
            for (i = 0; i < chartObj.series.length; i++) {
                expect(document.getElementsByClassName(selection + i).length).toBe(2);
            }
            done();
        });
        it('Selected DataBind cluster to point', function (done) {
            chartObj.selectionMode = 'Point';
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + 0).length).toBe(1);
            expect(document.getElementsByClassName(selection + 1).length).toBe(1);
            expect(document.getElementsByClassName(selection + 2).length).toBe(0);
            element = document.getElementById(id + '_Series_1_Point_' + 4);
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '1').length).toBe(2);
            expect(document.getElementsByClassName(selection + '0').length).toBe(1);
            expect(document.getElementsByClassName(selection + '2').length).toBe(0);
            done();
        });
        it('Selected DataBind point multi select false', function (done) {
            chartObj.isMultiSelect = false;
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + 0).length).toBe(1);
            expect(document.getElementsByClassName(selection + 1).length).toBe(1);
            expect(document.getElementsByClassName(selection + 2).length).toBe(0);
            done();
        });
        it('Selected DataBind point to series multi select false', function (done) {
            chartObj.selectionMode = 'Series';
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + '0').length).toBe(0);
            expect(document.getElementsByClassName(selection + '1').length).toBe(1);
            expect(document.getElementsByClassName(selection + '2').length).toBe(0);
            done();
        });
        it('Selected DataBind series to cluster multi select false', function (done) {
            chartObj.selectionMode = 'Cluster';
            chartObj.dataBind();
            for (i = 0; i < chartObj.series.length; i++) {
                expect(document.getElementsByClassName(selection + i).length).toBe(1);
            }
            done();
        });
        it('Selected DataBind cluster to series multi select false', function (done) {
            element = document.getElementById(id + '_Series_2_Point_' + 3);
            trigger.clickEvent(element);
            chartObj.selectionMode = 'Series';
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + '0').length).toBe(0);
            expect(document.getElementsByClassName(selection + '1').length).toBe(0);
            expect(document.getElementsByClassName(selection + '2').length).toBe(1);
            expect(document.getElementsByClassName(selection + '2')[0].childNodes.length).toBeGreaterThan(5);
            done();
        });
        it('Selected DataBind series to point multi select false', function (done) {
            chartObj.selectionMode = 'Point';
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + '0').length).toBe(0);
            expect(document.getElementsByClassName(selection + '1').length).toBe(0);
            expect(document.getElementsByClassName(selection + '2').length).toBe(1);
            expect(document.getElementsByClassName(selection + '2')[0].childNodes.length).toBe(0);
            done();
        });
        it('Selected DataBind point to cluster multi select false', function (done) {
            chartObj.selectionMode = 'Cluster';
            chartObj.dataBind();
            for (i = 0; i < chartObj.series.length; i++) {
                expect(document.getElementsByClassName(selection + i).length).toBe(1);
            }
            done();
        });
        it('Selected DataBind cluster to point multi select false', function (done) {
            chartObj.selectionMode = 'Point';
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + 0).length).toBe(0);
            expect(document.getElementsByClassName(selection + 1).length).toBe(0);
            expect(document.getElementsByClassName(selection + 2).length).toBe(1);
            element = document.getElementById(id + '_Series_2_Point_' + 3);
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + 2).length).toBe(0);
            element = document.getElementById(id + '_Series_2_Point_' + 4);
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + 2).length).toBe(1);
            done();
        });
        it('Selected refresh clear selection', function (done) {
            loaded = function () {
                for (i = 0; i < chartObj.series.length; i++) {
                    expect(document.getElementsByClassName(selection + i).length).toBe(0);
                }
                done();
            };
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Dragging selection resizing left position moving left and right', function (done) {
            loaded = function () {
                trigger.draganddropEvent(chartContainer, 100, 100, 300, 300);
                element = document.getElementById(draggedRectGroup);
                expect(element.getAttribute('x')).toEqual('92');
                expect(element.getAttribute('y')).toEqual('92');
                expect(element.getAttribute('height')).toEqual('200');
                expect(element.getAttribute('width')).toEqual('200');
                trigger.draganddropEvent(chartContainer, 90, 110, 70, 120);
                element = document.getElementById(draggedRectGroup);
                expect(element.getAttribute('x')).toEqual('62');
                expect(element.getAttribute('y')).toEqual('92');
                expect(element.getAttribute('height')).toEqual('200');
                expect(element.getAttribute('width')).toEqual('230');
                trigger.draganddropEvent(chartContainer, 65, 110, 130, 120);
                element = document.getElementById(draggedRectGroup);
                expect(element.getAttribute('x')).toEqual('122');
                expect(element.getAttribute('y')).toEqual('92');
                expect(element.getAttribute('height')).toEqual('200');
                expect(element.getAttribute('width')).toEqual('170');
                trigger.mouseupEvent(document.getElementById(closeId), 0, 0, 0, 0);
                done();
            };
            chartObj.selectionMode = 'DragXY';
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Dragging selection resizing right position moving left and right', function (done) {
            chartObj.selectionMode = 'DragXY';
            chartObj.dataBind();
            trigger.draganddropEvent(chartContainer, 100, 100, 300, 300);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('92');
            expect(element.getAttribute('y')).toEqual('92');
            expect(element.getAttribute('height')).toEqual('200');
            expect(element.getAttribute('width')).toEqual('200');
            trigger.draganddropEvent(chartContainer, 290, 120, 430, 180);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('92');
            expect(element.getAttribute('y')).toEqual('92');
            expect(element.getAttribute('height')).toEqual('200');
            expect(element.getAttribute('width')).toEqual('330');
            trigger.draganddropEvent(chartContainer, 435, 115, 200, 120);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('92');
            expect(element.getAttribute('y')).toEqual('92');
            expect(element.getAttribute('height')).toEqual('200');
            expect(element.getAttribute('width')).toEqual('100');
            trigger.mouseupEvent(document.getElementById(closeId), 0, 0, 0, 0);
            done();
        });
        it('Dragging selection resizing top position moving up and down', function (done) {
            chartObj.selectionMode = 'DragXY';
            chartObj.dataBind();
            trigger.draganddropEvent(chartContainer, 250, 300, 450, 400);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('242');
            expect(element.getAttribute('y')).toEqual('292');
            expect(element.getAttribute('height')).toEqual('100');
            expect(element.getAttribute('width')).toEqual('200');
            trigger.draganddropEvent(chartContainer, 290, 295, 430, 200);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('242');
            expect(element.getAttribute('y')).toEqual('192');
            expect(element.getAttribute('height')).toEqual('200');
            expect(element.getAttribute('width')).toEqual('200');
            trigger.draganddropEvent(chartContainer, 260, 200, 260, 320);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('242');
            expect(element.getAttribute('y')).toEqual('312');
            expect(element.getAttribute('height')).toEqual('80');
            expect(element.getAttribute('width')).toEqual('200');
            trigger.mouseupEvent(document.getElementById(closeId), 0, 0, 0, 0);
            done();
        });
        it('Dragging selection resizing bottom position moving up and down', function (done) {
            chartObj.selectionMode = 'DragXY';
            chartObj.dataBind();
            trigger.draganddropEvent(chartContainer, 250, 100, 450, 200);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('242');
            expect(element.getAttribute('y')).toEqual('92');
            expect(element.getAttribute('height')).toEqual('100');
            expect(element.getAttribute('width')).toEqual('200');
            trigger.draganddropEvent(chartContainer, 290, 205, 250, 400);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('242');
            expect(element.getAttribute('y')).toEqual('92');
            expect(element.getAttribute('height')).toEqual('300');
            expect(element.getAttribute('width')).toEqual('200');
            trigger.draganddropEvent(chartContainer, 270, 395, 230, 150);
            element = document.getElementById(draggedRectGroup);
            expect(element.getAttribute('x')).toEqual('242');
            expect(element.getAttribute('y')).toEqual('92');
            expect(element.getAttribute('height')).toEqual('50');
            expect(element.getAttribute('width')).toEqual('200');
            trigger.mouseupEvent(document.getElementById(closeId), 0, 0, 0, 0);
            done();
        });
        it('DragComplete selection event', function (done) {
            var dragCompleted = function (args) {
                expect(args.selectedDataValues[1][0].x).toBe('2008');
                expect(args.selectedDataValues[1][0].y).toBe(36);
                expect(args.selectedDataValues[2][0].x).toBe('2007');
                expect(args.selectedDataValues[2][0].y).toBe(34);
            };
            chartObj.dragComplete = dragCompleted;
            chartObj.dataBind();
            trigger.draganddropEvent(chartContainer, 250, 100, 450, 250);
            element = document.getElementById(draggedRectGroup);
            done();
        });
        it('Selection refresh for isMultipleSelect false Checking', function (done) {
            loaded = function () {
                expect(document.getElementsByClassName(selection + '0').length).toBe(0);
                expect(document.getElementsByClassName(selection + '1').length).toBe(0);
                expect(document.getElementsByClassName(selection + '2').length).toBe(0);
                done();
            };
            chartObj.selectionMode = 'Point';
            chartObj.isMultiSelect = true;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Dragging on null point selection checking and outside dragging checking', function (done) {
            loaded = function () {
                trigger.draganddropEvent(chartContainer, 250, 100, 450, 250);
                element = document.getElementById(draggedRectGroup);
                expect(element).not.toBeNull();
                expect(chartContainer).not.toBeNull();
                trigger.mouseupEvent(document.getElementById(closeId), 0, 0, 0, 0);
                trigger.draganddropEvent(chartContainer, 0, 0, 450, 250);
                element = document.getElementById(draggedRectGroup);
                expect(element).toBeNull();
                trigger.draganddropEvent(chartContainer, 250, 100, 900, 850);
                element = document.getElementById(draggedRectGroup);
                done();
            };
            chartObj.selectionMode = 'DragXY';
            chartObj.dragComplete = null;
            chartObj.series[0].dataSource[2].y = null;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('selection before Zooming selected elements style ', function (done) {
            loaded = function () {
                chartObj.loaded = null;
                element = document.getElementById(id + '_Series_1_Point_' + 2);
                trigger.clickEvent(element);
                expect(element.classList.contains(selection + 1)).toBe(true);
                trigger.draganddropEvent(chartContainer, 250, 100, 450, 250);
                expect(element.classList.contains(selection + 1)).toBe(true);
                done();
            };
            chartObj.selectionMode = 'Point';
            chartObj.zoomSettings.enableSelectionZooming = true;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
            data_spec_2.unbindResizeEvents(chartObj);
        });
        it('Multiple axis drag selection ', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_2_Point_' + 3);
                trigger.clickEvent(element);
                expect(document.getElementsByClassName(selection + 1).length > 0).toBe(false);
                trigger.draganddropEvent(chartContainer, 250, 100, 450, 250);
                element = document.getElementById(draggedRectGroup);
                expect(document.getElementsByClassName(selection + 1).length == 3).toBe(true);
                done();
            };
            chartObj.primaryXAxis.zoomFactor = 1;
            chartObj.primaryXAxis.zoomPosition = 1;
            chartObj.primaryYAxis.zoomPosition = 1;
            chartObj.primaryYAxis.zoomPosition = 1;
            chartObj.selectionMode = 'DragXY';
            chartObj.columns = [{ width: '50%', border: { width: 4, color: 'red' } },
                { width: '50%', border: { width: 4, color: 'blue' } }];
            chartObj.axes = [{ columnIndex: 1, name: 'xAxis1' }];
            chartObj.series[0].xAxisName = 'xAxis1';
            chartObj.zoomSettings.enableSelectionZooming = false;
            chartObj.loaded = loaded;
            chartObj.selectionModule.selectedDataIndexes = [];
            chartObj.refresh();
        });
    });
});
