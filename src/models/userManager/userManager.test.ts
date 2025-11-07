import { UserManager } from "./userManager";
import { ILogger } from "../../models/logger/logger";

class FakeLogger implements ILogger {
    public logs: string[] = [];
    log(message: string): void {
        this.logs.push(message);
    }
}

describe("UserManager", () => {
    let userManager: UserManager;
    let fakeLogger: FakeLogger;

    beforeEach(() => {
        // Arrange
        fakeLogger = new FakeLogger();
        userManager = new UserManager(fakeLogger);  
    })
    test("addUser should add a valid user", () => {
        // Act
        userManager.addUser("testUser");
        // Assert
        expect(userManager.getUsers()).toContain("testUser");
    });

    test("addsUser should log when a user is added", () => {
        // Act
        userManager.addUser("testUser");
        // Assert
        expect(fakeLogger.logs).toEqual(["User testUser added."]);
    });
})