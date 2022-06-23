/// <reference types="react-scripts" />
declare module '*.css' {
	const content: { [key: string]: any };
	export = content;
}