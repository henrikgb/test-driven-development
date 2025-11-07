import type { Logger } from '../../types/logger';
import type { EmailSender } from '../../types/emailSender';

export class EmailService {
    constructor(
        private logger: Logger,
        private emailSender: EmailSender
    ) {}

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

        this.logger.log(`Sending email to ${to}`);
        this.emailSender.send(to, subject, body);
        return true;
    }
}