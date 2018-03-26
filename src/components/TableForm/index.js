import React, { PureComponent } from 'react';
import { Table, Button, Popconfirm, Divider } from 'antd';
import styles from './index.less';

export default class TableForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
        };

        this.index = 0;
        this.cacheOriginData = {};
        this.initOperation();
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                data: nextProps.value,
            });
        }
    }

    getRowById(_id) {
        return this.state.data.filter(item => item._id === _id)[0];
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             this.props.dispatch({
    //                 type: 'form/submit',
    //                 payload: values,
    //             });
    //         }
    //     });
    // }

    toggleEditable(e, _id) {
        e.preventDefault();
        const target = this.getRowById(_id);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[_id] = { ...target };
            }
            target.editable = !target.editable;
            this.setState({ data: [...this.state.data] });
        }
    }

    remove(_id) {
        const newData = this.state.data.filter(item => item._id !== _id);
        this.setState({ data: newData });
        this.props.onChange(newData);
    }

    newMember = () => {
        const newData = [...this.state.data];
        newData.push({
            _id: `NEW_TEMP_ID_${this.index}`,
            workId: '',
            name: '',
            department: '',
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ data: newData });
    }

    handleKeyPress(e, key) {
        if (e.key === 'Enter') {
            this.saveRow(e, key);
        }
    }

    handleFieldChange(e, fieldName, _id) {
        const newData = [...this.state.data];
        const target = this.getRowById(_id);
        if (target) {
            target[fieldName] = e.target.value;
            target.changed = true;
            this.setState({ data: newData });
        }
    }

    saveRow(e, _id) {
        e && e.persist();
        // save field when blur input
        const t = setTimeout(() => {
            clearTimeout(t);
            const arr = ['TEXTAREA', 'INPUT'];
            if (arr.includes(document.activeElement.tagName) && document.activeElement !== e.target) {
                return;
            }
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            const target = this.getRowById(_id) || {};
            if (this.validate(target)) {
                delete target.isNew;
                this.toggleEditable(e, _id);
                this.props.onChange && this.props.onChange(this.state.data);
            }
        }, 10);
    }

    createColumns = () => {
        return [];
    }

    validate = (target) => { // eslint-disable-line no-unused-vars
        return true;
    }

    initOperation = () => {
        // 操作栏
        this.operationCol = {
            title: '操作',
            _id: 'action',
            width: '120px',
            render: (text, record) => {
                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                                <a onClick={(e) => { this.saveRow(e, record._id); }}>保存</a>
                                <Divider type="vertical" />
                                <Popconfirm title="是否要删除此行数据？" onConfirm={() => this.remove(record._id)}>
                                    <a>删除</a>
                                </Popconfirm>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={(e) => { this.saveRow(e, record._id); }}>保存</a>
                            <Divider type="vertical" />
                            <a onClick={e => this.cancel(e, record._id)}>取消</a>
                        </span>
                    );
                }
                return (
                    <span>
                        <a onClick={e => this.toggleEditable(e, record._id)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行数据？" onConfirm={() => this.remove(record._id)}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                );
            },
        };
    }

    cancel(e, _id) {
        this.clickedCancel = true;
        e && e.preventDefault();
        const target = this.getRowById(_id);
        if (this.cacheOriginData[_id]) {
            Object.assign(target, this.cacheOriginData[_id]);
            target.editable = false;
            delete this.cacheOriginData[_id];
        }
        this.setState({ data: [...this.state.data] });
    }

    render() {
        let columns = this.createColumns();
        columns = columns.concat(this.operationCol);
        return (
            <div>
                <Table
                    columns={columns}
                    rowKey={record => record._id}
                    dataSource={this.state.data}
                    pagination={false}
                    rowClassName={(record) => {
                        return record.editable ? styles.editable : '';
                    }}
                />
                <Button
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={this.newMember}
                    icon="plus"
                >
                    新增一行数据
                </Button>
            </div>
        );
    }
}
