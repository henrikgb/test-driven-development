import { UserManager } from "./userManager";
import { ILogger } from "../../models/logger/logger";

class FakeLogger implements ILogger {
    public logs: string[] = [];
    log(message: string): void {
        this.logs.push(message);
    }
}

describe("UserManager", () => {
    test("addUser should add a valid user", () => {
        const userManager = new UserManager(new FakeLogger());
        userManager.addUser("testUser");
        expect(userManager.getUsers()).toContain("testUser");
    });

    test("addsUser should log when a user is added", () => {
        const fakeLogger = new FakeLogger();
        const userManager = new UserManager(fakeLogger);
        userManager.addUser("testUser");
        expect(fakeLogger.logs).toEqual(["User testUser added."]);
    });
})