import Reflux from 'reflux';
import Config from 'config';
import propx from '../../http/proxy';

const RegisterActions = Reflux.createActions([
        'checkCenterHost',
        'report'
    ]
);

const RegisterStore = Reflux.createStore({
    listenables: [RegisterActions],


    // 检查中心地址
    onCheckCenterHost: function (host) {
        let self = this;
        let url = 'http://' + host + ':4999/nsop/hamaster/api/heartbeat';

        let param = {};

        propx.get(url, param, (code, data) => {
            self.trigger('checkCenterHost', data);
        });
    },

    onReport:function(centerhost, localhost, code, name){
        let self = this;

        let url = 'http://' + centerhost + ':4999/nsop/hamaster/api/org/report';
        var param = {
            centerip:centerhost,
            host:localhost,
            code:code,
            name:name
        };
        propx.post(url, param, (code, data) => {
            let node_url = 'http://' + localhost + ':4999/nsop/hamaster/api/regist';
            console.log('node_url',node_url);
            console.log('data',data.data);
            data.data.parentip = centerhost;
            propx.post(node_url, data.data, (code, data)=>{
                self.trigger('report', data);
            });
        });
    }

});


exports.RegisterActions = RegisterActions;
exports.RegisterStore = RegisterStore;