/**
 * Check if the value is not null and value's length is greater than minLength
 *
 * @export
 * @param {*} value
 * @param {*} minLength
 * @returns
 */
export function minLengthValidator(value, minLength) {
  const aux = value.trim();
  return aux !== null && aux.length >= minLength;
}

/**
 * Check if the value is not null and value's length is less than maxLength
 *
 * @export
 * @param {*} value
 * @param {*} maxLength
 * @returns
 */
export function maxLengthValidator(value, maxLength) {
  const aux = value.trim();
  return aux !== null && aux.length <= maxLength;
}

/**
 * Check if the value is not null and not empty
 *
 * @export
 * @param {*} value
 * @returns
 */
export function requiredValidator(value) {
  if (value != null) {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === 'object' && Object.keys(value)) {
      return Object.keys(value).length > 0;
    }
  } else {
    return false;
  }
}

/**
 * Check if the value is not null and less than max
 *
 * @export
 * @param {number} value
 * @param {number} max
 * @returns
 */
export function maxValidator(value: number, max: number) {
  return value !== null && value <= max;
}

/**
 * Check if the value is not null and greater than min
 *
 * @export
 * @param {number} value
 * @param {number} min
 * @returns
 */
export function minValidator(value: number, min: number) {
  return value !== null && value >= min;
}

/**
 * Check if the value is not null and matches the given pattern
 *
 * @export
 * @param {string} value
 * @param {string} pattern
 * @returns
 */
export function patternValidator(value: string, pattern: string) {
  const regex = new RegExp(pattern);
  return value !== null && regex.test(value);
}

/**
 * Check if an email is valid
 *
 * @export
 * @param {string} value
 * @returns
 */
export function emailValidator(value: string) {
  const regex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
  );
  return value !== null && regex.test(value);
}
