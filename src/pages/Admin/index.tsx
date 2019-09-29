import React, { useState } from 'react';
import './style.scss';
import logo from 'assets/img/logo-home.png';
import Sidebar from 'components/Sidebar';

import { Route, BrowserRouter, Link, Redirect } from 'react-router-dom';
import Dashboard from 'pages/Dashboard';

export default function Admin({ match }) {
	const [expanded, setExpanded] = useState(true);
	console.log(match);
	function toggleExpanded() {
		setExpanded(!expanded);
	}

	function logout() {
		localStorage.clear();
		window.location.href = '/';
	}

	document.title = 'BetAdmin';
	return (
		<BrowserRouter>
			<div className="wrapper">
				<Sidebar
					city_name="Juazeiro do Norte"
					company_logo="https://abrilexame.files.wordpress.com/2018/10/mcdonalds-pinheiros.jpg"
					company_name="McDonalds"
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
