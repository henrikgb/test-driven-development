# Test Driven Development (TDD) - Learning Repository

This repository is solely intended to get familiar with various concepts of Test Driven Development. The files are examples that utilize the concept of test driven development.

## Table of Contents
- [What is Test Driven Development?](#what-is-test-driven-development)
- [Red-Green-Refactor Cycle](#red-green-refactor-cycle)
- [AAA Pattern](#aaa-pattern)
- [Test Structure and Organization](#test-structure-and-organization)
- [Jest Matchers](#jest-matchers)
- [Advanced Testing Techniques](#advanced-testing-techniques)
- [Test Doubles](#test-doubles)
- [Project Examples](#project-examples)

## What is Test Driven Development?

Test Driven Development (TDD) is a software development approach where tests are written before the actual code. This ensures that your code is testable, focused, and meets requirements from the start.

## Red-Green-Refactor Cycle

The TDD workflow follows three distinct phases:

### 🔴 RED PHASE
Begin by writing a test that fails. This establishes what you want your code to accomplish before writing any implementation.

### 🟢 GREEN PHASE
Develop minimal code sufficient to pass the test. Focus on making the test pass, not on writing perfect code.

### 🔵 REFACTOR PHASE
Refactor to improve test readability, test edge cases, enhance your code and maintain passing tests. Clean up the code, enhancing its quality while maintaining its functionality and ensuring all tests remain passing.

## AAA Pattern

All test files in this repository follow the **AAA (Arrange - Act - Assert)** pattern, which is essential for writing well-structured tests:

- **Arrange**: Set up the context for your test, which may include initializing objects or preparing data
- **Act**: Execute the function or method that you are testing, triggering the behavior you're checking
- **Assert**: Verify that the results of the act step are as expected, ensuring the test accurately measures the code's behavior

Applying the AAA pattern ensures your tests are not only readable but also maintainable, providing clear separation between setup, execution, and verification.

Example from `math.test.ts`:
```typescript
it("sum(2, 3) should return 5", () => {
    // Arrange
    const a = 2;
    const b = 3;
    
    // Act 
    const result = sum(a, b);

    // Assert
    expect(result).toBe(5);
});
```

## Test Structure and Organization

### `it` vs `test`
These are functionally identical but differ in style:

- **`it`**: Tends to be used when writing tests in a behavior-driven development (BDD) style, where tests read more like sentences (e.g., `it('does something')`)
- **`test`**: Preferred when using a more straightforward language, as it's a direct term matching the action of performing a test

### Using `describe` for Nesting and Grouping
The `describe` function groups related tests together, improving organization and readability.

**Example**: `user.test.ts` demonstrates nested `describe` blocks:
```typescript
describe('User', () => {
  // Main user tests
  
  describe('User email tests', () => {
    // Email-specific tests
  });
  
  describe("fetchUser", () => {
    // Async tests
  });
});
```

### Setup with `beforeEach`
The `beforeEach` function runs a specific block of code before each test in a `describe` block. This ensures consistent setup, eliminating repetitive code and maintaining test independence.

**Example**: `userManager.test.ts`
```typescript
beforeEach(() => {
    fakeLogger = createFakeLogger();
    userManager = createUserManager(fakeLogger);  
});
```

### Using `it.each` for Parameterized Tests
Avoid repeating multiple `it({})` tests that look similar by using `it.each` for data-driven tests.

**Example**: `math.test.ts`
```typescript
it.each([
    [2, 3, 5],
    [-2, -3, -5],
    [0, 5, 5],
    [-2, 3, 1],
])("sum(%i, %i) should return %i", (a, b, expected) => {
    const result = sum(a, b);
    expect(result).toBe(expected);
});
```

## Jest Matchers

Jest provides various matchers for assertions:

- **`toBe`**: Checks strict equality (uses `===`)
- **`toEqual`**: Compares the equality of objects or arrays by checking their contents rather than reference or strict identity
- **`toBeInstanceOf`**: Verifies that an object is an instance of a class
- **`toContain`**: Ensures an item is in an array or a substring is present in a string
- **`toThrow`**: Verifies that code throws an exception

## Advanced Testing Techniques

### Async Tests
To handle asynchronous code, Jest uses `async` functions combined with `await`. Tests can return promises or use the `done` callback to indicate completion.

**Example**: `user.test.ts`
```typescript
it('fetches data asynchronously', async () => {
    const userData = await fetchUser();
    const user = User(userData.name, userData.email);
    
    expect(user.getName()).toBe('John Doe');
});
```

### Testing Code with Exceptions
Jest's `.toThrow` matcher is used for testing code that should throw an exception. It can be combined with a specific error message or class.

**Example**: `user.test.ts`
```typescript
test('invalid email throws an error', () => {
    expect(() => User('Invalid', 'invalid-email')).toThrow('Invalid email');
});
```

## Test Doubles

### Understanding Dependencies
Dependencies are components or services that your software relies on to function, like databases, logging systems, external APIs, etc. When testing, these dependencies can introduce variability, making it hard to test your code's logic reliably. 

**Test doubles** allow you to replace these real dependencies with simpler objects that mimic their behavior, ensuring the tests focus solely on your code's logic without interference from external systems.

### Five Kinds of Test Doubles

#### 1. **Dummies**
Simple placeholders used to fulfill parameter requirements. They have no logic or behavior beyond satisfying an interface or method signature.

**Example**: `emailService.test.ts`
```typescript
const dummyLogger = {
    log(_message: string, _severity: 'info' | 'warn' | 'error'): void {}
};
const dummyEmailSender = {
    send(_to: string, _subject: string, _body: string): void {}
};
```

These dummies satisfy the interface requirements but don't perform any real operations.

#### 2. **Stubs**
Provides predefined responses to specific calls during testing, allowing you to control the behavior of certain dependencies without implementing full functionality.

**Example**: `weatherAlertService.test.ts`
```typescript
function createWeatherServiceStub() {
    let temperature: number = 20;
    let conditions: Condition = "sunny";

    return {
        setWeather(temp: number, cond: Condition) {
            temperature = temp;
            conditions = cond;
        },
        async getCurrentWeather(_location: string): Promise<WeatherData> {
            return { temperature, conditions };
        }
    };
}
```

The stub allows you to control what weather data is returned, isolating the alert logic from the actual weather service.

#### 3. **Spies**
Tracks information about interactions with dependencies, such as method calls and arguments, enabling you to verify behaviors indirectly. Spies record how they were called without affecting the actual behavior of the dependency.

Spies are created using `jest.spyOn()` and can verify:
- If a function was called
- How many times it was called
- With what arguments it was called
- Access individual call details through `spy.mock.calls`

**Example**: `notificationService.test.ts`
```typescript
describe('NotificationService', () => {
    let sender: NotificationSender;
    let notificationService: NotificationService;
    let sendSpy: jest.SpyInstance;

    beforeEach(() => {
        sender = createRealNotificationSender();
        notificationService = createNotificationService(sender);
        
        // Create a spy on the send method
        sendSpy = jest.spyOn(sender, 'send');
    });

    afterEach(() => {
        // Clear and reset the spy
        sendSpy.mockClear();
    });

    it('should send notification with low priority for short messages', async () => {
        // Act
        await notificationService.notifyUser('user1', 'Hi!');

        // Assert
        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
            userId: 'user1',
            message: 'Hi!',
            priority: 'low'
        });
    });
    
    it('should send notification with high priority for urgent messages', async () => {
        // Act
        await notificationService.notifyUser('user1', 'This is an URGENT message!');

        // Assert
        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
            userId: 'user1',
            message: 'This is an URGENT message!',
            priority: 'high'
        });
    });
    
    it('should send notification with medium priority for regular messages', async () => {
        // Act
        await notificationService.notifyUser('user1', 'This is a regular message');

        // Assert
        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
            userId: 'user1',
            message: 'This is a regular message',
            priority: 'medium'
        });
    });
    
    it('should send notifications to multiple users', async () => {
        // Act
        const incomingMessages = [
            { userId: 'user1', message: 'Hello everyone!', priority: 'low' },
            { userId: 'user2', message: 'Hello everyone!', priority: 'low' },
            { userId: 'user3', message: 'Hello everyone!', priority: 'low' }
        ]
        
        await notificationService.notifyMultipleUsers(incomingMessages);
        
        // Assert
        expect(sendSpy).toHaveBeenCalledTimes(3);
        expect(sendSpy.mock.calls[0][0]).toEqual(
            { userId: 'user1', message: 'Hello everyone!', priority: 'low' }
        );
        expect(sendSpy.mock.calls[1][0]).toEqual(
            { userId: 'user2', message: 'Hello everyone!', priority: 'low' }
        );
        expect(sendSpy.mock.calls[2][0]).toEqual(
            { userId: 'user3', message: 'Hello everyone!', priority: 'low' }
        );
        
    });
});
```

**Key Benefits**:
- Spies allow you to use **actual dependencies** within your tests while still verifying how they were called
- Useful for integration testing scenarios where you want real behavior but need to verify interactions
- Can verify both the number of calls and specific arguments passed to each call

#### 4. **Mocks**
Mocks are powerful test doubles that combine the capabilities of both stubs and spies. They fully simulate dependencies by creating controlled substitutes, allowing you to:
- Control what values or responses a dependency returns (like stubs)
- Verify how the dependency was called (like spies)
- Test code in isolation without relying on unpredictable external systems

**Why Use Mocks?**

Mocks are essential when you need to test your code independently of systems you don't control. For example, when testing a service that depends on an external API, you don't want your tests to fail because the API is down, slow, or returns unexpected data. Mocks provide a controlled environment where you can simulate various conditions and responses.

**Key Difference from Spies**: Unlike spies that observe the behavior of real implementations, mocks completely replace the dependency. The actual code or functionality isn't executed at all—mocks provide simulated behavior instead.

**Mocking with Jest**

Jest provides powerful mocking capabilities through `jest.mock()` which replaces entire modules with mock versions. All functions in the mocked module become Jest mock functions that you can control and verify.

**Example**: `pricingService.test.ts`

```typescript
import { convertPrice, calculateBulkPrices } from './pricingService';
import { getExchangeRate } from './exchangeRateService';

// Mock the entire ExchangeRateService module
jest.mock('./exchangeRateService');

describe('PricingService', () => {
    let mockGetExchangeRate: jest.MockedFunction<typeof getExchangeRate>;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        
        // Get reference to the mocked function
        mockGetExchangeRate = getExchangeRate as jest.MockedFunction<typeof getExchangeRate>;
    });

    it('should convert prices using exchange rate', async () => {
        // Arrange
        mockGetExchangeRate.mockResolvedValue(1.5);

        // Act
        const result = await convertPrice(100, 'USD', 'EUR');

        // Assert
        expect(mockGetExchangeRate).toHaveBeenCalledWith('USD', 'EUR');
        expect(result).toBe(150.00);
    });
    
    it('should return same amount when currencies are identical', async () => {
        // Arrange
        mockGetExchangeRate.mockResolvedValue(1.0);

        // Act
        const result = await convertPrice(100, 'USD', 'USD');

        // Assert
        expect(mockGetExchangeRate).not.toHaveBeenCalled();
        expect(result).toBe(100);
    });
});
```

In this example:
- `jest.mock('./exchangeRateService')` replaces the entire module with a mocked version
- `mockGetExchangeRate.mockResolvedValue(1.5)` controls what the function returns
- We can verify the function was called with specific arguments using `toHaveBeenCalledWith()`
- The real API call is never made—the test runs in complete isolation

**Advanced Mocking Techniques**

Mocks can simulate complex interactions using `mockImplementation()` to return different values based on input:

```typescript
it('should handle different exchange rates', async () => {
    // Arrange
    mockGetExchangeRate.mockImplementation(async (from, to) => {
        if (to === 'EUR') return 0.85;
        if (to === 'GBP') return 0.73;
        return 1.0;
    });

    // Act
    const eurResult = await convertPrice(100, 'USD', 'EUR');
    const gbpResult = await convertPrice(100, 'USD', 'GBP');

    // Assert
    expect(eurResult).toBe(85.00);
    expect(gbpResult).toBe(73.00);
    expect(mockGetExchangeRate).toHaveBeenCalledTimes(2);
});
```

**Optimizing Multiple Calls**

When testing functions that make multiple conversions, you can verify that the mock optimizes by caching or reusing the exchange rate:

```typescript
it('should calculate bulk prices correctly', async () => {
    // Arrange
    mockGetExchangeRate.mockResolvedValue(1.5);

    // Act
    const result = await calculateBulkPrices([100, 200, 300], 'USD', 'EUR');

    // Assert
    expect(mockGetExchangeRate).toHaveBeenCalledTimes(1); // Only called once!
    expect(mockGetExchangeRate).toHaveBeenCalledWith('USD', 'EUR');
    expect(result).toEqual([150.00, 300.00, 450.00]);
});
```

**Benefits of Mocking**:
- **Reliability**: Tests don't depend on external services being available
- **Speed**: No network calls means faster test execution
- **Control**: You can simulate edge cases, errors, and specific scenarios
- **Isolation**: Tests focus purely on your code's logic, not external dependencies
- **Predictability**: Same inputs always produce same outputs

#### 5. **Fakes**
Fakes are working implementations that simulate real components but in a simpler, more controlled way. Unlike dummies (no behavior) or stubs (predefined responses), fakes have actual working logic that mimics the real thing. They're particularly useful for replacing complex dependencies like databases, file systems, or external APIs.

**Key Characteristics of Fakes**:
- Have real, working implementations
- Mimic the behavior of the real component
- Typically simpler than production versions (e.g., in-memory instead of actual database)
- Allow state verification after operations
- Useful for avoiding uncertainty or delays from real implementations
- Can be complex to build because they need to accurately simulate real behavior

**When to Use Fakes**:
- Testing code that interacts with databases
- Avoiding network calls to external services
- When you need to verify state changes after operations
- Testing complex workflows that depend on multiple operations
- When stubs are too simple and mocks feel like over-engineering

**Example 1: Fake Logger** (`userManager.test.ts`)
```typescript
function createFakeLogger(): FakeLogger {
    const logs: string[] = [];
    return {
        logs,
        log(message: string): void {
            logs.push(message);
        }
    };
}

// Using the fake logger in tests
it('should log when adding a user', () => {
    // Arrange
    const fakeLogger = createFakeLogger();
    const userManager = createUserManager(fakeLogger);
    
    // Act
    userManager.addUser('Alice');
    
    // Assert
    expect(fakeLogger.logs).toContain('User added: Alice');
});
```

The fake logger has working logic—it actually stores log messages in an array—but in a simpler way than a production logger that might write to files or external logging services.

**Example 2: In-Memory Repository** (`userService.test.ts`)

A more complex and practical example is the `InMemoryUserRepository`, which serves as a complete replacement for a database repository:

```typescript
export function createInMemoryUserRepository(): UserRepository & { clear: () => void } {
    let users: Map<string, User> = new Map();
    let currentId = 1;

    const generateId = (): string => {
        return (currentId++).toString();
    };

    return {
        async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
            const user: User = {
                id: generateId(),
                ...userData,
                createdAt: new Date()
            };
            users.set(user.id, user);
            return { ...user };
        },

        async findById(id: string): Promise<User | null> {
            const user = users.get(id);
            return user ? { ...user } : null;
        },

        async findByEmail(email: string): Promise<User | null> {
            const user = Array.from(users.values()).find(u => u.email === email);
            return user ? { ...user } : null;
        },

        async update(id: string, data: Partial<User>): Promise<User | null> {
            const existing = users.get(id);
            if (!existing) {
                return null;
            }

            const updated = {
                ...existing,
                ...data,
                id: existing.id,
                createdAt: existing.createdAt
            };
            users.set(id, updated);
            return { ...updated };
        },

        async delete(id: string): Promise<boolean> {
            return users.delete(id);
        },

        async findAll(): Promise<User[]> {
            return Array.from(users.values()).map(user => ({ ...user }));
        },

        // Helper method for testing - ensures data isolation between tests
        clear(): void {
            users.clear();
            currentId = 1;
        }
    };
}
```

**Key Features of this Fake**:
- **Full Implementation**: Implements all methods of the `UserRepository` interface
- **In-Memory Storage**: Uses a `Map` instead of an actual database
- **ID Generation**: Simulates auto-incrementing IDs like a real database
- **Data Isolation**: The `clear()` method ensures tests don't interfere with each other
- **Realistic Behavior**: Returns copies of objects to prevent unintended mutations
- **Type Safety**: Properly typed to match the real repository interface

**Using the Fake Repository in Tests**:

```typescript
describe('UserService', () => {
    let userRepository: ReturnType<typeof createInMemoryUserRepository>;

    beforeEach(() => {
        userRepository = createInMemoryUserRepository();
    });

    afterEach(() => {
        userRepository.clear(); // Clean up between tests
    });

    it('should create a new user successfully', async () => {
        // Act
        const user = await registerUser(userRepository, 'test@example.com', 'Test User');

        // Assert - Verify state of the fake repository
        expect(user.email).toEqual('test@example.com');
        expect(user.name).toBe('Test User');
        expect(user.id).toBeDefined();
        expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('should not allow duplicate emails', async () => {
        // Arrange
        await registerUser(userRepository, 'test@example.com', 'Test User');

        // Act & Assert
        await expect(
            registerUser(userRepository, 'test@example.com', 'Another User')
        ).rejects.toThrow('User with this email already exists');
    });

    it('should update user name successfully', async () => {
        // Arrange
        const user = await registerUser(userRepository, 'test@example.com', 'Test User');

        // Act
        const updated = await updateUserName(userRepository, user.id, 'New Name');

        // Assert - Verify the state changed correctly
        expect(updated.name).toBe('New Name');
        expect(updated.email).toBe('test@example.com');
        expect(updated.id).toBe(user.id);
    });

    it('should delete user successfully', async () => {
        // Arrange
        const user = await registerUser(userRepository, 'test@example.com', 'Test User');

        // Act
        const result = await deactivateUser(userRepository, user.id);

        // Assert - Verify state after deletion
        expect(result).toBe(true);
        const found = await userRepository.findById(user.id);
        expect(found).toBeNull();
    });
});
```

**Benefits of Using Fakes**:
1. **No External Dependencies**: Tests run without needing a real database
2. **Speed**: In-memory operations are much faster than database queries
3. **Predictability**: Complete control over data and state
4. **State Verification**: Can verify the state after operations (e.g., checking if a user was actually deleted)
5. **Data Isolation**: Each test starts with a clean slate using `clear()`
6. **Realistic Testing**: Tests the actual interaction patterns with a repository
7. **Easy Setup**: No database configuration or migrations needed for tests

**Fakes vs Other Test Doubles**:
- **Fakes vs Dummies**: Dummies have no behavior; fakes have working implementations
- **Fakes vs Stubs**: Stubs return predefined responses; fakes compute responses based on state
- **Fakes vs Mocks**: Mocks focus on verifying interactions; fakes allow state verification
- **Fakes vs Spies**: Spies wrap real implementations; fakes are simplified implementations

## Project Examples

### Basic Testing
- **`math.ts` / `math.test.ts`**: Simple unit tests demonstrating the AAA pattern and `it.each` for parameterized tests
- **`cart.ts` / `cart.test.ts`**: Testing business logic with parameterized tests

### Testing with Dummies
- **`emailService.ts` / `emailService.test.ts`**: Using dummy objects to satisfy interface requirements without real implementation

### Testing with Fakes
- **`userManager.ts` / `userManager.test.ts`**: Using a fake logger to verify logging behavior with working test logic
- **`userService.ts` / `userService.test.ts` / `inMemoryUserRepository.ts`**: Comprehensive example of using an in-memory fake repository to test user management operations, demonstrating state verification, data isolation, and realistic database simulation

### Testing with Stubs
- **`weatherAlertService.ts` / `weatherAlertService.test.ts`**: Using stubs to control external service responses and test different scenarios

### Testing with Spies
- **`notificationService.ts` / `notificationService.test.ts`**: Using spies to verify method calls and interactions with real dependencies, including testing multiple calls with `spy.mock.calls`

### Testing with Mocks
- **`pricingService.ts` / `pricingService.test.ts`**: Using Jest mocks to completely replace external dependencies (exchange rate API), control return values, simulate different scenarios, and verify interactions in complete isolation

### Async Testing and Exception Handling
- **`user.ts` / `user.test.ts`**: Demonstrates async/await testing, exception testing with `toThrow`, and nested `describe` blocks

## Running Tests

```bash
npm test
```

To run tests in watch mode:
```bash
npm test -- --watch
```

To run tests with coverage:
```bash
npm test -- --coverage
```

## Best Practices Demonstrated

1. **Write tests first** (Red-Green-Refactor)
2. **Use the AAA pattern** for clear test structure
3. **Group related tests** with `describe` blocks
4. **Reduce duplication** with `beforeEach` and `it.each`
5. **Isolate dependencies** using appropriate test doubles
6. **Test edge cases** including error conditions
7. **Test asynchronous code** properly with async/await
8. **Use meaningful test descriptions** that explain what is being tested

---

Happy Testing! 🧪
