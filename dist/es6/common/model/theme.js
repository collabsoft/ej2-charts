/**
 * Specifies Chart Themes
 */
export var Theme;
(function (Theme) {
    /** @private */
    Theme.axisLabelFont = {
        size: '12px',
        fontWeight: 'Normal',
        color: '#686868',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.axisTitleFont = {
        size: '14px',
        fontWeight: 'Normal',
        color: '#424242',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.chartTitleFont = {
        size: '15px',
        fontWeight: '500',
        color: '#424242',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.crosshairLabelFont = {
        size: '13px',
        fontWeight: 'Normal',
        color: '#e5e5e5',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.tooltipLabelFont = {
        size: '13px',
        fontWeight: 'Normal',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Normal',
        color: '#353535',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.stripLineLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#353535',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    /** @private */
    Theme.axisLineColor = '#b5b5b5';
    /** @private */
    Theme.axisMajorGridLineColor = '#dbdbdb';
    /** @private */
    Theme.axisMinorGridLineColor = '#eaeaea';
    /** @private */
    Theme.axisMajorTickLineColor = '#b5b5b5';
    /** @private */
    Theme.axisMinorTickLineColor = '#d6d6d6';
    /** @private */
    Theme.crossHairLabelColor = '#4f4f4f';
    /** @private */
    Theme.chartBackgroundColor = '#FFFFFF';
    /** @private */
    Theme.selectionRectFill = 'rgba(41, 171, 226, 0.1)';
    /** @private */
    Theme.selectionRectStroke = '#29abe2';
})(Theme || (Theme = {}));
/** @private */
export function getSeriesColor(theme) {
    var palette;
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
