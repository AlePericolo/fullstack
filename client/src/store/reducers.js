import * as actions from './types';

const initial = {
	app: {
		token: null,
		user: null,
		notify: null
	}
};

const app = (state = initial.app, action) => {
	switch (action.type) {
		case actions.LOGIN : {
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
			}
		}
		case actions.LOGOUT: {
			return initial.app;
		}
		case actions.SET_NOTIFY: {
			return {
				...state,
				notify: {
					type: action.payload.type,
					message: action.payload.message
				}
			}
		}
		case actions.CLEAR_NOTIFY: {
			return {
				...state,
				notify: initial.app.notify
			}
		}
		default:
			return state;
	}
};

export default { app };
