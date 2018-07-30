import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, Button, Input, Select } from 'antd';
import ExpListTable from './ExpListTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(state => ({
    exp: state.exp,
}))
@Form.create()
export default class ExpList extends PureComponent {
    componentDidMount() {
        const { exp: { formValues }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: formValues.name,
            status: formValues.status,
        });
        this.handleSearch();
    }

    handleTableChange = (pagination) => {
        const { dispatch, exp: { formValues } } = this.props;
        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
        };
        dispatch({
            type: 'exp/find',
            payload: params,
        });
    };

    handleTableRemove = (expId) => {
        this.props.dispatch({
            type: 'exp/remove',
            payload: expId,
        });
    };

    handleSetExcellent = (_id, val) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'exp/update',
            payload: {
                _id,
                data: {
                    is_excellent: !!val,
                },
            },
        });
    }

    handleExpChecn = (_id, legal) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'exp/check',
            payload: {
                _id,
                legal,
            },
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'exp/find',
            payload: { },
        });
    };

    handleSearch = (e) => {
        e && e.preventDefault();
        const {
            dispatch,
            form,
            exp: { listData: { pagination: { current } }, pageSize },
        } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            if (!e) {
                values.currentPage = current;
                values.pageSize = pageSize;
            }
            dispatch({
                type: 'exp/find',
                payload: values,
            });
        });
    };

    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="症状名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入症状名称" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="审核状态">
                            {getFieldDecorator('status')(
                                <Select>
                                    <Option value={100}>
                                        所有状态
                                    </Option>
                                    <Option value={0}>
                                        待审核
                                    </Option>
                                    <Option value={1}>
                                        已通过
                                    </Option>
                                    <Option value={-1}>
                                        未通过
                                    </Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
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
        const { exp: { isLoading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <ExpListTable
                            loading={isLoading}
                            data={listData}
                            onChange={this.handleTableChange}
                            onRemove={this.handleTableRemove}
                            onSetExcellent={this.handleSetExcellent}
                            onCheck={this.handleExpChecn}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
