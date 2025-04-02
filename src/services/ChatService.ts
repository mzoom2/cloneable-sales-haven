
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
 * API Base URL - Update according to your environment
 */
const API_URL = 'http://localhost:5000/api';

/**
 * Check if there are unread messages
 */
export const checkUnreadMessages = async (conversationId: string): Promise<boolean> => {
  try {
    const messages = await getChatMessages(conversationId);
    return messages.some(msg => msg.is_admin_reply && !msg.is_read);
  } catch (error) {
    console.error('Failed to check for unread messages:', error);
    return false;
  }
};

/**
 * Send a new chat message
 */
export const sendChatMessage = async (message: Omit<ChatMessage, 'is_admin_reply' | 'is_read' | 'created_at'>): Promise<ChatMessage> => {
  try {
    // Send message to backend API
    const response = await fetch(`${API_URL}/chat/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Chat message error:', errorData);
      throw new Error('Failed to send chat message');
    }

    const newMessage = await response.json();
    
    // Also send notification to Telegram (as a backup)
    try {
      await sendTelegramNotification(
        message.username || 'Anonymous',
        message.email || 'No email',
        message.message,
        message.conversation_id
      );
    } catch (telegramError) {
      console.warn('Telegram notification failed, but message was saved:', telegramError);
    }
    
    console.log('Chat message saved successfully');
    return newMessage;
  } catch (error) {
    console.error('Chat message error:', error);
    
    // Fallback to Telegram if API fails
    try {
      await sendTelegramNotification(
        message.username || 'Anonymous',
        message.email || 'No email',
        message.message,
        message.conversation_id
      );
      console.log('Chat message failed but Telegram notification sent');
    } catch (telegramError) {
      console.error('Both API and Telegram notification failed:', telegramError);
    }
    
    throw error;
  }
};

/**
 * Get chat messages for a conversation
 */
export const getChatMessages = async (conversationId: string): Promise<ChatMessage[]> => {
  try {
    const response = await fetch(`${API_URL}/chat/messages/${conversationId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Get chat messages error:', errorData);
      throw new Error('Failed to get chat messages');
    }
    
    return await response.json();
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
    const response = await fetch(`${API_URL}/chat/admin/messages`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Get chat conversations error:', errorData);
      throw new Error('Failed to get chat conversations');
    }
    
    return await response.json();
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
    const response = await fetch(`${API_URL}/chat/admin/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        message
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Admin reply error:', errorData);
      throw new Error('Failed to send admin reply');
    }
    
    return await response.json();
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
    const response = await fetch(`${API_URL}/chat/messages/mark-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        is_admin: isAdmin
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Mark as read error:', errorData);
      throw new Error('Failed to mark messages as read');
    }
  } catch (error) {
    console.error('Mark as read error:', error);
    throw error;
  }
};
