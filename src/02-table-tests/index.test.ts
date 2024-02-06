// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },
  { a: 100, b: 10, action: Action.Divide, expected: 10 },
  { a: 'INVALID', b: 'INVALID', action: Action.Add, expected: null },
  { a: 2, b: 2, action: 'INVALID', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should test each case in testCases',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
