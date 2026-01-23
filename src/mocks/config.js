const useMockData = import.meta.env.VITE_USE_MOCK_DATA || '';
export const useMock = useMockData && ['1', 'true', 'yes'].includes(useMockData.toLowerCase());
export const apiPrefix = useMock ? '/api' : '/_api';
