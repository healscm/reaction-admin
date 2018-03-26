/**
 * 数字
 * @param {number} val 数字
 */
export function isNum(val) {
    return /^[0-9]*$/.test(val);
}

/**
 * 汉字
 * @param {string} val 汉字
 */
export function isChineseCharacters(val) {
    return /^[\u4e00-\u9fa5]{0,}$/.test(val);
}

/**
 * 邮箱地址
 * @param {string} val 邮箱地址
 */
export function isMail(val) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
}
