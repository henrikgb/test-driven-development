import { registerUser, updateUserName, deactivateUser } from './userService';
import { createInMemoryUserRepository } from './inMemoryUserRepository';

describe('UserService', () => {
    let userRepository: ReturnType<typeof createInMemoryUserRepository>;

    beforeEach(() => {
        userRepository = createInMemoryUserRepository();
    });

    afterEach(() => {
        userRepository.clear();
    });

    describe('registerUser', () => {
        it('should create a new user successfully', async () => {
            // Act
            const user = await registerUser(userRepository, 'test@example.com', 'Test User');

            // Assert
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
    });

    describe('updateUserName', () => {
        it('should update user name successfully', async () => {
            // Arrange
            const user = await registerUser(userRepository, 'test@example.com', 'Test User');

            // Act
            const updated = await updateUserName(userRepository, user.id, 'New Name');

            // Assert
            expect(updated.name).toBe('New Name');
            expect(updated.email).toBe('test@example.com'); // Other fields unchanged
            expect(updated.id).toBe(user.id);
        });
        
        it('should throw error when updating non-existent user', async () => {
            // Act, Assert
            await expect(
                updateUserName(userRepository, '999', 'New Name')
            ).rejects.toThrow('User not found');
        });
    });
    
    describe('deactivateUser', () => {
        it('should delete user successfully', async () => {
            // Arrange
            const user = await registerUser(userRepository, 'test@example.com', 'Test User');

            // Act
            const result = await deactivateUser(userRepository, user.id);

            // Assert
            expect(result).toBe(true);
            const found = await userRepository.findById(user.id);
            expect(found).toBeNull();
        });
        
        it('should throw error when deactivating non-existent user', async () => {
            // Act, Assert
            // TODO: Expect userService.deactivateUser('999') to throw 'User not found'
            await expect(deactivateUser(userRepository, '999')).rejects.toThrow('User not found');
        });
    });
});