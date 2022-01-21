import * as actions from './types';

const initial = {
	app: {
		token: null,
		user: null,
	},
	ui: {
		authModal: false,
		modal: false,
		toast: null
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
		default:
			return state;
	}
};

const ui = (state = initial.ui, action) => {
	switch (action.type) {
		case actions.HANDLE_AUTH_MODAL : {
			return {
				...state,
				authModal: action.payload
			}
		}
		case actions.HANDLE_MODAL : {
			return {
				...state,
				modal: action.payload
			}
		}
		case actions.SET_TOAST: {
			return {
				...state,
				toast: {
					type: action.payload.type,
					message: action.payload.message
				}
			}
		}
		case actions.CLEAR_TOAST: {
			return {
				...state,
				toast: initial.ui.toast
			}
		}
		default:
			return state;
	}
};



export default { app, ui };
