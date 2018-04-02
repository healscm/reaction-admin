// import { stringify } from 'qs';
import { post } from '../utils/request';

export async function find(params) {
    return post('/admin/api/find_reaction_exp_list', params);
}

// export async function detail(_id) {
//     return get(`/admin/api/detail_exp/${_id}`);
// }

// export async function update(params) {
//     return post('/admin/api/update_exp', params);
// }

// export async function remove(_id) {
//     return get(`/admin/api/remove_exp/${_id}`);
// }

// export async function add(params) {
//     return post('/admin/api/add_exp', params);
// }
