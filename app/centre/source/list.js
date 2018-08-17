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
        if (type === 'sources') {
            this.setState({items: data, total: data.length});
        }
        if (type === 'remove') {
            SourceActions.sources();
        }
    }

    componentDidMount() {
        SourceActions.sources();
    }

    columns = [
        {
            title: '类型',
            dataIndex: 'type',
        },
        {
            title: '版本',
            dataIndex:'version',
            render: (text,record) =>{ return <Link to={`/centre/source/${record._id}`}>{text}</Link>},
        },
        {
            title: '源位置',
            dataIndex: 'sourcepath'
        },
        {
            title: '目标位置',
            dataIndex: 'targetpath',
        },
        {
            title: '描述信息',
            dataIndex: 'describe',
        },
        {
            title: '分发',
            dataIndex:'_id',
            render: (text,record) =>{ return <Link to={`/centre/distribute/${record._id}`}>分发</Link>},
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
        SourceActions.remove(this.state.selectedRowKeys);
    };

    render() {
        return (<Layout className="bg-white">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>版本列表</Breadcrumb.Item>
                </Breadcrumb>

                <Content className='content'>
                <div className="list-toolbar">
                    <Button type="danger" className="margin-right-8" onClick={this.onDelete}>删除服务</Button>
                    <Link to='/centre/source/create'><Button type="primary">添加服务</Button></Link>
                </div>
                <Table bordered={true} rowKey="_id"
                    rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.items}
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