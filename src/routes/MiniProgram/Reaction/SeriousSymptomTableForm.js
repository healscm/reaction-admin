import React from 'react';
import { Input } from 'antd';
import TableForm from '../../../components/TableForm';

export default class SeriousSymptomTableForm extends TableForm {
    createColumns = () => {
        return [
            {
                title: '不良情况',
                dataIndex: 'content',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'content', record._id)}
                                onBlur={e => this.saveRow(e, record._id)}
                                onKeyPress={e => this.handleKeyPress(e, record._id)}
                                placeholder="请输入不良情况"
                            />
                        );
                    }
                    return text;
                },
            },
        ];
    }
}
