import React, { useState } from 'react';
import './style.scss';
import logo from 'assets/img/logo-home.png';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import { Route, BrowserRouter, Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Auth from 'api/Auth';

export default function Admin({ match }) {
	const [expanded, setExpanded] = useState(true);
	const [user, setUser] = useState('');
	console.log(match);
	function toggleExpanded() {
		setExpanded(!expanded);
	}

	function logout() {
		localStorage.clear();
		window.location.href = '/';
	}

	function getUser() {
		const token = localStorage.getItem('access');
		if (token) {
			const { user_id } = jwtDecode(token);
			if (user_id) {
				Auth.getById(user_id)
					.then(response => {
						localStorage.setItem('user', JSON.stringify(response.data));
						setUser(response.data.first_name);
					})
					.catch(err => {
						console.error(err);
					});
			}
		}
	}

	document.title = 'BetAdmin';
	getUser();

	return (
		<BrowserRouter>
			<div className="wrapper">
				<Sidebar
					city_name="Juazeiro do Norte"
					company_logo="https://abrilexame.files.wordpress.com/2018/10/mcdonalds-pinheiros.jpg"
					company_name={user}
					match={match}
					expanded={expanded}
					id={1}
				/>
				<div className="main">
					<div className="topbar">
						<button
							className="toggle-btn"
							onClick={() => toggleExpanded()}
							title="Expandir/recolher menu"
						>
							<span className="fas fa-bars fa-lg" />
						</button>
						<button className="button" onClick={() => logout()}>
							Logout
						</button>
					</div>
					<div className="content">
						<Route path={`${match.url}/dashboard`} component={Dashboard} />
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}
