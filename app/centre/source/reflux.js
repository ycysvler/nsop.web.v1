import Reflux from 'reflux';
import Config from 'config';
import propx from '../../http/proxy';
import ApiPath from '../../config/apipath';
const SourceActions = Reflux.createActions([
        'sources',
        'orgsources',
        'single',
        'services',
        'remove',
        'publish',
        'create',
        'update'
    ]
);

const SourceStore = Reflux.createStore({
    listenables: [SourceActions],

    onCreate: function (info) {
        let self = this;
        let url = ApiPath.getHaMasterBasePath() + "/nsop/hamaster/api/source";
        let param = info;
        propx.post(url, param, (code, data) => {
            self.trigger('create', data);
        });
    },

    onUpdate: function (info) {
        let self = this;
        let url = ApiPath.getHaMasterBasePath() + "/nsop/hamaster/api/source/" + info._id;
        let param = info;
        propx.put(url, param, (code, data) => {
            self.trigger('update', data);
        });
    },

    onServices: function (id, items) {
        let self = this;
        let url = `${ApiPath.getHaMasterBasePath()}/nsop/hamaster/api/source/${id}/services`;
        let param = items;
        propx.post(url, param, (code, data) => {
            self.trigger('services', data);
        });
    },

    onPublish(ip, id) {
        let self = this;
        let url = `http://${ip}:4999/nsop/hamaster/api/update/${id}`;
        let param = {};
        propx.get(url, param, (code, data) => {
            // 没有数据
            if (data.statusCode === 404) {
                self.items = [];
            }
            else {
                self.items = data.data;
            }

            self.trigger('publish', data.data);
        });
    },

    onSources: function () {
        let self = this;
        let url = ApiPath.getHaMasterBasePath() + "/nsop/hamaster/api/source";
        let param = {};
        propx.get(url, param, (code, data) => {
            // 没有数据
            if (data.statusCode === 404) {
                self.items = [];
            }
            else {
                self.items = data.data;
            }

            self.trigger('sources', data.data);
        });
    },

    onOrgsources: function () {
        let self = this;
        let url = ApiPath.getHaMasterBasePath() + "/nsop/hamaster/api/orgsource";
        let param = {};
        propx.get(url, param, (code, data) => {
            // 没有数据
            if (data.statusCode === 404) {
                self.items = [];
            }
            else {
                self.items = data.data;
            }

            self.trigger('orgsources', data.data);
        });
    },
    //获取列表
    onSingle: function (id) {
        let self = this;
        let url = ApiPath.getHaMasterBasePath() + "/nsop/hamaster/api/source/" + id;
        let param = {};
        propx.get(url, param, (code, data) => {
            self.trigger('single', data);
        });
    },

    //获取列表
    onRemove: function (ids) {
        let self = this;
        let url = ApiPath.getHaMasterBasePath() + "/nsop/hamaster/api/source";
        let param = ids;
        propx.delete(url, param, (code, data) => {
            self.trigger('remove', data);
        });
    }
});


exports.SourceActions = SourceActions;
exports.SourceStore = SourceStore;