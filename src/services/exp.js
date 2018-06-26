// import { stringify } from 'qs';
import { get, post } from '../utils/request';

export async function find(params) {
    return post('/admin/api/find_reaction_exp_list', params);
}

// export async function detail(_id) {
//     return get(`/admin/api/detail_exp/${_id}`);
// }

export async function update(params) {
    return post('/admin/api/update_reaction_exp', params);
}

export async function remove(_id) {
    return get(`/admin/api/remove_reaction_exp/${_id}`);
}

export async function check(_id, legal) {
    return get(`/admin/api/check_reaction_exp/${_id}/${legal === true ? 1 : -1}`);
}
