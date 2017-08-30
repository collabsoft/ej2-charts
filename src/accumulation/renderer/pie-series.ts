/** 
 * AccumulationChart series file
 */
import { AccPoints, AccumulationSeries } from '../model/acc-base';
import { PathOption, degreeToLocation} from '../../common/utils/helper';
import { PieBase} from '../renderer/pie-base';
import { AccumulationChart} from '../accumulation';
import { AnimationModel} from '../../common/model/base-model';
export class PieSeries extends PieBase {

    public renderPoint(point: AccPoints, option: PathOption, sum: number): PathOption {
        let degree: number = ((Math.abs(point.y) / sum) * (this.totalAngle));
        option.d = this.getPathOption(point, degree);
        point.midAngle = (this.startAngle - (degree / 2)) % 360;
        point.endAngle = this.startAngle % 360;
        point.symbolLocation = degreeToLocation(point.midAngle, (this.radius + this.innerRadius) / 2, this.center);
        return option;
    }
    private getPathOption(point: AccPoints, degree: number): string {
        let path: string = this.getPathArc(this.center, this.startAngle % 360, (this.startAngle + degree) % 360,
                                           this.radius, this.innerRadius);
        this.startAngle += degree;
        return path;
    }
    public animateSeries(pie: AccumulationChart, option: AnimationModel, series: AccumulationSeries, slice: Element): void {
        let groupId: string  = pie.element.id + 'SeriesGroup' + series.index;
        if (series.animation.enable && pie.animateSeries) {
            let clippath: Element = pie.renderer.createClipPath({ id: groupId + '_clipPath' });
            let path: PathOption = new PathOption(groupId + '_slice', 'transparent', 1, 'transparent', 1, '', '');
            let clipslice: Element = pie.renderer.drawPath(path);
            clippath.appendChild(clipslice);
            pie.svgObject.appendChild(clippath);
            slice.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
            this.doAnimation(clipslice, series);
        }
    }
    protected getModuleName(): string {
        return 'PieSeries';
    }
}