import { stringify } from 'qs';
import { get, post } from '../utils/request';

export async function queryProjectNotice() {
    return get('/admin/api/project/notice');
}

export async function queryActivities() {
    return get('/admin/api/activities');
}

export async function queryRule(params) {
    return get(`/admin/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
    return post('/admin/api/rule', {
        ...params,
        method: 'delete',
    });
}

export async function addRule(params) {
    return post('/admin/api/rule', {
        ...params,
        method: 'post',
    });
}

export async function fakeSubmitForm(params) {
    return post('/admin/api/forms', params);
}

export async function fakeChartData() {
    return get('/admin/api/fake_chart_data');
}

export async function queryTags() {
    return get('/admin/api/tags');
}

export async function queryBasicProfile() {
    return get('/admin/api/profile/basic');
}

export async function queryAdvancedProfile() {
    return get('/admin/api/profile/advanced');
}

export async function queryFakeList(params) {
    return get(`/admin/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
    return post('/admin/api/login/account', params);
}

export async function fakeRegister(params) {
    return post('/admin/api/register', params);
}

export async function queryNotices() {
    return get('/admin/api/notices');
}
