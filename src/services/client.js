import { get, post } from '../utils/request';

export async function find(params) {
    return post('/admin/api/find_client', params);
}

export async function create(params) {
    return post('/admin/api/create_client', params);
}

export async function detail(_id) {
    return get(`/admin/api/detail_client/${_id}`);
}

export async function update(params) {
    return post('/admin/api/update_client', params);
}
