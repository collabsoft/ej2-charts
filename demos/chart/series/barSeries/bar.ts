/**
 * area series
 */
import { Chart, BarSeries, Category, LabelPosition, DataLabel, Tooltip, Crosshair, Selection } from '../../../../src/chart/index';
import '../../../../node_modules/es6-promise/dist/es6-promise';
import { MouseEvents } from '../../../../spec/chart/base/events.spec';
Chart.Inject(BarSeries, Category, DataLabel, Tooltip, Crosshair, Selection);

let chartData: any[] = [
    { x: 2006, y: 7.8 }, { x: 2007, y: 7.2 },
    { x: 2008, y: 6.8 }, { x: 2009, y: 10.7 },
    { x: 2010, y: 10.8 }, { x: 2011, y: 9.8 }
];
let mouseEvents: MouseEvents = new MouseEvents();
let chart: Chart = new Chart({
    primaryXAxis: {
        minimum: 2005, maximum: 2012, interval: 1,
        title: 'Year'
    },
    primaryYAxis: {
        interval: 1, title: 'Percentage',
        labelFormat: '{value}%'
    },
    series: [{
        dataSource: chartData,
        xName: 'x', yName: 'y',
        name: 'India',
        // Series type as bar series
        type: 'Bar', animation: { enable: false }
    }],
    title: 'Unemployment rate (%)'
}, '#container');

let datalabel: HTMLInputElement = document.getElementById('datalabel') as HTMLInputElement;
datalabel.onchange = () => {
    for (let series of chart.series) {
        series.marker.dataLabel.visible = datalabel.checked;
        chart.refresh();
    }
};

let labelposition: HTMLSelectElement = document.getElementById('labelposition') as HTMLSelectElement;
(labelposition as HTMLSelectElement).onchange = () => {
    for (let series of chart.series) {
        series.marker.dataLabel.position = labelposition.value as LabelPosition;
        chart.refresh();
    }
};
let selection: HTMLInputElement = document.getElementById('selection') as HTMLInputElement;
selection.onchange = () => {
    if (selection.checked) {
        chart.selectionMode = 'Point';
    } else {
        chart.selectionMode = 'None';
    }
    chart.selectedDataIndexes = [{ series: 0, point: 0 }];
    chart.refresh();
};
let crosshair: HTMLInputElement = document.getElementById('crosshair') as HTMLInputElement;
crosshair.onchange = () => {
    chart.tooltip.enable = crosshair.checked;
    chart.tooltip.shared = crosshair.checked;
    chart.crosshair.enable = crosshair.checked;
    chart.refresh();
    let x: number = chart.visibleSeries[0].points[1].regions[0].x + chart.element.offsetLeft +
        chart.visibleSeries[0].points[1].regions[0].width / 2 +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('x'));
    let y: number = chart.visibleSeries[0].points[1].regions[0].y +
        chart.visibleSeries[0].points[1].regions[0].height / 2 + chart.element.offsetTop +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('y'));
    mouseEvents.mousemovetEvent(chart.element, x, y);
};
let tooltip: HTMLInputElement = document.getElementById('tooltip') as HTMLInputElement;
(tooltip as HTMLInputElement).onchange = () => {
    chart.tooltip.enable = tooltip.checked;
    chart.refresh();
    let x: number = chart.visibleSeries[0].points[1].regions[0].x + chart.element.offsetLeft +
        chart.visibleSeries[0].points[1].regions[0].width / 2 +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('x'));
    let y: number = chart.visibleSeries[0].points[1].regions[0].y +
        chart.visibleSeries[0].points[1].regions[0].height / 2 + chart.element.offsetTop +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('y'));
    mouseEvents.mousemovetEvent(chart.element, x, y);
};

let negative: Element = document.getElementById('negative');
(negative as HTMLInputElement).onchange = () => {
    chart.pointRender = null;
    chart.tooltip.header = '';
    chart.series[0].dataSource = [
        { x: 2006, y: 7.8 }, { x: 2007, y: -7.2 },
        { x: 2008, y: 6.8 }, { x: 2009, y: 10.7 },
        { x: 2010, y: 10.8 }, { x: 2011, y: 9.8 }
    ];
    chart.refresh();
    let x: number = chart.visibleSeries[0].points[1].regions[0].x + chart.element.offsetLeft +
        chart.visibleSeries[0].points[1].regions[0].width / 2 +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('x'));
    let y: number = chart.visibleSeries[0].points[1].regions[0].y +
        chart.visibleSeries[0].points[1].regions[0].height / 2 + chart.element.offsetTop +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('y'));
    mouseEvents.mousemovetEvent(chart.element, x, y);
};
let sharedtooltip: Element = document.getElementById('sharedtooltip');
(sharedtooltip as HTMLInputElement).onchange = () => {
    chart.tooltip.enable = true;
    chart.tooltip.shared = true;
    chart.refresh();
    let x: number = chart.visibleSeries[0].points[1].regions[0].x + chart.element.offsetLeft +
        chart.visibleSeries[0].points[1].regions[0].width / 2 +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('x'));
    let y: number = chart.visibleSeries[0].points[1].regions[0].y +
        chart.visibleSeries[0].points[1].regions[0].height / 2 + chart.element.offsetTop +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('y'));
    mouseEvents.mousemovetEvent(chart.element, x, y);
};
let vertical: Element = document.getElementById('vertical');
(vertical as HTMLInputElement).onchange = () => {
    chart.isTransposed = (vertical as HTMLInputElement).checked;
    chart.tooltip.header = null;
    chart.tooltip.shared = true;
    chart.refresh();
    let x: number = chart.visibleSeries[0].points[1].regions[0].x + chart.element.offsetLeft +
        chart.visibleSeries[0].points[1].regions[0].width / 2 +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('x'));
    let y: number = chart.visibleSeries[0].points[1].regions[0].y +
        chart.visibleSeries[0].points[1].regions[0].height / 2 + chart.element.offsetTop +
        Number(document.getElementById('container_ChartAreaBorder').getAttribute('y'));
    mouseEvents.mousemovetEvent(chart.element, x, y);
};
