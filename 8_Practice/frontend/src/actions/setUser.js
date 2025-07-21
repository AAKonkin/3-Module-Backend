import { ACTION_TYPE } from './actionType';

export const setUser = (session) => ({
	type: ACTION_TYPE.SET_USER,
	payload: session,
});
