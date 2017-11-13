import { isNullOrUndefined } from '@syncfusion/ej2-base';
var BaseSelection = (function () {
    function BaseSelection(control) {
        this.control = control;
    }
    BaseSelection.prototype.seriesStyles = function () {
        var seriesclass;
        var style = document.getElementById(this.styleId);
        if (isNullOrUndefined(style)) {
            style = document.createElement('style');
            style.setAttribute('id', this.styleId);
            for (var _i = 0, _a = this.control.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                seriesclass = series.selectionStyle || this.styleId + '_series_' + series.index;
                style.innerHTML += series.selectionStyle ? '' : '.' + seriesclass + ' { } ';
            }
            style.innerHTML += '.' + this.unselected + ' { opacity:' + (0.3) + ';} ';
            document.body.appendChild(style);
        }
    };
    BaseSelection.prototype.concatIndexes = function (userIndexes, localIndexes) {
        return userIndexes.concat(localIndexes);
    };
    BaseSelection.prototype.checkVisibility = function (selectedIndexes) {
        var visible = false;
        var uniqueSeries = [];
        for (var _i = 0, selectedIndexes_1 = selectedIndexes; _i < selectedIndexes_1.length; _i++) {
            var index = selectedIndexes_1[_i];
            if (uniqueSeries.indexOf(index.series) === -1) {
                uniqueSeries.push(index.series);
            }
        }
        for (var _a = 0, uniqueSeries_1 = uniqueSeries; _a < uniqueSeries_1.length; _a++) {
            var index = uniqueSeries_1[_a];
            if (this.control.series[index].visible) {
                visible = true;
                break;
            }
        }
        return visible;
    };
    BaseSelection.prototype.addSvgClass = function (element, className) {
        var elementClassName = element.getAttribute('class') || '';
        elementClassName += ((elementClassName !== '') ? ' ' : '');
        if (elementClassName.indexOf(className) === -1) {
            element.setAttribute('class', elementClassName + className);
        }
    };
    BaseSelection.prototype.removeSvgClass = function (element, className) {
        var elementClassName = element.getAttribute('class') || '';
        if (elementClassName.indexOf(className) > -1) {
            element.setAttribute('class', elementClassName.replace(className, ''));
        }
    };
    BaseSelection.prototype.getChildren = function (parent) {
        var children = [];
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].tagName !== 'defs') {
                children.push(parent.childNodes[i]);
            }
        }
        return children;
    };
    return BaseSelection;
}());
export { BaseSelection };
