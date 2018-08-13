/**
 * Created by yanggang on 2017/3/6.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Upload, Icon, message, Row, Col, Card, Input, Breadcrumb, Button} from 'antd';
import {NotFound} from '../../notfound';
import {SourceStore, SourceActions} from './reflux.js';
import './index.less';

const {Header, Footer, Sider, Content} = Layout;

export default class SourceInfo extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SourceStore.listen(this.onStatusChange.bind(this));

        this.state = {info: {}};
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange = (type, data) => {
        if (type === 'single') {
            this.setState({info: data.data, new_start:"", new_stop:""});
        }
        if(type === 'services'){
            SourceActions.single(this.props.match.params.id);
        }
    }

    componentDidMount() {
        SourceActions.single(this.props.match.params.id);
    }

    onNewServices=()=>{
        let start = this.state.new_start;
        let stop = this.state.new_stop;

        let services = this.state.info.services;
        let date = new Date();
        services.push({id:date.getTime().toString(),start:start, stop:stop});

        SourceActions.services(this.props.match.params.id,services);
    }

    onRemoveServices=(index)=>{
        let services = this.state.info.services;
        services.splice(index, 1);
        SourceActions.services(this.props.match.params.id,services);
    }

    render() {
        let self = this;
        const yes = <Icon type="check-circle" style={{color: 'green'}}/>;
        const no = <Icon type="close-circle" style={{color: 'red'}}/>;

        let suffix_centerhost = this.state.checkCenterHost ? yes : no;

        const props = {
            showUploadList: false,
            name: 'file',
            action: 'http://10.211.55.7:4999/nsop/hamaster/api/source/file?id=' + this.state.info._id,

            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    SourceActions.single(self.props.match.params.id);
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (<Layout className="bg-white centre-source">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item><Link to='/centre/source'>版本列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>版本详情</Breadcrumb.Item>
                </Breadcrumb>

                <Content>
                    <br/>
                    <Row>
                        <Col offset={2} span={20}>
                            <Card>
                                <Row className="row-margin-bottom">
                                    <Col span={3} className='label'><span>type</span></Col>
                                    <Col span={9}>
                                        <Input suffix={suffix_centerhost}
                                               value={this.state.info.type}
                                               onChange={this.onCenterHostChange} placeholder=""/>
                                    </Col>
                                    <Col span={3} className='label'><span>version</span></Col>
                                    <Col span={9}>
                                        <Input value={this.state.info.version}
                                               onChange={(e) => {
                                                   this.setState({localhost: e.target.value})
                                               }}
                                               placeholder=""/></Col>
                                </Row>

                                <Row className="row-margin-bottom" type="flex" justify="space-around">
                                    <Col span={3} className='label'><span>targetpath</span></Col>
                                    <Col span={9}>
                                        <Input value={this.state.info.targetpath}
                                               onChange={(e) => {
                                                   this.setState({code: e.target.value})
                                               }}
                                               placeholder=""/>
                                    </Col>
                                    <Col span={3} className='label'><span>sourcepath</span></Col>
                                    <Col span={9}>
                                        <Input style={{marginBottom: 8}}
                                               value={this.state.info.sourcepath}
                                               onChange={(e) => {
                                                   this.setState({code: e.target.value})
                                               }}
                                               placeholder=""
                                               addonAfter={
                                                   <Upload {...props}>

                                                       <Icon type="upload"/>

                                                   </Upload>
                                               }
                                        />
                                    </Col>

                                </Row>

                                <Row className="row-margin-bottom">
                                    <Col span={3} className='label'><span>describe</span></Col>
                                    <Col span={21}>
                                        <Input.TextArea rows={3} style={{marginBottom: 8}}
                                                        value={this.state.info.describe}
                                                        onChange={(e) => {
                                                            this.setState({code: e.target.value})
                                                        }}
                                                        placeholder=""/>
                                    </Col>
                                </Row>

                                {
                                    this.state.info.services ? this.state.info.services.map(function (item, index) {
                                        return <Row className="row-margin-bottom" key={index}>
                                            <Col span={3} className='label'><span>start</span></Col>
                                            <Col span={12} style={{marginBottom: 8}}>
                                                <Input onChange={() => {
                                                }} value={item.start}/></Col>
                                            <Col span={2} className='label'><span>stop</span></Col>
                                            <Col span={5}><Input onChange={() => {
                                            }} value={item.stop}/></Col>
                                            <Col offset={1} span={1}>
                                                <Button type="danger"
                                                onClick={self.onRemoveServices.bind(self,index)}
                                                ><Icon type="close-circle"/></Button>
                                            </Col>
                                        </Row>
                                    }) : null
                                }

                                <Row className="row-margin-bottom">
                                    <Col span={3} className='label'><span>start</span></Col>
                                    <Col span={12} style={{marginBottom: 8}}>
                                        <Input onChange={(e) => {
                                            this.setState({new_start: e.target.value})
                                        }} value={this.state.new_start}
                                        /></Col>
                                    <Col span={2} className='label'><span>stop</span></Col>
                                    <Col span={5}><Input onChange={(e) => {
                                        this.setState({new_stop: e.target.value})
                                    }} value={this.state.new_stop}
                                    /></Col>
                                    <Col offset={1} span={1}>
                                        <Button
                                            onClick={this.onNewServices}
                                            type="primary"><Icon type="plus-circle"/></Button></Col>
                                </Row>

                                <Row className="row-margin-bottom">
                                    <Col span={8}><span></span></Col>
                                    <Col span={16}>
                                        <Button type="primary"
                                                onClick={this.onSubmit}
                                        >提交</Button></Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={2}></Col>
                    </Row>

                </Content>

            </Layout>
        );
    }
}