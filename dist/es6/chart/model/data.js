import { Query, DataManager } from '@syncfusion/ej2-data';
var Data = (function () {
    function Data(chartModule, series) {
        this.chartModule = chartModule;
        this.initDataManager(series.dataSource, series.query);
    }
    Data.prototype.initDataManager = function (dataSource, query) {
        this.dataManager = dataSource instanceof DataManager ? dataSource : new DataManager(dataSource);
        this.query = query instanceof Query ? query : new Query();
    };
    Data.prototype.generateQuery = function () {
        var chartObj = this.chartModule;
        var query = this.query.clone();
        return query;
    };
    Data.prototype.getData = function (query) {
        return this.dataManager.executeQuery(query);
    };
    return Data;
}());
export { Data };
