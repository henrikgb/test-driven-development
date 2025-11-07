import {User, fetchUser} from './user';

describe('User', () => {
  let user: User;

  // Setup - runs before each test
  beforeEach(() => {
    user = new User('Jane Doe', 'jane@example.com');
  });

  it('Creates Users correctly', () => {
    expect(user.getName()).toBe('Jane Doe');
    expect(user.getEmail()).toBe('jane@example.com');
    expect(user).toBeInstanceOf(User);
  });

  describe('User email tests', () => {
    test('getEmail returns correct email', () => {
      expect(user.getEmail()).toBe('jane@example.com');
    });

    test('email contains @ symbol', () => {
      expect(user.getEmail()).toContain('@');
    });
  });
  
  test('invalid email throws an error', () => {
    expect(() => {
      new User('Invalid', 'invalid-email');
    }).toThrow('Invalid email');
  });
  
  describe("fetchUser", () => {
    it('fetches data asynchronously', async () => {
      const user = await fetchUser();
      expect(user).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  });
});