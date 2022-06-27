import classes from './Nav.module.css';
import logo from '../../resources/img/pokemon-logo.png';

const Nav = () => {

    return (
        <div className={classes.nav}>
            <img src={logo} alt="" height="40" />
        </div>
    )
};

export default Nav;