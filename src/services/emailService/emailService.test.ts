import { EmailService } from './emailService';  

// Dummy implementations for dependencies
class DummyLogger {
    log(_message: string, _severity: 'info' | 'warn' | 'error'): void {}
}
class DummyEmailSender {
    send(_to: string, _subject: string, _body: string): void {}
}

describe('EmailService', () => {
    let emailService: EmailService;

    beforeEach(() => {
        // Arrange
        emailService = new EmailService(new DummyLogger(), new DummyEmailSender());
    });

    it('should accept valid email parameters', () => {
        // Act
        const result = emailService.sendEmail(
            'test@example.com',
            'Hello',
            'This is a test'
        );
        
        // Assert
        expect(result).toBe(true);
    });

    it('should reject invalid email address', () => {
        // Act
        const result = emailService.sendEmail(
            'invalid-email',
            'Hello',
            'This is a test'
        );

        // Assert
        expect(result).toBe(false);
    });

    it('should reject empty subject', () => {
        // Act
        const result = emailService.sendEmail(
            'test@example.com',
            '',
            'This is a test'
        );
        
        // Assert
        expect(result).toBe(false);
    });

    it('should reject empty body', () => {
        // Act
        const result = emailService.sendEmail(
            'test@example.com',
            'Hello',
            ''
        );

        // Assert
        expect(result).toBe(false);
    });

    it('should reject body exceeding 1000 characters', () => {
        // Act
        const result = emailService.sendEmail(
            'test@example.com',
            'Hello',
            'a'.repeat(1001)
        );
        
        // Assert
        expect(result).toBe(false);
    });
});