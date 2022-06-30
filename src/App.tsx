import Nav from './components/Nav/Nav';
import Routes from './Router';
import { Container } from 'react-bootstrap';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Nav />
			<Container style={{ marginTop: '75px' }}>
				<Routes />
			</Container>
		</Router>
	);
}

export default App;

