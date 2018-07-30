import React, { PureComponent } from 'react';
import { Card, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../style.less';

@connect(state => ({
    client: state.client,
}))
@Form.create()
export default class ClientEditor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
        };
    }
    componentDidMount() {
        const { dispatch, match: { params: { _id } } } = this.props;
        if (/\w{24}/.test(_id)) {
            dispatch({
                type: 'client/detail',
                payload: _id,
                callback: () => {
                    const { form: { setFieldsValue }, client: { detail } } = this.props;
                    setFieldsValue({
                        name: detail.name,
                        clientSecret: detail.clientSecret,
                        clientId: detail.clientId,
                    });
                },
            });
        }
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'client/clearDetail',
        });
    }
    render() {
        const { submitting } = this.state;
        const { form, dispatch, client: { detail } } = this.props;
        const { getFieldDecorator, validateFieldsAndScroll } = form;
        const validate = () => {
            validateFieldsAndScroll((error, values) => {
                if (!error) {
                    // submit the values
                    if (detail._id) {
                        this.setState({
                            submitting: true,
                        }, () => {
                            dispatch({
                                type: 'client/update',
                                payload: {
                                    data: values,
                                    _id: detail._id,
                                },
                                callback: () => {
                                    this.setState({ submitting: false });
                                },
                            });
                        });
                    }
                }
            });
        };
        return (
            <PageHeaderLayout
                title="编辑客户端"
                wrapperClassName={styles.advancedForm}
            >
                <Card title="基本信息" bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item label="客户端名称">
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: '请输入客户端名称' },
                                ],
                            })(<Input placeholder="请输入客户端名称" />)}
                        </Form.Item>
                        <Form.Item label="clientId">
                            {getFieldDecorator('clientId', {
                                rules: [
                                    { required: true, message: '请输入clientId' },
                                ],
                            })(<Input placeholder="请输入clientId" />)}
                        </Form.Item>
                        <Form.Item label="clientSecret">
                            {getFieldDecorator('clientSecret', {
                                rules: [
                                    { required: true, message: '请输入clientSecret' },
                                ],
                            })(<Input placeholder="请输入clientSecret" />)}
                        </Form.Item>
                    </Form>
                </Card>
                <FooterToolbar>
                    <Button type="primary" onClick={validate} loading={submitting}>
                        提交
                    </Button>
                </FooterToolbar>
            </PageHeaderLayout>
        );
    }
}
