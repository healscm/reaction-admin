import { message } from 'antd';
import {
    find,
    update,
} from '../services/category';

export default {
    namespace: 'category',

    state: {
        isLoading: false,
        list: [],
    },

    effects: {
        *find(_, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            const response = yield call(find);
            if (response.success) {
                yield put({
                    type: 'setListData',
                    payload: response.data,
                });
            } else {
                message.error(response.data);
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(update, payload);
            if (response.success) {
                yield put({
                    type: 'setListData',
                    payload: response.data,
                });
                message.success('修改成功');
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
                list: [...payload],
                isLoading: false,
            };
        },
    },
};
