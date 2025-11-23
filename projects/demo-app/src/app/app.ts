import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CortxChatComponent, ChatDataService } from '../../../cortx-chat/src/public-api';
import type { ChatUser, ChatConfig } from '../../../cortx-chat/src/public-api';

@Component({
  selector: 'app-root',
  imports: [CortxChatComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Cortx Chat Demo');
  private chatDataService = inject(ChatDataService);
  private incomingMessageInterval?: any;
  
  currentUser: ChatUser = {
    id: 'user-muskan',
    name: 'Muskan',
    avatar: 'https://i.pravatar.cc/150?u=muskan'
  };

  chatConfig: ChatConfig = {
    pageSize: 50,
    itemHeight: 80,
    theme: 'light',
    maxMessages: 10000,
    enableVirtualScroll: true
  };

  isDarkMode = signal(false);

  ngOnInit(): void {
    // Simulate incoming messages every 10 seconds
    this.incomingMessageInterval = setInterval(() => {
      this.chatDataService.simulateIncomingMessage();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.incomingMessageInterval) {
      clearInterval(this.incomingMessageInterval);
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(v => !v);
  }

  handleMessageSend(message: string): void {
    console.log('Message sent:', message);
  }

  handleScroll(index: number): void {
    // Optional: Track scroll position for analytics
  }

  handleEvent(event: any): void {
    console.log('Chat event:', event);
  }
}
