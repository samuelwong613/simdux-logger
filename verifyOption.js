import defaultOption from './default.json';

export default verifyOption = custOption => {
  if (custOption && typeof custOption !== 'object')
    throw Error('Simdux-Logger: option must be a object.');
  if (!custOption)  custOption = {};
  let option = {...defaultOption};
  option.colors = { ...defaultOption.colors };

  // level
  if (custOption.level && typeof custOption.level === 'string')
    option.level = custOption.level;
  else if (custOption.level !== undefined)
    throw Error('Simdux-Logger: option.level must be a string.');

  // title
  if (custOption.title && typeof custOption.title === 'string')
    option.title = custOption.title;
  else if (custOption.title !== undefined)
    throw Error('Simdux-Logger: option.title must be a string.');
  
  // timestamp
  if (typeof custOption.timestamp === 'boolean')
    option.timestamp = custOption.timestamp;
  else if (custOption.timestamp !== undefined)
    throw Error('Simdux-Logger: option.timestamp must be a boolean.');
  
  // stateTransformer
  if (custOption.stateTransformer && typeof custOption.stateTransformer === 'function')
    option.stateTransformer = custOption.stateTransformer;
  else if (custOption.stateTransformer !== undefined)
    throw Error('Simdux-Logger: option.stateTransformer must be a function.');
  
  // collapsed
  if (typeof custOption.collapsed === 'boolean' || typeof custOption.collapsed === 'function')
    option.collapsed = custOption.collapsed;
  else if (custOption.collapsed !== undefined)
    throw Error('Simdux-Logger: option.collapsed must be a boolean or function.');
  
  // blacklist
  if (custOption.blacklist && custOption.blacklist instanceof Array)
    option.blacklist = custOption.blacklist;
  else if (custOption.blacklist !== undefined)
    throw Error('Simdux-Logger: option.blacklist must be a string[].');
  if (option.blacklist.some(k => typeof k !== 'string'))
    throw Error('Simdux-Logger: option.blacklist must be a string[].');
  
  // whitelist
  if (custOption.whitelist && custOption.whitelist instanceof Array)
    option.whitelist = custOption.whitelist;
  else if (custOption.whitelist !== undefined)
    throw Error('Simdux-Logger: option.whitelist must be a string[].');
  if (option.whitelist.some(k => typeof k !== 'string'))
    throw Error('Simdux-Logger: option.whitelist must be a string[].');

  // logger
  if (custOption.logger && typeof custOption.logger === 'object'){
    if ( 
      typeof custOption.logger['groupCollapsed'] === 'function' &&
      typeof custOption.logger['group'] === 'function' && 
      typeof custOption.logger['groupEnd'] === 'function' &&
      typeof custOption.logger[option.level] === 'function'
    ){
      option.logger = custOption.logger;
    }else{
      throw Error('Simdux-Logger: option.logger is invalid.');
    }
  }else if (custOption.logger !== undefined){
    throw Error('Simdux-Logger: option.logger is invalid.');    
  }

  // colors
  if (custOption.colors && typeof custOption.colors === 'object'){
    if (custOption.colors.title && typeof custOption.colors.title === 'string')
      option.colors.title = custOption.colors.title;
    if (custOption.colors.key && typeof custOption.colors.key === 'string')
      option.colors.key = custOption.colors.key;
    if (custOption.colors.time && typeof custOption.colors.time === 'string')
      option.colors.time = custOption.colors.time;
    if (custOption.colors.prevState && typeof custOption.colors.prevState === 'string')
      option.colors.prevState = custOption.colors.prevState;
    if (custOption.colors.nextState && typeof custOption.colors.nextState === 'string')
      option.colors.nextState = custOption.colors.nextState;
  }else if (custOption.colors !== undefined){
    throw Error('Simdux-Logger: option.colors is invalid.');    
  }

  return option;
}