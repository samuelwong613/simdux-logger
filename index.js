/**
 * @providesModule simdux-logger
 */
import verifyOption from './verifyOption';

export const createLogger = custOption => {
  let option = verifyOption(custOption);
  let { logger, colors, title, stateTransformer, timestamp, whitelist, blacklist, level } = option;

  return (key, prevState, nextState) => {
    let groupStart, shouldCollapse, shouldLog = true;

    if (whitelist && whitelist.length > 0)
      shouldLog = whitelist.some(k => k === key);
    else if (blacklist && blacklist.length > 0)
      shouldLog = ! blacklist.some(k => k === key);
    
    if (shouldLog){
      if (typeof option.collapsed === 'boolean')
        shouldCollapse = option.collapsed;
      else
        shouldCollapse = !!option.collapsed(key, prevState, nextState);
        
      groupStart = shouldCollapse === true ? 'groupCollapsed' : 'group';

      logger[groupStart](`%c${title} %c${key}%c${timestamp?' @ '+(new Date()).toISOString():''}`,
        `color: ${colors.title}; `,
        `color: ${colors.key}; font-weight: bold;`,
        `color: ${colors.time}; font-weight: lighter;`);
      logger[level](`%cprevState`, `color: ${colors.prevState}; font-weight: bold;`, stateTransformer(prevState));
      logger[level](`%cnextState`, `color: ${colors.nextState}; font-weight: bold;`, stateTransformer(nextState));
      logger.groupEnd();
    }
  }
}
export default createLogger();