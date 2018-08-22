import React from 'react';
import { Link } from 'dva/router';
import { Divider, Popconfirm } from 'antd';
import StandardTable from '../../../components/StandardTable';

export default class ReactionListTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '80px',
            },
            {
                title: '名称',
                dataIndex: 'name',
                width: '160px',
            },
            {
                title: '名称',
                dataIndex: 'des',
            },
            {
                title: '操作',
                width: '220px',
                render: (text, record) => (
                    <div>
                        <Link to={`/Reaction/reaction-editor/${record._id}`}>编辑</Link>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="是否要删除此行数据？"
                            onConfirm={() => this.props.onRemove(record._id)}
                        >
                            <a>删除</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        {
                            record.is_recordable ? (
                                <a onClick={() => this.props.onSetRecordable(record._id, false)}>设为不可记录</a>
                            ) : (
                                <a onClick={() => this.props.onSetRecordable(record._id, true)}>设为可记录</a>
                            )
                        }
                    </div>
                ),
            },
        ];
    };
}
