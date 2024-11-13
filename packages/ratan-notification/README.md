# Ratan Notification

A React-based notification system that provides real-time notifications using WebSocket (STOMP) protocol and supports both in-app and browser notifications.

## Features

- Real-time WebSocket notifications using STOMP protocol
- In-app notifications using Ant Design components
- Browser notifications support
- Notification center with unread count
- Notification history board
- Connection status monitoring
- Automatic reconnection handling

## Installation

```bash
npm install ratan-notification
```

## Dependencies

- @stomp/rx-stomp: ^2.0.0
- @stomp/stompjs: ^7.0.0
- rxjs: ^7.8.1
- sockjs-client: ^1.6.1
- antd: (peer dependency)
- react: (peer dependency)

## Usage

### 1. Setup Providers

Wrap your application with both providers:

```tsx
import { StompServiceProvider, NotificationCenterProvider } from 'ratan-notification';

function App() {
  return (
    <StompServiceProvider>
      <NotificationCenterProvider>
        <YourApp />
      </NotificationCenterProvider>
    </StompServiceProvider>
  );
}
```

### 2. Use Notification Center

```tsx
import { useNotificationCenter } from 'ratan-notification';

function YourComponent() {
  const nc = useNotificationCenter();
  
  // Subscribe to notifications
  nc.schedule({
    processor: yourObservable$,
    notify: ({ data, isSuccess }) => ({
      title: 'Notification Title',
      body: 'Notification Message',
      type: 'success'
    })
  });
  
  return <div>Your Component</div>;
}
```

### 3. Monitor Connection Status

```tsx
import { useStompServiceStatus } from 'ratan-notification';

function ConnectionStatus() {
  const { connectionStatus } = useStompServiceStatus();
  return <div>Connection Status: {connectionStatus}</div>;
}
```

## Components

### NotificationCenterEntry

A floating button that shows unread notification count and opens the notification board.

### NotificationCenterBoard

A drawer component that displays the notification history.

## Configuration

### STOMP Configuration

Configure your STOMP connection in `StompService/config.ts`:

```typescript
export const stompConfig = {
  url: '/api/ratan/rxstomp/notification/subscriptions',
  topic: '/your/topic/path'
};
```

## Notification Types

Notifications can be of different types:
- success
- error
- info
- warning

## Features

### Browser Notifications

When the application is in the background, notifications will be shown as browser notifications (requires user permission).

### Persistent Connection

The STOMP service automatically handles:
- Connection retries
- Heartbeat monitoring
- Authentication via headers

## API Reference

### Hooks

- `useNotificationCenter()`: Access the notification center instance
- `useStompService()`: Access the STOMP client
- `useStompServiceStatus()`: Monitor connection status
- `useStompServiceTopicMessage()`: Subscribe to specific topics

### Classes

- `NotificationCenter`: Main notification management
- `NotifyQueue`: Notification queue management
- `NotifyInstance`: Notification display handling
- `NotificationScheduler`: Notification scheduling and processing

## License

MIT

