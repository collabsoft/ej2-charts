/** 
 * AccumulationChart DataLabel module file
 */
import { createElement } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { ChartLocation, degreeToLocation, Size, Rect, isOverlap, stringToNumber, getAngle, TextOption} from '../../common/utils/helper';
import { textTrim, subtractThickness, Thickness, removeElement, measureText, RectOption, textElement } from '../../common/utils/helper';
import { PathOption, ColorValue, colorNameToHex, convertHexToColor} from '../../common/utils/helper';
import { AccumulationLabelPosition } from '../model/enum';
import { AccPoints, getSeriesFromIndex} from '../model/acc-base';
import { IAccTextRenderEventArgs} from '../model/pie-interface';
import { AccumulationDataLabelSettingsModel, ConnectorModel} from '../model/acc-base-model';
import { MarginModel, FontModel} from '../../common/model/base-model';
import { textRender} from '../../common/model/constants';
import { PieBase} from '../renderer/pie-base';
import { AccumulationChart } from '../accumulation';
export class AccumulationDataLabel extends PieBase {
    /** @private */
    public titleRect: Rect;
    /** @private */
    public areaRect: Rect;
    /** @private */
    public clearTooltip: number;
    private id: string;
    public marginValue: number;
    constructor(pie: AccumulationChart) {
        super();
        this.pie = pie;
        this.id = pie.element.id + '_datalabel_Series_';
        if (pie.title) {
            let titleSize: Size = measureText(pie.title, pie.titleStyle);
            this.titleRect = new Rect(pie.availableSize.width / 2 - titleSize.width / 2, pie.margin.top, titleSize.width, titleSize.height);
        }
    }
    /** @private */
    public  getDataLabelPosition(point: AccPoints, midAngle: number, dataLabel: AccumulationDataLabelSettingsModel, textSize: Size,
                                 points: AccPoints[], parent: Element, id: string): void {
        this.getLabelbound(point, midAngle, dataLabel.position, textSize, this.labelRadius, this.marginValue);
        point.labelAngle = midAngle;
        point.labelPosition = dataLabel.position;
        if (this.pie.enableSmartLabels) {
            this.getSmartLabel(point, midAngle, dataLabel, textSize, points, parent, id);
        }
    }
    private getLabelbound(point: AccPoints, midAngle: number, position: AccumulationLabelPosition, textSize: Size,
                          labelRadius: number, margin: number, endAngle: number = 0): void {
        let labelAngle: number = endAngle || midAngle;
        let space: number = 10;
        let location: ChartLocation = degreeToLocation(labelAngle, labelRadius, this.center);
        location.y = (position === 'Inside') ? (location.y - textSize.height / 2) : location.y;
        location.x = (position === 'Inside') ? (location.x - textSize.width / 2) : location.x;
        point.labelRegion = new Rect(location.x, location.y, textSize.width + (margin * 2), textSize.height + (margin * 2));
        if (position === 'Outside') {
            point.labelRegion.y -= point.labelRegion.height / 2;
            if (labelAngle >= 90 && labelAngle <= 270) {
                point.labelRegion.x -= (point.labelRegion.width + space);
            } else {
                point.labelRegion.x += space;
            }
        }
    }
    private getSmartLabel(point: AccPoints, midAngle: number, dataLabel: AccumulationDataLabelSettingsModel, textSize: Size,
                          points: AccPoints[], parent: Element, id: string): void {
        let labelRadius: number = this.radius + stringToNumber(dataLabel.connectorStyle.length, this.radius);
        let previousPoint: AccPoints = this.findPreviousPoint(points, point.index, point.labelPosition);
        if (dataLabel.position === 'Inside') {
            if (previousPoint && previousPoint.labelRegion && (isOverlap(point.labelRegion, previousPoint.labelRegion)
            || this.isOverlapping(point, points))) {
                point.labelPosition = 'Outside';
                this.getLabelbound(point, midAngle, point.labelPosition, textSize, labelRadius, this.marginValue);
                previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
                if (previousPoint && (isOverlap(point.labelRegion, previousPoint.labelRegion) ||
                    this.isConnectorLineOverlapping(point, previousPoint))) {
                    this.setOuterSmartLabel(previousPoint, point, midAngle, dataLabel.border.width, labelRadius, textSize,
                                            this.marginValue);
                }
            }
        } else {
            if (previousPoint && previousPoint.labelRegion && (isOverlap(point.labelRegion, previousPoint.labelRegion)
            || this.isOverlapping(point, points) || this.isConnectorLineOverlapping(point, previousPoint))) {
                this.setOuterSmartLabel(previousPoint, point, midAngle, dataLabel.border.width, labelRadius, textSize,
                                        this.marginValue);
            }
        }
        if (this.isOverlapping(point, points) || (this.titleRect && point.labelRegion && isOverlap(point.labelRegion, this.titleRect))) {
            this.setPointVisibileFalse(point);
        }
        if (this.pie.accumulationLegendModule && point.labelVisible && point.labelRegion) {
            this.textTrimming(point, this.pie.accumulationLegendModule.legendBounds, dataLabel.font,
                              this.pie.accumulationLegendModule.position);
        }
        if (point.labelVisible && point.labelRegion) {
            let position: string = (point.labelRegion.x >= this.center.x) ? 'InsideRight' : 'InsideLeft';
            this.textTrimming(point, this.areaRect, dataLabel.font, position);
        }
        if (point.labelVisible && point.labelRegion && ((point.labelRegion.y + point.labelRegion.height >
            this.areaRect.y + this.areaRect.height || point.labelRegion.y < this.areaRect.y) || (point.labelRegion.x < this.areaRect.x ||
            point.labelRegion.x + point.labelRegion.width > this.areaRect.x + this.areaRect.width))) {
            this.setPointVisibileFalse(point);
        }
    }

    /**
     * To change the pages of the legend. 
     * @return {void}
     * @private
     */
    public move(e: Event, x: number, y: number): void {
        if ((<HTMLElement>e.target).textContent.indexOf('...') > -1) {
            let targetId: string[] = (<HTMLElement>e.target).id.split(this.id);
            if (targetId.length === 2) {
                let seriesIndex: number = parseInt(targetId[1].split('_text_')[0], 10);
                let pointIndex: number = parseInt(targetId[1].split('_text_')[1], 10);
                if (!isNaN(seriesIndex) && !isNaN(pointIndex)) {
                    this.showText(<MouseEvent>e, seriesIndex, pointIndex, x, y);
                }
            }
        } else {
            removeElement('EJ2_datalabel_tooltip');
        }
    }
    public fadeOutTooltip(): void {
        clearTimeout(this.clearTooltip);
        this.clearTooltip = setTimeout(this.removeTooltip, 500);
    }
    public removeTooltip(): void {
        removeElement('EJ2_datalabel_tooltip');
    }
    /** @private */
    public showText(event: MouseEvent, seriesIndex: number, pointIndex: number, x: number, y: number): void {
        let point: AccPoints = getSeriesFromIndex(seriesIndex, (<AccumulationChart>this.pie).visibleSeries).points[pointIndex];
        let id: string = 'EJ2_datalabel_tooltip';
        let tooltip: HTMLElement = document.getElementById(id);
        if (!tooltip) {
            tooltip = createElement('div', {
                id: id,
                innerHTML: point.text || point.y.toString(),
                styles: 'top:' + (y + 10).toString() + 'px;left:' + (x + 10).toString() + 'px;background-color: rgb(255, 255, 255);' +
                'position:fixed;border:1px solid rgb(112, 112, 112); padding-left : 3px; padding-right : 2px;' +
                'padding-bottom : 2px; font-size:12px; font-family: "Segoe UI"'
            });
            document.body.appendChild(tooltip);
        }
    }
    private findPreviousPoint(points: AccPoints[], index: number, position: AccumulationLabelPosition): AccPoints {
        let point: AccPoints = points[0];
        for (let i: number = index - 1; i >= 0; i--) {
            point = points[i];
            if (point.visible && point.labelVisible && point.labelRegion && point.labelPosition === position) {
                return point;
            }
        }
        return null;
    }
    private isOverlapping(currentPoint: AccPoints, points: AccPoints[]): boolean {
        for (let i: number = currentPoint.index - 1; i >= 0; i--) {
            if (points[i].visible && points[i].labelVisible && points[i].labelRegion && currentPoint.labelRegion &&
            currentPoint.labelVisible && isOverlap(currentPoint.labelRegion, points[i].labelRegion)) {
                return true;
            }
        }
        return false;
    }
    private textTrimming(point: AccPoints, rect: Rect, font: FontModel, position: string): void {
        if (isOverlap(point.labelRegion, rect)) {
            let size: number = point.labelRegion.width;
            if (position === 'Right') {
                size = rect.x - point.labelRegion.x;
            } else if (position === 'Left') {
                size = point.labelRegion.x - (rect.x + rect.width);
            } else if (position === 'InsideRight') {
                size = (rect.x + rect.width) - point.labelRegion.x;
            } else if (position === 'InsideLeft') {
                size = (point.labelRegion.x + point.labelRegion.width) - rect.x;
                if (size < point.labelRegion.width) {
                    point.labelRegion.x = rect.x;
                }
            } else {
                this.setPointVisibileFalse(point);
            }
            if (point.labelVisible && point.labelRegion) {
                if (size < point.labelRegion.width) {
                    point.label = textTrim(size - (this.marginValue * 2), point.label, font);
                    point.labelRegion.width = size;
                }
                if (point.label.length === 3 && point.label.indexOf('...') > -1) {
                    this.setPointVisibileFalse(point);
                }
            }
        }
    }
    private setPointVisibileFalse(point: AccPoints): void {
        point.labelVisible = false;
        point.labelRegion = null;
    }
    private setOuterSmartLabel(previousPoint: AccPoints, point: AccPoints, midAngle: number, border: number, labelRadius: number,
                               textsize: Size, margin: number): void {
        let labelAngle: number = this.getOverlappedAngle(previousPoint.labelRegion, point.labelRegion, midAngle, border * 2);
        this.getLabelbound(point, midAngle, 'Outside', textsize, labelRadius, margin, labelAngle);
        if (labelAngle > point.endAngle) {
            this.setPointVisibileFalse(point);
        }
        point.labelAngle = labelAngle;
        while (point.labelVisible && (isOverlap(previousPoint.labelRegion, point.labelRegion) || labelAngle <= previousPoint.labelAngle
        || this.isConnectorLineOverlapping(point, previousPoint))) {
            if (labelAngle > point.endAngle) {
                this.setPointVisibileFalse(point);
                break;
            }
            point.labelAngle = labelAngle;
            this.getLabelbound(point, midAngle, 'Outside', textsize, labelRadius, margin, labelAngle);
            labelAngle += 0.1;
        }
    }
    private isConnectorLineOverlapping(point: AccPoints, previous: AccPoints): boolean {
        let start: ChartLocation = degreeToLocation(point.midAngle, this.radius, this.center);
        let end: ChartLocation = new ChartLocation(0, 0);
        this.getEdgeOfLabel(point.labelRegion, point.labelAngle, end);
        let previousstart: ChartLocation = degreeToLocation(previous.midAngle, this.radius, this.center);
        let previousend: ChartLocation = new ChartLocation(0, 0);
        this.getEdgeOfLabel(previous.labelRegion, previous.labelAngle, previousend);
        return this.isLineRectangleIntersect(start, end, point.labelRegion) ||
            this.isLineRectangleIntersect(start, end, previous.labelRegion) ||
            this.isLineRectangleIntersect(previousstart, previousend, point.labelRegion);
    }
    private isLineRectangleIntersect(line1: ChartLocation, line2: ChartLocation, rect: Rect): boolean {
        let rectPoints: ChartLocation[] = [
            new ChartLocation(Math.round(rect.x), Math.round(rect.y)),
            new ChartLocation(Math.round((rect.x + rect.width)), Math.round(rect.y)),
            new ChartLocation(Math.round((rect.x + rect.width)), Math.round((rect.y + rect.height))),
            new ChartLocation(Math.round(rect.x), Math.round((rect.y + rect.height)))
        ];
        line1.x = Math.round(line1.x);
        line1.y = Math.round(line1.y);
        line2.x = Math.round(line2.x);
        line2.y = Math.round(line2.y);
        for (let i: number = 0; i < rectPoints.length; i++) {
            if (this.isLinesIntersect(line1, line2, rectPoints[i], rectPoints[(i + 1) % rectPoints.length])) {
                return true;
            }
        }
        return false;
    }
    private isLinesIntersect(point1: ChartLocation, point2: ChartLocation, point11: ChartLocation, point12: ChartLocation): boolean {
        let a1: number = point2.y - point1.y;
        let b1: number = point1.x - point2.x;
        let c1: number = a1 * point1.x + b1 * point1.y;
        let a2: number = point12.y - point11.y;
        let b2: number = point11.x - point12.x;
        let c2: number = a2 * point11.x + b2 * point11.y;
        let delta: number = a1 * b2 - a2 * b1;
        if (delta !== 0) {
            let x: number = (b2 * c1 - b1 * c2) / delta;
            let y: number = (a1 * c2 - a2 * c1) / delta;
            let lies: boolean = Math.min(point1.x, point2.x) <= x && x <= Math.max(point1.x, point2.x);
            lies = lies && Math.min(point1.y, point2.y) <= y && y <= Math.max(point1.y, point2.y);
            lies = lies && Math.min(point11.x, point12.x) <= x && x <= Math.max(point11.x, point12.x);
            lies = lies && Math.min(point11.y, point12.y) <= y && y <= Math.max(point11.y, point12.y);
            return lies;
        }
        return false;
    }
    private getOverlappedAngle(first: Rect, second: Rect, angle: number, padding: number): number {
        let x: number = first.x;
        if (angle >= 90 && angle <= 270) {
            second.y = first.y - (padding + second.height / 2);
            x = first.x + first.width;
        } else {
            second.y = first.y + first.height + padding;
        }
        return getAngle(this.center, new ChartLocation(x, second.y));
    }
    /** @private */
    public getConnectorPath(label: Rect, midAngle: number, connector: ConnectorModel, labelRadius: number = null, end: number = 0): string {
        let start: ChartLocation = degreeToLocation(midAngle, this.radius - connector.width, this.center);
        let labelAngle: number = end || midAngle;
        labelRadius = labelRadius || this.labelRadius;
        let middle: ChartLocation = new ChartLocation(0, 0);
        let endPoint: ChartLocation = this.getEdgeOfLabel(label, labelAngle, middle, connector.width);
        if (connector.type === 'Curve') {
            let r: number = labelRadius - this.radius;
            middle = degreeToLocation(labelAngle, labelRadius - (r / 2), this.center);
            return 'M ' + start.x + ' ' + start.y + ' Q' + middle.x + ',' + middle.y + ' ' + endPoint.x + ',' + endPoint.y;
        } else {
            return 'M ' + start.x + ' ' + start.y + ' L ' + middle.x + ' ' + middle.y + ' L ' + endPoint.x + ' ' + endPoint.y;
        }
    }
    private getEdgeOfLabel(labelshape: Rect, angle: number, middle: ChartLocation, border: number = 1): ChartLocation {
        let edge: ChartLocation = new ChartLocation(labelshape.x, labelshape.y);
        if (angle >= 90 && angle <= 270) {
            edge.x += labelshape.width + border / 2;
            edge.y += labelshape.height / 2;
            middle.x = edge.x + 10;
            middle.y = edge.y;
        } else {
            edge.x -= border / 2;
            edge.y += labelshape.height / 2;
            middle.x = edge.x - 10;
            middle.y = edge.y;
        }
        return edge;
    }
    public findAreaRect(): void {
        this.areaRect = new Rect(0, 0, this.pie.availableSize.width, this.pie.availableSize.height);
        let margin: MarginModel = this.pie.margin;
        subtractThickness(this.areaRect, new Thickness(margin.left, margin.right, margin.top, margin.bottom));
    }
    public renderDataLabel(point: AccPoints, dataLabel: AccumulationDataLabelSettingsModel, parent: Element,
                           points: AccPoints[], series: number): void {
        let id: string = this.pie.element.id + '_datalabel_Series_' + series + '_';
        let datalabelGroup: Element = this.pie.renderer.createGroup({ id: id + 'g_' + point.index});
        point.label = point.text || point.y.toString();
        let argsData: IAccTextRenderEventArgs = {
            cancel: false, name: textRender, series: this.pie.visibleSeries[0], point: point, text: point.label, border: dataLabel.border,
            color: dataLabel.fill
        };
        this.pie.trigger(textRender, argsData);
        point.labelVisible = !argsData.cancel;
        point.text = point.label = argsData.text;
        this.marginValue = argsData.border.width ? (5 + argsData.border.width) : 1;
        let textSize: Size = measureText(point.label, dataLabel.font);
        textSize.height += 4; // 4 for calculation with padding for smart label shape
        textSize.width += 4;
        this.getDataLabelPosition(point, point.midAngle, dataLabel, textSize, points, datalabelGroup, id);
        if (point.labelVisible) {
            this.correctLabelRegion(point.labelRegion, textSize);
            datalabelGroup.appendChild(this.pie.renderer.drawRectangle(new RectOption(
                id + 'shape_' + point.index, argsData.color, argsData.border, 1,
                point.labelRegion, dataLabel.rx, dataLabel.ry
            )));
            textElement(
                new TextOption(
                    id + 'text_' + point.index, point.labelRegion.x + this.marginValue,
                    point.labelRegion.y + (textSize.height * 3 / 4) + this.marginValue,
                    'start', point.label, '', 'auto'
                ),
                dataLabel.font, dataLabel.font.color || this.getSaturatedColor(point, argsData.color), datalabelGroup
            );
            if (this.pie.accumulationLegendModule && (dataLabel.position === 'Outside' || this.pie.enableSmartLabels)) {
                this.pie.visibleSeries[0].findMaxBounds(this.pie.visibleSeries[0].labelBound, point.labelRegion);
            }
            if (point.labelPosition === 'Outside') {
                let path: string = this.getConnectorPath(
                    <Rect>extend({}, point.labelRegion, null, true), point.midAngle, dataLabel.connectorStyle, null, point.labelAngle);
                let pathElement: Element = this.pie.renderer.drawPath(new PathOption(
                    id + 'connector_' + point.index, 'transparent', dataLabel.connectorStyle.width,
                    dataLabel.connectorStyle.color || point.color, 1, '', path
                ));
                datalabelGroup.appendChild(pathElement);
            }
            parent.appendChild(datalabelGroup);
        }
    }
    private getSaturatedColor(point: AccPoints, color: string): string {
        let saturatedColor: string;
        if (this.marginValue > 1) {
            saturatedColor = color === 'transparent' ? this.getLabelBackground(point) : color;
        } else {
            saturatedColor = this.getLabelBackground(point);
        }
        saturatedColor = (saturatedColor === 'transparent') ? window.getComputedStyle(document.body, null).backgroundColor : saturatedColor;
        let rgbValue: ColorValue = convertHexToColor(colorNameToHex(saturatedColor));
        let contrast: number = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
        return contrast >= 128 ? 'black' : 'white';
    }
    private getLabelBackground(point: AccPoints): string {
        return point.labelPosition === 'Outside' ? this.pie.background : point.color;
    }
    private correctLabelRegion(labelRegion: Rect, textSize: Size, padding: number = 4): void {
        labelRegion.height -= padding;
        labelRegion.width -= padding;
        labelRegion.x += padding / 2;
        labelRegion.y += padding / 2;
        textSize.height -= padding;
        textSize.width -= padding;
    }
    protected getModuleName(): string {
        return 'AccumulationDataLabel';
    }
}