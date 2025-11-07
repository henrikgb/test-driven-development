export class User {
  private name: string;
  private email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;

    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email');
    }
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  private isValidEmail(email: string): boolean {
    // Simple email validation
    return /\S+@\S+\.\S+/.test(email);
  }
}

// Function to fetch user data
export const fetchUser = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new User('John Doe', 'john@example.com'));
    }, 1000);
  });
};