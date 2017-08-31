/**
 * AccumulationChart legend Series Spec file
 */
import { createElement } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { PieSeries } from '../../../src/accumulation-chart/renderer/pie-series';
import { AccumulationChart } from '../../../src/accumulation-chart/accumulation';
import { AccumulationLegend } from '../../../src/accumulation-chart/renderer/legend';
import { removeElement, getElement } from '../../../src/common/utils/helper';
import { AccumulationDataLabel } from '../../../src/accumulation-chart/renderer/dataLabel';
import { piedata} from '../../chart/base/data.spec';
import { MouseEvents } from '../../chart/base/events.spec';
import { IAccLoadedEventArgs } from '../../../src/accumulation-chart/model/pie-interface';
import '../../../node_modules/es6-promise/dist/es6-promise';
AccumulationChart.Inject(PieSeries, AccumulationLegend, AccumulationDataLabel);
let pointData: Object[] = [];
export function generateData(count: number): Object[] {
    let currentPoint: Object;
    let value: number;
    for (let i: number = 0; i < count; i++) {
        value = Math.round(Math.random() * 100);
        currentPoint = { x: i, y: value, text: 'Point_' + i };
        pointData.push(currentPoint);
    }
    return pointData;
}
describe('Legend checking for the pie series', () => {
    let ele: HTMLElement;
    let loaded: EmitType<IAccLoadedEventArgs>;
    let id: string = 'ej2container';
    let legendEle: Element;
    let legendId: string = id + '_chart_legend';
    let pie: AccumulationChart;
    let trigger: MouseEvents = new MouseEvents();
    beforeAll((): void => {
        ele = createElement('div', { id: id });
        document.body.appendChild(ele);
        pie = new AccumulationChart({
            border: { width: 1, color: 'blue' },
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
        pie.accumulationLegendModule.destroy(pie);
        pie.destroy();
        pie.loaded = null;
        removeElement(id);
    });
    it('Pie Legend visibility false checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_g');
            expect(legendEle).toBe(null);
            done();
        };
        pie.refresh();
    });
    it('Pie Legend visibility visible checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_translate_g');
            expect(legendEle.childNodes.length).toBe(10);
            expect(legendEle.childNodes.length).toBe(pie.visibleSeries[0].points.length);
            done();
        };
        pie.legendSettings.visible = true;
        pie.refresh();
    });
    it('Pie Legend auto position chekcing width is greater than height', () => {
        legendEle = getElement(legendId + '_element');
        
        expect(legendEle.getAttribute('x') === '487.875' || legendEle.getAttribute('x') === '488.625').toBe(true);
        
        expect(legendEle.getAttribute('y') === '76' || legendEle.getAttribute('y') === '71').toBe(true);
        
        expect(legendEle.getAttribute('height') === '248' || legendEle.getAttribute('height') === '258').toBe(true);
        
        expect(legendEle.getAttribute('width') === '44' || legendEle.getAttribute('width') === '43').toBe(true);
    });
    it('Pie Legend auto position chekcing while width is less than height', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '43' || legendEle.getAttribute('x') === '44').toBe(true);
            
            expect(legendEle.getAttribute('y') === '496.875' || legendEle.getAttribute('y') === '496.125').toBe(true);
            
            expect(legendEle.getAttribute('height') === '32' || legendEle.getAttribute('height') === '33').toBe(true);
            
            expect(legendEle.getAttribute('width') === '314' || legendEle.getAttribute('width') === '312').toBe(true);
            done();
        };
        pie.height = '600';
        pie.width = '400';
        pie.refresh();
    });
    it('Pie Legend left position chekcing', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '68.125' || legendEle.getAttribute('x') === '68.375').toBe(true);
            
            expect(legendEle.getAttribute('y') === '76' || legendEle.getAttribute('y') === '71').toBe(true);
            
            expect(legendEle.getAttribute('height') === '248' || legendEle.getAttribute('height') === '258').toBe(true);
            
            expect(legendEle.getAttribute('width') === '44' || legendEle.getAttribute('width') === '43').toBe(true);
            done();
        };
        pie.legendSettings.position = 'Left';
        pie.height = '400';
        pie.width = '600';
        pie.refresh();
    });
    it('Pie Legend Top position chekcing', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '143' || legendEle.getAttribute('x') === '144').toBe(true);
            
            expect(legendEle.getAttribute('y') === '27.625' || legendEle.getAttribute('y') === '27.57499999999999').toBe(true);
            
            expect(legendEle.getAttribute('height') === '32' || legendEle.getAttribute('height') === '33').toBe(true);
            
            expect(legendEle.getAttribute('width') === '314' || legendEle.getAttribute('width') === '312').toBe(true);
            done();
        };
        pie.legendSettings.position = 'Top';
        pie.refresh();
    });
    it('Pie Legend Bottom position chekcing', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '143' || legendEle.getAttribute('x') === '144').toBe(true);
            
            expect(legendEle.getAttribute('y') === '340.375' || legendEle.getAttribute('y') === '339.42499999999995').toBe(true);
            
            expect(legendEle.getAttribute('height') === '32' || legendEle.getAttribute('height') === '33').toBe(true);
            
            expect(legendEle.getAttribute('width') === '314' || legendEle.getAttribute('width') === '312').toBe(true);
            done();
        };
        pie.legendSettings.position = 'Bottom';
        pie.refresh();
    });
    it('Pie Legend Right position chekcing', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '487.875' || legendEle.getAttribute('x') === '488.625').toBe(true);
            
            expect(legendEle.getAttribute('y') === '76' || legendEle.getAttribute('y') === '71').toBe(true);
            
            expect(legendEle.getAttribute('height') === '248' || legendEle.getAttribute('height') === '258').toBe(true);
            
            expect(legendEle.getAttribute('width') === '44' || legendEle.getAttribute('width') === '43').toBe(true);
            done();
        };
        pie.legendSettings.position = 'Right';
        pie.refresh();
    });
    it('Pie Legend Right position chekcing with fixed legend size', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            expect(legendEle).not.toBe(null);
            done();
        };
        pie.legendSettings.height = '100';
        pie.legendSettings.width = '90';
        pie.refresh();
    });
    it('Pie Legend Left position chekcing with fixed legend size', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            expect(legendEle.getAttribute('x')).toBe('56.625');
            expect(legendEle.getAttribute('y')).toBe('150');
            expect(legendEle.getAttribute('height')).toBe('100');
            expect(legendEle.getAttribute('width')).toBe('90');
            done();
        };
        pie.legendSettings.position = 'Left';
        pie.refresh();
    });
    it('Pie Legend Top position chekcing with fixed legend size', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            expect(legendEle.getAttribute('x')).toBe('255');
            expect(legendEle.getAttribute('y')).toBe('24.224999999999994');
            expect(legendEle.getAttribute('height')).toBe('100');
            expect(legendEle.getAttribute('width')).toBe('90');
            done();
        };
        pie.legendSettings.position = 'Top';
        pie.refresh();
    });
    it('Pie Legend Bottom position chekcing with fixed legend size', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            expect(legendEle).not.toBe(null);
            done();
        };
        pie.legendSettings.position = 'Bottom';
        pie.refresh();
    });
    it('Smart Legend placing datalabel Inside, legend position right, exploding length greater than chart width', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '518.2750000000001' || legendEle.getAttribute('x') === '519.0250000000001').toBe(true);
            
            expect(legendEle.getAttribute('y') === '76' || legendEle.getAttribute('y') === '71').toBe(true);
            
            expect(legendEle.getAttribute('height') === '248' || legendEle.getAttribute('height') === '258').toBe(true);
            
            expect(legendEle.getAttribute('width') === '44' || legendEle.getAttribute('width') === '43').toBe(true);
            done();
        };
        pie.visibleSeries[0].explode = true;
        pie.visibleSeries[0].explodeOffset = '40%';
        pie.legendSettings.position = 'Right';
        pie.legendSettings.height = null;
        pie.legendSettings.width = null;
        pie.refresh();
    });
    it('Smart Legend placing datalabel Inside, legend position right, exploding length less than chart width', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '668.275' || legendEle.getAttribute('x') === '669.025').toBe(true);
            
            expect(legendEle.getAttribute('y') === '76' || legendEle.getAttribute('y') === '71').toBe(true);
            
            expect(legendEle.getAttribute('height') === '248' || legendEle.getAttribute('height') === '258').toBe(true);
            
            expect(legendEle.getAttribute('width') === '44' || legendEle.getAttribute('width') === '43').toBe(true);
            done();
        };
        pie.width = '800';
        pie.refresh();
    });
    it('Smart Legend placing datalabel Inside, legend position left, exploding length less than chart width', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '87.725' || legendEle.getAttribute('x') === '87.975').toBe(true);
            
            expect(legendEle.getAttribute('y') === '76' || legendEle.getAttribute('y') === '71').toBe(true);
            
            expect(legendEle.getAttribute('height') === '248' || legendEle.getAttribute('height') === '258').toBe(true);
            
            expect(legendEle.getAttribute('width') === '44' || legendEle.getAttribute('width') === '43').toBe(true);
            done();
        };
        pie.legendSettings.position = 'Left';
        pie.refresh();
    });
    it('Smart Legend placing datalabel Inside, legend position left, exploding length greater than chart width', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '37.725' || legendEle.getAttribute('x') === '37.975').toBe(true);
            
            expect(legendEle.getAttribute('y') === '76' || legendEle.getAttribute('y') === '71').toBe(true);
            
            expect(legendEle.getAttribute('height') === '248' || legendEle.getAttribute('height') === '258').toBe(true);
            
            expect(legendEle.getAttribute('width') === '44' || legendEle.getAttribute('width') === '43').toBe(true);
            done();
        };
        pie.width = '600';
        pie.refresh();
    });
    it('Smart Legend placing datalabel Inside, legend position top, exploding length greater than chart height', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            
            expect(legendEle.getAttribute('x') === '43' || legendEle.getAttribute('x') === '44').toBe(true);
            
            expect(legendEle.getAttribute('y') === '10' || legendEle.getAttribute('y') === '10').toBe(true);
            
            expect(legendEle.getAttribute('height') === '32' || legendEle.getAttribute('height') === '33').toBe(true);
            
            expect(legendEle.getAttribute('width') === '314' || legendEle.getAttribute('width') === '312').toBe(true);
            done();
        };
        pie.legendSettings.position = 'Top';
        pie.width = '400';
        pie.refresh();
    });
    it('Smart Legend placing datalabel Inside, legend position top, exploding length less than chart height', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            expect(legendEle).not.toBe(null);
            done();
        };
        pie.height = '600';
        pie.refresh();
    });
    it('Smart Legend placing datalabel Inside, legend position bottom, exploding length less than chart height', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            expect(legendEle).not.toBe(null);
            done();
        };
        pie.legendSettings.position = 'Bottom';
        pie.refresh();
    });
    it('Smart Legend placing datalabel Inside, legend position bottom, exploding length greater than chart height', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_element');
            expect(legendEle).not.toBe(null);
            done();
        };
        pie.height = '400';
        pie.refresh();
    });
    it('Pie Legend paging feature checking for position right with default height, width', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_translate_g');
            legendEle = getElement(legendId + '_pagedown');
            trigger.clickEvent(legendEle);
            legendEle = getElement(legendId + '_pagenumber');
            expect(legendEle.textContent).toBe('2/4');
            legendEle = getElement(legendId + '_element_clipPath_rect');
            expect(legendEle.getAttribute('x') === '310' || legendEle.getAttribute('x') === '306').toBe(true);
            expect(legendEle.getAttribute('y')).toBe('18');
            expect(legendEle.getAttribute('width') === '72' || legendEle.getAttribute('width') === '76').toBe(true);
            expect(legendEle.getAttribute('height') === '360' || legendEle.getAttribute('height') === '350').toBe(true);
            done();
        };
        pie.legendSettings.height = null;
        pie.legendSettings.width = null;
        pie.legendSettings.position = 'Right';
        pie.series[0].dataSource = generateData(100);
        pie.refresh();
    });
    it('Pie Legend paging feature checking for position bottom with default height, width', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            legendEle = getElement(legendId + '_translate_g');
            expect(legendEle.childNodes.length).toBe(100);
            expect(legendEle.childNodes.length).toBe(pie.visibleSeries[0].points.length);
            legendEle = getElement(legendId + '_pagedown');
            trigger.clickEvent(legendEle);
            legendEle = getElement(legendId + '_pagenumber');
            expect(legendEle.textContent).toBe('3/4');
            legendEle = getElement(legendId + '_pageup');
            trigger.clickEvent(legendEle);
            legendEle = getElement(legendId + '_pagenumber');
            expect(legendEle.textContent).toBe('2/4');
            done();
        };
        pie.legendSettings.position = 'Bottom';
        pie.refresh();
    });
    it('Pie Legend point click visible and hidden checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            pie.loaded = null;
            expect(pie.visibleSeries[0].points[4].visible).toBe(true);
            legendEle = getElement(legendId + '_shape_4');
            expect(legendEle.getAttribute('fill')).toBe('#f8b883');
            legendEle = getElement(legendId + '_text_4');
            expect(legendEle.getAttribute('fill')).not.toBe('#D3D3D3');
            trigger.clickEvent(legendEle);
            legendEle = getElement(legendId + '_text_4');
            expect(legendEle.getAttribute('fill')).toBe('#D3D3D3');
            legendEle = getElement(legendId + '_shape_4');
            expect(legendEle.getAttribute('fill')).toBe('#D3D3D3');
            expect(pie.visibleSeries[0].points[4].visible).toBe(false);
            trigger.clickEvent(legendEle);
            expect(pie.visibleSeries[0].points[4].visible).toBe(true);
            legendEle = getElement(legendId + '_shape_4');
            expect(legendEle.getAttribute('fill')).toBe('#f8b883');
            legendEle = getElement(legendId + '_text_4');
            expect(legendEle.getAttribute('fill')).not.toBe('#D3D3D3');
            done();
        };
        pie.series[0].dataSource = piedata;
        pie.refresh();
    });
    it('Doughnut Single point Legend', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            pie.loaded = null;
            legendEle = getElement(legendId + '_shape_0');
            expect(legendEle.getAttribute('fill')).toBe('#00bdae');
            expect(pie.visibleSeries[0].points.length).toBe(1);
            expect(pie.visibleSeries[0].points[0].visible).toBe(true);
            legendEle = getElement(legendId + '_g_0');
            expect(legendEle.childNodes.length).toBe(3);
            expect((<HTMLElement>legendEle.childNodes[0]).getAttribute('fill')).toBe('#00bdae');
            expect((<HTMLElement>legendEle.childNodes[1]).getAttribute('fill')).toBe('#FFFFFF');
            expect((<HTMLElement>legendEle.childNodes[2]).textContent.indexOf('...') > -1 ||
            (<HTMLElement>legendEle.childNodes[2]).textContent === 'Single Point').toBe(true);
            done();
        };
        pie.series[0].dataSource = [{ x: 'Single Point', text: 'Single point text', y: 10}];
        pie.series[0].innerRadius = '40%';
        pie.legendSettings.position = 'Right';
        pie.refresh();
    });
    it('Pie Single point Legend', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            pie.loaded = null;
            legendEle = getElement(legendId + '_shape_0');
            expect(legendEle.getAttribute('fill')).toBe('#00bdae');
            expect(pie.visibleSeries[0].points.length).toBe(1);
            expect(pie.visibleSeries[0].points[0].visible).toBe(true);
            legendEle = getElement(legendId + '_g_0');
            expect(legendEle.childNodes.length).toBe(2);
            expect((<HTMLElement>legendEle.childNodes[0]).getAttribute('fill')).toBe('#00bdae');
            expect((<HTMLElement>legendEle.childNodes[1]).textContent).toBe('Single Point');
            done();
        };
        pie.series[0].innerRadius = '0%';
        pie.height = '400';
        pie.width = '600';
        pie.refresh();
    });
    it('Legend long text trimming feature checking', (done: Function) => {
        pie.loaded = (args: IAccLoadedEventArgs) => {
            pie.loaded = null;
            legendEle = getElement(legendId + '_shape_0');
            expect(legendEle.getAttribute('fill')).toBe('#00bdae');
            expect(pie.visibleSeries[0].points.length).toBe(1);
            expect(pie.visibleSeries[0].points[0].visible).toBe(true);
            legendEle = getElement(legendId + '_g_0');
            expect(legendEle.childNodes.length).toBe(2);
            expect((<HTMLElement>legendEle.childNodes[0]).getAttribute('fill')).toBe('#00bdae');
            expect((<HTMLElement>legendEle.childNodes[1]).textContent.indexOf('...') > -1).toBe(true);
            legendEle = getElement(legendId + '_text_0');
            trigger.mousemoveEvent(legendEle, 0, 0, 460, 210);
            legendEle = getElement('EJ2_legend_tooltip');
            expect(legendEle.textContent).toBe('Single Point legend long text trimming feature checking');
            expect((<HTMLDivElement>legendEle).style.left).toBe('470px');
            expect((<HTMLDivElement>legendEle).style.top).toBe('220px');
            legendEle = getElement(id);
            trigger.mousemoveEvent(legendEle, 0, 0, 100, 20);
            legendEle = getElement('EJ2_legend_tooltip');
           // expect(legendEle).toBe(null);
            done();
        };
        pie.series[0].dataSource = [{ x: 'Single Point legend long text trimming feature checking', text: 'Single point text', y: 10}];
        pie.refresh();
    });
});