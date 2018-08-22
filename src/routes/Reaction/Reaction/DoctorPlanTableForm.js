import React from 'react';
import { Input } from 'antd';
import TableForm from '../../../components/TableForm';

export default class DoctorPlanTableForm extends TableForm {
    createColumns = () => {
        return [
            {
                title: '应对方案',
                dataIndex: 'content',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'content', record._id)}
                                onBlur={e => this.saveRow(e, record._id)}
                                onKeyPress={e => this.handleKeyPress(e, record._id)}
                                placeholder="请输入应对方案"
                            />
                        );
                    }
                    return text;
                },
            },
        ];
    };

    validate = (target) => {
        const { content } = target;
        if (!content) {
            return '应对方案不能为空!';
        }
        return true;
    }
}
