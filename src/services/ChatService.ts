
/**
 * Chat Service for handling communication with the chat API
 */

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
    const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error sending chat message:', errorData);
      throw new Error(errorData.error || 'Failed to send message');
    }

    return await response.json();
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
    const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat/messages/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching chat messages:', errorData);
      throw new Error(errorData.error || 'Failed to fetch messages');
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
    const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat/admin/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching chat conversations:', errorData);
      throw new Error(errorData.error || 'Failed to fetch conversations');
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
    const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat/admin/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error sending admin reply:', errorData);
      throw new Error(errorData.error || 'Failed to send reply');
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
    const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat/messages/mark-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        is_admin: isAdmin,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error marking messages as read:', errorData);
      throw new Error(errorData.error || 'Failed to mark messages as read');
    }
  } catch (error) {
    console.error('Mark as read error:', error);
    throw error;
  }
};
