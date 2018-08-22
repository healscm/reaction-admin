import React from 'react';
// import { Link } from 'dva/router';
import { Divider, Popconfirm } from 'antd';
import StandardTable from '../../../components/StandardTable';

export default class ExpListTable extends StandardTable {
    createRowSelection = () => null;

    createColumns = () => {
        return [
            // {
            //     title: 'ID',
            //     dataIndex: 'id',
            //     width: '80px',
            // },
            {
                title: '用户名称',
                dataIndex: 'user.nickName',
                width: '160px',
            },
            {
                title: '不良反应',
                dataIndex: 'reaction.name',
                width: '160px',
            },
            {
                title: '用户经验',
                dataIndex: 'content',
            },
            // {
            //     title: '作者回复',
            //     dataIndex: 'des',
            // },
            {
                title: '操作',
                width: '260px',
                render: (text, record) => (
                    <div>
                        {
                            record.status === 0 && <a onClick={() => this.props.onCheck(record._id, false)}>不通过</a>
                        }
                        {
                            record.status === 0 && <Divider type="vertical" />
                        }
                        {
                            record.status === 0 && <a onClick={() => this.props.onCheck(record._id, true)}>通过</a>
                        }
                        {
                            record.status === 1 && <a onClick={() => this.props.onCheck(record._id, false)}>不通过</a>
                        }
                        {
                            record.status === -1 && <a onClick={() => this.props.onCheck(record._id, true)}>通过</a>
                        }
                        <Divider type="vertical" />
                        {
                            record.is_excellent ? (
                                <a onClick={() => this.props.onSetExcellent(record._id, false)}>移出精选</a>
                            ) : (
                                <a onClick={() => this.props.onSetExcellent(record._id, true)}>移入精选</a>
                            )
                        }
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
