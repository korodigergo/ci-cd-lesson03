import { AppError } from "./app-error";

export function format(todo) {
  return `${todo.id} - [${todo.done ? 'x': ' '}] ${todo.title}`;
}

export function formatList(todos) {
  return todos.map(format)
}

function nextId(todos) {
  const ids = todos.map(todo => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function list(store) {
  return store.get(); 
}

export function add(store, params) {
  const [title] = params;
  const todos = store.get()
  const newTodo = {
    title,
    done: false,
    id: nextId(todos)
  }
  const toStore = [...todos, newTodo]
  store.set(toStore)
  return newTodo;
}

export function complete(store, params){
  const id = +params;
  const todos = store.get()
  let changedTodo
  
  for (const todo of todos) {
    if (todo.id === id) {
      changedTodo = todo
      todo.done = true; 
      break;
    }
  }

  store.set(todos)
  return changedTodo;
}

export function findByStatus(store, param) {
  const todos = store.get();
  if (param === "done") {
    return todos.filter((todo) => todo.done === true);
  }
  if (param === "not-done") {
    return todos.filter((todo) => todo.done === false);
  } else {
    throw new AppError(
      `This is not a valid param: "${param}". Try to use "done" or "not-done".`
    );
  }
}