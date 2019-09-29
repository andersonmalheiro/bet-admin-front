import React, { useState } from 'react';
import './style.scss';

import logo from 'assets/img/trophy.svg';

import SidebarCard, { CardProps } from 'components/SidebarCard';
import { Link } from 'react-router-dom';

interface Props {
	id: number;
	company_logo?: string;
	city_name: string;
	company_name: string;
	match: any;
	expanded?: boolean;
}

export default function Sidebar(props: Props) {
	const path = window.location.pathname;
	const [cards, setCards] = useState([
		{
			icon: 'fa-home',
			link: `/admin/dashboard`,
			name: 'Home',
			selected: path.includes('dashboard'),
			title: 'Home'
		},
		{
			icon: 'fa-search',
			link: `/admin/query`,
			name: 'Buscar',
			selected: path.includes('query'),
			title: 'Buscar'
		},
		{
			icon: 'fa-user',
			link: `/admin/profile`,
			name: 'Perfil',
			selected: path.includes('profile'),
			title: 'Perfil'
		}
	]);

	const toggleSelected = (card: CardProps) => {
		const tmp = cards.map(el => {
			if (el.name === card.name) {
				el.selected = true;
			} else {
				el.selected = false;
			}
			return el;
		});

		setCards(tmp);
	};

	return (
		<div className={`sidebar ${props.expanded ? '' : 'sidebar-slim'}`}>
			{/* <Link to="/companies" className="exit-button">
        <span className="fas fa-arrow-left" />
      </Link> */}
			{props.expanded ? (
				<div className="logo">
					<img src={logo} alt="BetAmin logo" />
					<span>BetAdmin</span>
				</div>
			) : (
				<div className="logo">
					<img src={logo} alt="Dimenu" className="logo" />
				</div>
			)}
			<img src={props.company_logo} alt="" className="company-logo" />
			<h1 className="company-name">{props.company_name}</h1>
			{/* <button className="button dark-red text-white mt-3 edit-btn">
				Editar
			</button> */}
			<div className="sidebar-links">
				{cards.map((card, i) => (
					<Link
						to={card.link}
						style={{ textDecoration: 'none' }}
						key={i}
						title={card.title}
					>
						<SidebarCard
							icon={card.icon}
							name={card.name}
							link={card.link}
							selected={card.selected}
							key={card.name}
							onClick={() => toggleSelected(card)}
						/>
					</Link>
				))}
			</div>
		</div>
	);
}
