import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Spin } from 'antd';
import CategoryTableForm from './CategoryTableForm';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

@connect(state => ({
    category: state.category,
}))
@Form.create()
export default class ExpList extends PureComponent {
    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = (e) => {
        e && e.preventDefault();
        this.props.dispatch({
            type: 'category/find',
        });
    };

    handleChange = (newData, removeId) => {
        this.props.dispatch({
            type: 'category/update',
            payload: { data: newData, removeId },
        });
    };

    render() {
        const { category: { isLoading, list } } = this.props;
        return (
            <PageHeaderLayout>
                <Spin spinning={isLoading}>
                    <Card bordered={false}>
                        <CategoryTableForm value={list} onChange={this.handleChange} />
                    </Card>
                </Spin>
            </PageHeaderLayout>
        );
    }
}
