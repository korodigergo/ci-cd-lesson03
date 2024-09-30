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

export function validateCompleteParams(params){
  return params
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