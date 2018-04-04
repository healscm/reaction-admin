// import { stringify } from 'qs';
import { /* get, */ post } from '../utils/request';

export async function find() {
    return post('/admin/api/find_category_list', {});
}

export async function update(params) {
    return post('/admin/api/update_category_list', params);
}
