
export const login = (credentials) => {
	return async (dispatch) => {

		let response = await useRawCall('POST', '/api/v1/login', credentials);

		if (!isNil(response.error)) {
			alert('Invalid credentials');
		} else {

			const { token } = response.data;
			const { user } = jwtDecode(token);

			dispatch({
				type: actions.LOGIN,
				payload: { token: token, user: user, pte: true }
			});

			// setTimeout(() => {
			// 	document.location.href = "/area-riservata";
			// }, 1000);
		}

		return Promise.resolve();
	}
};

export const logout = () => {
	return async (dispatch) => {

		dispatch({
			type: actions.LOGOUT,
			payload: null
		});

		setTimeout(() => {
			document.location.href = '/';
		}, 1000);
	}
};