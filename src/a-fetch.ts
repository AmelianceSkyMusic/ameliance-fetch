import { commonFetchDelete } from './common-fetch-delete';
import { commonFetchGet } from './common-fetch-get';
import { commonFetchPatch } from './common-fetch-patch';
import { commonFetchPost } from './common-fetch-post';
import { commonFetchPut } from './common-fetch-put';
import type { SearchParams } from './helpers/get-fetch-url';
import { AFetchBody, AFetchErrorBody, AFetchRequest } from './types/a-fetch-types';

const DEFAULT_HEADERS_INIT = {};
const ERROR_DEFAULT_TITLE = 'A-FETCH ERROR';

type AFetchOption = {
	headersInit?: HeadersInit;
	errorTitle?: string;
	showConsoleError?: boolean;
	deepError?: boolean;
};

export function aFetch<GlobalErrorBodyT extends AFetchErrorBody = AFetchErrorBody>(
	apiUrl: string,
	options: Partial<AFetchOption> = {},
) {
	const {
		headersInit = DEFAULT_HEADERS_INIT,
		errorTitle = ERROR_DEFAULT_TITLE,
		showConsoleError = true,
		deepError = true,
	} = options;

	const errorHandleOptions = { errorTitle, showConsoleError, deepError };

	return {
		delete: async <
			RequestT = AFetchRequest,
			ErrorBodyT extends AFetchErrorBody = GlobalErrorBodyT extends AFetchErrorBody
				? GlobalErrorBodyT
				: AFetchErrorBody,
		>(
			input: RequestInfo | URL,
			searchParams?: SearchParams,
			init?: RequestInit,
		) =>
			await commonFetchDelete<RequestT, ErrorBodyT>({
				apiUrl,
				input,
				searchParams,
				init: {
					...init,
					headers: { ...(init?.headers || {}), ...headersInit },
				},
				errorHandleOptions,
			}),

		get: async <
			RequestT = AFetchRequest,
			ErrorBodyT extends AFetchErrorBody = GlobalErrorBodyT extends AFetchErrorBody
				? GlobalErrorBodyT
				: AFetchErrorBody,
		>(
			input: RequestInfo | URL,
			searchParams?: SearchParams,
			init?: RequestInit,
		) =>
			await commonFetchGet<RequestT, ErrorBodyT>({
				apiUrl,
				input,
				searchParams,
				init: {
					...init,
					headers: { ...(init?.headers || {}), ...headersInit },
				},
				errorHandleOptions,
			}),

		patch: async <
			BodyT = AFetchBody,
			RequestT = AFetchRequest,
			ErrorBodyT extends AFetchErrorBody = GlobalErrorBodyT extends AFetchErrorBody
				? GlobalErrorBodyT
				: AFetchErrorBody,
		>(
			input: RequestInfo | URL,
			body?: BodyT,
			searchParams?: SearchParams,
			init?: Omit<RequestInit, 'body'>,
		) =>
			await commonFetchPatch<RequestT, BodyT, ErrorBodyT>({
				apiUrl,
				input,
				body,
				searchParams,
				init: {
					...init,
					headers: { ...(init?.headers || {}), ...headersInit },
				},
				errorHandleOptions,
			}),

		post: async <
			BodyT = AFetchBody,
			RequestT = AFetchRequest,
			ErrorBodyT extends AFetchErrorBody = GlobalErrorBodyT extends AFetchErrorBody
				? GlobalErrorBodyT
				: AFetchErrorBody,
		>(
			input: RequestInfo | URL,
			body?: BodyT,
			searchParams?: SearchParams,
			init?: Omit<RequestInit, 'body'>,
		) =>
			await commonFetchPost<RequestT, BodyT, ErrorBodyT>({
				apiUrl,
				input,
				body,
				searchParams,
				init: {
					...init,
					headers: { ...(init?.headers || {}), ...headersInit },
				},
				errorHandleOptions,
			}),

		put: async <
			BodyT = AFetchBody,
			RequestT = AFetchRequest,
			ErrorBodyT extends AFetchErrorBody = GlobalErrorBodyT extends AFetchErrorBody
				? GlobalErrorBodyT
				: AFetchErrorBody,
		>(
			input: RequestInfo | URL,
			body?: BodyT,
			searchParams?: SearchParams,
			init?: Omit<RequestInit, 'body'>,
		) =>
			await commonFetchPut<RequestT, BodyT, ErrorBodyT>({
				apiUrl,
				input,
				body,
				searchParams,
				init: {
					...init,
					headers: { ...(init?.headers || {}), ...headersInit },
				},
				errorHandleOptions,
			}),
	};
}
