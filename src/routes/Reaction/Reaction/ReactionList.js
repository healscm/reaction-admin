import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Select } from 'antd';
import ReactionListTable from './ReactionListTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
const { Option } = Select;
// const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIND_FIELDS = {
    id: 1,
    name: 1,
    des: 1,
    is_recordable: 1,
};

@connect(state => ({
    reaction: state.reaction,
}))
@Form.create()
export default class ReactionList extends PureComponent {
    componentDidMount() {
        const { reaction: { formValues }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            name: formValues.name,
        });
        this.handleSearch();
    }

    handleTableChange = (pagination) => {
        const { dispatch, reaction: { formValues } } = this.props;
        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            fields: FIND_FIELDS,
        };
        dispatch({
            type: 'reaction/find',
            payload: params,
        });
    };

    handleTableRemove = (reactionId) => {
        this.props.dispatch({
            type: 'reaction/remove',
            payload: reactionId,
        });
    };

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'reaction/find',
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
            reaction: { listData: { pagination: { current } }, pageSize },
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
                type: 'reaction/find',
                payload: values,
            });
        });
    };

    handleCreate = () => {
        this.props.dispatch({
            type: 'reaction/create',
        });
    };

    handleRecordable = (_id, recordable) => {
        this.props.dispatch({
            type: 'reaction/update',
            payload: {
                data: { is_recordable: !!recordable },
                _id,
            },
            callback: () => {
                this.props.dispatch({
                    type: 'reaction/updateRecordable',
                    payload: {
                        _id,
                        is_recordable: !!recordable,
                    },
                });
            },
        });
    }

    renderForm() {
        const { form: { getFieldDecorator }, reaction: { listData: { category } } } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="症状名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="症状类别">
                            {getFieldDecorator('category', {
                                initialValue: 'all',
                            })(
                                <Select>
                                    <Option key="all" value="all">
                                        所有类别
                                    </Option>
                                    {
                                        category.map(item => (
                                            <Option key={item._id} value={item._id}>
                                                {item.name}
                                            </Option>
                                        ))
                                    }
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
        const { reaction: { isLoading, listData } } = this.props;
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
                        <ReactionListTable
                            loading={isLoading}
                            data={listData}
                            onChange={this.handleTableChange}
                            onRemove={this.handleTableRemove}
                            onSetRecordable={this.handleRecordable}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
