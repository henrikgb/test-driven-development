import { ILogger } from "../../models/logger/logger";
export class UserManager {
    constructor(private readonly logger: ILogger) {}
    private users: string[] = [];

    addUser(username: string): void {
        this.users.push(username);
        this.logger.log(`User ${username} added.`);
    }
    getUsers(): string[] {
        return this.users;
    }
}