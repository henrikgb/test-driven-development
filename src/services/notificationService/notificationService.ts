import type { NotificationSender } from "../../types/notificationService";

export interface NotificationService {
    notifyUser(userId: string, message: string): Promise<void>;
    notifyMultipleUsers(incomingMessages: {userId: string, message: string}[]): Promise<void>;
}

export function createNotificationService(sender: NotificationSender): NotificationService {
    return {
        async notifyUser(userId: string, message: string): Promise<void> {
            await sender.send({
                userId,
                message,
                priority: message.toLowerCase().includes("urgent") ? "high" : (message.length >= 20 ? "medium" : "low")
            });        
        },
        
        async notifyMultipleUsers(incomingMessages: {userId: string, message: string}[]): Promise<void> {
            await Promise.all(incomingMessages.map(incomingMessage => {
                return sender.send({
                    userId: incomingMessage.userId,
                    message: incomingMessage.message,
                    priority: incomingMessage.message.toLowerCase().includes("urgent") ? "high" : (incomingMessage.message.length >= 20 ? "medium" : "low")
                });
            }));
        }
    };
}