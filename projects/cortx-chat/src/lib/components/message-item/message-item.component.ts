import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../models/message.model';

@Component({
  selector: 'lib-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent {
  @Input() message!: ChatMessage;
  @Input() showAvatar: boolean = true;
  @Input() showName: boolean = true;
  @Input() isGrouped: boolean = false;

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
}

