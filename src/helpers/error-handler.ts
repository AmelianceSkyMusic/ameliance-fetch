type ReturnErrorHandler = {
	status: number;
	message: string;
	code?: string;
};

export type ErrorHandler = {
	error: unknown;
	status?: number;
	message?: string;
	code?: string;
	errorTitle?: string;
	errorDepth?: number;
	showConsoleError?: boolean;
};

export function errorHandler({
	error,
	status = -1,
	message = 'Sorry, something went wrong ¯\\_(ツ)_/¯!',
	code,
	errorTitle = 'A-FETCH',
	errorDepth = Infinity,
	showConsoleError = true,
}: ErrorHandler): ReturnErrorHandler {
	const wrapperCount = 0; //* WrapperCount - a parameter that sets the number of wrappers around the function to shift the error array
	const errorCount = 2 + wrapperCount;
	const errorDeep = wrapperCount < 0 ? 0 : errorDepth;

	const errorInfo: ReturnErrorHandler = {
		status,
		message,
	};

	if (error) {
		if (error instanceof Error) {
			errorInfo.message = error.message;
			errorInfo.code = error.name;
		}

		if (typeof error === 'string') errorInfo.message = error;

		if (typeof error === 'object' && error !== null) {
			if ('status' in error && typeof error.status === 'number') {
				errorInfo.status = error.status;
			}
			if ('message' in error && typeof error.message === 'string') {
				errorInfo.message = error.message;
			}
			if ('code' in error && typeof error.code === 'string') {
				errorInfo.code = error.code;
			}
		}
	}

	if (showConsoleError) {
		const title = `${errorTitle} >`;
		const subtitle = code ? `${status} | ${code} | ${message}\n` : `${status} | ${message}\n`;

		console.error(
			title,
			subtitle,
			new Error().stack?.split('\n').splice(errorCount, errorDeep).join('\n'),
		);
	}

	return errorInfo;
}
