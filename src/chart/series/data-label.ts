import { ChartLocation, Size, Rect, TextOption, ColorValue, RectOption, isCollide } from '../utils/helper';
import { getLabelText, measureText, convertHexToColor, calculateRect, textElement, colorNameToHex, markerAnimate } from '../utils/helper';
import { Chart } from '../chart';
import { BorderModel, MarginModel } from '../model/base-model';
import { DataLabelSettingsModel, MarkerSettingsModel } from '../series/chart-series-model';
import { LabelAlignment, LabelPosition } from '../utils/enum';
import { Series, Points } from './chart-series';
import { ITextRenderEventArgs } from '../model/interface';
import { textRender } from '../model/constants';

/**
 * DataLabel Module used to render the column series.
 */
export class DataLabel {

    private chart: Chart;
    private margin: MarginModel;
    private isShape: boolean;
    private locationX: number;
    private locationY: number;
    private fontBackground: string;
    private borderWidth: number;
    private markerHeight: number;
    private commonId: string;

    /**
     * Constructor for the data label module.
     * @private
     */

    constructor(chart: Chart) {
        this.chart = chart;
    }

    private initPrivateVariables(series: Series, marker: MarkerSettingsModel): void {
        this.markerHeight = ((series.type === 'Scatter' || marker.visible) && !series.isRectSeries) ? (marker.height / 2) : 0;
        this.commonId = this.chart.element.id + '_Series_' + series.index + '_Point_';
    }

    /**
     * Render the data label for series.
     * @return {void}
     * @private
     */

    public render(series: Series, chart: Chart, dataLabel: DataLabelSettingsModel): void {
        // initialize the private variable
        this.initPrivateVariables(series, series.marker);
        let text: string;
        let rect: Rect;
        let rgbValue: ColorValue;
        let contrast: number;
        let argsData: ITextRenderEventArgs;
        let border: BorderModel;
        let textSize: Size;

        // Data label point iteration started
        series.points.map((point: Points, index: number) => {
            this.margin = dataLabel.margin;
            border = { width: dataLabel.border.width, color: dataLabel.border.color };
            if (point.symbolLocation) {
                text = getLabelText(point, series.yAxis.labelFormat, chart);
                argsData = {
                    cancel: false, name: textRender, series: series, point: point, text: text, border: border, color: dataLabel.fill
                };
                chart.trigger(textRender, argsData);
                if (!argsData.cancel) {
                    this.fontBackground = argsData.color;
                    textSize = measureText(argsData.text, dataLabel.font);
                    this.isDataLabelShape(argsData);
                    rect = this.calculateTextPosition(point, series, textSize, dataLabel);
                    if (!isCollide(rect, chart.dataLabelCollections)) {
                        chart.dataLabelCollections.push(rect);
                        if (this.isShape) {
                            series.shapeElement.appendChild(chart.renderer.drawRectangle(
                                new RectOption(
                                    this.commonId + index + '_TextShape',
                                    argsData.color, argsData.border, dataLabel.opacity, rect, dataLabel.rx,
                                    dataLabel.ry
                                )) as HTMLElement);
                        }
                        // Checking the font color
                        rgbValue = convertHexToColor(colorNameToHex(this.fontBackground));
                        contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
                        textElement(
                            new TextOption(
                                this.commonId + index + '_Text',
                                rect.x + this.margin.left + textSize.width / 2, rect.y + this.margin.top + textSize.height * 3 / 4,
                                'middle', argsData.text, 'rotate(0,' + (rect.x) + ',' + (rect.y) + ')', 'auto'
                            ),
                            dataLabel.font, dataLabel.font.color || (contrast >= 128 ? 'black' : 'white'), series.textElement);
                    }
                }
            }
        });
    }

    private calculateTextPosition(point: Points, series: Series, textSize: Size, dataLabel: DataLabelSettingsModel): Rect {
        let location: ChartLocation = new ChartLocation(point.symbolLocation.x, point.symbolLocation.y);
        let padding: number = 5;
        let clipRect: Rect = series.clipRect;
        let rect: Rect;
        // calculating alignment
        if (!this.chart.requireInvertedAxis) {
            this.locationX = location.x;
            let alignmentValue: number = textSize.height + (this.borderWidth * 2) + this.markerHeight +
                this.margin.bottom + this.margin.top + padding;
            location.y = dataLabel.position === 'Auto' ? location.y :
                this.calculateAlignment(alignmentValue, location.y, dataLabel.alignment, series.isRectSeries ? point.yValue < 0 : false);
            // calculating position
            location.y = !series.isRectSeries ? this.calculatePathPosition(location.y, dataLabel.position, series, point, textSize) :
                this.calculateRectPosition(location.y, point.region, point.yValue < 0, dataLabel.position, series, textSize);
        } else {
            this.locationY = location.y;
            let alignmentValue: number = textSize.width + this.borderWidth + this.margin.left + this.margin.right - padding;
            location.x = dataLabel.position === 'Auto' ? location.x :
                this.calculateAlignment(alignmentValue, location.x, dataLabel.alignment, point.yValue < 0);
            location.x = this.calculateRectPosition(location.x, point.region, point.yValue < 0, dataLabel.position, series, textSize);
        }
        rect = calculateRect(location, textSize, this.margin);
        // Checking the condition whether data Label has been exist the clip rect
        if (!((rect.y > clipRect.height) || (rect.x > clipRect.width) ||
            (rect.x + rect.width < 0) || (rect.y + rect.height < 0))) {
            rect.x = rect.x < 0 ? padding : rect.x;
            rect.y = rect.y < 0 ? padding : rect.y;
            rect.x -= (rect.x + rect.width) > clipRect.width ? (rect.x + rect.width) - clipRect.width + padding : 0;
            rect.y -= (rect.y + rect.height) > clipRect.height ? (rect.y + rect.height) - clipRect.height + padding : 0;
            this.fontBackground = this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground;
        }

        return rect;
    }

    private calculateRectPosition(y: number, rect: Rect, isMinus: boolean, position: LabelPosition,
                                  series: Series, textSize: Size): number {
        let padding: number = 5;
        let margin: MarginModel = this.margin;
        let textLength: number = !this.chart.requireInvertedAxis ? textSize.height : textSize.width;
        let extraSpace: number = this.borderWidth + textLength / 2 + padding;
        position = (series.type === 'StackingColumn' || series.type === 'StackingBar') ?
            (position === 'Outer' ? 'Top' : position) : position;
        switch (position) {
            case 'Bottom':
                y = !this.chart.requireInvertedAxis ?
                    isMinus ? (y - rect.height + extraSpace + margin.top) : (y + rect.height - extraSpace - margin.bottom) :
                    isMinus ? (y + rect.width - extraSpace - margin.left) : (y - rect.width + extraSpace + margin.right);
                break;
            case 'Middle':
                y = !this.chart.requireInvertedAxis ? (isMinus ? y - (rect.height / 2) : y + (rect.height / 2)) :
                    (isMinus ? y + (rect.width / 2) : y - (rect.width / 2));
                break;
            case 'Auto':
                y = this.calculateRectActualPosition(y, rect, isMinus, series, textSize);
                break;
            default:
                if ((isMinus && position === 'Top') || (!isMinus && position === 'Outer')) {
                    y = !this.chart.requireInvertedAxis ? y - extraSpace - margin.bottom : y + extraSpace + margin.right;
                } else {
                    y = !this.chart.requireInvertedAxis ? y + extraSpace + margin.top : y - extraSpace - margin.left;
                }
                break;
        }
        let check: boolean = !this.chart.requireInvertedAxis ? (y < rect.y || y > rect.y + rect.height) :
            (y < rect.x || y > rect.x + rect.width);
        this.fontBackground = check ?
            (this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground)
            : this.fontBackground === 'transparent' ? series.fill : this.fontBackground;
        return y;
    }

    private calculatePathPosition(y: number, position: LabelPosition, series: Series, point: Points, size: Size): number {
        let padding: number = 5;
        this.fontBackground = this.fontBackground === 'transparent' ? this.chart.chartArea.background : this.fontBackground;
        switch (position) {
            case 'Top':
            case 'Outer':
                y = y - this.markerHeight - this.borderWidth - size.height / 2 - this.margin.bottom - padding;
                break;
            case 'Bottom':
                y = y + this.markerHeight + this.borderWidth + size.height / 2 + this.margin.top + padding;
                break;
            case 'Auto':
                y = this.calculatePathActualPosition(y, this.markerHeight, series, point, size);
                break;
        }
        return y;
    }

    private isDataLabelShape(style: ITextRenderEventArgs): void {
        this.isShape = (style.color !== 'transparent' || style.border.width > 0);
        this.borderWidth = style.border.width;
        if (!this.isShape) {
            this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
        }
    }

    private calculateRectActualPosition(y: number, rect: Rect, isMinus: boolean, series: Series, size: Size): number {
        let location: number;
        let labelRect: Rect;
        let isOverLap: boolean = true;
        let position: number = 0;
        let collection: Rect[] = this.chart.dataLabelCollections;
        while (isOverLap && position < 4) {
            location = this.calculateRectPosition(y, rect, isMinus, this.getPosition(position), series, size);
            if (!this.chart.requireInvertedAxis) {
                labelRect = calculateRect(new ChartLocation(this.locationX, location), size, this.margin);
                isOverLap = labelRect.y < 0 || isCollide(labelRect, collection) || labelRect.y > series.clipRect.height;
            } else {
                labelRect = calculateRect(new ChartLocation(location, this.locationY), size, this.margin);
                isOverLap = labelRect.x < 0 || isCollide(labelRect, collection) || labelRect.x > series.clipRect.width;
            }
            position++;
        }
        return location;
    }

    private calculatePathActualPosition(y: number, markerSize: number, series: Series, point: Points, size: Size): number {
        let points: Points[] = series.points;
        let index: number = point.index;
        let yValue: number = points[index].yValue;
        let position: LabelPosition;
        let nextPoint: Points = points.length - 1 > index ? points[index + 1] : null;
        let previousPoint: Points = index > 0 ? points[index - 1] : null;
        let yLocation: number;
        let isOverLap: boolean = true;
        let labelRect: Rect;
        let isBottom: boolean;
        let positionIndex: number;
        let collection: Rect[] = this.chart.dataLabelCollections;
        if (series.type.indexOf('Step') > -1) {
            position = 'Top';
            if (index) {
                position = (!previousPoint || !previousPoint.visible || yValue > previousPoint.yValue
                    || yValue === previousPoint.yValue) ? 'Top' : 'Bottom';
            }
        } else {
            if (index === 0) {
                position = (!nextPoint || !nextPoint.visible || yValue > nextPoint.yValue) ? 'Top' : 'Bottom';
            }
            if (index === points.length - 1) {
                position = (!previousPoint || !previousPoint.visible || yValue > previousPoint.yValue) ? 'Top' : 'Bottom';
            } else {
                if (!nextPoint.visible && !(previousPoint && previousPoint.visible)) {
                    position = 'Top';
                } else if (!nextPoint.visible || !previousPoint) {
                    position = (nextPoint.yValue > yValue || (previousPoint && previousPoint.yValue > yValue)) ?
                        'Bottom' : 'Top';
                } else {
                    let slope: number = (nextPoint.yValue - previousPoint.yValue) / 2;
                    let intersectY: number = (slope * index) + (nextPoint.yValue - (slope * (index + 1)));
                    position = intersectY < yValue ? 'Top' : 'Bottom';
                }
            }
        }
        isBottom = position === 'Bottom';
        positionIndex = ['Outer', 'Top', 'Bottom', 'Middle', 'Auto'].indexOf(position);
        while (isOverLap && positionIndex < 4) {
            yLocation = this.calculatePathPosition(y, this.getPosition(positionIndex), series, point, size);
            labelRect = calculateRect(new ChartLocation(this.locationX, yLocation), size, this.margin);
            isOverLap = labelRect.y < 0 || isCollide(labelRect, collection)
                || (labelRect.y + labelRect.height) > series.clipRect.height;
            positionIndex = isBottom ? positionIndex - 1 : positionIndex + 1;
            isBottom = false;
        }
        return yLocation;
    }

    // alignment calculation assigned here
    private calculateAlignment(value: number, y: number, alignment: LabelAlignment, isMinus: boolean): number {
        switch (alignment) {
            case 'Far': y = !this.chart.requireInvertedAxis ? (isMinus ? y + value : y - value) :
                (isMinus ? y - value : y + value); break;
            case 'Near': y = !this.chart.requireInvertedAxis ? (isMinus ? y - value : y + value) :
                (isMinus ? y + value : y - value); break;
            case 'Center': y = y; break;
        }
        return y;
    }

    /**
     * Animates the data label.
     * @return {void}.
     * @private
     */
    public doDataLabelAnimation(series: Series): void {
        let shapeElements: HTMLCollection = <HTMLCollection>series.shapeElement.childNodes;
        let textNode: HTMLCollection = <HTMLCollection>series.textElement.childNodes;
        let delay: number = series.animation.delay + series.animation.duration;
        let location: ChartLocation;
        for (let i: number = 0, count: number = textNode.length; i < count; i++) {
            location = new ChartLocation(
                (+textNode[i].getAttribute('x')) + ((+textNode[i].getAttribute('width')) / 2),
                (+textNode[i].getAttribute('y')) + ((+textNode[i].getAttribute('height')) / 2));
            markerAnimate(<HTMLElement>textNode[i], delay, 200, series, null, location, true);
            if (shapeElements[i]) {
                location = new ChartLocation(
                    (+shapeElements[i].getAttribute('x')) + ((+shapeElements[i].getAttribute('width')) / 2),
                    (+shapeElements[i].getAttribute('y')) + ((+shapeElements[i].getAttribute('height')) / 2));
                markerAnimate(<HTMLElement>shapeElements[i], delay, 200, series, null, location, true);
            }
        }
    }

    private getPosition(index: number): LabelPosition {
        return <LabelPosition>(['Outer', 'Top', 'Bottom', 'Middle', 'Auto'][index]);
    }

    /**
     * Get module name.
     */

    protected getModuleName(): string {
        // Returns the module name
        return 'DataLabel';
    }
    /**
     * To destroy the dataLabel for series. 
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        // Destroy method performed here
    }

}