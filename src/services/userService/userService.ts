
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}

export interface UserRepository {
    create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<User[]>;
}

export async function registerUser(
    repository: UserRepository,
    email: string,
    name: string
): Promise<User> {
    const existing = await repository.findByEmail(email);
    if (existing) {
        throw new Error('User with this email already exists');
    }

    return await repository.create({ email, name });
}

export async function updateUserName(
    repository: UserRepository,
    id: string,
    newName: string
): Promise<User> {
    const user = await repository.update(id, { name: newName });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

export async function deactivateUser(
    repository: UserRepository,
    id: string
): Promise<boolean> {
    const existing = await repository.findById(id);
    if (!existing) {
        throw new Error('User not found');
    }

    return await repository.delete(id);
}