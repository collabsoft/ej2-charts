import { Query, DataManager } from '@syncfusion/ej2-data';
var Data = (function () {
    function Data(dataSource, query) {
        this.initDataManager(dataSource, query);
    }
    Data.prototype.initDataManager = function (dataSource, query) {
        this.dataManager = dataSource instanceof DataManager ? dataSource : new DataManager(dataSource);
        this.query = query instanceof Query ? query : new Query();
    };
    Data.prototype.generateQuery = function () {
        var query = this.query.clone();
        return query;
    };
    Data.prototype.getData = function (query) {
        return this.dataManager.executeQuery(query);
    };
    return Data;
}());
export { Data };
