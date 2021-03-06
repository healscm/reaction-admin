import { stringify } from 'qs';
import { token } from '../utils/request';

export async function login(params) {
    return token(
        '/admin/api/access_token',
        `grant_type=password&${stringify(params)}`
    );
}
