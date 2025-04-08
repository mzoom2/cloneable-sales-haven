
import React, { useState, useEffect, useRef } from "react";
import { 
  getAllChatConversations, 
  getChatMessages, 
  sendAdminChatReply, 
  markMessagesAsRead,
  ChatConversation,
  ChatMessage
} from "@/services/ChatService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { 
  Send, 
  RefreshCcw, 
  Check, 
  Clock, 
  Loader2 
} from "lucide-react";

const AdminChatPanel: React.FC = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
    
    // Set up polling for new conversations
    const interval = setInterval(() => {
      loadConversations();
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
      
      // Mark messages as read when selected
      markMessagesAsRead(selectedConversation, true)
        .catch(error => console.error("Failed to mark messages as read:", error));
    }
  }, [selectedConversation]);

  useEffect(() => {
    // Scroll to bottom of messages
    scrollToBottom();
  }, [messages]);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const data = await getAllChatConversations();
      console.log("Loaded conversations:", data);
      setConversations(data);
    } catch (error) {
      console.error("Failed to load conversations:", error);
      toast({
        title: "Error",
        description: "Failed to load chat conversations",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      console.log("Loading messages for conversation:", conversationId);
      const data = await getChatMessages(conversationId);
      console.log("Loaded messages:", data);
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
      toast({
        title: "Error",
        description: "Failed to load chat messages",
        variant: "destructive"
      });
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedConversation || !replyMessage.trim()) {
      console.log("Cannot reply - missing conversation or message");
      return;
    }
    
    console.log("Sending reply to conversation:", selectedConversation);
    console.log("Reply message:", replyMessage);
    
    setIsReplying(true);
    try {
      const response = await sendAdminChatReply(selectedConversation, replyMessage);
      console.log("Reply sent successfully:", response);
      setReplyMessage("");
      
      // Reload messages to show the new reply
      await loadMessages(selectedConversation);
      
      // Reload conversations to update the unread counts
      loadConversations();
      
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent to the customer",
      });
    } catch (error) {
      console.error("Failed to send reply:", error);
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsReplying(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="h-[calc(100vh-200px)] flex overflow-hidden">
      {/* Conversations list */}
      <div className="w-1/3 border-r overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold text-lg">Conversations</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={loadConversations}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {isLoading ? "Loading conversations..." : "No conversations yet"}
          </div>
        ) : (
          <div>
            {conversations.map((conv) => (
              <div 
                key={conv.conversation_id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conv.conversation_id ? "bg-blue-50" : ""
                } ${
                  conv.unread_count > 0 && !conv.is_latest_from_admin ? "bg-yellow-50" : ""
                }`}
                onClick={() => setSelectedConversation(conv.conversation_id)}
              >
                <div className="flex justify-between">
                  <div className="font-medium">{conv.username || "Anonymous"}</div>
                  {conv.unread_count > 0 && !conv.is_latest_from_admin && (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {conv.unread_count}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600 truncate">{conv.latest_message}</div>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <span>{formatDate(conv.latest_message_time)}</span>
                  {conv.is_latest_from_admin ? (
                    <span className="ml-2 flex items-center text-blue-600">
                      <Check className="h-3 w-3 mr-1" /> Replied
                    </span>
                  ) : (
                    <span className="ml-2 flex items-center text-orange-600">
                      <Clock className="h-3 w-3 mr-1" /> Waiting
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Chat messages */}
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b">
              <h3 className="font-semibold">
                Chat with {
                  conversations.find(c => c.conversation_id === selectedConversation)?.username || "Customer"
                }
              </h3>
              <div className="text-sm text-gray-600">
                {conversations.find(c => c.conversation_id === selectedConversation)?.email || "No email provided"}
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No messages yet</div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`${
                        message.is_admin_reply 
                          ? "bg-blue-100 ml-12" 
                          : "bg-gray-200 mr-12"
                      } p-3 rounded-lg`}
                    >
                      <div className="font-semibold text-xs mb-1">
                        {message.is_admin_reply ? "Admin" : message.username || "Customer"}
                      </div>
                      <div>{message.message}</div>
                      <div className="text-xs text-right text-gray-500 mt-1">
                        {message.created_at ? formatDate(message.created_at) : ''}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            <form 
              onSubmit={handleReply}
              className="p-4 border-t flex items-center gap-2"
            >
              <Input
                placeholder="Type your reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="flex-grow"
                disabled={isReplying}
              />
              <Button 
                type="submit"
                disabled={!replyMessage.trim() || isReplying}
              >
                {isReplying ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Reply
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            Select a conversation to view messages
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPanel;
