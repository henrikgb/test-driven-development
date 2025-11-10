import { createUserManager } from "./userManager";
import type { UserManager } from "./userManager";
import { Logger } from "../../types/logger";

interface FakeLogger extends Logger {
    logs: string[];
}

function createFakeLogger(): FakeLogger {
    const logs: string[] = [];
    return {
        logs,
        log(message: string): void {
            logs.push(message);
        }
    };
}

describe("UserManager", () => {
    let userManager: UserManager;
    let fakeLogger: FakeLogger;

    beforeEach(() => {
        // Arrange
        fakeLogger = createFakeLogger();
        userManager = createUserManager(fakeLogger);  
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