import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Steps, Upload, Icon, message, Row, Col, Table, Input, Breadcrumb, Button} from 'antd';
import Config from 'config';
import {SourceStore, SourceActions} from './reflux.js';
import {OrganizationStore, OrganizationActions} from '../org/reflux.js';

import './index.less';

const {Header, Footer, Sider, Content} = Layout;

export default class Distribute extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe_source = SourceStore.listen(this.onStatusChange.bind(this));
        this.unsubscribe_org = OrganizationStore.listen(this.onOrgStatusChange.bind(this));

        this.state = {info: {}, page: 0};
    }

    componentWillUnmount() {
        this.unsubscribe_source();
        this.unsubscribe_org();
    }

    componentDidMount() {
        if (this.props.match.params.id != 'create') {
            SourceActions.single(this.props.match.params.id);
            OrganizationActions.getList();
        }
    }

    onStatusChange = (type, data) => {
        if (type === 'single') {
            this.setState({info: data.data, new_start: "", new_stop: ""});
        }
    };
    onOrgStatusChange = (type, data) => {
        if (type === 'getList') {
            this.setState({items: data.list, total: data.total});
        }
    };

    columns = [
        {
            title: '编号',
            dataIndex: 'code',
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            key: 'orgid',
            title: '检查站ID',
            dataIndex: 'orgid'
        },

        {
            title: '上级ID',
            dataIndex: 'parentid',
        },
        {
            title: '地址',
            dataIndex: 'host',
        },
        {
            title: '类型',
            dataIndex: 'type',
        }];

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectedRowKeys:selectedRowKeys});
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({
            disabled: record.key === '3',
        }),
    };

    render() {
        return (<Layout className="bg-white centre-source">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item><Link to='/centre/source'>版本列表</Link></Breadcrumb.Item>
                <Breadcrumb.Item>服务分发</Breadcrumb.Item>
            </Breadcrumb>
            <Row style={{margin:'12px 24px'}}>
                <Col span={2}><b>类型：</b></Col>
                <Col span={2} style={{textAlign:'left'}}>{this.state.info.type}</Col>
                <Col span={2}><b>版本：</b></Col>
                <Col span={2}  style={{textAlign:'left'}}>{this.state.info.version}</Col>
                <Col span={2}><b>源位置：</b></Col>
                <Col span={6}  style={{textAlign:'left'}}>{this.state.info.sourcepath}</Col>
                <Col span={2}><b>目标位置：</b></Col>
                <Col span={6}  style={{textAlign:'left'}}>{this.state.info.targetpath}</Col>
            </Row>

            <Table
                rowKey="_id"
                rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.items}
                pagination={{
                    showSizeChanger: true,
                    onChange: this.onPageChange,
                    pageSizeOptions: ["2", "3", "4", "5"],
                    defaultPageSize: 10, total: this.state.total,
                    hideOnSinglePage: true
                }} size="middle"/>
        </Layout>);
    }
}