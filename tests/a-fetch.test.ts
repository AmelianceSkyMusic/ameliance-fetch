import { aFetch } from '../src';
const API_URL = 'https://jsonplaceholder.typicode.com';

type RespData = {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
};

type RespErrorData = {
	code: 'INVALID_TITLE' | 'TODO_NOT_FOUND';
};

const aFetchApi = aFetch(API_URL);

async function getTodo(page: number) {
	return await aFetchApi.get<RespData, RespErrorData>(`/todos/${page}`);
}

describe('aFetch:', () => {
	test('Fetch data is instance of object', async () => {
		const resp = await getTodo(1);

		expect(resp).toBeInstanceOf(Object);
	});

	test('Fetching of same data should match', async () => {
		const resp1 = await getTodo(1);
		const resp2 = await getTodo(1);

		if (resp1.ok && resp2.ok) {
			expect(resp1.data).toMatchObject(resp2.data);
		}
	});

	test('Fetching of different data should not match', async () => {
		const resp1 = await getTodo(1);
		const resp2 = await getTodo(2);
		if (resp1.ok && resp2.ok) {
			expect(resp1.data).not.toMatchObject(resp2.data);
		}
	});

	test('The data should be as expected', async () => {
		const resp = await getTodo(1);
		if (resp.ok) {
			const { data } = resp;
			expect(data.id).toBe(1);
			expect(data.userId).toBe(1);
			expect(data.title).toBe('delectus aut autem');
			expect(data.completed).toBe(false);
		}
	});

	test('Should return an error object', async () => {
		const resp = await getTodo(-1);
		if (!resp.ok) {
			expect(resp.error).toBeInstanceOf(Object);
		}
	});

	test('Do nothing', async () => {
		const resp = await getTodo(1);

		if (resp.ok) {
			resp.ok;
			resp.data;
			resp.data.id;
			resp.data.userId;
			resp.data.title;
			resp.data.completed;
		} else {
			resp.ok;
			resp.data;
			resp.data.code;
			resp.error;
			resp.error.message;
			resp.error.status;
		}
	});
});
