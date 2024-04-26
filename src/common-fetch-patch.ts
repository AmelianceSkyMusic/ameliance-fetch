import type { CommonFetchResponse } from './common-fetch';
import { commonFetch } from './common-fetch';
import type { SearchParams } from './helpers/get-fetch-url';
import { getFetchUrl } from './helpers/get-fetch-url';
import { ErrorHandleOptions } from './types/error-handle-options';

type CommonFetchPatch<BodyT> = {
	apiUrl: string;
	errorHandleOptions: ErrorHandleOptions;
	input: RequestInfo | URL;
	body?: BodyT;
	searchParams?: SearchParams;
	init?: Omit<RequestInit, 'body'>;
};

export async function commonFetchPatch<RequestT, BodyT, ErrorBodyT>({
	apiUrl,
	errorHandleOptions,
	input,
	body,
	searchParams,
	init,
}: CommonFetchPatch<BodyT>): Promise<CommonFetchResponse<RequestT, ErrorBodyT>> {
	const url = getFetchUrl(input, searchParams);
	return commonFetch({
		input: `${apiUrl}${url}`,
		init: {
			method: 'PATCH',
			body: JSON.stringify(body),
			...init,
		},
		errorHandleOptions,
	});
}
