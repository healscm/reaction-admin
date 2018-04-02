import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import ExpListTable from './ExpListTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
// const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIND_FIELDS = {
    id: 1,
    name: 1,
    des: 1,
};

@connect(state => ({
    exp: state.exp,
}))
@Form.create()
export default class ExpList extends PureComponent {
    componentDidMount() {
        const { exp: { formValues }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: formValues.name,
        });
        this.handleSearch();
    }

    handleTableChange = (pagination /* , filtersArg, sorter */) => {
        const { dispatch, exp: { formValues } } = this.props;
        // const filters = Object.keys(filtersArg).reduce((obj, key) => {
        //     const newObj = { ...obj };
        //     newObj[key] = getValue(filtersArg[key]);
        //     return newObj;
        // }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            fields: FIND_FIELDS,
            // ...filters,
        };
        // if (sorter.field) {
        //     params.sorter = `${sorter.field}_${sorter.order}`;
        // }

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

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'exp/find',
            payload: {
                fields: FIND_FIELDS,
            },
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
                fields: FIND_FIELDS,
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

    handleCreate = () => {
        this.props.dispatch({
            type: 'exp/create',
        });
    };

    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="症状名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
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
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={this.handleCreate}>
                                新建
                            </Button>
                        </div>
                        <ExpListTable
                            loading={isLoading}
                            data={listData}
                            onChange={this.handleTableChange}
                            onRemove={this.handleTableRemove}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
