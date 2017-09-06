/** 
 * AccumulationChart series file
 */
import { AccPoints, AccumulationSeries } from '../model/acc-base';
import { PathOption, degreeToLocation} from '../../common/utils/helper';
import { PieBase} from '../renderer/pie-base';
import { AccumulationChart} from '../accumulation';
import { AnimationModel} from '../../common/model/base-model';
export class PieSeries extends PieBase {
    /**
     * To get path option, degree, symbolLocation from the point.
     * @private
     */
    public renderPoint(point: AccPoints, option: PathOption, sum: number): PathOption {
        let degree: number = ((Math.abs(point.y) / sum) * (this.totalAngle));
        option.d = this.getPathOption(point, degree);
        point.midAngle = (this.startAngle - (degree / 2)) % 360;
        point.endAngle = this.startAngle % 360;
        point.symbolLocation = degreeToLocation(point.midAngle, (this.radius + this.innerRadius) / 2, this.center);
        return option;
    }
    /**
     * To get path option from the point.
     */
    private getPathOption(point: AccPoints, degree: number): string {
        let path: string = this.getPathArc(this.center, this.startAngle % 360, (this.startAngle + degree) % 360,
                                           this.radius, this.innerRadius);
        this.startAngle += degree;
        return path;
    }
    /**
     * To animate the pie series.
     * @private
     */
    public animateSeries(accumulation: AccumulationChart, option: AnimationModel, series: AccumulationSeries, slice: Element): void {
        let groupId: string  = accumulation.element.id + 'SeriesGroup' + series.index;
        if (series.animation.enable && accumulation.animateSeries) {
            let clippath: Element = accumulation.renderer.createClipPath({ id: groupId + '_clipPath' });
            let path: PathOption = new PathOption(groupId + '_slice', 'transparent', 1, 'transparent', 1, '', '');
            let clipslice: Element = accumulation.renderer.drawPath(path);
            clippath.appendChild(clipslice);
            accumulation.svgObject.appendChild(clippath);
            slice.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
            this.doAnimation(clipslice, series);
        }
    }
    /**
     * To get the module name of the Pie series.
     */
    protected getModuleName(): string {
        return 'PieSeries';
    }
}