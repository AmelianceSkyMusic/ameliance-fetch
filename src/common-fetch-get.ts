import type { CommonFetchResponse } from './common-fetch';
import { commonFetch } from './common-fetch';
import type { SearchParams } from './helpers/get-fetch-url';
import { getFetchUrl } from './helpers/get-fetch-url';
import { ErrorHandleOptions } from './types/error-handle-options';

type CommonFetchGet = {
	apiUrl: string;
	errorHandleOptions: ErrorHandleOptions;
	input: RequestInfo | URL;
	searchParams?: SearchParams;
	init?: RequestInit;
};

export async function commonFetchGet<RequestT, ErrorBodyT>({
	apiUrl,
	errorHandleOptions,
	input,
	searchParams,
	init,
}: CommonFetchGet): Promise<CommonFetchResponse<RequestT, ErrorBodyT>> {
	const url = getFetchUrl(input, searchParams);
	return commonFetch({
		input: `${apiUrl}${url}`,
		init: {
			method: 'GET',
			...init,
		},
		errorHandleOptions,
	});
}
