import { message } from 'antd';
// import { routerRedux } from 'dva/router';
import {
    find,
    // detail,
    update,
    remove,
} from '../services/exp';

export default {
    namespace: 'exp',

    state: {
        isLoading: false,
        listData: {
            list: [],
            pagination: {
                current: 1,
                total: 0,
            },
        },
        pageSize: 10,
        formValues: {
            nickName: '',
        },
        // detail: {},
    },

    effects: {
        *find({ payload }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            yield put({
                type: 'setFormValues',
                payload: {
                    nickName: payload.nickName,
                },
            });
            yield put({
                type: 'setPageSize',
                payload: payload.pageSize,
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
        // *detail({ payload, callback }, { call, put }) {
        //     const response = yield call(detail, payload);
        //     if (response.success) {
        //         yield put({
        //             type: 'setDetail',
        //             payload: response.data,
        //         });
        //         callback && callback();
        //     } else {
        //         message.error(response.data);
        //     }
        // },
        *update({ payload }, { call, put }) {
            const response = yield call(update, payload);
            if (response.success) {
                message.success('保存成功');
                yield put({
                    type: 'updateListData',
                    payload: response.data,
                });
            } else {
                message.error(response.data);
            }
        },
        *remove({ payload }, { call, put }) {
            const response = yield call(remove, payload);
            if (response.success) {
                yield put({
                    type: 'removeData',
                    payload,
                });
                message.success('删除成功');
            } else {
                message.error(response.data);
            }
        },
        // *create(_, { put }) {
        //     yield put(routerRedux.push('/mini-program/reaction-editor/add'));
        // },
        // *clearDetail(_, { put }) {
        //     yield put({
        //         type: 'setDetail',
        //         payload: {},
        //     });
        // },
    },

    reducers: {
        setFormValues(state, { payload }) {
            return {
                ...state,
                formValues: { ...payload },
            };
        },
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
        setPageSize(state, { payload }) {
            return {
                ...state,
                pageSize: payload,
            };
        },
        removeData(state, { payload }) {
            const { list } = state.listData;
            const newList = list.filter(item => item._id !== payload);
            return {
                ...state,
                listData: {
                    ...state.listData,
                    list: newList,
                },
            };
        },
        updateListData(state, { payload }) {
            const newList = [...state.listData.list];
            for (let i = 0; i < newList.length; i += 1) {
                if (newList[i]._id === payload._id) {
                    newList[i] = { ...newList[i], ...payload };
                    break;
                }
            }
            return {
                ...state,
                listData: {
                    ...state.listData,
                    list: newList,
                },
            };
        },
    },
};
