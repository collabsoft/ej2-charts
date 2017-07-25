import { Property, Complex, ChildProperty } from '@syncfusion/ej2-base';
import { FontModel, BorderModel } from '../model/base-model';
import { Font, Border } from '../model/base';
import { Orientation, ChartRangePadding } from '../utils/enum';
import { EdgeLabelPlacement, ValueType, IntervalType, LabelPlacement, LabelIntersectAction } from '../utils/enum';
import { Size, Rect, measureText, rotateTextSize, firstToLowerCase, valueToCoefficient } from '../utils/helper';
import { DoubleRange } from '../utils/double-range';
import { Chart } from '../chart';
import { MajorGridLinesModel, MinorGridLinesModel, CrosshairTooltipModel } from '../axis/axis-model';
import { AxisLineModel, MajorTickLinesModel, MinorTickLinesModel } from '../axis/axis-model';
import { Series } from '../series/chart-series';
import { Double } from '../axis/double-axis';
import { DateTime } from '../axis/date-time-axis';
import { Category } from '../axis/category-axis';
import { Theme } from '../model/theme';
import { IAxisLabelRenderEventArgs } from '../model/interface';
import { axisLabelRender } from '../model/constants';


const axisPadding: number = 10;

/**   
 * Configures the `rows` of chart.    
 */

export class Row extends ChildProperty<Row> {

    /**
     * The height of the row as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, row will render to the full height of its chart.
     * @default 100%
     */

    @Property('100%')
    public height: string;

    /**
     * Options to customize the border of the row.
     */

    @Complex<BorderModel>({}, Border)
    public border: BorderModel;
    /** @private */
    public axes: Axis[] = [];
    /** @private */
    public computedHeight: number;
    /** @private */
    public computedTop: number;
    /** @private */
    public nearSizes: number[] = [];
    /** @private */
    public farSizes: number[] = [];

    /**
     * Measure the row size
     * @return {void}
     * @private
     */
    public computeSize(axis: Axis, clipRect: Rect): void {
        let titleSize: number = 0;
        let width: number = 0;
        let innerPadding: number = 5;
        if (axis.title) {
            titleSize = measureText(axis.title, axis.titleStyle).height + innerPadding;
        }
        width += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.width + innerPadding + axisPadding + axis.lineStyle.width / 2);

        if (axis.opposedPosition) {
            this.farSizes.push(width);
        } else {
            this.nearSizes.push(width);
        }
    }
}

/**   
 * Configures the `columns` of chart.    
 */

export class Column extends ChildProperty<Column> {

    /**
     * The width of the column as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, column will render to the full width of its chart.
     * @default 100%
     */

    @Property('100%')
    public width: string;

    /**
     * Options to customize the border of the column.
     */

    @Complex<BorderModel>({}, Border)
    public border: BorderModel;
    /** @private */
    public axes: Axis[] = [];
    /** @private */
    public computedWidth: number;
    /** @private */
    public computedLeft: number;
    /** @private */
    public nearSizes: number[] = [];
    /** @private */
    public farSizes: number[] = [];
    /** @private */
    private padding: number = 0;

    /**
     * Measure the column size
     * @return {void}
     * @private
     */

    public computeSize(axis: Axis, clipRect: Rect): void {
        let titleSize: number = 0;
        let height: number = 0;
        let innerPadding: number = 5;
        if (axis.title) {
            titleSize = measureText(axis.title, axis.titleStyle).height + innerPadding;
        }
        height += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.height + innerPadding + axisPadding
            + axis.lineStyle.width / 2);

        if (axis.opposedPosition) {
            this.farSizes.push(height);
        } else {
            this.nearSizes.push(height);
        }
    }
}
/**   
 * Configures the major grid lines in `axis`.    
 */
export class MajorGridLines extends ChildProperty<MajorGridLines> {

    /**
     * The width of the line in pixels.
     * @default 1
     */

    @Property(1)
    public width: number;

    /**
     * The dash array of the grid lines.
     * @default ''
     */

    @Property('')
    public dashArray: string;

    /**
     * The color of the major grid line, which accepts value in hex, rgba as a valid CSS color string.
     */

    @Property(Theme.axisMajorGridLineColor)
    public color: string;
}
/**   
 * Configures the minor grid lines in `axis`.    
 */
export class MinorGridLines extends ChildProperty<MinorGridLines> {

    /**
     * The width of the line in pixels.
     * @default 0.7
     */

    @Property(0.7)
    public width: number;

    /**
     * The dash array of the grid lines.
     * @default ''
     */

    @Property('')
    public dashArray: string;

    /**
     * The color of the minor grid line, which accepts value in hex, rgba as a valid CSS color string.
     */

    @Property(Theme.axisMinorGridLineColor)
    public color: string;
}
/**   
 * Configures the axis line.    
 */
export class AxisLine extends ChildProperty<AxisLine> {

    /**
     * The width of the line in pixels.
     * @default 1
     */

    @Property(1)
    public width: number;

    /**
     * The dash array of the axis lines.
     * @default ''
     */

    @Property('')
    public dashArray: string;

    /**
     * The color of the axis line, which accepts value in hex, rgba as a valid CSS color string.
     */

    @Property(Theme.axisLineColor)
    public color: string;
}
/**   
 * Configures the major tick line.    
 */
export class MajorTickLines extends ChildProperty<MajorTickLines> {

    /**
     * The width of the tick line in pixels.
     * @default 1
     */

    @Property(1)
    public width: number;

    /**
     * The height of the ticks in pixels.
     * @default 5
     */

    @Property(5)
    public height: number;

    /**
     * The color of the major tick line, which accepts value in hex, rgba as a valid CSS color string.
     */

    @Property(Theme.axisMajorTickLineColor)
    public color: string;
}
/**   
 * Configures the minor tick lines.    
 */
export class MinorTickLines extends ChildProperty<MinorTickLines> {

    /**
     * The width of the tick line in pixels.
     * @default 0.7
     */

    @Property(0.7)
    public width: number;

    /**
     * The height of the ticks in pixels.
     * @default 5
     */

    @Property(5)
    public height: number;
    /**
     * The color of the minor tick line, which accepts value in hex, rgba as a valid CSS color string.
     */

    @Property(Theme.axisMinorTickLineColor)
    public color: string;
}
/**   
 * Configures the crosshair tooltip.    
 */
export class CrosshairTooltip extends ChildProperty<CrosshairTooltip> {

    /**
     * If set true, crosshair tooltip will get visible.
     *  @default false
     */

    @Property(false)
    public enable: Boolean;

    /**
     * The fill color of the tooltip, which accepts value in hex, rgba as a valid CSS color string.
     */

    @Property(Theme.crossHairLabelColor)
    public fill: string;

    /**
     * Options to customize the crosshair tooltip text.
     */

    @Complex<FontModel>(Theme.crosshairLabelFont, Font)
    public textStyle: FontModel;

}

/**
 * Configures the axis in chart.
 */

export class Axis extends ChildProperty<Axis> {
    /**
     * Options to customize the axis label.
     */

    @Complex<FontModel>(Theme.axisLabelFont, Font)
    public labelStyle: FontModel;

    /**
     * Options to customize the crosshair tooltip.
     */

    @Complex<CrosshairTooltipModel>({}, CrosshairTooltip)
    public crosshairTooltip: CrosshairTooltipModel;

    /**
     * Specifies the title of an axis.
     * @default ''
     */

    @Property('')
    public title: string;

    /**
     * Options for customizing the axis title.
     */

    @Complex<FontModel>(Theme.axisTitleFont, Font)
    public titleStyle: FontModel;

    /**
     * To format the axis label, which accepts any global string format like 'C', 'n1', 'P' etc.
     * Also accepts placeholder like '{value}°C' in which value represent the axis label e.g. 20°C.
     * @default ''
     */

    @Property('')
    public labelFormat: string;

    /**
     * Left and right padding for the plot area in pixels.
     * @default 0
     */

    @Property(0)
    public plotOffset: number;

    /**
     * The base value for logarithmic axis. It requires `valueType` to be `Logarithmic`
     * @default 10
     */
    @Property(10)
    public logBase: number;

    /**
     * Specifies the index of the column where the axis is associated,
     * when the chart area is divided into multiple plot areas by using `columns`.
     * ```html 
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *     columns: [{ width: '50%' },
     *               { width: '50%' }],
     *     axes: [{
     *                name: 'xAxis 1',
     *                columnIndex: 1,
     *     }],
     * ... 
     * });
     * chart.appendTo('#Chart');
     * ```
     * @default 0
     */

    @Property(0)
    public columnIndex: number;

    /**
     * Specifies the index of the row where the axis is associated,
     * when the chart area is divided into multiple plot areas by using `rows`.
     * ```html 
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *     rows: [{ height: '50%' },
     *            { height: '50%' }],
     *     axes: [{
     *                name: 'yAxis 1',
     *                rowIndex: 1,
     *      }],
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     * @default 0
     */

    @Property(0)
    public rowIndex: number;


    /**
     * Specifies the number of `columns` or `rows` an axis has to span horizontally or vertically.
     * @default 1
     */

    @Property(1)
    public span: number;

    /**
     * With this property, you can request axis to calculate intervals approximately equal to your desired interval.
     * @default null
     */

    @Property(null)
    public desiredIntervals: number;

    /**
     * The maximum number of labels count per 100 pixels with respect to axis length.
     * @default 3
     */

    @Property(3)
    public maximumLabels: number;

    /**
     * The axis is scaled by this factor. When zoomFactor is 0.5, the chart is scaled by 200% along this axis. Value ranges from 0 to 1.
     * @default 1
     */

    @Property(1)
    public zoomFactor: number;

    /**
     * Position of the zoomed axis. Value ranges from 0 to 1.
     * @default 0
     */

    @Property(0)
    public zoomPosition: number;

    /**
     * If set true, the axis will render at the opposite side from its default position.
     * @default false
     */

    @Property(false)
    public opposedPosition: boolean;

    /**
     * If set true, axis interval will be calculated automatically with respect to zoomed range.
     * @default true
     */

    @Property(true)
    public enableAutoIntervalOnZooming: boolean;

    /**
     * Specifies the padding for the axis range in terms of interval.They are
     * * none - Padding cannot be applied to the axis.
     * * normal - Padding is applied to the axis based on the range calculation.
     * * additional - Interval of the axis is added as padding to the minimum and maximum values of the range.
     * * round - Axis range is rounded to the nearest possible value divided by the interval.
     * @default 'Auto'
     */

    @Property('Auto')
    public rangePadding: ChartRangePadding;

    /**
     * Specifies the type of data the axis is handling.They are
     * * double -  Renders a numeric axis.
     * * dateTime - Renders a dateTime axis.
     * * category - Renders a category axis.
     * * logarithmic - Renders a log axis.
     * @default 'Double'
     */

    @Property('Double')
    public valueType: ValueType;


    /**
     * Specifies the position of labels at the edge of the axis.They are
     * * none - No action will be perform.
     * * hide - Edge label will be hidden.
     * * shift - Shift the edge labels.
     * @default 'None'
     */

    @Property('None')
    public edgeLabelPlacement: EdgeLabelPlacement;

    /**
     * Specifies the types like `Years`, `Months`, `Days`, `Hours`, `Minutes`, `Seconds` in date time axis.They are
     * * auto - Define the interval of the axis based on data.
     * * years - Define the interval of the axis in years.
     * * months - Define the interval of the axis in months.
     * * days - Define the interval of the axis in days.
     * * hours - Define the interval of the axis in hours.
     * * minutes - Define the interval of the axis in minutes.
     * @default 'Auto'
     */

    @Property('Auto')
    public intervalType: IntervalType;

    /**
     * Specifies the placement of label for category axis. They are
     * * betweenTicks - Render the label between the ticks.
     * * onTicks - Render the label on the ticks.
     * @default 'BetweenTicks'
     */

    @Property('BetweenTicks')
    public labelPlacement: LabelPlacement;

    /**
     * Unique identifier of an axis. To associate an axis with the series, set this name to the xAxisName/yAxisName property of the series.
     * @default ''
     */

    @Property('')
    public name: string;

    /**
     * If set true, axis label will be visible.
     * @default true
     */

    @Property(true)
    public visible: boolean;

    /**
     * Specifies the number of minor ticks per interval.
     * @default 0
     */

    @Property(0)
    public minorTicksPerInterval: number;

    /**
     * The angle to which the axis label gets rotated.
     * @default 0
     */

    @Property(0)
    public labelRotation: number;

    /**
     * Specifies the minimum range of an axis.
     * @default null
     */

    @Property(null)
    public minimum: Object;

    /**
     * Specifies the maximum range of an axis.
     * @default null
     */

    @Property(null)
    public maximum: Object;

    /**
     * The interval for an axis.
     * @default null
     */

    @Property(null)
    public interval: number;

    /**
     * Options for customizing the major tick lines.
     */

    @Complex<MajorTickLinesModel>({}, MajorTickLines)
    public majorTickLines: MajorTickLinesModel;

    /**
     * Options for customizing the minor tick lines.
     */

    @Complex<MinorTickLinesModel>({}, MinorTickLines)
    public minorTickLines: MinorTickLinesModel;

    /**
     * Options for customizing the major grid lines.
     */

    @Complex<MajorGridLinesModel>({}, MajorGridLines)
    public majorGridLines: MajorGridLinesModel;

    /**
     * Options for customizing the minor grid lines.
     */

    @Complex<MinorGridLinesModel>({}, MinorGridLines)
    public minorGridLines: MinorGridLinesModel;

    /**
     * Options for customizing the axis lines.
     */

    @Complex<AxisLineModel>({}, AxisLine)
    public lineStyle: AxisLineModel;

    /**
     * Specifies the actions like `Hide`, `Rotate45`, `Rotate90` when the axis labels are intersecting with each other.They are
     * * none - Shows all the labels.
     * * hide - Hide the label when it intersect.
     * * rotate45 - Rotate the label to 45 degree when it intersect.
     * * rotate90 - Rotate the label to 90 degree when it intersect.
     * @default Hide
     */

    @Property('Hide')
    public labelIntersectAction: LabelIntersectAction;

    /**
     * Description for axis and its element.
     * @default null
     */
    @Property(null)
    public description: string;

    /**
     * TabIndex value for the axis.
     * @default 2
     */
    @Property(2)
    public tabIndex: number;


    /** @private */
    public visibleRange: VisibleRangeModel;
    /** @private */
    public visibleLabels: VisibleLabels[] = [];
    /** @private */
    public actualRange: VisibleRangeModel;
    /** @private */
    public series: Series[] = [];
    /** @private */
    public doubleRange: DoubleRange;
    /** @private */
    public maxLabelSize: Size;
    /** @private */
    public rotatedLabel: string;
    /** @private */
    public rect: Rect = new Rect(undefined, undefined, 0, 0);
    /** @private */
    public axisBottomLine: BorderModel = null;
    /** @private */
    public orientation: Orientation;
    /** @private */
    public intervalDivs: number[] = [10, 5, 2, 1];
    /** @private */
    public actualIntervalType: IntervalType;
    /** @private */
    public labels: string[];
    /** @private */
    public format: Function;
    /** @private */
    public baseModule: Double | DateTime | Category;
    /** @private */
    public startLabel: string;
    /** @private */
    public endLabel: string;
    /** @private */
    public angle: number = this.labelRotation;
    /** @private */
    public dateTimeInterval: number;
    /** @private */
    public isStack100: boolean = false;
     /** @private */
    public paddingInterval: number = 0;

    /**
     * The function used to find whether the range is set.
     * @return {boolean}
     * @private
     */
    public setRange(): boolean {
        if (this.minimum != null && this.maximum != null) {
            return true;
        }
        return false;
    }

    /**
     * Calculate visible range for axis.
     * @return {void}
     * @private 
     */
    public calculateVisibleRange(size: Size): void {

        if (this.zoomFactor < 1 || this.zoomPosition > 0) {
            let baseRange: VisibleRangeModel = this.actualRange;
            let start: number = this.actualRange.min + this.zoomPosition * this.actualRange.delta;
            let end: number = start + this.zoomFactor * this.actualRange.delta;

            if (start < baseRange.min) {
                end = end + (baseRange.min - start);
                start = baseRange.min;
            }
            if (end > baseRange.max) {
                start = start - (end - baseRange.max);
                end = baseRange.max;
            }
            this.doubleRange = new DoubleRange(start, end);
            this.visibleRange.min = this.doubleRange.start;
            this.visibleRange.max = this.doubleRange.end;
            this.visibleRange.delta = this.doubleRange.delta;
        }
    }
    /**
     * Calculate desired interval for the axis.
     * @return {void}
     * @private
     */

    public getActualDesiredIntervalsCount(availableSize: Size): number {

        let size: number = this.orientation === 'Horizontal' ? availableSize.width : availableSize.height;
        if (this.desiredIntervals === null) {
            let desiredIntervalsCount: number = (this.orientation === 'Horizontal' ? 0.533 : 1) * this.maximumLabels;
            desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
            return desiredIntervalsCount;
        } else {
            return this.desiredIntervals;
        }
    }

    /**
     * Triggers the event.
     * @return {void}
     * @private
     */

    public triggerLabelRender(chart: Chart, tempInterval: number, text : string): void {
        let argsData: IAxisLabelRenderEventArgs;
        argsData = {
            cancel: false, name: axisLabelRender, axis: this,
            text:  text, value: tempInterval
        };
        chart.trigger(axisLabelRender, argsData);
        if (!argsData.cancel) {
                this.visibleLabels.push(new VisibleLabels(argsData.text, argsData.value));
        }
    }

    /**
     * Calculate padding for the axis.
     * @return {string}
     * @private
     */

    public getRangePadding(chart: Chart): string {
        let padding : string = this.rangePadding;
        if (padding !== 'Auto') {
            return padding;
        }
        switch (this.orientation) {
            case 'Horizontal':
                if (chart.requireInvertedAxis) {
                    padding =  (this.isStack100 ? 'Round' : 'Normal');
                } else {
                    padding = 'None';
                }
                break;
            case 'Vertical':
                if (!chart.requireInvertedAxis) {
                    padding = (this.isStack100 ? 'Round' : 'Normal');
                } else {
                    padding = 'None';
                }
                break;
         }
        return padding;
    }

    /**
     * Calculate maximum label width for the axis.
     * @return {void}
     * @private
     */
    public getMaxLabelWidth(chart: Chart): void {
        let prevSize: Size = new Size(0, 0);
        let rotatedLabel: string;
        let pointX: number; let previousEnd: number = 0;
        let isIntersect: boolean = false;
        this.angle = this.labelRotation;
        this.maxLabelSize = new Size(0, 0);
        let label: VisibleLabels;
        for (let i: number = 0; i < this.visibleLabels.length; i++) {
            label = this.visibleLabels[i];
            label.size = measureText(label.text, this.labelStyle);
            if (label.size.width > this.maxLabelSize.width) {
                this.maxLabelSize.width = label.size.width;
                this.rotatedLabel = label.text;
            }
            if (label.size.height > this.maxLabelSize.height) {
                this.maxLabelSize.height = label.size.height;
            }
            if (this.angle % 360 === 0 && this.orientation === 'Horizontal' && this.rect.width > 0 && !isIntersect &&
                (this.labelIntersectAction === 'Rotate90' || this.labelIntersectAction === 'Rotate45')) {
                pointX = (valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
                pointX -= label.size.width / 2;
                if (this.edgeLabelPlacement === 'Shift') {
                    if (i === 0 && pointX < this.rect.x) {
                        pointX = this.rect.x;
                    }
                    if (i === this.visibleLabels.length - 1 && ((pointX + label.size.width) > (this.rect.x + this.rect.width))) {
                        pointX = this.rect.x + this.rect.width - label.size.width;
                    }
                }
                if (pointX <= previousEnd) {
                    this.angle = (this.labelIntersectAction === 'Rotate45') ? 45 : 90;
                    isIntersect = true;
                }
                previousEnd = pointX + label.size.width;
            }
        }
        if (this.angle !== 0) {
            this.maxLabelSize = rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
        }
    }
    /**
     * Finds the default module for axis.
     * @return {void}
     * @private
     */

    public getModule(chart: Chart): void {
        if (this.valueType === 'Double') {
            this.baseModule = new Double(chart);
        } else {
            this.baseModule = chart[firstToLowerCase(this.valueType) + 'Module'];
        }
    }
}
/** @private */
export interface VisibleRangeModel {

    min?: number;

    max?: number;

    interval?: number;

    delta?: number;
}
/** @private */
export class VisibleLabels {

    public text: string;

    public value: number;

    public size: Size;

    constructor(text: string, value: number, size: Size = new Size(0, 0)) {
        this.text = text;
        this.value = value;
        this.size = size;
    }
}
