import { isObjectEmpty } from './is-object-empty';

export type SearchParams = URLSearchParams | Record<string, string | number | boolean>;

export function getFetchUrl(input?: RequestInfo | URL, searchParams?: SearchParams) {
	let params: URLSearchParams | string[][] | undefined;

	if (!searchParams || isObjectEmpty(searchParams)) {
		params = undefined;
	} else if (searchParams instanceof URLSearchParams || typeof searchParams === 'string') {
		params = searchParams;
	} else if (
		Array.isArray(searchParams) &&
		Array.isArray(searchParams[0]) &&
		searchParams[0].length === 2
	) {
		params = searchParams;
	} else {
		const urlSearchParams = new URLSearchParams();
		Object.entries(searchParams).forEach((entries) => {
			urlSearchParams.append(entries[0], String(entries[1]));
		});
		params = urlSearchParams;
	}

	const stringSearchParams = params ? `?${new URLSearchParams(params)}` : '';
	return `${input}${stringSearchParams}`;
}
