import Reflux from 'reflux';
import Config from 'config';
import propx from '../../http/proxy';

const SourceActions = Reflux.createActions([
        'getList',
        'single',
        'services',
        'remove'
    ]
);

const SourceStore = Reflux.createStore({
    listenables: [SourceActions],

    onServices:function(id, items){
        let self = this;
        let url = `${Config.hamaster}/nsop/hamaster/api/source/${id}/services`;

        let param = items;

        propx.post(url, param, (code, data) => {
            self.trigger('services', data);
        });
    },
    //获取列表
    onGetList: function () {
        let self = this;
        let url = Config.hamaster + "/nsop/hamaster/api/source";

        let param = {};

        propx.get(url, param, (code, data) => {
            // 没有数据
            if (data.statusCode === 404) {
                self.items = [];
            }
            else {
                self.items = data.data;
            }

            self.trigger('getList', data.data);
        });
    },
    //获取列表
    onSingle: function (id) {
        let self = this;
        let url = Config.hamaster + "/nsop/hamaster/api/source/" + id;

        let param = {};

        propx.get(url, param, (code, data) => {
            self.trigger('single', data);
        });
    },

    //获取列表
    onRemove: function (ids) {
        let self = this;
        let url = Config.hamaster + "/nsop/hamaster/api/organizations";

        let param = ids;

        propx.delete(url, param, (code, data) => {
            self.trigger('remove', data);
        });
    }


});


exports.SourceActions = SourceActions;
exports.SourceStore = SourceStore;