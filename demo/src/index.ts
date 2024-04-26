import { api } from './api';

async function app() {
	const respWithSuccess = await api.todo.getTodo(1);
	if (respWithSuccess.ok) {
		console.log('resp ok: ', respWithSuccess);
	} else {
		console.log('resp error: ', respWithSuccess);
	}

	const respWithError = await api.todo.addTodo({ title: 'todo', text: 'text', userId: '1' });
	if (respWithError.ok) {
		console.log('resp ok: ', respWithError);
	} else {
		console.log('resp error: ', respWithError);
	}
}

app();
