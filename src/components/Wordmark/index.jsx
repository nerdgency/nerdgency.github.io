import React from 'react';
import './styles.css';

export default function Wordmark({
  name = 'nerdgency',
  className = '',
}) {
  return (
	<div className={`nerdgency-wordmark ${className}`}>
	  <span className="nerdgency-wordmark-bracket">{'{'}</span>
	  <span className="nerdgency-wordmark-name">{name}</span>
	  <span className="nerdgency-wordmark-bracket">{'}'}</span>
	</div>
  );
}