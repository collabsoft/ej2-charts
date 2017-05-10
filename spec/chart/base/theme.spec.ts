
/**
 * Specifies the Bar series spec.
 */
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { Chart } from '../../../src/chart/chart';
import { getElement } from '../../../src/chart/utils/helper';
import { Marker } from '../../../src/chart/series/marker';
import { DataLabel } from '../../../src/chart/series/data-label';
import { Legend } from '../../../src/chart/legend/legend';
import { ColumnSeries } from '../../../src/chart/series/column-series';
import { unbindResizeEvents } from '../base/data.spec';
import { StackingColumnSeries } from '../../../src/chart/series/stacking-column-series';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { EmitType } from '@syncfusion/ej2-base';
import { ILoadedEventArgs } from '../../../src/chart/model/interface';

Chart.Inject(Marker, ColumnSeries, StackingColumnSeries, DataLabel, Legend);



describe('Chart Control', () => {
    describe('Chart Bar series', () => {
        let chartObj: Chart;
        let elem: HTMLElement;
        let point: HTMLElement;
        let svg: HTMLElement;
        let targetElement: HTMLElement;
        let loaded: EmitType<ILoadedEventArgs>;
        let done: Function;
        let dataLabel: HTMLElement;
        let x: number;
        let y: number;
        let loaded1: EmitType<ILoadedEventArgs>;
        let seriesColor: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
            '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
        let paletteColor: string[] = ['#005378', '#006691', '#007EB5', '#0D97D4', '#00AEFF',
            '#14B9FF', '#54CCFF', '#87DBFF', '#ADE5FF', '#C5EDFF'];

        beforeAll(() => {
            elem = createElement('div', { id: 'theme' });
            document.body.appendChild(elem);
            chartObj = new Chart(
                {
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
            unbindResizeEvents(chartObj);
        });

        afterAll((): void => {
            chartObj.destroy();
            elem.remove();
        });
        it('Checking with default pattern color', (done: Function) => {
            loaded = (args: Object): void => {
                let prefix: string = 'theme_Series_';
                let suffix: string = '_Point_0';
                expect(getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(seriesColor[0]);
                expect(getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(seriesColor[1]);
                expect(getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(seriesColor[2]);
                expect(getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(seriesColor[3]);
                expect(getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(seriesColor[4]);
                expect(getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(seriesColor[5]);
                expect(getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(seriesColor[6]);
                expect(getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(seriesColor[7]);
                expect(getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(seriesColor[8]);
                expect(getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(seriesColor[9]);
                expect(getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(seriesColor[0]);
                expect(getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(seriesColor[1]);
                done();
            };
            chartObj.loaded = loaded;
            unbindResizeEvents(chartObj);
        });
        it('Checking with legend color', (done: Function) => {
            loaded = (args: Object): void => {
                let prefix: string = 'theme_chart_legend_shape_series_';
                expect(getElement(prefix + 0).getAttribute('fill')).toBe(seriesColor[0]);
                expect(getElement(prefix + 1).getAttribute('fill')).toBe(seriesColor[1]);
                expect(getElement(prefix + 2).getAttribute('fill')).toBe(seriesColor[2]);
                expect(getElement(prefix + 3).getAttribute('fill')).toBe(seriesColor[3]);
                expect(getElement(prefix + 4).getAttribute('fill')).toBe(seriesColor[4]);
                expect(getElement(prefix + 5).getAttribute('fill')).toBe(seriesColor[5]);
                expect(getElement(prefix + 6).getAttribute('fill')).toBe(seriesColor[6]);
                expect(getElement(prefix + 7).getAttribute('fill')).toBe(seriesColor[7]);
                expect(getElement(prefix + 8).getAttribute('fill')).toBe(seriesColor[8]);
                expect(getElement(prefix + 9).getAttribute('fill')).toBe(seriesColor[9]);
                expect(getElement(prefix + 10).getAttribute('fill')).toBe(seriesColor[0]);
                expect(getElement(prefix + 11).getAttribute('fill')).toBe(seriesColor[1]);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('Checking with dataLabel color', (done: Function) => {
            loaded = (args: Object): void => {
                let prefix: string = 'theme_Series_';
                let suffix: string = '_Point_0_TextShape';
                expect(getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(seriesColor[0]);
                expect(getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(seriesColor[1]);
                expect(getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(seriesColor[2]);
                expect(getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(seriesColor[3]);
                expect(getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(seriesColor[4]);
                expect(getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(seriesColor[5]);
                expect(getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(seriesColor[6]);
                expect(getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(seriesColor[7]);
                expect(getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(seriesColor[8]);
                expect(getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(seriesColor[9]);
                expect(getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(seriesColor[0]);
                expect(getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(seriesColor[1]);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('Checking palette while changing', (done: Function) => {
            loaded = (args: Object): void => {
                let prefix: string = 'theme_Series_';
                let suffix: string = '_Point_0';
                expect(getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                expect(getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                expect(getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(paletteColor[2]);
                expect(getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(paletteColor[3]);
                expect(getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(paletteColor[4]);
                expect(getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(paletteColor[5]);
                expect(getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(paletteColor[6]);
                expect(getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(paletteColor[7]);
                expect(getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(paletteColor[8]);
                expect(getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(paletteColor[9]);
                expect(getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                expect(getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.palettes = paletteColor;
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('Checking series fill', (done: Function) => {
            loaded = (args: Object): void => {
                let prefix: string = 'theme_Series_';
                let suffix: string = '_Point_0';
                expect(getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                expect(getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                expect(getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(paletteColor[2]);
                expect(getElement(prefix + 3 + suffix).getAttribute('fill')).toBe('violet');
                expect(getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(paletteColor[4]);
                expect(getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(paletteColor[5]);
                expect(getElement(prefix + 6 + suffix).getAttribute('fill')).toBe('grey');
                expect(getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(paletteColor[7]);
                expect(getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(paletteColor[8]);
                expect(getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(paletteColor[9]);
                expect(getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                expect(getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.series[3].fill = 'violet';
            chartObj.series[6].fill = 'grey';
            chartObj.refresh();
            unbindResizeEvents(chartObj);
        });
        it('Checking series fill with data bind', (done: Function) => {
            loaded = (args: Object): void => {
                let prefix: string = 'theme_Series_';
                let suffix: string = '_Point_0';
                expect(getElement(prefix + 0 + suffix).getAttribute('fill')).toBe('violet');
                done();
            };
            chartObj.loaded = loaded;
            chartObj.palettes = ['violet'];
            chartObj.legendSettings.visible = false;
            unbindResizeEvents(chartObj);
            chartObj.dataBind();
            unbindResizeEvents(chartObj);
        });
    });
});