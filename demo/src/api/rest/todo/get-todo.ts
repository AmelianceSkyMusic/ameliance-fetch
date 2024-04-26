import { aFetchApi } from '../a-fetch-api';

type RespData = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export async function getTodo(page: number) {
	return await aFetchApi.get<RespData>(`/todos/${page}`);
}
