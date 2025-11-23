export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  content: string;
  timestamp: Date;
  isOwn?: boolean;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
}

