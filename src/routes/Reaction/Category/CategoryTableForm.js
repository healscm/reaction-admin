import React from 'react';
import { Input } from 'antd';
import TableForm from '../../../components/TableForm';

export default class CategoryTableForm extends TableForm {
    // saveRow(e, _id) {
    //     e && e.persist();
    //     // save field when blur input
    //     const t = setTimeout(() => {
    //         clearTimeout(t);
    //         const arr = ['TEXTAREA', 'INPUT'];
    //         if (arr.includes(document.activeElement.tagName) && document.activeElement !== e.target) {
    //             return;
    //         }
    //         if (this.clickedCancel) {
    //             this.clickedCancel = false;
    //             return;
    //         }
    //         const target = this.getRowById(_id) || {};
    //         const validateResult = this.validate(target);
    //         if (validateResult === true) {
    //             delete target.isNew;
    //             this.toggleEditable(e, _id);
    //             this.props.onChange && this.props.onChange(this.state.data);
    //         } else {
    //             message.error(validateResult);
    //         }
    //     }, 10);
    // }

    createColumns = () => {
        return [
            {
                title: '类别名称',
                dataIndex: 'name',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'name', record._id)}
                                onBlur={e => this.saveRow(e, record._id)}
                                onKeyPress={e => this.handleKeyPress(e, record._id)}
                                placeholder="请输入类别名称"
                            />
                        );
                    }
                    return text;
                },
            },
        ];
    };

    validate = (target) => {
        const { name } = target;
        if (!name) {
            return '类别名称不能为空!';
        }
        return true;
    }
}
