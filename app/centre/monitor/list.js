/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Icon, Table, Breadcrumb, Button} from 'antd';
import {NotFound} from '../../notfound';
import {MonitorStore, MonitorActions} from './reflux.js';

const {Header, Footer, Sider, Content} = Layout;

export default class MonitorList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = MonitorStore.listen(this.onStatusChange.bind(this));
        this.state = {items: [], total: 0};
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidMount() {
        MonitorActions.list();
    }

    onStatusChange = (type, data) => {
        if (type === 'list') {
            this.setState({items: data, total: data.length});
        }
    };

    columns = [
        {
            title: '状态',
            dataIndex:'state',
            render: (text,record) =>{
                return record.state?
                    <div style={{textAlign:'center'}}><Icon type="smile" style={{color:'#52c41a'}} /></div>:
                    <div style={{textAlign:'center'}}><Icon type="frown" style={{color:'#f5222d'}} /></div>;},
        },
        {
            title: '节点',
            dataIndex: 'orgid',
        },
        {
            title: '名称',
            dataIndex: 'name',
        }
        ,
        {
            title: '地址',
            dataIndex: 'host',
        },
        {
            title: '类型',
            dataIndex: 'type',
        },
        {
            title: '时间',
            dataIndex: 'updatetime',
        }];


    render() {
        return (<Layout className="bg-white">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>服务管理</Breadcrumb.Item>
                    <Breadcrumb.Item>服务监控</Breadcrumb.Item>
                </Breadcrumb>
                <Content className='content' style={{paddingTop: 24}}>

                    <Table
                        bordered={true}
                        rowKey="_id"
                        columns={this.columns} dataSource={this.state.items}
                        pagination={{
                            showSizeChanger: true,
                            pageSizeOptions: ["2", "3", "4", "5"],
                            defaultPageSize: 10, total: this.state.total,
                            hideOnSinglePage: true
                        }} size="middle"/>
                </Content>
            </Layout>
        );
    }
}