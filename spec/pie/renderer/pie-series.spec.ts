/**
 * AccumulationChart Series Spec file
 */
import { createElement } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { PieSeries } from '../../../src/accumulation/renderer/pie-series';
import { AccumulationChart } from '../../../src/accumulation/accumulation';
import { AccumulationLegend } from '../../../src/accumulation/renderer/legend';
import { PiePoints } from '../../../src/accumulation/model/acc-base';
import { getAngle, getElement, removeElement } from '../../../src/common/utils/helper';
import { AccumulationDataLabel } from '../../../src/accumulation/renderer/dataLabel';
import { piedata} from '../../chart/base/data.spec';
import { getLocations, SliceOption} from '../base/util.spec';
import { MouseEvents } from '../../chart/base/events.spec';
import { IPieLoadedEventArgs } from '../../../src/accumulation/model/pie-interface';
import '../../../node_modules/es6-promise/dist/es6-promise';
AccumulationChart.Inject(PieSeries, AccumulationLegend, AccumulationDataLabel);

describe('Pie Series checking', () => {
    let ele: HTMLElement;
    let slice: Element;
    let loaded: EmitType<IPieLoadedEventArgs>;
    let id: string = 'ej2container'; let pieGroupId: string = id + 'SeriesGroup0';
    let sliceid: string = id + '_Series_0' + '_Point_';
    let slicepath: SliceOption;
    let y: number;
    let i: number = 0;
    let length: number;
    let pie: AccumulationChart; let points: PiePoints[];
    let trigger: MouseEvents = new MouseEvents();
    beforeAll((): void => {
        ele = createElement('div', { id: id });
        document.body.appendChild(ele);
        pie = new AccumulationChart({
            series: [
                {
                    type: 'Pie',
                    dataLabel: { visible: false, name: 'text' },
                    dataSource: piedata, animation: { enable: false }, xName: 'x', yName: 'y'
                }
            ], width: '600', height: '400', legendSettings: { visible: false}
        });
        pie.appendTo('#' + id);
    });

    afterAll((): void => {
        pie.loaded = null;
        pie.destroy();
        removeElement(id);
    });
    it('center of the pie segments', (done: Function) => {
        pie.loaded = () => {
            slice = getElement(sliceid + 0);
            slicepath = getLocations(slice.getAttribute('d'));
            expect(slicepath.center.x).toBe(300);
            expect(slicepath.center.y).toBe(200);
            done();
        };
    });
    it('total angle is 180 then start angle is 180 then center point Y is 75%', (done: Function) => {
        pie.series[0].startAngle = 180;
        pie.series[0].endAngle = 360;
        pie.loaded = () => {
            slice = getElement(sliceid + 0);
            slicepath = getLocations(slice.getAttribute('d'));
            expect(slicepath.center.x).toBe(376);
            expect(slicepath.center.y).toBe(200);
            done();
        };
        pie.refresh();
    });
    it('total angle is 180 then start angle is 0 then center point Y is 25%', (done: Function) => {
        pie.series[0].startAngle = 0;
        pie.series[0].endAngle = 180;
        pie.loaded = () => {
            slice = getElement(sliceid + 0);
            slicepath = getLocations(slice.getAttribute('d'));
            expect(slicepath.center.x).toBe(224);
            expect(slicepath.center.y).toBe(200);
            done();
        };
        pie.refresh();
    });
    it('total angle is 180 then start angle is 90 then center point X is 75%', (done: Function) => {
        pie.series[0].startAngle = 90;
        pie.series[0].endAngle = 270;
        pie.loaded = () => {
            slice = getElement(sliceid + 0);
            slicepath = getLocations(slice.getAttribute('d'));
            expect(slicepath.center.x).toBe(300);
            expect(slicepath.center.y).toBe(124);
            done();
        };
        pie.refresh();
    });
    it('total angle is 180 then start angle is 270 then center point X is 25%', (done: Function) => {
        pie.series[0].startAngle = 270;
        pie.series[0].endAngle = 90;
        pie.loaded = () => {
            slice = getElement(sliceid + 0);
            slicepath = getLocations(slice.getAttribute('d'));
            expect(slicepath.center.x).toBe(300);
            expect(slicepath.center.y).toBe(276);
            done();
        };
        pie.refresh();
    });
    it('start and end of the pie segments', (done: Function) => {
        pie.series[0].startAngle = 0;
        pie.series[0].endAngle = 360;
        pie.loaded = () => {
            slice = getElement(sliceid + 0);
            slicepath = getLocations(slice.getAttribute('d'));
            let angle: number = getAngle(slicepath.center, slicepath.start);
            expect(angle).toBe(269.9893826806963);
            slice = getElement(sliceid + 5);
            slicepath = getLocations(slice.getAttribute('d'));
            angle = getAngle(slicepath.center, slicepath.start);
            expect(Math.round(angle)).toBe(13);
            slice = getElement(sliceid + 9);
            slicepath = getLocations(slice.getAttribute('d'));
            angle = getAngle(slicepath.center, slicepath.end);
            expect(Math.round(angle)).toBe(270);
            done();
        };
        pie.refresh();
    });
    it('start and end angle changing checking for pie segments', (done: Function) => {
        pie.series[0].startAngle = 180;
        pie.series[0].endAngle = 90;
        pie.loaded = () => {
            slice = getElement(sliceid + 0);
            slicepath = getLocations(slice.getAttribute('d'));
            let angle: number = getAngle(slicepath.center, slicepath.start);
            expect(angle).toBe(90);
            slice = getElement(sliceid + 9);
            slicepath = getLocations(slice.getAttribute('d'));
            angle = getAngle(slicepath.center, slicepath.end);
            expect(Math.round(angle)).toBe(360);
            done();
        };
        pie.refresh();
    });
    it('checking club point', (done: Function) => {
        pie.series[0].startAngle = 0;
        pie.series[0].endAngle = 360;
        pie.series[0].clubbingValue = '30';
        pie.loaded = (args: IPieLoadedEventArgs) => {
            let points: PiePoints[] = args.pie.visibleSeries[0].points;
            expect(points.length).toBe(9);
            done();
        };
        pie.refresh();
    });
    it('checking quarter angle', (done: Function) => {
        pie.series[0].startAngle = 0;
        pie.series[0].endAngle = 90;
        pie.series[0].clubbingValue = '0';
        pie.loaded = (args: IPieLoadedEventArgs) => {
            let points: PiePoints[] = args.pie.visibleSeries[0].points;
            expect(points.length).toBe(10);
            done();
        };
        pie.refresh();
    });
    it('checking quarter angle', (done: Function) => {
        pie.series[0].startAngle = 90;
        pie.series[0].endAngle = 180;
        pie.series[0].clubbingValue = '0';
        pie.loaded = (args: IPieLoadedEventArgs) => {
            let points: PiePoints[] = args.pie.visibleSeries[0].points;
            expect(points.length).toBe(10);
            done();
        };
        pie.refresh();
    });
    it('checking quarter angle', (done: Function) => {
        pie.series[0].startAngle = 180;
        pie.series[0].endAngle = 270;
        pie.series[0].clubbingValue = '0';
        pie.loaded = (args: IPieLoadedEventArgs) => {
            let points: PiePoints[] = args.pie.visibleSeries[0].points;
            expect(points.length).toBe(10);
            done();
        };
        pie.refresh();
    });
    it('checking quarter angle', (done: Function) => {
        pie.series[0].startAngle = 270;
        pie.series[0].endAngle = 360;
        pie.series[0].clubbingValue = '0';
        pie.loaded = (args: IPieLoadedEventArgs) => {
            let points: PiePoints[] = args.pie.visibleSeries[0].points;
            expect(points.length).toBe(10);
            done();
        };
        pie.refresh();
    });
    it('checking lees than quarter angle', (done: Function) => {
        pie.series[0].startAngle = 150;
        pie.series[0].endAngle = 230;
        pie.loaded = (args: IPieLoadedEventArgs) => {
            let points: PiePoints[] = args.pie.visibleSeries[0].points;
            expect(points.length).toBe(10);
            done();
        };
        pie.refresh();
    });
    it('checking pie bound', (done: Function) => {
        pie.series[0].startAngle = 0;
        pie.series[0].endAngle = 360;
        pie.series[0].dataLabel.visible = true;
        pie.series[0].dataLabel.position = 'Outside';
        pie.loaded = (args: IPieLoadedEventArgs) => {
            let points: PiePoints[] = args.pie.visibleSeries[0].points;
            expect(points.length).toBe(10);
            done();
        };
        pie.refresh();
    });
    it('checking pie explode and deexplode', (done: Function) => {
        pie.visibleSeries[0].explode = true;
        pie.visibleSeries[0].explodeIndex = 2;
        pie.loaded = (args: IPieLoadedEventArgs) => {
            slice = getElement(sliceid + 2);
            expect(slice.getAttribute('transform')).not.toBe(null);
            slice = getElement(sliceid + 0);
            trigger.clickEvent(slice);
            expect(slice.getAttribute('transform')).not.toBe(null);
            slice = getElement(sliceid + 2);
            expect(slice.getAttribute('transform')).toBe('translate(0, 0)');
            done();
        };
        pie.refresh();
    });
    it('checking pie explode all', (done: Function) => {
        pie.visibleSeries[0].explodeAll = true;
        pie.loaded = (args: IPieLoadedEventArgs) => {
            slice = getElement(sliceid + 0);
            expect(slice.getAttribute('transform')).not.toBe(null);
            slice = getElement(sliceid + 2);
            expect(slice.getAttribute('transform').indexOf('translate(') > -1).toBe(true);
            slice = getElement(sliceid + 5);
            expect(slice.getAttribute('transform')).not.toBe('');
            done();
        };
        pie.refresh();
    });
});