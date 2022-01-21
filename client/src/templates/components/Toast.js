import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { useSelector, useDispatch } from 'react-redux';

import { clearToast } from '@/store/actions';

import { isNil } from 'lodash';

function ToastContainer(props) {
	return ReactDOM.createPortal(
		props.children,
		document.getElementById('toast')
	);
}

export default function Toast() {

	const dispatch = useDispatch();

	const { toast } = useSelector((state) => state.ui);
	const [animate, setAnimate] = useState({ opacity: 0, translateX: '50%' });

	useEffect(() => {
		if (isNil(toast)) return

		setAnimate({ opacity: 1, translateX: '0' });
		setTimeout(() => {
			setAnimate({ opacity: 0, translateX: '50%' });
			dispatch(clearToast())
		}, 3000);
	}, [toast]);

	const renderType = () => {
		switch (toast?.type) {
			case 'error': return 'bg-red-300 border border-red-700 text-red-700'
			case 'success': return 'bg-green-300 border border-green-700 text-green-700'
			case 'info': return 'bg-indigo-300 border border-indigo-700 text-indigo-700'
			case 'warning': return 'bg-yellow-300 border border-yellow-700 text-yellow-700'
			default: return ''
		}
	}

	return (
		<ToastContainer>
			<div
				className={`toast fixed w-64 top-20 right-5 mx-auto rounded-md shadow-lg ${renderType()}`}
				style={{
					transition: 'all .5s linear',
					transform: `translateX(${animate.translateX})`,
					opacity: animate.opacity,
					zIndex: isNil(toast) ? -10 : 100
				}}
			>
				<div className="flex items-center justify-between px-5 py-2">
					<div className="flex items-center">
						<p>{toast?.message}</p>
					</div>
				</div>
			</div>
		</ToastContainer>
	);
}
