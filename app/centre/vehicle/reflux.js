import Reflux from 'reflux';
import Config from 'config';
import moment from 'moment';
import propx from '../../http/proxy';
import ApiPath from '../../config/apipath';
const VehicleActions = Reflux.createActions([
        'list'
    ]
);

const VehicleStore = Reflux.createStore({
    listenables: [VehicleActions],

    onList(platenumber, pageSize, pageIndex){
        let self = this;

        let url = `${ApiPath.getDataManagerBasePath()}/nsop/basedata/api/vehicle?platenumber=${platenumber}&pagesize=${pageSize}&pageindex=${pageIndex}`;
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
});

exports.VehicleActions = VehicleActions;
exports.VehicleStore = VehicleStore;
