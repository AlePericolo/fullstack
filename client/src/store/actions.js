import jwtDecode from 'jwt-decode';

import { useRawCall } from './api';
import * as actions from './types';

import {isNil} from 'lodash';

export const signup = (credentials) => {
	return async (dispatch) => {

		const response = await useRawCall('POST', '/api/v1/signup', credentials);

		if (!isNil(response.error)) {
			dispatch({
				type: actions.SET_TOAST,
				payload: {type: 'error', message: response.error.response.data.message}
			})
		} else {
			dispatch({
				type: actions.SET_TOAST,
				payload: {type: 'success', message: response.data.message}
			});
		}
	}
};


export const login = (credentials) => {
	return async (dispatch) => {

		const response = await useRawCall('POST', '/api/v1/login', credentials);

		if (!isNil(response.error)) {
			dispatch({
				type: actions.SET_TOAST,
				payload: {type: 'error', message: response.error.response.data.message}
			})
		} else {

			const { token } = response.data;
			const decoded = jwtDecode(token);

			dispatch({
				type: actions.HANDLE_AUTH_MODAL,
				payload: false
			})
			dispatch({
				type: actions.SET_TOAST,
				payload: {type: 'success', message: 'User Logged'}
			});
			dispatch({
				type: actions.LOGIN,
				payload: { 
					token: token, 
					user: {
						_id: decoded.userId,
						email: decoded.email
					} 
				}
			});
		}
	}
};

export const logout = () => {
	return async (dispatch) => {
		dispatch({
			type: actions.LOGOUT,
			payload: null
		});
	}
};

export const handleAuthModal = (data) => {
	return async (dispatch) => {
		dispatch({
			type: actions.HANDLE_AUTH_MODAL,
			payload: data
		});
	};
}

export const handleModal = (data) => {
	return async (dispatch) => {
		dispatch({
			type: actions.HANDLE_MODAL,
			payload: data
		});
	};
}

export const setToast = (data) => {
	return async (dispatch) => {
		dispatch({
			type: actions.SET_TOAST,
			payload: data
		});
	};
}

export const clearToast = () => {
	return async (dispatch) => {
		dispatch({
			type: actions.CLEAR_TOAST
		});
	};
}