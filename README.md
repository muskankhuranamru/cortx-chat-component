# CORTX Chat Component

> High-performance Angular chat component built as an NPM library, capable of efficiently rendering millions of messages using virtual scroll and pagination.

---

##  What Does This Project Do?

This project provides a **production-ready chat component SDK** that can be dropped into any Angular application. It efficiently handles millions of messages with smooth scrolling performance, making it ideal for high-volume chat applications.

---

## About the Library Integration

**Package Name:** `@cortx/chat-ui`

### Installation

```bash
npm install @cortx/chat-ui
```

### Usage

```typescript
import { Component } from '@angular/core';
import { CortxChatComponent, ChatUser } from '@cortx/chat-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CortxChatComponent],
  template: `
    <lib-cortx-chat
      [user]="currentUser"
      [theme]="'light'"
      (onMessageSend)="handleMessageSend($event)">
    </lib-cortx-chat>
  `
})
export class AppComponent {
  currentUser: ChatUser = {
    id: 'user-1',
    name: 'John Doe'
  };

  handleMessageSend(message: string) {
    console.log('New message:', message);
  }
}
```

### API

**Inputs:**
- `user: ChatUser` - Current user information (required)
- `config: ChatConfig` - Configuration options (optional)
- `theme: 'light' | 'dark'` - UI theme (default: 'light')

**Outputs:**
- `onMessageSend: EventEmitter<string>` - Emits when user sends a message
- `onScroll: EventEmitter<number>` - Emits scroll position changes
- `onEvent: EventEmitter<any>` - General event emitter

---

## Core Features

| Feature | Description |
|---------|-------------|
| **Virtual Scroll** | Renders only visible messages for optimal performance |
| **2M+ Messages** | Handles millions of messages without lag |
| **Bidirectional Loading** | Load historical messages on scroll up |
| **Message Grouping** | Groups consecutive messages from same sender |
| **Auto-scroll** | Automatically scrolls to bottom on new messages |
| **Real-time Simulation** | Simulates incoming messages every 10 seconds |
| **Emoji Picker** | Lightweight custom emoji picker (170+ emojis) |
| **File Attachment** | File attachment button (UI ready for integration) |
| **Dark Mode** | Full light/dark theme support |
| **Responsive Design** | Works on desktop and mobile |

---

## Libraries Used

| Library | Purpose | Why Used |
|---------|---------|----------|
| **Angular 21** | Frontend framework | Latest Angular with standalone components |
| **Angular CDK** | Virtual scrolling | Efficiently renders large lists with minimal DOM nodes |
| **RxJS** | State management | Reactive data streams and event handling |
| **TailwindCSS v3** | Styling | Utility-first CSS for rapid UI development |
| **Faker.js** | Mock data | Generates 2 million realistic chat messages |
| **TypeScript 5.9** | Type safety | Strong typing for better code quality |

---

## Demo Video/Photos
You can find the demo video here : https://drive.google.com/file/d/1vF9cy7y6AswShe0hII4D7XBM8BJFkXok/view?usp=sharing
## Desktop Views

<div align="center">

#### Dark Mode - Full Chat Interface
<img width="800" alt="Light Mode Chat" src="https://github.com/user-attachments/assets/d13eff6a-f39f-4235-9527-eb7b4bac5dd2" />

<br/><br/>

#### Emoji Picker - Lightweight Custom Design
<img width="800" alt="Dark Mode Chat" src="https://github.com/user-attachments/assets/f05b1bc4-b386-4a09-9406-a972d818616d" />

<br/><br/>

####  Light Mode - Full Chat Interface
<img width="800" alt="Emoji Picker" src="https://github.com/user-attachments/assets/0f24c26f-0828-437f-8f5c-347ea372e96f" />

</div>

---

### Mobile Responsive Views

<div align="center">

<img width="300" alt="Mobile Light Mode" src="https://github.com/user-attachments/assets/696e2f11-1eba-411b-817b-38f8818db1cd" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img width="300" alt="Mobile Dark Mode" src="https://github.com/user-attachments/assets/97bdb99c-a444-415a-ab6a-e02475623da1" />

<br/>
<sub><i>Left: Light Mode | Right: Dark Mode - Fully responsive design</i></sub>

</div>


## How to Run

### Prerequisites

- Node.js 18+ and npm 10+
- Angular CLI 21+

### Setup & Run

```bash
# 1. Clone the repository
git clone https://github.com/muskankhuranamru/cortx-chat-component.git
cd cortx-chat-component

# 2. Install dependencies
npm install

# 3. Build the library
npm run build -- cortx-chat

# 4. Run the demo app
npm start

# 5. Open browser
# Navigate to http://localhost:4200
```

### Build for Production

```bash
# Build library
npm run build -- cortx-chat

# Build demo app
ng build demo-app

# Output will be in dist/ folder
```

---

## Quick Test Guide

1. **Scroll Up** - Watch messages load automatically (pagination)
2. **Send Message** - Type in input and press Enter
3. **Toggle Dark Mode** - Click moon/sun icon in header
4. **Open Emoji Picker** - Click 😊 icon, select emoji
5. **Click Attachment** - Click 📎 icon (shows placeholder)
6. **Wait 10 seconds** - See new message arrive automatically

---

## Performance Metrics

- **Initial Load:** 240ms (0.24s) - 8x faster than target!
- **Time to Interactive:** 240ms
- **First Contentful Paint:** < 300ms
- **Bundle Size:** 5.3 MB (optimized)
- **HTTP Requests:** 53 (efficient)
- 
<img width="1510" height="817" alt="Screenshot 2025-11-23 at 5 55 58 PM" src="https://github.com/user-attachments/assets/2bdde273-66fc-4b77-b982-d38cf064a68b" />


---

**Developed with ❤️ by Muskan**
