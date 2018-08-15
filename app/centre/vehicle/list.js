/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Icon,Input, Table, Breadcrumb, Button} from 'antd';
import {NotFound} from '../../notfound';
import {VehicleStore, VehicleActions} from './reflux.js';
const Search = Input.Search;
const {Header, Footer, Sider, Content} = Layout;

export default class VehicleList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = VehicleStore.listen(this.onStatusChange.bind(this));
        this.state = {items: [], total:0, platenumber:''};
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange = (type, data) => {
        if (type === 'list') {
            this.setState({items: data.items, total: data.pagination.total});
        }
    }

    componentDidMount() {
        VehicleActions.list(this.state.platenumber, 10 , 1);
    }

    columns = [
        {
            title: '牌照',
            dataIndex: 'platenumber',
        },
        {
            title: '颜色',
            dataIndex: 'vehiclecolor',
        },
        {
            title: '品牌',
            dataIndex: 'vehiclebrand'
        },
        {
            title: '型号',
            dataIndex: 'vehiclemodel',
        },
        {
            title: '年款',
            dataIndex: 'vehicleyear',
        },
        {
            title: '厂家',
            dataIndex: 'vehiclemaker',
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

    onPageChange = (pageNumber) => {
        VehicleActions.list(this.state.platenumber, 10 , pageNumber);
    };

    render() {
        return (<Layout className="bg-white">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>基础数据</Breadcrumb.Item>
                    <Breadcrumb.Item>车型管理</Breadcrumb.Item>
                </Breadcrumb>

                <Content className='content'>
                    <div className="list-toolbar row-reverse">
                        <Search
                            placeholder="请输入牌照"
                            enterButton="搜索"
                            onSearch={value => {this.state.platenumber = value;VehicleActions.list(value, 10 , 1);} }
                            style={{ width: 300 }}  />
                    </div>

                    <Table
                        bordered={true}
                        rowKey="_id"
                        columns={this.columns} dataSource={this.state.items}
                        pagination={{
                            onChange: this.onPageChange,
                            defaultPageSize: 10, total: this.state.total,
                            hideOnSinglePage: true
                        }} size="middle"/>
                </Content>

            </Layout>
        );
    }
}
