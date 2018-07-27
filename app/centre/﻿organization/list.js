/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Icon, Table, Breadcrumb, Button} from 'antd';
import {NotFound} from '../../notfound';
import {OrganizationStore, OrganizationActions} from './reflux.js';

const {Header, Footer, Sider, Content} = Layout;

export default class OrganizationList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = OrganizationStore.listen(this.onStatusChange.bind(this));
        this.state = {items: []};
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange = (type, data) => {
        if (type === 'getList') {
            console.log('items', data);
            this.setState({items: data.list, total: data.total});
        }
    }

    componentDidMount() {
        OrganizationActions.getList();
    }


    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

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

    onPageChange = (pageNumber) => {
        UserActions.getList(pageNumber, 10);
    }

    render() {
        return (<Layout>
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>

                {/*<div className="list-toolbar">*/}

                {/*<Link to='/main/system/user/info'><Button type="primary">新建用户</Button></Link>*/}
                {/*</div>*/}

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
            </Layout>
        );
    }
}