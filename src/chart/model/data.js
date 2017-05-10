define(["require", "exports", "@syncfusion/ej2-data"], function (require, exports, ej2_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Data = (function () {
        function Data(chartModule, series) {
            this.chartModule = chartModule;
            this.initDataManager(series.dataSource, series.query);
        }
        Data.prototype.initDataManager = function (dataSource, query) {
            this.dataManager = dataSource instanceof ej2_data_1.DataManager ? dataSource : new ej2_data_1.DataManager(dataSource);
            this.query = query instanceof ej2_data_1.Query ? query : new ej2_data_1.Query();
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
    exports.Data = Data;
});
