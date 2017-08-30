/**
 * Selection src file
 */
import { createElement } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Indexes } from '../../common/model/base';
import { IndexesModel } from '../../common/model/base-model';
import { Chart} from '../../chart';
import { AccumulationChart} from '../../accumulation';
/**
 * Selection Module handles the selection for chart.
 * @private
 */
export class BaseSelection {

    protected styleId: string;
    protected unselected: string;
    protected control: Chart | AccumulationChart;
    constructor(control: Chart | AccumulationChart) {
        this.control = control;
    }

    protected seriesStyles(): void {
        let seriesclass: string;
        let style: HTMLStyleElement = <HTMLStyleElement>document.getElementById(this.styleId);
        if (isNullOrUndefined(style)) {
            style = document.createElement('style');
            style.setAttribute('id', this.styleId);
            for (let series of this.control.visibleSeries) {
                seriesclass = series.selectionStyle || this.styleId + '_series_' + series.index;
                style.innerHTML += series.selectionStyle ? '' : '.' + seriesclass + ' { } ';
            }
            style.innerHTML += '.' + this.unselected + ' { opacity:' + (0.3) + ';} ';
            document.body.appendChild(style);
        }
    }
    protected concatIndexes(userIndexes: IndexesModel[], localIndexes: Indexes[]): Indexes[] {
        return <Indexes[]>userIndexes.concat(localIndexes);
    }
    /**
     * Selected points series visibility checking on legend click
     */
    protected checkVisibility(selectedIndexes: Indexes[]): boolean {
        let visible: boolean = false;
        let uniqueSeries: number[] = [];
        for (let index of selectedIndexes) {
            if (uniqueSeries.indexOf(index.series) === -1) {
                uniqueSeries.push(index.series);
            }
        }
        for (let index of uniqueSeries) {
            if (this.control.series[index].visible) {
                visible = true;
                break;
            }
        }
        return visible;
    }
    protected getChildren(parent: Element): Element[] {
        let children: Element[] = [];
        for (let i: number = 0; i < parent.childNodes.length; i++) {
            if ((<Element>parent.childNodes[i]).tagName !== 'defs') {
                children.push((<Element>parent.childNodes[i]));
            }
        }
        return children;
    }
}