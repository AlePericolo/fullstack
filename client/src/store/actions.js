import jwtDecode from 'jwt-decode';

import { useRawCall } from './api';
import * as actions from './types';

import {isNil} from 'lodash';

export const signup = (credentials) => {
	return async (dispatch) => {

		const response = await useRawCall('POST', '/api/v1/signup', credentials);

		if (!isNil(response.error)) {
			dispatch({
				type: actions.SET_NOTIFY,
				payload: {type: 'error', message: response.error.response.data.message}
			})
		} else {
			dispatch({
				type: actions.SET_NOTIFY,
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
				type: actions.SET_NOTIFY,
				payload: {type: 'error', message: response.error.response.data.message}
			})
		} else {

			const { token } = response.data;
			const decoded = jwtDecode(token);

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

export const setNotify = (data) => {
	return async (dispatch) => {
		dispatch({
			type: actions.SET_NOTIFY,
			payload: data
		});
	};
}

export const clearNotify = () => {
	return async (dispatch) => {
		dispatch({
			type: actions.CLEAR_NOTIFY
		});
	};
}