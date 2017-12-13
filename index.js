/**
 * @providesModule simdux-logger
 */

const COLORS = {
	title: '#00f',
	key: '#333',
	time: '#777',
	prevState: '#9E9E9E',
	nextState: '#4CAF50',
}

export default (key, prevState, nextState) => {
	let logger = console;
	
	logger.groupCollapsed(`%cSimdux %c${key} %c@ ${(new Date()).toISOString()}`,
		`color: ${COLORS.title}; `,
		`color: ${COLORS.key}; font-weight: bold;`,
		`color: ${COLORS.time}; font-weight: lighter;`);
	logger.log(`%cprevState`, `color: ${COLORS.prevState}; font-weight: bold;`, prevState);
	logger.log(`%cnextState`, `color: ${COLORS.nextState}; font-weight: bold;`, nextState);
	logger.groupEnd();
}