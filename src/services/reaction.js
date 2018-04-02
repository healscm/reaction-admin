// import { stringify } from 'qs';
import { get, post } from '../utils/request';

export async function find(params) {
    return post('/admin/api/find_reaction_list', params);
}

export async function detail(_id) {
    return get(`/admin/api/detail_reaction/${_id}`);
}

export async function update(params) {
    return post('/admin/api/update_reaction', params);
}

export async function remove(_id) {
    return get(`/admin/api/remove_reaction/${_id}`);
}

export async function add(params) {
    return post('/admin/api/add_reaction', params);
}
