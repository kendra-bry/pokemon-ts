import React from 'react';
import Nav from './components/Nav/Nav';
import Card from './components/Card/Card';
import classes from './App.module.css';

function App() {
	return (
		<div>
			<Nav />
			<div className={classes.app}>
				<Card />
			</div>
		</div>
	);
}

export default App;

