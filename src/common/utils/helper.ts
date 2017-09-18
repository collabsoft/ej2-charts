import { SvgRenderer, Animation, AnimationOptions } from '@syncfusion/ej2-base';
import { merge } from '@syncfusion/ej2-base';
import { createElement, remove } from '@syncfusion/ej2-base';
import { FontModel, BorderModel, MarginModel } from '../model/base-model';
import { VisibleRangeModel } from '../../chart/axis/axis';
import { Series, Points } from '../../chart/series/chart-series';
import { Axis } from '../../chart/axis/axis';
import { Chart } from '../../chart';
import { AccumulationChart } from '../../accumulation-chart';
import { AccumulationSeries } from '../../accumulation-chart/model/acc-base';
import { IShapes } from '../model/interface';


/**
 * Methods for calculating the text size.
 */



/**
 * Function to measure the height and width of the text.
 * @param  {string} text
 * @param  {FontModel} font
 * @param  {string} id
 * @returns no
 * @private
 */
export function measureText(text: string, font: FontModel): Size {
    let htmlObject: HTMLElement = document.getElementById('chartmeasuretext');

    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'chartmeasuretext' });
        document.body.appendChild(htmlObject);
    }

    htmlObject.innerHTML = text;
    htmlObject.style.position = 'absolute';
    htmlObject.style.fontSize = font.size;
    htmlObject.style.fontWeight = font.fontWeight;
    htmlObject.style.fontStyle = font.fontStyle;
    htmlObject.style.fontFamily = font.fontFamily;
    htmlObject.style.visibility = 'hidden';
    htmlObject.style.top = '-100';
    htmlObject.style.left = '0';
    htmlObject.style.whiteSpace = 'nowrap';
    return new Size(htmlObject.clientWidth, htmlObject.clientHeight);
}
/** @private */
export function rotateTextSize(font: FontModel, text: string, angle: number, chart: Chart): Size {

    let renderer: SvgRenderer = new SvgRenderer(chart.element.id);
    let box: ClientRect;
    let options: Object;
    let htmlObject: HTMLElement;
    options = {
        'font-size': font.size,
        'font-style': font.fontStyle,
        'font-family': font.fontFamily,
        'font-weight': font.fontWeight,
        'transform': 'rotate(' + angle + ', 0, 0)',
        'text-anchor': 'middle'
    };
    htmlObject = renderer.createText(options, text) as HTMLElement;
    chart.element.appendChild(chart.svgObject);
    chart.svgObject.appendChild(htmlObject);
    box = htmlObject.getBoundingClientRect();
    htmlObject.remove();
    chart.svgObject.remove();
    return new Size((box.right - box.left), (box.bottom - box.top));
}
/** @private */
export function removeElement(id: string): void {
    let element: Element = getElement(id);
    if (element) {
        remove(element);
    }
}
/** @private */
export function logBase(value: number, base: number): number {
    return Math.log(value) / Math.log(base);
}
/** @private */
export function showTooltip(text: string, x: number, y: number, areaWidth : number, id: string, isTouch ?: boolean): void {
    //let id1: string = 'EJ2_legend_tooltip';
    let tooltip: HTMLElement = document.getElementById(id);
    let width: number = measureText(text, {
        fontFamily: 'Segoe UI', size: '12px',
        fontStyle: 'Normal', fontWeight: 'Regular'
    }).width + 5;
    x = (x + width > areaWidth) ? x - width : x;
    if (!tooltip) {
        tooltip = createElement('div', {
            innerHTML: text,
            id: id,
            styles: 'top:' + (y + 10).toString() + 'px;left:' + (x + 10).toString() + 'px;background-color: rgb(255, 255, 255);' +
            'position:fixed;border:1px solid rgb(112, 112, 112); padding-left : 3px; padding-right : 2px;' +
            'padding-bottom : 2px; padding-top : 2px; font-size:12px; font-family: "Segoe UI"'
        });
        document.body.appendChild(tooltip);
    }
    if (isTouch) {
        setTimeout(() => { removeElement(id); }, 1500);
    }
}

/** @private */
export function inside(value: number, range: VisibleRangeModel): boolean {
    return (value < range.max) && (value > range.min);
}
/** @private */
export function withIn(value: number, range: VisibleRangeModel): boolean {
    return (value <= range.max) && (value >= range.min);
}
/** @private */
export function withInRange(previousPoint: Points, currentPoint: Points, nextPoint: Points, series: Series): boolean {
    let mX2: number = series.logWithIn(currentPoint.xValue, series.xAxis);
    let mX1: number = previousPoint ? series.logWithIn(previousPoint.xValue, series.xAxis) : mX2;
    let mX3: number = nextPoint ? series.logWithIn(nextPoint.xValue, series.xAxis) : mX2;
    let xStart: number = Math.floor(<number>series.xAxis.visibleRange.min);
    let xEnd: number = Math.ceil(<number>series.xAxis.visibleRange.max);
    return ((mX1 >= xStart && mX1 <= xEnd) || (mX2 >= xStart && mX2 <= xEnd) ||
        (mX3 >= xStart && mX3 <= xEnd) || (xStart >= mX1 && xStart <= mX3));
}
/** @private */
export function sum(values: number[]): number {
    let sum: number = 0;
    for (let value of values) {
        sum += value;
    }
    return sum;
}
/** @private */
export function subtractThickness(rect: Rect, thickness: Thickness): Rect {
    rect.x += thickness.left;
    rect.y += thickness.top;
    rect.width -= thickness.left + thickness.right;
    rect.height -= thickness.top + thickness.bottom;
    return rect;
}
/** @private */
export function subtractRect(rect: Rect, thickness: Rect): Rect {
    rect.x += thickness.x;
    rect.y += thickness.y;
    rect.width -= thickness.x + thickness.width;
    rect.height -= thickness.y + thickness.height;
    return rect;
}
/** @private */
export function degreeToLocation(degree: number, radius: number, center: ChartLocation): ChartLocation {
        let radian: number = (degree * Math.PI) / 180;
        return new ChartLocation(Math.cos(radian) * radius + center.x, Math.sin(radian) * radius + center.y);
}
function getAccumulationLegend(locX: number, locY: number, r: number, height: number, width: number, mode: string): string {
    let cartesianlarge: ChartLocation = degreeToLocation(270, r, new ChartLocation(locX, locY));
    let cartesiansmall: ChartLocation = degreeToLocation(270, r, new ChartLocation(locX + (width / 10), locY));
    return 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + ' ' + (locX + r) + ' ' + (locY) + ' ' + 'A' + ' ' + (r) + ' ' + (r) +
        ' ' + 0 + ' ' + 1 + ' ' + 1 + ' ' + cartesianlarge.x + ' ' + cartesianlarge.y + ' ' + 'Z' + ' ' + 'M' + ' ' + (locX +
            (width / 10)) + ' ' + (locY - (height / 10)) + ' ' + 'L' + (locX + (r)) + ' ' + (locY - height / 10) + ' ' + 'A' + ' '
        + (r) + ' ' + (r) + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + cartesiansmall.x + ' ' + cartesiansmall.y + ' ' + 'Z';
}
/** @private */
export function getAngle(center: ChartLocation, point: ChartLocation): number {
        let angle: number = Math.atan2((point.y - center.y), (point.x - center.x));
        angle = angle < 0 ? (6.283 + angle) : angle;
        return angle * (180 / Math.PI);
}
/** @private */
export function subArray(values: number[], index: number): number[] {
    let subArray: number[] = [];
    for (let i: number = 0; i <= index - 1; i++) {
        subArray.push(values[i]);
    }
    return subArray;
}
/** @private */
export function valueToCoefficient(value: number, axis: Axis): number {
    let range: VisibleRangeModel = axis.visibleRange;
    let result : number =  (value - <number>range.min) / (range.delta);
    return axis.isInversed  ? (1 - result) : result;

}
/** @private */
export function createTooltip(id: string, text: string, top: number, left: number, fontSize: string): void {
    let tooltip: HTMLElement = this.getElement(id);
    let style: string = 'top:' + top.toString() + 'px;' +
        'left:' + left.toString() + 'px;' +
        'background:' + '#FFFFFF' + ';' +
        'position:absolute;border:1px solid #707070;font-size:' + fontSize + ';border-radius:2px;';
    if (!tooltip) {
        tooltip = createElement('div', {
            id: id, innerHTML: '&nbsp;' + text + '&nbsp;', styles: style
        });
        document.body.appendChild(tooltip);
    } else {
        tooltip.setAttribute('innerHTML', '&nbsp;' + text + '&nbsp;');
        tooltip.setAttribute('styles', style);
    }
}
/** @private */
export function createZoomingLabels(chart: Chart, axis: Axis, parent: Element, index: number, isVertical: boolean): Element {
    let margin: number = 5;
    let opposedPosition: boolean = axis.opposedPosition;
    let anchor: string = isVertical ? 'start' : 'auto';
    let size: Size;
    let chartRect: number = chart.availableSize.width;
    let x: number;
    let y: number;
    let rx: number = 3;
    let arrowLocation: ChartLocation;
    let rect: Rect = axis.rect;
    let direction: string;
    for (let i: number = 0; i < 2; i++) {
        size = this.measureText(i ? axis.endLabel : axis.startLabel, axis.labelStyle);
        if (isVertical) {
            arrowLocation = i ? new ChartLocation(rect.x, rect.y + rx) :
                new ChartLocation(axis.rect.x, (rect.y + rect.height - rx));
            x = (rect.x + (opposedPosition ? (rect.width + margin) : -(size.width + margin + margin)));
            y = (rect.y + (i ? 0 : rect.height - size.height - margin));
            x += (x < 0 || ((chartRect) < (x + size.width + margin)))  ? (opposedPosition ? -(size.width / 2) : size.width / 2) : 0;
            direction = this.findDirection(
                rx, rx, new Rect(x, y, size.width + margin, size.height + margin),
                arrowLocation, margin, false, false, !opposedPosition, arrowLocation.x, arrowLocation.y + (i ? -rx : rx));
        } else {
            arrowLocation = i ? new ChartLocation((rect.x + rect.width - rx), (rect.y + rect.height)) :
                new ChartLocation(rect.x + rx, (rect.y + rect.height));
            x = (rect.x + (i ? (rect.width - size.width - margin) : 0));
            y = (opposedPosition ? (rect.y - size.height - 10) : (rect.y + rect.height + margin));
            direction = this.findDirection(
                rx, rx, new Rect(x, y, size.width + margin, size.height + margin),
                arrowLocation, margin, opposedPosition, !opposedPosition, false, arrowLocation.x + (i ? rx : -rx), arrowLocation.y);
        }
        x = x + (margin / 2);
        y = y + (3 * (size.height / 4)) + (margin / 2);
        parent.appendChild(chart.renderer.drawPath(new PathOption(
            chart.element.id + '_Zoom_' + index + '_AxisLabel_Shape_' + i,
            '#414141', 2, '#414141', 1, null, direction)
        ) as HTMLElement);
        this.textElement(
            new TextOption(
                chart.element.id + '_Zoom_' + index + '_AxisLabel_' + i, x, y, anchor, i ? axis.endLabel : axis.startLabel),
            { color: 'white', fontFamily: 'Segoe UI', fontWeight: 'Regular', size: '11px' },
            'white', parent
        );
    }

    return parent;
}
/** @private */
export function getPoint(xValue: number, yValue: number, series: Series): ChartLocation {
    let xLength: number = series.xAxis.rect.width;
    let yLength: number = series.yAxis.rect.height;
    xValue = (series.xAxis.valueType === 'Logarithmic' ? logBase(xValue, series.xAxis.logBase) : xValue);
    yValue = (series.yAxis.valueType === 'Logarithmic' ?
        logBase(yValue === 0 ? 1 : yValue, series.yAxis.logBase) : yValue);
    xValue = this.valueToCoefficient(xValue, series.xAxis);
    yValue = this.valueToCoefficient(yValue, series.yAxis);

    xValue = xValue * xLength;
    yValue = (1 - yValue) * yLength;

    return new ChartLocation(xValue, yValue);

}
//Within bounds
/** @private */
export function withInBounds(x: number, y: number, bounds: Rect, width : number = 0, height : number = 0): boolean {
    return (x >= bounds.x - width && x <= bounds.x + bounds.width + width && y >= bounds.y - height
            && y <= bounds.y + bounds.height + height);
}
/** @private */
export function getValueXByPoint(value: number, size: number, axis: Axis): number {
    return (value / size) * (axis.visibleRange.delta) + axis.visibleRange.min;
}
/** @private */
export function getValueYByPoint(value: number, size: number, axis: Axis): number {
    return Math.abs(1 - (value / size)) * (axis.visibleRange.delta) + axis.visibleRange.min;
}
/** @private */
export function findClipRect(series: Series): void {
    let rect: Rect = series.clipRect;
    if (series.chart.requireInvertedAxis) {
        rect.x = series.yAxis.rect.x;
        rect.y = series.xAxis.rect.y;
        rect.width = series.yAxis.rect.width;
        rect.height = series.xAxis.rect.height;
    } else {
        rect.x = series.xAxis.rect.x;
        rect.y = series.yAxis.rect.y;
        rect.width = series.xAxis.rect.width;
        rect.height = series.yAxis.rect.height;
    }
}
/** @private */
export function firstToLowerCase(str: string): string {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}
/** @private */
export function getMinPointsDelta(axis: Axis, seriesCollection: Series[]): number {
    let minDelta: number = Number.MAX_VALUE;
    let xValues: Object[];
    let minVal: number;
    seriesCollection.forEach((series: Series, index: number) => {
        xValues = [];
        if (series.visible &&
            (axis.name === series.xAxisName || (axis.name === 'primaryXAxis' && series.xAxisName === null)
                || (axis.name === series.chart.primaryXAxis.name && !series.xAxisName))) {
            xValues = series.points.map((point: Points, index: number) => {
                return point.xValue;
            });
            xValues.sort((first: Object, second: Object) => { return <number>first - <number>second; });
            if (xValues.length === 1) {
                 minVal = <number>xValues[0] - ((series.xMin && series.xAxis.valueType !== 'DateTime') ?
                          series.xMin : axis.visibleRange.min);
                 if (minVal !== 0) {
                     minDelta = Math.min(minDelta, minVal);
                 }
            } else {
                 xValues.forEach((value: Object, index: number, xValues: Object[]) => {
                     if (index > 0 && value) {
                         minVal = <number>value - <number>xValues[index - 1];
                         if (minVal !== 0) {
                            minDelta = Math.min(minDelta, minVal);
                         }
                     }
                 });
            }
        }
    });
    if (minDelta === Number.MAX_VALUE) {
        minDelta = 1;
    }

    return minDelta;
}
/** @private */
export function getAnimationFunction(effect: string): Function {
    let functionName: Function;
    switch (effect) {
        case 'Linear':
            functionName = linear;
            break;
    }
    return functionName;
}

/**
 * Animation Effect Calculation Started Here
 * @param currentTime
 * @param startValue
 * @param endValue
 * @param duration
 * @private
 */


export function linear(currentTime: number, startValue: number, endValue: number, duration: number): number {
    return -endValue * Math.cos(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
}

/**
 * Animation Effect Calculation End
 * @private
 */

export function markerAnimate(element: Element, delay: number, duration: number, series: Series | AccumulationSeries,
                              pointIndex: number, point: ChartLocation, isLabel: boolean): void {

    let centerX: number = point.x;
    let centerY: number = point.y;
    let height: number = 0;
    (<HTMLElement>element).style.visibility = 'hidden';
    new Animation({}).animate(<HTMLElement>element, {
        duration: duration,
        delay: delay,
        progress: (args: AnimationOptions): void => {
            if (args.timeStamp > args.delay) {
                args.element.style.visibility = 'visible';
                height = ((args.timeStamp - args.delay) / args.duration);
                element.setAttribute('transform', 'translate(' + centerX
                    + ' ' + centerY + ') scale(' + height + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
            }
        },
        end: (model: AnimationOptions) => {
            (<HTMLElement>element).style.visibility = 'visible';
            element.removeAttribute('transform');
            if ((series.type === 'Scatter' || series.type === 'Bubble') && !isLabel && (pointIndex === series.points.length - 1)) {
                series.chart.trigger('animationComplete', { series: series });
            }

        }
    });
}

/** @private */
export function drawSymbol(location: ChartLocation, shape: string, size: Size, url: string, options: PathOption, label : string): Element {
    let functionName: string = 'Path';
    let renderer: SvgRenderer = new SvgRenderer('');
    let temp: IShapes = this.calculateShapes(location, size, shape, options, url);
    let htmlObject: Element = renderer['draw' + temp.functionName](temp.renderOption);
    htmlObject.setAttribute('aria-label', label);
    return htmlObject;
}
/** @private */
export function calculateShapes(location: ChartLocation, size: Size, shape: string, options: PathOption, url: string): IShapes {
    let path: string;
    let functionName: string = 'Path';
    let width: number = size.width;
    let height: number = size.height;
    let locX: number = location.x;
    let locY: number = location.y;
    let x: number = location.x + (-width / 2);
    let y: number = location.y + (-height / 2);
    switch (shape) {
        case 'Circle':
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': width / 2, 'ry': height / 2, 'cx': locX, 'cy': locY });
            break;
        case 'Cross':
            path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' +
                (locY + (-height / 2));
            merge(options, { 'd': path });
            break;
        case 'HorizontalLine':
            path = 'M' + ' ' + x + ' ' + locY + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + locY;
            merge(options, { 'd': path });
            break;
        case 'VerticalLine':
            path = 'M' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + locX + ' ' + (locY + (-height / 2));
            merge(options, { 'd': path });
            break;
        case 'Diamond':
            path = 'M' + ' ' + x + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + locY + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + locY + ' z';
            merge(options, { 'd': path });
            break;
        case 'Rectangle':
        case 'StepArea':
            path = 'M' + ' ' + x + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (-height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'Triangle':
            path = 'M' + ' ' + x + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (-height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (locY + (height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'InvertedTriangle':
            path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + locX + ' ' + (locY + (height / 2)) + ' ' +
                'L' + ' ' + (locX - (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' z';
            merge(options, { 'd': path });
            break;
        case 'Pentagon':
            let eq: number = 72;
            let xValue: number;
            let yValue: number;
            for (let i: number = 0; i <= 5; i++) {
                xValue = (width / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (height / 2) * Math.sin((Math.PI / 180) * (i * eq));
                if (i === 0) {
                    path = 'M' + ' ' + (locX + xValue) + ' ' + (locY + yValue) + ' ';
                } else {
                    path = path.concat('L' + ' ' + (locX + xValue) + ' ' + (locY + yValue) + ' ');
                }
            }
            path = path.concat('Z');
            merge(options, { 'd': path });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': height, 'width': width, x: x, y: y });
            break;
    }
    options = this.calculateLegendShapes(location, new Size(width, height), shape, options).renderOption;
    return { renderOption: options, functionName: functionName };
}
/** @private */
export function getRectLocation(startLocation: ChartLocation, endLocation: ChartLocation, outerRect: Rect): Rect {
    let x: number;
    let y: number;
    x = (endLocation.x < outerRect.x) ? outerRect.x :
        (endLocation.x > (outerRect.x + outerRect.width)) ? outerRect.x + outerRect.width : endLocation.x;
    y = (endLocation.y < outerRect.y) ? outerRect.y :
        (endLocation.y > (outerRect.y + outerRect.height)) ? outerRect.y + outerRect.height : endLocation.y;
    return new Rect(
        (x > startLocation.x ? startLocation.x : x), (y > startLocation.y ? startLocation.y : y),
        Math.abs(x - startLocation.x), Math.abs(y - startLocation.y));
}
/** @private */
export function minMax(value: number, min: number, max: number): number {
    return value > max ? max : (value < min ? min : value);
}
/** @private */
export function getElement(id: string): Element {
    return document.getElementById(id);
}
/** @private */
export function getDraggedRectLocation(x1: number, y1: number, x2: number, y2: number,  outerRect: Rect): Rect {
    let width: number = Math.abs(x1 - x2);
    let height: number = Math.abs(y1 - y2);
    let x: number = Math.max(this.checkBounds(Math.min(x1, x2), width, outerRect.x, outerRect.width), outerRect.x);
    let y: number = Math.max(this.checkBounds(Math.min(y1, y2), height, outerRect.y, outerRect.height), outerRect.y);
    return new Rect(x, y, Math.min(width, outerRect.width), Math.min(height, outerRect.height));
}
/** @private */
export function checkBounds(start: number, size: number, min: number, max: number): number {
    if (start < min) {
        start = min;
    } else if ((start + size) > (max + min)) {
        start = (max + min) - size;
    }
    return start;
}
/** @private */
export function getLabelText(currentPoint: Points, series: Series, chart: Chart): string[] {
    let labelFormat: string = series.yAxis.labelFormat;
    let text: string[] = [];
    let customLabelFormat: boolean = labelFormat.match('{value}') !== null;
    switch (series.seriesType) {
        case 'XY':
            text.push(currentPoint.text || currentPoint.yValue.toString());
            break;
        case 'HighLow':
            text.push(currentPoint.text || Math.max(<number>currentPoint.high, <number>currentPoint.low).toString());
            text.push(currentPoint.text || Math.min(<number>currentPoint.high, <number>currentPoint.low).toString());
            break;
    }
    if (labelFormat && !currentPoint.text) {
        for (let i : number = 0; i < text.length; i++) {
            text[i] = customLabelFormat ? labelFormat.replace('{value}', series.yAxis.format(parseFloat(text[i]))) :
                series.yAxis.format(parseFloat(text[i]));
        }
    }
    return text;
}
/** @private */
export function stopTimer(timer: number): void {
        window.clearInterval(timer);
}
/** @private */
export function isCollide(currentRect: Rect, collections: Rect[]): boolean {
    let isCollide: boolean;
    isCollide = collections.some((rect: Rect) => {
        return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
            currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
    });
    return isCollide;
}
/** @private */
export function isOverlap(currentRect: Rect, rect: Rect): boolean {
    return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
            currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
}
/** @private */
export function calculateRect(location: ChartLocation, textSize: Size, margin: MarginModel): Rect {
    return new Rect(
        (location.x - (textSize.width / 2) - margin.left),
        (location.y - (textSize.height / 2) - margin.top),
        textSize.width + margin.left + margin.right,
        textSize.height + margin.top + margin.bottom
    );
}
/** @private */
export function convertToHexCode(value: ColorValue): string {
    return '#' + this.componentToHex(value.r) + this.componentToHex(value.g) + this.componentToHex(value.b);
}
/** @private */
export function componentToHex(value: number): string {
    let hex: string = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

/** @private */
export function convertHexToColor(hex: string): ColorValue {
    let result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new ColorValue(255, 255, 255);
}
/** @private */
export function colorNameToHex(color: string): string {
    let element: HTMLElement;
    color = color === 'transparent' ? 'white' : color;
    element = document.getElementById('chartmeasuretext');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    let exp: RegExp = /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/;
    let isRGBValue: RegExpExecArray = exp.exec(color);
    return this.convertToHexCode(
        new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10))
    );
}
/** @private */
// tslint:disable-next-line:max-func-body-length
export function calculateLegendShapes(location: ChartLocation, size: Size, shape: string, options: PathOption): IShapes {
    let padding: number = 10;
    let path: string = '';
    let height: number = size.height;
    let width: number = size.width;
    let locX: number = location.x;
    let locY: number = location.y;
    switch (shape) {
        case 'Line':
            path = 'M' + ' ' + (locX + (-width / 2)) + ' ' + (locY) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY);
            merge(options, { 'd': path });
            break;
        case 'StepLine':
            options.fill = 'transparent';
            path = 'M' + ' ' + (locX + (-width / 2) - (padding / 4)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX +
                (-width / 2) + (width / 10)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX + (-width / 2) + (width / 10))
                + ' ' + (locY) + ' ' + 'L' + ' ' + (locX + (-width / 10)) + ' ' + (locY) + ' ' + 'L' + ' ' + (locX + (-width / 10))
                + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX + (width / 5)) + ' ' + (locY + (height / 2)) + ' ' + 'L' +
                ' ' + (locX + (width / 5)) + ' ' + (locY + (-height / 2)) + ' ' + 'L' + ' ' + (locX + (width / 2)) + ' ' + (locY +
                    (-height / 2)) + 'L' + ' ' + (locX + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + '' + (locX + (width / 2)
                        + (padding / 4)) + ' ' + (locY + (height / 2));
            merge(options, { 'd': path });
            break;
        case 'RightArrow':
            path = 'M' + ' ' + (locX + (-width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (width / 2)) + ' ' + (locY) + ' ' + 'L' + ' ' +
                (locX + (-width / 2)) + ' ' + (locY + (height / 2));
            merge(options, { 'd': path });
            break;
        case 'LeftArrow':
            path = 'M' + ' ' + (locX + (width / 2)) + ' ' + (locY - (height / 2)) + ' ' +
                'L' + ' ' + (locX + (-width / 2)) + ' ' + (locY) + ' ' + 'L' + ' ' +
                (locX + (width / 2)) + ' ' + (locY + (height / 2));
            merge(options, { 'd': path });
            break;
        case 'Column':
        case 'StackingColumn':
        case 'StackingColumn100':
        case 'RangeColumn':
            path = 'M' + ' ' + (locX - 3 * (width / 5)) + ' ' + (locY - (height / 5)) + ' ' + 'L' + ' ' +
                (locX + 3 * (-width / 10)) + ' ' + (locY - (height / 5)) + ' ' + 'L' + ' ' +
                (locX + 3 * (-width / 10)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' ' + (locX - 3 *
                    (width / 5)) + ' ' + (locY + (height / 2)) + ' ' + 'Z' + ' ' + 'M' + ' ' +
                (locX + (-width / 10) - (width / 20)) + ' ' + (locY - (height / 4) - (padding / 2))
                + ' ' + 'L' + ' ' + (locX + (width / 10) + (width / 20)) + ' ' + (locY - (height / 4) -
                    (padding / 2)) + ' ' + 'L' + ' ' + (locX + (width / 10) + (width / 20)) + ' ' + (locY
                        + (height / 2)) + ' ' + 'L' + ' ' + (locX + (-width / 10) - (width / 20)) + ' ' + (locY +
                            (height / 2)) + ' ' + 'Z' + ' ' + 'M' + ' ' + (locX + 3 * (width / 10)) + ' ' + (locY) + ' ' +
                'L' + ' ' + (locX + 3 * (width / 5)) + ' ' + (locY) + ' ' + 'L' + ' '
                + (locX + 3 * (width / 5)) + ' ' + (locY + (height / 2)) + ' ' + 'L' + ' '
                + (locX + 3 * (width / 10)) + ' ' + (locY + (height / 2)) + ' ' + 'Z';
            merge(options, { 'd': path });
            break;
        case 'Bar':
        case 'StackingBar':
        case 'StackingBar100':
            path = 'M' + ' ' + (locX + (-width / 2) + (-padding / 4)) + ' ' + (locY - 3 * (height / 5)) + ' '
                + 'L' + ' ' + (locX + 3 * (width / 10)) + ' ' + (locY - 3 * (height / 5)) + ' ' + 'L' + ' ' +
                (locX + 3 * (width / 10)) + ' ' + (locY - 3 * (height / 10)) + ' ' + 'L' + ' ' +
                (locX - (width / 2) + (-padding / 4)) + ' ' + (locY - 3 * (height / 10)) + ' ' + 'Z' + ' '
                + 'M' + ' ' + (locX + (-width / 2) + (-padding / 4)) + ' ' + (locY - (height / 5)
                    + (padding / 20)) + ' ' + 'L' + ' ' + (locX + (width / 2) + (padding / 4)) + ' ' + (locY
                        - (height / 5) + (padding / 20)) + ' ' + 'L' + ' ' + (locX + (width / 2) + (padding / 4))
                + ' ' + (locY + (height / 10) + (padding / 20)) + ' ' + 'L' + ' ' + (locX - (width / 2)
                    + (-padding / 4)) + ' ' + (locY + (height / 10) + (padding / 20)) + ' ' + 'Z' + ' ' + 'M'
                + ' ' + (locX - (width / 2) + (-padding / 4)) + ' ' + (locY + (height / 5)
                    + (padding / 10)) + ' ' + 'L' + ' ' + (locX + (-width / 4)) + ' ' + (locY + (height / 5)
                        + (padding / 10)) + ' ' + 'L' + ' ' + (locX + (-width / 4)) + ' ' + (locY + (height / 2)
                            + (padding / 10)) + ' ' + 'L' + ' ' + (locX - (width / 2) + (-padding / 4))
                + ' ' + (locY + (height / 2) + (padding / 10)) + ' ' + 'Z';
            merge(options, { 'd': path });
            break;
        case 'Spline':
            options.fill = 'transparent';
            path = 'M' + ' ' + (locX - (width / 2)) + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' '
                + locX + ' ' + (locY - height) + ' ' + locX + ' ' + (locY + (height / 5))
                + ' ' + 'M' + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + (locX
                    + (width / 2)) + ' ' + (locY + (height / 2)) + ' ' + (locX + (width / 2)) + ' '
                + (locY - (height / 2));
            merge(options, { 'd': path });
            break;
        case 'Area':
        case 'StackingArea':
        case 'StackingArea100':
            path = 'M' + ' ' + (locX - (width / 2) - (padding / 4)) + ' ' + (locY + (height / 2))
                + ' ' + 'L' + ' ' + (locX + (-width / 4) + (-padding / 8)) + ' ' + (locY - (height / 2))
                + ' ' + 'L' + ' ' + (locX) + ' ' + (locY + (height / 4)) + ' ' + 'L' + ' ' + (locX
                    + (width / 4) + (padding / 8)) + ' ' + (locY + (-height / 2) + (height / 4)) + ' '
                + 'L' + ' ' + (locX + (height / 2) + (padding / 4)) + ' ' + (locY + (height / 2)) + ' ' + 'Z';
            merge(options, { 'd': path });
            break;
        case 'SplineArea':
            path = 'M' + ' ' + (locX - (width / 2)) + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + locX
                + ' ' + (locY - height) + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Z' + ' ' + 'M'
                + ' ' + locX + ' ' + (locY + (height / 5)) + ' ' + 'Q' + ' ' + (locX + (width / 2)) + ' '
                + (locY + (height / 2)) + ' ' + (locX + (width / 2)) + ' '
                + (locY - (height / 2)) + ' ' + ' Z';
            merge(options, { 'd': path });
            break;
        case 'Pie':
        case 'Doughnut':
            options.stroke = 'transparent';
            let r: number = Math.min(height, width) / 2;
            path = getAccumulationLegend(locX, locY, r, height, width, shape);
            merge(options, { 'd': path });
            break;
    }
    return { renderOption: options };
}
/** @private */
export function textTrim(maxWidth: number, text: string, font: FontModel): string {
    let label: string = text;
    let size: number = this.measureText(text, font).width;
    if (size > maxWidth) {
        let textLength: number = text.length;
        for (let i: number = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = this.measureText(label, font).width;
            if (size <= maxWidth) {
                return label;
            }
        }
    }
    return label;
}
/** @private */
export function stringToNumber(value: string, containerSize: number): number {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/** @private */
export function findDirection(rX: number, rY: number, rect: Rect, arrowLocation: ChartLocation, arrowPadding: number,
                              top: boolean, bottom: boolean, left: boolean, tipX: number, tipY : number): string {
    let direction: string = '';

    let startX: number = rect.x;
    let startY: number = rect.y;
    let width: number = rect.x + rect.width;
    let height: number = rect.y + rect.height;


    if (top) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + startY + ' ' + (startX + rX) + ' ' + startY + ' ' +
            ' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + width + ' '
            + startY + ' ' + (width) + ' ' + (startY + rY));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' '
                + (height) + ' ' + (width - rX) + ' ' + (height));
        if (arrowPadding !== 0) {
                direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding / 2) + ' ' + (height));
                direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (height + arrowPadding));
        }
        if ((arrowLocation.x - arrowPadding / 2) > startX) {
            direction = direction.concat(' L' + ' ' + (arrowLocation.x - arrowPadding / 2) + ' ' + height +
                ' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
        } else {
            if (arrowPadding === 0) {
                direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                    + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
            } else {
                direction = direction.concat(' L' + ' ' + (startX) + ' ' + (height + rY) + ' z');
            }
        }

    } else if (bottom) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
                + (startY) + ' ' + (startX + rX) + ' ' + (startY) + ' L' + ' ' + (arrowLocation.x - arrowPadding / 2) + ' ' + (startY));
        direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (arrowLocation.y));
        direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding / 2) + ' ' + (startY) + ' L' + ' '
                + (width - rX) + ' ' + (startY) + ' Q ' + (width) + ' ' + (startY) + ' ' + (width) + ' ' + (startY + rY));
        direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + (width) + ' '
            + (height) + ' ' + (width - rX) + ' ' + (height) +
            ' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + (startX) + ' '
            + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
    } else if (left) {
        direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
            + (startY) + ' ' + (startX + rX) + ' ' + (startY));
        direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + (width) + ' '
                + (startY) + ' ' + (width) + ' ' + (startY + rY) + ' L' + ' ' + (width) + ' ' + (arrowLocation.y - arrowPadding / 2));
        direction = direction.concat(' L' + ' ' + (width + arrowPadding) + ' ' + (tipY));

        direction = direction.concat(' L' + ' ' + (width) + ' ' + (arrowLocation.y + arrowPadding / 2) +
                ' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' ' + (height) + ' ' + (width - rX) + ' ' + (height));
        direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + startX + ' '
            + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
    } else {
        direction = direction.concat('M' + ' ' + (startX + rX) + ' ' + (startY) + ' Q ' + (startX) + ' '
                + (startY) + ' ' + (startX) + ' ' + (startY + rY) + ' L' + ' ' + (startX) + ' ' + (arrowLocation.y - arrowPadding / 2));

        direction = direction.concat(' L' + ' ' + (startX - arrowPadding) + ' ' + (tipY));

        direction = direction.concat(' L' + ' ' + (startX) + ' ' + (arrowLocation.y + arrowPadding / 2) +
                ' L' + ' ' + (startX) + ' ' + (height - rY) + ' Q ' + startX + ' '
                + (height) + ' ' + (startX + rX) + ' ' + (height));

        direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (height) + ' Q ' + width + ' '
            + (height) + ' ' + (width) + ' ' + (height - rY) +
            ' L' + ' ' + (width) + ' ' + (startY + rY) + ' Q ' + width + ' '
            + (startY) + ' ' + (width - rX) + ' ' + (startY) + ' z');
    }

    return direction;
}
/** @private */
export function textElement(options: TextOption, font: FontModel, color: string, parent: HTMLElement | Element): Element {
    let renderOptions: Object = {};
    let htmlObject: Element;
    let renderer: SvgRenderer = new SvgRenderer('');
    renderOptions = {
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'fill': color,
        'font-size': font.size,
        'font-style': font.fontStyle,
        'font-family': font.fontFamily,
        'font-weight': font.fontWeight,
        'text-anchor': options.anchor,
        'transform': options.transform,
        'opacity': font.opacity,
        'dominant-baseline': options.baseLine,

    };
    htmlObject = renderer.createText(renderOptions, options.text);
    parent.appendChild(htmlObject);
    return htmlObject;
}
/**
 * Method to find parent offset
 * @private
 */
export function findPosition(element: HTMLElement): ChartLocation {
    let curleft: number = 0;
    let curtop: number = 0;
    if (element.offsetParent) {
        do {
            curleft += element.offsetLeft;
            curtop += element.offsetTop;
            element = <HTMLElement>element.offsetParent;
        } while (element);
        return new ChartLocation(curleft, curtop);
    }
    return null;
}

/**
 * Method to calculate the width and height of the chart
 */

export function calculateSize(chart: Chart | AccumulationChart): void {
    let containerWidth: number = chart.element.offsetWidth;
    let containerHeight: number = chart.element.offsetHeight;
    chart.availableSize = new Size(stringToNumber(chart.width, containerWidth) || containerWidth || 600,
                                   stringToNumber(chart.height, containerHeight) || containerHeight || 450);
}
export function createSvg(chart: Chart | AccumulationChart): void {
    chart.renderer = new SvgRenderer(chart.element.id);
    calculateSize(chart);
    chart.svgObject = chart.renderer.createSvg({
        id: chart.element.id + '_svg',
        width: chart.availableSize.width,
        height: chart.availableSize.height
    });
}
/** @private */
export class CustomizeOption {

    public id: string;
    constructor(id?: string) {
        this.id = id;
    }
}
/** @private */
export class StackValues {
    public startValues?: number[];
    public endValues?: number[];

    constructor(startValue?: number[], endValue?: number[]) {
        this.startValues = startValue;
        this.endValues = endValue;
    }
}
/** @private */
export class TextOption extends CustomizeOption {

    public anchor: string;
    public text: string;
    public transform: string = '';
    public x: number;
    public y: number;
    public baseLine: string = 'auto';

    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string, transform: string = '', baseLine?: string) {
        super(id);
        this.x = x;
        this.y = y;
        this.anchor = anchor;
        this.text = text;
        this.transform = transform;
        this.baseLine = baseLine;
    }
}
/** @private */
export class PathOption extends CustomizeOption {
    public opacity: number;
    public fill: string;
    public stroke: string;
    public ['stroke-width']: number;
    public ['stroke-dasharray']: string;
    public d: string;

    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string) {
        super(id);
        this.opacity = opacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
}
/** @private */
export class RectOption extends PathOption {

    public x: number;
    public y: number;
    public height: number;
    public width: number;
    public rx: number;
    public ry: number;
    public transform: string;

    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect, rx?: number, ry?: number, transform?: string,
                dashArray?: string
    ) {
        super(id, fill, border.width, border.color, opacity, dashArray);
        this.y = rect.y;
        this.x = rect.x;
        this.height = rect.height;
        this.width = rect.width;
        this.rx = rx ? rx : 0;
        this.ry = ry ? ry : 0;
        this.transform = transform ? transform : '';
    }
}
/** @private */
export class CircleOption extends PathOption {
    public cy: number;
    public cx: number;
    public r: number;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, cx: number, cy: number, r: number) {
        super(id, fill, border.width, border.color, opacity);
        this.cy = cy;
        this.cx = cx;
        this.r = r;
    }
}
/** @private */
export class PolygonOption {

    public id: string;
    public points: string;
    public fill: string;

    constructor(id: string, points: string, fill: string) {
        this.id = id;
        this.points = points;
        this.fill = fill;
    }
}
/** @private */
export class Size {

    public height: number;
    public width: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
/** @private */
export class Rect {

    public x: number;
    public y: number;
    public height: number;
    public width: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
/** @private */
export class ChartLocation {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
/** @private */
export class Thickness {

    public left: number;
    public right: number;
    public top: number;
    public bottom: number;

    constructor(left: number, right: number, top: number, bottom: number) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
}
/** @private */
export class ColorValue {
    public r: number;
    public g: number;
    public b: number;

    constructor(r?: number, g?: number, b?: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
/** @private */
export class PointData {

    public point: Points;
    public series: Series;
    public isRemove: boolean;

    constructor(point: Points, series: Series, isRemove: boolean = true) {
        this.point = point;
        this.series = series;
        this.isRemove = isRemove;
    }
}
/** @private */
export class TextCollection {
    public text: string;
    public width: number;
    public height: number;

    constructor(text?: string, width?: number, height?: number) {
        this.text = text;
        this.width = width;
        this.height = height;
    }
}
/** @private */
export class ControlPoints {
    public controlPoint1: ChartLocation;
    public controlPoint2: ChartLocation;

    constructor(controlPoint1: ChartLocation, controlPoint2: ChartLocation) {
        this.controlPoint1 = controlPoint1;
        this.controlPoint2 = controlPoint2;
    }
}