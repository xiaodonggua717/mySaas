/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */

export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str)
}

export function validPassword(str) {
  return str.length >= 6 && str.length <= 16
}

export function validDeptsIntroduction(str) {
  return str.length >= 1 && str.length <= 300
}
