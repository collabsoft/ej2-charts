/**
 * AccumulationChart Selection Spec file
 */
import { createElement } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { PieSeries } from '../../../src/accumulation-chart/renderer/pie-series';
import { AccumulationChart } from '../../../src/accumulation-chart/accumulation';
import { AccumulationLegend } from '../../../src/accumulation-chart/renderer/legend';
import { AccPoints } from '../../../src/accumulation-chart/model/acc-base';
import { removeElement } from '../../../src/common/utils/helper';
import { AccumulationDataLabel } from '../../../src/accumulation-chart/renderer/dataLabel';
import { AccumulationSelection } from '../../../src/accumulation-chart/user-interaction/selection';
import { categoryData1 } from '../../chart/base/data.spec';
import { MouseEvents } from '../../chart/base/events.spec';
import { SliceOption } from '../base/util.spec';
import { IAccLoadedEventArgs } from '../../../src/accumulation-chart/model/pie-interface';
import '../../../node_modules/es6-promise/dist/es6-promise';
AccumulationChart.Inject(PieSeries, AccumulationLegend, AccumulationDataLabel, AccumulationSelection);

document.body.appendChild(createElement('style', {
    innerHTML: ' .selection { stroke-width: 2; fill: lime; stroke: red; opacity: 1; } '
}));
describe('Selection', () => {
    let ele: HTMLElement;
    let slice: HTMLElement;
    let loaded: EmitType<IAccLoadedEventArgs>;
    let id: string = 'pie'; let pieGroupId: string = id + 'SeriesGroup0';
    let sliceid: string = id + '_Series_0' + '_Point_';
    let slicepath: SliceOption;
    let legendG: Element;
    let element: Element;
    let selection: string = id + '_ej2_chart_selection_series_';
    let legendId: string = id + '_chart_legend';
    let y: number;
    let selected: HTMLCollection;
    let i: number = 0;
    let j: number = 0;
    let length: number;
    let pie: AccumulationChart; let points: AccPoints[];
    let trigger: MouseEvents = new MouseEvents();
    beforeAll((): void => {
        ele = createElement('div', { id: id });
        document.body.appendChild(ele);
        pie = new AccumulationChart({
            series: [
                {
                    dataSource: categoryData1,
                    xName: 'x',
                    yName: 'y',
                    startAngle: 0,
                    endAngle: 360,
                    innerRadius: '30%',
                    animation: { enable: false},
                    dataLabel: {
                        visible: true, name: 'data', position: 'Inside',
                        border: { width: 1, color: 'violet' },
                        connectorStyle: { length: '10%' }
                    },
                }
            ], width: '600', height: '400', legendSettings: { visible: true }
        });
        pie.appendTo('#' + id);
    });

    afterAll((): void => {
        pie.accumulationSelectionModule.destroy(pie);
        pie.destroy();
        removeElement(id);
    });
    it('Doughnut - MultiSelect false Selection Mode Point', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_3');
            trigger.clickEvent(element);
            element = document.getElementById('pie_Series_0_Point_1');
            trigger.clickEvent(element);
            element = document.getElementById('pie_Series_0_Point_6');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
            done();
        };
        pie.selectionMode = 'Point';
        pie.refresh();
    });
    it('Doughnut - MultiSelect true Selection Mode Point', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_3');
            trigger.clickEvent(element);
            element = document.getElementById('pie_Series_0_Point_6');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 4).toBe(true);
            done();
        };
        pie.selectionMode = 'Point';
        pie.isMultiSelect = true;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Doughnut - Single point selection and UnSelection', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_4');
            trigger.clickEvent(element);
            selected = document.getElementsByClassName(selection + '0');
            expect(element === <HTMLElement>selected[0]).toBe(true);
            trigger.clickEvent(element);
            selected = document.getElementsByClassName(selection + '0');
            expect(selected.length === 0).toBe(true);
            done();
        };
        pie.selectionMode = 'Point';
        pie.isMultiSelect = false;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Doughnut - Multiple point selection and UnSelection', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            let selectedLength: number;
            for (i = 0, length = pie.visibleSeries[0].points.length, j = 1; i < length; i++ , j++) {
                element = document.getElementById('pie_Series_0_Point_' + i);
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + 0);
                expect(selected.length === (2 * j)).toBe(true);
            }
            selectedLength = selected.length;
            for (i = pie.visibleSeries[0].points.length - 1, j = 1; i > 0; i-- , j++) {
                element = document.getElementById('pie_Series_0_Point_' + i);
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + 0);
                expect(selected.length === selectedLength - (2 * j)).toBe(true);
            }
            done();
        };
        pie.selectionMode = 'Point';
        pie.isMultiSelect = true;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Doughnut - Selected DataIndexes checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
            done();
        };
        pie.selectionMode = 'Point';
        pie.selectedDataIndexes = [{ series: 0, point: 2 }];
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Doughnut - Selected Legend toggle visible false', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_chart_legend_shape_1');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 0).toBe(true);
            done();
        };
        pie.legendSettings.toggleVisibility = false;
        pie.selectedDataIndexes = [];
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Doughnut - Set selectionstyle property', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_3');
            trigger.clickEvent(element);
            expect(element.getAttribute('class') === 'selection').toBe(true);
            element = document.getElementById('pie_chart_legend_shape_3');
            expect(element.getAttribute('class') === 'selection').toBe(true);
            done();
        };
        pie.series[0].selectionStyle = 'selection';
        pie.refresh();
    });
    it('Doughnut - point selection while click the correspoding Datalabel ', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_datalabel_Series_0_text_0');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
            done();
        };
        pie.selectionMode = 'Point';
        pie.series[0].selectionStyle = null;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Doughnut - Selected Legend toggle visible true', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_chart_legend_shape_3');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length).toBe(0);
            done();
        };
        pie.legendSettings.toggleVisibility = true;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Pie - MultiSelect false Selection Mode Point', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_3');
            trigger.clickEvent(element);
            element = document.getElementById('pie_Series_0_Point_1');
            trigger.clickEvent(element);
            element = document.getElementById('pie_Series_0_Point_6');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
            done();
        };
        pie.series[0].innerRadius = '0%';
        pie.legendSettings.toggleVisibility = false;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.isMultiSelect = false;
        pie.refresh();
    });
    it('Pie - MultiSelect true Selection Mode Point', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_' + 3);
            trigger.clickEvent(element);
            element = document.getElementById('pie_Series_0_Point_' + 6);
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 4).toBe(true);
            done();
        };
        pie.selectionMode = 'Point';
        pie.isMultiSelect = true;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Pie - Single point selection and UnSelection', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_4');
            trigger.clickEvent(element);
            selected = document.getElementsByClassName(selection + '0');
            expect(element === <HTMLElement>selected[0]).toBe(true);
            trigger.clickEvent(element);
            selected = document.getElementsByClassName(selection + '0');
            expect(selected.length === 0).toBe(true);
            done();
        };
        pie.selectionMode = 'Point';
        pie.isMultiSelect = false;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Pie - Multiple point selection and UnSelection', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            let selectedLength: number;
            for (i = 0, length = pie.visibleSeries[0].points.length, j = 1; i < length; i++ , j++) {
                element = document.getElementById('pie_Series_0_Point_' + i);
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + 0);
                expect(selected.length === (2 * j)).toBe(true);
            }
            selectedLength = selected.length;
            for (i = pie.visibleSeries[0].points.length - 1, j = 1; i > 0; i-- , j++) {
                element = document.getElementById('pie_Series_0_Point_' + i);
                trigger.clickEvent(element);
                selected = document.getElementsByClassName(selection + 0);
                expect(selected.length === selectedLength - (2 * j)).toBe(true);
            }
            done();
        };
        pie.selectionMode = 'Point';
        pie.isMultiSelect = true;
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Pie - Selected DataIndexes checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
            done();
        };
        pie.selectionMode = 'Point';
        pie.selectedDataIndexes = [{ series: 0, point: 2 }];
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Pie - Selected Legend toggle visible false', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_chart_legend_text_1');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 0).toBe(true);
            done();
        };
        pie.legendSettings.toggleVisibility = false;
        pie.selectedDataIndexes = [];
        pie.accumulationSelectionModule.selectedDataIndexes = [];
        pie.refresh();
    });
    it('Pie - Set selectionstyle property', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_3');
            trigger.clickEvent(element);
            expect(element.getAttribute('class') === 'selection').toBe(true);
            element = document.getElementById('pie_chart_legend_shape_3');
            expect(element.getAttribute('class') === 'selection').toBe(true);
            done();
        };
        pie.series[0].selectionStyle = 'selection';
        pie.refresh();
    });
    it('Pie - Selected Legend toggle visible true', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_3');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 0).toBe(true); //2
            element = document.getElementById('pie_chart_legend_shape_2');
            trigger.clickEvent(element);
            expect(element.getAttribute('class') === '').toBe(true); //''
            done();
        };
        pie.legendSettings.toggleVisibility = true ;
        pie.series[0].selectionStyle = null;
        pie.visibleSeries[0].explode = true;
        pie.refresh();
    });
    it('Pie - Selected without legend', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_3');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length >= 0).toBe(true);
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 0).toBe(true);
            done();
        };
        pie.legendSettings.visible = false;
        pie.refresh();
    });
    it('Pie - Selected Legend click on selected point', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            element = document.getElementById('pie_Series_0_Point_4');
            trigger.clickEvent(element);
            expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
            element = document.getElementById('pie_chart_legend_shape_4');
            trigger.clickEvent(element);
            expect(element.getAttribute('class') === selection + '0').toBe(true);
            trigger.clickEvent(element);
            element = document.getElementById('pie_Series_0_Point_4');
            expect(element).toBe(null);
            done();
        };
        pie.legendSettings.toggleVisibility = true ;
        pie.legendSettings.visible = true ;
        pie.refresh();
    });
});