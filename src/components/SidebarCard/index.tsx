import * as React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export interface CardProps {
  link: string;
  icon: string;
  name: string;
  selected?: boolean;
  onClick?: Function;
}

export default function SidebarCard(props: CardProps) {
  return (
    <div
      className={`sidebar-card ${props.selected ? ' card-selected' : ''}`}
      onClick={event => props.onClick && props.onClick(event)}
    >
      <div className="card-icon">
        <span className={'fas ' + props.icon} />
      </div>
      <span className="link-name">{props.name}</span>
    </div>
  );
}
