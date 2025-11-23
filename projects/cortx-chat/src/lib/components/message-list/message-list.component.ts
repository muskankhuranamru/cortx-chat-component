import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewChild, 
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ChatMessage } from '../../models/message.model';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'lib-message-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, MessageItemComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements AfterViewInit, OnChanges {
  @Input() messages: ChatMessage[] = [];
  @Input() itemHeight: number = 80;
  @Input() loading: boolean = false;
  
  @Output() loadMore = new EventEmitter<void>();
  @Output() scrollEvent = new EventEmitter<number>();
  
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  
  isAtBottom = true; // Made public for template access
  private previousMessageCount = 0;
  private isLoadingMore = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Auto-scroll to bottom initially
    setTimeout(() => {
      this.scrollToBottomInstant();
    }, 100);

    // Listen to scroll events
    this.viewport.scrolledIndexChange.subscribe(index => {
      this.onScrollIndexChange(index);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages'] && !changes['messages'].firstChange) {
      const currentLength = changes['messages'].currentValue?.length || 0;
      const previousLength = changes['messages'].previousValue?.length || 0;
      
      // If new messages were added to the end (not prepended)
      if (currentLength > previousLength && this.isAtBottom) {
        setTimeout(() => {
          this.scrollToBottom();
        }, 50);
      }
      
      // If messages were prepended (loading history)
      if (currentLength > previousLength && !this.isAtBottom && this.isLoadingMore) {
        const addedCount = currentLength - previousLength;
        setTimeout(() => {
          this.adjustScrollAfterPrepend(addedCount);
          this.isLoadingMore = false;
        }, 50);
      }
      
      this.previousMessageCount = currentLength;
    }
  }

  onScrollIndexChange(index: number): void {
    // Check if at bottom
    const range = this.viewport.getRenderedRange();
    const isNearBottom = range.end >= this.messages.length - 5;
    this.isAtBottom = isNearBottom;
    
    // Load more if scrolled to top
    if (index === 0 && !this.loading && !this.isLoadingMore) {
      this.isLoadingMore = true;
      this.loadMore.emit();
    }
    
    this.scrollEvent.emit(index);
  }

  scrollToBottom(): void {
    if (this.viewport) {
      const element = this.viewport.elementRef.nativeElement;
      element.scrollTop = element.scrollHeight;
      this.isAtBottom = true;
    }
  }

  scrollToBottomInstant(): void {
    if (this.viewport) {
      const element = this.viewport.elementRef.nativeElement;
      element.scrollTop = element.scrollHeight;
      this.isAtBottom = true;
    }
  }

  adjustScrollAfterPrepend(addedCount: number): void {
    if (this.viewport) {
      // Maintain scroll position after prepending messages
      const currentIndex = this.viewport.measureScrollOffset();
      this.viewport.scrollToOffset(currentIndex + (addedCount * this.itemHeight));
    }
  }

  shouldShowAvatar(message: ChatMessage, index: number): boolean {
    if (index === 0) return true;
    const prevMessage = this.messages[index - 1];
    return prevMessage.userId !== message.userId;
  }

  shouldShowName(message: ChatMessage, index: number): boolean {
    return this.shouldShowAvatar(message, index);
  }

  isGrouped(message: ChatMessage, index: number): boolean {
    if (index === 0) return false;
    const prevMessage = this.messages[index - 1];
    return prevMessage.userId === message.userId;
  }

  trackByMessageId(index: number, message: ChatMessage): string {
    return message.id;
  }
}

