import dayjs, { ConfigType } from 'dayjs';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * 格式化日期时间
 * @param value 时间值（支持字符串、时间戳、Date、Dayjs）
 * @param template 格式化模板，默认 YYYY-MM-DD HH:mm:ss
 * @param placeholder 空值或无效时间时的占位符，默认 --
 */
export const formatDateTime = (
  value?: ConfigType,
  template: string = DATE_TIME_FORMAT,
  placeholder: string = '--',
): string => {
  if (value === null || value === undefined || value === '') {
    return placeholder;
  }
  const date = dayjs(value);
  return date.isValid() ? date.format(template) : placeholder;
};

/**
 * 格式化日期（默认 YYYY-MM-DD）
 */
export const formatDate = (
  value?: ConfigType,
  template: string = DATE_FORMAT,
  placeholder: string = '--',
): string => formatDateTime(value, template, placeholder);
