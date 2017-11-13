import { compile as templateComplier } from '@syncfusion/ej2-base';
import { createElement, setStyleAttribute } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import { getSeriesFromIndex } from '../model/acc-base';
import { getElement } from '../../common/utils/helper';
import { tooltipRender } from '../../common/model/constants';
var AccumulationTooltip = (function () {
    function AccumulationTooltip(accumulation) {
        this.accumulation = accumulation;
        this.tooltipOption = accumulation.tooltip;
        this.targetId = accumulation.element.id + '_pie_tooltip';
        this.tooltip = new Tooltip({
            opensOn: 'custom',
            beforeOpen: this.tooltipCustomization.bind(this),
            openDelay: 0,
            closeDelay: 1000
        });
        this.tooltip.appendTo(accumulation.element);
    }
    AccumulationTooltip.prototype.setTemplateFunction = function (template) {
        var e;
        try {
            if (document.querySelectorAll(template).length) {
                this.templateFn = templateComplier(document.querySelector(template).innerHTML.trim());
            }
        }
        catch (e) {
            this.templateFn = templateComplier(template);
        }
    };
    AccumulationTooltip.prototype.renderTooltip = function (point, seriesIndex) {
        var element = getElement(this.targetId);
        if (element && (element.getAttribute('data-tooltip-id') === null) ||
            this.tooltipIndex !== 'series_' + seriesIndex + '_point_' + point.index) {
            this.updatePosition(this.targetId, point.symbolLocation.x, point.symbolLocation.y, this.accumulation.element.id + '_Series_0_Point_' + point.index);
            this.setTemplateFunction(this.tooltipOption.template);
            this.currentPoint = point;
            this.tooltip.content = this.getTooltipContent(point, seriesIndex);
            this.tooltip.open(getElement(this.targetId));
            this.tooltipIndex = 'series_' + seriesIndex + '_point_' + point.index;
        }
    };
    AccumulationTooltip.prototype.fadeOutTooltip = function () {
        clearTimeout(this.clearTooltip);
        this.removeTooltip = this.removeTooltip.bind(this);
        this.clearTooltip = setTimeout(this.removeTooltip, 500);
    };
    AccumulationTooltip.prototype.removeTooltip = function () {
        if (this.tooltip) {
            this.tooltip.close();
        }
    };
    AccumulationTooltip.prototype.getTooltipContent = function (point, seriesIndex) {
        if (this.tooltipOption.template && this.templateFn) {
            var templates = this.templateFn(point);
            var element = createElement('div');
            while (templates.length > 0) {
                element.appendChild(templates[0]);
            }
            return element;
        }
        else {
            return this.getTooltipText(point, this.tooltipOption, seriesIndex);
        }
    };
    AccumulationTooltip.prototype.tooltipCustomization = function (args) {
        var argsData = {
            cancel: false, name: tooltipRender,
            content: this.tooltip.content,
            textStyle: this.tooltipOption.textStyle,
            series: this.accumulation.visibleSeries[0],
            point: this.currentPoint
        };
        this.accumulation.trigger(tooltipRender, argsData);
        args.cancel = argsData.cancel;
        this.tooltip.content = argsData.content;
        this.tooltipOption.textStyle = argsData.textStyle;
        var content = document.getElementsByClassName('e-tooltip-wrap')[0];
        var font = this.tooltipOption.textStyle;
        var position = this.tooltip.position.split(' ');
        var borderColor = this.tooltipOption.border.color || this.currentPoint.color;
        var pointerSize = 8;
        var outerWidth;
        var innerWidth;
        args.element.classList.remove('e-popup-close');
        args.element.classList.add('e-popup-open');
        var arrowEle = args.element.querySelector('.e-arrow-tip');
        var borderWidth = this.tooltipOption.border.width;
        setStyleAttribute(args.element, {
            'backgroundColor': this.tooltipOption.fill, 'borderColor': borderColor,
            'borderWidth': borderWidth, 'borderRadius': '5px', 'pointer-events': 'none'
        });
        setStyleAttribute(args.element.querySelector('.e-tip-content'), {
            'color': font.color || '#000000', 'fontFamily': font.fontFamily, 'fontSize': font.size,
            'fontWeight': font.fontWeight, 'opacity': font.opacity.toString(), 'fontStyle': font.fontStyle
        });
        pointerSize = args.element.querySelector('.e-arrow-tip').offsetHeight;
        outerWidth = pointerSize + 'px';
        setStyleAttribute(args.element.querySelector('.e-arrow-tip-outer'), {
            'borderRightColor': 'transparent', 'borderLeftColor': 'transparent', 'borderBottomColor': borderColor,
            'borderLeftWidth': outerWidth, 'borderRightWidth': outerWidth, 'borderBottomWidth': outerWidth,
            'borderTopColor': borderColor,
        });
        innerWidth = (pointerSize - borderWidth) + 'px';
        setStyleAttribute(args.element.querySelector('.e-arrow-tip-inner'), {
            'borderRightColor': 'transparent', 'borderLeftColor': 'transparent', 'borderBottomColor': borderColor,
            'borderLeftWidth': innerWidth, 'borderRightWidth': innerWidth, 'borderBottomWidth': innerWidth,
            'left': borderWidth, 'top': 0, 'borderTopColor': this.tooltipOption.fill
        });
        setStyleAttribute(args.element, {
            'display': 'block', 'transitionProperty': 'left,top',
            'transitionDuration': this.tooltipOption.enableAnimation ? '500ms' : '0ms'
        });
        this.tooltip.dataBind();
    };
    AccumulationTooltip.prototype.updatePosition = function (id, x, y, pointId) {
        var pointElement = getElement(pointId);
        var translate = pointElement.getAttribute('transform');
        if (!isNullOrUndefined(translate) && translate !== '') {
            translate = translate.replace('translate(', '');
            translate = translate.replace(')', '');
            var tx = parseInt(translate.split(',')[0], 10);
            var ty = parseInt(translate.split(',')[1], 10);
            x = !isNaN(tx) ? tx + x : x;
            y = !isNaN(ty) ? ty + y : y;
        }
        var tooltip = getElement(id);
        if (tooltip) {
            tooltip.style.top = y + 'px';
            tooltip.style.left = x + 'px';
        }
        else {
            tooltip = createElement('div', {
                id: id,
                styles: 'position:absolute;left:' + x + 'px;top:' + y +
                    'px;width:2px;height:2px;background:transparent'
            });
            getElement(this.accumulation.element.id + '_Secondary_Element').appendChild(tooltip);
        }
    };
    AccumulationTooltip.prototype.getTooltipText = function (point, tooltip, seriesIndex) {
        var format = tooltip.format ? tooltip.format : '${point.x} : ${point.y}';
        var series = getSeriesFromIndex(seriesIndex, this.accumulation.visibleSeries);
        return this.parseTemplate(point, format, series);
    };
    AccumulationTooltip.prototype.parseTemplate = function (point, format, series) {
        var value;
        var textValue;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            value = new RegExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(value.source, point[dataValue]);
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            value = new RegExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(value.source, textValue);
        }
        return format;
    };
    AccumulationTooltip.prototype.getModuleName = function () {
        return 'AccumulationTooltip';
    };
    AccumulationTooltip.prototype.destroy = function (chart) {
    };
    return AccumulationTooltip;
}());
export { AccumulationTooltip };
