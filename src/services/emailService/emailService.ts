import type { Logger } from '../../types/logger';

export interface EmailSender {
    send(to: string, subject: string, body: string): void;
}

export interface EmailService {
    sendEmail(to: string, subject: string, body: string): boolean;
}

export function createEmailService(
    logger: Logger,
    emailSender: EmailSender
): EmailService {
    return {
        sendEmail(to: string, subject: string, body: string): boolean {
            if (!to || !to.includes('@')) {
                return false;
            }

            if (!subject) {
                return false;
            }

            if (!body || body.length > 1000) {
                return false;
            }

            logger.log(`Sending email to ${to}`, 'info');
            emailSender.send(to, subject, body);
            return true;
        }
    };
}