export interface ChatConfig {
  pageSize?: number;        // Messages per page (default: 50)
  itemHeight?: number;       // Average message height (default: 80)
  theme?: 'light' | 'dark';  // Theme mode
  maxMessages?: number;      // Max messages to keep in memory (default: 10000)
  enableVirtualScroll?: boolean; // Enable virtual scrolling (default: true)
}

export const DEFAULT_CHAT_CONFIG: ChatConfig = {
  pageSize: 50,
  itemHeight: 80,
  theme: 'light',
  maxMessages: 10000,
  enableVirtualScroll: true
};

