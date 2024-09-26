import { list, formatList, format, add, complete } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import { validateAddParams, validateCompleteParams } from "./validate.js";

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
      validated = validateCompleteParams(params);
      const completed = complete(todoStore, validated);
      display(["Todo complition changed:", format(completed)]);
      break;

    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
