import Reflux from 'reflux';
import Config from 'config';
import propx from '../../http/proxy';

const VehicleActions = Reflux.createActions([
        'list'
    ]
);

const VehicleStore = Reflux.createStore({
    listenables: [VehicleActions],

});

exports.VehicleActions = VehicleActions;
exports.VehicleStore = VehicleStore;