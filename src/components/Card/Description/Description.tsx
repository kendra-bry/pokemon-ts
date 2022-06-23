import { FC } from 'react';
import classes from './Description.module.css';

const Description: FC<{ description: string }> = ({ description }) => {
	return <div className={classes.description}>{description}</div>;
};

export default Description;
