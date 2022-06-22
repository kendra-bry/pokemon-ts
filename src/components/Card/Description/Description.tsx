import classes from './Description.module.css';
const description = {
	flavor_text_entries: [
		{
			flavor_text:
				'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
			language: {
				name: 'en',
				url: 'https://pokeapi.co/api/v2/language/9/',
			},
			version: {
				name: 'red',
				url: 'https://pokeapi.co/api/v2/version/1/',
			},
		},
	],
};

const Description = () => {
    return (
        <div className={classes.description}>
            {description.flavor_text_entries[0].flavor_text}
        </div>
    )
}

export default Description;