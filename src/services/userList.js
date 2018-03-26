// import { stringify } from 'qs';
import { get, post } from '../utils/request';
import { SERVER_HOST, SERVER_PORT } from '../config';

const URL_PREFIX = `${SERVER_HOST}:${SERVER_PORT}/admin/api`;

export async function find(params) {
    // return get(`/api/rule?${stringify(params)}`);
    return post(`${URL_PREFIX}/find_user_list`, params);
}
