export const splitAndCapitalizeWords = (word: string): string => {
	let string = '';

	if (word.includes('-')) {
		string = word.split('-').map(string => capitalizeWord(string)).join(' ');
	} else {
		string = capitalizeWord(word);
	}
	return string;
};

export const capitalizeWord = (word: string): string => `${word.split('')[0].toUpperCase()}${word.substring(1)}`;
