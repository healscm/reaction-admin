import React from 'react';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';
import * as storage from './utils/storage';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" className={styles.globalSpin} />;
});

/**
 * 验证登录
 */
const checkAuth = () => {
    const user = storage.getItem(storage.USER);
    return user;
};

function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    const UserLayout = routerData['/user'].component;
    const BasicLayout = routerData['/'].component;
    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route
                        path="/user"
                        component={UserLayout}
                    />
                    <AuthorizedRoute
                        path="/"
                        // render={props => <BasicLayout {...props} />}
                        render={(props) => {
                            return checkAuth() ? <BasicLayout {...props} /> : <Redirect to={{ pathname: '/user/login' }} />;
                        }}
                        authority={['admin', 'user']}
                        redirectPath="/user/login"
                    />
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    );
}

export default RouterConfig;
