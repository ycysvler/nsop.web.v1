import Reflux from 'reflux';
import Config from 'config';
import propx from '../../http/proxy';
import ApiPath from '../../config/apipath';

const OrganizationActions = Reflux.createActions([
        'getList'
    ]
);

const OrganizationStore = Reflux.createStore({
    listenables: [OrganizationActions],

    //获取列表
    onGetList: function (pageIndex, pageSize) {
        let self = this;
        let url = ApiPath.getHaMasterBasePath() + "/nsop/hamaster/api/organizations";

        let param = {};

        propx.get(url, param, (code, data) => {
            console.log(url, JSON.stringify(param));

            let total = 0;
            // 没有数据
            if (data.statusCode === 404) {
                self.items = [];
            }
            else {
                self.items = data.data;
            }

            self.trigger('getList', {total: self.items.length, list: self.items, param: param});
        });
    }

});


exports.OrganizationActions = OrganizationActions;
exports.OrganizationStore = OrganizationStore;