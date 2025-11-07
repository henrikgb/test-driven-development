export interface Logger {
    log(message: string, severity: 'info' | 'warn' | 'error'): void;
}
