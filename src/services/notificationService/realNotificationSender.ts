import type { NotificationSender, Notification } from "../../types/notificationService";

export function createRealNotificationSender(): NotificationSender {
    return {
        async send(notification: Notification): Promise<void> {
            // In a real implementation, this would send to an actual service
            console.log('Sending notification:', notification);
        }
    };
}