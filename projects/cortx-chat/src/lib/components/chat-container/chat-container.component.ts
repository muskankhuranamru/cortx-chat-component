import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit, 
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ChatMessage, ChatUser } from '../../models/message.model';
import { ChatConfig, DEFAULT_CHAT_CONFIG } from '../../models/chat-config.model';
import { ChatDataService } from '../../services/chat-data.service';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'lib-chat-container',
  standalone: true,
  imports: [CommonModule, MessageListComponent, MessageInputComponent],
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  @Input() user!: ChatUser;
  @Input() config: ChatConfig = DEFAULT_CHAT_CONFIG;
  @Input() theme: 'light' | 'dark' = 'light';
  
  @Output() messageSend = new EventEmitter<string>();
  @Output() scrollEvent = new EventEmitter<number>();
  @Output() event = new EventEmitter<any>();
  
  messages: ChatMessage[] = [];
  loading = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private chatDataService: ChatDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Subscribe to messages from the service
    this.chatDataService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        this.cdr.markForCheck();
      });

    // Load initial messages
    this.chatDataService.loadInitialMessages(this.user.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLoadMore(): void {
    if (this.loading) return;
    
    this.loading = true;
    this.cdr.markForCheck();
    
    this.chatDataService.loadPreviousMessages(this.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  onMessageSend(content: string): void {
    this.chatDataService.addNewMessage(content, this.user.id, this.user.name);
    this.messageSend.emit(content);
  }

  onScroll(index: number): void {
    this.scrollEvent.emit(index);
  }
}

