import { Switch, Route } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import Deck from './pages/Deck/Deck';
import Home from './pages/Home';



export const Routes = () => {
	return (
		<Switch>
			<Route path="/pokemon/:id">
				<Deck />
			</Route>
			<Route path="/pokedex">
				<Pokedex />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
};

export default Routes;
