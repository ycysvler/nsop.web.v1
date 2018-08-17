/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Icon, Table, Breadcrumb, Button} from 'antd';
import {NotFound} from '../../notfound';
import {DialingStore, DialingActions} from './reflux.js';

const {Header, Footer, Sider, Content} = Layout;

export default class DialingList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = DialingStore.listen(this.onStatusChange.bind(this));
        this.state = {items: []};
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange = (type, data) => {
        if (type === 'list') {
            this.setState({items: data});
        }
        if (type === 'remove') {
            DialingActions.list();
        }
    }

    componentDidMount() {
        DialingActions.list();
    }


    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    columns = [
        {
            title: '检查站',
            dataIndex: 'orgid',
        },
        {
            title: '服务',
            dataIndex: 'type',
        },
        {
            title: '端口号',
            dataIndex: 'port',
        },
        {
            title: '地址',
            dataIndex: 'path',
        } ];


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

    onDelete=()=>{
        DialingActions.remove(this.state.selectedRowKeys);
    };

    render() {
        return (<Layout className="bg-white">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>服务监控</Breadcrumb.Item>
                    <Breadcrumb.Item>监控配置</Breadcrumb.Item>
                </Breadcrumb>

                <Content className='content'>
                    <div className="list-toolbar">
                        <Button type="danger"  className="margin-right-8" onClick={this.onDelete}>删除节点</Button>

                    </div>

                    <Table
                        rowKey="_id" bordered={true}
                        rowSelection={this.rowSelection} columns={this.columns}
                        dataSource={this.state.items}
                        pagination={{
                            showSizeChanger: true,
                            onChange: this.onPageChange,
                            pageSizeOptions: ["2", "3", "4", "5"],
                            defaultPageSize: 10, total: this.state.total,
                            hideOnSinglePage: true
                        }} size="middle"/>

                </Content>


            </Layout>
        );
    }
}