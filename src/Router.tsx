import { Switch, Route } from 'react-router-dom';
import Trainer from './pages/Trainer/Trainer';
import Deck from './pages/Deck/Deck';
import Home from './pages/Home';



export const Routes = () => {
	return (
		<Switch>
			<Route path="/pokemon/:id">
				<Deck />
			</Route>
			<Route path="/trainer">
				<Trainer />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
};

export default Routes;
