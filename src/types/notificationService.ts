export interface Notification {
    userId: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
}

export interface NotificationSender {
    send(notification: Notification): Promise<void>;
}