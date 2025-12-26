/**
 * Centralized logging utility
 * In production, this should integrate with a proper logging service (e.g., Winston, Pino)
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    return `${prefix} ${message}`;
  }

  info(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.log(this.formatMessage('info', message), ...args);
    }
    // In production, send to logging service
  }

  warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage('warn', message), ...args);
    // In production, send to logging service
  }

  error(message: string, error?: Error | unknown, ...args: any[]): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error(this.formatMessage('error', message), errorMessage, ...args);
    if (errorStack && this.isDevelopment) {
      console.error('Stack:', errorStack);
    }
    // In production, send to error tracking service (e.g., Sentry)
  }

  debug(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }
}

export const logger = new Logger();
