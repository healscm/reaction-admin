import { routerRedux } from 'dva/router';
// import { fakeAccountLogin } from '../services/api';
import { login } from '../services/oauth';
import * as storage from '../utils/storage';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(login, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                    currentAuthority: 'guest',
                },
            });
            // Login successfully
            if (response && response.success) {
                yield put({
                    type: 'saveToken',
                    payload: response.data.token,
                });
                setAuthority('admin');
                reloadAuthorized();
                yield put(routerRedux.push('/'));
            } else {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: 'error',
                        currentAuthority: 'guest',
                    },
                });
            }
        },
        *logout(_, { put, select }) {
            yield put({
                type: 'clearToken',
            });
            try {
                // get location pathname
                const urlParams = new URL(window.location.href);
                const pathname = yield select(state => state.routing.location.pathname);
                // add the parameters in the url
                urlParams.searchParams.set('redirect', pathname);
                window.history.replaceState(null, 'login', urlParams.href);
            } finally {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: false,
                        currentAuthority: 'guest',
                    },
                });
                reloadAuthorized();
                yield put(routerRedux.push('/user/login'));
            }
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
        saveToken(state, { payload }) {
            storage.setItem(storage.ACCESS_TOKEN, payload.accessToken);
            storage.setItem(storage.REFRESH_TOKEN, payload.refreshToken);
            storage.setItem(storage.USER, JSON.stringify(payload.user));
            return state;
        },
        clearToken(state) {
            storage.removeItem(storage.ACCESS_TOKEN);
            storage.removeItem(storage.REFRESH_TOKEN);
            storage.removeItem(storage.USER);
            return state;
        },
    },
};
