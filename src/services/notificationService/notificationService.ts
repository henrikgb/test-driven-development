import type { NotificationSender } from "../../types/notificationService";

export class NotificationService {
    constructor(private sender: NotificationSender) {}

    async notifyUser(userId: string, message: string): Promise<void> {
        await this.sender.send({
            userId,
            message,
            priority: message.toLowerCase().includes("urgent") ? "high" : (message.length >= 20 ? "medium" : "low")
        });        
    }
    
    async notifyMultipleUsers(incomingMessages: {userId: string, message: string}[]): Promise<void> {
        await incomingMessages.map(incomingMessage => {
            this.sender.send({
                userId: incomingMessage.userId,
                message: incomingMessage.message,
                priority: incomingMessage.message.toLowerCase().includes("urgent") ? "high" : (incomingMessage.message.length >= 20 ? "medium" : "low")
            })
        })
    }
}