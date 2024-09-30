import { validateAddParams, validateFindByIdParams, validateFindByTitleParams } from "./validate";
import { jest } from '@jest/globals';

function createMockStore(data) {
  return {
    get: jest.fn(() => data),
    set: jest.fn()
  }
}

describe('validateAddParams', () => {
  it('should pass and return with the original params with single string', () => {
    const params = ['Todo'];
    const expected = ['Todo'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should pass and return with the original params with single string separated with spaces', () => {
    const params = ['Todo Item'];
    const expected = ['Todo Item'];
    
    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple strings given', () => {
    const params = ['Todo Item', 'Other string'];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when no params given.', () => {
    const params = [];
    
    expect(() => validateAddParams(params))
      .toThrow('Give a title as the only parameter in parenthesis.');
  })

  it('should throw when the param is not a string', () => {
    const params = [5];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })

  it('should throw when the param is a zero length string', () => {
    const params = [''];
    
    expect(() => validateAddParams(params))
      .toThrow('The title must be a non zero length string.');
  })


})

describe('validateFindByIdParams', () => {
  it('should pass and return with the original params with ID', () => {
    const params = [1];
    const expected = [1];
    const mockStore = createMockStore([
      { title: 'todo title', id: 1, done: true },
      { title: 'todo title 2', id: 2, done: false }
    ]);
    const current = validateFindByIdParams(mockStore, params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple ID-s given', () => {
    const params = [1, 2];
    const mockStore = createMockStore([
      { title: 'todo title', id: 1, done: true },
      { title: 'todo title 2', id: 2, done: false }
    ]);
    expect(() => validateFindByIdParams(mockStore, params))
      .toThrow('Give an ID, which is a numeric value.');
  })

  it('should throw when no todo found with the given ID', () => {
    const params = [3];
    const mockStore = createMockStore([
      { title: 'todo title', id: 1, done: true },
      { title: 'todo title 2', id: 2, done: false }
    ]);
    expect(() => validateFindByIdParams(mockStore, params))
      .toThrow('No todo found with that ID.');
  })
})

describe('validateFindByTitleParams', () => {
  it('should pass and return with the original params with title', () => {
    const params = ['eat'];
    const expected = ['eat'];
    const mockStore = createMockStore([
      { title: 'eat', id: 1, done: true },
      { title: 'eating', id: 2, done: false }
    ]);
    const current = validateFindByTitleParams(mockStore, params);

    expect(current).toStrictEqual(expected);
  })

  it('should throw when multiple titles given', () => {
    const params = ['eat', 'drink'];
    const mockStore = createMockStore([
      { title: 'todo title', id: 1, done: true },
      { title: 'todo title 2', id: 2, done: false }
    ]);
    expect(() => validateFindByTitleParams(mockStore, params))
      .toThrow('Give a title, and no more parameters.');
  })

  it('should throw when the input is shorter than 3 characters', () => {
    const params = ["ea"];
    const mockStore = createMockStore([
      { title: 'todo title', id: 1, done: true },
      { title: 'todo title 2', id: 2, done: false }
    ]);
    expect(() => validateFindByTitleParams(mockStore, params))
      .toThrow('The title should be a string and at least 3 characters long.');
  })
  
  it('should throw when no todo found with the given title', () => {
    const params = ["eat"];
    const mockStore = createMockStore([
      { title: 'todo title', id: 1, done: true },
      { title: 'todo title 2', id: 2, done: false }
    ]);
    expect(() => validateFindByTitleParams(mockStore, params))
      .toThrow('No todo found with that title.');
  })
})