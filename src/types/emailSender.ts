export interface EmailSender {
    send(to: string, subject: string, body: string): void;
}