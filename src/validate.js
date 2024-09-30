import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if(params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if(typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}

export function validatedIdParams(todoStore, params) {
  if (isNaN(params)) {
    throw new AppError("Given parameter is not a number.");
  }
  if (params <= 0) {
    throw new AppError("Parameter should be bigger than 0.");
  }
  const listOfIds = todoStore.get().map((todo) => +todo.id);
  if (!listOfIds.includes(params)) {
    throw new AppError("Given number is not a valid Id.");
  }
}

export function validateFindByIdParams(store, params) {
  if(params.length !== 1) {
    throw new AppError('Give an ID, which is a numeric value.');
  }
  const [id] = params;
  const todoList = store.get();
  const foundTodos = todoList.filter((todo) => todo.id === id)
  if(foundTodos.length === 0){
    throw new AppError('No todo found with that ID.');
  }
  return params;
}

export function validateStatusParams(params) {
  const [title] = params;
  if (params.length <= 0) {
    throw new AppError("Give a status.");
  }
  if (params.length !== 1) {
    throw new AppError("Give only one status. Do not use space.");
  }
  if (title !== "done" && title !== "not-done") {
    throw new AppError(`This is not a valid param: "${title}". Try to use "done" or "not-done".`);
  }
  return title;
}
export function validateFindByTitleParams(store, params) {
  if(params.length !== 1) {
    throw new AppError('Give a title, and no more parameters.');
  }
  const [title] = params;
  if(typeof title !== 'string' || title?.length < 3) {
    throw new AppError('The title should be a string and at least 3 characters long.')
  }
  const todoList = store.get();
  const foundTodos = todoList.filter((todo) => todo.title.toLowerCase().includes(title.toLowerCase()))
  if(foundTodos.length === 0){
    throw new AppError('No todo found with that title.');
  }
  return params;
}