const toSnake = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
const toCamel = str => str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
const isPlainObject = value => Object.prototype.toString.call(value) === '[object Object]';

export const formatToCamelCase = data => {
  if (Array.isArray(data)) {
    return data.map(item => formatToCamelCase(item));
  }

  if (!isPlainObject(data)) {
    return data;
  }

  return Object.entries(data).reduce((acc, [key, value]) => {
    const camelKey = typeof key === 'string' ? toCamel(key) : key;
    acc[camelKey] = formatToCamelCase(value);
    return acc;
  }, {});
};

export const formatToSnake = data => {
  if (Array.isArray(data)) {
    return data.map(item => formatToSnake(item));
  }

  if (data !== null && typeof data === 'object') {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const snakeKey = toSnake(key);
      acc[snakeKey] = formatToSnake(value);
      return acc;
    }, {});
  }

  return data;
};
