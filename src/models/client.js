import { message } from 'antd';
import { find, create, detail, update } from '../services/client';

export default {
    namespace: 'client',

    state: {
        isLoading: false,
        listData: {
            list: [],
            pagination: {
                currentPage: 1,
                pageSize: 10,
            },
        },
        detail: {},
    },

    effects: {
        *find({ payload }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            const response = yield call(find, payload);
            if (response.success) {
                yield put({
                    type: 'setListData',
                    payload: response.data,
                });
            } else {
                message.error(response.data);
            }
        },
        *create({ payload, callback }, { call, put }) {
            const response = yield call(create, payload);
            if (response.success) {
                yield put({
                    type: 'addListData',
                    payload: response.data,
                });
                callback && callback();
                message.success('创建成功');
            } else {
                message.error(response.data);
            }
        },
        *detail({ payload, callback }, { call, put }) {
            const response = yield call(detail, payload);
            if (response.success) {
                yield put({
                    type: 'setDetail',
                    payload: response.data,
                });
                callback && callback(response.data);
            } else {
                message.error(response.data);
            }
        },
        *clearDetail(_, { put }) {
            yield put({
                type: 'setDetail',
                payload: {},
            });
        },
        *update({ payload, callback }, { call }) {
            const response = yield call(update, payload);
            if (response.success) {
                callback && callback(response.data);
                message.success('更新成功');
            } else {
                message.error(response.data);
            }
        },
    },

    reducers: {
        setLoading(state, { payload }) {
            return {
                ...state,
                isLoading: !!payload,
            };
        },
        setListData(state, { payload }) {
            return {
                ...state,
                listData: { ...payload },
                isLoading: false,
            };
        },
        addListData(state, { payload }) {
            return {
                ...state,
                listData: {
                    ...state.listData,
                    list: [payload, ...state.listData.list],
                },
            };
        },
        setDetail(state, { payload }) {
            return {
                ...state,
                detail: payload,
            };
        },
    },
};
