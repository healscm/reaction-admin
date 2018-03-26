import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import UserListTable from './UserListTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from '../../style.less';

const FormItem = Form.Item;
// const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const FIND_FIELDS = {
    nickName: 1,
    avatarUrl: 1,
    login_date: 1,
};

@connect(state => ({
    userList: state.userList,
}))
@Form.create()
export default class UserList extends PureComponent {
    componentDidMount() {
        const { userList: { formValues }, form: { setFieldsValue } } = this.props;
        setFieldsValue({
            nickName: formValues.nickName,
        });
        this.handleSearch();
    }

    handleStandardTableChange = (pagination/* , filtersArg, sorter */) => {
        const { dispatch, userList: { formValues } } = this.props;
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
            type: 'userList/find',
            payload: params,
        });
    }

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
            type: 'userList/find',
            payload: {
                fields: FIND_FIELDS,
            },
        });
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                fields: FIND_FIELDS,
            };
            dispatch({
                type: 'userList/find',
                payload: values,
            });
        });
    }

    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="用户昵称">
                            {getFieldDecorator('nickName')(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    render() {
        const { userList: { isLoading, listData } } = this.props;
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                        <UserListTable
                            loading={isLoading}
                            data={listData}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
