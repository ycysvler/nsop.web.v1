import React from 'react';
import {Layout, Menu, Button,Icon} from 'antd';
import {HashRouter as Router,Link, Switch, Route} from 'react-router-dom';
import OrganizationList from '../org/list';
import SourceList from '../source/list';
import SourceInfo from '../source/info';
import Distribute from '../source/distribute';
import NotFound from '../../notfound';
import './main.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Content, Sider} = Layout;

export default class CentrePlatform extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {

    }

    render=()=> {
        return (
            <Layout className="main-root">
                <Header style={{height:65}} className="header">
                    <div className="logo" >中央平台</div>
                    <div style={{float: 'right'}}>
                        <Layout style={{"background": "white"}}>
                            <Content>
                                <Menu
                                    mode="horizontal"
                                >
                                    <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>基础数据</span></span>}>
                                        <Menu.Item key="org"><Link to='/centre/org'><span>节点管理</span></Link></Menu.Item>

                                    </SubMenu>
                                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>服务管理</span></span>}>
                                        <Menu.Item key="source"><Link to='/centre/source'><span>服务列表</span></Link></Menu.Item>
                                        <Menu.Item key="10">Option 10</Menu.Item>
                                        <Menu.Item key="11">Option 11</Menu.Item>
                                        <Menu.Item key="12">Option 12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Content>

                            <Sider width={160} className="box"
                                   style={{background: '#fff', height: '64px', justifyContent: 'flex-end'}}>
                                <Button style={{"background": "#fff", "border": "none"}} icon="question-circle-o"
                                        size="small" className="header-help">帮助</Button>

                            </Sider>

                        </Layout>
                    </div>
                </Header>
                <Layout >
                    <Router>
                        <Switch>
                            {/*外观.快速检索.历史查询*/}
                            <Route path="/centre/org" component={OrganizationList}/>
                            <Route path="/centre/source/:id" component={SourceInfo}/>
                            <Route path="/centre/source" component={SourceList}/>
                            <Route path="/centre/distribute/:id" component={Distribute} />

                            <Route component={NotFound}/>
                        </Switch>
                    </Router>

                </Layout>


            </Layout>
        );
    }
}

