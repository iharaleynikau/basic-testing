// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList([1, 2]);

    const expected = {
      value: 1,
      next: { value: 2, next: { value: null, next: null } },
    };
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([1, 2]);

    expect(result).toMatchSnapshot();
  });
});
