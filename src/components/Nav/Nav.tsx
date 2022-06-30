import { Container, Navbar } from 'react-bootstrap';
import logo from '../../resources/img/pokemon-logo.png';

const Nav = () => {
	return (
		<Navbar fixed="top" className="bg-dark bg-gradient p-1">
			<Container className="justify-content-center">
				<Navbar.Brand>
					<img src={logo} alt="Pokemon Logo" height="40" />
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Nav;
