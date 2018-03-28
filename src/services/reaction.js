// import { stringify } from 'qs';
import { get, post } from '../utils/request';
import { SERVER_HOST, SERVER_PORT } from '../config';

const URL_PREFIX = `${SERVER_HOST}:${SERVER_PORT}/admin/api`;

export async function find(params) {
    return post(`${URL_PREFIX}/find_reaction_list`, params);
}

export async function detail(_id) {
    return get(`${URL_PREFIX}/detail_reaction/${_id}`);
}

export async function update(params) {
    return post(`${URL_PREFIX}/update_reaction`, params);
}

export async function remove(_id) {
    return get(`${URL_PREFIX}/remove_reaction/${_id}`);
}
