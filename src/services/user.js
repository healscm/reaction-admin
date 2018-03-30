import { get } from '../utils/request';

export async function query() {
    return get('/admin/api/users');
}

export async function queryCurrent() {
    return get('/admin/api/currentUser');
}
