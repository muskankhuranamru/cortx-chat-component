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
  showEmojiPicker: boolean = false;

  // Lightweight emoji list - most popular emojis
  emojis: string[] = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
    '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
    '😋', '😛', '😜', '🤪', '😝', '🤗', '🤭', '🤫', '🤔', '🤐',
    '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌',
    '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
    '🥵', '🥶', '😶‍🌫️', '😵', '😵‍💫', '🤯', '🤠', '🥳', '😎', '🤓',
    '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺',
    '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣',
    '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '👍',
    '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👌',
    '🤏', '👈', '👉', '👆', '👇', '☝️', '👏', '🙌', '👐', '🤲',
    '🤝', '🙏', '✍️', '💪', '❤️', '🧡', '💛', '💚', '💙', '💜',
    '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '💕', '💞', '💓', '💗', '💖',
    '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯',
    '🕎', '☯️', '☦️', '⛎', '♈', '♉', '♊', '♋', '♌', '♍',
    '🔥', '⭐', '🌟', '✨', '⚡', '💥', '💫', '💦', '💨', '🌈',
    '☀️', '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️'
  ];

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

  onEmojiClick(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  selectEmoji(emoji: string): void {
    this.messageText += emoji;
    this.showEmojiPicker = false;
  }

  onAttachmentClick(): void {
    // Placeholder for file attachment functionality
    alert('📎 File attachment feature coming soon!\n\nThis would allow you to:\n• Upload images\n• Attach documents\n• Share files');
  }

  closeEmojiPicker(): void {
    this.showEmojiPicker = false;
  }
}

