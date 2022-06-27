import { FC } from 'react';
import classes from './Button.module.css';

interface ButtonProps {
	text: string;
	clickHandler: () => void;
	isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({ text, clickHandler, isDisabled }) => {
	const buttonClasses = isDisabled ? `${classes.button} ${classes.disabled}` : `${classes.button}`;
	return (
		<div className={classes.button_container}>
			<button disabled={isDisabled} onClick={clickHandler} className={buttonClasses}>
				{text}
			</button>
		</div>
	);
};

export default Button;
