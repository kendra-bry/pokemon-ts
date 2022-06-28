import { FC } from 'react';

import classes from './IconButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBahai, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IconButtonProps {
	clickHandler: <T>(arg: T) => void;
	title: string;
	icon: IconDefinition;
	shiny: boolean;
    color: string;
}

const IconButton: FC<IconButtonProps> = ({ clickHandler, title, icon, shiny, color }) => {
	return (
		<div className={`${classes.icon_button} ${classes[color]}`} title={title} onClick={clickHandler}>
			{!shiny && <FontAwesomeIcon icon={icon} size="lg" />}
			{shiny && (
				<span className="fa-layers fa-fw">
					<FontAwesomeIcon icon={icon} size="lg" />
					<FontAwesomeIcon icon={faBahai} size="lg" transform="shrink-8 up-7 left-7" beat className={classes.shiny} />
				</span>
			)}
		</div>
	);
};

export default IconButton;
