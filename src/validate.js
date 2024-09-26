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

export function validateFindByIdParams(params) {
  if(params.length !== 1) {
    throw new AppError('Give an ID, which is a numeric value.');
  }
  const [id] = params;
  if( id?.length === 0) {
    throw new AppError('The ID should be a single number')
  }
  return params;
}