import React from 'react';
import {Layout, Menu, Button, Row, Icon, Col, Input, Breadcrumb, Card} from 'antd';
import {HashRouter as Router, Link, Switch, Route} from 'react-router-dom';
import './index.less';
import {RegisterActions, RegisterStore} from "./reflux";
import {AppActions, AppStore} from '../../appflux';

const {Header, Content, Sider} = Layout;

export default class NodeRegister extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = RegisterStore.listen(this.onStatusChange.bind(this));
        this.state = {
            localhost: this.getLocalHost()
        };
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getLocalHost() {
        let i = window.location.host.split(':');
        return i[0];
    }

    onStatusChange = (type, data) => {
        if (type === 'checkCenterHost') {
            if (data.code === 200) {
                this.setState({checkCenterHost: true});
            }
        }

        if (type === 'report') {
            AppActions.message('success', '注册成功！');
        }
    }


    onCenterHostChange = (e) => {
        let centerhost = e.target.value;
        this.setState({centerhost: centerhost});
        if (centerhost.split('.').length > 3) {
            RegisterActions.checkCenterHost(centerhost);
        }
    }

    onSubmit = () => {
        RegisterActions.report(
            this.state.centerhost,
            this.state.localhost,
            this.state.code,
            this.state.name
        );

    }

    onChange = (e) => {
        console.log(e.target.value);
    }

    render = () => {
        const yes = <Icon type="check-circle" style={{color: 'green'}}/>;
        const no = <Icon type="close-circle" style={{color: 'red'}}/>;

        let suffix_centerhost = this.state.checkCenterHost ? yes : no;
        return (
            <Layout className="node-register bg-white">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>节点注册</Breadcrumb.Item>
                </Breadcrumb>
                <Content className='content'>
                    <br/>

                    <Row className="row-margin-bottom">
                        <Col span={4} className='label'><span>中心地址</span></Col>
                        <Col span={8}>
                            <Input suffix={suffix_centerhost}
                                   value={this.state.centerhost}
                                   onChange={this.onCenterHostChange} placeholder=""/>
                        </Col>
                    </Row>
                    <Row className="row-margin-bottom">
                        <Col span={4}  className='label'><span>本机地址</span></Col>
                        <Col span={8}>
                            <Input value={this.state.localhost}
                                   onChange={(e) => {
                                       this.setState({localhost: e.target.value})
                                   }}
                                   placeholder=""/></Col>
                    </Row>
                    <Row className="row-margin-bottom">
                        <Col span={4}  className='label'><span>本机编号</span></Col>
                        <Col span={8}>
                            <Input value={this.state.code}
                                   onChange={(e) => {
                                       this.setState({code: e.target.value})
                                   }}
                                   placeholder=""/>
                        </Col>
                    </Row>
                    <Row className="row-margin-bottom">
                        <Col span={4}  className='label'><span>本机名称</span></Col>
                        <Col span={8}>
                            <Input
                                value={this.state.name}
                                onChange={(e) => {
                                    this.setState({name: e.target.value})
                                }}
                                placeholder=""/></Col>
                    </Row>
                    <Row className="row-margin-bottom">
                        <Col span={4}><span></span></Col>
                        <Col span={16}>
                            <Button type="primary"
                                    onClick={this.onSubmit}
                            >提交</Button></Col>
                    </Row>

                </Content>
            </Layout>
        );
    }
}

