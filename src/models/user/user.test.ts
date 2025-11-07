import {User, fetchUser} from './user';

describe('User', () => {
  let user: User;
  let name: string;
  let email: string;

  beforeEach(() => {
    // Arrange
    user = new User('Jane Doe', 'jane@example.com');

    // Act
    name = user.getName();
    email = user.getEmail();  
  });

  it('Creates Users correctly', () => {
    // Assert
    expect(name).toBe('Jane Doe');
    expect(email).toBe('jane@example.com');
    expect(user).toBeInstanceOf(User);
  });

  describe('User email tests', () => {
    test('getEmail returns correct email', () => {
      // Assert
      expect(email).toBe('jane@example.com');
    });

    test('email contains @ symbol', () => {
      // Assert
      expect(email).toContain('@');
    });

    test('invalid email throws an error', () => {
      // Assert
      expect(() => new User('Invalid', 'invalid-email')).toThrow('Invalid email');
    });
  });
  
  describe("fetchUser", () => {
    it('fetches data asynchronously', async () => {
      // Arrange
      const user = await fetchUser();

      // Assert
      expect(user).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  });
});