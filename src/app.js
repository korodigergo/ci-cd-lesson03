import { list, formatList, format, add, complete } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import { validateAddParams, validatedIdParam} from "./validate.js";

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

    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
