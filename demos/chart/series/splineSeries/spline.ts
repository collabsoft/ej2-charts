/**
 * area series
 */
import { Chart, SplineSeries, Category } from '../../../../src/chart/index';
Chart.Inject(SplineSeries, Category);

let chartData: any[] = [
    { x: 'Jan', y: -1 }, { x: 'Feb', y: -1 }, { x: 'Mar', y: 2 },
    { x: 'Apr', y: 8 }, { x: 'May', y: 13 }, { x: 'Jun', y: 18 },
    { x: 'Jul', y: 21 }, { x: 'Aug', y: 20 }, { x: 'Sep', y: 16 },
    { x: 'Oct', y: 10 }, { x: 'Nov', y: 4 }, { x: 'Dec', y: 0 }
];
let chart: Chart = new Chart({
    primaryXAxis: {
        title: 'Month',
        valueType: 'Category'
    },
    primaryYAxis: {
        minimum: -5, maximum: 35, interval: 5,
        title: 'Temperature in Celsius',
        labelFormat: '{value}C'
    },
    series:[{
        dataSource: chartData, width:2,
        xName: 'x', yName: 'y',
        name: 'London',
        // Series type as spline series
        type: 'Spline', animation: { enable: false}
    }],
    title: 'Climate Graph-2012'
}, '#container');

