import Reflux from 'reflux';
import Config from 'config';
import propx from '../../http/proxy';

const DialingActions = Reflux.createActions([
        'list',
        'remove'
    ]
);

const DialingStore = Reflux.createStore({
    listenables: [DialingActions],

    //获取列表
    onList: function (pageIndex, pageSize) {
        let self = this;
        let url = Config.hamaster + "/nsop/hamaster/api/dialing";

        let param = {};

        propx.get(url, param, (code, data) => {
            // 没有数据
            if (data.statusCode === 404) {
                self.items = [];
            }
            else {
                self.items = data.data;
            }

            self.trigger('list', data.data);
        });
    },

    //获取列表
    onRemove: function (ids) {
        let self = this;
        let url = Config.hamaster + "/nsop/hamaster/api/dialing";

        let param = ids;

        propx.delete(url, param, (code, data) => {
            self.trigger('remove', data);
        });
    }


});


exports.DialingActions = DialingActions;
exports.DialingStore = DialingStore;