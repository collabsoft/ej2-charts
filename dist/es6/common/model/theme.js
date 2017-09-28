export var Theme;
(function (Theme) {
    Theme.axisLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#686868',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    Theme.axisTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#424242',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    Theme.chartTitleFont = {
        size: '15px',
        fontWeight: '500',
        color: '#424242',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    Theme.crosshairLabelFont = {
        size: '13px',
        fontWeight: 'Regular',
        color: '#e5e5e5',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    Theme.tooltipLabelFont = {
        size: '13px',
        fontWeight: 'Regular',
        color: null,
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    Theme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Regular',
        color: '#353535',
        fontStyle: 'Normal',
        fontFamily: 'Segoe UI'
    };
    Theme.axisLineColor = '#b5b5b5';
    Theme.axisMajorGridLineColor = '#dbdbdb';
    Theme.axisMinorGridLineColor = '#eaeaea';
    Theme.axisMajorTickLineColor = '#b5b5b5';
    Theme.axisMinorTickLineColor = '#d6d6d6';
    Theme.crossHairLabelColor = '#4f4f4f';
    Theme.chartBackgroundColor = '#FFFFFF';
    Theme.selectionRectFill = 'rgba(41, 171, 226, 0.1)';
    Theme.selectionRectStroke = '#29abe2';
})(Theme || (Theme = {}));
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
    }
    return palette;
}
