import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { faker } from '@faker-js/faker';
import { ChatMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatDataService {
  private readonly TOTAL_MESSAGES = 2_000_000; // 2 million messages
  private readonly PAGE_SIZE = 50;
  
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  private currentPage = 0;
  private totalPages: number;
  private allMessagesCache: ChatMessage[] = [];
  
  constructor() {
    this.totalPages = Math.ceil(this.TOTAL_MESSAGES / this.PAGE_SIZE);
    console.log(`ChatDataService initialized: ${this.TOTAL_MESSAGES.toLocaleString()} messages, ${this.totalPages.toLocaleString()} pages`);
  }


   // Generate a single fake message

  private generateMessage(index: number, userId?: string, userName?: string): ChatMessage {
    const timestamp = new Date();
    timestamp.setTime(timestamp.getTime() - (this.TOTAL_MESSAGES - index) * 1000); // Older messages have earlier timestamps
    
    const randomUserId = userId || faker.string.uuid();
    const randomUserName = userName || faker.person.firstName();
    
    return {
      id: `msg-${index}`,
      userId: randomUserId,
      userName: randomUserName,
      avatar: `https://i.pravatar.cc/150?u=${randomUserId}`,
      content: faker.lorem.sentence({ min: 3, max: 20 }),
      timestamp: timestamp,
      isOwn: false
    };
  }

  // Generate a batch of messages

  private generateMessageBatch(startIndex: number, count: number): ChatMessage[] {
    const messages: ChatMessage[] = [];
    const userPool = Array.from({ length: 20 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.firstName()
    }));
    
    for (let i = 0; i < count; i++) {
      const user = userPool[Math.floor(Math.random() * userPool.length)];
      messages.push(this.generateMessage(startIndex + i, user.id, user.name));
    }
    
    return messages;
  }

  // Load initial messages (latest messages)

  loadInitialMessages(currentUserId?: string): void {
    console.log('Loading initial messages...');
    const startIndex = Math.max(0, this.TOTAL_MESSAGES - this.PAGE_SIZE);
    const messages = this.generateMessageBatch(startIndex, this.PAGE_SIZE);
    
    // Mark current user's messages
    if (currentUserId) {
      messages.forEach((msg, idx) => {
        if (idx % 5 === 0) { // Every 5th message is from current user
          msg.userId = currentUserId;
          msg.isOwn = true;
        }
      });
    }
    
    this.currentPage = this.totalPages - 1;
    this.allMessagesCache = messages;
    this.messagesSubject.next([...this.allMessagesCache]);
  }

  
  // Load previous messages (scrolling up)
  
  loadPreviousMessages(currentUserId?: string): Observable<boolean> {
    return new Observable(observer => {
      if (this.currentPage <= 0) {
        console.log('No more previous messages');
        observer.next(false);
        observer.complete();
        return;
      }
      
      // Simulate network delay
      setTimeout(() => {
        this.currentPage--;
        const startIndex = this.currentPage * this.PAGE_SIZE;
        const newMessages = this.generateMessageBatch(startIndex, this.PAGE_SIZE);
        
        // Mark current user's messages
        if (currentUserId) {
          newMessages.forEach((msg, idx) => {
            if (idx % 5 === 0) {
              msg.userId = currentUserId;
              msg.isOwn = true;
            }
          });
        }
        
        // Prepend to cache
        this.allMessagesCache = [...newMessages, ...this.allMessagesCache];
        
        // Limit cache size to prevent memory issues
        if (this.allMessagesCache.length > 10000) {
          this.allMessagesCache = this.allMessagesCache.slice(0, 10000);
        }
        
        this.messagesSubject.next([...this.allMessagesCache]);
        console.log(`Loaded page ${this.currentPage}, total messages in cache: ${this.allMessagesCache.length}`);
        
        observer.next(true);
        observer.complete();
      }, 300); // 300ms delay to simulate network
    });
  }

  
   //  Add a new message (from user input)

  addNewMessage(content: string, userId: string, userName: string): void {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: userId,
      userName: userName,
      avatar: `https://i.pravatar.cc/150?u=${userId}`,
      content: content,
      timestamp: new Date(),
      isOwn: true
    };
    
    this.allMessagesCache.push(newMessage);
    this.messagesSubject.next([...this.allMessagesCache]);
  }

  //  Simulate incoming message from another user

  simulateIncomingMessage(): void {
    const randomMessage = this.generateMessage(this.TOTAL_MESSAGES + Math.random());
    this.allMessagesCache.push(randomMessage);
    this.messagesSubject.next([...this.allMessagesCache]);
  }


  // Get current message count
   
  getMessageCount(): number {
    return this.allMessagesCache.length;
  }

  
  // Reset the service
  
  reset(): void {
    this.currentPage = 0;
    this.allMessagesCache = [];
    this.messagesSubject.next([]);
  }
}

