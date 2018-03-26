import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error'];

class StandardTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        // clean state
        if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
            this.setState({
                selectedRowKeys: [],
            });
        }
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        if (this.props.onSelectRow) {
            this.props.onSelectRow(selectedRows);
        }

        this.setState({ selectedRowKeys });
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.props.onChange(pagination, filters, sorter);
    }

    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    }

    createColumns = () => {
        const status = ['关闭', '运行中', '已上线', '异常'];
        return [
            {
                title: '规则编号',
                dataIndex: 'no',
            },
            {
                title: '描述',
                dataIndex: 'description',
            },
            {
                title: '服务调用次数',
                dataIndex: 'callNo',
                sorter: true,
                align: 'right',
                render: val => `${val} 万`,
            },
            {
                title: '状态',
                dataIndex: 'status',
                filters: [
                    {
                        text: status[0],
                        value: 0,
                    },
                    {
                        text: status[1],
                        value: 1,
                    },
                    {
                        text: status[2],
                        value: 2,
                    },
                    {
                        text: status[3],
                        value: 3,
                    },
                ],
                render(val) {
                    return <Badge status={statusMap[val]} text={status[val]} />;
                },
            },
            {
                title: '更新时间',
                dataIndex: 'updatedAt',
                sorter: true,
                render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '操作',
                render: () => (
                    <div>
                        <a href="">配置</a>
                        <Divider type="vertical" />
                        <a href="">订阅警报</a>
                    </div>
                ),
            },
        ];
    }

    createRowSelection = () => {
        const { selectedRowKeys } = this.state;
        return {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };
    }

    render() {
        const { data: { list, pagination }, loading } = this.props;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        return (
            <div className={styles.standardTable}>
                <Table
                    loading={loading}
                    rowKey={record => record.key || record._id}
                    rowSelection={this.createRowSelection()}
                    dataSource={list}
                    columns={this.createColumns()}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default StandardTable;
