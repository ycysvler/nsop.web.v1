import React from 'react';
import {Layout, Menu, Button} from 'antd';
import {HashRouter as Router,Link, Switch, Route} from 'react-router-dom';
import NotFound from '../../notfound';
import NodeRegister from '../register';
import './main.less';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

export default class NodeSystem extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {

    }

    render=()=> {
        return (
            <Layout className="main-root">
                <Header style={{height:65}} className="header">
                    <div className="logo" >节点</div>
                    <div style={{float: 'right'}}>
                        <Layout style={{"background": "white"}}>
                            <Content>

                            </Content>

                            <Sider width={160} className="box"
                                   style={{background: '#fff', height: '64px', justifyContent: 'flex-end'}}>
                                <Button style={{"background": "#fff", "border": "none"}} icon="question-circle-o"
                                        size="small" className="header-help">帮助</Button>

                            </Sider>

                        </Layout>
                    </div>
                </Header>
                <Layout>
                    <Router>
                        <Switch>
                            {/*外观.快速检索.历史查询*/}
                            <Route path="/node/register" component={NodeRegister}/>

                            <Route component={NotFound}/>
                        </Switch>
                    </Router>

                </Layout>


            </Layout>
        );
    }
}

