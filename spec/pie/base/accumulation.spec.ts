/**
 * AccumulationChart Series Spec file
 */
import { createElement } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { AccumulationChart} from '../../../src/accumulation/accumulation';
import { PiePoints, AccumulationSeries} from '../../../src/accumulation/model/acc-base';
import { Rect, getElement, removeElement} from '../../../src/common/utils/helper';
import { IPieLoadedEventArgs} from '../../../src/accumulation/model/pie-interface';
import { data, datetimeData1} from '../../chart/base/data.spec';
import { MouseEvents} from '../../chart/base/events.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';

describe('Pie and Doughnut Control Checking', () => {
    let element: Element; let loaded: EmitType<IPieLoadedEventArgs>;
    let svgObject: Element;
    let text: Element;
    let id: string = 'ej2container';
    let pie: AccumulationChart;
    let dataManager: DataManager = new DataManager({
        url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
    });
    let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
    let trigger: MouseEvents = new MouseEvents();
    beforeAll((): void => {
        element = createElement('div', { id: id });
        document.body.appendChild(element);
        pie = new AccumulationChart();
        pie.appendTo('#' + id);
    });

    afterAll((): void => {
        pie.destroy();
        removeElement(id);
    });
    it('Checking pie instance creation', (done: Function) => {
        pie.loaded = (args: Object): void => {
            expect(pie != null).toBe(true);
            done();
        };
    });
    it('empty options control class names', () => {
        element = getElement(id);
        expect(element.classList.contains('e-control')).toBe(true);
        expect(element.classList.contains('e-pie')).toBe(true);
    });
    it('empty option pie height and width', () => {
        svgObject = getElement(id + '_svg');
        expect(svgObject.getAttribute('height')).toBe('450');
        expect(svgObject.getAttribute('width')).not.toBe(null);
    });
    it('Checking module name', () => {
        expect(pie.getModuleName()).toBe('pie');
    });
    it('Checking the null width of the pie', (done: Function) => {
        pie.width = null;
        element.setAttribute('style', 'width:0px');
        pie.loaded = (args: Object) => {
            svgObject = getElement(id + '_svg');
            expect(svgObject.getAttribute('width')).toEqual('600');
            done();
        };
        pie.refresh();
    });
    it('Checking the percentage size of the pie width', (done: Function) => {
        pie.width = '50%';
        element.setAttribute('style', 'width:900px');
        pie.loaded = (args: Object) => {
            svgObject = getElement(id + '_svg');
            expect(svgObject.getAttribute('width')).toEqual('450');
            done();
        };
        pie.refresh();
    });
    it('Checking the percentage size of the pie height', (done: Function) => {
        pie.height = '50%';
        element.setAttribute('style', 'height:900px');
        pie.loaded = (args: Object) => {
            svgObject = getElement(id + '_svg');
            expect(svgObject.getAttribute('height')).toEqual('450');
            done();
        };
        pie.refresh();
    });
    it('Checking the height of the pie', () => {
        pie.height = '500';
        pie.loaded = null;
        pie.dataBind();
        svgObject = getElement(id + '_svg');
        expect(svgObject.getAttribute('height')).toEqual('500');
    });
    it('Checking both height and width of the pie', () => {
        pie.width = '500';
        pie.height = '300';
        pie.dataBind();
        svgObject = getElement(id + '_svg');
        expect(svgObject.getAttribute('width')).toEqual('500');
        expect(svgObject.getAttribute('height')).toEqual('300');
    });
    it('Checking with empty title', () => {
        text = getElement(id + '_title');
        expect(text).toBeNull();
    });
    it('Checking with  title', () => {
        pie.title = 'Syncfusion pie Title';
        pie.dataBind();
        text = getElement(id + '_title');
        expect(text.textContent).toBe('Syncfusion pie Title');       
        expect(text.getAttribute('y') === '25' || text.getAttribute('y') === '22.75').toEqual(true);
    });

    it('Checking the title font size', () => {
        pie.title = 'pie Title';
        pie.titleStyle.size = '24px';
        pie.dataBind();
        text = getElement(id + '_title');
        expect(text.getAttribute('font-size')).toEqual('24px');
    });
    it('Checking the border color', () => {
        pie.border.width = 2;
        pie.border.color = 'green';
        pie.dataBind();
        svgObject = getElement(id + '_border');
        expect(svgObject.getAttribute('stroke')).toBe('green');
        expect(svgObject.getAttribute('stroke-width')).toBe('2');
    });
    it('Checking the pie background', () => {
        pie.background = 'yellow';
        pie.dataBind();
        svgObject = getElement(id + '_border');
        expect(svgObject.getAttribute('fill')).toBe('yellow');
    });
    it('Checking the pie Margin with out title', () => {
        pie.margin = { left: 20, right: 10, top: 20, bottom: 30};
        pie.title = '';
        pie.dataBind();
        let rect: Rect = pie.initialClipRect;
        expect(rect.width).toEqual(344.5);
        expect(rect.height).toEqual(250);
        expect(rect.x).toEqual(20);
        expect(rect.y).toEqual(20);
    });
    it('Checking the pie Margin with title', () => {
        pie.title = 'pie Title';
        pie.dataBind();
        let rect: Rect = pie.initialClipRect;
        expect(rect.width).toEqual(344.5);      
        expect(rect.height === 218 || rect.height === 223).toEqual(true);
        expect(rect.x).toEqual(20);     
        expect(rect.y === 52 || rect.y === 47).toEqual(true);
    });
    it('Checking the pie with Series datapoints', (done: Function) => {
        loaded = (args: IPieLoadedEventArgs) => {
          let points: PiePoints[] = (<AccumulationSeries>args.pie.series[0]).points;
          expect(points.length).toBe(15);
          done();
        };
        pie.series = [{
            dataSource: data,
            xName: 'x', yName: 'y'
        }];
        pie.loaded = loaded;
        pie.refresh();
    });
    it('Checking the pie with DataTime Values', (done: Function) => {
        loaded = (args: IPieLoadedEventArgs) => {
          let points: PiePoints[] = (<AccumulationSeries>args.pie.series[0]).points;
          expect(points.length).toBe(6);
          done();
        };
        pie.series = [{
            dataSource: datetimeData1,
            xName: 'x', yName: 'y',
            animation: { enable: false}
        }];
        pie.loaded = loaded;
        pie.refresh();
    });
    it('Mouse events checking', () => {
        element = getElement(id);
        trigger.mousedownEvent(element, 100, 50, 100, 50);
        trigger.mouseupEvent(element, 100, 50, 100, 50);
        trigger.mouseoutEvent(element);
        let tapHold: Object = <Object>document.createEvent('MouseEvent');
        tapHold['pointerType'] = 'touch';
        pie.pieRightClick(tapHold as PointerEvent);
        let menu: Event = document.createEvent('MouseEvent');
        menu.initEvent('contextmenu', true, false);
        element.dispatchEvent(menu);
        pie.getPersistData();
    });
    it('resize checking', () => {
        window.dispatchEvent(new Event('resize'));
        svgObject = getElement(id + '_svg');
        expect(svgObject).not.toBe(null);
        expect(svgObject.getAttribute('width')).toBe('500');
        expect(svgObject.getAttribute('height')).toBe('300');
    });
});