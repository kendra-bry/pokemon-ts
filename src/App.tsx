import Nav from './components/Nav/Nav';
import Routes from './Router';

import classes from './App.module.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Nav />
			<div className={classes.app}>
				<Routes />
			</div>
		</Router>
	);
}

export default App;

