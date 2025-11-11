import { UserRepository, User } from "./userService";

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
                id: existing.id,          // Prevent id modification
                createdAt: existing.createdAt  // Prevent createdAt modification
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

        // Helper method for testing
        clear(): void {
            users.clear();
            currentId = 1;
        }
    };
}