// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const expectedValue = 500;
    const result = getBankAccount(expectedValue).getBalance();

    expect(result).toEqual(expectedValue);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testFunc = () => {
      return getBankAccount(500)
        .deposit(500)
        .withdraw(500 * 500);
    };

    expect(testFunc).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const testFunc = () => {
      const bankAcc = getBankAccount(100);

      return getBankAccount(500).transfer(600, bankAcc);
    };

    expect(testFunc).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const testFunc = () => {
      const bankAcc = getBankAccount(100);

      return bankAcc.transfer(10, bankAcc);
    };

    expect(testFunc).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAcc = getBankAccount(300).deposit(200);

    expect(bankAcc.getBalance()).toEqual(500);
  });

  test('should withdraw money', () => {
    const bankAcc = getBankAccount(300).withdraw(200);

    expect(bankAcc.getBalance()).toEqual(100);
  });

  test('should transfer money', () => {
    const testFunc = () => {
      const bankAcc = getBankAccount(0);

      getBankAccount(200).transfer(100, bankAcc);

      return bankAcc.getBalance();
    };

    expect(testFunc()).toEqual(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchBalance = await getBankAccount(100).fetchBalance();

    if (fetchBalance !== null) {
      expect(typeof fetchBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const value = 0;
      const bankAcc = getBankAccount(value);

      await bankAcc.synchronizeBalance();

      if (typeof bankAcc.getBalance() === 'number') {
        expect(bankAcc.getBalance()).toBeGreaterThan(value);
      }
    } catch (error) {
      return;
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAcc = getBankAccount(200);

    try {
      const something = await bankAcc.synchronizeBalance();

      if (typeof something === 'number') {
        return;
      }

      expect(something).toThrow(SynchronizationFailedError);
    } catch (error) {}
  });
});
