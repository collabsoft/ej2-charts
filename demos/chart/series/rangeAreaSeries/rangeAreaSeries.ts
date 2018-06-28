/**
 * Range area series
 */
import { Chart, RangeAreaSeries, Category, DateTime, Legend, DataLabel,  Tooltip, Zoom, Crosshair, Selection } from '../../../../src/chart/index';
Chart.Inject(RangeAreaSeries, Category, DateTime, Legend, DataLabel,  Tooltip, Zoom, Crosshair, Selection);

let series1: Object[] = [];
let value: number = 70;
let point1: Object;

for (let i: number = 1; i < 70; i++) {
    if (Math.random() > .5) {
        value += Math.random();
    } else {
        value -= Math.random();
    }
    point1 = { x: new Date(1930 + i, 5, i), high: value, low: value - 14 };
    series1.push(point1);
}

let chart: Chart = new Chart({

    primaryXAxis: {
        title: 'Month',
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift',
    },

    primaryYAxis:
    {
        title: 'Temperature(Celsius)'
    },

    tooltip: { enable: true },

    legendSettings: { visible: true },

    zoomSettings:
    {
        enableMouseWheelZooming: true,
        enablePinchZooming: true,
        enableSelectionZooming: true,
        mode: 'XY'

    },

    series: [
        {
            type: 'RangeArea',
            name: 'India',
            dataSource: series1,
            xName: 'x', high: 'high', low: 'low', opacity: 0.5,
            fill: '#69D2E7', border: { color: 'blueviolet', width: 1 },
            marker: {
                visible: true,
                height: 10, width: 10,
                shape: 'Pentagon', border: { color: 'red', width: 2 },
                dataLabel: { visible: true, position: 'Outer' }
            },
            animation: {
                enable: true,
            }
        },
    ],
    isTransposed: true,
    title: 'Maximum and Minimum Temperature',
    height: '600px',
}, '#container');
