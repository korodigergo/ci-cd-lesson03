import { list, formatList, format, add, complete, findById, findByTitle } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";

import { validateAddParams, validatedIdParam, validateCompleteParams, validateFindByIdParams, validateFindByTitleParams } from "./validate.js";

export function createApp(todoStore, args) {
  const [, , command, ...params] = args;
  let validated;

  switch (command) {
    case "list":
      const todos = list(todoStore);
      display([...formatList(todos), `You have ${todos.length} todos.`]);
      break;

    case "add":
      validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(["New Todo added:", format(added)]);
      break;

    case "complete":
      validated = validatedIdParam(params);
      const completed = complete(todoStore, validated);
      display(["Todo set to completed:", format(completed)]);
      break;
    case "find-by-status":
      const foundByStatus = findByStatus(
        todoStore,
        validateStatusParam(params)
      );
      display(["Found Todo:", ...formatList(foundByStatus)]);
      break;

    case "find-by-id":
      validated = validateFindByIdParams(todoStore, params);
      const findId = findById(todoStore, validated);
      display(["The searched ID:", format(findId)]);
      break;

    case "find-by-title":
      validated = validateFindByTitleParams(params);
      const findTitle = findByTitle(todoStore, validated);
      display(["The searched todos based on title:", ...formatList(findTitle)]);
      break;

    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
