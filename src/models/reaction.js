import { message } from 'antd';
import { find, detail, update } from '../services/reaction';

export default {
    namespace: 'reaction',

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
        detail: {},
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
        *detail({ payload, callback }, { call, put }) {
            const response = yield call(detail, payload);
            if (response.success) {
                yield put({
                    type: 'setDetail',
                    payload: response.data,
                });
                callback && callback();
            } else {
                message.error(response.data);
            }
        },
        *update({ payload }, { call }) {
            payload.data.doctor_plan = payload.data.doctor_plan.map((item) => (item.content)); // eslint-disable-line
            payload.data.serious_symptom = payload.data.serious_symptom.map((item) => (item.content)); // eslint-disable-line
            const response = yield call(update, payload);
            if (response.success) {
                message.success('保存成功');
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
            console.log(payload);
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
        setDetail(state, { payload }) {
            const { doctor_plan, serious_symptom } = payload; // eslint-disable-line
            if (Array.isArray(doctor_plan)) {
                payload.doctor_plan = doctor_plan.map((content, i) => ({ content, _id: i })); // eslint-disable-line
            }
            if (Array.isArray(serious_symptom)) {
                payload.serious_symptom = serious_symptom.map((content, i) => ({ content, _id: i })); // eslint-disable-line                
            }
            return {
                ...state,
                detail: { ...payload },
            };
        },
    },
};
