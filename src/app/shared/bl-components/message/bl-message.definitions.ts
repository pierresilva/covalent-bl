export interface BlMessageDataOptions {
  blDuration?: number;
  blAnimate?: boolean;
  blPauseOnHover?: boolean;
}

// Message data for terminal users
export interface BlMessageData {
  // TODO: remove the literal parts as it's widened anyway
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading' | string;
  content?: string;
}

// Filled version of BlMessageData (includes more private properties)
export interface BlMessageDataFilled extends BlMessageData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: BlMessageDataOptions;
  createdAt: Date; // Auto created
}
