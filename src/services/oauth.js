import { stringify } from 'qs';
import { token } from '../utils/request';

export async function login(params) {
    // return token('/oauth2/access_token', `grant_type=password&${stringify(params)}`);
    return token(
        'http://127.0.0.1:7001/oauth2/access_token',
        `grant_type=password&${stringify(params)}`
    );
}
