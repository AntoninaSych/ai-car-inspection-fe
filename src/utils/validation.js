export const text = {
  required: (defaultText = 'The field is mandatory') => defaultText,
  min: min => `The minimum number of characters is ${min}`,
  max: max => `The maximum number of characters is ${max}`,
};
