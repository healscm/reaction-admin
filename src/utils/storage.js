export const ACCESS_TOKEN = 'accessToken';

// export const ACCESS_TOKEN_EXPIRES_AT = 'accessTokenExpiresAt';

export const REFRESH_TOKEN = 'refreshToken';

// export const REFRESH_TOKEN_EXPIRES_AT = 'refreshTokenExpiresAt';

export const USER = 'user';

export function setItem(key, val) {
    localStorage.setItem(key, val);
}

export function getItem(key) {
    return localStorage.getItem(key);
}

export function removeItem(key) {
    return localStorage.removeItem(key);
}
