import { /* get, */ post } from '../utils/request';

export async function find(params) {
    // return get(`/api/rule?${stringify(params)}`);
    return post('/admin/api/find_user_list', params);
}
