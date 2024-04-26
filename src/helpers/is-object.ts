export function isObject<T>(obj: T) {
	return Boolean(typeof obj === 'object' && obj !== null && !Array.isArray(obj));
}
