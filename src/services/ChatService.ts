
/**
 * Chat Service for handling communication with the chat API
 */
import { sendTelegramNotification } from "@/services/TelegramService";

/**
 * Chat message interface
 */
export interface ChatMessage {
  id?: number;
  user_id: string;
  username?: string;
  email?: string;
  message: string;
  is_admin_reply: boolean;
  is_read: boolean;
  conversation_id: string;
  created_at?: string;
}

/**
 * Chat conversation summary for admin panel
 */
export interface ChatConversation {
  conversation_id: string;
  username: string;
  email?: string;
  latest_message: string;
  latest_message_time: string;
  unread_count: number;
  is_latest_from_admin: boolean;
}

/**
 * Send a new chat message
 */
export const sendChatMessage = async (message: Omit<ChatMessage, 'is_admin_reply' | 'is_read' | 'created_at'>): Promise<ChatMessage> => {
  try {
    // Store conversation in local storage for demo purposes
    // In production, this would be handled by the backend
    const localMessages = localStorage.getItem('chatMessages') || '[]';
    const messages = JSON.parse(localMessages) as ChatMessage[];
    
    // Create a new message
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now(),
      is_admin_reply: false,
      is_read: true,
      created_at: new Date().toISOString(),
      conversation_id: message.conversation_id || `conv_${Date.now()}`
    };
    
    // Add to messages array
    messages.push(newMessage);
    
    // Store back in localStorage
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    
    // Send notification to Telegram
    await sendTelegramNotification(
      newMessage.username || 'Anonymous',
      newMessage.email || 'No email',
      newMessage.message,
      newMessage.conversation_id
    );
    
    console.log('Chat message saved and notification sent');
    return newMessage;
  } catch (error) {
    console.error('Chat message error:', error);
    throw error;
  }
};

/**
 * Get chat messages for a conversation
 */
export const getChatMessages = async (conversationId: string): Promise<ChatMessage[]> => {
  try {
    // Get messages from local storage for demo
    const localMessages = localStorage.getItem('chatMessages') || '[]';
    const messages = JSON.parse(localMessages) as ChatMessage[];
    
    // Filter for this conversation
    return messages.filter(msg => msg.conversation_id === conversationId);
  } catch (error) {
    console.error('Get chat messages error:', error);
    throw error;
  }
};

/**
 * Get all chat conversations (admin only)
 */
export const getAllChatConversations = async (): Promise<ChatConversation[]> => {
  try {
    // Get messages from local storage
    const localMessages = localStorage.getItem('chatMessages') || '[]';
    const messages = JSON.parse(localMessages) as ChatMessage[];
    
    // Group by conversation
    const conversationsMap = new Map<string, ChatMessage[]>();
    
    messages.forEach(msg => {
      if (!conversationsMap.has(msg.conversation_id)) {
        conversationsMap.set(msg.conversation_id, []);
      }
      conversationsMap.get(msg.conversation_id)?.push(msg);
    });
    
    // Convert to conversation summaries
    const conversations: ChatConversation[] = [];
    
    conversationsMap.forEach((msgs, conversationId) => {
      // Sort by created_at
      msgs.sort((a, b) => {
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      });
      
      const latestMsg = msgs[0];
      const username = msgs.find(m => m.username)?.username || 'Anonymous';
      const email = msgs.find(m => m.email)?.email;
      const unreadCount = msgs.filter(m => !m.is_read).length;
      
      conversations.push({
        conversation_id: conversationId,
        username,
        email,
        latest_message: latestMsg.message,
        latest_message_time: latestMsg.created_at || new Date().toISOString(),
        unread_count: unreadCount,
        is_latest_from_admin: latestMsg.is_admin_reply
      });
    });
    
    return conversations;
  } catch (error) {
    console.error('Get chat conversations error:', error);
    throw error;
  }
};

/**
 * Send an admin reply to a chat
 */
export const sendAdminChatReply = async (conversationId: string, message: string): Promise<ChatMessage> => {
  try {
    // Get messages from local storage
    const localMessages = localStorage.getItem('chatMessages') || '[]';
    const messages = JSON.parse(localMessages) as ChatMessage[];
    
    // Create admin reply
    const adminReply: ChatMessage = {
      id: Date.now(),
      user_id: 'admin',
      username: 'Admin',
      message,
      is_admin_reply: true,
      is_read: false,
      conversation_id: conversationId,
      created_at: new Date().toISOString()
    };
    
    // Add to messages and save
    messages.push(adminReply);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    
    return adminReply;
  } catch (error) {
    console.error('Admin reply error:', error);
    throw error;
  }
};

/**
 * Mark messages as read
 */
export const markMessagesAsRead = async (conversationId: string, isAdmin: boolean = false): Promise<void> => {
  try {
    // Get messages from local storage
    const localMessages = localStorage.getItem('chatMessages') || '[]';
    const messages = JSON.parse(localMessages) as ChatMessage[];
    
    // Mark appropriate messages as read
    const updatedMessages = messages.map(msg => {
      if (msg.conversation_id === conversationId) {
        // If admin is marking user messages as read, or user is marking admin messages as read
        if ((isAdmin && !msg.is_admin_reply) || (!isAdmin && msg.is_admin_reply)) {
          return { ...msg, is_read: true };
        }
      }
      return msg;
    });
    
    // Save back to localStorage
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
  } catch (error) {
    console.error('Mark as read error:', error);
    throw error;
  }
};
