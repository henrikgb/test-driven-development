import {User, UserType, fetchUser} from './user';

describe('User', () => {
  let user: UserType;
  let name: string;
  let email: string;

  beforeEach(() => {
    // Arrange
    user = User('Jane Doe', 'jane@example.com');

    // Act
    name = user.getName();
    email = user.getEmail();  
  });

  it('Creates Users correctly', () => {
    // Assert
    expect(name).toBe('Jane Doe');
    expect(email).toBe('jane@example.com');
    expect(user).toHaveProperty('getName');
    expect(user).toHaveProperty('getEmail');
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
      expect(() => User('Invalid', 'invalid-email')).toThrow('Invalid email');
    });
  });
  
  describe("fetchUser", () => {
    it('fetches data asynchronously', async () => {
      // Arrange
      const userData = await fetchUser();
      const user = User(userData.name, userData.email);

      // Assert
      expect(user.getName()).toBe('John Doe');
      expect(user.getEmail()).toBe('john@example.com');
    });
  });
});