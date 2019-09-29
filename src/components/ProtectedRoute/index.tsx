import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
	token_type: 'access' | 'refresh';
	exp: number;
	jti: string;
	user_id: number;
}

export default function ProtectedRoute({ component: Component, ...rest }) {
	let isAuthenticated = false;
	const token = localStorage.getItem('access');
	const now = new Date().getTime() / 1000;
	if (token) {
		const decoded: DecodedToken = jwtDecode(token);
		console.log(decoded.exp < now);
		if (decoded && decoded.exp < now) {
			isAuthenticated = false;
		} else {
			isAuthenticated = true;
		}
	}

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
}
