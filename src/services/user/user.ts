export type UserType = {
  name: string;
  email: string;
  getName: () => string;
  getEmail: () => string;
}

const isValidEmail = (email: string): boolean => {
  // Simple email validation - checks for presence of "@" and "."
  return /\S+@\S+\.\S+/.test(email);
};

export const User = (name: string, email: string): UserType => {
  if (!isValidEmail(email)) {
    throw new Error('Invalid email');
  }

  return {
    name,
    email,
    getName: () => name,
    getEmail: () => email,
  };
};

// Function to fetch user data
export const fetchUser = (): Promise<UserType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(User('John Doe', 'john@example.com'));
    }, 1000);
  });
};