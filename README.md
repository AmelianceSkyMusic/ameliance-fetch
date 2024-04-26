# aFetch - a small wrapper to simplify work with fetch

## Installing

```
npm i ameliance-fetch
```

## Usage

### 1. Create common fetch

```ts
// api/rest/a-fetch-api.ts
import { aFetch } from "ameliance-fetch";

const API_URL = "https://todo.com/api";

const aFetchApi = aFetch(API_URL);
```

**aFetch also accepts additional [options →](#4-options)**

If necessary, here you can globally specify the types of returned error body `data` that can be returned with an error for a given function instance:

```ts
// src/api/rest/a-fetch-api.ts
import { aFetch } from "ameliance-fetch";

const API_URL = "https://todo.com/api";

type ErrorCode = "USERNAME_NOT_FOUND" | "INVALID_EMAIL" | "DATABASE_ERROR" | "TOKEN_HAS_EXPIRED";
type ResponseErrorBody = { code: ErrorCode; username: string } | { code: ErrorCode; email: string };

const aFetchApi = aFetch<ResponseErrorBody>(API_URL);
```

Default types:

```ts
type AFetchErrorBody = unknown;
```

### 2. Use aFetch to create api

Get request:

```ts
// src/api/rest/todo/get-todo.ts
import { aFetchApi } from "../a-fetch-api";

async function getTodo(page: number) {
	return await aFetchApi.get(`/todos/${page}`);
}
```

Post request:

```ts
// src/api/rest/todo/add-todo.ts
import { aFetchApi } from "../a-fetch-api";

type TodoRequest = {
	userId: string;
	title: string;
	text: string;
};

async function addTodo(body: TodoRequest) {
	return await aFetchApi.post(`/todos`, body);
}
```

If necessary, here you can specify the types of body returned `data` by fetch and / or data expected by the API `body`, as well as the types of error body `data` that may be returned with an error:

Get request:

```ts
// src/api/rest/todo/get-todo.ts
import { aFetchApi } from "../a-fetch-api";

type TodoResponse = {
	id: number;
	userId: number;
	title: string;
	text: string;
	completed: boolean;
};

type ErrorCode = "USERNAME_NOT_FOUND" | "INVALID_EMAIL" | "DATABASE_ERROR" | "TOKEN_HAS_EXPIRED";
type ResponseErrorBody = { code: ErrorCode; username: string } | { code: ErrorCode; email: string };

async function getTodo(page: number) {
	return await aFetchApi.get<TodoResponse, ResponseErrorBody>(`/todos/${page}`);
}
```

Post request:

```ts
// src/api/rest/todo/add-todo.ts
import { aFetchApi } from "../a-fetch-api";

type TodoRequest = {
	userId: string;
	title: string;
	text: string;
};

type TodoResponse = {
	id: number;
	userId: number;
	title: string;
	text: string;
	completed: boolean;
};

type ErrorCode = "USERNAME_NOT_FOUND" | "INVALID_EMAIL" | "DATABASE_ERROR" | "TOKEN_HAS_EXPIRED";
type ResponseErrorBody = { code: ErrorCode; username: string } | { code: ErrorCode; email: string };

async function addTodo(body: TodoRequest) {
	return await aFetchApi.post<TodoRequest, TodoResponse, ResponseErrorBody>(`/todos`, body);
}
```

Default types:

```ts
type AFetchRequest = unknown;
type AFetchBody = unknown;
type AFetchErrorBody = unknown;
```

### 3. Processing of requests

```ts
// src/app.ts
async function app() {
	const resp = await getTodo(1);
	if (resp.ok) {
		console.log("resp: ", resp);
		// resp: {
		// 	ok: true,
		// 	data: {
		// 		id: 1,
		// 		userId: 1,
		// 		title: "aFetch",
		// 		test: "Make a library",
		// 		completed: false,
		// 	},
		// };
	} else {
		console.log("resp: ", resp);
		// resp: {
		// 	ok: false,
		// 	status: 404,
		// 	message: 'Can't find username in database',
		// 	data: {
		// 		code: 'USERNAME_NOT_FOUND',
		// 		username: 'amelianceskymusic'
		// 	},
		// };
	}
}

app();
```

### 4. Options

The aFetch function takes the second parameter - options:

```ts
headersInit: HeadersInit;
showConsoleError: boolean;
errorTitle: string;
deepError: boolean;
```

**1. headersInit — setting common headers init**

```ts
// api/rest/a-fetch-api.ts
import { aFetch } from "ameliance-fetch";

const API_URL = "https://todo.com/api";

const headersInit = {
	"X-API-Host": "api.todo.com",
	"X-API-Key": process.env.TODO_API_KEY,
};

const aFetchApi = aFetch(API_URL, { headersInit });
```

**2. showConsoleError — displays errors in the console. If `false`, errors are not printed to the console**

Default value: true

```ts
// api/rest/a-fetch-api.ts
import { aFetch } from "ameliance-fetch";

const API_URL = "https://todo.com/api";

const aFetchApi = aFetch(API_URL, { showConsoleError: false });
```

**3. errorTitle**

Default value: 'A-FETCH ERROR'

```ts
// api/rest/a-fetch-api.ts
import { aFetch } from "ameliance-fetch";

const API_URL = "https://todo.com/api";

const errorTitle = 'AMELIANCESKYMUSIC ERROR;

const aFetchApi = aFetch(API_URL, { errorTitle });
```

```bash
AMELIANCESKYMUSIC ERROR > 404 | Not Found
	at handleAFetchError (C:\app\ameliance-fetch\src\helpers\handle-a-fetch-error.ts:29:32)
	at C:\app\ameliance-fetch\src\common-fetch.ts:57:28
	at Generator.next (<anonymous>)
	at fulfilled (C:\app\ameliance-fetch\src\common-fetch.ts:5:58)
	at processTicksAndRejections (node:internal/process/task_queues:95:5)
```

**4. deepError — show a deep error otherwise a short version**

Default value: true

```ts
// api/rest/a-fetch-api.ts
import { aFetch } from "ameliance-fetch";

const API_URL = "https://todo.com/api";

const aFetchApi = aFetch(API_URL);
```

error in console:

```bash
A-FETCH ERROR > 404 | Not Found
   at handleAFetchError (C:\app\ameliance-fetch\src\helpers\handle-a-fetch-error.ts:29:32)
   at C:\app\ameliance-fetch\src\common-fetch.ts:57:28
   at Generator.next (<anonymous>)
   at fulfilled (C:\app\ameliance-fetch\src\common-fetch.ts:5:58)
   at processTicksAndRejections (node:internal/process/task_queues:95:5)
```

deepError: false

```ts
// api/rest/a-fetch-api.ts
import { aFetch } from "ameliance-fetch";

const API_URL = "https://todo.com/api";

const aFetchApi = aFetch(API_URL, { deepError: false });
```

error in console:

```bash
A-FETCH ERROR > 404 | Not Found
```

## History

```
0.0.1 [2024-04-26]:
   +: init package
```
