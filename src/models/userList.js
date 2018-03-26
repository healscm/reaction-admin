import { message } from 'antd';
import { find } from '../services/userList';

export default {
    namespace: 'userList',

    state: {
        isLoading: false,
        listData: {
            list: [],
            pagination: {
                currentPage: 1,
                pageSize: 10,
            },
        },
        formValues: {
            nickName: '',
        },
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
            const response = yield call(find, payload);
            if (response.success) {
                yield put({
                    type: 'setListData',
                    payload: response.data,
                });
            } else {
                message.error(response.data);
            }
            // console.log(response);
            // redirect on client when network broken
            // yield put(routerRedux.push(`/exception/${payload.code}`));
            // yield put({
            //     type: 'trigger',
            //     payload: payload.code,
            // });
        },
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
    },
};
