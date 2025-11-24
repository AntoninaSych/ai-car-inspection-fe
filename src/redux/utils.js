export const handleError = ({ message, status }) => {
  if (status === 404) {
    return 'No data found.';
  } else if (status === 429) {
    return 'Sorry, but there are too many requests. Please try again later...';
  }
  return message;
};
