import type { ReturnHandleAFetchError } from './helpers/handle-a-fetch-error';
import { handleAFetchError } from './helpers/handle-a-fetch-error';
import { ErrorHandleOptions } from './types/error-handle-options';

async function parseResponse(response: Response) {
	const text = await response.text();
	try {
		const json = JSON.parse(text);
		return json;
	} catch {
		return text;
	}
}

type CommonFetchSuccessResponse<RequestT> = { ok: true; data: RequestT };
type CommonFetchErrorResponse<ErrorBodyT> = ReturnHandleAFetchError<ErrorBodyT>;

export type CommonFetchResponse<R, ErrorBodyT> =
	| CommonFetchSuccessResponse<R>
	| CommonFetchErrorResponse<ErrorBodyT>;

type CommonFetch = {
	input: RequestInfo | URL;
	init?: RequestInit;
	errorHandleOptions: ErrorHandleOptions;
};

export async function commonFetch<RequestT, ErrorBodyT>({
	input,
	init,
	errorHandleOptions,
}: CommonFetch): Promise<CommonFetchResponse<RequestT, ErrorBodyT>> {
	try {
		const resp = await fetch(input, init);

		const data = await parseResponse(resp);

		if (!resp.ok) {
			return handleAFetchError({
				errorHandleOptions,
				status: resp.status,
				message: resp.statusText,
				data,
			});
		}

		return { ok: true, data };
	} catch (error) {
		const errorData = handleAFetchError({
			errorHandleOptions,
			error,
			data: {} as ErrorBodyT,
		});
		return errorData;
	}
}
