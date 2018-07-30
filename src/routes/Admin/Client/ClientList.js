import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Button, Modal, Input, message } from 'antd';
import ClientListTable from './ClientListTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../style.less';

const FormItem = Form.Item;

@connect(state => ({
    client: state.client,
}))
@Form.create()
export default class ClientList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            createClientModalVisible: false,
            newClientName: '',
        };
    }

    componentDidMount() {
        this.handleSearch();
    }

    handleStandardTableChange = (pagination) => {
        const { dispatch } = this.props;
        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
        };
        dispatch({
            type: 'client/find',
            payload: params,
        });
    };

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'client/find',
            payload: {},
        });
    };

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            dispatch({
                type: 'client/find',
                payload: values,
            });
        });
    };

    handleCreate = () => {
        this.setState({ createClientModalVisible: true });
    };

    handleCreateClientModalOk = () => {
        const newName = this.state.newClientName;
        if (newName) {
            this.props.dispatch({
                type: 'client/create',
                payload: { name: newName },
                callback: () => {
                    this.setState({ createClientModalVisible: false, newClientName: '' });
                },
            });
        } else {
            message.error('请输入新客户端的名称');
        }
    };

    handleCreateClientModalCancel = () => {
        this.setState({ createClientModalVisible: false, newClientName: '' });
    };

    handleNewClientName = ({ target: { value } }) => {
        this.setState({ newClientName: value });
    }

    renderForm() {
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row type="flex" justify="end">
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        const { createClientModalVisible, newClientName } = this.state;
        const { client: { isLoading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={this.handleCreate}>
                                新建
                            </Button>
                        </div>
                        <ClientListTable
                            loading={isLoading}
                            data={listData}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <Modal
                    title="新建客户端"
                    visible={createClientModalVisible}
                    onOk={this.handleCreateClientModalOk}
                    onCancel={this.handleCreateClientModalCancel}
                >
                    <FormItem label="客户端名称" layout={{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}>
                        <Input onChange={this.handleNewClientName} value={newClientName} />
                    </FormItem>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
