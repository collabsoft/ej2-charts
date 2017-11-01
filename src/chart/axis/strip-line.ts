/**
 * StripLine src
 */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Chart } from '../chart';
import { Axis } from '../axis/axis';
import { StripLineSettingsModel } from '../model/chart-base-model';
import { Rect, TextOption, measureText, valueToCoefficient, textElement, logBase, RectOption, Size } from '../../common/utils/helper';
import { ZIndex, Anchor } from '../utils/enum';

/**
 * `StripLine` module used to render the stripLine in chart.
 */
export class StripLine {

    private measureStripLine(axis: Axis, stripline: StripLineSettingsModel, seriesClipRect: Rect): Rect {
        let rect: { from: number, to: number } = this.getFromTovalue(
            stripline.start as number, stripline.end as number, stripline.size, stripline.startFromAxis, axis
        );
        let height: number = (axis.orientation === 'Vertical') ? (rect.to - rect.from) * axis.rect.height : seriesClipRect.height;
        let width: number = (axis.orientation === 'Horizontal') ? (rect.to - rect.from) * axis.rect.width : seriesClipRect.width;
        let x: number = (axis.orientation === 'Vertical') ? seriesClipRect.x : ((rect.from * axis.rect.width) + axis.rect.x);
        let y: number = (axis.orientation === 'Horizontal') ? seriesClipRect.y : (axis.rect.y + axis.rect.height -
            (rect.to * axis.rect.height));
        if (height !== 0 && width !== 0) {
            return new Rect(x, y, width, height);
        }
        return new Rect(0, 0, 0, 0);
    }
    /**
     * To get from to value from start, end, size, start from axis  
     */
    private getFromTovalue(start: number, end: number, size: number, startFromAxis: boolean, axis: Axis): {from: number, to: number} {
        let from: number = startFromAxis ? axis.visibleRange.min : this.findValue(
            Math.min(start, isNullOrUndefined(end) ? start : end), axis);
        let to: number = this.findValue(
            this.getToValue(Math.max(start, isNullOrUndefined(end) ? start : end), from, size, axis, end), axis);
        return { from: valueToCoefficient(axis.isInversed ? to : from, axis), to: valueToCoefficient(axis.isInversed ? from : to, axis)};
    }
    private getToValue(to: number, from: number, size: number, axis: Axis, end: number): number {
        if (axis.valueType === 'DateTime') {
            return <number> (isNullOrUndefined(end) ? new Date(new Date(from).getTime() + size) : to);
        } else {
            return isNullOrUndefined(end) ? (axis.valueType === 'Logarithmic' ? Math.pow(axis.logBase, from) : from) + size : to;
        }
    }
    private findValue(value: number, axis: Axis): number {
        if ( axis.valueType === 'Logarithmic') {
            value = logBase(value, axis.logBase);
        }
        if (value < axis.visibleRange.min) {
            value = axis.visibleRange.min;
        } else if (value > axis.visibleRange.max) {
            value = axis.visibleRange.max;
        }
        return value;
    }
    /**
     * To render striplines based start and end.
     * @private
     * @param chart 
     * @param position 
     * @param axes 
     */
    public renderStripLine(chart: Chart, position: ZIndex, axes: Axis[]): void {
        let id: string = chart.element.id + '_stripline_' + position + '_';
        let striplineGroup: Element = chart.renderer.createGroup({ id: id + 'collections' });
        let seriesClipRect: Rect = chart.chartAxisLayoutPanel.seriesClipRect;
        let rect: Rect;
        let count: number = 0;
        for (let axis of axes) {
            for (let stripline of axis.stripLines) {
                if (stripline.visible && stripline.zIndex === position) {
                    rect = this.measureStripLine(axis, stripline, seriesClipRect);
                    this.renderRectangle(stripline, rect, id + 'rect_' + count, striplineGroup, chart);
                    this.renderText(stripline, rect, id + 'text_' + count, striplineGroup, chart, axis);
                    count++;
                }
            }
        }
        chart.svgObject.appendChild(striplineGroup);
    }
    private renderRectangle(stripline: StripLineSettingsModel, rect: Rect, id: string, parent: Element, chart: Chart): void {
        parent.appendChild(chart.renderer.drawRectangle(
            new RectOption(id, stripline.color, stripline.border, stripline.opacity, rect, 0, 0, '', '')
        ));
    }
    private renderText(stripline: StripLineSettingsModel, rect: Rect, id: string, parent: Element, chart: Chart, axis: Axis): void {
        let textSize: Size = measureText(stripline.text, stripline.textStyle);
        let textMid: number = 3 * (textSize.height / 8);
        let ty: number = rect.y + (rect.height / 2) + textMid;
        let rotation: number = (stripline.rotation === null) ? ((axis.orientation === 'Vertical') ? 0 : -90) : stripline.rotation;
        let tx: number = rect.x + (rect.width / 2);
        let alignment: Anchor;
        let anchor: Anchor;
        let padding: number = 5;
        if (axis.orientation === 'Horizontal') {
            tx = this.getTextStart(tx + (textMid * this.factor(stripline.horizontalAlignment)),
                                   rect.width, stripline.horizontalAlignment);
            ty = this.getTextStart(ty - textMid, rect.height, stripline.verticalAlignment);
            alignment = this.invertAlignment(stripline.verticalAlignment);
        } else {
            tx = this.getTextStart(tx, rect.width, stripline.horizontalAlignment);
            ty = this.getTextStart(ty + (textMid * this.factor(stripline.verticalAlignment)) - padding,
                                   rect.height, stripline.verticalAlignment);
            alignment = stripline.horizontalAlignment;
        }
        anchor = alignment;
        textElement(
            new TextOption(id, tx, ty, anchor, stripline.text, 'rotate(' + rotation + ' ' + tx + ',' + ty + ')', 'middle'),
            stripline.textStyle, stripline.textStyle.color, parent);
    }
    private invertAlignment(anchor: Anchor): Anchor {
        switch (anchor) {
            case 'Start':
                anchor = 'End';
                break;
            case 'End':
                anchor = 'Start';
                break;
        }
        return anchor;
    }
    private factor(anchor: Anchor): number {
        let factor: number = 0;
        switch (anchor) {
            case 'Start':
                factor = 1;
                break;
            case 'End':
                factor = -1;
                break;
        }
        return factor;
    }
    private getTextStart(xy: number, size: number, textAlignment: Anchor): number {
        let padding: number = 5;
        switch (textAlignment) {
            case 'Start':
                xy = xy - (size / 2) + padding;
                break;
            case 'End':
                xy = xy + (size / 2) - padding;
                break;
        }
        return xy;
    }
    /**
     * To get the module name for `StripLine`.
     * @private
     */
    public getModuleName(): string {
        return 'StripLine';
    }
    /**
     * To destroy the `StripLine` module.
     * @private
     */
    public destroy(): void {
        // destroy peform here
    }
}