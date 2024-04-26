import { aFetchApi } from '../a-fetch-api';

type TodoRequest = {
	userId: string;
	title: string;
	text: string;
};

export async function addTodo(body: TodoRequest) {
	return await aFetchApi.post(`/add-todo`, body);
}
