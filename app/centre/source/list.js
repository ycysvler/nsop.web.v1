/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Icon, Table, Breadcrumb, Button} from 'antd';
import {NotFound} from '../../notfound';
import {SourceStore, SourceActions} from './reflux.js';

const {Header, Footer, Sider, Content} = Layout;

export default class SourceList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SourceStore.listen(this.onStatusChange.bind(this));
        this.state = {items: [], total: 0};
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange = (type, data) => {
        if (type === 'getList') {
            this.setState({items: data, total: data.length});
        }
        if (type === 'remove') {
            SourceActions.getList();
        }
    }

    componentDidMount() {
        SourceActions.getList();
    }

    columns = [
        {
            title: 'type',
            dataIndex: 'type',
        },
        {
            title: 'version',
            dataIndex:'version',
            render: (text,record) =>{ return <Link to={`/centre/source/${record._id}`}>{text}</Link>},
        },
        {
            title: 'targetpath',
            dataIndex: 'targetpath',
        },
        {
            title: 'sourcepath',
            dataIndex: 'sourcepath'
        },
        {
            title: 'describe',
            dataIndex: 'describe',
        }];


    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectedRowKeys: selectedRowKeys});
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({
            disabled: record._id === '3',
        }),
    };

    onDelete = () => {
        console.log(this.state.selectedRowKeys);
        SourceActions.remove(this.state.selectedRowKeys);
    };

    render() {
        return (<Layout className="bg-white">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                    <Breadcrumb.Item>节点管理</Breadcrumb.Item>
                </Breadcrumb>

                <div className="list-toolbar">
                    <Button type="danger" className="margin-right-8" onClick={this.onDelete}>删除节点</Button>
                    <Link to='/main/system/user/info'><Button type="primary">新建节点</Button></Link>
                </div>

                <Table
                    rowKey="_id"
                    rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.items}
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ["2", "3", "4", "5"],
                        defaultPageSize: 10, total: this.state.total,
                        hideOnSinglePage: true
                    }} size="middle"/>
            </Layout>
        );
    }
}