/**
 * AccumulationChart tooltip Series Spec file
 */
import { createElement, remove } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { PieSeries } from '../../../src/accumulation-chart/renderer/pie-series';
import { AccumulationChart } from '../../../src/accumulation-chart/accumulation';
import { AccumulationLegend } from '../../../src/accumulation-chart/renderer/legend';
import { AccPoints } from '../../../src/accumulation-chart/model/acc-base';
import { getElement, ChartLocation } from '../../../src/common/utils/helper';
import { AccumulationDataLabel } from '../../../src/accumulation-chart/renderer/dataLabel';
import { AccumulationTooltip } from '../../../src/accumulation-chart/user-interaction/tooltip';
import { piedata} from '../../chart/base/data.spec';
import { MouseEvents } from '../../chart/base/events.spec';
import { getPosition, addTooltipStyles } from '../base/util.spec';
import { IAccLoadedEventArgs } from '../../../src/accumulation-chart/model/pie-interface';
import '../../../node_modules/es6-promise/dist/es6-promise';
AccumulationChart.Inject(PieSeries, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip);

describe('Tooltip checking for the pie series', () => {
    let ele: HTMLElement;
    let loaded: EmitType<IAccLoadedEventArgs>;
    let id: string = 'ej2container';
    let tooltipid: string = id + '_0_content';
    let sliceid: string = id + '_Series_0' + '_Point_';
    let x: number;
    let y: number;
    let i: number = 0;
    let length: number;
    let pie: AccumulationChart; let points: AccPoints[];
    let trigger: MouseEvents = new MouseEvents();
    let segement: Element;
    let tooltip: Element;
    let position: ChartLocation;
    let legendId: string = id + '_chart_legend_text_';

    beforeAll((): void => {
        ele = createElement('div', { id: id });
        document.body.appendChild(ele);
        let template: Element = createElement('div', { id: 'template', styles: 'display: none;' });
        document.body.appendChild(template);
        template.innerHTML = '<div>${x}</div><div>${y}</div>';
        addTooltipStyles();
        pie = new AccumulationChart({
            series: [
                {   name: 'Animals',
                    type: 'Pie',
                    dataLabel: { visible: false, name: 'data' },
                    dataSource: piedata, animation: { enable: false }, xName: 'name', yName: 'y'
                }
            ], width: '600', height: '400', legendSettings: { visible: false},
            tooltip: {
                 enable: false,
                 enableAnimation: false
            }
        });
        pie.appendTo('#' + id);
    });

    afterAll((): void => {
        remove(document.getElementsByClassName('e-tooltip-wrap')[0]);
        pie.accumulationTooltipModule.destroy(pie);
        pie.destroy();
        pie.loaded = null;
        remove(getElement(id));
        remove(getElement('template'));
    });
    it('Pie tooltip visibility false checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            segement = getElement(sliceid + 0);
            trigger.mousemoveEvent(segement, 0, 0, 200, 200);
            tooltip = getElement(tooltipid);
            expect(tooltip).toBe(null);
            done();
        };
    });
    it('Pie tooltip visibility true checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            segement = getElement(sliceid + 0);
            trigger.mousemoveEvent(segement, 0, 0, 200, 200);
            tooltip = getElement(tooltipid);
            expect(tooltip).not.toBe(null);
            done();
        };
        pie.tooltip.enable = true;
        pie.refresh();
    });
    it('Pie tooltip elements hierarchy checking', () => {
        expect(tooltip.childNodes.length).toBe(2);
        expect(tooltip.childNodes[0]).toBe(document.getElementsByClassName('e-tip-content')[0]);
        expect(tooltip.childNodes[0].childNodes.length).toBe(1);
        expect(tooltip.childNodes[0].childNodes[0].textContent).toBe('Bald Eagle : 18');
        expect(tooltip.childNodes[1]).toBe(document.getElementsByClassName('e-arrow-tip')[0]);
        expect(tooltip.childNodes[1].childNodes.length).toBe(2);
        expect(tooltip.childNodes[1].childNodes[0]).toBe(document.getElementsByClassName('e-arrow-tip-outer')[0]);
        expect(tooltip.childNodes[1].childNodes[1]).toBe(document.getElementsByClassName('e-arrow-tip-inner')[0]);
    });
    it('Pie tooltip elements text checking', () => {
        expect(getElement(tooltipid).textContent).toBe('Bald Eagle : 18');
    });
    it('Pie tooltip elements border checking', () => {
        tooltip = document.getElementsByClassName('e-tooltip-wrap')[0];
        let color: string = pie.visibleSeries[0].points[0].color;
        expect(tooltip.getAttribute('style').indexOf('border-color: rgb(0, 189, 174);') > -1).toBe(true);
    });
    it('Pie tooltip elements position checking', () => {
        position = getPosition(<HTMLElement>tooltip);
        expect(position.x === 272 || position.x === 266 || position.x === 275).toBe(true);
        expect(position.y).toBe(100);
    });
    it('Pie tooltip moving to another point checking', () => {
        segement = getElement(sliceid + 5);
        trigger.mousemoveEvent(segement, 0, 0, 200, 200);
        tooltip = getElement(tooltipid);
        expect(tooltip).not.toBe(null);
        expect(getElement(tooltipid).textContent).toBe('Turkey : 62');
    });
    it('Pie tooltip leaving the point checking', () => {
        trigger.mousemoveEvent(ele, 0, 0, 0, 0);
        tooltip = getElement(tooltipid);
        expect(tooltip).not.toBe(null);
    });
    it('Pie tooltip format checking with single line', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            segement = getElement(sliceid + 6);
            trigger.mousemoveEvent(segement, 0, 0, 0, 0);
            tooltip = getElement(tooltipid);
            expect(tooltip).not.toBe(null);
            expect(getElement(tooltipid).textContent).toBe('Animals : Alligator : 74');
            trigger.mouseLeaveEvent(getElement(id));
            done();
        };
        pie.tooltip.format = '${series.name} : ${point.x} : ${point.y}';
        pie.series[0].innerRadius = '0%';
        pie.refresh();
    });
    it('Pie tooltip template checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            segement = getElement(sliceid + 4);
            trigger.mousemoveEvent(segement, 0, 0, 0, 0);
            tooltip = getElement(tooltipid);
            expect(tooltip).not.toBe(null);
            expect(getElement(tooltipid).textContent).toBe('Pronghorn52');
            trigger.mouseLeaveEvent(getElement(id));
            done();
        };
        pie.tooltip.template = '#template';
        pie.tooltip.enableAnimation = true;
        pie.refresh();
    });
    it('Pie tooltip touch end and move checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            segement = getElement(sliceid + 8);
            pie.pieMouseEnd(trigger.onTouchEnd(segement, 0, 0, 150, 150, 200, 200) as PointerEvent);
            tooltip = getElement(tooltipid);
            expect(tooltip).not.toBe(null);
            expect(tooltip.textContent).toBe('Mountain Lion : 96');
            segement = getElement(sliceid + 6);
            pie.pieMouseMove(trigger.onTouchMove(segement, 200, 200, 200, 200, 350, 300) as PointerEvent);
            tooltip = getElement(tooltipid);
            // here toooltip to be null but tooltip text content remains same due to time out removal of tooltip
            expect(tooltip.textContent).toBe('Mountain Lion : 96');
            segement = getElement(sliceid + 0);
            pie.pieMouseEnd(trigger.onTouchEnd(segement, 0, 0, 350, 300, 300, 100) as PointerEvent);
            expect(tooltip).not.toBe(null);
            expect(tooltip.textContent).toBe('Beaver : 102');
            pie.accumulationTooltipModule.removeTooltip();
            done();
        };
        pie.tooltip.template = null;
        pie.tooltip.format = '${point.x} : ${point.y}';
        pie.tooltip.enableAnimation = false;
        pie.refresh();
    });
    it('Pie tooltip touch end on exploded point', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            segement = getElement(sliceid + 8);
            pie.pieMouseEnd(trigger.onTouchEnd(segement, 0, 0, 150, 150, 200, 200) as PointerEvent);
            tooltip = getElement(tooltipid);
            expect(tooltip).not.toBe(null);
            expect(tooltip.textContent).toBe('Mountain Lion : 96');
            trigger.clickEvent(segement);
            segement.setAttribute('transform', 'translate(null, null)');
            segement = getElement(sliceid + 5);
            trigger.mousemoveEvent(segement, 0, 0, 200, 200);
            segement = getElement(sliceid + 8);
            trigger.mousemoveEvent(segement, 0, 0, 200, 200);
            tooltip = getElement(tooltipid);
            expect(tooltip).not.toBe(null);
            expect(tooltip.textContent).toBe('Mountain Lion : 96');
            done();
        };
        pie.visibleSeries[0].explode = true;
        pie.visibleSeries[0].explodeIndex = 8;
        pie.refresh();
    });
});