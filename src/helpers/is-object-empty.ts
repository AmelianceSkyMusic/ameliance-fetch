import { isObject } from './is-object';

export function isObjectEmpty(obj: object): boolean {
	if (!isObject) throw new Error('No object provided');
	return Object.keys(obj).length === 0;
}
