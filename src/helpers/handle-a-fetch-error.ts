import type { ErrorHandleOptions } from '../types/error-handle-options';
import type { ErrorHandler } from './error-handler';
import { errorHandler } from './error-handler';

type HandleAFetchError<ErrorBodyT> = {
	errorHandleOptions: ErrorHandleOptions;
	error?: unknown;
	message?: string;
	status?: number;
	data: ErrorBodyT;
};

type Error = {
	status: number;
	message: string;
};

export type ReturnHandleAFetchError<ErrorBodyT> = {
	ok: false;
	error: Error;
	data: ErrorBodyT;
};

export function handleAFetchError<ErrorBodyT>({
	errorHandleOptions,
	error,
	message,
	status,
	data,
}: HandleAFetchError<ErrorBodyT>): ReturnHandleAFetchError<ErrorBodyT> {
	const { errorTitle, showConsoleError, deepError } = errorHandleOptions;
	const errorDepth = deepError ? undefined : 0;

	const errorHandlerParams: ErrorHandler = {
		error,
		message,
		status,
		errorTitle,
		showConsoleError,
		errorDepth,
	};

	if (
		typeof data === 'object' &&
		data !== null &&
		'code' in data &&
		typeof data.code === 'string'
	) {
		errorHandlerParams.code = data.code;
	}

	const errorData = errorHandler(errorHandlerParams);

	const { message: errorDataMessage, status: errorDataStatus, ...errorDataRest } = errorData;

	return {
		ok: false,
		error: { message: errorDataMessage, status: errorDataStatus },
		data: { ...errorDataRest, ...data },
	};
}
