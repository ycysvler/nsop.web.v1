/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Icon, Table, Breadcrumb, Button} from 'antd';
import {NotFound} from '../../notfound';
import {SourceStore, SourceActions} from '../source/reflux';

const {Header, Footer, Sider, Content} = Layout;

export default class OrgSourceList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SourceStore.listen(this.onStatusChange.bind(this));
        this.state = {sources: [], orgsources: []};
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidMount() {
        SourceActions.orgsources();
    }

    onStatusChange = (type, data) => {
        if (type === 'orgsources') {
            this.setState({sources: data.sources, orgsources: data.orgsources});
        }
        if(type === 'publish'){
            SourceActions.orgsources();
        }
    };

    onPublish=(ip, id)=>{
        SourceActions.publish(ip, id);
    };

    render() {
        return (<Layout className="bg-white">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>服务管理</Breadcrumb.Item>
                    <Breadcrumb.Item>版本列表</Breadcrumb.Item>
                </Breadcrumb>
                <table className='ant-table-body'>
                    <thead className='ant-table-thead'>
                    <tr>
                        <th>收费站</th>
                        <th>地址</th>
                        {
                            this.state.sources.map((item, index) => {
                                return <th style={{textAlign:'center'}} key={item._id}>{item.type}_{item.version}</th>
                            })
                        }
                    </tr>
                    </thead>
                    <tbody className='ant-table-tbody'>
                    {
                        this.state.orgsources.map((item, index) => {
                            return <tr className='ant-table-row  ant-table-row-level-0' key={item.org._id}>
                                <td>{item.org.name}</td>
                                <td>{item.org.host}</td>
                                {
                                    item.sources.map((source, index) => {
                                        return <td style={{textAlign:'center'}} key={source.source._id}>
                                            {source.cversion ?
                                                <Icon style={{color:'#52c41a'}} type="check-circle" /> :
                                                <Button size="small"
                                                onClick={this.onPublish.bind(this,item.org.host, source.source._id)}>部署</Button>}</td>
                                    })
                                }
                            </tr>
                        })
                    }

                    </tbody>
                </table>


            </Layout>
        );
    }
}