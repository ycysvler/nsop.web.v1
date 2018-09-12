import Reflux from 'reflux';
import Config from 'config';
import ApiPath from '../../config/apipath';
import propx from '../../http/proxy';

const OrganizationActions = Reflux.createActions([
        'getList',
        'remove'
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
            // 没有数据
            if (data.statusCode === 404) {
                self.items = [];
            }
            else {
                self.items = data.data;
            }

            self.trigger('getList', {total: self.items.length, list: self.items, param: param});
        });
    },

    //获取列表
    onRemove: function (ids) {
        let self = this;
        let url = ApiPath.getHaMasterBasePath() + "/nsop/hamaster/api/organizations";

        let param = ids;

        propx.delete(url, param, (code, data) => {
            self.trigger('remove', data);
        });
    }


});


exports.OrganizationActions = OrganizationActions;
exports.OrganizationStore = OrganizationStore;