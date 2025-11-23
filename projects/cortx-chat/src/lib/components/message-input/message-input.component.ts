import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent {
  @Output() messageSend = new EventEmitter<string>();
  
  messageText: string = '';

  sendMessage(): void {
    const trimmed = this.messageText.trim();
    if (trimmed) {
      this.messageSend.emit(trimmed);
      this.messageText = '';
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}

