import { Logger } from "../../types/logger";

export interface UserManager {
    addUser(username: string): void;
    getUsers(): string[];
}

export function createUserManager(logger: Logger): UserManager {
    const users: string[] = [];

    return {
        addUser(username: string): void {
            users.push(username);
            logger.log(`User ${username} added.`, 'info');
        },
        getUsers(): string[] {
            return users;
        }
    };
}