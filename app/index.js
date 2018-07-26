import React from 'react';
import ReactDOM from "react-dom";
import {HashRouter as Router,Redirect, Switch, Route} from 'react-router-dom';

// import {IndexStore} from './api.js';
import NotFound from './notfound';

import Centre from './centre/main/index';
import Node from './node/main/index';

// import Login from './login.js';
// import App from './App.js';
// import Main from './main';

//import "./styles/index.less";

ReactDOM.render((
    <Router>
        <Switch>
            <Redirect exact from='/' to='/centre'/>
            {/*<Route path="/signin" component={Login}/>*/}
            <Route path="/centre" component={Centre}/>
            <Route path="/node" component={Node}/>

            <Route component={NotFound}/>
        </Switch>
    </Router>
), document.getElementById('root'));


