/**
 * Stripline Spec 
 */
import { EmitType } from '@syncfusion/ej2-base';
import { createElement } from '@syncfusion/ej2-base';
import { Chart } from '../../../src/chart/chart';
import { ILoadedEventArgs } from '../../../src/common/model/interface';
import { Series } from '../../../src/chart/series/chart-series';
import { StripLine } from '../../../src/chart/axis/strip-line';
import { DateTime } from '../../../src/chart/axis/date-time-axis';
import { Category } from '../../../src/chart/axis/category-axis';
import { Logarithmic } from '../../../src/chart/axis/logarithmic-axis';
import { SeriesModel } from '../../../src/chart/series/chart-series-model';
import { LineSeries } from '../../../src/chart/series/line-series';
import { AreaSeries } from '../../../src/chart/series/area-series';
import { Legend } from '../../../src/chart/legend/legend';
import { unbindResizeEvents } from '../base/data.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';
Chart.Inject(LineSeries, AreaSeries, Legend, StripLine, DateTime, Category, Logarithmic);
let i: number; let data: Points[] = []; let seriesCollection: SeriesModel[] = [];
for (let j: number = 0; j < 5; j++) {
    for (i = 0; i < 10; i++) {
        data.push({ x: i, y: Math.random() * 100 });
    }
    seriesCollection[j] = {
        name: 'Series ' + j,
        animation: { enable: false },
        dataSource: data, xName: 'x', yName: 'y', type: 'Line'
    };
    data = [];
}
let data1: Object[] = [
    { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
];
let data2: Object[] = [
    { x: 'USA', y: 30 }, { x: 'China', y: 23 },
    { x: 'Japan', y: 10 }, { x: 'Australia', y: 23 },
    { x: 'France', y: 20 }, { x: 'Germany', y: 45 },
    { x: 'Italy', y: 45 }, { x: 'Sweden', y: 31 }
];
interface Points {
    x: number;
    y: number;
}
describe('Chart control checking', () => {
    let chart: Chart;
    let id: string = 'stripline';
    let stripLineId: string = id + '_stripline';
    let stripLineElement: Element;
    let loaded: EmitType<ILoadedEventArgs>;
    let ele: HTMLElement;
    describe('Stripline checking', () => {
        beforeAll((): void => {
            ele = createElement('div', { id: id });
            ele.style.background = 'transparent';
            document.body.appendChild(ele);
            chart = new Chart({
                primaryXAxis: { title: 'Sales Across Years' },
                height: '400', width: '600',
                primaryYAxis: { title: 'Sales Amount in millions(USD)', rangePadding: 'Additional' },
                series: seriesCollection,
                loaded: loaded
            });

        });
        afterAll((): void => {
            chart.destroy();
            document.getElementById(id).remove();
        });
        it('Stripline visible false', (done: Function) => {
            loaded = () => {
                let element: Element = document.getElementById(stripLineId + '_Behind_rect_0');
                expect(element).toBe(null);
                element = document.getElementById(stripLineId + '_Over_rect_0');
                expect(element).toBe(null);
                done();
            };
            chart.loaded = loaded;
            chart.appendTo('#' + id);
        });
        it(' XAxis Stripline', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Over_rect_0');
                expect(stripLineElement).not.toEqual(null);
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_0');
                expect(stripLineElement).not.toEqual(null);
                done();
            };
            chart.primaryXAxis.stripLines = [
                {
                    startFromAxis: false, start: 1, size: 4,
                    verticalAlignment: 'End', opacity: 0.5,
                    color: 'red', zIndex: 'Behind', text: 'Behind'
                },
                {
                    start: 6, end: 8, opacity: 0.3,
                    color: 'blue', textStyle: { color: '#ffffff' },
                    text: 'Over', zIndex: 'Over'
                }];
            chart.loaded = loaded;
            chart.refresh();

        });
        it(' YAxis Stripline', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Over_rect_0');
                expect(stripLineElement).not.toEqual(null);
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_0');
                expect(stripLineElement).not.toEqual(null);
                done();
            };
            chart.primaryXAxis.stripLines = [];
            chart.primaryYAxis.stripLines = [
                {
                    start: 10, end: 50,
                    zIndex: 'Over', color: '#663AB6'
                },
                {
                    start: 60, end: 100,
                    color: '#EB3F79'
                }];
            chart.loaded = loaded;
            chart.refresh();

        });
        it('XAxis Size', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_0');
                let width : string = Number(stripLineElement.getAttribute('width')).toFixed(1);
                expect(width == '175.5' || width == '176.8').toBe(true);
                let x : string = Number(stripLineElement.getAttribute('x')).toFixed(1);
                expect(x == '122.0' || x == '118.4').toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_1');
                width = Number(stripLineElement.getAttribute('width')).toFixed(1);
                expect(width == '117.0' || width == '117.9').toBe(true);
                x = Number(stripLineElement.getAttribute('x')).toFixed(1);
                expect(x == '414.5' || x == '413.2').toBe(true);              
                done();
            };
            chart.primaryYAxis.stripLines = [];
            chart.primaryXAxis.stripLines = [{ start: 1, color: '#663AB6', size: 3 },
            { start: 6, color: '#EB3F79', size: 2 }];
            chart.loaded = loaded;
            chart.refresh();


        });
        it('YAxis Size', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_0');
                let height : number = parseInt(stripLineElement.getAttribute('height'), 10);
                expect(height == 84 || height == 85).toBe(true);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 157 || y == 160 ).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_1');
                expect(parseInt(stripLineElement.getAttribute('height'), 10)).toEqual(21);
                y = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 117 || y == 115).toBe(true);
                done();
            };
            chart.primaryXAxis.stripLines = [];
            chart.primaryYAxis.stripLines = [{ start: 10, end: 50, color: '#663AB6', size: 60 },
            { start: 60, end: 70, color: '#EB3F79', size: 40 }];
            chart.loaded = loaded;
            chart.refresh();

        });
        it('Color, Opacity  and Border Color', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_0');
                expect(stripLineElement.getAttribute('fill')).toEqual('#663AB6');
                expect(stripLineElement.getAttribute('stroke')).toEqual('gray');
                expect(stripLineElement.getAttribute('opacity')).toEqual('0.5');
                done();
            };
            chart.primaryYAxis.stripLines = [];
            chart.primaryXAxis.stripLines = [{ start: 1, color: '#663AB6', border: { color: 'gray', width: 1 }, opacity: 0.5, size: 5 }];
            chart.loaded = loaded;
            chart.refresh();

        });
        it('Inversed axis stripline', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_0');
                let temp: number = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(temp === 239 || temp === 236).toBe(true);
                expect(parseInt(stripLineElement.getAttribute('y'), 10)).toBe(10);
                temp = parseInt(stripLineElement.getAttribute('height'), 10);
                expect(temp === 295 || temp === 300).toBe(true);
                temp = parseInt(stripLineElement.getAttribute('width'), 10);
                expect(temp === 294 || temp === 292).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_1');
                temp = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(temp === 63 || temp === 59).toBe(true);
                temp = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(temp === 115 || temp === 117).toBe(true);
                expect(parseInt(stripLineElement.getAttribute('height'), 10)).toBe(42);
                temp = parseInt(stripLineElement.getAttribute('width'), 10);
                expect(temp === 526 || temp === 530).toBe(true);
                done();
            };
            chart.primaryYAxis.isInversed = true;
            chart.primaryXAxis.isInversed = true;
            chart.primaryYAxis.stripLines = [{
                start: 50,
                end: 30
            }];
            chart.loaded = loaded;
            chart.refresh();

        });
    });
    describe('Stripline rows and columns checking', () => {
        beforeAll((): void => {
            ele = createElement('div', { id: id });
            ele.style.background = 'transparent';
            document.body.appendChild(ele);
            chart = new Chart({
                primaryXAxis: { title: 'Sales Across Years' },
                height: '400', width: '600',
                primaryYAxis: { title: 'Sales Amount in millions(USD)', rangePadding: 'Additional' },
                rows: [{ height: '180' }, { height: '180' }],
                columns: [{ width: '250' }, { width: '250' }],
                axes: [{
                    rowIndex: 1, name: 'yAxis1',
                    stripLines: [{ start: 30, color: '#663AB6', text: 'Row Definition Stripline', size: 30 }],
                }, {
                    columnIndex: 1, name: 'xAxis1',
                    stripLines: [{ start: 20, color: '#663AB6', text: 'Column Definition Stripline', size: 15 }],
                }],
                series: [
                    {
                        name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, xAxisName: 'xAxis1', xName: 'x', yName: 'y',
                        animation: { enable: false },
                        dataSource: [{ x: 10, y: 124 }, { x: 20, y: 120 }, { x: 30, y: 115 }, { x: 40, y: 147 }, { x: 50, y: 122 }]
                    },
                    {
                        name: 'series2', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis1', xName: 'x', yName: 'y',
                        animation: { enable: false },
                        dataSource: [{ x: 10, y: 24 }, { x: 20, y: 20 }, { x: 30, y: 55 }, { x: 40, y: 47 }, { x: 50, y: 72 }]
                    }],
            });
            

        });
        afterAll((): void => {

            chart.destroy();
            document.getElementById(id).remove();
        });
        it('Location y and Height', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_rect_0');
                let height : number = parseInt(stripLineElement.getAttribute('height'), 10);
                expect(height == 34 || height == 36).toBe(true);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 56 || y == 58).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.appendTo('#' + id);
        });
        it('Location x and Width', (done: Function) => {
            stripLineElement = document.getElementById(stripLineId + '_Behind_rect_1');
            let width : number = parseInt(stripLineElement.getAttribute('width'), 10);
            expect(width == 103 || width == 105).toBe(true);
            let x : number = parseInt(stripLineElement.getAttribute('x'), 10);
            expect(x == 382 || x == 379).toBe(true);
            done();
        });
        it('text content', (done: Function) => {
            stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
            expect(stripLineElement.textContent).toEqual('Row Definition Stripline');
            stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
            expect(stripLineElement.textContent).toEqual('Column Definition Stripline');
            done();
        });
        it('Middle horizontalAlignment and Middle verticalAlignment', (done: Function) => {
            stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
            let x : number = parseInt(stripLineElement.getAttribute('x'), 10);
            expect(x == 326 || x == 324).toBe(true);
            let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
            expect(y == 74 || y == 77).toBe(true);
            stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
            x = parseInt(stripLineElement.getAttribute('x'), 10);
            expect(x == 434 || x == 432).toBe(true);
            y = parseInt(stripLineElement.getAttribute('y'), 10);
            expect(y == 157 || y == 160).toBe(true);
            done();
        });
        it('Start horizontalAlignment and Start verticalAlignment', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                expect(stripLineElement.getAttribute('text-anchor') === 'Start').toBe(true);
                let x : number = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 68 || x == 64).toBe(true);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 68 || y == 69).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                expect(stripLineElement.getAttribute('text-anchor') === 'Start').toBe(true);
                x  = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 393 || x == 390).toBe(true);
                expect(parseInt(stripLineElement.getAttribute('y'), 10)).toEqual(15);
                done();
            };
            chart.axes[0].stripLines[0].horizontalAlignment = 'Start';
            chart.axes[0].stripLines[0].verticalAlignment = 'Start';
            chart.axes[1].stripLines[0].horizontalAlignment = 'Start';
            chart.axes[1].stripLines[0].verticalAlignment = 'Start';
            chart.loaded = loaded;
            chart.refresh();

        });
        it('Start horizontalAlignment and Middle verticalAlignment', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                let x : number = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 68 || x == 64).toBe(true);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 74 || y == 77).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                x = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 393 || x == 390).toBe(true);
                y  = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 157 || y == 160).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.axes[0].stripLines[0].verticalAlignment = 'Middle';
            chart.axes[1].stripLines[0].verticalAlignment = 'Middle';
            chart.refresh();

        });
        it('Start horizontalAlignment and End verticalAlignment', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                let x: number = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 68 || x == 64).toBe(true);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 80 || y == 84).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                x = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 393 || x == 390).toBe(true);
                y = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 300 || y == 305).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.axes[0].stripLines[0].verticalAlignment = 'End';
            chart.axes[1].stripLines[0].verticalAlignment = 'End';
            chart.refresh();

        });
        it('Middle horizontalAlignment and End verticalAlignment', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                let x : number = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 326 || x == 324).toBe(true);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 80 || y == 84).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                x = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 434 || x == 432).toBe(true);
                y = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 300 || y == 305).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.axes[0].stripLines[0].horizontalAlignment = 'Middle';
            chart.axes[1].stripLines[0].horizontalAlignment = 'Middle';
            chart.refresh();

        });
        it('Middle horizontalAlignment and Start verticalAlignment', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                let x : number = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 326 || x == 324).toBe(true);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 68 || y == 69).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                x = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 434 || x == 432).toBe(true);
                expect(parseInt(stripLineElement.getAttribute('y'), 10)).toEqual(15);
                done();
            };
            chart.loaded = loaded;
            chart.axes[0].stripLines[0].verticalAlignment = 'Start';
            chart.axes[1].stripLines[0].verticalAlignment = 'Start';
            chart.refresh();

        });
        it('End horizontalAlignment and Start verticalAlignment', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                expect(parseInt(stripLineElement.getAttribute('x'), 10)).toEqual(585);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y== 68 || y == 69).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                let x : number = parseInt(stripLineElement.getAttribute('x'), 10);
                expect(x == 475 || x == 474).toBe(true);
                expect(parseInt(stripLineElement.getAttribute('y'), 10)).toEqual(15);
                done();
            };
            chart.loaded = loaded;
            chart.axes[0].stripLines[0].horizontalAlignment = 'End';
            chart.axes[1].stripLines[0].horizontalAlignment = 'End';
            chart.refresh();

        });
        it('End horizontalAlignment and Middle verticalAlignment', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                expect(parseInt(stripLineElement.getAttribute('x'), 10)).toEqual(585);
                let x : number = parseInt(stripLineElement.getAttribute('x'));
                expect(x == 585).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                x = parseInt(stripLineElement.getAttribute('x'));
                expect(x == 475 || x == 474).toBe(true);
                let y : number = parseInt(stripLineElement.getAttribute('y'));
                expect(y == 157 || y == 160).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.axes[0].stripLines[0].verticalAlignment = 'Middle';
            chart.axes[1].stripLines[0].verticalAlignment = 'Middle';
            chart.refresh();

        });
        it('End horizontalAlignment and End verticalAlignment', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                expect(parseInt(stripLineElement.getAttribute('x'), 10)).toEqual(585);
                let y : number = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 80 || y == 84).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                let x : number = parseInt(stripLineElement.getAttribute('x'));
                expect(x == 475 || x == 474).toBe(true);       
                y = parseInt(stripLineElement.getAttribute('y'), 10);
                expect(y == 300 || y == 305).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.axes[0].stripLines[0].verticalAlignment = 'End';
            chart.axes[1].stripLines[0].verticalAlignment = 'End';
            chart.refresh();

        });
        it('Text Rotation', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                expect(stripLineElement.getAttribute('transform').indexOf('rotate(-30') > -1).toBe(true);
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_1');
                expect(stripLineElement.getAttribute('transform').indexOf('rotate(60') > -1).toBe(true);
                done();
            };
            chart.loaded = loaded;
            chart.axes[0].stripLines[0].rotation = -30;
            chart.axes[1].stripLines[0].rotation = 60;
            chart.refresh();

        });
        it('Category Value', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Over_text_0');
                expect(stripLineElement.textContent).toEqual('Category Axis Over');
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                expect(stripLineElement.textContent).toEqual('Category Axis Behind');
                done();
            };
            chart.axes = [];
            chart.primaryXAxis = {
                labelPlacement: 'OnTicks', valueType: 'Category',
                stripLines: [
                    {
                        startFromAxis: true, start: 2, size: 3,
                        opacity: 0.5, color: 'red', text: 'Category Axis Behind'
                    },
                    {
                        start: 4, end: 6, opacity: 0.3,
                        color: 'blue', text: 'Category Axis Over', zIndex: 'Over'
                    }]
            };
            chart.series = [
                {
                    name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, animation: { enable: false },
                    dataSource: data2, xName: 'x', yName: 'y'
                }];
            chart.loaded = loaded;
            chart.refresh();

        });
        it('Date Time Value', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Over_text_0');
                expect(stripLineElement.textContent).toEqual('Date time Axis Over');
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                expect(stripLineElement.textContent).toEqual('Date time Axis Behind');
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis = {
                minimum: new Date(2000, 6, 1), maximum: new Date(2010, 6, 1), interval: 1,
                intervalType: 'Years', valueType: 'DateTime',
                stripLines: [
                    {
                        start: new Date(2001, 6, 1), size: 90000000009,
                        opacity: 0.5, color: 'red',
                        text: 'Date time Axis Behind'
                    },
                    {
                        start: new Date(2005, 0, 1), end: new Date(2007, 0, 1),
                        opacity: 0.3, color: 'blue', textStyle: { color: '#ffffff' },
                        text: 'Date time Axis Over', zIndex: 'Over'
                    }]
            };
            chart.series = [
                {
                    name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, animation: { enable: false },
                    dataSource: data1, xName: 'x', yName: 'y'
                }];
            chart.refresh();

        });
        it('Logarithmic Value', (done: Function) => {
            loaded = () => {
                stripLineElement = document.getElementById(stripLineId + '_Over_text_0');
                expect(stripLineElement.textContent).toEqual('Logarithmic Axis Over');
                stripLineElement = document.getElementById(stripLineId + '_Behind_text_0');
                expect(stripLineElement.textContent).toEqual('Logarithmic Axis Behind');
                done();
            };
            chart.loaded = loaded;
            chart.primaryXAxis.stripLines = [];
            chart.primaryYAxis = {
                valueType: 'Logarithmic',
                stripLines: [
                    {
                        start: 10, size: 50,
                        opacity: 0.5, color: 'red',
                        text: 'Logarithmic Axis Behind'
                    },
                    {
                        start: 80, end: 100,
                        opacity: 0.3, color: 'blue', textStyle: { color: '#ffffff' },
                        text: 'Logarithmic Axis Over', zIndex: 'Over'
                    }]
            };
            chart.refresh();

        });
    });
});