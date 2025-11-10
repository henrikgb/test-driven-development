import { createRealNotificationSender } from './realNotificationSender';
import { createNotificationService, type NotificationService } from './notificationService';
import type { NotificationSender } from '../../types/notificationService';

describe('NotificationService', () => {
    let sender: NotificationSender;
    let notificationService: NotificationService;
    let sendSpy: jest.SpyInstance;

    beforeEach(() => {
        sender = createRealNotificationSender();
        notificationService = createNotificationService(sender);
        
        // Create a spy on the send method
        sendSpy = jest.spyOn(sender, 'send');
    });

    afterEach(() => {
        // Clear and reset the spy
        sendSpy.mockClear();
    });

    it('should send notification with low priority for short messages', async () => {
        // Act
        await notificationService.notifyUser('user1', 'Hi!');

        // Assert
        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
            userId: 'user1',
            message: 'Hi!',
            priority: 'low'
        });
    });
    
    it('should send notification with high priority for urgent messages', async () => {
        // Act
        await notificationService.notifyUser('user1', 'This is an URGENT message!');

        // Assert
        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
            userId: 'user1',
            message: 'This is an URGENT message!',
            priority: 'high'
        });
    });
    
    it('should send notification with medium priority for regular messages', async () => {
        // Act
        await notificationService.notifyUser('user1', 'This is a regular message');

        // Assert
        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
            userId: 'user1',
            message: 'This is a regular message',
            priority: 'medium'
        });
    });
    
    it('should send notifications to multiple users', async () => {
        // Act
        // TODO: call notifyMultipleUsers with ['user1', 'user2', 'user3'] with
        //       a notification of 'Hello everyone!'
        const incomingMessages = [
            { userId: 'user1', message: 'Hello everyone!', priority: 'low' },
            { userId: 'user2', message: 'Hello everyone!', priority: 'low' },
            { userId: 'user3', message: 'Hello everyone!', priority: 'low' }
        ]
        
        await notificationService.notifyMultipleUsers(incomingMessages);
        
        // Assert
        // TODO: expect sendSpy to have been called 3 times
        expect(sendSpy).toHaveBeenCalledTimes(3);
        
        expect(sendSpy.mock.calls[0][0]).toEqual(
            { userId: 'user1', message: 'Hello everyone!', priority: 'low' }
        );
        
        expect(sendSpy.mock.calls[1][0]).toEqual(
            { userId: 'user2', message: 'Hello everyone!', priority: 'low' }
        );
        
        expect(sendSpy.mock.calls[2][0]).toEqual(
            { userId: 'user3', message: 'Hello everyone!', priority: 'low' }
        );
        
    });
});