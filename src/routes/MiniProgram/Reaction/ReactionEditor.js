import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Input, Popover } from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SuggestTableForm from './SuggestTableForm';
import DoctorPlanTableForm from './DoctorPlanTableForm';
import SeriousSymptomTableForm from './SeriousSymptomTableForm';
import styles from '../../style.less';

const { TextArea } = Input;

const fieldLabels = {
    name: '症状名称',
    des: '症状描述',
    summary: '症状概述',
    reason: '产生原因',
};

@connect(state => ({
    reaction: state.reaction,
}))
@Form.create()
export default class ReactionEditor extends PureComponent {
    state = {
        footerWidth: '100%',
        submitting: false,
    };
    componentDidMount() {
        const { dispatch, match: { params: { _id } } } = this.props;
        dispatch({
            type: 'reaction/detail',
            payload: _id,
            callback: () => {
                const { form: { setFieldsValue }, reaction: { detail } } = this.props;
                // console.log(detail);
                setFieldsValue({
                    name: detail.name,
                    des: detail.des,
                    summary: detail.summary,
                });
            },
        });
        window.addEventListener('resize', this.resizeFooterToolbar);
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'reaction/clearDetail',
        });
        window.removeEventListener('resize', this.resizeFooterToolbar);
    }
    resizeFooterToolbar = () => {
        const sider = document.querySelectorAll('.ant-layout-sider')[0];
        const width = `calc(100% - ${sider.style.width})`;
        if (this.state.width !== width) {
            this.setState({ width });
        }
    }
    render() {
        const { submitting } = this.state;
        const { form, dispatch, reaction: { detail } } = this.props;
        const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
        const validate = () => {
            validateFieldsAndScroll((error, values) => {
                if (!error) {
                    // submit the values
                    // console.log(values);
                    dispatch({
                        type: 'form/submitAdvancedForm',
                        payload: values,
                    });
                }
            });
        };
        const errors = getFieldsError();
        const getErrorInfo = () => {
            const errorCount = Object.keys(errors).filter(key => errors[key]).length;
            if (!errors || errorCount === 0) {
                return null;
            }
            const scrollToField = (fieldKey) => {
                const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
                if (labelNode) {
                    labelNode.scrollIntoView(true);
                }
            };
            const errorList = Object.keys(errors).map((key) => {
                if (!errors[key]) {
                    return null;
                }
                return (
                    <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
                        <Icon type="cross-circle-o" className={styles.errorIcon} />
                        <div className={styles.errorMessage}>{errors[key][0]}</div>
                        <div className={styles.errorField}>{fieldLabels[key]}</div>
                    </li>
                );
            });
            return (
                <span className={styles.errorIcon}>
                    <Popover
                        title="表单校验信息"
                        content={errorList}
                        overlayClassName={styles.errorPopover}
                        trigger="click"
                        getPopupContainer={trigger => trigger.parentNode}
                    >
                        <Icon type="exclamation-circle" />
                    </Popover>
                    {errorCount}
                </span>
            );
        };
        return (
            <PageHeaderLayout
                title="添加/编辑症状"
                wrapperClassName={styles.advancedForm}
            >
                <Card className={styles.card} bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item label={fieldLabels.name}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: `请输入${fieldLabels.name}` }],
                            })(
                                <Input placeholder={`请输入${fieldLabels.name}`} />
                            )}
                        </Form.Item>
                        <Form.Item label={fieldLabels.des}>
                            {getFieldDecorator('des', {
                                rules: [{ required: true, message: `请输入${fieldLabels.des}` }],
                            })(
                                <TextArea rows={4} placeholder={`请输入${fieldLabels.des}`} />
                            )}
                        </Form.Item>
                        <Form.Item label={fieldLabels.summary}>
                            {getFieldDecorator('summary', {
                                rules: [{ required: true, message: `请输入${fieldLabels.summary}` }],
                            })(
                                <TextArea rows={4} placeholder={`请输入${fieldLabels.summary}`} />
                            )}
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="日常建议" bordered={false}>
                    {getFieldDecorator('suggest', {
                        initialValue: Array.isArray(detail.suggest) ? detail.suggest : [],
                    })(<SuggestTableForm />)}
                </Card>
                <Card title="需要和医生沟通的应对方案" bordered={false}>
                    {getFieldDecorator('doctor_plan', {
                        initialValue: Array.isArray(detail.doctor_plan) ? detail.doctor_plan : [],
                    })(<DoctorPlanTableForm />)}
                </Card>
                <Card title="出现以下情况及时就医" bordered={false}>
                    {getFieldDecorator('serious_symptom', {
                        initialValue: Array.isArray(detail.serious_symptom) ? detail.serious_symptom : [],
                    })(<SeriousSymptomTableForm />)}
                </Card>
                <FooterToolbar style={{ width: this.state.footerWidth }}>
                    {getErrorInfo()}
                    <Button type="primary" onClick={validate} loading={submitting}>
                        提交
                    </Button>
                </FooterToolbar>
            </PageHeaderLayout>
        );
    }
}
