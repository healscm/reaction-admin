import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { find, detail, update, remove, add } from '../services/reaction';
import { find as findCategory } from '../services/category';

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
            category: [],
        },
        pageSize: 10,
        formValues: {
            name: '',
            category: '',
        },
        detail: {},
        category: [],
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
                    name: payload.name,
                    category: payload.category,
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
        *update({ payload, callback }, { call }) {
            if (payload.data.doctor_plan) {
                payload.data.doctor_plan = payload.data.doctor_plan.map((item) => (item.content)); // eslint-disable-line
            }
            if (payload.data.serious_symptom) {
                payload.data.serious_symptom = payload.data.serious_symptom.map((item) => (item.content)); // eslint-disable-line
            }
            const response = yield call(update, payload);
            if (response.success) {
                callback && callback();
                message.success('保存成功');
            } else {
                message.error(response.data);
            }
        },
        *add({ payload }, { call }) {
            payload.data.doctor_plan = payload.data.doctor_plan.map((item) => (item.content)); // eslint-disable-line
            payload.data.serious_symptom = payload.data.serious_symptom.map((item) => (item.content)); // eslint-disable-line
            payload.data.suggest = payload.data.suggest.map((item) => { // eslint-disable-line
                delete item._id; // eslint-disable-line
                return item;
            });
            const response = yield call(add, payload);
            if (response.success) {
                message.success('添加成功');
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
        *create(_, { put }) {
            yield put(routerRedux.push('/Reaction/reaction-editor/add'));
        },
        *tagChange({ payload }, { put }) {
            yield put({
                type: 'setTags',
                payload,
            });
        },
        *clearDetail(_, { put }) {
            yield put({
                type: 'setDetail',
                payload: {},
            });
        },
        *fetchCategory(_, { call, put }) {
            const response = yield call(findCategory);
            if (response.success) {
                yield put({
                    type: 'setCategory',
                    payload: response.data,
                });
            } else {
                message.error(response.data);
            }
        },
        *updateRecordable({ payload }, { put }) {
            yield put({
                type: 'setRecordable',
                payload,
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
            if (payload.reaction) {
                const { doctor_plan, serious_symptom } = payload.reaction; // eslint-disable-line
                if (Array.isArray(doctor_plan)) {
                    payload.reaction.doctor_plan = doctor_plan.map((content, i) => ({ content, _id: i })); // eslint-disable-line
                }
                if (Array.isArray(serious_symptom)) {
                    payload.reaction.serious_symptom = serious_symptom.map((content, i) => ({ content, _id: i })); // eslint-disable-line                
                }
                return {
                    ...state,
                    detail: { ...payload.reaction },
                    category: payload.category,
                };
            }
            return {
                ...state,
                detail: {},
                category: [],
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
        setTags(state, { payload }) {
            return {
                ...state,
                detail: { ...state.detail, tags: payload },
            };
        },
        setCategory(state, { payload }) {
            return {
                ...state,
                category: payload,
            };
        },
        setRecordable(state, { payload }) {
            const list = [...state.listData.list];
            for (let i = 0; i < list.length; i += 1) {
                if (list[i]._id === payload._id) {
                    list[i].is_recordable = payload.is_recordable;
                    break;
                }
            }
            return {
                ...state,
                listData: {
                    ...state.listData,
                    list,
                },
            };
        },
    },
};
