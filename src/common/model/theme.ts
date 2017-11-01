
import { IFontMapping } from './interface';
import { AccumulationTheme } from '../../accumulation-chart/model/enum';
import { ChartTheme } from '../../chart/utils/enum';

/**
 * Specifies Chart Themes
 */
export namespace Theme {
    /** @private */
    export let axisLabelFont: IFontMapping = {
        size: '12px',
        fontWeight: 'Normal',
        color: '#686868',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    export let axisTitleFont: IFontMapping = {
        size: '14px',
        fontWeight: 'Normal',
        color: '#424242',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    export let chartTitleFont: IFontMapping = {
        size: '15px',
        fontWeight: '500',
        color: '#424242',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    export let crosshairLabelFont: IFontMapping = {
        size: '13px',
        fontWeight: 'Normal',
        color: '#e5e5e5',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    export let tooltipLabelFont: IFontMapping = {
        size: '13px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    export let legendLabelFont: IFontMapping = {
        size: '13px',
        fontWeight: 'Normal',
        color: '#353535',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    export let stripLineLabelFont: IFontMapping = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#353535',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    export let axisLineColor: string = '#b5b5b5';
    /** @private */
    export let axisMajorGridLineColor: string = '#dbdbdb';
    /** @private */
    export let axisMinorGridLineColor: string = '#eaeaea';
    /** @private */
    export let axisMajorTickLineColor: string = '#b5b5b5';
    /** @private */
    export let axisMinorTickLineColor: string = '#d6d6d6';
    /** @private */
    export let crossHairLabelColor: string = '#4f4f4f';
    /** @private */
    export let chartBackgroundColor: string = '#FFFFFF';
    /** @private */
    export let selectionRectFill: string = 'rgba(41, 171, 226, 0.1)';
    /** @private */
    export let selectionRectStroke: string = '#29abe2';
}
/** @private */
export function getSeriesColor(theme: ChartTheme | AccumulationTheme): string[] {
    let palette: string[];
    switch (theme) {
        case 'Material':
            palette = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
                '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
            break;
        case 'Fabric':
            palette = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
                '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300'];
            break;
        case 'Bootstrap':
            palette = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
                '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
            break;
    }
    return palette;
}