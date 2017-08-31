/**
 * AccumulationChart Datalabel Spec file
 */
import { createElement } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { PieSeries } from '../../../src/accumulation-chart/renderer/pie-series';
import { AccumulationChart } from '../../../src/accumulation-chart/accumulation';
import { AccumulationLegend } from '../../../src/accumulation-chart/renderer/legend';
import { AccPoints } from '../../../src/accumulation-chart/model/acc-base';
import { isOverlap, getElement, removeElement, withInBounds, ChartLocation } from '../../../src/common/utils/helper';
import { AccumulationDataLabel } from '../../../src/accumulation-chart/renderer/dataLabel';
import { piedata, getDistance} from '../../chart/base/data.spec';
import { SliceOption} from '..//base/util.spec';
import { MouseEvents } from '../../chart/base/events.spec';
import { IAccLoadedEventArgs } from '../../../src/accumulation-chart/model/pie-interface';
import '../../../node_modules/es6-promise/dist/es6-promise';
AccumulationChart.Inject(PieSeries, AccumulationLegend, AccumulationDataLabel);

describe('Data Label checking for the pie doughnut series', () => {
    let ele: HTMLElement;
    let slice: HTMLElement;
    let loaded: EmitType<IAccLoadedEventArgs>;
    let id: string = 'ej2container'; let pieGroupId: string = id + 'SeriesGroup0';
    let sliceid: string = id + '_Series_0' + '_Point_';
    let slicepath: SliceOption;
    let datalabel: Element;
    let legendId: string = id + '_chart_legend_text_';
    let y: number;
    let labelId: string = id + '_datalabel_Series_0_text_';
    let shapeId: string = id + '_datalabel_Series_0_shape_';
    let connectorId: string = id + '_datalabel_Series_0_connector_';
    let i: number = 0;
    let j: number = 0;
    let overlap: boolean;
    let pie: AccumulationChart; let points: AccPoints[];
    let trigger: MouseEvents = new MouseEvents();
    beforeAll((): void => {
        ele = createElement('div', { id: id });
        document.body.appendChild(ele);
        pie = new AccumulationChart({
            title: 'Datalabel Spec',
            enableSmartLabels: false,
            series: [
                {
                    type: 'Pie',
                    dataLabel: { visible: false, name: 'text' },
                    dataSource: piedata, animation: { enable: false }, xName: 'x', yName: 'y'
                }
            ], width: '600', height: '400', legendSettings: { visible: true}
        });
        pie.appendTo('#' + id);
    });

    afterAll((): void => {
        pie.destroy();
        pie.loaded = null;
        removeElement(id);
    });
    it('Datalabel visibility false checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            datalabel = document.getElementById(id + '_datalabel_Series_0');
            expect(datalabel).toBe(null);
            done();
        };
    });
    it('Datalabel visibility visible checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            datalabel = document.getElementById(id + '_datalabel_Series_0');
            expect(datalabel.childNodes.length).toBe(10);
            done();
        };
        pie.series[0].dataLabel.visible = true;
        pie.refresh();
    });
    it('Datalabel common options', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            datalabel = getElement(labelId + 1);
            expect(datalabel.getAttribute('fill')).toBe('#ffffff');
            expect(datalabel.getAttribute('font-size')).toBe('18px');
            expect(datalabel.getAttribute('font-family')).toBe('courier');
            expect(datalabel.getAttribute('font-style')).toBe('italic');
            expect(datalabel.getAttribute('font-weight')).toBe('bold');
            datalabel = getElement(shapeId + 1);
            expect(datalabel.getAttribute('fill')).toBe('blue');
            expect(datalabel.getAttribute('stroke')).toBe('red');
            expect(datalabel.getAttribute('stroke-width')).toBe('2');
            expect(datalabel.getAttribute('rx')).toBe('5');
            expect(datalabel.getAttribute('ry')).toBe('5');
            done();
        };
        pie.series[0].dataLabel = {
            border: { color: 'red', width: 2}, fill: 'blue', rx: 5, ry : 5,
            font : {
                color: '#ffffff',
                size: '18px',
                fontFamily: 'courier',
                fontStyle: 'italic',
                fontWeight: 'bold'
            }
        };
        pie.refresh();
    });
    it('Datalabel Inside checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            points = pie.visibleSeries[0].points;
            expect(withInBounds(
                points[3].labelRegion.x, points[3].labelRegion.y, pie.visibleSeries[0].pieBound,
                points[3].labelRegion.width, points[3].labelRegion.height)).toBe(true);
            done();
        };
        pie.series[0].dataLabel.position = 'Inside';
        pie.refresh();
    });
    it('Datalabel Outside checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            datalabel = document.getElementById(connectorId + 2);
            expect(datalabel).not.toBe(null);
            done();
        };
        pie.series[0].dataLabel.position = 'Outside';
        pie.refresh();
    });
    it('Datalabel Outside connector line length', () => {
        let path: string[] = document.getElementById(connectorId + 3).getAttribute('d').split(' ');
        let start: ChartLocation = new ChartLocation(+path[1], +path[2]);
        let end: ChartLocation = new ChartLocation(+path[7], +path[8]);
        expect(getDistance(start, end)).toBeGreaterThan(10);
    });
    it('Datalabel checking for click on a legend point', () => {
        points = pie.visibleSeries[0].points;
        pie.loaded = null;
        trigger.clickEvent(getElement(legendId + 2));
        expect(points[2].labelRegion).toBe(null);
    });
    it('Datalabel Inside Smart Labels checking with title bound', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            points = args.pie.visibleSeries[0].points;
            expect(isOverlap(points[0].labelRegion, points[5].labelRegion)).toBe(false);
            expect(isOverlap(points[0].labelRegion, pie.accumulationDataLabelModule.titleRect)).toBe(false);
            done();
        };
        pie.enableSmartLabels = true;
        pie.series[0].dataLabel.position = 'Inside';
        pie.refresh();
    });
    it('Datalabel Outside Smart Labels checking with title bound', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            points = args.pie.visibleSeries[0].points;
            expect(isOverlap(points[2].labelRegion, points[5].labelRegion)).toBe(false);
            expect(isOverlap(points[2].labelRegion, pie.accumulationDataLabelModule.titleRect)).toBe(false);
            done();
        };
        pie.series[0].dataLabel.position = 'Outside';
        pie.refresh();
    });
    it('Datalabel trimmed label mouse move tooltip', () => {
        datalabel = getElement(labelId + 4);
        trigger.mousemoveEvent(datalabel, 0, 0, 210, 480);
        let tooltip: Element = getElement('EJ2_datalabel_tooltip');
        expect(tooltip).not.toBe(null);
        expect(tooltip.textContent).toBe('Pronghorn : 52');
        datalabel = getElement(labelId + 0);
        trigger.mousemoveEvent(datalabel, 0, 0, 400, 70);
        expect(getElement('EJ2_datalabel_tooltip')).toBe(null);
        datalabel = getElement(labelId + 4);
        pie.pieMouseEnd(trigger.onTouchEnd(datalabel, 0, 0, 210, 480, 210, 480) as PointerEvent);
        tooltip = getElement('EJ2_datalabel_tooltip');
        expect(tooltip).not.toBe(null);
        expect(tooltip.textContent).toBe('Pronghorn : 52');
    });
    it('Datalabel connector length and smart label visible', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            datalabel = document.getElementById(connectorId + 2);
            expect(datalabel).not.toBe(null);
            datalabel = document.getElementById(connectorId + 0);
            expect(datalabel).toBe(null);
            done();
        };
        pie.series[0].dataLabel.position = 'Outside';
        pie.series[0].dataLabel.connectorStyle = { length: '40px'};
        pie.refresh();
    });
    it('Datalabel animation', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            datalabel = document.getElementById(connectorId + 2);
            expect(datalabel).not.toBe(null);
            datalabel = document.getElementById(connectorId + 0);
            expect(datalabel).toBe(null);
            done();
        };
        pie.series[0].dataLabel.connectorStyle = { length: '10px'};
        pie.series[0].animation.enable = true;
        pie.series[0].radius = '100%';
        pie.refresh();
    });
    it('Datalabel color saturation checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            datalabel = getElement(labelId + 2);
            expect(datalabel.getAttribute('fill')).toBe('white');
            datalabel = getElement(labelId + 0);
            expect(datalabel.getAttribute('fill')).toBe('black');
            done();
        };
        pie.series[0].dataLabel = {
            position: 'Inside',
            visible: true,
            fill: 'transparent',
            border: {
                width: null,
                color: null
            },
            font: {
                color: null,
                size: '12px'
            }
        };
        pie.background = 'black';
        pie.series[0].animation.enable = false;
        pie.series[0].radius = '60%';
        pie.refresh();
    });
});