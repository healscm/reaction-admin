import React from 'react';
import { Link } from 'dva/router';
import { Divider, Popconfirm } from 'antd';
import StandardTable from '../../../components/StandardTable';

export default class ExpListTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '80px',
            },
            {
                title: '用户名称',
                dataIndex: 'name',
                width: '160px',
            },
            {
                title: '不良反应',
                dataIndex: 'des',
            },
            {
                title: '用户经验',
                dataIndex: 'des',
            },
            {
                title: '作者回复',
                dataIndex: 'des',
            },
            {
                title: '操作',
                width: '120px',
                render: (text, record) => (
                    <div>
                        <a>移入精选</a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="是否要删除此行数据？"
                            onConfirm={() => this.props.onRemove(record._id)}
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                ),
            },
        ];
    };
}
