import isString from 'lodash/isString';
import { Rule } from 'antd/lib/form';
import validator from 'validator';
import { isNil } from 'lodash';
import { isBlank } from './utils';

/**
 * 中英文字符长度，中文算两个长度
 * @param {*} str
 */
export function strlen(str: string) {
  return str.length;
}

export function validateIPWithPort(val: string) {
  const reg =
    /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  return reg.test(val);
}

/**
 * 验证是否包含数字和字母
 * @param {string} value
 */
export function validateLetterAndNumber(value: string) {
  return new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$').test(value);
}

/**
 * 验证是否为正确ip
 * @param {string} value
 */
export function validateIp(value: string) {
  const reg =
    /^([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(value);
}

/**
 * 验证是否为正确电话
 * @param {string} value
 */
export function validateMobile(value: any) {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(value);
}
/**
 * 验证是否为正确固定电话
 * @param {string} value
 */
export function validateFixedMobile(value: any) {
  const reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
  return reg.test(value);
}

/**
 * 验证器 只允许输入英文或者数字
 * @param {string} erorrMessage
 */
export function onlyLetterOrNumber(erorrMessage: string = '只允许输入英文或者数字'): Rule {
  const result: Rule = {
    validator: (rule, value) => {
      if (value && !/^[A-Za-z0-9]+$/.test(value)) {
        return Promise.reject(erorrMessage);
      }
      return Promise.resolve();
    },
  };

  return result;
}

/**
 * 验证器 字符串是否包含数字和字母
 * @param {string} erorrMessage
 */
export function letterAndNumberValidator(erorrMessage: string = '必须是字母和数字结合'): Rule {
  const result: Rule = {
    validator: (rule, value) => {
      const pass = validateLetterAndNumber(value);
      if (!pass && value) {
        return Promise.reject(erorrMessage);
      }
      return Promise.resolve();
    },
  };

  return result;
}

/**
 * 验证器 ip是否正确
 * @param {*} erorrMessage
 */
export function ipValidator(erorrMessage: string = 'ip格式有误'): Rule {
  const result: Rule = {
    validator: (rule, value) => {
      const pass = validateIp(value);
      if (!pass && value) {
        return Promise.reject(erorrMessage);
      }
      return Promise.resolve();
    },
  };

  return result;
}

/**
 * 验证器 电话是否正确
 * @param {*} erorrMessage
 */
export function mobileValidator(erorrMessage: string = '格式有误'): Rule {
  const result: Rule = {
    validator: (rule, value) => {
      const pass = validateMobile(value) || validateFixedMobile(value);
      if (!pass && value) {
        return Promise.reject(erorrMessage);
      }
      return Promise.resolve();
    },
  };

  return result;
}

/**
 * 验证器 字符串
 *
 * @export
 * @param {*} min
 * @param {*} max
 * @param {*} formatMessage
 * @returns
 */
export function stringLengthValidator(
  min?: number | boolean,
  max?: number,
  formatMessage?: string,
) {
  let message = '';
  const result: Rule = {
    validator(rule, value) {
      if (isString(value)) {
        const valueLength = strlen(value);
        let flag = true;
        if (min !== max) {
          if (min && max) {
            if (valueLength < min || valueLength > max) {
              flag = false;
              message = formatMessage || `介于${min}到${max}个字符`;
            }
          } else if (min) {
            if (valueLength < min) {
              flag = false;
              message = formatMessage || `至少要${min}个字符`;
            }
          } else if (max) {
            if (valueLength > max) {
              flag = false;
              message = formatMessage || `不能超过${max}个字符`;
            }
          }
        }

        if (min === max && valueLength !== min && valueLength > 0) {
          flag = false;
          message = formatMessage || `请输入${min}个字符`;
        }
        if (!flag) {
          return Promise.reject(message);
        }
      }
      return Promise.resolve();
    },
  };

  return result;
}

export function numberBetweenValidator(capacity: number, erorrMessage?: string) {
  const result: Rule = {
    validator: (rule, value) => {
      const errors = [];
      let reg: any;

      if (capacity === 1) {
        reg = /^[0-9]$/;
      }

      if (capacity === 2) {
        reg = /^[0-9][0-9]$/;
      }

      if (capacity === 6) {
        reg = /^[0-9][0-9][0-9][0-9][0-9][0-9]$/;
      }

      const pass = reg.test(value);

      if (!pass && value) {
        errors.push({ message: erorrMessage });
      }

      return Promise.resolve();
    },
  };
  return result;
}

/**  检查字符串参数是否只包含字母、数字
 * @param {*} erorrMessage 错误验证信息
 * @param {*} ignore 忽略的字符串
 */
export function NumLetterValidator(erorrMessage = '请输入字母、数字', ignore?: string) {
  const ignoresMassage = ignore ? `、${ignore}` : '';
  const result: Rule = {
    validator: (rule, value) => {
      if (isBlank(value) || validator.isAlphanumeric(value, undefined, { ignore })) {
        return Promise.resolve();
      }
      return Promise.reject(erorrMessage + ignoresMassage);
    },
  };
  return result;
}
/**  精确到小数点后n位数 */
export function floatDigitValidator(num: number = 2, erorrMessage = `精确至小数点后${num}位`) {
  const result: Rule = {
    validator: (rule, value) => {
      if (isBlank(value) || validator.isDecimal(value, { decimal_digits: `1,${num}` })) {
        return Promise.resolve();
      }
      return Promise.reject(erorrMessage);
    },
  };
  return result;
}

export function specialCharactersValidator(erorrMessage = '请输入合法字符串') {
  const result: Rule = {
    validator: (rule, value) => {
      if (isString(value)) {
        const reg = /[?@/.:]/im;
        const pass = reg.test(value);
        if (pass) {
          return Promise.reject(erorrMessage);
        }
      }
      return Promise.resolve();
    },
  };
  return result;
}

export const codeEncodingValidator = stringLengthValidator(20, 20, '请输入20位数字');
