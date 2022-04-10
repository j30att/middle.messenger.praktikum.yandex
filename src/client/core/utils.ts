import {v4 as uuidv4} from 'uuid';

export function camelize(str) {
  return  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
}

export function getUUID() {
  return uuidv4();
}
