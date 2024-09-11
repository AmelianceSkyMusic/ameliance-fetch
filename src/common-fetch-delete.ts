import type { CommonFetchResponse } from './common-fetch';
import { commonFetch } from './common-fetch';
import type { SearchParams } from './helpers/get-fetch-url';
import { getFetchUrl } from './helpers/get-fetch-url';
import type { ErrorHandleOptions } from './types/error-handle-options';

type CommonFetchDelete = {
	apiUrl: string;
	errorHandleOptions: ErrorHandleOptions;
	input: RequestInfo | URL;
	searchParams?: SearchParams;
	init?: RequestInit;
};

export async function commonFetchDelete<RequestT, ErrorBodyT>({
	apiUrl,
	errorHandleOptions,
	input,
	searchParams,
	init,
}: CommonFetchDelete): Promise<CommonFetchResponse<RequestT, ErrorBodyT>> {
	const url = getFetchUrl(input, searchParams);
	return commonFetch({
		input: `${apiUrl}${url}`,
		init: {
			method: 'DELETE',
			...init,
		},
		errorHandleOptions,
	});
}
