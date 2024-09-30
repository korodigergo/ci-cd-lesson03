import { jest } from "@jest/globals";
import {
  add,
  findById,
  findByTitle,
  format,
  formatList,
  list,
  complete,
  findByStatus,
  updateTitle,
} from "./todo.js";

function createMockStore(data) {
  return {
    get: jest.fn(() => data),
    set: jest.fn(),
  };
}

describe("format", () => {
  it("should format a not done todo", () => {
    const todo = { title: "todo title", id: 1, done: false };
    const expected = "1 - [ ] todo title";

    const current = format(todo);

    expect(current).toStrictEqual(expected);
  });

  it("should format a done todo", () => {
    const todo = { title: "todo title", id: 1, done: true };
    const expected = "1 - [x] todo title";

    const current = format(todo);

    expect(current).toStrictEqual(expected);
  });
});

describe("formatList", () => {
  it("should format a list of todos", () => {
    const todos = [
      { title: "todo title", id: 1, done: true },
      { title: "todo title 2", id: 2, done: false },
    ];
    const expected = ["1 - [x] todo title", "2 - [ ] todo title 2"];

    const current = formatList(todos);

    expect(current).toStrictEqual(expected);
  }),
    it("should return an empty list, if an empty list is given", () => {
      const todos = [];
      const expected = [];

      const current = formatList(todos);

      expect(current).toStrictEqual(expected);
    });
});

describe("list", () => {
  it("should list the todos", () => {
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false },
      { id: 2, title: "Todo 2", done: true },
    ]);
    const expected = [
      { id: 1, title: "Todo 1", done: false },
      { id: 2, title: "Todo 2", done: true },
    ];

    const current = list(mockStore);

    expect(current).toStrictEqual(expected);
  });

  it("should return an empty list, if nothing is stored", () => {
    const mockStore = createMockStore([]);
    const expected = [];

    const current = list(mockStore);

    expect(current).toStrictEqual(expected);
  });
});

describe("add", () => {
  it("should add a new todo to an empty store, done false, id is 1", () => {
    const params = ["New Todo"];
    const mockStore = createMockStore([]);
    const expected = {
      id: 1,
      done: false,
      title: "New Todo",
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([expected]);
  });

  it("should append a new todo to the existing items", () => {
    const params = ["New Todo"];
    const stored = [{ id: 1, title: "Todo 1", done: true }];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 2,
      done: false,
      title: "New Todo",
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([...stored, expected]);
  });

  it("should calculate the id by max id + 1, missing ids in a sequence", () => {
    const params = ["New Todo"];
    const stored = [
      { id: 2, title: "Todo 1", done: true },
      { id: 4, title: "Todo 1", done: true },
    ];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 5,
      done: false,
      title: "New Todo",
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([...stored, expected]);
  });
});

describe("complete", () => {
  it("should update a todo done field to true", () => {
    const params = ["1"];
    const stored = [{ id: 1, title: "Todo 1", done: false }];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 1,
      done: true,
      title: "Todo 1",
    };

    const current = complete(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(current.done).toStrictEqual(expected.done);
  });
});

describe("findByStatus", () => {
  it("should find a existing todo with done status (true)", () => {
    const param = "done";
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: "New Todo",
        labels: [],
      },
      {
        id: 2,
        done: true,
        title: "Todo",
        labels: [],
      },
      {
        id: 3,
        done: true,
        title: "new",
        labels: [],
      },
    ]);
    const expected = [
      {
        id: 2,
        done: true,
        title: "Todo",
        labels: [],
      },
      {
        id: 3,
        done: true,
        title: "new",
        labels: [],
      },
    ];

    const current = findByStatus(mockStore, param);
  });
});

describe("find-by-id", () => {
  it("should list the todo if found it by id", () => {
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false },
    ]);
    const expected = { id: 1, title: "Todo 1", done: false };
    const current = findById(mockStore, 1);

    expect(current).toStrictEqual(expected);
  });

  it("should return undefined if todo list is empty", () => {
    const mockStore = createMockStore([]);
    const expected = undefined;

    const current = findById(mockStore, 1);

    expect(current).toStrictEqual(expected);
  });
});

describe("find-by-title", () => {
  it("should list the todos if found it by title", () => {
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false },
      { id: 2, title: "Todo 2", done: false },
    ]);
    const expected = [
      { id: 1, title: "Todo 1", done: false },
      { id: 2, title: "Todo 2", done: false },
    ];

    const current = findByTitle(mockStore, ["Todo"]);

    expect(current).toStrictEqual(expected);
  });

  it("should return empty array if todo list is empty", () => {
    const mockStore = createMockStore([]);
    const expected = [];

    const current = findByTitle(mockStore, ["Todo"]);

    expect(current).toStrictEqual(expected);
  });
});

it("should find a existing todo with not-done status (false)", () => {
  const param = "not-done";
  const mockStore = createMockStore([
    {
      id: 1,
      done: false,
      title: "New Todo",
      labels: [],
    },
    {
      id: 2,
      done: true,
      title: "Todo",
      labels: [],
    },
    {
      id: 3,
      done: true,
      title: "new",
      labels: [],
    },
  ]);
  const expected = [
    {
      id: 1,
      done: false,
      title: "New Todo",
      labels: [],
    },
  ];

  const current = findByStatus(mockStore, param);

  expect(current).toStrictEqual(expected);
});

it("should throw when param is not valid", () => {
  const params = "do";
  const mockStore = createMockStore([]);

  expect(() => findByStatus(mockStore, params)).toThrow(
    `This is not a valid param: "do". Try to use "done" or "not-done".`
  );
});


describe("update-title", () => {
  it("should list the changed todo if found it by ID", () => {
    const mockStore = createMockStore([
      { id: 1, title: "Todo 1", done: false },
      { id: 2, title: "Todo 2", done: false },
    ]);
    const expected = { id: 1, title: "newName", done: false };

    const current = updateTitle(mockStore, ["newName", '1']);

    expect(current).toStrictEqual(expected);
  });

  it("should return empty array if todo list is empty", () => {
    const mockStore = createMockStore([]);
    const expected = undefined;

    const current = updateTitle(mockStore, ["Todo", '1']);

    expect(current).toStrictEqual(expected);
  });
  
  it("should return empty array if todo list is empty", () => {
    const mockStore = createMockStore([]);
    const expected = undefined;

    const current = updateTitle(mockStore, ["Todo", '1']);

    expect(current).toStrictEqual(expected);
  });
});