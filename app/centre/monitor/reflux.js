import Reflux from 'reflux';
import Config from 'config';
import moment from 'moment';
import propx from '../../http/proxy';

const MonitorActions = Reflux.createActions([
        'list',
        'create'
    ]
);

const MonitorStore = Reflux.createStore({
    listenables: [MonitorActions],

    onList: function () {
        let self = this;
        let url = Config.hamaster + "/nsop/hamaster/api/monitor";

        let param = {};

        propx.get(url, param, (code, data) => {
            // 没有数据
            if (data.statusCode === 404) {
                self.items = [];
            }
            else {
                self.items = data.data;

                for(let item of self.items){
                    let diff = moment().diff(moment(item.updatetime));
                    if(diff/1000 > 5 * 60){
                        item.state = false;
                    }else{
                        item.state = true;
                    }
                }
            }

            self.trigger('list', data.data);
        });
    }
});


exports.MonitorActions = MonitorActions;
exports.MonitorStore = MonitorStore;