import { tasksHandlers } from './tasksHandlers';
import { authHandlers } from './authHandlers';

export const handlers = [...tasksHandlers, ...authHandlers];
