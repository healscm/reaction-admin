import React from 'react';
import { Input } from 'antd';
import TableForm from '../../../components/TableForm';

export default class SuggestTableForm extends TableForm {
    createColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'addAt',
                width: '80px',
            },
            {
                title: '建议内容',
                dataIndex: 'content',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'content', record._id)}
                                onBlur={e => this.saveRow(e, record._id)}
                                onKeyPress={e => this.handleKeyPress(e, record._id)}
                                placeholder="请输入建议内容"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '有用投票',
                dataIndex: 'goodVote',
                width: '100px',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'goodVote', record._id)}
                                onBlur={e => this.saveRow(e, record._id)}
                                onKeyPress={e => this.handleKeyPress(e, record._id)}
                                placeholder="请输入建议内容"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '没用投票',
                dataIndex: 'badVote',
                width: '100px',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'badVote', record._id)}
                                onBlur={e => this.saveRow(e, record._id)}
                                onKeyPress={e => this.handleKeyPress(e, record._id)}
                                placeholder="请输入建议内容"
                            />
                        );
                    }
                    return text;
                },
            },
        ];
    }
}
