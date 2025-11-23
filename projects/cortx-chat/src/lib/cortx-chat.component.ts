import { 
  Component, 
  Input, 
  Output, 
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatUser } from './models/message.model';
import { ChatConfig, DEFAULT_CHAT_CONFIG } from './models/chat-config.model';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';

@Component({
  selector: 'lib-cortx-chat',
  standalone: true,
  imports: [CommonModule, ChatContainerComponent],
  template: `
    <lib-chat-container
      [user]="user"
      [config]="config"
      [theme]="theme"
      (messageSend)="onMessageSend.emit($event)"
      (scrollEvent)="onScroll.emit($event)"
      (event)="onEvent.emit($event)"
    ></lib-chat-container>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CortxChatComponent {
  @Input() user!: ChatUser;
  @Input() config: ChatConfig = DEFAULT_CHAT_CONFIG;
  @Input() theme: 'light' | 'dark' = 'light';
  
  @Output() onMessageSend = new EventEmitter<string>();
  @Output() onScroll = new EventEmitter<number>();
  @Output() onEvent = new EventEmitter<any>();
}

