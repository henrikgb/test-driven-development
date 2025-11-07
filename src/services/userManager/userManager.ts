import { Logger } from "../../types/logger";
export class UserManager {
    constructor(private readonly logger: Logger) {}
    private users: string[] = [];

    addUser(username: string): void {
        this.users.push(username);
        this.logger.log(`User ${username} added.`);
    }
    getUsers(): string[] {
        return this.users;
    }
}