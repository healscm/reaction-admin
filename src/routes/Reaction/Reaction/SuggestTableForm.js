import React from 'react';
import { Input } from 'antd';
import TableForm from '../../../components/TableForm';

export default class SuggestTableForm extends TableForm {
    createColumns = () => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '80px',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'id', record._id)}
                                onBlur={e => this.saveRow(e, record._id)}
                                onKeyPress={e => this.handleKeyPress(e, record._id)}
                                placeholder="请输入建议ID"
                            />
                        );
                    }
                    return text;
                },
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
                                onChange={e =>
                                    this.handleFieldChange(e, 'goodVote', record._id)
                                }
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
    };

    validate = (target) => {
        const { badVote, goodVote, content, id } = target;
        if (!id || isNaN(id)) {
            return 'ID必须是数字!';
        }
        if (!content) {
            return '建议内容不能为空!';
        }
        if (!goodVote || isNaN(goodVote)) {
            return '有用投票数必须是数字!';
        }
        if (!badVote || isNaN(badVote)) {
            return '没用投票数必须是数字!';
        }
        return true;
    }
}
