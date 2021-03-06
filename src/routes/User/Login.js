import React, { Component } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

// const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
    handleSubmit = (err, values) => {
        if (!err) {
            this.props.dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                },
            });
        }
    };

    // changeAutoLogin = (e) => {
    //     this.setState({
    //         autoLogin: e.target.checked,
    //     });
    // }

    renderMessage = (content) => {
        return (
            <Alert
                style={{ marginBottom: 24 }}
                message={content}
                type="error"
                showIcon
            />
        );
    };

    render() {
        const { login, submitting } = this.props;
        // const { type } = this.state;
        return (
            <div className={styles.main}>
                <Login
                    // defaultActiveKey={type}
                    // onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                >
                    {login.status === 'error' && !login.submitting && this.renderMessage('账户或密码错误')}
                    <UserName name="username" placeholder="请输入管理员账号" />
                    <Password name="password" placeholder="请输入密码" />
                    {/* <div>
                        <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
                        <a style={{ float: 'right' }} href="">忘记密码</a>
                    </div> */}
                    <Submit loading={submitting}>登录</Submit>
                    {/* <div className={styles.other}>
                        其他登录方式
                        <Icon className={styles.icon} type="alipay-circle" />
                        <Icon className={styles.icon} type="taobao-circle" />
                        <Icon className={styles.icon} type="weibo-circle" />
                        <Link className={styles.register} to="/user/register">注册账户</Link>
                    </div> */}
                </Login>
            </div>
        );
    }
}
